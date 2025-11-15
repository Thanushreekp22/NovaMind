import "dotenv/config";

// Available models
const MODELS = {
    // Google Gemini (Free tier available, great for vision)
    GEMINI_VISION: "gemini-2.0-flash",  // Latest Gemini 2.0 Flash - supports vision
    
    // Groq text models (Free & Fast)
    LLAMA_TEXT_70B: "llama-3.3-70b-versatile",
    LLAMA_TEXT_8B: "llama-3.1-8b-instant",
};

// Configuration
const CONFIG = {
    VISION_MODEL: MODELS.GEMINI_VISION,
    TEXT_MODEL: MODELS.LLAMA_TEXT_70B,
    
    // Settings
    TEMPERATURE: 0.7,
    MAX_TOKENS: 1024,
    VISION_MAX_TOKENS: 1500,
};

// Keywords that suggest need for detailed/high-quality analysis
const HIGH_QUALITY_KEYWORDS = [
    'detail', 'detailed', 'describe in detail', 'thoroughly',
    'analyze', 'analysis', 'professional', 'accurately',
    'read', 'text', 'ocr', 'words', 'letters', 'writing',
    'count', 'how many', 'identify all', 'list all',
    'medical', 'diagnosis', 'technical', 'scientific',
    'transcribe', 'extract', 'recognize text',
    'carefully', 'precisely', 'exact', 'specific'
];

// Keywords that suggest simple/quick analysis is fine
const SIMPLE_KEYWORDS = [
    'quick', 'briefly', 'simple', 'just',
    'what is', 'is there', 'can you see',
    'show', 'find', 'any', 'general'
];

/**
 * Intelligently selects the best vision model based on user's question
 * @param {string} userMessage - The user's text prompt
 * @returns {object} - Model configuration
 */
const selectVisionModel = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for high-quality analysis indicators
    const needsHighQuality = HIGH_QUALITY_KEYWORDS.some(keyword => 
        lowerMessage.includes(keyword)
    );
    
    // Check for simple query indicators
    const isSimpleQuery = SIMPLE_KEYWORDS.some(keyword => 
        lowerMessage.includes(keyword)
    );
    
    // Decision logic
    if (needsHighQuality && !isSimpleQuery) {
        return {
            model: CONFIG.HIGH_QUALITY_MODEL,
            maxTokens: CONFIG.DETAILED_MAX_TOKENS,
            reason: 'high-quality analysis requested'
        };
    }
    
    // Check message length - longer questions might need detailed responses
    if (lowerMessage.length > 100 && !isSimpleQuery) {
        return {
            model: CONFIG.HIGH_QUALITY_MODEL,
            maxTokens: CONFIG.DETAILED_MAX_TOKENS,
            reason: 'complex question detected'
        };
    }
    
    // Default to faster model for general queries
    return {
        model: CONFIG.DEFAULT_VISION_MODEL,
        maxTokens: CONFIG.VISION_MAX_TOKENS,
        reason: 'general query'
    };
};

const getAIResponse = async(message, imageBase64 = null) => {
    // Check if image is provided - use Gemini Vision
    if (imageBase64) {
        console.log('\n🖼️  IMAGE REQUEST RECEIVED');
        console.log('Message:', message);
        console.log('Image data length:', imageBase64?.length || 0);
        
        // Check if Gemini API key is configured
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            console.error('❌ Gemini API key not configured');
            return "Image analysis is not configured yet.\n\n" +
                   "To enable image analysis:\n" +
                   "1. Get a free API key from: https://aistudio.google.com/app/apikey\n" +
                   "2. Add it to your .env file: GEMINI_API_KEY=your_key_here\n" +
                   "3. Restart the server\n\n" +
                   "Google Gemini offers a generous free tier!";
        }
        
        console.log('✅ API Key found:', process.env.GEMINI_API_KEY.substring(0, 20) + '...');
        
        try {
            // Extract base64 data and mime type
            let base64Data = imageBase64;
            let mimeType = "image/jpeg"; // default
            
            if (imageBase64.includes(',')) {
                // Format: data:image/png;base64,iVBORw0KG...
                const parts = imageBase64.split(',');
                base64Data = parts[1];
                
                // Extract mime type from data URL
                const mimeMatch = parts[0].match(/data:(image\/[a-z]+);base64/);
                if (mimeMatch) {
                    mimeType = mimeMatch[1];
                }
            }
            
            console.log(`📸 Image format: ${mimeType}`);
            console.log(`📏 Base64 data length: ${base64Data.length}`);
            console.log(`🤖 Using model: ${CONFIG.VISION_MODEL}`);
            
            // Gemini API request - using generateContent endpoint
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.VISION_MODEL}:generateContent`;
            
            const requestBody = {
                contents: [{
                    parts: [
                        { text: message },
                        {
                            inline_data: {
                                mime_type: mimeType,
                                data: base64Data
                            }
                        }
                    ]
                }]
            };
            
            console.log(`🌐 Calling API: ${apiUrl}`);
            console.log('📤 Sending request...');
            
            const response = await fetch(
                `${apiUrl}?key=${process.env.GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                }
            );
            
            console.log('📡 Response status:', response.status);
            
            const data = await response.json();
            
            if (!response.ok || data.error) {
                console.error('❌ API Error Response:', JSON.stringify(data, null, 2));
                throw new Error(data.error?.message || `API returned status ${response.status}`);
            }
            
            console.log('📦 Response data:', JSON.stringify(data, null, 2).substring(0, 500));
            
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                const result = data.candidates[0].content.parts[0].text;
                console.log('✅ SUCCESS! Generated response length:', result.length);
                return result;
            } else {
                console.error('❌ Unexpected response structure:', JSON.stringify(data, null, 2));
                throw new Error('Invalid response format from Gemini API');
            }
            
        } catch (err) {
            console.error('❌ ERROR in Gemini Vision:', err.message);
            console.error('Stack:', err.stack);
            return `Error analyzing image: ${err.message}\n\nPlease check the backend console for details.`;
        }
    }
    
    // Text-only request - use Groq (free and fast)
    const messageContent = message;
    const model = CONFIG.TEXT_MODEL;
    const maxTokens = CONFIG.MAX_TOKENS;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{
                role: "user",
                content: messageContent
            }],
            temperature: CONFIG.TEMPERATURE,
            max_tokens: maxTokens
        })
    };

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
        const data = await response.json();
        
        if (data.error) {
            console.error("Groq API Error:", data.error);
            
            // Provide helpful error messages
            if (data.error.code === 'model_not_found') {
                throw new Error(`Model ${model} not available. Please check Groq documentation for available models.`);
            }
            
            throw new Error(data.error.message || "Groq API error");
        }
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error("Invalid Groq response structure");
            throw new Error("Invalid response from Groq");
        }
        
        return data.choices[0].message.content; //reply
    } catch(err) {
        console.error("Error in getAIResponse:", err.message);
        throw err;
    }
}

export default getAIResponse;