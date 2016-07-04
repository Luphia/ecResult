var ecResult = function (data) {
	this.dataType = "ecResult";
	this.output = false;
	this.done = false;
	this.format(data);
};
ecResult.prototype.format = function (data) {
	data = data || {};
	this.attr = {};

	if(data.type == "ecResult") {
		for(var key in data.attr) {
			this.attr[key] = data.attr[key];
		}
		this.done = true;
		this.attr.result = data.attr.result || 0;
		this.attr.message = data.attr.message || "";
		this.attr.data = data.attr.data || {};
	}
	else {
		for(var key in data) {
			this.attr[key] = data[key];
			this.done = true;
		}
		this.attr.result = data.result || 0;
		this.attr.message = data.message || "";
		this.attr.data = data.data || {};
	}

	return this;
};
ecResult.prototype.setResult = function (result) {
	this.attr.result = parseInt(result) || 0;
	this.done = true;
	return this;
};
ecResult.prototype.setErrorCode = function (errorcode) {
	if(errorcode === undefined) { return this; }
	this.attr.errorcode = errorcode.toString();
	this.attr.result = 0;
	this.done = true;
	return this;
};
ecResult.prototype.setMessage = function (message) {
	this.attr.message = message;
	this.done = true;
	return this;
};
ecResult.prototype.setData = function (data) {
	this.attr.data = data;
	this.done = true;
	return this;
};
ecResult.prototype.setSession = function (session) {
	this.attr.session = session;
	this.done = true;
	return this;
};
ecResult.prototype.getSession = function () {
	return this.attr.session;
};
ecResult.prototype.setCost = function (cost) {
	cost = parseInt(cost) || 0;
	this.attr.cost = this.attr.cost? (this.attr.cost + cost): cost;
	return this;
}
ecResult.prototype.setCommand = function (path) {
	this.attr.command = path;
	return this;
};

ecResult.prototype.isDone = function () {
	return this.done;
};
ecResult.prototype.isEnd = function () {
	return this.response;
};

ecResult.prototype.toJSON = function () {
	return {
		command: this.attr.command,
		result: this.attr.result || 0,
		errorcode: this.attr.errorcode,
		session: this.attr.session,
		message: this.attr.message || "",
		cost: this.attr.cost,
		data: this.attr.data || {}
	};
};
ecResult.prototype.response = function () {
	if(this.response) {
		return false;
	}
	else {
		this.response = true;
		return this.toJSON();
	}
};

module.exports = ecResult;