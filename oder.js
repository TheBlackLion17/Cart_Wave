function nextStep() {
    // Get current step
    var currentStep = document.querySelector('.step:not([style="display: none;"])');
    // Hide current step
    currentStep.style.display = 'none';
    // Show next step
    var nextStep = currentStep.nextElementSibling;
    nextStep.style.display = 'block';
}
document.getElementById('multi-step-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Collect form data
    var formData = new FormData(this);
    var formObject = {};
    formData.forEach(function(value, key){
        formObject[key] = value;
    });

    // Send form data to Telegram
    sendToTelegram(formObject);
});

function sendToTelegram(data) {
    // Form your message with the data
    var message = `New order received!\nName: ${data.name}\nAddress: ${data.address}\nPincode: ${data.pincode}\nNumber: ${data.number}\nCode: ${data.code}\nColour: ${data.colour}\nPrice: ${data.price}\nUrl: ${data.url}`;

    // Replace 'YOUR_TELEGRAM_BOT_TOKEN' and 'YOUR_CHAT_ID' with your actual bot token and chat ID
    var telegramUrl = `https://api.telegram.org/bot6764235697:AAFw3YnDOML69FqBTvsWKxnZ2WXmS2xCMQ0/sendMessage?chat_id=@cart_wave&text=${encodeURIComponent(message)}`;

    // Send message to Telegram
    fetch(telegramUrl)
        .then(response => response.json())
        .then(data => {
            // If the message was sent successfully, send the screenshot image
            if (data.ok) {
                sendScreenshotToTelegram(data.result.chat.id, data.result.message_id);
            }
        })
        .catch(error => console.error(error));
}

function sendScreenshotToTelegram(chatId, messageId) {
    var fileInput = document.getElementById('paymentScreenshot');
    var screenshotFile = fileInput.files[0];

    // Check if a file is selected
    if (screenshotFile) {
        var formData = new FormData();
        formData.append('photo', screenshotFile);

        // Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
        var telegramUploadUrl = `https://api.telegram.org/bot6764235697:AAFw3YnDOML69FqBTvsWKxnZ2WXmS2xCMQ0/sendPhoto`;

        // Append chat_id and reply_to_message_id parameters
        telegramUploadUrl += `?chat_id=${chatId}&reply_to_message_id=${messageId}`;

        // Send screenshot image to Telegram
        fetch(telegramUploadUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
}
