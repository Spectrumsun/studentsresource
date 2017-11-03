const mongoose = require('mongoose');
mongoose.Promoide = global.Promise;

const resourceSchema = new mongoose.Schema({
	firstname: {
		type: String,
		trim: true,
		required: "You have to input the firstname"
	},
	lastname: {
		type: String,
		trim: true,
		required: "You have to input the lastname"
	},
	middlename: {
		type: String,
		trim: true
	},
	gender:{
		type: String,
		trim: true,
		required: "You have to input the gender"
	},
	address:{
		type: String,
		trim: true,
		required: "You have to input the Address"
	},
	nationality: {
        required: "You have to input the nationality",
        type: String,
        trim: true
    },
    state_of_origin: {
        required: "You have to input the state of origin",
        type: String,
        trim: true
    },
    date_of_birth:{
		type: String,
		trim: true,
		required: "You have to input the date of Birth"
	},
    matric_number: {
        required: "You have to input the Matric Number",
        type: String,
        trim: true
    },
    year_of_admission: {
    	required: "You have to input the Year_of Admission",
        type: Number,
        trim: true
    },
    created: {
    	type: Date,
    	default: Date.now
    },
    photo: {
    	type: "String"
    }
		
});


resourceSchema.index({
    	matric_number: "text",
    	firstname: "text"
 });



module.exports = mongoose.model("Resource", resourceSchema);
