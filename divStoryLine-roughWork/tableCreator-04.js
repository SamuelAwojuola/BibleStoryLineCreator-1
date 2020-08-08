//FUNCTION FOR REMOVING CLASSES
function removeClassByPrefix(node, prefix) {
	var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
	node.className = node.className.replace(regx, '');
	return node;
}

//ONLOAD FUNCTIONS
onload = analyzeTable();

function analyzeTable() {
	rowListeners();
	cellListeners();

	//REMOVE ALL CLASSES PREFIXED WITH 'COL-'
	var allCells = document.getElementById("storyLineTable").getElementsByTagName("td");
	for (i = 0; i < allCells.length; i++) {
		removeClassByPrefix(allCells[i], 'col-');
	}
	//RESET ALL THE COL-X CLASSES
	generateColumnClasses();
}

var clickedRow;
var clickedCell;
var aboveRow;
var belowRow;
var beforeCell;
var afterCell;
var newIrow;
var newIcell;

//FIND ROW INDEX OF CLICKED CELL/ROW

function rowListeners() {
	var rows = document.getElementById('storyLineTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	for (i = 0; i < rows.length; i++) {
		rows[i].onclick = function () {
			newIrow = null;
			clickedRow = this.rowIndex;
			aboveRow = newIrow || clickedRow;
			//				belowRow = this.rowIndex + 1;
			belowRow = (newIrow || clickedRow) + 1;

			console.log("FIRST: clickedRow is " + clickedRow);

			rowListeners();
		}
	}
}

//FIND INDEX OF CLICKED CELL

function cellListeners() {
	var cells = document.getElementById('storyLineTable').querySelectorAll('td');
	for (i = 0; i < cells.length; i++) {
		cells[i].onclick = function () {
			newIcell = null;
			console.log(cells);
			console.log("SECOND: " + clickedRow + ", " + (this.cellIndex + 1));
			clickedCell = this.cellIndex;
			beforeCell = newIcell || clickedCell;
			afterCell = (newIcell || clickedCell) + 1;
		}
	}
}

/*CELLS***********************************************************************************************/

//CREATE CELL BEFORE CLICKED CELL
function createCellBefore() {
	var x = document.getElementById("myText").value;
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	var cell = row[clickedRow].insertCell(newIcell || beforeCell);
	cell.innerHTML = x || "cellBefore";

	newIcell = (newIcell || beforeCell) + 1;
	console.log("newIcell: " + newIcell);
	analyzeTable();
}

//CREATE CELL AFTER CLICKED CELL
function createCellAfter() {
	var x = document.getElementById("myText").value;
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	var cell = row[clickedRow].insertCell(afterCell);
	cell.innerHTML = x || "cellAfter";

	analyzeTable();
}

//INCREASE CELL COLSPAN
function increaseCellColspan() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	var cell = row[clickedRow].querySelectorAll("td")[clickedCell];
	var currentColspan = cell.getAttribute("colspan");
	++currentColspan;
	currentColspan = cell.setAttribute("colspan", currentColspan);

	analyzeTable();
}

//DECREASE CELL COLSPAN
function decreaseCellColspan() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	var cell = row[clickedRow].querySelectorAll("td")[clickedCell];
	var currentColspan = cell.getAttribute("colspan");
	currentColspan = (currentColspan - 1) || 1;
	currentColspan = cell.setAttribute("colspan", currentColspan);

	analyzeTable();
}


//DELETE CELL
function deleteCell() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	var cell = row[clickedRow].querySelectorAll("td");
	cell[clickedCell].style.display = "none";
}

//HIDE CELL
function hideCell() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	var cell = row[clickedRow].querySelectorAll("td");
	cell[clickedCell].style.visibility = "hidden";
}

//DESTROY CELL (I.E. REMOVE FROM DOM)
function destroyCell() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	var cell = row[clickedRow].querySelectorAll("td");
	cell[clickedCell].remove();
	
	analyzeTable();
}

//SPLIT CELL
function splitCell() {}

//MERGE CELL
function mergeCell() {}


/*ROWS***********************************************************************************************/
//CREATE ROW ABOVE CLICKED ROW
var x = 0;

function createRowAbove() {
	var row = document.getElementById("storyLineTable").insertRow(newIrow || aboveRow); //This Determines where the New Row is placed
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = "rowAbove-" + ++x;
	cell2.innerHTML = "rowAbove-2";

	newIrow = (newIrow || aboveRow) + 1;
	console.log("newIrow: " + newIrow);
	analyzeTable();
}

//CLONE ROW ABOVE CLICKED ROW
var x = 0;

function cloneRowAbove() {
	var itm = document.getElementById("storyLineTable").querySelectorAll("tr")[newIrow || aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.before(cln);
	//		var row = document.getElementById("storyLineTable").insertRow(newIrow || aboveRow); //This Determines where the New Row is placed

	newIrow = (newIrow || aboveRow) + 1;
	console.log("newIrow: " + newIrow);
	analyzeTable();
}

//CREATE ROW BELOW CLICKED ROW
function createRowBelow() {
	var row = document.getElementById("storyLineTable").insertRow(belowRow); //This Determines where the New Row is placed
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = "rowBelow-" + ++x;
	cell2.innerHTML = "rowBelow-2";

	analyzeTable();
}

//CLONE ROW BELOW CLICKED ROW

function cloneRowBelow() {
	var itm = document.getElementById("storyLineTable").querySelectorAll("tr")[aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.after(cln);
	//		var row = document.getElementById("storyLineTable").insertRow(newIrow || aboveRow); //This Determines where the New Row is placed

	analyzeTable();
}


//DELETE ROW
function deleteRow() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	row[clickedRow].style.display = "none";
}

//HIDE ROW
function hideRow() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	row[clickedRow].style.visibility = "hidden";
}

//DESTROY ROW (I.E. REMOVE FROM DOM)
function destroyRow() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	row[clickedRow].remove();
	
	analyzeTable();
}


/*COLUMNS***********************************************************************************************/
//CREATE COLUMN BEFORE CLICKED COLUMN
var z = 1;

function createColumnBefore() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	for (j = 0; j < row.length; j++) {
		var cell = row[j].insertCell(newIcell || beforeCell);
		cell.innerHTML = "columnBefore " + z;
	}
	++z;
	newIcell = (newIcell || beforeCell) + 1;
	analyzeTable();
}

//CREATE COLUMN AFTER CLICKED COLUMN
function createColumnAfter() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	for (j = 0; j < row.length; j++) {
		var cell = row[j].insertCell(afterCell);
		cell.innerHTML = "columnAfter " + z;
	}
	++z;
	newIcell = (newIcell || afterCell) + 1;
	analyzeTable();
}

//DELETE COLUMN
function deleteColumn() {}

//HIDE COLUMN
function hideColumn() {}

//DESTROY COLUMN (I.E. REMOVE FROM DOM)
function destroyRow() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	row[clickedRow].remove();
}


/*SHOW ALL (FOR ROWS AND CELLS WITH DISPLAY == 'NONE' AND VISIBILITY == 'HIDDEN')***********************/
function showAll() {
	var row = document.getElementById("storyLineTable").querySelectorAll("tr");
	for (j = 0; j < row.length; j++) {
		row[j].style.visibility = "";
		row[j].style.display = "";
	}
}



//CONTROL BUTTONS ACCORDION
var h3 = document.getElementsByTagName("h3");
for (i = 0; i < h3.length; i++) {
	h3[i].style.cursor = "pointer";
	var hSib1 = h3[i].nextElementSibling;
	while(hSib1){hSib1.style.display = "none"; hSib1 = hSib1.nextElementSibling;}

	h3[i].onclick = function () {
		var h3clicked = this;
		var hSib2 = h3clicked.nextElementSibling;
		for (let j = 0, hSib2 = h3clicked.nextElementSibling; hSib2 != null; j++, hSib2 = hSib2.nextElementSibling) {
			setTimeout(() => {
				console.log(j, hSib2, h3clicked);
				if (hSib2.style.display == "none") {
					hSib2.style.display = ""
				} else if (hSib2.style.display != "none") {
					hSib2.style.display = "none"
				}
			}, 20 * ++j)
		}
	}
}