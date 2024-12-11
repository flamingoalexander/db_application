import * as tableStorage from "@/state";

export default class MainTable {
    static renderTable() {
        const tableDiv = document.getElementById('table-data');
        tableDiv.innerHTML = '';

        if (tableStorage.TableName) {
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
            tableStorage.TableData.forEach((row, index) => {
                const rowElem = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    const input = document.createElement('input');

                    if (header === 'hiring_date' || header === 'dob') {
                        input.type = 'date';
                        input.value = new Date(row[header]).toISOString().split('T')[0];

                    } else {
                        input.type = 'text';
                        input.value = row[header];
                    }
                    if (header === 'experience') {
                        input.value = row[header];
                        input.type = 'time';
                    }
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
    static hide(){
        document.getElementById('table-data').style.display = 'none';
    }
    static show(){
        document.getElementById('table-data').style.display = 'block';
    }
}