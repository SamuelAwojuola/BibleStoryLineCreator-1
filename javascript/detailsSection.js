/*FUNCTION TO REMOVE ALL CHILDREN OF PARENT*/
function removeAllChildNodesOf(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/*FUNCTION TO GET COL-X CLASS OF SELECTED CELL*/
//element.getSingleClassWithPrefix(prefix);
//element.getArrayOfClassesWithPrefix(prefix);
function getClassesWithPrefix(node, prefix) {
	var col_xClass;
	var nodeClassList = node.classList;
	var prefixLength = prefix.length;
	for (i = 0; i < nodeClassList.length; i++) {
		if (nodeClassList[i].slice(0, prefixLength) == prefix) {
			col_xClass = nodeClassList[i];
		}
	}
}

//ADD DETAIL KEY ON SELECTION OF ANY CELL
function addDetailKeys() {
	var previouslyShownDetail = document.querySelector('.showDetail');
	var detailsActors = document.getElementById('detailsActors');
	var detailsRegions = document.getElementById('detailsRegions');
//	console.log(storyLineTable.rows[0]);
//	var cellParentName = storyLineTable.rows[clickedRow].parentNode.nodeName;
	var divsInCellLength = selectedCell.querySelectorAll('div[divclassname]').length;
	var cellH4;
	if(selectedCell.querySelector('h4')){cellH4 = selectedCell.querySelector('h4').textContent}
//	console.log(cellH4);

	//if selected cell has label divs
	if ((selectedCell.innerHTML)&&((selectedCell.querySelectorAll('div[divclassname]').length != 0)||(selectedCell.querySelector('h4').textContent != ''))) {

		/*TO GET ACTORS/CHARACTERS IN SELECTED CELL*/
		var actorsInSelectedCell = selectedCell.querySelectorAll('div[divclassname]');

		//remove <li>s in detailsActors <ul> to populate it with new names
		removeAllChildNodesOf(detailsActors);

		//console.log(actorsInSelectedCell.length);
		for (i = 0; i < actorsInSelectedCell.length; i++) {
			var actorClassName = actorsInSelectedCell[i].getAttribute('divclassname');
			var actorPresentAlias;
			var cellDetail_LI = document.createElement('LI');
			cellDetail_LI.innerHTML = actorClassName;
			detailsActors.appendChild(cellDetail_LI)
		}

		/*TO GET LOCATION/REGION OF SELECTED CELL*/
		var location = selectedCell.getAttribute('location') || '';//the selectedCell may or may not have the location attribute
		var cellLocation_LI = document.createElement('LI');
		cellLocation_LI.innerHTML = location;
		removeAllChildNodesOf(detailsRegions);
		//if it has location attribute, then the <li> will be appended 
		if(location != ''){
			detailsRegions.appendChild(cellLocation_LI);
		}


		/*TO GET TIME PERIOD OF SELECTED CELL*/
		var detailsTimePeriods = document.getElementById('detailsTimePeriods');

		removeAllChildNodesOf(detailsTimePeriods);
		//first get the col-x class

		/*FUNCTION TO GET COL-X CLASS OF SELECTED CELL*/
		//to be used to get its time from the corresponding col-x class in the thead
		//the thead was used for time periods
		var col_xClass;
		var nodeClassList = selectedCell.classList;
		for (i = 0; i < nodeClassList.length; i++) {
			if (nodeClassList[i].slice(0, 4) == 'col-') {
				col_xClass = nodeClassList[i];
				col_xClass = "." + col_xClass;
			}
		}

		//get the selected celss time from its corresponding col-x class in the thead
		var storyLineTableTHead = storyLineTable.querySelector('thead');
		var timeRegion = storyLineTableTHead.querySelectorAll(col_xClass);
		for (i = 0; i < timeRegion.length; i++) {
			if ((timeRegion[i].querySelector(TypeOfHtmlHeader) !== null)&&(timeRegion[i].querySelector(TypeOfHtmlHeader).innerHTML !== '')) {
				var timeName = timeRegion[i].querySelector(TypeOfHtmlHeader).innerHTML;
				var cellTime_LI = document.createElement('LI');
				cellTime_LI.innerHTML = timeName;
				detailsTimePeriods.appendChild(cellTime_LI);
			}
		}

		//FUNCTION TO SHOW DETAIL OF SELECTED CELL
		//if selectedCell does not have details
		if (selectedCell.getAttribute('detailIndex') == null) {
			/*FUNCTION TO CREATE DETAIlS*/
			if (selectedCell.getAttribute('detailIndex') == null) {

				detailsCount = detailsCount + 1;

				/*HIDE PREVIOUSLY SHOWN DETAIL IF ANY*/
				if (document.querySelector('.showDetail')) {
					/*var*/ previouslyShownDetail = document.querySelector('.showDetail');
					previouslyShownDetail.classList.add('hideDetail');
					previouslyShownDetail.classList.remove('showDetail');
					previouslyShownDetail.contentEditable = 'false';
				}
				/*************************************/

				var detailsSummary = document.getElementById('detailsSummary');

				var cellDetail_p = document.createElement('P');
				//				cellDetail_p.innerHTML = 'Insert details for selected cell here';
				var cellDetail = document.createElement('DIV');
				cellDetail.classList.add('showDetail');
				cellDetail.id = 'detail_' + detailsCount;
				cellDetail.setAttribute('detailIndex', detailsCount);
				cellDetail.appendChild(cellDetail_p);
				cellDetail.contentEditable = 'true';
				detailsSummary.appendChild(cellDetail);
				``
				//assign the same detail Index to the selected cell to which the detail belongs;
				selectedCell.setAttribute('detailIndex', detailsCount);
			}
		} else if (selectedCell.getAttribute('detailIndex') != null) {
			/*var*/ x = selectedCell.getAttribute('detailIndex');
			//			var y = `#detailsSummary>div:not([detailIndex="` + x + `"])`;
			//			console.log(detailsSection.querySelectorAll(y));

			//find previously selected detail and hide it
			var previouslyShownDetail = document.querySelector('.showDetail');
			if (previouslyShownDetail.getAttribute('detailIndex') != x) {

				previouslyShownDetail.classList.add('hideDetail');
				previouslyShownDetail.classList.remove('showDetail');
				previouslyShownDetail.contentEditable = 'false';

				var detailToShow = detailsSection.querySelector(`div[detailIndex="` + x + `"]`);
				detailToShow.classList.remove('hideDetail');
				detailToShow.classList.add('showDetail');
				/*var detailsToHide = detailsSection.querySelectorAll(y);
				for (i = 0; i < detailsToHide; i++) {
					detailsToHide[i].style.display = 'none';
				}*/
			}
			/*else if (selectedCell.getAttribute('detailIndex') != null) {
				var x = selectedCell.getAttribute('detailIndex');
				var detailToShow = detailsSection.querySelector(`div[detailIndex="` + x + `"]`);
				detailToShow.classList.remove('hideDetail');
				detailToShow.classList.add('showDetail');
			}*/
		}
	} else if (previouslyShownDetail) {
		previouslyShownDetail.contentEditable = 'false';
	}
}

var detailsCount = 0;
var detailsSection = document.getElementById('detailsSection');

/*FOR ADD/EDIT DETAIL BUTTON*/
//to make details editable
function addDetail() {

	if ((selectedCell)&&(selectedCell.innerHTML)) {

		if ((selectedCell.querySelectorAll('div[divclassname]').length != 0)||(selectedCell.querySelector('h4').textContent != '')) {

			/*FUNCTION TO CREATE DETAIlS*/
			if (selectedCell.getAttribute('detailIndex') == null) {

				detailsCount = detailsCount + 1;

				var detailsSummary = document.getElementById('detailsSummary');

				var cellDetail_p = document.createElement('P');
				//				cellDetail_p.innerHTML = 'Insert details for selected cell here';
				var cellDetail = document.createElement('DIV');
				cellDetail.classList.add('showDetail');
				cellDetail.id = 'detail_' + detailsCount;
				cellDetail.setAttribute('detailIndex', detailsCount);
				cellDetail.appendChild(cellDetail_p);
				cellDetail.contentEditable = 'true';
				detailsSummary.appendChild(cellDetail);
				``
				//assign the same detail Index to the selected cell to which the detail belongs;
				selectedCell.setAttribute('detailIndex', detailsCount);
			} else if (selectedCell.getAttribute('detailIndex') != null) {
				var x = selectedCell.getAttribute('detailIndex');

				var detailToShow = detailsSection.querySelector(`div[detailIndex="` + x + `"]`);
				detailToShow.classList.remove('hideDetail');
				detailToShow.classList.add('showDetail');
				detailToShow.contentEditable = 'true';
			}

		} else {
			alert('Selected Cell has no actor')
		}
	} else {
		customAlert('Please, select a cell to add or view its details.')
	}
}
