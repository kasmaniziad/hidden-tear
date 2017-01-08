using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LDOBulkOrdering.Helper
{
    public class CookieManager
    {
        private readonly IOptions<AppSettingsManager> config;
        public CookieManager(IOptions<AppSettingsManager> options)
        {
            this.config = options;
        }

        public void SetCookie(HttpContext context, string value)
        {
            CookieOptions options = new CookieOptions();
            options.Expires = DateTime.Now.AddHours(1);
            context.Response.Cookies.Append(config.Value.CookieKey, value, options);
        }

        public void RemoveCookie(HttpContext context)
        {
            CookieOptions options = new CookieOptions();
            options.Expires = DateTime.Now.AddHours(-1);
            context.Response.Cookies.Delete(config.Value.CookieKey);
        }

        public string GetTokenFromCookie(HttpContext context)
        {
            var obj = context.Request.Cookies[config.Value.CookieKey];
            if (obj != null)
                return obj;
            else
                throw new Exception(config.Value.CookieNotFound);
                
        }
    }
}