window.addEventListener('load', function () {
  // Seleccionando los campos
  let form = document.querySelector('.formulario')
  let names = document.querySelector('#names');
  let userName = document.querySelector('#user_name');
  let surname = document.querySelector('#surname');
  let email = document.querySelector('#email');
  let phone = document.querySelector('#phone');
  let password = document.querySelector('#password');
  let passwordConfirm = document.querySelector('#password_confirm');
  let photo = document.querySelector('#photo');

  // Evento focus
  let focusNames = document.querySelector('.focus_names');
  let focusUserName = document.querySelector('.focus_user_name');
  let focusSurname = document.querySelector('.focus_surname');
  let focusEmail = document.querySelector('.focus_email');
  let focusPhone = document.querySelector('.focus_phone');
  let focusPassword = document.querySelector('.focus_password');
  let focusPasswordConfirm = document.querySelector('.focus_password_confirm');
  let focusPhoto = document.querySelector('.focus_photo');

  // Evento focus
  let errorNames = document.querySelector('.error_names');
  let errorUserName = document.querySelector('.error_user_name');
  let errorSurname = document.querySelector('.error_surname');
  let errorEmail = document.querySelector('.error_email');
  let errorPhone = document.querySelector('.error_phone');
  let errorPassword = document.querySelector('.error_password');
  let errorPasswordConfirm = document.querySelector('.error_password_confirm');
  let errorPhoto = document.querySelector('.error_photo');

  // Funciones de validación

  function emailValidator(email) {
    let emailReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let valido = emailReg.test(email)
    if (!valido) {
      return true
    }
  };

  function passwordValidator(password) {
    let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    let valido = passwordReg.test(password)
    if (!valido) {
      return true
    }
  };

  function phoneValidator(phone) {
    let phoneReg = /^\d{10}$/;
    let valido = phoneReg.test(phone)
    if (!valido) {
      return true
    }
  };

  function photoValidator(image) {
    let imageFile = image.value;
    let extensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if (!extensions.exec(imageFile)) {
      errores.push('La foto no es válida (solo se permiten archivos con formato JPG, JPEG, PNG o GIF)');
      image.value = '';
    }
  }

  //   Eventos
  userName.addEventListener('focus', function () {
    errorUserName.innerHTML = ''
    focusUserName.innerHTML = 'La razón social debe tener al menos 2 caracteres'
  })

  userName.addEventListener('blur', function () {
    let errores = [];
    errorUserName.innerHTML = ''
    focusUserName.innerHTML = ''
    if (userName.value.length < 2) {
      errores.push('La razón social debe tener al menos 2 caracteres');
    };
    if (errores.length > 0) {
      errores.forEach(error => {
        errorUserName.innerHTML += error
      })
    }
  })

  names.addEventListener('focus', function () {
    errorNames.innerHTML = ''
    focusNames.innerHTML = 'El nombre debe tener al menos 2 caracteres'
  })

  names.addEventListener('blur', function () {
    let errores = [];
    errorNames.innerHTML = ''
    focusNames.innerHTML = ''
    if (names.value.length < 2) {
      errores.push('El nombre debe tener al menos 2 caracteres');
    };
    if (errores.length > 0) {
      errores.forEach(error => {
        errorNames.innerHTML += error
      })
    }
  })

  surname.addEventListener('focus', function () {
    errorSurname.innerHTML = ''
    focusSurname.innerHTML = 'El apellido debe tener al menos 2 caracteres'
  })

  surname.addEventListener('blur', function () {
    let errores = [];
    errorSurname.innerHTML = ''
    focusSurname.innerHTML = ''
    if (surname.value.length < 2) {
      errores.push('El apellido debe tener al menos 2 caracteres');
    };
    if (errores.length > 0) {
      errores.forEach(error => {
        errorSurname.innerHTML += error
      })
    }
  })

  email.addEventListener('focus', function () {
    errorEmail.innerHTML = ''
    focusEmail.innerHTML = 'escribe un email ejemplo@gmail.com'
  })

  email.addEventListener('blur', function () {
    let errores = [];
    errorEmail.innerHTML = ''
    focusEmail.innerHTML = ''
    if (emailValidator(email.value)) {
      errores.push('El correo electrónico no es válido');
    };
    if (errores.length > 0) {
      errores.forEach(error => {
        errorEmail.innerHTML += error
      })
    }
  })

  phone.addEventListener('focus', function () {
    errorPhone.innerHTML = ''
    focusPhone.innerHTML = 'El teléfono debe tener mínimo 10 números'
  })

  phone.addEventListener('blur', function () {
    let errores = [];
    errorPhone.innerHTML = ''
    focusPhone.innerHTML = ''
    if (phoneValidator(phone.value)) {
      errores.push('El telefono no es válido, debe tener minimo 10 números');
    };
    if (errores.length > 0) {
      errores.forEach(error => {
        errorPhone.innerHTML += error
      })
    }
  })

  password.addEventListener('focus', function () {
    errorPassword.innerHTML = ''
    focusPassword.innerHTML = 'la contraseña debe tener mínimo de 10 caracteres'
  })

  password.addEventListener('blur', function () {
    let errores = [];
    errorPassword.innerHTML = ''
    focusPassword.innerHTML = ''
    if (passwordValidator(password.value)) {
      errores.push('La contraseña no es válida');
    };
    if (errores.length > 0) {
      errores.forEach(error => {
        errorPassword.innerHTML += error
      })
    }
  })

  passwordConfirm.addEventListener('focus', function () {
    errorPasswordConfirm.innerHTML = ''
    focusPasswordConfirm.innerHTML = 'Escribir la misma contraseña'
  })

  passwordConfirm.addEventListener('blur', function () {
    let errores = [];
    errorPasswordConfirm.innerHTML = ''
    focusPasswordConfirm.innerHTML = ''
    if (passwordConfirm.value != password.value) {
      errores.push('La contraseña no coincide');
    };
    if (errores.length > 0) {
      errores.forEach(error => {
        errorPasswordConfirm.innerHTML += error
      })
    }
  })

  form.addEventListener('submit',function(e) {
  let errores = []
    alert('Estoy en el event')
   if (names.value.length<2){
   e.preventDefault()
   alert('Entré al if')
   console.log('prevent')
   errores.push('Las credenciales son inválidas')
   errores.forEach(error => {
     errorNames.innerHTML += error
   })
   }else if(errores.length == 0) {
    alert('Entré a else')
   form.submit()
   }
})
});