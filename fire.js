const size = 10;
const fireWidth = size;
const fireHeight = size;
const firePixelArray = [];

const fireWrapper = document.getElementById("fireWrapper");

function main() {
    createFireDataStructure();
    createSourceFire();
    firePropagation();
    renderFire();
   setInterval(renderFire, 500)
}

function renderFire() {
    let html = "<table>";
    for (let row = 0; row < fireHeight; row++) {
        html += "<tr>"
        for (let col = 0; col < fireWidth; col++) {
            html += `<td>${firePixelArray[row][col]}</td>`;
        }
        html += "</tr>"
    }
    html += "</table>";

    console.log(firePixelArray);
    fireWrapper.innerHTML = html;
}
function firePropagation() {
    for (let row = 0; row < fireHeight; row++) {
        for (let col = 0; col < fireWidth; col++) {
            calculateFirePropagation(row, col);
        }
    }

    console.log(firePixelArray)
}

function calculateFirePropagation(row, col) {
    let decay = 1;

    underRow = firePixelArray[row + 1];
    if (underRow) {
        intensity = underRow[col] - decay;

        if (intensity < 0) {
            intensity = 0;
        }

        firePixelArray[row][col] = intensity;

        console.log(row, col, intensity)
    }
}
function createSourceFire() {
    // get the last row
    lastRow = firePixelArray[firePixelArray.length - 1];

    for (let index = 0; index < lastRow.length; index++) {
        lastRow[index] = 36;
    }

    console.log(lastRow)
}

function createFireDataStructure() {
    for (let row = 0; row < fireHeight; row++) {
        firePixelArray[row] = [];
        for (let col = 0; col < fireWidth; col++) {
            firePixelArray[row][col] = 0;
        }
    }
    console.log(JSON.stringify(firePixelArray))
}

// start main function
main();