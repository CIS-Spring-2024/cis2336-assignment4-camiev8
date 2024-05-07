// Handle Dropdown and Responsive Menu Toggle
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');

function showDropdown() {
    dropdownContent.style.display = 'block';
}

function hideDropdown() {
    dropdownContent.style.display = 'none';
}

dropdown.addEventListener('mouseenter', showDropdown);
dropdown.addEventListener('mouseleave', hideDropdown);

function toggleMenu() {
    var x = document.querySelector(".topnav");
    if (x.classList.contains("responsive")) {
        x.classList.remove("responsive");
    } else {
        x.classList.add("responsive");
    }
}
