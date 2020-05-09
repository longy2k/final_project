var searchBar = document.getElementById("search");

searchBar.addEventListener("keyup", function(event) {
	var v = searchBar.value;
	var sc = v.split(" ");
	sessionStorage.setItem('city', String(sc[1]));
  	// Number 13 is the "Enter" key on the keyboard
  	if (event.keyCode === 13) {
    	// Cancel the default action, if needed
    	event.preventDefault();

    	// Navigation search keys
	    switch (sc[0].substring(1)) {
			// Bmo main navigation
			case 'home':
				if (!v.includes(" ")) {
					window.open("index.html", "_self");
				}
				break;
			case 'news':
				if (!v.includes(" ")) {
					window.open("news.html", "_self");
				}
				break;
			case 'about':
				if (!v.includes(" ")) {
					window.open("about.html", "_self");
				}
				break;

			// Links
			case 'a':
				!v.includes(" ") ? window.open("https://www.amazon.com/", "_blank") : window.open("https://www.amazon.com/s?k=" + sc[1], "_blank");
				break;
	  	case 'g':
			!v.includes(" ") ? window.open("https://www.google.com/", "_blank") : window.open("https://www.google.com/search?sxsrf=ALeKk01Aka1yQyBjhoDDRHzKqIvtMgT6zQ%3A1588724832928&source=hp&ei=YASyXr_zNdGF9PwPt-WxsA4&q=" + sc[1], "_blank");
	    	break;
	  	case 'ddg':
			!v.includes(" ") ? window.open("https://duckduckgo.com/", "_blank") : window.open("https://duckduckgo.com/?q=" + sc[1], "_blank");
	    	break;
	  	case 'yt':
			!v.includes(" ") ? window.open("https://www.youtube.com/", "_blank") : window.open("https://www.youtube.com/results?search_query=" + sc[1], "_blank");
	    	break;
			case 'sof':
				!v.includes(" ") ? window.open("https://stackoverflow.com/", "_blank") : window.open("https://stackoverflow.com/search?q=" + sc[1], "_blank");
				break;
			case 'umb':
				!v.includes(" ") ? window.open("https://www.umb.edu/", "_blank") : window.open("https://www.umb.edu/search?cx=001225130692263366863%3Auxj4oosyzxy&cof=FORID%3A11&q=" + sc[1], "_blank");
				break;
		  	case 'r/' + sc[0].substring(3):
		   		window.open("https://old.reddit.com/r/" + sc[0].substring(3), "_blank");
				break;
			case 'weather':
				if (v.includes(" ")) {
					window.open("weather.html", "_self");
				}
				break;
	  	default: // Default search via Google
	  		window.open("https://www.google.com/search?sxsrf=ALeKk01Aka1yQyBjhoDDRHzKqIvtMgT6zQ%3A1588724832928&source=hp&ei=YASyXr_zNdGF9PwPt-WxsA4&q=" + sc[0], "_self");
		}
	}
});

function weather() {
	var url = "https://api.openweathermap.org/data/2.5/weather?q=" + sessionStorage.getItem("city") + "&units=metric&apikey=c44ed3a1061544ff65ee8eb061b2e27c";
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function(){
		var obj = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			var description = obj.weather[0].description;
			var temp = obj.main.temp;
			var feels_like = obj.main.feels_like;
			var humidity = obj.main.humidity;
			var wind_speed = obj.wind.speed * 60 * 60 * 0.000621371 * 1.60934;
			document.getElementById("description").innerHTML = description;
			document.getElementById("city").innerHTML = sessionStorage.getItem("city");
			document.getElementById("temp").innerHTML = temp;
			document.getElementById("feels_like").innerHTML = feels_like;
			document.getElementById("humidity").innerHTML = humidity;
			document.getElementById("wind_speed").innerHTML = wind_speed.toFixed(2);
		}
		else{
		 document.getElementById("error").innerHTML = "ERROR: Check city name;";
		}
	}
request.send();
}

function news() {
	var url = 'http://newsapi.org/v2/top-headlines?' +
	          'country=us&' +
	          'apiKey=329891973d8c45059a4662f12bf1182b';
	var req = new Request(url);
	fetch(req)
		.then(response => response.json())
	    .then(function(response) {
			for (var i = 0; i < response.totalResults; i++) {
				var title = response.articles[i].title;
				var url = response.articles[i].url;
				var newP = document.createElement("p");
				var newUrl = document.createElement("a");
				var titleText = document.createTextNode(String(title));
				newP.appendChild(newUrl);
				newUrl.appendChild(titleText);
				newUrl.title = String(title);
				newUrl.href = String(url);
				newUrl.target = "_blank";
				var element = document.getElementById("news");
				element.appendChild(newP);
			}
	    })
}
