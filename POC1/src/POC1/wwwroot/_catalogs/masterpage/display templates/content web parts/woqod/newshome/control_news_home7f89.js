/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_ce5db51966ff45f18dc4d5032ba55fe4(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_ce5db51966ff45f18dc4d5032ba55fe4.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fNewsHome\u002fControl_News_home.js';
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
    iStr.push('<div class="col-xs-12 col-md-4 withBorder"><div class="newsCol">');
    iStr.push(itemRenderResult);
    iStr.push('</div></div>');
    return iStr.join('');
}
ctx['ItemRenderWrapper'] = ListRenderRenderWrapper;
ms_outHtml.push(''
,''
,''
,'        <section>'
,'        '
,''
,'        <div class="container">'
,'         <div class="row">'
,'        '
,'	       '
,'         ', ctx.RenderGroups(ctx) ,''
,'            '
,'	        	        	'
,'		            '
,'	        	            '
,'        </div>'
,'        '
);
                
               
if (!ctx.ClientControl.get_shouldShowNoResultMessage())
{
ms_outHtml.push(''
,''
,''
,'        <div class="row">'
,'            <div class="col-xs-12">'
,'                <div class="moreBorder"></div>'
,'                <div class="moreCont">'
,'                    <a href="', $resource("newsURL") ,'">'
,'                        <span class="arrowIco"></span>'
,'                        <span class="moreLbl">', $resource("goToNews") ,'</span>'
,'                    </a>'
,'                </div>'
,'            </div>'
,'        </div>'
,'            '
);
                
               
}
ms_outHtml.push(''
,''
,'                                                        '
,'        </div>'
,'	</section>'
,'	'
);
    AddPostRenderCallback(ctx, function(){
		var siteURL = SP.PageContextInfo.get_siteServerRelativeUrl();
		
		//for loading vimeo thumbnail images
		function vimeoLoadingThumb(vimeoID){    								
			var vimeoJsonURL = "http://vimeo.com/api/v2/video/"+ vimeoID +".json";	
			$.getJSON( vimeoJsonURL, function( data ) {							        						
				$.each(data, function() {														            															
					var id_anchor = "#video-vimeo-" + data[0].id;
					$(id_anchor).find('img').attr('src',data[0].thumbnail_medium);							
				});				
			});					
		}						
		$('.vimeo-video-ext').each(function(){
			videoURL = $(this).attr('data-href');
			vimeoID = videoURL.substring(videoURL.lastIndexOf('/')+1);					
			vimeoLoadingThumb(vimeoID)			
		})
					
		//adjusting the height of the images loaded online from youtube or vimeo as thubmnails
		var offlineImgHt = parseInt($('#box-listing .offline-img').css('height')) -2;
		$('.online-video-img').height(offlineImgHt);			
		$(window).resize(function(){
			setTimeout(function(){
				offlineImgHt = parseInt($('#box-listing .offline-img').css('height')) -2;
				$('.online-video-img').height(offlineImgHt);
			}, 200)				
		})
		
		
		$('#box-listing h6 a.xTitle-js').each(function(){
			smartTrimText($(this), 60);
			setTimeout(function() {
				$('#box-listing h6 a.xTitle-js').equalHeights();
			}, 500);
		});
		$('#box-listing .item-summary').each(function(){                    
			smartTrimText($(this), 110);
			setTimeout(function() {
				$('#box-listing .item-summary').equalHeights();
			}, 500);
		})

		//for centralizing the pager, as it widths changes whenever and page appears
		//centerSPpager();
		
		
		
		
		

    });
ms_outHtml.push(''
,''
,''
);
if (ctx.ClientControl.get_shouldShowNoResultMessage())
{
ms_outHtml.push(''
,''
,'<div class="row">'
,'            <div class="col-xs-12">'
,'<br />'
,''
,'        <div class="', noResultsClassName ,' noData">'
,'            ', $noResults ,'</div>'
,'            '
,'            </div></div>'
);
}
ms_outHtml.push(''
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_ce5db51966ff45f18dc4d5032ba55fe4() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_ListWithPaging", DisplayTemplate_ce5db51966ff45f18dc4d5032ba55fe4);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fNewsHome\u002fControl_News_home.js", DisplayTemplate_ce5db51966ff45f18dc4d5032ba55fe4);
}
//
    $includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fNewsHome\u002fControl_News_home.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/CustomStrings.js");
    //
}
RegisterTemplate_ce5db51966ff45f18dc4d5032ba55fe4();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fContent Web Parts\u002fWOQOD\u002fNewsHome\u002fControl_News_home.js"), RegisterTemplate_ce5db51966ff45f18dc4d5032ba55fe4);
}