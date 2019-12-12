function solve() {
    let asteroidBelt = document.getElementById("input").value.split('\n');

    let counter = 0;
    for (var y = 0; y < asteroidBelt.length; y++) {
        for (var x = 0; x < asteroidBelt[y].length; x++) {
            if (asteroidBelt[y][x] === '#') {
                Math.max(currentAsteroidSightings, scanAsteroids(x, y, asteroidBelt));
                
            }
        }
    }
    //Math.atan2(0, 0) * (180 / Math.PI)
    //let a = 3;
    //let b = 4;

    //let hypotenuse = Math.hypot(b, a);

    //let angle = toDegrees(Math.asin(a / hypotenuse));

    //b = 2;
    //hypotenuse = b * Math.tan(Math.asin(a / hypotenuse));

    document.getElementById("solution").innerHTML = currentProduct;
}

function scanAsteroids(x, y, asteroidBelt) {

}