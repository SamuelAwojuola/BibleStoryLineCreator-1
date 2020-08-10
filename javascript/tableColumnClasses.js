//FROM USEFUL SCRIPTS FOLDER

//THIS WILL ADD CLASSES [e.g, col-1, col-2, col-3, etc.] TO ALL <td>s INDICATING THE COLUMN EACH BELONGS TO
//A <td> with, for example, 'colspan = 5', will have five col-x classes
//To hide a column, a class will be targeted and it is the cells that will be hidden and not the classes.
//The hidden col-x class will be changed to col-x-hidden
//If there is no col-x class, it means that that cell is to be hidden
//To restore a column, the col-x-hidden will be restored to col-x
//The colspan value of a cell with colspan will be made equal to the number of  class-x'es it has.

var arrayOfAllColClasses = [];

function generateColumnClasses() {

	var ArrayOfAllTds = document.getElementsByTagName("td");
	var customIndex = 0;
	customIndex = customIndex++;

	//TO ADD CUSTOM CLASSES TO THE <TD>
	for (var i = 0; i < ArrayOfAllTds.length; i++) {
		if (!ArrayOfAllTds[i].hasAttribute("colspan")) {
			ArrayOfAllTds[i].setAttribute("colspan", 1)
		}
		var tdsIndexInItsRow = ArrayOfAllTds[i].cellIndex;
		var TD = ArrayOfAllTds[i];

		//FOR FIRST <td> IN A ROW
		if (tdsIndexInItsRow == 0) {
			var colSpan = tdsIndexInItsRow + 1;
			var colClass = "col-" + colSpan;
			TD.classList.add(colClass);
			customIndex = 1;

			//FOR IF THE FIRST <td> IN THE ROW HAS A "colspan" ATTRIBUTE
			if (TD.hasAttribute("colspan")) {
				var colSpan2 = TD.getAttribute("colspan");

				for (var cI = 1; cI < colSpan2; cI++) {
					var colSpan = cI + 1;
					var colClass = "col-" + colSpan;
					TD.classList.add(colClass);
					customIndex = customIndex + 1;
					//TO SAVE THE ORGINAL COLSPAN AS ANOTHER MADE-UP ATTRIBUTE
					TD.setAttribute("originalcolspan", colSpan);
				}
			}
		}

		//FOR OTHER <td> IN A ROW
		else {

			var colSpan = customIndex + 1;
			var colClass = "col-" + colSpan;
			TD.classList.add(colClass);
			customIndex = customIndex + 1;
			//			alert(customIndex);

			//FOR IF THE OTHER <td>s APART FROM THE FIRST IN THE ROW HAS A "colspan" ATTRIBUTE
			if (TD.hasAttribute("colspan")) {
				var colSpan2 = TD.getAttribute("colspan");

				//TO SAVE THE ORGINAL COLSPAN AS ANOTHER MADE-UP ATTRIBUTE
				TD.setAttribute("originalcolspan", colSpan2);

				for (var cI = 1; cI < colSpan2; cI++) {
					var colSpan = customIndex + 1;
					var colClass = "col-" + colSpan;
					TD.classList.add(colClass);
					customIndex = customIndex + 1;
				}
			}
		}

	if (arrayOfAllColClasses.indexOf(colClass) == -1) {
		arrayOfAllColClasses.push(colClass)
	}
	}
}

/*function deleteCol_xClasses() {
	var ArrayOfAllTds = document.getElementsByTagName("td");
	for (var i = 0; i < ArrayOfAllTds.length; i++) {
		var classlist = ArrayOfAllTds[i].classList;
		for (j = 0; j < classlist.length; j++) {
			if (classlist[j].match(/^(col-\d+)$/)) {
				classlist.remove(classlist[j])
			}
		}
	}
}*/
