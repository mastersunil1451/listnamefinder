// Getting references to DOM elements
const nameInput = document.getElementById('nameInput');
const resetBtn = document.getElementById('resetBtn');
const searchInput = document.getElementById('searchInput');
const nameList = document.getElementById('nameList');

// Store names in an array
let names = [];

// Event listener for the input field (Name List)
nameInput.addEventListener('input', () => {
    const inputText = nameInput.value.trim();
    // Split names by newline and filter out any empty names
    names = inputText.split('\n').map(name => name.trim()).filter(name => name);
    // Save the list to localStorage
    localStorage.setItem('names', JSON.stringify(names));
    updateList(names); // Update the displayed list
});

// Event listener for the reset button
resetBtn.addEventListener('click', () => {
    localStorage.removeItem('names'); // Clear saved list
    nameInput.value = ''; // Clear the input field
    names = [];
    updateList(names); // Clear displayed list
});

// Event listener for search input (Filter names)
searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.toLowerCase();
    const filteredNames = names.filter(name => name.toLowerCase().includes(query));
    updateList(filteredNames); // Update the displayed list with filtered names
});

// Update the displayed name list
function updateList(namesArray) {
    nameList.innerHTML = ''; // Clear current list
    namesArray.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        nameList.appendChild(li);
    });
}

// Initialize the list from localStorage if available
window.onload = function() {
    const savedNames = localStorage.getItem('names');
    if (savedNames) {
        names = JSON.parse(savedNames);
        updateList(names);
    }
};
