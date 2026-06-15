// Back to top functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopLinks = document.querySelectorAll('a[href="#top"], .footer-top-btn');

  backToTopLinks.forEach((link) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
