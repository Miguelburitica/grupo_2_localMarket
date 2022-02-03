const forEachHtml = function (array, callBack) {
	for (let i = 0; i < array.length; i++) {
		callBack(array[i]);
	}
};

window.addEventListener('load', function () {
	let [titulo, name, cateogry, image, unit, kilo, discount, market, button] =
		document.querySelector('.formulario').children;
	let formulario = document.querySelector('.formulario');

	let imageLabel = image.querySelector('label.label-file');
	image = image.querySelector('#image');

	console.log(image);

	imageLabel.addEventListener('mouseleave', function () {
		console.log(image.files);
	});

	formulario.addEventListener('submit', function (event) {
		event.preventDefault();
	});
});
