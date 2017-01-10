function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $compileProvider, IdleProvider, KeepaliveProvider) {

    IdleProvider.idle(15 * 60); // in seconds
    IdleProvider.timeout(62); // in seconds

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);

    $urlRouterProvider.otherwise("homemanage");

    $ocLazyLoadProvider.config({
        debug: false
    });

    $stateProvider
        .state("homemanage", {
            url: "/homemanage",
            templateUrl: "../Ordering/Index",
            controller: "orderingctrl"
        })
        .state("order", {
            url: "/order",
            params: {
                mydate: { value: 0 }
            },
            templateUrl: function (params) {
                return "../Ordering/NewOrder"
            },
            controller: "newOrderController",
        })
        .state("changeorder", {
            url: "/changeorder",
            params: {
                mydate: { value: 0 }
            },
            templateUrl: function (params) {
                return "../Ordering/ChangeOrder"
            },
            controller: "changeOrderController",
        })
        .state("viewallorders", {
            url: "/viewallorders/:id",
            params: {
                id: { value: 0 }
            },
            templateUrl: function (params) {
                return "../OnlineOrder/ViewallOrderscalendar/" + params.id
            },
            controller: "viewallordercalendarcontroller",

        })
         .state("onlineorders", {
             url: "/onlineorders/:id",
             params: {
                 id: { value: 0 }
             },
             templateUrl: function (params) {
                 return "../OnlineOrder/Index/" + params.id
             },
             controller: "olordercontroller"
         })
         .state("contactus", {
             url: "/contactus",
             templateUrl: "../Ordering/ContactUs",
         })
        .state("allnotifications", {
            url: "/allnotifications",
            templateUrl: "../Ordering/Notifications",
            controller: "allnotificationscontroller",
        })
        .state("viewnotification", {
            url: "/viewnotification",
            params: { notification: 0 },
            templateUrl: "../Ordering/NotificationDetail",
            controller: "notificationdetailcontroller",
        })
        .state("stayconnected", {
            url: "/stayconnected",
            templateUrl: "../Login/StayConnected",
            controller: "CountDownWatchCtrl"
        })
         .state("aaboutus", {
             url: "/aaboutus",
             templateUrl: "../OnlineOrder/AboutUs",
             controller: "AboutUsController"
         })
         .state("faq", {
             url: "/faq",
             templateUrl: "../Ordering/FAQ"
         })
        .state("onlinereport", {
            url: "/onlinereport",
            templateUrl: "../Ordering/Reports",
            controller: "reportsController"
        })

        .state("logout", {
            url: "/logout",
            templateUrl: "../Login/Logout"
        })

         //.state("onlineorders", {
         //    url: "/onlineorders/:id",
         //    params: {
         //        id: { value: 10 }
         //    },
         //    templateUrl: "../OnlineOrder/Index",
         //    controller: "olordercontroller"
         //    //resolve: {
         //    //    loadPlugin: function ($ocLazyLoad) {
         //    //        return $ocLazyLoad.load([
         //    //            {
         //    //                serie: true,
         //    //                name: 'angular-flot',
         //    //                files: ['../Scripts/dependencies/fullcalendar.min.js']
         //    //            }
         //    //        ]);
         //    //    }
         //    //}
         //})

        .state("existingcustomer", {
            url: "/existingcustomer/:id",
            params: {
                id: { value: 10 }
            },
            templateUrl: function (params) {
                return "../Contract/ExistingCustomer/" + params.id
            }
        })
        .state("alldeliveries", {
            url: "/alldeliveries",
            templateUrl: "../OL_Delivery/Delivery/Index",
            controller: "deliverycontroller",
        })
        .state("receivedelivery", {
            url: "/receivedelivery",
            params: {
                order: { value: 0 }
            },
            templateUrl: "../OL_Delivery/Delivery/ReceiveOrder",
            controller: "receivecontroller",
        })
        .state("configureuser", {
            url: "/configureuser/:id",
            params: {
                id: { value: 5 }
            },
            templateUrl: function (params) {
                return "../User/Configure/" + params.id
            },
        });
}

app.config(config)
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$state = $state;
    }]);