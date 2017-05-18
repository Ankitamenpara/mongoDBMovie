var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/moviemongo'
var input = process.argv[2]
var Table = require('cli-table');

  mongo.connect(url, function(err, db) {
      if (err) throw err
        
        var moviedata = db.collection('moviedata')     
        moviedata.find({
          year: input
          }).toArray(function(err, docs) {
                        if (err) throw err
                        console.log(docs)

                        db.close()
  
                    })
  })
    
    
   