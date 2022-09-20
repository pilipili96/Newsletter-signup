const express = require("express");
const https = require("https");
const request = require("request")
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/signup.html")
});


app.post("/", function(req,res){
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/b378b2e8b2";
    const options = {
        method: "POST",
        auth: "pavel1:287110c0c58a92310a6a23f3f164b271-us17"
    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            if(response.statusCode===200){
                res.sendFile(__dirname + "/success.html")
                }else {
                res.sendFile(__dirname + "/failure.html")
            }
            })
        })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/")
});

app.listen(port || 3000, () => 
console.log("Server is running on port " + port));



