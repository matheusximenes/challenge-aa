import { configureStore } from '@reduxjs/toolkit'
import photosReducer from './features/photo/photosSlice';

export const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch