function buildLegendTable() {

	var legendTable = document.querySelector('#legendTable');
	var legendTableHead = legendTable.querySelector('thead');
	var legendTableBody = legendTable.querySelector('tbody');

	var storyLineTable = document.querySelector('#storyLineTable');
	var storyTableHead = storyLineTable.querySelector('thead');
	var storyTableBody = storyLineTable.querySelector('tbody');
	var storyTableHeadRowz = storyTableHead.querySelectorAll('tr');
	var storyTableBodyRowz = storyTableBody.querySelectorAll('tr');


	//CLEAR ALL ROWS
	if (clear) {
		var trClear = legendTable.querySelectorAll("tr");
		for (i = 0; i < trClear.length; i++) {
			trClear[i].remove();
		}
	}


	//CREATE <TR> TO APPEND TO LEGEND-TABLE
	function newLTrow(heightAtt, newTRtxt, appendHere, shouldRowBeCreated) {
		if (shouldRowBeCreated == "yes") {
			var newTR = document.createElement('TR');
			var newTD = document.createElement('TD');
			var newH1 = document.createElement('H3');

			var hAtt = heightAtt || null;
			newTD.style.height = hAtt;

			var nTR = newTRtxt || null;
			newH1.innerHTML = nTR;

			newTR.setAttribute('rowname', newTRtxt);

			appendHere.appendChild(newTR).appendChild(newTD).appendChild(newH1);
			console.log(newTR);
		}
	}
	var rowName1;
	var rowName2;
	var x1 = null;
	var x2 = null;
	var currentRow;
	var y1;
	var y2;
	var lgnd_height;
	var goAhead;

	//LOOP THROUGH ROWS IN THE STORYLINE TABLE TO CREATE CORRESPONDING ROWS IN THE LEGEND TABLE
	//FOR THEAD ROWS
	function tableBuildation(rowZtoCheck, rowZgoWhere) {

		for (i = 0; i < storyTableHeadRowz.length; i++) {

			var rowName1 = storyTableHeadRowz[i].getAttribute('rowname'); //GET ROWNAME VALUE OF THE CURRENT STORYTABLE ROW

			if (x1 != null) {
				x2 = rowName1;
				/*var storyTableHeadRowHeight = storyTableHeadRowz[i].clientHeight; //GET HEIGHT OF THE CORRENT STORYTABLE ROW
				var hght = storyTableHeadRowHeight;*/

				//FIND TOP OF THIS ROW TO SUBTRACT FROM BOTTOM OF NEXT ROW (IF THEIR NAMES ARE THE SAME)
				//			y1 = storyTableHeadRowz[i].getBoundingClientRect().top;

				if (x1 == x2) {

					//FIND BOTTOM OF THE CURRENT ROW TO SUBTRACT THE TOP OF THE y1 ROW FROM IT
					y2 = storyTableHeadRowz[i].getBoundingClientRect().top + storyTableHeadRowz[i].clientHeight /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;
					hght = (y2 - y1) + "px";

					/*  console.log("tableRowz[i]: " + tableRowz[i]);
						console.log("y2: " + y2);
						console.log("lgnd_height: " + lgnd_height);   */

					x1 = x2;
				} else if (x1 != x2) {

					goAhead = "yes";

					x1 = rowName1;
					currentRow = tableRowz[i];

					//FIND TOPMOST POINT
					y1 = storyTableHeadRowz[i].getBoundingClientRect().top;
				}
			} else if (x1 == null) /* x1 will only be null the very first time */ {
				x1 = rowName1;

				var storyTableHeadRowHeight = storyTableHeadRowz[i].clientHeight; //GET HEIGHT OF THE CORRENT STORYTABLE ROW
				console.log("storyTableHeadRowHeight");

				var hght = storyTableHeadRowHeight + "px";

				//FIND TOPMOST POINT
				y1 = storyTableHeadRowz[i].getBoundingClientRect().top /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;
				console.log("y1: " + y1);

				/* x1 will only be null the very first time */
				if (storyTableBodyRowz.length == 1) {
					goAhead = "yes";
				}
			}
			newLTrow(hght, ROW_NAME, legendTableHead, goAhead)
		}
	}
	tableBuildation(storyTableHeadRowz, legendTableHead);
	tableBuildation(storyTableBodyRowz, legendTableBody);
	clear = 1;
}
