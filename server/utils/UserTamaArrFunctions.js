const fetch = require("node-fetch");

//!Returns an array of user objects
function getAllUserTama (SERVER) {
  return fetch(`${SERVER}/api/usertama`)
    .then(res => res.json())
};

//!Returns an array of userTama objects
function createUserTamaArr (data) {
  let newArr = []
  data.forEach((user) => {
    user.tamas_owned.forEach((tama) => {
      if (tama.userTama.is_alive) { //checks if tama is alive
        newArr.push(tama.userTama)
      }
    })
  })
  // console.log(newArr);
  return newArr
};

module.exports = {
  getAllUserTama,
  createUserTamaArr
}