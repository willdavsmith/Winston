import React from 'react';
import Clock from './clock';
import Weather from './weather';
import News from './news';
import SpotifyPlayer from './spotifyPlayer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div id="header">
          <Clock />
          <Weather />
        </div>
        <div id="footer">
          <News />
          <SpotifyPlayer />
        </div>
      </div>
    );
  }
}

export default App;
