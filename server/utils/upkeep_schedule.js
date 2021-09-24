//!Tweak with numbers for gameplay balance.  These numbers are used to subtract from upkeep.  For use in passive.js
const upkeepVals = {
  hunger: 1,
  bladder: 1,
  happiness: 20,
  status: 1
}

//!Tweak schedule based on game balance. For use in server.js
const schedule = '*/10 * * * * *'

module.exports = {
  upkeepVals,
  schedule
}