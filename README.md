# Introduction
LIRI is a command line node app that takes in parameters and gives you back data.

# Liri Functions
concert-this

spotify-this-song

movie-this

do-what-it-says

# Running the following commands in your terminal will do the following:
node liri.js concert-this 'concert or band name'

This will show the following information about each event to your terminal/bash window:

Name of the Venue

Location of the Venue

Date of the Event
![Image of Yaktocat](https://github.com/Tphorton14/liri-node-app/blob/master/images/concert.JPG)

node liri spotify-this-song 'song name' This will show the following about the song in your terminal/bash window:

Artist(s)

Song Name

Album of the Song

Song Preview Link
![Image of Yaktocat](https://github.com/Tphorton14/liri-node-app/blob/master/images/spot.JPG)

node liri.js omdb 'movie name' This will output the following information to your terminal/bash window:

Title of the Movie

Year the Movie was Released

The IMDB Rating

Country the Movie was made in

Language the Movie is in

Plot of the Movie

Actors in the Movie

The Rotten Tomatoes Rating
![Image of Yaktocat](https://github.com/Tphorton14/liri-node-app/blob/master/images/pic3.JPG)

node liri.js do-what-it-says The program will take the text inside of random.txt and use it to call the first command with the second
part as it's parameter

Currently in random.txt, the following text is there:

spotify-this-song,"I Want it That Way"

This would call the spotify-this-song function and pass in "I Want it That Way" as the song.
![Image of Yaktocat](https://github.com/Tphorton14/liri-node-app/blob/master/images/do.JPG)
