var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/moviemongo'
var Table = require('cli-table');

var input1= process.argv[2];
var input2 = process.argv[3];

switch (input1) {
  case "movies":
    
    if(input2=="Acc" || input2==null) {
      mongo.connect(url, function(err, db) {
        
        if (err) throw err
          
          var moviedata = db.collection('moviedata') 
          
          moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {movies : 1}}]).toArray(function(err, results) {

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
    } else if(input2=="Des" || input2==null){
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

          console.log(table.toString());            
          
          db.close()
  
          })
      
   
  })
    } else {
        console.log("error");
      }
  break;

   
  case "year":
    if(input2=="Acc" || input2==" "){
      mongo.connect(url, function(err, db) {
        if (err) throw err
          
          var moviedata = db.collection('moviedata') 
          
          moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {_id : 1}}]).toArray(function(err, results) {

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
    } else if (input2=="Des" || " "){
    
  
      mongo.connect(url, function(err, db) {
        if (err) throw err
          
          var moviedata = db.collection('moviedata') 
          
          moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {_id : -1}}]).toArray(function(err, results) {

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
        console.log("error");
  break;
  }
  
}
