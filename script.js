const inputValue = document.getElementById("user-input");
const number = document.querySelectorAll(".numbers");
const calculate = document.querySelectorAll(".operations");


number.forEach(function (item) {
  item.addEventListener("click", function (e) {
    if (inputValue.innerText === "NaN") {
      inputValue.innerText = "";
    }
    if (inputValue.innerText === "0") {
      inputValue.innerText = "";
    }
    inputValue.innerText += e.target.innerHTML.trim();
  });
});

calculate.forEach(function (item) {
  item.addEventListener("click", function (e) {
    handleOperation(e.target.innerHTML.trim());
  });
});


function handleOperation(key) {
  let lastValue = inputValue.innerText.slice(-1);

  if (!isNaN(lastValue) && key === "=") {
    try {
      inputValue.innerText = eval(inputValue.innerText);
    } catch {
      inputValue.innerText = "NaN";
    }
  } else if (key === "AC") {
    inputValue.innerText = "0";
  } else if (key === "DEL") {
    inputValue.innerText = inputValue.innerText.slice(0, -1);
    if (inputValue.innerText.length == 0) {
      inputValue.innerText = "0";
    }
  } else {
    if (!isNaN(lastValue) || key === ".") {
      inputValue.innerText += key;
    }
  }
}


document.addEventListener("keydown", function (e) {
  const key = e.key;

  // Numbers and decimal
  if (!isNaN(key) || key === ".") {
    if (inputValue.innerText === "0" || inputValue.innerText === "NaN") {
      inputValue.innerText = "";
    }
    inputValue.innerText += key;
  }


  if (["+", "-", "*", "/"].includes(key)) {
    let lastValue = inputValue.innerText.slice(-1);
    if (!["+", "-", "*", "/"].includes(lastValue)) {
      inputValue.innerText += key;
    }
  }

 
  if (key === "Enter") {
    e.preventDefault();
    handleOperation("=");
  }

 
  if (key === "Backspace") {
    handleOperation("DEL");
  }


  if (key === "Delete") {
    handleOperation("AC");
  }
});
