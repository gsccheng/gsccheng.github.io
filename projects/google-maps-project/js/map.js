myNS.map.initialize = function initializeMap(scope) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 50.064192, lng: -110.605469},
    zoom: 3
  });
	var service = new google.maps.places.PlacesService(map);

  scope.map = map;
  scope.service = service;
}
