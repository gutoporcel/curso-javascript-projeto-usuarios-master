/*var nome = document.querySelector('#exampleInputName');
var genero =  document.querySelectorAll('#form-user-create [name=gender]:checked');//pegar o conjunto de radio buton
var dataNas = document.querySelector("#exampleInputBirth");
var pais = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail");
var senha = document.querySelector("#exampleInputPassword");
var arquivoFoto = document.querySelector("#exampleInputFile");
var admin = document.querySelector("#exampleInputAdmin");*/
/// fields = campos
var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};//jason
document.getElementById("form-user-create").addEventListener("submit",function(event){
    event.preventDefault();

fields.forEach(function(field,index){
    if(field.name == "gender"){

        if(field.checked) {
            user[field.name] = field.value;


        }

    }else{
        user[field.name] = field.value;
    }

   // console.log(field.id);
});

console.log(user);
/*
document.querySelectorAll("button").forEach(function(){
    
    this.addEventListener("click",function(){

        console.log("clicou")
    });

});*/
//guto

   console.log("ok");
});