using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZAPI.Helper
{
    public class ApiConfigManager
    {
        public static string AppToken { get { return Properties.Settings.Default.AppToken; } }

        public static string NotAuthorized { get { return Properties.Settings.Default.NotAuthorized; } }

        public static string HelpMessage { get { return Properties.Settings.Default.HelpMessage; } }

        public static double OOKeepAliveTime { get { return Properties.Settings.Default.OOKeepAliveTime; } }

        public static short MaximumNumberOfAttempts { get { return Properties.Settings.Default.MaximumNumberOfAttempts; } }

        public static short MaxNotifications { get { return Properties.Settings.Default.MaxNotifications; } }

        public static short Timeout { get { return Properties.Settings.Default.Timeout; } }

        public static string HtmlTemplate { get { return Properties.Settings.Default.HtmlTemplate; } }

        public static string TimeElapsed { get { return Properties.Settings.Default.TimeElapsed; } }

        public static string SystemUserEmail { get { return Properties.Settings.Default.SystemUserEmail; } }

    }
}