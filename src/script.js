// --- reading the id from URL params ---
function getDogIDFromURL(){
    var params = new URLSearchParams(window.location.search); 
    var id = params.get("id");
    return id;
}

// --- converts from boolean to english ---
function formatBoolean(value){
    if (value == true)
        return "Yes";
    if (value == false)
        return "No";
    else
        return "Unknown";
}

// --- Favorites Gamification Logic ---
class FavoritesManager {
    constructor() {
        this.storageKey = 'favoriteDogs';
    }

    // --- getting all favs from local memory of the browser ---
    getFavorites() {
        const favs = localStorage.getItem(this.storageKey);
        return favs ? JSON.parse(favs) : []; 
    }

    // --- adding / removing fav ---
    toggleFavorite(id) {
        let favs = this.getFavorites();
        const strId = String(id); 
        
        if (favs.includes(strId)) {
            favs = favs.filter(favId => favId !== strId);
        } else {
            favs.push(strId);
        }
        
        // --- update local memory ---
        localStorage.setItem(this.storageKey, JSON.stringify(favs));
        return this.isFavorite(strId); // ---> return current status
    }

    // --- returs if the dog is fav ---
    isFavorite(id) {
        return this.getFavorites().includes(String(id));
    }
}

const favManager = new FavoritesManager();