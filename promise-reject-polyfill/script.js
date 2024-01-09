function myReject(value) {
    return new Promise((_, reject) => reject(value));
}

// Test Case 3: Rejecting with a reason
myReject('Rejected with a reason')
  .then((result) => console.log('Test Case 3:', result))
  .catch((error) => console.error('Test Case 3:', error));