
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
            if (tableName === 'employees') {
                const result = await response.json();
                result.forEach(employee => {
                    employee.experience = employee.experience.years;
                })
                return result;
            }
            return await response.json()
        } catch (err) {
            alert('Что то пошло не так: ' + err.message)
        }
    }

    static async updateRow(row, tableName) {
        try {
            console.log(12312312);
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
                console.log(body.message);
                if (tableName === 'employees') {
                    if (body.message === 'Bad request: empty job title or full name'){
                        alert('Ошибка: пустое имя или должность сотрудника');
                    }
                    if (body.message.includes('update or delete on table "employees" violates foreign key constraint')){
                        alert('Ошибка: невозможно удалить сотрудника, т.к. на него есть ссылки в других таблицах');
                    }
                } else if (tableName === 'specialties') {
                    if (body.message.includes('insert or update on table "specialties" violates foreign key constraint')){
                        alert('Ошибка: такого сотрудника не существует');
                    }
                } else {
                    alert('Ошибка при сохранении данных: ' + body.message);
                }
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
                    response = await fetch(`http://195.133.18.211:3000/api/table/${tableName}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            discipline_id: row.discipline_id,
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
                } else if (tableName === 'disciplines_and_specialties') {
                    response = await fetch(`http://195.133.18.211:3000/api/table/${tableName}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            discipline_id: row.discipline_id,
                            speciality_id: row.speciality_id
                        })
                    });
                    if (response.ok) {
                        alert('Данные успешно сохранены.');
                    }
                    else {
                        const body = await response.json()
                        alert('Ошибка при сохранении данных: ' + body.message);
                    }
                } else if (tableName === 'employees_and_departments') {
                    response = await fetch(`http://195.133.18.211:3000/api/table/${tableName}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            employee_id: row.employee_id,
                            department_id: row.department_id
                        })
                    });
                    if (response.ok) {
                        alert('Данные успешно сохранены.');
                    }
                    else {
                        const body = await response.json()
                        alert('Ошибка при сохранении данных: ' + body.message);
                    }
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
                    if (tableName === 'employees') {
                        if (body.message.includes('update or delete on table "employees" violates foreign key constraint')){
                            alert('Ошибка: невозможно удалить сотрудника, т.к. на него есть ссылки в других таблицах');
                        }
                    } else {
                        alert('Ошибка при сохранении данных: ' + body.message);
                    }
                }
            }
        } catch (err) {
            alert('Ошибка при сохранении данных: ' + err.message);
            console.error(err);
        }
    }
    static async addRow(row, tableName) {
        try {
            if (tableName === 'employees') {
                row.experience = row.experience.split(" ")[0];
            }
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


