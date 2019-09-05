import apiManager from "./apiManager.js";
import domPrinter from "./domPrinter.js";



    // When the page loads, fetch all the students from your json-server API
    apiManager.getAllStudents()
        .then(parsedStudents => {
            // When the response comes back, send them into the printToDOM function
            domPrinter.printStudentsToDOM(parsedStudents);
        });

// Make a click event for submit button

// Get a reference to the submit button and add an event listener to it
document.querySelector("#student-name-button").addEventListener("click", function () {
    // Inside the event listener, use doc.querySel to capture what the user types into the input field 
    const studentInputValue = document.querySelector("#student-name-input").value;

    // convert the input to an object that we will send to json server
    const studentObjectToPost = {
        name: studentInputValue
    };

    // POST the student object to the json server
    apiManager.postOneStudent(studentObjectToPost)

        // When the POST is complete, we need to refresh the page, GET all the students, including the new one.
        .then(apiManager.getAllStudents)
        .then(parsedStudents => {
            // When the response comes back, send them into the printToDOM function
            domPrinter.printStudentsToDOM(parsedStudents);
        });
});

    // ----CLICK EVENT FOR DELETE BUTTONS----//
// you have to add an event listener to the body element because the delete buttons are loaded dynamically and do not appear upon page load
document.querySelector("body").addEventListener("click", () => {
    // if the user clicks on the delete button do some stuff
    if(event.target.id.includes("delete-student")) {
        // get the unique ID of the person you want to delete
        // remember that we gave our delete buttons id attributes of delete-student-uniqueId
        const wordArray = event.target.id.split("-");
        const idOfThingWeWantToDelete = wordArray[2];

        // MAke a DELETE request to our json-server
        apiManager.deleteOneStudent(idOfThingWeWantToDelete).then(() => {
            // Once the delete is complete, get all the students -- we need to "refresh" the page (kind of)
            apiManager.getAllStudents()
            .then(parsedStudents => {
                // When the students come back, print them to the DOM again
                domPrinter.printStudentsToDOM(parsedStudents);
            });
        });
    }
});



