const { Router } = require('express');
const redisClient = require('../redis-client');

const router = Router();

router.get('/', async (req, res) => {
    try {
        // get all tokens w/ original links
        let keys = await redisClient.keys('*');
        let links = [];
        if(keys){
            for(let i=0; i<keys.length; i++){
                let link = {};
                link['token'] = keys[i];
                link['url'] = await redisClient.get(keys[i])
                links.push(link)
            }
        }
        res.render('index', {links: links});
    } catch (e) {
        console.error('[-] Cannot get links');
    }
})

router.get('/:url', async (req, res) => {
    const { url } = req.params
    try {
        const getOriginalLink = await redisClient.get(url)
        if (getOriginalLink === null) return res.sendStatus(404)
        res.redirect(getOriginalLink);
        console.log('[+] Redirecting to original link')
    } catch (err) {
        console.log('[-] Cannot open link:', err)
    }

})

module.exports = router;
