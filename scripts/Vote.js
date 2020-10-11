let urls = {
    chains : "http://srikpv.pythonanywhere.com/chain",
    mine : "http://srikpv.pythonanywhere.com/mine",
    votes : "http://srikpv.pythonanywhere.com/votes/new"
};

const proxyurl = "https://cors-anywhere.herokuapp.com/";

let txtFullName = document.querySelector("#txtFullName");
let lblFullName = document.querySelector("#lblFullName");
let lgdCandidate = document.querySelector("#lgdCandidate");
let divMessage = document.querySelector("#divMessage");

document.querySelector("#gridCheck1").addEventListener("click", (e) => document.querySelector("#btnSubmit").disabled = !e.target.checked );

document.querySelector("#frmVote").addEventListener("submit", (e) => {
    let valid = true;
    e.preventDefault();
    if(txtFullName.value == "")
    {
        lblFullName.style.color = "red";
        valid = false;
    }
    
    if(!document.querySelector('input[name="gridRadios"]:checked'))
    {
        lgdCandidate.style.color = "red";
        valid = false;
    }

    if(!valid) 
        return;
    else    
        CastVote();
});

document.querySelector("input[name='gridRadios']").addEventListener("change", () => lgdCandidate.style.color = "#212529" );

txtFullName.addEventListener("change", (e) => {
    if(e.target.value == "")
        lblFullName.style.color = "red";
    else
        lblFullName.style.color = "#212529";
});

let CastVote = () => {
    let promise = fetch(proxyurl + urls["votes"], {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
            voter : txtFullName.value,
            candidate : document.querySelector('input[name="gridRadios"]:checked').value
        })
    })
    .then(response => {
        if(response.ok){
            fetch(proxyurl + urls["mine"])
            .then(res => {
                if(res.ok){
                    divMessage.innerHTML = "Congratulations! Your vote has been casted.";
                    divMessage.style.visibility='visible'
                }
                else{
                    divMessage.style.visibility='visible'
                    divMessage.innerHTML = "Sorry! There was a problem in casting your vote. Please try again.";
                    divMessage.classList.remove("alert-success");
                    divMessage.classList.add("alert-danger");
                }

            }); 
        }
    })
    .catch(err => {
        divMessage.style.visibility='visible'
        divMessage.innerHTML = "Sorry! There was a problem in casting your vote. Please try again.";
        divMessage.classList.remove("alert-success");
        divMessage.classList.add("alert-danger");
    });
}