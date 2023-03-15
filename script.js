document.addEventListener('DOMContentLoaded', () => {
    const createItemForm = document.getElementById('createItem');
    const ideasList = document.getElementById('ideas-list');
    const updateItemForm = document.getElementById('updateItem');
    const deleteItemForm = document.getElementById('deleteItem');
    const ideaSelect = document.getElementById('idea-select');
    const updateButton = document.getElementById('update-button');
    const cancelButton = document.getElementById('cancel-update-button');
    const deleteIdeaSelect = document.getElementById('delete-idea-select');
    const deleteButton = document.getElementById('delete-button');
    const cancelDeleteButton = document.getElementById('cancel-delete-button');

    let ideas = JSON.parse(localStorage.getItem('ideas')) || [];

    createItemForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title-field').value;
        const idea = document.getElementById('idea-field').value;

        const id = Date.now();
        const newIdea = { id, title, idea };
        ideas.push(newIdea);

        updateLocalStorage();
        renderIdeas();
        createItemForm.reset();
    });

    function renderIdeas() {
        ideasList.innerHTML = '';
        ideaSelect.innerHTML = '';
        deleteIdeaSelect.innerHTML = '';
        
        // Add empty option elements for update and delete sections
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '';
        ideaSelect.appendChild(emptyOption);
        
        const emptyDeleteOption = document.createElement('option');
        emptyDeleteOption.value = '';
        emptyDeleteOption.textContent = '';
        deleteIdeaSelect.appendChild(emptyDeleteOption);
        
        ideas.forEach((idea) => {
            // For the list of ideas
            const li = document.createElement('li');
            li.textContent = `${idea.title}: ${idea.idea}`;
            ideasList.appendChild(li);

            // For the dropdown list in the edit section
            const option = document.createElement('option');
            option.value = idea.id;
            option.textContent = `${idea.title}: ${idea.idea}`;
            ideaSelect.appendChild(option);

            // For the dropdown list in the delete section
            const deleteOption = document.createElement('option');
            deleteOption.value = idea.id;
            deleteOption.textContent = `${idea.title}: ${idea.idea}`;
            deleteIdeaSelect.appendChild(deleteOption);
        });
    }

    ideaSelect.addEventListener('change', (e) => {
        const ideaId = parseInt(e.target.value);
        const selectedIdea = ideas.find((idea) => idea.id === ideaId);

        if (selectedIdea) {
            document.getElementById('update-title-field').value = selectedIdea.title;
            document.getElementById('update-idea-field').value = selectedIdea.idea;
            updateItemForm.dataset.ideaId = selectedIdea.id;
        }
    });

    updateButton.addEventListener('click', (e) => {
        e.preventDefault();

        const ideaId = parseInt(updateItemForm.dataset.ideaId);
        const updatedTitle = document.getElementById('update-title-field').value;
        const updatedIdea = document.getElementById('update-idea-field').value;

        const ideaIndex = ideas.findIndex((idea) => idea.id === ideaId);
        if (ideaIndex !== -1) {
            ideas[ideaIndex].title = updatedTitle;
            ideas[ideaIndex].idea = updatedIdea;

            updateLocalStorage();
            renderIdeas();
            updateItemForm.reset();
        }
    });

    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        updateItemForm.reset();
        ideaSelect.selectedIndex = 0;
    });

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();

        const ideaId = parseInt(deleteIdeaSelect.value);
        ideas = ideas.filter((idea) => idea.id !== ideaId);

        updateLocalStorage();
        renderIdeas();
        deleteItemForm.reset();
    });

    cancelDeleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        deleteIdeaSelect.selectedIndex = 0;
    });

    function updateLocalStorage() {
        localStorage.setItem('ideas', JSON.stringify(ideas));
    }

    renderIdeas();
});