using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;
using ZAPI.ExceptionFilters;
using ZAPI.Helper;

namespace LDOAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    [ZExceptionFilter]
    public class OrController : ApiController
    {
        //[HttpPost]
        //[ActionName("GetSiteOrders")]
        //public Tuple<List<DayInfo>, dynamic, string, string> GetSiteOrders([FromBody]JObject json)
        //{
        //    try
        //    {
        //        string token = Convert.ToString(json["Token"]);
        //        string ipAddress = Convert.ToString(json["IpAddress"]);

        //        Validate vmgr = new Validate();
        //        var userToken = vmgr.ValidateTokenData(token, ipAddress);
        //        int siteId = GetSiteByUserId(userToken.Id);
        //        token = vmgr.ExtendToken(userToken);
        //        WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();

        //        var site = db.SitesERPs.Where(x => x.ID == siteId).FirstOrDefault();
        //        string siteName = site != null ? String.Format("{0} ({1})", site.NAME, site.LOCATION) : String.Empty;

        //        List<OnlineOrderInfo> lstOrderPlannings = db.Database.SqlQuery<OnlineOrderInfo>("[ordering].[GetOnlineOrdersBySite] {0}, {1}", siteId, userToken.Id).ToList();

        //        var lstDays = lstOrderPlannings.Select(x => x.ShiftDay).Distinct().ToList();

        //        var lstDistinctProducts = lstOrderPlannings.Select(x => new { x.ProductId, x.ProductName, x.ShiftDay }).Distinct().ToList();

        //        var lstShiftCaptions = lstOrderPlannings.Select(x => new { ShiftName = x.ShiftName, ActualDate = x.ShiftDay }).Distinct().ToList();

        //        List<DayInfo> days = (from day in lstDays.AsEnumerable()
        //                              select new DayInfo
        //                              {
        //                                  ActualDate = day,
        //                                  lstProducts = (from row in lstDistinctProducts.AsEnumerable()
        //                                                 where row.ShiftDay == day
        //                                                 select new ProductInfo
        //                                                 {
        //                                                     ProductId = row.ProductId,
        //                                                     ProductName = row.ProductName,
        //                                                     lstShiftData = (from shiftRow in lstOrderPlannings.AsEnumerable()
        //                                                                     where shiftRow.ProductId == row.ProductId && shiftRow.ShiftDay == day
        //                                                                     select new ShiftDataInfo
        //                                                                     {
        //                                                                         ShiftId = shiftRow.ShiftId,
        //                                                                         Quantity = shiftRow.Quantity,
        //                                                                         NoOfLoad = shiftRow.NoOfLoad,
        //                                                                         LoadCapacity = shiftRow.LoadCapacity,
        //                                                                         CanEdit = shiftRow.CanEdit,
        //                                                                         StartDate = shiftRow.StartDate,
        //                                                                         EndDate = shiftRow.EndDate
        //                                                                     }).ToList()
        //                                                 }).ToList()
        //                              }).ToList();

        //        return new Tuple<List<DayInfo>, dynamic, string, string>(days, lstShiftCaptions, siteName, token);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
        //    }
        //}

        
        //[HttpPost]
        //[ActionName("GetSearchedOrders")]
        //public Tuple<List<OnlineOrderInfo>, dynamic, string, string> GetSearchedOrders([FromBody]JObject json)
        //{
        //    try
        //    {
        //        string token = Convert.ToString(json["Token"]);
        //        string ipAddress = Convert.ToString(json["IpAddress"]);
        //        string searchString = Convert.ToString(json["SearchString"]);
        //        DateTime startDate = Convert.ToDateTime(json["StartDate"]);
        //        DateTime endDate = Convert.ToDateTime(json["EndDate"]);
        //        short productId = Convert.ToInt16(json["ProductId"]);
        //        int pageId = Convert.ToInt32(json["PageId"]);
        //        int numOfRows = 10000;

        //        Validate vmgr = new Validate();
        //        var userToken = vmgr.ValidateTokenData(token, ipAddress);
        //        int siteId = GetSiteByUserId(userToken.Id);
        //        token = vmgr.ExtendToken(userToken);
        //        WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();

        //        var site = db.SitesERPs.Where(x => x.ID == siteId).FirstOrDefault();
        //        string siteName = site != null ? String.Format("{0} ({1})", site.NAME, site.LOCATION) : String.Empty;

        //        var lstProducts = db.Database.SqlQuery<ProductInfo>("[ordering].[GetProductsBySite] {0}", siteId).Select(x => new { Id = x.ProductId, ProductName = x.ProductName }).ToList();
        //        lstProducts = lstProducts.OrderBy(x => x.Id).ToList();

        //        List<OnlineOrderInfo> lstOrders = db.Database.SqlQuery<OnlineOrderInfo>("[ordering].[GetSearchedOrdersForCustomer] {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}"
        //            , siteId, searchString, startDate, endDate, productId, pageId, numOfRows, userToken.Id).ToList();

        //        return new Tuple<List<OnlineOrderInfo>, dynamic, string, string>(lstOrders, lstProducts, siteName, token);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
        //    }
        //}

        public DataTable ToDataTable<T>(IList<T> data)
        {
            PropertyDescriptorCollection props =
                TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            for (int i = 0; i < props.Count; i++)
            {
                PropertyDescriptor prop = props[i];
                table.Columns.Add(prop.Name, prop.PropertyType);
            }
            object[] values = new object[props.Count];
            foreach (T item in data)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    values[i] = props[i].GetValue(item);
                }
                table.Rows.Add(values);
            }
            return table;
        }

        [HttpPost]
        [ActionName("Save")]
        public Tuple<bool, string> Save([FromBody]JObject json)
        {
            string token = String.Empty;
            try
            {

                return null;
                //token = Convert.ToString(json["Token"]);
                //string ipAddress = Convert.ToString(json["IpAddress"]);
                //DateTime orderDate = Convert.ToDateTime(json["OrderDate"]);
                //List<NewOrderInfo> orders = JsonConvert.DeserializeObject<List<NewOrderInfo>>(Convert.ToString(json["Orders"]));

                //Validate vmgr = new Validate();
                //var userToken = vmgr.ValidateTokenData(token, ipAddress);
                //int siteId = GetSiteByUserId(userToken.Id);
                //token = vmgr.ExtendToken(userToken);
                //WOQ_DMS_NewEntities db = new WOQ_DMS_NewEntities();

                //DataTable table = new DataTable();
                //table.Columns.Add("ShiftId");
                //table.Columns.Add("NoOfLoad");
                //table.Columns.Add("ProductId");

                //orders.ForEach(x =>
                //{
                //    table.Rows.Add(x.ShiftId, x.NoOfLoad, x.ProductId);
                //});

                //var parameter = new SqlParameter("@Orders", SqlDbType.Structured);
                //parameter.Value = table;
                //parameter.TypeName = "[ordering].[NewOrders]";

                //var orderDateParameter = new SqlParameter("@OrderedFor", SqlDbType.Date);
                //orderDateParameter.Value = orderDate;

                //var siteIdParameter = new SqlParameter("@SiteId", SqlDbType.Int);
                //siteIdParameter.Value = siteId;

                //var userIdParameter = new SqlParameter("@LoggedInUserId", SqlDbType.Int);
                //userIdParameter.Value = userToken.Id;

                //bool isUpdate = false;

                //if (orders != null && orders.Count() > 0)
                //{
                //    int custShiftId = orders[0].ShiftId;
                //    if (db.OrderPlannings.Where(x => x.ShiftId == custShiftId && x.SiteId == siteId).Count() > 0)
                //        isUpdate = true;
                //}

                //bool result = db.Database.SqlQuery<bool>("[ordering].[SaveOrders_Z1] @Orders, @OrderedFor, @SiteId, @LoggedInUserId", parameter, orderDateParameter, siteIdParameter, userIdParameter).FirstOrDefault();

                //if (!isUpdate)
                //    SendOnlineOrderEmail(userToken.Id, orderDate);
                //else
                //    SendOnlineOrderEmailUpdated(userToken.Id, orderDate);

                //return new Tuple<bool, string>(result, token);
            }
            catch (Exception ex)
            {
                //if (ex.Message.Equals(ApiConfigManager.CreditLimitExceeded))
                //    return new Tuple<bool, string>(false, token);

                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
            }
        }
        
        public void WriteLogError(string errorMessage)
        {
            try
            {
                string path = "~/Error/" + DateTime.Today.ToString("dd-mm-yy") + ".txt";
                if (!System.IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath(path)))
                {
                    System.IO.File.Create(System.Web.HttpContext.Current.Server.MapPath(path)).Close();
                }
                using (StreamWriter w = System.IO.File.AppendText(System.Web.HttpContext.Current.Server.MapPath(path)))
                {
                    w.WriteLine("\r\nLog Entry : ");
                    w.WriteLine("{0}", DateTime.Now.ToString(CultureInfo.InvariantCulture));
                    string err = "Error in: " + System.Web.HttpContext.Current.Request.Url.ToString() +
                                  ". Error Message:" + errorMessage;
                    w.WriteLine(err);
                    w.WriteLine("__________________________");
                    w.Flush();
                    w.Close();
                }
            }
            catch (Exception ex)
            {
                //WriteLogError(ex.Message);
            }

        }
        
    }

    enum MailBodies
    {
        OnlineOrderConfirmation = 7,
        FirstUserEmail = 9,
        ResetPassword = 1001,
        Updated = 1002
    }
}