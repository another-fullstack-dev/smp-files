ServerEvents.recipes((event) => {
  event.campfireCooking(
    "kubejs:roasted_mushroom",
    "minecraft:brown_mushroom",
    0.1,
    600,
  );
  event.campfireCooking(
    "kubejs:roasted_mushroom",
    "minecraft:red_mushroom",
    0.1,
    600,
  );
});

ServerEvents.recipes((event) => {
  event.recipes.create
    .compacting("kubejs:raw_diamond", "minecraft:coal_block")
    .superheated();

  event.recipes.create.cutting(
    [Item.of("minecraft:diamond").withChance(0.25)],
    "kubejs:raw_diamond",
  );
});
