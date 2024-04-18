import {useState} from "react";
import './searchbar.css';
import {preprocessSpotifySearch} from "../../helpers/search";
import {searchTrackAndArtist} from "../../api/helpers/search";
import {PlayBar} from "../playbar/playbar";


export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [returnedSong, setReturnedSong] = useState('')
    const [returnedCoverArt, setReturnedCoverArt] = useState('')
    const [returnedArtist, setReturnedArtist] = useState('')
    const [errorCode, setErrorCode] = useState('')

    const dissectSearch = (search) => {
        const firstByIndex = search.indexOf(' by ');

        if (firstByIndex === -1 || firstByIndex === 0) {
            console.error('Invalid search format. Please use "track by artist".');
            return null;
        }

        let track = search.slice(0, firstByIndex).trim();

        let artist = search.slice(firstByIndex + 4).trim();

        return([{ track, artist }])
    }

    const handleSearch = async () => {
        setIsSearching(true)
        setReturnedCoverArt('')
        setReturnedSong('')
        setReturnedArtist('')
        setSearchTerm('')
        try {
            const dissectedSearch = dissectSearch(searchTerm);
            const refactoredSearch = preprocessSpotifySearch(dissectedSearch[0].track, dissectedSearch[0].artist);
            const searchResults = await searchTrackAndArtist(refactoredSearch);
            setIsSearching(false);
            console.log(searchResults)
            setReturnedSong(searchResults.tracks.items[0].name)
            setReturnedCoverArt(searchResults.tracks.items[0].album.images[0].url)
            setReturnedArtist(searchResults.tracks.items[0].artists[0].name)
        } catch (error) {
            setErrorCode('Try Inputting a song with the format "track by artist"')
            setIsSearching(false)
        }
    }

    return (
        <div className={"search-primary-container"}>
            <h3>Search for your Favorite Song</h3>
            <input className={"search-bar"} type="text" placeholder="Bohemian Rhapsody by Queen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button className={"search-button"} disabled={isSearching} onClick={handleSearch}>Search</button>
            {errorCode !== '' && <p>{errorCode}</p>}
            {returnedSong !== '' &&
                <>
                    <div className={'returned-song-object'}>
                        <img src={returnedCoverArt} alt="Album Cover" />
                        <p className={"title"}>
                            {returnedSong}
                        </p>
                        <p className={"artist"}>
                            {returnedArtist}
                        </p>
                    </div>
                    <PlayBar />
                </>
            }
        </div>
    )
}
