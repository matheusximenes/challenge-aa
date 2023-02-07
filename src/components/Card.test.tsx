import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { Provider } from "react-redux";
import { store } from "../store";
import { formatBytes } from "../libs/files";

const CardProps = {
  id: "74957345-6f5b-4d66-ae9d-5d0071b40279",
  url: "https://agencyanalytics-api.vercel.app/images/0.jpg",
  filename: "tennessee_female_rubber.jpg",
  sizeInBytes: 574231,
  description:
    "Laboriosam eligendi inventore officia nemo. Quisquam explicabo voluptatem. Illo laborum facilis.",
};

describe("<Card/> Component", () => {
  describe("rendering", () => {
    test("should show correct title", () => {
      render(
        <Provider store={store}>
          <Card {...CardProps} />
        </Provider>
      );
      const cardTitle = screen.getByText(/tennessee_female_rubber.jpg/i);
      expect(cardTitle).toBeDefined();
    });

    test("should show correct sizeInBites", () => {
      render(
        <Provider store={store}>
          <Card {...CardProps} />
        </Provider>
      );
      const sizeInBytes = formatBytes(CardProps.sizeInBytes);
      const cardTitle = screen.getByText(sizeInBytes);
      expect(cardTitle).toBeDefined();
    });
  });

  describe("A11y", () => {
    test("Aria-label in images", () => {
      render(
        <Provider store={store}>
          <Card {...CardProps} />
        </Provider>
      );
      const button = screen.getByRole("button");
      expect(button).toBeDefined();
    });
  });
});
