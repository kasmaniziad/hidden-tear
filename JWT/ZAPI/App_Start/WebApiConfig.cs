using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using ZAPI.ExceptionFilters;

namespace ZAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors(); // Microsoft.Aspnet.webapi.cors

            config.Filters.Add(new ZExceptionFilter());

            // Web API routes
            config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
                "ControllerAndAction",
                "api/{controller}/{action}/{id}",
                new { id = RouteParameter.Optional }

            );
        }
    }
}
