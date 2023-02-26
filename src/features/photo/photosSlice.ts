import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPhoto } from './types'
import { RootState } from "../../store"


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
    setPhotos(state, action: PayloadAction<IPhoto[]>) {
      state.photos = action.payload
    },
    setSelectedPhoto(state, action: PayloadAction<IPhotoID | null>){
      if(action.payload !== null) {
        const imgs = state.photos
        const index = imgs.findIndex(p => p.id === action.payload!.id)
        state.selectedPhoto = imgs[index]
      } else {
        state.selectedPhoto = null
      }
      
    },
    toggleFavorite(state, action: PayloadAction<IPhotoID>) {
      const index = state.photos.findIndex(p => p.id === action.payload.id)
      state.photos[index].favorited = !state.photos[index].favorited;
    },
    deletePhoto(state, action: PayloadAction<IPhotoID>) {
      state.photos = state.photos.filter(p => p.id !== action.payload.id)
      state.selectedPhoto = null
    },
    displayFavorite(state, action: PayloadAction<boolean>) {
      state.displayFavorite = action.payload
    }
  },
})

export const { setPhotos, setSelectedPhoto, toggleFavorite, deletePhoto, displayFavorite } = photoSlice.actions
export const statePhotos = createSelector((state: RootState) => state.photos, photos => photos)
export default photoSlice.reducer