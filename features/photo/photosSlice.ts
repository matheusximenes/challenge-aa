import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPhoto } from './types'


interface PhotosState {
  photos: IPhoto[],
  selectedPhoto:  null | IPhoto,
  displayFavorite: boolean
}

const initialState: PhotosState = {
  photos: [],
  selectedPhoto: null,
  displayFavorite: false,
}

type IPhotoID = Pick<IPhoto, "id">

export const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<IPhoto[]>) => {
      state.photos = action.payload
    },
    setSelectedPhoto: (state, action: PayloadAction<IPhotoID | null>) => {
      if(action.payload !== null) {
        const index = state.photos.findIndex(p => p.id === action.payload!.id)
        state.selectedPhoto = state.photos[index]
      } else {
        state.selectedPhoto = null
      }
      
    },
    toggleFavorite: (state, action: PayloadAction<IPhotoID>) => {
      const index = state.photos.findIndex(p => p.id === action.payload.id)
      state.photos[index].favorited = !state.photos[index].favorited;
      state.selectedPhoto = state.photos[index]
    },
    deletePhoto: (state, action: PayloadAction<IPhotoID>) => {
      const newPhotos = state.photos.filter(p => p.id !== action.payload.id)
      state.photos = newPhotos;
      state.selectedPhoto = null
    },
    displayFavorite: (state, action: PayloadAction<boolean>) => {
      state.displayFavorite = action.payload
    }
  },
})

export const { setPhotos, setSelectedPhoto, toggleFavorite, deletePhoto, displayFavorite } = photoSlice.actions

export default photoSlice.reducer