// --- loading dogs data from the mock server ---
async function loadData(){
    // --- fetching and parsing data from the mock server ---
    const entireHTTPResponce = await fetch('https://0c0305d8-43e8-4997-b099-b944dd9f29fc.mock.pstmn.io/dogs');
    const data = await entireHTTPResponce.json(); // ---> parsed into an array
    
    // --- iterting through all dogs ---
    for (let i=0; i < data.length; i++){
        const currDog = data[i];
        const dogID = currDog.id;
        // --- updating relevant div in DOM ---
        const div = document.getElementById(`dog${dogID}`);
        div.querySelector(`#img${dogID}`).src = currDog.first_image_url;
        div.querySelector(`#name${dogID}`).textContent = currDog.name;
        div.querySelector(`#link${dogID}`).href = `dog.html?id=${dogID}`;
    }
}

// --- asking the os to operate the function when the DOM finishes loading ---
document.addEventListener('DOMContentLoaded', loadData);