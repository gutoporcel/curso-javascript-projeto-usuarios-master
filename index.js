var nome = document.querySelector('#exampleInputName');
var genero =  document.querySelectorAll('#form-user-create [name=gender]:checked');//pegar o conjunto de radio buton

var dataNas = document.querySelector("#exampleInputBirth");
var pais = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail");
var senha = document.querySelector("#exampleInputPassword");
var arquivoFoto = document.querySelector("#exampleInputFile");
var admin = document.querySelector("#exampleInputAdmin");

nome.value ='oi';
nome.style.color ='blue';
console.log(genero);