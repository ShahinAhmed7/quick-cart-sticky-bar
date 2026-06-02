import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { topic } = await authenticate.webhook(request);

  switch (topic) {
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
      break;
    default:
      break;
  }

  return new Response(null, { status: 200 });
};
