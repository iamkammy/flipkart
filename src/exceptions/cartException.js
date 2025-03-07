class CartException extends Error {
    constructor(message) {
        super(message);
        this.name = "CartException";
    }
}

function handleCartException(error) {
    if (error instanceof CartException) {
        console.error(`CartException: ${error.message}`);
        // Handle the cart exception (e.g., show a user-friendly message, log the error, etc.)
    } else {
        // Re-throw the error if it's not a CartException
        throw error;
    }
}

// Example usage:
try {
    throw new CartException("Item not found in the cart.");
} catch (error) {
    handleCartException(error);
}