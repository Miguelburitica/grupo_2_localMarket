window.addEventListener('load', function () {
let form=document.querySelector('.formulario')
let email = document.querySelector('#email');
let focusEmail = document.querySelector('.focus_email');
let errorEmail= document.querySelector('.error_email');
let password = document.querySelector('#password');
let focusPassword = document.querySelector('.focus_password');
let errorPassword= document.querySelector('.error_password');

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

  function passwordValidator(password){
    let passwordReg =/^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{10,}$/;
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

    form.addEventListener('submit',function(e) {
         e.preventDefault()
         let errores = []
        errorPassword.innerHTML = ''
        errorEmail.innerHTML = ''
        if (emailValidator(email.value)||passwordValidator(password.value)){
        errores.push('Las credenciales son inválidas')
        errores.forEach(error => {
          errorPassword.innerHTML += error
        })
        };

        if(errores.length == 0) {
        form.submit()
        }
    })
});