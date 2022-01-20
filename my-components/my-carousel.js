const styleCarousel = `
    <style>
        .my-carousel-img {
            display: none;
            height: 400px;
            width: 900px;
            position: relative;
            overflow: hidden;
            width: 100%;
            object-fit: cover;
        }
        .my-carousel-img.active {
            display: block;
        }
        .my-carousel-button {
            position: absolute;
            background-color: rgba(246, 243, 243, 0.2);
            border: solid;
            border-radius: 5px;
            border-color: rgba(246, 243, 243, 0.2);
            font-size: 20px;
            font-weight: bold;
        }
        .my-carousel-button:hover {
            background-color: rgba(246, 243, 243, 0.8);
        }
        .my-carousel-button.next{
            right: 5px; 
            top: 50%;
        }
        .my-carousel-button.previous {
            left: 5px; 
            top: 50%;
        }
        .my-carousel-container {
            position: relative;
            overflow:hidden;
        }
    </style>
`;

class MyCarousel extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = styleCarousel;
        let carouselContainer = document.createElement('div');
        carouselContainer.classList.add('my-carousel-container');
        let images = this.querySelectorAll('img');
        for(let i = 0; i < images.length; i++){
            let image = images[i];
            image.classList.add("my-carousel-img");
            image.id = "my-carousel-img-" + (i + 1);
            carouselContainer.appendChild(image);
        }
        let prevButton = document.createElement('button');
        prevButton.innerText = "<<";
        prevButton.classList.add('my-carousel-button');
        prevButton.classList.add('previous');
        prevButton.addEventListener('click', e => {
            let currentImg = this.shadowRoot.querySelector('.active');
            currentImg.classList.remove('active');
            let nextImg;
            if(currentImg.getAttribute('id') === "my-carousel-img-1"){
                nextImg = images[images.length - 1];
            } else {
                nextImg = images[currentImg.id.slice(-1) - 2];
            }
            nextImg.classList.add('active');
        });
        let nextButton = document.createElement('button');
        nextButton.addEventListener('click', e => {
            let currentImg = this.shadowRoot.querySelector('.active');
            currentImg.classList.remove('active');
            let nextImg;
            if(currentImg.getAttribute('id') === "my-carousel-img-" + images.length){
                nextImg = images[0];
            } else {
                nextImg = images[currentImg.id.slice(-1)];
            }
            nextImg.classList.add('active');
        });
        nextButton.innerText = ">>";
        nextButton.classList.add('my-carousel-button');
        nextButton.classList.add('next');
        images[0].classList.add("active");
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
        shadow.appendChild(carouselContainer);
    }

    disconnectedCallback(){

    }

}

customElements.define( 'my-carousel', MyCarousel);