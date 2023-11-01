const express = require("express");
const Car = require("../../models/CarModel");
const { validationResult } = require("express-validator");

const createNotesController = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // // creating note
    const {model, price, phoneNumber, city, noOfCopies} = req.body;
    const carImages = req.file.filename;
    try {
        const car = new Car({
            model,
            price,
            phoneNumber,
            city,
            noOfCopies,
            carImages
        });
        await car.save(); // command to save in mongo db
        return res.status(201).json(car);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = createNotesController;