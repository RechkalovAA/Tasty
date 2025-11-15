/* Скрипт для обработки формы петиции */

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  
  // Получаем элементы
  const petitionForm = document.getElementById("petitionForm");
  const thankYouDialog = document.querySelector(".thank-you-dialog");
  const supportersCountElement = document.getElementById("supportersCount");
  
  // Проверяем, что все элементы найдены
  if (!petitionForm || !thankYouDialog || !supportersCountElement) {
    console.error('Не удалось найти необходимые элементы формы');
    return;
  }
  
  const dialogOkButton = thankYouDialog.querySelector(".dialog-ok-button");
  
  // Начальное количество поддержавших
  let supportersCount = 1247;
  
  // Обработка отправки формы
  petitionForm.addEventListener("submit", (event) => {
    // ВАЖНО: Предотвращаем стандартное поведение формы
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Форма отправлена!'); // Для отладки
    
    // Проверяем валидность формы
    if (!petitionForm.checkValidity()) {
      petitionForm.reportValidity();
      return false;
    }
    
    // Получаем данные формы
    const formData = new FormData(petitionForm);
    const data = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      consent: formData.get("consent") === "on",
    };
    
    // Здесь можно отправить данные на сервер
    console.log("Данные петиции:", data);
    console.log("✅ Форма успешно обработана!");
    
    // Увеличиваем счетчик поддержавших
    supportersCount++;
    supportersCountElement.textContent = supportersCount.toLocaleString("ru-RU");
    
    // Очищаем форму
    petitionForm.reset();
    
    // Показываем модальное окно благодарности
    try {
      thankYouDialog.showModal();
      console.log('Модальное окно открыто');
    } catch (error) {
      console.error('Ошибка при открытии модального окна:', error);
      alert('Спасибо за вашу поддержку! Ваш голос учтён.');
    }
    
    return false; // Дополнительная защита от отправки
  });
  
  // Закрытие модального окна при клике на кнопку "Отлично"
  if (dialogOkButton) {
    dialogOkButton.addEventListener("click", () => {
      thankYouDialog.close();
    });
  }
  
  // Закрытие модального окна при клике вне его области
  thankYouDialog.addEventListener("click", (event) => {
    if (event.target === thankYouDialog) {
      thankYouDialog.close();
    }
  });
  
  // Валидация телефона в реальном времени
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (event) => {
      // Убираем все символы кроме цифр, плюса, пробелов, тире и скобок
      let value = event.target.value.replace(/[^\d\+\s\-\(\)]/g, "");
      event.target.value = value;
    });
  }
  
  // Добавляем анимацию для полей формы при фокусе
  const formInputs = document.querySelectorAll(".form-input");
  formInputs.forEach((input) => {
    input.addEventListener("focus", function() {
      this.parentElement.classList.add("focused");
    });
    
    input.addEventListener("blur", function() {
      this.parentElement.classList.remove("focused");
    });
  });
  
  console.log('✅ Скрипт формы инициализирован');
  
});

