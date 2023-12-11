// Main script to initialize art gallery

// Fetch artwork data from the Artsy API
fetchArtworkData().then((artworks) => {
    // Create instances of Artwork, Artist, and GallerySection classes
    const artworkInstances = artworks.map(artwork => new Artwork(artwork.title, artwork.artist, artwork.description, artwork.imageUrl));
    const artistInstances = [...new Set(artworks.map(artwork => new Artist(artwork.artist.name, artwork.artist.biography))))];
    const gallerySections = [new GallerySection('All Artworks', artworkInstances)];

    // code to organize artworks into different gallery sections based on categories or themes

    // displays the gallery using the created instances
    displayGallery(gallerySections);
});
