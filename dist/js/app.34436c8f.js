webpackJsonp([1],{0:function(t,e,i){t.exports=i("NHnr")},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("j1ja");var r=i("/5sW"),o=i("3EgV"),a=i.n(o),n=i("Z60a"),s=i.n(n),c=i("C9uT"),l=i.n(c),d=(i("MfeA"),function(){function t(){s()(this,t)}return l()(t,[{key:"humanFileSize",value:function(t,e){var i=e?1e3:1024;if(Math.abs(t)<i)return t+" B";var r=e?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],o=-1;do{t/=i,++o}while(Math.abs(t)>=i&&o<r.length-1);return t.toFixed(1)+" "+r[o]}},{key:"isIosSafari",value:function(){return navigator.userAgent.match(/iP(od|hone|ad)/)&&navigator.userAgent.match(/AppleWebKit/)&&!navigator.userAgent.match(/(Cr|Fx|OP)iOS/)}}]),t}()),u=new d,v=function(){function t(){s()(this,t),window.AudioContext=window.AudioContext||window.webkitAudioContext,window.MediaRecorder||(window.MediaRecorder=i("ulR3")),this.em=document.createDocumentFragment()}return l()(t,[{key:"startRecording",value:function(){var t=this;this.audioCtx||(this.audioCtx=new AudioContext),u.isIosSafari()&&(this.processor=this.audioCtx.createScriptProcessor(2048,1,1));var e={audio:!0};return navigator.mediaDevices.getUserMedia(e).then(function(e){t._startRecordingWithStream(e)})}},{key:"_startRecordingWithStream",value:function(t){var e=this;this.micAudioStream=t,this.mediaRecorder=new MediaRecorder(this.micAudioStream),this.mediaRecorder.addEventListener("dataavailable",function(t){return e._onDataAvailable(t)}),this.mediaRecorder.addEventListener("error",function(t){return e._onError(t)}),u.isIosSafari()?this.mediaRecorder.start(null,this.audioCtx,this.processor):this.mediaRecorder.start()}},{key:"_onDataAvailable",value:function(t){if("inactive"===this.mediaRecorder.state){var e=URL.createObjectURL(t.data),i={ts:(new Date).getTime(),blobUrl:e,mimeType:t.data.type,size:t.data.size};this.processor&&(this.processor.disconnect(),this.processor=null),this.mediaRecorder.destroy&&this.mediaRecorder.destroy(),this.em.dispatchEvent(new CustomEvent("recording",{detail:{recording:i}}))}}},{key:"_onError",value:function(t){console.log("error",t),this.em.dispatchEvent(new Event("error")),alert("error:"+t)}},{key:"stopRecording",value:function(){this.mediaRecorder.stop()}}]),t}(),h=new v,p={name:"Test1",filters:{fileSizeToHumanSize:function(t){return u.humanFileSize(t,!0)}},data:function(){return{recordingInProgress:!1,supportedMimeTypes:[],recordings:[]}},created:function(){var t=this;h.em.addEventListener("recording",function(e){return t.onNewRecording(e)})},methods:{startRecording:function(){var t=this;h.startRecording().then(function(){t.recordingInProgress=!0}).catch(function(t){console.error("Exception while start recording: "+t),alert("Exception while start recording: "+t.message)})},stopRecording:function(){h.stopRecording(),this.recordingInProgress=!1},onNewRecording:function(t){this.recordings.push(t.detail.recording)}}},m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-layout",{attrs:{row:"",wrap:""}},[i("div",{staticClass:"test1"},[i("h3",[t._v("Repeatable Recording & Playback")]),i("p",[t._v("Click start/stop multiple times to create multiple recordings. Works on all modern browser/device\n        combinations, including iOS/Safari 11.2.x and newer. However, there are stability problems on iOS/Safari.")]),i("div",[i("v-btn",{attrs:{disabled:t.recordingInProgress},on:{click:t.startRecording}},[t._v("Start Recording\n        ")]),i("v-btn",{attrs:{disabled:!t.recordingInProgress},on:{click:t.stopRecording}},[t._v("Stop Recording")]),i("v-icon",{class:t.recordingInProgress?"live":""},[t._v("mic")])],1)])]),t.recordings.length>0?i("v-layout",{attrs:{column:"",wrap:""}},[i("h4",{staticClass:"mt-3"},[t._v("Recordings")]),t._l(t.recordings,function(e,r){return i("div",{key:e.ts},[i("v-card",[i("v-card-title",{attrs:{"primary-title":""}},[i("v-layout",{attrs:{column:"",wrap:""}},[i("div",[i("h3",[t._v("Recording #"+t._s(r+1))])]),i("div",{staticClass:"ml-3"},[i("div",[i("audio",{attrs:{src:e.blobUrl,controls:"true"}})]),i("div",[t._v("\n                size: "+t._s(t._f("fileSizeToHumanSize")(e.size))+", type: "+t._s(e.mimeType)+"\n              ")])])])],1)],1),r!==t.recordings.length-1?i("v-divider"):t._e()],1)})],2):t._e(),i("v-layout",{staticClass:"mt-5",attrs:{column:"",wrap:""}},[i("h4",[t._v("Notes\n      "),i("small",[t._v("(as of iOS 11.2.6)")])]),i("v-divider"),i("p",[t._v("\n      There are multiple valid ways to do audio recording and playback on every browser/device combination\n      "),i("i",[t._v("except")]),t._v(" iOS/Safari. I believe there are four significant issues, and only the first one seems to be well\n      known.\n    ")]),i("div",{staticClass:"ml-4"},[i("ul",[i("li",[i("strong",[t._v("Security context of the getUserMedia handler is important")]),t._v(" - "),i("br"),i("p",[t._v("\n            The most common and widely known issue issue is that the success handler of the getUserMedia is no longer\n            in the context of the user click. As a result, any audio context and processors created in the handler\n            won't work. The solution is to create the audio context and any processors before calling getUserMedia,\n            while still in the user click handler context. Then once getUserMedia provides the stream,\n            use the previously created constructs to setup the graph and start recording.\n          ")])]),i("li",[i("strong",[t._v("Multiple recordings require new audio streams")]),t._v(" - "),i("br"),i("p",[t._v("\n            There are a number of demos that work for the first recording on iOS/Safari, that then fail with empty\n            audio on subsequent recordings until page is reloaded. The reason is that after stopping recording and\n            extracting playable blob, the next recording requires a new AudioStream. This AudioStream can come\n            from another call to getUserMedia (which won't prompt user after the first time), or potentially, by\n            cloning the existing audio stream.\n          ")])]),i("li",[i("strong",[t._v("Red recording bar indicator")]),t._v(" - "),i("br"),i("p",[t._v("\n            After granting permission to microphone, iOS/Safari will show a red bar notification anytime user switches\n            away from the tab where permission was granted. To remove this bar, the recording stream's tracks must be\n            stopped after recording is finished. Stopping the tracks (and closing the audio context) is\n            straightforward and works well, except for this last issue:\n          ")])]),i("li",[i("strong",[t._v("A sleep/lock/switch event can easily break things, is not detectable, and is not easily\n          recoverable")]),t._v(" - "),i("br"),i("p",[t._v("\n            To see this using the demo above, uncomment the four lines in\n            "),i("code",[t._v("RecordingService._onDataAvailable")]),t._v(" related\n            to stopping the track and closing the audio context. With those lines active, when recording is stopped\n            the red bar will go away and the microphone icon in the Safari address bar will go away. Then, press\n            home key and start the mail app. Then switch back to safari and try to make another recording. Most\n            of the time the recording will appear to work, but the audio will be silent. As far as I can tell, there\n            is no way to\n            detect\n            this, and there is no way to recover without loading a new tab or force quitting Safari.\n          ")]),i("p",[i("em",[t._v("If")]),t._v(" the tracks are not stopped and so the red bar/icon remains, then this occurs much less\n            frequently. Of course, that means the red bar is constantly visible though. And, even in this\n            scenario, starting another app that uses the microphone will almost always break things again. I have\n            not been able to find a way to detect, much less, programmatically fix things, when this occurs. My\n            assumption is that the underlying issue is due to low level iOS/Safari bugs, and not in how this code is setting\n            things up.")])])])])],1),i("v-layout",{attrs:{column:"",wrap:""}},[i("h4",{staticClass:"mt-3"},[t._v("Relevant")]),i("v-divider"),i("div",{staticClass:"ml-4"},[i("ul",[i("li",[i("a",{attrs:{href:"https://github.com/muaz-khan/RecordRTC/issues/324"}},[t._v("https://github.com/muaz-khan/RecordRTC/issues/324")])]),i("li",[i("a",{attrs:{href:"https://github.com/ai/audio-recorder-polyfill/issues/4"}},[t._v("https://github.com/ai/audio-recorder-polyfill/issues/4")])]),i("li",[i("a",{attrs:{href:"https://github.com/danielstorey/webrtc-audio-recording"}},[t._v("https://github.com/danielstorey/webrtc-audio-recording")])])])])],1),i("v-layout",{attrs:{column:"",wrap:""}},[i("h4",{staticClass:"mt-3"},[t._v("Source")]),i("v-divider"),i("div",{staticClass:"ml-4"},[i("ul",[i("li",[i("a",{attrs:{href:"https://github.com/kaliatech/audio-recorder-polyfill"}},[t._v("https://github.com/kaliatech/audio-recorder-polyfill")]),i("ul",{staticClass:"ml-3"},[i("li",[t._v("Primarily: "),i("a",{attrs:{href:"#"}},[t._v("RecorderService.js")])])])]),i("li",[i("a",{attrs:{href:"https://github.com/kaliatech/audio-recorder-polyfill"}},[t._v("https://github.com/kaliatech/audio-recorder-polyfill")])])])])],1)],1)},g=[],f=i("XyMi");function w(t){i("aIxX")}var b=!1,_=w,y="data-v-57e4bf94",S=null,x=Object(f["a"])(p,m,g,b,_,y,S),k=x.exports,R={name:"app",components:{Test1:k},data:function(){return{drawer:!1}}},C=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("v-app",[i("v-navigation-drawer",{attrs:{fixed:"",temporary:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-list",{attrs:{dense:""}},[i("v-list-tile",{attrs:{to:"/"}},[i("v-list-tile-action",[i("v-icon",[t._v("home")])],1),i("v-list-tile-content",[i("v-list-tile-title",[t._v("Home")])],1)],1),i("v-list-tile",{attrs:{to:"/diagnostics"}},[i("v-list-tile-action",[i("v-icon",[t._v("mic")])],1),i("v-list-tile-content",[i("v-list-tile-title",[t._v("Diagnostics")])],1)],1),i("v-list-tile",{attrs:{to:"/test1"}},[i("v-list-tile-action",[i("v-icon",[t._v("mic")])],1),i("v-list-tile-content",[i("v-list-tile-title",[t._v("1 - Repeatable Recording")])],1)],1),i("v-list-tile",{attrs:{to:"/test2"}},[i("v-list-tile-action",[i("v-icon",[t._v("mic")])],1),i("v-list-tile-content",[i("v-list-tile-title",[t._v("2 - With Audio Process Events")])],1)],1),i("v-list-tile",{attrs:{to:"/test3"}},[i("v-list-tile-action",[i("v-icon",[t._v("mic")])],1),i("v-list-tile-content",[i("v-list-tile-title",[t._v("3 - With Microphone Selection")])],1)],1),i("v-list-tile",{attrs:{to:"/test4"}},[i("v-list-tile-action",[i("v-icon",[t._v("mic")])],1),i("v-list-tile-content",[i("v-list-tile-title",[t._v("4 - With In-Browser Encoding")])],1)],1),i("v-list-tile",[i("v-list-tile-action",[i("v-icon",[t._v("file_upload")])],1),i("v-list-tile-content",[i("v-list-tile-title",[t._v("5 - Upload to S3")])],1)],1)],1)],1),i("v-toolbar",{attrs:{color:"grey",dark:"",fixed:"",app:""}},[i("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),i("v-toolbar-title",[t._v("Web Audio Tests")]),i("v-spacer"),i("v-toolbar-items",{staticClass:"hidden-sm-and-down"},[i("v-btn",[t._v("View on Github")])],1)],1),i("v-content",[i("v-container",{staticClass:"scroll-container",attrs:{fluid:""}},[i("div",[i("router-view")],1)])],1)],1)],1)},T=[];function M(t){i("OYMq")}var A=!1,O=M,E=null,P=null,B=Object(f["a"])(R,C,T,A,O,E,P),I=B.exports,D=i("/ocq"),z={name:"Home",components:{},data:function(){return{}}},U=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{md3:""}}),i("v-flex",{attrs:{md6:""}},[i("div",{staticClass:"text-xs-center home--menu"},[i("p",[t._v("\n          Tests to verify functionality of web audio api across all browsers. Particularly on iOS/Safari 11.2.x as it\n          is very strict on security context and has "),i("del",[t._v("bugs")]),i("em",[t._v("special features")]),t._v(".\n        ")]),i("div",[i("v-btn",{attrs:{color:"info",to:"/diagnostics"}},[t._v("Browser Diagnostics")])],1),i("div",[i("v-btn",{attrs:{color:"info",to:"/test1"}},[t._v("1 - Recording and Playback")])],1),i("div",[i("v-btn",{attrs:{color:"info",to:"/test2"}},[t._v("2 - Audio Process Events")])],1),i("div",[i("v-btn",{attrs:{color:"info",to:"/test3"}},[t._v("3 - Microphone Selection")])],1),i("div",[i("v-btn",{attrs:{color:"info"}},[t._v("4 - In-Browser Encoding")])],1),i("div",[i("v-btn",{attrs:{color:"info"}},[t._v("5 - Upload to S3")])],1)])]),i("v-flex",{attrs:{md3:""}})],1)],1)},j=[];function q(t){i("uCOA")}var W=!1,H=q,L=null,F=null,N=Object(f["a"])(z,U,j,W,H,L,F),$=N.exports,Y=i("Oy1H"),G=i.n(Y),X={name:"Diagnostics",data:function(){return{supportedMimeTypes:[],mediaRecorderOrigStr:G()(window.MediaRecorder),mediaRecorderPoly:""}},computed:{audioContextStr:function(){return G()(window.AudioContext)},webkitAudioContextStr:function(){return G()(window.webkitAudioContext)}},created:function(){var t=["audio/vorbis","audio/webm","audio/webm;codecs=opus","audio/aac","audio/mpeg","audio/mp4","audio/x-wav","audio/wav","video/quicktime","video/webm","video/webm;codecs=vp8","video/webm;codecs=vp9","video/webm;codecs=h264","video/mp4"],e=i("ulR3");for(var r in this.mediaRecorderPoly=!e.notSupported,t)e&&e.isTypeSupported?this.supportedMimeTypes.push({name:t[r],supported:e.isTypeSupported(t[r])}):this.supportedMimeTypes.push({name:t[r],supported:"-"})},methods:{}},Z=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mb-3"},[i("v-layout",{attrs:{row:""}},[i("h2",[t._v("Browser Diagnostics")])]),i("v-layout",{staticClass:"mt-3 mb-3",attrs:{row:""}},[i("h4",[t._v("Web Audio Support")])]),i("v-layout",{staticStyle:{"padding-left":"1em"},attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("ul",[i("li",[i("span",{staticClass:"lbl"},[t._v("AudioContext")]),t._v(" : "),i("span",{staticClass:"val"},[t._v(t._s(t.audioContextStr))])]),i("li",[i("span",{staticClass:"lbl"},[t._v("webkitAudioContext")]),t._v(" : "),i("span",{staticClass:"val"},[t._v(t._s(t.webkitAudioContextStr))])]),i("li",[i("span",{staticClass:"lbl"},[t._v("MediaRecorder")]),t._v(" : "),i("span",{staticClass:"val"},[t._v(t._s(t.mediaRecorderOrigStr))])]),i("li",[i("span",{staticClass:"lbl"},[t._v("MediaRecorder(Polyfilled)")]),t._v(" : "),i("span",{staticClass:"val"},[t._v(t._s(t.mediaRecorderPoly))])])])])],1),i("v-layout",{staticClass:"mt-3",attrs:{row:""}},[i("h4",[t._v("Supported MediaRecorder Mime Types")])]),i("v-layout",{staticStyle:{"padding-left":"1em"},attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("ul",t._l(t.supportedMimeTypes,function(e){return i("li",{key:e.name},[i("span",{staticClass:"lbl"},[t._v(t._s(e.name))]),t._v(" : "),i("span",{staticClass:"val"},[t._v(t._s(e.supported))])])}))])],1),i("v-layout",{staticClass:"mt-3",attrs:{row:""}},[i("h4",[t._v("References and Demos")])]),i("v-layout",{staticStyle:{"padding-left":"1em"},attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("ul",[i("li",[i("a",{attrs:{href:"https://higuma.github.io/web-audio-recorder-js/"}},[t._v("https://higuma.github.io/web-audio-recorder-js/")]),t._v(" -\n          Doesn't work on iOS/Safari. Didn't seem to work in Edge either, but not clear why.\n        ")]),i("li",[i("a",{attrs:{href:"https://webrtc.github.io/samples/src/content/devices/input-output/"}},[t._v("https://webrtc.github.io/samples/src/content/devices/input-output/")]),t._v("\n          - Doesn't work on iOS/Safari or Edge.\n        ")])])])],1)],1)},K=[];function V(t){i("qTL8")}var J=!1,Q=V,tt="data-v-77b6555b",et=null,it=Object(f["a"])(X,Z,K,J,Q,tt,et),rt=it.exports;r["a"].use(D["a"]);var ot=new D["a"]({mode:"history",routes:[{path:"/",name:"home",component:$},{path:"/diagnostics",name:"diagnostics",component:rt},{path:"/test1",name:"test1",component:k}]}),at=ot,nt=i("IHMs"),st=i.n(nt);r["a"].use(a.a,{theme:{primary:st.a.grey.darken1,secondary:st.a.grey.lighten4,accent:st.a.grey.base}}),r["a"].config.productionTip=!1,new r["a"]({router:at,render:function(t){return t(I)}}).$mount("#app")},OYMq:function(t,e){},aIxX:function(t,e){},qTL8:function(t,e){},uCOA:function(t,e){}},[0]);
//# sourceMappingURL=app.34436c8f.js.map