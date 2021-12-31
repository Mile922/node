const mongoose = require('mongoose');

// Genre Schema
const cinemaSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	url:{
		type: String
	},
	englishname:{
		type: String
	},
	start:{
		type: String
	}
});

const Cinema = module.exports = mongoose.model('cinema', cinemaSchema);

// Get cinemas
module.exports.getCinemas = (callback, limit) => {
	Cinema.find(callback).limit(limit);
}

//Get cinema 
module.exports.getCinema = (name, callback)=>{
	Cinema.findOne({"name": name},callback);
	//console.log(title);
}

// Add cinema
module.exports.addCinema = (cinema, callback) => {
	Cinema.create(cinema, callback);
}

// Update cinema
module.exports.updateCinema = (id, cinema, options, callback) => {
	var query = {_id: id};
	var update = {
		name: cinema.name,
		url: cinema.url,
		englishname:cinema.englishname,
		start:cinema.start
	}
	Cinema.findOneAndUpdate(query, update, options, callback);
}


// Delete cinema
module.exports.removeCinema = (id, callback) => {
	var query = {_id: id};
	Cinema.remove(query, callback);
}
