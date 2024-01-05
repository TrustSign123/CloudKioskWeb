const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Kiosk = require("../models/Kiosk");
const Group = require("../models/Group");

router.get("/get-groups", fetchUser, async (req, res) => {
  try {
    const groups = await Group.find({ user: req.user.id });
    res.status(200).json({ groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create-group", fetchUser, async (req, res) => {
  try {
    const groupName = req.body.groupName;

    // Create a new group
    const group = new Group({
      user: req.user.id,
      groupName: groupName,
    });
    // Save the Kiosk code to the database
    await group.save();
    res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-group/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const groupName = req.body.groupName;

    const group = await Group.findById(id);

    if (!group) {
      res.status(404).json({ message: "Not found" });
    }

    group.groupName = groupName;
    await group.save();
    res.status(200).json({ message: "Group updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete-group/:id", fetchUser, async (req, res) => {
  try {
    // Get the group ID from the request
    const id = req.params.id;

    const group = await Group.findById(id);

    if (!group) {
      res.status(404).json({ message: "Not found" });
    } else {
      await group.deleteOne();
      res.status(200).json({ message: "Group deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
