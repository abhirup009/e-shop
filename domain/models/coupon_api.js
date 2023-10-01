class CouponApiResponse {
	constructor(
		id,
		code,
		name,
		expiry,
		discount,
		minimumAmountApplicability,
		applicableOn,
		description
	) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.expiry = expiry;
		this.discount = discount;
		this.minimumAmountApplicability = minimumAmountApplicability;
		this.applicableOn = applicableOn;
		this.description = description;
	}
}

module.exports = CouponApiResponse;
