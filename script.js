document.addEventListener('DOMContentLoaded', () => {
    const saveNoteBtn = document.getElementById('save-note');
    const noteText = document.getElementById('note-text');
    const notesList = document.getElementById('notes-list');
    const searchInput = document.getElementById('search');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const renderNotes = (notesToRender) => {
        notesList.innerHTML = '';
        notesToRender.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = `
                <p class="note-content" id="note-content-${index}">${note.split('\n')[0]}</p>
                <div class="note-actions">
                    <button onclick="deleteNote(${index})">🗑️</button>
                    <button onclick="editNote(${index})">✏️</button>
                </div>
                <div class="note-toggle" id="note-toggle-${index}" onclick="toggleNoteContent(${index})">Show More</div>
            `;
            notesList.appendChild(noteDiv);
        });
    };

    saveNoteBtn.addEventListener('click', () => {
        const note = noteText.value.trim();
        if (note) {
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteText.value = '';
            renderNotes(notes);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredNotes = notes.filter(note => note.toLowerCase().includes(searchTerm));
        renderNotes(filteredNotes);
    });

    window.deleteNote = (index) => {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes(notes);
    };

    window.editNote = (index) => {
        const newNote = prompt('Edit your note:', notes[index]);
        if (newNote !== null) {
            notes[index] = newNote;
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes(notes);
        }
    };

    window.toggleNoteContent = (index) => {
        const noteContent = document.getElementById(`note-content-${index}`);
        const noteToggle = document.getElementById(`note-toggle-${index}`);
        if (noteContent.classList.contains('expanded')) {
            noteContent.classList.remove('expanded');
            noteContent.textContent = notes[index].split('\n')[0];
            noteToggle.textContent = 'Show More';
        } else {
            noteContent.classList.add('expanded');
            noteContent.textContent = notes[index];
            noteToggle.textContent = 'Show Less';
        }
    };

    renderNotes(notes);
});
