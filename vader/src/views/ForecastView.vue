<script setup>
import { ref } from 'vue'
import { getForecast } from '@/services/ForecastServices';
import { onMounted } from 'vue'
import ForecastResult from '@/components/ForecastResult.vue'
const location = ref({ lat: 60.0, long: 20.0, name: 'Nuvarande position' })
const info = ref({})
onMounted(() => {
    getForecast(location.value)
        .then(response => {
            info.value = response
        })
        .catch(err => {
            console.error(err)
        })
})



</script>
<template>
    <h2>{{ location.name }}</h2>
    <p class="location"> <span>Lat: {{ location.lat.toFixed(3) }}</span></p>
    <p class="location"> <span>Long: {{ location.long.toFixed(3) }}</span></p> 
    <ForecastResult :forecast="info" />

</template>

<style scoped>
.location {
    display: inline-block;
    margin: 0 1em;
}



h2 {
    text-align: center;
}

p {
   color : lightgray;
}
</style>