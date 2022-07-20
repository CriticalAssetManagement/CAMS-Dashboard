
const getIcon = (currentLabel, language) => {
		if(currentLabel === language.ENERGY) return 'fa-lightbulb'
		else if(currentLabel === language.COMMUNICATIONS) return 'fa-satellite-dish'
		else if(currentLabel === language.AIRPORT) return 'fa-plane'
		else if(currentLabel === language.ELECTRICAL_POWER_GENERATING_PLANTS) return 'fa-bolt'
		else if(currentLabel === language.SAFETY_AND_SECURITY) return 'fa-shield-alt'
		else if(currentLabel === language.FOOD_WATER_SHELTER) return 'fa-utensils'
		else if(currentLabel === language.HEALTH_AND_MEDICAL) return 'fa-briefcase-medical'
		else if(currentLabel === language.TRANSPORTATION) return 'fa-truck'
		else if(currentLabel === language.OTHERS) return 'fa-ellipsis-h'
}


export function getLegend(L, language) {

		//const legend = L.control.layers(null, getLegend,{ position: "topleft", collapsed: false }).addTo(map)
		const legend = L.control({ position: "topleft", collapsed: false })

		legend.onAdd = () => {
				const div = L.DomUtil.create("div", "info legend")
				const labelArray = [
					language.ENERGY,
					language.COMMUNICATIONS,
					language.AIRPORT,
					language.ELECTRICAL_POWER_GENERATING_PLANTS,
					language.SAFETY_AND_SECURITY,
					language.FOOD_WATER_SHELTER,
					language.HEALTH_AND_MEDICAL,
					language.TRANSPORTATION,
					language.OTHERS
				]
				let labels = []

				for (let i = 0; i < labelArray.length; i++) {
					let currentLabel = labelArray[i]

					labels.push(
						'<i class="fa ' +
							getIcon(currentLabel, language) +
							' legend-icon-color"></i> ' +
						currentLabel
					)
				}

				div.innerHTML = labels.join("<br>")
				return div;
		}

		return legend
}