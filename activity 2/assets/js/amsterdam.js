
$(document).ready(function(){
    
    $('.search-toggle').click(function(){
        $('.search-wrapper').toggleClass('show');
    });

    $('.modal-toggle').click(function(){
        $('.modalBox').toggleClass('show');
    })

    $('.modalBox').click(function(){
        $(this).removeClass('show');
    });

    $('.spinner').click(function(){
        $(".theme-selector").toggleClass('show');
    });
    $('.light').click(function(){
        $('body').addClass('light-theme');
        $('body').removeClass('dark-theme');
    });
    $('.dark').click(function(){
        $('body').toggleClass('dark-theme');
        $('body').removeClass('light-theme');
    });
});



$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
}); 


const imagesGroup1 = [
    "assets/imgs/blog-1.jpg",
    "assets/imgs/bloemenmarkt/2.jpg",
    "assets/imgs/bloemenmarkt/3.jpg",
    "assets/imgs/bloemenmarkt/4.jpg",
];

const imagesGroup2 = [
    "assets/imgs/blog-2.jpg",
    "assets/imgs/keukenhof/1.jpg",
    "assets/imgs/keukenhof/2.jpg",
    "assets/imgs/keukenhof/3.jpg",
    "assets/imgs/keukenhof/4.jpg",
    "assets/imgs/keukenhof/5.jpg",

];

const imagesGroup3 = [
    "assets/imgs/blog-3.jpg",
    "assets/imgs/hortus/1.jpg",
    "assets/imgs/hortus/2.jpg",
    "assets/imgs/hortus/3.jpg",
    "assets/imgs/hortus/4.jpg",

];

const imagesGroup4 = [
    "assets/imgs/blog-4.jpg",
    "assets/imgs/herengracht/1.jpg",
    "assets/imgs/herengracht/2.jpg",
    "assets/imgs/herengracht/3.jpg",
    "assets/imgs/herengracht/4.jpg",
    "assets/imgs/herengracht/5.jpg",

];

const imagesGroup5 = [
    "assets/imgs/blog-5.jpg",
    "assets/imgs/windmill/1.jpg",
    "assets/imgs/windmill/2.jpg",
    "assets/imgs/windmill/3.jpg",
    "assets/imgs/windmill/4.jpg",
    "assets/imgs/windmill/5.jpg",

];

const imagesGroup6 = [
    "assets/imgs/blog-6.jpg",
    "assets/imgs/oude/1.jpg",
    "assets/imgs/oude/2.jpg",
    "assets/imgs/oude/3.jpg",
    "assets/imgs/oude/4.jpg",
    "assets/imgs/oude/5.jpg",

];

let currentImageIndex = 0;
let currentGroup = 1;

function toggleGallery(group = null) {
    const gallery = document.getElementById('gallery');
    const imageContainer = document.getElementById('galleryImage');

    if (group === null) {
        gallery.style.display = 'none';
        return;
    }

    const allImageGroups = {
        1: imagesGroup1,
        2: imagesGroup2,
        3: imagesGroup3,
        4: imagesGroup4,
        5: imagesGroup5,
        6: imagesGroup6
    };

    if (!allImageGroups[group]) {
        console.error(`Group ${group} does not exist.`);
        return;
    }

    currentGroup = group;
    const images = allImageGroups[group];

    if (gallery.style.display === 'none' || gallery.style.display === '') {
        currentImageIndex = 0;
        imageContainer.src = images[currentImageIndex];
        gallery.style.display = 'flex';
    }
}

function changeImage(direction) {
    const allImageGroups = {
        1: imagesGroup1,
        2: imagesGroup2,
        3: imagesGroup3,
        4: imagesGroup4,
        5: imagesGroup5,
        6: imagesGroup6
    };

    const images = allImageGroups[currentGroup];

    if (!images || images.length === 0) {
        console.error(`No images found for group ${currentGroup}.`);
        return;
    }

    currentImageIndex += direction;

    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;

    const imageContainer = document.getElementById('galleryImage');
    imageContainer.src = images[currentImageIndex];
}

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);  // Get the target section id
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
