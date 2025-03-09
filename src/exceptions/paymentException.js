class PaymentException extends Error {
    constructor(message) {
        super(message);
        this.name = "PaymentException";
    }
}

module.exports = PaymentException;