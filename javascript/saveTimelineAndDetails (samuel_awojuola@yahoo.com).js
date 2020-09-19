//PART OF THE HTML DOVUMNT TO SAVE
//TO CREATE FILE TO SAVE
function saveDynamicDataToFile() {

	var saveText = `---
layout: bibleStoryLineTEMPLATE
title: "` + storyLineTableTitleHeader.innerHTML + `"
categories: Timeline
---
<style id="divColorStyles">` +
		divColorStyles.innerHTML +
		`</style>
<table id="storyLineTable">` +
		storyLineTable.innerHTML +
		`</table>
{% include BStL-masterTableEND.html %}


<!--DETAILS SECTION (SHOWS DETAILS FOR THE CELlS) **-->
	<section id="detailsSection" class="draggableSection">` +
		detailsSection.innerHTML +
		`	</section>`;

	//console.log(saveText);

	var fname = storyLineTableTitleHeader.innerHTML;
	if (fname == "") {
		customAlert("!!! PLEASE <h1>ENTER TITLE</h1> FOR THE STORY LINE !!!");
		return false;
	} else {

		var filename = fname + `.html`;

		var blob = new Blob([saveText], {
			type: "text/plain;charset=utf-8"
		});
		saveAs(blob, filename);
	}
}
