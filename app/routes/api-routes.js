
// Dependencies
// =============================================================
var orm = require("../config/orm.js");
var db = require("../../models/");

// Routes
// =============================================================
module.exports = function(app) {

//-------------------------Navigation to Main Pages---------------------------------------

// Home Page
app.get("/", function(req, res) {
    res.render("home", { })
  });

// Users
app.get("/users/:group_id", function(req, res) {
  //pending to capture group id
  db.Users.findAll({where: {group_id: 1}}).then(function(result){
    res.render("users", {user:result })
  });
});

// Accounts
app.get("/accounts/:user_id", function(req, res) {
  var User_Id = req.params.user_id
    db.Accounts.findAll({where: {user_id: User_Id}}).then(function(result){
var Accounts=result

db.Requests.findAll({where: {user_id: User_Id}}).then(function(result){
      res.render("accounts", {account:Accounts, user_id:User_Id, request:result })

})
  })
})

// Chores
app.get("/chores/:group_id", function(req, res) {
  var Group_Id = req.params.group_id
  db.Chores.findAll({where: {group_id: Group_Id}}).then(function(result){
    res.render("chores", {chore:result, group_id:Group_Id })
  });
   
  });

// kids page
app.get("/kids/:user_id", function(req, res) {


  var User_Id = req.params.user_id
  var Group_Id = req.params.user_id

  db.Accounts.findAll({where: {user_id: User_Id,}}).then(function(result1){
  var accounts=result1
  
  db.Chores.findAll({where: {group_id: Group_Id, user_id:null}}).then(function(result2){
  
    var chores=result2
  
  db.Chores.findAll({where: {group_id: Group_Id, user_id:User_Id}}).then(function(result3){
  res.render("kids", {account:accounts, chore:chores, user_id:User_Id, pending_chore:result3 })



  })

})
})
  });

// Log Out
app.get("/logout", function(req, res) {
    res.render("logout", { })
  });


//------------------------------------------------------------------------------------------------------

// ------------------------- API for table interaction --------------------------------------------




app.get("/chores/delete/:chore_id/:group_id", function(req, res) {
var Chore_Id= req.params.chore_id 
var Group_Id= req.params.group_id  

  db.Chores.destroy({where: {chore_id: Chore_Id}}).then(function(result){

    res.redirect("/chores/"+ Group_Id)
  })

})


app.get("/chores/signup/:chore_id/:user_id", function(req, res) {
  var Chore_Id= req.params.chore_id 
  var User_Id= req.params.user_id  
  
    db.Chores.update({user_id:User_Id},{returning: true, where: {chore_id: Chore_Id}}).then(function(result){
  
      res.redirect("/kids/"+ User_Id)
    })
  
  })
  


  //db.Patients.update(
    // req.body,
     //{returning: true, where: {Patient_Id: req.body.Patient_Id}}
  // )
  // .then(function(result) {
   //  res.redirect("/patients");





app.post("/new/chore", function(req,res){
  console.log(req.body)
  db.Chores.create(req.body).then(function(result){
  var Group_Id=req.body.group_id
      db.Chores.findAll({where: {group_id: Group_Id}}).then(function(result){
      res.redirect("/chores/"+ Group_Id)
      })
  })
})



app.post("/new/user", function(req,res){
  console.log(req.body)
  db.Users.create(req.body).then(function(result){
      db.Users.findAll({where: {group_id: 1}}).then(function(result){
          res.render("users", {user:result })
      })
  })
})



app.post("/new/account", function(req,res){
db.Accounts.create(req.body).then(function(result){
var User_Id=req.body.user_id
     // db.Accounts.findAll({where: {user_id: User_Id}}).then(function(result){          
        res.redirect("/accounts/"+ User_Id)
        
      //})
  })
})


app.post("/new/request", function(req,res){
  db.Requests.create(req.body).then(function(result){
  var User_Id=req.body.user_id
                
          res.redirect("/kids/"+ User_Id)
          
      
    })
  })




app.post("/transaction", function(req, res) {

console.log(req.body)

  db.Transactions.create(req.body).then(function(result){
      console.log("transacion succesfull")
      console.log(req.body)        
  // Section to update balance accounts table
var account_json={
  balance:req.body.end_bal,
  account_id:req.body.account_id,
  user_id:req.body.user_id
  }

  db.Accounts.update(
      account_json,
      {returning: true, where: {account_id: account_json.account_id}}
    ).then(function(result) {      
  

      res.json({response:200})
  })

  
  })
})












}




// Route to add Account


// route to add chores

// route to add transactions



// Route to Create new user
//app.post("/doctors/new", function(req, res) {
  //db.Doctors.create(req.body).then(function(result) {
  //res.redirect("/doctors");
  //});

 // })

// Update the patients database
   // app.post("/patients/update", function(req, res) {
   // db.Patients.update(
     // req.body,
      //{returning: true, where: {Patient_Id: req.body.Patient_Id}}
   // )
   // .then(function(result) {
    //  res.redirect("/patients");
    //})
   //})

// Route to call specific patient information to be updated   
   // app.get("/patients/update/:Patient_Id", function(req, res) {
    //  var Patient_Id = req.params.Patient_Id;
    //  db.Patients.findAll({where: {Patient_Id: Patient_Id}}).then(function(result){
        //res.json(result)
     //   res.render("updatepatient", {patient:result[0]});
     // })  
   // })

   // app.get("/patients/patients/update/:Patient_Id", function(req, res) {
   //   var Patient_Id = req.params.Patient_Id;
   //   db.Patients.findAll({where: {Patient_Id: Patient_Id}}).then(function(result){
        //res.json(result)
   //     res.render("updatepatient", {patient:result[0]});
   //   })  
   // })



 //Route to new user Form
 //app.get("/doctors", function(req, res) {
 // res.render("newdoctor", {  });  
//})



  //Route to new Patient Form
  //app.get("/patients/new", function(req, res) {
  //  res.render("newpatient", {  });  
 // })


  //Route to new Patient Form
 // app.get("/patients/patients/new", function(req, res) {
 //   res.render("newpatient", {  });  
 // })



//Route to display all patients
  //app.get("/patients", function(req, res) {
    //res.json({a:1})
    //result = orm.selectAllPatients(function(result) {
      //var data = result;
       //res.json(result)
      //res.render("patients", { visit:data });  
    //});
 // });
    


// Route to display all visits
//app.get("/visits", function(req, res) {
//  result = orm.selectAllVisits(function(result) {
//    var data = result;
//    console.log(data);
  //res.json({ visit:data })     
//  res.render("visits", { visit:data });  
//});
//});



//Route to capture visits Detail Information, Pending to create similar route when log in happens from main page
//app.get("/visits/log/:Visit_Id", function(req, res) {
//  var Visit_Id = req.params.Visit_Id;
//  result = orm.selectAllVisitsForPacientIdOnVisitId(Visit_Id,function(result) {
//    var data = result;
//  result2 = orm.selectAllVisitsForVisitId (Visit_Id,function(result2) {
  //res.json({ visit:data })     
  //res.json({ visit:data, current:result2 })
//  res.render("visitlog", { visit:data, current:result2 });  

//    })
//});
//});


// Route for chart
//app.get("/api/visit/:Visit_Id", function(req, res) {
//  var Visit_Id = req.params.Visit_Id;
//  result = orm.SelectDataForChart(Visit_Id,function(result) {
//    res.json(result )  
  
//});})




// Route to log out
//app.get("/logout", function(req, res) {
//  res.send('<script>window.location.href="https://clinicplus.herokuapp.com/logout";</script>');
  
//})









//Route to capture visits Detail Information from new appointment page
//app.get("/visits/new/visits/log/:Visit_Id", function(req, res) {
//  var Visit_Id = req.params.Visit_Id;
//  result = orm.selectAllVisitsForPacientIdOnVisitId(Visit_Id,function(result) {
//    var data = result;
//  result2 = orm.selectAllVisitsForVisitId (Visit_Id,function(result2) {
  //res.json({ visit:data })     
  //res.json({ visit:data, current:result2 })
 // res.render("visitlog", { visit:data, current:result2 });  

   // })
//});
//});


// Update the  visits  database
//app.post("/visits/log/update", function(req, res) {
 // db.Visits.update(
   // req.body,
   // {returning: true, where: {Visit_Id: req.body.Visit_Id}}
 // )
 // .then(function(result) {
  //  res.redirect("/visits");
 // })
 //})


//app.get("/visits/new/:Patient_Id", function(req, res) {
 // var Patient_Id = req.params.Patient_Id;
 // db.Patients.findAll({where: {Patient_Id: Patient_Id}}).then(function(result1){
  //  db.Doctors.findAll().then(function(result2){
   //   orm.selectAllVisitsForPatientId(Patient_Id,function(result3) {
    //res.json(result3)
  //    res.render("newvisit", {patient:result1[0], doctor:result2, visit:result3})
   // })
   // })
  //})  
//})

//app.get("/patients/visits/new/:Patient_Id", function(req, res) {
 // var Patient_Id = req.params.Patient_Id;
 // db.Patients.findAll({where: {Patient_Id: Patient_Id}}).then(function(result1){
  //  db.Doctors.findAll().then(function(result2){
   //   orm.selectAllVisitsForPatientId(Patient_Id,function(result3) {
    //res.json(result3)
    //  res.render("newvisit", {patient:result1[0], doctor:result2, visit:result3})
    //})
    //})
  //})  
//})




// Route to Create new visit
//app.post("/visits/new", function(req, res) {
 // db.Visits.create(req.body).then(function(result) {
  //res.redirect("/patients");
  //});

  //})


//app.get("/visits/delete/:Visit_Id", function(req, res) {
 // var Visit_Id = req.params.Visit_Id;
 //db.Visits.destroy({where: {Visit_Id: Visit_Id}}).then(function(result) {
 // res.redirect("/visits")
 // });

  //})

  
// Route to delete appointment from patient view
 // app.get("/visits/new/visits/delete/:Visit_Id/:Patient_Id", function(req, res) {
 //   var Visit_Id = req.params.Visit_Id;
 //   var Patient_Id = req.params.Patient_Id;
 //   db.Visits.destroy({where: {Visit_Id: Visit_Id}}).then(function(result) {
    //location.reload()
 //     res.redirect("/visits/new/" + Patient_Id)
 //   });
  
//    })


