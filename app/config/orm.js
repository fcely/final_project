var connection = require("../config/connection.js");

// Object Relational Mapper (ORM)

var orm = {
  selectAllPatients: function(cb_result) {
    var queryString = "SELECT Patient_Id,Patient_First_Name,Patient_Last_Name,Patient_Email,Phone,date_format(DOB,'%Y-%m-%d') as DOB,Address,City,State,Zip,SSN,Gender,Notes,Allergies, Alcohol_Use, Tabaco_Use, Mother_History,Father_History, Height FROM Patients";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      console.log(result)
      cb_result(result)   
    });
  },
  selectAllVisits: function(cb_result) {
    var queryString = "SELECT month(Visit_Date) as Visit_Month, year(Visit_Date) as Visit_Year, day(Visit_Date) as Visit_Day, month(DOB) as DOB_Month, year(DOB) as DOB_Year, day(DOB) as DOB_Day, Visits.*,Patient_First_Name,Patient_Last_Name, DOB, Doctor_Name, Doctor_Specialty FROM Visits  left join Patients  on Visits.Patient_Id=Patients.Patient_Id left join Doctors on Doctors.Doctor_Id=Visits.Doctor_Id";
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      console.log(result);
      cb_result(result)
    });
  },

selectAllVisitsForPatientId: function( valOfCol,cb_result) {
  var queryString = "SELECT month(Visit_Date) as Visit_Month, year(Visit_Date) as Visit_Year, day(Visit_Date) as Visit_Day, month(DOB) as DOB_Month, year(DOB) as DOB_Year, day(DOB) as DOB_Day,Visits.*,Patient_First_Name,Patient_Last_Name, DOB, Doctor_Name, Doctor_Specialty FROM Visits  left join Patients  on Visits.Patient_Id=Patients.Patient_Id left join Doctors on Doctors.Doctor_Id=Visits.Doctor_Id where Visits.Patient_Id=? order by Visit_Date asc";
  connection.query(queryString, [ valOfCol], function(err, result) {
    if (err) throw err;
    console.log(result);
    cb_result(result)
  });
},


selectAllVisitsForPacientIdOnVisitId: function( valOfCol,cb_result) {
  var queryString = "SELECT month(Visit_Date) as Visit_Month, year(Visit_Date) as Visit_Year, day(Visit_Date) as Visit_Day, month(DOB) as DOB_Month, year(DOB) as DOB_Year, day(DOB) as DOB_Day,Visits.*,Patient_First_Name,Patient_Last_Name,Phone, DOB, Doctor_Name, Doctor_Specialty FROM Visits  left join Patients  on Visits.Patient_Id=Patients.Patient_Id left join Doctors on Doctors.Doctor_Id=Visits.Doctor_Id where Visits.Patient_Id=(select distinct Patient_Id from Visits where Visit_Id=?) order by Visit_Date asc";
  connection.query(queryString, [ valOfCol], function(err, result) {
    if (err) throw err;
    console.log(result);
    cb_result(result)
  });
},


SelectDataForChart: function( valOfCol,cb_result) {
  var queryString = "SELECT date_format(Visit_Date,'%Y-%m-%d') as Visit_Date, IFNULL(Blood_Pressure_S,0) as Blood_Pressure_S,  IFNULL(Blood_Pressure_D,0) as Blood_Pressure_D, IFNULL(Weight,0) as Weight FROM Visits  where Visits.Patient_Id=(select distinct Patient_Id from Visits where Visit_Id=?) order by Visit_Date asc";
  connection.query(queryString, [ valOfCol], function(err, result) {
    if (err) throw err;
    console.log(result);
    cb_result(result)
  });
},




selectAllVisitsForVisitId: function( valOfCol,cb_result) {
  var queryString = "SELECT month(Visit_Date) as Visit_Month, year(Visit_Date) as Visit_Year, day(Visit_Date) as Visit_Day, month(DOB) as DOB_Month, year(DOB) as DOB_Year, day(DOB) as DOB_Day,Visits.*,Patient_First_Name,Patient_Last_Name,Phone, DOB, Doctor_Name, Doctor_Specialty FROM Visits  left join Patients  on Visits.Patient_Id=Patients.Patient_Id left join Doctors on Doctors.Doctor_Id=Visits.Doctor_Id where Visits.Visit_Id=? order by Visit_Date asc";
  connection.query(queryString, [ valOfCol], function(err, result) {
    if (err) throw err;
    console.log(result);
    cb_result(result)
  });
},





  //,
  //SelectPatient: function(tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
  //  var queryString =
  //    "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";

  //  connection.query(
  //    queryString,
  //    [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol],
  //    function(err, result) {
  //      if (err) throw err;
  //      console.log(result);
  //    }
  //  );
  //}
};

module.exports = orm;
