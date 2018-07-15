//modules to load:
var express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var myGenericMongoClient = require("./my_generic_mongo_client");
var myGenericRestExpressUtil = require("./my_generic_rest_express_util");

var nodemailer = require('nodemailer');

var mySrcEmail='zanellialexandra@le-flow-des-mots.fr';
var myDestEmail = 'zanellialexandra@yahoo.fr';  // 'didier@d-defrance.fr';

var fs = require('fs'); 

var smtpPwd = null;

var transporter = null;

function initSmtpTransporter(){

transporter = nodemailer.createTransport({
	host: 'mail.gandi.net',
  auth: {
    user: mySrcEmail,
    pass: smtpPwd
  }
});

}

function sendSimpleEmail(emetteur, destinataire , sujet , texte , isHtml ){
	
var mailOptions = isHtml?{
  from: emetteur,
  to: destinataire,
  subject: sujet,
  html: texte
}:{
   from: emetteur,
  to: destinataire,
  subject: sujet,
  text: texte
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    //console.log('Email sent: ' + info.response);
  }
});
	
}



var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

/*
// (TEMPORAIRE) CORS enabled with express/node-js :
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
*/

app.use(express.static('front-end'));


// à tester via postMan ou un équivalent 
// POST : SAVE or UPDATE
// POST flow-des-mots/contacts { "nom" : "..." , "prenom" : "..." ,"email" : "..." , "objet" : "..." , "message" : "..."   }
app.post('/flow-des-mots/contact', function(req, res,next) {
var contact = req.body; // JSON input data as jsObject with ok = null
//console.log("posting new contact :" +JSON.stringify(contact));
var htmlTexte="<h2>nouveau contact - le flow des mots</h2><br/>"
           + "<p>"+ JSON.stringify(contact) +"</p> <br/>"
		   + "<a href='http://le-flow-des-mots.fr/ngr/admin_contact'>http://le-flow-des-mots.fr/ngr/admin_contact</a>";
if(contact){
	sendSimpleEmail( mySrcEmail , myDestEmail ,  "nouveau contact - le flow des mots" ,htmlTexte , true );
	if(contact._id) /* UPDATE*/{
	 var changes = JSON.parse(JSON.stringify(contact)); //clone of contact
     delete changes["_id"];	 
	 //console.log ("changes:"+JSON.stringify(changes));
	 myGenericMongoClient.genericUpdateOne("contacts",contact._id,changes,
		function(err,results){
						   console.log("update results:"+ results);
						   myGenericRestExpressUtil.sendDataOrError(err,contact,res);// send back updated contact
					   });	
    }
	else /*SAVE*/
	  myGenericMongoClient.genericInsertOne("contacts",contact,
		function(err,newId){
						   contact._id=newId;
						   myGenericRestExpressUtil.sendDataOrError(err,contact,res);// send back contact with _id
					   });	
}
});

//{ categorie : "" , titre : "" , fichier_image : null ,  resume : "" , fichier_details_name : null , texte_complet : null , lien_externe : null , date : "2018-06-01", statut : "nouveau"};
// POST : SAVE or UPDATE
app.post('/flow-des-mots/upload_publication', function(req, res,next) {
var publication = JSON.parse(req.body.publication); // explicit JSON.parse() needed here because multipart / formData / upload
//console.log("posting or reposting new publication :" +JSON.stringify(publication));

if (!req.files){
    //console.log('No files were uploaded.');
}
 else{
  // req.files.fileNameXyz (ici .imageFile et .detailsFile) 
  let imageFile = req.files.imageFile;
  if(imageFile){
	  // Use the mv() method to place the file somewhere on your server
	  imageFile.mv('./front-end/posts/images/' + imageFile.name, function(err) {
		if (err)
		  console.log(imageFile.name + " was not upload");
		else 
		  console.log(imageFile.name + " was upload in ./front-end/posts/images");
	  });
  }
  let detailsFile = req.files.detailsFile;
  if(detailsFile){
	  // Use the mv() method to place the file somewhere on your server
	  detailsFile.mv('./front-end/posts/' + detailsFile.name, function(err) {
		if (err)
		  console.log(detailsFile.name + " was not upload");
		else 
		  console.log(detailsFile.name + " was upload in ./front-end/posts/");
	  });
  }
 }
// POST : SAVE or UPDATE
if(publication){
  if(publication._id)/*UPDATE*/{
   var changes = JSON.parse(JSON.stringify(publication)); //clone of publication
   delete changes["_id"];	 
    //console.log ("changes:"+JSON.stringify(changes));
   myGenericMongoClient.genericUpdateOne("publications",publication._id,changes,
	function(err,results){
					   console.log("update results:" + results);
					   myGenericRestExpressUtil.sendDataOrError(err,publication,res);// send back publication
				   });
  }
  else /* SAVE */
   myGenericMongoClient.genericInsertOne("publications",publication,
	function(err,newId){
					   publication._id=newId;
					   myGenericRestExpressUtil.sendDataOrError(err,publication,res);// send back publication with _id
				   });
}				   
});


app.delete('/flow-des-mots/contact/:contactId', function(req, res,next) {
var contactId = req.params.contactId; 
//console.log("deleting contact of _id=:" +contactId);
myGenericMongoClient.genericDeleteOneById("contacts",contactId ,
	    function(err,booleanResult){
			          if(booleanResult)
					      myGenericRestExpressUtil.sendStatusWithOrWithoutError(err,200,res);
					  else
						  myGenericRestExpressUtil.sendStatusWithOrWithoutError(err,500,res);//404 : NotFound or 500 : internal Error
				   });	
});

app.delete('/flow-des-mots/publication/:publicationId', function(req, res,next) {
var publicationId = req.params.publicationId; 
//console.log("deleting publication of _id=:" +publicationId);
myGenericMongoClient.genericDeleteOneById("publications",publicationId ,
	    function(err,booleanResult){
			          if(booleanResult)
					      myGenericRestExpressUtil.sendStatusWithOrWithoutError(err,200,res);
					  else
						  myGenericRestExpressUtil.sendStatusWithOrWithoutError(err,500,res);//404 : NotFound or 500 : internal Error
				   });	
});


// http://localhost:8282/flow-des-mots/contact
app.get('/flow-des-mots/contact', 
function(req, res , next) {
		myGenericMongoClient.genericFindList("contacts", {} , 
                   function(err,tabContacts){
					   myGenericRestExpressUtil.sendDataOrError(err,tabContacts,res);
				   });					   
});
// .../flow-des-mots/publication?categorie=news or ?categorie=atelier_ecriture or ....
app.get('/flow-des-mots/publication', 
function(req, res , next) {
		myGenericMongoClient.genericFindList("publications", { 'categorie' : req.query.categorie} , 
                   function(err,tabPublications){
					   myGenericRestExpressUtil.sendDataOrError(err,tabPublications,res);
				   });					   
});

app.get('/ngr/*', function(req, res , next) {
 //send SPA index.html instead of virtual relative angular routes "/ngr/*"
 res.sendFile(path.join(__dirname, 'front-end/index.html'));
});

app.get('/sp_*', function(req, res , next) {
// for old version 
var path = 'index.html';
res.redirect(path);
});


app.get('/', function(req, res , next) {
res.setHeader('Content-Type', 'text/html');
res.write("<html> <header>");
res.write('<meta http-equiv="refresh" content="0;URL=index.html">');
res.write("</header> <body>");
res.write("</body></html>");
res.end();
});

app.get('/test-ws', function(req, res , next) {
res.setHeader('Content-Type', 'text/html');
res.write("<html> <header>");
res.write("</header> <body>");
res.write('<p>test-ws for server.js (REST WS via nodeJs/express/mongoDB)</p>');
res.write('<p><a href="flow-des-mots/contact"> liste des contacts en JSON </a></p>');
res.write('<p><a href="flow-des-mots/publication?categorie=news"> liste des news publiees en JSON </a></p>');
res.write('<p><a href="flow-des-mots/publication?categorie=atelier_ecriture"> liste des ateliers publies en JSON </a></p>');
res.write("</body></html>");
res.end();
});




app.listen(process.env.PORT , function () {
	//myGenericMongoClient.setMongoDbName('flow-des-mots');
	//myGenericMongoClient.setMongoDbUrl('mongodb://127.0.0.1:27017/flow-des-mots');
	
	fs.readFile('./my-smtp.pwd', 'utf8', function(err, data) {
			if (err) throw err;
			console.log('OK:./my-smtp.pwd');
			smtpPwd = data;
			initSmtpTransporter();
	});
	
	myGenericMongoClient.setMongoDbName('test');
	myGenericMongoClient.setMongoDbUrl('mongodb://127.0.0.1:27017/test');
	myGenericMongoClient.executeInMongoDbConnection(
	function(currentDb){
		 console.log("connected to mongo database ");
	} );
    console.log("rest express node server listening at " + process.env.PORT);
});