const disableLabel = (label) => {
	label.classList.remove('checked')
	label.classList.add('disabled')
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

/**
 * this function evaluate if the value of the field has any character/digit diferent to a number
 * @param {String} value The value that has the input
 * @returns {Boolean} this return true if the number/string has a any letter
 */
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

const deleteError = (name) => {
	if (arrayErrors.includes(name)) {
		let positionError = arrayErrors.indexOf(name)
		arrayErrors.splice(positionError, 1)
	}
}

const newError = (name) => {
	arrayErrors.push(name)
}

const errorAdminstration = ({action, name}) => {
	if (arrayErrors.includes(name) && action === 'delete') {
		deleteError(name)
	}
	
	if (!arrayErrors.includes(name) && action === 'push') {
		newError(name)
	}
}

const isEnable = (spanError) => {
	return !spanError.classList.contains('disabled')
}

const disableIfNeed = (backendErrorSpan, label) => {
	if (isEnable(backendErrorSpan) || isEnable(label)) {
		disableMessage(backendErrorSpan)
		disableLabel(label)
	}
}

const itsAnError = ({backendErrorSpan, correctLabel, incorrectLabel, inputField, frontendErrorSpan, input}, error) => {
	disableIfNeed(backendErrorSpan, correctLabel)
	setIncorrect(inputField)
	enableLabel(incorrectLabel)
	let messageError = error
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
				condition: (input, properties) => {
					if (input.value.length < 5) {
						let thisErrror = properties.errors.find(error => error.name === 'minLength')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					}
				} 
			},
			{
				name: 'maxLength',
				message: 'Amig@ el nombre debe tener maximo 45 caracteres :(',
				condition: (input, properties) => {
					if (input.value.length > 45) {
						let thisErrror = properties.errors.find(error => error.name === 'maxLength')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					}
				} 
			}
		]
	},
	{
		name: 'category',
		errors: [
			{
				name: 'notSelected',
				message: 'Es necesario que elijas una categoria querid@ :3',
				condition: (input, properties) => {
					if (input.value === '') {
						let thisErrror = properties.errors.find(error => error.name === 'notSelected')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					} 
				}
			},
			{
				name: 'invalidValue',
				message: 'Hey, ese valor no es valido amig@u >:S',
				condition: (input, properties) => {
					// An 1 to 5 array, that are the values of the posible categories
					let validValues = ['', '1', '2', '3', '4', '5']

					if (!validValues.includes(input.value)) {
						let thisError = properties.errors.find(error => error.name === 'invalidValue')
						let message = thisError.message
						itsAnError(properties, message)
						return true
					}
				} 
			}
		]
	},
	{
		name: 'image',
		errors: [
			{
				name: 'invalidType',
				message: 'Querid@ ese tipo de dato no es valido, lo siento :(',
				condition: (input, properties) => {
					let validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

					if (!validMimeTypes.includes(input.files[0].type)) {
						let thisError = properties.errors.find(error => error.name === 'invalidType')
						let message = thisError.message
						itsAnError(properties, message)
						return true
					}
				}
			}
		]
	},
	{
		name: 'unit',
		errors: [
			{
				name: 'maxLength',
				message: 'Hey, el precio debe tener como maximo 6 digitos, no creemos que necesites más °-°',
				condition: (input, properties) => {
					if (input.value.length > 6) {
						let thisErrror = properties.errors.find(error => error.name === 'maxLength')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					}
				}
			},
			{
				name: 'mustBeNumbers',
				message: 'Como esto es un precio, sólo debe contener numeros, el valor es en pesos :3',
				condition: (input, properties) => {
					let hasLetter = hasLetters(input.value)

					if (hasLetter) {
						let thisErrror = properties.errors.find(error => error.name === 'mustBeNumbers')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					}
				}
			}
		]
	},
	{
		name: 'kilo',
		errors: [
			{
				name: 'maxLength',
				message: 'Hey, el precio debe tener como maximo 6 digitos, no creemos que necesites más °-°',
				condition: (input, properties) => {
					if (input.value.length > 6) {
						let thisErrror = properties.errors.find(error => error.name === 'maxLength')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					}
				}
			},
			{
				name: 'mustBeNumbers',
				message: 'Como esto es un precio, sólo debe contener numeros, el valor es en pesos :3',
				condition: (input, properties) => {
					let hasLetter = hasLetters(input.value)

					if (hasLetter) {
						let thisErrror = properties.errors.find(error => error.name === 'mustBeNumbers')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					}
				}
			}
		]
	},
	{
		name: 'discount',
		errors: [
			{
				name: 'notSelected',
				message: 'Es necesario que elijas un valor para el descuento querid@ :3, el valor puede ser cero ¬¬',
				condition: (input, properties) => {
					if (input.value === '') {
						let thisErrror = properties.errors.find(error => error.name === 'notSelected')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					} 
				}
			},
			{
				name: 'invalidValue',
				message: 'Hey, ese valor no es valido amig@u >:S',
				condition: (input, properties) => {
					let validValues = ['', ]
				
					for( let i = 0; i < 50; i += 5 ) {
						validValues.push(i.toString())
					}

					console.log(validValues)

					if (!validValues.includes(input.value)) {
						let thisError = properties.errors.find(error => error.name === 'invalidValue')
						let message = thisError.message
						itsAnError(properties, message)
						return true
					}
				} 
			}
		]
	},
	{
		name: 'market',
		errors: [
			{
				name: 'notSelected',
				message: 'Es necesario que elijas un mercado querid@ :3',
				condition: (input, properties) => {
					if (input.value === '') {
						let thisErrror = properties.errors.find(error => error.name === 'notSelected')
						let message = thisErrror.message
						itsAnError(properties, message)
						return true
					} 
				}
			},
			{
				name: 'invalidValue',
				message: 'Hey, ese valor no es valido amig@u >:S',
				condition: (input, properties) => {
					let validValues = ['', '1', '2', '3']
				
					if (!validValues.includes(input.value)) {
						let thisError = properties.errors.find(error => error.name === 'invalidValue')
						let message = thisError.message
						itsAnError(properties, message)
						return true
					}
				} 
			}
		]
	}
]

let arrayErrors = ['name', 'category', 'unit', 'kilo', 'discount', 'market']

window.addEventListener('load', function() {

	const formulario = document.querySelector('.formulario')

	const validationList = {
		'name' : function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, errors, keyUpEvent}) {
			if (keyUpEvent) {
				let nameInput = keyUpEvent.target
				const properties = {
					backendErrorSpan,
					correctLabel,
					inputField,
					incorrectLabel,
					errors,
					frontendErrorSpan,
					input: nameInput
				}

				let somethingWrong = []

				errors.forEach(error => {
					error.condition(inputField, properties) ? somethingWrong.push(true) : somethingWrong.push(false)
				})

				if (!somethingWrong.includes(true)) {
					itsNoError(properties)
				}
			}
		},
		'category': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, errors, changeEvent}){

			if (changeEvent) {
				
				let categoryInput = changeEvent.target

				let somethingWrong = []
	
				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					errors,
					input: categoryInput
				}


				errors.forEach(error => {
					error.condition(inputField, properties) ? somethingWrong.push(true) : somethingWrong.push(false)
				})

				if (!somethingWrong.includes(true)) {
					itsNoError(properties)
				}
			}
		},
		'image': function({ incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, comodinLabel, errors, changeEvent }) {
			if (changeEvent) {
				
				let imageInput = changeEvent.target
				let displayLabel =  incorrectLabel 
				let incorrectFileLabel = correctLabel
				let correctFileLabel = backendErrorSpan
				let backendFileErrorSpan = frontendErrorSpan
				let frontendFileErrorSpan = comodinLabel

				let somethingWrong = []

				const properties = {
					inputField: displayLabel,
					incorrectLabel: incorrectFileLabel,
					correctLabel: correctFileLabel,
					backendErrorSpan: backendFileErrorSpan,
					frontendErrorSpan: frontendFileErrorSpan,
					errors,
					input: imageInput
				}

				errors.forEach(error => {
					error.condition(imageInput, properties) ? somethingWrong.push(true) : somethingWrong.push(false)
				})
				if (!somethingWrong.includes(true)) {
					itsNoError(properties)
				}
			}
		},
		'unit': function({ inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, errors, keyUpEvent }) {
			if (keyUpEvent) {
				let unitInput = keyUpEvent.target

				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					errors,
					input: unitInput
				}

				let somethingWrong = []

				errors.forEach(error => {
					error.condition(inputField, properties) ? somethingWrong.push(true) : somethingWrong.push(false)
				})

				if (!somethingWrong.includes(true)) {
					itsNoError(properties)
				}
			}
		},
		'kilo': function({ inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, errors, keyUpEvent }) {
			if (keyUpEvent) {
				let kiloInput = keyUpEvent.target
				
				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					errors,
					input: kiloInput
				}

				let somethingWrong = []

				errors.forEach(error => {
					error.condition(inputField, properties) ? somethingWrong.push(true) : somethingWrong.push(false)
				})

				if (!somethingWrong.includes(true)) {
					itsNoError(properties)
				}
			}
		},
		'discount': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, errors, changeEvent}){

			if (changeEvent) {
				// An 1 to 5 array, that are the values of the posible categories
				let validValues = []
				
				for( let i = 0; i < 50; i += 5 ) {
					validValues.push(i)
				}
				let discountInput = changeEvent.target

				let somethingWrong = []

				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					errors,
					input: discountInput
				}
	
				errors.forEach(error => {
					error.condition(inputField, properties) ? somethingWrong.push(true) : somethingWrong.push(false)
				})

				if (!somethingWrong.includes(true)) {
					itsNoError(properties)
				}
			}
		},
		'market': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, errors, changeEvent}){

			if (changeEvent) {
				// An 1 to 5 array, that are the values of the posible categories
				
				let marketInput = changeEvent.target

				let somethingWrong = []
				
				const properties = {
					inputField, 
					incorrectLabel, 
					correctLabel, 
					backendErrorSpan, 
					frontendErrorSpan, 
					errors,
					input: marketInput
				}
	
				errors.forEach(error => {
					error.condition(inputField, properties) ? somethingWrong.push(true) : somethingWrong.push(false)
				})

				if (!somethingWrong.includes(true)) {
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
		let errors = errorsList.find(error => error.name === inputField.name).errors

		// console.log(errors)

		let variables = {
			fieldName, 
			inputField,
			incorrectLabel,
			correctLabel,
			backendErrorSpan,
			frontendErrorSpan,
			comodinLabel,
			errors
		}

		return variables
	}

	/**
 	* 
	* @param {*} param0 
	*/
	const executeEvaluation = ({keyUpEvent = undefined, changeEvent = undefined}) => {

		const events = {keyUpEvent, changeEvent}
		
		const {
			fieldName, 
			inputField, 
			incorrectLabel, 
			correctLabel, 
			backendErrorSpan, 
			frontendErrorSpan, 
			comodinLabel, 
			errors
		} = variables(events)
		
		let data = {
			inputField,
			incorrectLabel,
			correctLabel,
			backendErrorSpan,
			frontendErrorSpan,
			errors,
			keyUpEvent,
			changeEvent,
			comodinLabel,
		}

		let validation = validationList[fieldName]

		validation(data)
	}
    
	formulario.addEventListener('change', changeEvent => {
		let event = {
			changeEvent: changeEvent
		}
		executeEvaluation(event)
	})

	formulario.addEventListener('keyup', (keyUpEvent) => {
		let event = {
			keyUpEvent: keyUpEvent
		}
		executeEvaluation(event)
	})
	formulario.addEventListener('submit', (submitEvent) => {
		if (arrayErrors.length > 0) {
			submitEvent.preventDefault()
		}
	})

})