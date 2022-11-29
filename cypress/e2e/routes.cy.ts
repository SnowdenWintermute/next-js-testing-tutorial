export default null;
import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  console.log(process.env.NODE_ENV);
  cy.findByRole("button", { name: /shows/i }).click();
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

it("bands route heading", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /bands/i }).click();
  cy.findByRole("heading", { name: /Our Illustrious Performers/i }).should(
    "exist"
  );
});

it("displays correct name of band for band route that existed at build time", () => {
  cy.task("db:reset").visit("/bands/1");
  cy.findByRole("heading", { name: /Shamrock Pete/i }).should("exist");
});

it("doesn't display a band that doesn't exist", () => {
  cy.task("db:reset").visit("/bands/12345");
  cy.findByRole("heading", {
    name: /Could not retrieve band data: Error: band not found/i,
  }).should("exist");
});

it("displays name of band not present at build time", () => {
  const id = generateRandomId();
  const band = generateNewBand(id);
  cy.task("db:reset").task("addBand", band).visit(`/bands/${id}`);
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");
});
