function toggleForm() {
    const loginFormContainer = document.querySelector('.container').children[0];
    const signUpFormContainer = document.querySelector('.container').children[1];
    
    loginFormContainer.classList.toggle('hidden');
    signUpFormContainer.classList.toggle('hidden');
    
    const toggleBtn = document.querySelector('.toggle-btn');
    if (toggleBtn.textContent === 'Sign Up') {
      toggleBtn.textContent = 'Login';
    } else {
      toggleBtn.textContent = 'Sign Up';
    }
  }
  