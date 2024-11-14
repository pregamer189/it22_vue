<template>
    <header>
        <h1>Sten, sax, påse</h1>
    </header>
    <main>
        <GameMode 
            @updateGameMode="setGameMode" 
            @updateSeriesLength="updateSeriesLength" 
        />
        <KnappRad 
            :knappar="knappar" 
            :reset="reset" 
            @valdaKnappar="hittaVinnare" 
        />
        <ResultatRad 
            :valdaKnappar="resultat" 
            :reset="reset" 
        />
        <PoangRad 
            :vinnare="vinnare" 
            :reset="reset" 
            :playerWins="playerWins" 
            :computerWins="computerWins" 
        />
        <div v-if="gameOver" class="message">
            <p>{{ message }}</p>
        </div>
        <div class="score">
            <button id="nolla" @click="resetScores">Nollställ poängen</button>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import KnappRad from './components/KnappRad.vue';
import ResultatRad from './components/ResultatRad.vue';
import PoangRad from './components/PoangRad.vue';
import GameMode from './components/GameMode.vue';

const resultat = ref({});
const knappar = ref(['Sten', 'Sax', 'Påse']);
const vinnare = ref('');
const reset = ref(false);
const playerWins = ref(0);
const computerWins = ref(0);
const gameOver = ref(false);
const message = ref('');
const gameMode = ref('Oändligt'); // Standardläge
const seriesLength = ref(3); // Standard till Bäst av 3

function hittaVinnare(valdaKnappar) {
    if (gameOver.value) return;

    reset.value = false;
    let spelare = knappar.value.indexOf(valdaKnappar.spelare);
    let dator = knappar.value.indexOf(valdaKnappar.dator);
    resultat.value = { spelare, dator };

    if (spelare === 0 && dator === 1 || spelare === 1 && dator === 2 || spelare === 2 && dator === 0) {
        playerWins.value++;
    } else if (spelare !== dator) {
        computerWins.value++;
    }

    checkGameOver();
}

function resetScores() {
    reset.value = true;
    playerWins.value = 0;
    computerWins.value = 0;
    gameOver.value = false;
    message.value = '';
}

function setWinner(winner) {
    vinnare.value = winner;
    gameOver.value = true;
    message.value = winner === 'spelare' ? 'Grattis, du har vunnit!' : 'Tyvärr, datorn vann!';
}

function checkGameOver() {
    let requiredWins = gameMode.value === 'Oändligt' ? Infinity : Math.ceil(seriesLength.value / 2);

    if (playerWins.value >= requiredWins) {
        setWinner('spelare');
    } else if (computerWins.value >= requiredWins) {
        setWinner('dator');
    }
}

function setGameMode(mode) {
    gameMode.value = mode;
    if (mode === 'Oändligt') {
        seriesLength.value = 3;
    }
}

function updateSeriesLength(length) {
    seriesLength.value = length;
}
</script>


<style scoped>
header { text-align: center; margin-bottom: 1.2em; }
button { padding: .6em 1.2em; font-size: 1.2em; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; cursor: pointer; }
.score { font-size: 1.2em; text-align: center; }
.message { font-size: 1.5em; color: green; text-align: center; margin-top: 1em; }
#nolla { margin-top: 2em; padding: .3em .6em; font-size: .8em; }
</style>