
document.querySelector("form").addEventListener("submit", login);

async function login(event) {
  event.preventDefault();
  try {
    let mobile = document.querySelector("#mobile").value;
    let password = document.querySelector("#password").value;
    let role = document.querySelector("#role").value;

    let logdata = {
      mobile,
      password,
    };

    console.log(role)


    let logurl = `https://erin-shiny-lizard.cyclic.app/${role}/login`;

    let res = await fetch(logurl, {
      method: "POST",
      body: JSON.stringify(logdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    if (data) {
      // Store the access token in the session storage
      console.log(data.user)
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', JSON.stringify(role));
      localStorage.setItem('userName', JSON.stringify(data.user.name));

      alert(data.message);
      window.location = "../index.html";
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.log("err", err);
    alert(data.message);
  }
}