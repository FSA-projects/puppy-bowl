document.addEventListener('DOMContentLoaded', () => {
    const rosterSection = document.getElementById('roster');
    const fetchPlayers = async () => {
        try {
            const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players');
            const result = await response.json();
            // console.log(result);
            displayPlayers(result.data.players);
        } catch (error) {
            console.log('OOPS.... that link is broken!');
        }
    };

    const displayPlayers = (players) => {
        rosterSection.innerHTML = '';
        // console.log('Players to display:', players);
        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.innerHTML = `
            <h3>${player.name.toUpperCase()}</h3>
            <p>Breed: ${player.breed.toUpperCase()}</p>
            <p>Status: ${player.status.toUpperCase()}</p>
            <img src="${player.imageUrl}" alt="A picture of the puppy bowl contestant ${player.name}" 
            style="width: 350px; height: 350px;">
        `;
            rosterSection.appendChild(playerCard);
        });
    };

    fetchPlayers();
    const addPlayer = async (puppyPlayer) => {
        try {
            const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(puppyPlayer)
            });
            const result = await response.json();

        } catch (error) {
            console.log('Error adding player:');
        }
    };

    document.getElementById('addPlayerForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const playerName = document.getElementById('playerName').value;
        const playerBreed = document.getElementById('playerBreed').value;
        const playerStatus = document.getElementById('playerStatus').value;
        const playerImageUrl = document.getElementById('playerImageUrl').value;

        const playerData = {
            name: playerName,
            breed: playerBreed,
            status: playerStatus,
            imageUrl: playerImageUrl
        };

        addPlayer(playerData);
    });
});

