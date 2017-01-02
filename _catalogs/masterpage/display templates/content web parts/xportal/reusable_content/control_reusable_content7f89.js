/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_d1a57cd4aa224b57aec52e29ab9ab7ec(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_d1a57cd4aa224b57aec52e29ab9ab7ec.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fxPortal\u002fReusable_Content\u002fControl_Reusable_Content.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
,'    '
); 
if (!$isNull(ctx.ClientControl) &&
    !$isNull(ctx.ClientControl.shouldRenderControl) &&
    !ctx.ClientControl.shouldRenderControl())
{
    return "";
}
ctx.ListDataJSONGroupsKey = "ResultTables";
var $noResults = Srch.ContentBySearch.getControlTemplateEncodedNoResultsMessage(ctx.ClientControl);

var noResultsClassName = "ms-srch-result-noResults";

var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl)
{
    var iStr = [];
    iStr.push(itemRenderResult);
    return iStr.join('');
}
ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;

ms_outHtml.push(''
,''
,''
,'     <ul class="social-icons">', ctx.RenderGroups(ctx) ,'</ul>'
,''
);
AddPostRenderCallback(ctx, function(){
//$('.social_js').parent().attr("class","social-icons");
})
ms_outHtml.push(''
);
if (ctx.ClientControl.get_shouldShowNoResultMessage())
{
ms_outHtml.push(''
,'        <div class="', noResultsClassName ,' noData">'
,'            ', $noResults ,'</div>'
);
}
ms_outHtml.push(''
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_d1a57cd4aa224b57aec52e29ab9ab7ec() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fxPortal\u002fReusable_Content\u002fControl_Reusable_Content.js", DisplayTemplate_d1a57cd4aa224b57aec52e29ab9ab7ec);
}

}
RegisterTemplate_d1a57cd4aa224b57aec52e29ab9ab7ec();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fxPortal\u002fReusable_Content\u002fControl_Reusable_Content.js"), RegisterTemplate_d1a57cd4aa224b57aec52e29ab9ab7ec);
}