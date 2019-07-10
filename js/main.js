const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const scoreboard = {
    player: 0,
    computer: 0
}


// Juego
function play(e) {
    restart.style.display = "inline-block";
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    showWinner(winner, computerChoice);
}

function getComputerChoice() {
    const random = Math.random();

    if(random < 0.34){
        return "rock";
    } 
    else if(random <= 0.67){
        return "paper";
    }
    else{
        return "scissors";
    }
}


function getWinner(p, c) {

    if(p == c){
        return "Empate";
    }
    else if(p === "rock"){
        if(c === "scissors")
            return "Jugador";
        else
            return "Rival";
    }
    else if(p === "paper"){
        if(c === "rock")
            return "Jugador";
        else
            return "Rival";
    }
    else if(p === "scissors"){
        if(c === "paper")
            return "Jugador";
        else
            return "Rival";
    }

}

function showWinner(winner,computerChoice){
    
    let traduccion = "";

    if(computerChoice === "rock")
        traduccion = "Piedra";
    else if(computerChoice === "paper")
        traduccion = "Papel";
    else
        traduccion = "Tijera";


    if(winner === "Jugador"){
        scoreboard.player++;
        result.innerHTML = `
                            <h1 class="text-win">Has ganado!</h1>
                            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
                            <p>El rival jugó <strong>${traduccion}</strong></p>
                            `
    } else if (winner === "Rival"){
        scoreboard.computer++;
        result.innerHTML = `
                            <h1 class="text-lose">Has perdido!</h1>
                            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
                            <p>El rival jugó <strong>${traduccion}</strong></p>
                            `
    } else{
        result.innerHTML = `
                            <h1>Empate!</h1>
                            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
                            <p>El rival jugó <strong>${traduccion}</strong></p>
                            `
    }

    //Mostrar marcador
    score.innerHTML = `
            <p>Jugador: ${scoreboard.player}</p>
            <p>Rival: ${scoreboard.computer}</p>
        `

    modal.style.display = "block";
}

function clearModal(e){
    if(e.target == modal){
        modal.style.display = "none";
    }
}

function restartGame(e){
    scoreboard.player = 0;
    scoreboard.computer = 0;

    score.innerHTML = `
                <p> Jugador: 0 </p>
                <p> Rival: 0 </p>
    `

    restart.style.display = "none";
}

// Event listeners

choices.forEach(choice => choice.addEventListener("click", play));

window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);