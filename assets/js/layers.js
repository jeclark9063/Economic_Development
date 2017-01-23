
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.510375, lng: -87.736615},
    zoom: 13
  });
}

function createCartoParcels(){
  cartodb.createLayer(map, "https://cartomike.carto.com/api/v2/viz/92b6a26e-a3c9-11e6-a4a5-0ecd1babdde5/viz.json")
  .addTo(map)
  .done('done', function(done) {
        console.log("added layer");
      })
  .on('error', function(err){
    console.log("carto layer not added");
  });
}
