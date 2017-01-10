$(document).ready(function () {
	
	if( document.all && window.atob){ // if ie10
        $('body').addClass("ie10");
    }
    else if (navigator.userAgent.match(/Trident.*rv:11\./)) {$('body').addClass("ie11");}
    else if(document.all && document.addEventListener && !window.atob){$('body').addClass("ie9");}
    
    
    
    //get window height
    var windowHeight = window.innerHeight;
    $("#homeCont").height(windowHeight);

    //adjust window height
    $(window).resize(function () { windowHeight = window.innerHeight; $("#homeCont").height(windowHeight); })    
    
    //get culture
    var globalCulture = window.location.pathname.split("/")[1].toLowerCase();
    
    //remove zero width space from SP rich HTML editor
   	$("div[id*='RichHtmlField'] p").each(function() {
   	
  		if( ($(this).text().replace(/\u200B/g,'').length)==0 && ($(this).html().length < 3))
  		{
  		
  			$(this).remove();
  		}
  		
	});
    
    
    
    //main menu nav
	$("#mainMenuCont ul[id*='RootAspMenu'] > li > ul > li.static").slice( 6 ).wrapAll("<div class='menuCol'>");
	$("#mainMenuCont ul[id*='RootAspMenu'] > li > ul > li.static").slice( 3 ).wrapAll("<div class='menuCol'>");
	$("#mainMenuCont ul[id*='RootAspMenu'] > li > ul > li.static").slice( 0 ).wrapAll("<div class='menuCol'>");  
	
	$("#siteMap ul[id*='RootAspMenu'] > li > ul > li.static").slice( 6 ).wrapAll("<div class='menuCol'>");
	$("#siteMap ul[id*='RootAspMenu'] > li > ul > li.static").slice( 3 ).wrapAll("<div class='menuCol'>");
	$("#siteMap ul[id*='RootAspMenu'] > li > ul > li.static").slice( 0 ).wrapAll("<div class='menuCol'>");       
	
    
	

    //right Items
    $("#rightItemsCont .rightItem-1").click(function () { // open business with woqod
        if (!$(this).hasClass("active"))
        {
        	// check if left tab opend (UAT)
	        if ($("#leftTabsCont").hasClass("hasActive")) 
	        {
	            $('#leftTabsCont .tabNode.active').removeClass('active');
	            $('#leftTabsCont .tab-content .tab-pane.active').removeClass('active');
	            $('#leftTabsCont').removeClass('hasActive');
	        }
        
          	$("#rightItemsCont .rightItem-2 .closerightItem").attr("title",$("[id*='openTranslatedField']").attr("value"));
            $("#rightItemsCont .rightItem-2").removeClass("active");
            $(this).addClass("active");
			$(this).children('.closerightItem').attr("title",$("[id*='closeTranslatedField']").attr("value"));
            $("#rightItemsCont").addClass("hasActive");
            // scroll top in mobile
            if ($(window).width() < 990)
            {
                $('html, body').animate({
                    scrollTop: $("#rightItemsCont .closerightItem1").offset().top
                }, 1000);
            }
          
		  
        }
        
        

            
    })

    $("#rightItemsCont .rightItem-2").click(function () { // open Journy with woqod 
        if (!$(this).hasClass("active"))
        {
        
        	// check if left tab opend (UAT)
	        if ($("#leftTabsCont").hasClass("hasActive")) 
	        {
	            $('#leftTabsCont .tabNode.active').removeClass('active');
	            $('#leftTabsCont .tab-content .tab-pane.active').removeClass('active');
	            $('#leftTabsCont').removeClass('hasActive');
	        }
        
        	$("#rightItemsCont .rightItem-1 .closerightItem").attr("title",$("[id*='openTranslatedField']").attr("value"));
            $("#rightItemsCont .rightItem-1").removeClass("active");
            $(this).addClass("active");
            $(this).children('.closerightItem').attr("title",$("[id*='closeTranslatedField']").attr("value"));
            $("#rightItemsCont").addClass("hasActive");

            // scroll top in mobile
            if ($(window).width() < 990) {
                $('html, body').animate({
                    scrollTop: $("#rightItemsCont .closerightItem2").offset().top
                }, 1000);
            }
            
            setTimeout(function () {
               $("#homePromotion").show();
               $("#homePromotion").owlCarousel({
            	nav: true,
            	
            		items: 1,
            		rtl: SP.PageContextInfo.get_webLanguage() == 1033 ? false : true,                	

            	});
            }, 1000);

		
			
            


        }
    })

    $("#rightItemsCont .rightItem-1 .closerightItem").click(function (event) { // close business with woqod 
        if ($("#rightItemsCont .rightItem-1").hasClass("active"))
        {
            $("#rightItemsCont .rightItem-1 .closerightItem").attr("title",$("[id*='openTranslatedField']").attr("value"));
            $("#rightItemsCont .rightItem-1").removeClass("active");
            $("#rightItemsCont").removeClass("hasActive");
            event.stopPropagation()
        }
    })

    $("#rightItemsCont .rightItem-2 .closerightItem").click(function (event) { // close Journy with woqod 
        if ($("#rightItemsCont .rightItem-2").hasClass("active")) {
        
        ClearForm();// clear and refresh the form before close
        	$("#rightItemsCont .rightItem-2 .closerightItem").attr("title",$("[id*='openTranslatedField']").attr("value"));
            $("#rightItemsCont .rightItem-2").removeClass("active");
            $("#rightItemsCont").removeClass("hasActive");
            
            
            
            event.stopPropagation()
        }
    })

    $("#s4-workspace").mouseup(function (e) { // bind mouse click on document
        var container = $("#rightItemsCont .rightItem.active");
       // var modalContainer = $(".fancybox-overlay");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
        	$("#rightItemsCont .rightItem-2 .closerightItem, #rightItemsCont .rightItem-1 .closerightItem").attr("title",$("[id*='openTranslatedField']").attr("value"));
            $("#rightItemsCont .rightItem").removeClass("active");
            $("#rightItemsCont").removeClass("hasActive");
        }
    });
	
	//to trim after click on left tabs
	function applyDotDotDotTriming(){
		
		if($(".dotdotdot").length>0)
		{
				
				
				
			$(".dotdotdot").dotdotdot({
				watch: "window",
				callback	: function( isTruncated, orgContent ) {
					$(".dotdotdot").css('opacity','1');				
				}

			});
		}

	}

	

    //left tabs
    $("#leftTabsCont .tabLink").click(function(event){
    	
    	
        $("#leftTabsCont").addClass("hasActive");
        $(".dotdotdot").css('opacity','0');//added by mina gerges
        setTimeout(function(){ applyDotDotDotTriming()},10);
		setTimeout(function(){$("#s4-workspace").stripZWSP()},2);
		
        if ($(this).parent().hasClass("active")) {
            
            $('#leftTabsCont .tabNode.active').removeClass('active');
            $('#leftTabsCont .tab-content .tab-pane.active').removeClass('active');
            $('#leftTabsCont').removeClass('hasActive');
            event.stopPropagation();
        }
    })

    $("#leftTabsCont .closePane").click(function (event) {
        if ($(this).parent().hasClass("active")) {

            $('#leftTabsCont .tabNode.active').removeClass('active');
            $('#leftTabsCont .tab-content .tab-pane.active').removeClass('active');
            $('#leftTabsCont').removeClass('hasActive');
        }
    })

        
    //menu btn
    $("#mainMenuBtn").click(function () {
        $("#mainMenuCont").fadeToggle();
        $(this).toggleClass("on");
        $("#s4-workspace").toggleClass("menuOn");
        $("body.mainBody").toggleClass("menuOn");
    });
            
    $(document).keyup(function(event) {
        if(event.which === 27 && $("#mainMenuBtn").hasClass("on")) 
        {
            $("#mainMenuBtn").click();
        }
    });
	
	
    
   //mobile left tabs plugin call
   $("#leftMobileTabs .mobileItemsCont").ferroMenu({
        position    : globalCulture == "ar" ? "left-center" : "right-center" ,
        delay       : 100,
        rotation    : 0,
        margin      : 0,
        radius		:100,
        opened		:false,
        drag		:false,
        
    });
 
   function onmenuclickclose()
   {
       $("#leftMobileTabs .mobileItemsCont").ferroMenu({
           position: globalCulture == "ar" ? "left-center" : "right-center",
           delay: 100,
           rotation: 0,
           margin: 0,
           radius: 100,
           opened: false,
           drag: false,

       });
   }
 	//hot line mobile modal
 	$("#mobileSocialAndLineCont .numberMob").click(function () {
 	    $("#hotLineMobModal").modal();
 	});
    
    //mobile left menu
    $("#leftMobileTabs .tabNode-1").click(function () {
        $("#leftTabMobileModal .modal-body").html($("#leftTab-1").html());
        $("#leftTabMobileModal .modal-title").text($("#leftTab-1 h1").text());
        $("#leftTabMobileModal").modal();
        onmenuclickclose();
    })

    $("#leftMobileTabs .tabNode-2").click(function () {
        $("#leftTabMobileModal .modal-body").html($("#leftTab-2").html());
        $("#leftTabMobileModal .modal-title").text($("#leftTab-2 h1").text());
        $("#leftTabMobileModal").modal();
        onmenuclickclose();
    })
    $("#leftMobileTabs .tabNode-3").click(function () {
        $("#leftTabMobileModal .modal-body").html($("#leftTab-3").html());
        $("#leftTabMobileModal .modal-title").text($("#leftTab-3 h1").text());
        $("#leftTabMobileModal").modal();
        onmenuclickclose();
    })
    $("#leftMobileTabs .tabNode-4").click(function () {
        $("#leftTabMobileModal .modal-body").html($("#leftTab-4").html());
        $("#leftTabMobileModal .modal-title").text($("#leftTab-4 h1").text());
        $("#leftTabMobileModal").modal();
        onmenuclickclose();
    })

    //promotion madal
    $("#homePromotion .homePromotionItem").click(function () {
        $("#promotionModal .modal-body").html($("#homePromotion .popupImgCont").html());
        $("#promotionModal .modal-title").html($("#homePromotion .promotionLbl").html());
        $("#promotionModal").modal();
        onmenuclickclose();
    });
    

// popover
    $("#homeJournyCont .lubeChange").popover({
        placement: 'top',
        content: function () {
            return '<img src="' + $(this).attr('data-img') + '" /> <div class="popoverServCont"><span>' + $(this).attr('data-text') + '</span></div><style>#homeServicesCont .lubeChange{background:url(\'/_catalogs/masterpage/xPortal/style library/common/images/xportal/backgrounds/homeServices1Hover.png\') no-repeat 0 bottom;background-size: 100%;}</style>';
        },
    });

    $("#homeJournyCont .tyreChange").popover({
        placement: 'top',
        content: function () {
            return '<img src="' + $(this).attr('data-img') + '" /> <div class="popoverServCont"><span>' + $(this).attr('data-text') + '</span></div><style>#homeServicesCont .tyreChange{background:url(\'/_catalogs/masterpage/xPortal/style library/common/images/xportal/backgrounds/homeServices2Hover.png\') no-repeat 0 bottom;background-size: 100%;}</style>';
        },
    });

    $("#homeJournyCont .autoRepair").popover({
        placement: 'top',
        content: function () {
            return '<img src="' + $(this).attr('data-img') + '" /> <div class="popoverServCont"><span>' + $(this).attr('data-text') + '</span></div><style>#homeServicesCont .autoRepair{background:url(\'/_catalogs/masterpage/xPortal/style library/common/images/xportal/backgrounds/homeServices3Hover.png\') no-repeat 0 bottom;background-size: 100%;}</style>';
        },
    });

    $("#homeJournyCont .carWashing").popover({
        placement: 'top',
        content: function () {
        if(globalCulture == "ar")
            return '<img src="' + $(this).attr('data-img') + '" /> <div class="popoverServCont"><span>' + $(this).attr('data-text') + '</span></div><style>#homeServicesCont .carWashing{background:url(\'/_catalogs/masterpage/xPortal/style library/common/images/xportal/backgrounds/homeServices4HoverAR.png\') no-repeat 0 bottom;background-size: 100%;}</style>';
        else
        	return '<img src="' + $(this).attr('data-img') + '" /> <div class="popoverServCont"><span>' + $(this).attr('data-text') + '</span></div><style>#homeServicesCont .carWashing{background:url(\'/_catalogs/masterpage/xPortal/style library/common/images/xportal/backgrounds/homeServices4Hover.png\') no-repeat 0 bottom;background-size: 100%;}</style>';
        },
    });

	
});


function addLoading(){

var selector = $(".pagination-row").closest("div[componentid]");
selector = selector.children(":first");
selector.prepend("<span class='paggingLoading'></span>");

}



