const router = require("express").Router();
const User = require("../../models/User");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);
    res.json(singleUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/:id/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!User) {
      return res.status(404).json({ message: "No user with this ID!" });
    }
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!User) {
      return res.status(404).json({ message: "No user with this ID!" });
    }
    user.friends = user.friends.filter(
      (friendId) => friendId.toString() !== req.params.friendId
    );
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
