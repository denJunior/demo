import{connectStreamSource as e,disconnectStreamSource as t}from"@hotwired/turbo";import*as r from"@hotwired/turbo";export{r as Turbo};let s;async function getConsumer(){return s||setConsumer(createConsumer().then(setConsumer))}function setConsumer(e){return s=e}async function createConsumer(){const{createConsumer:e}=await import("@rails/actioncable/src");return e()}async function subscribeTo(e,t){const{subscriptions:r}=await getConsumer();return r.create(e,t)}var n=Object.freeze(Object.defineProperty({__proto__:null,getConsumer:getConsumer,setConsumer:setConsumer,createConsumer:createConsumer,subscribeTo:subscribeTo},Symbol.toStringTag,{value:"Module"}));function walk(e){return e&&"object"===typeof e?e instanceof Date||e instanceof RegExp?e:Array.isArray(e)?e.map(walk):Object.keys(e).reduce((function(t,r){var s=r[0].toLowerCase()+r.slice(1).replace(/([A-Z]+)/g,(function(e,t){return"_"+t.toLowerCase()}));t[s]=walk(e[r]);return t}),{}):e}class TurboCableStreamSourceElement extends HTMLElement{async connectedCallback(){e(this);this.subscription=await subscribeTo(this.channel,{received:this.dispatchMessageEvent.bind(this)})}disconnectedCallback(){t(this);this.subscription&&this.subscription.unsubscribe()}dispatchMessageEvent(e){const t=new MessageEvent("message",{data:e});return this.dispatchEvent(t)}get channel(){const e=this.getAttribute("channel");const t=this.getAttribute("signed-stream-name");return{channel:e,signed_stream_name:t,...walk({...this.dataset})}}}customElements.define("turbo-cable-stream-source",TurboCableStreamSourceElement);function overrideMethodWithFormmethod({detail:{formSubmission:{fetchRequest:e,submitter:t}}}){t&&t.formMethod&&e.body.has("_method")&&e.body.set("_method",t.formMethod)}addEventListener("turbo:submit-start",overrideMethodWithFormmethod);export{n as cable};

