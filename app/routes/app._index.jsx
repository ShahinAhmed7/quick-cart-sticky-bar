import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.kicker}>QuickCart Sticky Bar</p>
          <h1 style={styles.heading}>Sticky add-to-cart for product pages</h1>
          <p style={styles.copy}>
            Keep the purchase action visible while customers scroll, with AJAX cart
            updates and storefront controls managed from the theme editor.
          </p>
        </div>
        <div style={styles.statusCard}>
          <span style={styles.statusDot} />
          <div>
            <strong>Theme app embed ready</strong>
            <p style={styles.muted}>Enable QuickCart in Online Store theme settings.</p>
          </div>
        </div>
      </section>

      <section style={styles.grid}>
        {features.map((feature) => (
          <article key={feature.title} style={styles.card}>
            <p style={styles.cardLabel}>{feature.label}</p>
            <h2 style={styles.cardTitle}>{feature.title}</h2>
            <p style={styles.cardCopy}>{feature.description}</p>
          </article>
        ))}
      </section>

      <section style={styles.panel}>
        <div>
          <p style={styles.cardLabel}>Current setup</p>
          <h2 style={styles.panelTitle}>Storefront behavior</h2>
        </div>
        <div style={styles.checkGrid}>
          {checks.map((check) => (
            <div key={check} style={styles.checkItem}>
              <span style={styles.checkMark}>✓</span>
              <span>{check}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    label: "Conversion",
    title: "Sticky bar after scroll",
    description:
      "Shows the product title, image, price, quantity field, and add-to-cart button when the main button is no longer easy to reach.",
  },
  {
    label: "Cart",
    title: "AJAX add-to-cart",
    description:
      "Adds products without a full page reload and updates the theme cart count so shoppers can keep browsing.",
  },
  {
    label: "Customization",
    title: "Theme editor controls",
    description:
      "Merchants can adjust button text, loading text, sold-out text, colors, placement, mobile display, and scroll trigger.",
  },
];

const checks = [
  "Product pages supported",
  "Variant selector supported",
  "Quantity selector supported",
  "Top or bottom position",
  "Mobile-only mode",
  "Custom button states",
];

const styles = {
  page: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "56px 24px 80px",
    color: "#202223",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 320px",
    gap: "24px",
    alignItems: "stretch",
    marginBottom: "24px",
  },
  kicker: {
    margin: "0 0 10px",
    color: "#008060",
    fontSize: "14px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0,
  },
  heading: {
    margin: 0,
    maxWidth: "720px",
    fontSize: "36px",
    lineHeight: 1.15,
    letterSpacing: 0,
  },
  copy: {
    maxWidth: "680px",
    margin: "16px 0 0",
    color: "#5c5f62",
    fontSize: "17px",
    lineHeight: 1.55,
  },
  statusCard: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    padding: "22px",
    border: "1px solid #dfe3e8",
    borderRadius: "8px",
    background: "#ffffff",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
  },
  statusDot: {
    width: "12px",
    height: "12px",
    borderRadius: "999px",
    background: "#008060",
    boxShadow: "0 0 0 5px #e3f1df",
    flex: "0 0 auto",
  },
  muted: {
    margin: "6px 0 0",
    color: "#6d7175",
    lineHeight: 1.45,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "16px",
  },
  card: {
    minHeight: "190px",
    padding: "22px",
    border: "1px solid #dfe3e8",
    borderRadius: "8px",
    background: "#ffffff",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  cardLabel: {
    margin: "0 0 10px",
    color: "#008060",
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0,
  },
  cardTitle: {
    margin: 0,
    fontSize: "21px",
    lineHeight: 1.25,
    letterSpacing: 0,
  },
  cardCopy: {
    margin: "12px 0 0",
    color: "#5c5f62",
    fontSize: "15px",
    lineHeight: 1.55,
  },
  panel: {
    padding: "24px",
    border: "1px solid #dfe3e8",
    borderRadius: "8px",
    background: "#f6f6f7",
  },
  panelTitle: {
    margin: 0,
    fontSize: "24px",
    letterSpacing: 0,
  },
  checkGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "18px",
  },
  checkItem: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "12px",
    borderRadius: "6px",
    background: "#ffffff",
    border: "1px solid #e1e3e5",
    fontWeight: 600,
  },
  checkMark: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22px",
    height: "22px",
    borderRadius: "999px",
    background: "#e3f1df",
    color: "#008060",
    fontWeight: 800,
  },
};

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
