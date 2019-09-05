const apiManager = {
    // method to get all students
    getAllStudents: () => {
        return fetch("http://localhost:8088/students").then(response =>
            response.json()
        );
    },
    // method to post one student
    postOneStudent: singleStudentObject =>
        fetch("http://localhost:8088/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(singleStudentObject)
        }),
    // method to delete one student
    deleteOneStudent: (id) =>
        fetch(`http://localhost:8088/students/${id}`, {
            method: "DELETE"
        })

};




export default apiManager;