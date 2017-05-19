var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/moviemongo'
var Table = require('cli-table');

var input = process.argv[2];

function toTitleCase(input)
{
    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

if(input==null){

	mongo.connect(url, function(err, db){
        if (err) throw err
         	var moviedata = db.collection('moviedata')
         		moviedata.distinct ("cat" , (function (err, docs) {
         			console.log(docs);
         			db.close()


          		
         			}))
         	})

}else if(input === "Adventure" || input === "War" || input === "Children" || input === "Comedy" || input === "Fantasy" || input === "Romance" || input === "Drama" || input === "Action" || input === "Crime" || input === "Thriller" || input === "Horror" ||input === "Mystery" || input === "Sci-fi" || input === "IMAX" || input === "Documentary" || input === "Musical" || input === "Film-Noir" ||input === "Western") {
  	
  	mongo.connect(url, function(err, db) {
      	if (err) throw err
          
          var moviedata = db.collection('moviedata')
              
          
         	moviedata.aggregate([{$match : {cat : input}} , {$group : {_id : "$year" , movies : {$sum : 1}}} , {$sort : {_id :1}}]).toArray(function(err, results){
          		


          		var table = new Table({
            		head: ['YEAR', 'Movies'],
            		colWidths: [10,20]
          			});

          		results.forEach((result) => {
            	table.push([
              	result._id,
              	result.movies,
            		]);
          		});

          		console.log(table.toString());
            	db.close() 

          		})
          	})
         
} else {
    mongo.connect(url, function(err, db){
        if (err) throw err
         	var moviedata = db.collection('moviedata')
         		moviedata.distinct ("cat" , (function (err, docs) {
         			console.log(docs);
         			db.close()
         			}))
         	})
         }

 