const newFormHandler = async (event) => {
    event.preventDefault(); 

    const name = document.querySelector('#blog-name').value.trim();
    const description = document.querySelector('#blog-description').value.trim();

    if ( name && description ) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ name , description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(' Failed to create blog');
        }
    }
};
document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);