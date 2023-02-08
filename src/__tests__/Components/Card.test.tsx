import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "../../components/Card";
import { formatBytes } from "../../libs/files";
import ReduxProvider from "../../components/ReduxProvider";

const CardProps = {
  id: "74957345-6f5b-4d66-ae9d-5d0071b40279",
  url: "https://agencyanalytics-api.vercel.app/images/0.jpg",
  filename: "tennessee_female_rubber.jpg",
  sizeInBytes: 574231,
  description:
    "Laboriosam eligendi inventore officia nemo. Quisquam explicabo voluptatem. Illo laborum facilis.",
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

  describe("A11y", () => {
    it("Aria-label in images", () => {
      const button = screen.getByRole("button");
      expect(button).toBeDefined();
    });
  });
});
