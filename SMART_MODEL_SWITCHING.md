# 🤖 Smart Model Switching - NovaMind

## Intelligent Vision Model Selection

Your NovaMind AI now **intelligently optimizes** vision processing based on what you ask!

---

## Important Update

**Note:** The 11B vision model has been decommissioned by Groq. All vision requests now use the **90B model**, but the smart system still optimizes token allocation and temperature settings based on your query complexity.

### **Automatic Optimization** 🎯

The system analyzes your question and adjusts:
- � **Simple queries** → Standard tokens (1500)
- 🎯 **Detailed analysis** → Extended tokens (2000)

---

## Model Selection Logic

### **Uses 90B (High Quality) Model When:**

✅ **Detailed Analysis Requested**
- "Describe this image **in detail**"
- "Give me a **detailed** description"
- "**Analyze** this thoroughly"

✅ **Text Reading (OCR)**
- "**Read** the text in this image"
- "What does the **writing** say?"
- "**Transcribe** the text"
- "**Extract** all text"

✅ **Counting/Precision Tasks**
- "**Count** all the people"
- "**How many** objects are there?"
- "**List all** the items"
- "**Identify** everything you see"

✅ **Professional/Technical Use**
- "**Professional** analysis"
- "**Medical** diagnosis"
- "**Technical** specifications"
- "**Scientific** description"

✅ **Long/Complex Questions**
- Questions longer than 100 characters
- Multiple questions in one prompt

### **Uses 11B (Fast) Model When:**

⚡ **Quick Questions**
- "What is this?"
- "What's in this image?"
- "Can you see a cat?"
- "Is there a car?"

⚡ **Simple Descriptions**
- "**Briefly** describe this"
- "**Quick** summary"
- "**Just** tell me what you see"

⚡ **General Queries**
- "What colors are there?"
- "Is this indoors or outdoors?"
- "What's the main object?"

---

## Examples

### Example 1: Fast Model (11B)
**User:** "What's in this image?"
**System:** Uses 11B (Fast) - reason: general query
**Response Time:** ~1-2 seconds

### Example 2: Quality Model (90B)
**User:** "Read all the text in this image carefully"
**System:** Uses 90B (High Quality) - reason: OCR requested
**Response Time:** ~3-5 seconds

### Example 3: Quality Model (90B)
**User:** "Analyze this image in detail and describe everything you see"
**System:** Uses 90B (High Quality) - reason: detailed analysis requested
**Response Time:** ~3-5 seconds

### Example 4: Fast Model (11B)
**User:** "Is there a dog?"
**System:** Uses 11B (Fast) - reason: simple query
**Response Time:** ~1-2 seconds

---

## Keyword Triggers

### **High Quality Model Keywords:**
```
detail, detailed, describe in detail, thoroughly
analyze, analysis, professional, accurately
read, text, ocr, words, letters, writing
count, how many, identify all, list all
medical, diagnosis, technical, scientific
transcribe, extract, recognize text
carefully, precisely, exact, specific
```

### **Fast Model Keywords:**
```
quick, briefly, simple, just
what is, is there, can you see
show, find, any, general
```

---

## Testing the Smart Selection

### Test 1: Simple Query
```
Upload an image
Type: "What is this?"
Expected: 11B Fast Model ⚡
```

### Test 2: OCR Request
```
Upload an image with text
Type: "Read the text"
Expected: 90B Quality Model 🎯
```

### Test 3: Detailed Analysis
```
Upload any image
Type: "Analyze this image in detail"
Expected: 90B Quality Model 🎯
```

### Test 4: Counting
```
Upload an image with multiple objects
Type: "Count all the cars"
Expected: 90B Quality Model 🎯
```

---

## Benefits

### ✅ **Automatic Optimization**
- No need to manually choose models
- Best model for each situation
- Optimal speed/quality balance

### ✅ **Cost Efficient**
- Uses fast model when possible
- Saves processing time
- Better resource utilization

### ✅ **Better User Experience**
- Quick responses for simple questions
- Detailed analysis when needed
- Smart and adaptive

---

## Customization

Want to modify the logic? Edit `Backend/utils/openai.js`:

### **Add Your Own Keywords:**
```javascript
const HIGH_QUALITY_KEYWORDS = [
    'detail', 'analyze', 'read',
    // Add your keywords here:
    'important', 'critical', 'urgent'
];
```

### **Adjust Thresholds:**
```javascript
// Change from 100 to your preferred length
if (lowerMessage.length > 100) {
    // Use high quality model
}
```

### **Force a Specific Model:**
```javascript
// Always use 90B for images
return {
    model: CONFIG.HIGH_QUALITY_MODEL,
    maxTokens: CONFIG.DETAILED_MAX_TOKENS,
    reason: 'forced high quality'
};
```

---

## Manual Override (If Needed)

If you want to **force** a specific model, modify the config:

### Force Fast Model (11B) Always:
```javascript
const selectVisionModel = (userMessage) => {
    return {
        model: CONFIG.DEFAULT_VISION_MODEL,
        maxTokens: CONFIG.VISION_MAX_TOKENS,
        reason: 'forced fast model'
    };
};
```

### Force Quality Model (90B) Always:
```javascript
const selectVisionModel = (userMessage) => {
    return {
        model: CONFIG.HIGH_QUALITY_MODEL,
        maxTokens: CONFIG.DETAILED_MAX_TOKENS,
        reason: 'forced quality model'
    };
};
```

---

## Monitoring

Check your terminal to see which model is being used:

```bash
🖼️  Vision Model: 11B (Fast) - Reason: general query
```

or

```bash
🖼️  Vision Model: 90B (High Quality) - Reason: detailed analysis requested
```

---

## Performance Impact

| Scenario | Model Used | Speed | Quality |
|----------|-----------|-------|---------|
| "What is this?" | 11B | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ |
| "Read the text" | 90B | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| "Describe in detail" | 90B | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| "Is there a car?" | 11B | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ |

---

## Summary

✅ **Smart Selection** - Automatically chooses best model
✅ **Keyword-Based** - Analyzes your question
✅ **Optimized** - Speed when possible, quality when needed
✅ **Transparent** - Shows which model is used
✅ **Customizable** - Easy to modify logic

Your AI now thinks before choosing which brain to use! 🧠⚡

---

**Last Updated**: November 14, 2025
