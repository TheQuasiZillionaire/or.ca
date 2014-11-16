// GLOBAL VARIABLES ============================================================
var id = 0;
var clients;
var retDist;
var taxi;

// CLASSES =====================================================================
// --- Client ------------------------------------------------------------------
Client = function(origin, destination) {
  this.id = id++;
  this.orig = origin;
  this.dest = destination;
  this.arrived = false;
  console.log("Client " + this.id + " created.");
};

// --- Vehicle -----------------------------------------------------------------
Vehicle = function() {
  this.passengers = [];
  for(var i = 0; i < arguments.length; i++){
    this.add(arguments[i]);
  }
};

Vehicle.prototype.add = function(passenger) {
  this.passengers.push(passenger);
  console.log("Client " + passenger.id + " has boarded the vehicle.");
};

Vehicle.prototype.remove = function(id) {
  for(var i = 0; i < this.passengers.length; i++){
    if(this.passengers[i].id == id){
      this.passengers.splice(i, 1);
      console.log("Client " + id + " has left the vehicle.");
      return;
    }
  }
  console.log("Client " + id + " is not in the vehicle.");
};

Vehicle.prototype.list = function() {
  var list = [];
  for(var i = 0; i < this.passengers.length; i++){
    list.push(this.passengers[i].id);
  }
  return this.passengers;
};

Vehicle.prototype.destinations = function() {
  var list = [];
  for(var i = 0; i < this.passengers.length; i++){
    list.push(this.passengers[i].dest);
  }
  return list;
};

Vehicle.prototype.isEmpty = function(){
  if(this.passengers.length > 0){
    return false;
  }
  return true;
}

// FUNCTIONS =====================================================================
getDistance = function(origin, destination) {
  retDist = null;
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
      console.log("callback");
      if (status != google.maps.DistanceMatrixStatus.OK) {
        //alert('Error: ' + status);
        console.log('Error: ' + status);
        distance = null;
      } else {
        //$("#storage").html(response.rows[0].elements[0].distance.value);
        //console.log(response.rows[0].elements[0].distance.value);
        retDist = response.rows[0].elements[0].distance.value;
      }
    });
};

getClientsForm = function() {
  clients = [];
  for(var i = 0; i < numClients; i++){
    if($(".orig:eq(" + i + ")").val() != "" && $(".dest:eq(" + i + ")").val() != ""){
      var origin = $(".orig:eq(" + i + ")").val();
      var destination = $(".dest:eq(" + i + ")").val();
      clients.push(new Client(origin, destination));
    }else{
      console.log("Something is empty.");
    }
  }
};

isComplete = function(){
  if(clients.length == 0 && taxi.isEmpty()){
    return true;
  }
  return false;
}

getSequence = function() {
  id = 0;
  getClientsForm();
  taxi = new Vehicle(clients[0]);
  var currentLocation = clients[0].orig;
  clients.splice(0, 1);

  var sequence = [currentLocation];
  while(!isComplete()){
    var minDist = 999999999;
    var closest = "";
    var isDest = false;

    var destClients = taxi.list();
    for(var i = 0; i < destClients.length; i++){
      getDistance(currentLocation, destClients[i].dest);
      //var retDist = parseInt(document.getElementById("storage").innerHTML);
      if(retDist <= minDist){
        minDist = retDist;
        closest = destClients[i];
        isDest = true;
      }
    }
    for(var i = 0; i < clients.length; i++){
      getDistance(currentLocation, clients[i].orig);
      if(retDist <= minDist){
        minDist = retDist;
        closest = clients[i];
        isDest = false;
      }
    }
    console.log("Current: " + currentLocation);
    if(isDest){
      console.log("Next (d): " + closest.dest + " -> " + closest.id);
      sequence.push(closest.dest);
      taxi.remove(closest.id);
    }else{
      console.log("Next (o): " + closest.orig + " -> " + closest.id);
      sequence.push(closest.orig);
      taxi.add(closest);
      for(var i = 0; i < clients.length; i++){
        if(closest.id == clients[i].id){
          clients.splice(i, 1);
        }
      }
    }
  }
  return sequence;
};
