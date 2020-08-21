var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://JoshTyrrell:e75fMPpH2EZLtt1W@cluster0-eqkqa.mongodb.net/test?retryWrites=true&w=majority";

const prompt = require('prompt-sync')();
var faker = require('faker');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// function mainMenu() { 
//     readline.question("1. Clients \n2. Therapists \n3. Sessions", numIn => {

//     })
// }

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("examDB");

    // var myobj = {
    //     title: "Mr",
    //     forename: "forename",
    //     surname: "surname",
    //     mobile: "mobileNumber",
    //     home: "homeNumber",
    //     email: "email",
    //     homeLine1: "line1",
    //     homeLine2: "line2",
    //     homeTown: "town",
    //     homeCounty: "county",
    //     homeCode: "eircode",
    //     dob: "26/06/1995",
    //     pgName: "Fred",
    //     mobileCom: true,
    //     homeCom: false,
    //     emailCom: true,
    //     dateReg: "26/06/1998",
    //     marStatus: "Married",
    //     referredBy: "Gerald"
    // };

    var myobj = {
        title: faker.name.title(),
        forename: faker.name.firstName(),
        surname: faker.name.lastName(),
        mobileNumber: faker.phone.phoneNumber(),
        homeNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        homeLine1: faker.address.streetName(),
        homeLine2: faker.address.streetAddress(),
        homeTown: faker.address.county(),
        homeCounty: faker.address.state(),
        homeCode: faker.address.zipCode(),
        dob: faker.date.past(),
        pgName: faker.name.findName(),
        mobileCom: faker.random.boolean(),
        homeCom: faker.random.boolean(),
        emailCom: faker.random.boolean(),
        dateReg: faker.date.recent(),
        marStatus: faker.random.word(),
        referredBy: faker.name.findName()
    };

    

    dbo.collection("clients").insertOne(myobj, function(err, res) { 
        if (err) throw err;
        console.log("Customer created!");
        db.close();
    });
});