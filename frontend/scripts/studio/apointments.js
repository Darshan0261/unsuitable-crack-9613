const tableBody = document.querySelector('tbody');
const tableHead = document.querySelector('thead');
const status_filter = document.querySelector('#status-filter')
const date_filter = document.querySelector('#date-filter')
const token = localStorage.getItem('token')

let arr = [];
const baseURL = 'https://erin-shiny-lizard.cyclic.app';


async function fetchAppointments() {
  let res = await fetch(`${baseURL}/appointment`, {
    method: 'GET',
    headers: {
      Authorization: token
    }
  })
  let data;
  if (res.ok) {
    data = await res.json();
    console.log(data)
    arr = data;
    displayPendingAppointment(arr)
  } else {
    alert(data.message)
  }
}

fetchAppointments()

// async function fetchUserDetails(appointments) {
//   appointments.forEach(async (app) => {

//   })
//   displayAppointment(appointments)
// }


function displayPendingAppointment(data) {
  tableBody.innerHTML = '';
  tableHead.innerHTML = `
      <tr>
        <th>Client Name</th>
        <th>Mobile Number</th>
        <th>Date</th>
        <th>Start time</th>
        <th>End time</th>
        <th>Accept</th>
        <th>Reject</th>
      </tr>
    `
  data.forEach(async (item, index) => {
    if (item.status != 'Pending') {
      return;
    }
    const user_id = item.user_id;
    let res = await fetch(`${baseURL}/users/data/${user_id}`)
    let user = await res.json();

    let tr = document.createElement('tr');
    tr.setAttribute('id', item._id)
    let name = document.createElement('td');
    name.innerText = user.name;
    let mobile = document.createElement('td');
    mobile.innerText = user.mobile;
    let date = document.createElement('td');
    date.innerText = item.date;
    let start_time = document.createElement('td');
    start_time.innerText = item.start_time;
    let end_time = document.createElement('td');
    end_time.innerText = item.end_time;

    let acceptBtn = document.createElement('button');
    acceptBtn.classList.add('custom-btn', 'btn-3')
    acceptBtn.innerHTML = '<span>Accept</span>';
    let acceptTD = document.createElement('td');
    acceptTD.append(acceptBtn)

    acceptBtn.addEventListener('click', () => {
      acceptAppointment(item._id)
    })

    let declineBtn = document.createElement('button');
    declineBtn.classList.add('custom-btn', 'btn-5')
    declineBtn.innerHTML = '<span>Cancel</span>';
    let declineTD = document.createElement('td');
    declineTD.append(declineBtn)

    declineBtn.addEventListener('click', () => {
      declineAppointment(item._id)
    })

    tableBody.append(tr)
    tr.append(name, mobile, date, start_time, end_time, acceptTD, declineTD)
  })
}

function displayAcceptedAppointment(data) {
  tableBody.innerHTML = '';
  tableHead.innerHTML = `
      <tr>
        <th>Client Name</th>
        <th>Mobile Number</th>
        <th>Date</th>
        <th>Start time</th>
        <th>End time</th>
        <th>Cancel</th>
      </tr>
    `
  data.forEach(async (item, index) => {
    if (item.status != 'Accepted') {
      return;
    }
    const user_id = item.user_id;
    let res = await fetch(`${baseURL}/users/data/${user_id}`)
    let user = await res.json();

    let tr = document.createElement('tr');
    tr.setAttribute('id', item._id)
    let name = document.createElement('td');
    name.innerText = user.name;
    let mobile = document.createElement('td');
    mobile.innerText = user.mobile;
    let date = document.createElement('td');
    date.innerText = item.date;
    let start_time = document.createElement('td');
    start_time.innerText = item.start_time;
    let end_time = document.createElement('td');
    end_time.innerText = item.end_time;

    let declineBtn = document.createElement('button');
    declineBtn.classList.add('custom-btn', 'btn-5')
    declineBtn.innerHTML = '<span>Cancel</span>';
    let declineTD = document.createElement('td');
    declineTD.append(declineBtn)
    tableBody.append(tr)
    tr.append(name, mobile, date, start_time, end_time, declineTD)
  })
}

function displayRejectedAppointment(data) {
  tableBody.innerHTML = '';
  tableHead.innerHTML = `
      <tr>
        <th>Client Name</th>
        <th>Mobile Number</th>
        <th>Date</th>
        <th>Start time</th>
        <th>End time</th>
      </tr>
    `
  data.forEach(async (item, index) => {
    if (item.status != 'Rejected') {
      return;
    }
    const user_id = item.user_id;
    let res = await fetch(`${baseURL}/users/data/${user_id}`)
    let user = await res.json();

    let tr = document.createElement('tr');
    tr.setAttribute('id', item._id)
    let name = document.createElement('td');
    name.innerText = user.name;
    let mobile = document.createElement('td');
    mobile.innerText = user.mobile;
    let date = document.createElement('td');
    date.innerText = item.date;
    let start_time = document.createElement('td');
    start_time.innerText = item.start_time;
    let end_time = document.createElement('td');
    end_time.innerText = item.end_time;


    tableBody.append(tr)
    tr.append(name, mobile, date, start_time, end_time)
  })
}

status_filter.addEventListener('change', () => {
  if (date_filter.value) {
    let date = date_filter.value;
    let filter = arr.filter(item => { return item.date == date })
    if (status_filter.value == 'Pending') {
      displayPendingAppointment(filter)
    } else if (status_filter.value == 'Accepted') {
      displayAcceptedAppointment(filter)
    } else {
      displayRejectedAppointment(filter)
    }
  } else {
    if (status_filter.value == 'Pending') {
      displayPendingAppointment(arr)
    } else if (status_filter.value == 'Accepted') {
      displayAcceptedAppointment(arr)
    } else {
      displayRejectedAppointment(arr)
    }
  }
})

date_filter.addEventListener('change', () => {
  let date = date_filter.value;
  let filter = arr.filter(item => { return item.date == date })
  if (status_filter.value == 'Pending') {
    displayPendingAppointment(filter)
  } else if (status_filter.value == 'Accepted') {
    displayAcceptedAppointment(filter)
  } else {
    displayRejectedAppointment(filter)
  }
})

async function acceptAppointment(id) {
  let res = await fetch(`${baseURL}/appointment/accept/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': token,
    }
  })
  let data = await res.json()
  if (!res.ok) {
    alert(data.message);
    return;
  }
  alert('Appointment Accepted')
  fetchAppointments();
}

async function declineAppointment(id) {
  let res = await fetch(`${baseURL}/appointment/reject/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': token,
    }
  })
  let data = await res.json()
  if (!res.ok) {
    alert(data.message);
    return;
  }
  alert('Appointment Rejected')
  fetchAppointments()
}

// let acceptBtns = document.querySelectorAll(".accept");
// let rejectBtns = document.querySelectorAll(".reject");

// acceptBtns.forEach((el) => {
//   el.addEventListener("click", () => {
//     el.innerHTML = "<b>ACCEPTED</b>";
//   });
// });

// rejectBtns.forEach((el) => {
//   el.addEventListener("click", () => {
//     el.innerHTML = "<b>REJECTED</b>";
//     el.previousElementSibling.innerHTML = "-"
//     el.parentElement.classList.add('rejected')


//     // deleteAppointmetn(el.parentElement.id)
//   });
// });

// async function deleteAppointmetn(id) {
//   await fetch(`/url/${id}`, {
//     method: "Post",
//     authorization: localStorage.getItem("token"),
//     body: id,
//   });
//   if (res.ok) {
//     alert("Appointment Deleted");
//   } else alert("Something went wrong while delting the appointment");
// }
// async function acceptAppointment(id) {
//   await fetch(`/url/${id}`, {
//     method: "Post",
//     authorization: localStorage.getItem("token"),
//     body: id,
//   });
//   if (res.ok) {
//     alert("Appointment Accepted");
//   } else alert("Something went wrong while accepting the appointment");
// }


function logout(){
  localStorage.clear();
  window.location.href = "../../index.html";

}

