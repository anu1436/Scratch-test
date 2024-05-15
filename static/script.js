document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('scratchPad');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const scratchAgainButton = document.getElementById('scratchAgain');
    const quoteText = document.getElementById('quote');
    let category = 'motivational';
  
    let isDrawing = false;
  
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    function startDrawing(e) {
      isDrawing = true;
      if (e.touches) e = e.touches[0]; 
      draw(e);
      if (!scratchAgainButton.style.display || scratchAgainButton.style.display === 'none') {
        scratchAgainButton.style.display = 'block';  
      }
    }
  
    function stopDrawing(e) {
      if (e.touches) e.preventDefault(); 
      isDrawing = false;
    }
  
    function draw(e) {
      if (!isDrawing) return;
      if (e.touches) e.preventDefault();
      let rect = canvas.getBoundingClientRect();
      let x = (e.clientX || e.touches[0].clientX) - rect.left;
      let y = (e.clientY || e.touches[0].clientY) - rect.top;
  
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    function fetchQuote() {
      const url = 'quotes11.json';  // URL to your static JSON file
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const randomIndex = Math.floor(Math.random() * data.length);
          quoteText.textContent = data[randomIndex].text;
        })
        .catch(error => console.error('Error fetching quote:', error));
    }
  
    fetchQuote();  
  
    scratchAgainButton.addEventListener('click', function() {
      ctx.globalCompositeOperation = 'source-over';  
      ctx.fillStyle = '#f0f0f0';  
      ctx.fillRect(0, 0, canvas.width, canvas.height);  
      scratchAgainButton.style.display = 'none';  
      fetchQuote();
      ctx.globalCompositeOperation = 'destination-out'; 
    });
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('mousemove', draw);
  
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
    canvas.addEventListener('touchmove', draw);
  
    // Expose the copyToClipboard function to the global window object
    window.copyToClipboard = function() {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
            console.log('Text successfully copied to clipboard');
            alert("Link copied to clipboard!");
        })
        .catch(err => {
            console.error('Failed to copy text to clipboard: ', err);
        });
    };
  
  });
  