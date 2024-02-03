const deleteProductButtonElements = document.querySelectorAll('.product-item button');

deleteProductButtonElements.forEach((button) => {
    button.addEventListener('click', async (event) => {
        const productId = event.target.dataset.productid;
        const csrf = event.target.dataset.csrf;
        const productElement = event.target.closest('.product-item');
    
        const response = await fetch(`/admin/products/${productId}?_csrf=${csrf}`, {
        method: 'DELETE',
        })
        
        if (!response.ok) {
            alert('Something went wrong!');
            return;
        } 

        productElement.parentElement.remove();
    });
    });