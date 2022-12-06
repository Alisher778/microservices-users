const UsersModel = require("../models/users");

module.exports = {
  list: function (req, res) {
    UsersModel.find(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting users.",
          error: err,
        });
      }

      return res.json(users);
    });
  },
  show: function (req, res) {
    const { id } = req.params;

    UsersModel.findById(id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }

      return res.json(user);
    });
  },
  create: function (req, res) {
    const { name, dateOfBirth, country, language, phone } = req.body;
    const users = new UsersModel({
      country,
      dateOfBirth,
      language,
      name,
      phone,
    });

    users.save(function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      }

      return res.status(201).json(user);
    });
  },
  update: function (req, res) {
    const id = req.params.id;

    UsersModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }
      const { name, dob, country, language, phone } = req.body;
      user.name = name || user.name;
      user.dob = dob || user.dob;
      user.country = country || user.country;
      user.language = language || user.language;
      user.phone = phone || user.phone;
      user.updatedAt = new Date();

      user.save(function (err, user) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating user.",
            error: err,
          });
        }

        return res.json(user);
      });
    });
  },
  remove: function (req, res) {
    const { id } = req.params;

    UsersModel.findByIdAndRemove(id, function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the users.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
