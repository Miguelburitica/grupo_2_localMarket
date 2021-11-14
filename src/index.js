const app = require('./app.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`\\*-------------------------*\\`);
	console.log(`Server running in ${port} port`);
	console.log(
		`Now, you can open http://localhost:${port} in your favorite browser `
	);
	console.log(`Happy programming and never stop learning!`);

	console.log(`\\*-------------------------*\\`);
});
