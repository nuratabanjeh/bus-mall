'use strict';
var main = document.getElementById('all_products');
var allProducts = [];
var allClicks = 0;
var rightPic;
var leftPic;
var middlePic;
// console.log(allProducts);
function Productes(name, path) {
    this.name = name;
    this.path = path;
    this.clicks = 0;
    this.views = 0;
    allProducts.push(this);
}
new Productes('bag', 'images/bag.jpg');
new Productes('banana', 'images/banana.jpg');
new Productes('bathroom', 'images/bathroom.jpg');
new Productes('boots', 'images/boots.jpg');
new Productes('breakfast', 'images/breakfast.jpg');
new Productes('bubblegum', 'images/bubblegum.jpg');
new Productes('chair', 'images/chair.jpg');
new Productes('cthulhu', 'images/cthulhu.jpg');
new Productes('dog-duck', 'images/dog-duck.jpg');
new Productes('dragon', 'images/dragon.jpg');
new Productes('pen', 'images/pen.jpg');
new Productes('pet-sweep', 'images/pet-sweep.jpg');
new Productes('scissors', 'images/scissors.jpg');
new Productes('shark', 'images/shark.jpg');
new Productes('sweep', 'images/sweep.png');
new Productes('tauntaun', 'images/tauntaun.jpg');
new Productes('unicorn', 'images/unicorn.jpg');
new Productes('usb', 'images/usb.gif');
new Productes('water-can', 'images/water-can.jpg');
new Productes('wine-glass', 'images/wine-glass.jpg');
function randomPic() {
    let genNumber = Math.floor(Math.random() * allProducts.length);
    return genNumber;
}

function choosePicture() {
    rightPic = randomPic();
    leftPic = randomPic();
    middlePic = randomPic();
    while (leftPic === middlePic || leftPic === rightPic) {
        leftPic = randomPic();
    }
    while (rightPic === leftPic || rightPic === middlePic) {
        rightPic = randomPic();
    }
    let leftPicPath = allProducts[leftPic].path;
    let middlePicPath = allProducts[middlePic].path;
    let rightPicPath = allProducts[rightPic].path;
    let leftElement = document.getElementById('left-product');
    let middleElement = document.getElementById('mid-product');
    let rightElement = document.getElementById('right-product');
    allProducts[leftPic].views += 1;
    allProducts[middlePic].views += 1;
    allProducts[rightPic].views += 1;
    leftElement.setAttribute('src', leftPicPath);
    middleElement.setAttribute('src', middlePicPath);
    rightElement.setAttribute('src', rightPicPath);

}
choosePicture();
main.addEventListener('click', numberOfClicks);
function numberOfClicks(event) {
    if (allClicks < 25) {

        let clickedPic = event.target;

        let clickedId = clickedPic.id;
        if (clickedId === 'left-product' || clickedId === 'mid-product' || clickedId === 'right-product') {
            allClicks += 1;
        }
        if (clickedId === 'left-product') {
            allProducts[leftPic].clicks += 1;
        }
        if (clickedId === 'mid-product') {
            allProducts[middlePic].clicks += 1;
        }
        if (clickedId === 'right-product') {
            allProducts[rightPic].clicks += 1;
        }
        choosePicture();
    }
    else {
        Massege();
        main.removeEventListener('click', numberOfClicks);
    }
}

function Massege() {
    let finalResults = document.getElementById('customerChoise');

    for (let i = 0; i < allProducts.length; i++) {
        let li = document.createElement('li');
        finalResults.appendChild(li);
        li.textContent = allProducts[i].name + ' had ' + allProducts[i].clicks + ' votes and was shown ' + allProducts[i].views;
    }
}

