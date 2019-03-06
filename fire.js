const size = 40;
const fireWidth = size;
const fireHeight = size;
const firePixelArray = [];
let debug = false;
const interval = 50;
let decayFactory = 3;
let windFactory = 3;


const fireColorsPalette = ["7, 7, 7", "31, 7, 7", "47, 15, 7", "71, 15, 7", "87, 23, 7", "103, 31, 7", "119, 31,7", "143, 39,7", "159, 47, 7", "175, 63, 7", "191, 71, 7", "199, 71, 7", "223, 79, 7", "223, 87, 7", "223, 87, 7", "215, 95, 7", "215, 95, 7", "215, 103, 15", "207, 111, 15", "207, 119, 15", "207, 127, 15", "207, 135, 23", "199, 135, 23", "199, 143, 23", "199, 151, 31", "191, 159, 31", "191, 159, 31", "191, 167, 39", "191, 167, 39", "191, 175, 47", "183, 175, 47", "183, 183, 47", "183, 183, 55", "207, 207, 111", "223, 223, 159", "239, 239, 199", "255, 255, 255"]


const fireWrapper = document.getElementById("fireWrapper");

function main() {
    createFireDataStructure();
    createFireSource();
    calculateFirePropagation();
    setInterval(calculateFirePropagation, interval);
}

function renderFire() {
    let html = "<table>";
    for (let row = 0; row < fireHeight; row++) {
        html += "<tr>"
        for (let col = 0; col < fireWidth; col++) {

            if (debug === true) {
                const pixelIndex = row + "," + col;
                html += "<td>";
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += firePixelArray[row][col];
                html += "</td>";
            } else {
                let style = `background-color: rgb(${fireColorsPalette[firePixelArray[row][col]]})`;
                html += `<td style='${style}'</td>`;
            }
        }
        html += "</tr>"
    }
    html += "</table>";
    fireWrapper.innerHTML = html;
}
function calculateFirePropagation() {
    for (let col = 0; col < fireWidth; col++) {
        for (let row = 0; row < fireHeight; row++) {
            updateFireIntensityPerPixel(row, col);
        }
    }

    renderFire();
}

function updateFireIntensityPerPixel(row, col) {
    belowPixelRow = firePixelArray[row + 1];
    if (!belowPixelRow) return;

    let decay = Math.floor(Math.random() * decayFactory);
    
    intensity = belowPixelRow[col] - decay;
    col = col - Math.floor(Math.random() * windFactory);

    if (intensity < 0) {
        intensity = 0;
    }

    firePixelArray[row][col] = intensity;

}
function createFireSource() {
    // get the last row
    lastRow = firePixelArray[firePixelArray.length - 1];

    for (let index = 0; index < lastRow.length; index++) {
        lastRow[index] = 36;
    }
}

function createFireDataStructure() {
    for (let row = 0; row < fireHeight; row++) {
        firePixelArray[row] = [];
        for (let col = 0; col < fireWidth; col++) {
            firePixelArray[row][col] = 0;
        }
    }
}

// start main function
main();