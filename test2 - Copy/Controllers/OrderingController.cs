using Microsoft.AspNetCore.Mvc;
using OrderingClassLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LDOBulkOrdering.Helper;
using LDOBulkOrdering.REST;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Options;

namespace LPGOrdering.Controllers
{
    public class OrderingController : Controller
    {
        private readonly IOptions<AppSettingsManager> config;
        public OrderingController(IOptions<AppSettingsManager> optionsAccessor)
        {
            this.config = optionsAccessor;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult OrderPlaced()
        {
            return View();
        }

        public ActionResult Confirm()
        {
            return View();
        }

        public ActionResult ConfirmDismiss()
        {
            return View();
        }

        public ActionResult ConfirmSubmit()
        {
            return View();
        }

        public ActionResult NewOrder()
        {
            return View();
        }

        public ActionResult ChangeOrder()
        {
            return View();
        }

        public ActionResult Reports()
        {
            return View();
        }

        public ActionResult ViewallOrderscalendar()
        {
            return View();
        }

        public async Task<JsonResult> GetSiteOrderList()
        {
            try
            {
                string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
                if (!String.IsNullOrWhiteSpace(token))
                {
                    OrderingService service = new OrderingService(config);
                    var result = await service.GetSiteOrderList(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    new CookieManager(config).SetCookie(HttpContext, result.Item4);
                    return Json(new Tuple<List<DayInfo>, dynamic, string>(result.Item1, result.Item2, result.Item3));
                }
                throw new Exception(config.Value.BadRequest);
            }
            catch (Exception ex)
            {
                //new CookieManager().RemoveCookie(HttpContext);
                return Json(null);
            }
        }
        public async Task<JsonResult> GetCustomerBasicInformation()
        {
            try
            {
                string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
                if (!String.IsNullOrWhiteSpace(token))
                {
                    OrderingService service = new OrderingService(config);
                    var result = await service.GetCustomerBasicInformation(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    new CookieManager(config).SetCookie(HttpContext, result.Item2);
                    return Json(new Tuple<List<OnlineUserInfo>>(result.Item1));
                }
                throw new Exception(config.Value.BadRequest);
            }
            catch (Exception ex)
            {
                //new CookieManager().RemoveCookie(HttpContext);
                return Json(null);
            }
        }

        public async Task<JsonResult> GetCreditLimit()
        {
            try
            {
                string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
                if (!String.IsNullOrWhiteSpace(token))
                {
                    OrderingService service = new OrderingService(config);
                    var result = await service.GetCreditLimit(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    new CookieManager(config).SetCookie(HttpContext, result.Item2);
                    return Json(new Tuple<CreditLimitInfo>(result.Item1));
                }
                throw new Exception(config.Value.BadRequest);
            }
            catch (Exception ex)
            {
                //new CookieManager().RemoveCookie(HttpContext);
                return Json(null);
            }
        }

        public async Task<JsonResult> GetDataForNewOrder(DateTime date)
        {
            try
            {
                string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
                if (!String.IsNullOrWhiteSpace(token))
                {
                    OrderingService service = new OrderingService(config);
                    var result = await service.GetDataForNewOrder(date, token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    new CookieManager(config).SetCookie(HttpContext, result.Item4);
                    return Json(new Tuple<List<DayInfo>, dynamic, string>(result.Item1, result.Item2, result.Item3));
                }
                throw new Exception(config.Value.BadRequest);
            }
            catch (Exception ex)
            {
                //new CookieManager().RemoveCookie(HttpContext);
                return Json(null);
            }
        }

        public async Task<JsonResult> SaveNewOrder(List<NewOrderInfo> orders, DateTime date, bool hasAgreed)
        {
            try
            {
                if (hasAgreed)
                {
                    string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
                    if (!String.IsNullOrWhiteSpace(token))
                    {
                        OrderingService service = new OrderingService(config);
                        var result = await service.SaveNewOrder(orders, date, token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                        new CookieManager(config).SetCookie(HttpContext, result.Item2);
                        return Json(new Tuple<bool, string>(result.Item1, result.Item2));
                    }
                }
                throw new Exception(config.Value.BadRequest);
            }
            catch (Exception ex)
            {
                //new CookieManager().RemoveCookie(HttpContext);
                return Json(null);
            }
        }

        public async Task<JsonResult> UpdateUserAgreementStatus()
        {
            try
            {
                string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
                if (!String.IsNullOrWhiteSpace(token))
                {
                    OrderingService service = new OrderingService(config);
                    var result = await service.UpdateUserAgreementStatus(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    new CookieManager(config).SetCookie(HttpContext, result.Item2);
                    return Json(result.Item1);
                }
                throw new Exception(config.Value.BadRequest);
            }
            catch (Exception ex)
            {
                //new CookieManager().RemoveCookie(HttpContext);
                return Json(null);
            }
        }

        public ActionResult ContactUs()
        {
            return View();
        }

        public ActionResult FAQ()
        {
            return View();
        }



    }




}