# Audio Files for PipeCat AI Demo

This directory should contain the following audio files for the voice demo:

1. `welcome-message.wav` - The welcome message that plays when the user confirms the volume prompt
2. `english-demo.wav` - Demo of English TTS with your voice
3. `french-demo.wav` - Demo of French TTS with the same voice model
4. `cloned-demo.wav` - A placeholder for the generated cloned voice from the user upload

## Recording Instructions

For the actual implementation, you would need to:

1. Use the PipeCat AI API to generate these audio files
2. Alternatively, record samples of your voice for demonstration purposes
3. For the `welcome-message.wav`, combine recordings of English and French segments

The `src/js/welcome-script.js` file contains the script text for the welcome message that would be used with the PipeCat AI API. 