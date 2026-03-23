// --- reading the id from URL params ---
var params = new URLSearchParams(window.location.search); 
var id = params.get("id");

// --- loading and presenting data ---
async function loadData(){
    const response = await fetch(`https://0c0305d8-43e8-4997-b099-b944dd9f29fc.mock.pstmn.io/dogs/${id}`);
    const dog = await response.json();

    document.getElementById('heading').textContent = `Adopt ${dog.name}`;
    document.getElementById('img').src = dog.first_image_url;
    document.getElementById('dogName').textContent = dog.name;
}

// --- reacting to the form ---
async function handleForm(){
    const dogForm = document.getElementById('dogForm');

    dogForm.addEventListener('submit', async function(e){
        e.preventDefault(); // ---> preventing page refresh
        
        // --- sending POST to mock server ---
        const formData = {
            email: document.getElementById('email').value,
            fullname: document.getElementById('name').value,
            phone: document.getElementById('number').value
        };

        try {
             const response = await fetch(`https://0c0305d8-43e8-4997-b099-b944dd9f29fc.mock.pstmn.io/dogs/${id}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' // ---> notifying that it's JSON
                },
                body: JSON.stringify(formData) 
            });

        if (response.ok) {
            window.location.href = `thankyou.html?id=${id}`;
        } else {
            console.error("ERROR 500");
            alert("try again");
        }

    } catch (error) {
        console.error("error:", error);
    }
    });
}

// --- asking os to operate the functions as HTML finishes loading ---
document.addEventListener('DOMContentLoaded', loadData);
document.addEventListener('DOMContentLoaded', handleForm);