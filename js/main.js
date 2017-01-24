var cartoUrl = 'http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb.js';
var googleUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCdOV9pkzdv7uo1u2r1h73gunR91uNW_0M';
var layers = {"a": null, "b": null};

var activeLayer = 0;


requirejs([googleUrl],function(){
     requirejs([cartoUrl],function(){
         init();
     });
});


function init(){
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 34.510375, lng: -87.736615},
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.ROADMAP
});  

addCartoLayer1();

}



function addCartoLayer1(){

    cartodb.createLayer(map, "https://cartomike.carto.com/api/v2/viz/92b6a26e-a3c9-11e6-a4a5-0ecd1babdde5/viz.json")
    .done(function(layer) {
        map.overlayMapTypes.setAt(0, layer);
        layers.a = layer;
        addCartoLayer2();

    }).error(function(layer) {
        console.log('problem loading cartodb layer');
    });
}

function addCartoLayer2(){
    
    cartodb.createLayer(map, {
        user_name: 'cartomike',
        type: 'cartodb',
        sublayers: [
        {
            sql: 'SELECT * FROM parcels_carto',
            cartocss: '#parcels_carto{   polygon-fill: #FF6600;   polygon-opacity: 0;   line-color: #ff8000;   line-width: 1.0;   line-opacity: 1.0;   [zoom < 15] {line-width: 0.5}   [zoom < 15] {line-opacity: 0.5}   [zoom < 13] {line-opacity: 0.15}   [zoom > 17] {line-width: 2.5} }'
        }]
    })
    .done(function(layer) {
        map.overlayMapTypes.setAt(1, layer);
        layers.b = layer;
        doneLoading();
    }).error(function(layer) {
        console.log('problem loading cartodb layer');
    });
}

///Testing stuff
function doneLoading(){
    console.log('Done loading both layers');
    showA();
}

$(window).keypress(function(event){
    if (event.which == 97){
        toggleLayers();
    }
});

function toggleLayers(){
    if (activeLayer === 1){
        activeLayer = 0;
        showA();
    }
    else
    {
        activeLayer = 1;
        showB();
    }
}

function showA(){
layers.a.show();
layers.b.hide();
console.log("Showing layer A (JSON Version)");
}

function showB(){
layers.a.hide();
layers.b.show();
console.log("Showing layer B (SQL Version)");
}