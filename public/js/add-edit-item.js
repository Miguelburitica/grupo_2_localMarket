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
		errors: [
			{
				name: 'minLength',
				message: 'Amig@ el nombre debe tener al menos 5 caracteres :(',
				condition: (nameInput, properties) => {
					if (nameInput.value.length < 5) {
						let message = 'minLength'
						itsAnError(properties, message)
					}
				} 
			},
			{
				name: 'maxLength',
				message: 'Amig@ el nombre debe tener maximo 45 caracteres :(',
				condition: (nameInput, properties) => {
					if (nameInput.value.length > 45) {
						let message = 'minLength'
						itsAnError(properties, message)
					}
				} 
			}
		]
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

const itsAnError = ({backendErrorSpan, correctLabel, incorrectLabel, inputField, frontendErrorSpan, messages, input}, error) => {
	disableIfNeed(backendErrorSpan, correctLabel)
	setIncorrect(inputField)
	enableLabel(incorrectLabel)
	let messageError = messages[error]
	enableMessage({spanError: frontendErrorSpan, message: messageError})
	errorAdminstration({action: 'push', name: input.name})
}

const itsNoError = ({backendErrorSpan, correctLabel, incorrectLabel, inputField, frontendErrorSpan, input}) => {
	disableIfNeed(backendErrorSpan, incorrectLabel)
	setCorrect(inputField)
	enableLabel(correctLabel)
	disableMessage(frontendErrorSpan)
	errorAdminstration({action: 'delete', name: input.name})
}

let errors = ['name', 'category', 'unit', 'kilo', 'discount', 'market']

window.addEventListener('load', function() {

	const formulario = document.querySelector('.formulario')

	const validationList = {
		'name' : function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, keyUpEvent}) {
			if (keyUpEvent) {
				let nameInput = keyUpEvent.target
				const properties = {
					backendErrorSpan,
					correctLabel,
					inputField,
					incorrectLabel,
					messages,
					frontendErrorSpan,
					input: nameInput
				} 
				if (nameInput.value.length < 5) {
					let message = 'minLength'
					itsAnError(properties, message)
				} else if (nameInput.value.length > 45) {
					let message = 'maxLength'
					itsAnError(properties, message)
				} else {
					itsNoError(properties)
				}
			}
		},
		'category': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, changeEvent}){

			if (changeEvent) {
				// An 1 to 5 array, that are the values of the posible categories
				let validValues = [1, 2, 3, 4, 5]
				
				let categoryInput = changeEvent.target
	
				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					messages,
					input: categoryInput
				}

				if (categoryInput.value === '') {
					let message = 'notSelected'
					itsAnError(properties, message)
				} else if (!validValues.includes(parseInt(categoryInput.value))) {
					let message = 'invalidValue'
					itsAnError(properties, message)
				} else {
					itsNoError(properties)
				}
			}
		},
		'image': function({ incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, comodinLabel, messages, changeEvent }) {
			if (changeEvent) {
				let validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

				let imageInput = changeEvent.target
	
				const properties = {
					displayLabel: incorrectLabel, 
					incorrectFileLabel: correctLabel,
					correctFileLabel: backendErrorSpan,
					backendFileErrorSpan: frontendErrorSpan,
					frontendFileErrorSpan: comodinLabel,
					messages,
					input: imageInput
				}

				if (!validMimeTypes.includes(imageInput.files[0].type)) {
					let message = 'invalidType'
					itsAnError(properties, message)
				} else {
					itsNoError(properties)
				}
			}
		},
		'unit': function({ inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, keyUpEvent }) {
			if (keyUpEvent) {
				let unitInput = keyUpEvent.target
				
				let hasLetter = hasLetters(unitInput.value)

				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					messages,
					input: unitInput
				}

				if (unitInput.value.length > 6) {
					let message = 'maxLength'
					itsAnError(properties, message)
				} else if (hasLetter) {
					let message = 'mustBeNumbers'
					itsAnError(properties, message)
				} else {
					itsNoError(properties)
				}
			}
		},
		'kilo': function({ inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, keyUpEvent }) {
			if (keyUpEvent) {
				let kiloInput = keyUpEvent.target
				
				let hasLetter = hasLetters(kiloInput.value)

				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					messages,
					input: kiloInput
				}

				if (kiloInput.value.length > 6) {
					let message = 'maxLength'
					itsAnError(properties, message)
				} else if (hasLetter) {
					let message = 'mustBeNumbers'
					itsAnError(properties, message)
				} else {
					itsNoError(properties)
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

				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					messages,
					input: discountInput
				}
	
				if (discountInput.value === '') {
					let message = 'notSelected'
					itsAnError(properties, message)
				} else if (!validValues.includes(parseInt(discountInput.value))) {
					let message = 'invalidValue'
					itsAnError(properties, message)
				} else {
					itsNoError(properties)
				}
			}
		},
		'market': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, changeEvent}){

			if (changeEvent) {
				// An 1 to 5 array, that are the values of the posible categories
				let validValues = [1, 2, 3]
				
				let marketInput = changeEvent.target

				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					messages,
					input: marketInput
				}
	
				if (marketInput.value === '') {
					let message = 'notSelected'
					itsAnError(properties, message)
				} else if (!validValues.includes(parseInt(marketInput.value))) {
					let message = 'invalidValue'
					itsAnError(properties, message)
				} else {
					itsNoError(properties)
				}
			}
		},
	}

	const variables = ({keyUpEvent, changeEvent}) => {
		let fieldName = keyUpEvent !== undefined ? keyUpEvent.target.name : changeEvent.target.name
		let inputField = keyUpEvent !== undefined ? keyUpEvent.target : changeEvent.target
		let incorrectLabel = inputField.nextElementSibling
		let correctLabel = incorrectLabel.nextElementSibling
		let backendErrorSpan = correctLabel.nextElementSibling
		let frontendErrorSpan = backendErrorSpan.nextElementSibling
		let comodinLabel = frontendErrorSpan.nextElementSibling
		let messages = errorsList.find(error => error.name === inputField.name).errors
		
		let variables = {
			fieldName, 
			inputField,
			incorrectLabel,
			correctLabel,
			backendErrorSpan,
			frontendErrorSpan,
			comodinLabel,
			messages
		}

		return variables
	}

	const executeEvaluation = ({keyUpEvent, changeEvent}) => {

		const events = {keyUpEvent, changeEvent}
		
		const {
			fieldName, 
			inputField, 
			incorrectLabel, 
			correctLabel, 
			backendErrorSpan, 
			frontendErrorSpan, 
			comodinLabel, 
			messages
		} = variables(events)
		
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
		executeEvaluation({ changeEvent })
	})

	formulario.addEventListener('keyup', (keyUpEvent) => {
		executeEvaluation({ keyUpEvent })
	})
	formulario.addEventListener('submit', (submitEvent) => {
		if (errors.length > 0) {
			submitEvent.preventDefault()
		}
	})

})