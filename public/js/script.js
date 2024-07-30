const url = new URL(window.location.href);
const buttonsStatus = document.querySelectorAll("[button-status]");
if(buttonsStatus.length > 0){
    buttonsStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            console.log("url: " + url);
            window.location.href = url.toString();
            
        });
    });
}


const formSearch = document.querySelector("form-search");
if(formSearch){
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        
        window.location.href = url.toString();
    });
}


const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
    buttonsPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            if(page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("page");
            }
            window.location.href = url.toString();
            
        });
    });
}


const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("change", (e) => {
        const isChecked = e.target.checked;
        inputsId.forEach((input) => {
            input.checked = isChecked;
        });
    });

    inputsId.forEach((input) => {
        input.addEventListener("change", () => {
            inputCheckAll.checked = Array.from(inputsId).every((input) => input.checked);
        });
    });
}

const formChangeMulti = document.querySelector("[form-change-multi]");
console.log(formChangeMulti);

if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
        const inputsChecked = Array.from(inputsId).filter(input => input.checked);

        if (inputsChecked.length > 0) {
            const ids = [];
            inputsChecked.forEach((input) => {
                const typeChange = formChangeMulti.elements.type.value;

                if (typeChange === "delete-all") {
                    const confirmDelete = confirm("Bạn Có Muốn Xóa Tất Cả?");
                    if (!confirmDelete) return;
                }

                if (typeChange === "change-position") {
                    const position = input.closest('tr').querySelector("input[name='position']").value;
                    ids.push(`${input.value}-${position}`);
                } else {
                    ids.push(input.value);
                }
            });

            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputIds.value = ids.join(", ");
            console.log(inputIds);
            console.log(formChangeMulti);
            formChangeMulti.submit();
        } else {
            alert("Vui Lòng Nhập ít Nhất 1 bản ghi");
        }
    });
}

const showAlert = document.querySelector("[show-alert]");
if(showAlert){ 
    const time = showAlert.getAttribute('data-time');
    setTimeout(() => {
        showAlert.remove();

    },5000);
}

const hiddenAlert = document.querySelector("[close-alert]");
if(hiddenAlert){
    hiddenAlert.addEventListener('click', () => {
        showAlert.remove();
    });
}


const uploadImage = document.querySelector("[upload-image]");

if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}