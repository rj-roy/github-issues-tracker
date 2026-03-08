const getLoginAccess = () =>{
    const loginSec = document.getElementById("login-section");

    document.getElementById("sign-in-btn").addEventListener('click', () =>{
        const username = document.getElementById("username").value.toLowerCase();       
        const password = document.getElementById("password").value;

        if(username == "admin" && password == "admin123"){
            window.location.replace('./src/homePage/home.html')
        }else{
            alert("Please Enter Correct Info")

            const wrongInfo = [document.getElementById("username"), document.getElementById("password")]
            .forEach(el => {
                el.classList.remove("border-gray-300");
                el.classList.add("border-red-500");
            });
        };
    });
};

getLoginAccess();