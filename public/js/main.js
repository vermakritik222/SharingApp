// window.stop();
const dropContainer = document.querySelector('.container__drop');
const fileInput = document.querySelector('.container__file');
const animateImg = document.querySelector('.container__img');

const uploading = document.querySelector('.uploader');
const upload__span = document.querySelector('#uploade__span');
const upload__present = document.querySelector('#uploade__persent');

const linkBox = document.querySelector('.linkBox');
const linkBox__input = document.querySelector('#linkBox__cover__input');

const toast = document.querySelector('.toast');

const baseURL = '/';
const uploadURL = `${baseURL}api/files`;
const emailURL = `${baseURL}api/files/send`;

const maxAllowedSize = 100 * 1024 * 1024; //100mb

let toastTimer;
const showToast = (msg) => {
    clearTimeout(toastTimer);
    toast.innerText = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
};

dropContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    animateImg.classList.add('float');
});

dropContainer.addEventListener('dragleave', (e) => {
    e.preventDefault();
    animateImg.classList.remove('float');
});

dropContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    console.log('dropped', e.dataTransfer.files[0].name);

    const files = e.dataTransfer.files;

    if (files.length === 1) {
        if (files[0].size < maxAllowedSize) {
            fileInput.files = files;
            upload(e);
            //   console.log(files[0].size);
        } else {
            console.log('Max file size is 100MB');
            animateImg.classList.remove('float');
            showToast('Max file size is 100MB');
        }
    } else if (files.length > 1) {
        console.log("You can't upload multiple files");
        animateImg.classList.remove('float');
        showToast("You can't upload multiple files");
    }
    animateImg.classList.remove('float');
});

const upload = (e) => {
    e.preventDefault();

    console.log('uploading....');
    files = fileInput.files;

    const formData = new FormData();
    formData.append('myfile', files[0]);

    uploading.style.opacity = 1;
    uploading.style.margin = '0px 30px';
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function (event) {
        let percent = Math.round((100 * event.loaded) / event.total);
        upload__span.style.width = `${percent}%`;
        upload__present.innerHTML = `${percent}%`;
        if (percent === 100) {
            showToast('File Uploaded Successfully');
        }
        // console.log(percent);
    };

    xhr.upload.onerror = function () {
        console.log(`Error in upload: ${xhr.status}.`);
        showToast(`Error in upload: ${xhr.status}.`);
        fileInput.value = ''; // reset the input
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            whenFileUploaded(xhr.responseText);
        }
    };

    xhr.open('POST', uploadURL);
    xhr.send(formData);
};

const whenFileUploaded = (res) => {
    upload__span.style.width = '0%';
    uploading.style.opacity = 0;
    uploading.style.margin = '-34px 30px';
    const { file: url } = JSON.parse(res);
    linkBox.style.display = 'flex';
    linkBox__input.value = url;
    console.log(url);
    const linkBox__copybtn = document.querySelector(
        '#linkBox__cover__inputCopy'
    );
    linkBox__copybtn.addEventListener('click', (e) => {
        navigator.clipboard.writeText(linkBox__input.value);
        showToast('Copied to clipboard');
    });
};
