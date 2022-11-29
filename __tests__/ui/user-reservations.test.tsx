import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("purchase button text if already has ticket(s)", async () => {
  render(<UserReservations userId={1} />);

  const purchaseTicketsButton = await screen.findByRole("button", {
    name: "Purchase more tickets",
  });

  expect(purchaseTicketsButton).toBeInTheDocument();
});

test("purchase button text if no tickets yet", async () => {
  render(<UserReservations userId={0} />);
  const purchaseTicketsButton = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });
  expect(purchaseTicketsButton).toBeInTheDocument();

  const yourTickets = screen.queryByRole("heading", {
    name: /your tickets/i,
  });

  expect(yourTickets).not.toBeInTheDocument();
});
