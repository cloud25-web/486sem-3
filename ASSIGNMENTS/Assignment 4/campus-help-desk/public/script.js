const form = document.getElementById("requestForm");
const requestsContainer = document.getElementById("requestsContainer");
const requestCount = document.getElementById("requestCount");

let editingId = null;


// =========================
// GET ALL REQUESTS
// =========================

async function getRequests() {
    try {
        const response = await fetch("/api/requests");

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        const requests = await response.json();

        displayRequests(requests);

    } catch (error) {
        console.error(error);
        requestsContainer.innerHTML = `
            <div class="empty-state">
                Unable to load requests.
            </div>
        `;
    }
}


// =========================
// DISPLAY REQUESTS
// =========================

function displayRequests(requests) {

    requestCount.textContent =
        `${requests.length} ${requests.length === 1 ? "Request" : "Requests"}`;

    if (requests.length === 0) {
        requestsContainer.innerHTML = `
            <div class="empty-state">
                No requests submitted yet.
            </div>
        `;

        return;
    }

    requestsContainer.innerHTML = "";

    requests.forEach((request) => {

        const card = document.createElement("div");

        card.className = "request-card";

        card.innerHTML = `
            <div class="request-top">

                <div>
                    <div class="request-title">
                        ${request.category}
                    </div>

                    <div class="request-meta">
                        ${request.studentName} • ${request.email}
                    </div>
                </div>

                <span class="priority-badge priority-${request.priority.toLowerCase()}">
                    ${request.priority}
                </span>

            </div>

            <p class="request-description">
                ${request.description}
            </p>

            <div class="request-actions">

                <button
                    class="edit-btn"
                    onclick="editRequest(${request.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteRequest(${request.id})"
                >
                    Delete
                </button>

            </div>
        `;

        requestsContainer.appendChild(card);
    });
}


// =========================
// POST / CREATE REQUEST
// =========================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const studentName =
        document.getElementById("studentName").value;

    const email =
        document.getElementById("email").value;

    const category =
        document.getElementById("category").value;

    const description =
        document.getElementById("description").value;

    const priority =
        document.querySelector(
            'input[name="priority"]:checked'
        ).value;


    const requestData = {
        studentName,
        email,
        category,
        description,
        priority
    };


    try {

        // EDIT REQUEST
        if (editingId !== null) {

            const response = await fetch(
                `/api/requests/${editingId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(requestData)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update request");
            }

            editingId = null;

        }

        // CREATE REQUEST
        else {

            const response = await fetch(
                "/api/requests",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(requestData)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create request");
            }
        }


        // Clear form
        form.reset();

        // Change button back to normal
        document.querySelector(".submit-btn").innerHTML =
            `Submit Request <span>→</span>`;

        // Refresh requests
        getRequests();

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");
    }
});


// =========================
// EDIT REQUEST
// =========================

async function editRequest(id) {

    try {

        const response =
            await fetch(`/api/requests/${id}`);

        if (!response.ok) {
            throw new Error("Request not found");
        }

        const request = await response.json();


        // Fill form
        document.getElementById("studentName").value =
            request.studentName;

        document.getElementById("email").value =
            request.email;

        document.getElementById("category").value =
            request.category;

        document.getElementById("description").value =
            request.description;


        document.querySelector(
            `input[name="priority"][value="${request.priority}"]`
        ).checked = true;


        // Store ID for PUT request
        editingId = id;


        // Change button text
        document.querySelector(".submit-btn").innerHTML =
            `Update Request <span>↻</span>`;


        // Scroll to form
        document.querySelector(".form-card").scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        alert("Unable to load request.");
    }
}


// =========================
// DELETE REQUEST
// =========================

async function deleteRequest(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this request?");

    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(`/api/requests/${id}`, {
                method: "DELETE"
            });


        if (!response.ok) {
            throw new Error("Failed to delete request");
        }


        // Refresh requests
        getRequests();


    } catch (error) {

        console.error(error);

        alert("Unable to delete request.");
    }
}


// =========================
// LOAD REQUESTS WHEN PAGE OPENS
// =========================

getRequests();

window.editRequest = editRequest;
window.deleteRequest = deleteRequest;