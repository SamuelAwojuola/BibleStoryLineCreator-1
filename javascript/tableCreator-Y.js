var storyLineTable = document.getElementById('storyLineTable');
var TypeOfHtmlHeader = 'H4';
var celldeselect;
var tblReady;
var selectedCell;
var clickedDIV;
var divNameArray = [];
var divClassArray = [];
var divClassAttributeArray = [];


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
	/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
	var tdsWithDragOverELAddedClass = storyLineTable.querySelectorAll('.dragOverELAdded');
	if (tdsWithDragOverELAddedClass) {
		for (i = 0; i < tdsWithDragOverELAddedClass.length; i++) {
			tdsWithDragOverELAddedClass[i].classList.remove('dragOverELAdded');
		}
	}
	var divsWithdragEventListnerAddedClass = storyLineTable.querySelectorAll('.dragEventListnerAdded');
	if (divsWithdragEventListnerAddedClass.length != 0) {
		for (i = 0; i < divsWithdragEventListnerAddedClass.length; i++) {
			divsWithdragEventListnerAddedClass[i].classList.remove('dragEventListnerAdded');

			/*TO REBUILD THE divClassAttributeArray**********************/
			var divClassNameAttrValue = divsWithdragEventListnerAddedClass[i].getAttribute('divClassName');
			//ADD THE CLASS TO THE ARRAY IF IT DOESN'T ALREADY EXIST IN IT
			if (divClassAttributeArray.indexOf(divClassNameAttrValue) == -1) {
				divClassAttributeArray.push(divClassNameAttrValue)
			}
			/************************************************************/
		}

		connectAllDraggableDivsWithSVGLines();
		//		dragDiv2TD();
		divListeners();
		if (clickedCell) {
			deselectEmptyCell();
		}
		buildLegendTable();
		resetClasses();
	}
	/*****************************************/
	else {
		generateColumnClasses();
	}
	buildLegendTable();
}

function analyzeTable() {
	rowListeners();
	cellListeners();
	resetClasses();
	deselectEmptyCell();
	buildLegendTable();

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
/***********************************************************************/

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

//FIND INDEX OF CLICKED DIV

function divListeners() {
	var cells = storyLineTable.querySelectorAll('td');
	var allDivs;
	for (i = 0; i < cells.length; i++) {
		allDivs = cells[i].querySelectorAll('div');

		for (j = 0; j < allDivs.length; j++) {
			var divClickCounter = 0;

			allDivs[j].onclick = function () {
				//				var divHasBeenClicked;
				//				console.log(divHasBeenClicked);
				clickedDIV = this;
				var initialColor = this.style.backgroundColor;
				this.style.backgroundColor = "lightgrey";
				setTimeout(() => [clickedDIV.style.backgroundColor = initialColor], 2000)
				setTimeout(() => [clickedDIV = null], 2000)
			}
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
	generateColumnClasses();
	dragDiv2TD();
	divListeners();
}

//CREATE ROW BELOW CLICKED ROW
function createRowBelow() {
	var row = storyLineTable.insertRow(belowRow); //This Determines where the New Row is placed
	var cell1 = row.insertCell(0);

	analyzeTable();
	generateColumnClasses();
	dragDiv2TD();
	divListeners();
}

//CLONE ROW ABOVE CLICKED ROW
function cloneRowAbove() {
	var itm = storyLineTable.querySelectorAll('tr')[newIrow || aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.before(cln);
	/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED****************************************/
	var clonedRowTds = cln.querySelectorAll('.dragOverELAdded');
	if (clonedRowTds) {
		for (i = 0; i < clonedRowTds.length; i++) {
			clonedRowTds[i].classList.remove('dragOverELAdded');
		}
	}
	var divsInClonedRow = cln.querySelectorAll('.dragEventListnerAdded');
	if (divsInClonedRow) {
		for (i = 0; i < divsInClonedRow.length; i++) {
			divsInClonedRow[i].classList.remove('dragEventListnerAdded')
		}
	}
	/*****************************************/
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
	//	generateColumnClasses();
	dragDiv2TD();
	divListeners();


}

//CLONE ROW BELOW CLICKED ROW

function cloneRowBelow() {
	var itm = storyLineTable.querySelectorAll('tr')[aboveRow];
	var cln = itm.cloneNode(true);
	var clonedRow = itm.after(cln);
	/*TO REMOVE THE DRAGOVER CLASSES USED TO PREVENT ADDITION OF DTAGOVER RELATED EVENT-LISTNERS SO THAT THOSE EVENT-LISTNERS CAN BE ADDED TO THEM****************************************/
	var clonedRowTds = cln.querySelectorAll('.dragOverELAdded');
	if (clonedRowTds) {
		for (i = 0; i < clonedRowTds.length; i++) {
			clonedRowTds[i].classList.remove('dragOverELAdded');
		}
	}
	var divsInClonedRow = cln.querySelectorAll('.dragEventListnerAdded');
	if (divsInClonedRow) {
		for (i = 0; i < divsInClonedRow.length; i++) {
			divsInClonedRow[i].classList.remove('dragEventListnerAdded')
		}
	}
	/*****************************************/
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
	//	generateColumnClasses();
	dragDiv2TD();
	divListeners();

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
//var z = 1;

function createColumnBefore() {
	var row = storyLineTable.querySelectorAll('tr');
	for (j = 0; j < row.length; j++) {
		var cell = row[j].insertCell(newIcell || beforeCell);
		//		cell.innerHTML = 'columnBefore ' + z;
	}
	//	++z;
	newIcell = (newIcell || beforeCell) + 1;
	analyzeTable();
	generateColumnClasses();
	dragDiv2TD();
	divListeners();
}

//CREATE COLUMN AFTER CLICKED COLUMN
function createColumnAfter() {
	var row = storyLineTable.querySelectorAll('tr');
	for (j = 0; j < row.length; j++) {
		var cell = row[j].insertCell(afterCell);
		//		cell.innerHTML = 'columnAfter ' + z;
	}
	//	++z;
	newIcell = (newIcell || afterCell) + 1;
	analyzeTable();
	generateColumnClasses();
	dragDiv2TD();
	divListeners();
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


/************************************************************/
/* CONTROL BUTTONS ACCORDION ********************************/
/************************************************************/
var accordionCancel = document.getElementById('tableBuilderheaderHandle');

var minMaxAccordion = document.getElementById('max-min');
var draggable = document.getElementById('tableBuilderheader');
var draggableParent = draggable.parentNode;
draggable.style.cursor = 'pointer';

minMaxAccordion.onclick = function () {
	if (draggable.nextElementSibling.style.display == 'none') {
		draggable.nextElementSibling.style.display = '';
		minMaxAccordion.innerHTML = '&#9866;';
	} else {
		draggable.nextElementSibling.style.display = 'none';
		minMaxAccordion.innerHTML = '&#10010;';
	}
}


var tableBuilderSections = document.getElementsByClassName('tableBuilderSections');
for (i = 0; i < tableBuilderSections.length; i++) {
	tableBuilderSections[i].style.cursor = 'pointer';
	var hSib1 = tableBuilderSections[i].nextElementSibling;
	//TO HIDE ALL NEXT SIBLINGS
	while (hSib1 && hSib1.tagName != 'H3') {
		hSib1.style.display = 'none';
		hSib1 = hSib1.nextElementSibling;
	}

	//TO SHOW OR HIDE NEXTSIBLINGS
	tableBuilderSections[i].onclick = function () {
		var h3clicked = this;
		var hSib2 = h3clicked.nextElementSibling;
		for (let j = 0, hSib2 = h3clicked.nextElementSibling;
			((hSib2 != null) && (hSib2.tagName != 'H3')); j++, hSib2 = hSib2.nextElementSibling) {
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


var tableBuilder = document.getElementById('tableBuilder');
var h3 = tableBuilder.getElementsByTagName('h4');
for (i = 0; i < h3.length; i++) {
	h3[i].style.cursor = 'pointer';
	var hSib1 = h3[i].nextElementSibling;
	//TO HIDE ALL THE NEXTSIBLINGS
	while (hSib1) {
		hSib1.style.display = 'none';
		hSib1 = hSib1.nextElementSibling;
	}

	//TO SHOW OR HIDE NEXTSIBLINGS
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
/************************************************************/
/************************************************************/


/************************************************************/
/* ADD HEADING TO CLICKED CELL ******************************/
/************************************************************/
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
/************************************************************/


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

	}
	//	analyzeTable();
}

var arrayOfRowNames = [];


/************************************************************/
/* LEGEND TABLE SCRIPT **************************************/
/************************************************************/

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
		var newH1 = document.createElement(TypeOfHtmlHeader);

		var hAtt = heightAtt || null;
		newTD.style.height = hAtt;

		var nTR = newTRtxt || null;
		newH1.innerHTML = nTR;
		newH1.style.marginBottom = '0';

		newTR.setAttribute('rowname', newTRtxt);

		appendHere.appendChild(newTR).appendChild(newTD).prepend(newH1);
		console.log("newTR::" + newTR);

		x1 = null;
		x2 = null;
	}


	//FOR TBODY ROWS
	function createLegendTable(TRS4rm, TRsection2o) {
		var rowNameCounter = 0;
		var tdsHeight = null;
		var x1 = null;
		var x2 = null;
		var newTRtxt
		var rowName;
		var rowName1 = 1;
		var rowName2 = 1;
		var bottom_Y_otherTRinNameSet;
		var top_Y_firstTRinNameSet;
		var derivedHeight;

		//LOOP THROUGH ROWS TO CREATE
		//FOR THEAD ROWS6
		for (i = 0; i < TRS4rm.length; i++) {

			//create row only when you meet a new row name or when this is the last row you are checking
			//you must have the height and row name ready

			var currentRightTableRow = TRS4rm[i];
			rowName = currentRightTableRow.getAttribute('rowname');
			//Dimensions of currentRightTableROw
			var currentRightTableRowTDtopBorderWidth = (getComputedStyle(currentRightTableRow.cells[0]).borderTopWidth.slice(0, -2));
			var currentRightTableRowTDbottomBorderWidth = (getComputedStyle(currentRightTableRow.cells[0]).borderBottomWidth.slice(0, -2));
			var currentRightTableRowTDpaddingTop = (getComputedStyle(currentRightTableRow.cells[0]).paddingTop.slice(0, -2));
			var currentRightTableRowTDpaddingBottom = (getComputedStyle(currentRightTableRow.cells[0]).paddingBottom.slice(0, -2));
			//The slice(0,-2) is to remove the 'px' at the end of the returned string
			//The '+' is to turn it into an interger since it was originally a string

			var bWt = +currentRightTableRowTDtopBorderWidth;
			var bWb = +currentRightTableRowTDbottomBorderWidth;
			var pT = +currentRightTableRowTDpaddingTop;
			var pB = +currentRightTableRowTDpaddingBottom;

			var createTD = 'no';


			if (rowName1 == 1) {
				rowName1 = rowName;

				tdsHeight = currentRightTableRow.clientHeight - (bWt + bWb + pT + pB - 0.1) + "px";

				if (i == TRS4rm.length - 1) {
					newLTrow(tdsHeight, rowName1, TRsection2o);
				}

				//FIND TOPMOST POINT
				top_Y_firstTRinNameSet = currentRightTableRow.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
			} else if (rowName1 != 1) {
				rowName2 = rowName;

				//CHECK IF ROWNAMES CORRESPOND OR NOT
				if (rowName1 == rowName2) {

					bottom_Y_otherTRinNameSet = currentRightTableRow.getBoundingClientRect().top + currentRightTableRow.clientHeight /*+ (window.pageYOffset || document.documentElement.scrollTop) */ ;

					tdsHeight = (bottom_Y_otherTRinNameSet - top_Y_firstTRinNameSet) - (bWt + bWb + pT + pB - 0.1) + "px";
					rowName1 = rowName2;
					if (i == TRS4rm.length - 1) {
						newLTrow(tdsHeight, rowName1, TRsection2o);
					}

				} else if (rowName1 != rowName2) {

					newLTrow(tdsHeight, rowName1, TRsection2o);
					rowName1 = rowName;

					bottom_Y_otherTRinNameSet = currentRightTableRow.getBoundingClientRect().top + currentRightTableRow.clientHeight //+ (window.pageYOffset || document.documentElement.scrollTop) ;
					tdsHeight = (bottom_Y_otherTRinNameSet - top_Y_firstTRinNameSet) - (bWt + bWb + pT + pB - 0.1) + "px";

					tdsHeight = currentRightTableRow.clientHeight - (bWt + bWb + pT + pB - 0.1) + "px";

					//FIND TOPMOST POINT
					top_Y_firstTRinNameSet = currentRightTableRow.getBoundingClientRect().top //+ (window.pageYOffset || document.documentElement.scrollTop) ;

					if (i == TRS4rm.length - 1) {
						newLTrow(null, rowName1, TRsection2o);
					}
				}
			}
		}

	}
	createLegendTable(st_thd_tr, ltbl_thead);
	createLegendTable(st_tbdy_tr, ltbl_tbody);

	headerClear = 1;
	bodyClear = 1;
	clear = 1;

}

/* SET HEIGHT OF LEGEND CELLS ************************************************************/

function btn_buildLegendTable() {
	dragDiv2TD();
	divListeners();
	if (clickedCell) {
		deselectEmptyCell();
	}
	buildLegendTable();
	//		rowListeners();
	//		cellListeners();
	resetClasses();

}
/****************************************************************************************/
/****************************************************************************************/

/****************************************************************************************/
/*ISERT DIV* *****************************************************************************/
/****************************************************************************************/

var input4divName = document.getElementById('divName'); //GETS INPUT BOX
var input4divClass = document.getElementById('divClass'); //GETS INPUT BOX

function createDIV() {
	var dName = input4divName.value;
	var dClass = input4divClass.value;

	var dIVwtLabel = document.createElement('DIV');
	dIVwtLabel.classList.add('opt_' + dClass);
	dIVwtLabel.classList.add('draggableDiv');
	dIVwtLabel.classList.add('namLabelDiv');
	dIVwtLabel.setAttribute('divClassName', dClass);
	dIVwtLabel.innerHTML = dName;
	//	dIVwtLabel.style.backgroundColor = 'pink';
	dIVwtLabel.setAttribute('draggable', 'true');
	//	dIVwtLabel.onclick = dragDiv2TD;


	selectedCell.appendChild(dIVwtLabel);

	rowListeners();
	cellListeners();
	resetClasses();
	deselectEmptyCell();
	buildLegendTable();

	//ARRAY FOR DIV'S & THEIR CLASSES
	divClassArray.push(dClass)
	divNameArray.push(dName);

	var colorFromArray = cssColorNamesArray[Math.floor(Math.random() * cssColorNamesArray.length)];

	//ADD THE CLASS TO THE ARRAY IF IT DOESN'T ALREADY EXIST IN IT
	if (divClassAttributeArray.indexOf(dClass) == -1) {
		divClassAttributeArray.push(dClass);
		/****************************************/
		/* ASSIGN COLOR TO DIV CLASS ************/
		var headerStyles = document.getElementById('divColorStyles');
		var styles = `.opt_` + dClass + `{ background-color: ` + colorFromArray + `;
        stroke: ` + colorFromArray + ` }`;
		headerStyles.appendChild(document.createTextNode(styles));
		/****************************************/

		/*CREATE DIV MANIPULATOR*****************/
		var divNavSectionOL = document.querySelector('#divList');
		//CREATE LI ELEMENT
		var liToHolddivListName = document.createElement('LI');
		
		//CREATE DIV ELEMENT
		var divListName = document.createElement('DIV');
		divListName.innerHTML = dName;
		//APPEND DIV ELEMENT TO LIST
		liToHolddivListName.appendChild(divClass);
		
		//APPEND INPUT ELEMENT TO LIST
		var divListNameCheckBox = document.createElement('INPUT');
		divListNameCheckBox.setAttribute('type', 'checkbox');
		divListNameCheckBox.setAttribute('value', 'opt_' + dClass);
		
		//APPEND INPUT ELEMENT TO LIST
		liToHolddivListName.appendChild(divListNameCheckBox);
		
		//APPEND LIST ELEMENT TO OL
		divNavSectionOL.appendChild(liToHolddivListName);
		/****************************************/
	}

	divListeners();
	dragDiv2TD();
	connectAllDraggableDivsWithSVGLines();

	/*CREATING THE OPTIONS FOR THE SELECT ELEMENTS*********************************************/
	/******************************************************************************************/
	var divNameSelect = document.getElementById('divNameSelect');
	var divClassSelect = document.getElementById('divClassSelect');
	var dNmoptOccurence = divNameSelect.getElementsByTagName('option');
	var dCloptOccurence = divClassSelect.getElementsByTagName('option');

	var dNmoption = document.createElement('OPTION');
	var dCloption = document.createElement('OPTION');

	dNmoption.text = dName;
	dCloption.text = dClass;

	//FOR DIV-NAMES OPTIONS

	//FILTER DIV-CLASSES ARRAY FOR THE CURRENT dName
	const functionToFilterClass = function (x) {
		return x == dClass;
	}

	// Filter the classarray
	const filteredClass = divClassArray.filter(functionToFilterClass);

	if (filteredClass.length == 1) {
		dCloption.setAttribute('optCounter', filteredClass.length);
		divClassSelect.append(dCloption);
		console.log('asd:' + divClassArray);
	} else if (filteredClass.length > 1) {
		for (j = 0; j < dCloptOccurence.length; j++) {
			if (dCloptOccurence[j].text == dClass) {
				dCloptOccurence[j].setAttribute('optCounter', filteredClass.length);
				break;
			}
		}
	}


	//FILTER DIV-NAMES ARRAY FOR THE CURRENT dName
	const functionToFilterNames = function (x) {
		return x == dName;
	}

	// Filter the namearray
	const filteredName = divNameArray.filter(functionToFilterNames);

	if (filteredName.length == 1) {
		dNmoption.setAttribute('optCounter', filteredName.length);
		divNameSelect.append(dNmoption);
	} else if (filteredName.length > 1) {
		for (i = 0; i < dNmoptOccurence.length; i++) {
			if (dNmoptOccurence[i].text == dName) {
				dNmoptOccurence[i].setAttribute('optCounter', filteredName.length);
				break;
			}
		}
	}


}

function deleteDIV() {

	var divNameSelect = document.getElementById('divNameSelect');
	var divClassSelect = document.getElementById('divClassSelect');
	var dNmoptOccurence = divNameSelect.getElementsByTagName('option');
	var dCloptOccurence = divClassSelect.getElementsByTagName('option');

	clickedDIV.remove();
	let divInnerText = clickedDIV.innerHTML;
	let divClasses = clickedDIV.classList;
	var optClass;
	for (i = 0; i < divClasses.length; i++) {
		if (divClasses[i].includes('opt_')) {
			optClass = divClasses[i].substr(4);
			break;
		}
	}
	//REMOVE FROM RESPECTIVE ARRAYS
	var dNmIdx = divNameArray.indexOf(divInnerText);
	var dClIdx = divClassArray.indexOf(optClass);
	divNameArray.splice(dNmIdx, 1);
	divClassArray.splice(dClIdx, 1);

	//REMOVE FROM OPTIONS
	for (var j = 0; j < dCloptOccurence.length; j++) {
		//				alert(divInnerText);
		if (dCloptOccurence[j].text == divInnerText) {
			var x = dCloptOccurence[j].getAttribute('optCounter');
			dCloptOccurence[j].setAttribute('optCounter', --x);
			if (x == 0) {
				divClassSelect.options[j] = null;
			}
		}
		break;
	}

	for (var i = 0; i < dNmoptOccurence.length; i++) {
		if (dNmoptOccurence[i].text == optClass) {
			var x = dNmoptOccurence[i].getAttribute('optCounter');
			dNmoptOccurence[i].setAttribute('optCounter', --x)
			if (x == 0) {
				divNameSelect.options[i] = null;
			}
		}
		break;
	}

	deselectEmptyCell();
	buildLegendTable();

}
/****************************************************************************************/
