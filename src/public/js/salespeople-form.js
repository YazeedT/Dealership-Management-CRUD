document.addEventListener("DOMContentLoaded", function () {
    // When the DOM is ready

    // Find the salesperson select dropdown
    const salespersonSelect = document.getElementById("salespersonSelect");

    // Add an event listener for the dropdown change event
    salespersonSelect.addEventListener("change", function () {
        // Get the selected salesperson ID
        const selectedSalespersonId = salespersonSelect.value;

        // Fetch salesperson details based on the selected salesperson ID
        fetch(`/getSalespersonDetails?id=${selectedSalespersonId}`)
            .then(response => response.json())
            .then(data => {
                // Populate the form fields with the retrieved salesperson data
                document.getElementById("updateFirstName").value = data.Salesperson_fname || "";
                document.getElementById("updateLastName").value = data.Salesperson_lname || "";
                document.getElementById("updatePhone").value = data.Salesperson_phone || "";
                document.getElementById("updateEmail").value = data.Salesperson_email || "";
            })
            .catch(error => {
                console.error("Error fetching salesperson details:", error);
            });
    });
});
