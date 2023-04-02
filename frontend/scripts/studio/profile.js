let url = "https://erin-shiny-lizard.cyclic.app/";
// let url = "https://localhost:4500/"

const id = JSON.parse(localStorage.getItem("user")).id;
const token = JSON.parse(localStorage.getItem("token"));

//  ================ POP-UP PAGE =================

let obj = {};
let prevstudioName = "";
let prevNumber = "";
let prevPrice = "";

function editProfileForm() {
  document.querySelector(".bg-model").style.display = "flex";
  document.querySelector("body").style.overflow = "hidden";

  // ==================
  prevstudioName = document.querySelector("#studio-name");
  prevNumber = document.querySelector("#photographer-number");
  prevPrice = document.querySelector("#price");
  document.querySelector("#edit_name").value = prevstudioName.innerText;
  document.querySelector("#edit_number").value = prevNumber.innerText;
  document.querySelector("#edit_price").value = +prevPrice.innerText;
}
function closeProfileForm() {
  document.querySelector(".bg-model").style.display = "none";
  document.querySelector("body").style.overflow = "scroll";
}

// ========================= FETCH DATA ========================

// let day = {
//   0: "Mon",
//   1: "Tue",
//   2: "Wed",
//   3: "Thu",
//   4: "Fri",
//   5: "Sat",
//   6: "Sun",
// };
// console.log(day)

let profile_img = document.getElementById("profile-img");
let Pname = document.getElementById("studio-name");
let number = document.getElementById("photographer-number");
let gender = document.getElementById("photographer-gender");
let age = document.getElementById("years-old");
let city = document.getElementById("city");
let startTime = document.getElementById("start-time");
let endTime = document.getElementById("end-time");
let price = document.getElementById("price");
let address = document.getElementById("address");
let days = document.getElementById("working-days");

async function fetchStudio() {
  try {
    let res = await fetch(`${url}studios/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.ok) {
      let studios = await res.json();
      // console.log(studios)
      displayProfileDetails(studios);
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
}
fetchStudio();
function displayProfileDetails(data) {
  console.log(data);
  Pname.innerText = data.name;
  number.innerText = data.mobile;
  address.innerText = `${data.street} ${data.city}, ${data.state} - ${data.zip_code}`;
  startTime.innerText = data.start_time;
  endTime.innerText = data.end_time;
  profile_img.innerHTML = `<img width="94%" style="margin-left: 3%;" src=${data.profile_image} />`;
  price.innerText = data.price;
  city.innerText = data.city;
  function workingDays(working_days) {
    const day = {
      '0': 'Mon',
      '1': 'Tue',
      '2': 'Wed',
      '3': 'Thu',
      '4': 'Fri',
      '5': 'Sat',
      '6': 'Sun'
    };
    
    const dayNames = [];
    
    for(let i=0; i<working_days.length; i++) {
      dayNames.push(" "+day[working_days[i]]);
    }    
    return dayNames;
  }
  days.innerText = workingDays(data.working_days);
}



//============> EDIT FORM UPDATE
let editForm = document.querySelector("#edit_form");

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let obj = {
    name: editForm.edit_name.value,
    mobile: editForm.edit_number.value,
    price: editForm.edit_price.value,
  };

  try {
    let data = await fetch(`${url}studios/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(obj),
    });

    let res = await data.json();
    console.log(res);
    alert("edited successfully.");
    window.location.reload();
  } catch (error) {
    console.log(error);
    // alert("Something went wrong while editing detials.");
  }
});


function logout(){
  localStorage.clear();
  window.location.href = "../../index.html";

}

