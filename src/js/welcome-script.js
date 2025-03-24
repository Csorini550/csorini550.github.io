// Script for the welcome audio recording for PipeCat AI demo

/**
 * This file serves as a guide for recording the welcome audio.
 * The actual implementation would involve using the PipeCat AI API
 * to generate these audio files.
 */

// English intro (your voice)
const englishIntro = `
Hi there! Welcome to my portfolio. I'm Christopher T. Sorini, a software engineer passionate about building great web experiences.

Let me introduce you to one of my AI projects called PipeCat AI, which can transform text to speech in different languages while maintaining voice characteristics.
`;

// French continuation (same voice model)
const frenchContinuation = `
PipeCat AI peut générer du contenu audio dans différentes langues tout en maintenant les caractéristiques de ma voix. C'est particulièrement utile pour les applications multilingues et les expériences utilisateur globales.
`;

// English conclusion (back to your voice)
const englishConclusion = `
As you can hear, the AI can seamlessly switch between languages. Feel free to explore my portfolio and try the voice cloning demo below where you can use your own voice.

Don't forget to check out my other AI tools and projects!
`;

/**
 * In a real implementation, these text blocks would be sent to the PipeCat AI API
 * to generate the audio files. Then they would be concatenated into a single
 * welcome-message.wav file that's played when the user confirms the volume prompt.
 * 
 * Example API call (pseudocode):
 * 
 * async function generateWelcomeAudio() {
 *   const englishIntroAudio = await pipecatAPI.generateSpeech({
 *     text: englishIntro,
 *     voice: "christopher",
 *     language: "en-US"
 *   });
 *   
 *   const frenchAudio = await pipecatAPI.generateSpeech({
 *     text: frenchContinuation,
 *     voice: "christopher",
 *     language: "fr-FR"
 *   });
 *   
 *   const englishConclusionAudio = await pipecatAPI.generateSpeech({
 *     text: englishConclusion,
 *     voice: "christopher",
 *     language: "en-US"
 *   });
 *   
 *   // Combine the audio files
 *   const combinedAudio = await audioUtils.concatenate([
 *     englishIntroAudio,
 *     frenchAudio,
 *     englishConclusionAudio
 *   ]);
 *   
 *   return combinedAudio;
 * }
 */ 