# 🔧 How to Add OpenAI GPT-4 Vision Support

## Problem: Groq Vision Models Decommissioned

All Groq vision models have been decommissioned:
- ❌ llama-3.2-11b-vision-preview
- ❌ llama-3.2-90b-vision-preview  
- ❌ llava-v1.5-7b-4096-preview

## Solution: Use OpenAI GPT-4 Vision

The best alternative is OpenAI's GPT-4 Vision - excellent quality and reliable.

---

## Step-by-Step Setup Guide

### Step 1: Get OpenAI API Key

1. Go to: https://platform.openai.com/signup
2. Sign up or log in
3. Go to: https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy your key (starts with `sk-...`)

### Step 2: Add API Key to .env

Open `Backend/.env` and add:

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=sk-your_openai_key_here
```

### Step 3: Update openai.js

Replace the content of `Backend/utils/openai.js` with:

```javascript
import "dotenv/config";

const CONFIG = {
    // OpenAI models
    VISION_MODEL: "gpt-4-vision-preview",
    TEXT_MODEL: "llama-3.3-70b-versatile", // Keep Groq for text
    
    TEMPERATURE: 0.7,
    MAX_TOKENS: 1024,
    VISION_MAX_TOKENS: 1500,
};

const getAIResponse = async(message, imageBase64 = null) => {
    if (imageBase64) {
        // Use OpenAI GPT-4 Vision for images
        console.log('🖼️  Using OpenAI GPT-4 Vision');
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: CONFIG.VISION_MODEL,
                messages: [{
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: message
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageBase64
                            }
                        }
                    ]
                }],
                max_tokens: CONFIG.VISION_MAX_TOKENS
            })
        };

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", options);
            const data = await response.json();
            
            if (data.error) {
                console.error("OpenAI API Error:", data.error);
                throw new Error(data.error.message || "OpenAI API error");
            }
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                console.error("Invalid OpenAI response structure");
                throw new Error("Invalid response from OpenAI");
            }
            
            return data.choices[0].message.content;
        } catch(err) {
            console.error("Error in OpenAI Vision:", err.message);
            throw err;
        }
    } else {
        // Use Groq for text-only (free and fast)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: CONFIG.TEXT_MODEL,
                messages: [{
                    role: "user",
                    content: message
                }],
                temperature: CONFIG.TEMPERATURE,
                max_tokens: CONFIG.MAX_TOKENS
            })
        };

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
            const data = await response.json();
            
            if (data.error) {
                console.error("Groq API Error:", data.error);
                throw new Error(data.error.message || "Groq API error");
            }
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                console.error("Invalid Groq response structure");
                throw new Error("Invalid response from Groq");
            }
            
            return data.choices[0].message.content;
        } catch(err) {
            console.error("Error in getAIResponse:", err.message);
            throw err;
        }
    }
};

export default getAIResponse;
```

### Step 4: Restart Backend

```bash
cd Backend
npm start
```

---

## Pricing

### OpenAI GPT-4 Vision Pricing:
- **Input**: $0.01 per 1K tokens
- **Images**: ~$0.01-0.03 per image (depending on size)
- **Output**: $0.03 per 1K tokens

### Example Costs:
- 10 image analyses: ~$0.10-0.30
- 100 image analyses: ~$1-3
- 1000 image analyses: ~$10-30

### Free Alternative: Google Gemini Pro Vision

If cost is a concern, use Google Gemini (has free tier):

```javascript
// Use Gemini API instead
const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GOOGLE_API_KEY
    },
    body: JSON.stringify({
        contents: [{
            parts: [
                { text: message },
                { inline_data: { mime_type: "image/jpeg", data: imageBase64.split(',')[1] }}
            ]
        }]
    })
});
```

---

## Benefits of OpenAI GPT-4 Vision

✅ **Best Quality**
- Excellent image understanding
- Accurate OCR
- Detailed descriptions

✅ **Reliable**
- Stable API
- Well-documented
- Active support

✅ **Versatile**
- Handles any image type
- Understands context
- Multiple languages

✅ **Fast**
- ~2-3 second responses
- Scalable
- High availability

---

## Testing

After setup, test with:

1. **Simple image**: Upload a photo
2. **Text image**: Test OCR capabilities
3. **Complex scene**: Test detailed analysis

Expected console output:
```
server running on 5000
Connected with Database!
🖼️  Using OpenAI GPT-4 Vision
```

---

## Troubleshooting

### Error: "Incorrect API key"
- Check your .env file
- Make sure key starts with `sk-`
- No quotes around the key

### Error: "Insufficient quota"
- Add credits to OpenAI account
- Go to: https://platform.openai.com/account/billing

### Error: "Model not found"
- Use "gpt-4-vision-preview" (with quotes)
- Check OpenAI docs for latest model names

---

## Alternative: Keep Current Setup (No Vision)

If you don't want to pay, the app will work fine for text chat without images. The image upload button will show a helpful message about vision being unavailable.

---

## Summary

**Quick Setup (5 minutes):**
1. Get OpenAI API key
2. Add to .env file
3. Replace openai.js code
4. Restart backend
5. Done! 🎉

**Cost:** ~$0.01-0.03 per image
**Quality:** Excellent
**Speed:** Fast (2-3 sec)

---

**Created**: November 14, 2025
**Status**: Ready to implement
