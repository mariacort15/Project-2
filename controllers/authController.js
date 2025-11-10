import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";


export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, phone } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ fullName, email, password: hashedPassword, role });

    
    const newUser = new User({ fullName, email, password, role, phone });
    await newUser.save();

    
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid email or password" });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid! Again" });

    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const logoutUser = (req, res) => {
  res.status(200).json({ message: "User logged out successfully!" });
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};