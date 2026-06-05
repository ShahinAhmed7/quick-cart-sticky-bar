import { redirect, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate, registerWebhooks } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  await registerWebhooks({ session });

  const url = new URL(request.url);
  const redirectParams = new URLSearchParams();
  const shop = url.searchParams.get("shop") || session.shop;
  const host = url.searchParams.get("host");

  if (shop) redirectParams.set("shop", shop);
  if (host) redirectParams.set("host", host);

  const query = redirectParams.toString();
  return redirect(query ? `/app?${query}` : "/app");
};

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
