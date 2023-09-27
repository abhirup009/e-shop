const bcrypt = require('bcryptjs');

const trial = async () => {
	const password = 'test1234';
	const encrptedPassword = bcrypt.hashSync(password, 11);

	const areMatching = await bcrypt.compare(password, encrptedPassword);
	console.log(areMatching);
};

trial();
