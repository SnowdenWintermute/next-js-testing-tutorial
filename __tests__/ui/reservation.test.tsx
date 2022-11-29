import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

test("shows number of available seats", async () => {
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  const seatCountText = await screen.findByText(/10 seats left/i);
  expect(seatCountText).toBeInTheDocument();
});

test("shows sold out and NO purchase button", async () => {
  render(<Reservation showId={1} submitPurchase={jest.fn()} />);

  const soldOutTMessage = await screen.findByRole("heading", {
    name: /sold out/i,
  });
  expect(soldOutTMessage).toBeInTheDocument();

  const purchaseButton = screen.queryByRole("button", {
    name: /purchase/i,
  });

  expect(purchaseButton).not.toBeInTheDocument();
});
