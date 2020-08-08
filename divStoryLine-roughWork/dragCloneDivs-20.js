var div2drop;
var youMayDropIt;

function dragDiv2TD() {
	var div_items = document.querySelectorAll('.draggableDiv');
	var tdDragEnd = document.querySelectorAll('#storyLineTable td');

	let currentDraggedItem = null;

	for (let j = 0; j < tdDragEnd.length; j++) {
		var list = tdDragEnd[j];

		list.addEventListener('dragover', function (e) {
			if (youMayDropIt) {
				e.preventDefault();
			};
		});

		list.addEventListener('dragenter', function (e) {
			if (youMayDropIt) {
				e.preventDefault();
				this.style.backgroundColor = 'rgb(211, 211, 211)';
			};
		});

		list.addEventListener('dragleave', function (e) {
			if (youMayDropIt) {
				e.preventDefault();
				this.style.backgroundColor = '';
			};
		});

		list.addEventListener('drop', function (e) {
			this.style.backgroundColor = '';
			if (currentDraggedItem) {
				this.append(currentDraggedItem);
			}
			youMayDropIt = null;
		});

	}

	//FOR THE DRAGGD DIV
	for (let i = 0; i < div_items.length; i++) {

		div_items[i].addEventListener('dragstart', function () {
			currentDraggedItem = this;
			youMayDropIt = 1;
			setTimeout(function () {
				currentDraggedItem.style.display = 'none';
			}, 0)
		});

		div_items[i].addEventListener('dragend', function () {
			currentDraggedItem.style.display = '';
			setTimeout(function () {
				currentDraggedItem = null;
			}, 20);
		})

	}
}
