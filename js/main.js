$(document).ready(function(){

  var map = new L.Map('map').setView(new L.LatLng(0, 0), 0);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    detectRetina: true
  }).addTo(map);

  var element = document.getElementById('map');
  var touch = null;

  addForceTouchToElement(element);

  function onTouchStart(e) {
    e.preventDefault();
    checkForce(e);
  }

  function onTouchMove(e) {
    e.preventDefault();
    checkForce(e);
  }

  function onTouchEnd(e) {
    e.preventDefault();
    touch = null;
  }

  function checkForce(e) {
    touch = e.touches[0];
    setTimeout(refreshForceValue.bind(touch), 10);
  }

  function refreshForceValue() {
    var touchEvent = this;
    var forceValue = 0;
    if(touchEvent) {
      forceValue = touchEvent.force || 0;
      setTimeout(refreshForceValue.bind(touch), 10);
    }else{
      forceValue = 0;
    }

    if (forceValue > 0.5) {
      map.zoomIn()
    }
    console.log(forceValue);
  }

  function addForceTouchToElement(elem) {
    elem.addEventListener('touchstart', onTouchStart, false);
    elem.addEventListener('touchmove', onTouchMove, false);
    elem.addEventListener('touchend', onTouchEnd, false);
  }

});
