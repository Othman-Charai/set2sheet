export const useYoucanShop =  () => {
  const subsribeToOrderCreated = async(token: string) => {
    const response = await $fetch(
      "https://api.youcan.shop/resthooks/subscribe",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: {
          event: "order.created",
          target_url: useRequestURL().hostname + "/youcanshop/order-created",
        },
      }
    );
  };
  return {
    subsribeToOrderCreated,
  };
};
