const models = require("../models");
const User = models.user;

exports.getProfile = (req, res) => {
  const user_id = req.params.user_id;
  User.findOne({
    where: { id: user_id },
    attributes: { exclude: ["createdAt", "updatedAt", "password"] }
  })
    .then(data => {
      //   console.log(data);
      res.send(data);
    })
    .catch(error => {
      res.status(401).json({ message: "Bad Request" });
    });
};
