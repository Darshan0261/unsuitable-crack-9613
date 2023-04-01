
var currentDate = new Date();
//   console.log(currentDate)
var dateString = currentDate.toDateString();
document.getElementById("currentDate").innerText = dateString;

let bag = [];

async function dashboard() {

    let res;
    try {
        res = await fetch(`http://localhost:4500/appointment/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFyc2hhbiIsInJvbGUiOiJ1c2VyIiwiaWQiOiI2NDI2NzZmNzhiYjllOGVlZWIyMDU5NTYiLCJpYXQiOjE2ODAyNDU4Njl9.1w-M8Z3MP1YXfR2PA9w4xi7oj5AiE99XLSSPTyafRBs"
            }
        });
    } catch (error) {
        console.log(error);
    }
    let out = await res.json();
    bag = out;
    // console.log(out);
    display1(out);
}


dashboard();


let tablebody = document.querySelector("#tbody");


function display1(out) {
    tablebody.innerHTML = "";
    out.forEach((ele) => {
        let row = document.createElement("tr");

        let studioId = document.createElement("td");
        studioId.innerText = ele.studio_id;

        let startTime = document.createElement("td");
        startTime.innerText = ele.start_time;

        let endTime = document.createElement("td");
        endTime.innerText = ele.end_time;

        let date = document.createElement("td");
        date.innerText = ele.date;

        let status = document.createElement("td");
        status.innerText = ele.status;


        let bill = document.createElement("td");
        bill.innerText = ele.bill;

        let button = document.createElement("button");
        button.className = "cancelbtn"
        button.innerText = "Cancel";
        button.addEventListener("click", () => {
            status.innerText = "Cancelled";
            updatestatus(status.innerText, ele.user_id, ele._id);
            // console.log(status.innerText);
        })

        row.append(studioId, startTime, endTime, date, status, bill, button);

        tablebody.append(row);
    })

    async function updatestatus(data, data1, apid) {
        // console.log(data, data1, apid)
        // let dat1=JSON.parse(data1)

        try {
            const res = await fetch(`http://localhost:4500/appointment/reject/${apid}`, {
                body: JSON.stringify({ status: data }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFyc2hhbiIsInJvbGUiOiJ1c2VyIiwiaWQiOiI2NDI2NzZmNzhiYjllOGVlZWIyMDU5NTYiLCJpYXQiOjE2ODAyNDU4Njl9.1w-M8Z3MP1YXfR2PA9w4xi7oj5AiE99XLSSPTyafRBs",
                },
                method: "PATCH"
            });


            let out = await res.json();
            console.log(out);
            dashboard();

        } catch (error) {
            console.log(error);
        }


    }
}





let select = document.querySelector("#filter");
// console.log(select);
select.addEventListener("change", () => {

    let value = select.value;
    console.log(value);
    // console.log(bag);
    let filterdata = bag.filter(function (ele) {
        return ele.status == value
    })
    // console.log(filterdata);
    display1(filterdata);
    
    
})







