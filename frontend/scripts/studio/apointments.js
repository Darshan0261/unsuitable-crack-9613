// const tableBody = document.querySelector('tbody');


let appointments = [];
const baseURL = 'https://erin-shiny-lizard.cyclic.app';

async function fetchAppointments() {
  let res = await fetch(`${baseURL}/appointment`)
  if (res.ok) {
    let data = await res.json()
    appointments = data;
    fetchUserDetails()
  } else {
    alert('Something Went Wrong')
  }

}

async function fetchUserDetails() {
  appointments.forEach( async (app) => {
    const user_id = app.user_id;
    let res = await fetch(`${baseURL}/users/${user_id}`)
    if(res.ok) {
      
    }
  })
}
=======
// let arr = []


const url = 'https://erin-shiny-lizard.cyclic.app';

async function fetchAppointments(){
    let res = await fetch(`${url}/appointment`)
    if(res.ok) {
        let data = await res.json()
        arr = data;
        fetchUserDetails()
    }
    
}
async function fetchUserDetails(){
    let res = await fetch('users')
    let data = await res.json()

}


// function displayAppointment(data){
//     tableBody.innerHTML = data.map((item,index)=>{
//         return `
//         <tr id=${item.id}>
//         <td>${}</td>
//         <td>{item}</td>
//         <td>2023-04-20</td>
//         <td>1:00 PM</td>
//         <td>5:00 PM</td>
//         <td><button class="custom-btn btn-3"><span>Accept</span></button></td>
//         <td><button class="custom-btn btn-5"><span>Reject</span></button></td>
//       </tr>
//         `
//     }).join(" ")
// }

// =================>
let acceptBtns = document.querySelectorAll(".accept");
let rejectBtns = document.querySelectorAll(".reject");

acceptBtns.forEach((el) => {
  el.addEventListener("click", () => {
    el.innerHTML = "<b>ACCEPTED</b>";
  });
});

rejectBtns.forEach((el) => {
  el.addEventListener("click", () => {
    el.innerHTML = "<b>REJECTED</b>";
    el.previousElementSibling.innerHTML = "-"
    el.parentElement.classList.add('rejected')


    // deleteAppointmetn(el.parentElement.id)
  });
});

async function deleteAppointmetn(id) {
  await fetch(`/url/${id}`, {
    method: "Post",
    authorization: localStorage.getItem("token"),
    body: id,
  });
  if (res.ok) {
    alert("Appointment Deleted");
  } else alert("Something went wrong while delting the appointment");
}
async function acceptAppointment(id) {
  await fetch(`/url/${id}`, {
    method: "Post",
    authorization: localStorage.getItem("token"),
    body: id,
  });
  if (res.ok) {
    alert("Appointment Accepted");
  } else alert("Something went wrong while accepting the appointment");
}
