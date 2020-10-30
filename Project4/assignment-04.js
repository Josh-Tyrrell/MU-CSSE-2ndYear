//Have to install prompt sync for code to work

// I designed the databases by having an initial base Customers with primary key CustomerId
// This was a foreign key in homeAddresses
// homeAddresses had primary key homeAddressesId
// CustomerId was the foreign key in shippingAddresses linked to homeAddressesId
// This way I could easily join tables to carry out CRUD functionality
// To delete customer "on delete cascade" had to be active on both foreign keys


let mysql = require('mysql');

let con = mysql.createConnection({
    host: "remotemysql.com",
    user: "iaDAxoTkiq",
    password: "STtocO7pic",
    database: "iaDAxoTkiq"
});


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


const prompt = require('prompt-sync')();


function mainMenu() {
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
}

// Create customer by taking input and using input in an SQL insert query
function createCustomer() {
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

    // Connect to DB
    con.connect((err) => {
        if (err) throw err;
        let sql = `INSERT INTO Customers (Title, Forename, Surname, MobileNumber, EmailAddress)
          VALUES ('${title}', '${forename}', '${surname}', '${mobileNumber}', '${email}')`;
        let homeSQL = `INSERT INTO HomeAddresses (line1, line2, town, county, eircode, CustomerId)
          VALUES ('${line1}', '${line2}', '${town}', '${county}', '${eircode}', LAST_INSERT_ID())`;
        let shippingSQL = `INSERT INTO ShippingAddresses (ShippingLine1, ShippingLine2, ShippingTown, ShippingCounty, ShippingEircode, CustomerId)
          VALUES ('${shippingLine1}', '${shippingLine2}', '${shippingTown}', '${shippingCounty}', '${shippingEircode}', LAST_INSERT_ID())`;

        // Insert to Customers
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(`Added ${forename} to Customers!`);
        });
        // Insert to HomeAddresses
        con.query(homeSQL, (err, result) => {
            if (err) throw err;
            console.log(`Added ${forename} to HomeAdresses!`);
        });
        // Insert to ShippingAddresses
        con.query(shippingSQL, (err, result) => {
            if (err) throw err;
            console.log(`Added ${forename} to ShippingAddresses!`);
        });
    });
}


function searchCustomer() {
    con.connect((err) => {
        if (err) throw err;
        //Join tables using foreign keys so correct data is taken
        let sql = `SELECT * FROM Customers 
            JOIN HomeAddresses ON Customers.CustomerId = HomeAddresses.CustomerId 
            JOIN ShippingAddresses ON HomeAddresses.HomeAddressId = ShippingAddresses.CustomerId
            ORDER BY RAND()
            LIMIT 1`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            for (let [key, value] of Object.entries(result[0])) {
                console.log(`${key}:  =======>  ${value}`);
            }
        });
    });
}


function updateCustomer() {
    let homeAddresses = [];
    let shippingAddresses = [];

    const phone = prompt("Enter new Phone Number:     ");

    const email = prompt("Enter new Email Address:       ");

    const title = prompt("Enter new Title:     ");


    //Use prompts to collect data from user, push into 2d array
    const address = prompt("Would you like to update home address? Y/N     ");
    if (address == "Y" || address == "y") {
        console.log("Inputs marked with '*' are required \n");
        const line1 = prompt("Would you like to update line 1? Y/N     ");
        if (line1 == "Y" || line1 == "y") homeAddresses.push(["line1", prompt('Line 1:*    ')]);

        const line2 = prompt("Would you like to update line 2? Y/N     ");
        if (line2 == "Y" || line2 == "y") homeAddresses.push(["line2", prompt('Line 2:    ')]);

        const town = prompt("Would you like to update town? Y/N     ");
        if (town == "Y" || town == "y") homeAddresses.push(["town", prompt('Town:*    ')]);

        const county = prompt("Would you like to update County? Y/N     ");
        if (county == "Y" || county == "y") homeAddresses.push(["county", prompt('County:*    ')]);

        const eircode = prompt("Would you like to update Eircode? Y/N     ");
        if (eircode == "Y" || eircode == "y") homeAddresses.push(["eircode", prompt('Eircode:    ')]);

    }

    const shippingAddress = prompt("Would you like to update shipping address? Y/N     ");
    if (shippingAddress == "Y" || shippingAddress == "y") {
        console.log("Inputs marked with '*' are required \n");
        const line1 = prompt("Would you like to update line 1? Y/N     ");
        if (line1 == "Y" || line1 == "y") shippingAddresses.push(["ShippingLine1", prompt('Line 1:*    ')]);

        const line2 = prompt("Would you like to update line 2? Y/N     ");
        if (line2 == "Y" || line2 == "y") shippingAddresses.push(["ShippingLine2", prompt('Line 2:    ')]);

        const town = prompt("Would you like to update town? Y/N     ");
        if (town == "Y" || town == "y") shippingAddresses.push(["ShippingTown", prompt('Town:*    ')]);

        const county = prompt("Would you like to update County? Y/N     ");
        if (county == "Y" || county == "y") shippingAddress.push(["ShippingCounty", prompt('County:*      ')]);

        const eircode = prompt("Would you like to update Eircode? Y/N     ");
        if (eircode == "Y" || eircode == "y") shippingAddress.push(["ShippingEircode", prompt('Eircode:       ')]);

    }

    //connect to database to find customer to update
    con.connect((err) => {
        let customerId, customerName;
        if (err) throw err;
        let randomSQL = "SELECT * FROM Customers ORDER BY RAND() LIMIT 1";
        con.query(randomSQL, (err, result) => {
            if (err) throw err;
            customerId = result[0].CustomerId;
            customerName = result[0].Forename;
            console.log(`You are updating ${customerName}...`);
            console.table(result);

            let updateSQL = `UPDATE Customers SET Title = '${title}', MobileNumber = '${phone}', EmailAddress = '${email}' WHERE CustomerId = ${customerId}`;
            con.query(updateSQL, (err, result) => {
                if (err) throw err;
                console.log(`${customerName} has been updated!`);
                let updateAddressSQL = "UPDATE HomeAddresses SET ";
                let updateShippingSQL = "UPDATE ShippingAddresses SET ";
                //check if anything pushed into home address array
                //if yes, loop through and update database
                if (homeAddresses.length > 0) {
                    for (let i = 0; i < homeAddresses.length; i++) {
                        updateAddressSQL += `${homeAddresses[i][0]} = '${homeAddresses[i][1]}'${!homeAddresses[i+1] ? ' ' : ', '}`;
                    }
                    updateAddressSQL += `WHERE CustomerId = ${customerId}`;
                    con.query(updateAddressSQL, (err, result) => {
                        if (err) throw err;
                        console.log("Updated Home Address!");
                    });
                }
                //check if anything pushed into shipping address array
                //if yes, loop through and update database
                if (shippingAddresses.length > 0) {
                    for (let i = 0; i < shippingAddresses.length; i++) {
                        updateShippingSQL += `${shippingAddresses[i][0]} = '${shippingAddresses[i][1]}'${!shippingAddresses[i+1] ? ' ' : ', '}`;
                    }
                    updateShippingSQL += `WHERE CustomerId = ${customerId > 10 ? customerId + 3 : customerId}`;
                    con.query(updateShippingSQL, (err, result) => {
                        if (err) throw err;
                        console.log("Updated Shipping Address!");
                    });
                }
                let showResult = `SELECT * FROM Customers
                    JOIN HomeAddresses ON Customers.CustomerId = HomeAddresses.CustomerId
                    JOIN ShippingAddresses ON HomeAddresses.HomeAddressId = ShippingAddresses.CustomerId
                    WHERE HomeAddresses.CustomerId = ${customerId}`
                con.query(showResult, (err, result) => {
                    if (err) throw err;
                    console.log(result[0]);
                });
            });
        });
    });
}


function deleteCustomer() {
    con.connect((err) => {
        //prompt user for data
        let email = prompt("Enter email of person you want to delete:   ");
        let name = prompt("Enter surname of person you want to delete:    ");
        let phone = prompt("Enter number of person you want to delete:   ");
        //delete user with corresponding data
        let sql = `DELETE FROM Customers WHERE Surname = '${name}' AND MobileNumber = '${phone}' AND EmailAddress = '${email}'`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(`${name}, has been deleted.`);
        });
    });
}


mainMenu();