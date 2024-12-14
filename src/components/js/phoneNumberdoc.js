import * as tableStorage from "@/state";
import Controller from "@/controller";
import Api from "@/js/api";

const tableDiv = document.getElementById('table-doc');
tableDiv.innerHTML = '';

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
////////////////////////////////////////////
const spravochnik = await Api.loadTable('get_employees_with_departments_and_phones()')
spravochnik.forEach(async (row, index) => {
    const rowElem = document.createElement('tr');
    headers.forEach(header => {
        const td = document.createElement('td');
        let input = document.createElement('input');
        input.type = 'text';
        input.value = row[header];
        input.disabled = true;
        input.dataset.field = header;
        td.appendChild(input);
        rowElem.appendChild(td);
    });
    tableElem.appendChild(rowElem);
});
tableDiv.appendChild(tableElem);