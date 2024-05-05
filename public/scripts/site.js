
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


// On load of the MENU page it calls the getMenu function to load all the menu item data
document.addEventListener('DOMContentLoaded', async () => {
    await getMenu()
})

// Fetch menu item data from mongodb and inputs data as text content to it's specific tags
const getMenu = async () => {
    const response = await fetch('/api/menu')
    const menuItems = await response.json()
    
    menuItems.forEach((menuItem, index) => {
        const currentItem = document.querySelectorAll('.menu-item')[index]
        currentItem.querySelector('h2').textContent = menuItem.Name
        currentItem.querySelectorAll('p')[0].textContent = menuItem.Description
        currentItem.querySelectorAll('p')[1].textContent = menuItem.Price
        currentItem.querySelectorAll('img')[0].src = menuItem.ImgURL
        currentItem.querySelectorAll('img')[0].alt = menuItem.Name
    })
}




//EVENTS FETCH
(async () => {
    try {
        const response = await fetch('/api/events');
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
                <p><strong>Date:</strong> ${currentEvent.dates}</p>
                <p><strong>Time:</strong> ${currentEvent.hours}</p>
                
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
//ADMIN MENU

(async () => {
    try {
        const response = await fetch('/api/menu');
        const menuItems = await response.json();
        displayMenuItems(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
    }
})();

const displayMenuItems = (menuItems) => {
    const adminMenuDiv = document.querySelector('.admin-menu');
    adminMenuDiv.innerHTML = '';

    menuItems.forEach(menuItem => {
        const menuItemContainer = document.createElement('div');
        menuItemContainer.classList.add('menu-item-container');

        const menuItemName = document.createElement('span');
        menuItemName.textContent = menuItem.Name;
        menuItemContainer.appendChild(menuItemName);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        menuItemContainer.appendChild(checkbox);

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('menu-item-details');
        itemDetails.innerHTML = `
            <p><strong>Description:</strong> ${menuItem.Description}</p>
            <p><strong>Price:</strong> ${menuItem.Price}</p>
            <img src="${menuItem.ImgURL}" alt="${menuItem.Name}" width="200">
        `;
        itemDetails.style.display = 'none';
        menuItemContainer.appendChild(itemDetails);

        checkbox.addEventListener('change', () => {
            itemDetails.style.display = checkbox.checked ? 'block' : 'none';
        });

        adminMenuDiv.appendChild(menuItemContainer);
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