
function Validator(formSelector) {

    // get form group
    function getParentElement(element, selector) {
        let input = element;
        while (input.parentElement) {
            if (input.parentElement.classList.contains(selector)) {
                return input.parentElement;
            }
            input = input.parentElement;
        }
    }

    // get rules of form
    const formRules = {};

    // define rules of form
    const validateRules = {
        isRequired(field, value) {
            return value === '' ? `${field} is can't blank` : '';
        },
        isEmail(field, email) {
            return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) ? '' : `${field} is not valid`;
        },
        isPassword(field, password) {
            return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) ? '' : `${field} has eight characters or longer. And it must contain 1 lowercase character, 1 uppercase character, 1 number, and at least one special character in this set (!@#$%^&*)`;
        },
        isUrl(field, link) {
            return (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(link)) ? '' : `${field} is not valid`;
        },
        isPhoneNumber(field, phone) {
            return (/^0[0-9]{9,10}$/.test(phone)) ? '' : `Phone number is not valid`;
        },
        isBetween(min, max) {
            return (field, value) => {
                return value.length < min || length > max ? `${field} must be between ${min} and ${max} characters` : '';
            }
        },
        isMatch(field, value) {
            const password = formElement.querySelector('#password');
            return password.value === value ? '' : 'Confirm password not match';
        }
    };

    // Get form element
    const formElement = document.querySelector(formSelector);

    // Handling when 'formElement' exist
    if (formElement) {

        const inputs = formElement.querySelectorAll('[name][rules]');
        // put rules input to formRules
        for (let input of inputs) {

            const name = input.name;
            const rules = input.getAttribute('rules').split('|');
            rules.forEach(rule => {

                const containParameters = rule.includes(':');
                let ruleParameters;
                if (containParameters) {
                    ruleParameters = rule.split(':');
                    rule = ruleParameters[0];
                }

                let ruleFunc = validateRules[rule];
                if (containParameters) {
                    ruleFunc = ruleFunc(ruleParameters[1], ruleParameters[2]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[name].push(ruleFunc);
                } else {
                    formRules[name] = [ruleFunc];
                }

            });
            // listening events
            input.onblur = handleValidateOnBlur;
            input.oninput = handleValidateOnInput;
        }

        // function handle validate on blur
        function handleValidateOnBlur(e) {
            const name = e.currentTarget.name;
            const rules = formRules[name];
            let errorsMessages;

            rules.find((rule) => {
                errorsMessages = rule(name, e.currentTarget.value);
                return errorsMessages;
            });

            const formGroup = getParentElement(e.currentTarget, 'form-group');
            if (errorsMessages) {
                isError(formGroup, errorsMessages);
            } else {
                isSuccess(formGroup);
            }
            // handling if form group have label
            const iconCheck = formGroup.querySelector('.icon-check');
            if (iconCheck) {
                const label = formGroup.querySelector('.form-group-label');
                const heightLabel = label ? label.getBoundingClientRect().height + 8 : 0;
                iconCheck.style.top = `${15 + heightLabel}px`;
            }

            return !errorsMessages;
        }

        // function handle validate on input
        function handleValidateOnInput(e) {
            const formGroup = getParentElement(e.currentTarget, 'form-group');
            isInput(formGroup);
        }

        // input function
        function isInput(formGroup) {
            formGroup.classList.remove('error');
            formGroup.classList.remove('success');
            const nofitication = formGroup.querySelector('.nofitication');
            nofitication.style.height = '0';
            return true;
        }

        // succes function
        function isSuccess(formGroup) {
            // add success and remove class
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            const nofitication = formGroup.querySelector('.nofitication');
            nofitication.style.height = '0';
            return true;
        }

        // error function
        function isError(formGroup, nofi) {
            // remove success and add error class
            formGroup.classList.remove('success');
            formGroup.classList.add('error');

            // set hieght of nofitication message
            const nofitication = formGroup.querySelector('.nofitication');
            const span = nofitication.querySelector('span');
            span.innerText = nofi;
            nofitication.style.height = `${span.getBoundingClientRect().height + 12}px`;
            return false;
        }

        // handling submit form
        formElement.onsubmit = (e) => {
            let isValid = true;
            for (let input of inputs) {
                if (!handleValidateOnBlur({ currentTarget: input })) {
                    isValid = false;
                }
            }
            if (!isValid) {
                e.preventDefault();
            }
        }
    }

}