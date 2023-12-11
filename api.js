// Artsy API key (replace 'YOUR_API_KEY' with your actual key)
const API_KEY = 'YOUR_API_KEY';

// Function to fetch artwork data from the Artsy API
async function fetchArtworkData() {
    try {
        const response = await fetch(`https://api.artsy.net/api/artworks?apikey=${API_KEY}`);
        const data = await response.json();
        return data._embedded.artworks;
    } catch (error) {
        console.error('Error fetching artwork data:', error);
    }
}
