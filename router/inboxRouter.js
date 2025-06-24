const express = require('express');

const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');



const router = express.Router();

//login page

router.get("/",decorateHtmlResponse('Inbox Page'), getInbox);


module.exports = router;