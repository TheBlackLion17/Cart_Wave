// Function to send a message and image to Telegram channel
function sendTelegramMessage(product,price,imageURL) {
    // Telegram bot token
    const token = '6764235697:AAFw3YnDOML69FqBTvsWKxnZ2WXmS2xCMQ0';

    // Telegram channel ID
    const chatId = '@cart_wave';
    
    const product = {
        product: "APPLE SMARTWATCH T800 ULTRA",
        price: 599,
        imageURL: "https://telegra.ph/file/af28b41c0ec9bf8a9bde7.jpg",
        // Add more properties as needed
    };
   
    // Message content
    const message = `New product available!\n\nProduct: ${product}\nPrice: ${price}\nUrl: ${imageURL}`;

    // Construct the URL for sending a message
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    // Make the HTTP request to send the message
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

    // If imageUrl is provided, send the image as well
    if (imageUrl) {
        const photoUrl = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${chatId}&photo=${encodeURIComponent(imageUrl)}`;

        fetch(photoUrl)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
}
<script src="code.js"></script>
