        const searchInput = document.getElementById("searchInput");
        const searchButton = document.getElementById("searchButton");
        const photoContainer = document.getElementById("photoContainer");

        // Функция для отображения фото
        function displayPhotos(photos) {

            photos.forEach(photo => {
                const photoDiv = document.createElement("div");
                photoDiv.classList.add("photo");

                const img = document.createElement("img");
                img.src = photo.urls.small;
                img.alt = photo.description;

                const description = document.createElement("p");
                description.textContent = photo.description;

                // Добавьте другие поля на ваше усмотрение

                photoDiv.appendChild(img);
                photoDiv.appendChild(description);
                photoContainer.appendChild(photoDiv);
            });
        }

        // Функция для выполнения поискового запроса
        function searchPhotos() {
            const query = searchInput.value;
            const apiKey = 'PEN13SceLN2Kkv6xXMzwaarzcuSZdS9oGkkluF1IvSA';
            const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&per_page=10&client_id=${apiKey}`;

            // Очистить предыдущие фотографии
            photoContainer.innerHTML = "";

            // Выполнить GET-запрос к API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const photos = data.results;
                    displayPhotos(photos);
                })
                .catch(error => {
                    console.error('Ошибка при выполнении запроса к API:', error);
                });
        }


        // Обработчик события для кнопки поиска
        searchButton.addEventListener("click", searchPhotos);

        // Обработчик события для клавиши Enter
        searchInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                searchPhotos();
            }
        });


        // Обработчик события для очистки поля ввода
        searchInput.addEventListener("input", function() {
            const inputValue = searchInput.value;

            if (inputValue) {
                // Если есть текст в поле ввода, показать крестик
                searchInput.classList.add("hasValue");
            } else {
                // Если поле ввода пустое, скрыть крестик и вернуть placeholder
                searchInput.classList.remove("hasValue");
            }
        });

        // Обработчик события для удаления текста по клику на крестик
        searchInput.addEventListener("click", function() {
            searchInput.value = "";
            searchInput.classList.remove("hasValue");
        });

        

        // Устанавливаем фокус на поле ввода при загрузке страницы
        window.addEventListener("load", function() {
            searchInput.focus();
        });