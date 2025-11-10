const User = require('../models/User');
const Property = require('../models/Property');

exports.saveProperty = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const propertyId = req.params.id;

    if (!user.savedProperties.includes(propertyId)) {
      user.savedProperties.push(propertyId);
      await user.save();
      res.status(200).json({ message: 'Property saved!' });
    } else {
      res.status(400).json({ message: 'Property already saved.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error while saving property.' });
  }
};

exports.unsaveProperty = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const propertyId = req.params.id;

    user.savedProperties = user.savedProperties.filter(
      (id) => id.toString() !== propertyId
    );
    await user.save();

    res.status(200).json({ message: 'Property unsaved.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while unsaving property.' });
  }
};