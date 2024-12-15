import * as tableStorage from "@/state";
import Controller from "@/controller";
import Api from "@/js/api";
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
            tableStorage.TableData.forEach(async (row, index) => {
                const rowElem = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    let input = document.createElement('input');
                    if (tableStorage.TableName === "employees_and_departments" || tableStorage.TableName === "disciplines_and_employees" || tableStorage.TableName === "disciplines_and_specialties" || tableStorage.TableName === "phone_numbers") {
                        if (tableStorage.TableName === "phone_numbers"){

                        }
                        input.disabled = true;
                        input.value = row[header];
                    } else {
                        if (tableStorage.TableName === "employees") {
                            if (header === 'hiring_date' || header === 'dob') {
                                input.type = 'date';
                                input.value = new Date(row[header]).toISOString().split('T')[0];

                            } else if (header === 'experience') {
                                input.value = row[header];
                                input.type = 'number';
                            } else if ((header.includes('id'))){
                                input.type = 'number';
                                input.value = row[header];
                                input.disabled = true;
                            }
                            else {
                                input.type = 'text';
                                input.value = row[header];
                            }
                        } else if (tableStorage.TableName === "departments") {
                            if ((header.includes('id'))){
                                input.type = 'number';
                                input.value = row[header];
                                input.disabled = true;

                            }
                            if (header === 'department_type'){
                                input = document.createElement('select');
                                input.innerHTML = `
                                        <option>Факультет</option>
                                        <option>Лаборатория</option>
                                        <option>Кафедра</option>
                                        <option>Отдел</option>`;
                                input.value = row[header];
                            } else {
                                input.type = 'text';
                                input.value = row[header];
                            }
                        } else if (tableStorage.TableName === "disciplines") {
                            if ((header.includes('id'))){
                                input.type = 'number';
                                input.value = row[header];
                                input.disabled = true;
                            }
                            if (header === 'discipline_type'){
                                input = document.createElement('select');
                                input.innerHTML = `
                                        <option>Гуманитарная</option>
                                        <option>Социально-экономическая</option>
                                        <option>Обще-математическая</option>
                                        <option>Естественная</option>`;
                                input.value = row[header];
                            } else {
                                input.type = 'text';
                                input.value = row[header];
                            }
                        } else {
                            if ((header.includes('id'))){
                                input.type = 'number';
                                input.value = row[header];
                                input.disabled = true;
                            }
                            input.type = 'text';
                            input.value = row[header];
                        }

                        input.dataset.field = header;
                        input.dataset.index = index;
                        input.onchange = (e) => {
                            tableStorage.TableData[index][header] = e.target.value;
                        };
                    }
                    td.appendChild(input);
                    rowElem.appendChild(td);
                });

                const tdActions = document.createElement('td');
                const saveBtn = document.createElement('button');
                saveBtn.onclick = () => Controller.save(index);
                saveBtn.innerText = 'Сохранить';
                saveBtn.className = 'save-btn';
                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Удалить';
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = () => Controller.delete(index);
                tdActions.appendChild(deleteBtn);
                if (!(tableStorage.TableName === "employees_and_departments" || tableStorage.TableName === "disciplines_and_employees" || tableStorage.TableName === "disciplines_and_specialties" || tableStorage.TableName === "phone_numbers")){
                    tdActions.appendChild(saveBtn);
                }
                tdActions.style.display = 'flex';
                tdActions.style.justifyContent = 'space-between';
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