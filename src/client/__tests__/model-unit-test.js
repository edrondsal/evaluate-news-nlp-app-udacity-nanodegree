/*--------------------------------------------------------
Unit Test for the model code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 10/06/20
last modified: 10/06/20
Updates:
09/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/
import 'regenerator-runtime/runtime'
import { getData } from '../js/model.js'

describe("Unit Test for the Model", () => {
    test("Test for getData function", () => {

      getData('https://jsonplaceholder.typicode.com/posts/1').then(response =>{
          
        const stringJSON = `{
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          }`;
        let jsonRes = JSON.stringify(response);  
        expect(jsonRes).toEqual(stringJSON);
      });
    });
});