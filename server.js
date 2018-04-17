'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//db config
var mongoDB = 'mongodb://admin:admin@ds131989.mlab.com:31989/healthyweek';
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Plat = require('./model/plats');
var Menu = require('./model/menu');
var Shoppinglist = require('./model/shoppinglist');
//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;


//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.route('/menu')
  .get(function(req, res) {
    Menu.find().populate('midi').populate('soir').exec(function(err, menu) { 
      if(err)
        res.send(err);
      res.json(menu);
    })
    
  })
  .post(function(req, res) {
    var menu = new Menu();

    menu.jour = req.body.day;
    
    menu.save(function(err) {
      if(err)
        res.send(err);
      
      res.json({message: 'Menu initialisé'});
    })
  });

router.route('/menu/:menu_id')
  .get(function(req, res) {
    Menu.findById(req.params.menu_id, function(err, menu) {
      if(err)
        res.send(err);
      res.json(menu);
    })
  })
  .put(function(req, res) {
    Menu.findById(req.params.menu_id, function(err, menu) {
      if(err)
        res.send(err);
        
        console.log(req.params.menu_id)
        console.log(req.body.midi);
        (req.body.midi) ? menu.midi = req.body.midi._id  : null;
        (req.body.soir) ? menu.soir = req.body.soir._id : null;

        menu.save(function(err, menu) {
            if(err)
              res.send(err)
            res.json({message: 'menu édité !'});
     
        })
         
    })
  });

router.route('/menu/jour/:jour')
  .get(function(req, res) {
    Menu.find(req.params, function(err, menu) {
      if(err)
        res.send(err);
      res.json(menu);
    })
  });;


router.route('/plat')
  .get(function(req, res) {
    Plat.find(function(err, plats) {
      if(err)
        res.send(err);
      res.json(plats);
    })
  })
  .post(function(req, res) {
    var plat = new Plat();

    (req.body.nom) ? plat.nom = req.body.nom : null;
    (req.body.ingredients) ? plat.ingredients = req.body.ingredients : null;

    plat.save(function(err) {
      if(err)
        res.send(err);
      res.json({message: 'plat ajouté'})
    })
  });

  router.route('/shoppinglist')
    .get(function(req, res) {
      Shoppinglist.find(function(err, list) {
        if(err)
          res.send(err);
        res.json(list);
      })
    })
    .post(function(req, res) {
        var shoppinglist = new Shoppinglist();

        (req.body.items) ? shoppinglist.items = req.body.items : null;

        shoppinglist.save(function(err) {
          if(err)
            res.send(err);
          res.json({message: 'list ajouté'})
        })
    });

    router.route('/shoppinglist/:shoppinglist_id')
      .put(function(req, res) {
        Shoppinglist.findById(req.params.shoppinglist_id, function(err, shoppinglist) {
          if(err)
            res.send(err);
          
          (req.body.items) ? shoppinglist.items = [...shoppinglist.items, ...req.body.items] : null;
          
          shoppinglist.save(function(err) {
            if(err)
              res.send(err);
            res.json({message: 'shopping list modifié'})
          })
        })
      })



router.route('/menu/:repas')

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});