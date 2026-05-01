// Back to top functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopLinks = document.querySelectorAll('a[href="#top"]');
  
  backToTopLinks.forEach((link) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const header = document.getElementById('top');
      if (header) {
        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
