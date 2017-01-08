using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using LDOBulkOrdering.Helper;
using LDOBulkOrdering.REST;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Options;
using OrderingClassLibrary;

namespace LPGOrdering.Controllers
{
    public class LoginController : Controller
    {

        private readonly IOptions<AppSettingsManager> config;

        public LoginController(IOptions<AppSettingsManager> optionsAccessor)
        {
            this.config = optionsAccessor;
        }

        public JsonResult Logout()
        {
            new CookieManager(config).RemoveCookie(HttpContext);
            return Json(true);
        }

        public ActionResult CustomModal()
        {
            return View();
        }

        public async Task<JsonResult> ResetPassword([FromBody]UserAuthInfo info)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(info.EmailId))
                {
                    LoginService service = new LoginService(config);
                    var result = await service.ResetPassword(info.EmailId, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    return Json(result);
                }
                throw new Exception(config.Value.BadRequest);
            }
            catch (Exception ex)
            {
                return Json(false);
            }
        }

        public ActionResult ErrorMessage(string msg)
        {
            return View();
        }

        //public async Task<ActionResult> Default(string ldo)
        //{
        //    //try
        //    //{
        //    //    string token = new CookieManager().GetTokenFromCookie(HttpContext);
        //    //    if (!String.IsNullOrWhiteSpace(token))
        //    //    {
        //    //        LoginService service = new LoginService();
        //    //        var result = await service.IsLoggedIn(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
        //    //        new CookieManager().SetCookie(HttpContext, result);
        //    //        return RedirectToAction("UserProfile", "Home");
        //    //    }
        //    //    return View((object)ldo);
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    return View((object)ldo);
        //    //}

        //}

        public async Task<JsonResult> IsLoggedIn()
        {
            try
            {
                string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
                if (!String.IsNullOrWhiteSpace(token))
                {
                    LoginService service = new LoginService(config);
                    var result = await service.IsLoggedIn(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    new CookieManager(config).SetCookie(HttpContext, result);
                    return Json(true);
                }
                return Json(false);
            }
            catch (Exception ex)
            {
                return Json(false);
            }
        }

        public ActionResult DefaultA2()
        {
            return View();
        }

        public ActionResult LoginContent(string ldo)
        {
            return View((object)ldo);
        }


        public async Task<ActionResult> TermsAndConditions()
        {
            string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
            if (!String.IsNullOrWhiteSpace(token))
            {
                LoginService service = new LoginService(config);
                var result = await service.IsLoggedIn(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                new CookieManager(config).SetCookie(HttpContext, result);
                return View();
            }
            return RedirectToAction("Default", "Login");
        }

        public async Task<ActionResult> TermsAndConditionsView()
        {
            string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
            if (!String.IsNullOrWhiteSpace(token))
            {
                LoginService service = new LoginService(config);
                var result = await service.IsLoggedIn(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                new CookieManager(config).SetCookie(HttpContext, result);
                return View();
            }
            return RedirectToAction("Default", "Login");
        }


        public ActionResult StayConnected()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Authenticate([FromBody]UserAuthInfo info)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(info.EmailId) && !String.IsNullOrWhiteSpace(info.Password))
                {
                    LoginService service = new LoginService(config);
                    var result = await service.LoginUser(HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString(), info.EmailId, info.Password);
                    new CookieManager(config).SetCookie(HttpContext, result);
                    return Json(true);
                }
                throw new Exception(config.Value.BadRequest);
            }
            catch (Exception ex)
            {
                return Json(false);
            }
        }

        public async Task<ActionResult> Activate(string ldo)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(ldo))
                {
                    LoginService service = new LoginService(config);
                    var result = await service.ValidateActivationAsync(ldo, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    new CookieManager(config).SetCookie(HttpContext, result.Item2);
                    return View("Activate", (object)result.Item1);
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.Equals(config.Value.NotAuthorized))
                    return View("NotAuthorized", (object)config.Value.NotAuthorized);
                else if (ex.Message.Equals(config.Value.TokenExpired))
                    return View("NotAuthorized", (object)config.Value.LoginLinkExpired);
            }

            return RedirectToAction("NotAuthorized", (object)config.Value.NotAuthorized);
        }


        public ActionResult Access(string ldo)
        {
            //try
            //{
            //    if (!String.IsNullOrWhiteSpace(ldo))
            //    {
            //        LoginService service = new LoginService();
            //        var result = await service.ValidateAsync(ldo, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
            //        new CookieManager().SetCookie(HttpContext, result.Item2);
            return View();
            ////    }
            ////}
            //catch (Exception ex)
            //{
            //    if (ex.Message.Equals(AppConfigManager.NotAuthorized))
            //        return View("NotAuthorized", (object)AppConfigManager.NotAuthorized);
            //    else if (ex.Message.Equals(AppConfigManager.TokenExpired))
            //        return View("NotAuthorized", (object)AppConfigManager.LoginLinkExpired);
            //}

            //return View("NotAuthorized", (object)AppConfigManager.NotAuthorized);
        }

        public async Task<JsonResult> GetTokenEmail(string ldo)
        {
            try
            {
                if (!String.IsNullOrWhiteSpace(ldo))
                {
                    LoginService service = new LoginService(config);
                    var result = await service.ValidateAsync(ldo, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString());
                    new CookieManager(config).SetCookie(HttpContext, result.Item2);
                    return Json(result.Item1);
                }
                return Json(false);
            }
            catch (Exception ex)
            {
                return Json(false);
            }
        }

        public async Task<JsonResult> SaveUser(string password, string confirmPassword)
        {
            try
            {
                if (!String.IsNullOrEmpty(password) && !String.IsNullOrEmpty(confirmPassword) && password.Equals(confirmPassword))
                {
                    string token = new CookieManager(config).GetTokenFromCookie(HttpContext);
                    LoginService service = new LoginService(config);
                    var result = await service.SaveUser(token, HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString(), password);
                    new CookieManager(config).RemoveCookie(HttpContext);
                    return Json(result);
                }

                throw new Exception(config.Value.NotAuthorized);
            }
            catch (Exception ex)
            {
                return Json(false);
            }

        }

        public ActionResult NotAuthorized()
        {
            return View();
        }
    }
}