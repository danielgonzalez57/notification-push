 const { Router } = require('express');
const router = Router()
const webpush = require('../webPush');

let pushSubscription;

router.post('/subscription', async (req, res) => {
    pushSubscription = req.body;
    res.status(200).json(); 
});

router.post('/new-message', async (req, res) =>{

    const {message} = req.body

    const payload = JSON.stringify({
        title: 'Daka Online', 
        message: message
    })

    try {
        await webpush.sendNotification(pushSubscription, payload) 
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;