// import Vue from 'vue'

// Vue.directive('lazy-load', {
//    // my custom directive
//    inserted: el => {
//       const loadImage = () => {
//          // indexes - array containing indexes of elements to load
//          // this function puts url from dataset to --url css variable

//          // LOADING:
//          el.style.setProperty('--url', `url('${el.dataset.url}')`)
//          el.classList.add('loading')

//          // WHEN LOADED:
//          imagesLoaded(el, { background: true }, instance => {
//             instance.images.forEach(image => {
//                el.classList.add('loaded')

//                // adding class .wide to the images that are horizontal
//                const { naturalHeight: height, naturalWidth: width } = image.img
//                if (width / height >= 1.3) el.classList.add('wide')
//             })
//          })
//       }
//       const handleIntersect = (entries, observer) => {
//          entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                loadImage()
//                observer.unobserve(el)
//             }
//          })
//       }
//       const createObserver = () => {
//          const options = {
//             root: null,
//             threshold: 0,
//          }
//          const observer = new IntersectionObserver(handleIntersect, options)
//          observer.observe(el)
//       }

//       // make observer only if the browser supports it
//       window.IntersectionObserver ? createObserver() : loadImage()
//    },
// },)
