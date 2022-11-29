import { rest } from "msw";
import { readFakeData } from "../fakeData";
import { fakeUserReservations } from "../fakeData/userReservations";
export const handlers = [
  rest.get("http://localhost:3000/api/shows/:showId", async (req, res, ctx) => {
    const { showId } = req.params;
    // showId = 0 has seats, 1 doesn't
    const { fakeShows } = await readFakeData();
    return res(ctx.json({ show: fakeShows[Number(showId)] }));
  }),
  rest.get(
    "http://localhost:3000/api/users/:userId/reservations",
    async (req, res, ctx) => {
      if (+req.params.userId === 0) {
        console.log("returning empty array");
        return res(
          ctx.json({
            userReservations: [],
          })
        );
      }
      return res(
        ctx.json({
          userReservations: fakeUserReservations,
        })
      );
    }
  ),
];
