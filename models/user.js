const mongoose = require('mongoose');

// Book Schema
const UserSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
    admin:{
        type: Boolean,
        
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Get Users
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}


// Add User
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

/* Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}*/
