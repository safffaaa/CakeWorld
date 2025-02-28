const express = require('express')
const { getCakes,getCake,addCake,editCake,deleteCake,upload } = require('../controller/cake')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.get('/',getCakes)
router.get('/:id',getCake)
<<<<<<< HEAD
router.post('/',upload.single('file'),verifyToken,addCake) 
router.put('/:id',upload.single('file'),editCake)
=======
router.post('/',upload.single('file'),addCake)
router.put('/:id',editCake)
>>>>>>> ef224f6d5eb629856118f5e241cae31dcd1539b6
router.delete('/:id',deleteCake)

module.exports = router
