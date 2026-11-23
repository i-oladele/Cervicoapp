self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('cervicoapp-'))await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('push', event => {
 let payload={};try{payload=event.data?.json()||{};}catch{payload={body:event.data?.text()};}
 event.waitUntil(self.registration.showNotification(payload.title||'CerviHealthCoApp',{body:payload.body||'',icon:'/icon-192x192.png',tag:payload.tag,data:{url:'/',...payload.data}}));
});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const url=new URL(event.notification.data?.url||'/',self.location.origin);if(url.origin!==self.location.origin)return;const windows=await self.clients.matchAll({type:'window'});for(const client of windows){if('focus' in client){await client.navigate(url.href);return client.focus();}}return self.clients.openWindow(url.href);})());});
