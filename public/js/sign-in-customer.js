window.addEventListener('load', function () {
    let form=document.querySelector('.formulario')
    let email = document.querySelector('#email');
    let focusEmail = document.querySelector('.focus_email');
    let errorEmail= document.querySelector('.error_email');
    let password = document.querySelector('#password');
    let focusPassword = document.querySelector('.focus_password');
    let errorPassword= document.querySelector('.error_password');
    let names=document.querySelector('#names');
    let focusNames = document.querySelector('.focus_names');
    let errorNames= document.querySelector('.error_names');
    let surname=document.querySelector('#surname');
    let focusSurname = document.querySelector('.focus_surname');
    let errorSurname= document.querySelector('.error_surname');
    let phone=document.querySelector('#phone');
    let focusPhone = document.querySelector('.focus_phone');
    let errorPhone= document.querySelector('.error_phone');
    let photo=document.querySelector('#photo');
    let focusPhoto = document.querySelector('.focus_photo');
    let errorPhoto= document.querySelector('.error_photo');
    let passwordConfirm=document.querySelector('#password_confirm');
    let focusPasswordConfirm = document.querySelector('.focus_password_confirm');
    let errorPasswordConfirm= document.querySelector('.error_password_confirm');

    //Validaciones nombre
    names.addEventListener('focus',function(){
         focusSurname.innerHTML=''
          errorNames.innerHTML = ''
          focusNames.innerHTML='escribe tu nombre (mínimo 2 caracteres)'
      })

    names.addEventListener('blur',function(){
        let errores = [];
            focusNames.innerHTML=''
            errorEmail.innerHTML = ''
            focusEmail.innerHTML= ''
        if(names.value.length<2){
            errores.push('El nombre debe tener al menos 2 caracteres');
          };
        if(errores.length>0){
            errores.forEach(error => {
                errorNames.innerHTML += error
              })
        }
    })

    //Validaciones apellido
    surname.addEventListener('focus',function(){
        errorSurname.innerHTML = ''
        focusSurname.innerHTML='escribe tu apellido (mínimo 2 caracteres)'
    })

    surname.addEventListener('blur',function(){
        let errores = [];
            focusSurname.innerHTML=''
            errorEmail.innerHTML = ''
            focusEmail.innerHTML= ''
        if(surname.value.length<2){
            errores.push('El apellido debe tener almenos 2 caracteres');
            };
        if(errores.length>0){
            errores.forEach(error => {
                errorSurname.innerHTML += error
                })
        }
    })

    //Validaciones foto
    function photoValidator(image){
        let imageFile = image.value;
        let extensions = /(.jpg|.jpeg|.png|.gif)$/i;
        if(!extensions.exec(imageFile)){
            errores.push('La foto no es válida (solo se permiten archivos con formato JPG, JPEG, PNG o GIF)' );
            image.value = '';
        }}
    //Validación telefono
    function phoneValidator(phone){
        let phoneReg = /^\d{10}$/;
        let valido = phoneReg.test(phone)
        if (!valido) {
          return true
        }
      }; 

    phone.addEventListener('focus',function(){
        errorPhone.innerHTML = ''
        focusPhone.innerHTML='El telefono debe tener minimo 10 números'
    })

    phone.addEventListener('blur',function(){
        let errores = [];
            focusPhone.innerHTML=''
            errorEmail.innerHTML = ''
            focusEmail.innerHTML= ''
        if(phoneValidator(phone.value)){
            errores.push('El telefono no es válido, debe tener minimo 10 números');
            };
        if(errores.length>0){
            errores.forEach(error => {
                errorPhone.innerHTML += error
                })
        }
    })

    //validaciones email
    function emailValidator(email){
        let emailReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let valido = emailReg.test(email)
        if (!valido) {
          return true
        }
      };
    
      email.addEventListener('focus',function(){
        errorEmail.innerHTML = ''
        focusEmail.innerHTML='escribe un email ejemplo@gmail.com'
      })
      
      email.addEventListener('blur',function(){
        let errores = [];
            errorEmail.innerHTML = ''
            focusEmail.innerHTML= ''
        if(emailValidator(email.value)){
            errores.push('El correo electrónico no es válido');
          };
        if(errores.length>0){
            errores.forEach(error => {
                errorEmail.innerHTML += error
              })
        }
      })
    
      //validaciones password
      function passwordValidator(password){
        let passwordReg =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
        let valido = passwordReg.test(password)
        if (!valido) {
          return true
        }
      }; 

      password.addEventListener('focus',function(){
        errorPassword.innerHTML = ''
        focusPassword.innerHTML='la contraseña debe tener mínimo de 10 caracteres'
      })
      
      password.addEventListener('blur',function(){
        let errores = [];
            errorPassword.innerHTML = ''
            focusPassword.innerHTML= ''
        if(passwordValidator(password.value)){
            errores.push('La contraseña no es válida');
          };
        if(errores.length>0){
            errores.forEach(error => {
                errorPassword.innerHTML += error
              })
        }
      })

      //validaciones password confirm
      passwordConfirm.addEventListener('focus',function(){
        errorPasswordConfirm.innerHTML = ''
        focusPasswordConfirm.innerHTML='Escribe extactamente la misma contraseña del campo anterior'
      })

      passwordConfirm.addEventListener('blur',function(){
        let errores = [];
            errorPasswordConfirm.innerHTML = ''
            focusPasswordConfirm.innerHTML= ''
        if(password.value!=passwordConfirm.value){
            errores.push('La contraseña no coincide');
          };
        if(errores.length>0){
            errores.forEach(error => {
                errorPasswordConfirm.innerHTML += error
              })
        }
      })

      //validaciones form completo
    form.addEventListener('submit',function(e) {
        let errores = []
        errorPassword.innerHTML = ''
        errorPasswordConfirm.innerHTML = ''
        errorEmail.innerHTML = ''
        errorSurname.innerHTML = ''
        errorNames.innerHTML = ''
        errorPhone.innerHTML = ''

        if (photoValidator(image)) {
            errores.push('La foto no es válida')
        }
        if (names.value.length < 2) {
            errores.push('el nombre no es válido');
        }
        if (surname.value.length < 2) {
            errores.push('El apellido no es válido');
        }
        if (emailValidator(email.value)) {
            errores.push('El email no es váido');
        };
        if (password.value.length < 10) {
            errores.push('La contraseña es incorrecta');
        }
        if (phoneValidator(phone.value)) {
            errores.push('El télefono no es válido');
        }
        if (password.value != passwordConfirm.value) {
            errores.push('La contraseña no coincide');
        }

        if (errores.length > 0) {
            e.preventDefault();
            errorPasswordConfirm.innerHTML += 'No es posible enviar el formulario hay errores en tus datos'
        } else {
            form.submit()
        }
    })
});