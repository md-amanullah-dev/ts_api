import { Request, Response } from "express";
import UserModel from "../model/authModel"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      email,
      city,
      address,
      contactNumber,
      password,
    } = req.body;

    // Basic validation
    if (!restaurantName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new restaurant
    const newRestaurant = new UserModel({
      restaurantName,
      email,
      city,
      address,
      contactNumber,
      password: hashedPassword,
    });

    await newRestaurant.save();

    res.status(201).json({ message: "Signup successful", userId: newRestaurant._id });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      // Check if email and password exist
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
  
      // Check if user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password." });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // Create JWT token (optional)
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "2h" }
      );
  
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.restaurantName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  




export default { signup,login };
