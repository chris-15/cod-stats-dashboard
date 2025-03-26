"use client";

import { TMatchQuery } from "@/types";

function DisplayDate({
  match,
  createdAt,
}: {
  match: TMatchQuery;
  createdAt: boolean;
}) {
  return (
    <>
      {createdAt
        ? match.createdAt.toLocaleDateString("en-us")
        : match.updatedAt.toLocaleDateString("en-us")}
    </>
  );
}

export default DisplayDate;
