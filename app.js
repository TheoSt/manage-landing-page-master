const dropdown_icon = document.querySelector("#dropdown_icon");
const navbar_el = document.querySelector(".navbar");
const overlay_el = document.querySelector("#overlay");

const comments = document.querySelectorAll(".comment");
const dots = document.querySelectorAll(".dot");
const comments_el = document.querySelector("#comments");

const form_el = document.querySelector(".email_form form");
const email_input_el = document.querySelector("#email_input");

let ticking = false;
let active_menu = false;
let now_slide = 0;
let error_email = false;

dropdown_icon.addEventListener("click",function() {
    active_menu = active_menu ? false:true;

    if(active_menu) {
        this.src = "images/icon-close.svg";
        /* overlay_el.classList.add("active"); */
    }
    else {
        this.src = "images/icon-hamburger.svg";
        /* overlay_el.classList.remove("active"); */
    }

    navbar_el.classList.toggle("active");
});

comments_el.addEventListener("scroll",function(e) {
   if(!ticking) {
       window.requestAnimationFrame(function() {
           showSlide();
           ticking = false;
       })
       ticking = true;
   }
});

form_el.addEventListener("submit",function(e) {
    e.preventDefault();

    if(email_input_el.value!="" && email_input_el.value!==null) {
        showSuccessMsg();
        return;
    }
    
    showErrorMsg();
})

email_input_el.addEventListener("invalid",function(e) {
    e.preventDefault();
    showErrorMsg();
});



function showSuccessMsg() {
    let error_par = form_el.nextElementSibling;

    if(error_par.classList.contains("error")) error_par.classList.remove("error");
    error_par.textContent = "Thank you for subscribing!";
    error_par.classList.add("active","success");
}

function showErrorMsg() {
    let error_par = form_el.nextElementSibling;

    if(error_par.classList.contains("success")) error_par.classList.remove("success");
    error_par.textContent = "Please insert a valid email";
    error_par.classList.add("active","error");
}

function showSlide() {
    comments.forEach(c=> {
        if(isInViewport(c)) {
            dots[now_slide].classList.remove("active");
            now_slide = c.dataset.dot;
            dots[now_slide].classList.add("active");
        }
    })
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.left>=0 && rect.right<=(window.innerWidth||document.documentElement.clientWidth)
    );
}