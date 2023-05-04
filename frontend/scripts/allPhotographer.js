let fetching_data = async (city,sort) => {
    if (!city==0) {
        let res = await fetch(`https://photo-gu0c.onrender.com/studios?city=${city}`);
        let data = await res.json();
        console.log(data);
        renderData(data);

    }
    else if(sort){
        console.log(sort)
        let res = await fetch(`https://photo-gu0c.onrender.com/studios?sort=${sort}`);
        let data = await res.json();
        console.log(data);
        renderData(data);
    }
    else{
        let res = await fetch("https://photo-gu0c.onrender.com/studios");
        
    let data = await res.json();
    console.log(data);
    renderData(data);
}

    }
    
fetching_data();
let main_div = document.querySelector("#main_div");
let renderData = (data) => {
    main_div.innerHTML = `${data.map((elem) => {
        return `
    <div>
    <div class="profile_img">
        <img class="p_img"
            src=${elem.profile_image}
            alt="">
    </div>
    <div>
        <h2 class="head">${elem.name}</h2>
        <h3 class="dark">${elem.street},${elem.city},${elem.state}</h3>
        <h3 class="dark">${elem.mobile}</h3>
        <h4>Booking Charges :Rs,${elem.price}</h4>
        <h4 class="hour">Working Hours : ${elem.start_time} AM - ${elem.end_time} PM</h4>
        <button class="profile_btn">Wedding</button>
        <button class="profile_btn">babies</button>
        <button class="profile_btn">birthday</button>
        <button class="profile_btn">party</button>
        <button class="profile_btn">events</button>
        <br>
        <button id="back_btn" class="b_btn">Go Back</button>
        <button data-id="${elem._id}" class="see_btn">See Profile</button>


    </div>
</div>
    `
    }).join("")}`
    let all_btns = document.querySelectorAll(".see_btn");
    for (let btn of all_btns) {
        btn.addEventListener("click", (e) => {
            let id = e.target.dataset.id;
            localStorage.setItem("individual_id", JSON.stringify(id));
            window.location.href = "individualpage.html";
            console.log(id)
        })
    }
    let btns=document.querySelectorAll(".b_btn");
     for(let bt of btns){
        bt.addEventListener("click",()=>{
            window.location.href="../index.html"
        })
     }
}
////filteration area;
let Default = document.getElementById("Default");
Default.addEventListener("click", () => {
    window.location.reload()
})
let Chennai = document.getElementById("Chennai");
Chennai.addEventListener("click", () => {
    let city = "Chennai";
    fetching_data(city)
})
let Delhi = document.getElementById("Delhi");
Delhi.addEventListener("click", () => {
    let city = "Delhi";
    fetching_data(city)
})
let Jalgaon = document.getElementById("Jalgaon");
Jalgaon.addEventListener("click", () => {
    let city = "Jalgaon";
    fetching_data(city)
})
let Pune = document.getElementById("Pune");
Pune.addEventListener("click", () => {
    let city = "Pune";
    fetching_data(city)
})
let Kolkata = document.getElementById("Kolkata");
Kolkata.addEventListener("click", () => {
    let city = "Kolkata";
    fetching_data(city)
})
/// Sorting by booking charges;
let option=document.getElementById("sort");
option.addEventListener("change",()=>{
    if(option.value=="0"){
        window.location.reload();
    }else if(option.value=="1"){
       let  city=0;
        fetching_data(city,1)
    }
    else if(option.value=="-1"){
        let  city=0;
         fetching_data(city,-1)
     }
})
let btn=document.getElementById("back_btn");
btn.addEventListener("click",()=>{
    window.location.href="index.html"
})
  

