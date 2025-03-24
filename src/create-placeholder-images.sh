#!/bin/bash
# create-placeholder-images.sh
# A simple script to generate placeholder SVG images for the AI Tools section

# Define the images directory
IMAGES_DIR="./src/images"

# Make sure the images directory exists
mkdir -p "$IMAGES_DIR"

# Function to create an SVG file with the given name and description
create_svg() {
  local name="$1"
  local description="$2"
  local filename="$3"
  local filepath="$IMAGES_DIR/$filename"
  
  cat > "$filepath" << EOF
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8338ec;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3a86ff;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#grad)"/>
  <text x="300" y="200" font-family="Arial" font-size="42" font-weight="bold" text-anchor="middle" fill="white">$name</text>
  <text x="300" y="240" font-family="Arial" font-size="24" text-anchor="middle" fill="white">$description</text>
</svg>
EOF
  
  echo "Created placeholder image: $filepath"
}

# Create SVG files for each tool
create_svg "Ollama" "Local LLM Runner" "ollama.svg"
create_svg "LM Studio" "GUI for Local Models" "lm-studio.svg"
create_svg "LocalAI" "OpenAI API Alternative" "localai.svg"
create_svg "NVIDIA NeMo" "GPU-Accelerated ML" "nvidia-nemo.svg"
create_svg "PEFT" "Parameter Efficient Fine-Tuning" "peft.svg"
create_svg "Axolotl" "Fine-tuning Framework" "axolotl.svg"
create_svg "NVIDIA AI Enterprise" "End-to-End AI Platform" "nvidia-enterprise.svg"
create_svg "HuggingFace Trainer" "PyTorch Training API" "huggingface-trainer.svg"
create_svg "MONAI" "Medical Imaging AI" "monai.svg"

echo "All placeholder images have been created!"
echo "Note: For production, replace these with actual images." 