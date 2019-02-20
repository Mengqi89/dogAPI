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
  //console.log('image', messageArray);
  renderImages(messageArray);
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let userInput = $('#num').val();
    getDogImage(userInput);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
