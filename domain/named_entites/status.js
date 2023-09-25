const Status = Object.freeze({
	Active: Symbol('ACTIVE'),
	Inactive: Symbol('INACTIVE'),
	Deleted: Symbol('DELETED'),
});

module.exports = Status;
