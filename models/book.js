const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
	title:{
		type: String,
		
	},
	genre:{
		type: String,
		
	},
	description:{
		type: String
	},
	author:{
		type: String,
		
	},
	publisher:{
		type: String,
		
	},
	pages:{
		type: Number
	},
	image_url:{
		type: String
	},
	buy_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

//Get Book By Publisher
module.exports.getBookByPb = (publisher, callback)=>{
	Book.find({"publisher": publisher},callback);
	//console.log(title);
}

//Get Book By Title
module.exports.getBookByTitle = (title, callback)=>{
	Book.findOne({"title": title},callback);
	//console.log(title);
}


// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}
