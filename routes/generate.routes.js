const { Router } = require('express');
const redisClient = require('../redis-client');
// helpers
const generateToken = require('../helpers/generator')
const urlValidation = require('../helpers/validation')

const router = Router();

router.post('/', async (req, res) => {
    let { url } = req.body
    if (url && urlValidation(url)) {
        try {
            // generate token
            let token = generateToken(process.env.LENGTH_TOKEN)
            await redisClient.set(token, url)
            console.log('[+] Created token for link');
            res.redirect('/')
        } catch (err) {
            console.log("Info router error: ", err);
            res.status(500)
        }
    } else {
        console.error("[-] Not valid url");
        res.redirect('/')
    }

})

module.exports = router;
