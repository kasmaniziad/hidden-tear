using JWT.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZAPI.Helper
{
    public class ApiCookieManager
    {
        public void SetCookie(HttpContext context, string value, string cookieKey)
        {
            var cookie = new HttpCookie(cookieKey, value);
            cookie.Expires = DateTime.Now.AddHours(1);
            context.Response.SetCookie(cookie);
        }

        public void RemoveCookie(HttpContext context, string cookieKey)
        {
            var cookie = new HttpCookie(cookieKey, String.Empty);
            cookie.Expires = DateTime.Now.AddHours(-1);
            context.Response.SetCookie(cookie);
        }

        public string GetTokenFromCookie(HttpContext context, string cookieKey)
        {
            var obj = context.Request.Cookies[cookieKey];
            if (obj != null)
                return obj.Value;
            else
                throw new Exception(AppConfManager.CookieNotFound);

        }
    }
}