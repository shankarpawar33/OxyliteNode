const router=require('express').Router();
const signupController=require('../controller/signup');


router.post('/user/signup',signupController.register);
router.post('/login',signupController.login)
router.get('/users',signupController.getAllUser)
router.get('/user/byuserId/:userId',signupController.getUserById);
router.get('/user/bycustomerId/:customerId',signupController.getByCustomerId);


module.exports=router;