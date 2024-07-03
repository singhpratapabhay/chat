const express = require("express"); // web framework for  Node.js
const routes = require("./routes/index");
const morgan = require("morgan"); //http req logger middleware for node.js it will log what is receieved in req and what we send 
const rateLimit = require("express-rate-limit"); //this is used to limit the no of request in an hour from particular ip more than that no of request it will block the request.
const helmet = require("helmet"); //Helmet helps secure Express apps by setting HTTP response headers.
const mongoSanitize = require("express-mongo-sanitize")  //Object keys starting with a $ or containing a . are reserved for use by MongoDB as operators. Without this sanitization, malicious users could send an object containing a $ operator, or including a ., which could change the context of a database operation. Most notorious is the $ where operator, which can execute arbitrary JavaScript on the database.

const bodyParser = require("body-parser") // body-parser is a tool for Node.js that helps read data sent to a server.
const xss = require("xss") // this is used to sanitize untrusted HTML 

const cors = require("cors");
const app = express();
app.use(express.urlencoded({
    extended: true,
}));

app.use(mongoSanitize())
// app.use(xss())

app.use(cors({
    origin:"*", //this will allow all the origins to send request
    methods: ["GET", "PATCH", "POST","DELETE", "PUT"],
    credentials: true,
}))

//middleware all request is pass throw the middleware there can be multiple middleware
app.use(express.json({limit: "10kb"})); //this will limit the data received to 10kb
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    max: 3000,
    windowMs: 60*60*1000, //window miliseconds so 60*60*1000 is one hour
    message: "Too many request from this IP, please try again in one hour"
})

app.use("/tawk", limiter);
app.use("/api",routes)

module.exports =app;