function goBackToCategory(event) {
    event.preventDefault();
    var lastProductCategory = sessionStorage.getItem('lastProductCategory');
    if (lastProductCategory) {
      var categoryLink = document.querySelector('.nav-link.produtos-letra[data-section="' + lastProductCategory + '"]');
      if (categoryLink) {
        selectNavItem({ target: categoryLink, preventDefault: function () { } });
      }
    }
  }
  