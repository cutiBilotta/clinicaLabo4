(self.webpackChunkclinica=self.webpackChunkclinica||[]).push([[592],{217:function(v,A){var s,f;void 0!==(f="function"==typeof(s=function(){"use strict";function r(e,t,i){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){u(n.response,t,i)},n.onerror=function(){console.error("could not download file")},n.send()}function _(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function l(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,m=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),u=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!m?function(e,t,i){var n=a.URL||a.webkitURL,o=document.createElement("a");o.download=t=t||e.name||"download",o.rel="noopener","string"==typeof e?(o.href=e,o.origin===location.origin?l(o):_(o.href)?r(e,t,i):l(o,o.target="_blank")):(o.href=n.createObjectURL(e),setTimeout(function(){n.revokeObjectURL(o.href)},4e4),setTimeout(function(){l(o)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,i){if(t=t||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(function E(e,t){return typeof t>"u"?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(e,i),t);else if(_(e))r(e,t,i);else{var n=document.createElement("a");n.href=e,n.target="_blank",setTimeout(function(){l(n)})}}:function(e,t,i,n){if((n=n||open("","_blank"))&&(n.document.title=n.document.body.innerText="downloading..."),"string"==typeof e)return r(e,t,i);var o="application/octet-stream"===e.type,b=/constructor/i.test(a.HTMLElement)||a.safari,y=/CriOS\/[\d]+/.test(navigator.userAgent);if((y||o&&b||m)&&typeof FileReader<"u"){var d=new FileReader;d.onloadend=function(){var c=d.result;c=y?c:c.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=c:location=c,n=null},d.readAsDataURL(e)}else{var h=a.URL||a.webkitURL,p=h.createObjectURL(e);n?n.location=p:location.href=p,n=null,setTimeout(function(){h.revokeObjectURL(p)},4e4)}});a.saveAs=u.saveAs=u,v.exports=u})?s.apply(A,[]):s)&&(v.exports=f)}}]);