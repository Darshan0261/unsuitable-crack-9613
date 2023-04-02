
function editProfileForm() {
    document.querySelector(".bg-model").style.display = 'flex';
    document.querySelector("body").style.overflow = "hidden";
    
};
function closeProfileForm() {
    document.querySelector(".bg-model").style.display = 'none';
    document.querySelector("body").style.overflow = "scroll";
};

    
function logout(){
    localStorage.clear();
    window.location.href = "../../index.html";
}
