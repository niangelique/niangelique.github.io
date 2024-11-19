
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

let currentImageIndex = 0;  // Tracks the currently displayed image
let currentGroup = 1;  // Default group is 1 (imagesGroup1)

// Function to toggle the gallery visibility and load the correct group of images
function toggleGallery(group) {
    const gallery = document.getElementById('gallery');
    const imageContainer = document.getElementById('galleryImage');
    
    // Update the current group
    currentGroup = group;

    // Choose the correct image group based on the group parameter
    const images = group === 1 ? imagesGroup1 : (group === 2 ? imagesGroup2 : imagesGroup3);

    // If the gallery is currently hidden, show it and display the first image from the selected group
    if (gallery.style.display === 'none' || gallery.style.display === '') {
        currentImageIndex = 0;  // Reset to the first image when opening the gallery
        imageContainer.src = images[currentImageIndex];  // Set the first image from the selected group
        gallery.style.display = 'flex';  // Show the gallery (use flex to center the image)
    } else {
        gallery.style.display = 'none';  // Close the gallery
    }
}

// Function to change the image in the gallery (next/prev)
function changeImage(direction) {
    // Use the correct image group based on the current group
    const images = currentGroup === 1 ? imagesGroup1 : (currentGroup === 2 ? imagesGroup2 : imagesGroup3);
    
    currentImageIndex += direction;

    // Loop back to the beginning or the end if we reach the limits
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;  // Loop back to the last image
    if (currentImageIndex >= images.length) currentImageIndex = 0;  // Loop back to the first image

    const imageContainer = document.getElementById('galleryImage');
    imageContainer.src = images[currentImageIndex];  // Set the new image
}
