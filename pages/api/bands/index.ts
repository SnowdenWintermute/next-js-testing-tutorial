import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { addBand } from "@/lib/features/bands/queries";

const handler = createHandler();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // an endpoint to demonstrate on-demand ISR revalidation
  //   https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
  // in an actual app, this would have a UI, and it would need authorization
  //   to check the user is authorized to make changes to bands
  // in this app, this endpoint will be hit by testing directly to test on-demand ISR revalidation

  console.log(
    " process.env.REVALIDATION_SECRET",
    process.env.REVALIDATION_SECRET
  );
  // Check for secret to confirm this is a valid request
  if (
    req.query.secret?.toString().trim() !==
    process.env.REVALIDATION_SECRET?.trim()
  ) {
    return res.status(401).json({
      message: `Invalid revalidation token, expected 
        ${process.env.REVALIDATION_SECRET}, received ${req.query.secret}`,
    });
  }

  // add band (here is where authorization would be validated)
  const { newBand } = req.body;
  const addedBand = await addBand(newBand);

  // revalidate bands page for ISR
  // note: this will change to `res.revalidate` when
  // this feature is out of beta
  await res.revalidate("/bands");
  return res.json({ band: addedBand, revalidated: true });
});

export default handler;
