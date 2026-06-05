import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <s-page heading="QuickCart Sticky Bar">
      <s-section heading="Sticky add-to-cart bar">
        <s-paragraph>
          QuickCart adds a polished sticky add-to-cart bar to product pages through a
          theme app embed.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Enable the app embed in the theme editor.</s-list-item>
          <s-list-item>Customize colors, text, position, and visibility.</s-list-item>
          <s-list-item>Use AJAX add-to-cart without a full page reload.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Launch checklist">
        <s-stack direction="block" gap="base">
          <s-box>
            <s-text>Storefront sticky bar and cart update behavior are working in dev.</s-text>
          </s-box>
          <s-box>
            <s-text>Pricing is prepared for a $9.99/month Pro plan with a 7-day trial.</s-text>
          </s-box>
          <s-box>
            <s-text>Production still needs a permanent Railway URL before Shopify submission.</s-text>
          </s-box>
        </s-stack>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
