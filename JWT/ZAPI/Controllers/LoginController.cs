using JWT.Helpers;
using JWT.Authorization;
using ZAPI.Authorize;
using ZAPI.ExceptionFilters;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Transactions;
using System.Web.Http;
using System.Web.Http.Cors;
using ZMail.Managers;
using LDOAPI.Controllers;

namespace ZAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    [ZExceptionFilter]
    public class LoginController : ApiController
    {
        [HttpPost]
        [ActionName("ValidateUser")]
        public Tuple<string, string> ValidateUser([FromBody]JObject json)
        {
            try
            {
                string ldo = Convert.ToString(json["ldo"]);
                string IpAddress = Convert.ToString(json["IpAddress"]);
                OnlineToken userToken = new TokenHelper().GetUserToken<OnlineToken>(ldo);
                Validate vmgr = new Validate();
                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();

                //var user = db.PortalUsers.Find(userToken.Id);

                //if (user != null && user.ChangePassword)
                //{
                //    string tempToken = vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, Ip = IpAddress, hasAccepted = user.hasAccepted, hasAcceptedCircular = userToken.hasAcceptedCircular, Expiry = DateTime.Now.AddMinutes(AppConfManager.InternalKeepAlive) });
                //    return new Tuple<string, string>(user.EmailId, tempToken);
                //}

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }
        }

        [HttpPost]
        [ActionName("ValidateActivationUser")]
        public Tuple<string, string> ValidateActivationUser([FromBody]JObject json)
        {
            try
            {
                string ldo = Convert.ToString(json["ldo"]);
                string IpAddress = Convert.ToString(json["IpAddress"]);
                OnlineToken userToken = new TokenHelper().GetUserToken<OnlineToken>(ldo);
                Validate vmgr = new Validate();
                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();

                //var user = db.PortalUsers.Find(userToken.Id);

                //if (user != null && user.isLocked == true)
                //{
                //    string tempToken = vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, Ip = IpAddress, hasAccepted = user.hasAccepted, Expiry = DateTime.Now.AddMinutes(AppConfManager.InternalKeepAlive) });
                //    return new Tuple<string, string>(user.EmailId, tempToken);
                //}

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }
        }

        [HttpPost]
        [ActionName("SaveNewUser")]
        public string SaveNewUser([FromBody]JObject json)
        {
            try
            {
                string token = Convert.ToString(json["Token"]);
                string ipAddress = Convert.ToString(json["IpAddress"]);

                Validate vmgr = new Validate();
                var userToken = vmgr.ValidateTokenData(token, ipAddress, false);
                int userId = userToken.Id;

                string password = Convert.ToString(json["Password"]);

                using (TransactionScope scope = new TransactionScope())
                {
                    //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();
                    //var user = db.PortalUsers.Find(userId);
                    ////if (user.isLocked == true)
                    ////{
                    //password = vmgr.GenerateHash(password);
                    //user.Password = password;
                    //user.ChangePassword = false;
                    //user.isLocked = false;
                    //db.Entry(user).State = EntityState.Modified;
                    //db.SaveChanges();
                    //scope.Complete();
                    //return user.EmailId;
                    //}
                }

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
        }

        [HttpPost]
        [ActionName("Login")]
        public string Login([FromBody]JObject json)
        {
            try
            {
                string emailId = Convert.ToString(json["EmailId"]);
                string password = Convert.ToString(json["Password"]);
                string ipAddress = Convert.ToString(json["IpAddress"]);
                Validate vmgr = new Validate();

                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();
                //var user = db.PortalUsers.Where(x => x.EmailId == emailId && x.isActive == true && x.Supply == true && x.isLocked == false).FirstOrDefault();
                //if (user != null)
                //{
                //    //var pendingNotifications = db.DET_PortalUser_Notification.Where(x => x.PortalUserId == user.Id && x.hasAccepted == false).FirstOrDefault();
                //    //bool hasPendingNotifications = false;
                //    //if (pendingNotifications != null)
                //    //    hasPendingNotifications = true;

                //    password = new Validate().GenerateHash(password);
                //    if (password.Equals(user.Password))
                //    {
                //        user.Attempts = 0;
                //        user.ModifiedOn = DateTime.Now;
                //        db.Entry(user).State = EntityState.Modified;
                //        db.SaveChanges();

                //        db.PortalUser_Log.Add(new Models.PortalUser_Log() { PortalUserId = user.Id, IpAddress = ipAddress, LogType = (int)EnumLogType.Login, CreatedOn = DateTime.Now });
                //        db.SaveChanges();

                //        return vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, hasAccepted = user.hasAccepted, Ip = ipAddress, Expiry = DateTime.Now.AddMinutes(ApiConfigManager.OOKeepAliveTime) });
                //    }
                //    else
                //    {
                //        int attempts = (byte)user.Attempts;
                //        if ((DateTime.Now - user.ModifiedOn).Minutes < ApiConfigManager.Timeout)
                //            user.Attempts = Convert.ToByte(attempts + 1);
                //        else
                //            user.Attempts = 1;

                //        if (user.Attempts == ApiConfigManager.MaximumNumberOfAttempts)
                //        {
                //            user.isLocked = true;
                //            user.Attempts = 0;

                //            // Send Email
                //            string token = vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, hasAccepted = user.hasAccepted, Ip = ipAddress, Expiry = DateTime.Now.AddMinutes(AppConfManager.EmailKeepAliveTime) });
                //            string url = String.Format("{0}/Login/Access/{1}/", AppConfManager.OnlineOrderingBaseUrl, Uri.EscapeUriString(token));
                //            MailManager mailMgr = new MailManager();
                //            //bool result = mailMgr.SendEmail(user.EmailId, url);

                //        }

                //        user.ModifiedOn = DateTime.Now;
                //        db.Entry(user).State = EntityState.Modified;
                //        db.SaveChanges();

                //    }

                //}

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
        }

        [HttpPost]
        [ActionName("Login1")]
        public string Login1([FromBody]JObject json)
        {
            try
            {
                string emailId = Convert.ToString(json["EmailId"]);
                string password = Convert.ToString(json["Password"]);
                string ipAddress = Convert.ToString(json["IpAddress"]);
                Validate vmgr = new Validate();

                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();
                //var user = db.PortalUsers.Where(x => x.EmailId == emailId && x.isActive == true && x.LpgBulk == true && x.isLocked == false).FirstOrDefault();
                //if (user != null)
                //{
                //    //var pendingNotifications = db.DET_PortalUser_Notification.Where(x => x.PortalUserId == user.Id && x.hasAccepted == false).FirstOrDefault();
                //    //bool hasPendingNotifications = false;
                //    //if (pendingNotifications != null)
                //    //    hasPendingNotifications = true;

                //    password = new Validate().GenerateHash(password);
                //    if (password.Equals(user.Password))
                //    {
                //        user.Attempts = 0;
                //        user.ModifiedOn = DateTime.Now;
                //        db.Entry(user).State = EntityState.Modified;
                //        db.SaveChanges();

                //        db.PortalUser_Log.Add(new PortalUser_Log() { PortalUserId = user.Id, IpAddress = ipAddress, LogType = (int)EnumLogType.Login, CreatedOn = DateTime.Now });
                //        db.SaveChanges();
                //        return vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, hasAccepted = user.hasAccepted, Ip = ipAddress, Expiry = DateTime.Now.AddMinutes(ApiConfigManager.OOKeepAliveTime) });
                //    }
                //    else
                //    {
                //        int attempts = (byte)user.Attempts;
                //        if ((DateTime.Now - user.ModifiedOn).Minutes < ApiConfigManager.Timeout)
                //            user.Attempts = Convert.ToByte(attempts + 1);
                //        else
                //            user.Attempts = 1;

                //        if (user.Attempts == ApiConfigManager.MaximumNumberOfAttempts)
                //        {
                //            user.isLocked = true;
                //            user.Attempts = 0;
                //            // Send Email
                //            string token = vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, hasAccepted = user.hasAccepted, Ip = ipAddress, Expiry = DateTime.Now.AddMinutes(AppConfManager.EmailKeepAliveTime) });
                //            string url = String.Format("{0}/Login/Access/{1}/", AppConfManager.OnlineOrderingBaseUrl, Uri.EscapeUriString(token));
                //            MailManager mailMgr = new MailManager();
                //            //bool result = mailMgr.SendEmail(user.EmailId, url);

                //        }

                //        user.ModifiedOn = DateTime.Now;
                //        db.Entry(user).State = EntityState.Modified;
                //        db.SaveChanges();

                //    }

                //}

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
        }
        
        [HttpPost]
        [ActionName("IsLoggedIn")]
        public string IsLoggedIn([FromBody]JObject json)
        {
            try
            {
                string token = Convert.ToString(json["Token"]);
                string ipAddress = Convert.ToString(json["IpAddress"]);

                Validate vmgr = new Validate();
                var userToken = vmgr.ValidateTokenData(token, ipAddress, false);
                int userId = userToken.Id;

                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();
                //var user = db.PortalUsers.Where(x => x.Id == userId && x.isActive == true && x.Supply == true && x.isLocked == false).FirstOrDefault();

                //if (user != null)
                //    return vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, Ip = ipAddress, hasAccepted = user.hasAccepted, hasAcceptedCircular = userToken.hasAcceptedCircular, Expiry = DateTime.Now.AddMinutes(ApiConfigManager.OOKeepAliveTime) });

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
        }
        
        [HttpPost]
        [ActionName("IsLoggedIn1")]
        public string IsLoggedIn1([FromBody]JObject json)
        {
            try
            {
                string token = Convert.ToString(json["Token"]);
                string ipAddress = Convert.ToString(json["IpAddress"]);

                Validate vmgr = new Validate();
                var userToken = vmgr.ValidateTokenData(token, ipAddress, false);
                int userId = userToken.Id;

                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();
                //var user = db.PortalUsers.Where(x => x.Id == userId && x.isActive == true && x.LpgBulk == true && x.isLocked == false).FirstOrDefault();

                //if (user != null)
                //    return vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, Ip = ipAddress, hasAccepted = user.hasAccepted, hasAcceptedCircular = userToken.hasAcceptedCircular, Expiry = DateTime.Now.AddMinutes(ApiConfigManager.OOKeepAliveTime) });

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
        }

        [HttpPost]
        [ActionName("UserManage")]
        public string UserManage([FromBody]JObject json)
        {
            try
            {
                string token = Convert.ToString(json["Token"]);
                string ipAddress = Convert.ToString(json["IpAddress"]);

                Validate vmgr = new Validate();
                token = vmgr.ExtendToken(vmgr.ValidateTokenData(token, ipAddress));

                return token;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage((HttpStatusCode)Enum.Parse(typeof(HttpStatusCode), ex.Message)));
            }
        }

        [HttpPost]
        [ActionName("ResetPassword")]
        public bool ResetPassword([FromBody]JObject json)
        {
            try
            {
                string emailId = Convert.ToString(json["EmailId"]);
                Validate vmgr = new Validate();
                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();
                //var user = db.PortalUsers.Where(x => x.EmailId == emailId && x.isActive == true && x.Supply == true).FirstOrDefault();
                //if (user != null)
                //{
                //    //user.isLocked = true;
                //    user.ChangePassword = true;
                //    user.Attempts = 0;
                //    db.Entry(user).State = EntityState.Modified;
                //    db.SaveChanges();

                //    string token = vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, hasAccepted = user.hasAccepted, Expiry = DateTime.Now.AddMinutes(AppConfManager.EmailKeepAliveTime) });
                //    string url = String.Format("{0}/Login/Access/{1}/", AppConfManager.OnlineOrderingBaseUrl, Uri.EscapeUriString(token));
                //    ResetPasswordEmail(user.Id, url);
                //    return true;
                //}
                return false;
            }
            catch (Exception ex)
            {
                OrController orderingcontroller = new OrController();
                orderingcontroller.WriteLogError(ex.Message);
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
        }

        [HttpPost]
        [ActionName("ResetPassword1")]
        public bool ResetPassword1([FromBody]JObject json)
        {
            try
            {
                string emailId = Convert.ToString(json["EmailId"]);
                Validate vmgr = new Validate();
                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();
                //var user = db.PortalUsers.Where(x => x.EmailId == emailId && x.isActive == true && x.LpgBulk == true).FirstOrDefault();
                //if (user != null)
                //{
                //    //user.isLocked = true;
                //    user.ChangePassword = true;
                //    user.Attempts = 0;
                //    db.Entry(user).State = EntityState.Modified;
                //    db.SaveChanges();

                //    string token = vmgr.ExtendTokenAsIs(new OnlineToken() { Id = user.Id, hasAccepted = user.hasAccepted, Expiry = DateTime.Now.AddMinutes(AppConfManager.EmailKeepAliveTime) });
                //    string url = String.Format("{0}/Login/access/{1}/", AppConfManager.OnlineOrderingLPGBaseUrl, Uri.EscapeUriString(token));
                //    LPGResetPasswordEmail(user.Id, url);
                //    return true;
                //}
                return false;
            }
            catch (Exception ex)
            {
                OrController orderingcontroller = new OrController();
                orderingcontroller.WriteLogError(ex.Message);
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
        }
        
        public bool ResetPasswordEmail(int userId, string url)
        {
            try
            {
                return false;
                OrController orderingcontroller = new OrController();
                //WOQ_DMS_NewEntities dc = new WOQ_DMS_NewEntities();
                MailManager mgr = new MailManager();
                //var systemUser = dc.AspNetUsers.Where(x => x.Email.Equals(ApiConfigManager.SystemUserEmail)).FirstOrDefault();
                //var userinfo = dc.PortalUserSites.Where(x => x.PortalUserId == userId).FirstOrDefault();
                //if (userinfo == null)
                //{
                //    throw new Exception("Portal user not found");
                //}
                //var template = dc.EventNotifications.AsEnumerable().Where(a => a.Id == Convert.ToInt32(MailBodies.ResetPassword)).FirstOrDefault();
                //if (userinfo == null)
                //{
                //    throw new Exception("Template not found");
                //}
                //var Subject = template.Subject;
                //string body = string.Empty;
                //using (StreamReader reader = new StreamReader(mgr.GenerateStreamFromString(template.Template)))
                //{
                //    body = reader.ReadToEnd();
                //}
                //body = body.Replace("{customername}", userinfo.PortalUser.FullName);
                //body = body.Replace("{petrolstation}", userinfo.SitesERP.NAME);
                //body = body.Replace("{url}", url);
                //List<string> To = new List<string>();
                //To.Add(userinfo.PortalUser.EmailId);
                //List<string> CC = new List<string>();
                //List<string> BCC = new List<string>();
                //return mgr.EmailQueueing(To, AppConfManager.FromEmailId, CC, BCC, Subject, body, systemUser.UId, (byte)EnumEmailStatus.ReadyToSend);
            }
            catch (Exception ex)
            {
                OrController orderingcontroller = new OrController();
                orderingcontroller.WriteLogError(ex.Message);
                throw;
            }

        }

        // GET: api/Login
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Login/5
        public string Get(int id)
        {
            return "value";
        }
        
    }

    public enum EnumLogType
    {
        None = 0,
        Register = 1,
        Login = 2,
        Logout = 3,
        LinkUsed = 4
    }
}
