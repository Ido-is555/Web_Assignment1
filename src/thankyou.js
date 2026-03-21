// --- reading the id from URL params ---
var params = new URLSearchParams(window.location.search); 
var id = params.get("id");

// --- loading and presenting data ---
async function loadData(){
    const response = await fetch(`https://0c0305d8-43e8-4997-b099-b944dd9f29fc.mock.pstmn.io/dogs/${id}`);
    const dog = await response.json();

    document.getElementById('img').src = dog.first_image_url;
    document.getElementById('name').textContent = dog.name;
}

// --- asking os to operate the functions as HTML finishes loading ---
document.addEventListener('DOMContentLoaded', loadData);