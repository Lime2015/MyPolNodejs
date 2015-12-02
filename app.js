
/**
 * Module dependencies.
 */

/*
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
*/

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
var filePath2 = './files/bill.xml';
var filePath3 = './files/vote.xml';

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
			console.log('jsonDoc: '+ menObj.assemblyman_id);
			console.log('jsonDoc saved');
		}
	})
}
//xml2jsParser();

//==========================================================================

var data2 = fs.readFileSync(filePath2, 'utf8', function(err, data) {
	if(err) throw err;
	console.log('data: '+ data2);
	});

function xml2jsParser2() {
		parser.parseString(data2, function (err, arrObj) {	
		if(err) throw err;
		console.log('arrObj: '+ arrObj);
		console.log()
		console.log('arrObj: '+ arrObj.bill_info.assemblymen[0].assemblyman[0].assemblyman_id);
		var jsonObj = arrObj.bill_info.assemblymen[0].assemblyman;
//		console.log('jsonObj: ' + jsonObj);
		
		for(var i=0; i< jsonObj.length; i++){
			var Assemblymen = Parse.Object.extend("Bill");
			var assemblymen = new Assemblymen();
			var menObj = jsonObj[i];
			assemblymen.set(menObj);
			assemblymen.save();
			console.log('jsonDoc: '+ menObj.assemblyman_id);
			console.log('jsonDoc saved');
		}
	})
}
//xml2jsParser2();

//==================================================================================

/*
fs.readFile(filePath3, 'utf8', function(err, data) {
	parser.parseString(data, function (err, arrObj) {
		console.log('arrObj: '+ arrObj);
		
		console.log('arrObj: '+ arrObj.general_meeting_vote.assemblymen[0].assemblyman[0].assemblyman_id);
		var jsonObj = arrObj.general_meeting_vote.assemblymen[0].assemblyman;
		
		if(jsonObj != null){
			for(var i=0; i< jsonObj.length; i++){
				var Assemblymen = Parse.Object.extend("Vote");
				var assemblymen = new Assemblymen();
				var menObj = jsonObj[i];
				assemblymen.set(menObj);
				assemblymen.save();
				console.log('jsonDoc: '+ menObj);
				console.log('jsonDoc saved');
			}
		}else{ throw err}
	})
});
*/

var data3 = fs.readFileSync(filePath3, 'utf8', function(err, data) {
	if(err) throw err;
//	console.log('data: '+ data3);
	});

function xml2jsParser3() {
		parser.parseString(data3, function (err, arrObj) {	
		if(err) throw err;
		console.log('arrObj: '+ arrObj);
		console.log('arrObj: '+ arrObj.general_meeting_vote.assemblymen[0].assemblyman[0].assemblyman_id);
		console.log('arrObj: '+ arrObj.general_meeting_vote.assemblymen[0].assemblyman[0].votes[0].vote[0].assemblyman_vote);
		var jsonObj = arrObj.general_meeting_vote.assemblymen[0].assemblyman;
//		console.log('jsonObj: ' + jsonObj);
		console.log(roughSizeOfObject(jsonObj));
		
		for(var i=0; i< jsonObj.length; i++){
			var Assemblymen = Parse.Object.extend("Vote");
			var assemblymen = new Assemblymen();
			var menObj = jsonObj[i];
			console.log(roughSizeOfObject(menObj));
			assemblymen.set(menObj);
			assemblymen.save();
			console.log('jsonDoc: '+ menObj.assemblyman_id);
			console.log('jsonDoc saved');
		}
	})
}
xml2jsParser3();

function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

//=============================================================================


/*
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
*/