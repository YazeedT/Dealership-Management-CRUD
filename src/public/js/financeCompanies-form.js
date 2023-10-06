document.addEventListener("DOMContentLoaded", function () {
    // When the DOM is ready

    // Find the finance company select dropdown
    const financeCompanySelect = document.getElementById("financeCompanyID");

    // Add an event listener for the dropdown change event
    financeCompanySelect.addEventListener("change", function () {
        // Get the selected finance company ID
        const selectedFinanceCompanyId = financeCompanySelect.value;

        // Fetch finance company details based on the selected ID
        fetch(`/getFinanceCompanyDetails?id=${selectedFinanceCompanyId}`)
            .then(response => response.json())
            .then(data => {
                // Populate the form fields with the retrieved data
                document.getElementById("updateName").value = data.Finance_company_name || "";
                document.getElementById("updateEmail").value = data.Finance_company_email || "";
                document.getElementById("updateStreet").value = data.Finance_company_street || "";
                document.getElementById("updateSecondStreet").value = data.Finance_company_street2 || "";
                document.getElementById("updateCity").value = data.Finance_company_city || "";
                document.getElementById("updateState").value = data.Finance_company_state || "";
                document.getElementById("updateZip").value = data.Finance_company_zip || "";
            })
            .catch(error => {
                console.error("Error fetching finance company details:", error);
            });
    });
});
