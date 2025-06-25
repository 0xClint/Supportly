"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashEmail = hashEmail;
const crypto_1 = require("crypto");
function hashEmail(email) {
    return `sptly-${(0, crypto_1.createHash)("sha256")
        .update(email.toLowerCase())
        .digest("hex")
        .slice(0, 16)}z`;
}
