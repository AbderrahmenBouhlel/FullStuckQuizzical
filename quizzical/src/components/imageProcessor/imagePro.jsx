import React, { useRef, useEffect } from 'react';

const ImageProcessor = ({ src, change }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  
  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      processImage();
    };

    // Process the image when the src or change props change
    const processImage = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0);

      // Get the image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      if (change) {
        // Process the image data
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Replace blue with green
          // Define "blue" as pixels where blue is significantly higher than red and green
          if (b > 120 && b > r + 20 && b > g + 20) {
            data[i] = 133;      // Red component
            data[i + 1] = 206; // Green component
            data[i + 2] = 169;   // Blue component
          }
          if (r > 220 && g > 220 && b > 220) {
            data[i] = 0;      // Red component
            data[i + 1] = 0;  // Green component
            data[i + 2] = 0;  // Blue component
          }
        }
      }

      // Put the processed image data back on the canvas
      ctx.putImageData(imageData, 0, 0);
    };

    if (img.complete) {
      processImage();
    }

  }, [src, change]);

  return (
    <div className='imageProCont'>
      <img ref={imgRef} src={src} alt="Original" className='img' style={{ display: 'none' }} />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ImageProcessor;
