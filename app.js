'use strict';
//select the elements
let leftImageElement=document.getElementById('left-image');
let rightImageElement=document.getElementById('right-image');
let middleImageElement=document.getElementById('middle-image');
let divElement=document.getElementById('images-div');
let resultList=document.getElementById('results-list');
//Objects with all the image properties (have name,src,votes,views and number of attempts  25 for all)

let numAttempts=24;
let attemptsCounter=0;
let leftImageIndex ;
let rightImageIndex;
let middleImageIndex;
let productsNames = [];
let productsVotes = [];
let productsShown = [];
let showimage=[];
function Images(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.views=0;
    Images.allImages.push(this);
    productsNames.push(name);
    
  }
  function settingItems() {
    let data=JSON.stringify(Images.allImages);
    //console.log(data);
    localStorage.setItem('Images',data);
    
  }
  function gettingItems() {
   
    
    let stringObject= localStorage.getItem('Images');
    let regularObject=JSON.parse(stringObject);
    //console.log(regularObject);
    if ( regularObject!== null) {
     
      Images.allImages=regularObject;
      for (let i = 0; i < Images.allImages.length; i++) {
        productsVotes.push(Images.allImages[i].votes);
        productsShown.push(Images.allImages[i].views);
      }
      
      chartall();
    }

  }
  
// array hold all images objects
  Images.allImages = [];

new Images('bag', 'img/bag.jpg'); 
new Images('banana', 'img/banana.jpg'); 
new Images('bathroom', 'img/bathroom.jpg'); 
new Images('boots', 'img/boots.jpg'); 
new Images('breakfast', 'img/breakfast.jpg'); 
new Images('bubblegum', 'img/bubblegum.jpg'); 
new Images('chair', 'img/chair.jpg'); 
new Images('cthulhu', 'img/cthulhu.jpg'); 
new Images('dog-duck', 'img/dog-duck.jpg'); 
new Images('dragon', 'img/dragon.jpg'); 
new Images('pen', 'img/pen.jpg'); 
new Images('pet-sweep', 'img/pet-sweep.jpg'); 
new Images('scissors', 'img/scissors.jpg'); 
new Images('shark', 'img/shark.jpg'); 
new Images('sweep', 'img/sweep.png'); 
new Images('tauntaun', 'img/tauntaun.jpg'); 
new Images('unicorn', 'img/unicorn.jpg'); 
new Images('usb', 'img/usb.gif'); 
new Images('water-can', 'img/water-can.jpg'); 
new Images('wine-glass', 'img/wine-glass.jpg'); 


//console.log(Images.allImages);
// to make the 3 images showen random
function getRandomIndex() {
    return Math.floor( Math.random() * Images.allImages.length);
   }

function renderThreeImages() {
 
    leftImageIndex = getRandomIndex();
    middleImageIndex = getRandomIndex();
    rightImageIndex=getRandomIndex();
    showimage.push(rightImageIndex);
    showimage.push(leftImageIndex);
    showimage.push(middleImageIndex);

do{
     rightImageIndex=getRandomIndex();
     leftImageIndex = getRandomIndex();
     middleImageIndex = getRandomIndex();
}while (leftImageIndex === rightImageIndex||leftImageIndex===middleImageIndex||middleImageIndex===rightImageIndex||showimage.includes(leftImageIndex)||showimage.includes(rightImageIndex)||showimage.includes(middleImageIndex))
showimage=[];
showimage.push(rightImageIndex);
showimage.push(leftImageIndex);
showimage.push(middleImageIndex);
console.log(showimage);


Images.allImages[leftImageIndex].views++;

Images.allImages[middleImageIndex].views++;

Images.allImages[rightImageIndex].views++;

  




    Images.allImages
   //console.log(Images.allImages[leftImageIndex]);


  
    leftImageElement.src = Images.allImages[leftImageIndex].source;
    rightImageElement.src = Images.allImages[rightImageIndex].source;
    middleImageElement.src = Images.allImages[middleImageIndex].source;
//console.log(Images.allImages);
    
}renderThreeImages();
// it will not run until we do the event 
divElement.addEventListener('click',handleUserClick);


function handleUserClick(event) {
    // after the 25 tries are finished the result will show (name,src,votes and views the imgs have 0views will not show at all )
    attemptsCounter++;
   
    console.log(event.target.id);
    if(attemptsCounter<numAttempts){
      
      
    if(event.target.id==="left-image"){
        Images.allImages[leftImageIndex].votes++
       
    }
      else if(event.target.id==="middle-image"){
        Images.allImages[middleImageIndex].votes++
    
     }else if(event.target.id ==="right-image"){
        Images.allImages[rightImageIndex].votes++
   
    }else{
    
    }renderThreeImages();
  }else{

        divElement.removeEventListener('click',handleUserClick);
        let buttonRes= document.createElement('button');
        buttonRes.textContent='View Reslut';
        resultList.appendChild(buttonRes);
        buttonRes.addEventListener('click',buttonViewResults);
        for (let i = 0; i < Images.allImages.length; i++) {
          productsVotes.push(Images.allImages[i].votes);
          productsShown.push(Images.allImages[i].views);
        }
        //call for the chart after the votes are done
        chartall();
    settingItems();

    }  
}  
function buttonViewResults() {
  for(let i=0;i<Images.allImages.length;i++){
    if (Images.allImages[i].votes===0){
      continue
    }else{
      let votesResult=document.createElement('li');
      resultList.appendChild(votesResult);
      votesResult.textContent = Images.allImages[i].name +  ' has ' + Images.allImages[i].votes + '  for votes , and was seen '+Images.allImages[i].views+' times.';
  }
 

  
  }
}

function chartall() {
  
  // lab 12 add a chart 
  let ctx = document.getElementById('myChart').getContext('2d');
  // instercter function from the library
  let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
  
      // The data for our dataset
      data: {
          labels: productsNames,
          datasets: [
            {
              label: 'Votes',
              backgroundColor: 'rgb(78, 17, 17)',
              borderColor: 'rgb(78, 17, 17)',
              data: productsVotes,
          }
           ,{
            label: 'Shown',
            backgroundColor: 'rgb(175, 47, 73)',
            borderColor: 'rgb(175, 47, 73)',
            data: productsShown,
        }
        ]
      },
  
      // Configuration options go here
      options: {}
  });
}
gettingItems();