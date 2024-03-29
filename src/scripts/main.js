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


// -------EDIT EVENT LISTENERS----------------
// Event listener for edit button
document.querySelector("body").addEventListener("click", () => {
    if(event.target.id.includes("edit-student")){
        // Get the id of the thing we want to edit from the button's id attribute
        const wordArray = event.target.id.split("-");
        const idOfThingWeWantToEdit = wordArray[2];

        // Pass that ID into our apiManager to bring back the student we want to edit
        apiManager.getOneStudent(idOfThingWeWantToEdit)
        .then(singleStudent => {
            domPrinter.printStudentEditForm(singleStudent)
        })
    }
})


// Event listener for save button
document.querySelector("body").addEventListener("click", () => {
    if(event.target.id.includes("save-edit")){
        // get the id of the thing we want to edit
        const wordArray = event.target.id.split("-");
        const idOfThingWeWantToEdit = wordArray[2];
        console.log(idOfThingWeWantToEdit);

        // get the value of the input
        const editedInputValue = document.querySelector(`#edit-input-${idOfThingWeWantToEdit}`).value

        // put the input value into an object
        const editedStudentObj = {
            name:editedInputValue
        }
        console.log("this is what we're going to send to the db", editedInputValue)
        // send to database w/PUT method
        apiManager.editOneStudent(idOfThingWeWantToEdit, editedStudentObj)
        .then(() => {
            apiManager.getAllStudents()
            .then(allStudents => {
                domPrinter.printStudentsToDOM(allStudents)
            })
        })
        // once the PUT is complete, get all studetns from the db and when the come back, print to dom. 
        // you have to do ".then" in between these, or it does not have time to bring them back from database.
    }
    

})




















