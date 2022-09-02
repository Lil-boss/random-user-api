const users = require("../public/user.json");

module.exports.users = (req, res) => {
  const { limit_user } = req.query;

  res.status(200).json({
    status: 200,
    data: users.slice(0, limit_user),
  });
};

module.exports.addUser = (req, res) => {
  const newUser = {
    id: req.body.id,
    name: req.body.name,
    gender: req.body.gender,
    contact: req.body.contact,
    address: req.body.address,
    photoUrl: req.body.photoUrl,
  };

  users.push(newUser);
  res.status(200).json({
    status: 200,
    data: newUser,
  });
};

module.exports.UserById = (req, res) => {
  const { id } = req.params;

  const userById = users.find((user) => Number(user.id) === Number(id));
  res.status(200).json({
    status: 200,
    data: userById,
  });
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const updateUser = users.find((user) => Number(user.id) === Number(id));

  if (updateUser == null) {
    res.status(404).json({
      status: 403,
      msg: "Invalid user",
    });
  }

  updateUser.id = id;
  updateUser.name = req.body.name;
  updateUser.gender = req.body.gender;
  updateUser.contact = req.body.contact;
  updateUser.address = req.body.address;
  updateUser.photoUrl = req.body.photoUrl;

  res.status(200).json({
    status: 200,
    data: updateUser,
  });
};

/**
 *
 * @param {req} 
 * {
	"ids":[1,2],
	"gender" : "female"
  }
 */

module.exports.bulkUpdate = (req, res) => {
  let ids = req.body.ids;

  ids.forEach((element) => {
    const bulkUpdate = users.find(
      (user) => Number(user.id) === Number(element)
    );

    if (bulkUpdate == null) {
      res.status(404).json({
        status: 403,
        msg: "Invalid user",
      });
    }

    bulkUpdate.id = element;
    bulkUpdate.name = req.body.name ? req.body.name : bulkUpdate.name;

    bulkUpdate.gender = req.body.gender ? req.body.gender : bulkUpdate.gender;

    bulkUpdate.contact = req.body.contact
      ? req.body.contact
      : bulkUpdate.contact;

    bulkUpdate.address = req.body.address
      ? req.body.address
      : bulkUpdate.address;

    bulkUpdate.photoUrl = req.body.photoUrl
      ? req.body.photoUrl
      : bulkUpdate.photoUrl;
  });

  res.status(200).json({
    status: 200,
    data: "users updated",
  });
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const deleteUser = users.filter((user) => Number(user.id) !== Number(id));

  if (deleteUser == null) {
    res.status(404).json({
      status: 404,
      msg: "User not Found",
    });
  }

  res.status(200).json({
    status: 200,
    data: deleteUser,
  });
};
