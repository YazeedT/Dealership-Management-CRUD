document.addEventListener("DOMContentLoaded", function () {
    // When the DOM is ready

    // Find the car select dropdown
    const carSelect = document.getElementById("updateCarSelect");

    // Add an event listener for the dropdown change event
    carSelect.addEventListener("change", function () {
        // Get the selected car ID
        const selectedCarId = carSelect.value;

        // Fetch car details based on the selected car ID
        fetch(`/getCarDetails?id=${selectedCarId}`)
            .then(response => response.json())
            .then(data => {
                // Populate the form fields with the retrieved car data
                document.getElementById("updateMake").value = data.Car_make || "";
                document.getElementById("updateModel").value = data.Car_model || "";
                document.getElementById("updateYear").value = data.Car_year || "";
                document.getElementById("updateColor").value = data.Car_color || "";
                document.getElementById("updateMileage").value = data.Car_mileage || "";
                document.getElementById("updateVin").value = data.Car_vin || "";
                document.getElementById("updatePrice").value = data.Car_price || "";
                document.getElementById("updateForSale").value = data.Car_for_sale || "1"; // Default to "Yes" if not specified
                document.getElementById("updateCustomerID").value = data.Customer_id || "";
            })
            .catch(error => {
                console.error("Error fetching car details:", error);
            });
    });
});

