import { describe, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Tabs from "../../components/Tabs";
import ReduxProvider from "../../components/ReduxProvider";
import { store } from "../../store";

enum tabsEnum {
  recentlyAdded = "Recently Added",
  favorited = "Favorited",
}

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

    it("should show initial stage of a tabs set", () => {
      const tabs = screen.getAllByRole("tab", {
        selected: true,
        name: tabsEnum.recentlyAdded,
      });
      expect(tabs.length).toBe(1);
    });
  });

  describe("features", () => {
    it("Switching tabs", () => {
      const allTabs = screen.getAllByRole("tab");
      const tabs = screen.getAllByRole("tab", {
        selected: true,
        name: tabsEnum.recentlyAdded,
      });
      expect(tabs.length).toBe(1);
      fireEvent.click(allTabs[1]);
      const tabsAfterClick = screen.getAllByRole("tab", {
        selected: true,
        name: tabsEnum.favorited,
      });
      expect(tabsAfterClick.length).toBe(1);
    });

    it("onClick 'favorited' tab should change the 'displayFavorite' value in photos store", () => {
      const unSelectedTab = screen.getAllByRole("tab", {
        selected: false,
        name: tabsEnum.recentlyAdded,
      });
      fireEvent.click(unSelectedTab[0]);
      const displayFavorite = store.getState().photos.displayFavorite;
      expect(displayFavorite).toBe(false);
    });
  });

  describe("A11y", () => {
    it("Aria-label in images", () => {
      const tabs = screen.getAllByRole("tab", { selected: true });
      expect(tabs.length).toBe(1);
    });
  });
});
