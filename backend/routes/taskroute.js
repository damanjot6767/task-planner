const express = require('express');
const mongoose = require('mongoose')
const SprintModel = require('../models/sprintmodel');
const TaskModel = require('../models/taskmodel');
const UserTaskModel = require('../models/usertaskmodel');
const TaskRouter = express.Router();

//create task
TaskRouter.post('/add', async (req, res) => {
    let {name,id}=req.body;
    id = mongoose.Types.ObjectId(id);
  try {
     const newTask = new TaskModel({
      name: name,
      sprintId:id
    });

    // Save task to database
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//change statuss
TaskRouter.put('/status/:id', async (req, res) => {
    let {id}=req.params
  try {
     const allTask = await TaskModel.findByIdAndUpdate(id,{$set:{isCompleted:true}})
    res.status(201).json({status:'success',message:'status changed'});
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//assign task
TaskRouter.post('/assign/:id', async (req, res) => {
    let {userId}=req.body;
    id = mongoose.Types.ObjectId(id);
  try {
    const Task = await UserTaskModel.findOne({userId});
    Task.tasks.push(id)
    await Task.save()
    res.status(201).json({ message: 'Task assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//fetch all user
TaskRouter.get('/getuser', async (req, res) => {
  try {
    const Alluser = await UserTaskModel.aggregate([{
        $lookup:
        {
            from:'users',
            localField:'users',
            foreignField:'_id',
            as:'users'
    }},
    {
        $lookup:
        {
            from:'tasks',
            localField:'tasks',
            foreignField:'_id',
            as:'tasks'
    }
    }
])

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = TaskRouter