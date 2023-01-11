(()=>{var t={932:(t,e,i)=>{"use strict";const s=i(501),n=i(844),r=i(192);t.exports={XMLParser:n,XMLValidator:s,XMLBuilder:r}},849:(t,e)=>{"use strict";const i="[:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",s=new RegExp("^"+i+"$");e.isExist=function(t){return void 0!==t},e.isEmptyObject=function(t){return 0===Object.keys(t).length},e.merge=function(t,e,i){if(e){const s=Object.keys(e),n=s.length;for(let r=0;r<n;r++)t[s[r]]="strict"===i?[e[s[r]]]:e[s[r]]}},e.getValue=function(t){return e.isExist(t)?t:""},e.isName=function(t){return!(null==s.exec(t))},e.getAllMatches=function(t,e){const i=[];let s=e.exec(t);for(;s;){const n=[];n.startIndex=e.lastIndex-s[0].length;const r=s.length;for(let t=0;t<r;t++)n.push(s[t]);i.push(n),s=e.exec(t)}return i},e.nameRegexp=i},501:(t,e,i)=>{"use strict";const s=i(849),n={allowBooleanAttributes:!1,unpairedTags:[]};function r(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function o(t,e){const i=e;for(;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{const s=t.substr(i,e-i);if(e>5&&"xml"===s)return p("InvalidXml","XML declaration allowed only at the start of the document.",f(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function a(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let i=1;for(e+=8;e<t.length;e++)if("<"===t[e])i++;else if(">"===t[e]&&(i--,0===i))break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}function l(t,e){let i="",s="",n=!1;for(;e<t.length;e++){if('"'===t[e]||"'"===t[e])""===s?s=t[e]:s!==t[e]||(s="");else if(">"===t[e]&&""===s){n=!0;break}i+=t[e]}return""===s&&{value:i,index:e,tagClosed:n}}e.validate=function(t,e){e=Object.assign({},n,e);const i=[];let c=!1,h=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(let n=0;n<t.length;n++)if("<"===t[n]&&"?"===t[n+1]){if(n+=2,n=o(t,n),n.err)return n}else{if("<"!==t[n]){if(r(t[n]))continue;return p("InvalidChar","char '"+t[n]+"' is not expected.",f(t,n))}{let m=n;if(n++,"!"===t[n]){n=a(t,n);continue}{let x=!1;"/"===t[n]&&(x=!0,n++);let N="";for(;n<t.length&&">"!==t[n]&&" "!==t[n]&&"\t"!==t[n]&&"\n"!==t[n]&&"\r"!==t[n];n++)N+=t[n];if(N=N.trim(),"/"===N[N.length-1]&&(N=N.substring(0,N.length-1),n--),g=N,!s.isName(g)){let e;return e=0===N.trim().length?"Invalid space after '<'.":"Tag '"+N+"' is an invalid name.",p("InvalidTag",e,f(t,n))}const y=l(t,n);if(!1===y)return p("InvalidAttr","Attributes for '"+N+"' have open quote.",f(t,n));let b=y.value;if(n=y.index,"/"===b[b.length-1]){const i=n-b.length;b=b.substring(0,b.length-1);const s=u(b,e);if(!0!==s)return p(s.err.code,s.err.msg,f(t,i+s.err.line));c=!0}else if(x){if(!y.tagClosed)return p("InvalidTag","Closing tag '"+N+"' doesn't have proper closing.",f(t,n));if(b.trim().length>0)return p("InvalidTag","Closing tag '"+N+"' can't have attributes or invalid starting.",f(t,m));{const e=i.pop();if(N!==e.tagName){let i=f(t,e.tagStartPos);return p("InvalidTag","Expected closing tag '"+e.tagName+"' (opened in line "+i.line+", col "+i.col+") instead of closing tag '"+N+"'.",f(t,m))}0==i.length&&(h=!0)}}else{const s=u(b,e);if(!0!==s)return p(s.err.code,s.err.msg,f(t,n-b.length+s.err.line));if(!0===h)return p("InvalidXml","Multiple possible root nodes found.",f(t,n));-1!==e.unpairedTags.indexOf(N)||i.push({tagName:N,tagStartPos:m}),c=!0}for(n++;n<t.length;n++)if("<"===t[n]){if("!"===t[n+1]){n++,n=a(t,n);continue}if("?"!==t[n+1])break;if(n=o(t,++n),n.err)return n}else if("&"===t[n]){const e=d(t,n);if(-1==e)return p("InvalidChar","char '&' is not expected.",f(t,n));n=e}else if(!0===h&&!r(t[n]))return p("InvalidXml","Extra text at the end",f(t,n));"<"===t[n]&&n--}}}var g;return c?1==i.length?p("InvalidTag","Unclosed tag '"+i[0].tagName+"'.",f(t,i[0].tagStartPos)):!(i.length>0)||p("InvalidXml","Invalid '"+JSON.stringify(i.map((t=>t.tagName)),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):p("InvalidXml","Start tag expected.",1)};const c=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function u(t,e){const i=s.getAllMatches(t,c),n={};for(let t=0;t<i.length;t++){if(0===i[t][1].length)return p("InvalidAttr","Attribute '"+i[t][2]+"' has no space in starting.",g(i[t]));if(void 0!==i[t][3]&&void 0===i[t][4])return p("InvalidAttr","Attribute '"+i[t][2]+"' is without value.",g(i[t]));if(void 0===i[t][3]&&!e.allowBooleanAttributes)return p("InvalidAttr","boolean attribute '"+i[t][2]+"' is not allowed.",g(i[t]));const s=i[t][2];if(!h(s))return p("InvalidAttr","Attribute '"+s+"' is an invalid name.",g(i[t]));if(n.hasOwnProperty(s))return p("InvalidAttr","Attribute '"+s+"' is repeated.",g(i[t]));n[s]=1}return!0}function d(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let i=/\d/;for("x"===t[e]&&(e++,i=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(i))break}return-1}(t,++e);let i=0;for(;e<t.length;e++,i++)if(!(t[e].match(/\w/)&&i<20)){if(";"===t[e])break;return-1}return e}function p(t,e,i){return{err:{code:t,msg:e,line:i.line||i,col:i.col}}}function h(t){return s.isName(t)}function f(t,e){const i=t.substring(0,e).split(/\r?\n/);return{line:i.length,col:i[i.length-1].length+1}}function g(t){return t.startIndex+t[1].length}},192:(t,e,i)=>{"use strict";const s=i(592),n={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],transformTagName:!1};function r(t){this.options=Object.assign({},n,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=f),this.processTextOrObjNode=a,this.options.format?(this.indentate=h,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine=""),this.options.suppressEmptyNode?(this.buildTextNode=p,this.buildObjNode=c):(this.buildTextNode=u,this.buildObjNode=l),this.buildTextValNode=u,this.buildObjectNode=l,this.replaceEntitiesValue=d,this.buildAttrPairStr=o}function o(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'}function a(t,e,i){const s=this.j2x(t,i+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextNode(t[this.options.textNodeName],e,s.attrStr,i):this.buildObjNode(s.val,e,s.attrStr,i)}function l(t,e,i,s){let n="</"+e+this.tagEndChar,r="";return"?"===e[0]&&(r="?",n=""),i&&-1===t.indexOf("<")?this.indentate(s)+"<"+e+i+r+">"+t+n:!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===r.length?this.indentate(s)+`\x3c!--${t}--\x3e`+this.newLine:this.indentate(s)+"<"+e+i+r+this.tagEndChar+t+this.indentate(s)+n}function c(t,e,i,s){return""!==t?this.buildObjectNode(t,e,i,s):"?"===e[0]?this.indentate(s)+"<"+e+i+"?"+this.tagEndChar:this.indentate(s)+"<"+e+i+"/"+this.tagEndChar}function u(t,e,i,s){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(s)+`<![CDATA[${t}]]>`+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(s)+`\x3c!--${t}--\x3e`+this.newLine;{let n=this.options.tagValueProcessor(e,t);return n=this.replaceEntitiesValue(n),""===n&&-1!==this.options.unpairedTags.indexOf(e)?this.options.suppressUnpairedNode?this.indentate(s)+"<"+e+this.tagEndChar:this.indentate(s)+"<"+e+"/"+this.tagEndChar:this.indentate(s)+"<"+e+i+">"+n+"</"+e+this.tagEndChar}}function d(t){if(t&&t.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){const i=this.options.entities[e];t=t.replace(i.regex,i.val)}return t}function p(t,e,i,s){return""===t&&-1!==this.options.unpairedTags.indexOf(e)?this.options.suppressUnpairedNode?this.indentate(s)+"<"+e+this.tagEndChar:this.indentate(s)+"<"+e+"/"+this.tagEndChar:""!==t?this.buildTextValNode(t,e,i,s):"?"===e[0]?this.indentate(s)+"<"+e+i+"?"+this.tagEndChar:this.indentate(s)+"<"+e+i+"/"+this.tagEndChar}function h(t){return this.options.indentBy.repeat(t)}function f(t){return!!t.startsWith(this.options.attributeNamePrefix)&&t.substr(this.attrPrefixLen)}r.prototype.build=function(t){return this.options.preserveOrder?s(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0).val)},r.prototype.j2x=function(t,e){let i="",s="";for(let n in t)if(void 0===t[n]);else if(null===t[n])"?"===n[0]?s+=this.indentate(e)+"<"+n+"?"+this.tagEndChar:s+=this.indentate(e)+"<"+n+"/"+this.tagEndChar;else if(t[n]instanceof Date)s+=this.buildTextNode(t[n],n,"",e);else if("object"!=typeof t[n]){const r=this.isAttribute(n);if(r)i+=this.buildAttrPairStr(r,""+t[n]);else if(n===this.options.textNodeName){let e=this.options.tagValueProcessor(n,""+t[n]);s+=this.replaceEntitiesValue(e)}else s+=this.buildTextNode(t[n],n,"",e)}else if(Array.isArray(t[n])){const i=t[n].length;for(let r=0;r<i;r++){const i=t[n][r];void 0===i||(null===i?"?"===n[0]?s+=this.indentate(e)+"<"+n+"?"+this.tagEndChar:s+=this.indentate(e)+"<"+n+"/"+this.tagEndChar:s+="object"==typeof i?this.processTextOrObjNode(i,n,e):this.buildTextNode(i,n,"",e))}}else if(this.options.attributesGroupName&&n===this.options.attributesGroupName){const e=Object.keys(t[n]),s=e.length;for(let r=0;r<s;r++)i+=this.buildAttrPairStr(e[r],""+t[n][e[r]])}else s+=this.processTextOrObjNode(t[n],n,e);return{attrStr:i,val:s}},t.exports=r},592:t=>{function e(t,o,a,l){let c="",u="";o.format&&o.indentBy.length>0&&(u="\n"+o.indentBy.repeat(l));for(let d=0;d<t.length;d++){const p=t[d],h=i(p);let f="";if(f=0===a.length?h:`${a}.${h}`,h===o.textNodeName){let t=p[h];n(f,o)||(t=o.tagValueProcessor(h,t),t=r(t,o)),c+=u+t;continue}if(h===o.cdataPropName){c+=u+`<![CDATA[${p[h][0][o.textNodeName]}]]>`;continue}if(h===o.commentPropName){c+=u+`\x3c!--${p[h][0][o.textNodeName]}--\x3e`;continue}if("?"===h[0]){const t=s(p[":@"],o),e="?xml"===h?"":u;let i=p[h][0][o.textNodeName];i=0!==i.length?" "+i:"",c+=e+`<${h}${i}${t}?>`;continue}let g=u+`<${h}${s(p[":@"],o)}`,m=e(p[h],o,f,l+1);-1!==o.unpairedTags.indexOf(h)?o.suppressUnpairedNode?c+=g+">":c+=g+"/>":m&&0!==m.length||!o.suppressEmptyNode?c+=g+`>${m}${u}</${h}>`:c+=g+"/>"}return c}function i(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const i=e[t];if(":@"!==i)return i}}function s(t,e){let i="";if(t&&!e.ignoreAttributes)for(let s in t){let n=e.attributeValueProcessor(s,t[s]);n=r(n,e),!0===n&&e.suppressBooleanAttributes?i+=` ${s.substr(e.attributeNamePrefix.length)}`:i+=` ${s.substr(e.attributeNamePrefix.length)}="${n}"`}return i}function n(t,e){let i=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(let s in e.stopNodes)if(e.stopNodes[s]===t||e.stopNodes[s]==="*."+i)return!0;return!1}function r(t,e){if(t&&t.length>0&&e.processEntities)for(let i=0;i<e.entities.length;i++){const s=e.entities[i];t=t.replace(s.regex,s.val)}return t}t.exports=function(t,i){return e(t,i,"",0)}},780:t=>{const e=RegExp("^\\s([a-zA-z0-0]+)[ \t](['\"])([^&]+)\\2");function i(t,i){const s=e.exec(t);s&&(i[s[1]]={regx:RegExp(`&${s[1]};`,"g"),val:s[3]})}t.exports=function(t,e){const s={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");{e+=9;let n=1,r=!1,o=!1,a=!1,l="";for(;e<t.length;e++)if("<"===t[e]){if(r&&"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7])e+=7,o=!0;else if(r&&"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8])e+=8;else if(r&&"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8])e+=8;else if(r&&"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9])e+=9;else{if("!"!==t[e+1]||"-"!==t[e+2]||"-"!==t[e+3])throw new Error("Invalid DOCTYPE");a=!0}n++,l=""}else if(">"===t[e]){if(a){if("-"!==t[e-1]||"-"!==t[e-2])throw new Error("Invalid XML comment in DOCTYPE");a=!1}else o&&(i(l,s),o=!1);if(n--,0===n)break}else"["===t[e]?r=!0:l+=t[e];if(0!==n)throw new Error("Unclosed DOCTYPE")}return{entities:s,i:e}}},745:(t,e)=>{const i={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1};e.buildOptions=function(t){return Object.assign({},i,t)},e.defaultOptions=i},78:(t,e,i)=>{"use strict";const s=i(849),n=i(311),r=i(780),o=i(153);function a(t){const e=Object.keys(t);for(let i=0;i<e.length;i++){const s=e[i];this.lastEntities[s]={regex:new RegExp("&"+s+";","g"),val:t[s]}}}function l(t,e,i,s,n,r,o){if(void 0!==t&&(this.options.trimValues&&!s&&(t=t.trim()),t.length>0)){o||(t=this.replaceEntitiesValue(t));const s=this.options.tagValueProcessor(e,t,i,n,r);return null==s?t:typeof s!=typeof t||s!==t?s:this.options.trimValues||t.trim()===t?y(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function c(t){if(this.options.removeNSPrefix){const e=t.split(":"),i="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=i+e[1])}return t}"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,s.nameRegexp);const u=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function d(t,e){if(!this.options.ignoreAttributes&&"string"==typeof t){const i=s.getAllMatches(t,u),n=i.length,r={};for(let t=0;t<n;t++){const s=this.resolveNameSpace(i[t][1]);let n=i[t][4];const o=this.options.attributeNamePrefix+s;if(s.length)if(void 0!==n){this.options.trimValues&&(n=n.trim()),n=this.replaceEntitiesValue(n);const t=this.options.attributeValueProcessor(s,n,e);r[o]=null==t?n:typeof t!=typeof n||t!==n?t:y(n,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(r[o]=!0)}if(!Object.keys(r).length)return;if(this.options.attributesGroupName){const t={};return t[this.options.attributesGroupName]=r,t}return r}}const p=function(t){t=t.replace(/\r\n?/g,"\n");const e=new n("!xml");let i=e,s="",o="";for(let a=0;a<t.length;a++)if("<"===t[a])if("/"===t[a+1]){const e=m(t,">",a,"Closing Tag is not closed.");let n=t.substring(a+2,e).trim();if(this.options.removeNSPrefix){const t=n.indexOf(":");-1!==t&&(n=n.substr(t+1))}this.options.transformTagName&&(n=this.options.transformTagName(n)),i&&(s=this.saveTextToParentTag(s,i,o)),o=o.substr(0,o.lastIndexOf(".")),i=this.tagsNodeStack.pop(),s="",a=e}else if("?"===t[a+1]){let e=x(t,a,!1,"?>");if(!e)throw new Error("Pi Tag is not closed.");if(s=this.saveTextToParentTag(s,i,o),this.options.ignoreDeclaration&&"?xml"===e.tagName||this.options.ignorePiTags);else{const t=new n(e.tagName);t.add(this.options.textNodeName,""),e.tagName!==e.tagExp&&e.attrExpPresent&&(t[":@"]=this.buildAttributesMap(e.tagExp,o)),i.addChild(t)}a=e.closeIndex+1}else if("!--"===t.substr(a+1,3)){const e=m(t,"--\x3e",a+4,"Comment is not closed.");if(this.options.commentPropName){const n=t.substring(a+4,e-2);s=this.saveTextToParentTag(s,i,o),i.add(this.options.commentPropName,[{[this.options.textNodeName]:n}])}a=e}else if("!D"===t.substr(a+1,2)){const e=r(t,a);this.docTypeEntities=e.entities,a=e.i}else if("!["===t.substr(a+1,2)){const e=m(t,"]]>",a,"CDATA is not closed.")-2,n=t.substring(a+9,e);if(s=this.saveTextToParentTag(s,i,o),this.options.cdataPropName)i.add(this.options.cdataPropName,[{[this.options.textNodeName]:n}]);else{let t=this.parseTextData(n,i.tagname,o,!0,!1,!0);null==t&&(t=""),i.add(this.options.textNodeName,t)}a=e+2}else{let r=x(t,a,this.options.removeNSPrefix),l=r.tagName,c=r.tagExp,u=r.attrExpPresent,d=r.closeIndex;this.options.transformTagName&&(l=this.options.transformTagName(l)),i&&s&&"!xml"!==i.tagname&&(s=this.saveTextToParentTag(s,i,o,!1)),l!==e.tagname&&(o+=o?"."+l:l);const p=i;if(p&&-1!==this.options.unpairedTags.indexOf(p.tagname)&&(i=this.tagsNodeStack.pop()),this.isItStopNode(this.options.stopNodes,o,l)){let e="";if(c.length>0&&c.lastIndexOf("/")===c.length-1)a=r.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(l))a=r.closeIndex;else{const i=this.readStopNodeData(t,l,d+1);if(!i)throw new Error(`Unexpected end of ${l}`);a=i.i,e=i.tagContent}const s=new n(l);l!==c&&u&&(s[":@"]=this.buildAttributesMap(c,o)),e&&(e=this.parseTextData(e,l,o,!0,u,!0,!0)),o=o.substr(0,o.lastIndexOf(".")),s.add(this.options.textNodeName,e),i.addChild(s)}else{if(c.length>0&&c.lastIndexOf("/")===c.length-1){"/"===l[l.length-1]?(l=l.substr(0,l.length-1),c=l):c=c.substr(0,c.length-1),this.options.transformTagName&&(l=this.options.transformTagName(l));const t=new n(l);l!==c&&u&&(t[":@"]=this.buildAttributesMap(c,o)),o=o.substr(0,o.lastIndexOf(".")),i.addChild(t)}else{const t=new n(l);this.tagsNodeStack.push(i),l!==c&&u&&(t[":@"]=this.buildAttributesMap(c,o)),i.addChild(t),i=t}s="",a=d}}else s+=t[a];return e.child},h=function(t){if(this.options.processEntities){for(let e in this.docTypeEntities){const i=this.docTypeEntities[e];t=t.replace(i.regx,i.val)}for(let e in this.lastEntities){const i=this.lastEntities[e];t=t.replace(i.regex,i.val)}if(this.options.htmlEntities)for(let e in this.htmlEntities){const i=this.htmlEntities[e];t=t.replace(i.regex,i.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function f(t,e,i,s){return t&&(void 0===s&&(s=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,i,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,s))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function g(t,e,i){const s="*."+i;for(const i in t){const n=t[i];if(s===n||e===n)return!0}return!1}function m(t,e,i,s){const n=t.indexOf(e,i);if(-1===n)throw new Error(s);return n+e.length-1}function x(t,e,i,s=">"){const n=function(t,e,i=">"){let s,n="";for(let r=e;r<t.length;r++){let e=t[r];if(s)e===s&&(s="");else if('"'===e||"'"===e)s=e;else if(e===i[0]){if(!i[1])return{data:n,index:r};if(t[r+1]===i[1])return{data:n,index:r}}else"\t"===e&&(e=" ");n+=e}}(t,e+1,s);if(!n)return;let r=n.data;const o=n.index,a=r.search(/\s/);let l=r,c=!0;if(-1!==a&&(l=r.substr(0,a).replace(/\s\s*$/,""),r=r.substr(a+1)),i){const t=l.indexOf(":");-1!==t&&(l=l.substr(t+1),c=l!==n.data.substr(t+1))}return{tagName:l,tagExp:r,closeIndex:o,attrExpPresent:c}}function N(t,e,i){const s=i;let n=1;for(;i<t.length;i++)if("<"===t[i])if("/"===t[i+1]){const r=m(t,">",i,`${e} is not closed`);if(t.substring(i+2,r).trim()===e&&(n--,0===n))return{tagContent:t.substring(s,i),i:r};i=r}else if("?"===t[i+1])i=m(t,"?>",i+1,"StopNode is not closed.");else if("!--"===t.substr(i+1,3))i=m(t,"--\x3e",i+3,"StopNode is not closed.");else if("!["===t.substr(i+1,2))i=m(t,"]]>",i,"StopNode is not closed.")-2;else{const s=x(t,i,">");s&&((s&&s.tagName)===e&&"/"!==s.tagExp[s.tagExp.length-1]&&n++,i=s.closeIndex)}}function y(t,e,i){if(e&&"string"==typeof t){const e=t.trim();return"true"===e||"false"!==e&&o(t,i)}return s.isExist(t)?t:""}t.exports=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=a,this.parseXml=p,this.parseTextData=l,this.resolveNameSpace=c,this.buildAttributesMap=d,this.isItStopNode=g,this.replaceEntitiesValue=h,this.readStopNodeData=N,this.saveTextToParentTag=f}}},844:(t,e,i)=>{const{buildOptions:s}=i(745),n=i(78),{prettify:r}=i(997),o=i(501);t.exports=class{constructor(t){this.externalEntities={},this.options=s(t)}parse(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});const i=o.validate(t,e);if(!0!==i)throw Error(`${i.err.msg}:${i.err.line}:${i.err.col}`)}const i=new n(this.options);i.addExternalEntities(this.externalEntities);const s=i.parseXml(t);return this.options.preserveOrder||void 0===s?s:r(s,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}}},997:(t,e)=>{"use strict";function i(t,e,o){let a;const l={};for(let c=0;c<t.length;c++){const u=t[c],d=s(u);let p="";if(p=void 0===o?d:o+"."+d,d===e.textNodeName)void 0===a?a=u[d]:a+=""+u[d];else{if(void 0===d)continue;if(u[d]){let t=i(u[d],e,p);const s=r(t,e);u[":@"]?n(t,u[":@"],p,e):1!==Object.keys(t).length||void 0===t[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(t).length&&(e.alwaysCreateTextNode?t[e.textNodeName]="":t=""):t=t[e.textNodeName],void 0!==l[d]&&l.hasOwnProperty(d)?(Array.isArray(l[d])||(l[d]=[l[d]]),l[d].push(t)):e.isArray(d,p,s)?l[d]=[t]:l[d]=t}}}return"string"==typeof a?a.length>0&&(l[e.textNodeName]=a):void 0!==a&&(l[e.textNodeName]=a),l}function s(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const i=e[t];if(":@"!==i)return i}}function n(t,e,i,s){if(e){const n=Object.keys(e),r=n.length;for(let o=0;o<r;o++){const r=n[o];s.isArray(r,i+"."+r,!0,!0)?t[r]=[e[r]]:t[r]=e[r]}}}function r(t,e){const i=Object.keys(t).length;return!!(0===i||1===i&&t[e.textNodeName])}e.prettify=function(t,e){return i(t,e)}},311:t=>{"use strict";t.exports=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){this.child.push({[t]:e})}addChild(t){t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}}},153:t=>{const e=/^[-+]?0x[a-fA-F0-9]+$/,i=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const s={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};t.exports=function(t,n={}){if(n=Object.assign({},s,n),!t||"string"!=typeof t)return t;let r=t.trim();if(void 0!==n.skipLike&&n.skipLike.test(r))return t;if(n.hex&&e.test(r))return Number.parseInt(r,16);{const e=i.exec(r);if(e){const i=e[1],s=e[2];let a=(o=e[3])&&-1!==o.indexOf(".")?("."===(o=o.replace(/0+$/,""))?o="0":"."===o[0]?o="0"+o:"."===o[o.length-1]&&(o=o.substr(0,o.length-1)),o):o;const l=e[4]||e[6];if(!n.leadingZeros&&s.length>0&&i&&"."!==r[2])return t;if(!n.leadingZeros&&s.length>0&&!i&&"."!==r[1])return t;{const e=Number(r),o=""+e;return-1!==o.search(/[eE]/)||l?n.eNotation?e:t:-1!==r.indexOf(".")?"0"===o&&""===a||o===a||i&&o==="-"+a?e:t:s?a===o||i+a===o?e:t:r===o||r===i+o?e:t}}return t}var o}},94:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.KeybindingsJsonGenerator=void 0,e.KeybindingsJsonGenerator=class{static gene(t){return JSON.stringify(t,void 0,4)}}},642:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ImporterTypePickerList=e.DEFAULT=e.XML_FILE=void 0,e.XML_FILE={label:"Import from XML file",detail:"Import key maps (schemas) from IntelliJ settings."},e.DEFAULT={label:"Use Default"},e.ImporterTypePickerList=[e.XML_FILE,e.DEFAULT]},521:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.OSPickerList=e.WINDOWS_TO_WINDOWS=e.WINDOWS_TO_MAC=e.WINDOWS_TO_LINUX=e.MAC_TO_WINDOWS=e.MAC_TO_MAC=e.MAC_TO_LINUX=e.LINUX_TO_WINDOWS=e.LINUX_TO_MAC=e.LINUX_TO_LINUX=void 0,e.LINUX_TO_LINUX={label:"Linux to Linux"},e.LINUX_TO_MAC={label:"Linux to Mac"},e.LINUX_TO_WINDOWS={label:"Linux to Windows"},e.MAC_TO_LINUX={label:"Mac to Linux"},e.MAC_TO_MAC={label:"Mac to Mac"},e.MAC_TO_WINDOWS={label:"Mac to Windows"},e.WINDOWS_TO_LINUX={label:"Windows to Linux"},e.WINDOWS_TO_MAC={label:"Windows to Mac"},e.WINDOWS_TO_WINDOWS={label:"Windows to Windows"},e.OSPickerList=[e.LINUX_TO_LINUX,e.LINUX_TO_MAC,e.LINUX_TO_WINDOWS,e.MAC_TO_LINUX,e.MAC_TO_MAC,e.MAC_TO_WINDOWS,e.WINDOWS_TO_LINUX,e.WINDOWS_TO_MAC,e.WINDOWS_TO_WINDOWS]},288:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.IntelliJKeymapXML=void 0,e.IntelliJKeymapXML=class{static INTELLIJ_KEY_DELIMITTER=/ /g;static INTELLIJ_META_KEY=/meta/g;actionId;first;second;constructor(t,e,i){this.actionId=t,this.first=e,this.second=i}}},652:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ActionIdCommandMapping=void 0,e.ActionIdCommandMapping=class{intellij;vscode;constructor(t,e){this.intellij=t,this.vscode=e}}},84:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.KeystrokeKeyMapping=void 0,e.KeystrokeKeyMapping=class{intellij;vscode;constructor(t,e){this.intellij=new RegExp(`\\b${t}\\b`,"g"),this.vscode=e}}},7:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VSCodeKeyAbstract=void 0;class i{static VSCODE_SECOND_DELIMITER=" ";keystrokeKeyMappings;key;constructor(t,e){this.keystrokeKeyMappings=e,this.key=this.convert(t.first),t.second&&(this.key+=i.VSCODE_SECOND_DELIMITER+this.convert(t.second))}convert(t){for(const e of this.keystrokeKeyMappings)t=t.replace(e.intellij,e.vscode);return t}}e.VSCodeKeyAbstract=i},404:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VSCodeKeyLinux=void 0;const s=i(7);class n extends s.VSCodeKeyAbstract{}e.VSCodeKeyLinux=n},962:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VSCodeKeyMac=void 0;const s=i(288),n=i(7);class r extends n.VSCodeKeyAbstract{static VSCODE_META="cmd";convert(t){return super.convert(t).replace(s.IntelliJKeymapXML.INTELLIJ_META_KEY,r.VSCODE_META)}}e.VSCodeKeyMac=r},878:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VSCodeKeyWindows=void 0;const s=i(288),n=i(7);class r extends n.VSCodeKeyAbstract{static VSCODE_META="win";convert(t){return super.convert(t).replace(s.IntelliJKeymapXML.INTELLIJ_META_KEY,r.VSCODE_META)}}e.VSCodeKeyWindows=r},827:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VSCodeKeybindingDefault=void 0,e.VSCodeKeybindingDefault=class{command;key;when;constructor(t,e,i){this.command=t,this.key=e,this.when=i}}},545:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ActionIdCommandMappingJsonParser=void 0;const s=i(652);e.ActionIdCommandMappingJsonParser=class{static desirialize(t){if(!t)return[];const e=new Array,i=JSON.parse(t);for(let t=0;t<i.length;t++){const n=i[t],r=new s.ActionIdCommandMapping(n.intellij,n.vscode);e.push(r)}return e}}},371:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.IntelliJXMLParser=void 0;const s=i(932),n=i(288);class r{static ALWAYS_ARRAY=["keymap.action","keymap.action.keyboard-shortcut"];static parseToJson(t){if(!t)return;const e={ignoreDeclaration:!0,ignoreAttributes:!1,parseAttributeValue:!0,isArray:(t,e,i,s)=>r.ALWAYS_ARRAY.includes(e)},i=new s.XMLParser(e);try{return i.parse(t,e)}catch(t){throw Error("Cannot load this IntelliJ IDEA Keymap file. Plesase check the file format.")}}static desirialize(t){if(!t||!t.keymap)return[];const e=new Array,i=t.keymap.action;for(const t in i){const s=i[t]["@_id"],r=i[t]["keyboard-shortcut"];for(const t in r){const i=r[t],o=i["@_first-keystroke"],a=i["@_second-keystroke"],l=new n.IntelliJKeymapXML(s,o,a);e.push(l)}}return e}}e.IntelliJXMLParser=r},537:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.KeystrokeKeyMappingJsonParser=void 0;const s=i(84);e.KeystrokeKeyMappingJsonParser=class{static desirialize(t){if(!t)return[];const e=new Array,i=JSON.parse(t);for(let t=0;t<i.length;t++){const n=i[t],r=new s.KeystrokeKeyMapping(n.intellij,n.vscode);e.push(r)}return e}}},863:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VSCodeJsonParser=void 0;const s=i(827);e.VSCodeJsonParser=class{static desirialize(t){if(!t)return[];const e=new Array;return JSON.parse(t).map((t=>{const i=new s.VSCodeKeybindingDefault(t.command,t.key,t.when);e.push(i)})),e}}},236:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FileOpenDialog=void 0;const s=i(496),n=i(923);e.FileOpenDialog=class{static async showXml(){const t=await s.window.showOpenDialog({canSelectFiles:!0,filters:{XML:["xml"]}});if(t&&t[0])return n.FileReader.read(t[0])}}},923:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FileReader=void 0;const s=i(496);e.FileReader=class{static async read(t){const e=await s.workspace.fs.readFile(t);return Buffer.from(e).toString("utf8")}}},446:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FileReaderDefault=void 0;const s=i(17),n=i(496),r=i(923);class o{static RESOURCE_PATH="resource";static DEFAULT_PATH=s.posix.join(o.RESOURCE_PATH,"default");static async readIntelliJ(t,e){const i=n.Uri.file(e.asAbsolutePath(s.posix.join(this.DEFAULT_PATH,t,"IntelliJ.xml")));return r.FileReader.read(i)}static async readVSCode(t,e){const i=n.Uri.file(e.asAbsolutePath(s.posix.join(this.DEFAULT_PATH,t,"VSCode.json")));return r.FileReader.read(i)}static async readActionIdCommandMapping(t){const e=n.Uri.file(t.asAbsolutePath(s.posix.join(this.RESOURCE_PATH,"ActionIdCommandMapping.json")));return r.FileReader.read(e)}static async readKeystrokeKeyMapping(t){const e=n.Uri.file(t.asAbsolutePath(s.posix.join(this.RESOURCE_PATH,"KeystrokeKeyMapping.json")));return r.FileReader.read(e)}}e.FileReaderDefault=o},777:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Picker=void 0;const s=i(496),n=i(642),r=i(521);e.Picker=class{static async pickImporterType(){switch(await s.window.showQuickPick(n.ImporterTypePickerList,{placeHolder:"Which OS do you want to convert for?",ignoreFocusOut:!0})){case n.XML_FILE:return"XmlFile";case n.DEFAULT:return"Default";case void 0:return}}static async pickOSDestionation(){switch(await s.window.showQuickPick(r.OSPickerList,{placeHolder:"Which OS do you want to convert for?",ignoreFocusOut:!0})){case r.LINUX_TO_LINUX:return{src:"Linux",dst:"Linux"};case r.LINUX_TO_MAC:return{src:"Linux",dst:"Mac"};case r.LINUX_TO_WINDOWS:return{src:"Linux",dst:"Windows"};case r.MAC_TO_LINUX:return{src:"Mac",dst:"Linux"};case r.MAC_TO_MAC:return{src:"Mac",dst:"Mac"};case r.MAC_TO_WINDOWS:return{src:"Mac",dst:"Windows"};case r.WINDOWS_TO_LINUX:return{src:"Windows",dst:"Linux"};case r.WINDOWS_TO_MAC:return{src:"Windows",dst:"Mac"};case r.WINDOWS_TO_WINDOWS:return{src:"Windows",dst:"Windows"};case void 0:return}}}},59:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.IntelliJSyntaxAnalyzer=void 0;const s=i(827),n=i(404),r=i(962),o=i(878);class a{static REMOVE_KEYBINDING="-";osDestination;actionIdCommandMappings;keystrokeKeyMappings;vscodeDefaults;intellijDefaults;intellijCustoms;constructor(t,e,i,s,n,r){this.osDestination=t,this.actionIdCommandMappings=a.groupBy(e,(t=>t.intellij)),this.keystrokeKeyMappings=i,this.vscodeDefaults=a.groupBy(s,(t=>t.command)),this.intellijDefaults=n,this.intellijCustoms=a.groupBy(r,(t=>t.actionId))}convert(){let t=[];const e=this.action(t,this.addCustomIntelliJ);t=t.concat(e);const i=this.action(t,void 0,this.addDefaultIntelliJ);t=t.concat(i);const s=this.action(t,this.removeDefaultVSCode,this.removeDefaultVSCode);t=t.concat(s);const n=this.action(t,this.removeDefaultIntelliJ,this.removeDefaultIntelliJ);return t=t.concat(n),t}action(t,e,i){const s=[];for(const n of this.intellijDefaults)if(this.actionIdCommandMappings[n.actionId])for(const r of this.actionIdCommandMappings[n.actionId]){const o=r.intellij,a=r.vscode;if(this.vscodeDefaults[a])for(const r of this.vscodeDefaults[a])if(this.intellijCustoms[o]){if(e)for(const i of this.intellijCustoms[o]){const o=e(s.concat(t),r,n,i);o&&s.push(o)}}else if(i){const e=i(s.concat(t),r,n,void 0);e&&s.push(e)}}return s}addCustomIntelliJ=(t,e,i,n)=>{const r=this.convertToKey(n).key,o=e.when,a=e.command;return t.some((t=>t.key===r&&t.command===a&&t.when===o))?void 0:new s.VSCodeKeybindingDefault(a,r,o)};addDefaultIntelliJ=(t,e,i)=>{const n=this.convertToKey(i).key,r=e.when,o=e.command;return t.some((t=>t.key===n&&t.command===o&&t.when===r))?void 0:new s.VSCodeKeybindingDefault(o,n,r)};removeDefaultVSCode=(t,e,i,n)=>{const r=e.key,o=e.command;if(t.some((t=>t.key===r&&t.command.endsWith(o))))return;const l=`${a.REMOVE_KEYBINDING}${o}`;return new s.VSCodeKeybindingDefault(l,r)};removeDefaultIntelliJ=(t,e,i,n)=>{const r=this.convertToKey(i).key,o=e.command;if(t.some((t=>t.key===r&&t.command.endsWith(o))))return;const l=`${a.REMOVE_KEYBINDING}${o}`;return new s.VSCodeKeybindingDefault(l,r)};convertToKey(t){switch(this.osDestination){case"Linux":return new n.VSCodeKeyLinux(t,this.keystrokeKeyMappings);case"Mac":return new r.VSCodeKeyMac(t,this.keystrokeKeyMappings);case"Windows":return new o.VSCodeKeyWindows(t,this.keystrokeKeyMappings)}}static groupBy(t,e){return t.reduce(((t,i)=>{const s=e(i);return t[s]=t[s]??[],t[s].push(i),t}),{})}}e.IntelliJSyntaxAnalyzer=a},514:(t,e,i)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FileOpen=void 0;const s=i(496);e.FileOpen=class{static async openText(t){return await s.workspace.openTextDocument({language:"json",content:t})}static async showKeybindingsJson(t){await s.commands.executeCommand("workbench.action.openGlobalKeybindingsFile");const e=new s.Range(t.lineAt(0).range.start,t.lineAt(t.lineCount-1).range.end);await s.window.showTextDocument(t,{selection:e}),await s.window.showInformationMessage("Please copy & paste it into keybindings.json")}}},496:t=>{"use strict";t.exports=require("vscode")},17:t=>{"use strict";t.exports=require("path")}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var r=e[s]={exports:{}};return t[s](r,r.exports,i),r.exports}var s={};(()=>{"use strict";var t=s;Object.defineProperty(t,"__esModule",{value:!0}),t.importKeyMapsSchema=t.activate=void 0;const e=i(496),n=i(94),r=i(545),o=i(371),a=i(537),l=i(863),c=i(236),u=i(446),d=i(777),p=i(59),h=i(514);async function f(t){const e=await d.Picker.pickImporterType();if(!e)return;const i=await d.Picker.pickOSDestionation();if(!i)return;let s;if("XmlFile"===e&&(s=await c.FileOpenDialog.showXml(),!s))return;const f=await u.FileReaderDefault.readIntelliJ(i.src,t),g=await u.FileReaderDefault.readVSCode(i.src,t),m=await u.FileReaderDefault.readActionIdCommandMapping(t),x=await u.FileReaderDefault.readKeystrokeKeyMapping(t),N=await o.IntelliJXMLParser.parseToJson(s),y=await o.IntelliJXMLParser.parseToJson(f),b=o.IntelliJXMLParser.desirialize(N),v=o.IntelliJXMLParser.desirialize(y),O=l.VSCodeJsonParser.desirialize(g),E=r.ActionIdCommandMappingJsonParser.desirialize(m),I=a.KeystrokeKeyMappingJsonParser.desirialize(x),T=new p.IntelliJSyntaxAnalyzer(i.dst,E,I,O,v,b).convert(),_=n.KeybindingsJsonGenerator.gene(T),w=await h.FileOpen.openText(_);await h.FileOpen.showKeybindingsJson(w)}t.activate=function(t){t.subscriptions.push(e.commands.registerCommand("intellij.importKeyMapsSchema",(async()=>await f(t))))},t.importKeyMapsSchema=f})();var n=exports;for(var r in s)n[r]=s[r];s.__esModule&&Object.defineProperty(n,"__esModule",{value:!0})})();