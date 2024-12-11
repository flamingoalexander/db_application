import Api from './js/api.js'
import AuthService  from "./js/AuthService";
import * as tableStorage from "@/state";
import FormAddRecord from "@/components/js/FormAddRecord";
import MainTable from "@/components/js/MainTable";
import Controller from "@/controller";
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
    MainTable.renderTable(tableStorage.TableName);
});

async function loadTable() {
    tableStorage.setTableName(document.getElementById('table-select').value);
    tableStorage.setTableData(await Api.loadTable(tableStorage.TableName));
}

document.getElementById('table-select').addEventListener('change', async () => {
    await loadTable();
    MainTable.renderTable();
});
document.getElementById('logout-button').addEventListener('click', async (event) => {
    await AuthService.logout();
    window.location.href = './auth.html';
})
document.querySelector('.add-row').addEventListener('click', Controller.openFormAddRecord);