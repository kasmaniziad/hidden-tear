using LDOBulkOrdering.Helper;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace LDOBulkOrdering.REST
{
    public class OrderService
    {

        private readonly IOptions<AppSettingsManager> config;

        public OrderService(IOptions<AppSettingsManager> optionsAccessor)
        {
            this.config = optionsAccessor;
        }

        public async Task<Tuple<List<SiteInfo>, List<ShiftInfo>, string>> GetSiteList(string token, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.GetSitesApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<List<SiteInfo>, List<ShiftInfo>, string>>();
                else if (response.IsSuccessStatusCode == false && response.StatusCode == System.Net.HttpStatusCode.Forbidden)
                {
                    throw new Exception(config.Value.AcceptTerms);
                }

                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<List<ProductInfo>, string>> GetProductList(string token, string ipAddress, int siteNumber)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.GetProductsApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress, SiteNumber = siteNumber }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<List<ProductInfo>, string>>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<bool, string>> PlaceOrder(string token, string ipAddress, OrderInfo info)
        {
            using (var client = new HttpClient())
            {
                info.OrderSourceId = (int)EnumOrderSource.Online;
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.PlaceOrderApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress, OrderInfo = info }), Encoding.UTF8, config.Value.MediaType));

                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<bool, string>>();

                throw new Exception(config.Value.NotAuthorized);
            }
        }


    }

   

    public class SiteInfo
    {
        public int Id { get; set; }
        public int SiteNumber { get; set; }
        public string SiteName { get; set; }
    }

    public class ProductInfo
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
    }

    public class ShiftInfo
    {
        public int Id { get; set; }
        public int ShiftNumber { get; set; }
        public string ShiftName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }

    public class PortalUser
    {
        public int Id { get; set; }
        public Nullable<int> CustNum { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string MobileNum { get; set; }
        public string LandlineNum { get; set; }
        public Nullable<byte> Attempts { get; set; }
        public bool isActive { get; set; }
        public bool isArchived { get; set; }
        public bool isLocked { get; set; }
        public bool hasAccessToAllSites { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime ModifiedOn { get; set; }
    }
    public class OrderInfo
    {
        public int Id { get; set; }
        public long SiteId { get; set; }
        public int ProductId { get; set; }
        public int OrderedQty { get; set; }
        public DateTime RequestedOn { get; set; }
        public short ShiftId { get; set; }
        public string LPO { get; set; }
        public short OrderSourceId { get; set; }

    }

    public enum EnumOrderSource
    {
        None = 0,
        LDO = 1,
        Online = 2,
        PsPlan = 3
    }
    
}