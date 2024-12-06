document.querySelector('button').addEventListener('click', async () => {
    //const query = document.querySelector('#SQL').value;
    ////////////'///////////
    let currentTable = '';
    let tableData = [];

    async function loadTable() {
        currentTable = document.getElementById('table-select').value;
        const response = await fetch('http://195.133.18.211:3000/query', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + '1234'
            },
            body: JSON.stringify({
                query: `SELECT * FROM employees`,
            })
        })
        tableData = await response.json();
        renderTable();
    }

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
                saveBtn.onclick = () => saveRow(index);
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

    async function saveRow(index) {
        const row = tableData[index];
        const response = await fetch(`/api/${currentTable}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `INSERT INTO employees (
                    job_title,
                    full_name,
                    DOB,
                    hiring_date,
                    experience,
                    academic_degree,
                    education
                ) VALUES (
                 'Software Developer',
                 'John Doe',
                 '1990-05-15',
                 '2020-06-01',
                 '3 years 6 months',
                 'Master of Science',
                 'Computer Science');`,
            })
        });
        const result = await response.json();
        if (response.ok) {
            alert('Данные успешно сохранены.');
            await loadTable();
        } else {
            alert('Ошибка при сохранении данных: ' + result.error);
        }
    }
})

