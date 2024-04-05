function validateAndSubmit() {
    // Get references to all textarea elements
    var textareas = document.querySelectorAll('textarea');

    // Get reference to the "To be patented" checkbox
    var patentCheck = document.getElementById('to_be_patented');

    // Check if the "To be patented" option is selected
    if (patentCheck.checked) {
        // Display a message if it's selected
        alert("This technology is not yet patented. Please consider seeking patent protection.");
        return; // Exit the function without further validation
    }

    // Loop through each textarea except for "Name" and "Team" sections
    for (var i = 1; i < textareas.length - 1; i++) {
        var textarea = textareas[i];
        var value = textarea.value.trim();

        // Check if textarea value is empty or less than 50 characters
        if (value === '' || value.length < 50) {
            alert('Please fill out all sections with at least 50 characters.');
            return; // Exit the function if validation fails
        }
    }

    // If all sections except for "Name" and "Team" are filled with at least 50 characters, submit the pitch
    submitPitch();
}
