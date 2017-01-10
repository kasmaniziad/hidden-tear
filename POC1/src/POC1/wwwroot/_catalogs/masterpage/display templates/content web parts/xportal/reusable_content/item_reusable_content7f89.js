/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_40de92ca901e4d26b103d6fbe207bf46(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_40de92ca901e4d26b103d6fbe207bf46.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fxPortal\u002fReusable_Content\u002fItem_Reusable_Content.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'xTitle':['xPortalTitleOWSTEXT', 'Title'], 'Link URL':['Path'], 'Css':['Title'], 'xIdentifier':['xPortalIdentifierOWSCHCS'], 'xContent':['xPortalContentOWSHTML'], 'xURL':['xPortalURLOWSURLH'], 'xShow':['xPortalShowOWSCHCS'], 'SecondaryFileExtension':null, 'ContentTypeId':null};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
,'    '
);
var encodedId = $htmlEncode(ctx.ClientControl.get_nextUniqueId() + "_picture3Lines_");


var line1 = $getItemValue(ctx, "Line 1");
var line2 = $getItemValue(ctx, "Line 2");
var line3 = $getItemValue(ctx, "Line 3");
//################ xportal custom vars

var xIdentifier = $getItemValue(ctx, "xIdentifier");
var xContent = $getItemValue(ctx, "xContent");
var xURL = $getItemValue(ctx, "xURL");
var Css = $getItemValue(ctx, "Css");
var xShow = $getItemValue(ctx, "xShow");

//################

var pictureURL = $getItemValue(ctx, "Picture URL");
var pictureId = encodedId + "picture";
var pictureMarkup = Srch.ContentBySearch.getPictureMarkup(pictureURL, 100, 100, ctx.CurrentItem, "cbs-picture3LinesImg", line1, pictureId);

line1.overrideValueRenderer($contentLineText);
line2.overrideValueRenderer($contentLineText);
line3.overrideValueRenderer($contentLineText);

var containerId = encodedId + "container";
var pictureLinkId = encodedId + "pictureLink";
var pictureContainerId = encodedId + "pictureContainer";
var dataContainerId = encodedId + "dataContainer";
var line1LinkId = encodedId + "line1Link";
var line1Id = encodedId + "line1";
var line2Id = encodedId + "line2";
var line3Id = encodedId + "line3";

var dataDisplayTemplateTitle = "ItemPicture3Lines";
ms_outHtml.push(''
);
if((xIdentifier == 'Social Media Links')&&(xShow == 'Yes')){
ms_outHtml.push(''
,'<li class="social_js ', Css ,'"><a href="', xURL ,'" title="', Css ,'" target="_blank">', Css ,'</a></li>'
);
}else{
ms_outHtml.push(''
,' ', xContent ,''
);
}
ms_outHtml.push(''
,'       '
,'        '
,'        '
,'        '
,'        <!--/ .post-holder-->'
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_40de92ca901e4d26b103d6fbe207bf46() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fxPortal\u002fReusable_Content\u002fItem_Reusable_Content.js", DisplayTemplate_40de92ca901e4d26b103d6fbe207bf46);
}
//

//
}
RegisterTemplate_40de92ca901e4d26b103d6fbe207bf46();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fxPortal\u002fReusable_Content\u002fItem_Reusable_Content.js"), RegisterTemplate_40de92ca901e4d26b103d6fbe207bf46);
}