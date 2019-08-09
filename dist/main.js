"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raspi_1 = require("raspi");
var raspi_gpio_1 = require("raspi-gpio");
raspi_1.init(function () {
    var input = new raspi_gpio_1.DigitalInput('P1-3');
    var output = new raspi_gpio_1.DigitalOutput('P1-5');
    output.write(input.read());
});
