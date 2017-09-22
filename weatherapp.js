// reloads page after 30min
setTimeout(function(){
   window.location.reload(1);
}, 1800000);
//Variables for api and coordinates
  var api = "https://fcc-weather-api.glitch.me/api/current?lat=";
  var lat;
  var lon;
//Variable for fahrenheit/celsius changer
	var text = document.getElementById("temp-type").innerHTML;
//HTML DOM variables
	var x = document.getElementById("status");
	var y = document.getElementById("weather-location");
	var t = document.getElementById("temp");
	var h = document.getElementById("humidity");
	var w = document.getElementById("wind");
	var d = document.getElementById("description");
	var img = document.getElementById("wicon");
	var mainW = document.getElementById("temp");
	var image = document.getElementById("body");


//geoLocation function
(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
})()
  var myObj;
  var myArr;
  var fahr;
//assign coordinates to variables
function showPosition(position) {
    lat = (position.coords.latitude);
    lon = (position.coords.longitude);
 //Get JSON from xhttp request and implement infos in html
  var url = api + lat + "&lon=" + lon;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    myArr = JSON.stringify(myObj);
      fahr = Math.round(1.8 * myObj.main.temp + 32);
      y.innerHTML = myObj.name + ", " + myObj.sys.country;
      h.innerHTML = "Humidity: " + myObj.main.humidity + "%";
      w.innerHTML = "Wind: " + Math.round(myObj.wind.speed) + " m/s";
      mainW.innerHTML = myObj.weather[0].main + ", " + Math.round(myObj.main.temp) + "°C";
			d.innerHTML = myObj.weather[0].description;



			if (myObj.weather[0].main == "Clouds") {
			document.getElementById("wicon").src = "https://png.icons8.com/cloud/office/80";
			} else if (myObj.weather[0].main == "Rain") {
				document.getElementById("wicon").src = "https://png.icons8.com/rain/office/80";
			} else if (myObj.weather[0].main == "Drizzle") {
				document.getElementById("wicon").src = "https://png.icons8.com/light-rain/office/80";
			} else if (myObj.weather[0].main == "Clear") {
				document.getElementById("wicon").src = "https://png.icons8.com/sun/office/80";
			} else if (myObj.weather[0].main == 'Thunderstorm') {
				document.getElementById("wicon").src = "https://png.icons8.com/cloud-lightning/office/80"
			} else if (myObj.weather[0].main == "Snow") {
				document.getElementById("wicon").src = "https://png.icons8.com/snow/office/80";
			}
			else {
				document.getElementById("wicon").src = "http://reledesign.fi/images/rapa_simple2.svg"
			}

		}

  };
xhttp.open("GET", url, true);
  xhttp.send();
};
//function for f/c changer
function htmlchange(){
  fahr = 1.8 * myObj.main.temp + 32;
     if (document.getElementById("temp").textContent.charAt(document.getElementById("temp").textContent.length-1) == "C") {
       mainW.innerHTML = myObj.weather[0].main + ", " +  Math.round(fahr) + "°F";
     } else {
       mainW.innerHTML = myObj.weather[0].main + ", " +  Math.round(myObj.main.temp) + "°C";
     }
 }
    document.getElementById("temp-type").onclick = htmlchange;
