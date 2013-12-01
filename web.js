var express = require('express')
  , http = require('http')
  , path = require('path')
  , primality = require('primality')
  , _ = require('underscore')
  , moment = require("moment-timezone");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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

app.locals({
  twitter_link : function(name){
    return "<a target='_blank' href='https://twitter.com/" + name + "'>@" + name + "</a>";
  }
});

app.get('/', function(req, res) {
  res.render('tz301', {});
});

app.get(/^\/(Pacific|America|Atlantic|Arctic|Africa|Europe|Asia|Indian|Antartica)(\/.+)+/, function(req, res){

  var timezone = req.params.join(''),
    mow = moment().tz(timezone);

  function withFormat(format){
    var result = [],
      dateStr = mow.format(format);

    result.push(dateStr);
    result.push(primality(dateStr))

    return result;
  }

  var tests = {
    us:  withFormat('MMDDYY'),
    long_us: withFormat('MMDDYYYY'),
    eu:  withFormat('DDMMYY'),
    long_eu: withFormat("DDMMYYYY"),
    iso: withFormat('YYYYMMDD'),
  };

  res.render('index', {
    timezone: timezone,
    overall: _.any(tests, function(tr){ return tr[1]; }),
    results: tests
  });

});


var port = process.env.PORT || 5000;
app.listen(port, function() {

  console.log("Listening on " + port);
});
