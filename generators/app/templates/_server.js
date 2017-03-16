//Dependencies
var express = require('express');
var app = express();

//Set port to env.Port or default to 8080
app.set('port', process.env.PORT || 8080);
//Listen to port for connections
app.listen(app.get('port'), function() {
  console.log('App listening at port ' + app.get('port'));
});
