function solve() {
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    let input = document.getElementById("input").value;
    var ctx = document.getElementById('canvas').getContext('2d');
    let layers = [];
    let layerSize = width * height;

    let lowest = Number.MAX_SAFE_INTEGER;
    let currentProduct = 0;

    for (let i = 0; i < input.length; i) {
        let layer = input.slice(i, i + layerSize);
        let zeroes = layer.match(/[0]/g).length;
        if (zeroes < lowest) {
            currentProduct = layer.match(/[1]/g).length * layer.match(/[2]/g).length;
            lowest = zeroes;
        }
        layers.push(layer);
        i += layerSize;
    }

    
    document.getElementById("solution").innerHTML = currentProduct;
    drawLayers(layers, ctx, width, height);
}

function drawLayers(layers, context, width, height) {
    var cellWidth = canvas.width / width;
    var cellHeight = canvas.height / height;

    for (var i = 0; i < layers[0].length; i++) {
        context.fillStyle = cellColor(layers, 0, i);
        context.fillRect(i % width * cellWidth, Math.floor(i / width) * cellHeight, cellWidth, cellHeight);
    }
}

function cellColor(layers, layerIndex, index) {
    return layers[layerIndex][index] === '2' ? cellColor(layers, layerIndex + 1, index) : layers[layerIndex][index] === '1' ? 'white' : 'black';
}