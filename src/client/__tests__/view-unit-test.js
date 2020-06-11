/*--------------------------------------------------------
Unit Test for View  code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 10/06/20
last modified: 10/06/20
Updates:
09/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/
import { ViewApp } from '../js/view.js'

describe("Unit Test for View", () => {
    test("Test for the view controller initialization", () => {
      let view = new ViewApp();

      expect(view.appViewController).toEqual(undefined);
    });
});