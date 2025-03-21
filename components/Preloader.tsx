import Phaser from "phaser";
import { BackgroundMode } from "@/types/BackgroundMode";
export default class Preloader extends Phaser.Scene{
    private preloadComplete=false
    constructor(){
        super('preloader')
    }
    preload(){
        this.load.atlas(
            'cloud_day',
            'assets/background/cloud_day.png',
            'assets/background/cloud_day.json'
          )
          this.load.image('cypher_logo','assets/cypher/Cypher_inverted.png')
          this.load.image('backdrop_day', 'assets/background/backdrop_day.png')
          this.load.atlas(
            'cloud_night',
            'assets/background/cloud_night.png',
            'assets/background/cloud_night.json'
          )
          this.load.image('backdrop_night', 'assets/background/backdrop_night.png')
          this.load.image('sun_moon', 'assets/background/sun_moon.png')
          this.load.on('complete', () => {
            this.preloadComplete = true
            this.launchBackground(BackgroundMode.DAY)
          })
    }
    private launchBackground(backgroundMode: BackgroundMode) {
        this.scene.launch('background', { backgroundMode })
    }
    /* changeBackgroundMode(backgroundMode: BackgroundMode) {
        this.scene.stop('background')
        this.launchBackground(backgroundMode)
      } */
}