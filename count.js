var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/moviemongo'
var Table = require('cli-table');
var input1 = process.argv[2];
//var input2 = process.argv[3];
  mongo.connect(url, function(err, db) {
      if (err) throw err
          
          


        switch (input1){
              case "noOfMoviesAcc":
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
        })

          /*for(var i=0 ;i<results.length;i++){
            table.push([
              results[i]._id,
              results[i].movies
            ]);
          }*/
          
            console.log(table.toString());
            break;

              /*  case "noOfMoviesDes":

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
        })

          console.log(table.toString());
            break;


            case "yearAcc":

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
        })

          console.log(table.toString());
            break;


            case "yearDes":

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
        })

          console.log(table.toString());
            break;*/
            default:
            console.log('error');

          }




                        
            db.close()
  
          })
      
  