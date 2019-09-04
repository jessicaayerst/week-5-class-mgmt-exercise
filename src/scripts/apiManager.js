// Function that accepts an array of student objects and prints them to the DOM
const printStudentsToDOM = (arrayOfStudentsParam) => {
    // Grab a reference to the output container
    document.querySelector("#student-output-container").innerHTML = ""
    // Loop through the array of students
    arrayOfStudentsParam.forEach(singleStudent => {
        // For each student, print a p tag with their name to the DOM
        document.querySelector("#student-output-container").innerHTML += `<p>${singleStudent.name}</p>`
    })
}


// When the page loads, fetch all the students from your json-server API
fetch("http://localhost:8088/students")
.then(response => response.json())
.then(parsedStudents => {
    // When the response comes back, send them into the printToDOM function
    printStudentsToDOM(parsedStudents)
})




document.querySelector("#student-name-button").addEventListener("click", function(){
    const studentInputValue = document.querySelector("#student-name-input").value

    const studentObjectToSave = {
        name:studentInputValue
    }

    fetch("http://localhost:8088/students", { 
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(studentObjectToSave)
}).then(() => { 
    fetch("http://localhost:8088/students")
    .then(response => response.json())
    .then(parsedStudents => {
        // You have to run the fetch again so that it prints all the original ones to the DOM again plus the new one. When the response comes back, send them into the printToDOM function
        printStudentsToDOM(parsedStudents)
    })
    

})

    })

