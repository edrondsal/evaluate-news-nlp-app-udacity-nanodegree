/*--------------------------------------------------------
View Controller code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 07/06/20
last modified: 07/06/20
Updates:
07/06/20    File Creation
07/06/20    View Controller Constructor
author: E. RONDON
----------------------------------------------------------*/

import { getData } from './model.js'

/**
 * Global Variables
 * 
*/
const EVALUATE_CLASSIFY=0;
const EVALUATE_SENTIMENT=1;
const serverEndPointClassify = '/classifyevaluatenews';
const serverEndPointSentiment = '/sentimentevaluatenews';

/**
 * End Global Variables
 * Start View Controller
 * 
*/

/**
* @description Constructor of the view controller
*/
function EvaluateNewsViewController(urlInput,classifyMenu,sentimentMenu,resultContainer){

    let self = this;

    this.typeSearch = EVALUATE_CLASSIFY;
    this.inputURL = urlInput;
    this.menuClassify = classifyMenu;
    this.menuSentiment = sentimentMenu;
    this.containerResult = resultContainer;

    /**
    * @description Function called when click in the menu
    * @param {Event} event - The event associated with the event listener
    */
    this.menuEventClickCallback = function(event) {
        event.preventDefault()
        const targetId = event.target.id;
        if(targetId == self.menuClassify.id){
            self.typeSearch = EVALUATE_CLASSIFY;
            self.menuClassify.classList.remove('navbar-item-style');
            self.menuSentiment.classList.remove('navbar-item-style-active');
            self.menuClassify.classList.add('navbar-item-style-active');
            self.menuSentiment.classList.add('navbar-item-style');
        }else if(targetId == self.menuSentiment.id){
           self.typeSearch = EVALUATE_SENTIMENT;
           self.menuSentiment.classList.remove('navbar-item-style');
           self.menuClassify.classList.remove('navbar-item-style-active');
           self.menuClassify.classList.add('navbar-item-style');
           self.menuSentiment.classList.add('navbar-item-style-active');
        }
        self.containerResult.innerHTML = '';
    };
    /**
    * @description Function called when click in the button
    * @param {Event} event - The event associated with the event listener
    */
    this.buttonEventClickCallback = function(event){
        getData(self.getApiUrl()).then(response=>{
            if (self.typeSearch == EVALUATE_CLASSIFY){
                self.updateWithClassification(response);
            }else{
               self.updateWithSentiment(response);
            }           
        });
    };
    this.getApiUrl = function(){
        if(self.typeSearch==EVALUATE_CLASSIFY){
            return serverEndPointClassify+'?url='+self.inputURL.value;
        }else{
            return serverEndPointSentiment+'?url='+self.inputURL.value;
        }
    };
    /**
    * @description Function called when need to update the UI with the classify request
    * @param {Event} result - The result object comming from the server
    */
   this.updateWithClassification = function(result){
        self.containerResult.innerHTML = '';

        const fragment = document.createDocumentFragment();
        const titleClassify = document.createElement('h2');
        titleClassify.classList.toggle('result-title');
        titleClassify.innerHTML = "Classification";

        const confidenceElement = document.createElement('p');
        confidenceElement.classList.toggle('result-paragraph');
        confidenceElement.innerHTML = `<b>Confidence:</b><i>&nbsp${result.categories[0].confidence}</i>`;
        
        const labelElement = document.createElement('p');
        labelElement.classList.toggle('result-paragraph');
        labelElement.innerHTML = `<b>Label:</b><i>&nbsp${result.categories[0].label}</i>`;

        const titleText = document.createElement('h2');
        titleText.classList.toggle('result-title');
        titleText.innerHTML= "Text";
        const textElement = document.createElement('p');
        textElement.classList.toggle('result-paragraph');
        textElement.innerHTML = result.text;

        fragment.appendChild(titleClassify);
        fragment.appendChild(confidenceElement);
        fragment.appendChild(labelElement);
        fragment.appendChild(titleText);
        fragment.appendChild(textElement);
        self.containerResult.appendChild(fragment);
   }
   /**
    * @description Function called when need to update the UI with the sentiment request
    * @param {Event} result - The result object comming from the server
    */
   this.updateWithSentiment = function(result){
    self.containerResult.innerHTML = '';    
    

    const fragment = document.createDocumentFragment();
    const titleClassify = document.createElement('h2');
    titleClassify.classList.toggle('result-title');
    titleClassify.innerHTML = "Sentiment";

   
    const polarityElement = document.createElement('p');
    polarityElement.classList.toggle('result-paragraph');
    polarityElement.innerHTML = `<b>Polarity:</b><i>&nbsp${result.polarity}</i>`;
    
    const polarityConfidenceElement = document.createElement('p');
    polarityConfidenceElement.classList.toggle('result-paragraph');
    polarityConfidenceElement.innerHTML = `<b>Polarity Confidence:</b><i>&nbsp${result.polarity_confidence}</i>`;

    const subjectivityElement = document.createElement('p');
    subjectivityElement.classList.toggle('result-paragraph');
    subjectivityElement.innerHTML = `<b>Subjectivity:</b><i>&nbsp${result.subjectivity}</i>`;

    const subjectiveConfidenceElement = document.createElement('p');
    subjectiveConfidenceElement.classList.toggle('result-paragraph');
    subjectiveConfidenceElement.innerHTML = `<b>Subjectivity Confidence:</b><i>&nbsp${result.subjectivity_confidence}</i>`;

    const titleText = document.createElement('h2');
    titleText.classList.toggle('result-title');
    titleText.innerHTML= "Text";
    const textElement = document.createElement('p');
    textElement.classList.toggle('result-paragraph');
    textElement.innerHTML = result.text;

    fragment.appendChild(titleClassify);
    fragment.appendChild(polarityElement);
    fragment.appendChild(polarityConfidenceElement);
    fragment.appendChild(subjectivityElement);
    fragment.appendChild(subjectiveConfidenceElement);
    fragment.appendChild(titleText);
    fragment.appendChild(textElement);
    self.containerResult.appendChild(fragment);
    }

}


export { EvaluateNewsViewController }
