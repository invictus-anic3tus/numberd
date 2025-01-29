const root = document.documentElement;

const selectorButtons = document.querySelectorAll(".selector-button");
const colorButton = document.getElementById("dark-light");
const icons = document.querySelectorAll(".color-change");

const types = document.querySelectorAll(".conv-type");
const inputs = document.querySelectorAll(".conv-input");
const leftType = document.getElementById("type-left");
const rightType = document.getElementById("type-right");
const leftInput = document.getElementById("b-num-left");
const rightInput = document.getElementById("b-num-right");
const leftArea = document.getElementById('left-text');
const rightArea = document.getElementById('right-text');

const swap = document.getElementById("swap");

var dark = localStorage.getItem("dark") === "true";

const lightBKG = "#FFFFFF";
const lightSidebar = "#f0f1ff";
const darkBKG = "#000000";
const darkSidebar = "#020417";

colorButton.querySelector("img").style.transitionDuration = "0s";
icons.forEach((icon) => {
    icon.style.transitionDuration = "0s";
});

const romanNumerals = {
    m: 1000,
    d: 500,
    c: 100,
    l: 50,
    x: 10,
    v: 5,
    i: 1,
};

const greekNumerals = {
    "ϡ": 900,
    "ω": 800,
    "ψ": 700,
    "χ": 600,
    "φ": 500,
    "υ": 400,
    "τ": 300,
    "σ": 200,
    "ρ": 100,
    "Ϟ": 90,
    "π": 80,
    "ο": 70,
    "ξ": 60,
    "ν": 50,
    "μ": 40,
    "λ": 30,
    "κ": 20,
    "ι": 10,
    "θ": 9,
    "η": 8,
    "ζ": 7,
    "ϛ": 6,
    "ε": 5,
    "δ": 4,
    "γ": 3,
    "β": 2,
    "α": 1
};

if (dark) {
    setColor("initial");
}

setTimeout(() => {
    colorButton.querySelector("img").style.transitionDuration = "0.3s";
    icons.forEach((icon) => {
        icon.style.transitionDuration = "0.3s";
    });
}, 300);

selectorButtons.forEach((button) => {
    button.addEventListener("click", (ev) => {
        selectorButtons.forEach((button2) => {
            button2.className = "selector-button";
        });
        button.className = "selector-button active";
    });
});

colorButton.addEventListener("click", (ev) => {
    if (dark) {
        setColor("dark");
        dark = false;
    } else {
        setColor("light");
        dark = true;
    }
    localStorage.setItem("dark", dark);
});

function setColor(mode) {
    if (mode === "dark") {
        colorButton.querySelector("img").src = "./assets/dark.svg";
        icons.forEach((icon) => {
            icon.style.filter = "invert(100%)";
        });

        root.style.setProperty("--font-color", "black");
        root.style.setProperty("--bkg-color", lightBKG);
        root.style.setProperty("--sidebar-color", lightSidebar);
        root.style.setProperty("--select-color", "rgb(220, 220, 220)");
    } else {
        colorButton.querySelector("img").src = "./assets/light.svg";
        icons.forEach((icon) => {
            icon.style.filter = "invert(0%)";
        });

        root.style.setProperty("--font-color", "white");
        root.style.setProperty("--bkg-color", darkBKG);
        root.style.setProperty("--sidebar-color", darkSidebar);
        root.style.setProperty("--select-color", "rgb(120, 120, 120)");
    }
}

types.forEach((type) => {
    type.addEventListener("change", (ev) => {
        updateUI(type);
    });
});

function funcTransDuration(obj) {
    obj.style.transitionDuration = "0.3s";
}

swap.addEventListener("click", (ev) => {
    swapValues();
});

function swapValues() {
    let origLeftType = leftType.value;
    let origLeftInput = leftInput.value;
    let origLeftArea = leftArea.value;

    leftType.value = rightType.value;
    leftInput.value = rightInput.value;
    leftArea.value = rightArea.innerText;

    rightType.value = origLeftType;
    rightInput.value = origLeftInput;
    rightArea.innerText = origLeftArea;

    updateUI(rightType);
    updateUI(leftType);
}

function updateUI(type) {
    let tid = type.id;
    let side = tid.substring(tid.indexOf("-") + 1);
    let input = document.getElementById("b-num-" + side);

    type.style.transitionDuration = "0s";

    setTimeout(() => {
        type.style.transitionDuration = "0.3s";
    }, 300);

    if (type.value === "b") {
        input.style.display = "inline";
        type.style.borderRadius = "7px 0px 0px 0px";
        // type.style.width = "70%";
        type.style.width = "75%";
    } else {
        input.style.display = "none";
        type.style.borderRadius = "7px 7px 0px 0px";
        // type.style.width = "calc(95% + 4px)";
        type.style.width = "calc(100% - 0px)";
    }
}

/************* Conversion Functions ***********/

leftArea.addEventListener('input', (ev) => updateConversion());
leftType.addEventListener('input', (ev) => updateConversion());
leftInput.addEventListener('input', (ev) => updateConversion());

rightType.addEventListener('input', (ev) => updateConversion());
rightInput.addEventListener('input', (ev) => updateConversion());


function toRomanNumerals(num) {
    if (num > 3999) {
        return 'Number too large!';
    }
    else if (num <= 0) {
        return 'Positive non-zero numbers only for Greek and Roman Numerals.';
    }

    let result = "";

    for (let number in romanNumerals) {
        while (num >= romanNumerals[number]) {
            result += number;
            num -= romanNumerals[number];
        }
    }
    return result
}

function fromRomanNumerals(rawNum) {
    let result = 0;

    let num = rawNum.toLowerCase().trim();

    for (let i = 0; i < num.length; i++) {

        let thisDigit = num[i];
        let nextDigit = num[i + 1];

        if (!romanNumerals.hasOwnProperty(thisDigit)) {
            continue;
        }

        let current = romanNumerals[thisDigit];
        let next = romanNumerals[nextDigit];

        if (next && current < next) {
            result += next - current;
            i++;
        } else {
            result += current;
        }
    }

    return result
}

function toGreekNumerals(num) {
    if (num > 4999) {
        return 'Number too large!';
    }
    else if (num <= 0) {
        return 'Positive non-zero numbers only for Greek and Roman Numerals.';
    }

    let result = '';
    for (let numeral in greekNumerals) {
        while (num >= greekNumerals[numeral]) {
            result += numeral;
            num -= greekNumerals[numeral];
        }
    }
    return result;
}

function fromGreekNumerals(rawNum) {
    let result = 0;
    let prev = 0;

    let num = rawNum.trim();

    for (let i = num.length - 1; i >= 0; i--) {
        let thisDigit = num[i];

        if (!greekNumerals.hasOwnProperty(thisDigit)) {
            continue;
        }

        let val = greekNumerals[thisDigit];

        if (val < prev) {
            result -= val;
        } else {
            result += val;
        }

        prev = val;
    }
    return result;
}

function baseToBase10(num, base) {
    if (typeof num === 'number') {
        num = num.toString();
    }

    return parseInt(num, base);
}

function base10ToBase(num, base) {
    if (typeof num === 'string') {
        num = parseFloat(num);
    }

    return num.toString(base);
}

function updateConversion() {
    let result = '';

    if (leftArea.value === '') {
        return;
    }

    let base10 = '';


    switch (leftType.value) {
        case 'b':
            base10 = baseToBase10(leftArea.value, leftInput.value);

            switch (rightType.value) {
                case 'b':
                    result = base10ToBase(base10, rightInput.value);
                    break;
                case 'roman':
                    result = toRomanNumerals(base10);
                    if (result[1] !== 'u') {
                        result = result.toUpperCase();
                    }
                    break;
                case 'greek':
                    result = toGreekNumerals(base10);
                    break;
                default:
                    break;
            }


            break;

        case 'roman':
            base10 = fromRomanNumerals(leftArea.value);

            switch (rightType.value) {
                case 'b':
                    result = base10ToBase(base10, rightInput.value);
                    break;
                case 'roman':
                    result = toRomanNumerals(base10);
                    if (result[1] !== 'u') {
                        result = result.toUpperCase();
                    }
                    break;
                case 'greek':
                    result = toGreekNumerals(base10);
                    break;
                default:
                    break;
            }

            break;

        case 'greek':
            base10 = fromGreekNumerals(leftArea.value);

            switch (rightType.value) {
                case 'b':
                    result = base10ToBase(base10, rightInput.value);
                    break;
                case 'roman':
                    result = toRomanNumerals(base10);
                    if (result[1] !== 'u') {
                        result = result.toUpperCase();
                    }
                    break;
                case 'greek':
                    result = toGreekNumerals(base10);
                    break;
                default:
                    break;
            }
    }

    rightArea.innerText = result;
}

function setValues(lt, li, rt, ri) {
    leftType.value = lt;
    leftInput.value = li;

    rightType.value = rt;
    rightInput.value = ri;

    updateUI(leftType);
    updateUI(rightType);
    updateConversion();
}
