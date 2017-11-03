const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if(isPhoto){
			next(null, true);
		}else{
			next({message: `That filetype is not allowed`}, false);
		}
	}
};

exports.upload = multer(multerOptions).single("photo");

exports.resize = async (req, res, next) => {
	if(!req.file){
		next();
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;
	const photo = await jimp.read(req.file.buffer);
 	await photo.resize(256, 200, jimp.AUTO);
	await photo.write(`./public/uploads/${req.body.photo}`);
	next();
}


exports.homePage = (req, res) => {
  	res.render('homepage', {title: "Welcome"})
};


exports.create = (req, res) => {
  	res.render('create', {title: "Create"});
};


exports.createStudent = async (req, res) => {
	const resource = new Resource(req.body);
	await resource.save();
	req.flash("success", `Successfully Created ${resource.firstname}`);
	res.redirect("/show")
} 

exports.getResource = async (req, res) => {
	const resources = await Resource.find();
	res.render("resource", {title: "Resource", resources})
}


exports.show = (req, res) => {
  	res.render('show', {title: "Show"});
};


exports.studentResource = async (req, res) => {
	const resource = await Resource.findOne({ _id: req.params.id});
	res.render("student", {title: `Matric No: ${resource.matric_number}`, resource})
}


exports.editResource = async (req, res) => {
	const resource = await Resource.findOne({ _id: req.params.id});
  	res.render('edit', {title: `Edit ${resource.firstname}`, resource});
};


exports.updateResource = async (req, res) => {
	const resource =  await Resource.findOneAndUpdate({_id: req.params.id}, req.body, {
		new: true,
		runValidators: true
	}).exec()

	req.flash("success", `Successfully Updated`);
	res.redirect(`/show/student/${resource._id}`);
}

exports.del = async (req, res) => {
	const resource = await Resource.remove(({_id: req.params.id}))
	req.flash("danger", "Successfully Deleted");
	res.redirect("/show")
};


exports.api = async (req, res) => {
	const resource = await Resource.find();
	res.json(resource);
};


exports.search = async (req, res) => {
	const resource = await Resource
	.find({
		$text: {
			$search: req.query.q
		}
	}, {
		score: {$meta: "textScore"}
	})
	.sort({
		score: {$meta: "textScore"}
	})
	.limit(5);
	res.json(resource);
}