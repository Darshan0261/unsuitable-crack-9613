document.querySelector("form").addEventListener("submit", register);
    

    async function register(event) {
    event.preventDefault();
    console.log("4145")
    try {
        let name = document.querySelector("#name").value;
        let mobile = document.querySelector("#mobile").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        let regdata = {
        name,
        mobile,
        email,
        password,
        };

        let regurl = "https://erin-shiny-lizard.cyclic.app/users/signup";

        let res = await fetch(regurl, {
        method: "POST",
        body: JSON.stringify(regdata),
        headers: {
            "Content-type": "application/json",
        },
        });
        let data = await res.json();
        alert(data.message);
        console.log(data);

        window.location = "login.html";
    } catch (err) {
        console.log(err);
    }
    }