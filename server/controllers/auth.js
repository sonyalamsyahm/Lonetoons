const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const models = require("../models");
const User = models.user;

exports.login = (req, res) => {
  //check if email and pass match in db tbl user
  const email = req.body.email;
  const password = req.body.password; //use encryption in real world case!

  User.findOne({ where: { email } }).then(user => {
    if (user) {
      if (user.password == password) {
        const token = jwt.sign({ userId: user.id }, "my-secret-key");
        res.status(200).json({
          id: user.id,
          token
        });
      } else {
        res.status(400).json({ message: "Password is wrong" });
      }
    } else {
      res.status(400).json({ message: "Email is unregistered" });
    }
    // } else if (user.email != req.body.email) {
    //   res.status(400).json({message: 'No email is found'});
    // }
  });
};

exports.register = (req, res) => {
  //check if email and pass match in db tbl user
  const email = req.body.email;
  const password = req.body.password; //use encryption in real world case!

  User.create({
    email,
    password,
    name: null,
    avatar: null
  })
    .then(User => {
      if (User) {
        const token = jwt.sign({ UserId: User.id }, "my-secret-key");

        res.send({
          email,
          token
        });
      }
    })
    .catch(Sequelize.ValidationError, err => {
      // Respond with validation errors
      return res.status(406).send({ message: err.message });
    })
    .catch(err => {
      // Every other error
      return res.status(400).send({
        message: err.message
      });
    });
};
