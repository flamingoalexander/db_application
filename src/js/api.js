
export default class Api {
    static keyValues = {
        employees : 'employee_id',
        disciplines: 'discipline_id',
        specialties : 'speciality_id',
        departments : 'department_id',
    }
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
            console.log(row);
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
    static async deleteRow(row, tableName) {
        try {
            console.log(row);
            const keyValue = this.keyValues[tableName];
            let response = 0;
            if (keyValue === undefined) {
                if (tableName === 'disciplines_and_employees') {

                } else if (tableName === 'disciplines_and_specialties') {

                } else if (tableName === 'employees_and_departments`') {

                } else if (tableName === 'phone_numbers') {
                    response = await fetch(`http://195.133.18.211:3000/api/table/${tableName}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            phone_number: row.phone_number,
                            employee_id: row.employee_id
                        })
                    });
                    if (response.ok) {
                        alert('Данные успешно сохранены.');
                    }
                    else {
                        const body = await response.json()
                        alert('Ошибка при сохранении данных: ' + body.message);
                    }
                }

            } else {
                response = await fetch(`http://195.133.18.211:3000/api/table/${tableName}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        [keyValue]: row[keyValue]
                    })
                });
                if (response.ok) {
                    alert('Данные успешно сохранены.');
                }
                else {
                    const body = await response.json()
                    alert('Ошибка при сохранении данных: ' + body.message);
                }
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
    static async getPossibleValues() {
        try {
            const response = await fetch('http://195.133.18.211:3000/api/query', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    query: `SELECT * FROM get_enum_values('department_type_enum');`,
                })
            })
            return await response.json()

        } catch (err) {
            alert('Что то пошло не так: ' + err.message)
        }
    }
}


