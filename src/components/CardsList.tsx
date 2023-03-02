import React, { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { IPhoto } from "../features/photo/types";
import { statePhotos } from "./../features/photo/photosSlice";
import Spinner from "./Spinner";

const Card = React.lazy(() => import("./Card"));

const CardsList = () => {
  const { photos, displayFavorite } = useSelector(statePhotos);

  const photosArray = useMemo(() => {
    console.log("render");
    let list: IPhoto[] = [];
    if (photos.length > 0) {
      list = photos;
      if (displayFavorite) {
        list = [...list].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        list.filter((p) => p.favorited === true);
      }
    }
    return list;
  }, [JSON.stringify(photos)]);

  return (
    <div className="cards">
      {photosArray.map((p) => (
        <Suspense key={p.id} fallback={<Spinner />}>
          <Card
            id={p.id}
            url={p.url}
            description={p.description}
            filename={p.filename}
            sizeInBytes={p.sizeInBytes}
          />
        </Suspense>
      ))}
    </div>
  );
};

export default React.memo(CardsList);
