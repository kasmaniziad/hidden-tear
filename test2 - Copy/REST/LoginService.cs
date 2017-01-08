using LDOBulkOrdering.Helper;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace LDOBulkOrdering.REST
{
    public class LoginService
    {

        private readonly IOptions<AppSettingsManager> config;

        public LoginService(IOptions<AppSettingsManager> optionsAccessor)
        {
            this.config = optionsAccessor;
        }

        public async Task<Tuple<string, string>> ValidateAsync(string ldo, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.ValidateUserApi, new StringContent(JsonConvert.SerializeObject(new { ldo = ldo, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));

                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<string, string>>();

                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<string> ExtendToken(string ldo, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.ExtendToken, new StringContent(JsonConvert.SerializeObject(new { Token = ldo, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));

                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<string>();

                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<Tuple<string, string>> ValidateActivationAsync(string ldo, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.ValidateActivationUserApi, new StringContent(JsonConvert.SerializeObject(new { ldo = ldo, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));

                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<Tuple<string, string>>();

                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<string> SaveUser(string token, string ipAddress, string password)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.SaveUserApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress, Password = password }), Encoding.UTF8, config.Value.MediaType));

                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<string>();

                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<string> LoginUser(string ipAddress, string emailId, string password)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.LoginUserApi, new StringContent(JsonConvert.SerializeObject(new { IpAddress = ipAddress, EmailId = emailId, Password = password }), Encoding.UTF8, config.Value.MediaType));

                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<string>();

                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<string> IsLoggedIn(string token, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.IsLoggedInApi, new StringContent(JsonConvert.SerializeObject(new { Token = token, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));

                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<string>();

                throw new Exception(config.Value.NotAuthorized);
            }
        }

        public async Task<bool> ResetPassword(string emailId, string ipAddress)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(config.Value.BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(config.Value.MediaType));
                var response = await client.PostAsync(config.Value.ResetPasswordApi, new StringContent(JsonConvert.SerializeObject(new { EmailId = emailId, IpAddress = ipAddress }), Encoding.UTF8, config.Value.MediaType));
                if (response.IsSuccessStatusCode)
                    return await response.Content.ReadAsAsync<bool>();
                throw new Exception(config.Value.NotAuthorized);
            }
        }




    }
}