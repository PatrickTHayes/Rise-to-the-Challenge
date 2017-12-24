var db = require("../models"),
   mailer = require("../config/sendgrid_mailer.js");

module.exports = function(app) {

   app.post('/challenge/new', function(req, res) { // post route for a new challenge, also a parent to challenge instance
      console.log(req.body);
      var newChallenge = { //grab request body info to create new challenge object
         name: req.body.challenge_name,
         rule: req.body.rules,
      };

      const proof = req.body.proof,
         recipient = req.body.challenged;

      console.log(newChallenge);

      db.Template.create(newChallenge).then(function(results) { //post a new row in the challenge table
         console.log(results);
         console.log(req.user);
         mailer({
            email: recipient,
            // we can add an input field for sending email to none user
            challenge_id: results.id,
            // the challenger's username
            challenger_name: req.user.name,
            challenge_proof: proof
         }, 1);

         // @Patrick:
         // perhaps we can send success messaage to client for them to display a modal before reiderecting back to maindashboard?
         res.status(200).redirect('/user/dashboard');
      });
   })

   app.post('/challenge/instance/new', function(req, res) { //post route for a challenge instance , child of user and challenge
      var newChallengeInstance = { // need to know all vars required (what doesn't have a default value in model)
         //challenge_id: req.body.challenge,
         //issuerName:req.body.issuer,
         accepter_id: req.body.accepter
         //startState should be default defined boolean
         //gameState should be default value defined boolean
      }
      db.Instance.create(newChallengeInstance).then(function(results) { //post a new row in the challenge_instance table
         res.redirect('/dashboard');
      })
   })

   app.put('/challenge/instance/accept', function(req, res) { //update the instance state  (user accepted challenge)
      db.Instance.update({
         state: 'challenge-accepted'
      }, {
         where: { id: req.body.id } //grab challenge id from req
      }).then(function(results) {
         res.redirect('/dashboard');
      })
   })

   app.put('/challenge/instance/reject', function(req, res) { //update the instance state  (user rejected challenge)
      db.Instance.update({
         state: 'challenge-rejected'
      }, {
         where: { id: req.body.id } //grab challenge id from req
      }).then(function(results) {
         res.redirect('/dashboard');
      })
   })

   app.put('/challenge/instance/prove', function(req, res) { //update the instance state  (user added proof)
      db.Instance.update({
         state: 'provided-proof'
      }, {
         where: { id: req.body.id } //grab challenge id from req.
      }).then(function(results) {
         res.redirect('/dashboard');
      })
   })

   app.put('/challenge/instance/proofreject', function(req, res) { //update the instance state  (user proof rejected!)
      db.Instance.update({
         state: 'proof-rejected'
      }, {
         where: { id: req.body.id } //grab challenge id from req.
      }).then(function(results) {
         res.redirect('/dashboard');
      })
   })

   app.put('/challenge/instance/proofaccept', function(req, res) { //update the instance state  (user proof accepted!)
      db.Instance.update({
         state: 'proof-accepted'
      }, {
         where: { id: req.body.id } //grab challenge id from req.
      }).then(function(results) {
         res.redirect('/dashboard');
      })
   })

   app.put('/challenge/instance/archive-success', function(req, res) { //update the instance state  (user proof accepted! acknowledged)
      db.Instance.update({
         state: 'archive-success'
      }, {
         where: { id: req.body.id } //grab challenge id from req.
      }).then(function(results) {
         res.redirect('/dashboard');
      })
   })

   app.put('/challenge/instance/archive-fail', function(req, res) { //update the instance state  (user proof rejected! acknowledged)
      db.Instance.update({
         state: 'archive-fail'
      }, {
         where: { id: req.body.id } //grab challenge id from req.
      }).then(function(results) {
         res.redirect('/dashboard');
      })
   })

   app.get('/challenge/instance/id/:id', function(req, res) { //when called, returns this instance's data
      db.Instance.findAll({
         where: { id: req.params.id } //grab challenge id
      }).then(function(results) {
         res.json(results)
      })
   })

   app.get('/challenge/template/id/:id', function(req, res) { //when called, returns this challenge template data
      db.Template.findAll({
         where: { id: req.params.id } //grab challenge id
      }).then(function(results) {
         res.json(results)
      })
   })

   //use this while we keep the instance
   /*app.put('/challenge/instance/reject', function(req,res){//update the instance complete to true (user proof accepted!)
       db.Instance.update({
           completeState:true
           },{
               where:{id:req.body.id} //grab challenge id from req.
           }).then(function(results){
               res.redirect('/home');
           })
   })*/

   // for when we want to get rid of instance
   /*app.delete('/challenge/instance/finish', function(req,res){
       db.Instance.destroy({
           {where:{id:req.body.id}} //grab challenge id to be destroyed
       }).then(function(results){
           res.json(results);
       })
   })*/


};