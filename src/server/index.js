/*--------------------------------------------------------
Server code for Evaluate News NLP. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 02/06/20
last modified: 11/06/20
Updates:
02/06/20    File Creation
02/06/20    Configuration Server
02/06/20    Set API
11/05/20    Correction after review
author: E. RONDON
----------------------------------------------------------*/
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
let aylien = require("aylien_textapi");
const dotenv = require('dotenv');

const port = 8000;
let appClassifyCacheData = {};
let appSentimentCacheData = {};
let internalServerError = {
  code: 500,
  message: 'Internal Server Error'
}

// Start up an instance of app
const app = express();

//Configuration of express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Configuration of express to use  Cors for cross origin allowance
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
const server = app.listen(port,listening);

//configuration environement variables
dotenv.config();

// set aylien API credentias
let textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});



/**
 * @description Function working as the callback of the listen function used to create the server
 * @since      0.0.1
 * @access     private
*/
function listening(){
    console.log(`server running in localhost:${port}`);
}

//Configuration of GET route
app.get('/classifyevaluatenews',getClassifyRouteCallback)
app.get('/sentimentevaluatenews',getSentimentRouteCallback)

/**
 * @description Function working as the callback of the get route for Classify Evaluation with ALYEN TEXTAPI
 * @since   0.0.1
 * @access  private
 * @param   {Request}   request
 * @param   {Response}  response
 * @returns {Response}  response containing weather 
*/
function getClassifyRouteCallback(request, response) {

    if (appClassifyCacheData.hasOwnProperty(request.query.url)) {
      response.send(appClassifyCacheData[request.query.url]);
    }else{
      textapi.classify({
        'url': request.query.url, //'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile'
        'language': 'en'
      }, function(error, res) {
        if (error) {
          res.status(500).send(internalServerError);
        }else{
          appClassifyCacheData[request.query.url] = res;
          response.send(res);
        }
      });
    }
}

/**
 * @description Function working as the callback of the get route for Sentiment Evaluation with ALYEN TEXTAPI
 * @since   0.0.1
 * @access  private
 * @param   {Request}   request
 * @param   {Response}  response
 * @returns {Response}  response containing weather 
*/
function getSentimentRouteCallback(request, response) {
  if (appSentimentCacheData.hasOwnProperty(request.query.url)) {
    response.send(appSentimentCacheData[request.query.url]);
  }else{
    textapi.sentiment({
      'url': request.query.url, //'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile'
      'language': 'en'
    }, function(error, res) {
      if (error) {
        res.status(500).send(internalServerError);
      }else{
        appSentimentCacheData[request.query.url] = res;
        response.send(res);
      }
    });
  }

}