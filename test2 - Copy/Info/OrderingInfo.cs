using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingClassLibrary
{

    public class OnlineUserInfo
    {
        public int SiteId { get; set; }
        public string SiteNumber { get; set; }
        public string SiteName { get; set; }
        public string EmailId { get; set; }
        public string UserName { get; set; }
        public string MobileNo { get; set; }
        public string LandlineNo { get; set; }
        public string CustomerName { get; set; }
        public int? CustomerNumber { get; set; }
        public DateTime? LastOrderedDate { get; set; }
        public bool? IsResidential { get; set; }

    }

    public class CreditLimitInfo
    {
        public decimal UnbilledInvoices { get; set; }
        public decimal UnPaidInvoices { get; set; }
        public decimal OverallCreditLimit { get; set; }
        public decimal CreditLimitRemaining { get; set; }

    }

    public class NewOrderInfo
    {
        public int ShiftId { get; set; }
        public int NoOfLoad { get; set; }
        public int ProductId { get; set; }
    }

    public class LPGTankLevelInfo
    {
        public int Id { get; set; }
        public byte Level { get; set; }
    }

    public class LPGTankInfo
    {
        public int Id { get; set; }
        public string TankName { get; set; }
        public int Volume { get; set; }
        public byte? Level { get; set; }
        public string Location { get; set; }
        public decimal? ExpectedDeliveredQty { get; set; }
        public bool IsExported { get; set; }
    }

    public class DayInfo
    {
        public DateTime ActualDate { get; set; }
        public string DateCaption { get; set; }
        public List<ProductInfo> lstProducts { get; set; }
    }

    public class ProductInfo
    {
        public byte ProductId { get; set; }
        public string ProductName { get; set; }
        public List<ShiftDataInfo> lstShiftData { get; set; }
    }

    public class ShiftDataInfo
    {
        public int ShiftId { get; set; }
        public int? Quantity { get; set; }
        public int? NoOfLoad { get; set; }
        public int LoadCapacity { get; set; }
        public bool CanEdit { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class ShiftInfo
    {
        public DateTime ActualDate { get; set; }
        public int ProductId { get; set; }
        public string ShiftName { get; set; }
    }

    public class OnlineOrderInfo
    {
        public byte ProductId { get; set; }
        public string ProductName { get; set; }
        public int? Quantity { get; set; }
        public byte? NoOfLoad { get; set; }
        public int ShiftId { get; set; }
        public DateTime ShiftDay { get; set; }
        public string ShiftName { get; set; }
        public int LoadCapacity { get; set; }
        public bool CanEdit { get; set; }
        public int? SiteId { get; set; }
        public string SiteName { get; set; }
        public string SiteLocation { get; set; }
        public bool? IsExported { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public enum EnumDeliveryType
    {
        Normal = 1,
        Urgent = 2
    }

    public class RecentOrderFlatInfo
    {
        public int Id { get; set; }
        public int SiteId { get; set; }
        public string SiteName { get; set; }
        public string SiteLocation { get; set; }
        public DateTime RequiredOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ModifiedBy { get; set; }
        public string ModifiedUserName { get; set; }
        public byte OrderStatus { get; set; }
        public int TankId { get; set; }
        public string TankName { get; set; }
        public byte Level { get; set; }
    }

    public class LPGOrderInfo
    {
        public int Id { get; set; }
        public string SiteName { get; set; }
        public string SiteLocation { get; set; }
        public DateTime RequiredOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ModifiedBy { get; set; }
        public string ModifiedUserName { get; set; }
        public byte OrderStatus { get; set; }
        public bool IsProcessed { get; set; }
        public bool IsUrgent { get; set; }
        public List<LPGTankInfo> lstTanks { get; set; }

    }

    public class PortalNotificationInfo
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public string Remarks { get; set; }
        public string Caption { get; set; }
        public byte[] Image { get; set; }
        public byte? CategoryId { get; set; }
        public string Category { get; set; }
        public Guid? ResourceId { get; set; }
        public DateTime? AnnouncementDate { get; set; }
        public short? SortOrder { get; set; }
        public int TotalNotifications { get; set; }
    }

    public class CalendarEventInfo
    {
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public int SiteId { get; set; }
        public string Url { get; set; }
        public List<LPGOrderInfo> lstOrders { get; set; }

    }

    public class CalendarEventFlatInfo
    {
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public int SiteId { get; set; }
        public string Url { get; set; }
        public int TankId { get; set; }
        public string TankName { get; set; }
        public byte Level { get; set; }
        public decimal ExpectedDeliveredQty { get; set; }
        public int Volume { get; set; }
        public string Location { get; set; }
        public string SiteName { get; set; }
        public bool IsProcessed { get; set; }
        public bool IsUrgent { get; set; }

    }
    
    public enum EnumLPGOrderError
    {
        None = 0,
        CreditLimit = 1,
        TimeElapsed = 2
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

    public class NotificationCategoryInfo
    {
        public byte Id { get; set; }
        public string Category { get; set; }
    }

    public class UserAuthInfo
    {
        public string EmailId { get; set; }
        public string Password { get; set; }
    }



}
