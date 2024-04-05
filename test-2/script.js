function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toggleCheckbox = document.getElementById('toggle-form');
  
    if (toggleCheckbox.checked) {
      loginForm.classList.add('hidden');
      signupForm.classList.remove('hidden');
    } else {
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    }
  }
  