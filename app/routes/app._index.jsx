import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <s-page heading="QuickCart Sticky Bar">
      <s-section heading="Sticky add to cart">
        <s-paragraph>
          QuickCart adds a polished sticky add-to-cart bar to product pages through
          a theme app embed.
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Enable the app embed in the theme editor.</s-list-item>
          <s-list-item>Customize colors, text, position, and visibility.</s-list-item>
          <s-list-item>Test it on a product page after scrolling.</s-list-item>
        </s-unordered-list>
      </s-section>

      <s-section heading="Current MVP">
        <s-stack direction="block" gap="base">
          <s-box>
            <s-text>Product title, image, price, variants, quantity, and add-to-cart are supported.</s-text>
          </s-box>
          <s-box>
            <s-text>The bar appears after the main add-to-cart button leaves the viewport.</s-text>
          </s-box>
        </s-stack>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
