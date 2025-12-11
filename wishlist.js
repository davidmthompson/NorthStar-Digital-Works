        // --- Document HTML Variables ---
        let addBtn = document.getElementById("addBtn")
        let modalBackdrop = document.getElementById("modal-backdrop")
        let closeModal = document.getElementById("close-modal")
        let newTaskForm = document.getElementById("new-task-form")
        let taskTitle = document.getElementById("task-title")
        let taskPhoto = document.getElementById("task-photo")
        let taskLink = document.getElementById("task-link")
        let cancelModal = document.getElementById("cancel-modal")
        let submit = document.getElementById("submitBtn")
        let todoSection = document.getElementById("todo-section")

        // --- App Variables ---
        var cardId = 0

        // --- Todo List Object ---
        class TodoListItem {
            constructor(title, photoUrl, productLink) {
                this.title = title
                this.photoUrl = photoUrl
                this.productLink = productLink
                this.createdAt = new Date()
                this.lastUpdatedAT = new Date()
            }
        }

        // --- Initial List ---
        // var listItem = [
        //     new TodoListItem("Hello world", "Lorem ipsum dolor sit amet consectetur adipisicing elit.")
        // ]

        /**
         * @description Update our grid to show all list items
         */
        function updateCards() {
            todoSection.innerHTML = ""

            listItem.forEach((todoItem) => {
                let item = document.createElement('div')
                
                // We use a unique ID for the DOM element based on the current counter
                const currentId = cardId 
                item.id = `card-${currentId}`
                
                item.innerHTML = `
                <div class="card">
                    <div>
                        <h4>${todoItem.title}</h4>
                        ${todoItem.photoUrl ? `<img src="${todoItem.photoUrl}" alt="${todoItem.title}" class="card-image">` : ''}
                    </div>
                    <div class="cardBtns">
                        ${todoItem.productLink ? `<a href="${todoItem.productLink}" target="_blank" class="shop-btn"><button> Buy Now </button></a>` : ''}
                        <button id="card-${currentId}-exit" class="exit btn"><span class="material-symbols-outlined"> Delete Item</span></button>
                    </div>
                </div>`

                todoSection.appendChild(item)

                document.getElementById(`card-${currentId}-exit`).addEventListener("click", () => {
                    if (!confirm("Are you sure you want to delete this item?")) return
                    deleteCard(todoItem)
                    updateCards()
                })

                cardId += 1
            })
        }

        /**
         * @description Creates a new card and updates the UI
         */
        function createCard(title, photoUrl, productLink) {
            const newCard = new TodoListItem(title, photoUrl, productLink)
            listItem.push(newCard)
            updateCards()
            return newCard
        }

        function closeTheModal() {
            modalBackdrop.setAttribute("hidden", "")
        }

        /**
         * @description Delete list item based on title (Note: ID based deletion is safer for production)
         */
        function deleteCard(deleteItem) {
            listItem = listItem.filter((item) => {
                return item.title.toLowerCase() != deleteItem.title.toLowerCase()
            })
        }

        // --- Event Listeners ---

        addBtn.addEventListener("click", () => {
            modalBackdrop.removeAttribute("hidden")
        })

        closeModal.addEventListener("click", () => {
            closeTheModal()
        })

        cancelModal.addEventListener("click", () => {
            closeTheModal()
        })

        // FIXED SUBMIT LISTENER
        submit.addEventListener("click", (e) => {
            e.preventDefault() // Prevent form reload
            
            // Check if input is empty so we don't make blank cards
            if(taskTitle.value.trim() === "") {
                alert("Please add a title")
                return
            }

            // Create the card using the INPUT values
            createCard(taskTitle.value, taskPhoto.value, taskLink.value)
            
            // Reset and close
            closeTheModal()
            taskTitle.value = ""
            taskPhoto.value = ""
            taskLink.value = ""
        })

        // --- INITIALIZATION ---
        // Initialize empty list
        var listItem = []
        
        // Run this once on load to show existing items
        updateCards()
 