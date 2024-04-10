document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Collect form data
    var formData = new FormData(this);
    var formObject = {};
    formData.forEach(function(value, key){
        formObject[key] = value;
    });

    // Send comment to Telegram
    sendToTelegram(formObject);
});

function sendToTelegram(data) {
    // Form your message with the comment data
    var message = `New comment received!\nName: ${data.name}\nTelegram Username: ${data.username}\nComment: ${data.comment}`;

    // Replace 'YOUR_TELEGRAM_BOT_TOKEN' and 'YOUR_CHAT_ID' with your actual bot token and chat ID
    var telegramUrl = `https://api.telegram.org/bot6826823427:AAGSdmNjmogyMb8Au_BkkWlu8kH7OP8Nct8/sendMessage?chat_id=@comment_cart_wave&text=${encodeURIComponent(message)}`;

    // Send message to Telegram
    fetch(telegramUrl)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}
