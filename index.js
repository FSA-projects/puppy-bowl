document.addEventListener('DOMContentLoaded', () => {
    const rosterSection = document.getElementById('roster');
    const fetchPlayers = async () => {
        try {
            const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players');
            const result = await response.json();

            const reversedPlayers = result.data.players.reverse();

            const limitedPlayers = reversedPlayers.slice(0, 21);

            displayPlayers(limitedPlayers);
        } catch (error) {
            window.alert('OOPS.... that link is broken!');
        }
    };

    const displayPlayers = (players) => {
        rosterSection.innerHTML = '';
        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');
            playerCard.innerHTML = `
            <h3>${player.name.toUpperCase()}</h3>
            <p>Contestant ID: ${player.id}</p>
            <p>Breed: ${player.breed.toUpperCase()}</p>
            <p>Status: ${player.status.toUpperCase()}</p>
            <img src="${player.imageUrl}" alt="A picture of the puppy bowl contestant ${player.name}" 
            style="width: 100%; max-width: 350px; height: auto;">
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
        } catch (error) {
            window.alert('Cannot add player at this time.');
        }
        fetchPlayers();
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


    document.getElementById('deletePlayerForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const deletePlayerId = document.getElementById('deletePlayerId').value;

        try {
            const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players/${deletePlayerId}`, {
                method: 'DELETE',
            });
            fetchPlayers();
        } catch (error) {
            window.alert('Cannot delete player');
        }

    })
});
