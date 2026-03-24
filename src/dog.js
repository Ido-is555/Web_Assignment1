var id = getDogIDFromURL();

// --- removing "Prev" or "Next" if needed ---
if (id == "1"){
    const prev = document.getElementById('prev-btn');
    prev.style.display = 'none';
}
if (id == "6"){
    const prev = document.getElementById('next-btn');
    prev.style.display = 'none';
}

// --- loading and presenting data ---
async function loadData(){
    const responce = await fetch(`https://0c0305d8-43e8-4997-b099-b944dd9f29fc.mock.pstmn.io/dogs/${id}`);
    const dog = await responce.json();

    document.getElementById('heading').textContent = `${dog.name} Details`;
    document.getElementById('img').src = dog.first_image_url;
    document.getElementById('name').textContent = dog.name;
    document.getElementById('breed').textContent = dog.breed;
    document.getElementById('age').textContent = dog.age;
    document.getElementById('sex').textContent = dog.sex;
    document.getElementById('house').textContent = formatBoolean(dog.house_trained);
    document.getElementById('vaccine').textContent = formatBoolean(dog.vaccinated);
    document.getElementById('story').textContent = dog.story;
    document.getElementById('link').href = `adopt.html?id=${id}`;
    var idInt = parseInt(id, 10);
    document.getElementById('prev-btn').href = `dog.html?id=${idInt-1}`;
    document.getElementById('next-btn').href = `dog.html?id=${idInt+1}`;

    // --- Gamification: favs ---
    
    const imgContainer = document.getElementById('img').parentElement;
    imgContainer.style.position = 'relative'; 

    let favBtn = document.createElement('button');
    favBtn.className = 'fav-btn';
    
    favBtn.textContent = favManager.isFavorite(id) ? '❤️' : '🤍';
    
    favBtn.onclick = function() {
        const isNowFav = favManager.toggleFavorite(id);
        favBtn.textContent = isNowFav ? '❤️' : '🤍';
    };

    imgContainer.appendChild(favBtn);
}

// --- asking os to operate the functions as HTML finishes loading ---
document.addEventListener('DOMContentLoaded', loadData);