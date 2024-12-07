export default class Controller {
    static async loadTable(tableName) {
        try {
            const response = await fetch('http://195.133.18.211:3000/api/query', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    query: `SELECT * FROM ${tableName}`,
                })
            })
            return await response.json()
        } catch (err) {
            alert('Что то пошло не так: ' + err.message)
        }
    }

    static async updateRow(row, tableName) {
        try {
            const response = await fetch(`http://195.133.18.211:3000/api/table/${tableName}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(row)
            });
            if (response.ok) {
                alert('Данные успешно сохранены.');
            }
            else {
                const body = await response.json()
                alert('Ошибка при сохранении данных: ' + body.message);
            }
        } catch (err) {
            alert('Ошибка при сохранении данных: ' + err.message);
            console.error(err);
        }
    }
    static async addRow(row, tableName) {
        try {
            const response = await fetch(`http://195.133.18.211:3000/api/table/${tableName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(row)
            });
            if (response.ok) {
                alert('Данные успешно сохранены.');
            }
            else {
                const body = await response.json()
                alert('Ошибка при добавлении данных: ' + body.message);
            }
        } catch(err) {
            alert('Ошибка при добавлении данных: ' + err.error);
        }
    }
}


