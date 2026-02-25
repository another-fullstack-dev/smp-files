StartupEvents.registry("item", (event) => {
  event.create("roasted_mushroom").food((food) => {
    food.hunger(2).saturation(1);
  });
  event
    .create("bf_sword", "sword")
    .texture("kubejs:item/bf_sword")
    .tier("netherite")
    .attackDamageBaseline(11)
    .speed(1.4);
  event.create("raw_diamond");
});
