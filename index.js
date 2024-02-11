const express = require("express");
const path = require("path");
const NewsAPI = require('newsapi');
var cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config()
const app = express();
const newsapi = new NewsAPI(process.env.NEWS_API);

// app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

let articles = "";

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "NewsMonkey-React-master", "build")));
  res.sendFile(path.resolve(__dirname, "NewsMonkey-React-master", "build", "index.html"));
});


app.get("/technology", async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({ category: 'technology', language: 'en', country:"in" });
    if(response){
        res.send(response)
    }
    // const data = response.articles;
    // articles = data;
    // res.render("index", { articles });
  } catch (error) {
    console.log(error);
    // res.render("index", { articles });
  }
});

app.get("/", async (req, res) => {
  res.redirect('science')
});


app.get("/business", async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({ category: 'business', language: 'en' ,country:"in"  });
    if(response){
        res.send(response)
    }
    // const data = response.articles;
    // articles = data;
    // res.render("index", { articles });
  } catch (error) {
    console.log(error);
    // res.render("index", { articles });
  }
});

app.get("/general", async (req, res) => {
    try {
      const response = await newsapi.v2.topHeadlines({ category: 'general', language: 'en' ,country:"in"});
      if(response){
          res.send(response)
      }
      // const data = response.articles;
      // articles = data;
      // res.render("index", { articles });
    } catch (error) {
      console.log(error);
      // res.render("index", { articles });
    }
  });
  app.get("/health", async (req, res) => {
    try {
      const response = await newsapi.v2.topHeadlines({ category: 'health', language: 'en' ,country:"in" });
      if(response){
          res.send(response)
      }
      // const data = response.articles;
      // articles = data;
      // res.render("index", { articles });
    } catch (error) {
      console.log(error);
      // res.render("index", { articles });
    }
  });

app.get("/entertainment", async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({ category: 'entertainment', language: 'en' ,country:"in"});
    if(response){
        res.send(response)
    }
    // const data = response.articles;
    // articles = data;
    // res.render("index", { articles });
  } catch (error) {
    console.log(error);
    // res.render("index", { articles });
  }
});

app.get("/science", async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({ category: 'science', language: 'en',country:"in" });
    if(response){
        res.send(response)
    }
    // const data = response.articles;
    // articles = data;
    // res.render("index", { articles });
  } catch (error) {
    console.log(error);
    // res.render("index", { articles });
  }
});

app.get("/sports", async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({ category: 'sports', language: 'en' ,country:"in"});
    if(response){
        res.send(response)
    }
    // const data = response.articles;
    // articles = data;
    // res.render("index", { articles });
  } catch (error) {
    console.log(error);
    // res.render("index", { articles });
  }
});

// app.post("/submit", (req, res) => {
//   const category = req.body.button;
//   res.redirect(`/${category}`);
// });

app.listen(8080, () => {
  console.log("Server started on port 8080");
});