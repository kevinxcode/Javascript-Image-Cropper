// vars
let result = document.querySelector('.result_avatar'),
img_result = document.querySelector('.img-result_avatar'),
img_w = 300,
// img_w = document.querySelector('.img-w_avatar'),
// img_h = document.querySelector('.img-h'),
// options = document.querySelector('.options_avatar'),
save = document.querySelector('.save_avatar'),
cropped = document.querySelector('.cropped_avatar'),
dwn = document.querySelector('.download_avatar'),
upload = document.querySelector('#file-input_avatar'),
cropper = '';

// on change show image with crop options
upload.addEventListener('change', e => {
  if (e.target.files.length) {
    // start file reader
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target.result) {
        // create new image
        let img = document.createElement('img');
        img.classList.add('img-avatar');
        img.id = 'image';
        img.src = e.target.result;
        // clean result before
        result.innerHTML = '';
        // append new image
        result.appendChild(img);
        // show save btn and options
        save.classList.remove('hide_avatar');
        // options.classList.remove('hide_avatar');
        // init cropper
        cropper = new Cropper(img,{
          dragMode: 'none',
            aspectRatio: 6 / 6.5,
            autoCropArea: 1,
            restore: false,
            guides: false,
            center: false,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
            zoomable: false,
            zoomOnWheel: false,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// save on click
save.addEventListener('click', e => {
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper.getCroppedCanvas({
    minWidth: 160,
    // minHeight: 256,
    maxWidth: 160,
    // maxHeight: 4096,
    imageSmoothingEnabled: false,
    imageSmoothingQuality: 'high',
  }).toDataURL();
  // remove hide class of img
  cropped.classList.remove('hide_avatar');
  img_result.classList.remove('hide_avatar');
  // show image cropped
  cropped.src = imgSrc;
  dwn.classList.remove('hide_avatar');
  dwn.download = 'imagename.png';
  dwn.setAttribute('href', imgSrc);
  alert(imgSrc);
});
