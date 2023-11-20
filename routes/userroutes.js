const express=require('express')
const router=express.Router();
const userController = require('../controllers/userController')
const authmiddleware=require('../middleware/authmidleware')
router.post('/signup',userController.signup)
router.get('/list',userController.getUserList)

router.post('/signin',userController.signin)

router.get('/profile',authmiddleware.verifytoken,userController.getProfile)
router.put('/profile',authmiddleware.verifytoken,userController.editProfile)
router.delete('/profile',authmiddleware.verifytoken,userController.deleteProfile)




module.exports = router;