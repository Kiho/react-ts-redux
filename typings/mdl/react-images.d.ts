declare class Lightbox extends __React.Component<ILightbox, any>{
}

declare namespace Lightbox {
}


interface ILightbox {
    backdropClosesModal?: boolean,
    enableKeyboardInput?: boolean,
    currentImage?: number,
    images?: any[],
    isOpen: boolean,
    onClickPrev: Function,
    onClickNext: Function,
    onClose: Function,
    showCloseButton?: boolean,
    showImageCount?: boolean,
    theme?: string,
    width?: number
}

declare module "react-images" {
    export = Lightbox;
}