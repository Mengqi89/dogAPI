'use strict';

function getDogImage(num) {
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function generateImgHtml(array) {
  const imagesHtmlArray = [];
  for (let i = 0; i < array.length; i++) {
    imagesHtmlArray.push(`<img src="${array[i]}" alt="dog-image-${i}">`);
  }
  //console.log(imagesHtmlArray);
  return imagesHtmlArray.join('');
}

const IMAGES_EL = $('#display');

function renderImages(array) {
  const html = generateImgHtml(array);
  IMAGES_EL.html(html);
}

function displayResults(responseJson) {
  const messageArray = responseJson.message;
  console.log('image', messageArray);
  renderImages(messageArray);
}

function getBreedImage(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(responseJson => displayBreed(responseJson, breed))
  .catch(error => alert('Breed not found'));
}

function generateBreedImg(url, breed) {
  return `<img src="${url}" alt="dog image of ${breed}">`
} 

function renderBreed(url, breed) {
  const html = generateBreedImg(url, breed);
  IMAGES_EL.html(html);
}

function displayBreed(response, breed) {
  const breedUrl = response.message;
  if (breedUrl === "Breed not found") {
    alert("Breed not found");
  }
  else {renderBreed(breedUrl, breed);}
}

function watchForm() {
  $('#form1').submit(event => {
    event.preventDefault();
    let userInput = $('#num').val();
    getDogImage(userInput);
  });

  $('#form2').submit(event => {
    event.preventDefault();
    let userQuery = $('#breed').val();
    console.log(userQuery);
    getBreedImage(userQuery);
  })
}


$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
