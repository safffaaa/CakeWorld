
const cakes = require('../schema/cakeSchema');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images') 
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

// Get all cakes
const getCakes = async (req, res) => {
  try {
    const sweets = await cakes.find();
    return res.json(sweets);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving cakes', error: error.message });
  }
};

// Get a single cake by ID
const getCake = async (req, res) => {
  try {
    const sweet = await cakes.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Cake not found' });
    }
    res.json(sweet);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving cake', error: error.message });
  }
};

// Add a new cake
const addCake = async (req, res) => {

  console.log(req.file) 
  console.log(req.user,'------->.')
  const { title, ingredients, instruction, time } = req.body;
 
  if (!title || !ingredients || !instruction ) {
    return res.status(400).json({ message: "Required fields can't be empty" });
  }

  try {
    const newCakes = await cakes.create({
      title,
      ingredients,
      instruction,
      time, 
      coverImage:req.file.filename,
      createdBy:req.user.id

    });
    console.log("Recipe added:", newCakes);
    return res.status(201).json(newCakes);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating cake', error: error.message });
  }
};

// Edit an existing cake
const editCake = async (req, res) => {
  const { title, ingredients, instruction, time } = req.body;

  try {
    const sweet = await cakes.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Cake not found' });
    }
    let coverImage = req.file?.filename? req.file?.filename : sweet.coverImage
    const updatedCake = await cakes.findByIdAndUpdate(req.params.id, {...req.body,coverImage}, {title,ingredients,instruction,time} , { new: true });
    return res.json(updatedCake);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating cake', error: error.message });
  }
};

// Delete a cake
const deleteCake = async (req, res) => {
  try {
    const sweet = await cakes.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Cake not found' });
    }

    await cakes.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'Cake deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting cake', error: error.message });
  }
};

module.exports = { getCakes, getCake, addCake, editCake, deleteCake, upload };
