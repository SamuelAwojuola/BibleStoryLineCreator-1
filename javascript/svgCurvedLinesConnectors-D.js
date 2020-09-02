//SVG PATH
function nodesconnector(pathXYcord, divClassLineConnects) {

	var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	document.getElementById("svg").appendChild(path1);

	//	path1.setAttributeNS(null, pathXYcord);
	path1.setAttributeNS(null, "d", pathXYcord);
	//	path1.setAttributeNS(null, "stroke", "pink");
	path1.setAttributeNS(null, "stroke-width", 20);
	path1.setAttributeNS(null, "opacity", 0.7);
	path1.setAttributeNS(null, "fill", "none");
	path1.classList.add("svg-connectors");
	path1.classList.add(divClassLineConnects);
}


// CREATE SVG CONNECTOR PATHS
//var startElement = document.querySelector("#a");
//var endElement = document.querySelector("#b");
// var connector = document.querySelector("#connector");

function drawConnector(X, Y, divClassforColor) {

	var svgMasterTop = svgMaster.getBoundingClientRect().top;
	var svgMasterLeft = svgMaster.getBoundingClientRect().left;
	var pageScrollX = documentHTML.scrollLeft;
	var pageScrollY = documentHTML.scrollTop;

	var A = getCoordinates(X);
	var B = getCoordinates(Y);
	var posnA = {
		x: A.rightCenterX - svgMasterLeft - pageScrollX,
		y: A.rightCenterY - svgMasterTop - pageScrollY
	};
	var posnB = {
		x: B.leftCenterX - svgMasterLeft - pageScrollX,
		y: B.leftCenterY - svgMasterTop - pageScrollY
	};
	var dStr =
		"M" +
		(posnA.x) + "," + (posnA.y) + " " +
		"C" +
		(posnA.x + 100) + "," + (posnA.y) + " " +
		(posnB.x - 100) + "," + (posnB.y) + " " +
		(posnB.x) + "," + (posnB.y);
	//	connector.setAttribute("d", dStr);
	nodesconnector(("M" +
		(posnA.x) + "," + (posnA.y) + " " +
		"C" +
		(posnA.x + 100) + "," + (posnA.y) + " " +
		(posnB.x - 100) + "," + (posnB.y) + " " +
		(posnB.x) + "," + (posnB.y)), 'opt_' + divClassforColor);
}

//drawConnector(startElement, endElement);
//use the divClassAttributeArray to link all divs of the same className
var connectAllDraggableDivsWithSVGLines = function () {
	if (document.querySelectorAll('.svg-connectors')) {
		var allLeaderLines = document.querySelectorAll('.svg-connectors');
		// Remove all existing lines.
		for (k = 0; k < allLeaderLines.length; k++) {
			allLeaderLines[k].remove();
		}
	}
	var startElement, endElement;


	/*THIS SEARCHES FOR ALL MEMBERS OF A divClassName ATTRIBUTE IN EACH COL-CLASS COULUMN*/
	for (i = 0; i < divClassAttributeArray.length; i++) {
		var currentColCellClassListArray = [];
		var firstDivofClassFound = 0;

		//LOOK FOR DIV WITH THE CURRENT DIVCLASS ATTRIBUTE VALUE IN EACH COLUMN OF THE STORYLINE TABLE
		for (j = 0; j < arrayOfAllColClasses.length; j++) {

			if ((currentColCellClassListArray == null) || (currentColCellClassListArray.indexOf(arrayOfAllColClasses[j]) == -1)) {

				var currentColumn = arrayOfAllColClasses[j];
				var currentColumnClass = '.' + currentColumn;
				var currentColumnCells = storyLineTable.querySelectorAll(currentColumnClass);

				//To store the index of a cell that has already been counted so that it is not counted twice which happens if it is a cell with more than one col-x classes, i.e., if it is a cell spanning more than one cell
				var countedDivCellIndex = null;
				var oldCountedDivCellIndex;
				var skipCell;

				//LOOK FOR DIV WITH THE CURRENT DIVCLASS ATTRIBUTE VALUE IN THE CELLS OF EACH COLUMN 
				for (k = 0; k < currentColumnCells.length; k++) {

					var currentColCell = currentColumnCells[k];


					//ONLY COUNT DIVS IN CELLS THAT ARE NOT HIDDEN
					if (currentColCell.style.display != 'none') {

						countedDivCellIndex = currentColCell.cellIndex;

						var divWithCurrentDivClassNameinColumn = currentColCell.querySelector('[divClassName=' + divClassAttributeArray[i] + ']');

						if ((oldCountedDivCellIndex != countedDivCellIndex) && (divWithCurrentDivClassNameinColumn) && (skipCell != currentColCell)) {
							if (firstDivofClassFound == 0) {
								startElement = divWithCurrentDivClassNameinColumn;
								firstDivofClassFound = 1;

								oldCountedDivCellIndex = countedDivCellIndex;

								if (currentColCell.colSpan > 1) {
									skipCell = currentColCell;

									//GET ARRAY OF COL-X CLASSES
									//and skip them
									var prefix = 'col-';
									var prefixLength = prefix.length;
									var currentColCellClassList = currentColCell.classList;
									for (l = 0; l < currentColCellClassList.length; l++) {
										if (currentColCellClassList[l].slice(0, prefixLength) == prefix) {
											currentColCellClassListArray.push(currentColCellClassList[l]);
										}
									}
									break;
								}
							} else if (firstDivofClassFound == 1) {
								endElement = divWithCurrentDivClassNameinColumn
								////////////////////////////////////////
								drawConnector(startElement, endElement, divClassAttributeArray[i]);
								////////////////////////////////////////
								startElement = divWithCurrentDivClassNameinColumn
								oldCountedDivCellIndex = countedDivCellIndex;

								if (currentColCell.colSpan > 1) {
									skipCell = currentColCell;

									//GET ARRAY OF COL-X CLASSES
									//and skip them
									var prefix = 'col-';
									var prefixLength = prefix.length;
									var currentColCellClassList = currentColCell.classList;
									for (l = 0; l < currentColCellClassList.length; l++) {
										if (currentColCellClassList[l].slice(0, prefixLength) == prefix) {
											currentColCellClassListArray.push(currentColCellClassList[l]);
										}
									}
								}
								break;
							}
						}
					}
				}
			}
		}
	}
}


//REDRAW THE LINES EVERYTIME THE WINDOW IS RESIZED
window.addEventListener("resize", connectAllDraggableDivsWithSVGLines);
//window.addEventListener("wheel", connectAllDraggableDivsWithSVGLines);
//window.addEventListener("resize", drawConnector(startElement, endElement));
