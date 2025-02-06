const express = require('express')
const { getCakes,getCake,addCake,editCake,deleteCake,upload } = require('../controller/cake')
const router = express.Router()

router.get('/',getCakes)
router.get('/:id',getCake)
router.post('/',upload.single('coverImage'),addCake)
router.put('/:id',editCake)
router.delete('/:id',deleteCake)

module.exports = router