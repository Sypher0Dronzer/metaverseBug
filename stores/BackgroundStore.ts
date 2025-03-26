"use client";
import { BackgroundMode } from "@/types/BackgroundMode";
import { createSlice } from "@reduxjs/toolkit";
import { getGameInstance } from "../components/PhaserGame";
import Preloader from "@/components/Preloader";
const phaserGame = getGameInstance()
export function getInitialBackgroundMode() {
    const currentHour = new Date().getHours()
    return currentHour > 6 && currentHour <= 18 ? BackgroundMode.DAY : BackgroundMode.NIGHT
}

export const backgroundSlice = createSlice({
    name: 'background',
    initialState: {
        backgroundMode: getInitialBackgroundMode()
    },
    reducers: {
        toggleBackgroundMode: (state) => {
            const newMode =
                state.backgroundMode === BackgroundMode.DAY ? BackgroundMode.NIGHT : BackgroundMode.DAY
            state.backgroundMode = newMode
            if (phaserGame){
                const Preloader = phaserGame.scene.keys.preloader as Preloader
                Preloader.changeBackgroundMode(newMode)
            }
        },
    },})

export const { toggleBackgroundMode } = backgroundSlice.actions
export default backgroundSlice.reducer

