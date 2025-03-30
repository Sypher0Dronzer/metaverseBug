"use client";
import { BackgroundMode } from "@/types/BackgroundMode";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sanitizeId } from '../util'
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
        backgroundMode: getInitialBackgroundMode(),
        sessionId: '',
        loggedIn: false,
        playerNameMap: new Map<string, string>(),
    },
    reducers: {
        toggleBackgroundMode: (state) => {
            const newMode = state.backgroundMode === BackgroundMode.DAY ? BackgroundMode.NIGHT : BackgroundMode.DAY
            state.backgroundMode = newMode
            if (phaserGame) {
                const preloader = phaserGame.scene.keys.preloader as Preloader
                preloader.changeBackgroundMode(newMode)
            }
        },
        setSessionId: (state, action: PayloadAction<string>) => {
            state.sessionId = action.payload
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload
        },
        setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name)
        },
        removePlayerNameMap: (state, action: PayloadAction<string>) => {
            state.playerNameMap.delete(sanitizeId(action.payload))
        },
    },
})

export const { toggleBackgroundMode,setLoggedIn,setSessionId,setPlayerNameMap,removePlayerNameMap } = backgroundSlice.actions
export default backgroundSlice.reducer

