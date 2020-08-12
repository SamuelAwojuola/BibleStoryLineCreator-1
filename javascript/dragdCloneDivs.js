var youMayDropIt;

var currentDraggedItem = null;


function dragDiv2TD() {
	/*FOR DIVS TO BE DRAGGED********************************/
	var div_items = document.querySelectorAll('.draggableDiv');
	var tdDragEnd = document.querySelectorAll('#storyLineTable td');


	function dStart(e) {
			btn_leaderLines();
		if (e.ctrlKey) {
			currentDraggedItem = this.cloneNode(true);
			currentDraggedItem.classList.remove('dragEventListnerAdded');
		} else {
			currentDraggedItem = this;
			currentDraggedItem.classList.add('dragEventListnerAdded');
		}
		youMayDropIt = 1;
		setTimeout(function () {
			//					currentDraggedItem.style.display = 'none';
		}, 0)
	}

	function dEnd() {
		btn_leaderLines();
		currentDraggedItem.style.display = '';
		setTimeout(function () {
			currentDraggedItem = null;
		}, 20);
	}

	//FOR THE DRAGGD DIV
	for (let i = 0; i < div_items.length; i++) {
		if (!div_items[i].classList.contains('dragEventListnerAdded')) {
			div_items[i].addEventListener('dragstart', dStart);
			div_items[i].addEventListener('dragend', dEnd)
		}
		div_items[i].classList.add('dragEventListnerAdded');
	}

	/*FOR THE DESTINATION <TD>s, I.E, WHERE THE DIVS WILL BE DRAGGED TO*********************************************/

	for (let j = 0; j < tdDragEnd.length; j++) {
		//if(it has [dragover, dragenter, dragleave & drop] eventlisteners){don't add any of these event listeners}
		if (!tdDragEnd[j].classList.contains('dragOverELAdded')) {
			tdDragEnd[j].addEventListener('dragover', function (e) {
				if (youMayDropIt) {
					e.preventDefault();
					if (e.ctrlKey) {
						e.dataTransfer.dropEffect = "copy";
					}
				};
			});

			tdDragEnd[j].addEventListener('dragenter', function (e) {
				if (youMayDropIt) {
					e.preventDefault();
					this.style.backgroundColor = 'rgb(211, 211, 211)';
				};
			});

			tdDragEnd[j].addEventListener('dragleave', function (e) {
				if (youMayDropIt) {
					e.preventDefault();
					this.style.backgroundColor = '';
				};
			});

			tdDragEnd[j].addEventListener('drop', function (e) {
				this.style.backgroundColor = '';
				if (currentDraggedItem) {
					this.append(currentDraggedItem);
				}
				youMayDropIt = null;
			});

		}

		tdDragEnd[j].classList.add('dragOverELAdded');

	}
}