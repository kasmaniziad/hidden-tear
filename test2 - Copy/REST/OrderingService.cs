using LDOBulkOrdering.Helper;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using OrderingClassLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace LDOBulkOrdering.REST
{
    public class OrderingService
    {

        private readonly IOptions<AppSettingsManager> config;

        public OrderingService(IOptions<AppSettingsManager> optionsAccessor)
        {
            this.config = optionsAccessor;
        }

        public async Task<Tuple<List<DayInfo>, List<ShiftInfo>, string, string>> GetSiteOrderList(string token, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.GetSiteOrdersApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<List<DayInfo>, List<ShiftInfo>, string, string>>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<List<OnlineUserInfo>, string>> GetCustomerBasicInformation(string token, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.GetCustomerBasicInfoApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<List<OnlineUserInfo>, string>>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<CreditLimitInfo, string>> GetCreditLimit(string token, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.GetCreditLimitApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<CreditLimitInfo, string>>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<List<DayInfo>, List<ShiftInfo>, string, string>> GetDataForNewOrder(DateTime date, string token, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.GetDataForNewOrderApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress, OrderDate = date }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<List<DayInfo>, List<ShiftInfo>, string, string>>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<bool, string>> SaveNewOrder(List<NewOrderInfo> orders, DateTime date, string token, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.SaveNewOrderApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress, OrderDate = date, Orders = orders }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<bool, string>>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<bool, string>> UpdateUserAgreementStatus(string token, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.UpdateUserAgreementStatusApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<bool, string>>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<List<ViewOnlineOrderInfo>, List<ProductInfo>, string, string>> GetSearchedOrders(string token, string ipAddress, OnlineSearchInfo info)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.GetSearchedOrdersApi, new StringContent(JsonConvert.SerializeObject(new
                {
                    Token = token,
                    IpAddress = ipAddress,
                    SearchString = info.SearchString,
                    StartDate = info.StartDate,
                    EndDate = info.EndDate,
                    ProductId = info.ProductId,
                    PageId = info.PageId
                }), Encoding.UTF8, config.Value.MediaType));

                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<List<ViewOnlineOrderInfo>, List<ProductInfo>, string, string>>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }
    }
   
    public class OnlineSearchInfo
    {
        public string SearchString { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public byte ProductId { get; set; }
        public int PageId { get; set; }
    }
    

    public class ViewOnlineOrderInfo
    {
        public byte ProductId { get; set; }
        public string ProductName { get; set; }
        public int? Quantity { get; set; }
        public byte? NoOfLoad { get; set; }
        public int ShiftId { get; set; }
        public DateTime ShiftDay { get; set; }
        public string ShiftName { get; set; }
        public int LoadCapacity { get; set; }
        public int? SiteId { get; set; }
        public string SiteName { get; set; }
        public string SiteLocation { get; set; }
        public bool? IsExported { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
    
}