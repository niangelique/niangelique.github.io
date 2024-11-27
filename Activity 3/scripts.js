// Fetch Data for Each Section
const sections = {
  characters: "https://raw.githubusercontent.com/ZachMcM/attack-on-titan-api/refs/heads/master/data/characters.json",
  episodes: "https://raw.githubusercontent.com/ZachMcM/attack-on-titan-api/refs/heads/master/data/episodes.json",
  locations: "https://raw.githubusercontent.com/ZachMcM/attack-on-titan-api/refs/heads/master/data/locations.json",
  organizations: "https://raw.githubusercontent.com/ZachMcM/attack-on-titan-api/refs/heads/master/data/organizations.json",
  titans: "https://raw.githubusercontent.com/ZachMcM/attack-on-titan-api/refs/heads/master/data/titans.json"
};

const cardContainers = {
  characters: document.getElementById("character-cards"),
  episodes: document.getElementById("episode-cards"),
  locations: document.getElementById("location-cards"),
  organizations: document.getElementById("organization-cards"),
  titans: document.getElementById("titan-cards")
};

// Fetch data and populate cards
const fetchData = async (section) => {
  const response = await fetch(sections[section]);
  const data = await response.json();
  data.forEach(item => {
    createCard(section, item);
  });
};

const createCard = (section, item) => {
  const card = document.createElement("div");
  card.classList.add("card");

  // Ensure the img property is correctly set or use placeholder if missing or "unknown"
  const image = (item.img && item.img !== "unknown") ? item.img : "images/placeholder.jpg";  // Use the correct path to your placeholder image

  card.innerHTML = `
      <img src="${image}" alt="${item.name}">
      <h3>${item.name}</h3>
  `;

  card.addEventListener("click", () => {
    openModal(section, item);
  });

  cardContainers[section].appendChild(card);
};

const openModal = (section, item) => {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  // Reset modal state
  modal.style.display = "none"; // Hide modal initially
  modal.style.opacity = 0; // Ensure opacity is reset

  // Ensure the img property is correctly set or use placeholder if missing or "unknown"
  const image = (item.img && item.img !== "unknown") ? item.img : "images/placeholder.jpg";  // Use the correct path to your placeholder image

  let details = `<h2>${item.name}</h2><img src="${image}" alt="${item.name}"><br>`;

  // Function to handle URLs and convert them to readable IDs
  const convertLinkToID = (url) => {
    if (url.includes('characters/')) {
      const characterId = url.replace('https://api.attackontitanapi.com/characters/', '');
      return `Character ID: ${characterId}`;
    } else if (url.includes('titans/')) {
      const titanId = url.replace('https://api.attackontitanapi.com/titans/', '');
      return `Titan ID: ${titanId}`;
    } else if (url.includes('episodes/')) {
      const episodeId = url.replace('https://api.attackontitanapi.com/episodes/', '');
      return `Episode ID: ${episodeId}`;
    }
    return url; // Return the original if not a recognized link
  };

  // Modal details based on section
  if (section === "characters") {
    details += `<p><strong>Alias:</strong> ${item.alias.join(", ")}</p>
                <p><strong>Species:</strong> ${item.species.join(", ")}</p>
                <p><strong>Age:</strong> ${item.age}</p>
                <p><strong>Gender:</strong> ${item.gender}</p>
                <p><strong>Occupation:</strong> ${item.occupation}</p>`;
  }
  if (section === "episodes") {
    details += `<p><strong>Episode:</strong> ${item.episode}</p>
                <p><strong>Characters:</strong> ${item.characters.map(character => convertLinkToID(character)).join(", ")}</p>`;
  }
  if (section === "locations") {
    details += `<p><strong>Territory:</strong> ${item.territory}</p>
                <p><strong>Region:</strong> ${item.region}</p>
                <p><strong>Debut Episode ID:</strong> ${convertLinkToID(item.debut)}</p>`;
  }
  if (section === "organizations") {
    details += `<p><strong>Members:</strong> ${item.notable_members.map(member => convertLinkToID(member)).join(", ")}</p>
                <p><strong>Affiliation:</strong> ${item.affiliation}</p>`;
  }
  if (section === "titans") {
    details += `<p><strong>Abilities:</strong> ${item.abilities.join(", ")}</p>
                <p><strong>Current Inheritor ID:</strong> ${convertLinkToID(item.current_inheritor)}</p>
                <p><strong>Former Inheritors:</strong> ${item.former_inheritors.map(inheritor => convertLinkToID(inheritor)).join(", ")}</p>
                <p><strong>Allegiance:</strong> ${item.allegiance}</p>`;
  }

  modalContent.innerHTML = details + `<span class="close">&times;</span>`;
  modal.style.display = "flex"; // Show the modal
  modal.style.opacity = 1; // Ensure opacity is set to 1

  // Close the modal
  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal when close is clicked
  });
};

// Initialize data fetching
Object.keys(sections).forEach(section => fetchData(section));

// JavaScript to toggle the burger menu
const burgerIcon = document.getElementById("burger-icon");
const navLinks = document.getElementById("nav-links");

// Toggle the navigation menu when the burger icon is clicked
burgerIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Optional: You can close the menu when a user clicks a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Music Dropdown Toggle
const musicButton = document.getElementById("music-button");
const musicDropdown = document.getElementById("music-dropdown");

// Toggle the music dropdown when the music button is clicked
musicButton.addEventListener("click", () => {
  musicDropdown.classList.toggle("active");

  // Initialize music links after the dropdown has been toggled
  const musicLinks = document.querySelectorAll(".music-link");
  musicLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();  // Prevent the default action of the link
      const songFile = link.getAttribute("data-song");
      playMusic(songFile); // Function to play the selected music
    });
  });
});

// Audio Player Setup
const audioPlayer = new Audio();

// Function to play selected music
const playMusic = (songFile) => {
  audioPlayer.src = `music/${songFile}`;  // Adjust the path to your music folder
  audioPlayer.play();
};

// Mute Button Toggle
const muteButton = document.getElementById("mute-button");
let isMuted = false; // Track whether the music is muted

// Toggle mute/unmute on button click
muteButton.addEventListener("click", () => {
  isMuted = !isMuted; // Toggle the mute state
  audioPlayer.muted = isMuted; // Apply the muted state to the audio player

  // Change button icon based on mute state
  if (isMuted) {
    muteButton.innerHTML = "🔇"; // Mute icon
  } else {
    muteButton.innerHTML = "🔊"; // Unmute icon
  }
});

// Search Bar Functionality
const searchBar = document.getElementById("search-bar");

// Event listener for typing in the search bar
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase(); // Convert input to lowercase to make it case-insensitive

  // Loop through each section (characters, episodes, locations, organizations, titans)
  Object.keys(cardContainers).forEach(section => {
    const cards = cardContainers[section].getElementsByClassName("card");

    // Loop through each card in the section
    Array.from(cards).forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase(); // Get the name of the card and convert to lowercase

      // If the card's name matches the search query, show it. Otherwise, hide it.
      if (name.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const upButton = document.querySelector(".up-button");

// Show or hide the up button based on scroll position
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) { // Show button after scrolling down
        upButton.classList.remove("hidden");
    } else {
        upButton.classList.add("hidden");
    }
});

// Scroll to the top when the up button is clicked
upButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,  // Scroll to the top of the page
        behavior: "smooth"  // Smooth scroll effect
    });
});
