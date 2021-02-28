const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const User = require("./models/userdonation");
const mongoose = require("mongoose");
const { response } = require("express");
const Donation = mongoose.model("User");

const app = express();
const port = process.env.PORT || 3000;

// setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jqery/dist")));

app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticpath))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

// routing

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/donation_form", (req, res) => {
    res.render("donation_form");
})

app.post("/", function(req, res) {
    let Now = new Donation()
    let request = https.request({
        protocol: 'https:',
        port: 3000,
        hostname: 'api-et.hellocash.net',
        path: '/invoices',
        method: 'POST',
        json: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmluY2lwYWwiOiIxMzcxNDk0Iiwic3lzdGVtIjoibHVjeSIsImdyb3VwIjoiYnVzaW5lc3MiLCJ1c2VybmFtZSI6IjEzNzE0OTQiLCJjaGFpbiI6WyJwYXNzd29yZCJdLCJpYXQiOjE2MDcwNjIzMDAsImV4cCI6MTYwNzE0ODcwMH0.c51usI2BjCXrt-kC6Nw1BnDHnwiL2AkH8WBIQX6QyEM'
        }
    }, response => {
        let requestBody = [];
        response.on('data', data => {
            requestBody.push(data)
        })
        response.on('end', () => {
            let data = Buffer.concat(requestBody).toString()
            console.log(data)
            res.send(data)
        });
    })

    request.on('error', error => {
        console.error(error)
        res.send(error)
    })
    let data = JSON.stringify({
        "amount": parseInt(req.body.dbirr),
        "description": "Hi " + req.body.name + " You have " + req.body.dbirr + " Birr Payment for " + req.body.name + " donation for GHD.",
        "from": req.body.phone,
        "currency": "ETB",
        "tracenumber": "sh_invoice- " + "" + Now.getHours() + "" + Now.getMinutes() + "" + Now.getSeconds() + "",
        "notifyfrom": true,
        "notifyto": true,
        "expires": "new " + Date(Now.setDate(Now.getDate() + 30)).toISOString()
    });

    request.write(data);

    request.end()


});

function insertData(req, res) {
    var donation = new Donation();
    donation.name = req.body.name;
    donation.email = req.body.email;
    donation.phone = req.body.phone;
    donation.dbirr = req.body.email;
    donation.bank = req.body.name;
    donation.country = req.body.email;
    donation.city = req.body.name;
    donation.address = req.body.email;
    donation.reason = req.body.name;
    donation.date = req.body.date();
    donation.save((err, doc) => {
        if (!err) {
            res.redirect("/");
        } else {
            console.log("Error during insert: " + err);
            res.redirect("/");
        }
    })
}



app.get("/contact", (req, res) => {
    res.render("contact");
})

app.listen(port, () => {
    console.log('server is running at port no ' + port);
})