class UserController{

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        
    }
//construtor

    onSubmit(){
            // let _this = this; // esse this  e para fora da  funçao addEventListener

      this.formEl.addEventListener("submit" ,event => { //arrow function

        event.preventDefault();
        let btn = this.formEl.querySelector("[type=submit]");
        btn.disabled = true;

        let values =this.getValues();

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


    getValues(){
        let user ={};
        
        [...this.formEl.elements].forEach(function(field,index){
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
        
        return  new User(user.name, user.gender, user.birth, user.contry, user.email, user.password, user.photo, user.admin);

        
    }
//getvalues


     addLine(dataUser){

        let tr = document.createElement('tr');
        tr.innerHTML = 
        `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin)? 'Sim': 'Não'}</td>
            <td>${dataUser.register}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
     `;
  
        
        this.tableEl.appendChild(tr);
    
    
    }
//addLine

}