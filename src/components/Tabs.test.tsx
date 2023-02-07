import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Tabs from "./Tabs";
import { Provider } from "react-redux";
import { store } from "../store";

describe("<Tabs/> Component", () => {
  describe("rendering", () => {
    test("should show two tabs", () => {
      render(
        <Provider store={store}>
          <Tabs />
        </Provider>
      );
      const tabs = screen.getAllByRole("tab");
      expect(tabs.length).toBe(2);
    });
  });

  describe("features", () => {
    test("Switching tabs", () => {
      render(
        <Provider store={store}>
          <Tabs />
        </Provider>
      );
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
    test("Aria-label in images", () => {
      render(
        <Provider store={store}>
          <Tabs />
        </Provider>
      );
      const tabs = screen.getAllByRole("tab", { selected: true });
      expect(tabs.length).toBe(1);
    });
  });
});
