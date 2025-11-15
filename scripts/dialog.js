/* Скрипт для работы с модальными окнами */

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  
  // Получаем элементы (только те, что есть на странице)
  const saveMemoryButton = document.querySelector(".save-memory-button");
  const memoryDialog = document.querySelector(".memory-dialog");
  
  // Открытие модального окна при клике на кнопку "Сохранить на память" (если она есть)
  if (saveMemoryButton && memoryDialog) {
    saveMemoryButton.addEventListener("click", () => {
      memoryDialog.showModal();
    });
  }
  
  // Обработка всех модальных окон на странице
  const allDialogs = document.querySelectorAll("dialog");
  allDialogs.forEach(dialog => {
    // Закрытие модального окна при клике на кнопку "ОК" или "Отлично"
    const okButton = dialog.querySelector(".dialog-ok-button");
    if (okButton) {
      okButton.addEventListener("click", () => {
        dialog.close();
      });
    }
    
    // Закрытие модального окна при клике вне его области
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
  
  // Функция для снятия фокуса с кнопок после клика
  function removeFocusAfterClick() {
    this.blur();
  }
  
  // Добавляем обработчики для всех кнопок
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach(button => {
    button.addEventListener("click", removeFocusAfterClick);
  });
  
  console.log('✅ Скрипт dialog.js инициализирован');
  
});
