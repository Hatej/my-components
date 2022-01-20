
class MyLoginForm extends HTMLElement {

    constructor() {
        super();
        this.action = null;
    }

    connectedCallback() {
        this.action = this.getAttribute('action');
        if(this.action !== null){
            const shadowLogin = this.attachShadow({ mode: 'open' });
            let loginForm = document.createElement('form');
            loginForm.setAttribute('method', 'post');
            let usernameField = document.createElement('input');
            usernameField.type = 'text';
            usernameField.name = 'username';
            usernameField.id = 'username';
            usernameField.required = true;
            usernameField.placeholder = 'Username';
            let passwordField = document.createElement('input');
            passwordField.type = 'password';
            passwordField.name = 'password';
            passwordField.id = 'password';
            passwordField.required = true;
            passwordField.placeholder = 'Password'
            let usernameLabel = document.createElement('label');
            usernameLabel.setAttribute('for', 'username');
            usernameLabel.innerText = "Username: ";
            let passwordLabel = document.createElement('label');
            passwordLabel.setAttribute('for', 'password');
            passwordLabel.innerText = "Password: ";
            let submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.innerText = "Submit";
            let formStyle;
            loginForm.appendChild(usernameLabel);
            loginForm.appendChild(usernameField);
            loginForm.appendChild(passwordLabel);
            loginForm.appendChild(passwordField);
            loginForm.appendChild(submitBtn);
            
            shadowLogin.appendChild(loginForm);
        } else {
            console.log("Need to define action!");
        }
    }

}

customElements.define( 'my-login-form', MyLoginForm);