myNS.calculate.initializeButtons = function(scope) {
	$( "#calc-button" ).click(this.distance.bind(this, scope));
	$( "#reset-button" ).click(this.reset.bind(this, scope.state));
 	$( "#distance" ).text(this.DISTANCE_PLACEHOLDER)
}

myNS.calculate.distance = function(scope, event) {
	var airport1 = $( "#a1-input" ).val();
	var airport2 = $( "#a2-input" ).val();

	a1Details = scope.state.searchResultPlaceDetail[airport1];
	a2Details = scope.state.searchResultPlaceDetail[airport2]

	if (a1Details && a2Details) {
		var airport1Coords = a1Details.geometry.location;
		var airport2Coords = a2Details.geometry.location;
		var distance = myNS.utils.calculateGreatCircleDistance(airport1Coords.lat(), airport1Coords.lng(), airport2Coords.lat(), airport2Coords.lng());

		this.setDistance(distance);
		this.dropMarkers(scope.map, a1Details, a2Details);

		return this.zoomIn(airport1Coords, airport2Coords, scope.map);
	} else {
		alert('Oops something went wrong! Please double check that two airports are selected.');
		return;
	}
}

myNS.calculate.zoomIn = function(marker1Pos, marker2Pos, map) {
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(marker1Pos);
	bounds.extend(marker2Pos);
	return map.fitBounds(bounds);
}

myNS.calculate.dropMarkers = function(map, a1Details, a2Details) {
  var infowindow = new google.maps.InfoWindow();

	var marker1 = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: a1Details.geometry.location
  });
  var marker2 = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: a2Details.geometry.location
  });

  google.maps.event.addListener(marker1, 'click', function() {
    infowindow.setContent(a1Details.name);
    infowindow.open(map, this);
  });
  google.maps.event.addListener(marker2, 'click', function() {
    infowindow.setContent(a2Details.name);
    infowindow.open(map, this);
  });
}

myNS.calculate.reset = function(event, state) {
	state = {
		searchResultPlaceDetail: {}
	}

	// $( "#a1-input" ).attr("value","destroyed")
	$( "#a1-input" ).val("");
	$( "#a1-input" ).autocomplete( "destroy" );
	$( "#a2-input" ).val("");
	$( "#a2-input" ).autocomplete( "destroy" );

	myNS.initialize();
 	$( "#distance" ).text(this.DISTANCE_PLACEHOLDER);
}

myNS.calculate.setDistance = function(distance) {
	return $( "#distance" ).text(distance);
}

myNS.calculate.DISTANCE_PLACEHOLDER = 'Select two airports and click "Calculate" to find out!'
