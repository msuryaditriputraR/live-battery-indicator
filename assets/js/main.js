/*=============== BATTERY ===============*/
const batteryLiquid = document.querySelector(".battery__liquid"),
    batteryStatus = document.querySelector(".battery__status"),
    batteryPercentage = document.querySelector(".battery__percentage");

(function initBattery() {
    navigator.getBattery().then((battery) => {
        updateBattery(battery);

        // Battery Event
        battery.addEventListener("chargingchange", () =>
            updateBattery(battery)
        );
        battery.addEventListener("levelchange", () => updateBattery(battery));
    });
})();

function updateBattery({ level, charging }) {
    // 1. Update the Number level of the battery
    let levelPercent = Math.floor(level * 100);
    batteryPercentage.textContent = levelPercent + " %";

    // 2. update heght of the battery liquid
    batteryLiquid.style.height = `${parseInt(level * 100)}%`;

    // 3. validate full, battery, low battery, charging, or not
    // validate if the battery is full
    if (levelPercent == 100) {
        batteryStatus.innerHTML = `Full Battery <i class="ri-battery-2-fill green-color"></i>`;
        batteryLiquid.style.height = "103%"; // to hide the ellipse
    }
    // validate if the battery is low
    else if ((levelPercent <= 20) & !charging) {
        batteryStatus.innerHTML = `Low Battery <i class="ri-plug-line animated-red"></i>`;
    }
    // validate if the battery is charging
    else if (charging) {
        batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
    }
    // validate if nothing
    else {
        batteryStatus.innerHTML = `Good for Work <i class="ri-star-smile-line green-color"></i>`;
    }

    // Change colors of the battery
    if (levelPercent <= 20) {
        batteryLiquid.className = "battery__liquid gradient-color-red";
    } else if (levelPercent <= 40) {
        batteryLiquid.className = "battery__liquid gradient-color-orange";
    } else if (levelPercent <= 80) {
        batteryLiquid.className = "battery__liquid gradient-color-yellow";
    } else {
        batteryLiquid.className = "battery__liquid gradient-color-green";
    }
}
