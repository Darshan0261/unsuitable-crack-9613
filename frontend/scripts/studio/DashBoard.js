/*

*/

async function fetchStudio() {
    try {
        let res = await fetch(`http://localhost:4500/studios/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                },
            });
        if (res.ok) {
            let studios = await res.json();
            displayStudiosLength(studios);
        } else {
            alert("Something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
}
fetchStudio()
function displayStudiosLength(data) {
    let studioCount = document.getElementById("studio-count");
    studioCount.innerHTML = `<b>${data.length}</b>`;
}

function logout(){
    localStorage.clear();
    window.location.href = "../../index.html";
}