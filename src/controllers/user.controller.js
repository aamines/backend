const { updateUserService, getUserById } = require("../services/user.service");

// Update user information
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await updateUserService(id, req.body);
    return res.status(200).json({
      message: "user updates",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get info of the logged in user
module.exports.getUserDetails = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    const result = await getUserById(parseInt(data.id));
    res.status(200).json({
      message: "user details",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
