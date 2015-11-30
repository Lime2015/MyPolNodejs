
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var Parse = require('parse/node').Parse;
Parse.initialize("wucQ2VqODSKz7D1uDiLKxiD00j4x7RJ9n8yHY96T", "rnqRoLXpzXS55jcizn34NH7uc2B2u4JkxUe4GucP");

/*
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo:"bar"}).then(function(object) {
  console.log("test success!")
});
*/

var fs = require('fs');
var filePath = './files/assemblymen.xml';

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

//var jsonObj = [];
//jsonObj = null;
var data = fs.readFileSync(filePath, 'utf8', function(err, data) {
	if(err) throw err;
	console.log('data: '+ data);
	});

function xml2jsParser() {
		parser.parseString(data, function (err, arrObj) {	
		if(err) throw err;
		console.log('arrObj: '+ arrObj);
		console.log('arrObj: '+ arrObj.assemblymen.assemblyman[0].assemblyman_name);
		var jsonObj = arrObj.assemblymen.assemblyman;
		console.log('jsonObj: ' + jsonObj);
		
		for(var i=0; i< jsonObj.length; i++){
			var Assemblymen = Parse.Object.extend("Assemblymen");
			var assemblymen = new Assemblymen();
			var menObj = jsonObj[i];
			assemblymen.set(menObj);
			assemblymen.save();
			console.log('jsonDoc: '+ menObj.assembly_id);
			console.log('jsonDoc saved');
		}
	})
}
xml2jsParser();
/*
function assemblySave(){

	if(jsonObj != null){
		for(var i=0; i< jsonObj.length; i++){
			var Assemblymen = Parse.Object.extend("Assemblymen");
			var assemblymen = new Assemblymen();
			var menObj = jsonObj[i];
			assemblymen.set(menObj);
			assemblymen.save();
//			console.log('jsonDoc: '+ menObj);
			console.log('jsonDoc saved');
		}
	} else {
		console.log('fail!');
	}
}
*/
/*
xml2jsParser(function(){
	assemblySave();
});
*/
		
/*
if(arrObj != null){
	for(var i=0; i< arrObj.length; i++){
		var Assemblymen = Parse.Object.extend("Assemblymen");
		var assemblymen = new Assemblymen();
		var menObj = arrObj[i];
		assemblymen.set(menObj);
		assemblymen.save();
		console.log('jsonDoc: '+ menObj);
		console.log('jsonDoc saved');
	}}else{ throw err}

*/
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
