// todo: applies twice. why? // its REI
ItemEvents.tooltip((event) => {
  event.addAdvanced(
    [
      "minecraft:golden_helmet",
      "minecraft:golden_chestplate",
      "minecraft:golden_leggings",
      "minecraft:golden_boots",
    ],
    (item, advanced, text) => {
      if (text.contains("Shift ")) return;
      if (!event.shift) {
        text.add(4, [
          Text.darkGray("Зажмите "),
          Text.darkGray("Shift ").bold(true),
          Text.darkGray("чтобы увидеть больше информации")
        ]);
      } else {
        text.add(1, Text.gray("Соберите полный комплект золотой брони для дополнительных эффектов:"));
        text.add(2, Text.darkGray("- Медленная регенерация"))
        text.add(3, Text.darkGray("- Увеличение урона на 25%"))
        text.add(4, Text.darkGray("- Увеличение скорости на 15%"))
        text.add(5, Text.darkGray("- Вы станете чуточку легче..."))
        text.add(6, [Text.darkGray("Но на все это есть своя "), Text.darkRed("цена")])
        text.add(8, Text.gray("Медленно восстанавливает небольшой запас прочности"))
      }
    },
  );
});