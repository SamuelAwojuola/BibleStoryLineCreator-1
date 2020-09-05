let currentDroppable = null;
var arrayOfTDz = document.getElementsByTagName('td');

document.addEventListener('mousedown', function (event) {
		let ball = event.target.closest('td');

		let shiftX = event.clientX - ball.getBoundingClientRect().left;
		let shiftY = event.clientY - ball.getBoundingClientRect().top;

		ball.style.position = 'absolute';
		ball.style.zIndex = 1000;
		document.body.append(ball);

		moveAt(event.pageX, event.pageY);

		function moveAt(pageX, pageY) {
			ball.style.left = pageX - shiftX + 'px';
			ball.style.top = pageY - shiftY + 'px';
		}

		function onMouseMove(event) {
			moveAt(event.pageX, event.pageY);

			ball.hidden = true;
			let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
			console.log(elemBelow);
			ball.hidden = false;

			if (!elemBelow) return;

			//			let droppableBelow = elemBelow.closest('.droppable');
			//			if (currentDroppable != droppableBelow) {
			//				if (currentDroppable) { // null when we were not over a droppable before this event
			//					leaveDroppable(currentDroppable);
			//				}
			//				currentDroppable = droppableBelow;
			//				if (currentDroppable) { // null if we're not coming over a droppable now
			//					// (maybe just left the droppable)
			//					enterDroppable(currentDroppable);
			//				}
			//			}

			let droppableBelow = elemBelow;
			if (currentDroppable != droppableBelow) {
				if (currentDroppable) { // null when we were not over a droppable before this event
					leaveDroppable(currentDroppable);
				}
				currentDroppable = droppableBelow;
				if (currentDroppable) { // null if we're not coming over a droppable now
					// (maybe just left the droppable)
					enterDroppable(currentDroppable);
				}
			}
		}

		document.addEventListener('mousemove', onMouseMove);

		ball.onmouseup = function () {
			document.removeEventListener('mousemove', onMouseMove);
			ball.onmouseup = null;
		};

	};

	function enterDroppable(elem) {
		elem.style.background = 'pink';
	}

	function leaveDroppable(elem) {
		elem.style.background = '';
	}

	ball.ondragstart = function () {
		return false;
	};

}
