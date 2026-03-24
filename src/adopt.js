var id = getDogIDFromURL();

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

// --- Gamification: Adoption Timer ---
function startAdoptionTimer() {
    const form = document.getElementById('dogForm');
    const timerContainer = document.createElement('div');
    timerContainer.id = 'timer-container';
    
    timerContainer.innerHTML = `
        <h3 id="urgency-text">🔥 יש עוד אנשים שממתינים לאימוץ הכלב הזה</h3>
        <h3 id="timer-display">הזמן שנותר לאימוץ הכלב: 01:00</h3>
    `;
    
    // --- setting timer above the form ---
    form.parentNode.insertBefore(timerContainer, form);

    // --- setting one minute counting ---
    let timeLeft = 60; 
    const timerDisplay = document.getElementById('timer-display');

    const countdown = setInterval(() => {
        timeLeft--;
        
       // --- MM:SS format ---
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        let formattedTime = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        timerDisplay.textContent = `הזמן שנותר לאימוץ הכלב: ${formattedTime}`;


        // --- last 10 sec in red ---
        if (timeLeft <= 10) {
            timerDisplay.style.color = '#e74c3c';
        }

        // --- time is over, go to dog page ---
        if (timeLeft <= 0) {
            clearInterval(countdown); // ---> stop count
             window.location.href = `dog.html?id=${id}`;
        }
    }, 1000);
}


// --- asking os to operate the functions as HTML finishes loading ---
document.addEventListener('DOMContentLoaded', loadData);
document.addEventListener('DOMContentLoaded', handleForm);
document.addEventListener('DOMContentLoaded', startAdoptionTimer);
