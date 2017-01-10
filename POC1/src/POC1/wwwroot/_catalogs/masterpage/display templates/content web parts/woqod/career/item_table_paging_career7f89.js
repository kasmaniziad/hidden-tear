/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_72e9a3ff229541ae85ea3e89e4a29fc9(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_72e9a3ff229541ae85ea3e89e4a29fc9.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fItem_Table_Paging_Career.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['Content Web Parts'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Link URL':['Path'], 'WOQODJobCode':['WOQODJobCodeCareerCTOWSTEXT'], 'WOQODDepartment':['WOQODDepartmentCareerCTOWSTEXT'], 'WOQODDepartmentAR':['WOQODDepartmentARCareerCTOWSTEXT'], 'Title':['Title'], 'WOQODArabicTitle':['WOQODJobTitleARCareerCTOWSTEXT'], 'WOQODSubmissionDeadline':['WOQODSubmissionDeadlineCareerCTOWSDATE'], 'ListItemID':['ListItemID'], 'SecondaryFileExtension':null, 'ContentTypeId':null};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);



//################ WOQOD custom vars

var linkURL = $getItemValue(ctx, "Link URL");
linkURL.overrideValueRenderer($urlHtmlEncode);
var WOQODJobCode = $getItemValue(ctx, "WOQODJobCode");
var Title = $getItemValue(ctx,$resource('TitleLocalize'));
var WOQODDepartment = $getItemValue(ctx, $resource('WOQODDepartment'));
//var WOQODSubmissionDeadline = $getItemValue(ctx, "WOQODSubmissionDeadline");
var WOQODSubmissionDeadline=	moment(ctx.CurrentItem.WOQODSubmissionDeadlineCareerCTOWSDATE).format('DD/MM/YYYY');
var ListItemID=$getItemValue(ctx, "ListItemID");
var linkItem="ApplyJob.aspx?jID="+ListItemID;
var linkView="VacancyDetails.aspx?jID="+ListItemID+"&isdlg=1";


//################


ms_outHtml.push(''
,'<td class="hidden-xxs">'
);
if(!WOQODJobCode.isEmpty){
ms_outHtml.push(''
, WOQODJobCode ,''
);  } ms_outHtml.push(''
,'</td>'
,'<td>'
);
if(!Title.isEmpty){
ms_outHtml.push(''
, Title ,''
); } ms_outHtml.push(''
,'</td>'
,'<td class="hidden-xxs">'
);
if(!WOQODDepartment.isEmpty){
ms_outHtml.push(''
, WOQODDepartment ,''
);
}
ms_outHtml.push(''
,'</td>'
,'<td class="hidden-xxs">'
);
if(!WOQODSubmissionDeadline.isEmpty){
ms_outHtml.push(''
, WOQODSubmissionDeadline ,''
);
}
ms_outHtml.push(''
,'</td>'
,'<td class="greenAction"><a href="javaScript:;" data-test="',linkView ,'" class="JobDetails fancybox fancybox.iframe">', $resource('viewDetails') ,'</a></td>  '
,'<td class="greenAction"><a href="', linkItem ,'">', $resource('applyjob') ,'</a></td>    '
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_72e9a3ff229541ae85ea3e89e4a29fc9() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fItem_Table_Paging_Career.js", DisplayTemplate_72e9a3ff229541ae85ea3e89e4a29fc9);
}
//
       
      
		$includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fItem_Table_Paging_Career.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/displayTemplate.js");
		$includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fItem_Table_Paging_Career.js", "~sitecollection/_layouts/15/ITWorx.WOQOD.Careers/moment-with-locales.js");
    //
}
RegisterTemplate_72e9a3ff229541ae85ea3e89e4a29fc9();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fItem_Table_Paging_Career.js"), RegisterTemplate_72e9a3ff229541ae85ea3e89e4a29fc9);
}