google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var mesice = new Array("Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čec", "Srp", "Zář", "Říj", "Lis", "Pro");	

google.charts.load('current', {'packages':['gauge','corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);


$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 50);
});

$(window).on('resizeEnd', function() {
    drawChart();
});



function drawChart() {
	
	
	
var jsonData = $.ajax({
          url: "http://www.palovsky.cz/meteostanice/api/lastrecord.php",
          dataType: "json",
          async: false
          }).responseText;	

var obj = JSON.parse(jsonData);
		  
document.getElementById("aktual1").innerHTML = obj.tempOut + " C°";
document.getElementById("aktual2").innerHTML = obj.humidityOut + " %";	
document.getElementById("aktual3").innerHTML = obj.lightOut + " lx";	
	
var jsonData = $.ajax({
          url: "http://www.palovsky.cz/meteostanice/api/api2.php",
          dataType: "json",
          async: false
          }).responseText;
var data = new google.visualization.DataTable(jsonData);

var osyV = new Array();
osyV[0] = {targetAxisIndex:0, color: '#871b47'}; //tempIn
osyV[1] = {targetAxisIndex:1, color: '#ff0000'}; //tempOut
osyV[3] = {targetAxisIndex:2, color: '#0000ff'}; //humidity
osyV[2] = {targetAxisIndex:3, color: '#00ff00'}; //pressure
osyV[4] = {targetAxisIndex:4, color: '#00ff00'}; //light

var osy = new Array();

function changeOsy(){			
	var myPoc = 0;
	for(var i = 0;i<=3;i++){
		osy[i]=osyV[i];							
		if(true){
			osy[myPoc]=osyV[i];
			console.log("zobrazuju osu: "+i+" jako osu: "+myPoc);					
			myPoc++;
		}
	}
	console.log(" ");
}

changeOsy();




var options = {
	hAxis: {title: 'Datum', format: 'dd. M. yyyy', 
				gridlines:{ 
					count: -1,
					units: {
						hours: {
							format: ['HH:mm', 'ha']
						},
						days: {
							format: ['dd. M']									
						},
						months: {
							format: ['M. yyyy']									
						},
						years: {
							format: ['yyyy']									
						},
					}
				},
				minorGridlines: {
					units: {
						hours: {
							format: ['HH:mm', 'ha']
						},
						days: {
							format: ['dd. M', 'ha']
						},
						months: {
							format: ['M. yy']									
						},
					  
					}
			   },
		   },

	vAxis: {slantedTextAngle:90,
			0: {title: 'Teplota',
				format:"#°C",
			   },
			1: {title: 'Vlhkost',
				format:"#%",
			   },
			2: {title: 'Tlak',
				format:"#hPa",
			   },
			2: {title: 'Světlo',
				format:"#lx",
			   },
		   },

	series: {
			0:osy[0],
			1:osy[1],
			2:osy[2],
			3:osy[3],
			},

	backgroundColor: 'transparent',  			
};

var options2 = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };


var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

chart.draw(data, options);
document.getElementById("loader").style.display = "none";
document.getElementById("loader-small1").style.display = "none";
document.getElementById("loader-small2").style.display = "none";
document.getElementById("loader-small3").style.display = "none";
}