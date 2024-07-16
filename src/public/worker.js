console.log('Service Worker');

self.addEventListener('push', (event) => {
    const data = event.data?.json();
    if (data) {
        console.log(data);
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: '/daki.png'
        });
    }
});