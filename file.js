var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/moviemongo'
var Table = require('cli-table');

  mongo.connect(url, function(err, db) {
      if (err) throw err
          
          var moviedata = db.collection('moviedata') 
          
          moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {movies : -1}}]).toArray(function(err, results) {

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

          /*for(var i=0 ;i<results.length;i++){
            table.push([
              results[i]._id,
              results[i].movies
            ]);
          }*/
          
            console.log(table.toString());


                        
            db.close()
  
          })
      
   
  })