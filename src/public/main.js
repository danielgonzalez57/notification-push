function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const PUBLIC_VAPID_KEY= 'BHMHjgrsAB87Tj7gosI6R_f4h99xB7f9FRhJkiyTkmtw59cBnjW_MYAYrHJ_Gfd66Gp-XUqXMQCEzZFnvSdCY9U'
const convertedVapidKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);

const subscription = async() =>{

    // Service Worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    const subscription =  await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    });
    

   await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log('Subscribed!');
}

const form = document.querySelector('#myform');
const message = document.querySelector('#message');

form.addEventListener('submit', e =>{
    e.preventDefault();
    fetch('/new-message', {
        method: 'POST',
        body: JSON.stringify({
            message: message.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    form.reset();
});

subscription();