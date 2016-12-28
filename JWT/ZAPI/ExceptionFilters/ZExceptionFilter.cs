using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Filters;

namespace ZAPI.ExceptionFilters
{
    public class ZExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception.Message.Equals(Convert.ToString((int)HttpStatusCode.Forbidden)))
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }
        }
    }
}