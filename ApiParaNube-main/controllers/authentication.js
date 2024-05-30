import { loginvalidation, signInWithGoogle, register, displayUserData } from "./global.js";

const loginin = document.getElementById("loginbtn")
const googleLoginBtn = document.getElementById("googleLoginBtn");
const facebookLoginBtn = document.getElementById("facebookLoginBtn");
const registerBtn = document.getElementById("registerBtn");


if (loginin) {
  async function validar(){
    const email = document.getElementById("userlogin").value 
    const pass = document.getElementById("passlogin").value 

    const verificar = loginvalidation(email,pass)
    const validation = await verificar

    if(validation != null){
        alert('Authentication sucessfull '+email)
        window.location.href='/templates/pagina.html';
        await displayUserData();
    }
    else{
        alert('Error authentication no sucessfull ')
        console.log('sesion '+email+' no validation')
    }
    
  }

  window.addEventListener('DOMContentLoaded',async()=>{
      loginin.addEventListener('click',validar)
  })
}

if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      alert('Authentication successful ' + user.email);
      window.location.href='/templates/pagina.html';
    } catch (error) {
      alert('Error authentication not successful');
      console.log('session not validated');
    }
  });
}

if (facebookLoginBtn) {
  facebookLoginBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithFacebook();
      const user = result.user;
      alert('Authentication successful ' + user.email);
      window.location.href='/templates/pagina.html';
    } catch (error) {
      alert('Error authentication not successful');
      console.log('session not validated');
    }
  });
}

function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
    return false;
  }
  return true;
}

if (registerBtn) {
  registerBtn.addEventListener('click', async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    // Verifica que la contraseña sea válida antes de intentar registrar al usuario
    if (!validatePassword(password)) {
      alert('La contraseña no cumple con los requisitos');
      return;
    }

    try {
      const result = await register(email, password);
      const user = result.user;
      alert('Registration successful. A verification email has been sent to ' + user.email);
      window.location.href='/templates/pagina.html';
    } catch (error) {
      alert('Error registration not successful');
      console.log('registration not validated');
    }
  });
}

import { sendResetEmail } from './global.js';

window.addEventListener('DOMContentLoaded', () => {
  const resetPassBtn = document.getElementById('resetPassbtn');
  const emailInput = document.getElementById('email');

  if (resetPassBtn) {
    resetPassBtn.addEventListener('click', async () => {
      const email = emailInput.value;
      try {
        await sendResetEmail(email);
        alert('Se ha enviado un correo de restablecimiento de contraseña a ' + email);
        window.location.href="/index.html";
      } catch (error) {
        alert('Error al enviar el correo de restablecimiento de contraseña');
        console.log('Error al enviar el correo de restablecimiento de contraseña: ', error);
      }
    });
  }
});


