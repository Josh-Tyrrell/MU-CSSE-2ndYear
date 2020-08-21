//Have to install prompt sync for code to work
//I used MongoDB shell v4.2.5 and node v12.16.1

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://JoshTyrrell:e75fMPpH2EZLtt1W@cluster0-eqkqa.mongodb.net/test?retryWrites=true&w=majority";

const prompt = require('prompt-sync')();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


//main menu which allows user to easily nagivate between collections to carry out CRUD functionality

function mainMenu() {
    readline.question("1. Customers \n2. Phones \n3. Orders \n", numIn => {
        if (numIn == 1) {
            readline.question('1. Create \n2. Read \n3. Update \n4. Delete \n', num => {
                if (num == 1) {
                    createCustomer();
                } else if (num == 2) {
                    searchCustomer();
                } else if (num == 3) {
                    updateCustomer();
                } else if (num == 4) {
                    deleteCustomer();
                } else {
                    console.log("Incorrect input, please try again");
                    mainMenu();
                }
                readline.close();
            });
        } else if (numIn == 2) {
            readline.question('1. Create \n2. Read \n3. Update \n4. Delete \n', num => {
                if (num == 1) {
                    createPhone();
                } else if (num == 2) {
                    searchPhone();
                } else if (num == 3) {
                    updatePhone();
                } else if (num == 4) {
                    deletePhone();
                } else {
                    console.log("Incorrect input, please try again");
                    mainMenu();
                }
                readline.close();
            });
        } else if (numIn == 3) {
            readline.question('1. Create \n2. Read \n3. Update \n4. Delete \n', num => {
                if (num == 1) {
                    createOrder();
                } else if (num == 2) {
                    searchOrder();
                } else if (num == 3) {
                    updateOrder();
                } else if (num == 4) {
                    deleteOrder();
                } else {
                    console.log("Incorrect input, please try again");
                    mainMenu();
                }
                readline.close();
            });
        } else {
            console.log("Incorrect input, please try again");
            mainMenu();
        }
    });
}

function createCustomer() {
    //take in user data using prompts
    console.log("Inputs marked with '*' are required \n");
    const title = prompt('Title: Eg Mr, Ms    ');
    const forename = prompt('What is your first name?*     ');
    const surname = prompt('What is your surname?*    ');
    const mobileNumber = prompt('What is your mobile number?*    ');
    const email = prompt('What is your email address?*    ');

    // Address
    console.log("Enter Home Address: ")
    const line1 = prompt('Line 1:*    ');
    const line2 = prompt('Line 2:    ');
    const town = prompt('Town:*    ');
    const county = prompt('County:*    ');
    const eircode = prompt('Eircode:    ');

    // Check for same address
    const same = prompt("Is shipping address the same? Y/N    ");
    let shippingLine1;
    let shippingLine2;
    let shippingTown;
    let shippingCounty;
    let shippingEircode;
    if (same == "N" || same == "n") {
        console.log("Enter Shipping Address: \n");
        shippingLine1 = prompt('Line 1:*    ');
        shippingLine2 = prompt('Line 2:    ');
        shippingTown = prompt('Town:*    ');
        shippingCounty = prompt('County:*    ');
        shippingEircode = prompt('Eircode:   ');
    } else {
        shippingLine1 = line1;
        shippingLine2 = line2;
        shippingTown = town;
        shippingCounty = county;
        shippingEircode = eircode;
    }
    //connect to database
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //declare object to pass into database
        var myobj = {
            title: title,
            forename: forename,
            surname: surname,
            mobile: mobileNumber,
            email: email,
            homeLine1: line1,
            homeLine2: line2,
            homeTown: town,
            homeCounty: county,
            homeCode: eircode,
            shippingLine1: shippingLine1,
            shippingLine2: shippingLine2,
            shippingTown: shippingTown,
            shippingCounty: shippingCounty,
            shippingCode: shippingEircode
        };
        //pass object into database
        dbo.collection("customers").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("Customer created!");
            db.close();
        });
    });
}

function searchCustomer() {
    //connect to database
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //convert collection to array and use math.random to chose random entry
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;
            var index = Math.floor(Math.random() * result.length);
            console.log(result[index]);
            db.close();
        });
    });
}

function updateCustomer() {
    let index;

    let homeLine1;
    let homeLine2;
    let homeTown;
    let homeCounty;
    let homeCode;

    let shippingLine1;
    let shippingLine2;
    let shippingTown;
    let shippingCounty;
    let shippingCode;

    //connect to database
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        
        //convert collection to array and use math.random to chose random entry
        //get original values of collection so no data is incorrectly overwritten
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;

            //find index of user to be updated 
            index = Math.floor(Math.random() * result.length);

            homeLine1 = result[index].homeLine1;
            homeLine2 = result[index].homeLine2;
            homeTown = result[index].homeTown;
            homeCounty = result[index].homeCounty;
            homeCode = result[index].homeCode;

            shippingLine1 = result[index].shippingLine1;
            shippingLine2 = result[index].shippingLine2;
            shippingTown = result[index].shippingTown;
            shippingCounty = result[index].shippingCounty;
            shippingCode = result[index].shippingCode;

            db.close();
        });
    });

    //prompt user for data to be updated

    const phone = prompt("Enter new Phone Number:     ");
    const email = prompt("Enter new Email Address:       ");
    const title = prompt("Enter new Title:     ");


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;

            const address = prompt("Would you like to update home address? Y/N     ");
            if (address == "Y" || address == "y") {
                console.log("Inputs marked with '*' are required \n");
                const line1 = prompt("Would you like to update line 1? Y/N     ");
                if (line1 == "Y" || line1 == "y") homeLine1 = prompt('Line 1:*    ');

                const line2 = prompt("Would you like to update line 2? Y/N     ");
                if (line2 == "Y" || line2 == "y") homeLine2 = prompt('Line 2:    ');

                const town = prompt("Would you like to update town? Y/N     ");
                if (town == "Y" || town == "y") homeTown = prompt('Town:*    ');

                const county = prompt("Would you like to update County? Y/N     ");
                if (county == "Y" || county == "y") homeCounty = prompt('County:*    ');

                const eircode = prompt("Would you like to update Eircode? Y/N     ");
                if (eircode == "Y" || eircode == "y") homeCode = prompt('Eircode:   ');
            }


            const shippingAddress = prompt("Would you like to update shipping address? Y/N     ");
            if (shippingAddress == "Y" || shippingAddress == "y") {
                console.log("Inputs marked with '*' are required \n");
                const line1 = prompt("Would you like to update line 1? Y/N     ");
                if (line1 == "Y" || line1 == "y") shippingLine1 = prompt('Line 1:*    ');

                const line2 = prompt("Would you like to update line 2? Y/N     ");
                if (line2 == "Y" || line2 == "y") shippingLine2 = prompt('Line 2:    ');

                const town = prompt("Would you like to update town? Y/N     ");
                if (town == "Y" || town == "y") shippingTown = prompt('Town:*    ');

                const county = prompt("Would you like to update County? Y/N     ");
                if (county == "Y" || county == "y") shippingCounty = prompt('County:*    ');

                const eircode = prompt("Would you like to update Eircode? Y/N     ");
                if (eircode == "Y" || eircode == "y") shippingCode = prompt('Eircode:    ');

            }

            let newValues = {
                $set: {
                    mobile: phone,
                    email: email,
                    title: title,
                    homeLine1: homeLine1,
                    homeLine2: homeLine2,
                    homeTown: homeTown,
                    homeCounty: homeCounty,
                    homeCode: homeCode,
                    shippingLine1: shippingLine1,
                    shippingLine2: shippingLine2,
                    shippingTown: shippingTown,
                    shippingCounty: shippingCounty,
                    shippingCode: shippingCode
                }
            };

            //update users using same index as before
            dbo.collection("customers").updateOne(result[index], newValues, function (err, res) {
                if (err) throw err;
                console.log("Customer updated!");
            })
            db.close();
        });
    });
}


function deleteCustomer() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        //prompt user for data
        let email = prompt("Enter email of person you want to delete:   ");
        let name = prompt("Enter surname of person you want to delete:    ");
        let phone = prompt("Enter number of person you want to delete:   ");

        var query = {
            email: email,
            surname: name,
            mobile: phone
        };
        //delete user based on input data
        dbo.collection("customers").deleteOne(query, function (err, obj) {
            if (err) throw err;
            console.log("Customer deleted!");
            db.close();
        });
    });
}

function createPhone() {
    //prompt user for input data
    console.log("Inputs marked with '*' are required \n");
    const man = prompt('Manufacturer:*         ');
    const model = prompt('Model:*         ');
    const price = prompt('Price:*         ');

    //connect to database
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        //declare object to be passed into collection
        var myobj = {
            manufacturer: man,
            model: model,
            price: price
        };
        //pass object into collection to create new phone
        dbo.collection("items").insertOne(myobj, function (err, result) {
            if (err) throw err;
            console.log("Phone created!");
            db.close();
        });
    });
}

function searchPhone() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //convert collection to array and use math.random to chose random entry
        dbo.collection("items").find({}).toArray(function (err, result) {
            if (err) throw err;
            var index = Math.floor(Math.random() * result.length);
            console.log(result[index]);
            db.close();
        });
    });
}

function updatePhone() {
    //prompt user for data to be passed in
    const man = prompt("Enter new manufacturer:       ");
    const model = prompt("Enter new model:       ");
    const price = prompt("Enter new price:       ");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //convert collection to array and use math.random to find random entry
        dbo.collection("items").find({}).toArray(function (err, result) {
            if (err) throw err;

            var index = Math.floor(Math.random() * result.length);
            //declare object to be passed in 
            var newValues = {
                $set: {
                    manufacturer: man,
                    model: model,
                    price: price
                }
            };
            //pass in object to update entry
            dbo.collection("items").updateOne(result[index], newValues, function (err, res) {
                if (err) throw err;
                console.log("Phone updated!");
                db.close();
            })
        });
    });
}

function deletePhone() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //prompt user for data
        let man = prompt("Enter manufacturer of phone you want to delete:    ");
        let model = prompt("Enter model of phone you want to delete:    ");

        var query = {
            manufacturer: man,
            model: model
        };
        //delete entry based on input data
        dbo.collection("items").deleteOne(query, function (err, obj) {
            if (err) throw err;
            console.log("Phone deleted!");
            db.close();
        });
    });
}

function createOrder() {
    //prompt user for input data
    console.log("Inputs marked with '*' are required \n");
    const forename = prompt("Enter forename of customer:       ");
    const surname = prompt("Enter surname of customer:*       ");
    const man = prompt("Enter Manufacturer of phone purchased:*        ");
    const model = prompt("Enter model of phone purchased:*       ");

    //connect to database
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //declare object to be passed into collection
        var myobj = {
            custForename: forename,
            custSurname: surname,
            phoneManufacturer: man,
            phoneModel: model
        };

        //pass object into collection to create new order
        dbo.collection("orders").insertOne(myobj, function (err, result) {
            if (err) throw err;
            console.log("Order created!");
            db.close();
        });
    });
}

function searchOrder() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");


        //convert collection to array and use math.random to chose random entry
        dbo.collection("orders").find({}).toArray(function (err, result) {
            if (err) throw err;
            var index = Math.floor(Math.random() * result.length);
            console.log(result[index]);
            db.close();
        });
    });
}

function updateOrder() {
    //prompt user for data to be passed in
    const man = prompt("Enter new manufacturer:       ");
    const model = prompt("Enter new model:       ");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //convert collection to array and use math.random to find random entry
        dbo.collection("orders").find({}).toArray(function (err, result) {
            if (err) throw err;

            //declare object to be passed in
            var index = Math.floor(Math.random() * result.length);
            var newValues = {
                $set: {
                    phoneManufacturer: man,
                    phoneModel: model
                }
            };

            //pass in object to update entry
            dbo.collection("orders").updateOne(result[index], newValues, function (err, res) {
                if (err) throw err;
                console.log("Order updated!");
                db.close();
            });
        });
    });
}

function deleteOrder() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        //prompt user for data
        let man = prompt("Enter manufacturer of phone of order you want to delete:    ");
        let model = prompt("Enter model of phone of order you want to delete:    ");

        var query = {
            phoneManufacturer: man,
            phoneModel: model
        };
        
        //delete entry based on input data
        dbo.collection("orders").deleteOne(query, function (err, obj) {
            if (err) throw err;
            console.log("Order deleted!");
            db.close();
        });
    });
}

mainMenu();







