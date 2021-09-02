var nome = document.querySelector('#exampleInputName');
var genero =  document.querySelectorAll('#form-user-create [name=gender]:checked');//pegar o conjunto de radio buton
var dataNas = document.querySelector("#exampleInputBirth");
var pais = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail");
var senha = document.querySelector("#exampleInputPassword");
var arquivoFoto = document.querySelector("#exampleInputFile");
var admin = document.querySelector("#exampleInputAdmin");
/// fields = campos
var fields = document.querySelectorAll("#form-user-create [name]");
fields.forEach(function(field,index){
    if(field.name == "gender"){

        if(field.checked) {
            console.log ("SIM",field)

        }


       // console.log ("SIM",field)

    }else{
        console.log("Não")

    }

    console.log(field.id);

});