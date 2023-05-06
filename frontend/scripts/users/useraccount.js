const form = document.querySelector("#form");

const inp = document.querySelectorAll(".in");
// console.log(inp)
let val;
inp.forEach(ele => {
    ele.disabled = true;
    val = true;
});
// console.log(val);

const update = document.querySelector("#update");



const nameInput = document.querySelector("#name");
const mobileInput = document.querySelector("#mobile");
const passwordInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");
const imageInput = document.querySelector("#img");

// form.disabled = true;

update.addEventListener("click", (e) => {
    e.preventDefault();



    if (val) {
        inp.forEach(ele => {
            ele.disabled = false;
            update.innerText = "Update";
        })
        val = false;

    } else {

        val = true;
        update.innerText = "Edit";

        let name = nameInput.value;
        let mobile = mobileInput.value
        let password = passwordInput.value;
        let email = emailInput.value || "";
        let image = imageInput.value;

        if (name == "" || mobile == "") {
            alert("specified fields are empty");
            return;
        }

        let obj = {
            name,
            mobile,
            password,
            email,
            image
        }
        update1(obj, id);
    }
})

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

console.log(token);
console.log(user);

let id = user.id
console.log(id)

async function update1(obj, id) {
    console.log(id);
    try {
        let res = await fetch(`https://photo-gu0c.onrender.com/users/update/${id}`, {
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            method: "PATCH"
        });

        let out = await res.json();
        console.log(out);
        alert("Proifle Updated")

    } catch (error) {
        console.log(error);
    }
}

let del = document.querySelector("#delete");
del.addEventListener("click", function () {
    let id = user._id
    del1(id);
});
async function del1(id) {
    console.log(id);
    try {
        let res = await fetch(`https://photo-gu0c.onrender.com/users/delete/${id}`, {

            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            method: "DELETE"
        });

        let out = await res.json();
        console.log(out);
        // alert("user deleted successfully");

    } catch (error) {
        console.log(error);
    }
}

async function userdata(id) {

    try {
        let out = await fetch(`https://photo-gu0c.onrender.com/users/data/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization:token
            }
        });
        let res = await out.json();
        console.log(res);
        nameInput.value = res.name;
        mobileInput.value = res.mobile;
        emailInput.value = res.email;
        passwordInput.value = res.password || "";
        imageInput.value = res.image || "";
    } catch (error) {
        console.log(error)
    }
}

userdata(id)