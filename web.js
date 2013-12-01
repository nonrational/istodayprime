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
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.locals({
  twitter_link : function(name){
    return "<a target='_blank' href='https://twitter.com/" + name + "'>@" + name + "</a>";
  },
  factor_link: function(num){
    return "<a target='_blank' href='http://www.wolframalpha.com/input/?i=factor+" + num + "'>" + num + "</a>";
  }
});

app.get('/', function(req, res) {
  res.render('timezone-redirect', {});
});

app.get(/^\/(Pacific|America|Atlantic|Arctic|Africa|Europe|Asia|Indian|Antartica)(\/.+)+/, function(req, res){

  try {
    var timezone = req.params.join(''),
      mow = moment().tz(timezone);
  } catch(e){
    throw new Error("Unknown Timezone: " + timezone);
  }

  function testWithFormat(format){
    var result = [],
      dateStr = mow.format(format);

    result.push(dateStr);
    result.push(primality(dateStr))

    return result;
  }

  function testPairs(){
    var result = [], pairs = []

    pairs.push(mow.format("YY"))
    pairs.push(mow.format("MM"))
    pairs.push(mow.format("DD"))

    result.push(pairs);
    result.push(_.every(pairs, primality))

    return result;
  }

  var tests = {
    us:  testWithFormat('MMDDYY'),
    long_us: testWithFormat('MMDDYYYY'),
    eu:  testWithFormat('DDMMYY'),
    long_eu: testWithFormat("DDMMYYYY"),
    iso: testWithFormat('YYYYMMDD'),
    pairs: testPairs()
  };

  res.render('index', {
    timezone: timezone,
    overall: _.any(tests, function(tr){ return tr[1]; }),
    results: tests
  });

});

// app.get('*', function(req, res){
//   res.render('404', { status: 404, error: req + " could not be found." });
// });

app.use(function(req, res, next){
  res.render('404', { status: 404, url: req.url });
});

app.use(function(err, req, res, next){
  res.render('500', {
      status: err.status || 500
    , error: err
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {

  console.log("Listening on " + port);
});
