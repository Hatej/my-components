const styleTabs = `
    <style>
        ul {
            margin: 0;
            padding: 0;
            overflow: hidden;
            list-style-type: none;
            background-color: #333;
        }
        li {
            cursor: pointer;
        }
        li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }
        li a:hover {
            background-color: #111;
            color: #2a9fd6;
        }
        .active {
            background-color: #2a9fd6;
        }
        .right {
            float: right;
        }
        .left {
            float: left;
        }
        .my-tab-content {
            width: var(--my-tab-width);
            padding: 5px;
            margin: auto;
        }
    </style>
`;

class MyTabs extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = styleTabs;
        let tabContainer = document.createElement('div');
        tabContainer.classList.add('my-tabs-container');
        let tabTexts = document.createElement('ul');
        if(this.classList.contains('fixed-top')){
            tabTexts.style.position = 'fixed';
            tabTexts.style.top = '0';
            tabTexts.style.width = '100%';
        } else if(this.classList.contains('fixed-bottom')){
            tabTexts.style.position = 'fixed';
            tabTexts.style.bottom = '0';
            tabTexts.style.width = '100%';
        }
        let tabContent = document.createElement('div');
        let tabs = this.querySelectorAll('my-tab');
        for(let i = 0; i < tabs.length; i++){
            let currTab = tabs[i];
            if(currTab.getAttribute('tab-type') === "link"){
                let tab = document.createElement('li');
                let tabLink = document.createElement('a');
                tabLink.href = currTab.getAttribute('tab-to');
                let tabText = currTab.getAttribute('tab-text');
                if(tabText === null){
                    tabText = "Umetnite naziv";
                }
                tabLink.innerText = tabText;
                tab.appendChild(tabLink);
                tab.classList.add('my-tab-link');
                if(currTab.classList.contains('right')){
                    tab.classList.add('right');
                } else {
                    tab.classList.add('left');
                }
                tabTexts.appendChild(tab);
            } else {
                let currTabChildren = currTab.children;   
                let tab = document.createElement('li');
                let tabLink = document.createElement('a');
                tabLink.addEventListener('click', e => {
                    let allContent = this.shadowRoot.querySelectorAll('.my-tab-content');
                    for(let k = 0; k < allContent.length; k++){
                        allContent[k].hidden = true;
                    }
                    let activeTab = this.shadowRoot.querySelector('.active');
                    if(activeTab !== null){
                        activeTab.classList.remove('active');
                    }
                    e.target.classList.add('active');
                    let targetContent = this.shadowRoot.getElementById('my-tab-' + (i + 1));
                    targetContent.hidden = false;
                });
                let tabText = currTab.getAttribute('tab-text');
                if(tabText === null){
                    tabText = "Umetnite naziv";
                }
                tabLink.innerText = tabText;
                tab.appendChild(tabLink);
                tab.classList.add('my-tab-link');
                if(currTab.classList.contains('right')){
                    tab.classList.add('right');
                } else {
                    tab.classList.add('left');
                }
                let content = document.createElement('div');
                content.classList.add('my-tab-content');
                content.id = 'my-tab-' + (i + 1);
                content.hidden = true;
                if(this.getAttribute('selected') - 1 === i / 2){
                    content.hidden = false;
                    tab.classList.add('active');
                }
                tabTexts.appendChild(tab);
                for(let j = 0; j < currTabChildren.length; j++){
                    content.appendChild(currTabChildren[j]);
                }
                tabContent.appendChild(content);
            }    
        }
        tabContainer.appendChild(tabTexts);
        tabContainer.appendChild(tabContent);
        shadow.appendChild(tabContainer);
    }

}

customElements.define( 'my-tabs', MyTabs);