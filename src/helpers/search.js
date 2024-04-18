
export const preprocessSpotifySearch = (track, artist) => {
    return track.replace(' ', '%20') + "%20track:" + track.replace(' ', '%20') + "%20artist:" + artist.replace(' ', '%20')
}
