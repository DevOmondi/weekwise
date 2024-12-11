export const FB_PIXEL_ID = "250461298943964";

// Purchase event
export const purchase = () => {
  window.fbq("track", "Purchase", {
    value: 49,
    currency: "USD",
  });
};

// InitiateCheckout event
export const initiateCheckout = () => {
  window.fbq("track", "InitiateCheckout");
};
