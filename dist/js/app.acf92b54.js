(function(e){function t(t){for(var r,a,s=t[0],c=t[1],d=t[2],u=0,f=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&f.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(f.length)f.shift()();return n.push.apply(n,d||[]),o()}function o(){for(var e,t=0;t<n.length;t++){for(var o=n[t],r=!0,s=1;s<o.length;s++){var c=o[s];0!==i[c]&&(r=!1)}r&&(n.splice(t--,1),e=a(a.s=o[0]))}return e}var r={},i={app:0},n=[];function a(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=r,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(o,r,function(t){return e[t]}.bind(null,r));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var l=c;n.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"19a9":function(e,t,o){function r(e,t,o,r){if(o!==t){r.bgcolor=t;var i=[r.coordX+":"+r.coordY];while(i.length>0)for(var n=i.shift(),a=parseInt(n.split(":")[0]),s=parseInt(n.split(":")[1]),c=[a-1+":"+s,a-1+":"+(s-1),a+":"+(s-1),a+1+":"+(s-1),a+1+":"+s,a+1+":"+(s+1),a+":"+(s+1),a-1+":"+(s+1)],d=0;d<c.length;d++){var l=c[d],u=e[l];u&&u.bgcolor===o&&-1===i.indexOf(l)&&(u.bgcolor=t,i.push(l))}}}o("1276"),o("ac1f"),e.exports={apply:r}},"56d7":function(e,t,o){"use strict";o.r(t);o("e260"),o("e6cf"),o("cca6"),o("a79d");var r=o("2b0e"),i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-container",{attrs:{fluid:"",id:"app"}},[o("b-toast",{ref:"browser-comp",staticClass:"browser-comp",attrs:{static:"",title:"browser compatibility","no-auto-hide":""}},[e._v(" please use a modern browser to avoid unexpected behavior. ")]),o("div",{staticClass:"control-container"},[o("Controls")],1),o("div",{ref:"drawingpad-container",staticClass:"canvas-container"},[o("DrawingPad")],1)],1)},n=[],a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"version"},[o("Version")],1),o("ul",{staticClass:"control-container"},[o("li",[o("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.image-settings-window",modifiers:{"image-settings-window":!0}},{name:"b-tooltip",rawName:"v-b-tooltip.hover.right",modifiers:{hover:!0,right:!0}}],staticClass:"control-button",attrs:{title:"image settings"}},[o("i",{staticClass:"fas fa-image"})]),o("ImageSettingsWindow",{on:{submit:e.onImageSettingsWindowSubmit}})],1),o("li",[o("b-form-checkbox-group",{staticClass:"control-button grid-size-container",attrs:{buttons:""}},[o("b-form-checkbox",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.right",modifiers:{hover:!0,right:!0}}],attrs:{value:"1","unchecked-value":"0",title:"show/hide grid"},on:{change:e.changeShowGridLines},model:{value:e.showGridLines,callback:function(t){e.showGridLines=t},expression:"showGridLines"}},[1==e.showGridLines?[o("i",{staticClass:"fas fa-border-all"})]:[o("i",{staticClass:"fas fa-border-none"})]],2)],1)],1),o("li",[o("b-form-radio-group",{staticClass:"control-button drawmode",attrs:{stacked:"",buttons:""},on:{change:e.chooseDrawMode},model:{value:e.drawMode,callback:function(t){e.drawMode=t},expression:"drawMode"}},[o("b-form-radio",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.right",modifiers:{hover:!0,right:!0}}],key:"move",attrs:{value:"move",title:"Move Canvas"}},[o("i",{staticClass:"fas fa-arrows-alt"})]),e._l(e.drawModes,(function(e){return[o("b-form-radio",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.right",modifiers:{hover:!0,right:!0}}],key:e.index,attrs:{value:e.value,title:e.text}},[o("i",{class:e.icon})])]}))],2)],1),o("li",[o("vue-color-picker",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.right",modifiers:{hover:!0,right:!0}}],staticClass:"btn control-button btn-secondary fas fa-palette",attrs:{title:"Color"},on:{change:e.chooseColor},model:{value:e.colorToUse,callback:function(t){e.colorToUse=t},expression:"colorToUse"}})],1),o("li",[o("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.right",modifiers:{hover:!0,right:!0}}],staticClass:"control-button",attrs:{title:"undo"}},[o("i",{staticClass:"fas fa-undo",on:{click:e.undo}})])],1),o("li",[o("b-dropdown",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.right",modifiers:{hover:!0,right:!0}}],staticClass:"control-button",attrs:{title:"download image"},scopedSlots:e._u([{key:"button-content",fn:function(){return[o("i",{staticClass:"fas fa-file-download"})]},proxy:!0}])},[o("b-dropdown-item",{on:{click:function(t){return e.downloadImage("png")}}},[e._v("PNG")]),o("b-dropdown-item",{on:{click:function(t){return e.downloadImage("jpg")}}},[e._v("JPG")]),o("b-dropdown-item",{on:{click:function(t){return e.downloadImage("gif")}}},[e._v("GIF")])],1)],1)])])},s=[],c=o("4bbd"),d=o.n(c),l=(o("889b"),new r["default"]),u=l,f=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-modal",{attrs:{id:"image-settings-window",title:"image settings"},on:{ok:e.submitModal}},[o("b-form",[o("b-tabs",{ref:"tabs",attrs:{"content-class":"mt-3"}},[o("b-tab",{attrs:{title:"8bit",active:""},scopedSlots:e._u([{key:"title",fn:function(){return[e._v(" 8bit ")]},proxy:!0}])},[o("b-form-group",{attrs:{label:"grid item size"}},[o("b-form-input",{staticClass:"griditemsize",attrs:{type:"number",min:"1",max:"100"},model:{value:e.gridItemSize,callback:function(t){e.gridItemSize=t},expression:"gridItemSize"}})],1),o("b-form-group",{attrs:{label:"grid size"}},[o("b-form-radio-group",{staticClass:"control-button grid-size-container",attrs:{buttons:""},model:{value:e.gridSize,callback:function(t){e.gridSize=t},expression:"gridSize"}},[e._l(e.gridSizes,(function(t){return[o("b-form-radio",{key:t.index,attrs:{value:t.value}},[e._v(" "+e._s(t.name)+" ")])]}))],2)],1)],1),o("b-tab",{attrs:{title:"photo (tbd)",disabled:""},scopedSlots:e._u([{key:"title",fn:function(){return[e._v(" photo (tbd) ")]},proxy:!0}])},[o("b-form-group",{attrs:{label:"width (px)"}},[o("b-form-input",{staticClass:"gridWidth",attrs:{type:"number",min:"1"},model:{value:e.gridWidth,callback:function(t){e.gridWidth=t},expression:"gridWidth"}})],1),o("b-form-group",{attrs:{label:"height (px)"}},[o("b-form-input",{staticClass:"gridHeight",attrs:{type:"number",min:"1"},model:{value:e.gridHeight,callback:function(t){e.gridHeight=t},expression:"gridHeight"}})],1)],1)],1)],1)],1)},g=[],m={name:"ImageSettingsWindow",mounted:function(){var e=this;u.$on("setConfigDefaults",(function(t){e.gridSize=t.gridSize,e.gridItemSize=t.gridItemSize,e.gridWidth=t.gridWidth,e.gridHeight=t.gridHeight}))},data:function(){return{gridSize:null,gridItemSize:null,gridWidth:null,gridHeight:null,gridSizes:[{name:"8x8",value:8},{name:"12x12",value:12},{name:"16x16",value:16},{name:"32x32",value:32},{name:"32x64",value:"32x64"},{name:"64x32",value:"64x32"}]}},methods:{submitModal:function(){var e=this;e.$emit("submit",{mode:e.$refs.tabs.currentTab,gridSize:e.gridSize,gridItemSize:e.gridItemSize,gridWidth:e.gridWidth,gridHeight:e.gridHeight})}}},h=m,v=o("0c7c"),b=Object(v["a"])(h,f,g,!1,null,null,null),p=b.exports,w=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("span",[e._v(e._s(e.appVersion))])},S=[],x=o("2f62");r["default"].use(x["a"]);var C=new x["a"].Store({state:{packageVersion:"kaku v0.5.0"},getters:{appVersion:function(e){return e.packageVersion}}}),I={name:"Version",store:C,computed:{appVersion:function(){return this.$store.getters.appVersion}}},k=I,y=Object(v["a"])(k,w,S,!1,null,null,null),M=y.exports;r["default"].use(d.a);var z,_,G,P,E,$,D,L={name:"Controls",components:{ImageSettingsWindow:p,Version:M},mounted:function(){var e=this;u.$on("setConfigDefaults",(function(t){e.gridSize=t.gridSize,e.colorToUse=t.colorToUse,e.drawMode=t.drawMode,e.showGridLines=t.showGridLines?"1":"0",e.gridItemSize=t.gridItemSize}))},data:function(){return{gridSize:null,colorToUse:null,drawMode:null,showGridLines:null,gridItemSize:null,drawModes:[{value:"floodfill",text:"Floodfill",icon:"fas fa-fill-drip fa-flip-horizontal"},{value:"simple",text:"Pencil",icon:"fas fa-pencil-alt"},{value:"line",text:"Line",icon:"fas fa-pencil-ruler"},{value:"square",text:"Square",icon:"k-icon k-icon-square-o-white"},{value:"circle",text:"Circle",icon:"far fa-circle"},{value:"erase",text:"Eraser",icon:"fas fa-eraser"},{value:"flooderase",text:"FloodEraser",icon:"fas fa-fill-drip"}],gridSizes:[{name:"8x8",value:8},{name:"12x12",value:12},{name:"16x16",value:16},{name:"32x32",value:32}]}},methods:{onImageSettingsWindowSubmit:function(e){var t=this;switch(e.mode){case 0:t.changeGridItemSize(e.gridItemSize),t.chooseGridSize(e.gridSize);break;case 1:t.changeGridItemSize(1),t.chooseGridSize(e.gridWidth+"x"+e.gridHeight),t.changeShowGridLines("0");break}},undo:function(){u.$emit("undo")},changeGridItemSize:function(e){u.$emit("changeGridItemSize",parseInt(e))},changeShowGridLines:function(e){u.$emit("changeShowGridLines",e+""==="1")},chooseColor:function(e){u.$emit("changeColor",e),this.colorToUse=e},chooseDrawMode:function(e){u.$emit("changeDrawMode",e)},chooseGridSize:function(e){this.gridSize=e,u.$emit("changeGridSize",e)},downloadImage:function(e){u.$emit("downloadImage",e)}}},T=L,X=Object(v["a"])(T,a,s,!1,null,null,null),Y=X.exports,O=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"inner"},[o("canvas",{ref:"canvas",attrs:{width:"0",height:"0"}})])},W=[],j=(o("cb29"),o("1276"),o("ac1f"),o("aeb1")),H=o.n(j),U=o("19a9"),N=o.n(U),B={},F={},V=null,q=[],A=function(){var e=0,t=0;B={};for(var o=0;o<$*D;o++)e>=$&&(e=0,t++),B[e+":"+t]={index:o,bgcolor:G,bordercolor:P,coordX:e,coordY:t},e++;q.push(Z())},J=function(){var e=V.getContext("2d");for(var t in e.clearRect(0,0,V.width,V.height),B){var o=B[t],r=o.coordX*_,i=o.coordY*_;o.posX=r,o.posY=i,"#ffffff00"!==o.bgcolor&&(e.beginPath(),e.moveTo(r,i),e.lineTo(r+_,i),e.lineTo(r+_,i+_),e.lineTo(r,i+_),e.lineTo(r,i),e.closePath(),e.fillStyle=o.bgcolor,e.fill())}if(E){for(var n=1;n*_<V.height;n++){var a=_*n;a=Math.floor(a)+.5,e.beginPath(),e.moveTo(0,a),e.lineTo(V.width,a),e.lineTo(0,a),e.closePath(),e.lineWidth=1,e.strokeStyle=o.bordercolor,e.stroke()}for(var s=1;s*_<V.width;s++){var c=_*s;c=Math.floor(c)+.5,e.beginPath(),e.moveTo(c,0),e.lineTo(c,V.height),e.lineTo(c,0),e.closePath(),e.lineWidth=1,e.strokeStyle=o.bordercolor,e.stroke()}}};function R(e,t,o){for(var r in F)B[r].bgcolor=F[r].bgcolor;var i=t.coordX,n=t.coordY,a=o.coordX,s=o.coordY,c=Math.abs(a-i),d=i<a?1:-1,l=-1*Math.abs(s-n),u=n<s?1:-1,f=c+l,g=!0;while(g){if(B[i+":"+n].bgcolor=e,i==a&&n==s)break;var m=2*f;m>=l&&(f+=l,i+=d),m<=c&&(f+=c,n+=u)}}function K(e,t,o){for(var r in F)B[r].bgcolor=F[r].bgcolor;for(var i=0;i<=Math.abs(t.coordX-o.coordX);i++)B[Math.min(t.coordX,o.coordX)+i+":"+t.coordY].bgcolor=e,B[Math.min(t.coordX,o.coordX)+i+":"+o.coordY].bgcolor=e;for(var n=0;n<=Math.abs(t.coordY-o.coordY);n++)B[t.coordX+":"+(Math.min(t.coordY,o.coordY)+n)].bgcolor=e,B[o.coordX+":"+(Math.min(t.coordY,o.coordY)+n)].bgcolor=e}function Q(e,t,o){for(var r in F)B[r].bgcolor=F[r].bgcolor;var i=t.coordX,n=t.coordY,a=o.coordX,s=o.coordY,c=Math.abs(i-a)>Math.abs(n-s)?Math.abs(n-s):Math.abs(i-a);a=i+c,s=n+c;var d=(i-a)/2;t.coordX<o.coordX&&(d=Math.abs(d));var l=(n-s)/2;t.coordY<o.coordY&&(l=Math.abs(l));for(var u=200,f=Math.abs(d),g=0;g<u;g++){var m={x:Math.round(d+f*Math.cos(2*Math.PI*g/u))+i,y:Math.round(l+f*Math.sin(2*Math.PI*g/u))+n};B[m.x+":"+m.y]&&(B[m.x+":"+m.y].bgcolor=e)}}var Z=function(){return JSON.parse(JSON.stringify(B))},ee=function(e,t){for(var o in B){var r=B[o];if(r.posX<e+1&&r.posX+_>e-1&&r.posY<t+1&&r.posY+_>t-1)return r}return null},te=function(e){var t=V.getBoundingClientRect(),o=t.left,r=t.top;return ee(e.clientX-o,e.clientY-r)},oe=function(e,t){H()(V.toDataURL("image/"+t),e+"."+t,"image/"+t)},re=function(e){E=e,J()},ie=function(e){_=e,se(z),J()},ne=function(e,t,o){var r=!0,i=o.current;switch(e){case"simple":i.bgcolor===t?r=!1:i.bgcolor=t;break;case"erase":i.bgcolor="#ffffff00";break;case"floodfill":N.a.apply(B,t,i.bgcolor,i);break;case"flooderase":N.a.apply(B,"#ffffff00",i.bgcolor,i);break;case"line":R(t,o.start,i);break;case"square":K(t,o.start,i);break;case"circle":Q(t,o.start,i);break;default:console.warn("unbekannter drawmode "+e)}r&&J()},ae=function(){F=Z()},se=function(e){if(z=e,"string"===typeof z){var t=z.split("x");$=t[0],D=t[1]}else $=e,D=e;V.width=$*_,V.height=D*_,A(),J()},ce=function(){var e=q.pop();e&&(B=e,J())},de=function(){q.push(Z())},le=function(e,t){V=e,z=t.gridSize,_=t.gridItemSize,G=t.gridItemDefaultBgColor,P=t.gridItemDefaultBorderColor,E=t.showGridLines,se(z)},ue={init:le,setGridSize:se,cacheGridMap:ae,getGridItemFromPosition:ee,getGridItemFromEvent:te,applyDrawMode:ne,downloadImage:oe,showGridLines:re,changeGridItemSize:ie,undo:ce,updateHistory:de},fe=o("53ca"),ge={_cursor:null,_currentCursor:null,initCursor:function(){var e=this;e._cursor=document.createElement("div"),e._cursor.className="cursor",e._cursor.hidden=!0,document.body.appendChild(e._cursor)},addCursorChanger:function(e,t){var o=this;e.addEventListener("mousemove",(function(e){if(o._cursor&&e&&!e.noPropagationForCursor){e.noPropagationForCursor=!0,o._cursor.hidden=!0;var r=t();if(!r)return;var i=r.text;"hide"===r?o._cursor.classList.contains("kaku-hide-cursor")||o._cursor.classList.add("kaku-hide-cursor"):o._cursor.classList.remove("kaku-hide-cursor"),"object"===Object(fe["a"])(r)&&(o._currentCursor=r),o._cursor.hidden=!1,o._cursor.style.top=e.clientY+(o._currentCursor&&o._currentCursor.offsetY?o._currentCursor.offsetY:0)+"px",o._cursor.style.left=e.clientX+(o._currentCursor&&o._currentCursor.offsetX?o._currentCursor.offsetX:0)+"px",i&&(o._cursor.innerHTML=i)}})),e.addEventListener("mouseout",(function(){o._cursor.hidden=!0}))},update:function(e){e.dispatchEvent(new Event("mousemove"))}},me=(o("b0c0"),o("337f")),he=o.n(me),ve=o("8df8"),be=o.n(ve),pe=he.a.getParser(window.navigator.userAgent),we={browserIsCompatible:function(){var e=!0,t=pe.getBrowser();return"Internet Explorer"===t.name&&"11.0"!==t.version&&(e=!1),e},isTouchDevice:function(){return be()()},getCursorEvent:function(e){var t=this,o=e;return t.isTouchDevice()&&(o=e.touches[0],o||(o=e.changedTouches[0])),o}},Se={name:"DrawingPad",created:function(){this.drawStartGridItem=null,this.moveStartPoint=null,this.currentGridItemIndex=null},mounted:function(){var e=this;we.isTouchDevice()?e.$refs.canvas.addEventListener("touchstart",e.initDraw):e.$refs.canvas.addEventListener("mousedown",e.initDraw),u.$on("setConfigDefaults",(function(t){ue.init(e.$refs.canvas,t),e.calculateAndEmitDrawingPadPosition(),e.gridSize=t.gridSize,e.colorToUse=t.colorToUse,e.drawMode=t.drawMode,e.showGridLines=t.showGridLines,e.gridItemSize=t.gridItemSize})),ge.addCursorChanger(e.$refs.canvas,(function(){return"hide"})),u.$on("changeColor",(function(t){e.colorToUse=t})),u.$on("changeDrawMode",(function(t){e.drawMode=t})),u.$on("changeGridSize",(function(t){e.gridSize=t,ue.setGridSize(t),e.calculateAndEmitDrawingPadPosition()})),u.$on("downloadImage",(function(e){ue.downloadImage("kaku_img",e)})),u.$on("changeShowGridLines",(function(e){ue.showGridLines(!!e)})),u.$on("changeGridItemSize",(function(e){ue.changeGridItemSize(e)})),u.$on("undo",(function(){ue.undo()}))},methods:{draw:function(e){var t=this;if("move"!=t.drawMode){var o=ue.getGridItemFromEvent(e);o&&t.currentGridItemIndex!==o.index&&(t.currentGridItemIndex=o.index,o&&ue.applyDrawMode(t.drawMode,t.colorToUse,{current:o,start:t.drawStartGridItem}))}else t.calculateAndEmitDrawingPadPosition(e)},initDraw:function(e){var t=this;if(we.isTouchDevice()||1===e.which){ue.cacheGridMap(),ue.updateHistory();var o=t.getCursorEvent(e);t.drawStartGridItem=ue.getGridItemFromEvent(o);var r=function e(o){var r=t.getCursorEvent(o);we.isTouchDevice()?(window.removeEventListener("touchend",e),window.removeEventListener("touchmove",i)):(window.removeEventListener("mouseup",e),window.removeEventListener("mousemove",i)),t.draw(r),t.drawStartGridItem=null,t.moveStartPoint=null,t.currentGridItemIndex=null},i=function(e){var o=t.getCursorEvent(e);t.draw(o)};we.isTouchDevice()?(window.addEventListener("touchend",r),window.addEventListener("touchmove",i)):(window.addEventListener("mouseup",r),window.addEventListener("mousemove",i))}},getCursorEvent:function(e){var t=we.getCursorEvent(e);return t},calculateAndEmitDrawingPadPosition:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this;if(e)t.moveStartPoint||(t.moveStartPoint={x:e.clientX-t.$refs.canvas.parentElement.parentElement.getBoundingClientRect().left,y:e.clientY-t.$refs.canvas.parentElement.parentElement.getBoundingClientRect().top}),u.$emit("setDrawingPadPositionByEvent",e,t.moveStartPoint);else{var o=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),r=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0);u.$emit("setDrawingPadPosition",{x:(o-t.$refs.canvas.width)/2,y:(r-t.$refs.canvas.height)/2})}}}},xe=Se,Ce=(o("755a"),Object(v["a"])(xe,O,W,!1,null,"1290dfc6",null)),Ie=Ce.exports,ke={defaults:{gridSize:"50x50",colorToUse:"#27AF60",drawMode:"circle",showGridLines:!0,gridItemSize:8,gridItemDefaultBgColor:"#ffffff00",gridItemDefaultBorderColor:"#666"}},ye={name:"kaku",components:{Controls:Y,DrawingPad:Ie},mounted:function(){var e=this;we.isTouchDevice()||e.initCursor(),we.isTouchDevice()&&document.body.classList.add("kaku-is-mobile"),u.$on("setDrawingPadPositionByEvent",(function(e,t){u.$emit("setDrawingPadPosition",{x:e.clientX-t.x,y:e.clientY-t.y})})),u.$on("setDrawingPadPosition",(function(t){e.$refs["drawingpad-container"].style.left=t.x+"px",e.$refs["drawingpad-container"].style.top=t.y+"px"})),u.$emit("setConfigDefaults",ke.defaults),we.browserIsCompatible()||e.$refs["browser-comp"].show()},methods:{initCursor:function(){var e=this;e._drawMode=ke.defaults.drawMode,ge.initCursor(),ge.addCursorChanger(document.body,(function(){switch(e._drawMode){case"simple":return{offsetX:15,offsetY:15,text:'<i class="fas fa-pencil-alt"></i>'};case"line":return{offsetX:15,offsetY:15,text:'<i class="fas fa-pencil-ruler"></i>'};case"square":return{offsetX:15,offsetY:15,text:'<i class="k-icon k-icon-square-o-black"></i>'};case"circle":return{offsetX:15,offsetY:15,text:'<i class="far fa-circle"></i>'};case"floodfill":return{offsetX:15,offsetY:15,text:'<i class="fas fa-fill-drip fa-flip-horizontal"></i>'};case"erase":return{offsetX:15,offsetY:15,text:'<i class="fas fa-eraser"></i>'};case"flooderase":return{offsetX:15,offsetY:15,text:'<i class="fas fa-fill-drip"></i>'};case"move":return{offsetX:15,offsetY:15,text:'<i class="fas fa-arrows-alt"></i>'}}})),u.$on("changeDrawMode",(function(t){e._drawMode=t,ge.update(document.body)}))}}},Me=ye,ze=(o("c772"),Object(v["a"])(Me,i,n,!1,null,null,null)),_e=ze.exports,Ge=o("5f5b");o("ab8b"),o("2dd8"),o("becf");r["default"].use(Ge["a"]),new r["default"]({render:function(e){return e(_e)}}).$mount("#app")},"755a":function(e,t,o){"use strict";o("fa1e")},c772:function(e,t,o){"use strict";o("f86f")},f86f:function(e,t,o){},fa1e:function(e,t,o){}});
//# sourceMappingURL=app.acf92b54.js.map