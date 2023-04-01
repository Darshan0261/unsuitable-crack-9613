let id = JSON.parse(localStorage.getItem("individual_id"));
console.log(typeof(id))
console.log(id)
// let demo="642679615eaa668f464f4bf6";


let fetching_data = async (id) => {
    
    try {
        let res = await fetch(`http://localhost:4500/studios/${id}`);
        console.log(res)
    let data = await res.json();
    console.log(data)
    let arr=[];
    arr.push(data);
    renderData(arr);
    } catch (error) {
        console.log(error.message)
    }
   
    //  renderData(data);
}

   
    
fetching_data(id);
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
        <h3 class="dark">${elem.street},${elem.city},${elem.state},${elem.zipcode}</h3>
        <h3 class="dark">${elem.mobile}</h3>
        <h4 class="charges">Booking Charges :Rs,${elem.price}</h4>
        <h4 class="hour">Working Hours : ${elem.start_time} AM - ${elem.end_time} PM</h4>
        <button class="profile_btn">Wedding</button>
        <button class="profile_btn">babies</button>
        <button class="profile_btn">birthday</button>
        <button class="profile_btn">party</button>
        <button class="profile_btn">events</button>
        <br>
        <button class="see_btn">Go Down For Booking ⬇️ <Booking>
        
        
        


    </div>
</div>
    `
    }).join("")}`
   
}