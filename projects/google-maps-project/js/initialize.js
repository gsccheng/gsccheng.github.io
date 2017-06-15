myNS.initialize = function() {
	var scope = {
		map: null,
		service: null,
		state: {
			// Mapped by place name according to autocomplete label
			searchResultPlaceDetail: {}
		}
	};

	this.map.initialize(scope);
	this.autocomplete.initialize(scope);
	this.calculate.initializeButtons(scope);
}
