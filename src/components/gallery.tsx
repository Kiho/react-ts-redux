import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Component, PropTypes } from 'react';
import Lightbox = require('react-images');

export class Gallery extends React.Component<any, any> {
    static displayName = 'Gallery';
    static propTypes = {
        images: React.PropTypes.array,
        heading: React.PropTypes.string,
        subheading: React.PropTypes.string,
        sepia: React.PropTypes.bool,
    };

    constructor() {
        super();

        this.state = {
            lightboxIsOpen: false,
            currentImage: 0,
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
    }
    openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }
    //renderGallery() {
    //    if (!this.props.images) return;
    //    const gallery = this.props.images.map((obj, i) => {
    //        return (
    //            <a key={i} href={obj.src} onClick={(event) => this.openLightbox(i, event) } style={styles.thumbnail}>
    //                <img src={obj.thumbnail} style={styles.thumbnailImage} width={styles.thumbnail.width} height={styles.thumbnail.height} />
    //            </a>
    //        );
    //    });

    //    return (
    //        <div style={styles.gallery}>
    //            {gallery}
    //        </div>
    //    );
    //}
    renderGallery(text) {
        let src = this.props.images[0].src;
        return <a href={src} onClick={(event) => this.openLightbox(0, event) } >
            {text}
        </a>
    }
    render() {
        const gallery = this.renderGallery(this.props.text);
        return (
            <div className="section">
                {gallery}
                <Lightbox
                    currentImage={this.state.currentImage}
                    images={this.props.images}
                    isOpen={this.state.lightboxIsOpen}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClose={this.closeLightbox}
                    theme={this.props.theme}
                    />
            </div>
        );
    }
};

const THUMBNAIL_SIZE = 72;

const styles = {
    gallery: {
        marginLeft: -5,
        marginRight: -5,
        overflow: 'hidden',
    },
    thumbnail: {
        backgroundSize: 'cover',
        borderRadius: 3,
        float: 'left',
        height: THUMBNAIL_SIZE,
        margin: 5,
        overflow: 'hidden',
        width: THUMBNAIL_SIZE,
    },
    thumbnailImage: {
        display: 'block',
        height: 'auto',
        maxWidth: '100%',
        // height: THUMBNAIL_SIZE,
        // left: '50%',
        // position: 'relative',
        //
        // WebkitTransform: 'translateX(-50%)',
        // MozTransform:    'translateX(-50%)',
        // msTransform:     'translateX(-50%)',
        // transform:       'translateX(-50%)',
    },
};

// export default Gallery;