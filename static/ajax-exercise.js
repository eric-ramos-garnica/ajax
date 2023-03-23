'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
 
    fetch("/fortune")
    .then((request)=>{
      return request.text()
    })
    .then((data)=>{
      document.querySelector("#fortune-text").innerHTML = data
    })
  
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  const url_complete = `${url}?zipcode=${zipcode}`
  fetch(url_complete)
    .then((request)=>{
      return request.json();
    })
    .then((data)=>{
      document.querySelector("#weather-info").innerHTML = data.forecast
    })
  


  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  const formInputs ={
    qty:document.querySelector("#qty-field").value,
    melon_type:document.querySelector("#melon-type-field").value
  }
  fetch('/order-melons.json',{
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((request)=>{
     return request.json()
  })
  .then((data)=>{
    if(data.code === 'OK'){
      document.querySelector('#order-status').classList.remove('order-error')
    }
    else{
      document.querySelector('#order-status').classList.add('order-error');
    }
    document.querySelector("#order-status").innerHTML = data.msg
  })


  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);




function getDogName(evt){
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((result) => {
      const imageUrl = result.message;
      document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `<div><img src=${imageUrl}></div>`);
    });

}




document.querySelector("#get-dog-image").addEventListener('click', getDogName);
