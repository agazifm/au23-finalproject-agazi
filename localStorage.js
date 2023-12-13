//localStorage.js file
// Function to check if an artwork is in favorites
function isFavorite(artworkId) {
    const favorites = getFavorites();
    return favorites.includes(artworkId);
}

// Function to get the favorites from local storage
function getFavorites() {
    const favoritesString = localStorage.getItem('favorites');
    return favoritesString ? JSON.parse(favoritesString) : [];
}

// Function to add an artwork to favorites
function addToFavorites(artworkId) {
    const favorites = getFavorites();
    if (!favorites.includes(artworkId)) {
        favorites.push(artworkId);
        updateFavorites(favorites);
    }
}

// Function to remove an artwork from favorites
function removeFromFavorites(artworkId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(artworkId);
    if (index !== -1) {
        favorites.splice(index, 1);
        updateFavorites(favorites);
    }
}

// Function to update favorites in local storage
function updateFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Trigger the 'favoritesUpdated' event
    const event = new Event('favoritesUpdated');
    document.dispatchEvent(event);
}


