import FormAddRecord from './components/js/FormAddRecord';
import Api from "@/js/api";
import * as tableStorage from "@/state";
import MainTable from "@/components/js/MainTable";

export default class Controller {
    static showFormAddRecord() {

    }
    static async save(index) {
        if (tableStorage.TableName == 'employees') {
            const row = tableStorage.TableData[index]
            row.experience = {
                years: tableStorage.TableData[index].experience,
            }
        }
        await Api.updateRow(tableStorage.TableData[index], tableStorage.TableName);
        MainTable.renderTable();
    }
    static async openFormAddRecord() {
        MainTable.hide();
        FormAddRecord.render();
        document.getElementById('cancel').addEventListener('click', async (event) => {
            event.preventDefault();
            FormAddRecord.hide()
            MainTable.renderTable();
            MainTable.show();
        });
        document.querySelector('[type="submit"]').addEventListener('click', async (event) => {
            event.preventDefault();
            FormAddRecord.hide()
            setTimeout(async () => {
                await Controller.loadTable();
                MainTable.renderTable();
                MainTable.show();
            }, 500);

        });
    }
    static async loadTable() {
        tableStorage.setTableName(document.getElementById('table-select').value);
        tableStorage.setTableData(await Api.loadTable(tableStorage.TableName));
    }
}