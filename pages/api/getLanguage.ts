// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { enUS } from "./lang/en-US";
import { tr } from "./lang/tr";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.query.lang) {
    case "en-US":
      return res.status(200).json(enUS);
      break;
    case "tr":
      return res.status(200).json(tr);
      break;
  }

  // res.status(200).json({})
}
