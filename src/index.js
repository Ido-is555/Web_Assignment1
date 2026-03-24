// --- loading dogs data from the mock server ---
async function loadData(){
    const responce = await fetch('https://0c0305d8-43e8-4997-b099-b944dd9f29fc.mock.pstmn.io/dogs');
    const data = await responce.json(); 
    
    // --- iterating through all dogs ---
    for (let i=0; i < data.length; i++){
        const currDog = data[i];
        const dogID = currDog.id;
        
        // --- updating relevant div in DOM ---
        const div = document.getElementById(`dog${dogID}`);
        div.querySelector(`#img${dogID}`).src = currDog.first_image_url;
        div.querySelector(`#name${dogID}`).textContent = currDog.name;
        div.querySelector(`#link${dogID}`).href = `dog.html?id=${dogID}`;

        // --- Gamification: adding favorite icon ---
        let favBtn = div.querySelector('.fav-btn');
        if (!favBtn) {
            favBtn = document.createElement('button');
            favBtn.className = 'fav-btn';
            div.appendChild(favBtn);
        }

        favBtn.textContent = favManager.isFavorite(dogID) ? '❤️' : '🤍';

        favBtn.onclick = function() {
            const isNowFav = favManager.toggleFavorite(dogID);
            favBtn.textContent = isNowFav ? '❤️' : '🤍';
        };
    }

    setupFavoritesFilter(data.length);
}

// --- Gamification: Filter Favorites ---
function setupFavoritesFilter(totalDogsCount) {

    const heading = document.querySelector('h1');
    const filterBtn = document.createElement('button');
    filterBtn.id = 'filter-favs-btn';
    filterBtn.className = 'filter-btn';
    filterBtn.textContent = '⭐ הצג מועדפים בלבד';
    
    heading.parentNode.insertBefore(filterBtn, heading.nextSibling);

    let showingOnlyFavs = false;
    
    // --- manage filtering ---
    filterBtn.addEventListener('click', () => {
        showingOnlyFavs = !showingOnlyFavs; // ---> update state
        
        filterBtn.textContent = showingOnlyFavs ? '🐶 חזור להצגת כל הכלבים' : '⭐ הצג מועדפים בלבד';
        
        // --- filtering ---
        for (let i = 1; i <= totalDogsCount; i++) {
            const dogDiv = document.getElementById(`dog${i}`);
            if (dogDiv) {
                if (showingOnlyFavs) {
                    if (favManager.isFavorite(i)) {
                        dogDiv.style.display = 'flex'; 
                    } else {
                        dogDiv.style.display = 'none';
                    }
                } else {
                    dogDiv.style.display = 'flex';
                }
            }
        }
    });
}

// --- asking the os to operate the function when the DOM finishes loading ---
document.addEventListener('DOMContentLoaded', loadData);