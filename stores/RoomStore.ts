import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    roomJoined: false,
    roomId: '',
  },
  reducers: {
    setRoomJoined: (state, action: PayloadAction<boolean>) => {
      state.roomJoined = action.payload
    },
    setRoomData: (
      state,
      action: PayloadAction<{ id: string}>
    ) => {
      state.roomId = action.payload.id
    },
  },
})

export const { setRoomJoined, setRoomData } = roomSlice.actions

export default roomSlice.reducer
