const express = require('express')
const router = express.Router()
const {userSignUp,userLogin,getUser , upload ,uploadProfilePicture} = require('../controller/user')
router.post('/signUp',userSignUp)
router.post('/login',userLogin)
router.get('/users/:id',getUser)
router.post("/upload/:id", upload.single("profilePic"), uploadProfilePicture);

module.exports = router