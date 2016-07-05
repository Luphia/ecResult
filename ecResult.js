var ecResult = function (data) {
	this.format(data);
};
ecResult.prototype.format = function (data) {
	data = data || {};
	this.attr = {};
	this.dataType = "ecResult";
	this.attr.done = false;
	this.attr.output = false;
	this.attr.end = false;
	this.attr.start = new Date().getTime();

	if(data.type == "ecResult") {
		for(var key in data.attr) {
			this.attr[key] = data.attr[key];
		}
		this.attr.result = data.attr.result || 0;
		this.attr.message = data.attr.message || "";
		this.attr.data = data.attr.data || {};
	}
	else {
		for(var key in data) {
			this.attr[key] = data[key];
			this.attr.done = true;
		}
		this.attr.result = data.result || 0;
		this.attr.message = data.message || "";
		this.attr.data = data.data || {};
	}

	return this;
};
ecResult.prototype.setResult = function (result) {
	this.attr.result = parseInt(result) || 0;
	this.attr.done = true;
	return this;
};
ecResult.prototype.setErrorCode = function (errorcode) {
	if(errorcode === undefined) { return this; }
	this.attr.errorcode = errorcode.toString();
	this.attr.result = 0;
	this.attr.done = true;
	return this;
};
ecResult.prototype.setMessage = function () {
	var data = []
	for(var i in arguments) {
		if(typeof(arguments[i]) == "object") { data.push(JSON.stringify(arguments[i])); }
		else { data.push(arguments[i]); }
	}
	this.attr.done = true;
	this.attr.message = data.join(" ");
	return this;
};
ecResult.prototype.setData = function (data) {
	this.attr.data = data;
	this.attr.done = true;
	return this;
};
ecResult.prototype.setSession = function (session) {
	this.attr.session = session;
	this.attr.done = true;
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
ecResult.prototype.setCommand = function (id) {
	this.attr.command = id;
	return this;
};
ecResult.prototype.resetResponse = function () {
	this.attr.output = false;
};
ecResult.prototype.isDone = function () {
	return this.attr.done;
};
ecResult.prototype.isResponse = function () {
	return this.attr.output;
};
ecResult.prototype.isEnd = function () {
	return (this.attr.end > 0);
};
ecResult.prototype.isExpire = function (expireTime) {
	return this.isEnd() && (expireTime > this.attr.end);
};

ecResult.prototype.toJSON = function () {
	var cost = this.attr.cost || 0;
	var json = {
		command: this.attr.command,
		result: this.attr.result || 0,
		errorcode: this.attr.errorcode,
		session: this.attr.session,
		message: this.attr.message || "",
		data: this.attr.data || {}
	};
	if(this.attr.end > 0) { json.cost = cost + this.attr.end - this.attr.start; }
	this.attr.output = new Date().getTime();
	return json;
};
ecResult.prototype.response = function () {
	if(this.isEnd()) {
		return false;
	}
	else {
		this.attr.end = new Date().getTime();
		return this.toJSON();
	}
};

module.exports = ecResult;