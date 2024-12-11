import FormAddRecord from './components/js/FormAddRecord';
import { currentTableData, currentTableName} from "./state";
import Api from "@/js/api";
import * as tableStorage from "@/state";
import MainTable from "@/components/js/MainTable";

export default class Controller {
    static showFormAddRecord() {

    }
    static async save(index) {
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
    }
}