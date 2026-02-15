/*
 *   ScoreboardLibrary courtesy of "desync" from latvian.dev discord server.
 */
// allows accessing objective criteria constants
const $ObjectiveCriteria = Java.loadClass('net.minecraft.world.scores.criteria.ObjectiveCriteria');

/**
 * @class
 */
function ScoreboardLibrary() {}

/**
 * @static
 * @param {Internal.Scoreboard} scoreboard
 * @param {String} name
 * @param {Internal.ObjectiveCriteria} criteria
 * @param {String} displayName
 * @param {Internal.ObjectiveCriteria$RenderType_} renderType
 * @returns {Internal.Objective}
 */
ScoreboardLibrary.getOrAddObjective = function (scoreboard, name, criteria, displayName, renderType) {
    const objective = scoreboard.getObjective(name);
    // for some reason, using ?? always assumes the objective does not exist even when it does
    return objective !== null ? objective : scoreboard.addObjective(name, criteria, displayName, renderType);
};

/**
 * @static
 * @param {Internal.Player} player
 * @param {String} objectiveName
 * @param {Internal.ObjectiveCriteria} objectiveCriteria
 * @param {String} displayName
 * @param {Internal.ObjectiveCriteria$RenderType_} renderType
 * @returns {Number}
 */
ScoreboardLibrary.getPlayerScore = function (player, objectiveName, objectiveCriteria, displayName, renderType) {
    const { scoreboard } = player;

    const objective = ScoreboardLibrary.getOrAddObjective(scoreboard, objectiveName, objectiveCriteria, displayName, renderType);
    const playerScore = scoreboard.getOrCreatePlayerScore(player.gameProfile.name, objective);
    return playerScore.score;
};

// END OF LIBRARY DECLARATION

// lawrence merchant // wip
FTBQuestsEvents.customTask("79B6E080F2F2FF82", (event) => {
  event.maxProgress = 1000;

  event.setCheckTimer(100); // 5 seconds

  event.setCheck((task, player) => {
    const score = ScoreboardLibrary.getPlayerScore(player, "villagerTrades");
    if (score > 1000) task.progress = 500;
    task.progress = score;
  });
});

// kill age0 villager // wip
FTBQuestsEvents.customTask("00043DA2F8A0E2A1", (event)=>{
  event.maxProgress = 1;
  event.setCheckTimer(100); // 5 seconds

  event.setCheck((task, player) => {
    
  });
})