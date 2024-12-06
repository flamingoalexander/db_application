export default class AuthService {
    static async login(username, password) {
        const loginData = { username, password };
        const response = await fetch('http://195.133.18.211:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Invalid credentials') {
                    throw new Error(data.message);
                }
                console.log('Success:', data);
                localStorage.setItem('token', data.token);
            })
            .catch(error => {
                console.error('Error:', error);
                throw new Error(error);
            });
    }

    static async logout() {
        await fetch('http://195.133.18.211:3000/api/logout', {
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

    }
}


