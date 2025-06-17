let countries = [];
let correctCountry = null;
let score = 0;

window.onload = () => {
    fetchCountries();
};

function fetchCountries() {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
        .then(response => {
            if (!response.ok) throw new Error("API fetch failed!");
            return response.json();
        })
        .then(data => {
            countries = data.map(country => ({
                name: country.name.common,
                flag: country.flags.png
            }));
            startGame();
        })
        .catch(error => {
            console.error("Error fetching countries:", error);
            alert("Failed to fetch country data. Please try again later.");
        });
}

function startGame() {
    document.getElementById("feedback").textContent = "";

    correctCountry = countries[Math.floor(Math.random() * countries.length)];

    let options = [correctCountry];
    while (options.length < 4) {
        let random = countries[Math.floor(Math.random() * countries.length)];
        if (!options.find(c => c.name === random.name)) {
            options.push(random);
        }
    }

    options = shuffleArray(options);

    document.getElementById("flag-img").src = correctCountry.flag;
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((btn, index) => {
        btn.textContent = options[index].name;
        btn.onclick = () => checkAnswer(options[index].name);
        btn.disabled = false;
        btn.style.opacity = "1";
    });
}

function checkAnswer(userChoice) {
    const feedback = document.getElementById("feedback");
    if (userChoice === correctCountry.name) {
        feedback.textContent = "Correct!";
        feedback.className = "feedback correct";
        score++;
    } else {
        feedback.textContent = `Wrong! It was ${correctCountry.name}`;
        feedback.className = "feedback wrong";
    }

    updateScore();
    disableButtons();
}

function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

function disableButtons() {
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
    });
}

document.getElementById("next-btn").onclick = () => {
    startGame();
};

document.getElementById("restart-btn").onclick = () => {
    score = 0;
    updateScore();
    startGame();
};

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
