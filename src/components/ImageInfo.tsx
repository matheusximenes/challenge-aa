import React from "react";
import { IPhoto } from "../../features/photo/types";
import { formatBytes } from "../libs/files";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhoto,
  setSelectedPhoto,
  toggleFavorite,
} from "../../features/photo/photosSlice";

import { RootState } from "../store";
import { formatDate } from "../libs/dates";

import heartOutlined from "../assets/heart_outlione.svg";
import heart from "../assets/heart_filled.svg";
import Image from "../assets/image-solid.svg";
import XMark from "../assets/xmark-solid.svg";

const ImageInfo = () => {
  const { selectedPhoto } = useSelector((state: RootState) => state.photos);
  const dispatch = useDispatch();

  if (!selectedPhoto) {
    return (
      <div className="photo-info--warn">
        <img alt="" src={Image} />
        <span>No Photo Selected!</span>
      </div>
    );
  }

  const handleDeleteImage = () => {
    dispatch(deletePhoto({ id: selectedPhoto.id }));
  };

  const toggleFavoriteImage = () => {
    dispatch(toggleFavorite({ id: selectedPhoto.id }));
  };

  const unselectImage = () => {
    dispatch(setSelectedPhoto(null));
  };

  return (
    <div className="photo-info">
      <button
        className="photo-info__close-btn"
        onClick={unselectImage}
        aria-label={`Close ${selectedPhoto.filename} Image Details`}
      >
        <img alt="Close Icon" src={XMark} />
      </button>
      <div className="photo-info__image">
        <img src={selectedPhoto.url} alt={selectedPhoto.description} />
      </div>
      <div className="photo-info__small-data">
        <div>
          <h2>{selectedPhoto.filename}</h2>
          <span>{formatBytes(selectedPhoto.sizeInBytes)}</span>
        </div>
        <button
          aria-label={
            selectedPhoto.favorited ? `Unfavorite Image` : `Favorite Image`
          }
          className="photo-info__favorite"
          onClick={toggleFavoriteImage}
        >
          <img
            alt="selectedPhoto.favorited ? `favorited Image` : `No favorited Image`"
            src={selectedPhoto.favorited ? heartOutlined : heart}
          />
        </button>
      </div>
      <h3 className="photo-info__heading">Information</h3>
      <ul className="photo-info__heading-list">
        <li>
          <div>Uploaded by</div>
          <span>{selectedPhoto.uploadedBy}</span>
        </li>
        <li>
          <div>Created</div>
          <span>{formatDate(selectedPhoto.createdAt)}</span>
        </li>
        <li>
          <div>Last Modified</div>
          <span>{formatDate(selectedPhoto.updatedAt)}</span>
        </li>
        <li>
          <div>Dimensions</div>
          <span>
            {selectedPhoto.dimensions?.height} X{" "}
            {selectedPhoto.dimensions?.width}
          </span>
        </li>
        <li>
          <div>Resolution</div>
          <span>
            {selectedPhoto.resolution?.height} X{" "}
            {selectedPhoto.resolution?.width}
          </span>
        </li>
      </ul>

      {selectedPhoto.description && (
        <>
          <h3 className="photo-info__heading--description">Description</h3>
          <p className="photo-info__description">{selectedPhoto.description}</p>
        </>
      )}

      <button className="photo-info__delete-btn" onClick={handleDeleteImage}>
        Delete
      </button>
    </div>
  );
};

export default ImageInfo;
