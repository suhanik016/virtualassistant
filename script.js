let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    if ('speechSynthesis' in window) {
        // Check if voices are already loaded
        let voices = window.speechSynthesis.getVoices();

        // If voices are not yet loaded, add an event listener
        if (voices.length === 0) {
            window.speechSynthesis.addEventListener('voiceschanged', () => {
                speakWithFemaleVoice(text);
            });
        } else {
            speakWithFemaleVoice(text);
        }
    } else {
        console.warn("Speech synthesis is not supported in this browser.");
    }
}

function speakWithFemaleVoice(text) {
    let voices = window.speechSynthesis.getVoices();
    
    // Look for a female-sounding voice, preferably in "en-US" language
    let femaleVoice = voices.find(voice => 
        voice.name.includes("Female") || voice.name.includes("Zira") || (voice.lang === "en-US" && voice.name.includes("Google"))
    );

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.voice = femaleVoice || voices[0]; // Use the first available voice if no female voice is found
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";

    console.log("Speaking:", text);
    window.speechSynthesis.speak(text_speak)
}

// Testing the function with a sample phrase
speak("Hello, how can I assist you?");


function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// window.addEventListener('load', () => {
//     wishMe();
// });

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onstart = () => {
    console.log("Speech recognition started.");  // Debugging log
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";
    
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    }
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by suhani ma'am");
    }else if (message.includes("how are you")) {
        speak("i am fine what about you");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    }
    else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    }
    else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    }
    else {
        let finalText = "This is what I found on the internet regarding " + message.replace("shipra", "") || message.replace("shifra", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shipra", "")}`, "_blank");
    }
}
