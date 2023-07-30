import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../../theme";

import { render, screen, fireEvent } from "@testing-library/react";
import CreateSet from "./CreateSet";

/**
 * Requirements/restrictions:
 *
 * On load ✅
 *   - Successful rendering
 *   - Title, description, import fields visible. One blank flashcard is visible
 * Title
 *   - Be able to edit input
 *   - Cannot be empty on submission
 * Description
 *   - Be able to edit input
 *   - Cannot be empty on submission
 * Import terms ✅
 *   - Be able to edit textarea
 *   - Detects the correct syntax '(term)[definition]' and counts the total sets of pairings
 *   - [definition](term) syntax is invalid, and should inform the user
 *   - Incorrect syntax prevents submission, throws an error
 *   - Stray characters are allowed
 *   - On successful submission, imports the terms by adding new cards, with their terms and definitions filled, according to the pairings
 *   - On invalid submission, shows an error to the user
 * Adding cards ✅
 *   - Clicking "+ Add new card" generates a new, blank card
 * Editing cards
 *   - Be able to edit term/definition fields on invididual cards
 * Deleting cards
 *   - Be able to delete a card by clicking its respective trash icon
 *   - Remaining flash cards have their order updated, if necessary
 */

const renderWithProviders = component => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>{component}</MemoryRouter>
    </ThemeProvider>
  );
};

test("it should render successfully", () => {
  renderWithProviders(<CreateSet />);
});

test("it should make visible the title, description, and import fields on load", () => {
  renderWithProviders(<CreateSet />);

  const titleField = screen.queryByTestId("set-title");
  expect(titleField).toBeVisible();

  const descField = screen.queryByTestId("set-description");
  expect(descField).toBeVisible();

  const importField = screen.queryByTestId("import-terms");
  expect(importField).toBeVisible();
});

test("it should render one blank flashcard on load", () => {
  renderWithProviders(<CreateSet />);

  const card = screen.getAllByTestId("card");
  expect(card).toHaveLength(1);
});

describe("Import terms field syntax tests using", () => {
  describe("one set", () => {
    test("Correct syntax: (apple)[a fruit]", () => {
      // The input is considered valid as it contains one set with the correct format.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, { target: { value: "(apple)[a fruit]" } });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (1 terms found)");
    });

    test("Incorrect syntax (Missing opening parenthesis): apple)[a fruit]", () => {
      // The input is considered invalid due to the missing opening parenthesis `(`.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, { target: { value: "apple)[a fruit]" } });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (0 terms found)");
    });

    test("Incorrect syntax (Missing closing parenthesis): (apple[a fruit]", () => {
      // The input is considered invalid due to the missing closing parenthesis `)`.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, { target: { value: "(apple[a fruit]" } });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (0 terms found)");
    });

    test("Incorrect syntax (Missing opening bracket): (apple)a fruit]", () => {
      // The input is considered invalid due to the missing opening bracket `[`.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, { target: { value: "(apple)a fruit]" } });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (0 terms found)");
    });

    test("Incorrect syntax (Missing closing bracket): (apple)[a fruit", () => {
      // The input is considered invalid due to the missing closing bracket `]`.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, { target: { value: "(apple)[a fruit" } });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (0 terms found)");
    });

    test("Incorrect syntax (Incorrect order of parentheses and brackets): (apple](a fruit)", () => {
      // The input is considered invalid due to the incorrect order of parentheses and brackets.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, { target: { value: "(apple](a fruit)" } });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (0 terms found)");
    });
  });
  describe("two sets", () => {
    test("Correct syntax: (apple)[a fruit] (orange)[a citrus fruit]", () => {
      // The input is considered valid as it contains two sets with the correct format.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, {
        target: { value: "(apple)[a fruit] (orange)[a citrus fruit]" }
      });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (2 terms found)");
    });

    test("Partially invalid syntax (Missing closing bracket in the first set): (apple[a fruit] (orange)[a citrus fruit]", () => {
      // The input is considered invalid due to the missing closing bracket `]` in the first set.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, {
        target: { value: "(apple[a fruit] (orange)[a citrus fruit]" }
      });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (1 terms found)");
    });

    test("Partially invalid syntax (Missing opening bracket in the second set): (apple)[a fruit] orange)[a citrus fruit]", () => {
      // The input is considered invalid due to the missing opening bracket `[` in the second set.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, {
        target: { value: "(apple)[a fruit] orange)[a citrus fruit]" }
      });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (1 terms found)");
    });

    test("Partially invalid syntax (Incorrect order of parentheses and brackets in the second set): (apple)[a fruit] (orange](a citrus fruit)", () => {
      // The input is considered invalid due to the incorrect order of parentheses and brackets in the second set.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, {
        target: { value: "(apple)[a fruit] (orange](a citrus fruit)" }
      });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (1 terms found)");
    });
  });
  describe("three sets", () => {
    test("Correct syntax: (apple)[a fruit] (orange)[a citrus fruit] (banana)[a tropical fruit]", () => {
      // The input is considered valid as it contains three sets with the correct format.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, {
        target: {
          value:
            "(apple)[a fruit] (orange)[a citrus fruit] (banana)[a tropical fruit]"
        }
      });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (3 terms found)");
    });

    test(`Partially invalid syntax (Missing closing parenthesis in the second set): (apple)[a fruit] (orange[a citrus fruit] (banana)[a tropical fruit]`, () => {
      // The input is considered invalid due to the missing closing parenthesis `)` in the second set.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, {
        target: {
          value:
            "(apple)[a fruit] (orange[a citrus fruit] (banana)[a tropical fruit]"
        }
      });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (2 terms found)");
    });

    test(`Partially invalid syntax (Missing opening parenthesis in the third set): (apple)[a fruit] (orange)[a citrus fruit] banana)[a tropical fruit]`, () => {
      // The input is considered invalid due to the missing opening parenthesis `(` in the third set.

      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, {
        target: {
          value:
            "(apple)[a fruit] (orange)[a citrus fruit] banana)[a tropical fruit]"
        }
      });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (2 terms found)");
    });

    test(`Partially invalid syntax (Incorrect order of parentheses and brackets in the first set): (apple](a fruit) (orange)[a citrus fruit] (banana)[a tropical fruit]`, () => {
      // The input is considered invalid due to the incorrect order of parentheses and brackets in the first set.
      renderWithProviders(<CreateSet />);

      const inputElement = screen.getByTestId("set-import-textarea");
      fireEvent.change(inputElement, {
        target: {
          value:
            "(apple](a fruit) (orange)[a citrus fruit] (banana)[a tropical fruit]"
        }
      });

      const detectedTerms = screen.getByTestId("detected-terms-label");
      expect(detectedTerms.textContent).toEqual("Import (2 terms found)");
    });
  });
});

describe("it should add a new card when 'Add new card' is clicked", () => {
  test("when there is one card rendered", () => {
    renderWithProviders(<CreateSet />);

    const addCardBtn = screen.getByTestId("add-card-button");

    fireEvent.click(addCardBtn);

    const cards = screen.getAllByTestId("card");
    expect(cards).toHaveLength(2);
  });
  test("after deleting the initially rendered card", () => {
    renderWithProviders(<CreateSet />);

    const initialCard = screen.getByTestId("card");
    const deleteInitialCard = initialCard.querySelector(".delete-icon");

    fireEvent.click(deleteInitialCard);

    // there are now 0 cards

    const addCardBtn = screen.getByTestId("add-card-button");
    fireEvent.click(addCardBtn);

    const cards = screen.getAllByTestId("card");
    expect(cards).toHaveLength(1);
  });
});

describe("Editing cards", () => {
  test("it should allow editing term and definition fields of each card", () => {
    renderWithProviders(<CreateSet />);

    const cardTerm = screen.getByTestId("card-term");
    const cardDefinition = screen.getByTestId("card-definition");

    fireEvent.change(cardTerm, { target: { value: "Apple" } });
    fireEvent.change(cardDefinition, { target: { value: "A fruit" } });

    expect(cardTerm.value).toBe("Apple");
    expect(cardDefinition.value).toBe("A fruit");
  });

});
