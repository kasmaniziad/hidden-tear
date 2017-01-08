using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LDOBulkOrdering.Helper;
using LDOBulkOrdering.REST;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNet.Http.Features;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;

namespace LPGOrdering.Controllers
{
    public class HomeController : Controller
    {
        private readonly IOptions<AppSettingsManager> config;

        public HomeController(IOptions<AppSettingsManager> optionsAccessor)
        {
            this.config = optionsAccessor;
        }

        //[OnlineOrderingExceptionFilter]
        public ActionResult UserProfile()
        {
            return View();
        }

        public ActionResult WaitTemplate()
        {
            return View();
        }

        public async Task<ActionResult> Manage()
        {
            string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
            if (!String.IsNullOrWhiteSpace(token))
            {
                OrderService service = new OrderService(config);
                var result = await service.GetSiteList(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                new CookieManager(config).SetCookie(HttpContext, result.Item3);
                return View(new Tuple<List<SiteInfo>, List<ShiftInfo>>(result.Item1, result.Item2));
            }

            new CookieManager(config).RemoveCookie(HttpContext);
            throw new Exception(String.Empty);
        }

        public async Task<JsonResult> GetProductsBySiteNumber(int siteNumber)
        {
            string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
            if (!String.IsNullOrWhiteSpace(token))
            {
                OrderService service = new OrderService(config);
                var result = await service.GetProductList(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString(), siteNumber);
                new CookieManager(config).SetCookie(HttpContext, result.Item2);
                return Json(result.Item1);
            }
            new CookieManager(config).RemoveCookie(HttpContext);
            throw new Exception(config.Value.BadRequest);
        }

        public async Task<JsonResult> PlaceOrder(OrderInfo info)
        {
            string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
            if (!String.IsNullOrWhiteSpace(token) && info.RequestedOn.Date >= DateTime.Now.Date)
            {
                OrderService service = new OrderService(config);
                var result = await service.PlaceOrder(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString(), info);
                new CookieManager(config).SetCookie(HttpContext, result.Item2);
                return Json(result.Item1);
            }

            new CookieManager(config).RemoveCookie(HttpContext);
            throw new Exception(config.Value.BadRequest);
        }
    }
}