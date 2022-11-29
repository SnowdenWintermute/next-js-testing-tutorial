import { render, screen } from "@testing-library/react";
import BandComponent from "@/pages/bands/[bandId]";
import { readFakeData } from "@/__tests__/__mocks__/fakeData";

test("displays correct band information", async () => {
  const { fakeBands } = await readFakeData();
  render(<BandComponent band={fakeBands[0]} error={null} />);
  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();
});

test("displays error", async () => {
  const testErrorString = "test-error";
  render(<BandComponent band={null} error={testErrorString} />);
  const error = screen.getByRole("heading", {
    name: `Could not retrieve band data: ${testErrorString}`,
  });
  expect(error).toBeInTheDocument();
});
