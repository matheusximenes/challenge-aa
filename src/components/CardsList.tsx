import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IPhoto } from "../../features/photo/types";
import Card from "./Card";
import { statePhotos } from "../../features/photo/photosSlice";

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
        <Card
          key={p.id}
          id={p.id}
          url={p.url}
          description={p.description}
          filename={p.filename}
          sizeInBytes={p.sizeInBytes}
        />
      ))}
    </div>
  );
};

export default React.memo(CardsList);
