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


function addLine(dataUser){
    var tr = document.createElement("tr");
    tr.innerHTML = ` 
        <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
        </tr> `
    document.getElementById("table-user").appendChild(tr);

}
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
addLine(user);

});