import { useState } from "react";
import './playbar.css';
import {Emailbar} from "../emailbar/emailbar";

export const PlayBar = () => {
    const [prompt, setPrompt] = useState('');
    const [isEntered, setIsEntered] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    const handleEnter = () => {
        if (prompt.trim()) {
            setIsEntered(true);
        }
    };

    return (
        <div className="play-primary-container">
            <h3>How would you like to change the song?</h3>
            <input
                className="play-bar"
                type="text"
                placeholder="Add the voice of Taylor Swift... Change the beat to include a guitar..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isEntered}
            />
            <button
                className="play-enter-button"
                onClick={handleEnter}
                disabled={isEntered}
            >
                Enter
            </button>
            {isEntered && (
                <>
                    {hasEntered === true ? (
                        <p className={"response-text"}>Sweet! Can't wait to hear it! We will send your song to your email within 2 hours!</p>
                    ) : (
                        <>
                            <p className={"response-text"}>Looking good! If you want to receive your song, put in your email and you will receive within 2 hours!</p>
                            <Emailbar />
                        </>
                    )}
                    <button
                        onClick={() => {
                            setPrompt('');
                            setHasEntered(true);
                            setIsEntered(false);}
                        }
                        className="play-again-button">
                        Play Again
                    </button>
                </>
            )}
        </div>
    );
}
