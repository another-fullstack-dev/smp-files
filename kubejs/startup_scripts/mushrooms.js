ItemEvents.modification((event) => {
  event.modify("minecraft:brown_mushroom", (item) => {
    item.foodProperties = (food) => {
      food.hunger(1).saturation(0).fastToEat();
    };
  });

  event.modify("minecraft:red_mushroom", (item) => {
    item.foodProperties = (food) => {
      food
        .hunger(1)
        .saturation(0)
        .alwaysEdible()
        .fastToEat()
        .effect("minecraft:nausea", 200, 0, 1.0)
        .effect("minecraft:blindness", 200, 0, 1.0)
        .effect("minecraft:darkness", 200, 0, 0.5)
        .effect("minecraft:hunger", 100, 0, 0.25);
    };
  });
  event.modify("minecraft:damaged_anvil", (item) => {
    item.foodProperties = (food) => {
      food
        .alwaysEdible()
        .effect("minecraft:slowness", 200, 5, 1.0)
        .hunger(0)
        .saturation(0);
    };
  });
});