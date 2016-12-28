using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using ZAPI.ExceptionFilters;
using ZResource.Managers;

namespace ZAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    [ZExceptionFilter]
    public class FileController : ApiController
    {
        [HttpPost]
        [ActionName("Download")]
        public PortalResourceInfo Download([FromBody]JObject json)
        {

            string originalFileName = Convert.ToString(json["OriginalFileName"]);

            ResourceManager mgr = new ResourceManager();
            var res = mgr.GetResourceWithFileType(originalFileName);
            PortalResourceInfo info = new PortalResourceInfo()
            {
                Data = res.Data,
                DataUrl = res.DataUrl,
                FileExtension = res.FileExtension,
                OriginalFileName = res.OriginalFileName,
                SystemFileName = res.SystemFileName
            };

            return info;
        }

        private Random random = new Random();
        public string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }

    public class PortalResourceInfo
    {
        public Guid ResourceId { get; set; }
        public string SystemFileName { get; set; }
        public string OriginalFileName { get; set; }
        public string FileExtension { get; set; }
        public string DataUrl { get; set; }
        public byte[] Data { get; set; }

    }
}
