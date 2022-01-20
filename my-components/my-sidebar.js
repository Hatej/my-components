const sidebarStyle = document.createElement('template');
sidebarStyle.innerHTML = `
    <style>
        .my-sidebar-icon {
            cursor: pointer;
            position: absolute;
            top: 50%;
            left: 1%;
        }
        .my-sidebar-icon > div {
            width: 30px;
            height: 5px;
            background-color: black;
            margin: 6px 0;
        }
        .my-sidebar-container {
            width: 10%;
            display: flex;
            flex-direction: column;
        }
        .my-sidebar-close {
            display: none;
            cursor: pointer;
            text-align: center;
        }
        .my-sidebar-links {
            display: none;
            color: black;
            list-style-type: none;
        }
        .my-sidebar-link a {
            display: block;
            color: black;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }
    </style>
    
`;

class MySidebar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(sidebarStyle.content.cloneNode(true));
        let sidebarContainer = document.createElement('div');
        sidebarContainer.classList.add('my-sidebar-container');
        let menuButton = document.createElement('div');
        menuButton.classList.add('my-sidebar-icon');
        let closeMenuBtn = document.createElement('a');
        closeMenuBtn.classList.add('my-sidebar-close');
        closeMenuBtn.innerText = "Close";
        let tabs = this.querySelectorAll('my-tab'); 
        let linkContainer = document.createElement('ul');
        linkContainer.classList.add('my-sidebar-links');
        for(let i = 0; i < tabs.length; i++){
            let oneLink = document.createElement('li');
            oneLink.innerHTML = tabs[i].innerHTML;
            oneLink.classList.add('my-sidebar-link');
            linkContainer.appendChild(oneLink);
        }
        menuButton.addEventListener('click', e => {
            let main = null;
            let parentChildren = this.parentElement.children;
            for(let i = 0; i < parentChildren.length; i++){
                if(parentChildren[i].classList.contains('main')){
                    main = parentChildren[i];
                    break;
                }
            }
            if(main !== null){
                main.style.marginLeft = "10%";
                sidebarContainer.style.width = "10%";
                sidebarContainer.style.display = "block";
                menuButton.style.display = "none";
                linkContainer.style.display = "block";
                closeMenuBtn.style.display = "block";
            }
        })
        for(let i = 0; i < 3; i++){
            menuButton.appendChild(document.createElement('div'));
        }
        closeMenuBtn.addEventListener('click', e => {
            let main = null;
            let parentChildren = this.parentElement.children;
            for(let i = 0; i < parentChildren.length; i++){
                if(parentChildren[i].classList.contains('main')){
                    main = parentChildren[i];
                    break;
                }
            }
            if(main !== null){
                main.style.marginLeft = "0%";
                sidebarContainer.style.display = "none";
                menuButton.style.display = "block";
                closeMenuBtn.style.display = "none";
                linkContainer.style.display = "none";
            }
        });
        sidebarContainer.appendChild(closeMenuBtn);
        sidebarContainer.appendChild(linkContainer);
        this.shadowRoot.appendChild(sidebarContainer);
        this.shadowRoot.appendChild(menuButton);
    }

}

customElements.define( 'my-sidebar', MySidebar);