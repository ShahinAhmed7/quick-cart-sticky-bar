import { redirect } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  throw redirect(`/app${url.search}`);
};

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
