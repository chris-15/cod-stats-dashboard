"use client";

import { TMatchQuery } from "@/types";

function DisplayDateShortened({
  match,
  createdAt,
}: {
  match: TMatchQuery;
  createdAt: boolean;
}) {
  return (
    <>
      {createdAt
        ? match.createdAt.toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
          })
        : match.updatedAt.toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
          })}
    </>
  );
}

export default DisplayDateShortened;
