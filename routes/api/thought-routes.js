const router = require("express").Router();
const Thought = require("../../models/Thought");

router.get("/", async (req, res) => {
  try {
    const allThoughts = await Thought.find({});
    res.json(allThoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleThought = await Thought.findById(req.params.id);
    res.json(singleThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/:id/reactions", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id/reactions/:reactionId", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    thought.reactions = thought.reactions.filter(
      (reaction) => reaction.reactionId.toString() !== req.params.reactionId
    );
    await thought.save();
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
