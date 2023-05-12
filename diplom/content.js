// Функция, которая будет вызвана при нажатии кнопки
function saveMhtml() {
  // Создаем новый XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Устанавливаем тип ответа как "document"
  xhr.responseType = 'document';

  // Отправляем GET-запрос на текущую страницу
  xhr.open('GET', window.location.href, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const boundary = '----=_NextPart_001_0000_01D47BC4.C7E2C0D0';
      const html = xhr.response.documentElement.outerHTML;
      const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);

      const mhtml = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/related; boundary="' + boundary + '";',
        '',
        '--' + boundary,
        'Content-Type: text/html; charset="utf-8"',
        'Content-Transfer-Encoding: 7bit',
        '',
        html,
        '',
        '--' + boundary + '--'
      ].join('\n');

      const blob = new Blob([mhtml], { type: 'multipart/related' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'index.mhtml';
      document.body.appendChild(link);
      link.click();

      // Освобождаем ссылку на Blob
      URL.revokeObjectURL(url);

      console.log('HTML-код сохранен в файле index.mhtml');
    } else {
      console.error('Не удалось загрузить HTML-код страницы');
    }
  };

  xhr.send();
}

// Создаем кнопку
const button = document.createElement('button');
button.textContent = 'Копировать HTML';
button.style.position = 'fixed';
button.style.top = "10px";
button.style.right = "10px";
button.style.backgroundColor = '#f5b342';
button.style.color = 'white';
button.style.padding = "8px";
button.style.borderRadius = "8px";
button.style.border = 'none'

// Добавляем обработчик события клика на кнопку
button.addEventListener('click', saveMhtml);

// Добавляем кнопку на страницу
document.body.appendChild(button);
