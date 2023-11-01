const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const multer = require('multer');
const path = require('path');
const createNotesController = require('../../controllers/carsControllers/addCarsController');
const requireSignIn = require('../../middlewares/authMiddleware');


// multer middleware
let storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.resolve(__dirname, '../../public/cars'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})
let uploadCarImages = multer({
    storage: storage,
}).single('carImages')


// create note route
router.post("/cars",
    requireSignIn,
    uploadCarImages,
    [
        body('model', "Enter a valid name in between 1 to 30 characters").isLength({ min: 1, max: 30 }),
        body('price', "Price must be a positive integer").isInt({ min: 1 }),
        body("phoneNumber", "Phone number must be exactly 11 characters").isLength({ min: 11, max: 11 }),
        body('city', "Enter a valid city name in between 1 to 30 characters").isLength({ min: 1, max: 30 }),
        body('noOfCopies', "Must Upload atleast one Copy").isInt({ min: 1 }),
    ],
    createNotesController
);

module.exports = router;
