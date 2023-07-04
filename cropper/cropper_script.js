// vars
let result = document.querySelector('.result_avatar'),
img_result = document.querySelector('.img-result_avatar'),
img_w = 300,
save = document.querySelector('.save_avatar'),
cropped = document.querySelector('.cropped_avatar'),
dwn = document.querySelector('.download_avatar'),
upload = document.querySelector('#file-input_avatar'),
box_input = document.querySelector('.box_avatar'),
proses_crop = document.querySelector('.box-2_avatar'),
action_crop = document.querySelector('.box_avatar_action'),
avatar_rotate_90 = document.querySelector('.avatar_rotate_90'),
avatar_change = document.querySelector('.avatar_change'),
file_avatar_base64 = document.querySelector('#file_avatar_base64'),
cropper = '';



// on change show image with crop options
upload.addEventListener('change', e => {
  box_input.classList.add('hide_avatar');
  proses_crop.classList.remove('hide_avatar'); 
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
        avatar_rotate_90.classList.remove('hide_avatar');
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
// rotate
avatar_rotate_90.addEventListener('click', e => {
  cropper.rotate(90);
});
// end rotate
// change
avatar_change.addEventListener('click', e => {
  img_result.classList.add('hide_avatar'); 
  box_input.classList.remove('hide_avatar'); 
  action_crop.classList.add('hide_avatar');  
  upload.value = '';
});
// end change
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
  action_crop.classList.remove('hide_avatar');
  avatar_rotate_90.classList.add('hide_avatar');
  proses_crop.classList.add('hide_avatar'); 
  save.classList.add('hide_avatar'); 
  // show image cropped
  cropped.src = imgSrc;
  dwn.classList.remove('hide_avatar');
  dwn.download = 'imagename.png';
  dwn.setAttribute('href', imgSrc);
  file_avatar_base64.value = imgSrc;
  // alert(imgSrc);
});
