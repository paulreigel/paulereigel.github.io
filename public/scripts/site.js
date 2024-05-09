
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // On load of the MENU page it calls the getMenu function to load all the menu item data
// document.addEventListener('DOMContentLoaded', async () => {
//     await createMenuCards()
//     await getMenu()
// })

// // Creates menu item cards dynamically on how many menu items are in the mongodb
// const createMenuCards = async () => {
//     const response = await fetch('/api/menu')
//     const menuItems = await response.json()
//     const menuContainer = document.querySelectorAll('.menu-container')
    
//     menuItems.forEach(async (menuItem, index) => {
//         menuContainer[0].appendChild(document.createElement('div')).className = 'menu-item'     
//         const menuItemCard = document.querySelectorAll('.menu-item')
//         menuItemCard[index].appendChild(document.createElement('h2'))
//         menuItemCard[index].appendChild(document.createElement('p'))
//         menuItemCard[index].appendChild(document.createElement('p'))
//         menuItemCard[index].appendChild(document.createElement('img'))
//     })  
// }

// // Fetch menu item data from mongodb and inputs data as text content to it's specific tags
// const getMenu = async () => {
//     const response = await fetch('/api/menu')
//     const menuItems = await response.json()
    
//     menuItems.forEach(async (menuItem, index) => {
//         const currentItem = document.querySelectorAll('.menu-item')[index]
//         currentItem.querySelector('h2').textContent = menuItem.Name
//         currentItem.querySelectorAll('p')[0].textContent = menuItem.Description
//         currentItem.querySelectorAll('p')[1].textContent = menuItem.Price
//         currentItem.querySelectorAll('img')[0].src = menuItem.ImgURL
//         currentItem.querySelectorAll('img')[0].alt = menuItem.Name
//     })
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', async () => {
    const menuCardContainer = document.getElementById('menu-card-container');
    const prevMenuButton = document.getElementById('prev-menu-button');
    const nextMenuButton = document.getElementById('next-menu-button');


// Function to fetch events from the server
const getMenu = async () => {
    try {
        const response = await fetch('/api/menu')
        if (!response.ok) {
            throw new Error('Failed to fetch menu')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching menu:', error)
        return [];
    }
}



let items = await getMenu()
let currentMenuIndex = 0

// Function to display current menu name
const displayMenuItem = () => {
    const currentMenu = items[currentMenuIndex]
    menuCardContainer.innerHTML = `
        <div class="menu-card">
            <h2>${currentMenu.Name}</h2>
            <img src=${currentMenu.ImgURL}>
            <p><strong>Description:</strong> ${currentMenu.Description}</p>
            <p><strong>Price:</strong> ${currentMenu.Price}</p>
        </div>`
}

// Initial display
displayMenuItem()

// Event listener for previous button
prevMenuButton.addEventListener('click', async () => {
    currentMenuIndex = (currentMenuIndex - 1 + items.length) % items.length
    items = await getMenu() // Fetch updated menu
    displayMenuItem()
})

// Event listener for next button
nextMenuButton.addEventListener('click', async () => {
    currentMenuIndex = (currentMenuIndex + 1) % items.length;
    items = await getMenu() // Fetch updated events
    displayMenuItem()
})


})




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////
//Events Admin GET display GOOD CODE
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

        const checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = 'More info';
        eventContainer.appendChild(checkboxLabel);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        eventContainer.appendChild(deleteButton);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('update-button');
        eventContainer.appendChild(updateButton);

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

        // Event listener for update button
        /*updateButton.addEventListener('click', async () => {
            try {
                // Fetch event data from the API
                const response = await fetch(`/api/events/${event._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
        
                // Populate the update form with the event data
                const updateForm = document.getElementById('update-event-form');
                updateForm.querySelector('event-name').value = eventData.name;
                updateForm.querySelector('event-location').value = eventData.location;
                updateForm.querySelector('event-dates').value = eventData.dates;
                updateForm.querySelector('#event-hours').value = eventData.hours;
            } catch (error) {
                console.error('Error updating event:', error);
            }
        });*/

        //////////////
        deleteButton.addEventListener('click', async () => {
            try {
                // Send DELETE request to API endpoint
                const response = await fetch(`/api/events/${event._id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove the event container from the DOM
                    eventContainer.remove();
                } else {
                    console.error('Failed to delete event');
                }
            } catch (error) {
                console.error('Error deleting event:', error);
            }
            // Event listener for update button
        updateButton.addEventListener('click', () => {
            // Handle update button click event
            // You can add your update logic here
            console.log('Update button clicked for event:', event);
        });
        }); // <-- Added closing bracket for deleteButton.addEventListener
        adminEventsDiv.appendChild(eventContainer);
    });
};////below is update in div GOOD CODE ABOVE



      
//////////////////////////////////////////////////////////////////////////////
//ADMIN MENU GET Display

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

        const checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = 'More Info'; // Customize label text as needed
        menuItemContainer.appendChild(checkboxLabel);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        menuItemContainer.appendChild(deleteButton);

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
        ////////////////////////DELETE

       deleteButton.addEventListener('click', async () => {
            try {
                // Send DELETE request to API endpoint
                const response = await fetch(`/api/menu/${menuItem._id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove the menu item container from the DOM
                    menuItemContainer.remove();
                } else {
                    console.error('Failed to delete menu item');
                }
            } catch (error) {
                console.error('Error deleting menu item:', error);
            }
        });

        adminMenuDiv.appendChild(menuItemContainer);
    });
};
///////////////////////////////////////////////////////////////////////
//ADD EVENTS
const eventForm = document.getElementById('event-form');

eventForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Get form input values
    const name = document.getElementById('event-name').value;
    const location = document.getElementById('event-location').value;
    const dates = document.getElementById('event-dates').value;
    const hours = document.getElementById('event-hours').value;
    
    // Create data object
    const eventData = { name, location, dates, hours };
    
    try {
        // Send POST request to API endpoint
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        
        // Check if request was successful
        if (response.ok) {
            const newEvent = await response.json();
            window.location.reload();//refresh the page after event is added
            console.log('New event added:', newEvent);
            
            // Clear form inputs
            eventForm.reset();
            
        } else {
            console.error('Failed to add new event');
            //  handle error and display an error message
        }
    } catch (error) {
        console.error('Error adding new event:', error);
        
    }
});
/////////////////////////////////////////////////////////////
//ADD MENU
const menuForm = document.getElementById('menu-form');

menuForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Get form input values
    const Name = document.getElementById('menu-name').value;
    const Description = document.getElementById('menu-description').value;
    const Price = document.getElementById('menu-price').value;
    const ImgURL = document.getElementById('menu-ImgUrl').value;
    
    // Create data object
    const menuItemData = { Name, Description, Price, ImgURL };
    
    try {
        // Send POST request to API endpoint
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menuItemData)
        });
        
        // Check if request was successful
        if (response.ok) {
            const newMenuItem = await response.json();
            window.location.reload();//refresh the page after event is added
            console.log('New menu item added:', newMenuItem);
            
            // Optionally, display a success message or update the UI
            
            // Clear form inputs
            menuForm.reset();
            
        } else {
            console.error('Failed to add new menu item');
            // Optionally, handle error and display an error message
        }
    } catch (error) {
        console.error('Error adding new menu item:', error);
        // Optionally, handle error and display an error message
    }
})