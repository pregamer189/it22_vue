<script setup>
import ForecastResult from '@/components/ForecastResult.vue';
import { getForecast } from '@/services/ForecastServices';
import { fetchCurrentWeather, decodeCurrentWeather } from '@/services/ForecastServices';
import { ref, watchEffect } from 'vue';
import CurrentResult from '@/components/CurrentResult.vue';

const currentLocation = ref({ lat: 60.0, long: 20.0, name: "Nuvarande position" })
const info = ref({})
const currentWeather = ref(null);
const props = defineProps(['location'])
watchEffect(() => {
    let locationsList = JSON.parse(localStorage.getItem("locations")) || [];
    if (props.location) {
        currentLocation.value = locationsList.find(loc => {
            return loc.name.toLocaleLowerCase() === props.location.toLocaleLowerCase()
        }) || { lat: 60.0, long: 20.0, name: "Nuvarande position" };
    } else {
        currentLocation.value = locationsList.find(loc => {
            return loc.default
        }) || { lat: 60.0, long: 20.0, name: "Nuvarande position" };
    }


    if (currentLocation.value) {
        fetchCurrentWeather(currentLocation.value.lat, currentLocation.value.long)
            .then(response => {
                currentWeather.value = decodeCurrentWeather(response);
            })
            .catch(err => {
                console.log(err);
            });


    if (currentLocation.value) {
        getForecast(currentLocation.value)
            .then(response => {
                info.value = response
            })
            .catch(err => {
                console.log(err)
            })
    }
}
})
</script>
<template>
    <template v-if="!currentLocation">
        <h2>Angiven plats finns inte</h2>
        <p>{{ props.location }} finns inte i listan över platser</p>
    </template>
    <template v-else>
        <h2>{{ currentLocation.name }}</h2>
        <p class="location">Lat: <span>{{ currentLocation.position.lat.toFixed(3) }}</span></p>
        <p class="location">Long: <span> {{ currentLocation.position.long.toFixed(3) }}</span></p>
        <ForecastResult :forecast="info" />
        <CurrentResult :weather="currentWeather" />
    </template>
</template>
<style scoped>
.location {
    display: inline-block;
    margin: 0 1em;
}
li{
    color : black;
}
ul{
    color : black;
}
body{
    color : black;
}

</style>