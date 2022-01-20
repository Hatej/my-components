const styleAccordion = `
    <style>
        .my-accordion-item-button {
            display: block;
            width: 100%;
            text-align: center;
            border: none;
            background-color: white;
            font-size: 20px;
            margin-bottom: 5px;

        }
        .my-accordion-item-button:hover{
            background-color: lightgray;
        }
        .my-accordion-item-desc {
            margin-left: 20px;
            display: flex;
            justify-content: var(--justify-accordion-desc);
            align-items: var(--align-accordion-desc);
            flex-direction: var(--accordion-flex-direction);
        }
        .my-accordion-item-desc.hidden {
            display: none;
        }
        [aria-expanded='true'] {
            border-radius: 5px;
            border-style: solid;
            border-color: black;
        }
    </style>
`;

class MyAccordion extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = styleAccordion;
        let children = this.childNodes;
        let elements = [];
        for(let i = 0; i < children.length; i++){
            if(children[i].nodeType === 1){
                elements.push(children[i]);
            }
        }
        for (let i = 0; i < elements.length; i += 2) {
            let button = elements[i];
            button.classList.add("my-accordion-item-button");
            button.setAttribute('aria-expanded', false);
            button.addEventListener('click', e => {
                let targetDesc = this.shadowRoot.getElementById("my-accordion-item-" + i);
                let isHidden = targetDesc.classList.contains('hidden');
                let buttons = this.shadowRoot.querySelectorAll('.my-accordion-item-button');
                for(let k = 0; k < buttons.length; k++){
                    buttons[k].setAttribute('aria-expanded', 'false');
                }
                for(let j = 0; j < elements.length; j += 2){
                    let notSelectedDesc = this.shadowRoot.getElementById("my-accordion-item-" + j);
                    notSelectedDesc.classList.add('hidden');
                }
                if(isHidden){
                    targetDesc.classList.remove('hidden');
                    e.target.setAttribute('aria-expanded', 'true');
                }
            });
            let description = elements[i + 1];
            description.id = "my-accordion-item-" + i;
            description.classList.add("my-accordion-item-desc");
            description.classList.add('hidden');
            if(this.getAttribute('selected') - 1 === i / 2){
                description.hidden = false;
                button.setAttribute('aria-expanded', 'true');
            }
            shadow.appendChild(button);
            shadow.appendChild(description);
        }
    }

}

customElements.define( 'my-accordion', MyAccordion);