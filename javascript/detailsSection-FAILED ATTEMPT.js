var detailsCount;
var detailId = 'detail_' + detailsCount;
//assign selected cell a custom attribute of detailId
//selectedCell.setAttribute(detailId, detailsCount)
//give the detialSummary the id of detailId
// detailSummary.id = detailId;


var detailsSectionBody = document.createElement('DIV');
detailsSectionBody.classList.add('detailsSectionBody');

var detailsSummaryParagraph = document.createElement('P');

var detailsSummary = document.createElement('DIV');
detailsSummary.classList.add('detailsSummary');
detailsSummary.classList.add('scrollbar');
detailsSummary.classList.add('scrollbar-custom');
detailsSummary.setAttribute('contenteditable', 'true');
detailsSummary.setAttribute('spellcheck', 'true');
detailsSummary.appendChild(detailsSummaryParagraph);

var detailsKeyFacts = document.createElement('DIV');
detailsKeyFacts.classList.add('detailsKeyFacts');

var actorsHeader = document.createElement('H4');
actorsHeader.innerHTML = `Characters/Actors`;
var actorsList = document.createElement('OL');
detailsKeyFacts.appendChild(actorsHeader);
detailsKeyFacts.appendChild(actorsList);

var locationHeader = document.createElement('H4');
locationHeader.title = `Where this/these event/events takes place`;
locationHeader.innerHTML = `Location/Region`;
var location = document.createElement('SPAN');
detailsKeyFacts.appendChild(locationHeader);
detailsKeyFacts.appendChild(location);

var timeHeader = document.createElement('H4');
timeHeader.title = `Where this/these event/events takes place`;
timeHeader.innerHTML = `Location/Region`;
var time = document.createElement('SPAN');
detailsKeyFacts.appendChild(timeHeader);
detailsKeyFacts.appendChild(time);


//on click of edit button, append detailsSummary to detailsSectionBody
detailsSectionBody.appendChild(detailsSummary);
detailsSectionBody.appendChild(detailsKeyFacts);