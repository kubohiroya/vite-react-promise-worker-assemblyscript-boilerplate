async function E(n,c={}){const u={env:Object.assign(Object.create(globalThis),c.env||{},{abort(e,t,s,a){e=d(e>>>0),t=d(t>>>0),s=s>>>0,a=a>>>0,(()=>{throw Error(`${e} in ${t}:${s}:${a}`)})()},postProgressMessage(e,t,s,a,o){e=e>>>0,t=t>>>0,s=s>>>0,a=a>>>0,o=o>>>0,postProgressMessage(e,t,s,a,o)}})},{exports:r}=await WebAssembly.instantiate(n,u),i=r.memory||c.env.memory,g=Object.setPrototypeOf({initialize(){return j(r.initialize()>>>0)},createImageObject(e,t){return r.createImageObject(e,t)>>>0},setImageObjectContent(e,t){t=p(Uint8ClampedArray,5,0,t)||v(),r.setImageObjectContent(e,t)},getImageObjectPtrLen(e){return b(t=>m(t)>>>0,2,r.getImageObjectPtrLen(e)>>>0)},getImageObjectWidthHeight(e){return b(t=>m(t)>>>0,2,r.getImageObjectWidthHeight(e)>>>0)}},r);function d(e){if(!e)return null;const t=e+new Uint32Array(i.buffer)[e-4>>>2]>>>1,s=new Uint16Array(i.buffer);let a=e>>>1,o="";for(;t-a>1024;)o+=String.fromCharCode(...s.subarray(a,a+=1024));return o+String.fromCharCode(...s.subarray(a,t))}function b(e,t,s){if(!s)return null;const a=m(s+4),o=l.getUint32(s+12,!0),_=new Array(o);for(let f=0;f<o;++f)_[f]=e(a+(f<<t>>>0));return _}function p(e,t,s,a){if(a==null)return 0;const o=a.length,_=r.__pin(r.__new(o<<s,1))>>>0,f=r.__new(12,t)>>>0;return C(f+0,_),l.setUint32(f+4,_,!0),l.setUint32(f+8,o<<s,!0),new e(i.buffer,_,o).set(a),r.__unpin(_),f}class h extends Number{}const A=new FinalizationRegistry(U);function j(e){if(!e)return null;const t=new h(P(e));return A.register(t,e),t}const w=new Map;function P(e){if(e){const t=w.get(e);t?w.set(e,t+1):w.set(r.__pin(e),1)}return e}function U(e){if(e){const t=w.get(e);if(t===1)r.__unpin(e),w.delete(e);else if(t)w.set(e,t-1);else throw Error(`invalid refcount '${t}' for reference '${e}'`)}}function v(){throw TypeError("value must not be null")}let l=new DataView(i.buffer);function C(e,t){try{l.setUint32(e,t,!0)}catch{l=new DataView(i.buffer),l.setUint32(e,t,!0)}}function m(e){try{return l.getUint32(e,!0)}catch{return l=new DataView(i.buffer),l.getUint32(e,!0)}}return g}const{memory:I,__new:D,__pin:H,__unpin:q,__collect:M,__rtti_base:R,initialize:V,createImageObject:S,setImageObjectContent:F,getImageObjectPtrLen:$,deleteImageObject:z,applyAverageFilter:L,getImageObjectWidthHeight:x}=await(async n=>E(await(async()=>typeof process<"u"&&process.versions!=null&&(process.versions.node!=null||process.versions.bun!=null)?globalThis.WebAssembly.compile(await(await Promise.resolve().then(function(){return B})).readFile(n)):await globalThis.WebAssembly.compileStreaming(globalThis.fetch(n)))(),{}))(new URL("/vite-react-promise-worker-assemblyscript-boilerplate/assets/index-CeWPnu7n.wasm",import.meta.url));var y=(n=>(n[n.create=0]="create",n[n.delete=1]="delete",n[n.transfer=2]="transfer",n))(y||{}),O=(n=>(n[n.applyAverageFilter=100]="applyAverageFilter",n))(O||{});self.addEventListener("message",n=>{const{type:c,requestId:u}=n.data;switch(c){case y.create:{const{width:r,height:i,buffer:g}=n.data.requestPayload,d=S(r,i),b=new Uint8ClampedArray(g);F(d,b),self.postMessage({type:y.create,requestId:u,responsePayload:{id:d,width:r,height:i}});break}case O.applyAverageFilter:{const{id:r,iteration:i}=n.data.requestPayload;L(r,i,c,u),self.postMessage({type:c,requestId:u,responsePayload:{id:r}});break}case y.transfer:{const{id:r}=n.data.requestPayload,[i,g]=x(r),[d,b]=$(r),p=new Uint8ClampedArray(I.buffer,d,b),h=Uint8ClampedArray.from(p);z(r),self.postMessage({type:y.transfer,requestId:u,responsePayload:{id:r,width:i,height:g,buffer:h.buffer}},[h.buffer]);break}default:throw new Error("unknown message:"+JSON.stringify(n.data))}});globalThis.postProgressMessage=function(c,u,r,i,g){self.postMessage({type:i,requestId:g,responsePayload:{id:c},progress:{value:u,valueMax:r}})};var B=Object.freeze({__proto__:null});
