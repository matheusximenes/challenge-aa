import { describe, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "../../components/Card";
import { formatBytes } from "../../utils/files";
import ReduxProvider from "../../components/ReduxProvider";
import { store } from "../../store";
import { MOCK_PHOTOS_DATA } from "../../features/photo/__tests__/photosSlice.test";
import { setPhotos } from "../../features/photo/photosSlice";

const CardProps = {
  id: MOCK_PHOTOS_DATA[0].id,
  url: MOCK_PHOTOS_DATA[0].url,
  filename: MOCK_PHOTOS_DATA[0].filename,
  sizeInBytes: MOCK_PHOTOS_DATA[0].sizeInBytes,
  description: MOCK_PHOTOS_DATA[0].description,
};

describe("<Card/> Component", () => {
  beforeEach(() => {
    render(
      <ReduxProvider>
        <Card {...CardProps} />
      </ReduxProvider>
    );
  });

  describe("rendering", () => {
    it("should show correct title", () => {
      const cardTitle = screen.getByText(/tennessee_female_rubber.jpg/i);
      expect(cardTitle).toBeDefined();
    });

    it("should show correct sizeInBites", () => {
      const sizeInBytes = formatBytes(CardProps.sizeInBytes);
      const cardTitle = screen.getByText(sizeInBytes);
      expect(cardTitle).toBeDefined();
    });
  });

  describe("features", () => {
    it("should select Photo on Click in Card", () => {
      store.dispatch(setPhotos(MOCK_PHOTOS_DATA));
      const cardButton = screen.getByRole("button");
      fireEvent.click(cardButton);
      const selectedPhoto = store.getState().photos.selectedPhoto;
      expect(selectedPhoto).toBe(MOCK_PHOTOS_DATA[0]);
    });
  });

  describe("A11y", () => {
    it("Aria-label in images", () => {
      const button = screen.getByRole("button");
      expect(button).toBeDefined();
    });
  });
});
