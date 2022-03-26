/* User mongoose model */
const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const User = mongoose.model('User', {
	userID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	userName: {
		type: String,
		required: true,   
        minlegth: 1
	},
    password: {
        type: String,
        required: true,
        minlegth: 1
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, "The email address is in valid"]
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
        minlegth: 1
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        minlegth: 1
    },
    birthDate: {
        type: Date,
        required: true
    },
    phoneNum: {
        type: String,
        required: false
    },
    followingIDs: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: "User"
    },
    followerIDs: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: "User"
    },
    favoriteStyles: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: false,
        ref: "Style"
    },
    bookingList: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: false,
        ref: "Booking"
    }
})

module.exports = { User }