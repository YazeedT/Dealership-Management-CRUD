document.addEventListener("DOMContentLoaded", function () {
    // When the DOM is ready

    // Find the customer select dropdown
    const customerSelect = document.getElementById("updateCustomerSelect");

    // Add an event listener for the dropdown change event
    customerSelect.addEventListener("change", function () {
        // Get the selected customer ID
        const selectedCustomerId = customerSelect.value;

        fetch(`/getCustomerDetails?id=${selectedCustomerId}`)
            .then(response => response.json())
            .then(data => {
                // Populate the form fields with the retrieved data
                document.getElementById("updateFirstName").value = data.Customer_fname || "";
                document.getElementById("updateLastName").value = data.Customer_lname || "";
                document.getElementById("updatePhone").value = data.Customer_phone || "";
                document.getElementById("updateEmail").value = data.Customer_email || "";
                document.getElementById("updateStreet").value = data.Customer_street || "";
                document.getElementById("updateStreet2").value = data.Customer_street2 || "";
                document.getElementById("updateCity").value = data.Customer_city || "";
                document.getElementById("updateState").value = data.Customer_state || "";
                document.getElementById("updateZip").value = data.Customer_zip || "";
            })
            .catch(error => {
                console.error("Error fetching customer details:", error);
            });
    });
});
