import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { isArray } from "utils/isArray";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  const source = await (
    await fetch("http://hp-api.herokuapp.com/api/characters")
  ).json();
  const results = (isArray(source) ? source : [])
    .map((_: any, id: number) => ({ ..._, id: id + 1 }))
    .find(({ id }: { id: number }) => String(id) === req.query.id);

  return res.send({ results });
};
