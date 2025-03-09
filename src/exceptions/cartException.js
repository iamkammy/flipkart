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

// Output:
// CartException: Item not found in the cart. 
    // In this example, we define a custom exception class called  CartException  that extends the built-in  Error  class. The  CartException  class has a custom  name  property and a constructor that sets the error message. We also define a function called  handleCartException  to handle instances of  CartException . 
    // When an error is thrown using  throw new CartException("Item not found in the cart.") , we catch the error and call the  handleCartException  function to handle the exception. If the error is not an instance of  CartException , we re-throw the error. 
    // 5. Using Custom Error Classes in Node.js 
    // In Node.js, you can define custom error classes and use them in your applications. Here's an example of how you can define and use a custom error class in a Node.js application: