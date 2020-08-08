	//ONLOAD FUNCTIONS
	onload =analyzeTable();
		
	function analyzeTable() {
		rowListeners();
		cellListeners();
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
			rows[i].onclick = function() {
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
			cells[i].onclick = function() {
				newIcell = null;
				console.log(cells);
				console.log("SECOND: " + clickedRow + ", " + (this.cellIndex + 1));
				clickedCell = this.cellIndex;
				beforeCell = newIcell || clickedCell;
				afterCell = (newIcell || clickedCell) + 1;
			}
		}
	}



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

		analyzeTable()
	}

//CLONE ROW BELOW CLICKED ROW

	function cloneRowBelow() {
		var itm = document.getElementById("storyLineTable").querySelectorAll("tr")[aboveRow];
		var cln = itm.cloneNode(true);
		var clonedRow = itm.after(cln);
//		var row = document.getElementById("storyLineTable").insertRow(newIrow || aboveRow); //This Determines where the New Row is placed
		
		analyzeTable();
	}

//CREATE CELL BEFORE CLICKED CELL
	function createCellBefore() {
		var row = document.getElementById("storyLineTable").querySelectorAll("tr");
		var cell = row[clickedRow].insertCell(newIcell || beforeCell);
		cell.innerHTML = "cellBefore";
		
		newIcell = (newIcell || beforeCell) + 1;
		console.log("newIcell: " + newIcell);
		analyzeTable()
	}

//CREATE CELL AFTER CLICKED CELL
	function createCellAfter() {
		var row = document.getElementById("storyLineTable").querySelectorAll("tr");
		var cell = row[clickedRow].insertCell(afterCell);
		cell.innerHTML = "cellAfter";

		analyzeTable()
	}

	function splitCell() {}

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
		analyzeTable()
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
		analyzeTable()
	}