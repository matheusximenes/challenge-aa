import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import Card from "./components/Card";
import ImageInfo from "./components/ImageInfo";
import { IPhoto } from "../features/photo/types";
import { setPhotos } from "../features/photo/photosSlice";
import Tabs from "./components/Tabs";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.photos);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // const response = await fetch(
        //   "https://agencyanalytics-api.vercel.app/images.json",
        //   {
        const response = await fetch("./images.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const photos = await response.json();
        dispatch(setPhotos(photos));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, []);

  let photos: IPhoto[] = [];
  if (state.photos.length > 0) {
    photos = state.photos;
    if (!state.displayFavorite) {
      photos = [...photos].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      photos.filter((p) => p.favorited === true);
    }
  }

  return (
    <main className="main">
      <section className="main__content">
        <header className="main__header">
          <h1 className="">Photos</h1>
        </header>
        <Tabs />
        <div className="cards">
          {photos
            .filter((p) =>
              state.displayFavorite ? p.favorited === true : true
            )
            .map((p) => (
              <Card key={p.id} {...p} />
            ))}
        </div>
      </section>

      <aside
        className={`main__aside ${
          state.selectedPhoto ? `main__aside--active` : ``
        }`}
      >
        <ImageInfo />
      </aside>
    </main>
  );
}

export default App;
