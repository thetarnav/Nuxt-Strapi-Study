(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{425:function(t,e,r){var content=r(430);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(24).default)("5f59e45a",content,!0,{sourceMap:!1})},429:function(t,e,r){"use strict";r(425)},430:function(t,e,r){var n=r(23)((function(i){return i[1]}));n.push([t.i,"@keyframes shimmer-data-v-30bdf2f7{to{transform:translateX(100%)}}.slider-container[data-v-30bdf2f7]{position:relative;width:100vw;height:100vw}.swiper-slide[data-v-30bdf2f7]{display:flex;align-items:center;justify-content:center;height:100%;position:relative;width:100%}.img[data-v-30bdf2f7]{max-height:100%;max-width:100%}.swiper-button-next[data-v-30bdf2f7],.swiper-button-prev[data-v-30bdf2f7]{transition:opacity .2s}.swiper-button-next[data-v-30bdf2f7]:after,.swiper-button-prev[data-v-30bdf2f7]:after{display:none}",""]),t.exports=n},442:function(t,e,r){"use strict";r.r(e);r(43);var n=r(1),o=r(437),l=(r(438),n.default.extend({name:"Slider",directives:{swiper:o.directive},props:{images:{type:Array,required:!0}},data:function(){return{swiperOptions:{grabCursor:!0,watchOverflow:!0,speed:400,spaceBetween:30,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}}},computed:{slides:function(){var t=this.images,e=[];return t&&(null==t?void 0:t.length)>1&&(e=t.map((function(t){var e,r,n=t.formats,o=t.url;return(null===(e=n.large)||void 0===e?void 0:e.url)||(null===(r=n.medium)||void 0===r?void 0:r.url)||o||""}))),e}}})),d=(r(429),r(14)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("figure",{directives:[{name:"swiper",rawName:"v-swiper",value:t.swiperOptions,expression:"swiperOptions"}],ref:"swiperEl",staticClass:"slider-container"},[r("div",{staticClass:"swiper-wrapper"},t._l(t.slides,(function(t,e){return r("div",{key:t,staticClass:"swiper-slide"},[r("img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],staticClass:"img",attrs:{"data-src":t,alt:e}})])})),0),t._v(" "),r("Button",{staticClass:"swiper-button-prev circle",attrs:{"leading-icon":"prev"}}),t._v(" "),r("Button",{staticClass:"swiper-button-next circle",attrs:{"leading-icon":"next"}})],1)}),[],!1,null,"30bdf2f7",null);e.default=component.exports;installComponents(component,{Button:r(141).default})}}]);