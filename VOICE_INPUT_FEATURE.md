# Voice Input Feature Documentation

## Overview
Voice input functionality has been successfully integrated into the NovaMind chat application. Users can now speak their queries instead of typing them.

## Features Added

### 1. **Microphone Button**
- A green microphone button appears next to the send button in the chat input area
- The button is only visible if the browser supports Web Speech API
- Click to start/stop voice recording

### 2. **Visual Feedback**
- **Green microphone icon**: Ready to record
- **Red stop icon with pulse animation**: Currently recording
- Smooth hover effects and animations

### 3. **Real-time Transcription**
- Speech is converted to text in real-time
- Text appears in the input field as you speak
- Supports English language (can be configured for other languages)

### 4. **Browser Compatibility**
- ✅ Chrome/Chromium browsers (best support)
- ✅ Microsoft Edge
- ✅ Safari
- ❌ Firefox (limited support)

## How to Use

1. **Start Recording**: Click the green microphone button
2. **Speak**: The button turns red and pulses while recording
3. **Stop Recording**: Click the red button or stop speaking
4. **Send**: Review the transcribed text and click send

## Technical Implementation

### Frontend Changes

#### `ChatWindow.jsx`
- Added state management for voice input:
  - `isListening`: Tracks recording state
  - `isSpeechSupported`: Checks browser support
  - `recognitionRef`: Stores speech recognition instance

- Implemented Web Speech API:
  - Continuous mode disabled for single-utterance input
  - Interim results enabled for real-time feedback
  - Error handling for unsupported browsers

#### `ChatWindow.css`
- Added `.voice-btn` class for microphone button styling
- Created `pulse-red` animation for recording feedback
- Updated input padding to accommodate both buttons
- Responsive design maintains layout integrity

## Configuration

### Language Settings
To change the recognition language, modify in `ChatWindow.jsx`:
```javascript
recognition.lang = 'en-US'; // Change to desired language code
```

### Supported Languages
- `en-US` - English (US)
- `en-GB` - English (UK)
- `es-ES` - Spanish
- `fr-FR` - French
- `de-DE` - German
- `ja-JP` - Japanese
- And many more...

## Browser Requirements

The feature uses the Web Speech API, which requires:
- HTTPS connection (or localhost for development)
- Microphone permissions granted by user
- Modern browser with Web Speech API support

## Future Enhancements

Possible improvements:
1. Add language selector in UI
2. Support for multiple languages in same session
3. Voice commands (e.g., "send", "clear")
4. Offline speech recognition
5. Custom wake word detection
6. Audio level indicator during recording

## Troubleshooting

### Microphone button not appearing
- Check if your browser supports Web Speech API
- Use Chrome, Edge, or Safari for best results

### Voice input not working
- Grant microphone permissions when prompted
- Check if microphone is working in system settings
- Ensure you're using HTTPS (or localhost)

### Poor transcription accuracy
- Speak clearly and at moderate pace
- Reduce background noise
- Check microphone quality
- Ensure correct language is selected

## Security & Privacy

- Speech processing happens in the browser
- No audio data is stored on servers
- Transcribed text is treated like typed input
- Follow browser's privacy settings for microphone access

## Testing

To test the feature:
1. Start the development server: `npm run dev` (in Frontend folder)
2. Navigate to the chat interface
3. Look for the green microphone button
4. Grant microphone permissions when prompted
5. Click and speak to test transcription

## Credits

Built using:
- Web Speech API (SpeechRecognition)
- React hooks for state management
- Font Awesome icons for UI elements
