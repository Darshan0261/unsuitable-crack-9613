let head= document.querySelector("header");
// Check if user is logged in
let isLoggedIn = false;

// Check if session exists
if (localStorage.getItem('token')) {
  isLoggedIn = true;
}

if(isLoggedIn){
    head.innerHTML=`
  <div class="nav">
  <div  class="part1">
           <img width="100%" src="https://i.postimg.cc/KvWzQQz2/Whats-App-Image-2023-03-28-at-2-23-14-PM.jpg" alt="logo">
      <img  width="100%"  src="https://i.postimg.cc/cHrqvmyc/Stike.png" alt="">
      <div>
           <a  id="nbtn" href="../index.html">Home</a>
          <a  id="dash" >Dashboard</a>
      </div>
     
  </div>
  
 <div class="part2">
     <p>${localStorage.getItem("userName")}</p>
      <button id="logout-button">Logout</button>
  </div>
</div>`;

let dash = document.querySelector("#dash");
// if(role=="users"){
//     dash.href="../HTML/users/users.html"
// }else{
//     dash.href="../HTML/studio/DashBoard.html"
// }

let logoutButton = document.querySelector("#logout-button");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName")
  window.location.href = "index.html";
});
}else{
    head.innerHTML=`
    <div class="nav">
    <div  class="part1">
             <img width="100%" src="https://i.postimg.cc/KvWzQQz2/Whats-App-Image-2023-03-28-at-2-23-14-PM.jpg" alt="logo">
        <img  width="100%"  src="https://i.postimg.cc/cHrqvmyc/Stike.png" alt="">
        <div>
             <a  id="nbtn" href="../index.html">Home</a>
          
        </div>
       
    </div>
    
   <div class="part2">
        <a id="nbtn" href="./login.html">Login</a>
        <a id="nbtn"  href="./userSignup.html">Signup</a>
        <button class="nav-button">Register as Studio</button>
    </div>
</div>`

}