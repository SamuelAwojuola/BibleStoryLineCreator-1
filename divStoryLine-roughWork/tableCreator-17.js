var storyLineTable = document.getElementById('storyLineTable');
var TypeOfHtmlHeader = 'H3';
var celldeselect;
var tblReady;
var selectedCell;

//FUNCTION FOR REMOVING CLASSES
function removeClassByPrefix(node, prefix) {
	var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
	node.className = node.className.replace(regx, '');
	return node;
}

//ONLOAD FUNCTIONS
onload = onloadAnalysis();

function onloadAnalysis() {
	rowListeners();
	cellListeners();
	buildLegendTable();
}

function analyzeTable() {
	rowListeners();
	cellListeners();
	resetClasses();
	deselectEmptyCell();
	buildLegendTable();
	legendHeight();
}


/*EMPTY CELL DESELECT*********************************************************************/

function deselectEmptyCell() {
	var h2r = celldeselect.querySelector(TypeOfHtmlHeader);
	emptyCellDeselect(h2r);
}

/***********/
function emptyCellDeselect(v) {
	if (v.innerHTML == "") {
		v.remove()
	}
	celldeselect.style.backgroundColor = '';
	celldeselect.classList.remove('clicked');
}
/***********/

/*RESET CLASSES***************************************************************************/

function resetClasses() {
	//REMOVE ALL CLASSES PREFIXED WITH 'COL-'
	var allCells = storyLineTable.getElementsByTagName('td');
	for (i = 0; i < allCells.length; i++) {
		removeClassByPrefix(allCells[i], 'col-');
	}
	//RESET ALL THE COL-X CLASSES
	generateColumnClasses();

	var allRowz = storyLineTable.querySelectorAll('tr');
	for (i = 0; i < allRowz.length; i++) {
		var allTdzInRow = allRowz[i].querySelectorAll('td');
		for (j = 0; j < allTdzInRow.length; j++) {
			allTdzInRow[j].setAttribute('rIndex', i)
		}
	}
}

/*HIGHLIGHT CLICKED CELL******************************************************************/
var prev_x = null;

function cellHighlight(x) {
	var heading = document.createElement(TypeOfHtmlHeader);
	var hdtxt = '';

	if (prev_x != null) {
		prev_x.classList.remove('clicked');
		prev_x.style.backgroundColor = '';

		//REMOVE HEADING FROM THE PREVIOUSLY CLICKED ELEMENT IF IT WAS NOT MODIFIED
		if ((prev_x.querySelector(TypeOfHtmlHeader)) && (prev_x.querySelector(TypeOfHtmlHeader).innerHTML == hdtxt)) {
			prev_x.querySelector(TypeOfHtmlHeader).remove();
		}
	}
	prev_x = x;

	x.style.backgroundColor = 'white';
	x.classList.add('clicked');

	//IF THERE IS NO HEADING CREATE ONE
	if (!x.querySelector(TypeOfHtmlHeader)) {
		heading.setAttribute('contentEditable', 'true');
		heading.innerHTML = hdtxt;
		x.prepend(heading);
		var h2r = x.querySelector(TypeOfHtmlHeader);

		function shs() {
			if (h2r.innerHTML == hdtxt) {
				h2r.remove()
			}
		}

		setTimeout(() => [x.style.backgroundColor = '', x.classList.remove('clicked'), shs()], 22000);
		//	setTimeout(() => [], 22000);
	}
}



/*ONCLICK EVENTLISTENERS******************************************************************/

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
	var rows = storyLineTable.getElementsByTagName('tr');
	for (i = 0; i < rows.length; i++) {
		rows[i].onclick = function () {
			newIrow = null;
			clickedRow = this.rowIndex;
			aboveRow = newIrow || clickedRow;
			//				belowRow = this.rowIndex + 1;
			belowRow = (newIrow || clickedRow) + 1;

			//			console.log('FIRST: clickedRow is ' + clickedRow);

			rowListeners();
		}
	}
}

//FIND INDEX OF CLICKED CELL

function cellListeners() {
	var cells = storyLineTable.querySelectorAll('td');
	for (i = 0; i < cells.length; i++) {
		cells[i].onclick = function () {
			newIcell = null;
			clickedCell = this.cellIndex;
			beforeCell = newIcell || clickedCell;
			afterCell = (newIcell || clickedCell) + 1;

			//HIGHLIGHT CLICKED CELL TO INDICATE CLICKED CELL AND ROW
			cellHighlight(this);
			celldeselect = this;
			selectedCell = this;

			//FOR DIV
		}
	}
}

/*CELLS***********************************************************************************************/

//CREATE CELL BEFORE CLICKED CELL
function createCellBefore() {
	var x = document.getElementById('myText').value;
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].insertCell(newIcell || beforeCell);
	cell.innerHTML = x || '';

	newIcell = (newIcell || beforeCell) + 1;

	analyzeTable();
}

//CREATE CELL AFTER CLICKED CELL
function createCellAfter() {
	var x = document.getElementById('myText').value; //GETS VALUE FROM INPUT BOX
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].insertCell(afterCell);
	cell.innerHTML = x || '';

	analyzeTable();
}

//INCREASE CELL COLSPAN
function increaseCellColspan() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];
	var currentColspan = cell.getAttribute('colspan');
	++currentColspan;
	currentColspan = cell.setAttribute('colspan', currentColspan);

	analyzeTable();
}

//DECREASE CELL COLSPAN
function decreaseCellColspan() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];
	var currentColspan = cell.getAttribute('colspan');
	currentColspan = (currentColspan - 1) || 1;
	currentColspan = cell.setAttribute('colspan', currentColspan);

	analyzeTable();
}


//DELETE CELL
function deleteCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].style.display = 'none';
}

//HIDE CELL
function hideCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].style.visibility = 'hidden';

	analyzeTable();
}

//DESTROY CELL (I.E. REMOVE FROM DOM)
function destroyCell() {
	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td');
	cell[clickedCell].remove();

	analyzeTable();
}

//SELECT CELLS TO MERGE
var cellSelectBtn;
var selectCellsToMerge = 1; //TO DETERMINE IF CELLS CAN BE SELECTED FOR MERGING OR NOT
var mergeColspan = 0;
var shouldContentsBeMerged;
var active = 'aquamarine';
var deactivated = '';
var cellsContentBtn;
var cCBtnCounter = 0;
var selectedCellsArray = [];
var controlArray = [];
var controlArray4RowIndex = [];


function selectCells(dbtn) {

	if (selectCellsToMerge == 1) {

		dbtn.style.background = active;
		console.log(125354);
		selectCellsToMerge = 0
		cellSelectBtn = dbtn;
		shouldContentsBeMerged = 1;

		var cells = storyLineTable.querySelectorAll('td');

		for (i = 0; i < cells.length; i++) {
			cells[i].onclick = function () {

				if ((!this.classList.contains('selected')) && (dbtn.style.background == active) && (this.rowSpan == 1)) {
					this.style.backgroundColor = 'pink';
					this.classList.add('selected')
					var cspan = this.colSpan;
					mergeColspan = mergeColspan + cspan;
					selectedCellsArray.push(this); //ADD THE CLICKED CELL TO THE SELECTED CELLS ARRAY
					controlArray.push(this.cellIndex); //GET THE CELL INDEX OF THE CLICKED CELL AND ADD IT TO THE CONTROL ARRAY
					var clickedCellRowIndex = this.getAttribute('rIndex'); //GET ROW INDEX FROM CUSTOM ATTRIBUTE 'rIndex'
					console.log('clickedRow: ' + clickedCellRowIndex);
					controlArray4RowIndex.push(clickedCellRowIndex); //GET THE INDEX OF THE CLICKED ROW

					console.log('mergeColspan: ' + mergeColspan);
					console.log(selectedCellsArray);
					console.log(controlArray);
					console.log('rowArray: ' + controlArray4RowIndex);
					//					console.log(Math.min(...controlArray));

				} else if (this.classList.contains('selected')) {
					this.style.backgroundColor = '';
					var cspan = this.colSpan;
					mergeColspan = mergeColspan - cspan;

					index2Remove = selectedCellsArray.indexOf(this);
					console.log('index2Remove: ' + index2Remove);
					selectedCellsArray.splice(index2Remove, 1);
					controlArray.splice(index2Remove, 1);
					controlArray4RowIndex.splice(index2Remove, 1);

					this.classList.remove('selected')

					console.log('mergeColspan: ' + mergeColspan);
					console.log(selectedCellsArray);
					console.log(controlArray);
					console.log('rowArray: ' + controlArray4RowIndex);
					console.log(Math.min(...controlArray));
				}
			}
		}

	} else if (selectCellsToMerge == 0) {
		dbtn.style.background = deactivated;
		selectCellsToMerge = 1;
		cellSelectBtn = null;
		shouldContentsBeMerged = null;
		selectedCellsArray = [];
		controlArray = [];
		controlArray4RowIndex = [];

		if (cellsContentBtn) {
			cellsContentBtn.style.background = deactivated;
		}

		var deselect = document.querySelectorAll('.selected');
		for (k = 0; k < deselect.length; k++) {
			deselect[k].style.backgroundColor = '';
			deselect[k].classList.remove('selected');
			mergeColspan = 0;
		}
	}
}

//TO MERGE CONTENTS OF MERGED CELLS
function mergeContents(cCBtn) {
	if (shouldContentsBeMerged == 1) {
		cCBtn.style.background = active;
		shouldContentsBeMerged = 0;
		cellsContentBtn = cCBtn;
	} else if (shouldContentsBeMerged == 0) {
		cCBtn.style.background = deactivated;
		cellsContentBtn = null;
		shouldContentsBeMerged = 1;
	}

}

//MERGE CELL
function mergeCells() {
	cellSelectBtn.style.background = deactivated;
	cellSelectBtn = null;
	selectCellsToMerge = 1;

	if (cellsContentBtn) {
		cellsContentBtn.style.background = deactivated;
	}
	shouldContentsBeMerged = 1;
	cellsContentBtn = null;
	var sca = selectedCellsArray;
	var controlIndex = controlArray.indexOf(Math.min(...controlArray)); //FIND THE INDEXOF THE LOWEST ELEMENT IN THE CONTROL ARRAY. THIS WILL BE THE INDEX OF THE ELEMENT IN THE CLICKED ARRAY TO KEEP 

	for (s = 0; s < sca.length; s++) {
		if (s != controlIndex) {
			sca[s].remove()
		}
		sca[controlIndex].colSpan = mergeColspan;
		sca[controlIndex].style.background = deactivated;
		sca[controlIndex].classList.remove('selected');
	}

	controlArray4RowIndex = [];
	selectedCellsArray = [];
	controlArray = [];
	mergeColspan = 0;

	analyzeTable();
}

//SPLIT CELL
function splitCell() {
	cellSelectBtn.style.background = deactivated;
	cellSelectBtn = null;
	selectCellsToMerge = 1;

	if (cellsContentBtn) {
		cellsContentBtn.style.background = deactivated;
	}

	var sca = selectedCellsArray;
	for (i = 0; i < sca.length; i++) {
		if (sca[i].colSpan > 1) {
			var numOfCells2Make = (sca[i].colSpan) - 1;
			for (j = 0; j < numOfCells2Make; j++) {
				//				var x = document.getElementById('myText').value;//GETS VALUE FROM INPUT BOX
				var row = storyLineTable.querySelectorAll('tr');
				var splitRowIndex = row[controlArray4RowIndex[i]];
				var cell = splitRowIndex.insertCell(controlArray[i] + 1);
				//				cell.innerHTML = 'splitCell';
			}
			sca[i].colSpan = 1;
		}
		sca[i].style.background = deactivated;
		sca[i].classList.remove('selected');
	}

	controlArray4RowIndex = [];
	selectedCellsArray = [];
	controlArray = [];
	mergeColspan = 0;

	analyzeTable();
}


/*ROWS***********************************************************************************************/
//CREATE ROW ABOVE CLICKED ROW
var x = 0;

function createRowAbove() {
	var row = storyLineTable.insertRow(newIrow || aboveRow); //This Determines where the New Row is placed
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

	newIrow = (newIrow || aboveRow) + 1;

	analyzeTable();
}

//CREATE ROW BELOW CLICKED ROW
function createRowBelow() {
	var row = storyLineTable.insertRow(belowRow); //This Determines where the New Row is placed
	var cell1 = row.insertCell(0);

	analyzeTable();
}

//CLONE ROW ABOVE CLICKED ROW
function cloneRowAbove() {
	var itm = storyLineTable.querySelectorAll('tr')[newIrow || aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.before(cln);

	newIrow = (newIrow || aboveRow) + 1;

	var cellZ2deselect = storyLineTable.querySelectorAll('.clicked');
	//	analyzeTable();
	console.log("CELLZ-LENGTH: " + cellZ2deselect.length);
	for (i = 0; i < cellZ2deselect.length; i++) {

		celldeselect = cellZ2deselect[i];
		var h2r = celldeselect.querySelector(TypeOfHtmlHeader);

		if (h2r.innerHTML == "") {
			h2r.remove()

			celldeselect.style.backgroundColor = '';
			celldeselect.classList.remove('clicked');

		}
	}
	rowListeners();
	cellListeners();
	resetClasses();
	buildLegendTable();

	legendHeight();

}

//CLONE ROW BELOW CLICKED ROW

function cloneRowBelow() {
	var itm = storyLineTable.querySelectorAll('tr')[aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.after(cln);
	var cellZ2deselect = storyLineTable.querySelectorAll('.clicked');

	for (i = 0; i < cellZ2deselect.length; i++) {
		console.log("i: " + i);
		console.log("CELLZ: " + cellZ2deselect[i]);
		celldeselect = cellZ2deselect[i];

		var h2r = celldeselect.querySelector(TypeOfHtmlHeader);
		//		analyzeTable();

		if (h2r.innerHTML == "") {
			h2r.remove()

			celldeselect.style.backgroundColor = '';
			celldeselect.classList.remove('clicked');

		}
	}
	rowListeners();
	cellListeners();
	resetClasses();
	buildLegendTable();

	legendHeight();
}


//DELETE ROW
function deleteRow() {
	var row = storyLineTable.querySelectorAll('tr');
	row[clickedRow].style.display = 'none';

	analyzeTable();
}

//HIDE ROW
function hideRow() {
	var row = storyLineTable.querySelectorAll('tr');
	row[clickedRow].style.visibility = 'hidden';

	analyzeTable();
}

//DESTROY ROW (I.E. REMOVE FROM DOM)
function destroyRow() {
	var row = storyLineTable.querySelectorAll('tr');
	row[clickedRow].remove();

	analyzeTable();
}


/*COLUMNS***********************************************************************************************/
//CREATE COLUMN BEFORE CLICKED COLUMN
var z = 1;

function createColumnBefore() {
	var row = storyLineTable.querySelectorAll('tr');
	for (j = 0; j < row.length; j++) {
		var cell = row[j].insertCell(newIcell || beforeCell);
		cell.innerHTML = 'columnBefore ' + z;
	}
	++z;
	newIcell = (newIcell || beforeCell) + 1;
	analyzeTable();
}

//CREATE COLUMN AFTER CLICKED COLUMN
function createColumnAfter() {
	var row = storyLineTable.querySelectorAll('tr');
	for (j = 0; j < row.length; j++) {
		var cell = row[j].insertCell(afterCell);
		cell.innerHTML = 'columnAfter ' + z;
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
	var row = storyLineTable.querySelectorAll('tr');
	row[clickedRow].remove();
}


/*SHOW ALL (FOR ROWS AND CELLS WITH DISPLAY == 'NONE' AND VISIBILITY == 'HIDDEN')***********************/
function showAll() {
	var row = storyLineTable.querySelectorAll('tr');
	for (j = 0; j < row.length; j++) {
		row[j].style.visibility = '';
		row[j].style.display = '';
	}
	var cell = storyLineTable.querySelectorAll('td');
	for (j = 0; j < cell.length; j++) {
		cell[j].style.visibility = '';
		cell[j].style.display = '';
	}
}



//CONTROL BUTTONS ACCORDION
var h3 = document.getElementsByTagName('h3');
for (i = 0; i < h3.length; i++) {
	h3[i].style.cursor = 'pointer';
	var hSib1 = h3[i].nextElementSibling;
	while (hSib1) {
		hSib1.style.display = 'none';
		hSib1 = hSib1.nextElementSibling;
	}

	h3[i].onclick = function () {
		var h3clicked = this;
		var hSib2 = h3clicked.nextElementSibling;
		for (let j = 0, hSib2 = h3clicked.nextElementSibling; hSib2 != null; j++, hSib2 = hSib2.nextElementSibling) {
			setTimeout(() => {
				//				console.log(j, hSib2, h3clicked);
				if (hSib2.style.display == 'none') {
					hSib2.style.display = ''
				} else if (hSib2.style.display != 'none') {
					hSib2.style.display = 'none'
				}
			}, 20 * ++j)
		}
	}
}

/*ADD HEADING TO CLICKED CELL***************************************************************************/
//THIS IS SO THAT ENTER KEY WILL WORK ON THE INPUT
function inputEnter(inpt, inptBtn) {
	inpt.addEventListener('keyup', function (event) {
		// Number 13 is the 'Enter' key on the keyboard
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			document.getElementById(inptBtn).click();

			var h2r = celldeselect.querySelector(TypeOfHtmlHeader);
			emptyCellDeselect(h2r);

		}
	})
}
/************************************/


var input4heading = document.getElementById('cellHeading'); //GETS VALUE FROM INPUT BOX
var input4rowName = document.getElementById('rowName'); //GETS VALUE FROM INPUT BOX

inputEnter(input4heading, 'applyHeadingBtn');
inputEnter(input4rowName, 'applyRowEditBtn');



function insertHeading() {
	var x = input4heading.value; //GETS VALUE FROM INPUT BOX

	var row = storyLineTable.querySelectorAll('tr');
	var cell = row[clickedRow].querySelectorAll('td')[clickedCell];

	if (x) {
		var heading = cell.querySelector(TypeOfHtmlHeader);
		//		heading.setAttribute('contentEditable', 'true');
		heading.innerHTML = x;
		input4heading.value = ''; //THIS CLEARS THE INPUT BOX
		celldeselect = cell;

		buildLegendTable();
	}

	analyzeTable();
}

function rowEdit() {
	var x = input4rowName.value; //GETS VALUE FROM INPUT BOX

	var row = storyLineTable.querySelectorAll('tr')[clickedRow];
	if (x) {
		row.setAttribute('rowName', x);
		row.setAttribute('title', x);
		input4rowName.value = ''; //THIS CLEARS THE INPUT BOX

		var cell = row.querySelectorAll('td')[clickedCell];
		celldeselect = cell;

		buildLegendTable();
		legendHeight();
	}
	//	analyzeTable();
}

var arrayOfRowNames = [];


/****************************************************************************************/
/*LEGEND TABLE SCRIPT********************************************************************/
/****************************************************************************************/

var headerClear;
var bodyClear;
var clear;

function buildLegendTable() {

	var legendTable = document.querySelector('#legendTable');
	var ltbl_thead = legendTable.querySelector('thead');
	var ltbl_tbody = legendTable.querySelector('tbody');
	var ltbl_thd_tr = ltbl_thead.querySelectorAll('tr');
	var ltbl_tbdy_tr = ltbl_tbody.querySelectorAll('tr');

	var storyLineTable = document.querySelector('#storyLineTable');
	//	storyLineTable;
	var st_thd = storyLineTable.querySelector('thead');
	var st_tbdy = storyLineTable.querySelector('tbody');
	var st_thd_tr = st_thd.querySelectorAll('tr');
	var st_tbdy_tr = st_tbdy.querySelectorAll('tr');


	//CLEAR ALL ROWS
	/*	if (clear) {
			var trClear = legendTable.querySelectorAll("tr");
			for (i = 0; i < trClear.length; i++) {
				trClear[i].remove();
			}
		}*/
	if (headerClear) {
		var trClear = ltbl_thead.querySelectorAll("tr");
		for (i = 0; i < trClear.length; i++) {
			trClear[i].remove();
		}
	}
	if (bodyClear) {
		var trClear = ltbl_tbody.querySelectorAll("tr");
		for (i = 0; i < trClear.length; i++) {
			trClear[i].remove();
		}
	}


	//CREATE <TR> TO APPEND TO LEGEND-TABLE
	function newLTrow(heightAtt, newTRtxt, appendHere) {

		var newTR = document.createElement('TR');
		var newTD = document.createElement('TD');
		var newH1 = document.createElement('H3');

		var hAtt = heightAtt || null;
		newTD.style.height = hAtt;

		var nTR = newTRtxt || null;
		newH1.innerHTML = nTR;

		newTR.setAttribute('rowname', newTRtxt);

		appendHere.appendChild(newTR).appendChild(newTD).prepend(newH1);
		console.log(newTR);

		x1 = null;
		x2 = null;
	}

	//LOOP THROUGH ROWS TO CREATE
	//FOR THEAD ROWS
	for (i = 0; i < st_thd_tr.length; i++) {
		var newTRtxt = st_thd_tr[i].getAttribute('rowname');
		console.log("H:::" + i);
		newLTrow(null, newTRtxt, ltbl_thead)
	}

	//FOR TBODY ROWS
	for (i = 0; i < st_tbdy_tr.length; i++) {
		var newTRtxt = st_tbdy_tr[i].getAttribute('rowname');
		console.log("B:::" + i);
		newLTrow(null, newTRtxt, ltbl_tbody)
	}

	headerClear = 1;
	bodyClear = 1;
	clear = 1;

}

/* SET HEIGHT OF LEGEND CELLS ************************************************************/

/*example use
var div = document.querySelectorAll('div')[0];
var divCoordinates = getPositionXY(div);
console.log(divCoordinates.bottomXcenter, divCoordinates.bottomYcenter);
*/
//LOOP THROUGH THE ROWS IN THE LEGEND TABLE AND MERGE ROWS THAT HAVE THE SAME ROWNAME
function legendHeight() {

	var legendTable = document.querySelector('#legendTable');
	var ltbl_thead = legendTable.querySelector('thead');
	var ltbl_tbody = legendTable.querySelector('tbody');
	var ltbl_thd_tr = ltbl_thead.querySelectorAll('tr');
	var ltbl_tbdy_tr = ltbl_tbody.querySelectorAll('tr');

	var storyLineTable = document.querySelector('#storyLineTable');
	var st_thd = storyLineTable.querySelector('thead');
	var st_tbdy = storyLineTable.querySelector('tbody');
	var st_thd_all_tr = st_thd.querySelectorAll('tr');
	var st_tbdy_all_tr = st_tbdy.querySelectorAll('tr');

	legendHeightSetter(ltbl_thead, ltbl_thd_tr, st_thd_all_tr);
	legendHeightSetter(ltbl_tbody, ltbl_tbdy_tr, st_tbdy_all_tr);

}

function legendHeightSetter(tablePart, tableRowz, correspondingTableRowz) {
	var rowSpanSet = 1;
	var rowName1;
	var rowName2;
	var x1 = null;
	var x2 = null;
	var currentRow;
	var y1;
	var y2;
	var lgnd_height;
	for (i = 0; i < tableRowz.length; i++) {
		rowName1 = tableRowz[i].getAttribute('rowname');
		if (x1 != null) {
			x2 = rowName1;
			var correspondingRowHeight = correspondingTableRowz[i].clientHeight;
			console.log("correspondingRowHeight");
			tableRowz[i].style.height = correspondingRowHeight + "px";
			//FIND BOTTOM OF THIS ELEMENT AND SUBTACT THE TOP OF THE CURRENT ROW FROM IT
			//					y2 = tableRowz[i].getBoundingClientRect().top + tableRowz[i].clientHeight /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;

			if (x1 == x2) {
				//					currentRow = tableRowz[i];
				tableRowz[i].classList.add('deleteThis'); //THIS WILL LATER BE DELETED

				y2 = tableRowz[i].getBoundingClientRect().top + tableRowz[i].clientHeight /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;
				lgnd_height = y2 - y1;
				currentRow.style.height = lgnd_height + "px";

				console.log("tableRowz[i]: " + tableRowz[i]);
				console.log("y2: " + y2);
				console.log("lgnd_height: " + lgnd_height);

				x1 = x2;
			} else if (x1 != x2) {
				x1 = rowName1;
				currentRow = tableRowz[i];

				//FIND TOPMOST POINT
				y1 = currentRow.trueY;
			}
		} else if (x1 == null) {
			x1 = rowName1;
			currentRow = tableRowz[i];

			var correspondingRowHeight = correspondingTableRowz[i].clientHeight;
			console.log("correspondingRowHeight");
			tableRowz[i].style.height = correspondingRowHeight + "px";

			//FIND TOPMOST POINT
			y1 = currentRow.getBoundingClientRect().top /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;
			console.log("y1: " + y1);
		}
		var deleteThis = tablePart.querySelectorAll('.deleteThis');
		for (k = 0; k < deleteThis.length; k++) {
			console.log("deleteThis: " + deleteThis);
			deleteThis[k].remove(); //REMOVE THE CELL WITH CLASS "deleteThis"
		}
	}
}

function btn_buildLegendTable() {
	rowListeners();
	cellListeners();
	resetClasses();
	deselectEmptyCell();
	buildLegendTable();
	legendHeight();
}
/****************************************************************************************/
/****************************************************************************************/

/*ISERT DIV******************************************************************************/

var input4divName = document.getElementById('divName'); //GETS INPUT BOX
var input4divClass = document.getElementById('divClass'); //GETS INPUT BOX

function createDIV() {
	var dName = input4divName.value;
	var dClass = input4divClass.value;
	
	var dIVwtLabel = document.createElement('DIV');
	dIVwtLabel.classList.add(dClass);
	dIVwtLabel.innerHTML = dName;
	dIVwtLabel.style.backgroundColor = 'pink';
//	dIVwtLabel.style.margin = '2px';
//	dIVwtLabel.style.padding = '5px';

	selectedCell.appendChild(dIVwtLabel);
	
		rowListeners();
	cellListeners();
	resetClasses();
	deselectEmptyCell();
	buildLegendTable();
	legendHeight();
}
/****************************************************************************************/
