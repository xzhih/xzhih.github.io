!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.Blazy=e()}(this,function(){function t(t){var o=t._util;o.elements=function(t){for(var e=[],o=(t=t.root.querySelectorAll(t.selector)).length;o--;e.unshift(t[o]));return e}(t.options),o.count=o.elements.length,o.destroyed&&(o.destroyed=!1,t.options.container&&d(t.options.container,function(t){l(t,"scroll",o.validateT)}),l(window,"resize",o.saveViewportOffsetT),l(window,"resize",o.validateT),l(window,"scroll",o.validateT)),e(t)}function e(t){for(var e=t._util,n=0;n<e.count;n++){var i,r=e.elements[n],a=r;i=t.options;var c=a.getBoundingClientRect();i.container&&v&&(a=a.closest(i.containerClass))?i=!!o(a=a.getBoundingClientRect(),p)&&o(c,{top:a.top-i.offset,right:a.right+i.offset,bottom:a.bottom+i.offset,left:a.left-i.offset}):i=o(c,p),(i||s(r,t.options.successClass))&&(t.load(r),e.elements.splice(n,1),e.count--,n--)}0===e.count&&t.destroy()}function o(t,e){return t.right>=e.left&&t.bottom>=e.top&&t.left<=e.right&&t.top<=e.bottom}function n(t,e,o){if(!s(t,o.successClass)&&(e||o.loadInvisible||0<t.offsetWidth&&0<t.offsetHeight))if(e=t.getAttribute(m)||t.getAttribute(o.src)){var n=(e=e.split(o.separator))[h&&1<e.length?1:0],c=t.getAttribute(o.srcset),f="img"===t.nodeName.toLowerCase(),p=(e=t.parentNode)&&"picture"===e.nodeName.toLowerCase();if(f||void 0===t.src){var v=new Image,w=function(){o.error&&o.error(t,"invalid"),a(t,o.errorClass),u(v,"error",w),u(v,"load",g)},g=function(){f?p||r(t,n,c):t.style.backgroundImage='url("'+n+'")',i(t,o),u(v,"load",g),u(v,"error",w)};p&&(v=t,d(e.getElementsByTagName("source"),function(t){var e=o.srcset,n=t.getAttribute(e);n&&(t.setAttribute("srcset",n),t.removeAttribute(e))})),l(v,"error",w),l(v,"load",g),r(v,n,c)}else t.src=n,i(t,o)}else"video"===t.nodeName.toLowerCase()?(d(t.getElementsByTagName("source"),function(t){var e=o.src,n=t.getAttribute(e);n&&(t.setAttribute("src",n),t.removeAttribute(e))}),t.load(),i(t,o)):(o.error&&o.error(t,"missing"),a(t,o.errorClass))}function i(t,e){a(t,e.successClass),e.success&&e.success(t),t.removeAttribute(e.src),t.removeAttribute(e.srcset),d(e.breakpoints,function(e){t.removeAttribute(e.src)})}function r(t,e,o){o&&t.setAttribute("srcset",o),t.src=e}function s(t,e){return-1!==(" "+t.className+" ").indexOf(" "+e+" ")}function a(t,e){s(t,e)||(t.className+=" "+e)}function c(t){p.bottom=(window.innerHeight||document.documentElement.clientHeight)+t,p.right=(window.innerWidth||document.documentElement.clientWidth)+t}function l(t,e,o){t.attachEvent?t.attachEvent&&t.attachEvent("on"+e,o):t.addEventListener(e,o,{capture:!1,passive:!0})}function u(t,e,o){t.detachEvent?t.detachEvent&&t.detachEvent("on"+e,o):t.removeEventListener(e,o,{capture:!1,passive:!0})}function d(t,e){if(t&&e)for(var o=t.length,n=0;n<o&&!1!==e(t[n],n);n++);}function f(t,e,o){var n=0;return function(){var i=+new Date;i-n<e||(n=i,t.apply(o,arguments))}}var m,p,h,v;return function(o){if(!document.querySelectorAll){var i=document.createStyleSheet();document.querySelectorAll=function(t,e,o,n,r){for(r=document.all,e=[],o=(t=t.replace(/\[for\b/gi,"[htmlFor").split(",")).length;o--;){for(i.addRule(t[o],"k:v"),n=r.length;n--;)r[n].currentStyle.k&&e.push(r[n]);i.removeRule(0)}return e}}var r=this,s=r._util={};s.elements=[],s.destroyed=!0,r.options=o||{},r.options.error=r.options.error||!1,r.options.offset=r.options.offset||100,r.options.root=r.options.root||document,r.options.success=r.options.success||!1,r.options.selector=r.options.selector||".b-lazy",r.options.separator=r.options.separator||"|",r.options.containerClass=r.options.container,r.options.container=!!r.options.containerClass&&document.querySelectorAll(r.options.containerClass),r.options.errorClass=r.options.errorClass||"b-error",r.options.breakpoints=r.options.breakpoints||!1,r.options.loadInvisible=r.options.loadInvisible||!1,r.options.successClass=r.options.successClass||"b-loaded",r.options.validateDelay=r.options.validateDelay||25,r.options.saveViewportOffsetDelay=r.options.saveViewportOffsetDelay||50,r.options.srcset=r.options.srcset||"data-srcset",r.options.src=m=r.options.src||"data-src",v=Element.prototype.closest,h=1<window.devicePixelRatio,(p={}).top=0-r.options.offset,p.left=0-r.options.offset,r.revalidate=function(){t(r)},r.load=function(t,e){var o=this.options;void 0===t.length?n(t,e,o):d(t,function(t){n(t,e,o)})},r.destroy=function(){var t=this._util;this.options.container&&d(this.options.container,function(e){u(e,"scroll",t.validateT)}),u(window,"scroll",t.validateT),u(window,"resize",t.validateT),u(window,"resize",t.saveViewportOffsetT),t.count=0,t.elements.length=0,t.destroyed=!0},s.validateT=f(function(){e(r)},r.options.validateDelay,r),s.saveViewportOffsetT=f(function(){c(r.options.offset)},r.options.saveViewportOffsetDelay,r),c(r.options.offset),d(r.options.breakpoints,function(t){if(t.width>=window.screen.width)return m=t.src,!1}),setTimeout(function(){t(r)})}}),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(t){var e,o=(this.document||this.ownerDocument).querySelectorAll(t),n=this;do{for(e=o.length;--e>=0&&o.item(e)!==n;);}while(e<0&&(n=n.parentElement));return n}),function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var o=document.createEvent("CustomEvent");return o.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),o}if("function"==typeof window.CustomEvent)return!1;t.prototype=window.Event.prototype,window.CustomEvent=t}(),function(){for(var t=0,e=["ms","moz","webkit","o"],o=0;o<e.length&&!window.requestAnimationFrame;++o)window.requestAnimationFrame=window[e[o]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[o]+"CancelAnimationFrame"]||window[e[o]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,o){var n=(new Date).getTime(),i=Math.max(0,16-(n-t)),r=window.setTimeout(function(){e(n+i)},i);return t=n+i,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),function(t,e){"function"==typeof define&&define.amd?define([],function(){return e(t)}):"object"==typeof exports?module.exports=e(t):t.SmoothScroll=e(t)}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,function(t){"use strict";var e={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},o=function(){var t={};return Array.prototype.forEach.call(arguments,function(e){for(var o in e){if(!e.hasOwnProperty(o))return;t[o]=e[o]}}),t},n=function(e){return parseInt(t.getComputedStyle(e).height,10)},i=function(t){var e;try{e=decodeURIComponent(t)}catch(o){e=t}return e},r=function(t){"#"===t.charAt(0)&&(t=t.substr(1));for(var e,o=String(t),n=o.length,i=-1,r="",s=o.charCodeAt(0);++i<n;){if(0===(e=o.charCodeAt(i)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");r+=e>=1&&e<=31||127==e||0===i&&e>=48&&e<=57||1===i&&e>=48&&e<=57&&45===s?"\\"+e.toString(16)+" ":e>=128||45===e||95===e||e>=48&&e<=57||e>=65&&e<=90||e>=97&&e<=122?o.charAt(i):"\\"+o.charAt(i)}var a;try{a=decodeURIComponent("#"+r)}catch(t){a="#"+r}return a},s=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},a=function(t){return t?n(t)+t.offsetTop:0},c=function(e,o,n,i){if(o.emitEvents&&"function"==typeof t.CustomEvent){var r=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:i}});document.dispatchEvent(r)}};return function(n,l){var u,d,f,m,p={cancelScroll:function(t){cancelAnimationFrame(m),m=null,t||c("scrollCancel",u)}};p.animateScroll=function(n,i,r){var l=o(u||e,r||{}),d="[object Number]"===Object.prototype.toString.call(n),h=d||!n.tagName?null:n;if(d||h){var v=t.pageYOffset;l.header&&!f&&(f=document.querySelector(l.header));var w,g,y,b=a(f),S=d?n:function(e,o,n,i){var r=0;if(e.offsetParent)do{r+=e.offsetTop,e=e.offsetParent}while(e);return r=Math.max(r-o-n,0),i&&(r=Math.min(r,s()-t.innerHeight)),r}(h,b,parseInt("function"==typeof l.offset?l.offset(n,i):l.offset,10),l.clip),E=S-v,A=s(),C=0,O=function(t,e){var o=e.speedAsDuration?e.speed:Math.abs(t/1e3*e.speed);return e.durationMax&&o>e.durationMax?e.durationMax:e.durationMin&&o<e.durationMin?e.durationMin:o}(E,l),q=function(e,o){var r=t.pageYOffset;if(e==o||r==o||(v<o&&t.innerHeight+r)>=A)return p.cancelScroll(!0),function(e,o,n){0===e&&document.body.focus(),n||(e.focus(),document.activeElement!==e&&(e.setAttribute("tabindex","-1"),e.focus(),e.style.outline="none"),t.scrollTo(0,o))}(n,o,d),c("scrollStop",l,n,i),w=null,m=null,!0},L=function(e){w||(w=e),g=(C+=e-w)/parseInt(O,10),y=v+E*function(t,e){var o;return"easeInQuad"===t.easing&&(o=e*e),"easeOutQuad"===t.easing&&(o=e*(2-e)),"easeInOutQuad"===t.easing&&(o=e<.5?2*e*e:(4-2*e)*e-1),"easeInCubic"===t.easing&&(o=e*e*e),"easeOutCubic"===t.easing&&(o=--e*e*e+1),"easeInOutCubic"===t.easing&&(o=e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1),"easeInQuart"===t.easing&&(o=e*e*e*e),"easeOutQuart"===t.easing&&(o=1- --e*e*e*e),"easeInOutQuart"===t.easing&&(o=e<.5?8*e*e*e*e:1-8*--e*e*e*e),"easeInQuint"===t.easing&&(o=e*e*e*e*e),"easeOutQuint"===t.easing&&(o=1+--e*e*e*e*e),"easeInOutQuint"===t.easing&&(o=e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e),t.customEasing&&(o=t.customEasing(e)),o||e}(l,g=g>1?1:g),t.scrollTo(0,Math.floor(y)),q(y,S)||(m=t.requestAnimationFrame(L),w=e)};0===t.pageYOffset&&t.scrollTo(0,0),function(t,e,o){e||history.pushState&&o.updateURL&&history.pushState({smoothScroll:JSON.stringify(o),anchor:t.id},document.title,t===document.documentElement?"#top":"#"+t.id)}(n,d,l),c("scrollStart",l,n,i),p.cancelScroll(!0),t.requestAnimationFrame(L)}};var h=function(e){if(!("matchMedia"in t&&t.matchMedia("(prefers-reduced-motion)").matches)&&0===e.button&&!e.metaKey&&!e.ctrlKey&&"closest"in e.target&&(d=e.target.closest(n))&&"a"===d.tagName.toLowerCase()&&!e.target.closest(u.ignore)&&d.hostname===t.location.hostname&&d.pathname===t.location.pathname&&/#/.test(d.href)){var o=r(i(d.hash)),s=u.topOnEmptyHash&&"#"===o?document.documentElement:document.querySelector(o);(s=s||"#top"!==o?s:document.documentElement)&&(e.preventDefault(),function(e){if(history.replaceState&&e.updateURL&&!history.state){var o=t.location.hash;o=o||t.pageYOffset,history.replaceState({smoothScroll:JSON.stringify(e),anchor:o||t.pageYOffset},document.title,o||t.location.href)}}(u),p.animateScroll(s,d))}},v=function(t){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(u)){var e=history.state.anchor;e&&0!==e&&!(e=document.querySelector(r(i(history.state.anchor))))||p.animateScroll(e,null,{updateURL:!1})}};return p.destroy=function(){u&&(document.removeEventListener("click",h,!1),t.removeEventListener("popstate",v,!1),p.cancelScroll(),u=null,null,d=null,f=null,null,m=null)},p.init=function(n){if(!("querySelector"in document&&"addEventListener"in t&&"requestAnimationFrame"in t&&"closest"in t.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";p.destroy(),u=o(e,n||{}),f=u.header?document.querySelector(u.header):null,document.addEventListener("click",h,!1),u.updateURL&&u.popstate&&t.addEventListener("popstate",v,!1)},p.init(l),p}});var scroll=new SmoothScroll('a[href*="#"]',{speed:1e3,easing:"easeInOutCubic",speedAsDuration:!0,clip:!0,ignore:".subscribe-button, .search-overlay-close"}),postProgressBar=function(){var t=document.querySelector("progress"),e=document.querySelector(".floating-header"),o=document.querySelector(".post-full-title"),n=window.scrollY,i=window.innerHeight,r=!1;function s(){var s=o.getBoundingClientRect().top+window.scrollY,a=o.offsetHeight+35,c=document.body.offsetHeight-i;n>=s+a?e.classList.add("floating-active"):e.classList.remove("floating-active"),t.setAttribute("max",c),t.setAttribute("value",n),r=!1}window.addEventListener("scroll",function(){n=window.scrollY,r||requestAnimationFrame(s),r=!0},{passive:!0}),s()};postProgressBar();var tocBar=document.querySelector(".toc-bar "),tocOpen=document.querySelector(".toc-open"),tocClose=document.querySelector(".toc-close"),tocSwitch=document.querySelector(".toc-switch"),tocMain=document.querySelector(".toc-main"),tocWidth=window.getComputedStyle(tocMain).width.replace("px","");window.screen.width>="768"&&(tocBar.style.right=-tocWidth+"px"),tocSwitch.addEventListener("click",function(){tocOpen.classList.contains("hide")?(window.screen.width>="768"?tocBar.style.right=-tocWidth+"px":tocBar.style.top="100%",tocClose.classList.add("hide"),tocOpen.classList.remove("hide")):(window.screen.width>="768"?tocBar.style.right=0:tocBar.style.top=0,tocOpen.classList.add("hide"),tocClose.classList.remove("hide"))});var tocItem=document.querySelectorAll(".toc-link");tocItem.forEach(function(t){t.addEventListener("click",function(){window.screen.width<"768"&&(tocBar.style.top="100%",tocClose.classList.add("hide"),tocOpen.classList.remove("hide"))})});