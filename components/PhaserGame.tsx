'use client';
import Phaser from 'phaser';
import React, { useEffect, useRef, useState } from 'react';
import Background from './Background';
import Preloader from './Preloader';

// Create a global variable to store the game instance
let gameInstance: Phaser.Game | null = null;

export const getGameInstance = (): Phaser.Game | null => {
  return gameInstance;
};

const PhaserGame: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  // Use state to track client-side mounting
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Mark component as mounted on client
    setIsMounted(true);
    
    // Only create game instance if we're in the browser and the ref is available
    if (typeof window !== 'undefined' && gameContainerRef.current && !gameInstance) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameContainerRef.current, // Use the ref directly instead of ID
        backgroundColor: '#93cbee',
        pixelArt: true,
        scale: {
          mode: Phaser.Scale.ScaleModes.RESIZE,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
        autoFocus: true,
        scene: [Preloader, Background],
      };
      
      gameInstance = new Phaser.Game(config);
    }
    
    // Cleanup function
    return () => {
      if (gameInstance) {
        gameInstance.destroy(true);
        gameInstance = null;
      }
    };
  }, [isMounted]); // Only run when component mounts on client
  
  return <div className="w-full h-full" ref={gameContainerRef}></div>;
};

export default PhaserGame;