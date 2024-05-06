import PropTypes from 'prop-types';
import React from 'react';
import animatedScrollTo from '../utils/animated-scroll-to';
import isMobileDevice from '../utils/is-mobile';
import { getObjectValues } from '../utils/helpers';
import Slide from './Slide';

const scrollMode = {
  FULL_PAGE: 'full-page',
  NORMAL: 'normal',
};

export default class FullPage extends React.Component {
  static getChildrenCount = (children) => {
    const childrenArr = React.Children.toArray(children);
    const slides = childrenArr.filter(({ type }) => type === Slide);
    return slides.length;
  }

  constructor(props) {
    super(props);

    this._isNewScrollAction = true;
    this._wheel = { increasing: true, lastDeltaY: 0 };

    this._isScrollPending = false;
    this._isScrolledAlready = false;
    this._slides = [];
    this._touchSensitivity = 10;
    this._touchStart = 0;
    this._isMobile = null;

    this.state = {
      activeSlide: props.initialSlide,
      slidesCount: FullPage.getChildrenCount(this.props.children),
    };
  }

  componentDidMount() {
    this._isMobile = isMobileDevice();
    if (this._isMobile) {
      document.addEventListener('touchmove', this.onTouchMove, { passive: false });
      document.addEventListener('touchstart', this.onTouchStart);
      document.addEventListener('scroll', this.onMobileScroll);
    } else {
      document.addEventListener('wheel', this.onScroll, { passive: false });
    }
    window.addEventListener('resize', this.onResize);

    this.onResize();
    this.scrollToSlide(this.props.initialSlide);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scrollMode === scrollMode.FULL_PAGE && prevProps.scrollMode === scrollMode.NORMAL) {
      this.scrollToSlide(this.state.slidesCount - 2, this.state.slidesCount - 1)
      return;
    }
  
    const newSlidesCount = FullPage.getChildrenCount(this.props.children);
    if (newSlidesCount !== this.state.slidesCount) {
      // use getDerivedStateFromProps after react <16 support is dropped
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        slidesCount: newSlidesCount,
      }, this.updateSlides);

      const slidesDiff = this.state.slidesCount - newSlidesCount;

      // activeSlide should always be less than slides count
      if (slidesDiff > 0 && this.state.activeSlide >= this.state.slidesCount - slidesDiff) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          activeSlide: newSlidesCount - 1,
        }, this.updateSlides);
      }
    }
  }

  componentWillUnmount() {
    if (this._isMobile) {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchstart', this.onTouchStart);
      document.removeEventListener('scroll', this.onMobileScroll);
    } else {
      document.removeEventListener('wheel', this.onScroll);
    }
    window.removeEventListener('resize', this.onResize);
  }

  updateSlides = () => {
    this._slides = [];

    for (let i = 0; i < this.state.slidesCount; i++) {
      this._slides.push(window.innerHeight * i);
    }
  }

  onResize = () => {
    this.updateSlides();
    this.setState({
      height: window.innerHeight,
    });
  }

  onTouchStart = (evt) => {
    this._touchStart = evt.touches[0].clientY;
    this._isScrolledAlready = false;
  }

  onMobileScroll = (evt) => {
    // if (this._isScrollPending || !this._isScrolledAlready) {
    //   return;
    // }

    // if (this.props.scrollMode !== scrollMode.FULL_PAGE) {
    //   const scrollFrom = window.scrollY || window.pageYOffset || 0;

    //   if (scrollFrom < this._slides[this._slides.length - 1] - 10) {
    //     this.props.setScrollMode(scrollMode.FULL_PAGE);
    //   }
    // }
  }

  onTouchMove = (evt) => {
    if (this.props.scrollMode !== scrollMode.FULL_PAGE) {
      return;
    }

    evt.preventDefault();
    if (this._isScrollPending) {
      return;
    }

    const touchEnd = evt.changedTouches[0].clientY;

    if (!this._isScrollPending && !this._isScrolledAlready) {
      if (this._touchStart > touchEnd + this._touchSensitivity) {
        this.scrollToSlide(this.state.activeSlide + 1, this.state.activeSlide);
      } else if (this._touchStart < touchEnd - this._touchSensitivity) {
        this.scrollToSlide(this.state.activeSlide - 1, this.state.activeSlide);
      }
    }
  }

  onScroll = (evt) => {
    if (this.props.scrollMode !== scrollMode.FULL_PAGE) {
      const scrollFrom = window.scrollY || window.pageYOffset || 0;

      if (scrollFrom < this._slides[this._slides.length - 1] - 10) {
        this.props.setScrollMode(scrollMode.FULL_PAGE);
      } else {
        return;
      }
    }

    if (this.props.scrollMode === scrollMode.FULL_PAGE) {
      const scrollFrom = window.scrollY || window.pageYOffset || 0;

      if (scrollFrom > this._slides[this._slides.length - 1]) {
        this.props.setScrollMode(scrollMode.NORMAL);
      }
    }

    evt.preventDefault();
    if (this._isScrollPending) {
      return;
    }

    const isTrackPadScrolling = evt.deltaY > 0 && evt.deltaY < 30 || evt.deltaY > -30 && evt.deltaY < 0;

    const scrollDown = (evt.wheelDelta || -evt.deltaY || -evt.detail) < 0;

    let offset = window.scrollY || window.pageYOffset;

    let startSlide = null;
    let endSlide = null;
    let scrollFromStartSlide = false;

    this._slides.forEach((slide, index) => {
      if (offset === slide || Math.abs(offset - slide) < 10) {
        startSlide = index;
        scrollFromStartSlide = true;
      }

      if (offset > slide && offset < this._slides[index + 1]) {
        startSlide = index;
        endSlide = index + 1;
      }
    });

    // console.log('offset', offset);
    // console.log('this.slides', this._slides);
    // console.log('startSlide', startSlide);
    // console.log('endSlide', endSlide);

    if (isTrackPadScrolling) {
      return false
    }

    
    // тут надо понять куда нам скролить на какой слайд
    // скролл от начала или с середины

    let to = null;
    let from = null;

    if (scrollDown) {
      if (scrollFromStartSlide) {
        from = startSlide;
        to = startSlide + 1;
      } else {
        from = startSlide;
        to = startSlide + 1;
      }
    } else {
      if (scrollFromStartSlide) {
        from = startSlide;
        to = startSlide - 1;
      } else {
        from = startSlide + 1;
        to = startSlide;
      }
    }

    if (startSlide !== null) {
      this.scrollToSlide(to, from);
    }
  }

  getSlidesCount = () => this.state.slidesCount

  scrollToSlide = (slide, from) => {
    if (!this._isScrollPending && slide >= 0 && slide < this.state.slidesCount) {
      // const currentSlide = this.state.activeSlide;
      const currentSlide = from;
      this.props.beforeChange({ from: currentSlide, to: slide });

      this._isScrollPending = true;

      if (slide === 1 && currentSlide === 0) {
        setTimeout(() => {
          this.setState({
            activeSlide: slide,
          });
    
          animatedScrollTo(this._slides[slide], 0, () => {
            setTimeout(() => {
              this._isScrollPending = false;
              this._isScrolledAlready = true;
      
              this.props.afterChange({ from: currentSlide, to: slide });
            }, 100)
          });
        }, 675)
      } else if (currentSlide === 4 && slide === 5 && !this.props.animateRoadmapEnd) {
          this.setState({
            activeSlide: slide,
          });
    
          animatedScrollTo(this._slides[slide], this.props.duration, () => {
            setTimeout(() => {
              this._isScrollPending = false;
              this._isScrolledAlready = true;
      
              this.props.afterChange({ from: currentSlide, to: slide });
              this.props.setScrollMode(scrollMode.NORMAL);
            }, 4000)
          });
      } else {
        this.setState({
          activeSlide: slide,
        });
  
        animatedScrollTo(this._slides[slide], this.props.duration, () => {
          this._isScrollPending = false;
          this._isScrolledAlready = true;
  
          this.props.afterChange({ from: currentSlide, to: slide });
        });
      }
    }
  }

  render() {
    return (
      <div style={{ height: this.state.height }}>
        {this.props.children}
      </div>
    );
  }
}

FullPage.propTypes = {
  afterChange: PropTypes.func,
  beforeChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  controls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element,
    PropTypes.func,
  ]),
  controlsProps: PropTypes.object,
  duration: PropTypes.number,
  initialSlide: PropTypes.number,
  scrollMode: PropTypes.oneOf(getObjectValues(scrollMode)),
};

FullPage.defaultProps = {
  afterChange: () => {},
  beforeChange: () => {},
  controls: false,
  controlsProps: {},
  duration: 700,
  initialSlide: 0,
  scrollMode: scrollMode.FULL_PAGE,
};
