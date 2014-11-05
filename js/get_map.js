var geocoder;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  directionsDisplay = new google.maps.DirectionsRenderer();
  var santacruz = new google.maps.LatLng(36.9741667, -122.0297222);
  var mapOptions = {
    zoom: 12,
    center: santacruz
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions'));
}

function calcRoute() {
  var start = $(".start").val();
  var end = $(".end").val();
  var waypts = [];
  for(var i = 0; i < numWaypts[0]; i++){
    if($(".waypt:eq(" + i + ")").val() != ""){
      waypts.push({
            location:$(".waypt:eq(" + i + ")").val(),
            stopover:true
      });
    }
  }

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if(status == google.maps.DirectionsStatus.OK){
      toggleMap();
      directionsDisplay.setDirections(response);
    }else{
      alert("Error: " + status);
    }
  });
}

function calcRoute1() {
  var start = $(".start1").val();
  var end = $(".start1").val();
  var waypts = [];
  for(var i = 0; i < numWaypts[1]; i++){
    if($(".waypt1:eq(" + i + ")").val() != ""){
      waypts.push({
            location:$(".waypt1:eq(" + i + ")").val(),
            stopover:true
      });
    }
  }

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if(status == google.maps.DirectionsStatus.OK){
      toggleMap();
      directionsDisplay.setDirections(response);
    }else{
      alert("Error: " + status);
    }
  });
}

function calcRoute2() {
  makeSequence();
  var start = sequence[0];
  var end = sequence[sequence.length-1];
  var waypts = [];
  for(var i = 1; i < sequence.length-1; i++){
    waypts.push({
          location:sequence[i],
          stopover:true
    });
  }

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if(status == google.maps.DirectionsStatus.OK){
      toggleMap();
      directionsDisplay.setDirections(response);
    }else{
      alert("Error: " + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
