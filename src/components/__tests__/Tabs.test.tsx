import { describe, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Tabs from "../../components/Tabs";
import ReduxProvider from "../../components/ReduxProvider";

describe("<Tabs/> Component", () => {
  beforeEach(() => {
    render(
      <ReduxProvider>
        <Tabs />
      </ReduxProvider>
    );
  });
  describe("rendering", () => {
    it("should show two tabs", () => {
      const tabs = screen.getAllByRole("tab");
      expect(tabs.length).toBe(2);
    });
  });

  describe("features", () => {
    it("Switching tabs", () => {
      const allTabs = screen.getAllByRole("tab");
      const tabs = screen.getAllByRole("tab", {
        selected: true,
        name: "Recently Added",
      });
      expect(tabs.length).toBe(1);
      fireEvent.click(allTabs[1]);
      const tabsAfterClick = screen.getAllByRole("tab", {
        selected: true,
        name: "Favorited",
      });
      expect(tabsAfterClick.length).toBe(1);
    });
  });

  describe("A11y", () => {
    it("Aria-label in images", () => {
      const tabs = screen.getAllByRole("tab", { selected: true });
      expect(tabs.length).toBe(1);
    });
  });
});
