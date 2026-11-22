const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");

async function loadNotes() {
    const response = await fetch("/api/notes");

    const notes = await response.json();

    displayNotes(notes);
}

function displayNotes(notes) {

    notesContainer.innerHTML = "";

    const subjects = {};

    notes.forEach(note => {

        if (!subjects[note.subject]) {
            subjects[note.subject] = [];
        }

        subjects[note.subject].push(note);
    });

    for (const subject in subjects) {

        const subjectDiv = document.createElement("div");

        subjectDiv.className = "subject";

        subjectDiv.innerHTML = `
            <h2>${subject}</h2>
        `;

        subjects[subject].forEach(note => {

            const noteDiv = document.createElement("div");

            noteDiv.className = "note";

            noteDiv.innerHTML = `
                <h3>${note.title}</h3>
                <button>Download</button>
            `;

            subjectDiv.appendChild(noteDiv);
        });

        notesContainer.appendChild(subjectDiv);
    }
}

loadNotes();

searchInput.addEventListener("input", async () => {

    const query = searchInput.value.trim();

    if (query === "") {
        loadNotes();
        return;
    }

    const response = await fetch(
        `/api/notes/search?q=${query}`
    );

    const notes = await response.json();

    displayNotes(notes);
});