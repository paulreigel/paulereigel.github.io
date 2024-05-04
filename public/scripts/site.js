
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


//EVENTS FETCH
(async () => {
    try {
        const response = await fetch('/api/Events');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayEventNames(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})()



document.addEventListener('DOMContentLoaded', async () => {
    const eventCardContainer = document.getElementById('event-card-container');
    const prevEventButton = document.getElementById('prev-event-button');
    const nextEventButton = document.getElementById('next-event-button');

    // Function to fetch events from the server
    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    };

    let events = await fetchEvents();
    let currentEventIndex = 0;

    // Function to display current event name
    const displayEventName = () => {
        const currentEvent = events[currentEventIndex];
        eventCardContainer.innerHTML = `
            <div class="event-card">
                <h2>${currentEvent.name}</h2>
                <button id="more-info-button">More Info</button>
            </div>
        `;
    };

    // Initial display
    displayEventName();

    // Event listener for previous button
    prevEventButton.addEventListener('click', async () => {
        currentEventIndex = (currentEventIndex - 1 + events.length) % events.length;
        events = await fetchEvents(); // Fetch updated events
        displayEventName();
    });

    // Event listener for next button
    nextEventButton.addEventListener('click', async () => {
        currentEventIndex = (currentEventIndex + 1) % events.length;
        events = await fetchEvents(); // Fetch updated events
        displayEventName();
    });

    // Event listener for "More Info" button
    eventCardContainer.addEventListener('click', async (event) => {
        if (event.target && event.target.id === 'more-info-button') {
            const currentEvent = events[currentEventIndex];
            const eventDetails = document.createElement('div');
            eventDetails.classList.add('event-details');
            eventDetails.innerHTML = `
                <p><strong>Location:</strong> ${currentEvent.location}</p>
                <p><strong>Date:</strong> ${currentEvent.date}</p>
                <p><strong>Time:</strong> ${currentEvent.time}</p>
                
            `;
            eventCardContainer.appendChild(eventDetails);
            event.target.disabled = true; // Disable the "More Info" button after clicked
        }
    });
});
//Events Admin
const displayEventNames = (events) => {
    const adminEventsDiv = document.querySelector('.admin-events');
    adminEventsDiv.innerHTML = '';

    events.forEach(event => {
        const eventContainer = document.createElement('div');
        eventContainer.classList.add('event-container');

        const eventName = document.createElement('span');
        eventName.textContent = event.name;
        eventContainer.appendChild(eventName);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        eventContainer.appendChild(checkbox);

        const eventDetails = document.createElement('div');
        eventDetails.classList.add('event-details');
        eventDetails.innerHTML = `
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Dates:</strong> ${event.dates}</p>
            <p><strong>Hours:</strong> ${event.hours}</p>
        `;
        eventDetails.style.display = 'none';
        eventContainer.appendChild(eventDetails);

        checkbox.addEventListener('change', () => {
            eventDetails.style.display = checkbox.checked ? 'block' : 'none';
        });

        adminEventsDiv.appendChild(eventContainer);
    });
};
/*const displayEventNames = (events) => {
    const adminEventsDiv = document.querySelector('.admin-events');
    adminEventsDiv.innerHTML = '';

    events.forEach(event => {
        const eventContainer = document.createElement('div');
        eventContainer.classList.add('event-container');

        const eventName = document.createElement('span');
        eventName.textContent = event.name;
        eventContainer.appendChild(eventName);

        const updateButton = createButton('Update');
        eventContainer.appendChild(updateButton);

        const deleteButton = createButton('Delete');
        eventContainer.appendChild(deleteButton);

        adminEventsDiv.appendChild(eventContainer);
    });
};

const createButton = (label) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add(label.toLowerCase());
    return button;
};*/