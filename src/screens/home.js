import {SearchBar} from "../components/searchbar/searchbar";

import './home.css';

export const HomeScreen = () => {


    return (
        <div className={"home-container"}>
            <h1>ChatMp3</h1>
            <div className={"search-wrapper"}>
                <SearchBar />
            </div>
        </div>
    )
}
