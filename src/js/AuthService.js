export default class AuthService {
    static async login(username, password) {
        const loginData = { username, password };

        const response = await fetch('http://195.133.18.211:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData), // Преобразуем объект в JSON
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                localStorage.setItem('token', data.token);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    static async logout() {
        fetch('http://195.133.18.211:3000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                localStorage.removeItem('token')
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    static getCurrentUser() {
        // Реализация получения текущего пользователя, если требуется
    }
}


