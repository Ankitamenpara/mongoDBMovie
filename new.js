var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/moviemongo'
var Table = require('cli-table');

  mongo.connect(url, function(err, db) {
      if (err) throw err
          
          var moviedata = db.collection('moviedata') 
          
          moviedata.aggregate([{$group : {_id : "$year" , movies : {$sum: 1}}}]).toArray(function(err, results) {
          console.log(results);
            
         var table = new Table({
            head: ['YEAR', 'Movies'],
            colWidths: [10,20]
            });

            table.push([
            '_id',
            results
            ]);
          
            console.log(table.toString());


                        
            db.close()
  
          })
      
   
  })