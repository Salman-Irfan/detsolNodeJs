const express = require("express");
const User = require("../../models/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


const userRegisterController = async (req, res) => {
    // destructing the req data
    const { name, email, phoneNumber, password } = req.body;
    let success = false;
    // if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check if a user with this email exists already
        let userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            return res.status(400).json({ success, error: "User with this email already exists" });
        }

        // Check if a user with this phoneNumber exists already
        let userWithPhoneNumber = await User.findOne({ phoneNumber });
        if (userWithPhoneNumber) {
            return res.status(400).json({ success, error: "User with this phone number already exists" });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        // saving the new user
        const newUser = new User({ name, email, phoneNumber, password: hashedPassword });
        await newUser.save();
        // return json response
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = userRegisterController;
