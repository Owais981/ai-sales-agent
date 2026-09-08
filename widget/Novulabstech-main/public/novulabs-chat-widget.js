/**
 * AI Sales & Lead Agent - embeddable website chat widget.
 *
 * Drop this into any website with a single <script> tag - no build step,
 * no framework dependency, no CSS to write. Uses Shadow DOM so the widget's
 * styles can never leak into (or be broken by) the host page's stylesheet.
 *
 * Usage:
 *   <script
 *     src="https://your-cdn-or-server.example/novulabs-chat-widget.js"
 *     data-api-url="https://your-backend.example"
 *     data-position="left"
 *     data-title="Chat with NovuLabs"
 *     data-primary-color="#0f766e"
 *     data-greeting="Hi! Ask me anything about our services."
 *   ></script>
 *
 * Talks to the backend's public /api/website-chat/{session}/messages
 * endpoint (see backend/app/api/routes/website_chat.py) - the exact same
 * RAG + LLM + lead-detection pipeline used for WhatsApp, just reached from
 * the browser instead. No login/auth involved; visitors are anonymous.
 */
(function () {
  'use strict';

  var currentScript = document.currentScript;
  if (!currentScript) return;

  var DEFAULT_SUGGESTED_QUESTIONS = [
    'What services do you offer?',
    'What is the pricing?',
    'How do I get started?',
  ];

  function parseSuggestedQuestions(raw) {
    if (!raw) return DEFAULT_SUGGESTED_QUESTIONS;
    var items = raw.split('|').map(function (q) { return q.trim(); }).filter(Boolean);
    return items.length ? items : DEFAULT_SUGGESTED_QUESTIONS;
  }

  var config = {
    apiUrl: (currentScript.getAttribute('data-api-url') || '').replace(/\/$/, ''),
    position: currentScript.getAttribute('data-position') === 'right' ? 'right' : 'left',
    title: currentScript.getAttribute('data-title') || 'Chat with us',
    primaryColor: currentScript.getAttribute('data-primary-color') || '#0f766e',
    greeting: currentScript.getAttribute('data-greeting') || "Hi! Ask me anything and I'll do my best to help.",
    // Generic questions that apply to any software/services company, shown
    // as clickable chips when a visitor first opens the chat - lets people
    // start without having to think of what to type. Override via
    // data-suggested-questions="Q1|Q2|Q3" (pipe-separated) on the script tag.
    suggestedQuestions: parseSuggestedQuestions(currentScript.getAttribute('data-suggested-questions')),
    // Service worker for Web Push notifications - must live on the same
    // origin as the embedding page (a browser restriction). Defaults to the
    // site root, matching the convention of copying it there alongside this
    // script (see widget/README.md).
    swUrl: currentScript.getAttribute('data-sw-url') || '/novulabs-sw.js',
  };

  if (!config.apiUrl) {
    console.error('[novulabs-chat-widget] Missing required data-api-url attribute on the script tag.');
    return;
  }

  function createSessionId() {
    return (window.crypto && window.crypto.randomUUID)
      ? window.crypto.randomUUID()
      : 'sess-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  }

  var SESSION_STORAGE_KEY = 'novulabs_chat_session_id';
  var SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

  // Persisted in localStorage (same id format the backend accepts) so a
  // page refresh resumes the same conversation instead of starting a new
  // one. Falls back to an in-memory-only id if localStorage is unavailable
  // (sandboxed iframes, strict privacy modes can throw on access).
  function loadOrCreateSessionId() {
    var stored = null;
    try {
      stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
    } catch (e) { /* localStorage unavailable - fall through */ }
    if (stored && SESSION_ID_PATTERN.test(stored)) return stored;
    var fresh = createSessionId();
    try {
      window.localStorage.setItem(SESSION_STORAGE_KEY, fresh);
    } catch (e) { /* ignore - widget still works, just won't persist */ }
    return fresh;
  }

  var sessionId = loadOrCreateSessionId();

  function apiPost(path, body) {
    return fetch(config.apiUrl + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(function (res) {
      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          var err = new Error(data.detail || 'Request failed: ' + res.status);
          err.status = res.status;
          throw err;
        });
      }
      return res.json();
    });
  }

  function apiGet(path) {
    return fetch(config.apiUrl + path, { method: 'GET' }).then(function (res) {
      return res.ok ? res.json() : null;
    });
  }

  // ---- Shadow DOM host + styles ----------------------------------------

  var host = document.createElement('div');
  host.id = 'novulabs-chat-widget-root';
  document.body.appendChild(host);
  var shadow = host.attachShadow({ mode: 'open' });

  var sideProp = config.position === 'right' ? 'right' : 'left';

  var style = document.createElement('style');
  style.textContent =
    ':host{all:initial}' +
    '*{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}' +
    '.launcher{position:fixed;' + sideProp + ':24px;bottom:24px;width:60px;height:60px;border-radius:9999px;' +
    'background:' + config.primaryColor + ';color:#fff;border:none;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.2);' +
    'display:flex;align-items:center;justify-content:center;z-index:2147483000;transition:transform .15s ease}' +
    '.launcher:hover{transform:scale(1.06)}' +
    '.launcher svg{width:28px;height:28px}' +
    '.panel{position:fixed;' + sideProp + ':24px;bottom:96px;width:360px;max-width:calc(100vw - 32px);' +
    'height:520px;max-height:calc(100vh - 140px);background:#fff;border-radius:16px;' +
    'box-shadow:0 16px 48px rgba(0,0,0,.24);display:flex;flex-direction:column;overflow:hidden;' +
    'z-index:2147483000;opacity:0;pointer-events:none;transform:translateY(12px);transition:opacity .15s ease,transform .15s ease}' +
    '.panel.open{opacity:1;pointer-events:auto;transform:translateY(0)}' +
    '.header{background:' + config.primaryColor + ';color:#fff;padding:16px 18px;display:flex;align-items:center;justify-content:space-between}' +
    '.header h1{font-size:15px;font-weight:600;margin:0}' +
    '.header p{font-size:12px;opacity:.85;margin:2px 0 0}' +
    '.close-btn{background:transparent;border:none;color:#fff;cursor:pointer;opacity:.85;padding:4px}' +
    '.close-btn:hover{opacity:1}' +
    '.messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f8fafc}' +
    '.msg{max-width:80%;padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.45;white-space:pre-wrap;word-break:break-word}' +
    '.msg.customer{align-self:flex-end;background:' + config.primaryColor + ';color:#fff;border-bottom-right-radius:4px}' +
    '.msg.ai{align-self:flex-start;background:#fff;color:#1e293b;border:1px solid #e2e8f0;border-bottom-left-radius:4px}' +
    '.msg.manager{align-self:flex-start;background:#f5f3ff;color:#5b21b6;border:1px solid #ddd6fe;border-bottom-left-radius:4px}' +
    '.msg.error{align-self:center;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;font-size:12.5px}' +
    '.suggestions{display:flex;flex-direction:column;gap:6px;align-self:flex-start;max-width:90%}' +
    '.suggestion-chip{background:#fff;border:1px solid ' + config.primaryColor + ';color:' + config.primaryColor + ';' +
    'border-radius:9999px;padding:7px 13px;font-size:12.5px;font-weight:500;cursor:pointer;text-align:left;' +
    'transition:background .12s ease}' +
    '.suggestion-chip:hover{background:' + config.primaryColor + '1a}' +
    '.suggestion-chip:disabled{opacity:.5;cursor:not-allowed}' +
    '.typing{align-self:flex-start;display:flex;gap:4px;padding:10px 13px}' +
    '.typing span{width:6px;height:6px;border-radius:9999px;background:#94a3b8;animation:blink 1.2s infinite ease-in-out}' +
    '.typing span:nth-child(2){animation-delay:.2s}.typing span:nth-child(3){animation-delay:.4s}' +
    '@keyframes blink{0%,80%,100%{opacity:.3}40%{opacity:1}}' +
    '.composer{display:flex;gap:8px;padding:12px;border-top:1px solid #e2e8f0;background:#fff}' +
    '.composer textarea{flex:1;resize:none;border:1px solid #cbd5e1;border-radius:10px;padding:9px 11px;font-size:13.5px;' +
    'max-height:80px;outline:none;font-family:inherit}' +
    '.composer textarea:focus{border-color:' + config.primaryColor + '}' +
    '.composer button{background:' + config.primaryColor + ';color:#fff;border:none;border-radius:10px;padding:0 16px;' +
    'font-size:13px;font-weight:600;cursor:pointer;flex-shrink:0}' +
    '.composer button:disabled{opacity:.5;cursor:not-allowed}' +
    '@media (max-width:480px){.panel{width:calc(100vw - 24px);height:calc(100vh - 120px);' + sideProp + ':12px;bottom:88px}' +
    '.launcher{' + sideProp + ':16px;bottom:16px}}' +
    // Height-based, independent of width - catches landscape phones and
    // short browser windows, where the width breakpoint above never fires
    // but there's still barely 300px of vertical space to work with.
    '@media (max-height:500px){.launcher{width:48px;height:48px;bottom:10px}.launcher svg{width:22px;height:22px}' +
    '.panel{bottom:66px;height:calc(100vh - 78px);max-height:calc(100vh - 78px)}' +
    '.header{padding:8px 14px}.header p{display:none}' +
    '.composer textarea{max-height:44px}}';
  shadow.appendChild(style);

  // ---- Markup -------------------------------------------------------------

  var launcher = document.createElement('button');
  launcher.className = 'launcher';
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
    '</svg>';

  var panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML =
    '<div class="header"><div><h1></h1><p>Usually replies in seconds</p></div>' +
    '<button class="close-btn" aria-label="Close chat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
    '<div class="messages"></div>' +
    '<div class="composer"><textarea rows="1" placeholder="Type a message..."></textarea><button type="button">Send</button></div>';
  panel.querySelector('h1').textContent = config.title;

  shadow.appendChild(panel);
  shadow.appendChild(launcher);

  var messagesEl = panel.querySelector('.messages');
  var textareaEl = panel.querySelector('textarea');
  var sendBtn = panel.querySelector('.composer button');
  var closeBtn = panel.querySelector('.close-btn');

  var isOpen = false;
  var isSending = false;
  var hasLoadedHistory = false;
  var lastRenderedMessageId = null;
  var pollTimer = null;

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderMessage(senderType, content) {
    var cls = senderType === 'CUSTOMER' ? 'customer' : (senderType === 'SALES_MANAGER' ? 'manager' : 'ai');
    var el = document.createElement('div');
    el.className = 'msg ' + cls;
    el.textContent = content;
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function renderError(text) {
    var el = document.createElement('div');
    el.className = 'msg error';
    el.textContent = text;
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function renderSuggestions() {
    if (!config.suggestedQuestions.length) return;
    var container = document.createElement('div');
    container.className = 'suggestions';
    config.suggestedQuestions.forEach(function (question) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'suggestion-chip';
      chip.textContent = question;
      chip.addEventListener('click', function () {
        if (isSending) return;
        container.remove();
        sendMessage(question);
      });
      container.appendChild(chip);
    });
    messagesEl.appendChild(container);
    scrollToBottom();
  }

  function showGreeting() {
    if (hasLoadedHistory) return;
    hasLoadedHistory = true;
    // The session id is persisted (see loadOrCreateSessionId above), so a
    // returning visitor may have prior history - check before falling back
    // to the static greeting.
    apiGet('/api/website-chat/' + encodeURIComponent(sessionId))
      .then(function (conversation) {
        if (conversation && conversation.messages && conversation.messages.length) {
          conversation.messages.forEach(function (m) {
            if (m.sender_type === 'CUSTOMER' || m.sender_type === 'AI' || m.sender_type === 'SALES_MANAGER') {
              renderMessage(m.sender_type, m.content);
            }
          });
          lastRenderedMessageId = conversation.messages[conversation.messages.length - 1].id;
        } else {
          renderMessage('AI', config.greeting);
          renderSuggestions();
        }
      })
      .catch(function () {
        renderMessage('AI', config.greeting);
        renderSuggestions();
      });
  }

  function pollForNewMessages() {
    apiGet('/api/website-chat/' + encodeURIComponent(sessionId))
      .then(function (conversation) {
        if (!conversation || !conversation.messages) return;
        var messages = conversation.messages;
        var startIndex = 0;
        if (lastRenderedMessageId) {
          var idx = -1;
          for (var i = 0; i < messages.length; i++) {
            if (messages[i].id === lastRenderedMessageId) { idx = i; break; }
          }
          startIndex = idx >= 0 ? idx + 1 : messages.length;
        }
        for (var j = startIndex; j < messages.length; j++) {
          var m = messages[j];
          if (m.sender_type === 'AI' || m.sender_type === 'SALES_MANAGER') {
            renderMessage(m.sender_type, m.content);
          }
        }
        if (messages.length) lastRenderedMessageId = messages[messages.length - 1].id;
      })
      .catch(function () { /* silent - don't spam the visitor with poll errors */ });
  }

  function startPolling() {
    if (pollTimer) return;
    pollTimer = setInterval(pollForNewMessages, 5000);
  }

  function stopPolling() {
    clearInterval(pollTimer);
    pollTimer = null;
  }

  // ---- Web Push (best-effort - if unsupported or declined, the visitor
  // still gets replies live via polling while the panel is open, and the AI
  // separately asks for an email/WhatsApp number as a fallback) -----------

  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  var hasSetUpPush = false;

  function setupPushNotifications() {
    if (hasSetUpPush) return;
    hasSetUpPush = true;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (Notification.permission === 'denied') return;

    apiGet('/api/website-chat/push/vapid-public-key')
      .then(function (data) {
        if (!data || !data.public_key) return null;
        return navigator.serviceWorker.register(config.swUrl).then(function (registration) {
          return Notification.requestPermission().then(function (permission) {
            if (permission !== 'granted') return null;
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(data.public_key),
            });
          });
        });
      })
      .then(function (subscription) {
        if (!subscription) return;
        return apiPost('/api/website-chat/' + encodeURIComponent(sessionId) + '/push-subscribe', subscription.toJSON());
      })
      .catch(function () { /* best-effort - never block the chat over this */ });
  }

  function sendMessage(overrideText) {
    var text = (overrideText !== undefined ? overrideText : textareaEl.value).trim();
    if (!text || isSending) return;

    isSending = true;
    sendBtn.disabled = true;
    textareaEl.value = '';
    renderMessage('CUSTOMER', text);
    var typingEl = showTyping();
    setupPushNotifications();

    apiPost('/api/website-chat/' + encodeURIComponent(sessionId) + '/messages', { content: text })
      .then(function (conversation) {
        typingEl.remove();
        var last = conversation.messages[conversation.messages.length - 1];
        if (last && (last.sender_type === 'AI' || last.sender_type === 'SALES_MANAGER')) {
          renderMessage(last.sender_type, last.content);
          lastRenderedMessageId = last.id;
        }
      })
      .catch(function (err) {
        typingEl.remove();
        if (err && err.status === 429) {
          renderError("You're sending messages a bit fast - please wait a moment and try again.");
        } else {
          renderError("Sorry, something went wrong. Please try again in a moment.");
        }
      })
      .finally(function () {
        isSending = false;
        sendBtn.disabled = false;
      });
  }

  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    showGreeting();
    startPolling();
    setTimeout(function () { textareaEl.focus(); }, 150);
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
    stopPolling();
  }

  launcher.addEventListener('click', function () {
    if (isOpen) closePanel(); else openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  sendBtn.addEventListener('click', function () { sendMessage(); });
  textareaEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  textareaEl.addEventListener('input', function () {
    textareaEl.style.height = 'auto';
    textareaEl.style.height = Math.min(textareaEl.scrollHeight, 80) + 'px';
  });
})();
