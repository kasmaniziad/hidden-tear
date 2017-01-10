/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_1920f19a59634c8993fc98ba726ed935(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_1920f19a59634c8993fc98ba726ed935.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career.js';
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
	//update AK	
		if (ctx.ListData.ResultTables[0].ResultRows.length!="0")
		{
	//end
ms_outHtml.push(' '
,'        <div>'
,'        <link rel="stylesheet" type="text/css" href="/_catalogs/masterpage/xPortal/style library/common/styles/Waqcolors.css" />'
,''
,'        <div class="">'
,'        <table width="100%" cellspacing="0" cellpadding="0" border="0" class="default-table table">'
,'        <thead>'
,''
,'            <tr class="default-table-row">'
,'			'
,'                <th class="hidden-xxs text-left" width="11%">', $resource('jobcode') ,'</th>'
,'				<th class="text-left" width="25%">', $resource('JobTitle') ,'</th>'
,'                <th class="hidden-xxs text-left" width="17%">', $resource('Department') ,'</th>'
,'				<th class="hidden-xxs text-left" width="20%">', $resource('SubmissionDeadline') ,'</th>'
,'                <th width="13%"></th>'
,'                <th width="13%"></th>'
,'            </tr>'
,'        </thead>'
,'        <tbody>'
,'            ', ctx.RenderGroups(ctx) ,''
);
            
            
            AddPostRenderCallback(ctx, function(){ 
				
			
				 $('.JobDetails').each(function(){
					 $(this).click(function(e) {
					 	var thisLink = $(this).attr('data-test');
						$.fancybox({
								'padding'		: 0,
								'autoScale'		: false,
								'transitionIn'	: 'none',
								'transitionOut'	: 'none',
								'fitToView'		: false,
    							'autoSize'		: false,
								'title'			: this.title,
								'width'			: 680,
								'height'		: 600,
								'href'			: thisLink,
								'type'			: 'iframe'
								});
					
						return false;
					});
					 });
});
			//update AK
			}
			//end
var showPaging = ctx.ClientControl.get_showPaging();	
if(showPaging)
{
    var pagingInfo = ctx.ClientControl.get_pagingInfo();
    showPaging = !$isEmptyArray(pagingInfo);
    if(showPaging)
    {
        var currentPage = null;
        var firstPage = pagingInfo[0];
        var lastPage = pagingInfo[pagingInfo.length - 1];
		
		// Additional variables to support desired paging style
		var currentPageNumber = null;
		var firstPageNumber = 1;
		var totalRowCount = ctx.ListData.ResultTables[0].TotalRows; 
		var rowsPerPageCount = ctx.ListData.Properties.RowLimit;
		var rowsOnCurrentPageCount = ctx.ListData.ResultTables[0].RowCount;
		var lastPageNumber = Math.ceil(totalRowCount / rowsPerPageCount);
		var currentPageStartItem;
		var currentPageEndItem;
		
		// Figure out the current page information
        for (var i = 0; i< pagingInfo.length; i++)
        {
            var pl = pagingInfo[i];
            if (!$isNull(pl))
            {
                if (pl.startItem == -1)
                {
                    currentPage = pl;
					currentPageNumber = pl.pageNumber;
					currentPageStartItem = ((currentPageNumber - 1) * rowsPerPageCount) + 1;
					if (currentPageNumber == lastPageNumber) {
						currentPageEndItem = totalRowCount;
					} else {
						currentPageEndItem = currentPageNumber * rowsPerPageCount;
					}
				}
            }
        }

		// Generate page divs and their links
		var getPageNumberDivs = function() {
			var currentDiv, divBlocks, pageStartItem;
			divBlocks = '';
			for (var i = firstPageNumber; i <= lastPageNumber; i++) {
				cellStyle = 'sas-paging-tablecell';
				if (i == currentPageNumber) {
					currentDiv = '<div class="sas-paging-tablecell sas-paging-currentpage">';
					currentDiv += i;
					currentDiv += '</div>';
				} else {
					pageStartItem = ((i - 1) * rowsPerPageCount) + 1;
					currentDiv = '<div class="sas-paging-tablecell">';
					currentDiv += '<a href="#" onclick="addLoading();$getClientControl(this).page(' + $htmlEncode(pageStartItem) + ');return Srch.U.cancelEvent(event);">';
					currentDiv += i;
					currentDiv += '</a></div>';
				}
				divBlocks += currentDiv;
			}
			return divBlocks;
		}
		
		// Generate the block that indicates current page, item counts, etc.
		var getPageSummary = function() {
			var currentDiv;
			var pageInfo = 'Page {1} of {2}, items {3} to {4} of {5}.';
			pageInfo = pageInfo.replace('{1}', '<span>' + currentPageNumber + '</span>');
			pageInfo = pageInfo.replace('{2}', '<span>' + lastPageNumber + '</span>');
			pageInfo = pageInfo.replace('{3}', '<span>' + currentPageStartItem + '</span>');
			pageInfo = pageInfo.replace('{4}', '<span>' + currentPageEndItem + '</span>');
			pageInfo = pageInfo.replace('{5}', '<span>' + totalRowCount + '</span>');
			currentDiv = '<div class="sas-paging-tablecell sas-paging-summary">' + '</span>';
			currentDiv += pageInfo + '</div>';
			return currentDiv;
		}

ms_outHtml.push('        '
,''
,'        </tbody>'
,'     </table>    '
,'          <div class="clear"></div>'
,'			<div class="pagination-row">'
,'			'
,'				<div>'
,'				<div class="paging-summary hidden-xs pull-left">'
,'					', getPageSummary() ,''
,'					</div>'
,'				<div class="paging pull-right">'
,'					', getPageNumberDivs() ,''
,'					</div>'
,'					'
,'				</div>'
,'				<div class="clear"></div>'
,'			</div>'
,'        '
,'           </div>'
,'            '
,'        </div>'
,''
);
	
    }
}
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
function RegisterTemplate_1920f19a59634c8993fc98ba726ed935() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_ListWithPaging", DisplayTemplate_1920f19a59634c8993fc98ba726ed935);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career.js", DisplayTemplate_1920f19a59634c8993fc98ba726ed935);
}
//
		$includeCSS("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career.js", "~sitecollection/_catalogs/masterpage/xPortal/style library/common/Plugins/Pagination/CSWP_Paging.css"); // Make sure the CSS file is available in this location!
	   $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/displayTemplate.js");
	 
    //
}
RegisterTemplate_1920f19a59634c8993fc98ba726ed935();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fCareer\u002fControl_Table_Paging_Career.js"), RegisterTemplate_1920f19a59634c8993fc98ba726ed935);
}