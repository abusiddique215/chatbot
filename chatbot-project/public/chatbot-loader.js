(function() {
  const script = document.createElement('script');
  script.src = 'https://your-nextjs-app-url.com/_next/static/chunks/pages/index.js';
  script.onload = function() {
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'headstarter-chatbot';
    document.body.appendChild(chatbotContainer);
    
    const root = ReactDOM.createRoot(chatbotContainer);
    root.render(React.createElement(FloatingChatButton));
  };
  document.head.appendChild(script);
})();
