window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;--t>=0&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}if("function"==typeof window.CustomEvent)return!1;e.prototype=window.Event.prototype,window.CustomEvent=e}(),function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var o=(new Date).getTime(),i=Math.max(0,16-(o-e)),r=window.setTimeout(function(){t(o+i)},i);return e=o+i,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}(),function(e,t){"function"==typeof define&&define.amd?define([],function(){return t(e)}):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,function(e){"use strict";var t={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},n=function(){var e={};return Array.prototype.forEach.call(arguments,function(t){for(var n in t){if(!t.hasOwnProperty(n))return;e[n]=t[n]}}),e},o=function(t){return parseInt(e.getComputedStyle(t).height,10)},i=function(e){var t;try{t=decodeURIComponent(e)}catch(n){t=e}return t},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,i=-1,r="",a=n.charCodeAt(0);++i<o;){if(0===(t=n.charCodeAt(i)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");r+=t>=1&&t<=31||127==t||0===i&&t>=48&&t<=57||1===i&&t>=48&&t<=57&&45===a?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(i):"\\"+n.charAt(i)}var c;try{c=decodeURIComponent("#"+r)}catch(e){c="#"+r}return c},a=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},c=function(e){return e?o(e)+e.offsetTop:0},s=function(t,n,o,i){if(n.emitEvents&&"function"==typeof e.CustomEvent){var r=new CustomEvent(t,{bubbles:!0,detail:{anchor:o,toggle:i}});document.dispatchEvent(r)}};return function(o,u){var l,d,m,f,h={cancelScroll:function(e){cancelAnimationFrame(f),f=null,e||s("scrollCancel",l)}};h.animateScroll=function(o,i,r){var u=n(l||t,r||{}),d="[object Number]"===Object.prototype.toString.call(o),p=d||!o.tagName?null:o;if(d||p){var w=e.pageYOffset;u.header&&!m&&(m=document.querySelector(u.header));var g,y,v,S=c(m),b=d?o:function(t,n,o,i){var r=0;if(t.offsetParent)do{r+=t.offsetTop,t=t.offsetParent}while(t);return r=Math.max(r-n-o,0),i&&(r=Math.min(r,a()-e.innerHeight)),r}(p,S,parseInt("function"==typeof u.offset?u.offset(o,i):u.offset,10),u.clip),E=b-w,A=a(),C=0,O=function(e,t){var n=t.speedAsDuration?t.speed:Math.abs(e/1e3*t.speed);return t.durationMax&&n>t.durationMax?t.durationMax:t.durationMin&&n<t.durationMin?t.durationMin:n}(E,u),q=function(t,n){var r=e.pageYOffset;if(t==n||r==n||(w<n&&e.innerHeight+r)>=A)return h.cancelScroll(!0),function(t,n,o){0===t&&document.body.focus(),o||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))}(o,n,d),s("scrollStop",u,o,i),g=null,f=null,!0},L=function(t){g||(g=t),y=(C+=t-g)/parseInt(O,10),v=w+E*function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t}(u,y=y>1?1:y),e.scrollTo(0,Math.floor(v)),q(v,b)||(f=e.requestAnimationFrame(L),g=t)};0===e.pageYOffset&&e.scrollTo(0,0),function(e,t,n){t||history.pushState&&n.updateURL&&history.pushState({smoothScroll:JSON.stringify(n),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id)}(o,d,u),s("scrollStart",u,o,i),h.cancelScroll(!0),e.requestAnimationFrame(L)}};var p=function(t){if(!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)&&0===t.button&&!t.metaKey&&!t.ctrlKey&&"closest"in t.target&&(d=t.target.closest(o))&&"a"===d.tagName.toLowerCase()&&!t.target.closest(l.ignore)&&d.hostname===e.location.hostname&&d.pathname===e.location.pathname&&/#/.test(d.href)){var n=r(i(d.hash)),a=l.topOnEmptyHash&&"#"===n?document.documentElement:document.querySelector(n);(a=a||"#top"!==n?a:document.documentElement)&&(t.preventDefault(),function(t){if(history.replaceState&&t.updateURL&&!history.state){var n=e.location.hash;n=n||e.pageYOffset,history.replaceState({smoothScroll:JSON.stringify(t),anchor:n||e.pageYOffset},document.title,n||e.location.href)}}(l),h.animateScroll(a,d))}},w=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(l)){var t=history.state.anchor;t&&0!==t&&!(t=document.querySelector(r(i(history.state.anchor))))||h.animateScroll(t,null,{updateURL:!1})}};return h.destroy=function(){l&&(document.removeEventListener("click",p,!1),e.removeEventListener("popstate",w,!1),h.cancelScroll(),l=null,null,d=null,m=null,null,f=null)},h.init=function(o){if(!("querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";h.destroy(),l=n(t,o||{}),m=l.header?document.querySelector(l.header):null,document.addEventListener("click",p,!1),l.updateURL&&l.popstate&&e.addEventListener("popstate",w,!1)},h.init(u),h}});var scroll=new SmoothScroll('a[href*="#"]',{speed:1e3,easing:"easeInOutCubic",speedAsDuration:!0,clip:!0,ignore:".subscribe-button, .search-overlay-close"}),postProgressBar=function(){var e=document.querySelector("progress"),t=document.querySelector(".floating-header"),n=document.querySelector(".post-full-title"),o=window.scrollY,i=window.innerHeight,r=!1;function a(){var a=n.getBoundingClientRect().top+window.scrollY,c=n.offsetHeight+35,s=document.body.offsetHeight-i;o>=a+c?t.classList.add("floating-active"):t.classList.remove("floating-active"),e.setAttribute("max",s),e.setAttribute("value",o),r=!1}window.addEventListener("scroll",function(){o=window.scrollY,r||requestAnimationFrame(a),r=!0},{passive:!0}),a()};postProgressBar();var tocBar=document.querySelector(".toc-bar "),tocOpen=document.querySelector(".toc-open"),tocClose=document.querySelector(".toc-close"),tocSwitch=document.querySelector(".toc-switch"),tocMain=document.querySelector(".toc-main"),tocWidth=window.getComputedStyle(tocMain).width.replace("px","");window.screen.width>="768"&&(tocBar.style.right=-tocWidth+"px"),tocSwitch.addEventListener("click",function(){tocOpen.classList.contains("hide")?(window.screen.width>="768"?tocBar.style.right=-tocWidth+"px":tocBar.style.top="100%",tocClose.classList.add("hide"),tocOpen.classList.remove("hide")):(window.screen.width>="768"?tocBar.style.right=0:tocBar.style.top=0,tocOpen.classList.add("hide"),tocClose.classList.remove("hide"))});var tocItem=document.querySelectorAll(".toc-link");tocItem.forEach(function(e){e.addEventListener("click",function(){window.screen.width<"768"&&(tocBar.style.top="100%",tocClose.classList.add("hide"),tocOpen.classList.remove("hide"))})});