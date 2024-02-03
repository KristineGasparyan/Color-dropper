import React, { useCallback, useEffect, useRef, useState } from 'react';
import { convertRgbToHex } from './utils';
import './App.css';

function ColorDropperApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circleDiameter = 30;
  const [isPickerActive, setIsPickerActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const currentColor = useRef('');
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseDown = () => {
    if (!isPickerActive) return;
    setSelectedColor(currentColor.current);
  };

  const handleDropperClick = () => {
    setIsPickerActive((prev) => !prev);
  };

  useEffect(() => {
    const imagePath = '/assets/beach.jpg';
    const canvasContext = canvasRef.current?.getContext('2d');

    if (canvasContext) {
      imageRef.current = new Image();
      imageRef.current.src = imagePath;

      imageRef.current.onload = () => {
        renderScaledImage(imageRef.current!, canvasContext);
      };
    }
  }, []);

  const renderScaledImage = (
    img: HTMLImageElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const canvas = ctx.canvas;
    const horizontalRatio = canvas.width / img.width;
    const verticalRatio = canvas.height / img.height;
    const scaleRatio = Math.min(horizontalRatio, verticalRatio);
    const centerShiftX = (canvas.width - img.width * scaleRatio) / 2;
    const centerShiftY = (canvas.height - img.height * scaleRatio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      img.width * scaleRatio,
      img.height * scaleRatio
    );
  };

  const renderCircle = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const xAxis = e.nativeEvent.offsetX;
    const yAxis = e.nativeEvent.offsetY;
    const context = canvasRef.current?.getContext('2d');

    if (!context || !canvasRef.current || !imageRef.current) return;

    const pixelsData = context.getImageData(xAxis, yAxis, 1, 1).data;
    const hexColor = convertRgbToHex(
      pixelsData[0],
      pixelsData[1],
      pixelsData[2]
    );

    currentColor.current = hexColor;
    context.beginPath();
    context.strokeStyle = hexColor;
    context.lineWidth = 8;

    renderScaledImage(imageRef.current, context);

    context.save();
    context.arc(xAxis, yAxis, circleDiameter, 0, 2 * Math.PI);
    context.clip();

    const startX = xAxis - circleDiameter;
    const startY = xAxis - circleDiameter;
    const endX = xAxis + circleDiameter;
    const endY = xAxis + circleDiameter;
    const scaleX = 2;
    const scaleY = 2;

    context.drawImage(
      canvasRef.current,
      startX,
      startY,
      endX - startX,
      endY - startY,
      startX,
      startY,
      (endX - startX) * scaleX,
      (endY - startY) * scaleY
    );

    context.fillText(
      hexColor,
      xAxis - circleDiameter / 2 - 5,
      yAxis + circleDiameter / 2
    );

    context.restore();
    context.stroke();
  }, []);

  return (
    <div className='dropper-app'>
      <div className='dropper-box'>
        <img
          onClick={handleDropperClick}
          className={`color-picker ${isPickerActive ? 'active' : ''}`}
          alt=''
          src='/assets/IconColorPicker.svg'
        />
        <h3
          className={selectedColor ? 'selected-color' : ''}
          style={{ color: selectedColor }}
        >
          Selected Color: {selectedColor}
        </h3>
      </div>
      <canvas
        className='canvas'
        ref={canvasRef}
        width='1000px'
        height='600px'
        onMouseMove={renderCircle}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default ColorDropperApp;
