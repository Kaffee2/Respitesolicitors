(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "73px");
        } else {
            $('.nav-bar').removeClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "0");
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Blogs carousel
    $(".blog-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

// comment
const anonymousInput  = document.querySelector(".anonymous-input");
const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#publish");
const comments = document.querySelector(".comments");

userComment.addEventListener("input", (e) =>{
  if (e.currentTarget.value !== "") {
    publishBtn.removeAttribute("disabled");
    publishBtn.classList.add("able");
  } else{
    publishBtn.setAttribute("disabled", "disabled");
    publishBtn.classList.remove("able");
  }
});

//user object
const userId = {
    name: "",
    message: "",
    date: ""
}

//create a function to publish your comment ;
function addcomment() {
    userId.name = anonymousInput.value;
    userId.message = userComment.value;
    userId.date = new Date().toLocaleString();

    let publishedcomment = `
    <div class= "parent">
        <img src="./img/user i.jpg"  />
        <div>
            <h3>${userId.name}</h3>
            <p>${userId.message}</p>
            <div class="engagements"><img src="./img/like.jpg"/> <img src="./img/share.jpg" /></div>
            <span>${userId.date}</span>
        </div>
    </div>
  
  `;

  comments.innerHTML += publishedcomment;

  //lets connect our comment box to localstorage
  localStorage.setItem("comments", comments.innerHTML);

  userComment.value = "";
  anonymousInput.value = "Anonymous";

  //lets increments the count when a comment is posted;
  let counts = document.querySelectorAll(".parent").length;
  document.getElementById("comment-count").textContent = counts;
}

//this add an event listener to the button;
publishBtn.addEventListener("click", addcomment);

//when the DOM loads, fetch data bfrom the localstorage;
window.addEventListener("DOMContentLoaded", (e) => {
     comments.innerHTML = localStorage.getItem("comments");

 //lets increments the count when a comment is posted;
  let counts = document.querySelectorAll(".parent").length;
  document.getElementById("comment-count").textContent = counts;
});


const form = document.getElementById("feedbackForm");
const list = document.getElementById("feedbackList");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    name: form[0].value,
    email: form[1].value,
    message: form[2].value
  };

  await fetch("https://your-backend-url/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Thank you. Your feedback will be reviewed.");
  form.reset();
});

async function loadFeedback() {
  const res = await fetch("https://your-backend-url/api/feedback");
  const feedback = await res.json();

  feedback.forEach(f => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
      <strong>${f.name}</strong>
      <p>${f.message}</p>
    `;
    list.appendChild(div);
  });
}

loadFeedback();
