var fadingCarouselStyle = `
    <style>
        .my-fading-carousel {
            position:relative;
            width: 100%;
            top: 0;
            left: 0;
        }
        .my-fading-carousel img {
            width: 100%;
            height: 400px;
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden;
            object-fit: cover;
        }

`;

class MyFadingCarousel extends HTMLElement {

    

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        let fadingContainer = document.createElement('div');
        fadingContainer.classList.add('my-fading-carousel');
        let time = this.getAttribute('time');
        let duration = this.getAttribute('duration');
        let images = this.querySelectorAll('img');
        let numberOfImages = images.length;
        let totalTime = (Number(time) + Number(duration)) * numberOfImages;
        fadingCarouselStyle = fadingCarouselStyle.concat(`
        @keyframes fade {
            0% {
                opacity: 1;
            }
            ${(Math.round((Number(time) / Number(totalTime)) * 100)) + "%"} {
                opacity: 1;
            }
            ${Math.round(((Number(time) + Number(duration)) / Number(totalTime)) * 100) + "%"} {
                opacity: 0;
            }
            ${(Math.round((1 - (duration / totalTime)) * 100)) + "%"} {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        .my-fading-carousel img {
            animation-name: fade;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-duration: ${totalTime}s;
        }
        `);
        for(let i = 0; i < images.length; i++){
            let image = images[i];
            image.classList.add("my-carousel-img");
            image.id = "my-carousel-img-" + (i + 1);
            fadingContainer.appendChild(image);
            fadingCarouselStyle = fadingCarouselStyle.concat(`
                .my-fading-carousel img:nth-of-type(${(i + 1)}) {
                    animation-delay: ${ Math.round((images.length - i - 1) * (Number(time) + Number(duration)))}s;
                }
            `);
        }
        shadow.innerHTML = fadingCarouselStyle;
        shadow.appendChild(fadingContainer);
    }

}

customElements.define( 'my-fading-carousel', MyFadingCarousel);