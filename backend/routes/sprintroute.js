const express = require('express');
const SprintModel = require('../models/sprintmodel');
const SprintRouter = express.Router();

//create sprint
SprintRouter.post('/add', async (req, res) => {
    const {name}=req.body;
  try {
     const newSprint = new SprintModel({
      name: name
    });

    // Save user to database
    await newSprint.save();

    res.status(201).json({ message: 'Sprint created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//get sprint
SprintRouter.get('/get', async (req, res) => {
  try {
     const allSprint = await SprintModel.aggregate([{$lookup:
        {
            from:'tasks',
            localField:'tasks',
            foreignField:'_id',
            as:'tasks'
    }}])

    res.status(201).json({status:'success',message:allSprint});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = SprintRouter