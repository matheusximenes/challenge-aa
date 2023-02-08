import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import Card from "./components/Card";
import ImageInfo from "./components/ImageInfo";
import { IPhoto } from "../features/photo/types";
import { setPhotos } from "../features/photo/photosSlice";
import Tabs from "./components/Tabs";
import Spinner from "./components/Spinner";
import { useFetch } from "./hooks/useFetch";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.photos);
  const { fetchData, isLoading } = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      /* 
        Issue accessing EndPoint  
        Access to fetch at 'https://agencyanalytics-api.vercel.app/images.json' from origin 
        'https://challenge-agency-analytics-i3yj6rotx-matheusximenes.vercel.app' has been blocked 
        by CORS policy: Request header field content-type is not allowed by 
        Access-Control-Allow-Headers in preflight 
        response. 
      */

      const data = await fetchData("./images.json");
      dispatch(setPhotos(data));
    };

    fetchPhotos();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

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
