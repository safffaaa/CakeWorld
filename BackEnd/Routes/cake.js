const express = require('express')
const { getCakes,getCake,addCake,editCake,deleteCake,upload } = require('../controller/cake')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.get('/',getCakes)
router.get('/:id',getCake)
router.post('/',upload.single('file'),verifyToken,addCake) 
router.put('/:id',upload.single('file'),editCake)
router.delete('/:id',deleteCake)

module.exports = router