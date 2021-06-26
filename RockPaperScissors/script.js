function computerPlay() {
    const number = (Math.random() * 3);
    if (number <= 1) {
        return 'rock';
    } else if (number >= 2) {
        return 'scissors';
    }
    else return 'paper';
}

let comp_Score = 0;
let player_Score = 0;

function playRound(playerSelection, computerSelection) {
    if (playerSelection == 'rock' && computerSelection == 'scissors') {
        player_Score++;
        return `You Win! Rock beats Scissors. Score: ${player_Score} to ${comp_Score}`;
    } else if (playerSelection == 'rock' && computerSelection == 'paper') {
        comp_Score++;
        return `You Lose! Paper covers rock. Score: ${player_Score} to ${comp_Score}`;
    } else if (playerSelection == 'paper' && computerSelection == 'scissors') {
        comp_Score++;
        return `You Lose! Scissors cut paper. Score: ${player_Score} to ${comp_Score}`
    } else if (playerSelection == 'paper' && computerSelection == 'rock') {
        player_Score++;
        return `You Win! Paper covers rock. Score: ${player_Score} to ${comp_Score}`
    } else if (playerSelection == 'scissors' && computerSelection == "rock") {
        comp_Score++;
        return `You Lose! Scissors beats rock. Score: ${player_Score} to ${comp_Score}`
    } else if (playerSelection == 'scissors' && computerSelection == 'paper') {
        player_Score++;
        return `You Win! Scissors beat paper. Score: ${player_Score} to ${comp_Score}`
    }
    else if (playerSelection == 'scissors' && computerSelection == 'scissors') {
    
    return `That was a draw. Try Again! Score: ${player_Score} to ${comp_Score}`;
}
else if (playerSelection == 'rock' && computerSelection == 'rock') {
    
    return `That was a draw. Try Again! Score: ${player_Score} to ${comp_Score}`;
}
else if (playerSelection == 'paper' && computerSelection == 'paper') {
    
    return `That was a draw. Try Again! Score: ${player_Score} to ${comp_Score}`;
}
else return `There was an error.Please Try Again! Score: ${player_Score} to ${comp_Score}`;
}

function game() {
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt('Enter rock paper or scissors');
       // playerSelection = playerSelection.toLowerCase();
        const computerSelection = computerPlay();
        console.log("Player = "+playerSelection+" and computer= "+computerSelection);
        console.log(playRound(playerSelection, computerSelection))
    }
    if (player_Score > comp_Score) {
        alert(`Player wins! Final Score: ${player_Score} to ${comp_Score}`);
    } else if (comp_Score > player_Score) {
        alert(`Computer wins. Final Score: ${player_Score} to ${comp_Score}`);
    } else
        alert(`Game tied. Final Score: ${player_Score} to ${comp_Score}`);
}
let start=prompt("Enter name to start the game");
console.log("Player name:"+start+ "\nGame Started");
game();
