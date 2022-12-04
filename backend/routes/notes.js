const express = require('express');
const Notes = require("../models/Notes");
const router= express.Router();
const fetchUser = require("../middleware/fetchUser");

// fetching notes of user
router.get('/fetchAllNotes', fetchUser, async (req, res)=>{
    try{
        var notes = await Notes.find({user: req.user.id});
        res.json(notes);
    }catch(error){
        console.log(error);
        res.json({error:"Opps! Something went wrong"});
    }
})

// adding Note
router.post("/addNote", fetchUser, async (req, res)=>{
    try{
        console.log("here");
        const {title, discription, date} = req.body;
        const  note = new Notes({title, discription, date, user:req.user.id});
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(error){
        console.log(error);
        res.json({error:"Opps! Something went wrong"});
    }
})

// updating a note
router.put("/updateNote/:id", fetchUser, async (req, res)=>{
    
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note not found");
    }

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    
    const {title, discription} = req.body;
    let updatedNote = {};
    if(title)
        updatedNote.title=title;
    if(discription)
        updatedNote.discription=discription;
    
    note  = await Notes.findByIdAndUpdate(req.params.id, {$set: updatedNote}, {new:true});
    return res.json(note);
    
})

// deleting note
router.delete("/deletNote/:id", fetchUser, async (req, res)=>{
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    return res.json({"message":"success", note});
})
module.exports = router;