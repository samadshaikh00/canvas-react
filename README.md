# Image Inpainting Widget

A simple React-based image inpainting widget that allows users to upload an image, draw a mask on it, and export the mask image for further use. This project is built with React, and utilizes `react-canvas-draw` for drawing functionality.

## Features

- **Image Upload**: Upload images in JPEG or PNG format.
- **Mask Drawing**: Draw masks on the image, where the drawn area appears white and the background remains black.
- **Brush Controls**: Increase or decrease the brush size for drawing.
- **Brush Color**: Change the brush color to any chosen color.
- **Export the Mask**: Export the mask as a PNG image.
- **Clear the Canvas**: Clear the drawn mask to start a new drawing.
- **Responsive UI**: The app adjusts to fit the uploaded image and provides a smooth, intuitive user experience.

## Installation

Follow these steps to get the project up and running:

1. Clone the repository:
   ```bash
   git clone https://github.com/samadshaikh00/canvas-react.git

2. Navigate into the project directory:
       cd canvas-react
3. Install the dependencies:
      npm install
4.Start the development server:
      npm start


Usage
-Upload an image by clicking the "Choose File" button.
-Draw a mask on the image by adjusting the brush size and color.
-Use the Decrease Brush Size and Increase Brush Size buttons to control the brush size.
-After drawing, click Export Mask to generate the mask image.
-Click Clear Canvas to remove the drawn mask and start over.
-Both the original image and the mask image will be displayed side-by-side.


Technologies Used
-React: A JavaScript library for building user interfaces.
-react-canvas-draw: A React component to draw on an HTML canvas.
-CSS: For styling the application with a modern, clean look.

   
