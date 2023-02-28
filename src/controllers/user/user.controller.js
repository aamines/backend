const { updateUserService } = require("../../services/user/user.service");

// Update user information
modules.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await updateUserService(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
