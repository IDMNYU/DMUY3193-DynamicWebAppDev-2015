var data = {}
var precision = 180;
var lon_min = 180;
var lon_max = -180;
var lat_min = 180;
var lat_max = -180;
var map;


//Fetch data
$.ajax({
	dataType:'json',
	url:'datasets/registered-hospitals.json',
	success:function(returnData, statusValue, weirdNewObject) {
		data = returnData;
		console.log ('got it, move along');
		main();
	},
});

//main
function main() {

}

function findMinMax() {
	lon_min = 180;
	lon_max = -180;
	lat_min = 180;
	lat_max = -180;
	for(var i = 0; i < data["data"].length; i++) {
		if(parseFloat(data["data"][i][19][1]) < lon_min) { lon_min = parseFloat(data["data"][i][19][1]); }
		if(parseFloat(data["data"][i][19][1]) > lon_max) { lon_max = parseFloat(data["data"][i][19][1]); }
		if(parseFloat(data["data"][i][19][2]) < lat_min) { lat_min = parseFloat(data["data"][i][19][2]); }
		if(parseFloat(data["data"][i][19][2]) > lat_max) { lat_max = parseFloat(data["data"][i][19][2]); }
	}
}

function updateMap() {
	console.log("updateMap()");
	$(".map").html("");
	for(var i = lon_max; i >= lon_min; i-=precision) {
		for(var j = lat_min; j <= lat_max; j+=precision) {
			console.log(i + "," + j);
			var num = searchCoord(i, j);
			var char;
			if(num > 9) {
				char = '>';
				num = 10;
			}
			else { char = num.toString(); }
			var r = Math.floor(255 * (1/(num+1)));
			var g = Math.floor((num / 10) * 255);
			$(".map").html($(".map").html() + "<span style=\"color:rgb(" + r + "," + g + ",0);\" class=lower" + i.toString() + " higher" + j.toString() + ">" + char + "</span>");
		}
		$(".map").html($(".map").html() + "<br />");
	}
};

function searchCoord(lon, lat) {
	var num = 0;
	for(var i = 0; i < data["data"].length; i++) {
		if((parseFloat(data["data"][i][19][1]) - precision/2 < lon) && (lon <= parseFloat(data["data"][i][19][1]) + precision/2) && (parseFloat(data["data"][i][19][2]) - precision/2 < lat) && (lat <= parseFloat(data["data"][i][19][2]) + precision/2)) {
			num++;
		}
	}
	return num;
}

function popMap() {
	var pair = {};
	for(var o = 0; o < ((lon_max-lon_min)/precision); o++) {
		for( var a = 0; a < ((lat_max-lat_min)/precision); a++) {
			map[o][a] = 0;
		}
	}
	for(var i = 0; i < data["data"].length; i++) {
		console.log(parseFloat(data["data"][i][19][1]));
		console.log(parseFloat(data["data"][i][19][2]));
		pair = pointSearch(parseFloat(data["data"][i][19][1]), parseFloat(data["data"][i][19][2]));
		console.log(pair.lon);
		console.log(pair.lat);
		map[pair.lon][pair.lat]++;
	}
}

function renderMap() {
	for(var o = lon_min; o < lon_max; o++) {
		for( var a = lat_min; a < lat_max; a++) {

		}
	}
}

function pointSearch(lon, lat) {
	if (lon > max_lon) { return 0; }
	if (lon < min_lon) { return 0; }
	if (lat > max_lat) { return 0; }
	if (lat < min_lat) { return 0 }
	var test_lon = Math.floor((lon - min_lon)/precision);
	var test_lat = Math.floor((lat - min_lat)/precision);
	return {"lon": test_lon, "lat": test_lat};
}

function loadAll() {
	findMinMax();
	precision = 5;
	updateMap();
}
function loadRange() {
	lon_min = parseFloat($(".longitude")[0].value) - parseFloat($(".width")[0].value);
	lon_max = parseFloat($(".longitude")[0].value) + parseFloat($(".width")[0].value);
	lat_min = parseFloat($(".latitude")[0].value) - parseFloat($(".width")[0].value);
	lat_max = parseFloat($(".latitude")[0].value) + parseFloat($(".width")[0].value);
	precision = parseFloat($(".precision")[0].value);
	updateMap();
}
function zoomIn() {
	console.log(precision);
	console.log($(".magnitude")[0].value);
	precision /= parseFloat($(".magnitude")[0].value);
	console.log(precision);
	updateMap();
}
function zoomOut() {
	console.log(precision);
	console.log($(".magnitude")[0].value);
	precision *= parseFloat($(".magnitude")[0].value);
	console.log(precision);
	updateMap();
}
