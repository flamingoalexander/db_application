import Api from './js/api.js'
import AuthService  from "./js/AuthService";
import * as tableStorage from "@/state";
import FormAddRecord from "@/components/js/FormAddRecord";
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = './auth.html';
    }
    const tables = {
        employees : { value: "employees", text: "Сотрудники" },
        disciplines : { value: "disciplines", text: "Дисциплины" },
        specialties : { value: "specialties", text: "Специальности" },
        departments : { value: "departments", text: "Отделы" },
        phone_numbers : { value: "phone_numbers", text: "Телефонные номера" },
        disciplines_and_specialties : { value: "disciplines_and_specialties", text: "Дисциплины и специальности" },
        disciplines_and_employees : { value: "disciplines_and_employees", text: "Дисциплины и сотрудники" },
        employees_and_departments : { value: "employees_and_departments", text: "Сотрудники и отделы" },
    }
    const tableSelect = document.getElementById("table-select");
    const userRights = localStorage.getItem('userRights').split(',');
    userRights.forEach(table => {
        const opt = document.createElement("option");
        opt.value = tables[table].value
        opt.textContent = tables[table].text;
        tableSelect.appendChild(opt);
    });
});

document.getElementById('loadTableBtn').addEventListener('click', async () => {
    await loadTable();
    renderTable(tableStorage.TableName);
});

async function loadTable() {
    tableStorage.setTableName(document.getElementById('table-select').value);
    tableStorage.setTableData(await Api.loadTable(tableStorage.TableName));
}

function renderTable() {
    const tableDivs = document.getElementById('table-data').style.display = 'block';
    const tableDiv = document.getElementById('table-data');
    tableDiv.innerHTML = '';

    if (tableStorage.TableName.length > 0) {
        const tableElem = document.createElement('table');
        const headers = Object.keys(tableStorage.TableData[0]);
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

        tableStorage.TableData.forEach((row, index) => {
            const rowElem = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = row[header];
                input.dataset.field = header;
                input.dataset.index = index;
                input.onchange = (e) => {
                    tableStorage.TableData[index][header] = e.target.value;
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





async function save(index) {
    await Api.updateRow(tableStorage.TableData[index], tableStorage.TableName);
    renderTable();
}
document.getElementById('table-select').addEventListener('change', async () => {
    await loadTable();
    renderTable();
});
document.getElementById('logout-button').addEventListener('click', async (event) => {
    await AuthService.logout();
    window.location.href = './auth.html';
})
document.querySelector('.add-row').addEventListener('click', FormAddRecord.render);