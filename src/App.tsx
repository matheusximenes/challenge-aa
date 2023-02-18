import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import Card from "./components/Card";
import ImageInfo from "./components/ImageInfo";
import { IPhoto } from "../features/photo/types";
import { setPhotos } from "../features/photo/photosSlice";
import Tabs from "./components/Tabs";
import Spinner from "./components/Spinner";
import { useFetch } from "./hooks/useFetch";
import CardsList from "./components/CardsList";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const { fetchData, isLoading } = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await fetchData(
        "https://agencyanalytics-api.vercel.app/images.json"
      );
      dispatch(setPhotos(data));
    };

    fetchPhotos();
  }, []);

  return (
    <main className="main">
      {isLoading && <Spinner />}
      <section className="main__content">
        <Header />
        <Tabs />
        <CardsList />
      </section>
      <ImageInfo />
    </main>
  );
}

export default App;
