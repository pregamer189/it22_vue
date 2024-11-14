<template>
    <div class="score">
        <p>
            <span id="spelare">{{ playerWins }}</span>
            <span> - </span>
            <span id="dator">{{ computerWins }}</span>
        </p>
    </div>
</template>

<script setup>
import { defineProps, watch } from 'vue';

const props = defineProps(['vinnare', 'reset', 'playerWins', 'computerWins']);

watch(() => props.reset, () => {
    if (props.reset) {
        // Hantera återställning av poäng (kan behöva lyftas till App.vue vid reset)
    }
});
</script>


<style scoped>
.score {
    font-size: 1.2em;
    text-align: center;
    margin: 1.2em 0;
}
</style>
