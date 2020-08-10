//SVG PATH
function nodesconnector(pathXYcord) {

	var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	document.getElementById("svg").appendChild(path1);

//	path1.setAttributeNS(null, pathXYcord);
	path1.setAttributeNS(null, "d", pathXYcord);
	path1.setAttributeNS(null, "stroke", "brown");
	path1.setAttributeNS(null, "stroke-width", 10);
	path1.setAttributeNS(null, "opacity", 0.7);
	path1.setAttributeNS(null, "fill", "none");
	path1.classList.add("svg-connectors");
}


// CREATE SVG CONNECTOR PATHS
 var startElement = document.querySelector("#a");
 var endElement = document.querySelector("#b");
// var connector = document.querySelector("#connector");

function drawConnector(X, Y) {
	var A = getCoordinates(X);
	var B = getCoordinates(Y);
	var posnA = {
		x: A.rightCenterX,
		y: A.rightCenterY + 1.5
	};
	var posnB = {
		x: B.leftCenterX,
		y: B.leftCenterY + 1.5
	};
	var dStr =
		"M" +
		(posnA.x) + "," + (posnA.y) + " " +
		"C" +
		(posnA.x + 100) + "," + (posnA.y) + " " +
		(posnB.x - 100) + "," + (posnB.y) + " " +
		(posnB.x) + "," + (posnB.y);
//	connector.setAttribute("d", dStr);
	nodesconnector("M" +
		(posnA.x) + "," + (posnA.y) + " " +
		"C" +
		(posnA.x + 100) + "," + (posnA.y) + " " +
		(posnB.x - 100) + "," + (posnB.y) + " " +
		(posnB.x) + "," + (posnB.y));
}

drawConnector(startElement, endElement);
//use the divClassAttributeArray to link all divs of the same className
var btn_leaderLines = function () {
	if (document.querySelectorAll('.svg-connectors')) {
		var allLeaderLines = document.querySelectorAll('.svg-connectors');
		// Remove all existing lines.
		for (k = 0; k < allLeaderLines.length; k++) {
			allLeaderLines[k].remove();
		}
	}
	var startElement, endElement;
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
}

//REDRAW THE LINES EVERYTIME THE WINDOW IS RESIZED
window.addEventListener("resize", btn_leaderLines);
//window.addEventListener("wheel", btn_leaderLines);
//window.addEventListener("resize", drawConnector(startElement, endElement));

