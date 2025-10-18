const timeEl = document.getElementById("time");

function updateTime() {
    timeEl.textContent = Date.now();
}

updateTime();
setInterval(updateTime, 1000)

// Handle avatar upload
const avatarUpload = document.getElementById("avatar-upload");
const avatarImg = document.getElementById("avatar");

avatarUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        avatarImg.src = imageURL; 
    }
});
