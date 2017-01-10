/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_23d5f96dcfde4ddb807a7d54210584fe(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_23d5f96dcfde4ddb807a7d54210584fe.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fWOQOD\u002fWOQOD_filter_Dropdown_Vacancies.js';
  ctx['DisplayTemplateData']['TemplateType']='Filter';
  ctx['DisplayTemplateData']['TargetControlType']=['Refinement'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['CompatibleSearchDataTypes']=[];
  ctx['DisplayTemplateData']['CompatibleManagedProperties']=[];

ms_outHtml.push('',''
);
  // Needed objects
  var listData = ctx.ListData;
  var hasControl = true;

  // Create a new hidden block outside the current refinement control
  var refElm = document.getElementById('Refinement');
  var hiddenBlockID = ctx.RefinementControl.containerId + "_" + ctx.RefinementControl.propertyName;
  var hiddenBlock = document.getElementById(hiddenBlockID);
  // Check if the hidden block exists, otherwise we create one
  if (hiddenBlock === null || hiddenBlock.lenght <= 0) {
    hiddenBlock = document.createElement('div');
    refElm.appendChild(hiddenBlock);
    hiddenBlock.setAttribute('id', hiddenBlockID);
    hiddenBlock.setAttribute('style', 'display:none;');
  }

  // Dropdown Group IDs
  var unselDD = ctx.RefinementControl.containerId + "_Unsel";
  var selDD = ctx.RefinementControl.containerId + "_Sel";

  var currentRefinementCategory = ctx.ClientControl.getCurrentRefinementCategory(ctx.RefinementControl.propertyName);
  // Check if the object is null or undefined && Count the tokens currently in place
  var hasAnyFiltertokens = (!Srch.U.n(currentRefinementCategory) && currentRefinementCategory.get_tokenCount() > 0);
  
  // Check if the current Refinement Control can be exists
  if ($isNull(ctx.RefinementControl) || $isNull(ctx.ClientControl)) hasControl = false;

  if (hasControl) {
    if(!$isNull(listData) && !$isEmptyArray(listData)) {
        // Show the refinement title
        var isExpanded = Srch.Refinement.getExpanded(ctx.RefinementControl.propertyName);
        var iconClass = (isExpanded == "true"? "ms-ref-uparrow" : "ms-ref-downarrow");
        var refinerCatTitle = Srch.Refinement.getRefinementTitle(ctx.RefinementControl);
        // Display style > needed to hide the refinement list when collapsed
        var displayStyle = (isExpanded == "true"? "" : "none");
ms_outHtml.push(''
,'        <div id="DDLDeprtmentFilter">'
,'            <!-- ', Srch.U.collapsibleRefinerTitle(ctx.RefinementControl.propertyName, ctx.ClientControl.get_id(), refinerCatTitle, iconClass) ,'-->'
,''
);
        // (un)selected filter arrays
        var unselectedFilters = new Array();
        var selectedFilters = new Array();

        // Fill the arrays with refinement values
        for (var i = 0; i < listData.length; i++){
            var filter = listData[i];
            if(!$isNull(filter)) {
                filter.RefinementTokens = [listData[i].RefinementToken];
                filter.RefinementTokenWrappedValues = [Srch.RefinementUtil.stringValueToEqualsToken(listData[i].RefinementValue)];

                if (ctx.ClientControl.hasAllRefinementFilters(filter.RefinerName, filter.RefinementTokens) ||
                    ctx.ClientControl.hasAllRefinementFilters(filter.RefinerName, filter.RefinementTokenWrappedValues)) {
                    selectedFilters.push(filter);
                } else {
                    unselectedFilters.push(filter);
                }
            }
        }
		var clearRefiner = new Object();
		clearRefiner[ctx.RefinementControl.propertyName] = null;
		var onChangeOrClick = "$getClientControl(document.getElementById('"+ctx.RefinementControl.containerId+"')).updateRefinersJSON('" + $scriptEncode(Sys.Serialization.JavaScriptSerializer.serialize(clearRefiner)) + "');";
ms_outHtml.push(''
,'<span class="pull-left">',$resource("FilterDepartment"),'</span>'
,'<div class="customSelectCont">'
,'		'
,'        <select class="ms-ref-unselSec customSelect" onchange="javascript:new Function(this.value)();">'
,'            <option value="',onChangeOrClick,'">',$resource("lblAll"),'</option>'
);
        if (selectedFilters.length > 0 || hasAnyFiltertokens) {
ms_outHtml.push(''
,'            <optgroup label="', $resource("selectedFilters") ,'" id="', selDD ,'">'
);
            for (var i = 0; i < selectedFilters.length; i++) {
                var filter = selectedFilters[i];
                if(!$isNull(filter)) {
                    var refiners = new Object();
                    refiners[filter.RefinerName] = filter.RefinementTokens;
                    ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, 'removeRefinementFiltersJSON', true);
                }
            }
ms_outHtml.push(''
,'            </optgroup>'
);
        }
ms_outHtml.push(''
,'            <optgroup label="', $resource("otherFilter") ,'" id="', unselDD ,'">'
);
            if (unselectedFilters.length > 0) {
                // Clear the hidden list
                ClearHiddenList();
                for (var i = 0; i < unselectedFilters.length; i++) {
                    var filter = unselectedFilters[i];
                    if(!$isNull(filter)) {
                        var refiners = new Object();
                        refiners[filter.RefinerName] = filter.RefinementTokens;
                        ShowRefiner(filter.RefinementName, filter.RefinementCount, refiners, 'updateRefinersJSON', false);
                    }
                }
            }
ms_outHtml.push(' '
,'            </optgroup>'
,'        </select>'
,'        </div>'
,'        <div id="RemoveRefinement">'
);
        if (selectedFilters.length > 0 || hasAnyFiltertokens) {
            var refinerRemoval = new Object();
            refinerRemoval[ctx.RefinementControl.propertyName] = null;
            //ShowRefiner($resource("Clear"), null, refinerRemoval, 'updateRefinersJSON', false);
        }
ms_outHtml.push(''
,'        </div>'
,'      </div>'
);
    }
	else{
		var refinerRemoval = new Object();
		refinerRemoval[ctx.RefinementControl.propertyName] = null;
		//ShowRefiner($resource("Clear"), null, refinerRemoval, 'updateRefinersJSON', false);
	}
  }
 



    function ValueChanged(value) {}

    function ShowRefiner(refinementName, refinementCount, refiners, method, selected) {
        // Create the onClick or onChange event
        var onChangeOrClick = "$getClientControl(document.getElementById('"+ctx.RefinementControl.containerId+"'))." + method + "('" + $scriptEncode(Sys.Serialization.JavaScriptSerializer.serialize(refiners)) + "');";
        
        // Check if there aren't filter tokens in place
        if (!hasAnyFiltertokens) {
		
          var elm = document.getElementById(hiddenBlockID);
           var option = document.createElement('option');
           var text = document.createTextNode(refinementName);
		    option.appendChild(text);
           option.setAttribute('value', onChangeOrClick);
            elm.appendChild(option);
        }

        // Check if the refinement contains results && if the current item is selected
        if (refinementCount != null && selected !== true) {
ms_outHtml.push(''
,'           <option value="', onChangeOrClick ,'">', $htmlEncode(refinementName) ,'</option>'
);
        } else if (refinementCount != null && selected === true) {
ms_outHtml.push(''
,'           <option value="', onChangeOrClick ,'" selected="selected">', $htmlEncode(refinementName) ,'</option>'
);
        } else {
ms_outHtml.push(''
,'            <div><a href="javascript:{}" onclick="', onChangeOrClick ,'">', $htmlEncode(refinementName) ,'</a></div>'
);
        }
    }

    function ClearHiddenList() {
        var elm = document.getElementById(hiddenBlockID);
        while (elm.hasChildNodes()) {
            elm.removeChild(elm.lastChild);
        }
    }

    function GetAllElementsWithAttribute(element, attribute, value) {
        var matchingElements = [];
        var allElements = element.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].getAttribute(attribute)) {
                if (value === allElements[i].getAttribute(attribute)) {
                    matchingElements.push(allElements[i]);
                }
            }
        }
        return matchingElements;
    }

    // Run this after the control is rendered - this will populate the unselected option group
    AddPostRenderCallback(ctx, function() {
        if (hasAnyFiltertokens) {
            // Get the hidden block
            var hiddenOptions = document.getElementById(hiddenBlockID).children;
            var unSelGroup = document.getElementById(unselDD);
            var selGroup = document.getElementById(selDD);
            // Clone all the elements from the hidden list to the unselected option group
			if(selGroup != null){
				for (var i = 0; i < hiddenOptions.length; i++) {
					var selectedElm = GetAllElementsWithAttribute(selGroup, 'value', hiddenOptions[i].getAttribute('value').replace('updateRefinersJSON', 'removeRefinementFiltersJSON'));
					if (selectedElm === null || selectedElm.length <= 0) {
						var cloneElm = hiddenOptions[i].cloneNode(true);
						unSelGroup.appendChild(cloneElm);
					}
				}
			}
        }
        
    });
ms_outHtml.push(''
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_23d5f96dcfde4ddb807a7d54210584fe() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("CustomRefinement", DisplayTemplate_23d5f96dcfde4ddb807a7d54210584fe);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fWOQOD\u002fWOQOD_filter_Dropdown_Vacancies.js", DisplayTemplate_23d5f96dcfde4ddb807a7d54210584fe);
}
//
		$includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fWOQOD\u002fWOQOD_filter_Dropdown_Vacancies.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/Stations.js");
		$includeLanguageScript("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fWOQOD\u002fWOQOD_filter_Dropdown_Vacancies.js", "~sitecollection/_catalogs/masterpage/Display Templates/Language Files/{Locale}/displayTemplate.js");
        
           //
}
RegisterTemplate_23d5f96dcfde4ddb807a7d54210584fe();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fWOQOD\u002fWOQOD_filter_Dropdown_Vacancies.js"), RegisterTemplate_23d5f96dcfde4ddb807a7d54210584fe);
}