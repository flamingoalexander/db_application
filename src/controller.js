export default class Controller {
    static async loadTable(tableName) {
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
    }
    static async updateRow(row) {
        const response = await fetch(`http://195.133.18.211:3000/api/table/employees`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                employee: row
            })
        });
        const result = await response.json();
        if (response.ok) {
            alert('Данные успешно сохранены.');
        } else {
            alert('Ошибка при сохранении данных: ' + result.error);
        }
    }
}


