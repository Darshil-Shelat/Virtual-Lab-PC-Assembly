# PC Assembly Virtual Lab

## About the Website
The PC Assembly Virtual Lab is an interactive educational web application designed to teach users how to assemble a computer from scratch. It acts as a digital laboratory where users can learn the theory behind computer components and safely practice assembling a working system without the risk of damaging real hardware.

## Features Provided
- **Interactive Drag & Drop:** Learn standard PC component placements with an intuitive drag-and-drop interface to place components (CPU, RAM, GPU, PSU) onto a virtual motherboard.
- **Audio Instructions:** Built-in voice instructions guide you through the assembly sequence (can be toggled on/off).
- **Theory Learning Module:** Comprehensive definitions and guides about main PC components and their functions.
- **Knowledge Quiz:** A multiple-choice evaluation feature with automated scoring and instant feedback to test your understanding.
- **Progress & Mistake Tracking:** The simulation actively tracks your attempts, placement mistakes, and automatically provides visual sequence feedback.

## User Manual (How to Use)
1. **Home:** When you open the website, you will see a simulated demo. Click "Start System" to begin.
2. **Theory:** Read through the cards explaining each component (Motherboard, CPU, RAM, GPU, PSU). Click "Enter Simulation Lab" when ready.
3. **Simulation (Drag & Drop):**
   - Look at the instruction on the left side to see which component is needed.
   - On the right side, click and hold on the correct component.
   - Drag the component to the matching slot on the motherboard on the left and release your mouse button to drop it.
   - If correct, it will snap into place. If wrong, it will bounce back and log a mistake.
   - Turn on/off audio using the speaker icon in the top right.
4. **Quiz:** After successfully assembling the PC, take the quiz. Select your answers to see if you have truly mastered the basics of PC assembly.

## Dependencies to Download
To run this modern web application on your local PC, you must have the following downloaded and installed:
- **Node.js** (Version 18 or newer): Download from [nodejs.org](https://nodejs.org/)

## Download, Setup & Run Instructions
Since this is a modern web application, you cannot simply double-click `index.html` to open it. Follow these steps to run it properly:

1. **Download:** Download the `.zip` file provided by your friend and extract (unzip) it into a folder on your computer.
2. **Open Terminal:** Open your Command Prompt (Windows), PowerShell, or Terminal (Mac/Linux).
3. **Navigate to Folder:** Use the `cd` command to navigate to the folder where you extracted the project.
   ```bash
   cd path/to/extracted/folder
   ```
4. **Install App Dependencies:** Run the following command to download all required packages for the app:
   ```bash
   npm install
   ```
5. **Run the Application:** Start the local server by typing:
   ```bash
   npm run dev
   ```
6. **Open Website:** Open your favorite web browser (Chrome, Edge, Firefox) and go to the address shown in your terminal (usually `http://localhost:5173` or `http://localhost:3000`).
