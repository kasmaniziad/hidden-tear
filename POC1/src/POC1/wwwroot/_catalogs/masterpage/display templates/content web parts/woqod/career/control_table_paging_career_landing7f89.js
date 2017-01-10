/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_b3c2e27750af4457bac612c0d54ef801(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_b3c2e27750af4457bac612c0d54ef801.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career_landing.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
); 
if (!$isNull(ctx.ClientControl) &&
    !$isNull(ctx.ClientControl.shouldRenderControl) &&
    !ctx.ClientControl.shouldRenderControl())
{
    return "";
}
ctx.ListDataJSONGroupsKey = "ResultTables";
var $noResults = Srch.ContentBySearch.getControlTemplateEncodedNoResultsMessage(ctx.ClientControl);

var isRollupPageInDisplayMode = Srch.ContentBySearch.isRollupPage(ctx.ClientControl) && !Srch.U.isPageInEditMode();
var noResultsClassName = isRollupPageInDisplayMode ? "ms-attractMode ms-uppercase ms-alignCenter" : "ms-srch-result-noResults";

var ListRenderRenderWrapper = function(itemRenderResult, inCtx, tpl)
{
    var iStr = [];
    iStr.push('<tr>');
    iStr.push(itemRenderResult);
    iStr.push('</tr>');
    return iStr.join('');
}
ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
ms_outHtml.push(''
); 
if (!$isNull(ctx.ClientControl) &&
    !$isNull(ctx.ClientControl.shouldRenderControl) &&
    !ctx.ClientControl.shouldRenderControl())
{
    return "";
}
ctx.ListDataJSONGroupsKey = "ResultTables";
var siteURL = SP.PageContextInfo.get_siteServerRelativeUrl();
ms_outHtml.push(' '
,'        <div>'
,'       '
,'        <link rel="stylesheet" type="text/css" href="/_catalogs/masterpage/xPortal/style library/common/styles/Waqcolors.css" />'
,''
,'        <div class="">'
,'         '
,'        <table width="100%" cellspacing="0" cellpadding="0" border="0" class="default-table table">'
,'        <thead>'
,''
,'            <tr class="default-table-row">'
,'			'
,'                <th class="hidden-xxs text-left" width="13%">', $resource('jobcode') ,'</th>'
,'				<th width="35%" class="text-left">', $resource('JobTitle') ,'</th>'
,'             '
,'				<th class="hidden-xxs text-left" width="25%">', $resource('SubmissionDeadline') ,'</th>'
,'				'
,'                '
,'               '
,'            </tr>'
,'        </thead>'
,'        <tbody>'
,'            ', ctx.RenderGroups(ctx) ,''
,'          '
,'        </tbody>'
,'        '
,'     </table>    '
,''
,'			'
,'        '
,'           </div>'
,'            '
,'        </div>'
,''
);
if (ctx.ClientControl.get_shouldShowNoResultMessage())
{
ms_outHtml.push(''
,'        <div class="', noResultsClassName ,' noData">'
,'            ', $noResults ,'</div>'
);
}
ms_outHtml.push(''
,'<p class="text-right">'
,'  <a href="Vacancies.aspx" class="colorGreen font13 fontBold">', $resource('viewall') ,'</a>  '
,'  </p>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_b3c2e27750af4457bac612c0d54ef801() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_ListWithPaging", DisplayTemplate_b3c2e27750af4457bac612c0d54ef801);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career_landing.js", DisplayTemplate_b3c2e27750af4457bac612c0d54ef801);
}
//
		$includeCSS("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career_landing.js", "~sitecollection/_catalogs/masterpage/xPortal/style library/common/Plugins/Pagination/CSWP_Paging.css"); // Make sure the CSS file is available in this location!
	   $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career_landing.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/displayTemplate.js");

	 
    //
}
RegisterTemplate_b3c2e27750af4457bac612c0d54ef801();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career_landing.js"), RegisterTemplate_b3c2e27750af4457bac612c0d54ef801);
}