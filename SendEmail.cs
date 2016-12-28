using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using Microsoft.SqlServer.Server;
using System.Net;
using System.IO;

public partial class UserDefinedFunctions
{
    [Microsoft.SqlServer.Server.SqlFunction]
    public static SqlString SendEmail(SqlString Ids, SqlString apiBaseAddress, SqlString apiUrl)
    {
        string url = String.Format("{0}{1}", apiBaseAddress, apiUrl);

        string feedData = string.Empty;

        try
        {
            string emails = Convert.ToString(Ids);

            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = "{\"NotificationIds\":\"" + Convert.ToString(Ids) + "\"}";

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            httpWebRequest.BeginGetResponse(new AsyncCallback(FinishWebRequest), httpWebRequest);
            
            return new SqlString("Done");
        }
        catch (Exception ex)
        {
            return new SqlString(String.Format("{0}-{1}", ex.Message, url));
        }
    }

    private static void FinishWebRequest(IAsyncResult result)
    {
        HttpWebResponse response = (result.AsyncState as HttpWebRequest).EndGetResponse(result) as HttpWebResponse;
    }
}
