const db = require("../database");
const bcrypt = require("bcrypt");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, passwd } = newUser;
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const [rows] = await db
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);
      if (rows.length > 0) {
        resolve({
          status: "ERR",
          message: "The email is already registered",
        });
        return;
      }

      // Hash mật khẩu
      const hash = bcrypt.hashSync(passwd, 10);

      // Thêm người dùng mới vào cơ sở dữ liệu
      const [result] = await db
        .promise()
        .query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
          name,
          email,
          hash,
        ]);

      resolve({
        status: "OK",
        message: "User created successfully",
        data: {
          id: result.insertId,
          name,
          email,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createUser,
};
