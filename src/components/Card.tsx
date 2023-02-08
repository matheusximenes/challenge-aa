import React from "react";
import { formatBytes } from "../libs/files";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPhoto } from "../../features/photo/photosSlice";
import { RootState } from "../store";
import { IPhoto } from "../../features/photo/types";

type PropsCard = Pick<
  IPhoto,
  "id" | "url" | "filename" | "description" | "sizeInBytes"
>;

const Card = ({ id, url, description, filename, sizeInBytes }: PropsCard) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.photos);

  return (
    <div className="card">
      <button
        className={`card__btn ${
          state.selectedPhoto?.id === id ? `card__btn--active` : ``
        }`}
        onClick={() => dispatch(setSelectedPhoto({ id: id }))}
        aria-label={`Open ${filename} Image Details`}
      >
        <img
          className="card__img"
          src={url}
          alt={description || "no description provided"}
        />
      </button>
      <div className="card__title">{filename}</div>
      <div className="card__bytes"> {formatBytes(sizeInBytes)}</div>
    </div>
  );
};

export default Card;
