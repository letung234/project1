const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');
console.log(buttonsChangeStatus)
if(buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector('#form-change-status');
    const path = formChangeStatus.getAttribute('data-path');
    buttonsChangeStatus.forEach( (button) => {
        button.addEventListener('click',(event)=>{
            console.log(event.target)
            const statusCurrent = button.getAttribute('data-status');
            const id = button.getAttribute('data-id');
            let statusChange = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${statusChange}/${id}`;
            formChangeStatus.action = action+"?_method=PATCH";
            console.log(action)
            formChangeStatus.submit();
         });
    });
}


const buttonsDelete = document.querySelectorAll('[button-delete]');
if(buttonsDelete){
    buttonsDelete.forEach( (button) => {
        button.addEventListener('click',(event)=>{
            if(confirm("Are you sure to delete this product?")){
                const formDelete = document.querySelector('#form-delete-product');
                const path = formDelete.getAttribute('data-path');               
                const id = button.getAttribute('data-id');
                const action = path + `/${id}`;
                formDelete.action = action+"?_method=DELETE";
                formDelete.submit();
            }
         });
    });
}