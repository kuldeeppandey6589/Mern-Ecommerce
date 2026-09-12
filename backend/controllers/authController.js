import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const UserExists = await User.findOne({ email });
        if (UserExists) {
            return res.status(400).json({ message: "User already register" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//Login a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return req.status(400).json({ message: "User not found" });
        }

        // Compare the password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return req.status(400).json({ message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        req.status(500).json({ message: "Server error", error });
    }
}