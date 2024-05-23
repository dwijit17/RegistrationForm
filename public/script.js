document.addEventListener('DOMContentLoaded', () => {
    const regform = document.getElementById("Registrationform");
    const submitbtn = document.getElementById("submit");

    submitbtn.addEventListener('click', (event) => {
        let empty = false
        event.preventDefault(); // Prevent form from submitting
        const formdata = new FormData(regform); // Get form data
        const values = [...formdata.entries()]; // Convert form data to an array of entries
        console.log(values); // Log form data to the console
        for(let i=0;i<values.length;i++){
            if(values[i][1]===''){
                alert('Cannot submit an empty form. please fill all the details')
                empty = true
                break
            }
        }
        console.log(empty)
        if(!empty){
            const jsonobj = {}
            for(let i=0;i<values.length;i++){
                jsonobj[values[i][0]] = values[i][1]
            }
            const jsondata = JSON.stringify(jsonobj)
            console.log(jsondata)

            fetch("http://localhost:3000/submit",{
                method : "POST",
                body: jsondata,
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            })
            .then(response => response.json()) 
            .then((data) => {
                console.log(data)
                if(data.success){
                    window.location.href = '/success.html'
                }
                else{
                    window.location.href = '/failure.html';
                }
            }
            );
        }
    });
});
