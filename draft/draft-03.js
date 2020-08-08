if (!dNmoptOccurence.length) {
		dNmoption.setAttribute('optCounter', 1);
		divNameSelect.append(dNmoption);
	} else if (dNmoptOccurence.length > 0) {
		for (i = 0; i < dNmoptOccurence.length; i++) {
			if (dNmoptOccurence[i].text == dName) {
				var dNcnt = dNmoptOccurence[i].getAttribute('optCounter');
				dNmoptOccurence[i].setAttribute('optCounter', ++dNcnt);
			} else {
				dNmoption.setAttribute('optCounter', 1);
				divNameSelect.append(dNmoption);
			}
		}
	}