document.getElementById("nav-ticket-kiner-btn").addEventListener("click", function () {
    document.getElementById("ticket-keter-section").scrollIntoView({ behavior: "smooth" });
});

function totalSeatReduceFunction() {
    const totalSeat = parseInt(document.getElementById("total-seat").innerText) - 1;
    document.getElementById("total-seat").innerText = totalSeat;
}

function totalSeatIncreaseFunction() {
    const totalSeat = parseInt(document.getElementById("total-seat").innerText) + 1;
    document.getElementById("total-seat").innerText = totalSeat;
}

function seatSelectionAdded() {
    const selectedSeat = parseInt(document.getElementById("selected-seat").innerText) + 1;
    document.getElementById("selected-seat").innerText = selectedSeat;
}

function seatSelectionRemoved() {
    const selectedSeat = parseInt(document.getElementById("selected-seat").innerText) - 1;
    document.getElementById("selected-seat").innerText = selectedSeat;
}

let buttons = document.querySelectorAll(".seat-row button");
let selectedSeatsCount = 0;
let discountApplied = false;
let discountCode = "";
const pricePerSeat = 500;

function toWriteEverySeat(seatName) {
    const div = document.createElement("div");
    div.classList.add("flex", "justify-between", "items-center", "mb-4");
    div.setAttribute("id", `selected-seat-${seatName}`);

    const p1 = document.createElement("p");
    p1.classList.add("text-[#03071299]", "text-base", "font-normal");
    p1.innerText = seatName;

    const p2 = document.createElement("p");
    p2.classList.add("text-[#03071299]", "text-base", "font-normal");
    p2.innerText = "Economy";

    const p3 = document.createElement("p");
    p3.classList.add("text-[#03071299]", "text-base", "font-normal");
    p3.innerText = "500";

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    document.getElementById("to-write-a-seat").appendChild(div);
}

function removeSeatEntry(seatName) {
    const seatDiv = document.getElementById(`selected-seat-${seatName}`);
    if (seatDiv) seatDiv.remove();
}

for (let button of buttons) {
    button.addEventListener("click", function () {
        let seatElement = document.getElementById(button.innerText);
        let seatName = seatElement.innerText;

        if (!seatElement.classList.contains("change-seat")) {
            if (selectedSeatsCount >= 4) {
                alert("You can only select up to 4 seats.");
                return;
            }

            seatElement.classList.add("change-seat");
            selectedSeatsCount++;
            totalSeatReduceFunction();
            seatSelectionAdded();
            toWriteEverySeat(seatName);
        } else {
            seatElement.classList.remove("change-seat");
            selectedSeatsCount--;
            totalSeatIncreaseFunction();
            seatSelectionRemoved();
            removeSeatEntry(seatName);
        }

        updateTotalPrice();
    });
}

function updateTotalPrice() {
    let totalPrice = selectedSeatsCount * pricePerSeat;
    let discountAmount = 0;

    if (discountApplied) {
        if (discountCode === "COUPLE 20" && selectedSeatsCount >= 2) {
            discountAmount = totalPrice * 0.20;
        } else if (discountCode === "NEW15" && selectedSeatsCount >= 1) {
            discountAmount = totalPrice * 0.15;
        } else {
            discountApplied = false;
            discountCode = "";
        }
    }

    const finalPrice = totalPrice - discountAmount;
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
    document.getElementById("grand-total").innerText = finalPrice.toFixed(2);
}

// Discount section
const discountBtn = document.getElementById("discount-btn");
discountBtn.disabled = true;
const discountInput = document.getElementById("discount-input");

discountInput.addEventListener("input", function () {
    const code = discountInput.value.trim().toUpperCase();
    if ((code === "NEW15" && selectedSeatsCount >= 1) || (code === "COUPLE 20" && selectedSeatsCount >= 2)) {
        discountBtn.disabled = false;
    } else {
        discountBtn.disabled = true;
    }
});

discountBtn.addEventListener("click", function () {
    const code = discountInput.value.trim().toUpperCase();

    if (discountApplied) {
        alert("You have already used a discount code. Only one code can be used.");
        discountInput.value = "";
        discountBtn.disabled = true;
        return;
    }

    if (code === "NEW15" && selectedSeatsCount >= 1) {
        discountApplied = true;
        discountCode = "NEW15";
    } else if (code === "COUPLE 20" && selectedSeatsCount >= 2) {
        discountApplied = true;
        discountCode = "COUPLE 20";
    } else {
        discountInput.value = "";
        discountBtn.disabled = true;
        return;
    }

    discountInput.value = "";
    discountBtn.disabled = true;
    updateTotalPrice();
});

// Personal details
document.getElementById("details-btn").disabled = true;
const phoneNumber = document.getElementById("phone-number");

phoneNumber.addEventListener("input", function () {
    document.getElementById("details-btn").disabled = phoneNumber.value === "";
});

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-id");

document.getElementById("details-btn").addEventListener("click", function () {
    document.getElementById("header").classList.add("hidden");
    document.getElementById("main").classList.add("hidden");
    document.getElementById("footer").classList.add("hidden");
    document.getElementById("next-page").classList.remove("hidden");
    nameInput.value = "";
    phoneNumber.value = "";
    emailInput.value = "";
});

document.getElementById("continue-btn").addEventListener("click", function () {
    document.getElementById("header").classList.remove("hidden");
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("footer").classList.remove("hidden");
    document.getElementById("next-page").classList.add("hidden");
});
