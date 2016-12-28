using JWT.Authorization;
using JWT.Helpers;
using JWT.Managers;
using System;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using ZAPI.Helper;

namespace ZAPI.Authorize
{
    public class Validate
    {
        public OnlineToken ValidateTokenData(string token, string ipAddress, bool validate = true)
        {
            var userToken = new TokenHelper().GetToken<OnlineToken>(token);
            if (validate)
            {
                if (!userToken.hasAccepted)
                    throw new Exception(Convert.ToString((int)HttpStatusCode.Forbidden));
            }

            if (userToken.Ip.Equals(ipAddress))
                return userToken;

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotAcceptable));
        }

        //public string ExtendToken(int userId, bool hasAccepted, string token, string ipAddress)
        //{
        //    return JsonWebToken.Encode(new OnlineToken() { Id = userId, Ip = ipAddress, hasAccepted = hasAccepted, Expiry = DateTime.Now.AddMinutes(ApiConfigManager.OOKeepAliveTime) }, AppConfManager.SecretAccessKey, HvHashAlgorithm.RS256);
        //}

        public string ExtendToken(OnlineToken tokenInfo)
        {
            return JsonWebToken.Encode(new OnlineToken()
            {
                Id = tokenInfo.Id,
                Ip = tokenInfo.Ip,
                hasAccepted = tokenInfo.hasAccepted,
                hasAcceptedCircular = tokenInfo.hasAcceptedCircular,
                Expiry = DateTime.Now.AddMinutes(ApiConfigManager.OOKeepAliveTime)
            }, AppConfManager.SecretAccessKey, HvHashAlgorithm.RS256);
        }

        public string ExtendTokenAsIs(OnlineToken tokenInfo)
        {
            return JsonWebToken.Encode(tokenInfo, AppConfManager.SecretAccessKey, HvHashAlgorithm.RS256);
        }

        public string GenerateHash(string password)
        {
            MD5 alg = new MD5CryptoServiceProvider();
            password = password + AppConfManager.PasswordPrivateKey;
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] hash = alg.ComputeHash(passwordBytes);

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                strBuilder.Append(hash[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }
    }
}