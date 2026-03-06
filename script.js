const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function append(value) {
    if (display.value === "Error" || display.value === "0") display.value = "";
    display.value += value;
}

function clearDisplay() { display.value = ""; }

function backspace() { display.value = display.value.slice(0, -1); }

function calculate() {
    try {
        let exp = display.value;
        if (!exp) return;
        
        // Handling basic math safely
        let res = eval(exp.replace(/×/g, '*').replace(/÷/g, '/'));
        
        // Rounding to avoid long decimals
        res = parseFloat(res.toFixed(8));
        display.value = res;
        
        // History management
        let li = document.createElement("li");
        li.innerHTML = `${exp} = <strong>${res}</strong>`;
        historyList.prepend(li);
        if (historyList.children.length > 3) historyList.lastChild.remove();
        
    } catch {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

function toggleMode() {
    const isDark = document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    document.querySelector(".mode-btn").textContent = isDark ? "☀️" : "🌙";
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) append(e.key);
    if (e.key === "Enter") { e.preventDefault(); calculate(); }
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clearDisplay();
});