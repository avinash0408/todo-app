const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get((req,res)=>{
    res.json({
        message : "Hi there!!" 
    })
})
router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.login);
router.route('/signout').get(authController.logout);
router.route('/checkAuth').get(authController.authenticate,authController.checkAuth);

module.exports = router;