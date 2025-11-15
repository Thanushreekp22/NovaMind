# ⚠️ Vision Model Update - November 2025

## Current Status

### **Important Changes:**
- ❌ **llama-3.2-11b-vision-preview** - DECOMMISSIONED
- ❌ **llama-3.2-90b-vision-preview** - DECOMMISSIONED
- ✅ **llava-v1.5-7b-4096-preview** - CURRENTLY ACTIVE

---

## Current Active Model

### **LLaVA v1.5 (7B)**
- **Model ID**: `llava-v1.5-7b-4096-preview`
- **Parameters**: 7 Billion
- **Context Length**: 4096 tokens
- **Speed**: Very Fast (~1-2 seconds)
- **Quality**: Good for general image understanding
- **Status**: ✅ Active on Groq
- **Cost**: FREE

---

## Capabilities

### ✅ **What LLaVA Can Do:**

1. **General Image Description**
   - Describe objects, scenes, and settings
   - Identify main subjects
   - Understand basic composition

2. **Object Recognition**
   - Identify common objects
   - Count visible items
   - Detect people, animals, vehicles

3. **Color & Style Analysis**
   - Identify dominant colors
   - Describe artistic style
   - Recognize patterns

4. **Basic Scene Understanding**
   - Indoor vs outdoor
   - Time of day (if visible)
   - Weather conditions
   - Setting/environment

5. **Simple Text Reading**
   - Read clear, large text
   - Identify signs and labels
   - Note: Less accurate than specialized OCR

### ⚠️ **Limitations:**

- **OCR**: Less accurate than Llama vision models for small or complex text
- **Detail Level**: Less detailed than 90B models
- **Complex Scenes**: May miss subtle details in very complex images

---

## Alternative Options

If you need better vision capabilities, consider:

### **1. OpenAI GPT-4 Vision (Paid)**
```javascript
Model: "gpt-4-vision-preview"
Cost: ~$0.01-0.03 per image
Quality: Excellent
API: api.openai.com
```

### **2. Google Gemini Pro Vision (Free tier)**
```javascript
Model: "gemini-pro-vision"
Cost: Free tier available
Quality: Very Good
API: generativelanguage.googleapis.com
```

### **3. Anthropic Claude 3 Opus (Paid)**
```javascript
Model: "claude-3-opus-20240229"
Cost: ~$0.015 per image
Quality: Excellent
API: api.anthropic.com
```

---

## How to Switch to Another Provider

### **Example: Switch to OpenAI GPT-4 Vision**

1. **Get OpenAI API Key**: https://platform.openai.com/api-keys

2. **Update `.env` file**:
```env
OPENAI_API_KEY=sk-...your-key-here...
```

3. **Update `Backend/utils/openai.js`**:
```javascript
const getAIResponse = async(message, imageBase64 = null) => {
    if (imageBase64) {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4-vision-preview",
                messages: [{
                    role: "user",
                    content: [
                        { type: "text", text: message },
                        { type: "image_url", image_url: { url: imageBase64 }}
                    ]
                }],
                max_tokens: 1500
            })
        });
        // ... handle response
    }
};
```

---

## Testing Your Setup

1. **Upload a simple image** (photo of an object)
   - Type: "What is this?"
   - Expected: Basic description

2. **Upload an image with text**
   - Type: "What text do you see?"
   - Expected: May not catch all text (use paid APIs for OCR)

3. **Upload a scene**
   - Type: "Describe this scene"
   - Expected: General description of setting and objects

---

## Recommended Prompts for LLaVA

### **Good Prompts:**
- ✅ "What's in this image?"
- ✅ "Describe the main objects"
- ✅ "What is the person doing?"
- ✅ "What colors do you see?"
- ✅ "Is this indoors or outdoors?"

### **Less Effective:**
- ⚠️ "Read all the small text" (use OCR-specialized models)
- ⚠️ "Describe every tiny detail" (use larger models)
- ⚠️ "Count all objects precisely" (may not be 100% accurate)

---

## Current Configuration

```javascript
// Backend/utils/openai.js
const VISION_MODELS = {
    LLAVA_VISION: "llava-v1.5-7b-4096-preview",  // Active
};

const CONFIG = {
    DEFAULT_VISION_MODEL: VISION_MODELS.LLAVA_VISION,
    VISION_MAX_TOKENS: 1500,
};
```

---

## Summary

✅ **Current Model**: LLaVA v1.5 (7B)
✅ **Status**: Active and Working
✅ **Cost**: FREE with Groq
⚡ **Speed**: Fast (1-2 seconds)
🎯 **Quality**: Good for general use
⚠️ **Limitation**: Not ideal for detailed OCR

For professional OCR or detailed analysis, consider upgrading to a paid API provider.

---

**Last Updated**: November 14, 2025
**Active Model**: llava-v1.5-7b-4096-preview ✅
