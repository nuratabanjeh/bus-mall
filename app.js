'use strict';
var main = document.getElementById('all_products');
var allProducts = [];
var allClicks = 0;
var rightPic;
var leftPic;
var middlePic;
var productName = [];
var prevProduct = [];
var numbOfViews = [];
var numOfClicks = [];
// console.log(allProducts);
function Productes(name, path) {
    this.name = name;
    this.path = path;
    this.clicks = 0;
    this.views = 0;
    allProducts.push(this);
    productName.push(this.name);
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

    let leftElement = document.getElementById('left-product');
    let middleElement = document.getElementById('mid-product');
    let rightElement = document.getElementById('right-product');

    for (var i = 0; i < prevProduct.length; i++) {
        if (leftPic === prevProduct[i]) {
            var newOne = randomPic();
            leftPic = newOne;
            prevProduct[0] = leftPic;
        }
    }
    for (var y = 0; y < prevProduct.length; y++) {
        if (middlePic === prevProduct[y]) {
            var newOnee = randomPic();
            middlePic = newOnee;
            prevProduct[1] = newOnee;
        }
    }
    for (var z = 0; z < prevProduct.length; z++) {
        if (rightPic === prevProduct[z]) {
            var newoneee = randomPic();
            rightPic = newoneee;
            prevProduct[2] = newoneee;
        }
    }
    while (leftPic === middlePic || leftPic === rightPic) {
        leftPic = randomPic();
    }
    while (rightPic === leftPic || rightPic === middlePic) {
        rightPic = randomPic();
    }
    prevProduct[0] = leftPic;
    prevProduct[1] = middlePic;
    prevProduct[2] = rightPic;
    let leftPicPath = allProducts[leftPic].path;
    let middlePicPath = allProducts[middlePic].path;
    let rightPicPath = allProducts[rightPic].path;
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
        shearMyData();

        chartgenerator();
        savingData();
        main.removeEventListener('click', numberOfClicks);
    }
}

let button = document.getElementById('btn');
button.addEventListener('click', showinglist);
function showinglist() {
    Massege();
    button.removeEventListener('click', showinglist);

}

function savingData() {
    console.log(allProducts);
    var stringPro = JSON.stringify(allProducts);
    localStorage.setItem('product', stringPro);
}

function savingNewOne() {
    var prePro = JSON.parse(localStorage.getItem('product'));
    if (prePro !== null) {
        allProducts = prePro;
    }

}
savingNewOne();


function Massege() {
    let finalResults = document.getElementById('customerChoise');

    for (let i = 0; i < allProducts.length; i++) {
        let li = document.createElement('li');
        finalResults.appendChild(li);
        li.classList.add('pointer');
        li.textContent = allProducts[i].name + ' had ' + allProducts[i].clicks + ' votes and was shown ' + allProducts[i].views;
    }
}
function shearMyData() {
    for (let index = 0; index < allProducts.length; index++) {
        numOfClicks.push(allProducts[index].clicks);
        numbOfViews.push(allProducts[index].views);

    }
}
function chartgenerator() {
    var ctx = document.getElementById('myChart1').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productName,
            datasets: [{
                label: '# of Views',
                data: numbOfViews,
                backgroundColor: ['rgb(102, 195, 255)',
                ],
                borderColor: 'orange',
                borderWidth: 1
            }, {
                label: '# of Votes',
                data: numOfClicks,
                backgroundColor: [
                    'rgb(235, 64, 52)',
                ],
                borderColor: 'orange',
                borderWidth: 1
            }]
        }

    })
}
