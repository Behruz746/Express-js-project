// DOM elementlarini yuklanganda ishlaydi
document.addEventListener("DOMContentLoaded", () => {
  const removeBtn = document.querySelector(".remove__btn");
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      const promisDiv = document.querySelector(".promis");
      if (promisDiv) {
        promisDiv.remove();
      }
    });
  }
});
