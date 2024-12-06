import AuthService from "./js/AuthService.js";
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    try{
        await AuthService.login(username, password);
        window.location.href = "./index.html";
    } catch(error){
        console.error(error);
        message.textContent = 'ЧТО ТО ПОШЛО НЕ ТАК';
    }
});
document.getElementById('logout').addEventListener('click', async (event) => {
    console.log(123)
    await AuthService.logout();
});