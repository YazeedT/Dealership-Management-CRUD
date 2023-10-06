document.addEventListener("DOMContentLoaded", function () {
    // When the DOM is ready

    // Find the transaction select dropdown
    const transactionSelect = document.getElementById("transactionID");

    // Add an event listener for the dropdown change event
    transactionSelect.addEventListener("change", function () {
        // Get the selected transaction ID
        const selectedTransactionId = transactionSelect.value;

        // Fetch transaction details based on the selected transaction ID
        fetch(`/getTransactionDetails?id=${selectedTransactionId}`)
            .then(response => response.json())
            .then(data => {
                // Populate the form fields with the retrieved transaction data
                document.getElementById("updateSalePrice").value = data.Sale_price || "";
                document.getElementById("updateCustomerId").value = data.Customer_id || "";
                document.getElementById("updateCarId").value = data.Car_id || "";
                document.getElementById("updateSalespersonId").value = data.Salesperson_id || "";

                // Format the date as "yyyy-MM-dd" before setting the value
                const saleDate = data.Sale_date ? new Date(data.Sale_date).toISOString().split('T')[0] : "";
                document.getElementById("updateSaleDate").value = saleDate;

                document.getElementById("updateFinanceCompany").value = data.Finance_company_id || "";
                document.getElementById("updateLoanAmount").value = data.Loan_amount || "";
                document.getElementById("updateLoanDuration").value = data.Loan_duration || "";
                document.getElementById("updateInterestRate").value = data.Interest_rate || "";
                document.getElementById("updateSaleStatus").value = data.Sale_status || "";
            })
            .catch(error => {
                console.error("Error fetching transaction details:", error);
            });
    });
});
