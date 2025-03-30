// src/components/AnimatedBackground.tsx
import React, { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

// Define the properties for each floating shape
interface Shape {
  id: number;
  type: 'circle' | 'square' | 'triangle' | 'hexagon';
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  speed: number;
  opacity: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  // Generate a set of random shapes
  const generateShapes = (): Shape[] => {
    const shapes: Shape[] = [];
    const shapeTypes: ('circle' | 'square' | 'triangle' | 'hexagon')[] = ['circle', 'square', 'triangle', 'hexagon'];
    
    // Create 15 random shapes with various properties
    for (let i = 0; i < 15; i++) {
      shapes.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        x: Math.random() * 100, // random position along x-axis (0-100%)
        y: Math.random() * 100, // random position along y-axis (0-100%)
        size: Math.random() * 60 + 20, // size between 20-80px
        rotation: Math.random() * 360, // random initial rotation
        color: `hsla(${Math.random() * 360}, 70%, 60%, ${Math.random() * 0.2 + 0.3})`, // random color with higher opacity (0.3-0.5)
        speed: Math.random() * 0.5 + 0.1, // random speed for movement
        opacity: Math.random() * 0.3 + 0.3, // random opacity between 0.3-0.6
      });
    }
    
    return shapes;
  };
  
  const [shapes, setShapes] = useState<Shape[]>(generateShapes());
  
  useEffect(() => {
    // Animate the shapes
    const animateShapes = () => {
      const interval = setInterval(() => {
        setShapes(prevShapes => 
          prevShapes.map(shape => ({
            ...shape,
            // Slowly move the shape upward and sideways using sine waves for natural movement
            x: (shape.x + Math.sin(Date.now() / 3000 * shape.speed) * 0.2) % 100,
            y: (shape.y - shape.speed * 0.05 + 100) % 100, // Move up and wrap around
            rotation: shape.rotation + shape.speed * 0.2, // Slowly rotate
          }))
        );
      }, 50);

      return () => clearInterval(interval);
    };

    const animation = animateShapes();
    
    return () => {
      if (animation) animation();
    };
  }, []);

  // Render a specific shape based on its type
  const renderShape = (shape: Shape) => {
    const shapeStyle = {
      position: 'absolute' as 'absolute',
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      backgroundColor: shape.color,
      opacity: shape.opacity,
      transform: `rotate(${shape.rotation}deg)`,
      transition: 'all 1s ease-out',
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div 
            key={shape.id}
            style={{
              ...shapeStyle,
              borderRadius: '50%',
            }}
            className="pointer-events-none"
          />
        );
      case 'square':
        return (
          <div 
            key={shape.id}
            style={{
              ...shapeStyle,
              borderRadius: '8px',
            }}
            className="pointer-events-none"
          />
        );
      case 'triangle':
        return (
          <div 
            key={shape.id}
            style={{
              position: 'absolute',
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              opacity: shape.opacity,
              transform: `rotate(${shape.rotation}deg)`,
              transition: 'all 1s ease-out',
            }}
            className="pointer-events-none"
          />
        );
      case 'hexagon':
        return (
          <div 
            key={shape.id}
            style={{
              ...shapeStyle,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
            className="pointer-events-none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Animated background elements - fixed position with higher opacity */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {shapes.map(shape => renderShape(shape))}
      </div>
      
      {/* Main content - should be able to scroll independently of background */}
      <div className="relative w-full h-full overflow-auto z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;