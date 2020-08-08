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



	for (i = 0; i < ltbl_thd_tr.length; i++) {
		rowName1 = ltbl_thd_tr[i].getAttribute('rowname');
		if (x1 != null) {
			x2 = rowName1;
			var correspondingRowHeight = st_thd_all_tr[i].clientHeight;
			console.log("correspondingRowHeight");
			ltbl_thd_tr[i].style.height = correspondingRowHeight + "px";
			if (x1 == x2) {

				//				rowSpanSet = rowSpanSet + 1;
				//				currentRow.setAttribute('rowspan', rowSpanSet)
				ltbl_thd_tr[i].classList.add('deleteThis'); //THIS WILL LATER BE DELETED
				//FIND BOTTOM OF THIS ELEMENT AND SUBTACT THE TOP OF THE CURRENT ROW FROM IT

				//				y2 = ltbl_thd_tr[i].bottomCenterY;
				y2 = ltbl_thd_tr[i].getBoundingClientRect().top + ltbl_thd_tr[i].clientHeight /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;
				lgnd_height = y2 - y1;
				currentRow.style.height = lgnd_height + "px";

				console.log("ltbl_thd_tr[i]: " + ltbl_thd_tr[i]);
				console.log("y2: " + y2);
				console.log("lgnd_height: " + lgnd_height);

				x1 = x2;
			} else if (x1 != x2) {
				x1 = rowName1;
				currentRow = ltbl_thd_tr[i];


				//FIND TOPMOST POINT
				y1 = currentRow.trueY;
			}
		} else if (x1 == null) {
			x1 = rowName1;
			currentRow = ltbl_thd_tr[i];

			var correspondingRowHeight = st_thd_all_tr[i].clientHeight;
			console.log("correspondingRowHeight");
			ltbl_thd_tr[i].style.height = correspondingRowHeight + "px";

			//FIND TOPMOST POINT
			y1 = currentRow.getBoundingClientRect().top /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;
			console.log("y1: " + y1);
		}
		var deleteThis = ltbl_thead.querySelectorAll('.deleteThis');
		for (k = 0; k < deleteThis.length; k++) {
			deleteThis[k].remove(); //REMOVE THE CELL WITH CLASS "deleteThis"
		}
	}

	//FOR TBODY ROWS
	for (i = 0; i < ltbl_tbdy_tr.length; i++) {
		rowName1 = ltbl_tbdy_tr[i].getAttribute('rowname');
		if (x1 != null) {
			x2 = rowName1;
			var correspondingRowHeight = st_tbdy_all_tr[i].clientHeight;
			console.log("correspondingRowHeight");
			ltbl_tbdy_tr[i].style.height = correspondingRowHeight + "px";
			if (x1 == x2) {

				//				rowSpanSet = rowSpanSet + 1;
				//				currentRow.setAttribute('rowspan', rowSpanSet)
				ltbl_tbdy_tr[i].classList.add('deleteThis'); //THIS WILL LATER BE DELETED
				//FIND BOTTOM OF THIS ELEMENT AND SUBTACT THE TOP OF THE CURRENT ROW FROM IT

				//				y2 = ltbl_tbdy_tr[i].bottomCenterY;
				y2 = ltbl_tbdy_tr[i].getBoundingClientRect().top + ltbl_tbdy_tr[i].clientHeight /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;
				lgnd_height = y2 - y1;
				currentRow.style.height = lgnd_height + "px";

				console.log("ltbl_tbdy_tr[i]: " + ltbl_tbdy_tr[i]);
				console.log("y2: " + y2);
				console.log("lgnd_height: " + lgnd_height);

				x1 = x2;
			} else if (x1 != x2) {
				x1 = rowName1;
				currentRow = ltbl_tbdy_tr[i];


				//FIND TOPMOST POINT
				y1 = currentRow.trueY;
			}
		} else if (x1 == null) {
			x1 = rowName1;
			currentRow = ltbl_thd_tr[i];

			var correspondingRowHeight = st_tbdy_all_tr[i].clientHeight;
			console.log("correspondingRowHeight");
			ltbl_tbdy_tr[i].style.height = correspondingRowHeight + "px";

			//FIND TOPMOST POINT
			y1 = currentRow.getBoundingClientRect().top /*+ (window.pageYOffset || document.documentElement.scrollTop)*/ ;
			console.log("y1: " + y1);
		}
		var deleteThis = ltbl_tbody.querySelectorAll('.deleteThis');
		for (k = 0; k < deleteThis.length; k++) {
			deleteThis[k].remove(); //REMOVE THE CELL WITH CLASS "deleteThis"
		}
	}


//	legendHeightSetter(ltbl_thead, ltbl_thd_tr, st_thd_all_tr);
//	legendHeightSetter(ltbl_tbody, ltbl_tbdy_tr, st_tbdy_all_tr);

}




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
				if (x1 == x2) {
					tableRowz[i].classList.add('deleteThis'); //THIS WILL LATER BE DELETED
					
					//FIND BOTTOM OF THIS ELEMENT AND SUBTACT THE TOP OF THE CURRENT ROW FROM IT
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