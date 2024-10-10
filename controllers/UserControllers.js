const UserService = require("../services/UserServices");

const createUser = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Kiểm tra req.body
    const { email, passwd, confirmPasswd } = req.body;
    const regx = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = regx.test(email);
    if (!email || !passwd) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    } else if (passwd !== confirmPasswd) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error occurred:", e);
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while creating the user.",
      error: e.message,
    });
  }
};

module.exports = {
  createUser,
};
