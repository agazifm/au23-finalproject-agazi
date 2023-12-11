// Artwork class to represent individual artworks
class Artwork {
    constructor(title, artist, description, imageUrl) {
        this.title = title;
        this.artist = artist;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    displayDetails() {
        // Add code to display additional details when clicked
    }
}

// Artist class to represent artists
class Artist {
    constructor(name, biography) {
        this.name = name;
        this.biography = biography;
    }
}

// GallerySection class to organize artworks into different categories or themes
class GallerySection {
    constructor(title, artworks) {
        this.title = title;
        this.artworks = artworks;
    }
}
