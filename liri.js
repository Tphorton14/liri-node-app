require("dotenv").config();
const Spotify = require('node-spotify-api');
const request = require('request');


const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var parameter = process.argv[3];


switch (process.argv[2]) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        fs.readFile(__dirname, "random.txt", function (err, data) {
            data = data.split(",");
            switch (data[0]) {
                case "concert-this":
                    concertThis();
                    break;
                
                case "spotify-this-song":
                    spotifyThisSong(data[1]);
                    break;

                case "movie-this":
                    movieThis();
                    break;

                default:
                    console.log(err);

            }
        });

        break;

	    default:
		console.log('Please type in a valid command...');
}



function concertThis(){
    if (action === 'concert-this')
    {
        let artist= "";
        for (var i = 3; i < process.argv.length; i++)
        {
            artist+=process.argv[i];
        }
        console.log(artist);
    }
    else
    {
        artist = parameter;
    }
    
    const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
}

request(queryUrl, function(error, res, body) {

    if (!error && res.statusCode === 200) {
  
      var JS = JSON.parse(body);
      for (i = 0; i < JS.length; i++)
      {
        const dTime = JS[i].datetime;
          const month = dTime.substring(5,7);
          const year = dTime.substring(0,4);
          const day = dTime.substring(8,10);
          const dateForm = month + "/" + day + "/" + year
    
        logIt("\n---------------------------------------------------\n");
  
          
        logIt("Date: " + dateForm);
        logIt("Name: " + JS[i].venue.name);
        logIt("City: " + JS[i].venue.city);
        if (JS[i].venue.region !== "")
        {
          logIt("Country: " + JS[i].venue.region);
        }
        logIt("Country: " + JS[i].venue.country);
        logIt("\n---------------------------------------------------\n");
  
      }
    }
  });
  }


function spotifyThisSong(name) {
	spotify.search({type: 'track',query: name,limit:1}).then(function (data) {
		console.log('Artist: '+data.tracks.items[0].artists[0].name);
		console.log('Song: '+data.tracks.items[0].name);
		console.log('Album: '+data.tracks.items[0].album.name);
		console.log('Spotify Link: '+data.tracks.items[0].preview_url);
		
	}).catch(function(err) {
		console.log('Artist: Ace of Base');
		console.log('Song: The Sign');
		console.log('Album: The Sign');
	});
}

function movieThis(name) {
	let url ="http://www.omdbapi.com/?apikey=trilogy"
	process.argv[3] ? url += '&t='+process.argv[3] : url += '&t=Mr. Nobody';
	url += '&type=movie';
	request(url, function (err,res,body) {
		
		body = JSON.parse(body);
		console.log('Title: '+body.Title);
		console.log('Year: '+body.Year);
		console.log('IMDB Rating: '+body.Ratings[0].Value);
		console.log('Rotten Tomatoes Rating: '+body.Ratings[1].Value);
		console.log('Countries Produced: '+body.Country);
		console.log('Languages: '+body.Language);
		console.log(body.Plot);
		console.log('Actors: '+body.Actors);
	});
}