const { ipcRenderer } = require('electron');

let inputUsername;
let inputPassword;
let btnLogin;

window.onload = () =>{
    inputUsername = document.getElementById('username');
    inputPassword = document.getElementById('password');
    btnLogin = document.getElementById('login');

    btnLogin.onclick =  function(){
        const obj = {username: inputUsername.value, password:inputPassword.value}
        ipcRenderer.invoke("login", obj);
    }
}



