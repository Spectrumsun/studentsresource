const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { catchErrors } = require('../handlers/errorHandlers');


router.get('/', resourceController.homePage);

router.get('/show', catchErrors(resourceController.getResource));

router.get('/create', resourceController.create);

router.post("/create", 
	resourceController.upload, 
	catchErrors(resourceController.resize),
	catchErrors(resourceController.createStudent));


router.post('/create/:id', 
	resourceController.upload, 
	catchErrors(resourceController.resize),
	catchErrors(resourceController.updateResource));


router.get('/show/student/:id/edit', catchErrors(resourceController.editResource));


router.get('/show/student/:id', resourceController.studentResource);


router.post('/show/:id', catchErrors(resourceController.del));


router.get("/api/v1", catchErrors(resourceController.api));

 router.get("/api/search", catchErrors(resourceController.search));



module.exports = router;
