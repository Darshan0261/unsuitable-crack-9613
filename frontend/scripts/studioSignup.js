
document.querySelector("form").addEventListener("submit", register);
    
async function register(event) {
  event.preventDefault();

  let working_days=[]

  for(let i=0;i<7;i++){
      let day=document.querySelector(`#day${i}`)
     if(day.checked){
      working_days.push(Number(day.value)) 
     }
  }

  try {
      let name = document.querySelector("#name").value;
      let mobile = document.querySelector("#mobile").value;
      let password= document.querySelector("#pass").value;
      let price = document.querySelector("#price").value;
      let street = document.querySelector("#street").value;
      let city = document.querySelector("#city").value;
      let state = document.querySelector("#state").value;
      let zip_code = document.querySelector("#zip_code").value;
     
      let start_time = document.querySelector("#start_time").value;  
      let end_time= document.querySelector("#end_time").value;

      let regdata = {
      name,
      mobile,
      password,
      price,
      street,
      city,
      state,
      zip_code,
      working_days,
      start_time,
      end_time
      };

      console.log(regdata)

      let regurl = "https://photo-gu0c.onrender.com/studios/signup";

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
      if(data.message=="Studio Registered sucessfull"){
        window.location = "login.html";
      }
      
  } catch (err) {
      console.log(err);
  }


  }
