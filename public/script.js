const investorSignupForm = document.getElementById("investor-signup-form");

investorSignupForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form input values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email-lawyer").value;
    const password = document.getElementById("password-lawyer").value;
    const confirmPassword = document.getElementById("confirm-password-lawyer").value;

    // Validate password and confirm password
    if (password !== confirmPassword) {
        alert("Password and Confirm Password must match.");
        return;
    }

    // Prepare data for sending to server
    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    // Send form data to server
    fetch('/signup/investor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert("Investor signed up successfully");
        } else {
            alert("Error signing up investor");
        }
    })
    .catch(error => {
        console.error('Error signing up investor:', error);
        alert("Error signing up investor");
    });
});

const startupSignupForm = document.getElementById("startup-signup-form");
startupSignupForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form input values
    const firstName = document.getElementById("client-first-name").value;
    const lastName = document.getElementById("client-last-name").value;
    const email = document.getElementById("client-email").value;
    const password = document.getElementById("client-password").value;
    const confirmPassword = document.getElementById("client-confirm-password").value;

    // Validate password and confirm password
    if (password !== confirmPassword) {
        alert("Password and Confirm Password must match.");
        return;
    }

    // Prepare data for sending to server
    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    // Send form data to server
    fetch('/signup/startup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert("Startup signed up successfully");
        } else {
            alert("Error signing up startup");
        }
    })
    .catch(error => {
        console.error('Error signing up startup:', error);
        alert("Error signing up startup");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const switchLawyer = document.querySelector(".switch-lawyer input");
    const containerLawyer = document.getElementById("container-lawyer");
    const containerClient = document.getElementById("container-client");

    switchLawyer.addEventListener("change", function()
     {
        if (switchLawyer.checked)
         {
            hideContainer(containerLawyer, function()
             {
                showContainer(containerClient);
            });
        }
        else
        {
            hideContainer(containerClient, function()
             {
                showContainer(containerLawyer);
            });
        }
    });

    function hideContainer(container, callback)
     {
        container.style.opacity = "0";
        container.style.height = "0";

        setTimeout(function() {
            container.style.display = "none";
            callback();
        }, 100);
    }

    function showContainer(container) 
    {
        container.style.display = "grid";
        setTimeout(function() 
        {
            container.style.opacity = "1";
            container.style.height = "100%";
        }, 100);
    }
});

const investorLoginForm = document.getElementById("investor-login-form");
investorLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("login-email-lawyer").value;
    const password = document.getElementById("login-password-lawyer").value;

    const formData = { email, password };

    fetch('/login/investor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Redirect to home.html
        } else {
            alert('Invalid credentials. Please try again.'); // Show error message
        }
    })
    .catch(error => {
        console.error('Error logging in investor:', error);
        alert("Error logging in investor");
    });
});

const startupLoginForm = document.getElementById("startup-login-form");
startupLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("client-login-email").value;
    const password = document.getElementById("client-login-password").value;

    const formData = { email, password };

    fetch('/login/startup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Redirect to home.html
        } else {
            alert('Invalid credentials. Please try again.'); // Show error message
        }
    })
    .catch(error => {
        console.error('Error logging in startup:', error);
        alert("Error logging in startup");
    });
});

const switchClient = document.querySelector(".switch-client input");
const containerClient = document.getElementById("container-client");
const containerLawyer = document.getElementById("container-lawyer");

switchClient.addEventListener("change", function() 
{
    if (switchClient.checked) {
        hideContainer(containerClient, function() 
        {
            showContainer(containerLawyer);                
        });
    } else {
        hideContainer(containerLawyer, function() 
        {
            showContainer(containerClient);
        });
    }
});

function hideContainer(container, callback) 
{
    container.style.opacity = "0";
    container.style.height = "0";

    setTimeout(function() 
    {
        container.style.display = "none";
        callback();
    }, 100);
}

function showContainer(container) 
{
    container.style.display = "grid";
    setTimeout(function() {
        container.style.opacity = "1";
        container.style.height = "100%";
    }, 100);
}