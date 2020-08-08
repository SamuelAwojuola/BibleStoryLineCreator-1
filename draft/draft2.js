function buildLegendTable() {

	var legendTable = document.querySelector('#legendTable');
	var ltbl_thead = legendTable.querySelector('thead');
	var ltbl_tbody = legendTable.querySelector('tbody');

	var storyLineTable = document.querySelector('#storyLineTable');
	//	storyLineTable;
	var st_thd = storyLineTable.querySelector('thead');
	var st_tbdy = storyLineTable.querySelector('tbody');
	var st_thd_tr = st_thd.querySelectorAll('tr');
	var st_tbdy_tr = st_tbdy.querySelectorAll('tr');


	//CLEAR ALL ROWS
	if (clear) {
		var trClear = legendTable.querySelectorAll("tr");
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

		appendHere.appendChild(newTR).appendChild(newTD).appendChild(newH1);
		console.log(newTR);
	}

	//LOOP THROUGH ROWS TO CREATE
	//FOR THEAD ROWS
	for (i = 0; i < st_thd_tr.length; i++) {
		var newTRtxt = st_thd_tr[i].getAttribute('rowname');
		//		alert(newTRtxt);
		newLTrow(null, newTRtxt, ltbl_thead)
	}

	//FOR TBODY ROWS
	for (i = 0; i < st_tbdy_tr.length; i++) {
		var newTRtxt = st_tbdy_tr[i].getAttribute('rowname');
		//		alert(newTRtxt);
		newLTrow(null, newTRtxt, ltbl_tbody)
	}
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

	var rowSpanSet = 1;
	var rowName1;
	var rowName2;
	var x1 = null;
	var x2 = null;
	var currentRow;
	var y1;
	var y2;
	var lgnd_height;

	function legendHeightSetter(tablePart, tableRowz, correspondingTableRowz) {
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
};

//		legendHeightSetter(ltbl_thead, ltbl_thd_tr, st_thd_all_tr);
		legendHeightSetter(ltbl_tbody, ltbl_tbdy_tr, st_tbdy_all_tr);

}

/****************************************************************************************/
/****************************************************************************************/
