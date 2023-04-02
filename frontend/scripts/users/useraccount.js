const update = document.querySelector("#update");

update.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let mobile = document.querySelector("#mobile").value
    let password = document.querySelector("#password").value;
    let email = document.querySelector("#email").value;
    let image = document.querySelector("#img").value;

if(name==""||mobile==""||email==""){
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
    // console.log(obj);
    update1(obj, id);
})

const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));

console.log(token);
console.log(user);

let id = user.id
console.log(id)

async function update1(obj, id) {
    console.log(id);
    try {
        let res = await fetch(`http://localhost:4500/users/update/${id}`, {
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
del.addEventListener("click", function() {
    let id = user._id
    del1(id);
});
async function del1(id) {
    console.log(id);
    try {
        let res = await fetch(`http://localhost:4500/users/delete/${id}`, {

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

async function userdata(id){
    
}