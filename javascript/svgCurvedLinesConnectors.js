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
	//To get the distance scrolled within the divTableContainer to be added to the coordinates
	//LEFT SCROLL
	var current_StoryLineTable_Left_Coord = storyLineTable.getBoundingClientRect().left;//the current scroll position
	var storyLineTableScrollXDiff = onPageLoad_StoryLineTable_Left_Coord - current_StoryLineTable_Left_Coord;//the currenct scroll position subracted from the original scroll position
	
	var current_divTableContainer_Left_Coord = divTableContainer.getBoundingClientRect().left;//the current scroll position
	var divTableContainerScrollXDiff = onPageLoad_divTableContainer_Left_Coord - current_divTableContainer_Left_Coord;//the currenct scroll position subracted from the original scroll position
	
	//DOWN SCROLL
	var current_StoryLineTable_Top_Coord = storyLineTable.getBoundingClientRect().top;
	var storyLineTableScrollYDiff = onPageLoad_StoryLineTable_Top_Coord - current_StoryLineTable_Top_Coord;
	
	var current_divTableContainer_Top_Coord = divTableContainer.getBoundingClientRect().top;
	var divTableContainerScrollYDiff = onPageLoad_divTableContainer_Top_Coord - current_divTableContainer_Top_Coord;
	/**********************************************/
	
	var A = getCoordinates(X);
	var B = getCoordinates(Y);
	var posnA = {
		x: A.rightCenterX - onPageLoad_divTableContainer_Left_Coord + storyLineTableScrollXDiff - divTableContainerScrollXDiff,
		y: A.rightCenterY + 1.5 + storyLineTableScrollYDiff - divTableContainerScrollYDiff
	};
	var posnB = {
		x: B.leftCenterX - onPageLoad_divTableContainer_Left_Coord + storyLineTableScrollXDiff - divTableContainerScrollXDiff,
		y: B.leftCenterY + 1.5 + storyLineTableScrollYDiff - divTableContainerScrollYDiff
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
	
	/**********************************************************************/
	/*THIS SEARCHES FOR ALL MEMBERS OF A divClassName FROM CELL TO CELL IN A ROW AND FROM ROW TO ROW*/
	/*
	for (i = 0; i < divClassAttributeArray.length; i++) {
		var divsOfDivClassName = storyLineTable.querySelectorAll('[divClassName=' + divClassAttributeArray[i] + ']');
				for (j = 0; j < divsOfDivClassName.length; j++) {
					if (j == 0) {
						startElement = divsOfDivClassName[j]
					} else {
						endElement = divsOfDivClassName[j]
						////////////////////////////////////////
						drawConnector(startElement, endElement);
						////////////////////////////////////////
						startElement = divsOfDivClassName[j]
					}
				}
	}
	*/
	/**********************************************************************/


	/*THIS SEARCHES FOR ALL MEMBERS OF A divClassName ATTRIBUTE IN EACH COL-CLASS COULUMN*/
	for (i = 0; i < divClassAttributeArray.length; i++) {
		var firstDivofClassFound = 0;

		//LOOK FOR DIV WITH THE CURRENT DIVCLASS ATTRIBUTE VALUE IN EACH COLUMN OF THE STORYLINE TABLE
		for (j = 0; j < arrayOfAllColClasses.length; j++) {
			
			var currentColumn = arrayOfAllColClasses[j];
			var currentColumnClass = '.' + currentColumn;
			var currentColumnCells = storyLineTable.querySelectorAll(currentColumnClass);

			//LOOK FOR DIV WITH THE CURRENT DIVCLASS ATTRIBUTE VALUE IN THE CELLS OF EACH COLUMN 
			for (k = 0; k < currentColumnCells.length; k++) {
				var divWithCurrentDivClassNameinColumn = currentColumnCells[k].querySelector('[divClassName=' + divClassAttributeArray[i] + ']');
				if ((firstDivofClassFound == 0) && (divWithCurrentDivClassNameinColumn)) {
					startElement = divWithCurrentDivClassNameinColumn;
					firstDivofClassFound = 1;
				} else if ((firstDivofClassFound == 1) && (divWithCurrentDivClassNameinColumn)) {
					endElement = divWithCurrentDivClassNameinColumn
					////////////////////////////////////////
					drawConnector(startElement, endElement, divClassAttributeArray[i]);
					////////////////////////////////////////
					startElement = divWithCurrentDivClassNameinColumn
				}
			}
		}

	}
}


//REDRAW THE LINES EVERYTIME THE WINDOW IS RESIZED
window.addEventListener("resize", connectAllDraggableDivsWithSVGLines);
//window.addEventListener("wheel", connectAllDraggableDivsWithSVGLines);
//window.addEventListener("resize", drawConnector(startElement, endElement));
