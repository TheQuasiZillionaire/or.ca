var numWaypts = [1, 1];
var numClients = 3;//Temporarily 3; normally 1
var mode = 3;

addInput = function () {
  if(mode == 1){
    var lastWaypt = $(".waypt:last");
    if(numWaypts[0] < 8) {
      numWaypts[0]++;
      lastWaypt.after("<input class='waypt' type='textbox' placeholder='Waypoint'>");
    }else{
      alert("Maximum number of waypoints reached.");
    }
  }else if(mode == 2){
    var lastWaypt = $(".waypt1:last");
    if(numWaypts[1] < 8) {
      numWaypts[1]++;
      lastWaypt.after("<input class='waypt1' type='textbox' placeholder='Waypoint'>");
    }else{
      alert("Maximum number of waypoints reached.");
    }
  }else{
    var lastClient = $(".client:last");
    if(numClients < 5) {
      numClients++;
      lastClient.after("<div class='client'><p>Client " + numClients + "<p><input class='orig' type='textbox' placeholder='Location'><input class='dest' type='textbox' placeholder='Destination'></div>");
    }else{
     alert("Maximum number of clients reached.");
   }
  }
}

removeInput = function () {
  if(mode == 1){
    var lastWaypt = $(".waypt:last");
    if(numWaypts[0] > 1) {
      numWaypts[0]--;
      lastWaypt.remove();
    }else{
      alert("Must have at least one waypoint.");
    }
  }else if(mode == 2){
    var lastWaypt = $(".waypt1:last");
    if(numWaypts[1] > 1) {
      numWaypts[1]--;
      lastWaypt.remove();
    }else{
      alert("Must have at least one waypoint.");
    }
  }else{
    var lastClient = $(".client:last");
    if(numClients > 1) {
      numClients--;
      lastClient.remove();
    }else{
      alert("Must have at least one client.");
    }
  }
}

toggleMap = function () {
    $("#input").fadeOut(700);

    $("#directions").fadeIn(700);
    $("#map").fadeIn(700);
    $("#back").fadeIn(700);
    google.maps.event.trigger(map, "resize");
}

display = function() {
  $(".tab").click(function(){
    $(".active-tab").removeClass("active-tab");
    $(this).addClass("active-tab");

    if($(this).hasClass("one")){
      $(".active-mode").removeClass("active-mode");
      $(".mode.one").addClass("active-mode");
      mode = 1;
    }else if($(this).hasClass("two")){
      $(".active-mode").removeClass("active-mode");
      $(".mode.two").addClass("active-mode");
      mode = 2;
    }else{
      $(".active-mode").removeClass("active-mode");
      $(".mode.three").addClass("active-mode");
      mode = 3;
    }
  });

  $(".go").mousedown(function(){
    $(this).animate({left: "+=1px", top: "+=1px"}, 0);
  }).mouseup(function(){
    $(this).animate({left: "-=1px", top: "-=1px"}, 0);
  });

  $(".add").mousedown(function(){
    $(this).animate({left: "+=1px", top: "+=1px"}, 0);
  }).mouseup(function(){
    $(this).animate({left: "-=1px", top: "-=1px"}, 0);
  });

  $(".remove").mousedown(function(){
    $(this).animate({left: "+=1px", top: "+=1px"}, 0);
  }).mouseup(function(){
    $(this).animate({left: "-=1px", top: "-=1px"}, 0);
  });

  $("#back").hover(
    function() {
      $("#back").animate({opacity: .6}, 250);
    },
    function() {
      $("#back").animate({opacity: .2}, 250);
    }
  );

  $("#back").click(function() {
    $("#input").fadeIn(700);

    $("#directions").fadeOut(700);
    $("#map").fadeOut(700);
    $("#back").fadeOut(700);
  });
}

$(document).ready(display);
