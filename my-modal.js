var modalStyle = `
        .my-modal-container {
            display:none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.6);
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .my-modal-closer {
            display: none;
            position: absolute;
            top: 5%;
            right: 5%;
            background-color: #2a9fd6;
            color: white;
            cursor: pointer;
            border-style: solid;
            border-radius: 5px;
            border-color: black;
        }
`;

class MyModal extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        let modalSty = document.createElement('style');
        modalSty.innerText = modalStyle;
        let modalContainer = document.createElement('div');
        modalContainer.classList.add('my-modal-container');
        let modalCloser = document.createElement('button');
        modalCloser.innerText = "Close";
        modalCloser.classList.add('my-modal-closer');
        modalCloser.onclick = function(){modalContainer.style.display = 'none'};
        modalContainer.appendChild(modalCloser);
        this.appendChild(modalSty);
        let children = this.parentElement.children;
        let parent;
        for(let i = 0; i < children.length; i++){
            if(children[i].id === this.getAttribute('parent')){
                parent = children[i];
                parent.addEventListener('click', function(){
                    modalContainer.style.display = 'flex';
                    modalCloser.style.display = 'block';
                });
            }
        }
        let modalChildren = this.childNodes;
        let len = children.length;
        for(let i = 0; i < len; i++){
            modalContainer.appendChild(modalChildren[0]);
        }
        this.appendChild(modalContainer);
    }

}

customElements.define( 'my-modal', MyModal);