(function () {
  var mount = document.getElementById("quickcart-sticky-bar");
  var dataScript = document.getElementById("quickcart-product-data");

  if (!mount || !dataScript || mount.dataset.quickcartReady === "true") {
    return;
  }

  mount.dataset.quickcartReady = "true";

  var product;
  try {
    product = JSON.parse(dataScript.textContent);
  } catch (error) {
    return;
  }

  if (!product || !product.variants || !product.variants.length) {
    return;
  }

  var settings = window.quickCartStickyBarSettings || {};
  var selectedVariantId = String(product.selectedVariantId || product.variants[0].id);
  var visible = false;

  function money(cents) {
    var value = (Number(cents || 0) / 100).toFixed(2);
    var format = product.moneyFormat || "${{amount}}";
    return format
      .replace(/\{\{\s*amount\s*\}\}/, value)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/, String(Math.round(Number(cents || 0) / 100)));
  }

  function getSelectedVariant() {
    return product.variants.find(function (variant) {
      return String(variant.id) === String(selectedVariantId);
    }) || product.variants[0];
  }

  function booleanData(name) {
    return mount.dataset[name] === "true";
  }

  function build() {
    var variant = getSelectedVariant();
    var hasMultipleVariants = product.variants.length > 1;
    var showImage = booleanData("showImage") && product.featuredImage;
    var showPrice = booleanData("showPrice");
    var showQuantity = booleanData("showQuantity");
    var showVariants = booleanData("showVariants") && hasMultipleVariants;

    mount.hidden = false;
    mount.className = "quickcart-sticky-bar";
    mount.dataset.position = settings.position === "top" ? "top" : "bottom";
    mount.dataset.mobileOnly = mount.dataset.mobileOnly || "false";
    mount.style.setProperty("--quickcart-background", settings.backgroundColor || "#ffffff");
    mount.style.setProperty("--quickcart-text", settings.textColor || "#202223");
    mount.style.setProperty("--quickcart-button", settings.buttonColor || "#008060");
    mount.style.setProperty("--quickcart-button-text", settings.buttonTextColor || "#ffffff");

    mount.innerHTML = [
      '<div class="quickcart-sticky-bar__inner">',
      showImage
        ? '<img class="quickcart-sticky-bar__image" src="' + product.featuredImage + '" alt="">'
        : "",
      '<div class="quickcart-sticky-bar__info">',
      '<p class="quickcart-sticky-bar__title">' + escapeHtml(product.title) + '</p>',
      showPrice ? '<p class="quickcart-sticky-bar__price">' + money(variant.price) + '</p>' : "",
      "</div>",
      '<div class="quickcart-sticky-bar__actions">',
      showVariants ? variantSelect() : "",
      showQuantity ? '<input class="quickcart-sticky-bar__quantity" type="number" min="1" value="1" aria-label="Quantity">' : "",
      '<button class="quickcart-sticky-bar__button" type="button">' + buttonLabel(variant) + "</button>",
      "</div>",
      "</div>"
    ].join("");

    var select = mount.querySelector(".quickcart-sticky-bar__select");
    if (select) {
      select.value = selectedVariantId;
      select.addEventListener("change", function (event) {
        selectedVariantId = event.target.value;
        build();
        updateVisibility();
      });
    }

    var button = mount.querySelector(".quickcart-sticky-bar__button");
    button.disabled = !variant.available;
    button.addEventListener("click", addToCart);
  }

  function variantSelect() {
    return [
      '<select class="quickcart-sticky-bar__select" aria-label="Variant">',
      product.variants.map(function (variant) {
        var disabled = variant.available ? "" : " disabled";
        return '<option value="' + variant.id + '"' + disabled + ">" + escapeHtml(variant.title) + "</option>";
      }).join(""),
      "</select>"
    ].join("");
  }

  function buttonLabel(variant) {
    if (!variant.available) {
      return escapeHtml(settings.soldOutText || "Sold out");
    }

    return escapeHtml(settings.buttonText || "Add to cart");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function syncVariantFromProductForm() {
    var variantInput = document.querySelector('form[action*="/cart/add"] [name="id"]');
    if (variantInput && variantInput.value && String(variantInput.value) !== String(selectedVariantId)) {
      selectedVariantId = variantInput.value;
      build();
    }
  }

  function addToCart() {
    var variant = getSelectedVariant();
    var button = mount.querySelector(".quickcart-sticky-bar__button");
    var quantity = mount.querySelector(".quickcart-sticky-bar__quantity");
    var count = quantity ? Math.max(1, Number(quantity.value || 1)) : 1;

    if (!variant.available || button.disabled) {
      return;
    }

    button.disabled = true;
    button.textContent = settings.addingText || "Adding...";

    fetch(window.Shopify && Shopify.routes ? Shopify.routes.root + "cart/add.js" : "/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: variant.id,
        quantity: count
      })
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to add item");
        }
        return response.json();
      })
      .then(function () {
        button.textContent = settings.addedText || "Added!";
        document.dispatchEvent(new CustomEvent("cart:refresh"));
        document.dispatchEvent(new CustomEvent("quickcart:added"));
        setTimeout(function () {
          build();
          updateVisibility();
        }, 1200);
      })
      .catch(function () {
        button.textContent = settings.buttonText || "Add to cart";
        button.disabled = false;
      });
  }

  function shouldShow() {
    if (window.Shopify && Shopify.designMode) {
      return true;
    }

    var triggerOffset = Number(mount.dataset.triggerOffset || 260);
    var productButton = document.querySelector('form[action*="/cart/add"] button[type="submit"], form[action*="/cart/add"] [name="add"]');
    var hasScrolledPastOffset = window.scrollY > triggerOffset;

    if (productButton) {
      var rect = productButton.getBoundingClientRect();
      return hasScrolledPastOffset || rect.bottom < 0 || rect.top > window.innerHeight;
    }

    return hasScrolledPastOffset;
  }

  function updateVisibility() {
    syncVariantFromProductForm();
    visible = shouldShow();
    mount.classList.toggle("is-visible", visible);
  }

  build();
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
  window.addEventListener("resize", updateVisibility);
  document.addEventListener("change", function (event) {
    if (event.target && event.target.closest('form[action*="/cart/add"]')) {
      setTimeout(updateVisibility, 0);
    }
  });
})();
