import Phaser from 'phaser'
import React, { useEffect } from 'react'
//import Game from './scenes/Game'
import Background from './Background'
import Preloader from './Preloader'
const PhaserGame:React.FC=()=>{
  useEffect(()=>{
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
      backgroundColor: '#93cbee',
      pixelArt: true, // Prevent pixel art from becoming blurred when scaled.
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
      scene: [Preloader,Background],
    }
    const phaserGame = new Phaser.Game(config)
    return ()=>{
      phaserGame.destroy(true)
    }
  },[])

  return <div id="phaser-container"></div>
}


export default PhaserGame
