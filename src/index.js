import Controller from './controller.js'
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        // Если токена нет, перенаправляем на страницу авторизации
        window.location.href = './auth.html';
    }
});
let currentTable = '';
let tableData = [];

document.getElementById('loadTableBtn').addEventListener('click', async function loadTable() {
    currentTable = document.getElementById('table-select').value;
    await Controller.loadTable(currentTable);
    tableData = await response.json();
    renderTable();
})

function renderTable() {
    const tableDiv = document.getElementById('table-data');
    tableDiv.innerHTML = '';

    if (tableData.length > 0) {
        const tableElem = document.createElement('table');
        const headers = Object.keys(tableData[0]);
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.innerText = header;
            headerRow.appendChild(th);
        });
        const thActions = document.createElement('th');
        thActions.innerText = 'Действия';
        headerRow.appendChild(thActions);
        tableElem.appendChild(headerRow);

        tableData.forEach((row, index) => {
            const rowElem = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = row[header];
                input.dataset.field = header;
                input.dataset.index = index;
                input.onchange = (e) => {
                    tableData[index][header] = e.target.value;
                };
                td.appendChild(input);
                rowElem.appendChild(td);
            });
            const tdActions = document.createElement('td');
            const saveBtn = document.createElement('button');
            saveBtn.innerText = 'Сохранить';
            saveBtn.className = 'save-btn';
            saveBtn.onclick = () => save(index);
            tdActions.appendChild(saveBtn);
            rowElem.appendChild(tdActions);
            tableElem.appendChild(rowElem);
        });
        tableDiv.appendChild(tableElem);
    } else {
        tableDiv.innerText = 'Данные отсутствуют.';
    }
}

function addRow() {
    if (currentTable === '') {
        alert('Пожалуйста, выберите таблицу.');
        return;
    }
    const newRow = {};
    const headers = tableData.length > 0 ? Object.keys(tableData[0]) : [];
    headers.forEach(header => {
        newRow[header] = '';
    });
    tableData.push(newRow);
    renderTable();
}

async function save(index) {
    await Controller.saveRow(tableData[index]);
    renderTable();
}