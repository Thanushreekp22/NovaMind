# 🖼️ Vision Models Guide - NovaMind

## Available Models for Image Analysis

### **Groq Vision Models (FREE & FAST)**

#### **llama-3.2-90b-vision-preview** ⭐ Current Model
- **Parameters**: 90 Billion
- **Speed**: ~3-5 seconds
- **Quality**: Excellent - Most detailed and accurate
- **Status**: ✅ Active (Only available vision model)
- **Best For**: 
  - Detailed image descriptions
  - Complex scene understanding
  - OCR (reading text in images)
  - Fine-grained object detection
  - All vision tasks

**Note:** The 11B vision model has been **decommissioned** by Groq as of late 2024. All vision requests now use the 90B model.

---

## Current Configuration

In `Backend/utils/openai.js`:

```javascript
const CONFIG = {
    DEFAULT_VISION_MODEL: VISION_MODELS.LLAMA_VISION_90B,  // Only available model
    TEXT_MODEL: VISION_MODELS.LLAMA_TEXT_70B,
    TEMPERATURE: 0.7,
    MAX_TOKENS: 1024,
    VISION_MAX_TOKENS: 1500,
};
```

**Note:** Model switching is still available but both options now use the 90B model since 11B has been decommissioned.

---

## Model Information

| Feature | 90B Vision Model |
|---------|------------------|
| **Speed** | ⭐⭐⭐⭐ (3-5 seconds) |
| **Accuracy** | ⭐⭐⭐⭐⭐ (Excellent) |
| **Detail Level** | Very High |
| **OCR Quality** | Excellent |
| **Object Detection** | Excellent |
| **Scene Understanding** | Excellent |
| **Cost** | FREE with Groq API |
| **Response Time** | 3-5 seconds |
| **Status** | ✅ Active |

---

## What Can Vision Models Do?

### ✅ **Supported Tasks**

1. **Image Description**
   - "What's in this image?"
   - "Describe this picture in detail"

2. **Object Detection**
   - "What objects can you see?"
   - "How many people are in this photo?"

3. **OCR (Text Reading)**
   - "Read the text in this image"
   - "What does the sign say?"

4. **Scene Understanding**
   - "What's happening in this image?"
   - "Describe the setting"

5. **Color Analysis**
   - "What colors are dominant?"
   - "Describe the color scheme"

6. **Visual Question Answering**
   - "Is there a cat in the image?"
   - "What color is the car?"

7. **Image Classification**
   - "What type of image is this?"
   - "Is this indoors or outdoors?"

---

## Optimization Tips

### **For Speed** 🚀
```javascript
VISION_MODEL: VISION_MODELS.LLAMA_VISION_11B,
VISION_MAX_TOKENS: 1000,  // Reduce for faster responses
```

### **For Quality** 🎯
```javascript
VISION_MODEL: VISION_MODELS.LLAMA_VISION_90B,
VISION_MAX_TOKENS: 2000,  // More tokens for detailed descriptions
TEMPERATURE: 0.5,          // Lower = more focused/consistent
```

### **For Creativity** 🎨
```javascript
TEMPERATURE: 0.9,          // Higher = more creative descriptions
```

---

## Alternative AI Providers

### **If you want to try other providers:**

#### **OpenAI GPT-4 Vision** (Paid)
- Model: `gpt-4-vision-preview`
- Quality: Excellent
- Cost: ~$0.01-0.03 per image
- API: `https://api.openai.com/v1/chat/completions`

#### **Anthropic Claude 3** (Paid)
- Model: `claude-3-opus-20240229` (vision)
- Quality: Excellent
- Cost: ~$0.015 per image
- API: `https://api.anthropic.com/v1/messages`

#### **Google Gemini Vision** (Free tier available)
- Model: `gemini-pro-vision`
- Quality: Very Good
- Cost: Free tier available
- API: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision`

---

## Testing Your Configuration

After changing models, test with:

1. **Simple image**: Upload a basic photo
2. **Text image**: Upload image with text (OCR test)
3. **Complex scene**: Upload a detailed scene
4. **Compare**: Try both 11B and 90B models

---

## Recommended Settings

### **For Chat Application** (Current)
```javascript
✅ VISION_MODEL: LLAMA_VISION_11B
✅ VISION_MAX_TOKENS: 1500
✅ TEMPERATURE: 0.7
```

### **For Image Analysis Tool**
```javascript
🎯 VISION_MODEL: LLAMA_VISION_90B
🎯 VISION_MAX_TOKENS: 2000
🎯 TEMPERATURE: 0.5
```

---

## Current Status

✅ **11B Vision Model** (llama-3.2-11b-vision-preview)
- Fast responses
- Good quality
- Perfect for chat
- FREE with Groq API

---

## Need Help?

- **Groq Docs**: https://console.groq.com/docs/vision
- **Model Playground**: https://console.groq.com/playground
- **API Status**: https://status.groq.com/

---

**Last Updated**: November 14, 2025
**Current Model**: llama-3.2-90b-vision-preview (90B) ✅
**Note**: 11B model decommissioned - all vision requests use 90B model
