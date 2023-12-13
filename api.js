// api.js

const apiUrl = 'https://api.artic.edu/api/v1/artworks';

// Function to fetch artwork data by artwork title
async function fetchArtworkDataByArtwork(artworkTitle) {
    try {
        const response = await fetch(`${apiUrl}/search?fields=title,artist_display,date_display,image_id&q=${artworkTitle}`);
        if (!response.ok) {
            throw new Error(`Error fetching artwork data. Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error fetching artwork data:', error);
        throw error;
    }
}

// Function to fetch artwork data by artist name
async function fetchArtworkDataByArtist(artistName) {
    try {
        const response = await fetch(`${apiUrl}/search?fields=title,artist_display,date_display,image_id&q=${artistName}`);
        if (!response.ok) {
            throw new Error(`Error fetching artwork data. Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error fetching artwork data:', error);
        throw error;
    }
}
