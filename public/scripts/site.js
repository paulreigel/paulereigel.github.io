
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

//script for events window on home page
document.addEventListener('DOMContentLoaded', () => {
    const eventCardContainer = document.getElementById('event-card-container');
    const prevEventButton = document.getElementById('prev-event-button');
    const nextEventButton = document.getElementById('next-event-button');

    // JSON array of events
    const events = [
        { title: "SummerFest", description: "Location Date Time" },
        { title: "Low Country Cajun Fest", description: "Location Date Time" },
        { title: "Mile of Music", description: "Location Date Time" }
    ];
    let currentEventIndex = 0;

    // Function to display current event
    const displayEvent = () => {
        const currentEvent = events[currentEventIndex];
        eventCardContainer.innerHTML = `
            <div class="event-card">
                <h2>${currentEvent.title}</h2>
                <p id="event-description" class="event-description" style="visibility: hidden;">${currentEvent.description}</p>
                <button id="more-info-button">More Info</button>
                
            </div>
        `;
    };

    // Initial display
    displayEvent();

    // Event listener for previous button
    prevEventButton.addEventListener('click', () => {
        currentEventIndex = (currentEventIndex - 1 + events.length) % events.length;
        displayEvent();
    });

    // Event listener for next button
    nextEventButton.addEventListener('click', () => {
        currentEventIndex = (currentEventIndex + 1) % events.length;
        displayEvent();
    });

    // Event listener for "More Info" button
    eventCardContainer.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'more-info-button') {
            const descriptionElement = document.getElementById('event-description');
            descriptionElement.style.display = 'block';
            descriptionElement.style.visibility = 'visible';
        }
    });
});

