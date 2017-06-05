var mongo = require('mongodb').MongoClient
var fs = require('fs');
var url = 'mongodb://localhost:27017/moviemongo'
  mongo.connect(url, function(err, db) {
      if (err) throw err
     // var collection = db.collection('docs')
        //collection.insert(doc, function(err, data) {
          //if (err) throw err
          //console.log(JSON.stringify(doc))
          //db.close()
          db.createCollection('movie',function(err,collection){
            

fs.readFile('movies.dat', 'utf8', function(err, data) {
    
    
    var text = data.toString();
    var line = text.split("\n");
    
   for(var i=0; i<line.length;i++){
      var word = line[i].split("::");
      //console.log(word[1]);
      
      var regexpYear = /(\d{4})\)$/g;
      var arrayYear = regexpYear.exec(word[1]);
      //var arrayYear1 = arrayYear[1];
      console.log(arrayYear);
    
      db.collection('moviedata').insert({
  
        id: word[0]
      , name: word[1]

      ,year:arrayYear[1]
      ,cat: word[2] && word[2].split("|")
    }) 

   }

   db.close()

          })
    })
  
  