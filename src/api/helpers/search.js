export const searchTrackAndArtist = async (search) => {
    try {
        const response = await fetch(`https://chatmp3-beta-b250fc6fa9a8.herokuapp.com/routes/search/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: '{"query":"'+search+'"}',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};
