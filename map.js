mapboxgl.accessToken = 'pk.eyJ1IjoiY2hkZWFuIiwiYSI6ImNqZjRpbGZiajBseXAzNG83ODZmaHl2cmkifQ.IG2Bx9Nq3CdAErMYgQIscQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-96, 37.8],
    zoom: 3
});

function makeMap() {
    var dsvString = $('#data').val();

    var delimiter = $('#delimiter').val();
    var latField = $('#latField').val();
    var lngField = $('#lngField').val();

    csv2geojson.csv2geojson(dsvString, {
        latfield: latField,
        lonfield: lngField,
        delimiter: delimiter
    }, function(err, data) {

        if (map.getLayer('points')) {
            map.removeLayer('points');
            map.removeSource('points');
        }
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': data
            },
            'layout': {
                'icon-image': 'circle-15'
            }
        });

        map.fitBounds(turf.bbox(data),
                      {padding: 30});

    });
}

map.on('load', function () {

});
