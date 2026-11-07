
const form = document.getElementById("taxiForm");
const result = document.getElementById("result");
const baseFare = 70;
const farePerKm = 100;

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const pickUp = document.getElementById("pickupForm").value.trim();
    const destination = document.getElementById("distForm").value.trim();
    const distance = Number( document.getElementById("distance").value);
    const service = document.getElementById("service").value;
    const discountType = document.getElementById("discount").value;
    result.innerHTML = "";
    if (pickUp === "") {

        result.innerHTML = `
            <div class="alert alert-danger">
                Please enter your pickup location.
            </div>
        `;
        return;
    }
    if (destination === "") {

        result.innerHTML = `
            <div class="alert alert-danger">
                Please enter your destination.
            </div>
        `;
        return;
    }
    if (pickUp.toLowerCase() === destination.toLowerCase()) {

        result.innerHTML = `
            <div class="alert alert-warning">
                Please choose a different destination.
            </div>
        `;
        return;
    }
    if (!Number.isFinite(distance) || distance <= 0) {

        result.innerHTML = `
            <div class="alert alert-danger">
                Please enter a valid distance.
            </div>
        `;
        return;
    }
    if (service !== "regular" && service !== "peak") {

        result.innerHTML = `
            <div class="alert alert-warning">
                Please select a service.
            </div>
        `;

        return;
    }

    const validDiscounts = [
        "none",
        "student",
        "lowIncome",
        "disability"
    ];

    if (!validDiscounts.includes(discountType)) {

        result.innerHTML = `
            <div class="alert alert-warning">
                Please select a discount option.
            </div>
        `;

        return;
    }
    const totalFare = baseFare + (farePerKm * distance);
    let peakCharge = 0;
    if (service === "peak") {
        peakCharge = totalFare * 0.30;
    }
    const fareBeforeDiscount = totalFare + peakCharge;


    let discountRate = 0;
    let discountReason = "No Discount";

    if (discountType === "student") {

        discountRate = 0.08;
        discountReason = "Student Discount (8%)";

    } else if (discountType === "lowIncome") {

        discountRate = 0.10;
        discountReason = "Low Income Discount (10%)";

    } else if (discountType === "disability") {

        discountRate = 0.30;
        discountReason = "Disability Discount (30%)";

    }

    const discountAmount = fareBeforeDiscount * discountRate;
    const taxiFare = fareBeforeDiscount - discountAmount;
    result.innerHTML = `
        <div class="card border-success">
            <div class="card-header bg-success text-white">

                <h4 class="mb-0">
                    <i class="bi bi-check-circle-fill"></i>
                    Ride Fare Calculated
                </h4>

            </div>

            <div class="card-body">

                <p>
                    <strong>From:</strong>
                    ${pickUp}
                </p>

                <p>
                    <strong>To:</strong>
                    ${destination}
                </p>

                <p>
                    <strong>Distance:</strong>
                    ${distance} KM
                </p>

                <p>
                    <strong>Price per KM:</strong>
                    ${farePerKm} Birr
                </p>

                <p>
                    <strong>Base Fare:</strong>
                    ${baseFare.toFixed(2)} Birr
                </p>

                <p>
                    <strong>Basic Fare:</strong>
                    ${totalFare.toFixed(2)} Birr
                </p>

                <p>
                    <strong>Service:</strong>
                    ${service === "peak" ? "Peak Hour" : "Regular Schedule"}
                </p>

                <p>
                    <strong>Peak Hour Charge:</strong>
                    ${peakCharge.toFixed(2)} Birr
                </p>

                <p>
                    <strong>Discount:</strong>
                    ${discountReason}
                </p>

                <p>
                    <strong>Discount Amount:</strong>
                    ${discountAmount.toFixed(2)} Birr
                </p>

                <hr>

                <h4 class="text-success">
                    Total Fare: ${taxiFare.toFixed(2)} Birr
                </h4>

            </div>

        </div>

    `;
});
form.addEventListener("reset", function () {
    result.innerHTML = "";
});

