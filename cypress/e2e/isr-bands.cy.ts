it("skips client-side bundle, confirmind band names from ISR cache", () => {
  cy.request("/bands")
    .its("body")
    .then((html) => {
      // remove the scripts so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      // @ts-ignore
      cy.state("document").write(staticHtml);
    });

  cy.findByText(/The Wandering Bunnies/i).should("exist");
  cy.findByText(/Shamrock Pete/i).should("exist");
  cy.findByText(/The Joyous Nun Riot/i).should("exist");
});
