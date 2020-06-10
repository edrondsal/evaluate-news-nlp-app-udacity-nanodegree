/*--------------------------------------------------------
Unit Test for the View Controller code for the App. UDACITY Project - Front End Developper Nanodegree
version: 0.0.1
created on: 09/06/20
last modified: 09/06/20
Updates:
09/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/

import { EvaluateNewsViewController } from '../js/view-controller.js'

describe("Unit Test for View Controller", () => {
    test("getApiUrl unit test", () => {
      let inputUrl = {};
      inputUrl.value='test.html';
      
      let evaluateNewsViewController = new EvaluateNewsViewController(inputUrl,null,null,null);
      evaluateNewsViewController.typeSearch = 0;
      
      const urlApi = "/classifyevaluatenews?url=test.html";
      expect(evaluateNewsViewController.getApiUrl()).toEqual(urlApi);
    });
});