import  { store }  from "../../../store"
import { deletePhoto, setPhotos, toggleFavorite } from "../photosSlice";


const MOCK_PHOTOS_DATA = [{
    "id": "74957345-6f5b-4d66-ae9d-5d0071b40279",
    "url": "https://agencyanalytics-api.vercel.app/images/0.jpg",
    "filename": "tennessee_female_rubber.jpg",
    "description": "Laboriosam eligendi inventore officia nemo. Quisquam explicabo voluptatem. Illo laborum facilis.",
    "uploadedBy": "Ms. Jimmie Cole",
    "createdAt": "2017-07-15T08:23:20.462Z",
    "updatedAt": "2022-12-16T12:41:33.736Z",
    "dimensions": {
      "height": 4800,
      "width": 3200
    },
    "resolution": {
      "height": 72,
      "width": 72
    },
    "sizeInBytes": 4812732,
    "sharedWith": [],
    "favorited": true
  }
];

describe("Photo Slice", () => {

    describe("Photos", () => {
        it("Should Initially photos be empty", () => {
            const { photos } = store.getState().photos;
            expect(photos.length).toBe(0) 
        })
    
        it("Add new Photos on Dispatch", () => {
            store.dispatch(setPhotos(MOCK_PHOTOS_DATA));
            const { photos } = store.getState().photos;
            expect(photos.length).toBe(1) 
        })

        it("toggle Favorite", () => {
            let photos  = store.getState().photos.photos;
            expect(photos[0].favorited).toBe(MOCK_PHOTOS_DATA[0].favorited) 
            store.dispatch(toggleFavorite({id: MOCK_PHOTOS_DATA[0].id}));
            photos  = store.getState().photos.photos;
            expect(photos[0].favorited).toBe(!MOCK_PHOTOS_DATA[0].favorited) 
        })

        it("Delete a Photo", () => {
            store.dispatch(deletePhoto({id: MOCK_PHOTOS_DATA[0].id}));
            const { photos } = store.getState().photos;
            expect(photos.length).toBe(0) 
        })

       
    })

    describe.skip("Display Favorite", () => {})
    describe.skip("SelectedImage", () => {})
    
})