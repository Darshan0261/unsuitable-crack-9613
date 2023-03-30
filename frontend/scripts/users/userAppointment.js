
  var currentDate = new Date();
//   console.log(currentDate)
  var dateString = currentDate.toDateString();
  document.getElementById("currentDate").innerText = dateString;


  async function dashboard() {

    let res;
    try {
        res = await fetch(`http://localhost:4500/appointment/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFyc2hhbiIsInJvbGUiOiJ1c2VyIiwiaWQiOiI2NDIyYjZiYTU3OGFjYzhmOGYxZjk0OTgiLCJpYXQiOjE2ODAxNzc4Mjd9.IWjAJtgFADp1nBWPNnUeKdR82zzYAv6v9SetLVBbS5w"
            }
        });
    } catch (error) {
        console.log(error);
    }
    let out = await res.json();


    
    console.log(out);
    display1(out);
}


dashboard();


  let tablebody=document.querySelector("#tbody");


  function display1(out){
       out.forEach((ele)=>{
        let row=document.createElement("tr");

        let studioId=document.createElement("td");
        studioId.innerText=ele.studio_id;

        let startTime=document.createElement("td");
        startTime.innerText=ele.start_time;

        let endTime=document.createElement("td");
        endTime.innerText=ele.end_time;

        let date=document.createElement("td");
        date.innerText=ele.date;

        let status=document.createElement("td");
        status.innerText=ele.status;

        let bill=document.createElement("td");
        bill.innerText=ele.bill;

        let button=document.createElement("button");
        button.className="cancelbtn"
        button.innerText="Cancel";

        row.append(studioId,startTime,endTime,date,status,bill,button);

        tablebody.append(row);
       })
  }



