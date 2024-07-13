const emailInput = document.querySelector('#email');
const emailErrorMessage = document.querySelector('#email + p');

function validateEmailInput() {
  if (emailInput.validity.valueMissing) {
    emailInput.setCustomValidity('Please fill in this field');
    emailErrorMessage.textContent = 'Please fill in this field';
    return false;
  }

  if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity('This must be an email');
    emailErrorMessage.textContent = 'This must be an email';
    return false;
  }

  // if all is well show it on input not on blur
  emailInput.setCustomValidity('');
  emailErrorMessage.textContent = '';
  return true;
}

function reportValidityEmailInput() {
  if (emailInput.validity.valueMissing) {
    emailErrorMessage.textContent = 'Please fill in this field';
    return;
  }

  if (emailInput.validity.typeMismatch) {
    emailErrorMessage.textContent = 'This must be an email';
    return;
  }
}

emailInput.addEventListener('blur', () => {
  validateEmailInput();
  reportValidityEmailInput();
});

const zipInput = document.querySelector('#zip');
const zipErrorMessage = document.querySelector('#zip + p');

function validateZipInput() {
  if (zipInput.validity.valueMissing) {
    zipInput.setCustomValidity('Please fill in this field');
    return false;
  }

  regex = /^\d{4}(?!.+)/;

  if (!regex.test(zipInput.value)) {
    zipInput.setCustomValidity('The zip code has to be exactly 4 digits');
    return false;
  }

  zipInput.setCustomValidity('');
  zipErrorMessage.textContent = '';
  return true;
}

function reportValidityZipInput() {
  if (zipInput.validity.valueMissing) {
    zipErrorMessage.textContent = 'Please fill in this field';
    return;
  }

  regex = /^\d{4}(?!.+)/;

  if (!regex.test(zipInput.value)) {
    zipErrorMessage.textContent = 'The zip code has to be exactly 4 digits';
    return;
  }
}

zipInput.addEventListener('input', () => {
  validateZipInput();
});

zipInput.addEventListener('blur', () => {
  reportValidityZipInput();
});

const passwordInput = document.querySelector('#password');
const passwordErrorMessage = document.querySelector('#password + p');

function validatePasswordInput() {
  if (passwordInput.validity.valueMissing) {
    passwordInput.setCustomValidity('Please fill in this field');
    return false;
  }

  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!regex.test(passwordInput.value)) {
    passwordInput.setCustomValidity('The zip code has to be exactly 4 digits');
    return false;
  }

  passwordInput.setCustomValidity('');
  passwordInput.classList.remove('message-showing');
  passwordErrorMessage.textContent = '';
  return true;
}

function reportValidityPasswordInput() {
  if (passwordInput.validity.valueMissing) {
    passwordErrorMessage.textContent = 'Please fill in this field';
    return;
  }

  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!regex.test(passwordInput.value)) {
    passwordErrorMessage.textContent =
      'The password must have at least 8 characters with at least 1 digit and 1 letter';
    passwordInput.classList.add('message-showing');
    return;
  }
}

passwordInput.addEventListener('input', () => {
  validatePasswordInput();
});

passwordInput.addEventListener('blur', () => {
  reportValidityPasswordInput();
});

const confirmPasswordInput = document.querySelector('#password-confirm');
const confirmErrorMessage = document.querySelector('#password-confirm + p');

function validateConfirmPasswordInput() {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordInput.setCustomValidity('Passwords do not match');
    return false;
  }

  if (confirmPasswordInput.validity.valueMissing) {
    confirmPasswordInput.setCustomValidity('Please fill in the password');
    return false;
  }

  const lastFormControl = document.querySelector('.last-form-control');
  lastFormControl.classList.remove('message-showing');

  confirmPasswordInput.setCustomValidity('');
  confirmErrorMessage.textContent = '';
  return true;
}

function reportValidityConfirmInput() {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmErrorMessage.textContent = confirmPasswordInput.validationMessage;
  }

  if (confirmPasswordInput.validity.valueMissing) {
    confirmErrorMessage.textContent = confirmPasswordInput.validationMessage;
    return;
  }
}

confirmPasswordInput.addEventListener('input', () => {
  validateConfirmPasswordInput();
});

confirmPasswordInput.addEventListener('blur', () => {
  reportValidityConfirmInput();
});

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('mousedown', (e) => {
  if (
    !(
      validateEmailInput() &&
      validateZipInput() &&
      validatePasswordInput() &&
      validateConfirmPasswordInput()
    )
  ) {
    console.log('errors and down');

    // Without setTimeout blur triggers after mousedown and the condition does not work
    setTimeout(() => {
      const formMessage = document.querySelector('.form-message');
      formMessage.textContent = 'Please fill in the form correctly';
      formMessage.classList.add('failure');

      const lastFormControl = document.querySelector('.last-form-control');
      const lastErrorMessage = lastFormControl.querySelector('.error-message');
      if (lastErrorMessage.textContent) {
        lastFormControl.classList.add('message-showing');
      } else {
        lastFormControl.classList.remove('message-showing');
      }
    }, 1);
  }
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (
    validateEmailInput() &&
    validateZipInput() &&
    validatePasswordInput() &&
    validateConfirmPasswordInput()
  ) {
    const formMessage = document.querySelector('.form-message');
    formMessage.textContent = 'High five bro';
    formMessage.classList.remove('failure');
    formMessage.classList.add('success');

    const lastFormControl = document.querySelector('.last-form-control');
    lastFormControl.classList.remove('message-showing');
    return;
  }
});
