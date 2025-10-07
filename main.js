document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Switching Logic (No Change) ---
    const tabsContainer = document.querySelector('.tabs-container');
    tabsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tabs-link')) {
            const clickedTab = event.target;
            const targetId = clickedTab.dataset.tab;
            const targetContent = document.getElementById(targetId);

            tabsContainer.querySelectorAll('.tabs-link').forEach(tab => tab.classList.remove('active'));
            tabsContainer.querySelectorAll('.tabs-content').forEach(content => content.classList.remove('active'));

            clickedTab.classList.add('active');
            targetContent.classList.add('active');
        }
    });

    // --- NEW: Interactive Checklist ---
    const todoList = document.querySelector('.todo-list');
    if (todoList) {
        todoList.addEventListener('click', (event) => {
            // Check if an LI element was clicked
            if (event.target.tagName === 'LI') {
                // Toggle the 'checked' class on the clicked item
                event.target.classList.toggle('checked');
            }
        });
    }

    // --- NEW: Draggable Polaroids Logic ---
    const polaroids = document.querySelectorAll('.polaroid');
    let activePolaroid = null;
    let offsetX, offsetY;

    // To make sure the last clicked polaroid is on top
    let highestZIndex = 10;

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mousedown', startDrag);
    });

    function startDrag(event) {
        activePolaroid = event.currentTarget;
        
        // Bring the clicked polaroid to the top
        highestZIndex++;
        activePolaroid.style.zIndex = highestZIndex;

        // Calculate the mouse offset inside the polaroid
        offsetX = event.clientX - activePolaroid.offsetLeft;
        offsetY = event.clientY - activePolaroid.offsetTop;

        // Add dragging class for visual feedback
        activePolaroid.classList.add('dragging');

        // Listen for mouse movements and release
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    }

    function drag(event) {
        if (!activePolaroid) return;

        // Prevent default browser behavior (like selecting text)
        event.preventDefault();

        // Update the polaroid's position
        activePolaroid.style.left = `${event.clientX - offsetX}px`;
        activePolaroid.style.top = `${event.clientY - offsetY}px`;
    }

    function stopDrag() {
        if (!activePolaroid) return;

        // Remove the dragging class
        activePolaroid.classList.remove('dragging');
        activePolaroid = null;

        // Stop listening for mouse events
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }
});