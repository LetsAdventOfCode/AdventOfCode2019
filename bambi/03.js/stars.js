let dev = false

let fs = require('fs')
let path = require('path')

let path_str = path.join(__dirname, '..', 'inputs', path.basename(__dirname, '.js') + (dev ? '.ex' : '') + '.txt')
let content = fs.readFileSync(path_str).toString().trim().replace("\r", '').split("\n").map((row) => {return row.split(',')})

let parse_route = (route, old_route = []) => {
  let movement = { x: { pos: 0, itr: 0 }, y: { pos: 0, itr: 0 } }
  let positions = {}, collisions = [], step = 0
  for (let i = 0; i < route.length; i++) {
    let dir = "DULR".indexOf(route[i][0])
    let dist = parseInt(route[i].substring(1))

    let obj = movement[dir > 1 ? 'x' : 'y']
    obj.pos += dir & 0x01 ? dist : -dist

    while (obj.itr != obj.pos) {
      let pos = `${movement.y.itr}_${movement.x.itr}`
      let match_idx = old_route[pos]
      if (match_idx !== undefined) {
        collisions.push([movement.y.itr, movement.x.itr, match_idx + step])
      }
      positions[pos] = step
      obj.itr += obj.itr < obj.pos ? 1 : -1
      step++
    }
  }
  return [positions, collisions];
}

let find_nearest_intersection = (wire1, wire2, distance_calc_method = 0) => {
  let [wire1_positions] = parse_route(wire1)
  let [wire2_positions, collisions] = parse_route(wire2, wire1_positions)

  let distance, nearest
  for (let i = 0; i < collisions.length; i++) {
    if (collisions[i][0] == 0 && collisions[i][1] == 0) {
      continue
    }
    switch (distance_calc_method) {
      case 0: distance = Math.abs(collisions[i][0]) + Math.abs(collisions[i][1]); break
      case 1: distance = collisions[i][2]; break
    }
    nearest = (nearest == undefined) ? distance : Math.min(nearest, distance)
  }
  return nearest
}

if (dev) {
  for (let i = 0; i < content.length; i+=2) {
    console.log(find_nearest_intersection(content[i], content[i+1], 0))
  }
  for (let i = 0; i < content.length; i+=2) {
    console.log(find_nearest_intersection(content[i], content[i+1], 1))
  }
} else {
  console.log('star1', find_nearest_intersection(content[0], content[1], 0))
  console.log('star2', find_nearest_intersection(content[0], content[1], 1))
}
