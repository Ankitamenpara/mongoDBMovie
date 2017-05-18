var mongo = require('mongodb').MongoClient
var fs = require('fs');
var url = 'mongodb://localhost:27017/moviemongo'

fs.readFile('movies.dat', 'utf8', function(err, data) {
    if (err) {
        return console.log (err);

    }
    
    var text = data.toString();
    var line = text.split("\n");
   
    for(var i = 0; i < line.length ; i++){
    	var word = line[i].split("::");
       	//var regexpYear = /\(\d{4}\)/g;
    	//var arrayYear = [];
    	//console.log(sp2[1]);
    	//arrayYear = sp2[1].match(regexpYear);
    
var doc = {
	
  			id: word[0],
			name: word[1],
			//year: arrayYear[0],
			cat:word[2]
		}	
	}	
	
	mongo.connect(url, function(err, db) {
  		if (err) throw err
  		var collection = db.collection('doc')
  			collection.insert(doc, function(err, data) {
    			if (err) throw err
    			console.log(JSON.stringify(doc))
    			db.close()
  				})
		})

});