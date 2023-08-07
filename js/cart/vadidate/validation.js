function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    const selectorRules = {}
    function validate(inputElement, rule) {
        const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
        let errorMessage;
        const rules = selectorRules[rule.selector];
        for (let i = 0; i < rules.length; ++i) {
            if (inputElement.type) {
                errorMessage = rules[i](inputElement.value)
            }
            if (errorMessage) break
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            errorElement.classList.add('active')
        }
        else {
            errorElement.innerText = '';
            errorElement.classList.remove('active')

        }
        return !errorMessage
    }
    const formElement = document.querySelector(options.form)
    if (formElement) {
        //submit
        formElement.onsubmit = function (e) {
            e.preventDefault();
            let isFormValid = true;
            options.rules.forEach(function (rule) {
                const inputElement = formElement.querySelector(rule.selector)
                const isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    const enableInputs = formElement.querySelectorAll('[name]')
                    const orderInfor = {
                        fullName: enableInputs[0].value + " " + enableInputs[1].value,
                        email: enableInputs[2].value,
                        tel: enableInputs[3].value,
                        address: enableInputs[7].value + " " + enableInputs[6].value + " " + enableInputs[5].value + " " + enableInputs[4].value,
                        message: enableInputs[8].value
                    }

                    options.onSubmit(orderInfor);
                }
            }
        }
        //check rules 
        options.rules.forEach(function (rule) {

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);

            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            const inputElements = formElement.querySelectorAll(rule.selector)

            Array.from(inputElements).forEach(function (inputElement) {

                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                inputElement.oninput = function () {
                    const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
                    errorElement.innerText = '';
                    errorElement.classList.remove('active')
                }
            })
        })
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isName = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            const regex = /^[^\d\s!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]*$/
            return regex.test(value) ? undefined : message || 'Vui lòng không nhập chữ số và kí tự đặc biệt vào trường này!'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    }
}

Validator.isTel = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            const phoneRegex = /^(0[2-9]|84[2-9])(\d{8}|\d{9})$/;
            return phoneRegex.test(value) ? undefined : message || 'Vui lòng nhập đúng format số điện thoại'
        }
    }
}






