import moment from 'moment';

export function kelvinToFahrenheit(kelvin) {
  return Math.round((parseInt(kelvin) - 273.15) * 1.8 + 32);
}
export function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}
export function stringifyArray(array) {
  let out = "";
  for (let i = 0; i < array.length - 1; i++) {
    out += array[i] + ", ";
  }
  out += array[array.length - 1];
  return out;
}
export function formatTimestamp(song_ms) {
    return moment(song_ms).format('m:ss');
}