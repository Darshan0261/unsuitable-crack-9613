const update=document.querySelector("#update");

update.addEventListener("clcik",(e)=>{
    e.preventDefault();
    let name=document.querySelector("#name").value; 
    let mobile=document.querySelector("#mobile").value;
    let password=document.querySelector("#password").value;
    let email=document.querySelector("#email").value;
    let image=document.querySelector("#img").value;

    let obj={
        name,
        mobile,
        password,
        email,
        image
    }
    update(obj);
})

const token=localStorage.getItem

function update(obj){
  try {
    
  } catch (error) {
    
  }
}