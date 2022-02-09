const disableLabel = (property) => {
	property.classList.remove('checked')
	property.classList.add('disabled')
}

const enableLabel = (property) => {
	property.classList.add('checked')
	property.classList.remove('disabled')
}

const setIncorrect = (inputField) => {
	const classes = inputField.classList
	const isCorrect = !classes.contains('incorrect') || classes.contains('correct')
	if(isCorrect) {
		inputField.classList.remove('correct')
		inputField.classList.add('incorrect')
	}
}

const hasLetters = (value) => {
	let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
	let res = true

	digits.forEach((number) => {
		if (value.includes(number)) {
			res = false
			return res
		}
	})
	return res
}

const setCorrect = (inputField) => {
	const classes = inputField.classList
	const isIncorrect = !classes.contains('correct') || classes.contains('incorrect')
	if(isIncorrect) {
		inputField.classList.remove('incorrect')
		inputField.classList.add('correct')
	}
}

const enableMessage = ({spanError, message = 'Aquí hay algo mal amiguit@'}) => {
	spanError.classList.remove('disabled')
	spanError.classList.add('error')
	spanError.innerHTML = message
}

const disableMessage = (spanError) => {
	spanError.classList.remove('error')
	spanError.classList.add('disabled')
	spanError.innerHTML = ''
}

// To do, Miguel, pilas con esto

// const inputValudation = () => {}

// const selectValidation = () => {}

// const fileValidation = () => {}

const errorsList = [
	{
		name: 'name',
		errorMessages: {
			'minLength': 'Amig@ el nombre debe tener al menos 5 caracteres :(',
			'maxLength': 'Amig@ el nombre debe tener maximo 45 caracteres :('
		}
	},
	{
		name: 'category',
		errorMessages: {
			'notSelected': 'Es necesario que elijas una categoria querid@ :3',
			'invalidValue': 'Hey, ese valor no es valido amig@u >:S'
		}
	},
	{
		name: 'image',
		errorMessages: {
			'invalidType': 'Querid@ ese tipo de dato no es valido, lo siento :('
		}
	},
	{
		name: 'unit',
		errorMessages: {
			'maxLength' : 'Hey, el precio debe tener como maximo 6 digitos, no creemos que necesites más °-°',
			'mustBeNumbers' : 'Como esto es un precio, sólo debe contener numeros, el valor es en pesos :3'
		}
	},
	{
		name: 'kilo',
		errorMessages: {
			'maxLength' : 'Hey, el precio debe tener como maximo 6 digitos, no creemos que necesites más °-°',
			'mustBeNumbers' : 'Como esto es un precio, sólo debe contener numeros, el valor es en pesos :3'
		}
	},
	{
		name: 'discount',
		errorMessages: {
			'notSelected': 'Es necesario que elijas un valor para el descuento querid@ :3, puede ser cero',
			'invalidValue': 'Hey, ese valor no es valido amig@u >:S'
		}
	},
	{
		name: 'market',
		errorMessages: {
			'notSelected': 'Es necesario que elijas un mercado querid@ :3',
			'invalidValue': 'Hey, ese valor no es valido amig@u >:S'
		}
	}
]

const isEnable = (spanError) => {
	return !spanError.classList.contains('disabled')
}

const disableIfNeed = (backendErrorSpan, label) => {
	if (isEnable(backendErrorSpan) || isEnable(label)) {
		disableMessage(backendErrorSpan)
		disableLabel(label)
	}
}

let errors = ['name', 'category', 'unit', 'kilo', 'discount', 'market']

const deleteError = (name) => {
	if (errors.includes(name)) {
		let positionError = errors.indexOf(name)
		errors.splice(positionError, 1)
	}
}

const newError = (name) => {
	errors.push(name)
}

const errorAdminstration = ({action, name}) => {
	if (errors.includes(name) && action === 'delete') {
		deleteError(name)
	}

	if (!errors.includes(name) && action === 'push') {
		newError(name)
	}
}

window.addEventListener('load', function() {

	const formulario = document.querySelector('.formulario')

	const validationList = {
		'name' : function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, keyUpEvent}) {
			if (keyUpEvent) {
				let nameInput = keyUpEvent.target
				if (nameInput.value.length < 5) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['minLength']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: nameInput.name})
				} else if (nameInput.value.length > 45) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['maxLength']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: nameInput.name})
				} else {
					disableIfNeed(backendErrorSpan, incorrectLabel)
					setCorrect(inputField)
					enableLabel(correctLabel)
					disableMessage(frontendErrorSpan)
					errorAdminstration({action: 'delete', name: nameInput.name})
				}
			}
		},
		'category': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, changeEvent}){

			if (changeEvent) {
				// An 1 to 5 array, that are the values of the posible categories
				let validValues = [1, 2, 3, 4, 5]
				
				let categoryInput = changeEvent.target
	
				if (categoryInput.value === '') {
					disableIfNeed(backendErrorSpan,correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['notSelected']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: categoryInput.name})
				} else if (!validValues.includes(parseInt(categoryInput.value))) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['invalidValue']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: categoryInput.name})
				} else {
					disableIfNeed(backendErrorSpan, incorrectLabel)
					setCorrect(inputField)
					enableLabel(correctLabel)
					disableMessage(frontendErrorSpan)
					errorAdminstration({action: 'delete', name: categoryInput.name})
				}
			}
		},
		'image': function({ incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, comodinLabel, messages, changeEvent }) {
			if (changeEvent) {
				let validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

				let imageInput = changeEvent.target
	
				let displayLabel = incorrectLabel
				let incorrectImageLabel = correctLabel
				let correctImageLabel = backendErrorSpan
				let backendImageErrorSpan = frontendErrorSpan
				let frontendImageErrorSpan = comodinLabel

				if (!validMimeTypes.includes(imageInput.files[0].type)) {
					disableIfNeed(backendImageErrorSpan, correctImageLabel)
					setIncorrect(displayLabel)
					enableLabel(incorrectImageLabel)
					let messageError = messages['invalidType']
					enableMessage({spanError: frontendImageErrorSpan, messageError: messageError})
					errorAdminstration({action: 'push', name: imageInput.name})
				} else {
					disableIfNeed(backendImageErrorSpan, incorrectImageLabel)
					setCorrect(displayLabel)
					enableLabel(correctImageLabel)
					disableMessage(frontendImageErrorSpan)
					errorAdminstration({action: 'delete', name: imageInput.name})
				}
			}
		},
		'unit': function({ inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, keyUpEvent }) {
			if (keyUpEvent) {
				let unitInput = keyUpEvent.target
				
				let hasLetter = hasLetters(unitInput.value)

				if (unitInput.value.length > 6) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['maxLength']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: unitInput.name})
				} else if (hasLetter) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['mustBeNumbers']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: unitInput.name})
				} else {
					disableIfNeed(backendErrorSpan, incorrectLabel)
					setCorrect(inputField)
					enableLabel(correctLabel)
					disableMessage(frontendErrorSpan)
					errorAdminstration({action: 'delete', name: unitInput.name})
				}
			}
		},
		'kilo': function({ inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, keyUpEvent }) {
			if (keyUpEvent) {
				let kiloInput = keyUpEvent.target
				
				let hasLetter = hasLetters(kiloInput.value)

				if (kiloInput.value.length > 6) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['maxLength']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: kiloInput.name})
				} else if (hasLetter) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['mustBeNumbers']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: kiloInput.name})
				} else {
					disableIfNeed(backendErrorSpan, incorrectLabel)
					setCorrect(inputField)
					enableLabel(correctLabel)
					disableMessage(frontendErrorSpan)
					errorAdminstration({action: 'delete', name: kiloInput.name})
				}
			}
		},
		'discount': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, changeEvent}){

			if (changeEvent) {
				// An 1 to 5 array, that are the values of the posible categories
				let validValues = []
				
				for( let i = 0; i < 50; i += 5 ) {
					validValues.push(i)
				}
				let discountInput = changeEvent.target
	
				if (discountInput.value === '') {
					disableIfNeed(backendErrorSpan,correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['notSelected']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: discountInput.name})
				} else if (!validValues.includes(parseInt(discountInput.value))) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['invalidValue']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: discountInput.name})
				} else {
					disableIfNeed(backendErrorSpan, incorrectLabel)
					setCorrect(inputField)
					enableLabel(correctLabel)
					disableMessage(frontendErrorSpan)
					errorAdminstration({action: 'delete', name: discountInput.name})
				}
			}
		},
		'market': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, changeEvent}){

			if (changeEvent) {
				// An 1 to 5 array, that are the values of the posible categories
				let validValues = [1, 2, 3]
				
				let marketInput = changeEvent.target
	
				if (marketInput.value === '') {
					disableIfNeed(backendErrorSpan,correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['notSelected']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: marketInput.name})
				} else if (!validValues.includes(parseInt(marketInput.value))) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['invalidValue']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					errorAdminstration({action: 'push', name: marketInput.name})
				} else {
					disableIfNeed(backendErrorSpan, incorrectLabel)
					setCorrect(inputField)
					enableLabel(correctLabel)
					disableMessage(frontendErrorSpan)
					errorAdminstration({action: 'delete', name: marketInput.name})
				}
			}
		},
	}

	const executeEvaluation = ({keyUpEvent, changeEvent}) => {
		let fieldName = keyUpEvent !== undefined ? keyUpEvent.target.name : changeEvent.target.name
		let inputField = keyUpEvent !== undefined ? keyUpEvent.target : changeEvent.target
		let incorrectLabel = inputField.nextElementSibling
		let correctLabel = incorrectLabel.nextElementSibling
		let backendErrorSpan = correctLabel.nextElementSibling
		let frontendErrorSpan = backendErrorSpan.nextElementSibling
		let comodinLabel = frontendErrorSpan.nextElementSibling
		let messages = errorsList.find(error => error.name === inputField.name).errorMessages
		
		let data = {
			inputField,
			incorrectLabel,
			correctLabel,
			backendErrorSpan,
			frontendErrorSpan,
			messages,
			keyUpEvent,
			changeEvent,
			comodinLabel,
		}

		let validation = validationList[fieldName]

		validation(data)

		console.log(errors)
	}
    
	formulario.addEventListener('change', changeEvent => {
		executeEvaluation({changeEvent: changeEvent})
	})

	formulario.addEventListener('keyup', (keyUpEvent) => {
		executeEvaluation({keyUpEvent:keyUpEvent})
	})
	formulario.addEventListener('submit', (submitEvent) => {
		if (errors.length > 0) {
			submitEvent.preventDefault()
		}
	})

})