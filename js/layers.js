var map;


function init() {
    console.log('test');
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.510375, lng: -87.736615},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }); 
  makeLayer(); 
}

function makeLayer(){
  cartodb.createLayer(map, {
      user_name: 'cartomike',
      type: 'cartodb',
      sublayers: [
      {
          sql: 'SELECT * FROM parcels_carto',
          cartocss: '#parcels_carto{   polygon-fill: #FF6600;   polygon-opacity: 0;   line-color: #ff8000;   line-width: 1.0;   line-opacity: 1.0;   [zoom < 15] {line-width: 0.5}   [zoom < 15] {line-opacity: 0.5}   [zoom < 13] {line-opacity: 0.15}   [zoom > 17] {line-width: 2.5} }'
      }]
  })
  .addTo(map)
  .done(function(layer) {
      console.log(map.overlayMapTypes.length); // still ==1
  }).error(function(layer) {
      console.log('problem loading cartodb layer');
  });
}