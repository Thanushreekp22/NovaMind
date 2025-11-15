import express from "express";
import Thread from "../models/Thread.js";
import getAIResponse from "../utils/openai.js";

const router = express.Router();

//Get all threads for a specific user
router.get("/threads", async(req, res) => {
    const { userId } = req.query; // Get userId from query parameters
    
    if (!userId) {
        return res.status(400).json({error: "userId is required"});
    }
    
    try {
        const threads = await Thread.find({ userId }).sort({updatedAt: -1});
        //descending order of updatedAt...most recent data on top
        res.json(threads);
    } catch(err) {
        console.log('Error fetching threads:', err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

router.get("/threads/:threadId", async(req, res) => {
    const {threadId} = req.params;
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({error: "userId is required"});
    }

    try {
        const thread = await Thread.findOne({threadId, userId});

        if(!thread) {
            return res.status(404).json({error: "Thread not found"});
        }

        res.json(thread.messages);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }
});

router.delete("/threads/:threadId", async (req, res) => {
    const {threadId} = req.params;
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({error: "userId is required"});
    }

    try {
        const deletedThread = await Thread.findOneAndDelete({threadId, userId});

        if(!deletedThread) {
            return res.status(404).json({error: "Thread not found"});
        }

        res.status(200).json({success : "Thread deleted successfully"});

    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"});
    }
});

router.post("/", async(req, res) => {
    const {threadId, message, userId, userEmail, image} = req.body;
    
    console.log('\n📨 Chat request received:');
    console.log('- Message:', message);
    console.log('- Has image:', !!image);
    console.log('- Image size:', image ? `${(image.length / 1024).toFixed(2)} KB` : 'N/A');

    // Message is optional if image is provided
    if(!threadId || !userId || !userEmail) {
        return res.status(400).json({error: "missing required fields: threadId, userId, userEmail"});
    }
    
    if(!message && !image) {
        return res.status(400).json({error: "Either message or image must be provided"});
    }

    try {
        let thread = await Thread.findOne({threadId, userId});

        if(!thread) {
            //create a new thread in Db
            thread = new Thread({
                threadId,
                userId,
                userEmail,
                title: message.substring(0, 50) + (message.length > 50 ? "..." : ""), // Truncate title
                messages: [{role: "user", content: message}]
            });
        } else {
            thread.messages.push({role: "user", content: message});
        }

        const assistantReply = await getAIResponse(message, image);
        
        if (!assistantReply) {
            return res.status(500).json({error: "No response from AI"});
        }

        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        
        res.json({reply: assistantReply});
    } catch(err) {
        console.error("Error in /chat route:", err.message);
        res.status(500).json({error: err.message || "something went wrong"});
    }
});




export default router;