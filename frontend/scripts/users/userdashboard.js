
const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));

console.log(token);
console.log(user);



async function dashboard() {

    let res;
    try {
        res = await fetch(`http://localhost:4500/appointment/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        });
    } catch (error) {
        console.log(error);
    }
    let out = await res.json();


    display(out);
    console.log(out);
}


dashboard();






let middle2 = document.querySelector(".middle2");
let middle3 = document.querySelector(".middle3");
let middle4 = document.querySelector(".middle4");


function display(out) {
    let middle1 = document.querySelector(".middle1");
    let totalapponitments = document.createElement("p");
    totalapponitments.className = "value"
    totalapponitments.innerText = out.length;
    middle1.append(totalapponitments);

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    out.forEach((ele) => {
        if (ele.status == "Accepted") {
            count1++
        } else if (ele.status == "Pending") {
            count2++
        } else if (ele.status == "Rejected") {
            count3++;
        }
    })
    // console.log(count1,count2,count3)
    let accepted = document.createElement("p");
    accepted.className = "accepted";
    accepted.innerText = count1;
    middle2.append(accepted);

    let pending = document.createElement("p");
    pending.className = "pending";
    pending.innerText = count2;
    middle3.append(pending);


    let rejected = document.createElement("p");
    rejected.className = "rejected";
    rejected.innerText = count3;
    middle4.append(rejected);

}

let logbtn= document.querySelector("#logout");

logbtn.addEventListener("click",out);

async function out(){
    try {
        let res=await fetch(`http://localhost:4500/users/logout`,{
            
        // body:,
        headers:{
           "Content-Type":"application/json",
           Authorization: token
            },
            method:"POST"
        });


    } catch (error) {
        console.log(error);
    }
}