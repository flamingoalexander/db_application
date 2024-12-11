import Api from "../../js/api";
import * as tableStorage from "@/state";
import FormAddRecordFormHTML from "@/components/html/FormAddRecord.html";
export default class FormAddRecord {
    static init() {
        document.querySelector('#submit').addEventListener('click', async (event) => {
            event.preventDefault();
            const row = {}
            const tableFields = Object.keys(tableStorage.TableData[0]);
            console.log(tableFields);
            tableFields.forEach(field => {
                if (!field.includes('id')) {
                    row[field] = document.getElementById(field).value;
                }
            });
            console.log(row);
            await Api.addRow(row, tableStorage.TableName);
        });

    }
    static render() {
        const FormAddRecordContainer =  document.getElementById('add-record-form');
        if (FormAddRecordContainer.style.display === 'flex') {
            alert("Форма уже загружена!");
            return;
        }
        if (tableStorage.TableName === '') {
            alert('Пожалуйста, выберите таблицу.');
            return;
        }
        FormAddRecordContainer.innerHTML = FormAddRecordFormHTML;

        FormAddRecordContainer.style.display = 'flex'
        const inputFields = document.getElementById('input-fields');
        inputFields.innerHTML = '';
        const tableFields = Object.keys(tableStorage.TableData[0]);

        tableFields.forEach(field => {
            console.log(field);
            if (field === 'hiring_date' || field === 'dob') {
                inputFields.innerHTML += '' +
                    `<label>${field}</label>\n` +
                    `<input id="${field}" type="date" required>`;
            } else if (field.includes('id')) {
                console.log(field);
            }
            else {
                inputFields.innerHTML += '' +
                    `<label>${field}</label>\n` +
                    `<input id="${field}" required>`;
            }
        })
        this.init();
    }
    static hide(){
        const FormAddRecordContainer =  document.getElementById('add-record-form');
        FormAddRecordContainer.style.display = 'none';
    }
}