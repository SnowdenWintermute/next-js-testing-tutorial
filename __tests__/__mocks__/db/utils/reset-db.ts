import { readFakeData } from "../../fakeData";
import { writeJSONToFile, filenames } from "@/lib/db/db-utils";

export const resetDB = async () => {
  const safeToReset = process.env.NODE_ENV === "test" || process.env.CYPRESS;
  if (!safeToReset) return console.log("not safe to reset");
  const { fakeShows, fakeBands, fakeUsers, fakeReservations } =
    await readFakeData();
  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.users, fakeUsers),
    writeJSONToFile(filenames.reservations, fakeReservations),
  ]);
};
