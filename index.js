const button = document.getElementById("button");
const textBox = document.getElementById("textBox");
const form = document.getElementById("mainForm");

let allAnwers = [];

fetch("https://shouldyoudoit.herokuapp.com/all").then((res) => {

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    res.json().then((data) => {
        allAnwers = data;
    });
}).catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
    allAnwers = [{ msg: "do it", img: "" }];
});

form.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();

        if (allAnwers.length > 0) {

            const msg = document.getElementById("mensagem");
            const img = document.getElementById("imagem");

            if (textBox.value.trim() === "") {
                msg.textContent = "You must write something bro";
                img.style.visibility = "hidden";
            } else {

                msg.textContent = "Considering every option...";

                const random = Math.floor(Math.random() * allAnwers.length);

                setTimeout(() => {
                    msg.textContent = "Making your decision...";

                    setTimeout(() => {
                        msg.textContent = allAnwers[random].msg;
                        img.src = allAnwers[random].img;
                        img.style.visibility = "visible";
                    }, 2000);
                }, 1500);
            }
            textBox.value = "";

        } else {
            msg.textContent = "There is no answer, answer not loaded";
        }

    },
    false);