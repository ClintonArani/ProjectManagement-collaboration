interface UserDetails {
    user: {
        FirstName: string;
        LastName: string;
        user_image: string;
    };
}
 
const API_BASE_URL = 'http://localhost:5300/users';
 
// Function to fetch user details by user ID
async function fetchUserDetailsById(userId: string): Promise<UserDetails> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
 
    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }
 
    const userData: UserDetails = await response.json();
    return userData;
}
 
// Function to fetch user details using the token
function fetchUserDetails(token: string): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
        fetch(`${API_BASE_URL}/auth/check-details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch user details');
            }
            return res.json();
        })
        .then(userData => {
            const userId = userData.info.id;
            return fetchUserDetailsById(userId);
        })
        .then(userDetails => {
            resolve(userDetails);
        })
        .catch(error => {
            reject(error);
        });
    });
}
 
// Full function to retrieve user details including first name, last name, and user image
async function retrieveUserDetails(): Promise<{ firstName: string; lastName: string; userImage: string; }> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
 
        const userDetailsResponse = await fetchUserDetails(token);
 
        if (!userDetailsResponse || !userDetailsResponse.user) {
            throw new Error('User details not found in response');
        }
 
        const { FirstName, LastName, user_image } = userDetailsResponse.user;
 
        return { firstName: FirstName, lastName: LastName, userImage: user_image };
    } catch (error) {
        console.error('Error retrieving user details:', error);
        throw error;
    }
}
 
// Function to update the welcome message on the HTML page
async function updateUserWelcomeMessage() {
    try {
       
        const { firstName, lastName, userImage } = await retrieveUserDetails();
 
       
        const welcomeNameElement = document.getElementById('welcome-name');
        if (welcomeNameElement) {
            welcomeNameElement.textContent = `${firstName} ${lastName}`;
        } else {
            console.error('Element with id="welcome-name" not found');
        }
 
        // Update user image on the HTML page (assuming you have an element with id="profile-image")
        const userImageElement = document.getElementById('profile-image') as HTMLImageElement;
        if (userImageElement) {
            userImageElement.src = userImage;
        } else {
            console.error('Element with id="profile-image" not found');
        }
    } catch (error) {
        console.error('Error updating welcome message:', error);
    }
}
 
// Call updateUserWelcomeMessage when the DOM content is loaded
document.addEventListener('DOMContentLoaded', updateUserWelcomeMessage);
 
 
 
 
// Function to update the current date and time on the HTML page
function updateCurrentDateTime() {
    // Get the current date and time
    const currentDateTime = new Date();
 
    // Format the date (e.g., "22nd November 2024")
    const formattedDate = `${currentDateTime.getDate()}${getOrdinalSuffix(currentDateTime.getDate())} ${getMonthName(currentDateTime.getMonth())} ${currentDateTime.getFullYear()}`;
 
    // Format the time (e.g., "12:30:45")
    const formattedTime = `${addLeadingZero(currentDateTime.getHours())}:${addLeadingZero(currentDateTime.getMinutes())}:${addLeadingZero(currentDateTime.getSeconds())}`;
 
    // Update the element with id="current-date-time" in your HTML
    const currentDateTimeElement = document.getElementById('current-date-time');
    if (currentDateTimeElement) {
        currentDateTimeElement.innerHTML = `${formattedDate}<span class="currentTime" style="margin-left: 20px;">${formattedTime}</span>`;
    } else {
        console.error('Element with id="current-date-time" not found');
    }
}
 
// Helper function to get the ordinal suffix for a given number (e.g., 1st, 2nd, 3rd, ...)
function getOrdinalSuffix(number: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}
 
// Helper function to add leading zero for single-digit numbers
function addLeadingZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
}
 
// Helper function to get the month name for a given month index (0-based)
function getMonthName(monthIndex: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthIndex];
}
 
// Function to initialize the date and time update when the DOM content is loaded
function initializeDateTimeUpdate() {
    // Call updateCurrentDateTime immediately
    updateCurrentDateTime();
   
    // Update the time every second
    setInterval(updateCurrentDateTime, 1000);
}
 
// Call initializeDateTimeUpdate to start updating the date and time
initializeDateTimeUpdate();
 
 
 
//profile redirect
const profileArea = document.getElementById('profile-area') as HTMLElement
    if (profileArea) {
        profileArea.addEventListener('click', () => {
            window.location.href = 'profileImage.html';
        });
    }