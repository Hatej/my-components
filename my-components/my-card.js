const template = document.createElement('template');
template.innerHTML = `
    <style>
        .my-card-container {
            width: var(--my-card-width);
            border-style: solid;
            border-width: thin;
            border-color: #2a9fd6;
            border-radius: 5px;
            padding: 8px;
        }
        .my-card-header {
            display: flex;
            border-bottom-style: solid;
            border-bottom-width: thin;
            border-bottom-color: black;
            margin-bottom: 10px;
        }
        .my-card-avatar {
            margin-bottom: 8px;
            margin-right: 8px;
        }
    </style>
    <div class="my-card-container">
        <div class="my-card-header">
            <div class="my-card-avatar">
                <slot name="card-avatar"><my-avatar><img src="images/test_image_6.jpg"/></my-avatar></slot>
            </div>
            <div class="my-card-titles">
                <p id="my-card-title">Need title</p>
                <p id="my-card-subtitle"></p>
            </div>
        </div>
        <div class="my-card-content">
            <slot name="content"></slot>
        </div>
    </div>
    
`;

class MyCard extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        let title = this.getAttribute('card-title');
        let subtitle = this.getAttribute('card-subtitle');
        if(title !== null){
            this.shadowRoot.getElementById('my-card-title').innerText = title;
        }
        if(subtitle !== null){
            this.shadowRoot.getElementById('my-card-subtitle').innerText = subtitle;
        }
    }

}

customElements.define( 'my-card', MyCard);