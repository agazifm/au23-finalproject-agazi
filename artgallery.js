// artGallery.js

// Artwork class
class Artwork {
    constructor(title, artistId, imageId) {
        this.title = title;
        this.artist = artistId;
        this.imageId = imageId;
    }

    // Method to display artwork details in the UI
    displayDetails() {
        console.log(`Title: ${this.title}\nArtist: ${this.artist}\nImage ID: ${this.imageId}`);
    }
}

// ArtGallery class
class ArtGallery {
    constructor() {
        this.artworks = [];
    }

    // Method to add artwork to the gallery
    addArtwork(artwork) {
        this.artworks.push(artwork);
    }

    // Method to display all artworks in the UI
    displayArtworks() {
        console.log('Artworks:', this.artworks);
    }

    // Method to search artworks by artist name
    searchByArtist(artistName) {
        const artistArtworks = this.artworks.filter(artwork => artwork.artist.toLowerCase().includes(artistName.toLowerCase()));
        console.log(`Artworks by ${artistName}:`, artistArtworks);
    }

    // Method to search artworks by title
    searchByTitle(title) {
        const titleArtworks = this.artworks.filter(artwork => artwork.title.toLowerCase().includes(title.toLowerCase()));
        console.log(`Artworks with title ${title}:`, titleArtworks);
    }
}

let searchTimeout;
let currentSearchType = 'artwork'; // default search 

document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for search button, toggle button, and search input
    const searchButton = document.getElementById('search-button');
    const toggleButton = document.getElementById('toggle-search');
    const searchInput = document.getElementById('search-input');

    if (searchButton && toggleButton && searchInput) {
        searchButton.addEventListener('click', () => {
            performSearch();
        });

        toggleButton.addEventListener('click', () => {
            toggleSearchType();
        });

        searchInput.addEventListener('input', () => {
            // a timeout for search to avoid frequent requests
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch();
                clearSearchInput();
            }, 10000);
        });
    } else {
        console.error('Search, toggle, or input elements not found in the document.');
    }

    // Event listener for the "View Favorites" link/button
    const viewFavoritesLink = document.getElementById('view-favorites-link');

    if (viewFavoritesLink) {
        viewFavoritesLink.addEventListener('click', () => {
            // Display favorite artworks when the "View Favorites" link is clicked
            displayFavoriteArtworks();
        });
    }

    // Listen for the 'favoritesUpdated' event and update the UI
    document.addEventListener('favoritesUpdated', () => {
        displayFavoriteArtworks();
    });
});

// Function to perform the search based on the current search type
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value;

    if (currentSearchType === 'artwork') {
        fetchArtworkDataByArtwork(searchTerm)
            .then(data => {
                console.log('Artwork data:', data);
                displayArtworks(data);
            })
            .catch(error => {
                console.error('Error performing search:', error);
            });
    } else if (currentSearchType === 'artist') {
        fetchArtworkDataByArtist(searchTerm)
            .then(data => {
                console.log('Artwork data:', data);
                displayArtworks(data);
            })
            .catch(error => {
                console.error('Error performing search:', error);
            });
    } else {
        console.error('Invalid search type.');
    }
}

// Function to toggle between searching by artwork and artist
function toggleSearchType() {
    const searchInput = document.getElementById('search-input');
    const currentPlaceholder = searchInput.getAttribute('placeholder');

    if (currentPlaceholder === 'Search by artwork') {
        searchInput.setAttribute('placeholder', 'Search by artist');
        currentSearchType = 'artist';
    } else {
        searchInput.setAttribute('placeholder', 'Search by artwork');
        currentSearchType = 'artwork';
    }
}

// Function to display artworks in the UI
function displayArtworks(artworks) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    artworks.forEach(artwork => {
        const artworkDiv = document.createElement('div');
        const imageUrl = getArtworkImageUrl(artwork.image_id); // call a function to construct the image URL
        const isFavorited = isFavorite(artwork.id); // each artwork has a unique id

        artworkDiv.innerHTML = `
            <h3>Title: ${artwork.title}</h3>
            <p>Artist: ${artwork.artist_display}</p>
            <p>Date: ${artwork.date_display} <button class="favorite-button" data-artwork-id="${artwork.id}" onclick="toggleFavorite(this)">
            <span class="star ${isFavorited ? 'active' : ''}">&#9733;</span>
        </button></p>
            <img src="${imageUrl}" alt="Artwork Image">
        `;
        resultsContainer.appendChild(artworkDiv);
    });
}

// Function to toggle the favorite STAR
function toggleFavorite(button) {
    const artworkId = button.dataset.artworkId;

    if (isFavorite(artworkId)) {
        removeFromFavorites(artworkId);
        button.querySelector('.star').classList.remove('active');
    } else {
        addToFavorites(artworkId);
        button.querySelector('.star').classList.add('active');
    }
}

// Function to get the artwork image URL
function getArtworkImageUrl(imageId) {
    // Construct the image URL using the provided image_id
    return `https://www.artic.edu/iiif/2/${imageId}/full/600,/0/default.jpg`;
}

// Function to clear the search input
function clearSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }
}
