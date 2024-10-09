function calculateSHA256(input) {
  const msgBuffer = new TextEncoder().encode(input);

  return crypto.subtle.digest('SHA-256', msgBuffer)
      .then(function(hashBuffer) {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(function(b) {
              return b.toString(16).padStart(2, '0');
          }).join('');

          return hashHex;
      })
      .then(function(hash) {
          document.getElementById('sha256Result').innerText = 'SHA-256 Hash: ' + hash;
      })
      .catch(function(err) {
          console.error('Error calculating SHA-256 hash:', err);
      });
}

function handleSHA256() {
  const textToHash = document.getElementById('textToHash').value;
  calculateSHA256(textToHash);
}
