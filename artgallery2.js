// artGallery.js

// Artwork class
class Artwork {
    constructor(title, artistDisplay, description, imageId) {
        this.title = title;
        this.artistDisplay = artistDisplay;
        this.description = description;
        this.imageId = imageId;
    }

    // You can add more methods or properties as needed
}

// ArtGallery class
class ArtGallery {
    constructor() {
        this.artworks = [];
    }

    addArtwork(artwork) {
        this.artworks.push(artwork);
    }

    // You can add more methods or properties as needed
}

// Function to search and display artworks by artist's display name
function searchArtworks() {
    // Collect user input values
    const artistDisplayName = document.getElementById('search-input').value;

    // Create the URL for searching artworks by artist's display name
    const apiUrl = 'https://api.artic.edu/api/v1/artworks';
    const url = `${apiUrl}?artist_id=${artistDisplayName}`;

    // Fetches data from the Chicago API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Complete Artwork Data:', data);

            if (data.data && data.data.length > 0) {
                // Display information for all artworks
                const artworkContainer = document.getElementById('artwork-details');
                artworkContainer.innerHTML = ''; // Clear previous results

                data.data.forEach(artworkData => {
                    // Create an instance of the Artwork class
                    const artwork = new Artwork(
                        artworkData.title,
                        artworkData.artist_display || 'Unknown Artist',
                        artworkData.description || 'No description available',
                        artworkData.image_id
                    );

                    // Add the artwork to the gallery
                    artGallery.addArtwork(artwork);

                    // Create a div element for each artwork
                    const artworkDiv = document.createElement('div');

                    // Display artwork information using the Artwork class instance
                    artworkDiv.innerHTML = `
                        <h3>Title: ${artwork.title}</h3>
                        <p>Artist: ${artwork.artistDisplay}</p>
                        <p>Description: ${artwork.description}</p>
                        <img src="${getArtworkImageUrl(artwork.imageId)}" alt="Artwork Image">
                    `;

                    // Add each artwork's details to the container
                    artworkContainer.appendChild(artworkDiv);
                });
            } else {
                console.log('No artwork data found.');
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}
