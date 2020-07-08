#! /usr/bin/env node
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=13)}([function(e,t){e.exports=require("tslib")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(4);t.streamToString=function(e,t="utf8"){const n=[];return new Promise((r,o)=>{e.on("error",o).on("data",e=>n.push(e)).on("end",()=>r(Buffer.concat(n).toString(t)))})},t.stringToStream=function(e,t=null){const n=new r.Readable;return n.push(e,t),n.push(null,t),n},t.bufferToStream=function(e){return new r.Readable({read(){this.push(e),this.push(null)}})},t.streamToBuffer=function(e){const t=[];return new Promise((n,r)=>{e.on("error",r).on("data",e=>t.push(e)).on("end",()=>n(Buffer.concat(t)))})}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("stream")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(7)),s=r.__importDefault(n(50));t.error=function(e,t="",n=""){o.default.error(`${s.default.red("Error")}: ${e} ${s.default.yellow(t)} ${n&&s.default.red("on line "+n)}`)},t.info=function(e,t,n=""){const r=[e,s.default.cyan(t),n];o.default.info(r.join(" "))},t.result=function({name:e,size:t,type:n}){const r=[s.default.grey(" ->"),s.default.yellow(e+n),s.default.grey(t)];o.default.info(r.join(" "))},t.output=function(e,t){let n=["\n",s.default.grey(e)];t&&(n=[t,s.default.grey("->")].concat(n)),o.default.info(n.join(" "))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(14),o=n(24),s=n(37),i=n(38),a=n(41),u=n(46),c={css:r.method,js:o.method,copy:s.method,fonts:i.method,csproj:a.method,msbuild:u.method};t.tasks=c},function(e,t){e.exports=require("fancy-log")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.runtimeRequire=function(e){return require(e)}},function(e,t){e.exports=require("libxmljs")},function(e,t){e.exports=require("is-glob")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getResultFileName=function({name:e,type:t,hash:n,prefix:r}){let o=e+(n?"."+n:"")+t;return r&&(o=`${r}-${o}`),o}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(3));t.writeFile=async function(e,t,n="utf8"){const o=r.default.createWriteStream(e,n);return new Promise(async(e,n)=>{t.pipe(o).on("finish",e),o.on("error",n)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(6),s=r.__importStar(n(5)),i=n(53),a=n(55),u=n(56);process.on("warning",e=>console.warn(e.stack));const c=process.argv[2]||"",l=process.argv[3]||"";o.tasks[c]||(s.error("Unknown build task:",`"${c}"`),process.exit(1));const f=i.loadConfig(c,l),d=new u.TaskRunner(c,f);try{a.validOptions(f)}catch({message:e}){s.error("Invalid arguments:",e),process.exit(1)}d.start(),d.watch()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(15);t.method=async function(e){const t=r.bundleCompiler(e);return async({data:n,name:r,path:o})=>{const{cssValue:s,cssModule:i}=await t(n,o);"function"==typeof e.renameFile&&(r=e.renameFile(r,o));const a=r+".css";return{[a]:s,[a+".json"]:i}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(16),o=n(18),s=n(23);t.bundleCompiler=function(e){const t=r.sassCompiler(e),n=o.cssProcessor(e);return async(e,r)=>new Promise((o,i)=>e.pipe(t(r,i)).pipe(n(r,i)).pipe(s.emitFile(o)).on("error",i))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(17),o=n(4);function s(e,{sourceMap:t,includePath:n}){return function(o){try{const s=r.renderSync({data:o.toString(),file:e,includePaths:n?n.split(","):[],sourceMap:t,sourceMapEmbed:t});this.push(s)}catch(e){this.emit("error",e)}}}t.sassCompiler=function(e){return(t,n)=>new o.Transform({objectMode:!0,transform:s(t,e)}).on("error",n)}},function(e,t){e.exports=require("node-sass")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(19)),s=r.__importDefault(n(20)),i=r.__importDefault(n(21)),a=r.__importDefault(n(22)),u=n(4);function c(e,t,n){return async function(r){try{const o=await e.process(r.css,{from:t,map:n});this.push(o)}catch(e){this.emit("error",e)}}}t.cssProcessor=function({release:e,cssModules:t,sourceMap:n}){const r=[s.default({cascade:!1,overrideBrowserslist:["last 2 versions","> 1%"]})];t&&r.unshift(i.default({generateScopedName:e?"[hash:base64:8]":"[name]-[local]"})),e&&r.push(a.default());const l=o.default(r);return(e,t)=>new u.Transform({objectMode:!0,transform:c(l,e,n)}).on("error",t)}},function(e,t){e.exports=require("postcss")},function(e,t){e.exports=require("autoprefixer")},function(e,t){e.exports=require("postcss-modules")},function(e,t){e.exports=require("cssnano")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(4),o=n(2);function s(e){const t=e.find(e=>"postcss-modules"===e.plugin),n=null==t?void 0:t.exportTokens;if(n)return o.stringToStream(JSON.stringify(n))}t.emitFile=function(e){return new r.Transform({objectMode:!0,transform:({css:t,messages:n})=>e({cssValue:o.stringToStream(t),cssModule:s(n)})})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(25);t.method=async function(e){const t=r.bundleCompiler(e);return async({data:e,path:n})=>(await t(e,n)).reduce((e,t)=>(e[t.name]=t.data,e),{})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(26)),s=r.__importDefault(n(27)),i=n(28),a=n(2);t.bundleCompiler=function(e){const t=i.webpackCompiler(e);return(e,n)=>new Promise((r,i)=>{const u=[];e.pipe(o.default(n)).pipe(s.default()).pipe(t()).on("data",({basename:e,contents:t})=>{u.push({name:e,data:a.stringToStream(t)})}).on("error",i).on("close",()=>r(u))})}},function(e,t){e.exports=require("vinyl-source-stream")},function(e,t){e.exports=require("vinyl-named")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(29)),o=n(30);t.webpackCompiler=function(e){const t=new o.WebpackInstance(e);let n=null;return()=>(n||(n=function(e){return r.default(e.onStreamWrite,(function(){e.onStreamEnd(this)}))}(t)),n.on("end",()=>{n=null}),n)}},function(e,t){e.exports=require("through")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(31)),s=r.__importDefault(n(7)),i=r.__importDefault(n(32)),a=r.__importDefault(n(33)),u=r.__importDefault(n(1)),c=n(8),l=n(34);t.WebpackInstance=class{constructor(e){this.options=e,this.fileSystem=new i.default,this.entry={},this.onStreamWrite=({named:e,path:t})=>{this.entry[e]||(this.entry[e]=[]),this.entry[e].push(t)},this.onStreamEnd=e=>{const t=this.getWebpackConfig();this.instance||(this.instance=o.default(t)),this.instance.run(this.onComplete(e)),this.onAfterEmit(e)},this.onComplete=e=>(t,n)=>{t?e.emit("error",t):(s.default.info(n.toString({colors:!0})),e.emit("end"))},this.onTapAsync=(e,{assets:t},n)=>{const r=Object.keys(t);for(const n of r){if(!t[n].emitted)continue;const r=this.prepareFile(n);e.queue(r)}n()}}onAfterEmit(e){const{instance:t,fileSystem:n}=this;t.outputFileSystem=n,t.hooks.afterEmit.tapAsync("WebpackStream",(t,n)=>this.onTapAsync(e,t,n))}getWebpackConfig(){const{options:e,entry:t,config:n}=this;if(n)return n;let r;try{r=c.runtimeRequire("./webpack.config.js")}catch(t){r=l.defaultWebpackConfig(e)}return this.config={...r,entry:t}}prepareFile(e){const{instance:t,fileSystem:n}=this;let r=n.join(t.outputPath,e);-1!==r.indexOf("?")&&(r=r.split("?")[0]);const o=n.readFileSync(r);return new a.default({base:t.outputPath,path:u.default.join(t.outputPath,e),contents:o})}}},function(e,t){e.exports=require("webpack")},function(e,t){e.exports=require("memory-fs")},function(e,t){e.exports=require("vinyl")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(1)),s=n(35),i=r.__importDefault(n(36));t.defaultWebpackConfig=function({release:e,pathAlias:t,includePath:n,outputPath:r}){return{target:"web",mode:e?"production":"development",cache:!e,output:{filename:"[name].js",chunkFilename:e?"[name].[chunkhash:8].js":"[name].js",jsonpFunction:"__IDL__",crossOriginLoading:"anonymous",publicPath:o.default.join(r,"/")},resolve:{modules:["node_modules",...n?n.split(",").map(e=>o.default.resolve(e)):[]],extensions:[".ts",".tsx",".js",".jsx",".json",".scss",".css"],alias:{...t?{"@":o.default.resolve(t)}:{}}},module:{rules:[{test:/\.tsx?$/,use:[{loader:s.resolveLoader("ts-loader")}]}]},optimization:{mergeDuplicateChunks:!0,runtimeChunk:!1,splitChunks:{name:!0,chunks:"async",cacheGroups:{default:!1,vendor:{test:/[\\/]node_modules[\\/]/,name:"vendor",enforce:!0,chunks:"all"}}}},plugins:[new i.default({vendor:"[name].js"})]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(3)),s=r.__importDefault(n(1));t.resolveLoader=function(e){return o.default.existsSync("node_modules/"+e)?e:s.default.resolve("node_modules/ideal-tools/node_modules",e)}},function(e,t){e.exports=require("webpack-chunk-rename-plugin")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1);t.method=async function({renameFile:e}){return async({data:t,name:n,path:o})=>{const s=r.extname(o);return"function"==typeof e&&(n=e(n,o)),{[n+s]:t}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(39)),o=n(2),s=n(40);t.method=async function({renameFile:e}){return async({data:t,name:n,path:i})=>{const a=await o.streamToBuffer(t),{familyName:u}=r.default.create(a),c=s.fontTemplate({familyName:u,fileName:n,encodedData:a.toString("base64")});return"function"==typeof e&&(n=e(n,i)),{[n+".css"]:o.stringToStream(c)}}}},function(e,t){e.exports=require("fontkit")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fontTemplate=function({familyName:e,encodedData:t,fileName:n}){return`\n    @font-face {\n      font-family: '${e}';\n      src: url(data:application/font-woff;charset=utf-8;base64,${t}) format('woff');\n      font-style: normal;\n    }\n  `}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(42),o=n(43);t.method=async function({manifestPath:e}){const t=await r.loadManifest(e);return async({data:n,name:r})=>({[r+".csproj"]:await o.buildResult(e,t,n)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(3)),s=r.__importDefault(n(1));t.loadManifest=function(e){const t=s.default.resolve(e,"assets.json");return new Promise((e,n)=>{o.default.readFile(t,(t,r)=>{t?n(t):e(JSON.parse(r.toString()))})})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(1)),s=r.__importDefault(n(9)),i=n(2),a=n(44),u=n(45);t.buildResult=async function(e,t,n){const r=await a.parseXMLDoc(n);return Object.keys(t).forEach(t=>{const n=new s.default.Element(r,u.config.element);n.attr(u.config.attribute,o.default.join(e,t)),r.get(u.config.xpath,{xmlns:u.config.xmlns}).addChild(n)}),i.stringToStream(r.toString())}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(9)),o=n(2);t.parseXMLDoc=async function(e){const t=await o.streamToString(e);return r.default.parseXml(t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.config={xpath:"/xmlns:Project/xmlns:ItemGroup[xmlns:Content]",xmlns:"http://schemas.microsoft.com/developer/msbuild/2003",element:"Content",attribute:"Include"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(47);t.method=async function(e){const t=r.dotnetCompiler(e);return async({path:e})=>(await t.nuget(e),await t.build(e),{})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(48),s=r.__importDefault(n(49)),i=r.__importStar(n(5)),a=n(51),u=n(52);function c(e){return e=>new Promise((t,n)=>{const r=u.nugetArguments(e,{nuget:a.msbuildConfig.nuget,maxBuffer:204800});o.execFile(a.msbuildConfig.nuget,r,{maxBuffer:204800},(e,r)=>{r.trim()&&i.output(r),e?n(e):t()})})}function l({msbuildVersion:e,msbuildPackage:t}){const{targets:n,toolsVersion:r,configuration:o,errorsOnly:i,publishPath:u}=a.msbuildConfig;return a=>new Promise((c,l)=>{const f=new s.default(c);f.sourcePath=a,f.config("targets",n),f.config("version",e||r),f.config("configuration",o),i&&f.overrideParams.push("/clp:ErrorsOnly"),t?(f.config("outputPath",u),f.config("publishProfile","Staging"),f.package()):f.build()})}t.dotnetCompiler=function(e){return{nuget:c(e),build:l(e)}}},function(e,t){e.exports=require("child_process")},function(e,t){e.exports=require("msbuild")},function(e,t){e.exports=require("chalk")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.msbuildConfig={configuration:"Debug",nuget:"C:/tools/nuget.exe",platform:"Any CPU",targets:["Build"],toolsVersion:"15.0",errorsOnly:!0,publishPath:"C:\\temp\\vc-build"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.nugetArguments=function(e,t){const n=["restore",e];return["source","configFile","packagesDirectory","solutionDirectory","msBuildVersion","verbosity"].forEach(e=>{const r=t[e];r&&(n.push("-"+e),n.push(r))}),["noCache","requireConsent","disableParallelProcessing"].forEach(e=>{t[e]&&n.push("-"+e)}),n.push("-noninteractive"),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(1)),o=n(54),s=n(8),i={sourceDirectory:o.argv.sourceDir||void 0,release:!!o.argv.release,outputPath:o.argv.outputPath||void 0,sourceMap:!!o.argv.sourceMap,cssModules:!!o.argv.cssModules,watch:!!o.argv.watch,watchPath:o.argv.watchPath||void 0,verbose:!!o.argv.verbose,pathAlias:o.argv.pathAlias,filePrefix:o.argv.filePrefix||void 0,includePath:o.argv.includePath||void 0,skipManifest:!!o.argv.skipManifest,manifestPath:o.argv.manifestPath||o.argv.outputPath||void 0,msbuildVersion:o.argv.msbuildPackage||void 0,msbuildPackage:!!o.argv.msbuildPackage};t.loadConfig=function(e,t){t.startsWith("--")&&(t=void 0);try{const{[e]:n={}}=s.runtimeRequire(r.default.resolve("./ideal.config"));return function(e,t){const n=["skipManifest"],r=Object.keys(i).filter(e=>n.indexOf(e)),o={...t,...e?{sourcePath:e}:{}};r.forEach(e=>{const t=i[e];void 0!==t&&(o[e]=t)}),o.manifestPath||(o.manifestPath=o.outputPath);return o}(t,n)}catch(e){return{...i,sourcePath:t}}}},function(e,t){e.exports=require("yargs")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(10)),s=r.__importDefault(n(3)),i=r.__importDefault(n(1));t.validOptions=function({sourceDirectory:e="",sourcePath:t,outputPath:n,watchPath:r}){if(!o.default(t)&&!s.default.existsSync(i.default.join(e,t)))throw new Error(`Invalid source path: "${t}"`);if(!n)throw new Error(`Missing output path "${n}"`);if(r&&!o.default(r))throw new Error(`Incorrectly formatted "${r}"`);return!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(57)),s=r.__importDefault(n(58)),i=r.__importDefault(n(59)),a=r.__importDefault(n(10)),u=r.__importDefault(n(1)),c=n(6),l=r.__importStar(n(5)),f=n(60),d=n(61),p=n(63),m=n(64),h=n(67),_=n(70),y=n(71);t.TaskRunner=class{constructor(e,t){this.methodKey=e,this.options=t}async start(){const{options:e}=this;(await this.readPaths()).length?(await i.default(e.outputPath),await this.setMethod(),await this.taskMethod()):l.error("No matching files for",e.sourcePath)}async watch(){const{sourcePath:e,watch:t,watchPath:n,outputPath:r}=this.options;t&&o.default.watch(n||e,{atomic:!1,ignored:[r]}).on("change",()=>this.taskMethod())}async readPaths(){const{sourceDirectory:e,sourcePath:t}=this.options,n=u.default.join(e||"",t);return this.filePaths=[n],a.default(t)&&(this.filePaths=await d.readGlobFiles(n)),this.filePaths}async setMethod(){const{methodKey:e,options:t}=this;try{const n=await c.tasks[e](t);this.taskMethod=()=>this.runTask(n)}catch({message:e,file:t,line:n}){l.error(e,t,n),process.exit(1)}}async runTask(e){const{options:t,filePaths:n,taskRunning:r}=this;if(r)return;this.taskRunning=!0,this.logRunTime("start");const o=n.map(e=>f.readFile(e)).map((t,r)=>e({data:t,path:n[r],name:p.getStreamFileName(t)}));let s=[];try{s=await this.processTasks(o)}catch({message:e,file:t,line:n}){l.error(e,t,n),process.exit(1)}t.verbose&&s.forEach(l.result),this.taskRunning=!1,this.logRunTime("end")}logRunTime(e){const{methodKey:t}=this,n=(new Date).getTime();if("start"===e)return this.startTime=n,void l.info("Running",t,"task...");const r=s.default((new Date).getTime()-this.startTime);l.info("Finished",t,"after "+r)}async processTasks(e){const{release:t,outputPath:n,filePrefix:r,skipManifest:o,manifestPath:s}=this.options;let i=[];return i=await m.processStreams(e,r),i=await h.hashFileNames(i,t),i=await _.writeStreams(i,n),o||(i=await y.writeManifest(i,s)),i}}},function(e,t){e.exports=require("chokidar")},function(e,t){e.exports=require("pretty-ms")},function(e,t){e.exports=require("mkdirp")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(3);t.readFile=function(e,t=null){return r.createReadStream(e,t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(62));t.readGlobFiles=e=>new Promise((t,n)=>r.default(e,async(e,r)=>{e?n(e):t(r)}))},function(e,t){e.exports=require("glob")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(1));function o({path:e}){const{name:t}=r.default.parse(e);return t}t.getStreamFileNames=function(e){return e.map(o)},t.getStreamFileName=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(65)),s=r.__importDefault(n(1)),i=n(66);t.processStreams=async function(e,t){return function(e,t){const n=e.map(e=>Object.keys(e)).map((n,r)=>n.map(n=>function(e,t,n){const r=s.default.parse(t),i=e[t];return{name:r.name,type:r.ext,hash:"",prefix:n,size:i&&o.default(i.readableLength),stream:i}}(e[r],n,t)));return i.flattenArray(n).filter((e,t,n)=>n.findIndex(({name:t,type:n})=>t===e.name&&n===e.type)===t).filter(({stream:e})=>!!e)}(await Promise.all(e),t)}},function(e,t){e.exports=require("filesize")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.flattenArray=function(e){return[].concat.apply([],e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(68)),o=n(2),s=n(69);t.hashFileNames=async function(e,t){if(!t)return e;const{contents:n,streams:i}=await async function(e){const t=await Promise.all(e.map(e=>o.streamToString(e))),n=t.map(e=>o.stringToStream(e));return{contents:t,streams:n}}(e.map(({stream:e})=>e)),a=n.map(e=>r.default(e,{algorithm:"md5"}).substr(0,8));return e.map((e,t)=>({...e,stream:i[t],hash:!s.isHashed(e.name)&&a[t]}))}},function(e,t){e.exports=require("hasha")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=/\.([a-zA-Z0-9]){8}/;t.isHashed=function(e){return e.match(r)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0).__importDefault(n(1)),o=n(11),s=n(12);t.writeStreams=async function(e,t){return await Promise.all(e.map(e=>s.writeFile(r.default.join(t,o.getResultFileName(e)),e.stream))),e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=r.__importDefault(n(3)),s=r.__importDefault(n(1)),i=n(11),a=n(2),u=n(12);t.writeManifest=async function(e,t){const n=s.default.join(t,"assets.json"),r=await c(n),o=e.reduce((e,t)=>(e[t.name+t.type]=i.getResultFileName(t),e),{}),l=a.stringToStream(JSON.stringify({...r,...o}));return await u.writeFile(n,l),e};const c=e=>new Promise((t,n)=>o.default.readFile(e,(e,n)=>{let r={};if(!e&&n){try{r=JSON.parse(n.toString())}catch(e){}t(r)}else t({})}))}]);