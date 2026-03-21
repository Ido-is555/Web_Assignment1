// --- reading the id from URL params ---
var params = new URLSearchParams(window.location.search); 
var id = params.get("id");

// --- removing "Prev" or "Next" if needed ---
if (id == "1"){
    const prev = document.getElementById('prev');
    prev.style.display = 'none';
}
if (id == "6"){
    const prev = document.getElementById('next');
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
    var house = "Yes";
    if (dog.house_trained == "false")
        house = "No";
    document.getElementById('house').textContent = house;
    var vaccine = "Yes";
    if (dog.vaccinated == "false")
        vaccine = "No";
    if (dog.vaccinated == null)
        vaccine = "Unknown";
    document.getElementById('vaccine').textContent = vaccine;
    document.getElementById('story').textContent = dog.story;
    document.getElementById('link').href = `adopt.html?id=${id}`;
    var idInt = parseInt(id, 10);
    document.getElementById('prev').href = `dog.html?id=${idInt-1}`;
    document.getElementById('next').href = `dog.html?id=${idInt+1}`;
}

// --- asking os to operate the functions as HTML finishes loading ---
document.addEventListener('DOMContentLoaded', loadData);