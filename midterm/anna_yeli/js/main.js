
var to_dos = {};
var areaOfScreenForDay = {};
var weeklyTasks = {};
var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var ready, paper;
var taskCircles = {};
var dayCircles = [];
var circlesForDay;

function runMainProgram() {	
	var tempArray = [];
	tasksForWeek = to_dos['to-dos'];
	var dayRadius = 400;
	for (var i = 0; i < daysOfWeek.length; i++) {
		tempArray = tasksForWeek.filter(function(obj) {
			if (obj.dayOfWeek === daysOfWeek[i]) {
				return obj;
			}
		});
		weeklyTasks[daysOfWeek[i]] = tempArray;
		dayRadius-=50;
		areaOfScreenForDay[daysOfWeek[i]] = dayRadius;
		tempArray = [];
	}
	//console.log(JSON.stringify(weeklyTasks));
	/*for (var j = 0; j < daysOfWeek.length; j++) {
		console.log(JSON.stringify(weeklyTasks[daysOfWeek[j]]));
	}
	for (var n = 0; n < daysOfWeek.length; n++) {
		console.log(areaOfScreenForDay[daysOfWeek[n]]);
	} */
	ready = true;
}
$.ajax({
	dataType:'json',
	url:'to-dos.json',
	success: function(returnData, statusValue, weirdNewObject) { 
		to_dos = returnData;
		console.log ('got it, move along'); 
		runMainProgram();
	},
	error: function(xhr, status, error) {
		 var err = eval("(" + xhr.responseText + ")");
  		 alert(err.Message);
	}
}); 


$(document).ready(function() {
	 $( "#start-visual" ).click(function() {
	  startVisualization();
	});
});

/***** VISUALIZATIONNNNNNN ***/
function startVisualization() {
	console.log('here');
	if (ready == true) {
		console.log('visualization started!');
		 paper = new Raphael(document.getElementById('visualization'), 1200, 850);
		 // dow = day of week
		 	var centerX = paper.canvas.offsetWidth/2 + 150;
			var centerY = paper.canvas.offsetHeight/2; 
		 for (var dow in weeklyTasks) {
		 		console.log(dow);
			  if (weeklyTasks.hasOwnProperty(dow)) {
			  	 dayCircles.push(paper.circle(centerX, centerY, areaOfScreenForDay[dow]));
		   		 drawTaskCircles(dow, areaOfScreenForDay[dow], centerX, centerY);
		  	}
		}
	}
}


function drawTaskCircles(dow, radius, centerX, centerY) {
	var points;
	var priority;
	var tempArray = [];
	var tasksForDay = weeklyTasks[dow];
	for (var i = 0; i < tasksForDay.length; i++) {
		points = getRandomPoint(radius, centerX, centerY, i, tasksForDay.length);
		priority = tasksForDay[i].priority;
		var x = points.x;
		var y = points.y;
		console.log(x);
		console.log(y);
		paper.circle(x, y, priority*4).red(); 
	} 
	//taskCircles[dow] = tempArray;
	//tempArray = [];
}

function getRandomPoint(radius, centerX, centerY, i, items) {
    return {
        x: centerX + radius * Math.cos(2 * Math.PI * i / items),
        y: centerY + radius * Math.sin(2 * Math.PI * i / items) 
    };
}
Raphael.el.red = function () {
    this.attr({fill: "#f00"});
};