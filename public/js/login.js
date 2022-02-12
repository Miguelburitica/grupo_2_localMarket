window.addEventListener('load', function () {
let form=document.querySelector('form')
let email = document.querySelector('#email');
let focusEmail = document.querySelector('.focus_email');
let errorEmail= document.querySelector('.error_email');
let password = document.querySelector('#password');
let errores=[];

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

form.addEventListener('submit',function(e){

})
})