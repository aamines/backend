const { updateUserService } = require("../../services/user/user.service");

// Update user information
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await updateUserService(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get info of the logged in user
module.exports.getUserDetails = async (req, res) => {
  try {
    const result = await getUserById(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
