class UserController{

    constructor(formIdCreate, formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.onEdit();
        
    }
//construtor


    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{


            this.showPanelCreate();

        });

        this.formUpdateEl.addEventListener("submit",event =>{

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values =this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            tr.dataset.user = JSON.stringify(values);

            tr.innerHTML = 
            `
                <td><img src="${values.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${values.name}</td>
                <td>${values.email}</td>
                <td>${(values.admin)? 'Sim': 'Não'}</td>
                <td>${Utils.dateFormat(values.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
         `;
         this.addEventsTr(tr);
        
         this.updateCount();

        });

    }
    //onEditCancel
    onSubmit(){
            // let _this = this; // esse this  e para fora da  funçao addEventListener

      this.formEl.addEventListener("submit" ,event => { //arrow function

        event.preventDefault();
        let btn = this.formEl.querySelector("[type=submit]");
        btn.disabled = true;

        let values =this.getValues(this.formEl);
        if(!values) return false;

        this.getPhoto().then(
             (content)=>{
                values.photo = content;
                this.addLine(values);

                this.formEl.reset();

                btn.disabled = false;

            }, (e)=>{

                console.error(e);
           });

        });

    }

        //onsubimt

    getPhoto(){
        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();
            let elements = [...this.formEl.elements].filter(item=>{
    
            if (item.name === 'photo'){
    
                    return item;
                }
    
                });
    
            let file = elements[0].files[0];
            fileReader.onload = ()=>{
    
            resolve(fileReader.result);
    
            };
            fileReader.onerror = (e)=>{

                reject(e);

            };
            if(file){
                fileReader.readAsDataURL(file);
            }else{

                resolve('dist/img/boxed-bg.jpg');

            }  
        });

   }
//getPhoto


    getValues(formEl){
        let user ={};
        let isValid = true;
        
        [...formEl.elements].forEach(function(field,index){
            if(['name', 'email','password'].indexOf(field.name) > -1 && !field.value){
                field.parentElement.classList.add ('has-error');
                isValid= false;



            }


            if(field.name == "gender"){
        
                if(field.checked) {
                    user[field.name] = field.value;
        
        
                }
        
            }else if (field.name == "admin") {

                user[field.name] = field.checked;

            }else{
                user[field.name] = field.value;
            }
        
           // console.log(field.id);
        });
         if (!isValid){ return false;}
        
        return  new User(user.name, user.gender, user.birth, user.contry, user.email, user.password, user.photo, user.admin);

        
    }
//getvalues


     addLine(dataUser){

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify( dataUser);
        tr.innerHTML = 
        `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin)? 'Sim': 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
     `;
  
       this.addEventsTr(tr);
        this.tableEl.appendChild(tr);


        this.updateCount();
    
    
    }
//addLine

addEventsTr(tr){

    tr.querySelector(".btn-edit").addEventListener("click", e=>{

        let json = JSON.parse(tr.dataset.user);
        let form = document.querySelector("#form-user-update");   


        form.dataset.trIndex = tr.sectionRowIndex;

        for (let name in json){
         let fild = form.querySelector("[name=" + name.replace("_", "") + "]");
            
            if(fild){


                switch(fild.type){
                    case 'file':
                    continue;
                    break;

                    case 'radio':
                        fild = form.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] +"]");
                        fild.checked = true;   
                    break;

                    case'checkbox':
                        fild.checked = json[name];
                    break;
                    
                    default:
                        fild.value = json[name];
                    

                }


            }
            

        }
            
            this.showPanelUpdate();
        });

}
showPanelCreate(){

    document.querySelector("#box-user-create").style.display = "block";
    document.querySelector("#box-user-update").style.display = "none";

}

showPanelUpdate(){


    document.querySelector("#box-user-create").style.display = "none";
    document.querySelector("#box-user-update").style.display = "block";


}


updateCount(){
    let numeberUser = 0;
    let numeberAdmin = 0;
    


  [...this.tableEl.children].forEach(tr=>{

    numeberUser++;
  let user=JSON.parse( tr.dataset.user);
    if (user._admin) numeberAdmin++;

  });

document.querySelector("#number-users").innerHTML = numeberUser;
document.querySelector("#number-users-admin").innerHTML = numeberAdmin;

}

}