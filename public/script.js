window.onload = function() {
    displayFrame = document.getElementById("display");
    insertFrame = document.getElementById("insert");
    edit1Frame = document.getElementById("edit1");
    edit2Frame = document.getElementById("edit2");
    removeFrame = document.getElementById("remove");
    tableFrame = document.getElementById("table");
    infoFrame = document.getElementById("info");
    showDisplay();
}

function showDisplay() {
    hideAll();
    clearFields();
    displayFrame.style.display = "block";
    displayData();
}

function showInsert() {
    hideAll();
    clearFields();
    insertFrame.style.display = "block";
}

function showEdit() {
    hideAll();
    clearFields();
    edit1Frame.style.display = "block";
}

function showRemove() {
    hideAll();
    clearFields();
    removeFrame.style.display = "block";
}

function showTable() {
    hideAll();
    clearFields();
    tableFrame.style.display = "block";
    buildTable();
}

async function displayData() {
    var res = await fetch('/all');
    var data = await res.json();
    displayFrame.innerHTML = '';
    for(p of data) {
        var person = document.createElement('div');
        person.style.display = 'inline-block';
        person.style.textAlign = 'center';
        person.style.margin = '20px';
        person.textContent = p.name;
        person.style.width = parseInt(p.size) * 2;
        person.style.height = parseInt(p.hei) * 2;
        person.title = p.type;
        switch(p.type) {
            case 'A': person.style.backgroundColor = 'yellow'; break;
            case 'B': person.style.backgroundColor = 'red'; break;
            case 'C': person.style.backgroundColor = 'blue'; break;
            case 'D': person.style.backgroundColor = 'green'; break;
            case 'E': person.style.backgroundColor = 'purple'; break;
        }
        person.addEventListener("mouseenter", function(event) {
            infoFrame.style.display = "block";
            document.getElementById("infoName").innerHTML = event.target.textContent;
            document.getElementById("infoSize").innerHTML = event.target.offsetWidth/2;
            document.getElementById("infoHeight").innerHTML = event.target.offsetHeight/2;
            document.getElementById("infoType").innerHTML = event.target.title;

        });
        person.addEventListener("mouseleave", function(event) {
            infoFrame.style.display = "none";
        });
        displayFrame.append(person);
    }
}

function insert() {
    var name = document.getElementById("nameIns").value;
    var size = document.getElementById("sizeIns").value;
    var hei = document.getElementById("heightIns").value;
    var type = document.getElementById("typeIns").value;
    var data = {name, size, hei, type};
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch('/insert', options);
    showDisplay();
}

function editHandler() {
    var name = document.getElementById("nameEdi").value;
    document.getElementById("editing").innerHTML = name;
    hideAll();
    edit2Frame.style.display = "block";
}

function edit() {
    var name = document.getElementById("nameEdi").value;
    var size = document.getElementById("sizeEdi").value;
    var hei = document.getElementById("heightEdi").value;
    var type = document.getElementById("typeEdi").value;
    var data = {name, size, hei, type};
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch('/edit', options);
    showDisplay();
}

function remove() {
    var name = document.getElementById("nameRem").value;
    var data = {name};
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch('/remove', options);
    showDisplay();
}

async function buildTable() {
    var res = await fetch('/all');
    var data = await res.json();
    tableFrame.innerHTML = '';
    var table = document.createElement('table');
    tableFrame.append(table);
    var head = document.createElement('thead');
    table.append(head);
    var nameCol = document.createElement('th');
    nameCol.innerHTML = 'Name';
    var sizeCol = document.createElement('th');
    sizeCol.innerHTML = 'Size';
    var heightCol = document.createElement('th');
    heightCol.innerHTML = 'Height';
    var typeCol = document.createElement('th');
    typeCol.innerHTML = 'Type';
    head.append(nameCol, sizeCol, heightCol, typeCol);
    for(p of data) {
        var row = document.createElement('tr');
        table.append(row);
        var nameCell = document.createElement('td');
        nameCell.innerHTML = p.name;
        var sizeCell = document.createElement('td');
        sizeCell.innerHTML = p.size;
        var heightCell = document.createElement('td');
        heightCell.innerHTML = p.hei;
        var typeCell = document.createElement('td');
        typeCell.innerHTML = p.type;
        row.append(nameCell, sizeCell, heightCell, typeCell);
    }
}

function hideAll() {
    displayFrame.style.display = "none";
    edit1Frame.style.display = "none";
    edit2Frame.style.display = "none";
    insertFrame.style.display = "none";
    removeFrame.style.display = "none";
    tableFrame.style.display = "none";
}

function clearFields() {
    document.getElementById("nameIns").value = "";
    document.getElementById("sizeIns").value = "";
    document.getElementById("heightIns").value = "";
    document.getElementById("typeIns").value = "A";
    document.getElementById("nameEdi").value = "";
    document.getElementById("sizeEdi").value = "";
    document.getElementById("heightEdi").value = "";
    document.getElementById("typeEdi").value = "A";
    document.getElementById("nameRem").value = "";
}