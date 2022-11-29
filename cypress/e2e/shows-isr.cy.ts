it("skips client-side bundle, confirmind data from ISR cache", () => {
  cy.request("/shows")
    .its("body")
    .then((html) => {
      // remove the scripts so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      // @ts-ignore
      cy.state("document").write(staticHtml);
    });
  // now we can use "normal" Cypress api to confirm
  // number of list element
  cy.findAllByText(/2022 apr 1[456]/i).should("have.length.of", 3);
});
