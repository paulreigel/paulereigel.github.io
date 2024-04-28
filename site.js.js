
//script for hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Toggle dropdown menu on click
    dropdownButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    // Close dropdown menu when clicking outside of it
    window.addEventListener('click', (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const eventsButton = document.querySelector('#events-button');
    const eventsContainer = document.querySelector('#events-container');
    const eventsText = document.querySelector('.events p');

    // Define the events array (replace with your actual data)
    const events = ['Event 1', 'Event 2', 'Event 3'];

    // Add event listener to the button
    eventsButton.addEventListener('click', () => {
        //console.log('Button clicked!');
        // Hide the p tag
        eventsText.style.display = 'none';
         // Clear previous events
         eventsContainer.innerHTML = '';

          // Create ul element
        const ul = document.createElement('ul');

        // Populate ul with events
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event;
            ul.appendChild(li);

            // Apply CSS styles to the dynamically created li elements
            li.style.fontSize = '1.5em'; // Adjust font size as needed
            //li.style.textAlign = 'center'; // Center align text
            li.style.marginBottom = '10px'; // Add margin bottom
            li.style.marginLeft = '-45px';
        });
    
        // Append ul to events container
        eventsContainer.appendChild(ul);
    });
});