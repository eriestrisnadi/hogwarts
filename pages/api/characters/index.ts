import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { paginate } from "utils/paginate";
import { isArray } from "utils/isArray";
import { chunk } from "utils/chunk";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  const { page, size, term } = req.query;
  const source = await (
    await fetch("http://hp-api.herokuapp.com/api/characters")
  ).json();
  const characters = (isArray(source) ? source : [])
    .map((_: any, id: number) => ({ ..._, id: id + 1 }))
    // Search by name
    .filter(
      ({ name }: { name: string }) =>
        String(name || "")
          .toLowerCase()
          .indexOf(String(term || "").toLowerCase()) > -1
    );
  const pagination = paginate(
    characters.length,
    !isNaN(+page) ? +page : undefined,
    !isNaN(+size) ? +size : undefined
  );
  const results = chunk(characters, pagination.pageSize)[
    pagination.currentPage - 1
  ] || [];

  return res.send({
    results,
    pagination,
  });
};
