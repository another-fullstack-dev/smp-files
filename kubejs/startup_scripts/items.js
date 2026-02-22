StartupEvents.registry("item", (event) => {
  event.create("roasted_mushroom").food((food) => {
    food.hunger(2).saturation(1);
  });
});
