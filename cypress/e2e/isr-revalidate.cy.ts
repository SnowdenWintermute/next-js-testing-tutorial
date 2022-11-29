import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateNewShow } from "../../__tests__/__mocks__/fakeData/newshow";
import { generateRandomId } from "../../lib/features/reservations/utils";

it("should load refreshed page from cache after new band is added", () => {
  cy.task("db:reset").visit("/bands");
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should(
    "not.exist"
  );

  const id = generateRandomId();
  const band = generateNewBand(id);
  const secret = Cypress.env("REVALIDATION_SECRET");
  cy.request("POST", `/api/bands?secret=${secret}`, { newBand: band }).then(
    (res) => {
      expect(res.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");
  // @ts-ignore
  cy.resetDbAndIsrCache();
});

it("should load refreshed page from cache after new show is added", async () => {
  cy.task("db:reset").visit("/shows");
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should(
    "not.exist"
  );

  const id = generateRandomId();
  const show = generateNewShow(id);
  const secret = Cypress.env("REVALIDATION_SECRET");
  cy.request("POST", `/api/shows?secret=${secret}`, { newShow: show }).then(
    (res) => {
      expect(res.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");
  // @ts-ignore
  cy.resetDbAndIsrCache();
});
