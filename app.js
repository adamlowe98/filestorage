// app.js
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const fileList = document.getElementById('fileList');

let files = [];

uploadBtn.addEventListener('click', () => {
    const selectedFiles = Array.from(fileInput.files);
    files = [...files, ...selectedFiles];
    displayFiles();
});

function displayFiles() {
    fileList.innerHTML = '';
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <button onclick="deleteFile(${index})">Delete</button>
        `;
        fileList.appendChild(fileItem);
    });
}

function deleteFile(index) {
    files.splice(index, 1);
    displayFiles();
}
