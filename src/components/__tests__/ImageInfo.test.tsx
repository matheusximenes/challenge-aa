import { cleanup, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MOCK_PHOTOS_DATA } from "../../features/photo/__tests__/photosSlice.test";
import ImageInfo from "../ImageInfo";
import ReduxProvider from "../ReduxProvider";
import { store } from "../../store";
import { setPhotos } from "../../features/photo/photosSlice";

describe("imageInfo Component", () => {
  afterEach(cleanup);

  describe("render initial state", () => {
    it.skip("should display initial state - Empty", () => {
      render(
        <ReduxProvider>
          <ImageInfo />
        </ReduxProvider>
      );
      const comp = screen.getByText(/No Photo Selected!/i);
      expect(comp).toBeInTheDocument();
    });
  });

  describe("render selected state", () => {
    it.skip("should display 'title'", () => {
      store.dispatch(setPhotos(MOCK_PHOTOS_DATA));
      render(
        <ReduxProvider>
          <ImageInfo />
        </ReduxProvider>
      );
      const comp = screen.getByRole("heading", {
        name: MOCK_PHOTOS_DATA[0].filename,
        level: 2,
      });
      expect(comp).toBeInTheDocument();
    });
    it.skip("should display 'sizeInBytes'", () => {
      store.dispatch(setPhotos(MOCK_PHOTOS_DATA));
      render(
        <ReduxProvider>
          <ImageInfo />
        </ReduxProvider>
      );
      const comp = screen.getByText(MOCK_PHOTOS_DATA[0].sizeInBytes);
      expect(comp).toBeInTheDocument();
    });

    it("should display 'uploadedBy'", () => {
      store.dispatch(setPhotos(MOCK_PHOTOS_DATA));
      render(
        <ReduxProvider>
          <ImageInfo />
        </ReduxProvider>
      );
      const comp = screen.getByText(MOCK_PHOTOS_DATA[0].uploadedBy);
      expect(comp).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("empty state", () => {
      const tree = renderer
        .create(
          <ReduxProvider>
            <ImageInfo />
          </ReduxProvider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
