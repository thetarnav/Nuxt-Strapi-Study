(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{135:function(t,e,n){"use strict";var r=n(1),o=n(27),l=n(200),c=n(201);o.a.autoAddCss=!1,o.c.add(c.a),r.a.component("Icon",l.a)},136:function(t,e,n){"use strict";var r=n(1),o=n(202),l=n(203),c=n.n(l);r.a.component("GlobalEvents",o.a),r.a.use(c.a)},137:function(t,e,n){"use strict";n(31);var r=n(3),o=n(1),l=n(141);e.a=function(t){var e=t.store,n=t.$graphql,c=parseInt(localStorage.getItem("lastVisit")||"")||Date.now();function d(){return(d=Object(r.a)(regeneratorRuntime.mark((function t(){var r,o,d,f,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n.request(l.d,{lastVisit:c,weekAgo:Date.now()-6048e5});case 3:r=t.sent,o=r.sinceLastWeek.aggregate.count,d=r.sinceLastVisit.aggregate.count,f=r.available.aggregate.count,m=r.other.aggregate.count,e.commit("setFilterCount",{sinceLastVisit:d,sinceLastWeek:o,countAvailable:f,countOther:m}),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))).apply(this,arguments)}o.a.prototype.$lastVisit=c,function(){d.apply(this,arguments)}()}},138:function(t,e,n){"use strict";e.a=function(t){var e;null===(e=t.app.router)||void 0===e||e.afterEach((function(t){var e,n=t.query,r=t.params,o=void 0!==n.productId||void 0!==r.productId,l=null===(e=document.scrollingElement)||void 0===e?void 0:e.classList;o?null==l||l.add("disable-scroll"):null==l||l.remove("disable-scroll")}))}},139:function(t,e,n){"use strict";n.r(e);var r=n(1).a.extend({name:"Button",props:{route:{type:Object,default:null}},methods:{click:function(){var t=this.route;t&&this.$router.push(this.localePath(t))}}}),o=(n(268),n(11)),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"bg-gray-800 shadow-md rounded p-2 px-3",on:{click:this.click}},[e("span",{staticClass:"button-content text-white fony-medium"},[this._t("default")],2)])}),[],!1,null,"006b0a42",null);e.default=component.exports;installComponents(component,{Button:n(139).default})},140:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n(30),n(91),n(92),n(12),n(34),n(60);function r(t,e){for(var n=null,r=t.parentElement;null===n&&null!==r;){for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var l=e[o],c=getComputedStyle(r)[o];if("string"==typeof l){if(c===l){n=r;continue}break}if(l.includes(c)){n=r;continue}n=null;break}r=r.parentElement}return n}},141:function(t,e,n){"use strict";n.d(e,"c",(function(){return _})),n.d(e,"d",(function(){return $})),n.d(e,"b",(function(){return z})),n.d(e,"f",(function(){return C})),n.d(e,"i",(function(){return O})),n.d(e,"a",(function(){return j})),n.d(e,"g",(function(){return A})),n.d(e,"e",(function(){return X})),n.d(e,"h",(function(){return E}));var r=n(28),o=n(17);function l(){var data=Object(r.a)(['\n\tquery ProductTies($id: ID!) {\n\t\tproduct(id: $id) {\n\t\t\tties(sort: "value:desc", limit: 4) {\n\t\t\t\tproducts(where: { id_ne: $id }) {\n\t\t\t\t\t...ProductThumbnail\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t',"\n"]);return l=function(){return data},data}function c(){var data=Object(r.a)(["\n\tquery FullProduct($id: ID!) {\n\t\tproduct(id: $id) {\n\t\t\t...FullProductFragment\n\t\t}\n\t}\n\t","\n"]);return c=function(){return data},data}function d(){var data=Object(r.a)(['\n\tquery WithoutCategoryProducts($start: Int, $limit: Int) {\n\t\tproducts(\n\t\t\tsort: "popularity:desc"\n\t\t\twhere: { category_null: true }\n\t\t\tlimit: $limit\n\t\t\tstart: $start\n\t\t) {\n\t\t\t...ProductThumbnail\n\t\t}\n\t}\n\t',"\n"]);return d=function(){return data},data}function f(){var data=Object(r.a)(['\n\tquery AllProducts($start: Int, $limit: Int) {\n\t\tproducts(sort: "popularity:desc", limit: $limit, start: $start) {\n\t\t\t...ProductThumbnail\n\t\t}\n\t}\n\t',"\n"]);return f=function(){return data},data}function m(){var data=Object(r.a)(['\n\tquery ProductsOfCategory($id: ID!, $start: Int, $limit: Int) {\n\t\tcategory(id: $id) {\n\t\t\tproducts(sort: "popularity:desc", limit: $limit, start: $start) {\n\t\t\t\t...ProductThumbnail\n\t\t\t}\n\t\t}\n\t}\n\t',"\n"]);return m=function(){return data},data}function h(){var data=Object(r.a)(['\n\tquery NewProducts($start: Int, $timestamp: Float, $limit: Int) {\n\t\tproducts(\n\t\t\tsort: "timestamp:desc"\n\t\t\twhere: { timestamp_gte: $timestamp }\n\t\t\tlimit: $limit\n\t\t\tstart: $start\n\t\t) {\n\t\t\t...ProductThumbnail\n\t\t}\n\t}\n\t',"\n"]);return h=function(){return data},data}function v(){var data=Object(r.a)(['\n\tquery AvailableProducts($start: Int, $limit: Int) {\n\t\tproducts(\n\t\t\tsort: "popularity:desc"\n\t\t\twhere: { isAvailable: true }\n\t\t\tlimit: $limit\n\t\t\tstart: $start\n\t\t) {\n\t\t\t...ProductThumbnail\n\t\t}\n\t}\n\t',"\n"]);return v=function(){return data},data}function w(){var data=Object(r.a)(["\n\tfragment FullProductFragment on Products {\n\t\tthumbnail {\n\t\t\turl\n\t\t}\n\t\tslides {\n\t\t\turl\n\t\t\tformats\n\t\t}\n\t\ttitle\n\t\tnumber\n\t\tdescription\n\t\ttable\n\t\tshopLink\n\t\tisAvailable\n\t}\n"]);return w=function(){return data},data}function y(){var data=Object(r.a)(["\n\tfragment ProductThumbnail on Products {\n\t\tid\n\t\ttitle\n\t\tisAvailable\n\t\tviews\n\t\ttimestamp\n\t\tthumbnail {\n\t\t\turl\n\t\t\tformats\n\t\t}\n\t}\n"]);return y=function(){return data},data}function x(){var data=Object(r.a)(["\n\tquery Count($weekAgo: Float, $lastVisit: Float) {\n\t\tsinceLastWeek: productsConnection(where: { timestamp_gte: $weekAgo }) {\n\t\t\taggregate {\n\t\t\t\tcount\n\t\t\t}\n\t\t}\n\t\tsinceLastVisit: productsConnection(where: { timestamp_gte: $lastVisit }) {\n\t\t\taggregate {\n\t\t\t\tcount\n\t\t\t}\n\t\t}\n\t\tavailable: productsConnection(where: { isAvailable: true }) {\n\t\t\taggregate {\n\t\t\t\tcount\n\t\t\t}\n\t\t}\n\t\tother: productsConnection(where: { category_null: true }) {\n\t\t\taggregate {\n\t\t\t\tcount\n\t\t\t}\n\t\t}\n\t}\n"]);return x=function(){return data},data}function k(){var data=Object(r.a)(["\n\t{\n\t\tcategories {\n\t\t\tid\n\t\t\tname\n\t\t\tuid\n\t\t}\n\t}\n"]);return k=function(){return data},data}var _=Object(o.gql)(k()),$=Object(o.gql)(x()),P=Object(o.gql)(y()),S=Object(o.gql)(w()),z=Object(o.gql)(v(),P),C=Object(o.gql)(h(),P),O=Object(o.gql)(m(),P),j=Object(o.gql)(f(),P),A=Object(o.gql)(d(),P),X=Object(o.gql)(c(),S),E=Object(o.gql)(l(),P)},173:function(t,e,n){var content=n(261);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("632e385f",content,!0,{sourceMap:!1})},174:function(t,e,n){var content=n(263);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("73887ee4",content,!0,{sourceMap:!1})},176:function(t,e,n){var content=n(267);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("25e66f5f",content,!0,{sourceMap:!1})},177:function(t,e,n){var content=n(269);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("39432447",content,!0,{sourceMap:!1})},178:function(t,e,n){var content=n(271);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("69c1d11c",content,!0,{sourceMap:!1})},179:function(t,e,n){var content=n(273);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("65cad70c",content,!0,{sourceMap:!1})},194:function(t,e,n){"use strict";n.r(e);n(30),n(34),n(56);var r=n(1),o=n(40),l=n.n(o),c=n(140),d=n(32),f={x:0,y:0,timestamp:0},m=r.a.extend({name:"SwipeAndScroll",props:{directions:{type:Array,default:function(){return["up","down","left","right"]}}},data:function(){return{isAllowedDown:!1,isAllowedUp:!1,debouncedHandleScroll:function(){},debouncedHandleTouchMove:function(t){},debouncedTriggerSwipe:function(t){},debAllowUp:function(){},debAllowDown:function(){}}},computed:{parent:function(){return Object(c.a)(this.$el,{overflowY:["scroll","auto"]})},prevRouteTitle:function(){var t=this.$route.query.prevRoute,title="Home";return"string"==typeof t&&d.c[t]&&(title=d.c[t]),title},prevRoute:function(){var t=this.$route.query.prevRoute;return"string"==typeof t&&d.b[t]?t:"index"},verticalPadding:function(){return this.$store.state.swipeVerticalPadding}},mounted:function(){var t;this.debouncedHandleScroll=l()(this.handleScrollingEnd,100),this.debouncedHandleTouchMove=l()(this.touchmove,50,{maxWait:50}),this.debouncedTriggerSwipe=l()(this.triggerSwipe,500,{leading:!0,trailing:!1}),this.debAllowUp=l()(this.allowUp,80,{maxWait:80}),this.debAllowDown=l()(this.allowDown,200,{maxWait:200}),(null!==(t=this.parent)&&void 0!==t?t:window).addEventListener("scroll",this.debouncedHandleScroll)},beforeDestroy:function(){var t;(null!==(t=this.parent)&&void 0!==t?t:window).removeEventListener("scroll",this.debouncedHandleScroll)},methods:{getFromTop:function(){var t,e=this.parent;return null!==(t=null==e?void 0:e.scrollTop)&&void 0!==t?t:window.scrollY},getFromBottom:function(){return this.getScrollHeight()-this.getFromTop()-this.getFrameHeight()},getScrollHeight:function(){var t,e=this.parent,n=this.$el;return null!==(t=null==e?void 0:e.scrollHeight)&&void 0!==t?t:n.clientHeight},getFrameHeight:function(){var t,e=this.parent;return null!==(t=null==e?void 0:e.clientHeight)&&void 0!==t?t:window.innerHeight},triggerSwipe:function(t){this.$emit("swipe",t)},handleScrollingEnd:function(){this.checkVerticalSwipe(),this.isAllowedDown=!1,this.isAllowedUp=!1},touchStart:function(t){this.isAllowedDown=!0;var e=t.timeStamp,n=t.touches[0]||[0,0],r=n.clientX,o=n.clientY;f={x:r,y:o,timestamp:e},this.allowUp()},allowUp:function(){this.getFromBottom()<5&&(this.isAllowedUp=!0)},allowDown:function(){this.isAllowedDown=!0},touchmove:function(t){var e=this.debouncedTriggerSwipe,n=t.timeStamp,r=t.touches[0]||[0,0],o=r.clientX,l=r.clientY,c=(o-f.x)/(n-f.timestamp),d=(l-f.y)/(n-f.timestamp);f={x:o,y:l,timestamp:n},(Math.abs(c)>1||Math.abs(d)>1)&&(Math.abs(c)/Math.abs(d)>=2?e(c<0?"left":"right"):this.isAllowedUp&&d<-2&&Math.abs(d)/Math.abs(c)>=2&&e("up"))},touchend:function(){var t=this;setTimeout((function(){t.isAllowedDown=!1,t.isAllowedUp=!1}),100)},wheel:function(t){var e=t.deltaY,n=this.getFromBottom(),r=this.getFromTop(),o=this.isAllowedUp,l=this.isAllowedDown,c=this.verticalPadding;n<=20&&e>0?o?this.triggerSwipe("up"):this.debAllowUp():this.isAllowedUp=!1,r<=c+10&&e<0?l||this.debAllowDown():this.isAllowedDown=!1},checkVerticalSwipe:function(){var t=this.directions,e=this.isAllowedDown,n=this.parent,r=this.verticalPadding,o=this.getFromTop();if(e&&t.includes("down")&&o<5)this.debouncedTriggerSwipe("down");else{var l=-1;t.includes("down")&&o<r&&(l=r),-1!==l&&(null!=n?n:window).scrollTo({top:l,behavior:"smooth"})}}}}),h=(n(262),n(11)),component=Object(h.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"swipe-and-scroll outer-wrapper",class:t.directions,on:{touchstart:t.touchStart,touchmove:t.debouncedHandleTouchMove,touchend:t.touchend,wheel:t.wheel}},[n("div",{staticClass:"inner-wrapper"},[t._t("default")],2),t._v(" "),t.directions.includes("down")?n("div",{staticClass:"swipe-space swipe-space--top"},[n("h6",{staticClass:"m-auto"},[t._v("\n\t\t\t"+t._s(t.$t("pages."+t.prevRoute))+"\n\t\t")])]):t._e(),t._v(" "),n("GlobalEvents",{on:{scroll:t.debouncedHandleScroll}})],1)}),[],!1,null,"f1306936",null);e.default=component.exports},195:function(t,e,n){"use strict";n.r(e);n(33),n(175),n(12),n(35);var r=n(1).a.extend({name:"MainNav",props:{newProducts:{type:Number,default:0},areNew:{type:Boolean,default:!1}},computed:{routeName:function(){var t;return(null===(t=this.$route.name)||void 0===t?void 0:t.split("___")[0])||"index"}}}),o=(n(266),n(11)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"main-nav",class:t.routeName},[n("div",{staticClass:"middle-button"},[n("button",{staticClass:"link-text link-text--light"},[t._v(t._s(t.$t("contact")))])]),t._v(" "),n("NavLink",{key:"home",attrs:{name:"home",to:"/",icon:"home"}},[t._v(t._s(t.$t("pages.index")))]),t._v(" "),n("NavLink",{key:"lamps",attrs:{name:"lamps",to:"/lamps",icon:"lightbulb"}},[t._v(t._s(t.$t("pages.lamps")))]),t._v(" "),n("NavLink",{key:"belt-bags",attrs:{name:"belt-bags",to:"/belt-bags",icon:"shopping-bag"}},[t._v(t._s(t.$t("pages.belt-bags")))]),t._v(" "),n("NavLink",{key:"paintings",attrs:{name:"paintings",to:"paintings",icon:"image"}},[t._v(t._s(t.$t("pages.paintings")))]),t._v(" "),0===t.newProducts?n("NavLink",{key:"gallery",attrs:{name:"gallery",to:"/gallery",icon:"grip-vertical"}},[t._v(t._s(t.$t("pages.gallery")))]):n("NavLink",{key:"gallery",attrs:{name:"gallery",to:{name:"gallery",query:{filter:"new"}},icon:"grip-vertical"}},[t._v(t._s(t.$t("pages.gallery"))+"\n\t\t"),n("span",{staticClass:"w-6 h-6 bg-secondary rounded-full absolute top-1 right-3 flex text-xs text-white box-content border-2 border-gray-100"},[n("span",{staticClass:"m-auto"},[t._v("\n\t\t\t\t"+t._s(t.newProducts>9?"9+":"+"+t.newProducts)+"\n\t\t\t")])])])],1)}),[],!1,null,"287f4bf0",null);e.default=component.exports;installComponents(component,{Button:n(139).default,NavLink:n(307).default})},205:function(t,e,n){"use strict";var r=n(1).a.extend({name:"DefaultLayout",head:function(){return this.$nuxtI18nHead({addSeoAttributes:!0,addDirAttribute:!0})}}),o=n(11),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Nuxt")],1)}),[],!1,null,null,null);e.a=component.exports},206:function(t,e,n){"use strict";n(12),n(35);var r=n(1).a.extend({name:"GalleryLayout",head:function(){return this.$nuxtI18nHead({addSeoAttributes:!0,addDirAttribute:!0})},methods:{handleSwipe:function(t){if("down"===t){var e=this.$route.query.prevRoute,n="string"==typeof e?this.localePath(null==e?void 0:e.split("___")[0]):this.localePath("/");this.$router.push(n)}}}}),o=(n(260),n(11)),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{},[e("SwipeAndScroll",{attrs:{directions:["down"]},on:{swipe:this.handleSwipe}},[e("Nuxt",{staticClass:"page gallery"})],1),this._v(" "),e("MainNav")],1)}),[],!1,null,"b7546f06",null);e.a=component.exports;installComponents(component,{SwipeAndScroll:n(194).default,MainNav:n(195).default})},207:function(t,e,n){"use strict";n(33),n(12),n(35);var r=n(1),o=n(32),l=r.a.extend({name:"TopPageLayout",head:function(){return this.$nuxtI18nHead({addSeoAttributes:!0,addDirAttribute:!0})},computed:{newProductsCount:function(){return this.$store.state.newProductsCount},areNewProducts:function(){return this.$store.state.areNewProducts},pageIndex:function(){var t,e=(null===(t=this.$route.name)||void 0===t?void 0:t.split("___")[0])||"index";return e?o.b[e]:null}},methods:{swipe:function(t){var e=this.pageIndex;if(null!==e){var path={};"up"===t?path={name:"gallery"}:"left"===t&&o.b[e+1]?path={name:o.b[e+1]}:"right"===t&&o.b[e-1]&&(path={name:o.b[e-1]}),path&&this.$router.push(this.localePath(path))}}}}),c=(n(272),n(11)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"layout"},[n("SwipeAndScroll",{attrs:{directions:["up","left","right"]},on:{swipe:t.swipe}},[n("Nuxt",{staticClass:"page px-6"}),t._v(" "),n("footer",{staticClass:"see-gallery pb-48 mt-20 px-6 text-center"},[n("h6",{staticClass:"whitespace-normal inline"},[t._v("\n\t\t\t\t"+t._s(t.$t("home.seeGallery.before"))),n("nuxt-link",{attrs:{to:t.localePath("/gallery")}},[n("strong",[t._v(t._s(t.$t("home.seeGallery.gallery")))])]),t._v("\n\t\t\t\t"+t._s(t.$t("home.seeGallery.after"))+"\n\t\t\t")],1),t._v(" "),n("svg",{staticClass:"w-6 h-6 mb-1 text-primary inline",attrs:{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"3",d:"M19 14l-7 7m0 0l-7-7m7 7V3"}})])])],1),t._v(" "),n("MainNav",{attrs:{"new-products":t.newProductsCount,"are-new":t.areNewProducts}}),t._v(" "),t.newProductsCount>0?n("div",{staticClass:"new-products-notification"},[n("p",[t._v("Nowe produkty: +"+t._s(t.newProductsCount))])]):t._e()],1)}),[],!1,null,"b278e610",null);e.a=component.exports;installComponents(component,{SwipeAndScroll:n(194).default,MainNav:n(195).default})},216:function(t,e,n){n(217),t.exports=n(218)},250:function(t,e,n){var content=n(251);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("38dfa7e4",content,!0,{sourceMap:!1})},251:function(t,e,n){(e=n(18)(!1)).push([t.i,'/*! tailwindcss v2.0.3 | MIT License | https://tailwindcss.com*/\n\n/*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,"Segoe UI",Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji"}hr{height:0;color:inherit}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],button{-webkit-appearance:button}legend{padding:0}progress{vertical-align:baseline}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}button{background-color:transparent;background-image:none}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}fieldset,ol,ul{margin:0;padding:0}ol,ul{list-style:none}html{font-family:Poppins,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.5}body{font-family:inherit;line-height:inherit}*,:after,:before{box-sizing:border-box;border:0 solid #e5e5e5}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#a3a3a3}input:-ms-input-placeholder,textarea:-ms-input-placeholder{opacity:1;color:#a3a3a3}input::placeholder,textarea::placeholder{opacity:1;color:#a3a3a3}button{cursor:pointer}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}:root{color:#171717;color:rgba(23,23,23,var(--tw-text-opacity))}:root,a{--tw-text-opacity:1}a{color:#5f4bff;color:rgba(95,75,255,var(--tw-text-opacity))}h1{font-weight:800;font-size:3rem;line-height:1;text-transform:uppercase}h1,h2{--tw-text-opacity:1;color:#000;color:rgba(0,0,0,var(--tw-text-opacity))}h2{font-weight:600;font-size:1.5rem;line-height:2rem}h3{font-size:1.25rem;--tw-text-opacity:1;color:#000;color:rgba(0,0,0,var(--tw-text-opacity))}h3,h6{line-height:1.75rem}h6{font-weight:500;font-size:1.125rem}h6,p{word-wrap:break-word}p{white-space:pre-line}svg{width:1.5rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.5rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.5rem*var(--tw-space-y-reverse))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(0.5rem*var(--tw-space-x-reverse));margin-left:calc(0.5rem*(1 - var(--tw-space-x-reverse)))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse:0;border-top-width:calc(1px*(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px*var(--tw-divide-y-reverse))}.divide-gray-300>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgba(212,212,212,var(--tw-divide-opacity))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgba(245,245,245,var(--tw-bg-opacity))}.bg-gray-800{--tw-bg-opacity:1;background-color:rgba(38,38,38,var(--tw-bg-opacity))}.bg-primary{--tw-bg-opacity:1;background-color:rgba(95,75,255,var(--tw-bg-opacity))}.bg-secondary{--tw-bg-opacity:1;background-color:rgba(255,95,75,var(--tw-bg-opacity))}.border-gray-100{--tw-border-opacity:1;border-color:rgba(245,245,245,var(--tw-border-opacity))}.rounded{border-radius:.25rem}.rounded-md{border-radius:.375rem}.rounded-xl{border-radius:.75rem}.rounded-full{border-radius:9999px}.border-2{border-width:2px}.box-content{box-sizing:content-box}.inline{display:inline}.flex{display:flex}.table{display:table}.grid{display:grid}.hidden{display:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.self-center{align-self:center}.justify-center{justify-content:center}.h-6{height:1.5rem}.h-80{height:20rem}.text-xs{font-size:.75rem;line-height:1rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-6xl{font-size:3.75rem;line-height:1}.m-1{margin:.25rem}.m-2{margin:.5rem}.m-4{margin:1rem}.m-auto{margin:auto}.my-2{margin-top:.5rem;margin-bottom:.5rem}.mx-4{margin-left:1rem;margin-right:1rem}.mt-1{margin-top:.25rem}.mb-1{margin-bottom:.25rem}.mt-4{margin-top:1rem}.mr-4{margin-right:1rem}.mb-4{margin-bottom:1rem}.ml-6{margin-left:1.5rem}.mt-8{margin-top:2rem}.mt-20{margin-top:5rem}.mt-52{margin-top:13rem}.-mr-2{margin-right:-.5rem}.overflow-hidden{overflow:hidden}.overflow-x-scroll{overflow-x:scroll}.p-2{padding:.5rem}.p-3{padding:.75rem}.p-6{padding:1.5rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pb-48{padding-bottom:12rem}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{top:0;bottom:0}.inset-0,.inset-x-0{right:0;left:0}.top-0{top:0}.right-0{right:0}.top-1{top:.25rem}.top-2{top:.5rem}.right-3{right:.75rem}*{--tw-shadow:0 0 transparent}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)}.shadow,.shadow-md{box-shadow:0 0 transparent,0 0 transparent,var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)}*{--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,0.5);--tw-ring-offset-shadow:0 0 transparent;--tw-ring-shadow:0 0 transparent}.fill-current{fill:currentColor}.text-left{text-align:left}.text-center{text-align:center}.text-white{--tw-text-opacity:1;color:#fff;color:rgba(255,255,255,var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:#171717;color:rgba(23,23,23,var(--tw-text-opacity))}.text-primary{--tw-text-opacity:1;color:#5f4bff;color:rgba(95,75,255,var(--tw-text-opacity))}.whitespace-normal{white-space:normal}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-line{white-space:pre-line}.w-6{width:1.5rem}.w-screen{width:100vw}.-z-1{z-index:-1}.gap-4{grid-gap:1rem;gap:1rem}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.transform{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transition{transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}@-webkit-keyframes spin{to{transform:rotate(1turn)}}@keyframes spin{to{transform:rotate(1turn)}}@-webkit-keyframes ping{75%,to{transform:scale(2);opacity:0}}@keyframes ping{75%,to{transform:scale(2);opacity:0}}@-webkit-keyframes pulse{50%{opacity:.5}}@keyframes pulse{50%{opacity:.5}}@-webkit-keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}',""]),t.exports=e},254:function(t,e,n){var content=n(255);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("a68e98b6",content,!0,{sourceMap:!1})},255:function(t,e,n){(e=n(18)(!1)).push([t.i,"@-webkit-keyframes shimmer{to{transform:translateX(100%)}}@keyframes shimmer{to{transform:translateX(100%)}}html{width:100%;overflow:auto}body,html{height:100%}body{background-color:#fffdfa;color:#121214}*{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}::-moz-selection{background-color:rgba(95,75,255,.8);color:#fffdfa}::selection{background-color:rgba(95,75,255,.8);color:#fffdfa}*,:after,:before{margin:0;padding:0;box-sizing:border-box}",""]),t.exports=e},256:function(t,e,n){var content=n(257);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("38c04cc5",content,!0,{sourceMap:!1})},257:function(t,e,n){(e=n(18)(!1)).push([t.i,'@-webkit-keyframes shimmer{to{transform:translateX(100%)}}@keyframes shimmer{to{transform:translateX(100%)}}.pill{--color:#292829;border-radius:200px;height:34px;width:auto;padding:0 10px;background-color:#fffdfa;border:2px solid var(--color);color:var(--color);display:flex;align-items:center}.pill.secondary{--color:#ff5f4b}.pill.primary{--color:#5f4bff}.pill.selected{background-color:var(--color);color:#fffdfa}.pill .icon:not(.alone),.pill svg:not(.alone){margin-right:8px}.pill .text,.pill p{margin:0}.pill--loading{width:89.009416px;position:relative;overflow:hidden;border:none;filter:blur(.3px);background-color:#e2dfdd}.pill--loading>*{opacity:0}.pill--loading:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,rgba(255,253,250,0),rgba(255,253,250,.2) 20%,rgba(255,253,250,.5) 50%,rgba(255,253,250,.2) 80%,rgba(255,253,250,0));transform:translateX(-100%);-webkit-animation:shimmer 3s infinite;animation:shimmer 3s infinite}.disable-scroll{overflow:hidden!important}:root{--nav-height:5rem}.page{--page-margin:calc(var(--space-size)*6);min-height:100vh;overflow:hidden;display:flex;flex-direction:column}.link-text{font-weight:600;--tw-text-opacity:1;color:rgba(23,23,23,var(--tw-text-opacity))}.link-text:hover{--tw-text-opacity:1;color:rgba(95,75,255,var(--tw-text-opacity))}.link-text--light,.link-text--light:hover{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.layout{height:100vh;overflow-y:auto}',""]),t.exports=e},258:function(t,e,n){var content=n(259);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("6f9ad399",content,!0,{sourceMap:!1})},259:function(t,e,n){(e=n(18)(!1)).push([t.i,"@-webkit-keyframes shimmer{to{transform:translateX(100%)}}@keyframes shimmer{to{transform:translateX(100%)}}.page-enter-active,.page-leave-active{transition:opacity .3s}.page-enter,.page-leave-to{opacity:0}.swipe-left-enter-active,.swipe-left-leave-active,.swipe-right-enter-active,.swipe-right-leave-active{transition:opacity .3s,transform .3s}.swipe-left-enter,.swipe-left-leave-to,.swipe-right-enter,.swipe-right-leave-to{opacity:0}.swipe-right-enter{transform:translateX(-4rem)}.swipe-left-enter,.swipe-right-leave-to{transform:translateX(4rem)}.swipe-left-leave-to{transform:translateX(-4rem)}.layout-enter-active,.layout-leave-active{transition:opacity .2s}.layout-enter-active .page,.layout-leave-active .page{transition:transform .2s}.layout-enter,.layout-leave-to{opacity:0}.layout-enter .page:not(.gallery),.layout-leave-to .page:not(.gallery){transform:translateY(-4rem)}.layout-enter .page.gallery,.layout-leave-to .page.gallery{transform:translateY(4rem)}.fade-enter,.fade-leave-to{opacity:0}.fade-enter-active,.fade-leave-active{transition:opacity .3s}.fade-enter-enter{opacity:0}.fade-enter-enter-active{transition:opacity .3s}.blur-top-leave-active{transition:opacity .2s .1s,transform .3s,filter .3s}.blur-top-enter-active{transition:opacity .2s,transform .3s,filter .3s}.blur-top-enter,.blur-top-leave-to{opacity:0;transform:translateY(-30px);filter:blur(30px)}",""]),t.exports=e},260:function(t,e,n){"use strict";n(173)},261:function(t,e,n){(e=n(18)(!1)).push([t.i,"@-webkit-keyframes shimmer-data-v-b7546f06{to{transform:translateX(100%)}}@keyframes shimmer-data-v-b7546f06{to{transform:translateX(100%)}}.gallery[data-v-b7546f06]{padding-bottom:var(--nav-height)}",""]),t.exports=e},262:function(t,e,n){"use strict";n(174)},263:function(t,e,n){(e=n(18)(!1)).push([t.i,"@-webkit-keyframes shimmer-data-v-f1306936{to{transform:translateX(100%)}}@keyframes shimmer-data-v-f1306936{to{transform:translateX(100%)}}.outer-wrapper[data-v-f1306936]{position:relative}.outer-wrapper.down[data-v-f1306936]{padding-top:100px}.swipe-space[data-v-f1306936]{position:absolute;left:0;right:0;height:100px;display:flex}.swipe-space--top[data-v-f1306936]{top:0;background:linear-gradient(#d4d4d4,#f5f5f5)}.swipe-space--bottom[data-v-f1306936]{bottom:0;background:linear-gradient(transparent,#c5c2c0)}.log[data-v-f1306936]{pointer-events:none;position:fixed;bottom:50%;color:#ff5f4b;font-size:1.5rem;left:10px;background-color:#fffdfa}",""]),t.exports=e},266:function(t,e,n){"use strict";n(176)},267:function(t,e,n){(e=n(18)(!1)).push([t.i,'@-webkit-keyframes shimmer-data-v-287f4bf0{to{transform:translateX(100%)}}@keyframes shimmer-data-v-287f4bf0{to{transform:translateX(100%)}}.main-nav[data-v-287f4bf0]{--link-width:20vw;position:fixed;right:0;left:0;bottom:0;--tw-bg-opacity:1;background-color:rgba(245,245,245,var(--tw-bg-opacity));border-top-width:2px;z-index:2000}.main-nav[data-v-287f4bf0],.main-nav>*[data-v-287f4bf0]{height:var(--nav-height)}.main-nav>*[data-v-287f4bf0]{width:var(--link-width)}.new-icon[data-v-287f4bf0]{position:absolute;width:10px;height:10px;border-radius:50%;background:red}.nav-link[data-v-287f4bf0]{position:absolute;top:0;left:0;display:flex;flex-direction:column;justify-content:center;align-items:center;transition:opacity transform .2s .4s}.nav-link.home[data-v-287f4bf0]{opacity:0;pointer-events:none}.nav-link.lamps[data-v-287f4bf0]{transform:translateX(0);opacity:1;pointer-events:all}.nav-link.belt-bags[data-v-287f4bf0]{transform:translateX(var(--link-width));opacity:1;pointer-events:all}.nav-link.paintings[data-v-287f4bf0]{transform:translateX(calc(var(--link-width)*3));opacity:1;pointer-events:all}.nav-link.gallery[data-v-287f4bf0]{transform:translateX(calc(var(--link-width)*4));opacity:1;pointer-events:all}.main-nav.lamps .nav-link.home[data-v-287f4bf0]{transform:translateX(0);opacity:1;pointer-events:all}.main-nav.lamps .nav-link.lamps[data-v-287f4bf0]{opacity:0;pointer-events:none}.main-nav.belt-bags .nav-link.home[data-v-287f4bf0]{transform:translateX(0);opacity:1;pointer-events:all}.main-nav.belt-bags .nav-link.belt-bags[data-v-287f4bf0]{opacity:0;pointer-events:none}.main-nav.belt-bags .nav-link.lamps[data-v-287f4bf0]{transform:translateX(var(--link-width));opacity:1;pointer-events:all}.main-nav.paintings .nav-link.home[data-v-287f4bf0]{transform:translateX(0);opacity:1;pointer-events:all}.main-nav.paintings .nav-link.lamps[data-v-287f4bf0]{transform:translateX(var(--link-width));opacity:1;pointer-events:all}.main-nav.paintings .nav-link.belt-bags[data-v-287f4bf0]{transform:translateX(calc(var(--link-width)*3));opacity:1;pointer-events:all}.main-nav.paintings .nav-link.paintings[data-v-287f4bf0]{opacity:0;pointer-events:none}.main-nav.gallery .nav-link.home[data-v-287f4bf0]{transform:translateX(0);opacity:1;pointer-events:all}.main-nav.gallery .nav-link.lamps[data-v-287f4bf0]{transform:translateX(var(--link-width));opacity:1;pointer-events:all}.main-nav.gallery .nav-link.belt-bags[data-v-287f4bf0]{transform:translateX(calc(var(--link-width)*3));opacity:1;pointer-events:all}.main-nav.gallery .nav-link.paintings[data-v-287f4bf0]{transform:translateX(calc(var(--link-width)*4));opacity:1;pointer-events:all}.main-nav.gallery .nav-link.gallery[data-v-287f4bf0]{opacity:0;pointer-events:none}.middle-button[data-v-287f4bf0]{position:fixed;z-index:2010;right:0;bottom:0;transform:translateX(calc(var(--link-width)*-2)) translateY(calc(var(--nav-height)/-2))}.middle-button button[data-v-287f4bf0]{--button-size:5rem;position:absolute;top:calc(50% + 1px);left:50%;margin-left:calc(var(--button-size)/-2);margin-top:calc(var(--button-size)/-2);width:var(--button-size);height:var(--button-size)}.middle-button button[data-v-287f4bf0]:before{content:"";--tw-bg-opacity:1;background-color:rgba(95,75,255,var(--tw-bg-opacity));border-radius:.375rem;position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-rotate:45deg}',""]),t.exports=e},268:function(t,e,n){"use strict";n(177)},269:function(t,e,n){(e=n(18)(!1)).push([t.i,"@-webkit-keyframes shimmer-data-v-006b0a42{to{transform:translateX(100%)}}@keyframes shimmer-data-v-006b0a42{to{transform:translateX(100%)}}.primary[data-v-006b0a42]{--tw-bg-opacity:1;background-color:rgba(95,75,255,var(--tw-bg-opacity));border-radius:.375rem;display:flex;align-items:center;justify-content:center;padding:1rem 1.25rem;--tw-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);box-shadow:0 0 transparent,0 0 transparent,var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.primary .button-content[data-v-006b0a42]{font-weight:600;font-size:1.125rem;line-height:1.75rem}",""]),t.exports=e},270:function(t,e,n){"use strict";n(178)},271:function(t,e,n){(e=n(18)(!1)).push([t.i,"@-webkit-keyframes shimmer-data-v-581e442e{to{transform:translateX(100%)}}@keyframes shimmer-data-v-581e442e{to{transform:translateX(100%)}}.text-slot[data-v-581e442e]{max-width:100%;text-align:center;word-wrap:break-word}",""]),t.exports=e},272:function(t,e,n){"use strict";n(179)},273:function(t,e,n){(e=n(18)(!1)).push([t.i,'@-webkit-keyframes shimmer-data-v-b278e610{to{transform:translateX(100%)}}@keyframes shimmer-data-v-b278e610{to{transform:translateX(100%)}}.new-products-notification[data-v-b278e610]{position:fixed;top:20px;left:0;right:0;display:flex;justify-content:center}.see-gallery[data-v-b278e610]{position:relative}.see-gallery[data-v-b278e610]:after{content:"";position:absolute;pointer-events:none;left:0;right:0;bottom:0;height:120%;background:linear-gradient(transparent,#d4d4d4)}',""]),t.exports=e},274:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return f})),n.d(e,"getters",(function(){return m})),n.d(e,"mutations",(function(){return h})),n.d(e,"actions",(function(){return v}));n(128),n(9),n(275),n(39),n(45);var r=n(46),o=n(183),l=n.n(o),c=n(40),d=n.n(c),f=function(){return{swipeVerticalPadding:100,newProductsCount:0,areNewProducts:!1,areAvailableProducts:!1,areOtherProducts:!1,filters:[],seenProducts:{},relatedProducts:new Set}},m={},h={setFilterCount:function(t,e){var n=e.sinceLastVisit,r=e.sinceLastWeek,o=e.countAvailable,l=e.countOther;"number"==typeof n&&(t.newProductsCount=n,n>0&&(t.areNewProducts=!0)),"number"==typeof r&&r>0&&(t.areNewProducts=!0),"number"==typeof o&&o>0&&(t.areAvailableProducts=!0),"number"==typeof l&&l>0&&(t.areOtherProducts=!0)},setFilters:function(t,e){return t.filters=l()(e)},VIEW_PRODUCT:function(t,e){var n=t.seenProducts[e];t.seenProducts[e]="number"==typeof n?n+1:1,t.relatedProducts.add(e)},RESET_VIEWS:function(t){return t.seenProducts={}},RESET_RELATIONS:function(t){return t.relatedProducts.clear()}},v={seeProduct:function(t,e){var n=t.dispatch,r=t.commit;n("debounceEmitViews"),n("debounceEmitRelations"),r("VIEW_PRODUCT",e)},emitViews:function(t){var e=t.state,n=t.commit;this.$axios.post("".concat("https://renkidzielo.herokuapp.com","/products/view"),{entries:Object.entries(e.seenProducts)}),n("RESET_VIEWS")},debounceEmitViews:d()((function(t){return(0,t.dispatch)("emitViews")}),6e4,{maxWait:1e5}),emitRelations:function(t){var e=t.state,n=t.commit,o=e.relatedProducts;o.size>1&&this.$axios.post("".concat("https://renkidzielo.herokuapp.com","/ties/increase"),{entries:Object(r.a)(o)}),n("RESET_RELATIONS")},debounceEmitRelations:d()((function(t){return(0,t.dispatch)("emitRelations")}),1e5,{maxWait:2e5})}},280:function(t,e,n){var map={"./de":[213,0],"./de.js":[213,0],"./en":[214,1],"./en.js":[214,1],"./pl":[215,2],"./pl.js":[215,2]};function r(t){if(!n.o(map,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=map[t],r=e[0];return n.e(e[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(map)},r.id=280,t.exports=r},307:function(t,e,n){"use strict";n.r(e);var r=n(1).a.extend({name:"NavLink",props:{name:{type:String,default:""},icon:{type:String,default:"image"}}}),o=(n(270),n(11)),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("nuxt-link",{staticClass:"nav-link link-text",class:this.name,attrs:{to:this.localePath(this.$attrs.to||"")}},[e("Icon",{staticClass:"link-icon",attrs:{icon:this.icon}}),this._v(" "),e("span",{staticClass:"text-slot mt-1"},[this._t("default")],2)],1)}),[],!1,null,"581e442e",null);e.default=component.exports},32:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return c})),n.d(e,"d",(function(){return f}));n(33);var r,o,l=n(74);!function(t){t[t.index=0]="index",t[t.lamps=1]="lamps",t[t["belt-bags"]=2]="belt-bags",t[t.paintings=3]="paintings"}(r||(r={})),function(t){t.index="Home",t.lamps="Lampy",t["belt-bags"]="Saszetki",t.paintings="Obrazy"}(o||(o={}));var c=function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"black",d=arguments.length>5&&void 0!==arguments[5]&&arguments[5];Object(l.a)(this,t),this.id=r,this.uid=n,this.name=e,this.icon=o,this.color=c,this.isSpecial=d},d=function t(e,path,title,n){Object(l.a)(this,t),this.name=e,this.path=path,this.title=title,this.icon=n},f=[new d("index","/","Home","home"),new d("lamps","/lamps","Lampy","lightbulb"),new d("belt-bags","/belt-bags","Saszetki","shopping-bag"),new d("paintings","/paintings","Obrazy","image"),new d("gallery","/gallery","Galeria","grip-vertical")]}},[[216,12,5,13]]]);