
async function loadTable(tableName) {
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
async function init(){
    const tableDiv = document.getElementById('table-doc');
    tableDiv.innerHTML = '';

    const tableElem = document.createElement('table');
    const spravochnik = await loadTable('get_employees_with_departments_and_phones()')
    console.log(spravochnik);
    const headers = Object.keys(spravochnik[0]);

    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerText = header;
        headerRow.appendChild(th);
    });

    tableElem.appendChild(headerRow);
////////////////////////////////////////////

    spravochnik.forEach((row) => {
        const rowElem = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            let input = document.createElement('div');
            input.innerHTML = row[header];
            td.appendChild(input);
            rowElem.appendChild(td);
        });
        tableElem.appendChild(rowElem);
    });
    tableDiv.appendChild(tableElem);
}
document.addEventListener('DOMContentLoaded', init);