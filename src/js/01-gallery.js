import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const cardsMarckup = createGalleryCardsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarckup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

const instance = basicLightbox.create(
    `<img class='modal-img' src=''>`,
    {
        onShow: instance => {
            window.addEventListener('keydown', escapeClose);
        },
    },
    {
        onClose: instance => {
            window.removeEventListener('keydown', escapeClose);
        },
    },
);

function onGalleryContainerClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") {
        return;
        }
    instance.element().querySelector('.modal-img').src =
        event.target.dataset.source;       
    instance.show();   
}

function escapeClose(event) {
    if (event.key === "Escape") {
        instance.close();
        return;  
    }  
}
 
function createGalleryCardsMarkup(items) {
    return items
        .map(({ preview, original, description }) => {
        return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </div>
    `;
    })
        .join('');
}