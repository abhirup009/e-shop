class CouponApiResponse {
	constructor(
		code,
		name,
		expiry,
		discount,
		minimumAmountApplicability,
		applicableOn,
		description
	) {
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
