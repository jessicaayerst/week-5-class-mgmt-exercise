const domPrinter = {
    // method that accepts an array of student objects and prints them to the DOm
    printStudentsToDOM: arrayOfStudentsParam => {
        // Grab a reference to the output container
        document.querySelector("#student-output-container").innerHTML = ""
        // Loop through the array of students
        arrayOfStudentsParam.forEach(singleStudent => {
            // For each student, print a p tag with their name to the DOM
            document.querySelector("#student-output-container").innerHTML += `<div class="student-card" id="student-card-${singleStudent.id}">
            <p>${singleStudent.name}</p>
            <button id="delete-student-${singleStudent.id}">Delete</button>
            <button id="edit-student-${singleStudent.id}">Edit</button>
            </div>`;
        });
    },
    printStudentEditForm: (studentObjectToEdit) => {

        const targetCard = document.querySelector(`#student-card-${studentObjectToEdit.id}`)

        targetCard.innerHTML = `<section>
        <input id="edit-input-${studentObjectToEdit.id}" type="text" value="${studentObjectToEdit.name}">
        <button id="save-edit-${studentObjectToEdit.id}">Save</button>
        </section>
        `
    }

};




export default domPrinter;