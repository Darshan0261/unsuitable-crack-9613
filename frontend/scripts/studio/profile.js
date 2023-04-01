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
  console.log(prevPrice.innerText);
  document.querySelector("#edit_name").value = prevstudioName.innerText;
  document.querySelector("#edit_number").value = prevNumber.innerText;
  document.querySelector("#edit_price").value = +prevPrice.innerText;
}
function closeProfileForm() {
  document.querySelector(".bg-model").style.display = "none";
  document.querySelector("body").style.overflow = "scroll";
}

// ========================= FETCH DATA ========================

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

async function fetchStudio() {
  try {
    let res = await fetch(
      `http://localhost:4500/studios/6426794c5eaa668f464f4bf1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      }
    );
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
  address.innerText = `${data.street} ${data.city}, ${data.state}`;
  startTime.innerText = data.start_time;
  endTime.innerText = data.end_time;
  profile_img.innerHTML = `<img src=${data.profile_image} />`;
  price.innerText = data.price;
  city.innerText = data.city;
}


//============> EDIT FORM UPDATE
let editForm = document.querySelector("#edit_form");

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let data = {
    name: editForm.edit_name,
    mobile: editForm.edit_number,
    price: editForm.edit_price,
  };
  await fetch(`http://localhost:4500/studios/${id}`, {
    method: "post",
    Authorization: localStorage.getItem("itemname"),
    body: JSON.stringify(data),
  });
  if (res.ok) {
    alert("edited successfully.");
  } else alert("Something went wrong while editing detials.");
});
