const bcrypt = require('bcryptjs');

const trial = async () => {
	const password = 'test1234';
	const encrptedPassword = bcrypt.hashSync(password, 11);

	const areMatching = await bcrypt.compare(password, encrptedPassword);
	console.log(areMatching);
};

const trial1 = async () => {
	const date = '2023-09-27T18:42:54.399+00:00';
	const parsedDate = new Date(date);

	console.log(parsedDate);
};

trial1();
