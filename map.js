mapboxgl.accessToken = 'pk.eyJ1IjoiY2hkZWFuIiwiYSI6ImNqZjRpbGZiajBseXAzNG83ODZmaHl2cmkifQ.IG2Bx9Nq3CdAErMYgQIscQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-96, 37.8],
    zoom: 3
});

const url = new URL(location.href);
const params = {lat: '#latField',
                lng: '#lngField',
                label: '#labelField'};

for (key in params) {
    if (url.searchParams.get(key)) {
        $(params[key]).val(url.searchParams.get(key));
    }
}

function makeMap() {
    var dsvString = $('#data').val();

    var delimiter = $('#delimiter').val();
    var latField = $('#latField').val();
    var lngField = $('#lngField').val();

    var labels = '{' + $('#labelField').val() + '}';

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
                'icon-image': 'circle-15',
                'text-field': labels,
                'text-anchor': 'bottom-left',
                'text-offset': [.5,-.5]
            }
        });

        map.fitBounds(turf.bbox(data),
                      {padding: 30});

        map.on('click', 'points', function (e) {
            var feature = e.features[0];
            var coordinates = feature.geometry.coordinates.slice();

            var keys = Object.keys(feature.properties);
            var lines = [];
            for (k in keys) {
                lines.push('<p><strong>' + keys[k] + ':</strong> ' + feature.properties[keys[k]] + '</p>');
            }

            var description = lines.join('');

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        map.on('mouseenter', 'points', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'points', function () {
            map.getCanvas().style.cursor = '';
        });
    });
}

map.on('load', function () {

});
