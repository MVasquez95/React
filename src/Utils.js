export const decodeState = (state) => {
  state = parseInt(state) - 1

  let mov = 2
  let tri = 10
  let run = 4
  let ses = 6

  let stateObj = {
    "session": (Math.floor(state / Math.floor(tri * mov * run)) % ses) + 1,
    "run": (Math.floor(state / Math.floor(tri * mov)) % run) + 1,
    "movement": (Math.floor(state / tri) % mov) + 1,
    "trial": (state % tri) + 1
  }

  return stateObj
}