<script setup>
import { ref, defineProps, onMounted } from "vue";
import ForecastService from "@/services/ForecastServices";
import wc from "@/assets/data/weatherCodes.json";

const props = defineProps(['weather']);
const weatherCodes = ref(wc);
const forecastData = ref(null);

function getText(code) {
	let wcText = weatherCodes.value.find(itm => {
		return itm.code == code;
	})?.description ?? 'Unknown';

	return wcText;
}

async function fetchForecast() {
	try {
		forecastData.value = await ForecastService.getCurrentForecast();
	} catch (error) {
		console.error("Error fetching forecast data:", error);
	}
}

onMounted(() => {
	fetchForecast();
});
</script>

<template>
	<ul>
		<li>Current Weather</li>
		<li>Temp</li>
		<li>Precip</li>
		<li>Wind</li>
	</ul>
	<ul v-if="props.weather">
		<li>
			{{ getText(props.weather.code) }}
		</li>
		<li>{{ props.weather.temp.current }}{{ props.weather.temp.unit }}</li>
		<li>
			{{ props.weather.precipitation.sum }}{{ props.weather.precipitation.unit }}<br>
			({{ props.weather.precipitation.probability }}%)
		</li>
		<li>
			{{ Math.round(props.weather.wind.speed) }} ({{ Math.round(props.weather.wind.gusts) }}){{ props.weather.wind.unit }}<br>{{
				props.weather.wind.direction }}{{
				props.weather.wind.direction_unit }}
		</li>
	</ul>
	<ul v-else>
		<li>No weather data available</li>
	</ul>
</template>

<style scoped>
ul {
	padding: 0;
	display: grid;
	grid-template-columns: 22% 22% 15% auto;
}

ul:nth-child(even) {
	background-color: aqua;
}

ul:nth-child(odd) {
	background-color: antiquewhite;
}

li {
	padding: 0 .5em;
	list-style-type: none;
	vertical-align: top;
}
</style>