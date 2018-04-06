# prestocarto.xyz

Quickly plot points from a CSV/TSV on a webmap. Use it at http://prestocarto.xyz.


## Use

Paste comma or tab delimited text and enter the field names containing geometry. Optionally, you can choose a field to label each point. Clicking on a point will show a popup with all attributes.

Prestocarto also supports specifying field names in the URL query string:

- lat: Latitude
- lng: Longitude
- label: Label

eg http://prestocarto.xyz?lat=Y&lng=X&label=NAME.


## About

Uses [csv2geojson](https://github.com/mapbox/csv2geojson) for the text parsing.
