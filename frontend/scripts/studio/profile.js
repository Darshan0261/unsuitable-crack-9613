//  ================ POP-UP PAGE ================= 

function editProfileForm() {
    document.querySelector(".bg-model").style.display = 'flex';
    document.querySelector("body").style.overflow = "hidden";
    
};
function closeProfileForm() {
    document.querySelector(".bg-model").style.display = 'none';
    document.querySelector("body").style.overflow = "scroll";
};

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
        let res = await fetch(`http://localhost:4500/studios/6426794c5eaa668f464f4bf1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
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
fetchStudio()
function displayProfileDetails(data) {
    console.log(data)
    Pname.innerText = data.name;
    number.innerText = data.mobile;
    address.innerText = `${data.street} ${data.city}, ${data.state}`;   
    startTime.innerText = data.start_time;
    endTime.innerText = data.end_time;
    profile_img.innerHTML = `<img src=${data.profile_image} />`
    price.innerText = `₹ ${data.price}`;
    city.innerText = data.city
}