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
	//before redrawing svg-connectors, the old ones have to be removed or else there will be duplicates. So
	//Check if there are svg-connectors. If there are, remove them
	if (document.querySelectorAll('.svg-connectors')) {
		var allLeaderLines = document.querySelectorAll('.svg-connectors');
		// Remove all existing lines.
		for (k = 0; k < allLeaderLines.length; k++) {
			allLeaderLines[k].remove();
		}
	}

	var startElement, endElement;
	/*THIS SEARCHES FOR ALL MEMBERS OF A divClassName ATTRIBUTE IN EACH COL-CLASS COULUMN*/
	if (storyLineTable.querySelector('div[divclassname]')) {
		if (connectAccording2RowNames == 0) {
			for (i = 0; i < divClassAttributeArray.length; i++) {
				var currentColCellClassListArray = [];
				var firstDivofClassFound = 0;

				//CHECK IF NUMBER OF DIVS IN DIV CLASS IS MORE THAN ONE AND THAT ATLEAST TWO OF THEM ARE NOT IN HIDDEN CELL
				var allDivsOfCurrentDivClassAttribute = storyLineTable.querySelectorAll('[divClassName=' + divClassAttributeArray[i] + ']');
				var areConnectableDivsOfClassAttributeMoreThanOne;
				var connectableDivsCount = 0;
				//IGNORE DIV-CLASSES THAT HAVE ONLY ONE DIV IN THEM
				if (allDivsOfCurrentDivClassAttribute.length > 1) {
					for (j = 0; j < allDivsOfCurrentDivClassAttribute.length; j++) {
						var divParentCell = allDivsOfCurrentDivClassAttribute[j].parentElement;
						var divCellParentRow = divParentCell.parentElement;
						if ((divParentCell.style.display != 'none') && (divCellParentRow.style.display != 'none')) {
							connectableDivsCount = connectableDivsCount + 1;
						}
						if (connectableDivsCount > 1) {
							areConnectableDivsOfClassAttributeMoreThanOne = 'yes';
							break;
						}
						areConnectableDivsOfClassAttributeMoreThanOne = 'no';
					}
				} else {
					areConnectableDivsOfClassAttributeMoreThanOne = 'no';
				}

				//IGNORE DIV-CLASSES THAT HAVE ONLY ONE CONNECTABLE DIV IN THEM
				//a connectable div is a div that is in a cell that is not hidden
				if (areConnectableDivsOfClassAttributeMoreThanOne == 'yes') {
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
		} else if (connectAccording2RowNames == 1) {
			//instead of checking the whole StoryLine Table it is not to check each storyline timeline section
			//it is like checking different tables
			//SUGGESTED APPROACHES TO GETTING THIS DONE
			//check for the rowName of each divs parent row and connect them only if their parent rows have the same rowName--OR
			//make a list of all the divClasses in a rowName region 
			//search all the col-X clsses in a rowName region 

			/*CHECKING ONE AFTER THE OTHER THROUGH THE ALL ROWNAMES*/
			for (a = 0; a < rowNamesArray.length; a++) {

				var arrrayOfCellsOfEachColXofRowName = [];
				//this is to be an array of arrays
				//this array is to be made up of arrays of cells belonging to each col-x in each row bearing the rowName
				//for example, all the col-1 cells in each row of the same rowName will be put together into an array and so on
				//then all the arrays will be put into this arrrayOfCellsOfEachColXofRowName

				var rowsOfCurrentRowName = storyLineTable.querySelectorAll(`[rowname="` + rowNamesArray[a] + `"]`); //a rowName may have one or more rows
				var divArrayOfTheRowsOfCurrentRowName = []; //collection of divs belonging to each row of rowName
				var cDIVSa; //short form for the above
				var arrayOfDivClassesThatAppearMoreThanOnceInRowName = []; //i.e., divClassNames that appear more than once. These will be the ones that can be connnected
				var TRUEcDIVSa = []; //collection of classNameDivs with at least two of them not in a cell or row set to display none  
				var firstConnectableArray = [];

				/*CHECKING ONE AFTER THE OTHER THROUGH THE ROWS BEARING THE CURRENT ROWNAME*/
				for (b = 0; b < rowsOfCurrentRowName.length; b++) {
					//Check in the current row for divs with attribute of divClassName
					var divsOfCurrentRowOfRowsOfCurrentRowName = rowsOfCurrentRowName[b].querySelectorAll('div[divclassname]');
					//Build the array of divClassNames
					var firstConnectableDiv = null;
					var secondConnectableDiv = null;

					//Building collection of divClassNames in rows of rowName
					for (c = 0; c < divsOfCurrentRowOfRowsOfCurrentRowName.length; c++) {
						var dv = divsOfCurrentRowOfRowsOfCurrentRowName[c];
						var dvCLASSnm = dv.getAttribute('divclassname'); //get className of div
						var isDivConnectable = 'no';
						var dvParentCell = dv.parentElement;
						var dvParentRow = dvParentCell.parentElement;

						//Check if there is another div with same divClassName
						if ((divArrayOfTheRowsOfCurrentRowName.indexOf(dvCLASSnm) != -1) && (arrayOfDivClassesThatAppearMoreThanOnceInRowName.indexOf(dvCLASSnm) == -1)) {
							arrayOfDivClassesThatAppearMoreThanOnceInRowName.push(dvCLASSnm);
							cDIVSa = arrayOfDivClassesThatAppearMoreThanOnceInRowName;
						}

						//Check if parents are not displayed 'none'
						if ((dvParentCell.style.display != 'none') && (dvParentRow.style.display != 'none')) {
							//If firstConnecatbleDiv does not yet exist then make this the first one
							if (firstConnectableArray.indexOf(dvCLASSnm) == -1) {
								firstConnectableArray.push(dvCLASSnm);
							}
							//else, make this the secondConnecatbleDiv
							else if (TRUEcDIVSa.indexOf(dvCLASSnm) == -1) {
								TRUEcDIVSa.push(dvCLASSnm);
							}
						}

						//Add dvCLASSnm to divArrayOfTheRowsOfCurrentRowName only if it doesn't exist in the array
						if (divArrayOfTheRowsOfCurrentRowName.indexOf(dvCLASSnm) == -1) {
							divArrayOfTheRowsOfCurrentRowName.push(dvCLASSnm);
						}
					}
				}
				//Now connect the divs of the TRUEcDIVSa array of this rowName
				//Search in each col-x class in each row of the rowName group
				for (j = 0; j < arrayOfAllColClasses.length; j++) {
					var rowNameColClassArray = [];
					for (c = 0; c < rowsOfCurrentRowName.length; c++) {
						//Check currrent rowName row for current col-x class
						rowNameColClassArray.push(rowsOfCurrentRowName[c].querySelector('.' + arrayOfAllColClasses[j]));
					}
					arrrayOfCellsOfEachColXofRowName.push(rowNameColClassArray);
				}
				var colClasses2skip = [];
				for (f = 0; f < TRUEcDIVSa.length; f++) {

					var firstDivofClassFound = 0;
					var endElement = null;
					var startElement = null;

					var countedDivCellIndex = null;
					var oldCountedDivCellIndex;
					var skipCell;

					//					console.log('colClasses2skip:');
					//					console.log(colClasses2skip);
					if ((colClasses2skip == null) || (colClasses2skip.indexOf(TRUEcDIVSa[f]) == -1)) {

						for (d = 0; d < arrrayOfCellsOfEachColXofRowName.length; d++) {

							for (e = 0; e < arrrayOfCellsOfEachColXofRowName[d].length; e++) {

								var divWithCurrentDivClassNameinColumn = arrrayOfCellsOfEachColXofRowName[d][e].querySelector(`[divclassname="` + TRUEcDIVSa[f] + `"]`);

								//find cell in rowName column that has the div with the current divClassName (TRUEcDIVSa[f])
								if (divWithCurrentDivClassNameinColumn) {
									var currentColCell = divWithCurrentDivClassNameinColumn.parentElement;
//									console.log(colClasses2skip);
									console.log(currentColCell);
									countedDivCellIndex = currentColCell.cellIndex;

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
													if (colClasses2skip.indexOf(currentColCellClassList[l]) == -1) {
														colClasses2skip.push(currentColCellClassList[l]);
													}
												}
											}
											break;
										}
										break;
									} else if (firstDivofClassFound == 1) {
										console.log(currentColCell);
										if ((currentColCell == skipCell)&&(colClasses2skip)) {
											break;
										}
										if (currentColCell != skipCell) {
											endElement = divWithCurrentDivClassNameinColumn
											////////////////////////////////////////
											drawConnector(startElement, endElement, TRUEcDIVSa[f]);
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
													console.log(currentColCellClassList[l]);
													console.log(currentColCellClassList.length);
													if (currentColCellClassList[l].slice(0, prefixLength) == prefix) {
														if (colClasses2skip.indexOf(currentColCellClassList[l]) == -1) {
															colClasses2skip.push(currentColCellClassList[l]);
															console.log('colClasses2skip:');
															console.log(colClasses2skip);
														}
													}
													//												break;
												}
												break;
											}

										}
										break;
									}
								}
							}
						}
					}
					colClasses2skip = [];
				}
			}
		}
	}
}


//REDRAW THE LINES EVERYTIME THE WINDOW IS RESIZED
window.addEventListener("resize", connectAllDraggableDivsWithSVGLines);
//window.addEventListener("wheel", connectAllDraggableDivsWithSVGLines);
//window.addEventListener("resize", drawConnector(startElement, endElement));
