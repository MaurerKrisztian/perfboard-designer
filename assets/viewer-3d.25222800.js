var Nl=Object.defineProperty;var Ol=(i,e,t)=>e in i?Nl(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var rt=(i,e,t)=>(Ol(i,typeof e!="symbol"?e+"":e,t),t);import{G as Nr,r as Fl,p as Bl,l as zl,i as Po,w as Hl,a as Gl,b as Vl,s as Wl,g as wi,S as kl,C as Xl,c as Di,d as Yl,e as ql,f as Zr,h as Zl,j as jl,k as Kl,t as Rc,m as Jl,n as $l,o as Ql,q as eh,u as th,_ as nh}from"./app.c0df015c.js";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lo="160",$n={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Qn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ih=0,Lo=1,rh=2,Cc=1,Pc=2,hn=3,Rn=0,It=1,zt=2,wn=0,Si=1,Do=2,Io=3,Uo=4,sh=5,Bn=100,oh=101,ah=102,No=103,Oo=104,ch=200,lh=201,hh=202,uh=203,Ys=204,qs=205,dh=206,fh=207,ph=208,mh=209,gh=210,_h=211,vh=212,xh=213,Mh=214,yh=0,Sh=1,bh=2,Br=3,Eh=4,wh=5,Th=6,Ah=7,Lc=0,Rh=1,Ch=2,Tn=0,Ph=1,Lh=2,Dh=3,Dc=4,Ih=5,Uh=6,Ic=300,Ti=301,Ai=302,Zs=303,js=304,jr=306,Ks=1e3,Kt=1001,Js=1002,Dt=1003,Fo=1004,as=1005,kt=1006,Nh=1007,ji=1008,An=1009,Oh=1010,Fh=1011,ho=1012,Uc=1013,bn=1014,En=1015,Ki=1016,Nc=1017,Oc=1018,Hn=1020,Bh=1021,Jt=1023,zh=1024,Hh=1025,Gn=1026,Ri=1027,Gh=1028,Fc=1029,Vh=1030,Bc=1031,zc=1033,cs=33776,ls=33777,hs=33778,us=33779,Bo=35840,zo=35841,Ho=35842,Go=35843,Hc=36196,Vo=37492,Wo=37496,ko=37808,Xo=37809,Yo=37810,qo=37811,Zo=37812,jo=37813,Ko=37814,Jo=37815,$o=37816,Qo=37817,ea=37818,ta=37819,na=37820,ia=37821,ds=36492,ra=36494,sa=36495,Wh=36283,oa=36284,aa=36285,ca=36286,sv=2300,ov=2301,Gc=3e3,Vn=3001,kh=3200,Xh=3201,Vc=0,Yh=1,Xt="",bt="srgb",fn="srgb-linear",uo="display-p3",Kr="display-p3-linear",zr="linear",ot="srgb",Hr="rec709",Gr="p3",ei=7680,la=519,qh=512,Zh=513,jh=514,Wc=515,Kh=516,Jh=517,$h=518,Qh=519,ha=35044,ua="300 es",$s=1035,un=2e3,Vr=2001;class Yn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let da=1234567;const Wi=Math.PI/180,Ji=180/Math.PI;function qn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function vt(i,e,t){return Math.max(e,Math.min(t,i))}function fo(i,e){return(i%e+e)%e}function eu(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function tu(i,e,t){return i!==e?(t-i)/(e-i):0}function ki(i,e,t){return(1-t)*i+t*e}function nu(i,e,t,n){return ki(i,e,1-Math.exp(-t*n))}function iu(i,e=1){return e-Math.abs(fo(i,e*2)-e)}function ru(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function su(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ou(i,e){return i+Math.floor(Math.random()*(e-i+1))}function au(i,e){return i+Math.random()*(e-i)}function cu(i){return i*(.5-Math.random())}function lu(i){i!==void 0&&(da=i);let e=da+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hu(i){return i*Wi}function uu(i){return i*Ji}function Qs(i){return(i&i-1)===0&&i!==0}function du(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function fu(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function vi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const pu={DEG2RAD:Wi,RAD2DEG:Ji,generateUUID:qn,clamp:vt,euclideanModulo:fo,mapLinear:eu,inverseLerp:tu,lerp:ki,damp:nu,pingpong:iu,smoothstep:ru,smootherstep:su,randInt:ou,randFloat:au,randFloatSpread:cu,seededRandom:lu,degToRad:hu,radToDeg:uu,isPowerOfTwo:Qs,ceilPowerOfTwo:du,floorPowerOfTwo:Wr,setQuaternionFromProperEuler:fu,normalize:Pt,denormalize:vi};class j{constructor(e=0,t=0){j.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,n,r,s,o,a,c,l){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=r[0],m=r[3],p=r[6],b=r[1],v=r[4],M=r[7],C=r[2],T=r[5],w=r[8];return s[0]=o*_+a*b+c*C,s[3]=o*m+a*v+c*T,s[6]=o*p+a*M+c*w,s[1]=l*_+h*b+u*C,s[4]=l*m+h*v+u*T,s[7]=l*p+h*M+u*w,s[2]=d*_+f*b+g*C,s[5]=d*m+f*v+g*T,s[8]=d*p+f*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*s*h+n*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,g=t*u+n*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*l-h*n)*_,e[2]=(a*n-r*o)*_,e[3]=d*_,e[4]=(h*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(fs.makeScale(e,t)),this}rotate(e){return this.premultiply(fs.makeRotation(-e)),this}translate(e,t){return this.premultiply(fs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fs=new qe;function kc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function mu(){const i=kr("canvas");return i.style.display="block",i}const fa={};function Xi(i){i in fa||(fa[i]=!0,console.warn(i))}const pa=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ma=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),sr={[fn]:{transfer:zr,primaries:Hr,toReference:i=>i,fromReference:i=>i},[bt]:{transfer:ot,primaries:Hr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Kr]:{transfer:zr,primaries:Gr,toReference:i=>i.applyMatrix3(ma),fromReference:i=>i.applyMatrix3(pa)},[uo]:{transfer:ot,primaries:Gr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ma),fromReference:i=>i.applyMatrix3(pa).convertLinearToSRGB()}},gu=new Set([fn,Kr]),tt={enabled:!0,_workingColorSpace:fn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!gu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=sr[e].toReference,r=sr[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return sr[i].primaries},getTransfer:function(i){return i===Xt?zr:sr[i].transfer}};function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ps(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ti;class Xc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ti===void 0&&(ti=kr("canvas")),ti.width=e.width,ti.height=e.height;const n=ti.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ti}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=kr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=bi(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bi(t[n]/255)*255):t[n]=bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _u=0;class Yc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=qn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ms(r[o].image)):s.push(ms(r[o]))}else s=ms(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ms(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vu=0;class Rt extends Yn{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=Kt,r=Kt,s=kt,o=ji,a=Jt,c=An,l=Rt.DEFAULT_ANISOTROPY,h=Xt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=qn(),this.name="",this.source=new Yc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new j(0,0),this.repeat=new j(1,1),this.center=new j(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Vn?bt:Xt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ic)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ks:e.x=e.x-Math.floor(e.x);break;case Kt:e.x=e.x<0?0:1;break;case Js:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ks:e.y=e.y-Math.floor(e.y);break;case Kt:e.y=e.y<0?0:1;break;case Js:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===bt?Vn:Gc}set encoding(e){Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Vn?bt:Xt}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=Ic;Rt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,r=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,M=(f+1)/2,C=(p+1)/2,T=(h+d)/4,w=(u+_)/4,U=(g+m)/4;return v>M&&v>C?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=T/n,s=w/n):M>C?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=T/r,s=U/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=w/s,r=U/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xu extends Yn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Xi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Vn?bt:Xt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Rt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Yc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends xu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class qc extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mu extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],h=n[r+2],u=n[r+3];const d=s[o+0],f=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*_,b=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const C=Math.sqrt(v),T=Math.atan2(C,p*b);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}const M=a*b;if(c=c*m+d*M,l=l*m+f*M,h=h*m+g*M,u=u*m+_*M,m===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],h=n[r+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(r/2),u=a(s/2),d=c(n/2),f=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-r)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-r)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+r*l-s*c,this._y=r*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-r*a,this._w=o*h-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class x{constructor(e=0,t=0,n=0){x.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ga.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ga.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),h=2*(a*t-s*r),u=2*(s*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=r+c*u+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return gs.copy(this).projectOnVector(e),this.sub(gs)}reflect(e){return this.sub(gs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gs=new x,ga=new Cn;class Zn{constructor(e=new x(1/0,1/0,1/0),t=new x(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yt):Yt.fromBufferAttribute(s,o),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),or.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)),or.applyMatrix4(e.matrixWorld),this.union(or)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oi),ar.subVectors(this.max,Oi),ni.subVectors(e.a,Oi),ii.subVectors(e.b,Oi),ri.subVectors(e.c,Oi),gn.subVectors(ii,ni),_n.subVectors(ri,ii),In.subVectors(ni,ri);let t=[0,-gn.z,gn.y,0,-_n.z,_n.y,0,-In.z,In.y,gn.z,0,-gn.x,_n.z,0,-_n.x,In.z,0,-In.x,-gn.y,gn.x,0,-_n.y,_n.x,0,-In.y,In.x,0];return!_s(t,ni,ii,ri,ar)||(t=[1,0,0,0,1,0,0,0,1],!_s(t,ni,ii,ri,ar))?!1:(cr.crossVectors(gn,_n),t=[cr.x,cr.y,cr.z],_s(t,ni,ii,ri,ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const sn=[new x,new x,new x,new x,new x,new x,new x,new x],Yt=new x,or=new Zn,ni=new x,ii=new x,ri=new x,gn=new x,_n=new x,In=new x,Oi=new x,ar=new x,cr=new x,Un=new x;function _s(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Un.fromArray(i,s);const a=r.x*Math.abs(Un.x)+r.y*Math.abs(Un.y)+r.z*Math.abs(Un.z),c=e.dot(Un),l=t.dot(Un),h=n.dot(Un);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const yu=new Zn,Fi=new x,vs=new x;class tr{constructor(e=new x,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):yu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fi.subVectors(e,this.center);const t=Fi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Fi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fi.copy(e.center).add(vs)),this.expandByPoint(Fi.copy(e.center).sub(vs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const on=new x,xs=new x,lr=new x,vn=new x,Ms=new x,hr=new x,ys=new x;class Zc{constructor(e=new x,t=new x(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,on)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=on.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(on.copy(this.origin).addScaledVector(this.direction,t),on.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){xs.copy(e).add(t).multiplyScalar(.5),lr.copy(t).sub(e).normalize(),vn.copy(this.origin).sub(xs);const s=e.distanceTo(t)*.5,o=-this.direction.dot(lr),a=vn.dot(this.direction),c=-vn.dot(lr),l=vn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(xs).addScaledVector(lr,d),f}intersectSphere(e,t){on.subVectors(e.center,this.origin);const n=on.dot(this.direction),r=on.dot(on)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,on)!==null}intersectTriangle(e,t,n,r,s){Ms.subVectors(t,e),hr.subVectors(n,e),ys.crossVectors(Ms,hr);let o=this.direction.dot(ys),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vn.subVectors(this.origin,e);const c=a*this.direction.dot(hr.crossVectors(vn,hr));if(c<0)return null;const l=a*this.direction.dot(Ms.cross(vn));if(l<0||c+l>o)return null;const h=-a*vn.dot(ys);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,n,r,s,o,a,c,l,h,u,d,f,g,_,m){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,h,u,d,f,g,_,m)}set(e,t,n,r,s,o,a,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/si.setFromMatrixColumn(e,0).length(),s=1/si.setFromMatrixColumn(e,1).length(),o=1/si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Su,e,bu)}lookAt(e,t,n){const r=this.elements;return Nt.subVectors(e,t),Nt.lengthSq()===0&&(Nt.z=1),Nt.normalize(),xn.crossVectors(n,Nt),xn.lengthSq()===0&&(Math.abs(n.z)===1?Nt.x+=1e-4:Nt.z+=1e-4,Nt.normalize(),xn.crossVectors(n,Nt)),xn.normalize(),ur.crossVectors(Nt,xn),r[0]=xn.x,r[4]=ur.x,r[8]=Nt.x,r[1]=xn.y,r[5]=ur.y,r[9]=Nt.y,r[2]=xn.z,r[6]=ur.z,r[10]=Nt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],v=n[7],M=n[11],C=n[15],T=r[0],w=r[4],U=r[8],S=r[12],R=r[1],N=r[5],W=r[9],J=r[13],L=r[2],B=r[6],G=r[10],K=r[14],Z=r[3],X=r[7],Q=r[11],ee=r[15];return s[0]=o*T+a*R+c*L+l*Z,s[4]=o*w+a*N+c*B+l*X,s[8]=o*U+a*W+c*G+l*Q,s[12]=o*S+a*J+c*K+l*ee,s[1]=h*T+u*R+d*L+f*Z,s[5]=h*w+u*N+d*B+f*X,s[9]=h*U+u*W+d*G+f*Q,s[13]=h*S+u*J+d*K+f*ee,s[2]=g*T+_*R+m*L+p*Z,s[6]=g*w+_*N+m*B+p*X,s[10]=g*U+_*W+m*G+p*Q,s[14]=g*S+_*J+m*K+p*ee,s[3]=b*T+v*R+M*L+C*Z,s[7]=b*w+v*N+M*B+C*X,s[11]=b*U+v*W+M*G+C*Q,s[15]=b*S+v*J+M*K+C*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*c*u-r*l*u-s*a*d+n*l*d+r*a*f-n*c*f)+_*(+t*c*f-t*l*d+s*o*d-r*o*f+r*l*h-s*c*h)+m*(+t*l*u-t*a*f-s*o*u+n*o*f+s*a*h-n*l*h)+p*(-r*a*h-t*c*u+t*a*d+r*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=u*m*l-_*d*l+_*c*f-a*m*f-u*c*p+a*d*p,v=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,M=h*_*l-g*u*l+g*a*f-o*_*f-h*a*p+o*u*p,C=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,T=t*b+n*v+r*M+s*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return e[0]=b*w,e[1]=(_*d*s-u*m*s-_*r*f+n*m*f+u*r*p-n*d*p)*w,e[2]=(a*m*s-_*c*s+_*r*l-n*m*l-a*r*p+n*c*p)*w,e[3]=(u*c*s-a*d*s-u*r*l+n*d*l+a*r*f-n*c*f)*w,e[4]=v*w,e[5]=(h*m*s-g*d*s+g*r*f-t*m*f-h*r*p+t*d*p)*w,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*p-t*c*p)*w,e[7]=(o*d*s-h*c*s+h*r*l-t*d*l-o*r*f+t*c*f)*w,e[8]=M*w,e[9]=(g*u*s-h*_*s-g*n*f+t*_*f+h*n*p-t*u*p)*w,e[10]=(o*_*s-g*a*s+g*n*l-t*_*l-o*n*p+t*a*p)*w,e[11]=(h*a*s-o*u*s-h*n*l+t*u*l+o*n*f-t*a*f)*w,e[12]=C*w,e[13]=(h*_*r-g*u*r+g*n*d-t*_*d-h*n*m+t*u*m)*w,e[14]=(g*a*r-o*_*r-g*n*c+t*_*c+o*n*m-t*a*m)*w,e[15]=(o*u*r-h*a*r+h*n*c-t*u*c-o*n*d+t*a*d)*w,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,h*a+n,h*c-r*o,0,l*c-r*a,h*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,g=s*u,_=o*h,m=o*u,p=a*u,b=c*l,v=c*h,M=c*u,C=n.x,T=n.y,w=n.z;return r[0]=(1-(_+p))*C,r[1]=(f+M)*C,r[2]=(g-v)*C,r[3]=0,r[4]=(f-M)*T,r[5]=(1-(d+p))*T,r[6]=(m+b)*T,r[7]=0,r[8]=(g+v)*w,r[9]=(m-b)*w,r[10]=(1-(d+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=si.set(r[0],r[1],r[2]).length();const o=si.set(r[4],r[5],r[6]).length(),a=si.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],qt.copy(this);const l=1/s,h=1/o,u=1/a;return qt.elements[0]*=l,qt.elements[1]*=l,qt.elements[2]*=l,qt.elements[4]*=h,qt.elements[5]*=h,qt.elements[6]*=h,qt.elements[8]*=u,qt.elements[9]*=u,qt.elements[10]*=u,t.setFromRotationMatrix(qt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=un){const c=this.elements,l=2*s/(t-e),h=2*s/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r);let f,g;if(a===un)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Vr)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=un){const c=this.elements,l=1/(t-e),h=1/(n-r),u=1/(o-s),d=(t+e)*l,f=(n+r)*h;let g,_;if(a===un)g=(o+s)*u,_=-2*u;else if(a===Vr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const si=new x,qt=new st,Su=new x(0,0,0),bu=new x(1,1,1),xn=new x,ur=new x,Nt=new x,_a=new st,va=new Cn;class Jr{constructor(e=0,t=0,n=0,r=Jr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _a.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_a,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return va.setFromEuler(this),this.setFromQuaternion(va,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jr.DEFAULT_ORDER="XYZ";class jc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Eu=0;const xa=new x,oi=new Cn,an=new st,dr=new x,Bi=new x,wu=new x,Tu=new Cn,Ma=new x(1,0,0),ya=new x(0,1,0),Sa=new x(0,0,1),Au={type:"added"},Ru={type:"removed"};class Et extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new x,t=new Jr,n=new Cn,r=new x(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new qe}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.multiply(oi),this}rotateOnWorldAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.premultiply(oi),this}rotateX(e){return this.rotateOnAxis(Ma,e)}rotateY(e){return this.rotateOnAxis(ya,e)}rotateZ(e){return this.rotateOnAxis(Sa,e)}translateOnAxis(e,t){return xa.copy(e).applyQuaternion(this.quaternion),this.position.add(xa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ma,e)}translateY(e){return this.translateOnAxis(ya,e)}translateZ(e){return this.translateOnAxis(Sa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?dr.copy(e):dr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Bi,dr,this.up):an.lookAt(dr,Bi,this.up),this.quaternion.setFromRotationMatrix(an),r&&(an.extractRotation(r.matrixWorld),oi.setFromRotationMatrix(an),this.quaternion.premultiply(oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Au)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ru)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),an.multiply(e.parent.matrixWorld)),e.applyMatrix4(an),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,e,wu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Tu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Et.DEFAULT_UP=new x(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new x,cn=new x,Ss=new x,ln=new x,ai=new x,ci=new x,ba=new x,bs=new x,Es=new x,ws=new x;let fr=!1;class jt{constructor(e=new x,t=new x,n=new x){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Zt.subVectors(e,t),r.cross(Zt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Zt.subVectors(r,t),cn.subVectors(n,t),Ss.subVectors(e,t);const o=Zt.dot(Zt),a=Zt.dot(cn),c=Zt.dot(Ss),l=cn.dot(cn),h=cn.dot(Ss),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getUV(e,t,n,r,s,o,a,c){return fr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),fr=!0),this.getInterpolation(e,t,n,r,s,o,a,c)}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ln.x),c.addScaledVector(o,ln.y),c.addScaledVector(a,ln.z),c)}static isFrontFacing(e,t,n,r){return Zt.subVectors(n,t),cn.subVectors(e,t),Zt.cross(cn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),Zt.cross(cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return fr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),fr=!0),jt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return jt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;ai.subVectors(r,n),ci.subVectors(s,n),bs.subVectors(e,n);const c=ai.dot(bs),l=ci.dot(bs);if(c<=0&&l<=0)return t.copy(n);Es.subVectors(e,r);const h=ai.dot(Es),u=ci.dot(Es);if(h>=0&&u<=h)return t.copy(r);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(ai,o);ws.subVectors(e,s);const f=ai.dot(ws),g=ci.dot(ws);if(g>=0&&f<=g)return t.copy(s);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(ci,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ba.subVectors(s,r),a=(u-h)/(u-h+(f-g)),t.copy(r).addScaledVector(ba,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(ai,o).addScaledVector(ci,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},pr={h:0,s:0,l:0};function Ts(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=fo(e,1),t=vt(t,0,1),n=vt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Ts(o,s,e+1/3),this.g=Ts(o,s,e),this.b=Ts(o,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,t=bt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){const n=Kc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return tt.fromWorkingColorSpace(At.copy(this),e),Math.round(vt(At.r*255,0,255))*65536+Math.round(vt(At.g*255,0,255))*256+Math.round(vt(At.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(At.copy(this),t);const n=At.r,r=At.g,s=At.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-n)/u+2;break;case s:c=(n-r)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=bt){tt.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,r=At.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Mn),this.setHSL(Mn.h+e,Mn.s+t,Mn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mn),e.getHSL(pr);const n=ki(Mn.h,pr.h,t),r=ki(Mn.s,pr.s,t),s=ki(Mn.l,pr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Ke;Ke.NAMES=Kc;let Cu=0;class nr extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=Si,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ys,this.blendDst=qs,this.blendEquation=Bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=la,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ei,this.stencilZFail=ei,this.stencilZPass=ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Si&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ys&&(n.blendSrc=this.blendSrc),this.blendDst!==qs&&(n.blendDst=this.blendDst),this.blendEquation!==Bn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Br&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==la&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $r extends nr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new x,mr=new j;class $t{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ha,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXY(t,mr.x,mr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),r=Pt(r,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ha&&(e.usage=this.usage),e}}class Jc extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class $c extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ct extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Pu=0;const Wt=new st,As=new Et,li=new x,Ot=new Zn,zi=new Zn,St=new x;class Gt extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kc(e)?$c:Jc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new qe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return As.lookAt(e),As.updateMatrix(),this.applyMatrix4(As.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(li).negate(),this.translate(li.x,li.y,li.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ct(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new x(-1/0,-1/0,-1/0),new x(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Ot.setFromBufferAttribute(s),this.morphTargetsRelative?(St.addVectors(this.boundingBox.min,Ot.min),this.boundingBox.expandByPoint(St),St.addVectors(this.boundingBox.max,Ot.max),this.boundingBox.expandByPoint(St)):(this.boundingBox.expandByPoint(Ot.min),this.boundingBox.expandByPoint(Ot.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new x,1/0);return}if(e){const n=this.boundingSphere.center;if(Ot.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];zi.setFromBufferAttribute(a),this.morphTargetsRelative?(St.addVectors(Ot.min,zi.min),Ot.expandByPoint(St),St.addVectors(Ot.max,zi.max),Ot.expandByPoint(St)):(Ot.expandByPoint(zi.min),Ot.expandByPoint(zi.max))}Ot.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)St.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(St));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)St.fromBufferAttribute(a,l),c&&(li.fromBufferAttribute(e,l),St.add(li)),r=Math.max(r,n.distanceToSquared(St))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let R=0;R<a;R++)l[R]=new x,h[R]=new x;const u=new x,d=new x,f=new x,g=new j,_=new j,m=new j,p=new x,b=new x;function v(R,N,W){u.fromArray(r,R*3),d.fromArray(r,N*3),f.fromArray(r,W*3),g.fromArray(o,R*2),_.fromArray(o,N*2),m.fromArray(o,W*2),d.sub(u),f.sub(u),_.sub(g),m.sub(g);const J=1/(_.x*m.y-m.x*_.y);!isFinite(J)||(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(J),b.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(J),l[R].add(p),l[N].add(p),l[W].add(p),h[R].add(b),h[N].add(b),h[W].add(b))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let R=0,N=M.length;R<N;++R){const W=M[R],J=W.start,L=W.count;for(let B=J,G=J+L;B<G;B+=3)v(n[B+0],n[B+1],n[B+2])}const C=new x,T=new x,w=new x,U=new x;function S(R){w.fromArray(s,R*3),U.copy(w);const N=l[R];C.copy(N),C.sub(w.multiplyScalar(w.dot(N))).normalize(),T.crossVectors(U,N);const J=T.dot(h[R])<0?-1:1;c[R*4]=C.x,c[R*4+1]=C.y,c[R*4+2]=C.z,c[R*4+3]=J}for(let R=0,N=M.length;R<N;++R){const W=M[R],J=W.start,L=W.count;for(let B=J,G=J+L;B<G;B+=3)S(n[B+0]),S(n[B+1]),S(n[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const r=new x,s=new x,o=new x,a=new x,c=new x,l=new x,h=new x,u=new x;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)St.fromBufferAttribute(e,t),St.normalize(),e.setXYZ(t,St.x,St.y,St.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new $t(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gt,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ea=new st,Nn=new Zc,gr=new tr,wa=new x,hi=new x,ui=new x,di=new x,Rs=new x,_r=new x,vr=new j,xr=new j,Mr=new j,Ta=new x,Aa=new x,Ra=new x,yr=new x,Sr=new x;class De extends Et{constructor(e=new Gt,t=new $r){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){_r.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(Rs.fromBufferAttribute(u,e),o?_r.addScaledVector(Rs,h):_r.addScaledVector(Rs.sub(t),h))}t.add(_r)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(s),Nn.copy(e.ray).recast(e.near),!(gr.containsPoint(Nn.origin)===!1&&(Nn.intersectSphere(gr,wa)===null||Nn.origin.distanceToSquared(wa)>(e.far-e.near)**2))&&(Ea.copy(s).invert(),Nn.copy(e.ray).applyMatrix4(Ea),!(n.boundingBox!==null&&Nn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Nn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,C=v;M<C;M+=3){const T=a.getX(M),w=a.getX(M+1),U=a.getX(M+2);r=br(this,p,e,n,l,h,u,T,w,U),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),v=a.getX(m+1),M=a.getX(m+2);r=br(this,o,e,n,l,h,u,b,v,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,C=v;M<C;M+=3){const T=M,w=M+1,U=M+2;r=br(this,p,e,n,l,h,u,T,w,U),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=m,v=m+1,M=m+2;r=br(this,o,e,n,l,h,u,b,v,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Lu(i,e,t,n,r,s,o,a){let c;if(e.side===It?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===Rn,a),c===null)return null;Sr.copy(a),Sr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Sr);return l<t.near||l>t.far?null:{distance:l,point:Sr.clone(),object:i}}function br(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,hi),i.getVertexPosition(c,ui),i.getVertexPosition(l,di);const h=Lu(i,e,t,n,hi,ui,di,yr);if(h){r&&(vr.fromBufferAttribute(r,a),xr.fromBufferAttribute(r,c),Mr.fromBufferAttribute(r,l),h.uv=jt.getInterpolation(yr,hi,ui,di,vr,xr,Mr,new j)),s&&(vr.fromBufferAttribute(s,a),xr.fromBufferAttribute(s,c),Mr.fromBufferAttribute(s,l),h.uv1=jt.getInterpolation(yr,hi,ui,di,vr,xr,Mr,new j),h.uv2=h.uv1),o&&(Ta.fromBufferAttribute(o,a),Aa.fromBufferAttribute(o,c),Ra.fromBufferAttribute(o,l),h.normal=jt.getInterpolation(yr,hi,ui,di,Ta,Aa,Ra,new x),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new x,materialIndex:0};jt.getNormal(hi,ui,di,u.normal),h.face=u}return h}class jn extends Gt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(u,2));function g(_,m,p,b,v,M,C,T,w,U,S){const R=M/w,N=C/U,W=M/2,J=C/2,L=T/2,B=w+1,G=U+1;let K=0,Z=0;const X=new x;for(let Q=0;Q<G;Q++){const ee=Q*N-J;for(let pe=0;pe<B;pe++){const k=pe*R-W;X[_]=k*b,X[m]=ee*v,X[p]=L,l.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=T>0?1:-1,h.push(X.x,X.y,X.z),u.push(pe/w),u.push(1-Q/U),K+=1}}for(let Q=0;Q<U;Q++)for(let ee=0;ee<w;ee++){const pe=d+ee+B*Q,k=d+ee+B*(Q+1),te=d+(ee+1)+B*(Q+1),me=d+(ee+1)+B*Q;c.push(pe,k,me),c.push(k,te,me),Z+=6}a.addGroup(f,Z,S),f+=Z,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ci(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Lt(i){const e={};for(let t=0;t<i.length;t++){const n=Ci(i[t]);for(const r in n)e[r]=n[r]}return e}function Du(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Qc(i){return i.getRenderTarget()===null?i.outputColorSpace:tt.workingColorSpace}const Iu={clone:Ci,merge:Lt};var Uu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kn extends nr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uu,this.fragmentShader=Nu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ci(e.uniforms),this.uniformsGroups=Du(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class el extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=un}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Bt extends el{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ji*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ji*2*Math.atan(Math.tan(Wi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fi=-90,pi=1;class Ou extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Bt(fi,pi,e,t);r.layers=this.layers,this.add(r);const s=new Bt(fi,pi,e,t);s.layers=this.layers,this.add(s);const o=new Bt(fi,pi,e,t);o.layers=this.layers,this.add(o);const a=new Bt(fi,pi,e,t);a.layers=this.layers,this.add(a);const c=new Bt(fi,pi,e,t);c.layers=this.layers,this.add(c);const l=new Bt(fi,pi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===un)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class tl extends Rt{constructor(e,t,n,r,s,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Ti,super(e,t,n,r,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fu extends Wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Xi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Vn?bt:Xt),this.texture=new tl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new jn(5,5,5),s=new kn({name:"CubemapFromEquirect",uniforms:Ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:It,blending:wn});s.uniforms.tEquirect.value=t;const o=new De(r,s),a=t.minFilter;return t.minFilter===ji&&(t.minFilter=kt),new Ou(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const Cs=new x,Bu=new x,zu=new qe;class Sn{constructor(e=new x(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Cs.subVectors(n,t).cross(Bu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Cs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||zu.getNormalMatrix(e),r=this.coplanarPoint(Cs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const On=new tr,Er=new x;class po{constructor(e=new Sn,t=new Sn,n=new Sn,r=new Sn,s=new Sn,o=new Sn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=un){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],h=r[5],u=r[6],d=r[7],f=r[8],g=r[9],_=r[10],m=r[11],p=r[12],b=r[13],v=r[14],M=r[15];if(n[0].setComponents(c-s,d-l,m-f,M-p).normalize(),n[1].setComponents(c+s,d+l,m+f,M+p).normalize(),n[2].setComponents(c+o,d+h,m+g,M+b).normalize(),n[3].setComponents(c-o,d-h,m-g,M-b).normalize(),n[4].setComponents(c-a,d-u,m-_,M-v).normalize(),t===un)n[5].setComponents(c+a,d+u,m+_,M+v).normalize();else if(t===Vr)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(e){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(e.matrixWorld),this.intersectsSphere(On)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Er.x=r.normal.x>0?e.max.x:e.min.x,Er.y=r.normal.y>0?e.max.y:e.min.y,Er.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Er)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function nl(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Hu(i,e){const t=e.isWebGL2,n=new WeakMap;function r(l,h){const u=l.array,d=l.usage,f=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function s(l,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,l),f.count===-1&&g.length===0&&i.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?i.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):i.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);if(u===void 0)n.set(l,r(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}class Pi extends Gt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const b=p*d-o;for(let v=0;v<l;v++){const M=v*u-s;g.push(M,-b,0),_.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){const v=b+l*p,M=b+l*(p+1),C=b+1+l*(p+1),T=b+1+l*p;f.push(v,M,T),f.push(M,C,T)}this.setIndex(f),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Gu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Wu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ku=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Yu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Zu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ju=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ku=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ju=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$u=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ed=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,td=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ld=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,hd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ud=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,md=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_d="gl_FragColor = linearToOutputTexel( gl_FragColor );",vd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ed=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Td=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ad=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Pd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ld=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Id=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ud=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Nd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Od=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Hd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Wd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,qd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Zd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$d=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ef=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,nf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,rf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,sf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,of=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,df=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_f=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Ef=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Tf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Af=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Df=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,If=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Of=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Hf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Gf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,jf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$f=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,op=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ap=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,up=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_p=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Gu,alphahash_pars_fragment:Vu,alphamap_fragment:Wu,alphamap_pars_fragment:ku,alphatest_fragment:Xu,alphatest_pars_fragment:Yu,aomap_fragment:qu,aomap_pars_fragment:Zu,batching_pars_vertex:ju,batching_vertex:Ku,begin_vertex:Ju,beginnormal_vertex:$u,bsdfs:Qu,iridescence_fragment:ed,bumpmap_pars_fragment:td,clipping_planes_fragment:nd,clipping_planes_pars_fragment:id,clipping_planes_pars_vertex:rd,clipping_planes_vertex:sd,color_fragment:od,color_pars_fragment:ad,color_pars_vertex:cd,color_vertex:ld,common:hd,cube_uv_reflection_fragment:ud,defaultnormal_vertex:dd,displacementmap_pars_vertex:fd,displacementmap_vertex:pd,emissivemap_fragment:md,emissivemap_pars_fragment:gd,colorspace_fragment:_d,colorspace_pars_fragment:vd,envmap_fragment:xd,envmap_common_pars_fragment:Md,envmap_pars_fragment:yd,envmap_pars_vertex:Sd,envmap_physical_pars_fragment:Ud,envmap_vertex:bd,fog_vertex:Ed,fog_pars_vertex:wd,fog_fragment:Td,fog_pars_fragment:Ad,gradientmap_pars_fragment:Rd,lightmap_fragment:Cd,lightmap_pars_fragment:Pd,lights_lambert_fragment:Ld,lights_lambert_pars_fragment:Dd,lights_pars_begin:Id,lights_toon_fragment:Nd,lights_toon_pars_fragment:Od,lights_phong_fragment:Fd,lights_phong_pars_fragment:Bd,lights_physical_fragment:zd,lights_physical_pars_fragment:Hd,lights_fragment_begin:Gd,lights_fragment_maps:Vd,lights_fragment_end:Wd,logdepthbuf_fragment:kd,logdepthbuf_pars_fragment:Xd,logdepthbuf_pars_vertex:Yd,logdepthbuf_vertex:qd,map_fragment:Zd,map_pars_fragment:jd,map_particle_fragment:Kd,map_particle_pars_fragment:Jd,metalnessmap_fragment:$d,metalnessmap_pars_fragment:Qd,morphcolor_vertex:ef,morphnormal_vertex:tf,morphtarget_pars_vertex:nf,morphtarget_vertex:rf,normal_fragment_begin:sf,normal_fragment_maps:of,normal_pars_fragment:af,normal_pars_vertex:cf,normal_vertex:lf,normalmap_pars_fragment:hf,clearcoat_normal_fragment_begin:uf,clearcoat_normal_fragment_maps:df,clearcoat_pars_fragment:ff,iridescence_pars_fragment:pf,opaque_fragment:mf,packing:gf,premultiplied_alpha_fragment:_f,project_vertex:vf,dithering_fragment:xf,dithering_pars_fragment:Mf,roughnessmap_fragment:yf,roughnessmap_pars_fragment:Sf,shadowmap_pars_fragment:bf,shadowmap_pars_vertex:Ef,shadowmap_vertex:wf,shadowmask_pars_fragment:Tf,skinbase_vertex:Af,skinning_pars_vertex:Rf,skinning_vertex:Cf,skinnormal_vertex:Pf,specularmap_fragment:Lf,specularmap_pars_fragment:Df,tonemapping_fragment:If,tonemapping_pars_fragment:Uf,transmission_fragment:Nf,transmission_pars_fragment:Of,uv_pars_fragment:Ff,uv_pars_vertex:Bf,uv_vertex:zf,worldpos_vertex:Hf,background_vert:Gf,background_frag:Vf,backgroundCube_vert:Wf,backgroundCube_frag:kf,cube_vert:Xf,cube_frag:Yf,depth_vert:qf,depth_frag:Zf,distanceRGBA_vert:jf,distanceRGBA_frag:Kf,equirect_vert:Jf,equirect_frag:$f,linedashed_vert:Qf,linedashed_frag:ep,meshbasic_vert:tp,meshbasic_frag:np,meshlambert_vert:ip,meshlambert_frag:rp,meshmatcap_vert:sp,meshmatcap_frag:op,meshnormal_vert:ap,meshnormal_frag:cp,meshphong_vert:lp,meshphong_frag:hp,meshphysical_vert:up,meshphysical_frag:dp,meshtoon_vert:fp,meshtoon_frag:pp,points_vert:mp,points_frag:gp,shadow_vert:_p,shadow_frag:vp,sprite_vert:xp,sprite_frag:Mp},ue={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new j(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new j(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},en={basic:{uniforms:Lt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Lt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ke(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Lt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Lt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Lt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ke(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Lt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Lt([ue.points,ue.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Lt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Lt([ue.common,ue.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Lt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Lt([ue.sprite,ue.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Lt([ue.common,ue.displacementmap,{referencePosition:{value:new x},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Lt([ue.lights,ue.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};en.physical={uniforms:Lt([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new j(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new j},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new j},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const wr={r:0,b:0,g:0};function yp(i,e,t,n,r,s,o){const a=new Ke(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function g(m,p){let b=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,c):v&&v.isColor&&(_(v,1),b=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||b)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===jr)?(h===void 0&&(h=new De(new jn(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:Ci(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=tt.getTransfer(v.colorSpace)!==ot,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new De(new Pi(2,2),new kn({name:"BackgroundMaterial",uniforms:Ci(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=tt.getTransfer(v.colorSpace)!==ot,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(wr,Qc(i)),n.buffers.color.setClear(wr.r,wr.g,wr.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function Sp(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},c=m(null);let l=c,h=!1;function u(L,B,G,K,Z){let X=!1;if(o){const Q=_(K,G,B);l!==Q&&(l=Q,f(l.object)),X=p(L,K,G,Z),X&&b(L,K,G,Z)}else{const Q=B.wireframe===!0;(l.geometry!==K.id||l.program!==G.id||l.wireframe!==Q)&&(l.geometry=K.id,l.program=G.id,l.wireframe=Q,X=!0)}Z!==null&&t.update(Z,i.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,U(L,B,G,K),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function d(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function f(L){return n.isWebGL2?i.bindVertexArray(L):s.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function _(L,B,G){const K=G.wireframe===!0;let Z=a[L.id];Z===void 0&&(Z={},a[L.id]=Z);let X=Z[B.id];X===void 0&&(X={},Z[B.id]=X);let Q=X[K];return Q===void 0&&(Q=m(d()),X[K]=Q),Q}function m(L){const B=[],G=[],K=[];for(let Z=0;Z<r;Z++)B[Z]=0,G[Z]=0,K[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:G,attributeDivisors:K,object:L,attributes:{},index:null}}function p(L,B,G,K){const Z=l.attributes,X=B.attributes;let Q=0;const ee=G.getAttributes();for(const pe in ee)if(ee[pe].location>=0){const te=Z[pe];let me=X[pe];if(me===void 0&&(pe==="instanceMatrix"&&L.instanceMatrix&&(me=L.instanceMatrix),pe==="instanceColor"&&L.instanceColor&&(me=L.instanceColor)),te===void 0||te.attribute!==me||me&&te.data!==me.data)return!0;Q++}return l.attributesNum!==Q||l.index!==K}function b(L,B,G,K){const Z={},X=B.attributes;let Q=0;const ee=G.getAttributes();for(const pe in ee)if(ee[pe].location>=0){let te=X[pe];te===void 0&&(pe==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),pe==="instanceColor"&&L.instanceColor&&(te=L.instanceColor));const me={};me.attribute=te,te&&te.data&&(me.data=te.data),Z[pe]=me,Q++}l.attributes=Z,l.attributesNum=Q,l.index=K}function v(){const L=l.newAttributes;for(let B=0,G=L.length;B<G;B++)L[B]=0}function M(L){C(L,0)}function C(L,B){const G=l.newAttributes,K=l.enabledAttributes,Z=l.attributeDivisors;G[L]=1,K[L]===0&&(i.enableVertexAttribArray(L),K[L]=1),Z[L]!==B&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,B),Z[L]=B)}function T(){const L=l.newAttributes,B=l.enabledAttributes;for(let G=0,K=B.length;G<K;G++)B[G]!==L[G]&&(i.disableVertexAttribArray(G),B[G]=0)}function w(L,B,G,K,Z,X,Q){Q===!0?i.vertexAttribIPointer(L,B,G,Z,X):i.vertexAttribPointer(L,B,G,K,Z,X)}function U(L,B,G,K){if(n.isWebGL2===!1&&(L.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const Z=K.attributes,X=G.getAttributes(),Q=B.defaultAttributeValues;for(const ee in X){const pe=X[ee];if(pe.location>=0){let k=Z[ee];if(k===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(k=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(k=L.instanceColor)),k!==void 0){const te=k.normalized,me=k.itemSize,we=t.get(k);if(we===void 0)continue;const Me=we.buffer,Ie=we.type,Fe=we.bytesPerElement,be=n.isWebGL2===!0&&(Ie===i.INT||Ie===i.UNSIGNED_INT||k.gpuType===Uc);if(k.isInterleavedBufferAttribute){const Oe=k.data,D=Oe.stride,he=k.offset;if(Oe.isInstancedInterleavedBuffer){for(let q=0;q<pe.locationSize;q++)C(pe.location+q,Oe.meshPerAttribute);L.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Oe.meshPerAttribute*Oe.count)}else for(let q=0;q<pe.locationSize;q++)M(pe.location+q);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let q=0;q<pe.locationSize;q++)w(pe.location+q,me/pe.locationSize,Ie,te,D*Fe,(he+me/pe.locationSize*q)*Fe,be)}else{if(k.isInstancedBufferAttribute){for(let Oe=0;Oe<pe.locationSize;Oe++)C(pe.location+Oe,k.meshPerAttribute);L.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let Oe=0;Oe<pe.locationSize;Oe++)M(pe.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let Oe=0;Oe<pe.locationSize;Oe++)w(pe.location+Oe,me/pe.locationSize,Ie,te,me*Fe,me/pe.locationSize*Oe*Fe,be)}}else if(Q!==void 0){const te=Q[ee];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(pe.location,te);break;case 3:i.vertexAttrib3fv(pe.location,te);break;case 4:i.vertexAttrib4fv(pe.location,te);break;default:i.vertexAttrib1fv(pe.location,te)}}}}T()}function S(){W();for(const L in a){const B=a[L];for(const G in B){const K=B[G];for(const Z in K)g(K[Z].object),delete K[Z];delete B[G]}delete a[L]}}function R(L){if(a[L.id]===void 0)return;const B=a[L.id];for(const G in B){const K=B[G];for(const Z in K)g(K[Z].object),delete K[Z];delete B[G]}delete a[L.id]}function N(L){for(const B in a){const G=a[B];if(G[L.id]===void 0)continue;const K=G[L.id];for(const Z in K)g(K[Z].object),delete K[Z];delete G[L.id]}}function W(){J(),h=!0,l!==c&&(l=c,f(l.object))}function J(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:W,resetDefaultState:J,dispose:S,releaseStatesOfGeometry:R,releaseStatesOfProgram:N,initAttributes:v,enableAttribute:M,disableUnusedAttributes:T}}function bp(i,e,t,n){const r=n.isWebGL2;let s;function o(h){s=h}function a(h,u){i.drawArrays(s,h,u),t.update(u,s,1)}function c(h,u,d){if(d===0)return;let f,g;if(r)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,h,u,d),t.update(u,s,d)}function l(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(s,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Ep(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=s(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,M=o||e.has("OES_texture_float"),C=v&&M,T=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:b,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:C,maxSamples:T}}function wp(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Sn,a=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||r;return r=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):l();else{const b=s?0:n,v=b*4;let M=p.clippingState||null;c.value=M,M=h(g,d,v,f);for(let C=0;C!==v;++C)M[C]=t[C];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,M=f;v!==_;++v,M+=4)o.copy(u[v]).applyMatrix4(b,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Tp(i){let e=new WeakMap;function t(o,a){return a===Zs?o.mapping=Ti:a===js&&(o.mapping=Ai),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Zs||a===js)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Fu(c.height/2);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class il extends el{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const xi=4,Ca=[.125,.215,.35,.446,.526,.582],zn=20,Ps=new il,Pa=new Ke;let Ls=null,Ds=0,Is=0;const Fn=(1+Math.sqrt(5))/2,mi=1/Fn,La=[new x(1,1,1),new x(-1,1,1),new x(1,1,-1),new x(-1,1,-1),new x(0,Fn,mi),new x(0,Fn,-mi),new x(mi,0,Fn),new x(-mi,0,Fn),new x(Fn,mi,0),new x(-Fn,mi,0)];class eo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Ls=this._renderer.getRenderTarget(),Ds=this._renderer.getActiveCubeFace(),Is=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ua(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ia(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ls,Ds,Is),e.scissorTest=!1,Tr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===Ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ls=this._renderer.getRenderTarget(),Ds=this._renderer.getActiveCubeFace(),Is=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Ki,format:Jt,colorSpace:fn,depthBuffer:!1},r=Da(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Da(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ap(s)),this._blurMaterial=Rp(s,e,t)}return r}_compileMaterial(e){const t=new De(this._lodPlanes[0],e);this._renderer.compile(t,Ps)}_sceneToCubeUV(e,t,n,r){const a=new Bt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Pa),h.toneMapping=Tn,h.autoClear=!1;const f=new $r({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),g=new De(new jn,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Pa),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):b===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const v=this._cubeSize;Tr(r,b*v,p>2?v:0,v,v),h.setRenderTarget(r),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ti||e.mapping===Ai;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ua()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ia());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new De(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Tr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Ps)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=La[(r-1)%La.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new De(this._lodPlanes[r],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*zn-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):zn;m>zn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zn}`);const p=[];let b=0;for(let w=0;w<zn;++w){const U=w/_,S=Math.exp(-U*U/2);p.push(S),w===0?b+=S:w<m&&(b+=2*S)}for(let w=0;w<p.length;w++)p[w]=p[w]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const M=this._sizeLods[r],C=3*M*(r>v-xi?r-v+xi:0),T=4*(this._cubeSize-M);Tr(t,C,T,3*M,2*M),c.setRenderTarget(t),c.render(u,Ps)}}function Ap(i){const e=[],t=[],n=[];let r=i;const s=i-xi+1+Ca.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-xi?c=Ca[o-i+xi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*f),v=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let T=0;T<f;T++){const w=T%3*2/3-1,U=T>2?0:-1,S=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];b.set(S,_*g*T),v.set(d,m*g*T);const R=[T,T,T,T,T,T];M.set(R,p*g*T)}const C=new Gt;C.setAttribute("position",new $t(b,_)),C.setAttribute("uv",new $t(v,m)),C.setAttribute("faceIndex",new $t(M,p)),e.push(C),r>xi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Da(i,e,t){const n=new Wn(i,e,t);return n.texture.mapping=jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Tr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Rp(i,e,t){const n=new Float32Array(zn),r=new x(0,1,0);return new kn({name:"SphericalGaussianBlur",defines:{n:zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ia(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ua(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function mo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Cp(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Zs||c===js,h=c===Ti||c===Ai;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new eo(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||h&&u&&r(u)){t===null&&(t=new eo(i));const d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function r(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Pp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Lp(i,e,t,n){const r={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete r[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const b=f.array;_=f.version;for(let v=0,M=b.length;v<M;v+=3){const C=b[v+0],T=b[v+1],w=b[v+2];d.push(C,T,T,w,w,C)}}else if(g!==void 0){const b=g.array;_=g.version;for(let v=0,M=b.length/3-1;v<M;v+=3){const C=v+0,T=v+1,w=v+2;d.push(C,T,T,w,w,C)}}else return;const m=new(kc(d)?$c:Jc)(d,1);m.version=_;const p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Dp(i,e,t,n){const r=n.isWebGL2;let s;function o(f){s=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,g){i.drawElements(s,g,a,f*c),t.update(g,s,1)}function u(f,g,_){if(_===0)return;let m,p;if(r)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,f*c,_),t.update(g,s,_)}function d(f,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,f,0,_);let p=0;for(let b=0;b<_;b++)p+=g[b];t.update(p,s,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Ip(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Up(i,e){return i[0]-e[0]}function Np(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Op(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,o=new at,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0;let _=s.get(h);if(_===void 0||_.count!==g){let L=function(){W.dispose(),s.delete(h),h.removeEventListener("dispose",L)};_!==void 0&&_.texture.dispose();const b=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],w=h.morphAttributes.color||[];let U=0;b===!0&&(U=1),v===!0&&(U=2),M===!0&&(U=3);let S=h.attributes.position.count*U,R=1;S>e.maxTextureSize&&(R=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const N=new Float32Array(S*R*4*g),W=new qc(N,S,R,g);W.type=En,W.needsUpdate=!0;const J=U*4;for(let B=0;B<g;B++){const G=C[B],K=T[B],Z=w[B],X=S*R*4*B;for(let Q=0;Q<G.count;Q++){const ee=Q*J;b===!0&&(o.fromBufferAttribute(G,Q),N[X+ee+0]=o.x,N[X+ee+1]=o.y,N[X+ee+2]=o.z,N[X+ee+3]=0),v===!0&&(o.fromBufferAttribute(K,Q),N[X+ee+4]=o.x,N[X+ee+5]=o.y,N[X+ee+6]=o.z,N[X+ee+7]=0),M===!0&&(o.fromBufferAttribute(Z,Q),N[X+ee+8]=o.x,N[X+ee+9]=o.y,N[X+ee+10]=o.z,N[X+ee+11]=Z.itemSize===4?o.w:1)}}_={count:g,texture:W,size:new j(S,R)},s.set(h,_),h.addEventListener("dispose",L)}let m=0;for(let b=0;b<d.length;b++)m+=d[b];const p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",p),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{const f=d===void 0?0:d.length;let g=n[h.id];if(g===void 0||g.length!==f){g=[];for(let v=0;v<f;v++)g[v]=[v,0];n[h.id]=g}for(let v=0;v<f;v++){const M=g[v];M[0]=v,M[1]=d[v]}g.sort(Np);for(let v=0;v<8;v++)v<f&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(Up);const _=h.morphAttributes.position,m=h.morphAttributes.normal;let p=0;for(let v=0;v<8;v++){const M=a[v],C=M[0],T=M[1];C!==Number.MAX_SAFE_INTEGER&&T?(_&&h.getAttribute("morphTarget"+v)!==_[C]&&h.setAttribute("morphTarget"+v,_[C]),m&&h.getAttribute("morphNormal"+v)!==m[C]&&h.setAttribute("morphNormal"+v,m[C]),r[v]=T,p+=T):(_&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),r[v]=0)}const b=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",b),u.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:c}}function Fp(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(r.get(u)!==l&&(e.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return u}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class rl extends Rt{constructor(e,t,n,r,s,o,a,c,l,h){if(h=h!==void 0?h:Gn,h!==Gn&&h!==Ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Gn&&(n=bn),n===void 0&&h===Ri&&(n=Hn),super(null,r,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Dt,this.minFilter=c!==void 0?c:Dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const sl=new Rt,ol=new rl(1,1);ol.compareFunction=Wc;const al=new qc,cl=new Mu,ll=new tl,Na=[],Oa=[],Fa=new Float32Array(16),Ba=new Float32Array(9),za=new Float32Array(4);function Ii(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Na[r];if(s===void 0&&(s=new Float32Array(r),Na[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Qr(i,e){let t=Oa[e];t===void 0&&(t=new Int32Array(e),Oa[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Bp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),Mt(t,e)}}function Hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),Mt(t,e)}}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),Mt(t,e)}}function Vp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;za.set(n),i.uniformMatrix2fv(this.addr,!1,za),Mt(t,n)}}function Wp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Ba.set(n),i.uniformMatrix3fv(this.addr,!1,Ba),Mt(t,n)}}function kp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Fa.set(n),i.uniformMatrix4fv(this.addr,!1,Fa),Mt(t,n)}}function Xp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),Mt(t,e)}}function qp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),Mt(t,e)}}function Zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),Mt(t,e)}}function jp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),Mt(t,e)}}function Jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),Mt(t,e)}}function $p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),Mt(t,e)}}function Qp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?ol:sl;t.setTexture2D(e||s,r)}function em(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cl,r)}function tm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ll,r)}function nm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||al,r)}function im(i){switch(i){case 5126:return Bp;case 35664:return zp;case 35665:return Hp;case 35666:return Gp;case 35674:return Vp;case 35675:return Wp;case 35676:return kp;case 5124:case 35670:return Xp;case 35667:case 35671:return Yp;case 35668:case 35672:return qp;case 35669:case 35673:return Zp;case 5125:return jp;case 36294:return Kp;case 36295:return Jp;case 36296:return $p;case 35678:case 36198:case 36298:case 36306:case 35682:return Qp;case 35679:case 36299:case 36307:return em;case 35680:case 36300:case 36308:case 36293:return tm;case 36289:case 36303:case 36311:case 36292:return nm}}function rm(i,e){i.uniform1fv(this.addr,e)}function sm(i,e){const t=Ii(e,this.size,2);i.uniform2fv(this.addr,t)}function om(i,e){const t=Ii(e,this.size,3);i.uniform3fv(this.addr,t)}function am(i,e){const t=Ii(e,this.size,4);i.uniform4fv(this.addr,t)}function cm(i,e){const t=Ii(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function lm(i,e){const t=Ii(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function hm(i,e){const t=Ii(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function um(i,e){i.uniform1iv(this.addr,e)}function dm(i,e){i.uniform2iv(this.addr,e)}function fm(i,e){i.uniform3iv(this.addr,e)}function pm(i,e){i.uniform4iv(this.addr,e)}function mm(i,e){i.uniform1uiv(this.addr,e)}function gm(i,e){i.uniform2uiv(this.addr,e)}function _m(i,e){i.uniform3uiv(this.addr,e)}function vm(i,e){i.uniform4uiv(this.addr,e)}function xm(i,e,t){const n=this.cache,r=e.length,s=Qr(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||sl,s[o])}function Mm(i,e,t){const n=this.cache,r=e.length,s=Qr(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||cl,s[o])}function ym(i,e,t){const n=this.cache,r=e.length,s=Qr(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ll,s[o])}function Sm(i,e,t){const n=this.cache,r=e.length,s=Qr(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||al,s[o])}function bm(i){switch(i){case 5126:return rm;case 35664:return sm;case 35665:return om;case 35666:return am;case 35674:return cm;case 35675:return lm;case 35676:return hm;case 5124:case 35670:return um;case 35667:case 35671:return dm;case 35668:case 35672:return fm;case 35669:case 35673:return pm;case 5125:return mm;case 36294:return gm;case 36295:return _m;case 36296:return vm;case 35678:case 36198:case 36298:case 36306:case 35682:return xm;case 35679:case 36299:case 36307:return Mm;case 35680:case 36300:case 36308:case 36293:return ym;case 36289:case 36303:case 36311:case 36292:return Sm}}class Em{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=im(t.type)}}class wm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bm(t.type)}}class Tm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Us=/(\w+)(\])?(\[|\.)?/g;function Ha(i,e){i.seq.push(e),i.map[e.id]=e}function Am(i,e,t){const n=i.name,r=n.length;for(Us.lastIndex=0;;){const s=Us.exec(n),o=Us.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Ha(t,l===void 0?new Em(a,i,e):new wm(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Tm(a),Ha(t,u)),t=u}}}class Or{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Am(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function Ga(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Rm=37297;let Cm=0;function Pm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Lm(i){const e=tt.getPrimaries(tt.workingColorSpace),t=tt.getPrimaries(i);let n;switch(e===t?n="":e===Gr&&t===Hr?n="LinearDisplayP3ToLinearSRGB":e===Hr&&t===Gr&&(n="LinearSRGBToLinearDisplayP3"),i){case fn:case Kr:return[n,"LinearTransferOETF"];case bt:case uo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Va(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Pm(i.getShaderSource(e),o)}else return r}function Dm(i,e){const t=Lm(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Im(i,e){let t;switch(e){case Ph:t="Linear";break;case Lh:t="Reinhard";break;case Dh:t="OptimizedCineon";break;case Dc:t="ACESFilmic";break;case Uh:t="AgX";break;case Ih:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Um(i){return[i.extensionDerivatives||!!i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Mi).join(`
`)}function Nm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Mi).join(`
`)}function Om(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Fm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Mi(i){return i!==""}function Wa(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ka(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Bm=/^[ \t]*#include +<([\w\d./]+)>/gm;function to(i){return i.replace(Bm,Hm)}const zm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Hm(i,e){let t=We[e];if(t===void 0){const n=zm.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return to(t)}const Gm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xa(i){return i.replace(Gm,Vm)}function Vm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ya(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Wm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Cc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Pc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===hn&&(e="SHADOWMAP_TYPE_VSM"),e}function km(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ti:case Ai:e="ENVMAP_TYPE_CUBE";break;case jr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ai:e="ENVMAP_MODE_REFRACTION";break}return e}function Ym(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Lc:e="ENVMAP_BLENDING_MULTIPLY";break;case Rh:e="ENVMAP_BLENDING_MIX";break;case Ch:e="ENVMAP_BLENDING_ADD";break}return e}function qm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Zm(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Wm(t),l=km(t),h=Xm(t),u=Ym(t),d=qm(t),f=t.isWebGL2?"":Um(t),g=Nm(t),_=Om(s),m=r.createProgram();let p,b,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Mi).join(`
`),p.length>0&&(p+=`
`),b=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Mi).join(`
`),b.length>0&&(b+=`
`)):(p=[Ya(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mi).join(`
`),b=[f,Ya(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tn?"#define TONE_MAPPING":"",t.toneMapping!==Tn?We.tonemapping_pars_fragment:"",t.toneMapping!==Tn?Im("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Dm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Mi).join(`
`)),o=to(o),o=Wa(o,t),o=ka(o,t),a=to(a),a=Wa(a,t),a=ka(a,t),o=Xa(o),a=Xa(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ua?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ua?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const M=v+p+o,C=v+b+a,T=Ga(r,r.VERTEX_SHADER,M),w=Ga(r,r.FRAGMENT_SHADER,C);r.attachShader(m,T),r.attachShader(m,w),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function U(W){if(i.debug.checkShaderErrors){const J=r.getProgramInfoLog(m).trim(),L=r.getShaderInfoLog(T).trim(),B=r.getShaderInfoLog(w).trim();let G=!0,K=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,T,w);else{const Z=Va(r,T,"vertex"),X=Va(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+Z+`
`+X)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(L===""||B==="")&&(K=!1);K&&(W.diagnostics={runnable:G,programLog:J,vertexShader:{log:L,prefix:p},fragmentShader:{log:B,prefix:b}})}r.deleteShader(T),r.deleteShader(w),S=new Or(r,m),R=Fm(r,m)}let S;this.getUniforms=function(){return S===void 0&&U(this),S};let R;this.getAttributes=function(){return R===void 0&&U(this),R};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(m,Rm)),N},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=w,this}let jm=0;class Km{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Jm(e),t.set(e,n)),n}}class Jm{constructor(e){this.id=jm++,this.code=e,this.usedTimes=0}}function $m(i,e,t,n,r,s,o){const a=new jc,c=new Km,l=[],h=r.isWebGL2,u=r.logarithmicDepthBuffer,d=r.vertexTextures;let f=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function m(S,R,N,W,J){const L=W.fog,B=J.geometry,G=S.isMeshStandardMaterial?W.environment:null,K=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),Z=!!K&&K.mapping===jr?K.image.height:null,X=g[S.type];S.precision!==null&&(f=r.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const Q=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ee=Q!==void 0?Q.length:0;let pe=0;B.morphAttributes.position!==void 0&&(pe=1),B.morphAttributes.normal!==void 0&&(pe=2),B.morphAttributes.color!==void 0&&(pe=3);let k,te,me,we;if(X){const pt=en[X];k=pt.vertexShader,te=pt.fragmentShader}else k=S.vertexShader,te=S.fragmentShader,c.update(S),me=c.getVertexShaderID(S),we=c.getFragmentShaderID(S);const Me=i.getRenderTarget(),Ie=J.isInstancedMesh===!0,Fe=J.isBatchedMesh===!0,be=!!S.map,Oe=!!S.matcap,D=!!K,he=!!S.aoMap,q=!!S.lightMap,oe=!!S.bumpMap,Y=!!S.normalMap,Te=!!S.displacementMap,ge=!!S.emissiveMap,E=!!S.metalnessMap,y=!!S.roughnessMap,O=S.anisotropy>0,re=S.clearcoat>0,ne=S.iridescence>0,$=S.sheen>0,Se=S.transmission>0,de=O&&!!S.anisotropyMap,ve=re&&!!S.clearcoatMap,Pe=re&&!!S.clearcoatNormalMap,He=re&&!!S.clearcoatRoughnessMap,ie=ne&&!!S.iridescenceMap,Je=ne&&!!S.iridescenceThicknessMap,ke=$&&!!S.sheenColorMap,Be=$&&!!S.sheenRoughnessMap,Ce=!!S.specularMap,_e=!!S.specularColorMap,P=!!S.specularIntensityMap,ae=Se&&!!S.transmissionMap,Ae=Se&&!!S.thicknessMap,ye=!!S.gradientMap,se=!!S.alphaMap,I=S.alphaTest>0,ce=!!S.alphaHash,fe=!!S.extensions,Ue=!!B.attributes.uv1,Le=!!B.attributes.uv2,Ze=!!B.attributes.uv3;let je=Tn;return S.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:h,shaderID:X,shaderType:S.type,shaderName:S.name,vertexShader:k,fragmentShader:te,defines:S.defines,customVertexShaderID:me,customFragmentShaderID:we,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Fe,instancing:Ie,instancingColor:Ie&&J.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Me===null?i.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:fn,map:be,matcap:Oe,envMap:D,envMapMode:D&&K.mapping,envMapCubeUVHeight:Z,aoMap:he,lightMap:q,bumpMap:oe,normalMap:Y,displacementMap:d&&Te,emissiveMap:ge,normalMapObjectSpace:Y&&S.normalMapType===Yh,normalMapTangentSpace:Y&&S.normalMapType===Vc,metalnessMap:E,roughnessMap:y,anisotropy:O,anisotropyMap:de,clearcoat:re,clearcoatMap:ve,clearcoatNormalMap:Pe,clearcoatRoughnessMap:He,iridescence:ne,iridescenceMap:ie,iridescenceThicknessMap:Je,sheen:$,sheenColorMap:ke,sheenRoughnessMap:Be,specularMap:Ce,specularColorMap:_e,specularIntensityMap:P,transmission:Se,transmissionMap:ae,thicknessMap:Ae,gradientMap:ye,opaque:S.transparent===!1&&S.blending===Si,alphaMap:se,alphaTest:I,alphaHash:ce,combine:S.combine,mapUv:be&&_(S.map.channel),aoMapUv:he&&_(S.aoMap.channel),lightMapUv:q&&_(S.lightMap.channel),bumpMapUv:oe&&_(S.bumpMap.channel),normalMapUv:Y&&_(S.normalMap.channel),displacementMapUv:Te&&_(S.displacementMap.channel),emissiveMapUv:ge&&_(S.emissiveMap.channel),metalnessMapUv:E&&_(S.metalnessMap.channel),roughnessMapUv:y&&_(S.roughnessMap.channel),anisotropyMapUv:de&&_(S.anisotropyMap.channel),clearcoatMapUv:ve&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:He&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Be&&_(S.sheenRoughnessMap.channel),specularMapUv:Ce&&_(S.specularMap.channel),specularColorMapUv:_e&&_(S.specularColorMap.channel),specularIntensityMapUv:P&&_(S.specularIntensityMap.channel),transmissionMapUv:ae&&_(S.transmissionMap.channel),thicknessMapUv:Ae&&_(S.thicknessMap.channel),alphaMapUv:se&&_(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Y||O),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:Le,vertexUv3s:Ze,pointsUvs:J.isPoints===!0&&!!B.attributes.uv&&(be||se),fog:!!L,useFog:S.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:J.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:pe,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:be&&S.map.isVideoTexture===!0&&tt.getTransfer(S.map.colorSpace)===ot,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===zt,flipSided:S.side===It,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:fe&&S.extensions.derivatives===!0,extensionFragDepth:fe&&S.extensions.fragDepth===!0,extensionDrawBuffers:fe&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:fe&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:fe&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function p(S){const R=[];if(S.shaderID?R.push(S.shaderID):(R.push(S.customVertexShaderID),R.push(S.customFragmentShaderID)),S.defines!==void 0)for(const N in S.defines)R.push(N),R.push(S.defines[N]);return S.isRawShaderMaterial===!1&&(b(R,S),v(R,S),R.push(i.outputColorSpace)),R.push(S.customProgramCacheKey),R.join()}function b(S,R){S.push(R.precision),S.push(R.outputColorSpace),S.push(R.envMapMode),S.push(R.envMapCubeUVHeight),S.push(R.mapUv),S.push(R.alphaMapUv),S.push(R.lightMapUv),S.push(R.aoMapUv),S.push(R.bumpMapUv),S.push(R.normalMapUv),S.push(R.displacementMapUv),S.push(R.emissiveMapUv),S.push(R.metalnessMapUv),S.push(R.roughnessMapUv),S.push(R.anisotropyMapUv),S.push(R.clearcoatMapUv),S.push(R.clearcoatNormalMapUv),S.push(R.clearcoatRoughnessMapUv),S.push(R.iridescenceMapUv),S.push(R.iridescenceThicknessMapUv),S.push(R.sheenColorMapUv),S.push(R.sheenRoughnessMapUv),S.push(R.specularMapUv),S.push(R.specularColorMapUv),S.push(R.specularIntensityMapUv),S.push(R.transmissionMapUv),S.push(R.thicknessMapUv),S.push(R.combine),S.push(R.fogExp2),S.push(R.sizeAttenuation),S.push(R.morphTargetsCount),S.push(R.morphAttributeCount),S.push(R.numDirLights),S.push(R.numPointLights),S.push(R.numSpotLights),S.push(R.numSpotLightMaps),S.push(R.numHemiLights),S.push(R.numRectAreaLights),S.push(R.numDirLightShadows),S.push(R.numPointLightShadows),S.push(R.numSpotLightShadows),S.push(R.numSpotLightShadowsWithMaps),S.push(R.numLightProbes),S.push(R.shadowMapType),S.push(R.toneMapping),S.push(R.numClippingPlanes),S.push(R.numClipIntersection),S.push(R.depthPacking)}function v(S,R){a.disableAll(),R.isWebGL2&&a.enable(0),R.supportsVertexTextures&&a.enable(1),R.instancing&&a.enable(2),R.instancingColor&&a.enable(3),R.matcap&&a.enable(4),R.envMap&&a.enable(5),R.normalMapObjectSpace&&a.enable(6),R.normalMapTangentSpace&&a.enable(7),R.clearcoat&&a.enable(8),R.iridescence&&a.enable(9),R.alphaTest&&a.enable(10),R.vertexColors&&a.enable(11),R.vertexAlphas&&a.enable(12),R.vertexUv1s&&a.enable(13),R.vertexUv2s&&a.enable(14),R.vertexUv3s&&a.enable(15),R.vertexTangents&&a.enable(16),R.anisotropy&&a.enable(17),R.alphaHash&&a.enable(18),R.batching&&a.enable(19),S.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.skinning&&a.enable(4),R.morphTargets&&a.enable(5),R.morphNormals&&a.enable(6),R.morphColors&&a.enable(7),R.premultipliedAlpha&&a.enable(8),R.shadowMapEnabled&&a.enable(9),R.useLegacyLights&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function M(S){const R=g[S.type];let N;if(R){const W=en[R];N=Iu.clone(W.uniforms)}else N=S.uniforms;return N}function C(S,R){let N;for(let W=0,J=l.length;W<J;W++){const L=l[W];if(L.cacheKey===R){N=L,++N.usedTimes;break}}return N===void 0&&(N=new Zm(i,R,S,s),l.push(N)),N}function T(S){if(--S.usedTimes===0){const R=l.indexOf(S);l[R]=l[l.length-1],l.pop(),S.destroy()}}function w(S){c.remove(S)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:C,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:U}}function Qm(){let i=new WeakMap;function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function t(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function eg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function qa(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Za(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):t.push(p)}function c(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||eg),n.length>1&&n.sort(d||qa),r.length>1&&r.sort(d||qa)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:h,sort:l}}function tg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Za,i.set(n,[o])):r>=s.length?(o=new Za,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function ng(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new x,color:new Ke};break;case"SpotLight":t={position:new x,direction:new x,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new x,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new x,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new x,halfWidth:new x,halfHeight:new x};break}return i[e.id]=t,t}}}function ig(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let rg=0;function sg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function og(i,e){const t=new ng,n=ig(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new x);const s=new x,o=new st,a=new st;function c(h,u){let d=0,f=0,g=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let _=0,m=0,p=0,b=0,v=0,M=0,C=0,T=0,w=0,U=0,S=0;h.sort(sg);const R=u===!0?Math.PI:1;for(let W=0,J=h.length;W<J;W++){const L=h[W],B=L.color,G=L.intensity,K=L.distance,Z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=B.r*G*R,f+=B.g*G*R,g+=B.b*G*R;else if(L.isLightProbe){for(let X=0;X<9;X++)r.probe[X].addScaledVector(L.sh.coefficients[X],G);S++}else if(L.isDirectionalLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity*R),L.castShadow){const Q=L.shadow,ee=n.get(L);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,r.directionalShadow[_]=ee,r.directionalShadowMap[_]=Z,r.directionalShadowMatrix[_]=L.shadow.matrix,M++}r.directional[_]=X,_++}else if(L.isSpotLight){const X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(B).multiplyScalar(G*R),X.distance=K,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,r.spot[p]=X;const Q=L.shadow;if(L.map&&(r.spotLightMap[w]=L.map,w++,Q.updateMatrices(L),L.castShadow&&U++),r.spotLightMatrix[p]=Q.matrix,L.castShadow){const ee=n.get(L);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,r.spotShadow[p]=ee,r.spotShadowMap[p]=Z,T++}p++}else if(L.isRectAreaLight){const X=t.get(L);X.color.copy(B).multiplyScalar(G),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),r.rectArea[b]=X,b++}else if(L.isPointLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity*R),X.distance=L.distance,X.decay=L.decay,L.castShadow){const Q=L.shadow,ee=n.get(L);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,ee.shadowCameraNear=Q.camera.near,ee.shadowCameraFar=Q.camera.far,r.pointShadow[m]=ee,r.pointShadowMap[m]=Z,r.pointShadowMatrix[m]=L.shadow.matrix,C++}r.point[m]=X,m++}else if(L.isHemisphereLight){const X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(G*R),X.groundColor.copy(L.groundColor).multiplyScalar(G*R),r.hemi[v]=X,v++}}b>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ue.LTC_FLOAT_1,r.rectAreaLTC2=ue.LTC_FLOAT_2):(r.rectAreaLTC1=ue.LTC_HALF_1,r.rectAreaLTC2=ue.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ue.LTC_FLOAT_1,r.rectAreaLTC2=ue.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ue.LTC_HALF_1,r.rectAreaLTC2=ue.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=f,r.ambient[2]=g;const N=r.hash;(N.directionalLength!==_||N.pointLength!==m||N.spotLength!==p||N.rectAreaLength!==b||N.hemiLength!==v||N.numDirectionalShadows!==M||N.numPointShadows!==C||N.numSpotShadows!==T||N.numSpotMaps!==w||N.numLightProbes!==S)&&(r.directional.length=_,r.spot.length=p,r.rectArea.length=b,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=T+w-U,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=S,N.directionalLength=_,N.pointLength=m,N.spotLength=p,N.rectAreaLength=b,N.hemiLength=v,N.numDirectionalShadows=M,N.numPointShadows=C,N.numSpotShadows=T,N.numSpotMaps=w,N.numLightProbes=S,r.version=rg++)}function l(h,u){let d=0,f=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let b=0,v=h.length;b<v;b++){const M=h[b];if(M.isDirectionalLight){const C=r.directional[d];C.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),d++}else if(M.isSpotLight){const C=r.spot[g];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(p),g++}else if(M.isRectAreaLight){const C=r.rectArea[_];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(M.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(M.width*.5,0,0),C.halfHeight.set(0,M.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const C=r.point[f];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){const C=r.hemi[m];C.direction.setFromMatrixPosition(M.matrixWorld),C.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:r}}function ja(i,e){const t=new og(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function o(u){n.push(u)}function a(u){r.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function ag(i,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let c;return a===void 0?(c=new ja(i,e),t.set(s,[c])):o>=a.length?(c=new ja(i,e),a.push(c)):c=a[o],c}function r(){t=new WeakMap}return{get:n,dispose:r}}class cg extends nr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lg extends nr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const hg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ug=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function dg(i,e,t){let n=new po;const r=new j,s=new j,o=new at,a=new cg({depthPacking:Xh}),c=new lg,l={},h=t.maxTextureSize,u={[Rn]:It,[It]:Rn,[zt]:zt},d=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new j},radius:{value:4}},vertexShader:hg,fragmentShader:ug}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Gt;g.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new De(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cc;let p=this.type;this.render=function(T,w,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=i.getRenderTarget(),R=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),W=i.state;W.setBlending(wn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const J=p!==hn&&this.type===hn,L=p===hn&&this.type!==hn;for(let B=0,G=T.length;B<G;B++){const K=T[B],Z=K.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const X=Z.getFrameExtents();if(r.multiply(X),s.copy(Z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/X.x),r.x=s.x*X.x,Z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/X.y),r.y=s.y*X.y,Z.mapSize.y=s.y)),Z.map===null||J===!0||L===!0){const ee=this.type!==hn?{minFilter:Dt,magFilter:Dt}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Wn(r.x,r.y,ee),Z.map.texture.name=K.name+".shadowMap",Z.camera.updateProjectionMatrix()}i.setRenderTarget(Z.map),i.clear();const Q=Z.getViewportCount();for(let ee=0;ee<Q;ee++){const pe=Z.getViewport(ee);o.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),W.viewport(o),Z.updateMatrices(K,ee),n=Z.getFrustum(),M(w,U,Z.camera,K,this.type)}Z.isPointLightShadow!==!0&&this.type===hn&&b(Z,U),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,R,N)};function b(T,w){const U=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Wn(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(w,null,U,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(w,null,U,f,_,null)}function v(T,w,U,S){let R=null;const N=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)R=N;else if(R=U.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const W=R.uuid,J=w.uuid;let L=l[W];L===void 0&&(L={},l[W]=L);let B=L[J];B===void 0&&(B=R.clone(),L[J]=B,w.addEventListener("dispose",C)),R=B}if(R.visible=w.visible,R.wireframe=w.wireframe,S===hn?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:u[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,U.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const W=i.properties.get(R);W.light=U}return R}function M(T,w,U,S,R){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&R===hn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);const J=e.update(T),L=T.material;if(Array.isArray(L)){const B=J.groups;for(let G=0,K=B.length;G<K;G++){const Z=B[G],X=L[Z.materialIndex];if(X&&X.visible){const Q=v(T,X,S,R);T.onBeforeShadow(i,T,w,U,J,Q,Z),i.renderBufferDirect(U,null,J,Q,T,Z),T.onAfterShadow(i,T,w,U,J,Q,Z)}}}else if(L.visible){const B=v(T,L,S,R);T.onBeforeShadow(i,T,w,U,J,B,null),i.renderBufferDirect(U,null,J,B,T,null),T.onAfterShadow(i,T,w,U,J,B,null)}}const W=T.children;for(let J=0,L=W.length;J<L;J++)M(W[J],w,U,S,R)}function C(T){T.target.removeEventListener("dispose",C);for(const U in l){const S=l[U],R=T.target.uuid;R in S&&(S[R].dispose(),delete S[R])}}}function fg(i,e,t){const n=t.isWebGL2;function r(){let I=!1;const ce=new at;let fe=null;const Ue=new at(0,0,0,0);return{setMask:function(Le){fe!==Le&&!I&&(i.colorMask(Le,Le,Le,Le),fe=Le)},setLocked:function(Le){I=Le},setClear:function(Le,Ze,je,ut,pt){pt===!0&&(Le*=ut,Ze*=ut,je*=ut),ce.set(Le,Ze,je,ut),Ue.equals(ce)===!1&&(i.clearColor(Le,Ze,je,ut),Ue.copy(ce))},reset:function(){I=!1,fe=null,Ue.set(-1,0,0,0)}}}function s(){let I=!1,ce=null,fe=null,Ue=null;return{setTest:function(Le){Le?Fe(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(Le){ce!==Le&&!I&&(i.depthMask(Le),ce=Le)},setFunc:function(Le){if(fe!==Le){switch(Le){case yh:i.depthFunc(i.NEVER);break;case Sh:i.depthFunc(i.ALWAYS);break;case bh:i.depthFunc(i.LESS);break;case Br:i.depthFunc(i.LEQUAL);break;case Eh:i.depthFunc(i.EQUAL);break;case wh:i.depthFunc(i.GEQUAL);break;case Th:i.depthFunc(i.GREATER);break;case Ah:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=Le}},setLocked:function(Le){I=Le},setClear:function(Le){Ue!==Le&&(i.clearDepth(Le),Ue=Le)},reset:function(){I=!1,ce=null,fe=null,Ue=null}}}function o(){let I=!1,ce=null,fe=null,Ue=null,Le=null,Ze=null,je=null,ut=null,pt=null;return{setTest:function($e){I||($e?Fe(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function($e){ce!==$e&&!I&&(i.stencilMask($e),ce=$e)},setFunc:function($e,gt,Qt){(fe!==$e||Ue!==gt||Le!==Qt)&&(i.stencilFunc($e,gt,Qt),fe=$e,Ue=gt,Le=Qt)},setOp:function($e,gt,Qt){(Ze!==$e||je!==gt||ut!==Qt)&&(i.stencilOp($e,gt,Qt),Ze=$e,je=gt,ut=Qt)},setLocked:function($e){I=$e},setClear:function($e){pt!==$e&&(i.clearStencil($e),pt=$e)},reset:function(){I=!1,ce=null,fe=null,Ue=null,Le=null,Ze=null,je=null,ut=null,pt=null}}}const a=new r,c=new s,l=new o,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],m=null,p=!1,b=null,v=null,M=null,C=null,T=null,w=null,U=null,S=new Ke(0,0,0),R=0,N=!1,W=null,J=null,L=null,B=null,G=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,X=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Z=X>=1):Q.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Z=X>=2);let ee=null,pe={};const k=i.getParameter(i.SCISSOR_BOX),te=i.getParameter(i.VIEWPORT),me=new at().fromArray(k),we=new at().fromArray(te);function Me(I,ce,fe,Ue){const Le=new Uint8Array(4),Ze=i.createTexture();i.bindTexture(I,Ze),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<fe;je++)n&&(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)?i.texImage3D(ce,0,i.RGBA,1,1,Ue,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(ce+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return Ze}const Ie={};Ie[i.TEXTURE_2D]=Me(i.TEXTURE_2D,i.TEXTURE_2D,1),Ie[i.TEXTURE_CUBE_MAP]=Me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ie[i.TEXTURE_2D_ARRAY]=Me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ie[i.TEXTURE_3D]=Me(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Fe(i.DEPTH_TEST),c.setFunc(Br),ge(!1),E(Lo),Fe(i.CULL_FACE),Y(wn);function Fe(I){d[I]!==!0&&(i.enable(I),d[I]=!0)}function be(I){d[I]!==!1&&(i.disable(I),d[I]=!1)}function Oe(I,ce){return f[I]!==ce?(i.bindFramebuffer(I,ce),f[I]=ce,n&&(I===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ce),I===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ce)),!0):!1}function D(I,ce){let fe=_,Ue=!1;if(I)if(fe=g.get(ce),fe===void 0&&(fe=[],g.set(ce,fe)),I.isWebGLMultipleRenderTargets){const Le=I.texture;if(fe.length!==Le.length||fe[0]!==i.COLOR_ATTACHMENT0){for(let Ze=0,je=Le.length;Ze<je;Ze++)fe[Ze]=i.COLOR_ATTACHMENT0+Ze;fe.length=Le.length,Ue=!0}}else fe[0]!==i.COLOR_ATTACHMENT0&&(fe[0]=i.COLOR_ATTACHMENT0,Ue=!0);else fe[0]!==i.BACK&&(fe[0]=i.BACK,Ue=!0);Ue&&(t.isWebGL2?i.drawBuffers(fe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(fe))}function he(I){return m!==I?(i.useProgram(I),m=I,!0):!1}const q={[Bn]:i.FUNC_ADD,[oh]:i.FUNC_SUBTRACT,[ah]:i.FUNC_REVERSE_SUBTRACT};if(n)q[No]=i.MIN,q[Oo]=i.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(q[No]=I.MIN_EXT,q[Oo]=I.MAX_EXT)}const oe={[ch]:i.ZERO,[lh]:i.ONE,[hh]:i.SRC_COLOR,[Ys]:i.SRC_ALPHA,[gh]:i.SRC_ALPHA_SATURATE,[ph]:i.DST_COLOR,[dh]:i.DST_ALPHA,[uh]:i.ONE_MINUS_SRC_COLOR,[qs]:i.ONE_MINUS_SRC_ALPHA,[mh]:i.ONE_MINUS_DST_COLOR,[fh]:i.ONE_MINUS_DST_ALPHA,[_h]:i.CONSTANT_COLOR,[vh]:i.ONE_MINUS_CONSTANT_COLOR,[xh]:i.CONSTANT_ALPHA,[Mh]:i.ONE_MINUS_CONSTANT_ALPHA};function Y(I,ce,fe,Ue,Le,Ze,je,ut,pt,$e){if(I===wn){p===!0&&(be(i.BLEND),p=!1);return}if(p===!1&&(Fe(i.BLEND),p=!0),I!==sh){if(I!==b||$e!==N){if((v!==Bn||T!==Bn)&&(i.blendEquation(i.FUNC_ADD),v=Bn,T=Bn),$e)switch(I){case Si:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Do:i.blendFunc(i.ONE,i.ONE);break;case Io:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Si:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Do:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Io:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,C=null,w=null,U=null,S.set(0,0,0),R=0,b=I,N=$e}return}Le=Le||ce,Ze=Ze||fe,je=je||Ue,(ce!==v||Le!==T)&&(i.blendEquationSeparate(q[ce],q[Le]),v=ce,T=Le),(fe!==M||Ue!==C||Ze!==w||je!==U)&&(i.blendFuncSeparate(oe[fe],oe[Ue],oe[Ze],oe[je]),M=fe,C=Ue,w=Ze,U=je),(ut.equals(S)===!1||pt!==R)&&(i.blendColor(ut.r,ut.g,ut.b,pt),S.copy(ut),R=pt),b=I,N=!1}function Te(I,ce){I.side===zt?be(i.CULL_FACE):Fe(i.CULL_FACE);let fe=I.side===It;ce&&(fe=!fe),ge(fe),I.blending===Si&&I.transparent===!1?Y(wn):Y(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),c.setFunc(I.depthFunc),c.setTest(I.depthTest),c.setMask(I.depthWrite),a.setMask(I.colorWrite);const Ue=I.stencilWrite;l.setTest(Ue),Ue&&(l.setMask(I.stencilWriteMask),l.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),l.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),O(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Fe(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function ge(I){W!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),W=I)}function E(I){I!==ih?(Fe(i.CULL_FACE),I!==J&&(I===Lo?i.cullFace(i.BACK):I===rh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),J=I}function y(I){I!==L&&(Z&&i.lineWidth(I),L=I)}function O(I,ce,fe){I?(Fe(i.POLYGON_OFFSET_FILL),(B!==ce||G!==fe)&&(i.polygonOffset(ce,fe),B=ce,G=fe)):be(i.POLYGON_OFFSET_FILL)}function re(I){I?Fe(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function ne(I){I===void 0&&(I=i.TEXTURE0+K-1),ee!==I&&(i.activeTexture(I),ee=I)}function $(I,ce,fe){fe===void 0&&(ee===null?fe=i.TEXTURE0+K-1:fe=ee);let Ue=pe[fe];Ue===void 0&&(Ue={type:void 0,texture:void 0},pe[fe]=Ue),(Ue.type!==I||Ue.texture!==ce)&&(ee!==fe&&(i.activeTexture(fe),ee=fe),i.bindTexture(I,ce||Ie[I]),Ue.type=I,Ue.texture=ce)}function Se(){const I=pe[ee];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function de(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pe(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function He(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Je(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ke(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Be(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ce(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function P(I){me.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),me.copy(I))}function ae(I){we.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),we.copy(I))}function Ae(I,ce){let fe=u.get(ce);fe===void 0&&(fe=new WeakMap,u.set(ce,fe));let Ue=fe.get(I);Ue===void 0&&(Ue=i.getUniformBlockIndex(ce,I.name),fe.set(I,Ue))}function ye(I,ce){const Ue=u.get(ce).get(I);h.get(ce)!==Ue&&(i.uniformBlockBinding(ce,Ue,I.__bindingPointIndex),h.set(ce,Ue))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ee=null,pe={},f={},g=new WeakMap,_=[],m=null,p=!1,b=null,v=null,M=null,C=null,T=null,w=null,U=null,S=new Ke(0,0,0),R=0,N=!1,W=null,J=null,L=null,B=null,G=null,me.set(0,0,i.canvas.width,i.canvas.height),we.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Fe,disable:be,bindFramebuffer:Oe,drawBuffers:D,useProgram:he,setBlending:Y,setMaterial:Te,setFlipSided:ge,setCullFace:E,setLineWidth:y,setPolygonOffset:O,setScissorTest:re,activeTexture:ne,bindTexture:$,unbindTexture:Se,compressedTexImage2D:de,compressedTexImage3D:ve,texImage2D:Ce,texImage3D:_e,updateUBOMapping:Ae,uniformBlockBinding:ye,texStorage2D:ke,texStorage3D:Be,texSubImage2D:Pe,texSubImage3D:He,compressedTexSubImage2D:ie,compressedTexSubImage3D:Je,scissor:P,viewport:ae,reset:se}}function pg(i,e,t,n,r,s,o){const a=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return f?new OffscreenCanvas(E,y):kr("canvas")}function _(E,y,O,re){let ne=1;if((E.width>re||E.height>re)&&(ne=re/Math.max(E.width,E.height)),ne<1||y===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const $=y?Wr:Math.floor,Se=$(ne*E.width),de=$(ne*E.height);u===void 0&&(u=g(Se,de));const ve=O?g(Se,de):u;return ve.width=Se,ve.height=de,ve.getContext("2d").drawImage(E,0,0,Se,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Se+"x"+de+")."),ve}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return Qs(E.width)&&Qs(E.height)}function p(E){return a?!1:E.wrapS!==Kt||E.wrapT!==Kt||E.minFilter!==Dt&&E.minFilter!==kt}function b(E,y){return E.generateMipmaps&&y&&E.minFilter!==Dt&&E.minFilter!==kt}function v(E){i.generateMipmap(E)}function M(E,y,O,re,ne=!1){if(a===!1)return y;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=y;if(y===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8)),y===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),y===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8)),y===i.RGBA){const Se=ne?zr:tt.getTransfer(re);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=Se===ot?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function C(E,y,O){return b(E,O)===!0||E.isFramebufferTexture&&E.minFilter!==Dt&&E.minFilter!==kt?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function T(E){return E===Dt||E===Fo||E===as?i.NEAREST:i.LINEAR}function w(E){const y=E.target;y.removeEventListener("dispose",w),S(y),y.isVideoTexture&&h.delete(y)}function U(E){const y=E.target;y.removeEventListener("dispose",U),N(y)}function S(E){const y=n.get(E);if(y.__webglInit===void 0)return;const O=E.source,re=d.get(O);if(re){const ne=re[y.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&R(E),Object.keys(re).length===0&&d.delete(O)}n.remove(E)}function R(E){const y=n.get(E);i.deleteTexture(y.__webglTexture);const O=E.source,re=d.get(O);delete re[y.__cacheKey],o.memory.textures--}function N(E){const y=E.texture,O=n.get(E),re=n.get(y);if(re.__webglTexture!==void 0&&(i.deleteTexture(re.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(O.__webglFramebuffer[ne]))for(let $=0;$<O.__webglFramebuffer[ne].length;$++)i.deleteFramebuffer(O.__webglFramebuffer[ne][$]);else i.deleteFramebuffer(O.__webglFramebuffer[ne]);O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer[ne])}else{if(Array.isArray(O.__webglFramebuffer))for(let ne=0;ne<O.__webglFramebuffer.length;ne++)i.deleteFramebuffer(O.__webglFramebuffer[ne]);else i.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&i.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let ne=0;ne<O.__webglColorRenderbuffer.length;ne++)O.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(O.__webglColorRenderbuffer[ne]);O.__webglDepthRenderbuffer&&i.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let ne=0,$=y.length;ne<$;ne++){const Se=n.get(y[ne]);Se.__webglTexture&&(i.deleteTexture(Se.__webglTexture),o.memory.textures--),n.remove(y[ne])}n.remove(y),n.remove(E)}let W=0;function J(){W=0}function L(){const E=W;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),W+=1,E}function B(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function G(E,y){const O=n.get(E);if(E.isVideoTexture&&Te(E),E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){const re=E.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(O,E,y);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+y)}function K(E,y){const O=n.get(E);if(E.version>0&&O.__version!==E.version){me(O,E,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+y)}function Z(E,y){const O=n.get(E);if(E.version>0&&O.__version!==E.version){me(O,E,y);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+y)}function X(E,y){const O=n.get(E);if(E.version>0&&O.__version!==E.version){we(O,E,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+y)}const Q={[Ks]:i.REPEAT,[Kt]:i.CLAMP_TO_EDGE,[Js]:i.MIRRORED_REPEAT},ee={[Dt]:i.NEAREST,[Fo]:i.NEAREST_MIPMAP_NEAREST,[as]:i.NEAREST_MIPMAP_LINEAR,[kt]:i.LINEAR,[Nh]:i.LINEAR_MIPMAP_NEAREST,[ji]:i.LINEAR_MIPMAP_LINEAR},pe={[qh]:i.NEVER,[Qh]:i.ALWAYS,[Zh]:i.LESS,[Wc]:i.LEQUAL,[jh]:i.EQUAL,[$h]:i.GEQUAL,[Kh]:i.GREATER,[Jh]:i.NOTEQUAL};function k(E,y,O){if(O?(i.texParameteri(E,i.TEXTURE_WRAP_S,Q[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Q[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Q[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ee[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ee[y.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==Kt||y.wrapT!==Kt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,T(y.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,T(y.minFilter)),y.minFilter!==Dt&&y.minFilter!==kt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,pe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const re=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===Dt||y.minFilter!==as&&y.minFilter!==ji||y.type===En&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===Ki&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(E,re.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function te(E,y){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",w));const re=y.source;let ne=d.get(re);ne===void 0&&(ne={},d.set(re,ne));const $=B(y);if($!==E.__cacheKey){ne[$]===void 0&&(ne[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),ne[$].usedTimes++;const Se=ne[E.__cacheKey];Se!==void 0&&(ne[E.__cacheKey].usedTimes--,Se.usedTimes===0&&R(y)),E.__cacheKey=$,E.__webglTexture=ne[$].texture}return O}function me(E,y,O){let re=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(re=i.TEXTURE_3D);const ne=te(E,y),$=y.source;t.bindTexture(re,E.__webglTexture,i.TEXTURE0+O);const Se=n.get($);if($.version!==Se.__version||ne===!0){t.activeTexture(i.TEXTURE0+O);const de=tt.getPrimaries(tt.workingColorSpace),ve=y.colorSpace===Xt?null:tt.getPrimaries(y.colorSpace),Pe=y.colorSpace===Xt||de===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const He=p(y)&&m(y.image)===!1;let ie=_(y.image,He,!1,r.maxTextureSize);ie=ge(y,ie);const Je=m(ie)||a,ke=s.convert(y.format,y.colorSpace);let Be=s.convert(y.type),Ce=M(y.internalFormat,ke,Be,y.colorSpace,y.isVideoTexture);k(re,y,Je);let _e;const P=y.mipmaps,ae=a&&y.isVideoTexture!==!0&&Ce!==Hc,Ae=Se.__version===void 0||ne===!0,ye=C(y,ie,Je);if(y.isDepthTexture)Ce=i.DEPTH_COMPONENT,a?y.type===En?Ce=i.DEPTH_COMPONENT32F:y.type===bn?Ce=i.DEPTH_COMPONENT24:y.type===Hn?Ce=i.DEPTH24_STENCIL8:Ce=i.DEPTH_COMPONENT16:y.type===En&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Gn&&Ce===i.DEPTH_COMPONENT&&y.type!==ho&&y.type!==bn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=bn,Be=s.convert(y.type)),y.format===Ri&&Ce===i.DEPTH_COMPONENT&&(Ce=i.DEPTH_STENCIL,y.type!==Hn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Hn,Be=s.convert(y.type))),Ae&&(ae?t.texStorage2D(i.TEXTURE_2D,1,Ce,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Ce,ie.width,ie.height,0,ke,Be,null));else if(y.isDataTexture)if(P.length>0&&Je){ae&&Ae&&t.texStorage2D(i.TEXTURE_2D,ye,Ce,P[0].width,P[0].height);for(let se=0,I=P.length;se<I;se++)_e=P[se],ae?t.texSubImage2D(i.TEXTURE_2D,se,0,0,_e.width,_e.height,ke,Be,_e.data):t.texImage2D(i.TEXTURE_2D,se,Ce,_e.width,_e.height,0,ke,Be,_e.data);y.generateMipmaps=!1}else ae?(Ae&&t.texStorage2D(i.TEXTURE_2D,ye,Ce,ie.width,ie.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,ke,Be,ie.data)):t.texImage2D(i.TEXTURE_2D,0,Ce,ie.width,ie.height,0,ke,Be,ie.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ae&&Ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ce,P[0].width,P[0].height,ie.depth);for(let se=0,I=P.length;se<I;se++)_e=P[se],y.format!==Jt?ke!==null?ae?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,_e.width,_e.height,ie.depth,ke,_e.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Ce,_e.width,_e.height,ie.depth,0,_e.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,_e.width,_e.height,ie.depth,ke,Be,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Ce,_e.width,_e.height,ie.depth,0,ke,Be,_e.data)}else{ae&&Ae&&t.texStorage2D(i.TEXTURE_2D,ye,Ce,P[0].width,P[0].height);for(let se=0,I=P.length;se<I;se++)_e=P[se],y.format!==Jt?ke!==null?ae?t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,_e.width,_e.height,ke,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Ce,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?t.texSubImage2D(i.TEXTURE_2D,se,0,0,_e.width,_e.height,ke,Be,_e.data):t.texImage2D(i.TEXTURE_2D,se,Ce,_e.width,_e.height,0,ke,Be,_e.data)}else if(y.isDataArrayTexture)ae?(Ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ce,ie.width,ie.height,ie.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ke,Be,ie.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ce,ie.width,ie.height,ie.depth,0,ke,Be,ie.data);else if(y.isData3DTexture)ae?(Ae&&t.texStorage3D(i.TEXTURE_3D,ye,Ce,ie.width,ie.height,ie.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ke,Be,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Ce,ie.width,ie.height,ie.depth,0,ke,Be,ie.data);else if(y.isFramebufferTexture){if(Ae)if(ae)t.texStorage2D(i.TEXTURE_2D,ye,Ce,ie.width,ie.height);else{let se=ie.width,I=ie.height;for(let ce=0;ce<ye;ce++)t.texImage2D(i.TEXTURE_2D,ce,Ce,se,I,0,ke,Be,null),se>>=1,I>>=1}}else if(P.length>0&&Je){ae&&Ae&&t.texStorage2D(i.TEXTURE_2D,ye,Ce,P[0].width,P[0].height);for(let se=0,I=P.length;se<I;se++)_e=P[se],ae?t.texSubImage2D(i.TEXTURE_2D,se,0,0,ke,Be,_e):t.texImage2D(i.TEXTURE_2D,se,Ce,ke,Be,_e);y.generateMipmaps=!1}else ae?(Ae&&t.texStorage2D(i.TEXTURE_2D,ye,Ce,ie.width,ie.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ke,Be,ie)):t.texImage2D(i.TEXTURE_2D,0,Ce,ke,Be,ie);b(y,Je)&&v(re),Se.__version=$.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function we(E,y,O){if(y.image.length!==6)return;const re=te(E,y),ne=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+O);const $=n.get(ne);if(ne.version!==$.__version||re===!0){t.activeTexture(i.TEXTURE0+O);const Se=tt.getPrimaries(tt.workingColorSpace),de=y.colorSpace===Xt?null:tt.getPrimaries(y.colorSpace),ve=y.colorSpace===Xt||Se===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Pe=y.isCompressedTexture||y.image[0].isCompressedTexture,He=y.image[0]&&y.image[0].isDataTexture,ie=[];for(let se=0;se<6;se++)!Pe&&!He?ie[se]=_(y.image[se],!1,!0,r.maxCubemapSize):ie[se]=He?y.image[se].image:y.image[se],ie[se]=ge(y,ie[se]);const Je=ie[0],ke=m(Je)||a,Be=s.convert(y.format,y.colorSpace),Ce=s.convert(y.type),_e=M(y.internalFormat,Be,Ce,y.colorSpace),P=a&&y.isVideoTexture!==!0,ae=$.__version===void 0||re===!0;let Ae=C(y,Je,ke);k(i.TEXTURE_CUBE_MAP,y,ke);let ye;if(Pe){P&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,_e,Je.width,Je.height);for(let se=0;se<6;se++){ye=ie[se].mipmaps;for(let I=0;I<ye.length;I++){const ce=ye[I];y.format!==Jt?Be!==null?P?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I,0,0,ce.width,ce.height,Be,ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I,_e,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I,0,0,ce.width,ce.height,Be,Ce,ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I,_e,ce.width,ce.height,0,Be,Ce,ce.data)}}}else{ye=y.mipmaps,P&&ae&&(ye.length>0&&Ae++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,_e,ie[0].width,ie[0].height));for(let se=0;se<6;se++)if(He){P?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ie[se].width,ie[se].height,Be,Ce,ie[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,_e,ie[se].width,ie[se].height,0,Be,Ce,ie[se].data);for(let I=0;I<ye.length;I++){const fe=ye[I].image[se].image;P?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I+1,0,0,fe.width,fe.height,Be,Ce,fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I+1,_e,fe.width,fe.height,0,Be,Ce,fe.data)}}else{P?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Be,Ce,ie[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,_e,Be,Ce,ie[se]);for(let I=0;I<ye.length;I++){const ce=ye[I];P?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I+1,0,0,Be,Ce,ce.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,I+1,_e,Be,Ce,ce.image[se])}}}b(y,ke)&&v(i.TEXTURE_CUBE_MAP),$.__version=ne.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function Me(E,y,O,re,ne,$){const Se=s.convert(O.format,O.colorSpace),de=s.convert(O.type),ve=M(O.internalFormat,Se,de,O.colorSpace);if(!n.get(y).__hasExternalTextures){const He=Math.max(1,y.width>>$),ie=Math.max(1,y.height>>$);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,$,ve,He,ie,y.depth,0,Se,de,null):t.texImage2D(ne,$,ve,He,ie,0,Se,de,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),Y(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ne,n.get(O).__webglTexture,0,oe(y)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,ne,n.get(O).__webglTexture,$),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(E,y,O){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer&&!y.stencilBuffer){let re=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(O||Y(y)){const ne=y.depthTexture;ne&&ne.isDepthTexture&&(ne.type===En?re=i.DEPTH_COMPONENT32F:ne.type===bn&&(re=i.DEPTH_COMPONENT24));const $=oe(y);Y(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$,re,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,$,re,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,re,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(y.depthBuffer&&y.stencilBuffer){const re=oe(y);O&&Y(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,i.DEPTH24_STENCIL8,y.width,y.height):Y(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const re=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let ne=0;ne<re.length;ne++){const $=re[ne],Se=s.convert($.format,$.colorSpace),de=s.convert($.type),ve=M($.internalFormat,Se,de,$.colorSpace),Pe=oe(y);O&&Y(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,ve,y.width,y.height):Y(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pe,ve,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ve,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const re=n.get(y.depthTexture).__webglTexture,ne=oe(y);if(y.depthTexture.format===Gn)Y(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0);else if(y.depthTexture.format===Ri)Y(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function be(E){const y=n.get(E),O=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Fe(y.__webglFramebuffer,E)}else if(O){y.__webglDepthbuffer=[];for(let re=0;re<6;re++)t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[re]),y.__webglDepthbuffer[re]=i.createRenderbuffer(),Ie(y.__webglDepthbuffer[re],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Ie(y.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(E,y,O){const re=n.get(E);y!==void 0&&Me(re.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&be(E)}function D(E){const y=E.texture,O=n.get(E),re=n.get(y);E.addEventListener("dispose",U),E.isWebGLMultipleRenderTargets!==!0&&(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=y.version,o.memory.textures++);const ne=E.isWebGLCubeRenderTarget===!0,$=E.isWebGLMultipleRenderTargets===!0,Se=m(E)||a;if(ne){O.__webglFramebuffer=[];for(let de=0;de<6;de++)if(a&&y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer[de]=[];for(let ve=0;ve<y.mipmaps.length;ve++)O.__webglFramebuffer[de][ve]=i.createFramebuffer()}else O.__webglFramebuffer[de]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer=[];for(let de=0;de<y.mipmaps.length;de++)O.__webglFramebuffer[de]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if($)if(r.drawBuffers){const de=E.texture;for(let ve=0,Pe=de.length;ve<Pe;ve++){const He=n.get(de[ve]);He.__webglTexture===void 0&&(He.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&Y(E)===!1){const de=$?y:[y];O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ve=0;ve<de.length;ve++){const Pe=de[ve];O.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ve]);const He=s.convert(Pe.format,Pe.colorSpace),ie=s.convert(Pe.type),Je=M(Pe.internalFormat,He,ie,Pe.colorSpace,E.isXRRenderTarget===!0),ke=oe(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,Je,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,O.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(O.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),k(i.TEXTURE_CUBE_MAP,y,Se);for(let de=0;de<6;de++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let ve=0;ve<y.mipmaps.length;ve++)Me(O.__webglFramebuffer[de][ve],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ve);else Me(O.__webglFramebuffer[de],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);b(y,Se)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if($){const de=E.texture;for(let ve=0,Pe=de.length;ve<Pe;ve++){const He=de[ve],ie=n.get(He);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),k(i.TEXTURE_2D,He,Se),Me(O.__webglFramebuffer,E,He,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,0),b(He,Se)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let de=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?de=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(de,re.__webglTexture),k(de,y,Se),a&&y.mipmaps&&y.mipmaps.length>0)for(let ve=0;ve<y.mipmaps.length;ve++)Me(O.__webglFramebuffer[ve],E,y,i.COLOR_ATTACHMENT0,de,ve);else Me(O.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,de,0);b(y,Se)&&v(de),t.unbindTexture()}E.depthBuffer&&be(E)}function he(E){const y=m(E)||a,O=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let re=0,ne=O.length;re<ne;re++){const $=O[re];if(b($,y)){const Se=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,de=n.get($).__webglTexture;t.bindTexture(Se,de),v(Se),t.unbindTexture()}}}function q(E){if(a&&E.samples>0&&Y(E)===!1){const y=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],O=E.width,re=E.height;let ne=i.COLOR_BUFFER_BIT;const $=[],Se=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=n.get(E),ve=E.isWebGLMultipleRenderTargets===!0;if(ve)for(let Pe=0;Pe<y.length;Pe++)t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let Pe=0;Pe<y.length;Pe++){$.push(i.COLOR_ATTACHMENT0+Pe),E.depthBuffer&&$.push(Se);const He=de.__ignoreDepthValues!==void 0?de.__ignoreDepthValues:!1;if(He===!1&&(E.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),ve&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,de.__webglColorRenderbuffer[Pe]),He===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Se]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Se])),ve){const ie=n.get(y[Pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,O,re,0,0,O,re,ne,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let Pe=0;Pe<y.length;Pe++){t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,de.__webglColorRenderbuffer[Pe]);const He=n.get(y[Pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,He,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}}function oe(E){return Math.min(r.maxSamples,E.samples)}function Y(E){const y=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Te(E){const y=o.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function ge(E,y){const O=E.colorSpace,re=E.format,ne=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===$s||O!==fn&&O!==Xt&&(tt.getTransfer(O)===ot?a===!1?e.has("EXT_sRGB")===!0&&re===Jt?(E.format=$s,E.minFilter=kt,E.generateMipmaps=!1):y=Xc.sRGBToLinear(y):(re!==Jt||ne!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),y}this.allocateTextureUnit=L,this.resetTextureUnits=J,this.setTexture2D=G,this.setTexture2DArray=K,this.setTexture3D=Z,this.setTextureCube=X,this.rebindTextures=Oe,this.setupRenderTarget=D,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=Y}function mg(i,e,t){const n=t.isWebGL2;function r(s,o=Xt){let a;const c=tt.getTransfer(o);if(s===An)return i.UNSIGNED_BYTE;if(s===Nc)return i.UNSIGNED_SHORT_4_4_4_4;if(s===Oc)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Oh)return i.BYTE;if(s===Fh)return i.SHORT;if(s===ho)return i.UNSIGNED_SHORT;if(s===Uc)return i.INT;if(s===bn)return i.UNSIGNED_INT;if(s===En)return i.FLOAT;if(s===Ki)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Bh)return i.ALPHA;if(s===Jt)return i.RGBA;if(s===zh)return i.LUMINANCE;if(s===Hh)return i.LUMINANCE_ALPHA;if(s===Gn)return i.DEPTH_COMPONENT;if(s===Ri)return i.DEPTH_STENCIL;if(s===$s)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Gh)return i.RED;if(s===Fc)return i.RED_INTEGER;if(s===Vh)return i.RG;if(s===Bc)return i.RG_INTEGER;if(s===zc)return i.RGBA_INTEGER;if(s===cs||s===ls||s===hs||s===us)if(c===ot)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===cs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ls)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===hs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===us)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===cs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ls)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===hs)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===us)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Bo||s===zo||s===Ho||s===Go)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Bo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===zo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ho)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Go)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Hc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Vo||s===Wo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Vo)return c===ot?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Wo)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ko||s===Xo||s===Yo||s===qo||s===Zo||s===jo||s===Ko||s===Jo||s===$o||s===Qo||s===ea||s===ta||s===na||s===ia)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===ko)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Xo)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Yo)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===qo)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Zo)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===jo)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ko)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Jo)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===$o)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Qo)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ea)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===ta)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===na)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ia)return c===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ds||s===ra||s===sa)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===ds)return c===ot?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ra)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===sa)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Wh||s===oa||s===aa||s===ca)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===ds)return a.COMPRESSED_RED_RGTC1_EXT;if(s===oa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===aa)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===ca)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Hn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class gg extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ee extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _g={type:"move"};class Ns{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new x,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new x),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new x,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new x),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_g)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ee;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class vg extends Yn{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const b=[],v=[],M=new j;let C=null;const T=new Bt;T.layers.enable(1),T.viewport=new at;const w=new Bt;w.layers.enable(2),w.viewport=new at;const U=[T,w],S=new gg;S.layers.enable(1),S.layers.enable(2);let R=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let te=b[k];return te===void 0&&(te=new Ns,b[k]=te),te.getTargetRaySpace()},this.getControllerGrip=function(k){let te=b[k];return te===void 0&&(te=new Ns,b[k]=te),te.getGripSpace()},this.getHand=function(k){let te=b[k];return te===void 0&&(te=new Ns,b[k]=te),te.getHandSpace()};function W(k){const te=v.indexOf(k.inputSource);if(te===-1)return;const me=b[te];me!==void 0&&(me.update(k.inputSource,k.frame,l||o),me.dispatchEvent({type:k.type,data:k.inputSource}))}function J(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",L);for(let k=0;k<b.length;k++){const te=v[k];te!==null&&(v[k]=null,b[k].disconnect(te))}R=null,N=null,e.setRenderTarget(m),f=null,d=null,u=null,r=null,p=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",J),r.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const te={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Wn(f.framebufferWidth,f.framebufferHeight,{format:Jt,type:An,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let te=null,me=null,we=null;_.depth&&(we=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=_.stencil?Ri:Gn,me=_.stencil?Hn:bn);const Me={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(Me),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Wn(d.textureWidth,d.textureHeight,{format:Jt,type:An,depthTexture:new rl(d.textureWidth,d.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ie=e.properties.get(p);Ie.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(k){for(let te=0;te<k.removed.length;te++){const me=k.removed[te],we=v.indexOf(me);we>=0&&(v[we]=null,b[we].disconnect(me))}for(let te=0;te<k.added.length;te++){const me=k.added[te];let we=v.indexOf(me);if(we===-1){for(let Ie=0;Ie<b.length;Ie++)if(Ie>=v.length){v.push(me),we=Ie;break}else if(v[Ie]===null){v[Ie]=me,we=Ie;break}if(we===-1)break}const Me=b[we];Me&&Me.connect(me)}}const B=new x,G=new x;function K(k,te,me){B.setFromMatrixPosition(te.matrixWorld),G.setFromMatrixPosition(me.matrixWorld);const we=B.distanceTo(G),Me=te.projectionMatrix.elements,Ie=me.projectionMatrix.elements,Fe=Me[14]/(Me[10]-1),be=Me[14]/(Me[10]+1),Oe=(Me[9]+1)/Me[5],D=(Me[9]-1)/Me[5],he=(Me[8]-1)/Me[0],q=(Ie[8]+1)/Ie[0],oe=Fe*he,Y=Fe*q,Te=we/(-he+q),ge=Te*-he;te.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(ge),k.translateZ(Te),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const E=Fe+Te,y=be+Te,O=oe-ge,re=Y+(we-ge),ne=Oe*be/y*E,$=D*be/y*E;k.projectionMatrix.makePerspective(O,re,ne,$,E,y),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function Z(k,te){te===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(te.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;S.near=w.near=T.near=k.near,S.far=w.far=T.far=k.far,(R!==S.near||N!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,N=S.far);const te=k.parent,me=S.cameras;Z(S,te);for(let we=0;we<me.length;we++)Z(me[we],te);me.length===2?K(S,T,w):S.projectionMatrix.copy(T.projectionMatrix),X(k,S,te)};function X(k,te,me){me===null?k.matrix.copy(te.matrixWorld):(k.matrix.copy(me.matrixWorld),k.matrix.invert(),k.matrix.multiply(te.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(te.projectionMatrix),k.projectionMatrixInverse.copy(te.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Ji*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(k){c=k,d!==null&&(d.fixedFoveation=k),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=k)};let Q=null;function ee(k,te){if(h=te.getViewerPose(l||o),g=te,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let we=!1;me.length!==S.cameras.length&&(S.cameras.length=0,we=!0);for(let Me=0;Me<me.length;Me++){const Ie=me[Me];let Fe=null;if(f!==null)Fe=f.getViewport(Ie);else{const Oe=u.getViewSubImage(d,Ie);Fe=Oe.viewport,Me===0&&(e.setRenderTargetTextures(p,Oe.colorTexture,d.ignoreDepthValues?void 0:Oe.depthStencilTexture),e.setRenderTarget(p))}let be=U[Me];be===void 0&&(be=new Bt,be.layers.enable(Me),be.viewport=new at,U[Me]=be),be.matrix.fromArray(Ie.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Ie.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),Me===0&&(S.matrix.copy(be.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),we===!0&&S.cameras.push(be)}}for(let me=0;me<b.length;me++){const we=v[me],Me=b[me];we!==null&&Me!==void 0&&Me.update(we,te,l||o)}Q&&Q(k,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}const pe=new nl;pe.setAnimationLoop(ee),this.setAnimationLoop=function(k){Q=k},this.dispose=function(){}}}function xg(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,v,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===It&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===It&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===It&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Mg(i,e,t,n){let r={},s={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(b,v){const M=v.program;n.uniformBlockBinding(b,M)}function l(b,v){let M=r[b.id];M===void 0&&(g(b),M=h(b),r[b.id]=M,b.addEventListener("dispose",m));const C=v.program;n.updateUBOMapping(b,C);const T=e.render.frame;s[b.id]!==T&&(d(b),s[b.id]=T)}function h(b){const v=u();b.__bindingPointIndex=v;const M=i.createBuffer(),C=b.__size,T=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,M),M}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const v=r[b.id],M=b.uniforms,C=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,w=M.length;T<w;T++){const U=Array.isArray(M[T])?M[T]:[M[T]];for(let S=0,R=U.length;S<R;S++){const N=U[S];if(f(N,T,S,C)===!0){const W=N.__offset,J=Array.isArray(N.value)?N.value:[N.value];let L=0;for(let B=0;B<J.length;B++){const G=J[B],K=_(G);typeof G=="number"||typeof G=="boolean"?(N.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,W+L,N.__data)):G.isMatrix3?(N.__data[0]=G.elements[0],N.__data[1]=G.elements[1],N.__data[2]=G.elements[2],N.__data[3]=0,N.__data[4]=G.elements[3],N.__data[5]=G.elements[4],N.__data[6]=G.elements[5],N.__data[7]=0,N.__data[8]=G.elements[6],N.__data[9]=G.elements[7],N.__data[10]=G.elements[8],N.__data[11]=0):(G.toArray(N.__data,L),L+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,v,M,C){const T=b.value,w=v+"_"+M;if(C[w]===void 0)return typeof T=="number"||typeof T=="boolean"?C[w]=T:C[w]=T.clone(),!0;{const U=C[w];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return C[w]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(b){const v=b.uniforms;let M=0;const C=16;for(let w=0,U=v.length;w<U;w++){const S=Array.isArray(v[w])?v[w]:[v[w]];for(let R=0,N=S.length;R<N;R++){const W=S[R],J=Array.isArray(W.value)?W.value:[W.value];for(let L=0,B=J.length;L<B;L++){const G=J[L],K=_(G),Z=M%C;Z!==0&&C-Z<K.boundary&&(M+=C-Z),W.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=M,M+=K.storage}}}const T=M%C;return T>0&&(M+=C-T),b.__size=M,b.__cache={},this}function _(b){const v={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function m(b){const v=b.target;v.removeEventListener("dispose",m);const M=o.indexOf(v.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class hl{constructor(e={}){const{canvas:t=mu(),context:n=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bt,this._useLegacyLights=!1,this.toneMapping=Tn,this.toneMappingExposure=1;const v=this;let M=!1,C=0,T=0,w=null,U=-1,S=null;const R=new at,N=new at;let W=null;const J=new Ke(0);let L=0,B=t.width,G=t.height,K=1,Z=null,X=null;const Q=new at(0,0,B,G),ee=new at(0,0,B,G);let pe=!1;const k=new po;let te=!1,me=!1,we=null;const Me=new st,Ie=new j,Fe=new x,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Oe(){return w===null?K:1}let D=n;function he(A,F){for(let H=0;H<A.length;H++){const V=A[H],z=t.getContext(V,F);if(z!==null)return z}return null}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${lo}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",ce,!1),D===null){const F=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&F.shift(),D=he(F,A),D===null)throw he(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let q,oe,Y,Te,ge,E,y,O,re,ne,$,Se,de,ve,Pe,He,ie,Je,ke,Be,Ce,_e,P,ae;function Ae(){q=new Pp(D),oe=new Ep(D,q,e),q.init(oe),_e=new mg(D,q,oe),Y=new fg(D,q,oe),Te=new Ip(D),ge=new Qm,E=new pg(D,q,Y,ge,oe,_e,Te),y=new Tp(v),O=new Cp(v),re=new Hu(D,oe),P=new Sp(D,q,re,oe),ne=new Lp(D,re,Te,P),$=new Fp(D,ne,re,Te),ke=new Op(D,oe,E),He=new wp(ge),Se=new $m(v,y,O,q,oe,P,He),de=new xg(v,ge),ve=new tg,Pe=new ag(q,oe),Je=new yp(v,y,O,Y,$,d,c),ie=new dg(v,$,oe),ae=new Mg(D,Te,oe,Y),Be=new bp(D,q,Te,oe),Ce=new Dp(D,q,Te,oe),Te.programs=Se.programs,v.capabilities=oe,v.extensions=q,v.properties=ge,v.renderLists=ve,v.shadowMap=ie,v.state=Y,v.info=Te}Ae();const ye=new vg(v,D);this.xr=ye,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const A=q.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=q.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(A){A!==void 0&&(K=A,this.setSize(B,G,!1))},this.getSize=function(A){return A.set(B,G)},this.setSize=function(A,F,H=!0){if(ye.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=A,G=F,t.width=Math.floor(A*K),t.height=Math.floor(F*K),H===!0&&(t.style.width=A+"px",t.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(B*K,G*K).floor()},this.setDrawingBufferSize=function(A,F,H){B=A,G=F,K=H,t.width=Math.floor(A*H),t.height=Math.floor(F*H),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(Q)},this.setViewport=function(A,F,H,V){A.isVector4?Q.set(A.x,A.y,A.z,A.w):Q.set(A,F,H,V),Y.viewport(R.copy(Q).multiplyScalar(K).floor())},this.getScissor=function(A){return A.copy(ee)},this.setScissor=function(A,F,H,V){A.isVector4?ee.set(A.x,A.y,A.z,A.w):ee.set(A,F,H,V),Y.scissor(N.copy(ee).multiplyScalar(K).floor())},this.getScissorTest=function(){return pe},this.setScissorTest=function(A){Y.setScissorTest(pe=A)},this.setOpaqueSort=function(A){Z=A},this.setTransparentSort=function(A){X=A},this.getClearColor=function(A){return A.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(A=!0,F=!0,H=!0){let V=0;if(A){let z=!1;if(w!==null){const xe=w.texture.format;z=xe===zc||xe===Bc||xe===Fc}if(z){const xe=w.texture.type,Re=xe===An||xe===bn||xe===ho||xe===Hn||xe===Nc||xe===Oc,Ne=Je.getClearColor(),ze=Je.getClearAlpha(),Xe=Ne.r,Ge=Ne.g,Ve=Ne.b;Re?(f[0]=Xe,f[1]=Ge,f[2]=Ve,f[3]=ze,D.clearBufferuiv(D.COLOR,0,f)):(g[0]=Xe,g[1]=Ge,g[2]=Ve,g[3]=ze,D.clearBufferiv(D.COLOR,0,g))}else V|=D.COLOR_BUFFER_BIT}F&&(V|=D.DEPTH_BUFFER_BIT),H&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),ve.dispose(),Pe.dispose(),ge.dispose(),y.dispose(),O.dispose(),$.dispose(),P.dispose(),ae.dispose(),Se.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",pt),ye.removeEventListener("sessionend",$e),we&&(we.dispose(),we=null),gt.stop()};function se(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const A=Te.autoReset,F=ie.enabled,H=ie.autoUpdate,V=ie.needsUpdate,z=ie.type;Ae(),Te.autoReset=A,ie.enabled=F,ie.autoUpdate=H,ie.needsUpdate=V,ie.type=z}function ce(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function fe(A){const F=A.target;F.removeEventListener("dispose",fe),Ue(F)}function Ue(A){Le(A),ge.remove(A)}function Le(A){const F=ge.get(A).programs;F!==void 0&&(F.forEach(function(H){Se.releaseProgram(H)}),A.isShaderMaterial&&Se.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,H,V,z,xe){F===null&&(F=be);const Re=z.isMesh&&z.matrixWorld.determinant()<0,Ne=Ll(A,F,H,V,z);Y.setMaterial(V,Re);let ze=H.index,Xe=1;if(V.wireframe===!0){if(ze=ne.getWireframeAttribute(H),ze===void 0)return;Xe=2}const Ge=H.drawRange,Ve=H.attributes.position;let mt=Ge.start*Xe,Ut=(Ge.start+Ge.count)*Xe;xe!==null&&(mt=Math.max(mt,xe.start*Xe),Ut=Math.min(Ut,(xe.start+xe.count)*Xe)),ze!==null?(mt=Math.max(mt,0),Ut=Math.min(Ut,ze.count)):Ve!=null&&(mt=Math.max(mt,0),Ut=Math.min(Ut,Ve.count));const yt=Ut-mt;if(yt<0||yt===1/0)return;P.setup(z,V,Ne,H,ze);let rn,lt=Be;if(ze!==null&&(rn=re.get(ze),lt=Ce,lt.setIndex(rn)),z.isMesh)V.wireframe===!0?(Y.setLineWidth(V.wireframeLinewidth*Oe()),lt.setMode(D.LINES)):lt.setMode(D.TRIANGLES);else if(z.isLine){let Ye=V.linewidth;Ye===void 0&&(Ye=1),Y.setLineWidth(Ye*Oe()),z.isLineSegments?lt.setMode(D.LINES):z.isLineLoop?lt.setMode(D.LINE_LOOP):lt.setMode(D.LINE_STRIP)}else z.isPoints?lt.setMode(D.POINTS):z.isSprite&&lt.setMode(D.TRIANGLES);if(z.isBatchedMesh)lt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)lt.renderInstances(mt,yt,z.count);else if(H.isInstancedBufferGeometry){const Ye=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,is=Math.min(H.instanceCount,Ye);lt.renderInstances(mt,yt,is)}else lt.render(mt,yt)};function Ze(A,F,H){A.transparent===!0&&A.side===zt&&A.forceSinglePass===!1?(A.side=It,A.needsUpdate=!0,rr(A,F,H),A.side=Rn,A.needsUpdate=!0,rr(A,F,H),A.side=zt):rr(A,F,H)}this.compile=function(A,F,H=null){H===null&&(H=A),m=Pe.get(H),m.init(),b.push(m),H.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),A!==H&&A.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(v._useLegacyLights);const V=new Set;return A.traverse(function(z){const xe=z.material;if(xe)if(Array.isArray(xe))for(let Re=0;Re<xe.length;Re++){const Ne=xe[Re];Ze(Ne,H,z),V.add(Ne)}else Ze(xe,H,z),V.add(xe)}),b.pop(),m=null,V},this.compileAsync=function(A,F,H=null){const V=this.compile(A,F,H);return new Promise(z=>{function xe(){if(V.forEach(function(Re){ge.get(Re).currentProgram.isReady()&&V.delete(Re)}),V.size===0){z(A);return}setTimeout(xe,10)}q.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let je=null;function ut(A){je&&je(A)}function pt(){gt.stop()}function $e(){gt.start()}const gt=new nl;gt.setAnimationLoop(ut),typeof self<"u"&&gt.setContext(self),this.setAnimationLoop=function(A){je=A,ye.setAnimationLoop(A),A===null?gt.stop():gt.start()},ye.addEventListener("sessionstart",pt),ye.addEventListener("sessionend",$e),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(F),F=ye.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,F,w),m=Pe.get(A,b.length),m.init(),b.push(m),Me.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),k.setFromProjectionMatrix(Me),me=this.localClippingEnabled,te=He.init(this.clippingPlanes,me),_=ve.get(A,p.length),_.init(),p.push(_),Qt(A,F,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(Z,X),this.info.render.frame++,te===!0&&He.beginShadows();const H=m.state.shadowsArray;if(ie.render(H,A,F),te===!0&&He.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(_,A),m.setupLights(v._useLegacyLights),F.isArrayCamera){const V=F.cameras;for(let z=0,xe=V.length;z<xe;z++){const Re=V[z];Eo(_,A,Re,Re.viewport)}}else Eo(_,A,F);w!==null&&(E.updateMultisampleRenderTarget(w),E.updateRenderTargetMipmap(w)),A.isScene===!0&&A.onAfterRender(v,A,F),P.resetDefaultState(),U=-1,S=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Qt(A,F,H,V){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)H=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||k.intersectsSprite(A)){V&&Fe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Me);const Re=$.update(A),Ne=A.material;Ne.visible&&_.push(A,Re,Ne,H,Fe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||k.intersectsObject(A))){const Re=$.update(A),Ne=A.material;if(V&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Fe.copy(A.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Fe.copy(Re.boundingSphere.center)),Fe.applyMatrix4(A.matrixWorld).applyMatrix4(Me)),Array.isArray(Ne)){const ze=Re.groups;for(let Xe=0,Ge=ze.length;Xe<Ge;Xe++){const Ve=ze[Xe],mt=Ne[Ve.materialIndex];mt&&mt.visible&&_.push(A,Re,mt,H,Fe.z,Ve)}}else Ne.visible&&_.push(A,Re,Ne,H,Fe.z,null)}}const xe=A.children;for(let Re=0,Ne=xe.length;Re<Ne;Re++)Qt(xe[Re],F,H,V)}function Eo(A,F,H,V){const z=A.opaque,xe=A.transmissive,Re=A.transparent;m.setupLightsView(H),te===!0&&He.setGlobalState(v.clippingPlanes,H),xe.length>0&&Pl(z,xe,F,H),V&&Y.viewport(R.copy(V)),z.length>0&&ir(z,F,H),xe.length>0&&ir(xe,F,H),Re.length>0&&ir(Re,F,H),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function Pl(A,F,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const xe=oe.isWebGL2;we===null&&(we=new Wn(1,1,{generateMipmaps:!0,type:q.has("EXT_color_buffer_half_float")?Ki:An,minFilter:ji,samples:xe?4:0})),v.getDrawingBufferSize(Ie),xe?we.setSize(Ie.x,Ie.y):we.setSize(Wr(Ie.x),Wr(Ie.y));const Re=v.getRenderTarget();v.setRenderTarget(we),v.getClearColor(J),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const Ne=v.toneMapping;v.toneMapping=Tn,ir(A,H,V),E.updateMultisampleRenderTarget(we),E.updateRenderTargetMipmap(we);let ze=!1;for(let Xe=0,Ge=F.length;Xe<Ge;Xe++){const Ve=F[Xe],mt=Ve.object,Ut=Ve.geometry,yt=Ve.material,rn=Ve.group;if(yt.side===zt&&mt.layers.test(V.layers)){const lt=yt.side;yt.side=It,yt.needsUpdate=!0,wo(mt,H,V,Ut,yt,rn),yt.side=lt,yt.needsUpdate=!0,ze=!0}}ze===!0&&(E.updateMultisampleRenderTarget(we),E.updateRenderTargetMipmap(we)),v.setRenderTarget(Re),v.setClearColor(J,L),v.toneMapping=Ne}function ir(A,F,H){const V=F.isScene===!0?F.overrideMaterial:null;for(let z=0,xe=A.length;z<xe;z++){const Re=A[z],Ne=Re.object,ze=Re.geometry,Xe=V===null?Re.material:V,Ge=Re.group;Ne.layers.test(H.layers)&&wo(Ne,F,H,ze,Xe,Ge)}}function wo(A,F,H,V,z,xe){A.onBeforeRender(v,F,H,V,z,xe),A.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),z.onBeforeRender(v,F,H,V,A,xe),z.transparent===!0&&z.side===zt&&z.forceSinglePass===!1?(z.side=It,z.needsUpdate=!0,v.renderBufferDirect(H,F,V,z,A,xe),z.side=Rn,z.needsUpdate=!0,v.renderBufferDirect(H,F,V,z,A,xe),z.side=zt):v.renderBufferDirect(H,F,V,z,A,xe),A.onAfterRender(v,F,H,V,z,xe)}function rr(A,F,H){F.isScene!==!0&&(F=be);const V=ge.get(A),z=m.state.lights,xe=m.state.shadowsArray,Re=z.state.version,Ne=Se.getParameters(A,z.state,xe,F,H),ze=Se.getProgramCacheKey(Ne);let Xe=V.programs;V.environment=A.isMeshStandardMaterial?F.environment:null,V.fog=F.fog,V.envMap=(A.isMeshStandardMaterial?O:y).get(A.envMap||V.environment),Xe===void 0&&(A.addEventListener("dispose",fe),Xe=new Map,V.programs=Xe);let Ge=Xe.get(ze);if(Ge!==void 0){if(V.currentProgram===Ge&&V.lightsStateVersion===Re)return Ao(A,Ne),Ge}else Ne.uniforms=Se.getUniforms(A),A.onBuild(H,Ne,v),A.onBeforeCompile(Ne,v),Ge=Se.acquireProgram(Ne,ze),Xe.set(ze,Ge),V.uniforms=Ne.uniforms;const Ve=V.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ve.clippingPlanes=He.uniform),Ao(A,Ne),V.needsLights=Il(A),V.lightsStateVersion=Re,V.needsLights&&(Ve.ambientLightColor.value=z.state.ambient,Ve.lightProbe.value=z.state.probe,Ve.directionalLights.value=z.state.directional,Ve.directionalLightShadows.value=z.state.directionalShadow,Ve.spotLights.value=z.state.spot,Ve.spotLightShadows.value=z.state.spotShadow,Ve.rectAreaLights.value=z.state.rectArea,Ve.ltc_1.value=z.state.rectAreaLTC1,Ve.ltc_2.value=z.state.rectAreaLTC2,Ve.pointLights.value=z.state.point,Ve.pointLightShadows.value=z.state.pointShadow,Ve.hemisphereLights.value=z.state.hemi,Ve.directionalShadowMap.value=z.state.directionalShadowMap,Ve.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ve.spotShadowMap.value=z.state.spotShadowMap,Ve.spotLightMatrix.value=z.state.spotLightMatrix,Ve.spotLightMap.value=z.state.spotLightMap,Ve.pointShadowMap.value=z.state.pointShadowMap,Ve.pointShadowMatrix.value=z.state.pointShadowMatrix),V.currentProgram=Ge,V.uniformsList=null,Ge}function To(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=Or.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function Ao(A,F){const H=ge.get(A);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function Ll(A,F,H,V,z){F.isScene!==!0&&(F=be),E.resetTextureUnits();const xe=F.fog,Re=V.isMeshStandardMaterial?F.environment:null,Ne=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:fn,ze=(V.isMeshStandardMaterial?O:y).get(V.envMap||Re),Xe=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ge=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ve=!!H.morphAttributes.position,mt=!!H.morphAttributes.normal,Ut=!!H.morphAttributes.color;let yt=Tn;V.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(yt=v.toneMapping);const rn=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,lt=rn!==void 0?rn.length:0,Ye=ge.get(V),is=m.state.lights;if(te===!0&&(me===!0||A!==S)){const Vt=A===S&&V.id===U;He.setState(V,A,Vt)}let dt=!1;V.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==is.state.version||Ye.outputColorSpace!==Ne||z.isBatchedMesh&&Ye.batching===!1||!z.isBatchedMesh&&Ye.batching===!0||z.isInstancedMesh&&Ye.instancing===!1||!z.isInstancedMesh&&Ye.instancing===!0||z.isSkinnedMesh&&Ye.skinning===!1||!z.isSkinnedMesh&&Ye.skinning===!0||z.isInstancedMesh&&Ye.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ye.instancingColor===!1&&z.instanceColor!==null||Ye.envMap!==ze||V.fog===!0&&Ye.fog!==xe||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==He.numPlanes||Ye.numIntersection!==He.numIntersection)||Ye.vertexAlphas!==Xe||Ye.vertexTangents!==Ge||Ye.morphTargets!==Ve||Ye.morphNormals!==mt||Ye.morphColors!==Ut||Ye.toneMapping!==yt||oe.isWebGL2===!0&&Ye.morphTargetsCount!==lt)&&(dt=!0):(dt=!0,Ye.__version=V.version);let Ln=Ye.currentProgram;dt===!0&&(Ln=rr(V,F,z));let Ro=!1,Ni=!1,rs=!1;const wt=Ln.getUniforms(),Dn=Ye.uniforms;if(Y.useProgram(Ln.program)&&(Ro=!0,Ni=!0,rs=!0),V.id!==U&&(U=V.id,Ni=!0),Ro||S!==A){wt.setValue(D,"projectionMatrix",A.projectionMatrix),wt.setValue(D,"viewMatrix",A.matrixWorldInverse);const Vt=wt.map.cameraPosition;Vt!==void 0&&Vt.setValue(D,Fe.setFromMatrixPosition(A.matrixWorld)),oe.logarithmicDepthBuffer&&wt.setValue(D,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&wt.setValue(D,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Ni=!0,rs=!0)}if(z.isSkinnedMesh){wt.setOptional(D,z,"bindMatrix"),wt.setOptional(D,z,"bindMatrixInverse");const Vt=z.skeleton;Vt&&(oe.floatVertexTextures?(Vt.boneTexture===null&&Vt.computeBoneTexture(),wt.setValue(D,"boneTexture",Vt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}z.isBatchedMesh&&(wt.setOptional(D,z,"batchingTexture"),wt.setValue(D,"batchingTexture",z._matricesTexture,E));const ss=H.morphAttributes;if((ss.position!==void 0||ss.normal!==void 0||ss.color!==void 0&&oe.isWebGL2===!0)&&ke.update(z,H,Ln),(Ni||Ye.receiveShadow!==z.receiveShadow)&&(Ye.receiveShadow=z.receiveShadow,wt.setValue(D,"receiveShadow",z.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Dn.envMap.value=ze,Dn.flipEnvMap.value=ze.isCubeTexture&&ze.isRenderTargetTexture===!1?-1:1),Ni&&(wt.setValue(D,"toneMappingExposure",v.toneMappingExposure),Ye.needsLights&&Dl(Dn,rs),xe&&V.fog===!0&&de.refreshFogUniforms(Dn,xe),de.refreshMaterialUniforms(Dn,V,K,G,we),Or.upload(D,To(Ye),Dn,E)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Or.upload(D,To(Ye),Dn,E),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&wt.setValue(D,"center",z.center),wt.setValue(D,"modelViewMatrix",z.modelViewMatrix),wt.setValue(D,"normalMatrix",z.normalMatrix),wt.setValue(D,"modelMatrix",z.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Vt=V.uniformsGroups;for(let os=0,Ul=Vt.length;os<Ul;os++)if(oe.isWebGL2){const Co=Vt[os];ae.update(Co,Ln),ae.bind(Co,Ln)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ln}function Dl(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function Il(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(A,F,H){ge.get(A.texture).__webglTexture=F,ge.get(A.depthTexture).__webglTexture=H;const V=ge.get(A);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,F){const H=ge.get(A);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,H=0){w=A,C=F,T=H;let V=!0,z=null,xe=!1,Re=!1;if(A){const ze=ge.get(A);ze.__useDefaultFramebuffer!==void 0?(Y.bindFramebuffer(D.FRAMEBUFFER,null),V=!1):ze.__webglFramebuffer===void 0?E.setupRenderTarget(A):ze.__hasExternalTextures&&E.rebindTextures(A,ge.get(A.texture).__webglTexture,ge.get(A.depthTexture).__webglTexture);const Xe=A.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Re=!0);const Ge=ge.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ge[F])?z=Ge[F][H]:z=Ge[F],xe=!0):oe.isWebGL2&&A.samples>0&&E.useMultisampledRTT(A)===!1?z=ge.get(A).__webglMultisampledFramebuffer:Array.isArray(Ge)?z=Ge[H]:z=Ge,R.copy(A.viewport),N.copy(A.scissor),W=A.scissorTest}else R.copy(Q).multiplyScalar(K).floor(),N.copy(ee).multiplyScalar(K).floor(),W=pe;if(Y.bindFramebuffer(D.FRAMEBUFFER,z)&&oe.drawBuffers&&V&&Y.drawBuffers(A,z),Y.viewport(R),Y.scissor(N),Y.setScissorTest(W),xe){const ze=ge.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,ze.__webglTexture,H)}else if(Re){const ze=ge.get(A.texture),Xe=F||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,ze.__webglTexture,H||0,Xe)}U=-1},this.readRenderTargetPixels=function(A,F,H,V,z,xe,Re){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Re!==void 0&&(Ne=Ne[Re]),Ne){Y.bindFramebuffer(D.FRAMEBUFFER,Ne);try{const ze=A.texture,Xe=ze.format,Ge=ze.type;if(Xe!==Jt&&_e.convert(Xe)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=Ge===Ki&&(q.has("EXT_color_buffer_half_float")||oe.isWebGL2&&q.has("EXT_color_buffer_float"));if(Ge!==An&&_e.convert(Ge)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ge===En&&(oe.isWebGL2||q.has("OES_texture_float")||q.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-V&&H>=0&&H<=A.height-z&&D.readPixels(F,H,V,z,_e.convert(Xe),_e.convert(Ge),xe)}finally{const ze=w!==null?ge.get(w).__webglFramebuffer:null;Y.bindFramebuffer(D.FRAMEBUFFER,ze)}}},this.copyFramebufferToTexture=function(A,F,H=0){const V=Math.pow(2,-H),z=Math.floor(F.image.width*V),xe=Math.floor(F.image.height*V);E.setTexture2D(F,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,A.x,A.y,z,xe),Y.unbindTexture()},this.copyTextureToTexture=function(A,F,H,V=0){const z=F.image.width,xe=F.image.height,Re=_e.convert(H.format),Ne=_e.convert(H.type);E.setTexture2D(H,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,H.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,H.unpackAlignment),F.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,V,A.x,A.y,z,xe,Re,Ne,F.image.data):F.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,V,A.x,A.y,F.mipmaps[0].width,F.mipmaps[0].height,Re,F.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,V,A.x,A.y,Re,Ne,F.image),V===0&&H.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Y.unbindTexture()},this.copyTextureToTexture3D=function(A,F,H,V,z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const xe=A.max.x-A.min.x+1,Re=A.max.y-A.min.y+1,Ne=A.max.z-A.min.z+1,ze=_e.convert(V.format),Xe=_e.convert(V.type);let Ge;if(V.isData3DTexture)E.setTexture3D(V,0),Ge=D.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)E.setTexture2DArray(V,0),Ge=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,V.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,V.unpackAlignment);const Ve=D.getParameter(D.UNPACK_ROW_LENGTH),mt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Ut=D.getParameter(D.UNPACK_SKIP_PIXELS),yt=D.getParameter(D.UNPACK_SKIP_ROWS),rn=D.getParameter(D.UNPACK_SKIP_IMAGES),lt=H.isCompressedTexture?H.mipmaps[z]:H.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,lt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,lt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,A.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,A.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,A.min.z),H.isDataTexture||H.isData3DTexture?D.texSubImage3D(Ge,z,F.x,F.y,F.z,xe,Re,Ne,ze,Xe,lt.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Ge,z,F.x,F.y,F.z,xe,Re,Ne,ze,lt.data)):D.texSubImage3D(Ge,z,F.x,F.y,F.z,xe,Re,Ne,ze,Xe,lt),D.pixelStorei(D.UNPACK_ROW_LENGTH,Ve),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ut),D.pixelStorei(D.UNPACK_SKIP_ROWS,yt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,rn),z===0&&V.generateMipmaps&&D.generateMipmap(Ge),Y.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?E.setTextureCube(A,0):A.isData3DTexture?E.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?E.setTexture2DArray(A,0):E.setTexture2D(A,0),Y.unbindTexture()},this.resetState=function(){C=0,T=0,w=null,Y.reset(),P.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===uo?"display-p3":"srgb",t.unpackColorSpace=tt.workingColorSpace===Kr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===bt?Vn:Gc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Vn?bt:fn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class yg extends hl{}yg.prototype.isWebGL1Renderer=!0;class ul extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Ka extends $t{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const gi=new st,Ja=new st,Ar=[],$a=new Zn,Sg=new st,Hi=new De,Gi=new tr;class bg extends De{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ka(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Sg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gi),$a.copy(e.boundingBox).applyMatrix4(gi),this.boundingBox.union($a)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new tr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gi),Gi.copy(e.boundingSphere).applyMatrix4(gi),this.boundingSphere.union(Gi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Hi.geometry=this.geometry,Hi.material=this.material,Hi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gi.copy(this.boundingSphere),Gi.applyMatrix4(n),e.ray.intersectsSphere(Gi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,gi),Ja.multiplyMatrices(n,gi),Hi.matrixWorld=Ja,Hi.raycast(e,Ar);for(let o=0,a=Ar.length;o<a;o++){const c=Ar[o];c.instanceId=s,c.object=this,t.push(c)}Ar.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ka(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class av extends Rt{constructor(e,t,n,r,s,o,a,c,l,h,u,d){super(null,o,a,c,l,h,r,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class Eg extends Rt{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const h=n[r],d=n[r+1]-h,f=(o-h)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new j:new x);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new x,r=[],s=[],o=[],a=new x,c=new st;for(let f=0;f<=e;f++){const g=f/e;r[f]=this.getTangentAt(g,new x)}s[0]=new x,o[0]=new x;let l=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(vt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(vt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class go extends tn{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){const n=t||new j,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class wg extends go{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function _o(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,u){let d=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,r(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const Rr=new x,Os=new _o,Fs=new _o,Bs=new _o;class Tg extends tn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new x){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=r[(a-1)%s]:(Rr.subVectors(r[0],r[1]).add(r[0]),l=Rr);const u=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Rr.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Rr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Os.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),Fs.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),Bs.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Os.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Fs.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Bs.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Os.calc(c),Fs.calc(c),Bs.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new x().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Qa(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function Ag(i,e){const t=1-i;return t*t*e}function Rg(i,e){return 2*(1-i)*i*e}function Cg(i,e){return i*i*e}function Yi(i,e,t,n){return Ag(i,e)+Rg(i,t)+Cg(i,n)}function Pg(i,e){const t=1-i;return t*t*t*e}function Lg(i,e){const t=1-i;return 3*t*t*i*e}function Dg(i,e){return 3*(1-i)*i*i*e}function Ig(i,e){return i*i*i*e}function qi(i,e,t,n,r){return Pg(i,e)+Lg(i,t)+Dg(i,n)+Ig(i,r)}class dl extends tn{constructor(e=new j,t=new j,n=new j,r=new j){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new j){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(qi(e,r.x,s.x,o.x,a.x),qi(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ug extends tn{constructor(e=new x,t=new x,n=new x,r=new x){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new x){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(qi(e,r.x,s.x,o.x,a.x),qi(e,r.y,s.y,o.y,a.y),qi(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fl extends tn{constructor(e=new j,t=new j){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new j){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new j){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ng extends tn{constructor(e=new x,t=new x){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new x){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new x){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pl extends tn{constructor(e=new j,t=new j,n=new j){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new j){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Yi(e,r.x,s.x,o.x),Yi(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Og extends tn{constructor(e=new x,t=new x,n=new x){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new x){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Yi(e,r.x,s.x,o.x),Yi(e,r.y,s.y,o.y),Yi(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ml extends tn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new j){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return n.set(Qa(a,c.x,l.x,h.x,u.x),Qa(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new j().fromArray(r))}return this}}var no=Object.freeze({__proto__:null,ArcCurve:wg,CatmullRomCurve3:Tg,CubicBezierCurve:dl,CubicBezierCurve3:Ug,EllipseCurve:go,LineCurve:fl,LineCurve3:Ng,QuadraticBezierCurve:pl,QuadraticBezierCurve3:Og,SplineCurve:ml});class Fg extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new no[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new no[r.type]().fromJSON(r))}return this}}class Xr extends Fg{constructor(e){super(),this.type="Path",this.currentPoint=new j,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new fl(this.currentPoint.clone(),new j(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new pl(this.currentPoint.clone(),new j(e,t),new j(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new dl(this.currentPoint.clone(),new j(e,t),new j(n,r),new j(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new ml(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){const l=new go(e,t,n,r,s,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ui extends Gt{constructor(e=[new j(0,-.5),new j(.5,0),new j(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=vt(r,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],h=1/t,u=new x,d=new j,f=new x,g=new x,_=new x;let m=0,p=0;for(let b=0;b<=e.length-1;b++)switch(b){case 0:m=e[b+1].x-e[b].x,p=e[b+1].y-e[b].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[b+1].x-e[b].x,p=e[b+1].y-e[b].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let b=0;b<=t;b++){const v=n+b*h*r,M=Math.sin(v),C=Math.cos(v);for(let T=0;T<=e.length-1;T++){u.x=e[T].x*M,u.y=e[T].y,u.z=e[T].x*C,o.push(u.x,u.y,u.z),d.x=b/t,d.y=T/(e.length-1),a.push(d.x,d.y);const w=c[3*T+0]*M,U=c[3*T+1],S=c[3*T+0]*C;l.push(w,U,S)}}for(let b=0;b<t;b++)for(let v=0;v<e.length-1;v++){const M=v+b*e.length,C=M,T=M+e.length,w=M+e.length+1,U=M+1;s.push(C,T,U),s.push(w,U,T)}this.setIndex(s),this.setAttribute("position",new ct(o,3)),this.setAttribute("uv",new ct(a,2)),this.setAttribute("normal",new ct(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ui(e.points,e.segments,e.phiStart,e.phiLength)}}class es extends Gt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],c=[],l=new x,h=new j;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*r;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new ct(o,3)),this.setAttribute("normal",new ct(a,3)),this.setAttribute("uv",new ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new es(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class dn extends Gt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;b(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ct(u,3)),this.setAttribute("normal",new ct(d,3)),this.setAttribute("uv",new ct(f,2));function b(){const M=new x,C=new x;let T=0;const w=(t-e)/n;for(let U=0;U<=s;U++){const S=[],R=U/s,N=R*(t-e)+e;for(let W=0;W<=r;W++){const J=W/r,L=J*c+a,B=Math.sin(L),G=Math.cos(L);C.x=N*B,C.y=-R*n+m,C.z=N*G,u.push(C.x,C.y,C.z),M.set(B,w,G).normalize(),d.push(M.x,M.y,M.z),f.push(J,1-R),S.push(g++)}_.push(S)}for(let U=0;U<r;U++)for(let S=0;S<s;S++){const R=_[S][U],N=_[S+1][U],W=_[S+1][U+1],J=_[S][U+1];h.push(R,N,J),h.push(N,W,J),T+=6}l.addGroup(p,T,0),p+=T}function v(M){const C=g,T=new j,w=new x;let U=0;const S=M===!0?e:t,R=M===!0?1:-1;for(let W=1;W<=r;W++)u.push(0,m*R,0),d.push(0,R,0),f.push(.5,.5),g++;const N=g;for(let W=0;W<=r;W++){const L=W/r*c+a,B=Math.cos(L),G=Math.sin(L);w.x=S*G,w.y=m*R,w.z=S*B,u.push(w.x,w.y,w.z),d.push(0,R,0),T.x=B*.5+.5,T.y=G*.5*R+.5,f.push(T.x,T.y),g++}for(let W=0;W<r;W++){const J=C+W,L=N+W;M===!0?h.push(L,L+1,J):h.push(L+1,L,J),U+=3}l.addGroup(p,U,M===!0?1:2),p+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pn extends Xr{constructor(e){super(e),this.uuid=qn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new Xr().fromJSON(r))}return this}}const Bg={triangulate:function(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=gl(i,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l,h,u,d,f;if(n&&(s=Wg(i,e,s,t)),i.length>80*t){a=l=i[0],c=h=i[1];for(let g=t;g<r;g+=t)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return $i(s,o,t,a,c,f,0),o}};function gl(i,e,t,n,r){let s,o;if(r===e0(i,e,t,n)>0)for(s=e;s<t;s+=n)o=ec(s,i[s],i[s+1],o);else for(s=t-n;s>=e;s-=n)o=ec(s,i[s],i[s+1],o);return o&&ts(o,o.next)&&(er(o),o=o.next),o}function Xn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ts(t,t.next)||ht(t.prev,t,t.next)===0)){if(er(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function $i(i,e,t,n,r,s,o){if(!i)return;!o&&s&&Zg(i,n,r,s);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,s?Hg(i,n,r,s):zg(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),er(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Gg(Xn(i),e,t),$i(i,e,t,n,r,s,2)):o===2&&Vg(i,e,t,n,r,s):$i(Xn(i),e,t,n,r,s,1);break}}}function zg(i){const e=i.prev,t=i,n=i.next;if(ht(e,t,n)>=0)return!1;const r=e.x,s=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=r<s?r<o?r:o:s<o?s:o,u=a<c?a<l?a:l:c<l?c:l,d=r>s?r>o?r:o:s>o?s:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&yi(r,a,s,c,o,l,g.x,g.y)&&ht(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Hg(i,e,t,n){const r=i.prev,s=i,o=i.next;if(ht(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,h=r.y,u=s.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=io(f,g,e,t,n),b=io(_,m,e,t,n);let v=i.prevZ,M=i.nextZ;for(;v&&v.z>=p&&M&&M.z<=b;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&yi(a,h,c,u,l,d,v.x,v.y)&&ht(v.prev,v,v.next)>=0||(v=v.prevZ,M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==o&&yi(a,h,c,u,l,d,M.x,M.y)&&ht(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&yi(a,h,c,u,l,d,v.x,v.y)&&ht(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;M&&M.z<=b;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==o&&yi(a,h,c,u,l,d,M.x,M.y)&&ht(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Gg(i,e,t){let n=i;do{const r=n.prev,s=n.next.next;!ts(r,s)&&_l(r,n,n.next,s)&&Qi(r,s)&&Qi(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),er(n),er(n.next),n=i=s),n=n.next}while(n!==i);return Xn(n)}function Vg(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Jg(o,a)){let c=vl(o,a);o=Xn(o,o.next),c=Xn(c,c.next),$i(o,e,t,n,r,s,0),$i(c,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Wg(i,e,t,n){const r=[];let s,o,a,c,l;for(s=0,o=e.length;s<o;s++)a=e[s]*n,c=s<o-1?e[s+1]*n:i.length,l=gl(i,a,c,n,!1),l===l.next&&(l.steiner=!0),r.push(Kg(l));for(r.sort(kg),s=0;s<r.length;s++)t=Xg(r[s],t);return t}function kg(i,e){return i.x-e.x}function Xg(i,e){const t=Yg(i,e);if(!t)return e;const n=vl(t,i);return Xn(n,n.next),Xn(t,t.next)}function Yg(i,e){let t=e,n=-1/0,r;const s=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,r=t.x<t.next.x?t:t.next,d===s))return r}t=t.next}while(t!==e);if(!r)return null;const a=r,c=r.x,l=r.y;let h=1/0,u;t=r;do s>=t.x&&t.x>=c&&s!==t.x&&yi(o<l?s:n,o,c,l,o<l?n:s,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(s-t.x),Qi(t,i)&&(u<h||u===h&&(t.x>r.x||t.x===r.x&&qg(r,t)))&&(r=t,h=u)),t=t.next;while(t!==a);return r}function qg(i,e){return ht(i.prev,i,e.prev)<0&&ht(e.next,i,i.next)<0}function Zg(i,e,t,n){let r=i;do r.z===0&&(r.z=io(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,jg(r)}function jg(i){let e,t,n,r,s,o,a,c,l=1;do{for(t=i,i=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,a--):(r=n,n=n.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,l*=2}while(o>1);return i}function io(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Kg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function yi(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function Jg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!$g(i,e)&&(Qi(i,e)&&Qi(e,i)&&Qg(i,e)&&(ht(i.prev,i,e.prev)||ht(i,e.prev,e))||ts(i,e)&&ht(i.prev,i,i.next)>0&&ht(e.prev,e,e.next)>0)}function ht(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ts(i,e){return i.x===e.x&&i.y===e.y}function _l(i,e,t,n){const r=Pr(ht(i,e,t)),s=Pr(ht(i,e,n)),o=Pr(ht(t,n,i)),a=Pr(ht(t,n,e));return!!(r!==s&&o!==a||r===0&&Cr(i,t,e)||s===0&&Cr(i,n,e)||o===0&&Cr(t,i,n)||a===0&&Cr(t,e,n))}function Cr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Pr(i){return i>0?1:i<0?-1:0}function $g(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&_l(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Qi(i,e){return ht(i.prev,i,i.next)<0?ht(i,e,i.next)>=0&&ht(i,i.prev,e)>=0:ht(i,e,i.prev)<0||ht(i,i.next,e)<0}function Qg(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function vl(i,e){const t=new ro(i.i,i.x,i.y),n=new ro(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function ec(i,e,t,n){const r=new ro(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function er(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ro(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function e0(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class Zi{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Zi.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];tc(e),nc(n,e);let o=e.length;t.forEach(tc);for(let c=0;c<t.length;c++)r.push(o),o+=t[c].length,nc(n,t[c]);const a=Bg.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function tc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function nc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class mn extends Gt{constructor(e=new Pn([new j(.5,.5),new j(-.5,.5),new j(-.5,-.5),new j(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],s=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new ct(r,3)),this.setAttribute("uv",new ct(s,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:t0;let v,M=!1,C,T,w,U;p&&(v=p.getSpacedPoints(h),M=!0,d=!1,C=p.computeFrenetFrames(h,!1),T=new x,w=new x,U=new x),d||(m=0,f=0,g=0,_=0);const S=a.extractPoints(l);let R=S.shape;const N=S.holes;if(!Zi.isClockWise(R)){R=R.reverse();for(let D=0,he=N.length;D<he;D++){const q=N[D];Zi.isClockWise(q)&&(N[D]=q.reverse())}}const J=Zi.triangulateShape(R,N),L=R;for(let D=0,he=N.length;D<he;D++){const q=N[D];R=R.concat(q)}function B(D,he,q){return he||console.error("THREE.ExtrudeGeometry: vec does not exist"),D.clone().addScaledVector(he,q)}const G=R.length,K=J.length;function Z(D,he,q){let oe,Y,Te;const ge=D.x-he.x,E=D.y-he.y,y=q.x-D.x,O=q.y-D.y,re=ge*ge+E*E,ne=ge*O-E*y;if(Math.abs(ne)>Number.EPSILON){const $=Math.sqrt(re),Se=Math.sqrt(y*y+O*O),de=he.x-E/$,ve=he.y+ge/$,Pe=q.x-O/Se,He=q.y+y/Se,ie=((Pe-de)*O-(He-ve)*y)/(ge*O-E*y);oe=de+ge*ie-D.x,Y=ve+E*ie-D.y;const Je=oe*oe+Y*Y;if(Je<=2)return new j(oe,Y);Te=Math.sqrt(Je/2)}else{let $=!1;ge>Number.EPSILON?y>Number.EPSILON&&($=!0):ge<-Number.EPSILON?y<-Number.EPSILON&&($=!0):Math.sign(E)===Math.sign(O)&&($=!0),$?(oe=-E,Y=ge,Te=Math.sqrt(re)):(oe=ge,Y=E,Te=Math.sqrt(re/2))}return new j(oe/Te,Y/Te)}const X=[];for(let D=0,he=L.length,q=he-1,oe=D+1;D<he;D++,q++,oe++)q===he&&(q=0),oe===he&&(oe=0),X[D]=Z(L[D],L[q],L[oe]);const Q=[];let ee,pe=X.concat();for(let D=0,he=N.length;D<he;D++){const q=N[D];ee=[];for(let oe=0,Y=q.length,Te=Y-1,ge=oe+1;oe<Y;oe++,Te++,ge++)Te===Y&&(Te=0),ge===Y&&(ge=0),ee[oe]=Z(q[oe],q[Te],q[ge]);Q.push(ee),pe=pe.concat(ee)}for(let D=0;D<m;D++){const he=D/m,q=f*Math.cos(he*Math.PI/2),oe=g*Math.sin(he*Math.PI/2)+_;for(let Y=0,Te=L.length;Y<Te;Y++){const ge=B(L[Y],X[Y],oe);Me(ge.x,ge.y,-q)}for(let Y=0,Te=N.length;Y<Te;Y++){const ge=N[Y];ee=Q[Y];for(let E=0,y=ge.length;E<y;E++){const O=B(ge[E],ee[E],oe);Me(O.x,O.y,-q)}}}const k=g+_;for(let D=0;D<G;D++){const he=d?B(R[D],pe[D],k):R[D];M?(w.copy(C.normals[0]).multiplyScalar(he.x),T.copy(C.binormals[0]).multiplyScalar(he.y),U.copy(v[0]).add(w).add(T),Me(U.x,U.y,U.z)):Me(he.x,he.y,0)}for(let D=1;D<=h;D++)for(let he=0;he<G;he++){const q=d?B(R[he],pe[he],k):R[he];M?(w.copy(C.normals[D]).multiplyScalar(q.x),T.copy(C.binormals[D]).multiplyScalar(q.y),U.copy(v[D]).add(w).add(T),Me(U.x,U.y,U.z)):Me(q.x,q.y,u/h*D)}for(let D=m-1;D>=0;D--){const he=D/m,q=f*Math.cos(he*Math.PI/2),oe=g*Math.sin(he*Math.PI/2)+_;for(let Y=0,Te=L.length;Y<Te;Y++){const ge=B(L[Y],X[Y],oe);Me(ge.x,ge.y,u+q)}for(let Y=0,Te=N.length;Y<Te;Y++){const ge=N[Y];ee=Q[Y];for(let E=0,y=ge.length;E<y;E++){const O=B(ge[E],ee[E],oe);M?Me(O.x,O.y+v[h-1].y,v[h-1].x+q):Me(O.x,O.y,u+q)}}}te(),me();function te(){const D=r.length/3;if(d){let he=0,q=G*he;for(let oe=0;oe<K;oe++){const Y=J[oe];Ie(Y[2]+q,Y[1]+q,Y[0]+q)}he=h+m*2,q=G*he;for(let oe=0;oe<K;oe++){const Y=J[oe];Ie(Y[0]+q,Y[1]+q,Y[2]+q)}}else{for(let he=0;he<K;he++){const q=J[he];Ie(q[2],q[1],q[0])}for(let he=0;he<K;he++){const q=J[he];Ie(q[0]+G*h,q[1]+G*h,q[2]+G*h)}}n.addGroup(D,r.length/3-D,0)}function me(){const D=r.length/3;let he=0;we(L,he),he+=L.length;for(let q=0,oe=N.length;q<oe;q++){const Y=N[q];we(Y,he),he+=Y.length}n.addGroup(D,r.length/3-D,1)}function we(D,he){let q=D.length;for(;--q>=0;){const oe=q;let Y=q-1;Y<0&&(Y=D.length-1);for(let Te=0,ge=h+m*2;Te<ge;Te++){const E=G*Te,y=G*(Te+1),O=he+oe+E,re=he+Y+E,ne=he+Y+y,$=he+oe+y;Fe(O,re,ne,$)}}}function Me(D,he,q){c.push(D),c.push(he),c.push(q)}function Ie(D,he,q){be(D),be(he),be(q);const oe=r.length/3,Y=b.generateTopUV(n,r,oe-3,oe-2,oe-1);Oe(Y[0]),Oe(Y[1]),Oe(Y[2])}function Fe(D,he,q,oe){be(D),be(he),be(oe),be(he),be(q),be(oe);const Y=r.length/3,Te=b.generateSideWallUV(n,r,Y-6,Y-3,Y-2,Y-1);Oe(Te[0]),Oe(Te[1]),Oe(Te[3]),Oe(Te[1]),Oe(Te[2]),Oe(Te[3])}function be(D){r.push(c[D*3+0]),r.push(c[D*3+1]),r.push(c[D*3+2])}function Oe(D){s.push(D.x),s.push(D.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return n0(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];n.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new no[r.type]().fromJSON(r)),new mn(n,e.options)}}const t0={generateTopUV:function(i,e,t,n,r){const s=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[r*3],h=e[r*3+1];return[new j(s,o),new j(a,c),new j(l,h)]},generateSideWallUV:function(i,e,t,n,r,s){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[r*3],f=e[r*3+1],g=e[r*3+2],_=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new j(o,1-c),new j(l,1-u),new j(d,1-g),new j(_,1-p)]:[new j(a,1-c),new j(h,1-u),new j(f,1-g),new j(m,1-p)]}};function n0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class vo extends Gt{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/r,f=new x,g=new j;for(let _=0;_<=r;_++){for(let m=0;m<=n;m++){const p=s+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<r;_++){const m=_*(n+1);for(let p=0;p<n;p++){const b=p+m,v=b,M=b+n+1,C=b+n+2,T=b+1;a.push(v,M,T),a.push(M,C,T)}}this.setIndex(a),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Kn extends Gt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new x,d=new x,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const b=[],v=p/n;let M=0;p===0&&o===0?M=.5/t:p===n&&c===Math.PI&&(M=-.5/t);for(let C=0;C<=t;C++){const T=C/t;u.x=-e*Math.cos(r+T*s)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(r+T*s)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(T+M,1-v),b.push(l++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const v=h[p][b+1],M=h[p][b],C=h[p+1][b],T=h[p+1][b+1];(p!==0||o>0)&&f.push(v,M,T),(p!==n-1||c<Math.PI)&&f.push(M,C,T)}this.setIndex(f),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ht extends nr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vc,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fr extends Ht{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new j(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ke(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ke(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ke(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xo extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class i0 extends xo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const zs=new st,ic=new x,rc=new x;class xl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new j(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new po,this._frameExtents=new j(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ic.setFromMatrixPosition(e.matrixWorld),t.position.copy(ic),rc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rc),t.updateMatrixWorld(),zs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zs),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(zs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const sc=new st,Vi=new x,Hs=new x;class r0 extends xl{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new j(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new x(1,0,0),new x(-1,0,0),new x(0,0,1),new x(0,0,-1),new x(0,1,0),new x(0,-1,0)],this._cubeUps=[new x(0,1,0),new x(0,1,0),new x(0,1,0),new x(0,1,0),new x(0,0,1),new x(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Vi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vi),Hs.copy(n.position),Hs.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Hs),n.updateMatrixWorld(),r.makeTranslation(-Vi.x,-Vi.y,-Vi.z),sc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sc)}}class s0 extends xo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new r0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class o0 extends xl{constructor(){super(new il(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oc extends xo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new o0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Mo="\\[\\]\\.:\\/",a0=new RegExp("["+Mo+"]","g"),yo="[^"+Mo+"]",c0="[^"+Mo.replace("\\.","")+"]",l0=/((?:WC+[\/:])*)/.source.replace("WC",yo),h0=/(WCOD+)?/.source.replace("WCOD",c0),u0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yo),d0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yo),f0=new RegExp("^"+l0+h0+u0+d0+"$"),p0=["material","materials","bones","map"];class m0{constructor(e,t,n){const r=n||et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class et{constructor(e,t,n){this.path=t,this.parsedPath=n||et.parseTrackName(t),this.node=et.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new et.Composite(e,t,n):new et(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(a0,"")}static parseTrackName(e){const t=f0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);p0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=et.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[r];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}et.Composite=m0;et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};et.prototype.GetterByBindingType=[et.prototype._getValue_direct,et.prototype._getValue_array,et.prototype._getValue_arrayElement,et.prototype._getValue_toArray];et.prototype.SetterByBindingTypeAndVersioning=[[et.prototype._setValue_direct,et.prototype._setValue_direct_setNeedsUpdate,et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[et.prototype._setValue_array,et.prototype._setValue_array_setNeedsUpdate,et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[et.prototype._setValue_arrayElement,et.prototype._setValue_arrayElement_setNeedsUpdate,et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[et.prototype._setValue_fromArray,et.prototype._setValue_fromArray_setNeedsUpdate,et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Ml{constructor(e){this.value=e}clone(){return new Ml(this.value.clone===void 0?this.value:this.value.clone())}}class ac{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(vt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lo);const cc={type:"change"},Gs={type:"start"},lc={type:"end"},Lr=new Zc,hc=new Sn,g0=Math.cos(70*pu.DEG2RAD);class _0 extends Yn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new x,this.cursor=new x,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$n.ROTATE,MIDDLE:$n.DOLLY,RIGHT:$n.PAN},this.touches={ONE:Qn.ROTATE,TWO:Qn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(P){P.addEventListener("keydown",Pe),this._domElementKeyEvents=P},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Pe),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(cc),n.update(),s=r.NONE},this.update=function(){const P=new x,ae=new Cn().setFromUnitVectors(e.up,new x(0,1,0)),Ae=ae.clone().invert(),ye=new x,se=new Cn,I=new x,ce=2*Math.PI;return function(Ue=null){const Le=n.object.position;P.copy(Le).sub(n.target),P.applyQuaternion(ae),a.setFromVector3(P),n.autoRotate&&s===r.NONE&&W(R(Ue)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let Ze=n.minAzimuthAngle,je=n.maxAzimuthAngle;isFinite(Ze)&&isFinite(je)&&(Ze<-Math.PI?Ze+=ce:Ze>Math.PI&&(Ze-=ce),je<-Math.PI?je+=ce:je>Math.PI&&(je-=ce),Ze<=je?a.theta=Math.max(Ze,Math.min(je,a.theta)):a.theta=a.theta>(Ze+je)/2?Math.max(Ze,a.theta):Math.min(je,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&T||n.object.isOrthographicCamera?a.radius=Q(a.radius):a.radius=Q(a.radius*l),P.setFromSpherical(a),P.applyQuaternion(Ae),Le.copy(n.target).add(P),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let ut=!1;if(n.zoomToCursor&&T){let pt=null;if(n.object.isPerspectiveCamera){const $e=P.length();pt=Q($e*l);const gt=$e-pt;n.object.position.addScaledVector(M,gt),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const $e=new x(C.x,C.y,0);$e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),ut=!0;const gt=new x(C.x,C.y,0);gt.unproject(n.object),n.object.position.sub(gt).add($e),n.object.updateMatrixWorld(),pt=P.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;pt!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(pt).add(n.object.position):(Lr.origin.copy(n.object.position),Lr.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Lr.direction))<g0?e.lookAt(n.target):(hc.setFromNormalAndCoplanarPoint(n.object.up,n.target),Lr.intersectPlane(hc,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),ut=!0);return l=1,T=!1,ut||ye.distanceToSquared(n.object.position)>o||8*(1-se.dot(n.object.quaternion))>o||I.distanceToSquared(n.target)>0?(n.dispatchEvent(cc),ye.copy(n.object.position),se.copy(n.object.quaternion),I.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Je),n.domElement.removeEventListener("pointerdown",E),n.domElement.removeEventListener("pointercancel",O),n.domElement.removeEventListener("wheel",$),n.domElement.removeEventListener("pointermove",y),n.domElement.removeEventListener("pointerup",O),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Pe),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new ac,c=new ac;let l=1;const h=new x,u=new j,d=new j,f=new j,g=new j,_=new j,m=new j,p=new j,b=new j,v=new j,M=new x,C=new j;let T=!1;const w=[],U={};let S=!1;function R(P){return P!==null?2*Math.PI/60*n.autoRotateSpeed*P:2*Math.PI/60/60*n.autoRotateSpeed}function N(P){const ae=Math.abs(P*.01);return Math.pow(.95,n.zoomSpeed*ae)}function W(P){c.theta-=P}function J(P){c.phi-=P}const L=function(){const P=new x;return function(Ae,ye){P.setFromMatrixColumn(ye,0),P.multiplyScalar(-Ae),h.add(P)}}(),B=function(){const P=new x;return function(Ae,ye){n.screenSpacePanning===!0?P.setFromMatrixColumn(ye,1):(P.setFromMatrixColumn(ye,0),P.crossVectors(n.object.up,P)),P.multiplyScalar(Ae),h.add(P)}}(),G=function(){const P=new x;return function(Ae,ye){const se=n.domElement;if(n.object.isPerspectiveCamera){const I=n.object.position;P.copy(I).sub(n.target);let ce=P.length();ce*=Math.tan(n.object.fov/2*Math.PI/180),L(2*Ae*ce/se.clientHeight,n.object.matrix),B(2*ye*ce/se.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(L(Ae*(n.object.right-n.object.left)/n.object.zoom/se.clientWidth,n.object.matrix),B(ye*(n.object.top-n.object.bottom)/n.object.zoom/se.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function K(P){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=P:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Z(P){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=P:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function X(P,ae){if(!n.zoomToCursor)return;T=!0;const Ae=n.domElement.getBoundingClientRect(),ye=P-Ae.left,se=ae-Ae.top,I=Ae.width,ce=Ae.height;C.x=ye/I*2-1,C.y=-(se/ce)*2+1,M.set(C.x,C.y,1).unproject(n.object).sub(n.object.position).normalize()}function Q(P){return Math.max(n.minDistance,Math.min(n.maxDistance,P))}function ee(P){u.set(P.clientX,P.clientY)}function pe(P){X(P.clientX,P.clientX),p.set(P.clientX,P.clientY)}function k(P){g.set(P.clientX,P.clientY)}function te(P){d.set(P.clientX,P.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const ae=n.domElement;W(2*Math.PI*f.x/ae.clientHeight),J(2*Math.PI*f.y/ae.clientHeight),u.copy(d),n.update()}function me(P){b.set(P.clientX,P.clientY),v.subVectors(b,p),v.y>0?K(N(v.y)):v.y<0&&Z(N(v.y)),p.copy(b),n.update()}function we(P){_.set(P.clientX,P.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),G(m.x,m.y),g.copy(_),n.update()}function Me(P){X(P.clientX,P.clientY),P.deltaY<0?Z(N(P.deltaY)):P.deltaY>0&&K(N(P.deltaY)),n.update()}function Ie(P){let ae=!1;switch(P.code){case n.keys.UP:P.ctrlKey||P.metaKey||P.shiftKey?J(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,n.keyPanSpeed),ae=!0;break;case n.keys.BOTTOM:P.ctrlKey||P.metaKey||P.shiftKey?J(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(0,-n.keyPanSpeed),ae=!0;break;case n.keys.LEFT:P.ctrlKey||P.metaKey||P.shiftKey?W(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(n.keyPanSpeed,0),ae=!0;break;case n.keys.RIGHT:P.ctrlKey||P.metaKey||P.shiftKey?W(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):G(-n.keyPanSpeed,0),ae=!0;break}ae&&(P.preventDefault(),n.update())}function Fe(P){if(w.length===1)u.set(P.pageX,P.pageY);else{const ae=_e(P),Ae=.5*(P.pageX+ae.x),ye=.5*(P.pageY+ae.y);u.set(Ae,ye)}}function be(P){if(w.length===1)g.set(P.pageX,P.pageY);else{const ae=_e(P),Ae=.5*(P.pageX+ae.x),ye=.5*(P.pageY+ae.y);g.set(Ae,ye)}}function Oe(P){const ae=_e(P),Ae=P.pageX-ae.x,ye=P.pageY-ae.y,se=Math.sqrt(Ae*Ae+ye*ye);p.set(0,se)}function D(P){n.enableZoom&&Oe(P),n.enablePan&&be(P)}function he(P){n.enableZoom&&Oe(P),n.enableRotate&&Fe(P)}function q(P){if(w.length==1)d.set(P.pageX,P.pageY);else{const Ae=_e(P),ye=.5*(P.pageX+Ae.x),se=.5*(P.pageY+Ae.y);d.set(ye,se)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const ae=n.domElement;W(2*Math.PI*f.x/ae.clientHeight),J(2*Math.PI*f.y/ae.clientHeight),u.copy(d)}function oe(P){if(w.length===1)_.set(P.pageX,P.pageY);else{const ae=_e(P),Ae=.5*(P.pageX+ae.x),ye=.5*(P.pageY+ae.y);_.set(Ae,ye)}m.subVectors(_,g).multiplyScalar(n.panSpeed),G(m.x,m.y),g.copy(_)}function Y(P){const ae=_e(P),Ae=P.pageX-ae.x,ye=P.pageY-ae.y,se=Math.sqrt(Ae*Ae+ye*ye);b.set(0,se),v.set(0,Math.pow(b.y/p.y,n.zoomSpeed)),K(v.y),p.copy(b);const I=(P.pageX+ae.x)*.5,ce=(P.pageY+ae.y)*.5;X(I,ce)}function Te(P){n.enableZoom&&Y(P),n.enablePan&&oe(P)}function ge(P){n.enableZoom&&Y(P),n.enableRotate&&q(P)}function E(P){n.enabled!==!1&&(w.length===0&&(n.domElement.setPointerCapture(P.pointerId),n.domElement.addEventListener("pointermove",y),n.domElement.addEventListener("pointerup",O)),ke(P),P.pointerType==="touch"?He(P):re(P))}function y(P){n.enabled!==!1&&(P.pointerType==="touch"?ie(P):ne(P))}function O(P){Be(P),w.length===0&&(n.domElement.releasePointerCapture(P.pointerId),n.domElement.removeEventListener("pointermove",y),n.domElement.removeEventListener("pointerup",O)),n.dispatchEvent(lc),s=r.NONE}function re(P){let ae;switch(P.button){case 0:ae=n.mouseButtons.LEFT;break;case 1:ae=n.mouseButtons.MIDDLE;break;case 2:ae=n.mouseButtons.RIGHT;break;default:ae=-1}switch(ae){case $n.DOLLY:if(n.enableZoom===!1)return;pe(P),s=r.DOLLY;break;case $n.ROTATE:if(P.ctrlKey||P.metaKey||P.shiftKey){if(n.enablePan===!1)return;k(P),s=r.PAN}else{if(n.enableRotate===!1)return;ee(P),s=r.ROTATE}break;case $n.PAN:if(P.ctrlKey||P.metaKey||P.shiftKey){if(n.enableRotate===!1)return;ee(P),s=r.ROTATE}else{if(n.enablePan===!1)return;k(P),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Gs)}function ne(P){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;te(P);break;case r.DOLLY:if(n.enableZoom===!1)return;me(P);break;case r.PAN:if(n.enablePan===!1)return;we(P);break}}function $(P){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(P.preventDefault(),n.dispatchEvent(Gs),Me(Se(P)),n.dispatchEvent(lc))}function Se(P){const ae=P.deltaMode,Ae={clientX:P.clientX,clientY:P.clientY,deltaY:P.deltaY};switch(ae){case 1:Ae.deltaY*=16;break;case 2:Ae.deltaY*=100;break}return P.ctrlKey&&!S&&(Ae.deltaY*=10),Ae}function de(P){P.key==="Control"&&(S=!0,document.addEventListener("keyup",ve,{passive:!0,capture:!0}))}function ve(P){P.key==="Control"&&(S=!1,document.removeEventListener("keyup",ve,{passive:!0,capture:!0}))}function Pe(P){n.enabled===!1||n.enablePan===!1||Ie(P)}function He(P){switch(Ce(P),w.length){case 1:switch(n.touches.ONE){case Qn.ROTATE:if(n.enableRotate===!1)return;Fe(P),s=r.TOUCH_ROTATE;break;case Qn.PAN:if(n.enablePan===!1)return;be(P),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case Qn.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;D(P),s=r.TOUCH_DOLLY_PAN;break;case Qn.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;he(P),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Gs)}function ie(P){switch(Ce(P),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;q(P),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;oe(P),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Te(P),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ge(P),n.update();break;default:s=r.NONE}}function Je(P){n.enabled!==!1&&P.preventDefault()}function ke(P){w.push(P.pointerId)}function Be(P){delete U[P.pointerId];for(let ae=0;ae<w.length;ae++)if(w[ae]==P.pointerId){w.splice(ae,1);return}}function Ce(P){let ae=U[P.pointerId];ae===void 0&&(ae=new j,U[P.pointerId]=ae),ae.set(P.pageX,P.pageY)}function _e(P){const ae=P.pointerId===w[0]?w[1]:w[0];return U[ae]}n.domElement.addEventListener("contextmenu",Je),n.domElement.addEventListener("pointerdown",E),n.domElement.addEventListener("pointercancel",O),n.domElement.addEventListener("wheel",$,{passive:!1}),document.addEventListener("keydown",de,{passive:!0,capture:!0}),this.update()}}class v0 extends ul{constructor(e=null){super();const t=new jn;t.deleteAttribute("uv");const n=new Ht({side:It}),r=new Ht;let s=5;e!==null&&e._useLegacyLights===!1&&(s=900);const o=new s0(16777215,s,28,2);o.position.set(.418,16.199,.3),this.add(o);const a=new De(t,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const c=new De(t,r);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);const l=new De(t,r);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);const h=new De(t,r);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);const u=new De(t,r);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);const d=new De(t,r);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);const f=new De(t,r);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const g=new De(t,_i(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);const _=new De(t,_i(50));_.position.set(-16.109,18.021,-8.207),_.scale.set(.1,2.425,2.751),this.add(_);const m=new De(t,_i(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);const p=new De(t,_i(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);const b=new De(t,_i(20));b.position.set(3.235,11.486,-12.541),b.scale.set(2.5,2,.1),this.add(b);const v=new De(t,_i(100));v.position.set(0,20,0),v.scale.set(1,.1,1),this.add(v)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function _i(i){const e=new $r;return e.color.setScalar(i),e}function So(i){return .25+i*.09}const x0=.15;function so(i){return 2*So(i)+x0}const M0=1.4;function yl(i){return(M0+So(i))*Nr/2.54}function y0(i,e){var o;const n=[...e].sort((a,c)=>a.at-c.at),r=[];for(const a of n){const c=Math.max(a.at,(o=a.until)!=null?o:a.at),l=r[r.length-1];l&&l.lift===a.lift&&a.at-l.to<=l.halfRun+a.halfRun?(l.to=Math.max(l.to,c),l.halfRun=Math.max(l.halfRun,a.halfRun)):r.push({from:a.at,to:c,lift:a.lift,halfRun:a.halfRun})}const s=a=>Math.max(0,...r.map(c=>{const h=(a<c.from?c.from-a:a>c.to?a-c.to:0)/c.halfRun;return h<1?c.lift*(1+Math.cos(Math.PI*h))/2:0}));return r.flatMap(a=>[...Array.from({length:3+1},(c,l)=>a.from-a.halfRun*(3-l)/3),...Array.from({length:3+1},(c,l)=>a.to+a.halfRun*l/3)]).filter(a=>a>0&&a<i).sort((a,c)=>a-c).filter((a,c,l)=>c===0||a-l[c-1]>.5).map(a=>({at:a,lift:s(a)}))}function Yr(i,e){return`${Math.round(i)},${Math.round(e)}`}function S0(i,e){const t=[];for(const c of i){if(c.x1===c.x2&&c.y1===c.y2&&!c.via.length)continue;const l={x:c.x1,y:c.y1},h={x:c.x2,y:c.y2},u=(f,g)=>c.via.some(_=>_.x===f&&_.y===g),d=[];for(let f=0;f<=c.via.length;f++){for(const{x:g,y:_,underWidth:m,stack:p,runTo:b,leg:v}of c.hops)v===f&&(b||!u(g,_))&&d.push({x:g,y:_,hop:{...m!==void 0?{underWidth:m}:{},...p?{stack:p}:{},...b?{runTo:b}:{}}});f<c.via.length&&d.push({...c.via[f]})}t.push({a:l,b:h,hops:d,ka:Yr(l.x,l.y),kb:Yr(h.x,h.y),color:c.color,width:c.width,bottom:c.bottom})}const n=new Map;t.forEach((c,l)=>{for(const h of[c.ka,c.kb]){const u=n.get(h);u?u.push(l):n.set(h,[l])}});const r=(c,l)=>{const h=n.get(l);if(!h||h.length!==2||e.has(l))return;const u=h[0]===c?h[1]:h[0],d=t[c],f=t[u];return d.bottom===f.bottom&&d.color.toLowerCase()===f.color.toLowerCase()&&d.width===f.width?u:void 0},s=(c,l,h)=>{const u=[];let d=c,f=l;for(;;){const g=r(d,f);if(g===void 0)return{points:u,closed:!1};if(h.has(g))return{points:u,closed:!0};h.add(g);const _=t[g],m=_.ka===f;u.push(...m?_.hops:[..._.hops].reverse(),m?_.b:_.a),d=g,f=_.ka===f?_.kb:_.ka}},o=new Set,a=[];return t.forEach((c,l)=>{if(o.has(l))return;o.add(l);const h=s(l,c.kb,o);if(h.closed){a.push({points:[c.a,...c.hops,c.b,...h.points],color:c.color,width:c.width,closed:!0,bottom:c.bottom});return}const u=s(l,c.ka,o);a.push({points:[...u.points.reverse(),c.a,...c.hops,c.b,...h.points],color:c.color,width:c.width,closed:!1,bottom:c.bottom})}),a}const b0="#777676",uc=4,Ct=([i,e])=>({x:wi(i),y:wi(e)}),E0=i=>[i.ref,i.part,i.value].filter(Boolean).join(" ");function w0(i){const{project:e}=Fl(i),t=new Map(Bl(e).map(M=>[M.ref,E0(M)])),n=M=>{var C;return(C=t.get(M))!=null?C:M},{cols:r,rows:s}=e.board,o=e.board.type==="stripboard"?{type:"stripboard",strips:e.board.strips,cuts:e.board.cuts.map(Ct)}:{type:"perfboard"},a=[];for(let M=0;M<r;M++)for(let C=0;C<s;C++)a.push(Ct([M,C]));const{hops:c,runs:l}=zl(e),h=M=>{var C;return(C=e.wires[M].width)!=null?C:uc},u=(M,C)=>Math.hypot(M[0]-C[0],M[1]-C[1]),d=(M,C)=>{const T=M.to[0]-M.from[0],w=M.to[1]-M.from[1],U=T*T+w*w,S=U?Math.max(0,Math.min(1,((C[0]-M.from[0])*T+(C[1]-M.from[1])*w)/U)):0;return u(C,[M.from[0]+S*T,M.from[1]+S*w])},f=M=>yl(M)/Nr,g=(M,C)=>{let T=0;for(const w of c)w.wire===M&&w.under!==void 0&&u(w.at,C)<=f(h(w.under))&&(T=Math.max(T,so(h(w.under))+g(w.under,w.at)));for(const w of l)w.wire===M&&d(w,C)<=f(h(w.under))&&(T=Math.max(T,so(h(w.under))+g(w.under,C)));return T},_=e.wires.flatMap((M,C)=>{var N,W,J;if(Po(M))return[];const T=Ct(M.from),w=Ct(M.to),U=Hl(M).map(L=>Ct(L.from)),S=[...c.filter(L=>L.wire===C).map(L=>({...Ct(L.at),leg:L.leg,...L.under!==void 0?{underWidth:h(L.under),stack:g(L.under,L.at)}:{}})),...l.filter(L=>L.wire===C).map(L=>({...Ct(L.from),leg:L.leg,underWidth:h(L.under),stack:Math.max(g(L.under,L.from),g(L.under,L.to)),runTo:Ct(L.to)}))],R=L=>Math.hypot(L.x-U[L.leg].x,L.y-U[L.leg].y);return S.sort((L,B)=>L.leg-B.leg||R(L)-R(B)),[{x1:T.x,y1:T.y,x2:w.x,y2:w.y,via:((N=M.via)!=null?N:[]).map(Ct),color:(W=M.color)!=null?W:b0,width:(J=M.width)!=null?J:uc,bottom:Gl(M),hops:S}]}),m=e.wires.filter(Po).map(M=>({points:Vl(M).map(Ct),holes:Wl(M).map(Ct)})),p=e.placedIcs.map(M=>{const{x:C,y:T}=Ct(M.at);return{label:n(M.ref),name:M.name,widthPin:Math.max(2,M.widthPin),heightPin:M.heightPin,rotationAngle:M.rotation,pinDescription:M.pinDescription,category:M.category,left:C,top:T}}),b=e.placedStandardComponents.map(M=>{const C=Ct(M.from),T=Ct(M.to);return{label:n(M.ref),definitionId:M.definitionId,value:M.value,color:M.color,startX:C.x,startY:C.y,endX:T.x,endY:T.y}}),v=e.placedAdvancedComponents.map(M=>{const C=Ct(M.at);return{label:n(M.ref),definitionId:M.definitionId,...M.custom?{custom:M.custom}:{},value:M.value,rotationAngle:M.rotation,anchorX:C.x,anchorY:C.y,rows:M.rows,cols:M.cols}});return{canvasWidth:r*Nr,canvasHeight:s*Nr,board:o,dots:a,wires:_,solderPaths:m,ics:p,standardParts:b,advancedParts:v}}const Sl=50,le=2.54,Dr=le/Sl,bl=1.6,Jn=-bl,Qe=Jn-1.1,T0=.3;class A0{constructor(e,t){rt(this,"width");rt(this,"depth");this.width=e*Dr,this.depth=t*Dr}x(e){return e*Dr-this.width/2}z(e){return e*Dr-this.depth/2}point(e,t,n=0){return new x(this.x(e),n,this.z(t))}}const R0=new x(0,1,0);class C0{constructor(e){rt(this,"solderedHoles",new Map);rt(this,"unitCylinder",new dn(1,1,1,14,1));rt(this,"unitSphere",new Kn(1,16,12));rt(this,"unitBox",new jn(1,1,1));rt(this,"materials",new Map);this.frame=e}standard(e,t){let n=this.materials.get(e);return n||(n=new Ht(t),this.materials.set(e,n)),n}get leadMaterial(){return this.standard("lead",{color:"#d3d7dc",metalness:1,roughness:.32})}get blackPlasticMaterial(){return this.standard("black-plastic",{color:"#1c1f23",roughness:.55})}solder(e,t){this.solderedHoles.set(Yr(e,t),{x:this.frame.x(e),z:this.frame.z(t)})}rod(e,t,n,r){const s=new x().subVectors(t,e),o=s.length();if(o<1e-4)return null;const a=new De(this.unitCylinder,r);return a.scale.set(n,o,n),a.position.copy(e).addScaledVector(s,.5),a.quaternion.copy(new Cn().setFromUnitVectors(R0,s.normalize())),a.castShadow=!0,a}ball(e,t,n){const r=new De(this.unitSphere,n);return r.scale.setScalar(t),r.position.copy(e),r.castShadow=!0,r}box(e,t,n,r,s){const o=new De(this.unitBox,r);return o.scale.set(e,t,n),o.position.copy(s),o.castShadow=!0,o.receiveShadow=!0,o}bentWire(e,t,n){const r=new Ee;for(let s=0;s<e.length-1;s++){const o=this.rod(e[s],e[s+1],t,n);o&&r.add(o),s>0&&r.add(this.ball(e[s],t,n))}return r}lead(e){return this.bentWire(e,T0,this.leadMaterial)}}function Ei(i,e,t){const n=document.createElement("canvas");n.width=Math.max(2,Math.round(i)),n.height=Math.max(2,Math.round(e));const r=n.getContext("2d");r&&t(r,n.width,n.height);const s=new Eg(n);return s.colorSpace=bt,s.anisotropy=8,s}const oo="Inter, Arial, sans-serif";function El(i,e,t,n,r="600"){let s=n;i.font=`${r} ${s}px ${oo}`;const o=i.measureText(e).width;return o>t&&(s=Math.max(4,s*t/o),i.font=`${r} ${s}px ${oo}`),s}const dc=48;function nn(i,e,t,n){const r=Ei(e*dc,t*dc,(o,a,c)=>{El(o,i,a*.92,c*.8),o.fillStyle=n,o.textAlign="center",o.textBaseline="middle",o.fillText(i,a/2,c/2)}),s=new Ht({map:r,transparent:!0,roughness:.7,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4});return new De(new Pi(e,t),s)}const P0="#0e5a27",L0="#7a5230",wl="#c98a4f",ao=.5,Tl=.95,D0=1.2,fc=kl*le,Vs=Xl*le,I0=.4,Li=.015;function U0(i,e,t){const n=-i/2,r=-e/2,s=new Pn;return s.moveTo(n+t,r),s.lineTo(n+i-t,r),s.quadraticCurveTo(n+i,r,n+i,r+t),s.lineTo(n+i,r+e-t),s.quadraticCurveTo(n+i,r+e,n+i-t,r+e),s.lineTo(n+t,r+e),s.quadraticCurveTo(n,r+e,n,r+e-t),s.lineTo(n,r+t),s.quadraticCurveTo(n,r,n+t,r),s}function qr(i,e,t){const n=new bg(i,e,t.length),r=new st;return t.forEach((s,o)=>n.setMatrixAt(o,r.makeTranslation(s.x,s.y,s.z))),n.receiveShadow=!0,n}function pc(i,e){const t=new mn(U0(i.width,i.depth,D0),{depth:bl,bevelEnabled:!1,curveSegments:6});t.rotateX(Math.PI/2);const n=new De(t,new Ht({color:e,roughness:.78}));return n.receiveShadow=!0,n}function mc(i,e,t){const n=new Ee,r=new Ht({color:wl,metalness:1,roughness:.38,side:zt}),s=new $r({color:"#040604",side:zt}),o=new vo(ao,Tl,24).rotateX(-Math.PI/2),a=new es(ao,16).rotateX(-Math.PI/2);for(const c of[Li,Jn-Li]){t&&n.add(qr(o,r,e.map(h=>i.point(h.x,h.y,c))));const l=c+Math.sign(c||1)*.002;n.add(qr(a,s,e.map(h=>i.point(h.x,h.y,l))))}return n}function N0(i,e,t){const n=[];let r=i;for(const s of[...t].sort((o,a)=>o-a))s-Vs/2>r&&n.push([r,s-Vs/2]),r=Math.max(r,s+Vs/2);return e>r&&n.push([r,e]),n}function O0(i,e,t){const n=new Ee,r=new Ht({color:wl,metalness:1,roughness:.38,side:zt}),s=Jn-Li,o=e.strips==="horizontal",a=Array.from(new Set(t.map(l=>o?l.y:l.x))),c=(o?i.width:i.depth)/2-I0;for(const l of a){const h=e.cuts.filter(u=>(o?u.y:u.x)===l).map(u=>o?i.x(u.x):i.z(u.y));for(const[u,d]of N0(-c,c,h)){const f=d-u,g=o?new Pi(f,fc):new Pi(fc,f);g.rotateX(Math.PI/2);const _=new De(g,r),m=(u+d)/2;_.position.set(o?m:i.x(l),s,o?i.z(l):m),_.receiveShadow=!0,n.add(_)}}return n}function F0(i,e){const{frame:t}=i,{board:n,dots:r}=e,s=new Ee;return n.type==="stripboard"?(s.add(pc(t,L0)),s.add(O0(t,n,r)),s.add(mc(t,r,!1))):(s.add(pc(t,P0)),s.add(mc(t,r,!0))),s}const B0=.5,z0=.45;function H0(i,e){const t=new Ee,n=i.standard("solder",{color:"#d7dbe0",metalness:1,roughness:.22});for(const r of e){const s=i.bentWire(r.points.map(o=>i.frame.point(o.x,o.y,0)),B0,n);s.scale.y=z0,s.position.y=Jn-Li,t.add(s);for(const o of r.holes)i.solder(o.x,o.y)}return t}function G0(i){const e=Array.from(i.solderedHoles.values());if(e.length===0)return null;const t=[new j(Tl,0),new j(.86,.18),new j(.66,.42),new j(.46,.68),new j(.34,.92),new j(0,1)],n=new Ui(t,20).rotateX(Math.PI),r=new Ht({color:"#d7dbe0",metalness:1,roughness:.22}),s=new Ee;s.add(qr(n,r,e.map(a=>new x(a.x,Jn-Li,a.z))));const o=new es(ao+.25,24).rotateX(-Math.PI/2);return s.add(qr(o,r,e.map(a=>new x(a.x,Li+.004,a.z)))),s}const V0=1.5,W0=1.4,k0=Sl/le;function X0(i,e,t,n){const r=o=>n?Jn-o:o,s=[];for(let o=0;o<e.length;){const a=e[o];s.push(i.point(a.x,a.y,r(t)));let c=o+1;for(;c<e.length&&e[c].hop;)c++;if(c>=e.length)break;const l=e[c],h=Math.hypot(l.x-a.x,l.y-a.y),u=e.slice(o+1,c).map(({x:d,y:f,hop:g})=>{var _;return{at:Math.hypot(d-a.x,f-a.y),...g!=null&&g.runTo?{until:Math.hypot(g.runTo.x-a.x,g.runTo.y-a.y)}:{},lift:(g==null?void 0:g.underWidth)!==void 0?so(g.underWidth)+((_=g.stack)!=null?_:0):V0,halfRun:(g==null?void 0:g.underWidth)!==void 0?yl(g.underWidth):W0*k0}});for(const{at:d,lift:f}of y0(h,u)){const g=d/h;s.push(i.point(a.x+(l.x-a.x)*g,a.y+(l.y-a.y)*g,r(t+f)))}o=c}return s}const Y0=.8,q0=.3,Z0=.26;function gc(i,e){let t=e;for(let n=1;n<i.length;n++){const r=i[n].distanceTo(i[n-1]);if(r>=t)return[i[n-1].clone().lerp(i[n],r?t/r:0),...i.slice(n)];t-=r}return i.slice(-1)}function j0(i){return i.reduce((e,t,n)=>n?e+t.distanceTo(i[n-1]):0,0)}function K0(i,e){const{frame:t}=i,n=new Ee,r=i.standard("wire-conductor",{color:"#d0d4d8",metalness:1,roughness:.3});for(const s of e){const o=So(s.width),a=i.standard(`wire:${s.color}`,{color:s.color,roughness:.45}),c=X0(t,s.points,o,s.bottom);if(s.closed){n.add(i.bentWire(c,o,a)),n.add(i.ball(c[0],o,a));continue}const l=Math.min(Y0,j0(c)*q0),h=gc(gc(c,l).reverse(),l).reverse();n.add(i.bentWire(h,o,a));const u=[{hole:s.points[0],stripped:h[0]},{hole:s.points[s.points.length-1],stripped:h[h.length-1]}];for(const{hole:{x:d,y:f},stripped:g}of u){const _=t.point(d,f,g.y),m=s.bottom?.4:Jn-1.1;n.add(i.bentWire([g,_,t.point(d,f,m)],Z0,r)),i.solder(d,f)}}return n}function _c(i,e,t){const n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)}function J0(i,e){const t=Math.min(e,1-e)*i.length,n=i.radius*.45,r=t>=n?1:Math.sqrt(Math.max(0,1-Math.pow(1-t/n,2)));return i.radius*i.shape(e)*r}function vc(i,e,t,n){const r=Math.max(4,Math.round((t-e)*60)),s=[];for(let o=0;o<=r;o++){const a=e+(t-e)*o/r;s.push(new j(J0(i,a)+n,a*i.length))}return new Ui(s,28)}function $0(i,e){var r;const t=new Ee,n=new De(vc(e,0,1,0),e.material);n.castShadow=!0,t.add(n);for(const s of(r=e.bands)!=null?r:[]){const o=i.standard(`band:${s.color}`,{color:s.color,roughness:.5}),a=new De(vc(e,s.at-s.width/2,s.at+s.width/2,.04),o);t.add(a)}return t}const Q0=1;function bo(i,e,t){const n=new Ee,r=$0(i,t);if(e>=t.length+Q0*2){const s=t.radius+.35,o=(e-t.length)/2;r.rotation.z=-Math.PI/2,r.position.set(o,s,0),n.add(r),n.add(i.lead([new x(0,Qe,0),new x(0,s,0),new x(o+.3,s,0)])),n.add(i.lead([new x(e,Qe,0),new x(e,s,0),new x(o+t.length-.3,s,0)]))}else{const o=1+t.length,a=o+.9;r.position.set(0,1,0),n.add(r),n.add(i.lead([new x(0,Qe,0),new x(0,1+.3,0)])),n.add(i.lead([new x(0,o-.3,0),new x(0,a,0),new x(e,a,0),new x(e,Qe,0)]))}return n}const xc=[.192,.357,.52,.77],e_="#2b2118";function t_(i){return 1-.14*(_c(.2,.3,i)*(1-_c(.7,.8,i)))}function n_(i,e,t){const n=t?Di(t,"\u03A9"):void 0,r=n!==void 0&&n>0?Yl(n):void 0,s=r?[r.digit1,r.digit2,r.multiplier,r.tolerance]:xc.map(()=>e_);return bo(i,e,{length:6.2,radius:1.2,shape:t_,material:i.standard("resistor-body",{color:"#d6bd94",roughness:.6}),bands:xc.map((o,a)=>({at:o,width:.08,color:s[a]}))})}function i_(i,e){return bo(i,e,{length:4.4,radius:1.1,shape:()=>1,material:i.standard("diode-body",{color:"#2b2f34",roughness:.35}),bands:[{at:.84,width:.12,color:"#cfd4da"}]})}const r_=[.21,.4,.59,.78];function s_(i,e){return bo(i,e,{length:6.6,radius:1.45,shape:t=>.84+.16*Math.max(...r_.map(n=>Math.max(0,1-Math.abs(t-n)/.085))),material:i.standard("inductor-body",{color:"#3f3a34",roughness:.45})})}function ns(i,e,t,n,r=0){const s=new Ee,o=e/2,a=Math.min(o,t),c=Math.min(.8,n);for(const[l,h]of[[0,o-a],[e,o+a]]){const u=[new x(l,Qe,0),new x(l,c,0),new x(h,n,0)];r>0&&u.push(new x(h,n+r,0)),s.add(i.lead(u))}return s}function o_(i,e,t){var h;const n=new Ee,r=2.5,s=.9,o=2.2+r,a=new De(new Kn(1,32,20),i.standard("ceramic-body",{color:"#d99a4e",roughness:.62}));a.scale.set(r,r*.94,s),a.position.set(e/2,o,0),a.castShadow=!0,n.add(a),n.add(ns(i,e,1.25,o-r*.7));const c=t?Di(t,"F"):void 0,l=c!==void 0&&c>0&&(h=ql(c))!=null?h:t;if(l)for(const u of[1,-1]){const d=nn(l,2.8,1.5,"#3a2410");d.position.set(e/2,o,u*(s+.005)),u<0&&(d.rotation.y=Math.PI),n.add(d)}return n}function a_(i,e,t){const n=new Ee,r=3.15,s=11,o=.5,a=e/2,c=[new j(0,0),new j(r-.35,0),new j(r,.3),new j(r,s-1.5),new j(r-.22,s-1.15),new j(r,s-.8),new j(r,s-.3),new j(r-.3,s),new j(0,s)],l=i.standard("electrolytic-sleeve",{color:"#34618f",roughness:.32}),h=new De(new Ui(c,40),l);h.position.set(a,o,0),h.castShadow=!0,n.add(h);const u=Ei(256,256,(v,M,C)=>{v.fillStyle="#c3c9d1",v.fillRect(0,0,M,C),v.strokeStyle="#6b737d",v.lineWidth=7,v.lineCap="round",v.beginPath();for(const T of[-90,30,150]){const w=T*Math.PI/180;v.moveTo(M/2,C/2),v.lineTo(M/2+Math.cos(w)*M*.36,C/2+Math.sin(w)*C*.36)}v.stroke()}),d=new De(new dn(r-.3,r-.3,.02,40),[i.standard("electrolytic-top-edge",{color:"#c3c9d1",metalness:.8,roughness:.35}),new Ht({map:u,metalness:.8,roughness:.35}),i.standard("electrolytic-top-edge",{color:"#c3c9d1",metalness:.8,roughness:.35})]);d.position.set(a,o+s+.005,0),n.add(d);const f=s-2,g=Ei(64,512,(v,M,C)=>{v.fillStyle="#dfe6ee",v.fillRect(0,0,M,C),v.fillStyle="#34618f";for(let T=C*.12;T<C*.95;T+=C*.16)v.fillRect(M*.28,T,M*.44,C*.022)}),_=1.1,m=new De(new dn(r+.03,r+.03,f,12,1,!0,Math.PI*1.5-_/2,_),new Ht({map:g,roughness:.32,side:zt}));m.position.set(a,o+.4+f/2,0),n.add(m);const p=t?Di(t,"F"):void 0,b=p!==void 0?Zr(p,"F"):t;if(b){const v=1.8/r,M=Ei(128,640,(T,w,U)=>{T.translate(w/2,U/2),T.rotate(-Math.PI/2),T.fillStyle="#e8eef5",T.textAlign="center",T.textBaseline="middle",T.font=`600 ${w*.62}px Inter, Arial, sans-serif`,T.fillText(b,0,0,U*.9)}),C=new De(new dn(r+.03,r+.03,f,12,1,!0,-v/2,v),new Ht({map:M,transparent:!0,roughness:.32,depthWrite:!1}));C.position.copy(m.position),n.add(C)}return n.add(ns(i,e,1.25,o+.2)),n}function Mc(i,e,t,n=5){var w;const r=new Ee,s=e/2,o=n/5,a=2.5*o,c=2.9*o,l=2.2,h=1*o,u=5.1*o,d=-2.5*o,f=Math.sqrt(c*c-d*d),g=Math.atan2(-f,d),_=new Pn;_.moveTo(d,-f),_.absarc(0,0,c,g,-g,!1),_.lineTo(d,-f);const m=new mn(_,{depth:h,bevelEnabled:!1,curveSegments:24});m.rotateX(-Math.PI/2);const p=[new j(a,0),new j(a,u)];for(let U=1;U<=10;U++){const S=U/10*Math.PI/2;p.push(new j(Math.cos(S)*a,u+Math.sin(S)*a))}let b;if(t==="rgb"){const U=Ei(96,8,(S,R,N)=>{["#ef4444","#22c55e","#3b82f6"].forEach((W,J)=>{S.fillStyle=W,S.fillRect(J*R/3,0,R/3,N)})});b=new Fr({map:U,emissiveMap:U,emissive:"#ffffff",emissiveIntensity:.3,roughness:.12,clearcoat:1,transparent:!0,opacity:.85})}else if(t){const U=(w=Zl(t))!=null?w:t;b=new Fr({color:U,emissive:U,emissiveIntensity:.3,roughness:.12,clearcoat:1,transparent:!0,opacity:.8})}else b=new Fr({color:"#eef3f8",roughness:.08,clearcoat:1,transparent:!0,opacity:.45});const v=new De(m,b);v.position.set(s,l,0);const M=new De(new Ui(p,40),b);M.position.set(s,l+h,0);for(const U of[v,M])U.castShadow=!0,r.add(U);r.add(ns(i,e,1.27,l,3.4*o));const C=Math.min(s,1.27),T=i.standard("led-frame",{color:"#bfc5cc",metalness:1,roughness:.3});return r.add(i.box(1.5*o,1.1*o,.4,T,new x(s-C+.35*o,l+4*o,0))),r.add(i.box(.6*o,.6*o,.4,T,new x(s+C-.1,l+3.8*o,0))),r}function c_(i,e){const t=new Ee;return t.add(i.box(Math.max(2,e*.6),2,2,i.blackPlasticMaterial,new x(e/2,1.5,0))),t.add(ns(i,e,Math.max(1,e*.3),.5)),t}function l_(i,e){const{frame:t}=i,n=t.point(e.startX,e.startY),r=t.point(e.endX,e.endY),s=n.distanceTo(r);if(s<.01)return null;i.solder(e.startX,e.startY),i.solder(e.endX,e.endY);let o;switch(e.definitionId){case"resistor":o=n_(i,s,e.value);break;case"diode":o=i_(i,s);break;case"inductor":o=s_(i,s);break;case"ceramic-capacitor":o=o_(i,s,e.value);break;case"electrolytic-capacitor":o=a_(i,s,e.value);break;case"led":o=Mc(i,s,e.color);break;case"led-3mm":o=Mc(i,s,e.color,3);break;default:o=c_(i,s)}return o.position.copy(n),o.rotation.y=-Math.atan2(r.z-n.z,r.x-n.x),o}function nt(i){var a;const e=(a=i.bodyOutline)!=null?a:i.pinOffsets,t=i.bodyOutline?0:le*.5,n=Math.min(...e.map(c=>c.dx*le))-t,r=Math.max(...e.map(c=>c.dx*le))+t,s=Math.min(...e.map(c=>c.dy*le))-t,o=Math.max(...e.map(c=>c.dy*le))+t;return{left:n,right:r,back:s,front:o,width:r-n,depth:o-s,centerX:(n+r)/2,centerZ:(s+o)/2}}function ft(i,e,t,n,r=.6,s=.4){for(const o of t)i.add(e.box(r,n-Qe,s,e.leadMaterial,new x(o.dx*le,(n+Qe)/2,o.dy*le)))}function it(i,e,t,n){const r=new De(new dn(i,i,e,32),t);return r.position.copy(n),r.castShadow=!0,r}function pn(i,e,t,n,r,s="#e2e8f0"){const o=nn(e,t,n,s);o.rotation.x=-Math.PI/2,o.position.copy(r),i.add(o)}function h_(i,e){const t=new Ee,n=nt(e),r=5,s=2.5,o=i.standard("barrel-hole",{color:"#07080a",roughness:.9});t.add(i.box(n.width,r,n.depth,i.blackPlasticMaterial,new x(n.centerX,r/2,n.centerZ)));const a=(c,l,h,u=i.blackPlasticMaterial)=>{const d=it(c,l,u,new x(h,s,n.centerZ));return d.rotation.z=Math.PI/2,d};return t.add(a(3,1,n.right+.5)),t.add(a(1.8,.1,n.right+1.01,o)),ft(t,i,e.pinOffsets,.6,.8,.4),t}function u_(i,e){const t=new Ee,n=nt(e),r=Math.min(n.width,n.depth)/2,s=1.2,o=9.5,a=new Pn;a.absarc(0,0,r,0,Math.PI*2,!1);const c=new Xr;c.absarc(0,0,1.2,0,Math.PI*2,!0),a.holes.push(c);const l=new mn(a,{depth:o,bevelEnabled:!1,curveSegments:32});l.rotateX(-Math.PI/2);const h=new De(l,i.blackPlasticMaterial);return h.position.set(n.centerX,s,n.centerZ),h.castShadow=!0,t.add(h),t.add(it(r-.2,.3,i.blackPlasticMaterial,new x(n.centerX,s+.15,n.centerZ))),pn(t,"+",1.8,1.8,new x(n.centerX-r*.62,s+o+.01,n.centerZ)),e.pinOffsets.forEach((u,d)=>{const f=n.centerX+(d===0?-3.25:3.25);t.add(i.lead([new x(u.dx*le,Qe,u.dy*le),new x(u.dx*le,.2,u.dy*le),new x(f,s+.3,n.centerZ)]))}),t}function yc(i,e,t){const n=new Ee,r=nt(e),s=1.2,o=t.diameter*.75,a=i.standard(`cell-wrap-${t.wrap}`,{color:t.wrap,roughness:.4}),c=i.standard("cell-metal",{color:"#c3c9d0",metalness:.95,roughness:.28});n.add(i.box(r.width,s,r.depth,i.blackPlasticMaterial,new x(r.centerX,s/2,r.centerZ)));for(const d of[-1,1])n.add(i.box(1.6,o,r.depth,i.blackPlasticMaterial,new x(r.centerX+d*(r.width/2-.8),s+o/2,r.centerZ))),n.add(i.box(r.width,o*.5,1,i.blackPlasticMaterial,new x(r.centerX,s+o*.25,r.centerZ+d*(r.depth/2-.5))));const l=t.plusTowardRight.length,h=r.depth/l,u=s+t.diameter/2+.3;return t.plusTowardRight.forEach((d,f)=>{const g=r.back+(f+.5)*h,_=it(t.diameter/2,t.length-1.5,a,new x(r.centerX,u,g));_.rotation.z=Math.PI/2,n.add(_);const m=r.centerX+(d?1:-1)*(t.length/2-.75),p=it(t.diameter*.2,1.5,c,new x(m,u,g));p.rotation.z=Math.PI/2,n.add(p)}),ft(n,i,e.pinOffsets,s*.5,.8,.4),n}function d_(i,e,t){const n=new Ee,r=nt(e),s=1,o=5.5,a=i.standard("resonator-orange",{color:"#d78736",roughness:.6});n.add(i.box(r.width,o,r.depth,a,new x(r.centerX,s+o/2,r.centerZ)));const c=nn(t||"4.00",r.width*.8,1.6,"#47321c");return c.position.set(r.centerX,s+o*.6,r.front+.01),n.add(c),e.pinOffsets.forEach((l,h)=>{n.add(i.lead([new x(l.dx*le,Qe,l.dy*le),new x(l.dx*le,.2,l.dy*le),new x(r.centerX+(h-1)*2.5,s+.2,r.centerZ)]))}),n}function f_(i,e){const t=new Ee,n=nt(e),r=2.2,s=3.2,o=n.centerX+.4,a=i.standard("coin-cell",{color:"#c3c9d0",metalness:.95,roughness:.28}),c=i.standard("coin-clip",{color:"#d8dde3",metalness:.9,roughness:.3});t.add(it(Math.min(n.width,n.depth)/2,r,i.blackPlasticMaterial,new x(n.centerX,r/2,n.centerZ))),t.add(it(10,s,a,new x(o,r+s/2,n.centerZ))),pn(t,"CR2032 +",11,2.6,new x(o,r+s+.01,n.centerZ),"#5b6570");const h=e.pinOffsets[0].dx*le;return t.add(i.box(8,.4,4,c,new x(h+3.2,r+s+.25,n.centerZ))),t.add(i.box(.4,r+s,4,c,new x(h-.6,(r+s)/2,n.centerZ))),ft(t,i,e.pinOffsets,r*.5,.6,.4),t}function p_(i,e,t){const n=new Ee,r=nt(e),s=.8,o=3.5,a=i.standard("crystal-can",{color:"#c3c9d0",metalness:.95,roughness:.3}),c=(l,h,u,d)=>{const f=h/2,g=(l-h)/2,_=new Pn;_.absarc(g,0,f,-Math.PI/2,Math.PI/2,!1),_.absarc(-g,0,f,Math.PI/2,Math.PI*1.5,!1),_.closePath();const m=new mn(_,{depth:u,bevelEnabled:!1,curveSegments:24});m.rotateX(-Math.PI/2);const p=new De(m,a);p.position.set(r.centerX,d,r.centerZ),p.castShadow=!0,n.add(p)};return c(r.width,r.depth,.45,s),c(r.width-.5,r.depth-.5,o-.35,s+.35),pn(n,t||"HC-49US",r.width*.72,1.5,new x(r.centerX,s+o+.01,r.centerZ),"#424951"),e.pinOffsets.forEach((l,h)=>{n.add(i.lead([new x(l.dx*le,Qe,l.dy*le),new x(l.dx*le,.2,l.dy*le),new x(r.centerX+(h===0?-2.44:2.44),s+.2,r.centerZ)]))}),n}function m_(i,e){const t=new Ee,n=nt(e),r=10.7,s=6.5,o=3.5,a=i.standard("barrel-hole",{color:"#07080a",roughness:.9});t.add(i.box(n.width-o,r-.6,n.depth-.4,i.blackPlasticMaterial,new x(n.left+(n.width-o)/2,(r-.6)/2,n.centerZ))),t.add(i.box(o,r,n.depth,i.blackPlasticMaterial,new x(n.right-o/2,r/2,n.centerZ)));const c=(l,h,u,d=a)=>{const f=it(l,h,d,new x(u,s,n.centerZ));return f.rotation.z=Math.PI/2,f};t.add(c(3.2,.1,n.right+.01)),t.add(c(1,1.2,n.right-.5,i.leadMaterial));for(const l of e.pinOffsets){const h=l.dx*le,u=l.dy*le,d=u>=n.back&&u<=n.front;t.add(i.lead(d?[new x(h,Qe,u),new x(h,.6,u)]:[new x(h,Qe,u),new x(h,3,u),new x(h,3,n.back+.3)]))}return t}function Sc(i,e,t,n,r){const s=new Ee,o=nt(e),a=1,c=i.standard(`dht-${t}`,{color:t,roughness:.6}),l=i.standard("dht-vent",{color:"#30353c",roughness:.8});s.add(i.box(o.width,n,o.depth,c,new x(o.centerX,a+n/2,o.centerZ)));const h=Math.max(3,Math.floor(o.width/2.4)),u=Math.max(3,Math.floor(n*.55/2.4));for(let f=0;f<h;f++)for(let g=0;g<u;g++){const _=o.left+(f+.5)*o.width/h,m=a+n*.92-(g+.5)*2.4;s.add(i.box(1.2,1.5,.06,l,new x(_,m,o.front+.02)))}const d=nn(r,o.width*.7,1.8,"#4b5563");return d.position.set(o.centerX,a+n*.2,o.front+.01),s.add(d),ft(s,i,e.pinOffsets,a+.3,.5,.3),s}function g_(i,e){const t=new Ee,n=nt(e),r=.5,s=4.5,o=r+s,a=i.standard("dip-switch-red",{color:"#b5282e",roughness:.5}),c=i.standard("dip-switch-actuator",{color:"#f5efe2",roughness:.55});return t.add(i.box(n.width,s,n.depth,a,new x(n.centerX,r+s/2,n.centerZ))),[...new Set(e.pinOffsets.map(h=>h.dx))].sort((h,u)=>h-u).forEach((h,u)=>{const d=h*le;t.add(i.box(1.8,.08,3.1,i.blackPlasticMaterial,new x(d,o+.02,n.centerZ))),t.add(i.box(1.45,.75,1.25,c,new x(d,o+.4,n.centerZ+.7))),pn(t,String(u+1),1.7,1.1,new x(d,o+.01,n.front-.9))}),pn(t,"ON",Math.min(n.width-1,4),1.1,new x(n.centerX,o+.01,n.back+1)),ft(t,i,e.pinOffsets,r+.3),t}function __(i,e){const t=new Ee,n=nt(e),r=4.85,s=2,o=4.5,a=s+o,c=i.standard("mic-can",{color:"#9aa3ad",metalness:.9,roughness:.35}),l=i.standard("mic-felt",{color:"#1d2025",roughness:.95});return t.add(it(r,o,c,new x(n.centerX,s+o/2,n.centerZ))),t.add(it(r-.9,.08,l,new x(n.centerX,a+.04,n.centerZ))),ft(t,i,e.pinOffsets,s+.2,.45,.45),t}function v_(i,e){const t=new Ee,n=8.5,r=le-.04,s=1.05,o=(r-s)/2,a=i.standard("socket-contact",{color:"#b49a58",metalness:1,roughness:.4});for(const c of e){const l=c.dx*le,h=c.dy*le;t.add(i.box(r,n-1.5,r,i.blackPlasticMaterial,new x(l,(n-1.5)/2,h))),t.add(i.box(s,.08,s,a,new x(l,n-1.46,h)));for(const u of[-1,1])t.add(i.box(o,1.5,r,i.blackPlasticMaterial,new x(l+u*(r-o)/2,n-.75,h))),t.add(i.box(s,1.5,o,i.blackPlasticMaterial,new x(l,n-.75,h+u*(r-o)/2)))}return ft(t,i,e,.2,.64,.64),t}function x_(i,e,t){const n=new Ee,r=nt(e),s=1,o=6.5,a=i.standard("film-capacitor-red",{color:"#b62a32",roughness:.5});n.add(i.box(r.width,o,r.depth,a,new x(r.centerX,s+o/2,r.centerZ)));const c=t?Di(t,"F"):void 0,l=c!==void 0?Zr(c,"F"):t||"MKS 2",h=nn(l,r.width*.84,1.5,"#f0d9b1");return h.position.set(r.centerX,s+o*.58,r.front+.01),n.add(h),pn(n,"WIMA",r.width*.8,1.3,new x(r.centerX,s+o+.01,r.centerZ),"#f0d9b1"),e.pinOffsets.forEach((u,d)=>{n.add(i.lead([new x(u.dx*le,Qe,u.dy*le),new x(u.dx*le,.2,u.dy*le),new x(r.centerX+(d===0?-2.5:2.5),s+.2,r.centerZ)]))}),n}function M_(i,e,t){const n=new Ee,r=nt(e),s=.4,o=3.2,a=s+o,c=a+3.4,l=i.standard("fuse-clip",{color:"#cfd5db",metalness:.9,roughness:.3}),h=i.standard("fuse-glass",{color:"#d9eef7",roughness:.08,transparent:!0,opacity:.45}),u=i.standard("fuse-element",{color:"#8f9aa5",metalness:.8,roughness:.4});n.add(i.box(r.width,o,r.depth,i.blackPlasticMaterial,new x(r.centerX,s+o/2,r.centerZ)));for(const f of[-1,1])n.add(i.box(1.2,c+2.8-a,r.depth,i.blackPlasticMaterial,new x(r.centerX+f*(r.width/2-.6),(a+c+2.8)/2,r.centerZ)));const d=(f,g,_,m=l)=>{const p=it(f,g,m,new x(_,c,r.centerZ));return p.rotation.z=Math.PI/2,p};n.add(d(2.3,15,r.centerX,h)),n.add(d(.12,15,r.centerX,u));for(const f of[-1,1]){const g=r.centerX+f*7.4;n.add(d(2.5,5.2,g)),n.add(i.box(4,c-a,.35,l,new x(g,(a+c)/2,r.centerZ-2.6))),n.add(i.box(4,c-a,.35,l,new x(g,(a+c)/2,r.centerZ+2.6)))}if(t){const f=nn(t,r.width*.4,1.6,"#e2e8f0");f.position.set(r.centerX,s+o/2,r.front+.01),n.add(f)}ft(n,i,e.pinOffsets,s+.3,.8,.5);for(const f of e.pinOffsets){const g=f.dx*le,_=r.centerX+Math.sign(g-r.centerX)*7.4;n.add(i.box(Math.abs(g-_)+.8,.35,1.6,l,new x((g+_)/2,a+.18,r.centerZ)))}return n}function y_(i,e){const t=new Ee,n=nt(e),r=1.2,s=6.95,o=i.standard("ir-receiver-body",{color:"#17191c",roughness:.35}),a=n.depth-1,c=n.back;t.add(i.box(n.width,s,a,o,new x(n.centerX,r+s/2,c+a/2)));const l=new De(new Kn(1,24,16,0,Math.PI*2,0,Math.PI/2),o);return l.rotation.x=Math.PI/2,l.scale.set(1.9,1.1,2.1),l.position.set(n.centerX,r+s*.62,c+a),l.castShadow=!0,t.add(l),ft(t,i,e.pinOffsets,r+.3,.5,.4),t}function S_(i,e){const t=new Ee,n=nt(e),r=7,s=1.5,o=.6,a=i.standard("jst-nylon",{color:"#efe6cc",roughness:.6}),c=i.standard("jst-pin",{color:"#d9c27a",metalness:.9,roughness:.35});t.add(i.box(n.width,s,n.depth,a,new x(n.centerX,s/2,n.centerZ)));const l=r-s,h=s+l/2;t.add(i.box(n.width,l,o,a,new x(n.centerX,h,n.front-o/2))),t.add(i.box(o,l,n.depth,a,new x(n.left+o/2,h,n.centerZ))),t.add(i.box(o,l,n.depth,a,new x(n.right-o/2,h,n.centerZ)));const u=Math.min(2.4,n.width*.3),d=(n.width-u)/2;for(const f of[-1,1])t.add(i.box(d,l,o,a,new x(n.centerX+f*(u+d)/2,h,n.back+o/2)));for(const f of e.pinOffsets)t.add(i.box(.64,r-.5-s,.64,c,new x(f.dx*le,s+(r-.5-s)/2,f.dy*le)));return ft(t,i,e.pinOffsets,s,.64,.64),t}function b_(i,e){const t=new Ee,n=nt(e),r=i.standard("jumper-blue",{color:"#2458bc",roughness:.48});t.add(i.box(n.width,5.8,n.depth,r,new x(n.centerX,5.5,n.centerZ))),t.add(i.box(n.width,.45,n.depth+.25,r,new x(n.centerX,8.4,n.centerZ)));const s=i.standard("gold-pin",{color:"#e0b54a",metalness:1,roughness:.28});for(const o of e.pinOffsets){const a=o.dx*le,c=o.dy*le;t.add(i.box(le-.06,2.5,le-.06,i.blackPlasticMaterial,new x(a,1.25,c))),t.add(i.box(.64,3.2-Qe,.64,s,new x(a,(3.2+Qe)/2,c)))}return t}function E_(i,e){const t=new Ee,n=nt(e),r=.5,s=8.5,o=r+s,a=i.standard("latching-housing",{color:"#2b4a73",roughness:.5}),c=i.standard("latching-plunger",{color:"#e5e7eb",roughness:.45});return t.add(i.box(n.width,s,n.depth,a,new x(n.centerX,r+s/2,n.centerZ))),t.add(i.box(3.6,4,3.6,c,new x(n.centerX,o+2,n.centerZ))),t.add(i.box(2.2,.06,2.2,i.standard("latching-plunger-top",{color:"#cbd0d6",roughness:.5}),new x(n.centerX,o+4.03,n.centerZ))),ft(t,i,e.pinOffsets,r+.3,.5,.3),t}function w_(i,e){const t=new Ee,n=nt(e),r=2.55,s=1.8,o=2,a=s+o,c=i.standard("ldr-ceramic",{color:"#d4b98a",roughness:.7}),l=i.standard("ldr-face",{color:"#f0dbb3",roughness:.65}),h=i.standard("ldr-track",{color:"#aa4e27",roughness:.65});t.add(it(r,o,c,new x(n.centerX,s+o/2,n.centerZ))),t.add(it(r-.2,.08,l,new x(n.centerX,a+.04,n.centerZ)));const u=[];for(let d=0;d<7;d++){const f=(d-3)*.55,g=Math.sqrt(Math.pow(r-.5,2)-f*f),_=d%2===0?1:-1;u.push(new x(n.centerX-_*g,a+.12,n.centerZ+f)),u.push(new x(n.centerX+_*g,a+.12,n.centerZ+f))}return t.add(i.bentWire(u,.1,h)),e.pinOffsets.forEach((d,f)=>{t.add(i.lead([new x(d.dx*le,Qe,d.dy*le),new x(d.dx*le,.4,d.dy*le),new x(n.centerX+(f===0?-1.7:1.7),s+.3,n.centerZ)]))}),t}function T_(i,e){const t=new Ee,n=nt(e),r=.5,s=8,o=r+s,a=i.standard("bargraph-housing",{color:"#2a2a2e",roughness:.6}),c=i.standard("bargraph-red",{color:"#d02a3a",emissive:"#d02a3a",emissiveIntensity:.18,roughness:.35});t.add(i.box(n.width,s,n.depth,a,new x(n.centerX,r+s/2,n.centerZ)));const l=[...new Set(e.pinOffsets.map(h=>h.dx))];for(const h of l)t.add(i.box(1.3,.1,n.depth*.45,c,new x(h*le,o+.04,n.centerZ)));return ft(t,i,e.pinOffsets,r+.3,.5,.3),t}function bc(i,e){const t=new Ee,n=nt(e),r=.6,s=2.3;t.add(i.box(n.width,s,n.depth,i.blackPlasticMaterial,new x(n.centerX,r+s/2,n.centerZ))),t.add(i.box(n.width-.3,.35,n.depth-.3,i.leadMaterial,new x(n.centerX,r+s,n.centerZ)));const o=Math.min(n.width,n.depth)*.28;t.add(it(o+.3,.25,i.blackPlasticMaterial,new x(n.centerX,r+s+.22,n.centerZ))),t.add(it(o,1.8,i.standard("button-red",{color:"#d9413c",roughness:.45}),new x(n.centerX,r+s+1,n.centerZ)));for(const a of[-1,1])for(const c of[-1,1])t.add(it(.25,.12,i.blackPlasticMaterial,new x(n.centerX+a*(n.width/2-.65),r+s+.22,n.centerZ+c*(n.depth/2-.65))));return ft(t,i,e.pinOffsets,r+.4),t}function A_(i,e,t){const n=new Ee,r=nt(e),s=.4,o=10.8,a=i.standard("relay-blue",{color:"#24658d",roughness:.48});n.add(i.box(r.width-.2,.8,r.depth-.2,i.blackPlasticMaterial,new x(r.centerX,s+.4,r.centerZ))),n.add(i.box(r.width,o,r.depth,a,new x(r.centerX,s+.7+o/2,r.centerZ)));const c=s+.7+o+.01;pn(n,"G5V-2",r.width*.75,2.2,new x(r.centerX,c,r.centerZ-1.8)),pn(n,t||"DPDT RELAY",r.width*.75,1.5,new x(r.centerX,c,r.centerZ+1.2));const l=e.pinOffsets[0];return n.add(it(.45,.03,i.blackPlasticMaterial,new x(l.dx*le,c,l.dy*le))),ft(n,i,e.pinOffsets,s+.3,.5,.4),n}function R_(i,e){const t=new Ee,n=e.pinOffsets.reduce((h,u)=>h+u.dx*le,0)/e.pinOffsets.length,r=3,s=.7,o=4.5,a=2.5,c=new Fr({color:"#eef3f8",transparent:!0,opacity:.38,roughness:.12,clearcoat:1,depthWrite:!1});t.add(it(2.9,s,c,new x(n,r+s/2,0))),t.add(it(a,o,c,new x(n,r+s+o/2,0)));const l=new De(new Kn(a,32,16,0,Math.PI*2,0,Math.PI/2),c);return l.position.set(n,r+s+o,0),l.castShadow=!0,t.add(l),e.pinOffsets.forEach((h,u)=>{const d=n+(u-1.5)*1.27;t.add(i.lead([new x(h.dx*le,Qe,h.dy*le),new x(h.dx*le,1.2,h.dy*le),new x(d,r,0),new x(d,r+2.3,0)]))}),["#ef4444","#22c55e","#3b82f6"].forEach((h,u)=>{const d=i.standard(`rgb-emitter:${h}`,{color:h,emissive:h,emissiveIntensity:.3,roughness:.3});t.add(i.box(.7,.5,.8,d,new x(n+(u-1)*1.1,r+2.5,.15)))}),t}function C_(i,e){const t=new Ee,n=nt(e),r=.5,s=4.4,o=2.1,a=r+s+o,c=i.standard("encoder-metal",{color:"#b9c1ca",metalness:.9,roughness:.35}),l=i.standard("encoder-shaft",{color:"#dfe3e8",metalness:.9,roughness:.45});t.add(i.box(n.width-.4,s,n.depth-.4,i.blackPlasticMaterial,new x(n.centerX,r+s/2,n.centerZ))),t.add(i.box(n.width,o,n.depth,c,new x(n.centerX,r+s+o/2,n.centerZ)));const h=5,u=13;t.add(it(3.5,h,c,new x(n.centerX,a+h/2,n.centerZ)));const d=a+h;t.add(it(3,u,l,new x(n.centerX,d+u/2,n.centerZ))),t.add(it(3.05,7,i.standard("encoder-knurl",{color:"#9aa3ad",metalness:.85,roughness:.6}),new x(n.centerX,d+u-3.5,n.centerZ))),t.add(i.box(4,.06,.5,i.blackPlasticMaterial,new x(n.centerX,d+u+.02,n.centerZ)));for(const f of e.pinOffsets){const g=f.dx*le,_=f.dy*le,m=Math.min(Math.max(_,n.back+.6),n.front-.6);t.add(i.lead([new x(g,Qe,_),new x(g,r+.6,_),new x(g,r+.6,m)]))}return t}function P_(i,e){const t=new Ee,n=nt(e),r=.3,s=8.5,o=r+s,a=i.standard("terminal-green",{color:"#218454",roughness:.48}),c=i.standard("terminal-recess",{color:"#0b261b",roughness:.8});t.add(i.box(n.width,s,n.depth,a,new x(n.centerX,r+s/2,n.centerZ)));for(const l of e.pinOffsets){const h=l.dx*le,u=n.back+n.depth*.43;t.add(it(1.8,.1,c,new x(h,o+.02,u))),t.add(it(1.4,.16,i.leadMaterial,new x(h,o+.06,u)));const d=i.box(2.4,.03,.35,c,new x(h,o+.15,u));d.rotation.y=Math.PI/5,t.add(d),t.add(i.box(3.4,3.2,.06,c,new x(h,r+3.5,n.front+.02))),t.add(i.box(2.5,.45,.08,i.leadMaterial,new x(h,r+2.25,n.front+.06)))}return ft(t,i,e.pinOffsets,r+.2,.8,.7),t}function Ec(i,e,t=1){const n=new Ee,r=nt(e),s=.6,o=7,a=s+o,c=i.standard("seven-segment-housing",{color:"#ece7df",roughness:.55}),l=i.standard("seven-segment-face",{color:"#29282b",roughness:.65}),h=i.standard("seven-segment-red",{color:"#bd2538",emissive:"#bd2538",emissiveIntensity:.14,roughness:.4});n.add(i.box(r.width,o,r.depth,c,new x(r.centerX,s+o/2,r.centerZ))),n.add(i.box(r.width-.5,.08,r.depth-.5,l,new x(r.centerX,a+.01,r.centerZ)));const u=r.width/t,d=u*.27,f=r.depth*.31,g=Math.min(u*.075,1.05),_=(m,p,b=!1)=>{const v=new Pn;v.moveTo(-m/2,0),v.lineTo(-m/2+g/2,g/2),v.lineTo(m/2-g/2,g/2),v.lineTo(m/2,0),v.lineTo(m/2-g/2,-g/2),v.lineTo(-m/2+g/2,-g/2),v.closePath();const M=new mn(v,{depth:.08,bevelEnabled:!1});M.rotateX(-Math.PI/2);const C=new De(M,h);C.position.copy(p),b&&(C.rotation.y=Math.PI/2),n.add(C)};for(let m=0;m<t;m++){const p=r.left+m*u,b=p+u/2-u*.06;for(const v of[-f,0,f])_(d*2-g*.5,new x(b,a+.06,r.centerZ+v));for(const v of[-1,1])for(const M of[-1,1])_(f-g*.5,new x(b+v*d,a+.06,r.centerZ+M*f/2),!0);n.add(it(g*.58,.08,h,new x(p+u-g*1.35,a+.1,r.centerZ+f)))}return ft(n,i,e.pinOffsets,s+.3,.5,.4),n}function L_(i,e){const t=new Ee,n=nt(e),r=.5,s=4;t.add(i.box(n.width,s,n.depth,i.leadMaterial,new x(n.centerX,r+s/2,n.centerZ))),t.add(i.box(n.width*.7,.08,n.depth*.65,i.blackPlasticMaterial,new x(n.centerX,r+s+.03,n.centerZ)));const o=n.centerX-n.width*.17;t.add(i.box(n.width*.3,2.8,n.depth*.5,i.blackPlasticMaterial,new x(o,r+s+1.4,n.centerZ)));const a=i.standard("switch-ridges",{color:"#363b42",roughness:.6});for(const c of[-.6,0,.6])t.add(i.box(.15,.15,n.depth*.5,a,new x(o+c,r+s+2.85,n.centerZ)));return ft(t,i,e.pinOffsets,r+.2),t}function D_(i,e){const t=new Ee,n=nt(e),r=4.5,s=i.standard("thermistor-coating",{color:"#737980",roughness:.62}),o=new De(new Kn(1,32,20),s);o.scale.set(n.width/2,2.5,n.depth/2),o.position.set(n.centerX,r,n.centerZ),o.castShadow=!0,t.add(o);const a=it(.38,.04,i.standard("thermistor-dot",{color:"#2183c2",roughness:.5}),new x(n.centerX,r+.55,n.front-.01));return a.rotation.x=Math.PI/2,t.add(a),ft(t,i,e.pinOffsets,r-1.3,.5,.4),t}function I_(i,e){const t=new Ee,n=nt(e),r=.6,s=9.5,o=r+s,a=i.standard("toggle-metal",{color:"#c4cad2",metalness:.95,roughness:.3});t.add(i.box(n.width,s-1,n.depth,i.blackPlasticMaterial,new x(n.centerX,r+(s-1)/2,n.centerZ))),t.add(i.box(n.width,1,n.depth,a,new x(n.centerX,o-.5,n.centerZ))),t.add(it(3,7,a,new x(n.centerX,o+3.5,n.centerZ)));const c=new De(new dn(4.6,4.6,1.8,6),a);c.position.set(n.centerX,o+2.2,n.centerZ),c.castShadow=!0,t.add(c);const l=new x(n.centerX,o+6.5,n.centerZ),h=new x(n.centerX+3.6,o+15,n.centerZ),u=i.rod(l,h,1.1,a);return u&&t.add(u),t.add(i.ball(h,1.4,a)),ft(t,i,e.pinOffsets,r+.3,.8,.5),t}function U_(i,e,t){const n=new Ee,r=nt(e),s=.5,o=10,a=i.standard("trimmer-blue",{color:"#1c68b2",roughness:.45}),c=i.standard("trimmer-screw",{color:"#d8b664",metalness:.85,roughness:.35});n.add(i.box(r.width,o,r.depth,a,new x(r.centerX,s+o/2,r.centerZ)));const l=r.left+Math.min(r.depth,r.width)*.52,h=Math.min(r.depth*.38,1.6);n.add(it(h,.65,c,new x(l,s+o+.32,r.centerZ))),n.add(i.box(h*1.6,.04,.35,i.blackPlasticMaterial,new x(l,s+o+.66,r.centerZ)));const u=t?Di(t,"\u03A9"):void 0,d=nn(u!==void 0?Zr(u,"\u03A9"):t||"3296",r.width*.8,1.7,"#e2e8f0");return d.position.set(r.centerX,s+o*.65,r.front+.01),n.add(d),ft(n,i,e.pinOffsets,s+.2),n}function N_(i,e,t,n){if(!t)return null;switch(e.definitionId){case"screw-terminal-2":case"screw-terminal-3":return P_(i,t);case"push-button":return bc(i,t);case"slide-switch":return L_(i,t);case"trimmer":return U_(i,t,e.value);case"female-header":return v_(i,n);case"jumper-cap":return b_(i,t);case"buzzer":return u_(i,t);case"relay-dpdt":return A_(i,t,e.value);case"rgb-led-cathode":case"rgb-led-anode":return R_(i,t);case"crystal-hc49":return p_(i,t,e.value);case"ceramic-resonator":return d_(i,t,e.value);case"ldr":return w_(i,t);case"thermistor":return D_(i,t);case"film-capacitor":return x_(i,t,e.value);case"dip-switch-2":case"dip-switch-4":case"dip-switch-8":return g_(i,t);case"seven-segment-cc":case"seven-segment-ca":return Ec(i,t);case"fuse-holder":return M_(i,t,e.value);case"rotary-encoder":return C_(i,t);case"dc-barrel-jack":return m_(i,t);case"tactile-6x6":return bc(i,t);case"latching-switch":return E_(i,t);case"toggle-spdt":case"toggle-dpdt":return I_(i,t);case"led-bargraph-10":return T_(i,t);case"seven-segment-4-cc":case"seven-segment-4-ca":return Ec(i,t,4);case"ir-receiver":return y_(i,t);case"dht22":return Sc(i,t,"#f1f2f0",25,"DHT22");case"dht11":return Sc(i,t,"#3d8fd1",15.5,"DHT11");case"electret-mic":return __(i,t);case"audio-jack-3-5mm":return h_(i,t);case"jst-xh-2":case"jst-xh-3":case"jst-xh-4":return S_(i,t);case"coin-cell-holder":return f_(i,t);case"battery-2xaa":return yc(i,t,{diameter:14.5,length:50.5,wrap:"#2f7d4a",plusTowardRight:[!1,!0]});case"battery-18650":return yc(i,t,{diameter:18.6,length:65,wrap:"#2563a6",plusTowardRight:[!1]});default:return null}}function O_(i,e,t){const n=new Ee,r=i.blackPlasticMaterial,s=i.standard("gold-pin",{color:"#e0b54a",metalness:1,roughness:.28}),o=2.5,a=o+6;for(let c=0;c<e;c++)for(let l=0;l<t;l++){const h=l*le,u=c*le;n.add(i.box(le-.06,o,le-.06,r,new x(h,o/2,u))),n.add(i.box(.64,a-Qe,.64,s,new x(h,(a+Qe)/2,u)))}return n}function F_(i,e){const t=new Ee,n=-.3*le,r=4.3*le,s=-1.3*le,o=.3*le,a=.6,c=12,l=(n+r)/2,h=a+c/2,u=i.standard("pot-body",{color:"#2d3138",roughness:.55}),d=i.standard("pot-metal",{color:"#c4cad2",metalness:1,roughness:.3});t.add(i.box(r-n,c,o-s,u,new x(l,a+c/2,(o+s)/2)));const f=(M,C,T,w=40)=>{const U=new De(new dn(M,M,C,w),d);return U.rotation.x=Math.PI/2,U.position.set(l,h,T+C/2),U.castShadow=!0,U};t.add(f(5.6,.5,o));const g=2.3*le;t.add(f(3.4,g-o-.5,o+.5,28));const _=7,m=f(3,_,g,36);m.material=i.standard("pot-shaft",{color:"#dfe3e8",metalness:.9,roughness:.45}),t.add(m),t.add(i.box(6,.7,.6,i.blackPlasticMaterial,new x(l,h,g+_+.01)));const p=new Ee;ft(p,i,[{dx:0,dy:0},{dx:2,dy:0},{dx:4,dy:0}],a+.2,1,.4),t.add(p);const b=e?Di(e,"\u03A9"):void 0,v=b!==void 0?Zr(b,"\u03A9"):e;if(v){const M=nn(v,(r-n)*.7,2.2,"#e2e8f0");M.rotation.x=-Math.PI/2,M.position.set(l,a+c+.01,(o+s)/2),t.add(M)}return t}function Ws(i,e){const t=new Ee,n=10,r=9.2,s=4.5,o=3.5,a=le,c=o+r,l=1.3,h=n-.2,u=-s/2,d=u+l/2;t.add(i.box(n,r,s/2-d,i.standard("to220-body",{color:"#26292d",roughness:.5}),new x(a,o+r/2,(d+s/2)/2)));const f=o+.8,g=c+6.5-f,_=new Pn;_.moveTo(-h/2,0),_.lineTo(h/2,0),_.lineTo(h/2,g-.8),_.lineTo(h/2-.8,g),_.lineTo(-h/2+.8,g),_.lineTo(-h/2,g-.8),_.lineTo(-h/2,0);const m=new Xr;m.absarc(0,g-3.2,1.8,0,Math.PI*2,!0),_.holes.push(m);const p=new De(new mn(_,{depth:l,bevelEnabled:!1,curveSegments:24}),i.standard("to220-tab",{color:"#b9c2cc",metalness:1,roughness:.28}));p.position.set(a,f,u),p.castShadow=!0,t.add(p);const b=new Ee;if(ft(b,i,[{dx:0,dy:0},{dx:1,dy:0},{dx:2,dy:0}],o+.3,.8,.5),t.add(b),e){const v=nn(e,n*.8,1.6,"#c7ced6");v.position.set(a,o+r*.55,s/2+.01),t.add(v)}return t}function wc(i,e){const t=new Ee,n=2.4,r=1.4,s=4.6,o=2.8,a=Math.sqrt(n*n-r*r),c=Math.atan2(-r,a),l=new Pn;l.moveTo(-a,-r),l.lineTo(a,-r),l.absarc(0,0,n,c,Math.PI-c,!1);const h=new mn(l,{depth:s,bevelEnabled:!0,bevelThickness:.15,bevelSize:.12,bevelSegments:2,curveSegments:24});h.rotateX(-Math.PI/2);const u=new De(h,i.standard("to92-body",{color:"#2b2f34",roughness:.5}));u.position.set(le,o,0),u.castShadow=!0,t.add(u);for(let d=0;d<3;d++){const f=le+(d-1)*1.27;t.add(i.lead([new x(d*le,Qe,0),new x(d*le,1.2,0),new x(f,o,0),new x(f,o+.4,0)]))}if(e){const d=nn(e,a*1.8,1.1,"#c7ced6");d.position.set(le,o+s*.62,r+.13),t.add(d)}return t}function B_(i,e){const t=new Ee,n=e.map(l=>l.dx*le),r=e.map(l=>l.dy*le),s=Math.min(...n),o=Math.max(...n),a=Math.min(...r),c=Math.max(...r);t.add(i.box(o-s+2,3,c-a+2,i.blackPlasticMaterial,new x((s+o)/2,2.5,(a+c)/2)));for(const l of e)t.add(i.lead([new x(l.dx*le,Qe,l.dy*le),new x(l.dx*le,1.2,l.dy*le)]));return t}const z_="#1f2937",ks=2.5,Xs=1.6;function H_(i,e){var d;const t=new Ee,n=i.blackPlasticMaterial,r=i.standard("gold-pin",{color:"#e0b54a",metalness:1,roughness:.28}),s=i.standard("module-solder",{color:"#d7dbe0",metalness:1,roughness:.22}),o=(d=e.bodyColor)!=null?d:z_,a=i.standard(`custom-board:${o}`,{color:o,roughness:.45}),c=ks,l=c+Xs;for(const{dx:f,dy:g}of e.pinOffsets){const _=f*le,m=g*le;t.add(i.box(le-.06,ks,le-.06,n,new x(_,ks/2,m))),t.add(i.box(.64,l+1.1-Qe,.64,r,new x(_,(l+1.1+Qe)/2,m)));const p=i.ball(new x(_,l,m),.8,s);p.scale.y=.45,t.add(p)}const h=nt(e);t.add(i.box(h.width,Xs,h.depth,a,new x(h.centerX,c+Xs/2,h.centerZ)));const u=Math.max(2,h.width*.8);return pn(t,e.name,u,Math.min(2.4,h.depth*.5),new x(h.centerX,l+.01,h.centerZ),"#f1f5f9"),t}function G_(i,e){var o;const t=jl(e),n=t?Kl(t,e.rows,e.cols):[{dx:0,dy:0}];if(t){const a=Rc({x:e.anchorX,y:e.anchorY}),c=Jl(t,{at:a,rotation:e.rotationAngle,rows:e.rows,cols:e.cols});for(const l of c.pins)i.solder(wi(l.x),wi(l.y))}else i.solder(e.anchorX,e.anchorY);const r=$l(e);let s;switch(r){case"transistor":s=wc(i,e.value);break;case"mosfet":s=Ws(i,e.value);break;case"regulator-7805":s=Ws(i,e.value||"7805");break;case"regulator-lm317":s=Ws(i,e.value||"LM317");break;case"ds18b20":s=wc(i,e.value||"DS18B20");break;case"potentiometer":s=F_(i,e.value);break;case"header-pins":s=O_(i,e.rows,e.cols);break;default:s=r===Ql&&t?H_(i,t):(o=N_(i,{...e,definitionId:r},t,n))!=null?o:B_(i,n)}return s.position.copy(i.frame.point(e.anchorX,e.anchorY)),s.rotation.y=-e.rotationAngle*Math.PI/180,s}function V_(i,e){const{frame:t}=i,n=Rc({x:e.left,y:e.top});return th({at:n,widthPin:e.widthPin,heightPin:e.heightPin,rotation:e.rotationAngle}).map(({pin:r,at:[s,o],side:a})=>{const c=wi(s),l=wi(o);return{pin:r,px:c,py:l,x:t.x(c),z:t.z(l),side:a}})}const co={0:"top",90:"right",180:"bottom",270:"left"},W_={0:[0,0],90:[1,0],180:[1,1],270:[0,1]};function k_(i,e){const t=e.pinDescription[i.pin];return t?i.side==="right"||i.side==="bottom"?`${t}:${i.pin}`:`${i.pin}:${t}`:String(i.pin)}function Al(i,e,t,n){const r=i.x1-i.x0,s=i.z1-i.z0,o=Math.min(40,2048/Math.max(r,s)),a=Ei(r*o,s*o,(c,l,h)=>{var T;const u=w=>(w-i.x0)*o,d=w=>(w-i.z0)*o;if(c.fillStyle=n.background,c.fillRect(0,0,l,h),n.pads)for(const w of t)c.fillStyle="#d8b25a",c.beginPath(),c.arc(u(w.x),d(w.z),.85*o,0,Math.PI*2),c.fill();if(n.notchColor){const w=co[e.rotationAngle],[U,S]=w==="top"?[l/2,0]:w==="bottom"?[l/2,h]:w==="left"?[0,h/2]:[l,h/2];c.fillStyle=n.notchColor,c.beginPath(),c.arc(U,S,1*o,0,Math.PI*2),c.fill();const[R,N]=W_[e.rotationAngle];c.beginPath(),c.arc(R?l-1.1*o:1.1*o,N?h-1.1*o:1.1*o,.45*o,0,Math.PI*2),c.fill()}const f=.6*o,g=(n.pads?1.2:.35)*o;c.fillStyle=n.labelColor,c.font=`600 ${f}px ${oo}`;for(const w of t){const U=k_(w,e),S=u(w.x),R=d(w.z);if(w.side==="left"||w.side==="right"){c.textBaseline="middle",c.textAlign=w.side==="left"?"left":"right";const N=w.side==="left"?Math.max(0,S)+g:Math.min(l,S)-g;c.fillText(U,N,R,l/2-g*1.5)}else{c.textAlign="center",c.textBaseline=w.side==="top"?"top":"bottom";const N=w.side==="top"?Math.max(0,R)+g:Math.min(h,R)-g;c.fillText(U,S,N,le*o*.95)}}c.save();const _=(T=n.nameShift)!=null?T:0,m=co[e.rotationAngle],[p,b]=m==="top"?[0,h]:m==="bottom"?[0,-h]:m==="left"?[l,0]:[-l,0];c.translate(l/2+p*_,h/2+b*_);const v=h>l;v&&c.rotate(-Math.PI/2);const M=v?h:l,C=v?l:h;c.fillStyle=n.text,El(c,e.name,M*(_?.9-2.2*_:.62),Math.min(C*.22,2.2*o),"700"),c.textAlign="center",c.textBaseline="middle",c.fillText(e.name,0,0),c.restore()});return new Ht({map:a,roughness:n.pads?.45:.6})}function Rl(i,e){return[i,i,e,i,i,i]}function Cl(i){const e=i.map(n=>n.x),t=i.map(n=>n.z);return{x0:Math.min(...e),x1:Math.max(...e),z0:Math.min(...t),z1:Math.max(...t)}}function X_(i,e,t){const n=new Ee,r=e.rotationAngle===0||e.rotationAngle===180,s=Cl(t),o=.95,a=1.6,c=1.15,l=(T,w)=>{const U=(T+w)/2,S=Math.max(a/2,(w-T)/2-o);return[U-S,U+S]},[h,u]=r?l(s.x0,s.x1):[s.x0-c,s.x1+c],[d,f]=r?[s.z0-c,s.z1+c]:l(s.z0,s.z1),g={x0:h,x1:u,z0:d,z1:f},_=.55,m=3.2,p=i.standard("dip-epoxy",{color:"#1b1d20",roughness:.62}),b=Al(g,e,t,{background:"#1b1d20",text:"#aab3bd",labelColor:"#7f8a96",notchColor:"#0c0d0f"});n.add(i.box(u-h,m,f-d,Rl(p,b),new x((h+u)/2,_+m/2,(d+f)/2)));const v=1.3,M=.4,C=.25;for(const T of t){const w=i.leadMaterial,U=T.side==="left"||T.side==="top"?-1:1;if(T.side==="left"||T.side==="right"){const S=U<0?h:u,R=Math.abs(T.x-S)+C/2;n.add(i.box(R,C,1.1,w,new x((S+T.x)/2+U*C/4,v,T.z))),n.add(i.box(C,v-M,1.1,w,new x(T.x,(v+M)/2,T.z))),n.add(i.box(C,M-Qe,.5,w,new x(T.x,(M+Qe)/2,T.z)))}else{const S=U<0?d:f,R=Math.abs(T.z-S)+C/2;n.add(i.box(1.1,C,R,w,new x(T.x,v,(S+T.z)/2+U*C/4))),n.add(i.box(1.1,v-M,C,w,new x(T.x,(v+M)/2,T.z))),n.add(i.box(.5,M-Qe,C,w,new x(T.x,(M+Qe)/2,T.z)))}}return n}function Y_(i,e,t){const n=new Ee,r=e.rotationAngle===0||e.rotationAngle===180,s=Cl(t),o=1.3,a=1.27,c=2.2,l=co[e.rotationAngle],h=r?{x0:s.x0-o,x1:s.x1+o,z0:s.z0-a-(l==="top"?c:0),z1:s.z1+a+(l==="bottom"?c:0)}:{x0:s.x0-a-(l==="left"?c:0),x1:s.x1+a+(l==="right"?c:0),z0:s.z0-o,z1:s.z1+o},u=2.5,d=1.6,f=u,g=u+d,_=i.blackPlasticMaterial,m=i.standard("gold-pin",{color:"#e0b54a",metalness:1,roughness:.28}),p=i.standard("module-solder",{color:"#d7dbe0",metalness:1,roughness:.22});for(const W of t){n.add(i.box(le-.06,u,le-.06,_,new x(W.x,u/2,W.z))),n.add(i.box(.64,g+1.1-Qe,.64,m,new x(W.x,(g+1.1+Qe)/2,W.z)));const J=i.ball(new x(W.x,g,W.z),.8,p);J.scale.y=.45,n.add(J)}const b=i.standard("module-pcb",{color:"#1f4fa3",roughness:.45}),v=Al(h,e,t,{background:"#1f4fa3",text:"#f1f5f9",labelColor:"#e8eef6",pads:!0,nameShift:.3}),M=(h.x0+h.x1)/2,C=(h.z0+h.z1)/2;n.add(i.box(h.x1-h.x0,d,h.z1-h.z0,Rl(b,v),new x(M,f+d/2,C)));const T=i.box(7,1.2,7,i.standard("qfp",{color:"#202327",roughness:.55}),new x(M,g+.6,C));T.rotation.y=Math.PI/4,n.add(T);const w=i.standard("usb-shell",{color:"#c9cfd6",metalness:1,roughness:.25}),U=7.5,S=2.7,R=9,N=(W,J,L)=>L?W+R/2-1:J-R/2+1;return l==="top"||l==="bottom"?n.add(i.box(U,S,R,w,new x(M,g+S/2,N(h.z0,h.z1,l==="top")))):n.add(i.box(R,S,U,w,new x(N(h.x0,h.x1,l==="left"),g+S/2,C))),n}function q_(i,e){const t=V_(i,e);if(t.length===0)return null;for(const n of t)i.solder(n.px,n.py);return eh(e.category,e.name)?Y_(i,e,t):X_(i,e,t)}function yn(i,e){return i&&(i.name=e),i}function Z_(i){const e=new A0(i.canvasWidth,i.canvasHeight),t=new C0(e),n=yn(new Ee,"Perfboard");n.add(yn(F0(t,i),"Board"));const r=[...i.ics.map(l=>yn(q_(t,l),l.label)),...i.standardParts.map(l=>yn(l_(t,l),l.label)),...i.advancedParts.map(l=>yn(G_(t,l),l.label))],s=new Set(t.solderedHoles.keys());for(const l of i.solderPaths)for(const h of l.holes)s.add(Yr(h.x,h.y));const o=S0(i.wires,s);n.add(yn(K0(t,o),"Wires")),i.solderPaths.length&&n.add(yn(H0(t,i.solderPaths),"Solder paths"));let a=0;for(const l of r)!l||(l.traverse(h=>{const u=h.material;h.castShadow=!(u&&!Array.isArray(u)&&u.transparent)}),n.add(l),a++);const c=G0(t);return c&&n.add(yn(c,"Solder joints")),{root:n,frame:e,partCount:a,wireCount:o.length}}const j_=.001;async function K_(i){const{GLTFExporter:e}=await nh(()=>import("./GLTFExporter.4450659d.js"),["./GLTFExporter.4450659d.js","./app.c0df015c.js","./modulepreload-polyfill.c7c6310f.js","./index.11f8e453.css"],import.meta.url),t=J_(i.clone());t.scale.multiplyScalar(j_);const n=await new e().parseAsync(t,{binary:!0});return new Blob([n],{type:"model/gltf-binary"})}function J_(i){var n;const e=[];i.traverse(r=>{r.isInstancedMesh&&e.push(r)});const t=new st;for(const r of e){const s=new Ee;s.name=r.name,s.position.copy(r.position),s.quaternion.copy(r.quaternion),s.scale.copy(r.scale);for(let o=0;o<r.count;o++){const a=new De(r.geometry,r.material);r.getMatrixAt(o,t),t.decompose(a.position,a.quaternion,a.scale),s.add(a)}(n=r.parent)==null||n.add(s),r.removeFromParent()}return i}const $_={angled:new x(.35,.82,.75).normalize(),top:new x(0,1,.02).normalize(),bottom:new x(0,-1,.02).normalize()},Q_=450;function Tc(i){const e=new Set,t=new Set;i.traverse(n=>{const r=n;if(!!r.isMesh){r.geometry.dispose();for(const s of Array.isArray(r.material)?r.material:[r.material])t.add(s)}});for(const n of t){const r=n;for(const s of Object.keys(r)){const o=r[s];o instanceof Rt&&e.add(o)}n.dispose()}e.forEach(n=>n.dispose())}function Ft(i,e,t){const n=document.createElement(i);return n.className=e,t&&(n.textContent=t),n}const Ir={download:["M12 3v12","m7 10 5 5 5-5","M5 21h14"],camera:["M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z","M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"],folder:["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"],close:["M18 6 6 18","M6 6l12 12"]};function ev(i){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true"),e.classList.add("viewer3d-icon");for(const t of i){const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d",t),e.appendChild(n)}return e}const Ac={angled:"Angled",top:"Top",bottom:"Bottom"};class tv{constructor(e){rt(this,"overlay",Ft("div","viewer3d-overlay"));rt(this,"host",Ft("div","viewer3d-canvas-host"));rt(this,"status",Ft("span","viewer3d-status"));rt(this,"viewButtons",new Map);rt(this,"renderer",new hl({antialias:!0}));rt(this,"scene",new ul);rt(this,"camera",new Bt(38,1,2,2e3));rt(this,"controls");rt(this,"sun",new oc("#ffffff",2.4));rt(this,"resizeObserver");rt(this,"board");rt(this,"frameId",0);rt(this,"needsRender",!0);rt(this,"previousBodyOverflow",document.body.style.overflow);rt(this,"tween");rt(this,"loop",()=>{if(this.frameId=requestAnimationFrame(this.loop),this.tween){const e=Math.min(1,(performance.now()-this.tween.start)/Q_),t=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;this.camera.position.lerpVectors(this.tween.fromPos,this.tween.toPos,t),this.controls.target.lerpVectors(this.tween.fromTarget,this.tween.toTarget,t),e>=1&&(this.tween=void 0),this.needsRender=!0}this.controls.update()&&(this.needsRender=!0),this.needsRender&&(this.needsRender=!1,this.renderer.render(this.scene,this.camera))});rt(this,"onKey",e=>{e.stopImmediatePropagation(),e.key==="Escape"&&this.close()});rt(this,"swallowKey",e=>{e.stopImmediatePropagation()});this.onClosed=e,this.buildDom(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=Dc,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Pc,this.host.appendChild(this.renderer.domElement),this.scene.background=new Ke("#0b1411");const t=new eo(this.renderer);this.scene.environment=t.fromScene(new v0(this.renderer),.04).texture,t.dispose(),this.scene.add(new i0("#dfe9ff","#1a2230",.7)),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.04,this.scene.add(this.sun,this.sun.target);const n=new oc("#cfd8e6",.8);n.position.set(-.4,-1,-.3),this.scene.add(n),this.controls=new _0(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.12,this.controls.addEventListener("start",()=>{this.tween=void 0;for(const r of this.viewButtons.values())r.classList.remove("is-active"),r.setAttribute("aria-pressed","false")}),this.controls.addEventListener("change",()=>{this.needsRender=!0}),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.host),window.addEventListener("keydown",this.onKey,!0),window.addEventListener("keyup",this.swallowKey,!0),this.loop()}buildDom(){const e=Ft("div","viewer3d-toolbar"),t=Ft("div","viewer3d-title","3D View");t.appendChild(this.status),e.appendChild(t);const n=Ft("div","viewer3d-actions"),r=(h,u,d,f="")=>{const g=Ft("button",`viewer3d-btn ${f}`.trim());return g.type="button",g.title=h,g.setAttribute("aria-label",h),g.append(ev(u),Ft("span","viewer3d-btn-label",h)),g.addEventListener("click",d),n.appendChild(g),g};r("Screenshot",Ir.camera,()=>this.screenshot()),r("Export 3D",Ir.download,()=>void this.exportModel());const s=Ft("input","viewer3d-file");s.type="file",s.accept=".json,application/json",s.addEventListener("change",()=>{var u;const h=(u=s.files)==null?void 0:u[0];s.value="",h&&h.text().then(d=>this.load(JSON.parse(d))).catch(()=>this.showError("Couldn't read that file as a project."))}),n.appendChild(s),r("Open file\u2026",Ir.folder,()=>s.click()),r("Close",Ir.close,()=>this.close(),"viewer3d-btn-close"),e.appendChild(n);const o=Ft("div","viewer3d-views");o.setAttribute("role","group"),o.setAttribute("aria-label","View");for(const h of Object.keys(Ac)){const u=Ft("button","viewer3d-view",Ac[h]);u.type="button",u.addEventListener("click",()=>this.setView(h)),o.appendChild(u),this.viewButtons.set(h,u)}const a=matchMedia("(pointer: coarse)").matches,c=Ft("div","viewer3d-hint",a?"Drag to turn \xB7 Pinch to zoom \xB7 Two fingers to pan":"Drag to orbit \xB7 Right-drag to pan \xB7 Scroll to zoom \xB7 Esc to close"),l=Ft("div","viewer3d-dock");l.append(o,c),this.host.appendChild(l),this.overlay.append(e,this.host),document.body.appendChild(this.overlay),document.body.style.overflow="hidden"}load(e){let t;try{t=Z_(w0(e))}catch(s){this.showError(s instanceof Error?s.message:"Couldn't open that project.");return}this.board&&(this.scene.remove(this.board.root),Tc(this.board.root)),this.board=t,this.scene.add(t.root),this.status.classList.remove("viewer3d-status-error"),this.status.textContent=`${t.partCount} part${t.partCount===1?"":"s"} \xB7 ${t.wireCount} wire${t.wireCount===1?"":"s"}`;const n=this.boardRadius(),r=this.sun.shadow.camera;r.left=r.bottom=-n*1.15,r.right=r.top=n*1.15,r.near=1,r.far=n*6,r.updateProjectionMatrix(),this.sun.position.set(n*.6,n*2.2,n*1.1),this.controls.maxDistance=n*8,this.camera.far=n*12,this.camera.updateProjectionMatrix(),this.controls.minDistance=8,this.resize(),this.setView("angled",!1)}boardRadius(){return this.board?Math.hypot(this.board.frame.width,this.board.frame.depth)/2+12:50}viewPosition(e){const t=this.boardRadius(),n=this.camera.fov*Math.PI/360,r=Math.atan(Math.tan(n)*this.camera.aspect),s=t/Math.sin(n)*.62,o=t/Math.sin(r)*.62;return $_[e].clone().multiplyScalar(Math.max(s,o))}setView(e,t=!0){for(const[s,o]of this.viewButtons)o.classList.toggle("is-active",s===e),o.setAttribute("aria-pressed",String(s===e));const n=new x(0,0,0),r=this.viewPosition(e);if(!t){this.tween=void 0,this.camera.position.copy(r),this.controls.target.copy(n),this.controls.update(),this.needsRender=!0;return}this.tween={fromPos:this.camera.position.clone(),toPos:r,fromTarget:this.controls.target.clone(),toTarget:n,start:performance.now()}}screenshot(){this.renderer.render(this.scene,this.camera);const e=document.createElement("a");e.download="perfboard-3d.png",e.href=this.renderer.domElement.toDataURL("image/png"),e.click()}async exportModel(){if(!!this.board)try{const e=URL.createObjectURL(await K_(this.board.root)),t=document.createElement("a");t.download="perfboard-3d.glb",t.href=e,t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}catch(e){console.error(e),this.showError("Couldn't export the 3D model.")}}showError(e){this.status.classList.add("viewer3d-status-error"),this.status.textContent=e}resize(){const e=this.host.clientWidth,t=this.host.clientHeight;!e||!t||(this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.needsRender=!0)}close(){var e;cancelAnimationFrame(this.frameId),window.removeEventListener("keydown",this.onKey,!0),window.removeEventListener("keyup",this.swallowKey,!0),this.resizeObserver.disconnect(),this.controls.dispose(),this.board&&Tc(this.board.root),(e=this.scene.environment)==null||e.dispose(),this.renderer.dispose(),this.overlay.remove(),document.body.style.overflow=this.previousBodyOverflow,this.onClosed()}}let Ur;function nv(i){Ur||(Ur=new tv(()=>{Ur=void 0})),Ur.load(i)}const cv=Object.freeze(Object.defineProperty({__proto__:null,openViewer3d:nv},Symbol.toStringTag,{value:"Module"}));export{$t as B,Eg as C,zt as D,sv as I,kt as L,De as M,Xt as N,Pi as P,Cn as Q,Jt as R,kn as S,Ml as U,x as V,hl as W,bt as a,Bt as b,ul as c,Ke as d,av as e,Yc as f,pu as g,et as h,st as i,ov as j,Dt as k,Fo as l,as as m,Nh as n,ji as o,Kt as p,Ks as q,Js as r,cv as v};
