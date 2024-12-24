export function generateDragAndDropBox() {
  const dropZone = document.getElementById("drop-zone");
  const fileList = document.getElementById("file-list");

  if (dropZone) {
    // Prevent default behaviors for drag events
    ["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
      dropZone.addEventListener(event, (e) => e.preventDefault());
      dropZone.addEventListener(event, (e) => e.stopPropagation());
    });

    // Highlight the drop zone when dragging files over it
    ["dragenter", "dragover"].forEach((event) => {
      dropZone.addEventListener(event, () =>
        dropZone.classList.add("drag-over")
      );
    });

    // Remove highlight when dragging leaves the drop zone
    ["dragleave", "drop"].forEach((event) => {
      dropZone.addEventListener(event, () =>
        dropZone.classList.remove("drag-over")
      );
    });

    // Handle dropped files
    dropZone.addEventListener("drop", (event) => {
      const files = event.dataTransfer?.files ?? [];

      if (fileList) {
        fileList.innerHTML = "";

        // Display each file
        Array.from(files).forEach((file) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${file.name} (${(file.size / 1024).toFixed(
            2
          )} KB)`;
          fileList.appendChild(listItem);
        });
      }
    });
  }
}
