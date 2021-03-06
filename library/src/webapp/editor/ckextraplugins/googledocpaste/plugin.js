(function () {
    'use strict';
    CKEDITOR.plugins.add('googleDocPastePlugin', {
        requires: 'clipboard',
        init: function (editor) {
            editor.on('paste', function (evt) {
                if ("data" in evt && "dataValue" in evt.data && evt.data.dataValue.indexOf("docs-internal-guid") > -1 && "dataTransfer" in evt.data && "_" in evt.data.dataTransfer && "data" in evt.data.dataTransfer._ && "text/html" in evt.data.dataTransfer._.data) {
                    evt.data.dataValue = formatting(evt.data.dataTransfer._.data['text/html']);
                }
            });
        }
    });
})();

function recursiveFormatting(context) {
    for(var index = 0; index < context.childNodes.length; index++){
        var clonedEle, ele;
      //for italicity
        if (context.childNodes[index].style.fontStyle !== "") {
            if (context.childNodes[index].style.fontStyle === "italic") {
                context.childNodes[index].style.fontStyle = null;
                clonedEle = context.childNodes[index].cloneNode(true);
                ele = document.createElement("em");
                ele.append(clonedEle)
                context.replaceChild(ele, context.childNodes[index]);
            } else {
                context.childNodes[index].style.fontStyle = null;
            }
        }
     //for underline
        if (context.childNodes[index].style.textDecoration !== "") {
            if (context.childNodes[index].style.textDecoration === "underline") {
                context.childNodes[index].style.textDecoration = null;
                clonedEle = context.childNodes[index].cloneNode(true);
                ele = document.createElement("u");
                ele.append(clonedEle)
                context.replaceChild(ele, context.childNodes[index]);
            } else {
                context.childNodes[index].style.textDecoration = null;
            }
        }
       //for bold
        if (context.childNodes[index].style.fontWeight !== "") {
            if (context.childNodes[index].style.fontWeight > "400") {
                context.childNodes[index].style.fontWeight = null;
                clonedEle = context.childNodes[index].cloneNode(true);
                ele = document.createElement("strong");
                ele.append(clonedEle)
                context.replaceChild(ele, context.childNodes[index]);
            } else {
                context.childNodes[index].style.fontWeight = null;
            }
        }
        if (context.childNodes[index].children.length > 0) {
            recursiveFormatting(context.childNodes[index]);
        }
    }
}


function formatting(str) {

    // SAKAITWTR-184: Fix pasting from Google Doc to CKEditor
    // Purge the meta tag evident when pasting using Windows and Chrome
    var x = str.replace('<meta charset="utf-8">', "");
    return x;

    // The following code block contains the original content of this method
/*
    var parent = document.createElement("div");
    var parentCopy = document.createElement("div");
    parentCopy.innerHTML = str;
    var len = parentCopy.childNodes[0].children.length;
    for(var i = 0; i<len; i++ ) {
        parent.appendChild(parentCopy.childNodes[0].children[i].cloneNode(true));
    }
    recursiveFormatting (parent);
    return parent.innerHTML;
*/

}
