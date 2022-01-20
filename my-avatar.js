
const avatarStyle = `
    <style>
        .avatar {
            vertical-align: middle;
            object-fit: cover;
        }
    </style>
`;

class MyAvatar extends HTMLElement {

    constructor() {
        super();
        this.size = "M";
        this.shape = "round";
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = avatarStyle;
        let newSize = this.getAttribute('size');
        if(newSize){
           if(newSize === 'XS' || newSize === 'S' ||
           newSize === 'M' || newSize === 'L' || newSize === 'XL'){
               this.size = newSize;
           }
        }
        let newShape = this.getAttribute('shape');
        if(newShape){
            if(newShape === 'round' || newShape === 'square' || newShape === 'square-rounded'){
                this.shape = newShape;
            }
        }
        let avatarImg = this.querySelector('img');
        avatarImg.classList.add('avatar');
        let imgS = 0;
        switch(this.size){
            case "XS":
                imgS = 30;
                break;
            case "S":
                imgS = 50;
                break;
            case "M":
                imgS = 70;
                break;
            case "L":
                imgS = 90;
                break;
            case "XL":
                imgS = 110;
                break;
            default:
                break;
        }
        let imgR = 0;
        switch(this.shape){
            case "round":
                imgR = 50;
                break;
            case "square":
                break;
            case "square-rounded":
                imgR = 10;
                break;
            default:
                break;
        }
        avatarImg.style.width = avatarImg.style.height = imgS+"px";
        avatarImg.style.borderRadius = imgR + "%";
        this.shadowRoot.appendChild(avatarImg);
    }

}

customElements.define( 'my-avatar', MyAvatar);