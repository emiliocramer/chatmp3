import { useState } from "react";
import './emailbar.css';

export const Emailbar = () => {
    const [email, setEmail] = useState('');
    const [isEntered, setIsEntered] = useState(false);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && email.trim()) {
            setIsEntered(true);
        }
    };

    return (
        <div className="email-primary-container">
            <input
                className="email-bar"
                type="text"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isEntered}
            />
        </div>
    );
}
