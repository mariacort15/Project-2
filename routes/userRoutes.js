const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Property = require("../models/PropertyListing");
const { saveProperty, unsaveProperty } = require('../controllers/userController');

router.get("/profile", protect, async (req, res) => {
  res.render("users/profile", { user: req.user });
});


router.get("/my-listings", protect, async (req, res) => {
  if (req.user.role !== "Owner") {
    return res.status(403).send("Access denied");
  }

  const listings = await Property.find({ listingAgent: req.user._id });
  res.render("users/my-listings", { listings });
});


router.post("/update", protect, async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    );
    res.redirect("/users/profile");
  } catch (err) {
    res.send("Update failed");
  }
});

router.post('/save/:id', protect, saveProperty);

router.delete('/unsave/:id', protect, unsaveProperty);

module.exports = router