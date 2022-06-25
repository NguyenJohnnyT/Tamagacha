//!Tweak with numbers for gameplay balance.  These numbers are used to subtract from upkeep.  For use in passive.js
const upkeepVals = {
  hunger: 10,
  bladder: 15,
  happiness: 20,
  status: 10
}

//!Tweak schedule based on game balance. For use in server.js
const schedule = '* 0 * * * *' // (second) minute hour [day of month] [month] [day of week]

module.exports = {
  upkeepVals,
  schedule
}