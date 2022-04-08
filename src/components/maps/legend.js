import {
	ENERGY,
	COMMUNICATIONS,
	AIRPORT,
	ELECTRICAL_POWER_GENERATING_PLANTS,
	SAFETY_AND_SECURITY,
	FOOD_WATER_SHELTER,
	HEALTH_AND_MEDICAL,
	TRANSPORTATION,
	OTHERS
} from "./markerTypes"


const getIcon = (currentLabel) => {
		if(currentLabel === ENERGY) return 'fa-lightbulb'
		else if(currentLabel === COMMUNICATIONS) return 'fa-satellite-dish'
		else if(currentLabel === AIRPORT) return 'fa-plane'
		else if(currentLabel === ELECTRICAL_POWER_GENERATING_PLANTS) return 'fa-bolt'
		else if(currentLabel === SAFETY_AND_SECURITY) return 'fa-shield-alt'
		else if(currentLabel === FOOD_WATER_SHELTER) return 'fa-utensils'
		else if(currentLabel === HEALTH_AND_MEDICAL) return 'fa-briefcase-medical'
		else if(currentLabel === TRANSPORTATION) return 'fa-truck'
		else if(currentLabel === OTHERS) return 'fa-ellipsis-h'
}


export function getLegend(L) {

		//const legend = L.control.layers(null, getLegend,{ position: "topleft", collapsed: false }).addTo(map)
		const legend = L.control({ position: "topleft", collapsed: false })

		legend.onAdd = () => {
				const div = L.DomUtil.create("div", "info legend")
				const labelArray = [
					ENERGY,
					COMMUNICATIONS,
					AIRPORT,
					ELECTRICAL_POWER_GENERATING_PLANTS,
					SAFETY_AND_SECURITY,
					FOOD_WATER_SHELTER,
					HEALTH_AND_MEDICAL,
					TRANSPORTATION,
					OTHERS
				]
				let labels = []

				for (let i = 0; i < labelArray.length; i++) {
					let currentLabel = labelArray[i]

					labels.push(
						'<i class="fa ' +
							getIcon(currentLabel) +
							' legend-icon-color"></i> ' +
						currentLabel
					)
				}

				div.innerHTML = labels.join("<br>")
				return div;
		}

		return legend
}