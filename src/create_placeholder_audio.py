#!/usr/bin/env python3

"""
Create placeholder audio files for website demos
This script creates simple WAV files for demo purposes
"""

import os
import wave
import struct
import math

def create_audio_file(filename, duration=3.0, freq_start=440, freq_end=440, volume=0.5):
    """
    Create a simple WAV file with the given parameters.
    
    Args:
        filename: The name of the WAV file to create
        duration: Duration of the audio in seconds
        freq_start: Starting frequency in Hz
        freq_end: Ending frequency in Hz
        volume: Volume (0.0 to 1.0)
    """
    # Audio parameters
    sample_rate = 44100  # samples per second
    num_samples = int(duration * sample_rate)
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    # Create the WAV file
    with wave.open(filename, 'w') as wav_file:
        wav_file.setparams((1, 2, sample_rate, num_samples, 'NONE', 'not compressed'))
        
        # Generate samples
        samples = []
        for i in range(num_samples):
            t = i / sample_rate  # time in seconds
            
            # Linear interpolation for frequency
            freq = freq_start + (freq_end - freq_start) * t / duration
            
            # Add fade in/out (simple linear envelope)
            fade_duration = 0.1  # seconds
            if t < fade_duration:
                env = t / fade_duration
            elif t > duration - fade_duration:
                env = (duration - t) / fade_duration
            else:
                env = 1.0
                
            # Generate sample
            sample = volume * env * math.sin(2 * math.pi * freq * t)
            
            # Convert to 16-bit signed integer
            packed_sample = struct.pack('h', int(sample * 32767))
            samples.append(packed_sample)
        
        # Write samples to file
        wav_file.writeframes(b''.join(samples))
    
    print(f"Created: {filename}")

def main():
    # Change to script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Audio files directory
    audio_dir = "audio"
    
    print("Generating placeholder audio files for demos...")
    
    # Create demo audio files for voice demo
    print("Creating voice demo files...")
    create_audio_file(f"{audio_dir}/english-demo.wav", 3.0, 400, 500)
    create_audio_file(f"{audio_dir}/french-demo.wav", 3.0, 350, 450)
    create_audio_file(f"{audio_dir}/cloned-demo.wav", 3.0, 420, 520)  # Slightly different frequencies for the cloned voice
    
    # Create welcome message audio
    print("Creating welcome message audio...")
    create_audio_file(f"{audio_dir}/welcome-message.wav", 6.0, 440, 460)
    
    # Create call center comparison audio
    print("Creating call center comparison files...")
    create_audio_file(f"{audio_dir}/traditional-call-center.wav", 5.0, 300, 400)
    create_audio_file(f"{audio_dir}/ai-enhanced-call-center.wav", 5.0, 500, 600)
    
    # Create voice styles for content generator
    print("Creating voice style previews...")
    create_audio_file(f"{audio_dir}/professional-voice.wav", 4.0, 440, 480)
    create_audio_file(f"{audio_dir}/friendly-voice.wav", 4.0, 380, 420)
    create_audio_file(f"{audio_dir}/technical-voice.wav", 4.0, 520, 580)
    
    print("\nAll audio files created successfully!")
    print("Note: Files are WAV format. You may need to update your HTML to use .wav extension.")
    print("These are placeholders - replace with real recordings for production use.")

if __name__ == "__main__":
    main() 