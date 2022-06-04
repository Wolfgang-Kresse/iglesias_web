// mapbox.com
var mbAttr = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery &copy; <a href="https://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

// openstreetmap.org
var osmAttrib = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
	osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var osm2 = L.tileLayer(osmUrl, {attribution: osmAttrib});

// sin mapa
var osmAttrib = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
	osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var osm_leer = L.tileLayer(osmUrl, {attribution: osmAttrib, opacity: 0.0});

var none = L.tileLayer.wms(" ", {
    layers: 'none',
    format: 'image/png',
	transparent: true,
	crs: 4326
});

// Abrir el mapa de inicio
var map = L.map('map', {
	center: [-13.162, -74.231],
	zoom: 16,
	layers: [osm2]
});

-13.17, -74.23

//neu
map.createPane('markers');
map.getPane('markers').style.zIndex = 100;
map.createPane('areas');
map.getPane('areas').style.zIndex = 200;

// Puntos del mapa en el formato GeoJSON
var geojsonMarkerOptions = {
	radius: 6,
	color: "#f00",
	opacity: 1,
	weight: 1,
	fillColor: "#f00",
	fillOpacity: 1
};

var geojsonMarkerOptionsEmpty = {
	fill: false,
	stroke: false
};

function onEachFeature(feature, layer) {
	if (feature.properties && feature.properties.place) {
		html_content = "<b>" + feature.properties.place + "</b><br/>";
		
		if (feature.properties.text) {
		  html_content +=  feature.properties.text + "<br/>";
		}

		if (feature.properties.link) {
		  link_feature = feature.properties.link;
		  html_content +=  link_feature.link(feature.properties.link) + "<br/>";
		}
		
		if (feature.properties.Actionbound) {
		  ab_feature = feature.properties.Actionbound;
		  html_content +=  ab_feature.link(feature.properties.Actionbound) + "<br/>";
		}
		
		if (feature.properties.copyright) {
		  html_content += "<cp>&#0169 " + feature.properties.copyright + "</cp><br/>";
		}
		
		var imgname = feature.properties.file;
				
		html_content += "<a href='./"  + imgname + ".jpg' target='_blank'><img src='./" + imgname + ".jpg' width=200px onerror='this.src=\"./0.jpg\"; this.style.display = \"none\";'/></a>";

		layer.bindPopup(L.popup({maxWidth:200}).setContent(html_content, { autoPan: true}));
		layer.bindLabel(feature.properties.place, { className: "myLabel", noHide: false});
	}
}

var geojsonLayer = L.geoJson(iglesias, {
	pointToLayer: function (feature, latlng) {
    geojsonMarkerOptions.color = feature.geometry.color;
    geojsonMarkerOptions.fillColor = feature.geometry.color;
		return L.circleMarker(latlng, geojsonMarkerOptions);
	},
	onEachFeature: onEachFeature
}).addTo(map);

var geojsonLabel = L.geoJson(iglesias, {
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, geojsonMarkerOptionsEmpty);
	},
	onEachFeature: function (feature, layer) {
		layer.bindLabel(feature.properties.place, { className: "myLabel", noHide: true});
	}
}).addTo(map);


// Layer Control
var baseLayers = {
	"OpenStreetMap": osm2,
 	"Sin mapa": osm_leer
};
var overlays = {
	"R&#243tulo": geojsonLabel
}
L.control.layers(baseLayers, overlays).addTo(map);