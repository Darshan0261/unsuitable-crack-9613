
const date_filter = document.querySelector('#date-filter');
const status_filter = document.querySelector("#filter");

let bag = [];

const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));

console.log(token);
console.log(user);


async function dashboard() {

    let res;
    try {
        res = await fetch(`https://erin-shiny-lizard.cyclic.app/appointment/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
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
    const tablehead = document.querySelector('#tablehead')
    // if(document.querySelector("#filter").value == "Rejected") {
    //     document.querySelector('rejected-head').style.display = 'none';
    // } 
    out.forEach(async (ele) => {
        let row = document.createElement("tr");

        let res = await fetch(`https://erin-shiny-lizard.cyclic.app/studios/${ele.studio_id}`)

        let studio = await res.json()


        let studioName = document.createElement("td");
        studioName.innerText = studio.name;

        studioName.style.cursor = 'pointer';

        studioName.addEventListener('click', () => {
            localStorage.setItem('individual_id', JSON.stringify(ele.studio_id));
            window.open('../individualpage.html')
        })

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

        if (document.querySelector("#filter").value != "Rejected") {
            let button = document.createElement("button");
            button.className = "cancelbtn"
            button.innerText = "Cancel";
            button.addEventListener("click", () => {
                status.innerText = "Rejected";
                updatestatus(status.innerText, ele.user_id, ele._id);
                // console.log(status.innerText);
            })
            row.append(studioName, startTime, endTime, date, status, bill, button);
        } else {
            row.append(studioName, startTime, endTime, date, status, bill);
        }



        // row.append(studioName, startTime, endTime, date, status, bill, button);

        tablebody.append(row);
    })

    async function updatestatus(data, data1, apid) {
        // console.log(data, data1, apid)
        // let dat1=JSON.parse(data1)

        try {
            const res = await fetch(`https://erin-shiny-lizard.cyclic.app/appointment/reject/${apid}`, {
                body: JSON.stringify({ status: data }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
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


let sort = document.querySelector("#sort");

sort.addEventListener("change", () => {
    let val = sort.value;
    // console.log(val);
    // console.log(bag);
    if (val == "NTO") {
        bag.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    if (val == "OTN") {
        bag.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
    display1(bag)
})

date_filter.addEventListener('change', async () => {
    const date = date_filter.value;
    const res = await fetch(`https://erin-shiny-lizard.cyclic.app/appointment?date=${date}`, {
        headers: {
            Authorization: token
        }
    })
    if(res.ok) {
        const appointments = await res.json()
        display1(appointments)
    } else {
        alert('Something Went Wrong')
    }
    
})




