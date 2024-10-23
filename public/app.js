window.addEventListener('load', () => {
    document.getElementById('button-question').addEventListener('click', () => {
        let no_Answer = document.getElementById('number-question').value;
        console.log(no_Answer);

        //creating the object
        let obj = { "answer": no_Answer };

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route knowthings
        fetch('/knowthings', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            //sending stringify data in body
            body: jsonData
        })

            .then(response => response.json())
            .then(data => { console.log(data) })

    });

    document.getElementById('get-tracker').addEventListener('click', () => {
        //get info on all answers
        fetch('/getAnswers')
            .then(response => response.json())
            .then(data => {
                document.getElementById('answer-info').innerHTML = ''
                for (let i = 0; i < data.data.length; i++) {
                    let string = data.data[i].date + ": " + data.data[i].answer;
                    let element = document.createElement('p');
                    element.innerHTML = string;
                    document.getElementById('answer-info').appendChild(element);
                }
            })
    });
})