function disableLabel(property) {
	property.classList.remove('checked')
	property.classList.add('disabled')
}

function enableLabel(property) {
	property.classList.add('checked')
	property.classList.remove('disabled')
}

function switchInputState() {}

function validateField(event, inputField, errorFrontendMessage, correctLabel, incorrectLabel, condition) {
	if (condition) {
		console.log(event.target.value)
		console.log(num++)
		errorFrontendMessage.classList.remove('disabled')
		errorFrontendMessage.classList.add('error')
		errorFrontendMessage.innerHTML = 'Amig@ este campo debe tener al menos 5 caracteres :('

		inputField.classList.remove('correct')
		inputField.classList.add('incorrect')

		disableLabel(correctLabel)

		enableLabel(incorrectLabel)
	} else {
		errorFrontendMessage.classList.add('disabled')
		errorFrontendMessage.classList.remove('error')
		errorFrontendMessage.innerHTML = ''

		inputField.classList.add('correct')
		inputField.classList.remove('incorrect')

		correctLabel.classList.add('checked')
		correctLabel.classList.remove('disabled')

		incorrectLabel.classList.remove('checked')
		incorrectLabel.classList.add('disabled')
	}
}

window.addEventListener('load', function () {
	let formulario = document.querySelector('.formulario')

	let [name, category, image, unit, kilo, discount, market] = document.querySelectorAll('.input-container')

	// prettier-ignore
	let [inputName,      incorrectNameLabel,     correctNameLabel,     errorNameMessageBackend,     errorNameMessageFronted    ] = name.children
	// prettier-ignore
	let [inputCategory,  incorrectCategoryLabel, correctCategoryLabel, errorCategoryMessageBackend, errorCategoryMessageFronted] = category.children
	// prettier-ignore
	let [labelImage,    inputImage   ] = image.children
	// prettier-ignore
	let [labelUnit,     inputUnit    ] = unit.children
	// prettier-ignore
	let [labelKilo,     inputKilo    ] = kilo.children
	// prettier-ignore
	let [labelDiscount, inputDiscount] = discount.children
	// prettier-ignore
	let [labelMarket,   inputMarket  ] = market.children

	labelImage.addEventListener('mouseleave', function () {
		console.log(inputImage.files)
	})
	let num = 0
	inputName.addEventListener('change', (e) => {
		if (e.target.value.length < 5) {
			console.log(e.target.value)
			console.log(num++)
			errorNameMessageFronted.classList.remove('disabled')
			errorNameMessageFronted.classList.add('error')
			errorNameMessageFronted.innerHTML = 'Amig@ este campo debe tener al menos 5 caracteres :('

			inputName.classList.remove('correct')
			correctNameLabel.classList.remove('checked')
			correctNameLabel.classList.add('disabled')

			inputName.classList.add('incorrect')
			incorrectNameLabel.classList.add('checked')
			incorrectNameLabel.classList.remove('disabled')
		} else {
			console.log(e.target.value)

			errorNameMessageFronted.classList.add('disabled')
			errorNameMessageFronted.classList.remove('error')
			errorNameMessageFronted.innerHTML = ''

			inputName.classList.add('correct')
			correctNameLabel.classList.add('checked')
			correctNameLabel.classList.remove('disabled')

			inputName.classList.remove('incorrect')
			incorrectNameLabel.classList.remove('checked')
			incorrectNameLabel.classList.add('disabled')
		}
	})
	formulario.addEventListener('submit', (event) => {
		if (inputName.value.length < 5) {
			event.preventDefault()
		}
	})
})
