var sequence = [];
var locations = [];

function Client(origin, destination) {
  this.orig = {val:origin, type:"origin"};
  this.dest = {val:destination, type:"destination"};
}

function getClients(){
  clients = [];
  for(var i = 0; i < numClients; i++){
    if($(".orig:eq(" + i + ")").val() != "" && $(".dest:eq(" + i + ")").val() != ""){
      var origin = $(".orig:eq(" + i + ")").val();
      var destination = $(".dest:eq(" + i + ")").val();
      var aClient = new Client(origin, destination);
      clients.push(aClient);
    }
  }
}

function getLocations() {
  locations = [];
  for(var i = 0; i < riders.length; i++){
    locations.push(riders[i].dest);
  }
  for(var i = 0; i < clients.length; i++){
    locations.push(clients[i].orig);
  }
}

function getDistance(origin, destination){
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    },
    function(response, status) {
      if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Error: ' + status);
        distance = null;
      } else {
        $("#storage").html(response.rows[0].elements[0].distance.value);
      }
    });
}

function resetLists() {
  getClients();
  riders = clients.splice(0, 1);
  current = riders[0].orig;
  sequence = [];
  getLocations();
}

function makeSequence() {
  resetLists();
  while(locations.length > 0){
    var minDist = 999999999;
    var closest = null;
    for(var i = 0; i < locations.length; i++){
      getDistance(current.val, locations[i].val);
      var distance = parseInt(document.getElementById("storage").innerHTML);
      if(distance <= minDist){
        minDist = distance;
        closest = locations[i];
      }
    }
    if(closest.type == "origin"){
      for(var i = 0; i < clients.length; i++){
        if(closest.val == clients[i].orig.val){
          riders.push(clients[i]);
          clients.splice(i, 1);
        }
      }
    }else{
      for(var i = 0; i < riders.length; i++){
        if(closest.val == riders[i].dest.val){
          riders.splice(i, 1);
        }
      }
    }
    sequence.push(current.val);
    current = closest;
    getLocations();
  }
  sequence.push(current.val);
}
