function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];
    this.inputNode = input;
    this.registerListener();
}

CustomValidation.prototype = {
    addInvalidity: function (message) {
        this.invalidities.push(message);
    },
    getInvalidities: function () {
        return this.invalidities.join('. \n');
    },
    checkValidity: function (input) {
        for (let i = 0; i < this.validityChecks.length; i++) {
            let isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }
            let requirementElement = this.validityChecks[i].element;
            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.remove('invalid');
                    requirementElement.classList.add('valid');
                }
            }
        }
    },
    checkInput: function () {
        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);
        if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
            this.inputNode.setCustomValidity('');
        } else {
            let message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
        }
    },
    registerListener: function () {
        let CustomValidation = this;
        this.inputNode.addEventListener('keyup', function () {
            CustomValidation.checkInput();
        });
    }
};

let usernameValidityChecks = [{
    isInvalid: function (input) {
        return input.value.length < 3;
    },
    invalidityMessage: 'Это поле должно содержать не менее 3 символов',
    element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)')
},
    {
        isInvalid: function (input) {
            let illegalCharacters = input.value.match(/[^а-яё][^a-z]/gi);
            return !!illegalCharacters;
        },
        invalidityMessage: 'Поле может содержать только буквы',
        element: document.querySelector('label[for="username"] .input-requirements li:nth-child(2)')
    }
];

let phoneValidityChecks = [{
    isInvalid: function (input) {
        return input.value.length < 15 | input.value.length > 15;
    },
    element: document.querySelector('label[for="phone"] .input-requirements li:nth-child(1)')
},
    {
        isInvalid: function (input) {
            return !input.value.match(/^\+7\([0-9]{3}\)[0-9]{3}[-][0-9]{4}$/);
        },
        invalidityMessage: 'Введите телефон в формате +7(123)456-7890',
        element: document.querySelector('label[for="phone"] .input-requirements li:nth-child(2)')
    },
];

let emailValidityChecks = [{
    isInvalid: function (input) {
        return input.value.length < 15 | input.value.length > 15;
    },
    element: document.querySelector('label[for="email"] .input-requirements li:nth-child(1)')
},
    {
        isInvalid: function (input) {
            return !input.value.match(/^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/);
        },
        invalidityMessage: 'Введиту e-mail  в формате mymail@mail.ru',
        element: document.querySelector('label[for="email"] .input-requirements li:nth-child(2)')
    },
];
let usernameInput = document.getElementById('username');
let phoneInput = document.getElementById('phone');
let emailInput = document.getElementById('email');

usernameInput.CustomValidation = new CustomValidation(usernameInput);
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

phoneInput.CustomValidation = new CustomValidation(phoneInput);
phoneInput.CustomValidation.validityChecks = phoneValidityChecks;

emailInput.CustomValidation = new CustomValidation(emailInput);
emailInput.CustomValidation.validityChecks = emailValidityChecks;

let inputs = document.querySelectorAll('input:not([type="submit"])');
let submit = document.querySelector('input[type="submit"');
let form = document.getElementById('registration');

function validate() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
    }
}

submit.addEventListener('click', validate);
form.addEventListener('submit', validate);