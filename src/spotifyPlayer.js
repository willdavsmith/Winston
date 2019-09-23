import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import annyang from 'annyang';
import * as utils from './utils';
const spotifyApi = new SpotifyWebApi();

function SpotifyPlayer() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showing, setShowing] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [playback, setPlayback] = useState({
    name: '', 
    albumArt: '', 
    artists: [''],
    currentTimestamp: '',
    duration: ''
  });

  function show() {
    const params = utils.getHashParams();
    const token = params.access_token;
    if (token) spotifyApi.setAccessToken(token);
    setLoggedIn(token ? true : false);
    const commands = { 'hey Winston *request': handleRequest }
    annyang.addCommands(commands);
    annyang.start({ autoRestart: false, continuous: true });
    getNowPlaying();
  }

  function handleRequest(request) {
    let result = request;
    const play = result.search(/play/i) === 0;
    const shuffle = result.search(/shuffle/i) === 0;
    if (play || shuffle) {
      if (shuffle) {
        spotifyApi.setShuffle(true);
        result = result.replace(/'shuffle /i, '');
      }
      else {
        result = result.replace(/play /i, '');
      }
      if (result.search(/by/i) !== -1) {
        result = result.replace(/by /i,'');
      }
      playSong(result);
    }
  }

  function playSong(query) {
    console.log(query);
    if (query === null) return;
    // album and artist support
    spotifyApi.searchTracks(query).then(response => {
      spotifyApi.play({"uris":[response.tracks.items[0].uri]})
        .then(() => {
          setTimeout(function() { 
            getNowPlaying(); }, 500);
        });
    }
    ).catch(err => { 
      console.log(`cannot find "${query}"`); 
    });
  }

  async function getNowPlaying() {
    let response = await spotifyApi.getMyCurrentPlaybackState();
    console.log(response);
    if (response.is_playing !== undefined) {
      setPaused(!response.is_playing);
      setShowing(true);
      setTime(Math.round(response.progress_ms / 1000) - 1);
      setPlayback({
        name: response.item.name,
        albumArt: response.item.album.images[0].url,
        artists: response.item.artists.map(artist => artist.name),
        duration: response.item.duration_ms
      });
    }
  }

  function tick() {
    if (!paused) {
      setTime(t => t + 1);
    }
    if ((!paused && utils.formatTimestamp(time*1000) === utils.formatTimestamp(playback.duration)) 
          || time % 10 === 0 || paused) {
      getNowPlaying();
    }
  }

  useEffect(() => {
    let timer = setInterval(() => tick(), 1000);
    if (!showing) {
      show();
    }
    console.log(time);
    return function cleanup() {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <div id="spotifyPlayer">
      {!loggedIn && <button><a href='http://localhost:8888'>Login to Spotify</a></button> }
      <img id="spotifyImg" src={playback.albumArt} alt="" />
      <p>{ playback.name }</p>
      <p>{ utils.stringifyArray(playback.artists) }</p>
      <p>{ `${utils.formatTimestamp(time*1000)} / ${utils.formatTimestamp(playback.duration)}` }</p>
    </div>
  );
}

export default SpotifyPlayer;
