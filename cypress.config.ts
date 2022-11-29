import { defineConfig } from "cypress";
import { addBand } from "./lib/features/bands/queries";
import { addReservation } from "./lib/features/reservations/queries";
import { resetDB } from "./__tests__/__mocks__/db/utils/reset-db";
export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  env: {
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
    products_url: "/products",
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        "db:reset": () => resetDB().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
        addReservation: (newReservation) =>
          addReservation(newReservation).then(() => null),
      });
      return config;
    },
  },
});
