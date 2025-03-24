'use client';
import { Game,Scale } from 'phaser';
import React, { useEffect, useRef, useState } from 'react';
import Background from './Background';
import Preloader from './Preloader';

// Create a global variable to store the game instance
let gameInstance: Game | null = null;

export const getGameInstance = (): Game | null => {
  return gameInstance;
};

const PhaserGame: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  // Use state to track client-side mounting
  
  useEffect(() => {
    // Only create game instance if we're in the browser and the ref is available
    if (gameContainerRef.current && !gameInstance) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameContainerRef.current, // Use the ref directly instead of ID
        backgroundColor: '#93cbee',
        pixelArt: true,
        scale: {
          mode: Scale.ScaleModes.RESIZE,
          width: 800,
          height: 600,
        },
        audio: {
          disableWebAudio: true,
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
      
      gameInstance = new Game(config);
    }
    
    // Cleanup function
    return () => {
      if (gameInstance) {
        gameInstance.destroy(true);
        gameInstance = null;
      }
    };
  }, []); // Only run when component mounts on client
  
  return <div className="w-full h-full" ref={gameContainerRef}></div>;
};

export default PhaserGame;