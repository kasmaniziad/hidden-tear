/* This file is currently associated to an HTML file of the same name and is drawing content from it.  Until the files are disassociated, you will not be able to move, delete, rename, or make any other changes to this file. */

function DisplayTemplate_3f56c718b8c843389e4f6f1b54c1616d(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_3f56c718b8c843389e4f6f1b54c1616d.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fWOQOD\u002fControl_Refinement_WOQOD.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['Refinement'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
); 

        ctx.ClientControl.alternateRenderer = function(container, cntxt) {};
ms_outHtml.push(''
,'        <div class="ms-ref-ctrl" id="Refinement" name="Control">'
); 
            if(!$isNull(ctx.ClientControl)){
                var rcs = ctx.ClientControl.get_selectedRefinementControls();
                if(!$isEmptyArray(rcs)){
                    for(var i = 0; i < rcs.length; i++){
                        var rc = rcs[i];
                        if(!$isNull(rc)){
                            rc.containerId = ctx.ClientControl.get_nextUniqueId(); 
ms_outHtml.push(''
,'                            <div class="ms-ref-refiner" id="', $htmlEncode(rc.containerId) ,'" name="Group" refinerName="', $htmlEncode(rc.propertyName) ,'"></div>'
); 
                        }
                    }
                }
ms_outHtml.push(''
,'             '
);
            }
ms_outHtml.push(''
,'        </div>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_3f56c718b8c843389e4f6f1b54c1616d() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_Refinement", DisplayTemplate_3f56c718b8c843389e4f6f1b54c1616d);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fWOQOD\u002fControl_Refinement_WOQOD.js", DisplayTemplate_3f56c718b8c843389e4f6f1b54c1616d);
}

}
RegisterTemplate_3f56c718b8c843389e4f6f1b54c1616d();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fWOQOD\u002fControl_Refinement_WOQOD.js"), RegisterTemplate_3f56c718b8c843389e4f6f1b54c1616d);
}