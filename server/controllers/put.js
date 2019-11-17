const models = require("../models");
const User = models.user;

exports.changeProfile = (req, res) => {
  const user_id = req.params.user_id;
  const { name } = req.body;
  console.log(user_id);

  User.findOne({
    where: { id: user_id }
  })
    .then(() => {
      User.update(
        {
          name
        },
        {
          where: { id: user_id }
        }
      )
        .then(data => {
          User.findOne({
            where: { id: user_id },
            attributes: { exclude: ["createdAt", "updatedAt"] }
          }).then(item => {
            res.send(item);
          });
        })
        .catch(error => {
          res.status(401).json({ message: "Bad Request" });
        });
    })
    .catch(error => {
      res.status(402).json({ message: "User Not Found" });
    });
};
