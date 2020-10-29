const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mime = require('mime');
const request = require('request');
const fs = require('fs');

app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
	    crypto.pseudoRandomBytes(16, function (err, raw) {
	      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
	    });
  	}
})

const upload = multer({ storage: storage })
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/upload',upload.single('files'),function(req,res){
	//console.log(req.file);
	let option = req.body.option;
	let proof = req.file.path;
	let extension = proof.split('.').pop();
	let type = extension=='pdf' ? 'pdf' : 'image';

	if(option === 'aadhaar'){
		console.log('inn aad');
		let options = {
		  url:'https://docs.hyperverge.co/v1/readAadhaar',
		  method: 'POST',
		  headers:{
		    appId: 'f89ba0',
		    appKey: 'f914de856d6f24eae3b5'
		  }
		}

		let startTime = new Date();
		let req = request(options, function (err, resp, body) {
		resp.responseTime = new Date() - startTime;
		  if (err) {
		    console.log('Error!'+err);
		    res.send({msg:"Error"});
		  } else {
		  	res.send({
		  		responseTime: resp.responseTime/1000,
		  		body : body
		  	});
		  }
		});

		let form = req.form();
		form.append('my_field', 'my value');
		form.append(type, fs.createReadStream(__dirname+'/'+proof));
		form.append('outputImageUrl','no');
		form.append('conf','yes');
	}
	else if(option === 'pan'){
		console.log('inn pan');
		let options = {
		  url:'https://docs.hyperverge.co/v1/readPAN',
		  method: 'POST',
		  headers:{
		    appId: 'f89ba0',
		    appKey: 'f914de856d6f24eae3b5'
		  }
		}

		let startTime = new Date();
		let req = request(options, function (err, resp, body) {
		  resp.responseTime = new Date() - startTime;
		  if (err) {
		    console.log('Error!'+err);
		    res.send({msg:"Error"});
		  } else {
		    res.send({
		  		responseTime: resp.responseTime/1000,
		  		body : body
		  	});
		  }
		});
		let form = req.form();
		form.append('my_field', 'my value');
		form.append(type, fs.createReadStream(__dirname+'/'+proof));
		form.append('conf','yes');

	}else if(option === 'passport'){
		let options = {
		  url:'https://docs.hyperverge.co/v1/readPassport',
		  method: 'POST',
		  headers:{
		    appId: 'f89ba0',
		    appKey: 'f914de856d6f24eae3b5'
		  }
		}
		let startTime = new Date();
		let req = request(options, function (err, resp, body) {
		  resp.responseTime = new Date() - startTime;
		  if (err) {
		  	res.send({msg:"Error"});
		    console.log('Error!'+err);
		  } else {
		    res.send({
		  		responseTime: resp.responseTime/1000,
		  		body : body
		  	});
		  }
		});
		let form = req.form();
		form.append('my_field', 'my value');
		form.append(type, fs.createReadStream(__dirname+'/'+proof));
		form.append('outputImageUrl','no');
		form.append('conf','yes');

	}else {
		let options = {
		  url:'https://docs.hyperverge.co/v1/readKYC',
		  method: 'POST',
		  headers:{
		    appId: 'f89ba0',
		    appKey: 'f914de856d6f24eae3b5'
		  }
		}
		let startTime = new Date();
		let req = request(options, function (err, resp, body) {
		  resp.responseTime = new Date() - startTime;
		  if (err) {
		  	res.send({msg:"Error"});
		    console.log('Error!'+err);
		  } else {
		    res.send({
		  		responseTime: resp.responseTime/1000,
		  		body : body
		  	});
		  }
		});
		let form = req.form();
		form.append('my_field', 'my value');
		form.append(type, fs.createReadStream(__dirname+'/'+proof));
		form.append('outputImageUrl','no');
		form.append('conf','yes');
	}	
});



app.listen(6061);
console.log('Now running in port 6061');

