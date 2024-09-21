$(document).ready(function() {
    $("#myform").submit(function(event) {
        event.preventDefault(); // Предотвращает отправку формы и перезагрузку страницы

        var search = $("#books").val().trim(); // Удаляет пробелы в начале и конце строки
        if (search === '') {
            alert("Напиши что-то");
            return; // Прерывает выполнение функции, если строка поиска пуста
        }

        var url = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(search);

        $.get(url, function(response) {
            var resultDiv = $('#result');
            resultDiv.empty(); // Очищаем предыдущие результаты

            if (response.items && response.items.length > 0) {
                response.items.forEach(function(item) {
                    var title = $('<h5 class="center-align"></h5>').text(item.volumeInfo.title || 'No title');
                    var authors = $('<h5 class="center-align"></h5>').text(item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'No author');
                    var img = $('<img class="aligning card z-depth-5" id="dynamic">').attr('src', item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'No image');
                    
                    // Создаем кнопку "Buy" с обработчиком клика
                    var buyButton = $('<button class="btn red aligning">Buy</button>').click(function() {
                        // Создаем форму с полями ввода и кнопкой "Отправить"
                        var formHtml = `
                          <div class="purchase-form">
    <form method="post" action="https://script.google.com/macros/s/AKfycbyTvjal6Hux1_LYWV0UwGtljnp6f0zHFaxWzNBDQrA2b_p9ikLa7sQEn7jYRLRwO4tzIw/exec" name="contact-form">
        <h5 class="center-align">Purchase Details</h5>
        <div class="input-field">
            <input type="text" name="name" id="name" required>
            <label for="name">Name</label>
        </div>
        <div class="input-field">
            <input type="email" name="email" id="email" required>
            <label for="email">Email</label>
        </div>
        <div class="input-field">
            <input type="tel" name="phone" id="phone" required>
            <label for="phone">Phone</label>
        </div>
        <div class="input-field">
            <input type="text" name="address" id="address" required>
            <label for="address">Address</label>
        </div>
        <button class="btn green" type="submit">Submit</button>
    </form>
</div>

                        `;
                        resultDiv.append(formHtml);
                    });

                    var itemDiv = $('<div></div>').append(title, authors, img, buyButton);
                    resultDiv.append(itemDiv);
                });
            } else {
                resultDiv.append('<p>No results found.</p>');
            }
        }).fail(function() {
            alert("Error fetching data from the API.");
        });

        return false; // Необходимо для предотвращения отправки формы
    });
});

