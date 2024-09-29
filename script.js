document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы
    const modal = document.createElement('div');
    const modalContent = document.createElement('img');
    const closeBtn = document.createElement('span');

    // Устанавливаем атрибуты для модального окна и его содержимого
    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    closeBtn.classList.add('close');

    // Добавляем текст для кнопки закрытия
    closeBtn.innerHTML = '&times;';

    // Присоединяем элементы модального окна к документу
    modal.appendChild(modalContent);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    // Переменная для текущего языка
    let currentLanguage = 'en'; // По умолчанию английский

    // Функция для загрузки данных из JSON файла
    function loadLanguage(language) {
        fetch(`./data/${language}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Очищаем предыдущие данные
                document.getElementById('header').innerHTML = '';
                document.getElementById('left-column').innerHTML = '';
                document.getElementById('right-column').innerHTML = '';

                // Заполнение верхнего блока с личной информацией
                document.getElementById('header').innerHTML = `
                <div class="profile-picture">
                    <img src="./assets/img/ava-circle.png" alt="img" id="profile-img">
                </div>
                    <div class="personal-info">
                        <h1>${data.header.name}</h1>
                        <h2>${data.header.title}</h2>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${data.header.location}</p>
                    </div>
                `;

                // Добавляем обработчик события для изображения профиля
                attachProfileImgClickHandler();

                // Заполнение контактной информации
                document.getElementById('left-column').innerHTML += `
                    <section class="about section-card">
                        <h2>Contact</h2>
                        <p><i class="fas fa-envelope"></i> <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
                        <p><i class="fas fa-phone"></i> <a href="tel:${data.contact.phone}">${data.contact.phone}</a></p>
                        <p><i class="fab fa-linkedin"></i> <a href="${data.contact.linkedin}">LinkedIn</a></p>
                        <p><i class="fab fa-github"></i> <a href="${data.contact.github}">GitHub</a></p>
                    </section>
                `;

                // Заполнение навыков
                const skillsList = data.skills.map(skill => `<li><i class="fas fa-code"></i> ${skill}</li>`).join('');
                document.getElementById('left-column').innerHTML += `
                    <section class="skills section-card">
                        <h2>Skills</h2>
                        <ul class="skill-list">${skillsList}</ul>
                    </section>
                `;

                // Заполнение языков
                const languagesList = data.languages.map(lang => `<li><span>${lang.language}</span> - ${lang.level}</li>`).join('');
                document.getElementById('left-column').innerHTML += `
                    <section class="languages section-card">
                        <h2>Languages</h2>
                        <ul class="lang-list">${languagesList}</ul>
                    </section>
                `;

                // Заполнение опыта работы
                const experienceList = data.experience.map(job => `
                    <div class="job section-card">
                        <h3>${job.jobTitle}</h3>
                        ${job.company ? `<h4 class="company">${job.company}</h4>` : ''}
                        <p>${job.duration}</p>
                        <ul>${job.tasks.map(task => `<li>${task}</li>`).join('')}</ul>
                    </div>
                `).join('');
                document.getElementById('right-column').innerHTML += `
                    <section class="experience section-card">
                        <h2>Experience</h2>
                        ${experienceList}
                    </section>
                `;

                // Заполнение образования
                const educationList = data.education.map(edu => `
                    <div class="edu-item">
                        <h3>${edu.degree}</h3>
                        <p>${edu.institution} | ${edu.year}</p>
                    </div>
                `).join('');
                document.getElementById('right-column').innerHTML += `
                    <section class="education section-card">
                        <h2>Education</h2>
                        ${educationList}
                    </section>
                `;
            })
            .catch(error => console.error('Error loading the resume data:', error));
    }

    function attachProfileImgClickHandler() {
        const profileImg = document.getElementById("profile-img");
        if (profileImg) { // Проверяем, существует ли элемент
            profileImg.addEventListener('click', () => {
                modalContent.src = profileImg.src; // Устанавливаем изображение в модале
                modal.classList.add('active'); // Показываем модальное окно
            });
        }
    }

    // Загрузка английской версии по умолчанию
    loadLanguage(currentLanguage);

    // Обработчики событий для кнопок
    document.getElementById("btn-en").addEventListener("click", () => {
        currentLanguage = 'en';
        loadLanguage(currentLanguage);
    });

    document.getElementById("btn-cz").addEventListener("click", () => {
        currentLanguage = 'cz';
        loadLanguage(currentLanguage);
    });

    document.getElementById("btn-ru").addEventListener("click", () => {
        currentLanguage = 'ru';
        loadLanguage(currentLanguage);
    });

    // Обработчик события для закрытия модального окна
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active'); // Скрываем модальное окно
    });

    // Закрытие модального окна при нажатии вне изображения
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active'); // Скрываем модальное окно
        }
    });

        // Закрытие модального окна при клике на любое место модального окна
        modal.addEventListener('click', () => {
            modal.classList.remove('active'); // Скрываем модальное окно
        });
    
        // Закрытие при нажатии клавиши Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modal.classList.remove('active'); // Скрываем модальное окно
            }
        });
    
});
