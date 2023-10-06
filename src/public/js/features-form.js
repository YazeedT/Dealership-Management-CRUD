document.addEventListener("DOMContentLoaded", function () {
    // When the DOM is ready

    // Find the feature select dropdown
    const featureSelect = document.getElementById("featureID");

    // Add an event listener for the dropdown change event
    featureSelect.addEventListener("change", function () {
        // Get the selected feature ID
        const selectedFeatureId = featureSelect.value;
        console.log(selectedFeatureId)
        // Fetch feature details based on the selected feature ID
        fetch(`/getFeatureDetails?id=${selectedFeatureId}`)
            .then(response => response.json())
            .then(data => {
                // Populate the form field with the retrieved feature data
                console.log(data)
                document.getElementById("featureName").value = data.Feature_name || "";
            })
            .catch(error => {
                console.error("Error fetching feature details:", error);
            });
    });
});
