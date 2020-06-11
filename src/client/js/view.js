/*--------------------------------------------------------
View code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 07/06/20
last modified: 07/06/20
Updates:
07/06/20    File Creation
07/06/20    View Event to create View Controller
author: E. RONDON
----------------------------------------------------------*/

import { EvaluateNewsViewController } from './view-controller.js'

/**
* @description Constructor of the view 
*/
function ViewApp() {
    let self = this;
    let appViewController; 
    
    /**
    * @description Function called when the document is loaded in order to realize initializations of the app prototype
    * @param {Event} event - The event associated with the event listener
    */
    this.documentLoaded = function(event){
        const inputURL = document.getElementById('url-input');
        const menuClassify = document.getElementById('evaluate-by-classify');
        const menuSentiment = document.getElementById('evaluate-by-sentiment');
        const containerResult = document.getElementById('result-container');

        self.appViewController = new EvaluateNewsViewController(inputURL,menuClassify,menuSentiment,containerResult);
        document.getElementById('navigaton-bar').addEventListener('click',self.appViewController.menuEventClickCallback,true);
        document.getElementById('evaluate-button').addEventListener('click',self.appViewController.buttonEventClickCallback);
    }

    document.addEventListener('DOMContentLoaded', self.documentLoaded);
}

export { ViewApp }