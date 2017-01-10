/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_af5f5de78e8b4c88b419098c1c3c3014(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_af5f5de78e8b4c88b419098c1c3c3014.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCSRHome\u002fItem_CSR_Home.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'xTitle':['xPortalTitleOWSTEXT', 'Title'], 'Link URL':['Path'], 'xMainImage':['xPortalMainImageOWSIMGE'], 'xMainImageCaption':['xPortalMainImageCaptionOWSMTXT'], 'xImage01':['xPortalImage01OWSIMGE'], 'xImageCaption01':['xPortalImage01CaptionOWSMTXT'], 'xImage02':['xPortalImage02OWSIMGE'], 'xImageCaption02':['xPortalImage02CaptionOWSMTXT'], 'xVideo':['xPortalVideoURLOWSURLH'], 'xVideoCaption':['xPortalVideoCaptionOWSMTXT'], 'xContent':['xPortalContentOWSHTML'], 'xSummary':['xPortalSummaryOWSTEXT'], 'NewsCategory':['xPortalNewsLookUp'], 'xFeatured':['xPortalShowOWSBOOL'], 'xDate':['xPortalDate'], 'xStartDate':['xPortalStartDate'], 'xEndDate':['xPortalEndDate'], 'xMap':['xPortalMapOWSTEXT'], 'xPhone':['xPortalPhoneOWSTEXT'], 'xFax':['xPortalFaxOWSTEXT'], 'xMail':['xPortalEmailOWSTEXT'], 'xCountry':['xPortalCountryOWSCHCS'], 'xAddress':['xPortalAddressOWSMTXT'], 'AlbumID':['ListItemID'], 'CSRCategory':['owstaxIdWOQODCSRCategory'], 'SecondaryFileExtension':null, 'ContentTypeId':null};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);
//################ xportal custom vars

var linkURL = $getItemValue(ctx, "Link URL");
linkURL.overrideValueRenderer($urlHtmlEncode);
var xTitle = $getItemValue(ctx, "xTitle");

var xMainImage = $getItemValue(ctx, "xMainImage");
var xMainImageCaption = $getItemValue(ctx, "xMainImageCaption");


var xImage01 = $getItemValue(ctx, "xImage01");
var xImageCaption01 = $getItemValue(ctx, "xImageCaption01");

var xImage02 = $getItemValue(ctx, "xImage02");
var xImageCaption02 = $getItemValue(ctx, "xImageCaption02");

var xVideo = $getItemValue(ctx, "xVideo");
var xVideoCaption = $getItemValue(ctx, "xVideoCaption");

var xContent = $getItemValue(ctx, "xContent");
var xSummary = $getItemValue(ctx, "xSummary");
var xFeatured = $getItemValue(ctx, "xFeatured");
//update by AK fix issue 475374 format date 
//start
//old
//var xDate = new Date($getItemValue(ctx, "xDate"));
//var xDateFormat = Srch.U.toFormattedDate(xDate, "LongDatePattern");
//
//var xStartDate = new Date($getItemValue(ctx, "xStartDate"));
//var xStartDateFormat = Srch.U.toFormattedDate(xStartDate, "LongDatePattern");
//
//var xEndDate = new Date($getItemValue(ctx, "xEndDate"));
//var xEndDateFormat = Srch.U.toFormattedDate(xEndDate, "LongDatePattern");
var xDate=moment(ctx.CurrentItem.xPortalDate).format('DD/MM/YYYY');
var xStartDate=moment(ctx.CurrentItem.xPortalStartDate).format('DD/MM/YYYY');
var xEndDate =moment(ctx.CurrentItem.xPortalEndDate).format('DD/MM/YYYY');
//end
var AlbumID = $getItemValue(ctx, "AlbumID");
var CSRCategory = $getItemValue(ctx, "CSRCategory");


//################


/*##############  if in media gallery change the linkURL to send querystring Param of album name ###############*/
if(window.location.href.toLowerCase().indexOf("/mediacenter/pages/") > -1) {
       linkURL = "MediaGallery.aspx?albumID="+AlbumID;
    }
/*##############################################################################################################*/
ms_outHtml.push(''
,'	<div>'
,'	'
,'	<div class="topPart">'
,'	'
,'	'
);
if(!CSRCategory.isEmpty){
ms_outHtml.push(''
,'		<a href="', linkURL ,'"><h2 class="font18 cssTrim" title="', CSRCategory ,'">', CSRCategory ,'</h2></a>'
);
}
ms_outHtml.push(''
,'		'
,''
,''
,''
);
var imageSrc, imageCaption, videoSrc;
if(!xMainImage.isEmpty){
 imageSrc = xMainImage.toString().split('?')[0];
 imageSrc = imageSrc.toLowerCase();
 imageCaption = xMainImageCaption;
ms_outHtml.push('<a href="', linkURL ,'">'
,'		<img class="offline-img" src="', imageSrc ,'?RenditionID=7" alt="', imageCaption ,'" title="', imageCaption ,'" />'
,'		</a>'
);
}else if(!xImage01.isEmpty){
imageSrc = xImage01.toString().split('?')[0];
imageSrc = imageSrc.toLowerCase();
 imageCaption = xImageCaption01;
ms_outHtml.push('<a href="', linkURL ,'">'
,'		<img class="offline-img" src="', imageSrc ,'?RenditionID=7" alt="', imageCaption ,'" title="', imageCaption ,'" />'
,'		</a>'
);
}else if(!xImage01.isEmpty){
imageSrc = xImage02.toString().split('?')[0];
imageSrc = imageSrc.toLowerCase();
 imageCaption = xImageCaption02;
ms_outHtml.push('<a href="', linkURL ,'">'
,'		<img class="offline-img" src="', imageSrc ,'?RenditionID=7" alt="', imageCaption ,'" title="', imageCaption ,'" />'
,'		</a>'
);
}else if(xVideo != ''){
	var videoURL, youtubeVideoName, mediaClass, vimeoID, videoVimeoID;
	if (xVideo.toString().indexOf("youtu") !== -1){ //youtube video		
		videoURL = xVideo.toString();
		slashIndex = videoURL.lastIndexOf("/");
		youtubeVideoName = videoURL.substring(slashIndex +1);
		imageSrc = "http://i1.ytimg.com/vi/" + youtubeVideoName + "/mqdefault.jpg";
	}
	else if (xVideo.toString().indexOf("vimeo") !== -1){ //vimeo video				
		mediaClass = 'vimeo-video-ext';		
		videoURL = xVideo.toString();
		vimeoID = videoURL.substring(videoURL.lastIndexOf('/')+1);
		xVideo = "http://player.vimeo.com/video/" + vimeoID;									
		videoVimeoID = 'video-vimeo-' + vimeoID;					
	}
ms_outHtml.push('<a href="', linkURL ,'" class="',mediaClass,'" data-href="',xVideo,'" id="',videoVimeoID,'">'
,'		<img class="online-video-img" src="', imageSrc ,'?RenditionID=7" alt="', imageCaption ,'" title="', imageCaption ,'" />'
,'		</a>'
);
}else{
ms_outHtml.push('<a href="', linkURL ,'">'
,'		<img src="/_catalogs/masterpage/xPortal/style%20library/common/images/default/default_213_115.jpg" alt="', imageCaption ,'" title="', imageCaption ,'" />'
,'		</a>'
);
}
ms_outHtml.push(''
,''
,'</div>'
,''
,''
,'<!--<div class="midPart">-->'
,''
,''
);
if(!xTitle.isEmpty){
ms_outHtml.push(''
,'		<!--<a class="subTitle font24" href="', linkURL ,'">', xTitle ,'</a>-->'
);
}
ms_outHtml.push(''
,''
,''
,''
,'<!--</div>-->'
,''
);
if(!xSummary.isEmpty){
ms_outHtml.push(''
,'<div class="bottomPart"> <p>', xSummary ,' </p> </div>'
,'		'
);
}
ms_outHtml.push('</div>'
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_af5f5de78e8b4c88b419098c1c3c3014() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCSRHome\u002fItem_CSR_Home.js", DisplayTemplate_af5f5de78e8b4c88b419098c1c3c3014);
}
//
$includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCSRHome\u002fItem_CSR_Home.js", "~sitecollection/_layouts/15/ITWorx.WOQOD.Careers/moment-with-locales.js");
//
}
RegisterTemplate_af5f5de78e8b4c88b419098c1c3c3014();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCSRHome\u002fItem_CSR_Home.js"), RegisterTemplate_af5f5de78e8b4c88b419098c1c3c3014);
}