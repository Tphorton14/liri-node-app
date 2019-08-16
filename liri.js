require("dotenv").config();
const fs = require('fs');
const Spotify = require('node-spotify-api');
const request = require('request');


const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

var action = process.argv[2];
let parameter = process.argv[3];


switch (action) {
    case "concert-this":
        concertThis(parameter);
        break;

    case "spotify-this-song":
        spotifyThisSong(parameter);
        break;

    case "movie-this":
        movieThis(parameter);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        display("Please type in a valid command...");
        break;
};


function concertThis(parameter) {

    if ('concert-this') {
        var artist = "";
        for (let i = 3; i < process.argv.length; i++) {
            artist =+ process.argv[i];
        }
        console.log(artist);
    } else {
        artist = parameter;
    }


    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";



    request(queryUrl, function (err, res, body) {

        if (!err && res.statusCode === 200) {

            const parse = JSON.parse(body);
            for (i = 0; i < parse.length; i++) {
                const dTime = parse[i].datetime;
                const month = dTime.substring(5, 7);
                const year = dTime.substring(0, 4);
                const day = dTime.substring(8, 10);
                const dateForm = month + "/" + day + "/" + year

                logIt("\n---------------------------------------------------\n");


                logIt("Date: " + dateForm);
                logIt("Name: " + parse[i].venue.name);
                logIt("City: " + parse[i].venue.city);
                if (parse[i].venue.region !== "") {
                    logIt("Country: " + parse[i].venue.region);
                }
                logIt("Country: " + parse[i].venue.country);
                logIt("\n---------------------------------------------------\n");

            }
        }
    });

}





function spotifyThisSong(name) {
    spotify.search({ type: 'track', query: name, limit: 1 }).then(function (err, data) {
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('Spotify Link: ' + data.tracks.items[0].preview_url);

    }).catch(function (err, data) {
        console.log('Artist: Ace of Base');
        console.log('Song: The Sign');
        console.log('Album: The Sign');
    });
};

function movieThis() {
    let url = "http://www.omdbapi.com/?apikey=trilogy"
    parameter ? url += '&t=' + parameter : url += '&t=Mr. Nobody';
    url += '&type=movie';
    request(url, function (err, res, body) {

        body = JSON.parse(body);
        console.log('Title: ' + body.Title);
        console.log('Year: ' + body.Year);
        console.log('IMDB Rating: ' + body.Ratings[0].Value);
        console.log('Rotten Tomatoes Rating: ' + body.Ratings[1].Value);
        console.log('Countries Produced: ' + body.Country);
        console.log('Languages: ' + body.Language);
        console.log(body.Plot);
        console.log('Actors: ' + body.Actors);
    });

};


function doWhatItSays() {
    fs.readFile('random.txt', 'utf-8',function (err,data) {

        if (err) {
            return console.log(err);
        }


        const dataArr = data.split(",");

        if ("spotify-this-song") {
            const songcheck = dataArr[1].trim().slice(1, -1);
            spotifyThisSong(songcheck);
        }
        else if ("concert-this") {
            if ("") {
                const dataLength = dataArr[1].length - 1;
                let data = dataArr[1].substring(2, dataLength);
                console.log(data);
                concertThis(data);
            }
            else {
                const bandName = dataArr[1].trim();
                console.log(bandName);
                concertThis(bandName);
            }

        }
        else if (dataArr[0] === "movie-this") {
            const movie_name = dataArr[1].trim().slice(1, -1);
            movieThis(movie_name);
        }

    });

};
