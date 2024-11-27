"use client";

import { TMatchQuery } from "@/app/types";

function DisplayDateTime({
  match,
  createdAt,
}: {
  match: TMatchQuery;
  createdAt: boolean;
}) {
  return (
    <>
      {createdAt
        ? match.createdAt.toLocaleTimeString("en-us")
        : match.updatedAt.toLocaleTimeString("en-us")}
    </>
  );
}
export default DisplayDateTime;
