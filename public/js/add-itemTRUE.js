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

const errorsList = [
	{
		name: 'name',
		errorMessages: {
			'minLength': 'Amig@ el nombre debe tener al menos 5 caracteres :(',
			'maxLength': 'Amig@ el nombre puede tener maximo 45 caracteres :('
		}
	},
	{
		name: 'category',
		errorMessages: {
			'notSelected': 'Es necesario que elijas una categoria querid@ :3',
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

window.addEventListener('load', function() {

	const formulario = document.querySelector('.formulario')

	const validationList = {
		'name' : function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, keyUpEvent}) {
			if (keyUpEvent) {
				if (keyUpEvent.target.value.length < 5) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['minLength']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
				} else if (keyUpEvent.target.value.length > 45) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['maxLength']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
					
				} else {
					disableIfNeed(backendErrorSpan, incorrectLabel)
					setCorrect(inputField)
					enableLabel(correctLabel)
					disableMessage(frontendErrorSpan)
				}
			}
		},
		'category': function ({inputField, incorrectLabel, correctLabel, backendErrorSpan, frontendErrorSpan, messages, changeEvent}){

			if (changeEvent) {
				// An 1 to 5 array, that are the values of the posible categories
				let validValues = [1, 2, 3, 4, 5]
				
				let currentField = changeEvent.target
	
				if (currentField.value === '') {
					disableIfNeed(backendErrorSpan,correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['notSelected']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
				} else if (!validValues.includes(parseInt(currentField.value))) {
					disableIfNeed(backendErrorSpan, correctLabel)
					setIncorrect(inputField)
					enableLabel(incorrectLabel)
					let messageError = messages['invalidValue']
					enableMessage({spanError: frontendErrorSpan, message: messageError})
				} else {
					disableIfNeed(backendErrorSpan, incorrectLabel)
					setCorrect(inputField)
					enableLabel(correctLabel)
					disableMessage(frontendErrorSpan)
				}
			}
		}
	}

	const executeEvaluation = ({keyUpEvent, changeEvent}) => {
		let fieldName = keyUpEvent !== undefined ? keyUpEvent.target.name : changeEvent.target.name
		console.log(fieldName)
		let inputField = keyUpEvent !== undefined ? keyUpEvent.target : changeEvent.target
		let incorrectLabel = inputField.nextElementSibling
		let correctLabel = incorrectLabel.nextElementSibling
		let backendErrorSpan = correctLabel.nextElementSibling
		let frontendErrorSpan = backendErrorSpan.nextElementSibling
		let messages = errorsList.find(error => error.name === inputField.name).errorMessages
		
		let data = {
			inputField,
			incorrectLabel,
			correctLabel,
			backendErrorSpan,
			frontendErrorSpan,
			messages,
			keyUpEvent,
			changeEvent
		}

		let validation = validationList[fieldName]

		validation(data)
	}
    
	formulario.addEventListener('change', changeEvent => {
		console.log('Soy un change')
		executeEvaluation({changeEvent: changeEvent})
	})

	formulario.addEventListener('keyup', (keyUpEvent) => {
		console.log('Soy un keyUp')
		executeEvaluation({keyUpEvent:keyUpEvent})
	})
	formulario.addEventListener('submit', (submitEvent) => {
		submitEvent.preventDefault()
	})

})