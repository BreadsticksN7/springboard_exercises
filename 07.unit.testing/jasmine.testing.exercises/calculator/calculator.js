window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const loan = { amount: 10000, years: 5, rate: 4.5 }
  const loanAmount = document.getElementById('loan-amount');
  loanAmount.value = loan.amount;
  const loanYear = document.getElementById('loan-years');
  loanYear.value = loan.years;
  const loanRate = document.getElementById('loan-rate');
  loanRate.value = loan.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentLoan = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentLoan));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const monthlyAmount = Math.floor(values.years * 12);
  return (
    (monthlyRate * values.amount) / (1 - Math.pow((1 + monthlyRate), -monthlyAmount))
  ).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyBill = document.getElementById('monthly-payment');
  monthlyBill.innerText = '$' + monthly;
}
