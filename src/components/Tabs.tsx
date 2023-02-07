import React, { useState } from "react";
import { displayFavorite } from "../../features/photo/photosSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const Tabs = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.photos);
  const toggleFavorite = (value: boolean) => {
    dispatch(displayFavorite(value));
  };
  return (
    <div className="tabs" role="tablist">
      <button
        role="tab"
        aria-selected={state.displayFavorite ? false : true}
        className={`tabs-btn ${
          !state.displayFavorite ? `tabs-btn--active` : ``
        }`}
        onClick={() => toggleFavorite(false)}
      >
        Recently Added
      </button>
      <button
        role="tab"
        aria-selected={state.displayFavorite ? true : false}
        className={`tabs-btn ${
          state.displayFavorite ? `tabs-btn--active` : ``
        }`}
        onClick={() => toggleFavorite(true)}
      >
        Favorited
      </button>
    </div>
  );
};

export default Tabs;
