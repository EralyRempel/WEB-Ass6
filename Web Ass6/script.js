
document.addEventListener('DOMContentLoaded', () => {

  // NOTE (Assignment 6): the booking form validation now lives in the jQuery block at the bottom of this file.

  const passwordInput = document.querySelector('#password');
  const passwordLength = document.querySelector('#password-length');
  if (passwordInput && passwordLength) {
    const updatePasswordLength = () => {
      const length = passwordInput.value.length;
      passwordLength.textContent = `Password length: ${length} character${length === 1 ? '' : 's'} (minimum 8). ${length >= 8 ? 'Length requirement met.' : `${8 - length} more needed.`}`;
      passwordLength.classList.toggle('valid-note', length >= 8);
    };
    passwordInput.addEventListener('input', updatePasswordLength);
    updatePasswordLength();
  }


  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(willOpen));
      panel.classList.toggle('is-open', willOpen);
      panel.setAttribute('aria-hidden', String(!willOpen));
    });
  });


  const modal = document.querySelector('#subscription-modal');
  const openModal = document.querySelectorAll('[data-open-subscription]');
  const closeModal = document.querySelector('#close-modal');
  if (modal) {
    openModal.forEach(button => button.addEventListener('click', () => {
      modal.classList.add('visible'); modal.setAttribute('aria-hidden', 'false');
      const first = modal.querySelector('input'); if (first) first.focus();
    }));
    const close = () => { modal.classList.remove('visible'); modal.setAttribute('aria-hidden', 'true'); };
    if (closeModal) closeModal.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('visible')) close(); });
    const subscribeForm = document.querySelector('#subscription-form');
    if (subscribeForm) subscribeForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = subscribeForm.querySelector('input[type="email"]');
      const feedback = document.querySelector('#subscription-feedback');
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        feedback.textContent = 'Please enter a valid email address.'; feedback.className = 'form-message error'; return;
      }
      feedback.textContent = 'Thanks for subscribing! This demo does not send or store your email.';
      feedback.className = 'form-message success'; subscribeForm.reset();
      if (window.showToast) window.showToast('Subscribed successfully!', 'success');
    });
  }


  const colorButton = document.querySelector('#change-color');
  if (colorButton) {
    const colors = ['#121212', '#172a3a', '#29213d', '#18352e', '#38251e'];
    let colorIndex = 0;
    colorButton.addEventListener('click', () => {
      colorIndex = (colorIndex + 1) % colors.length;
      document.body.style.backgroundColor = colors[colorIndex];
      const output = document.querySelector('#color-name');
      if (output) output.textContent = `Theme ${colorIndex + 1} of ${colors.length}`;
    });
  }

  const clocks = document.querySelectorAll('#date-time, .footer-date-time');
  if (clocks.length) {
    const updateClock = () => {
      const formatted = new Date().toLocaleString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      clocks.forEach(clock => { clock.textContent = formatted; });
    };
    updateClock(); window.setInterval(updateClock, 1000);
  }


  //  Day/Night theme switch 
  const themeToggle = document.querySelector('#theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDay = document.body.classList.toggle('day-theme');
      themeToggle.setAttribute('aria-pressed', String(isDay));
      themeToggle.textContent = isDay ? 'Switch to Night theme' : 'Switch to Day theme';
    });
  }

  //click event that displays the current time
  const showTimeButton = document.querySelector('#show-time');
  if (showTimeButton) {
    showTimeButton.addEventListener('click', () => {
      const feedback = document.querySelector('#time-feedback');
      if (feedback) feedback.textContent = `Current time: ${new Date().toLocaleTimeString()}`;
    });
  }

  // switch statement changes the greeting language
  const languageSelect = document.querySelector('#language-select');
  const welcomeMessage = document.querySelector('#welcome-message');
  if (languageSelect && welcomeMessage) {
    const updateGreeting = (language) => {
      let greeting;
      switch (language) {
        case 'ru': greeting = 'Добро пожаловать в наше интернет-кафе!'; break;
        case 'kk': greeting = 'Интернет-кафемізге қош келдіңіз!'; break;
        case 'en':
        default: greeting = 'Welcome to our Internet Cafe!';
      }
      welcomeMessage.textContent = greeting;
    };
    languageSelect.addEventListener('change', () => updateGreeting(languageSelect.value));
  }

  // objects, array, loop and higher-order function (map)
  const cafeTips = [
    { title: 'Choose your zone', description: 'Standard, VIP and Pro zones suit different gaming needs.' },
    { title: 'Take a short break', description: 'Short breaks can help you stay comfortable during long sessions.' },
    { title: 'Book ahead', description: 'Use the Contact Us form to send a demo booking request.' }
  ];
  const tipsList = document.querySelector('#cafe-tips');
  if (tipsList) {
    // map() transforms each object into a list item; forEach() adds each item to the page.
    const tipElements = cafeTips.map(tip => {
      const item = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = `${tip.title}: `;
      item.append(title, document.createTextNode(tip.description));
      return item;
    });
    tipElements.forEach(item => tipsList.appendChild(item));
  }

  //  Read More button changes visibility and accessible state
  const readMoreButton = document.querySelector('#read-more-toggle');
  const extraInfo = document.querySelector('#extra-cafe-info');
  if (readMoreButton && extraInfo) {
    readMoreButton.addEventListener('click', () => {
      const willShow = extraInfo.hidden;
      extraInfo.hidden = !willShow;
      readMoreButton.setAttribute('aria-expanded', String(willShow));
      readMoreButton.textContent = willShow ? 'Read less' : 'Read more';
      if (willShow) extraInfo.classList.add('pulse-animation');
      window.setTimeout(() => extraInfo.classList.remove('pulse-animation'), 700);
    });
  }

  //  gallery thumbnails update a large preview image
  const imageViewer = document.querySelector('#image-viewer');
  const largeImage = document.querySelector('#large-gallery-image');
  const largeCaption = document.querySelector('#large-image-caption');
  const closeImageViewer = document.querySelector('#close-image-viewer');
  const galleryImages = document.querySelectorAll('.gallery-thumb');
  const showGalleryImage = (image) => {
    if (!imageViewer || !largeImage || !image) return;
    largeImage.src = image.getAttribute('data-src') || image.src;
    largeImage.alt = image.alt;
    const caption = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
    if (largeCaption) largeCaption.textContent = caption;
    imageViewer.classList.add('visible');
    imageViewer.setAttribute('aria-hidden', 'false');
    if (closeImageViewer) closeImageViewer.focus();
  };
  galleryImages.forEach(image => {
    image.addEventListener('click', () => showGalleryImage(image));
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showGalleryImage(image);
      }
    });
  });
  const hideGalleryImage = () => {
    if (!imageViewer) return;
    imageViewer.classList.remove('visible');
    imageViewer.setAttribute('aria-hidden', 'true');
  };
  if (closeImageViewer) closeImageViewer.addEventListener('click', hideGalleryImage);
  if (imageViewer) {
    imageViewer.addEventListener('click', event => {
      if (event.target === imageViewer) hideGalleryImage();
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && imageViewer?.classList.contains('visible')) hideGalleryImage();
  });

  //  keyboard navigation through the main navigation links
  const navigationLinks = Array.from(document.querySelectorAll('.nav-menu a'));
  navigationLinks.forEach((link, index) => {
    link.addEventListener('keydown', event => {
      let nextIndex = index;
      switch (event.key) {
        case 'ArrowRight': nextIndex = (index + 1) % navigationLinks.length; break;
        case 'ArrowLeft': nextIndex = (index - 1 + navigationLinks.length) % navigationLinks.length; break;
        case 'Home': nextIndex = 0; break;
        case 'End': nextIndex = navigationLinks.length - 1; break;
        default: return;
      }
      event.preventDefault();
      navigationLinks[nextIndex].focus();
    });
  });

  //  play a short notification sound using the Web Audio API
  const soundButton = document.querySelector('#play-sound');
  if (soundButton) {
    soundButton.addEventListener('click', () => {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const feedback = document.querySelector('#sound-feedback');
      if (!AudioContextClass) {
        if (feedback) feedback.textContent = 'Sound is not supported by this browser.';
        return;
      }
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.12);
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.32);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.34);
      oscillator.addEventListener('ended', () => audioContext.close());
      if (feedback) feedback.textContent = 'Notification sound played.';
    });
  }

  //  event-triggered CSS animation
  const animateButton = document.querySelector('#animate-card');
  if (animateButton) {
    animateButton.addEventListener('click', () => {
      const section = animateButton.closest('.card');
      if (!section) return;
      section.classList.remove('pulse-animation');
      void section.offsetWidth;
      section.classList.add('pulse-animation');
      window.setTimeout(() => section.classList.remove('pulse-animation'), 700);
    });
  }
});

/* ASS6*/
$(document).ready(function () {
  console.log("jQuery is ready!");

  /*shared data & helpers */
  const escapeHtml = (text) => $('<div>').text(text).html();
  const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const GAMES = [
    { name: 'Counter-Strike 2',   genre: 'Shooter',        zone: 'Standard' },
    { name: 'Valorant',           genre: 'Shooter',        zone: 'Standard' },
    { name: 'Overwatch 2',        genre: 'Shooter',        zone: 'VIP' },
    { name: 'Rainbow Six Siege',  genre: 'Shooter',        zone: 'Pro Tournament' },
    { name: 'Dota 2',             genre: 'MOBA',           zone: 'Standard' },
    { name: 'League of Legends',  genre: 'MOBA',           zone: 'Standard' },
    { name: 'Fortnite',           genre: 'Battle Royale',  zone: 'Standard' },
    { name: 'Apex Legends',       genre: 'Battle Royale',  zone: 'VIP' },
    { name: 'Cyberpunk 2077',     genre: 'RPG',            zone: 'VIP' },
    { name: 'The Witcher 3',      genre: 'RPG',            zone: 'VIP' },
    { name: 'Elden Ring',         genre: 'Action RPG',     zone: 'VIP' },
    { name: 'GTA V',              genre: 'Action',         zone: 'Standard' },
    { name: 'Minecraft',          genre: 'Sandbox',        zone: 'Standard' },
    { name: 'EA Sports FC 25',    genre: 'Sports',         zone: 'Standard' },
    { name: 'Rocket League',      genre: 'Sports',         zone: 'Standard' },
    { name: 'Forza Horizon 5',    genre: 'Racing',         zone: 'VIP' }
  ];
  const ZONES = [
    { name: 'Standard Zone',        url: 'services.html#pricing' },
    { name: 'VIP Gaming Zone',      url: 'services.html#pricing' },
    { name: 'Pro Tournament Zone',  url: 'services.html#pricing' }
  ];
  const PAGES = [
    { name: 'Home',        url: 'index.html' },
    { name: 'Services',    url: 'services.html' },
    { name: 'About Team',  url: 'team.html' },
    { name: 'Contact Us',  url: 'contact.html' }
  ];


  /* T7:Notification system */
  function showToast(message, type, duration) {
    type = type || 'success';
    duration = duration || 3200;
    const icons = { success: '✓', info: 'i', error: '!' };

    let $container = $('#toast-container');
    if (!$container.length) {
      $container = $('<div id="toast-container" role="status" aria-live="polite"></div>').appendTo('body');
    }

    const $toast = $('<div class="toast"></div>')
      .addClass('toast-' + type)
      .append($('<span class="toast-icon" aria-hidden="true"></span>').text(icons[type] || 'i'))
      .append($('<span class="toast-text"></span>').text(message))
      .hide()
      .appendTo($container);

    // keep at most 4 toasts on screen
    $container.children().slice(0, -4).remove();

    // fade in -> wait -> fade out -> remove from DOM
    $toast.fadeIn(250).delay(duration).fadeOut(400, function () { $(this).remove(); });

    // click to dismiss early
    $toast.on('click', function () { $(this).stop(true).fadeOut(200, function () { $(this).remove(); }); });
    return $toast;
  }
  window.showToast = showToast;

  // Demo trigger: "Select" buttons in the pricing table (Services page)
  $('.select-zone').on('click', function () {
    showToast($(this).data('zone') + ' selected. Open “Contact Us” to book it.', 'info');
  });


  /* T1: Real-time search*/
  const $gameList = $('#game-list');
  if ($gameList.length) {
    // Build the list from the GAMES array
    GAMES.forEach(function (game) {
      const zoneClass = 'zone-' + game.zone.toLowerCase().replace(/\s+/g, '-');
      $('<li class="game-item"></li>')
        .append($('<span class="game-name"></span>').text(game.name))
        .append($('<span class="game-genre"></span>').text(game.genre))
        .append($('<span class="game-zone"></span>').addClass(zoneClass).text(game.zone))
        .appendTo($gameList);
    });

    const $items = $gameList.children('.game-item');
    const $filterInput = $('#game-filter');
    const $count = $('#game-count');
    const $noGames = $('#no-games');

    function applyGameFilter() {
      const query = $filterInput.val().toLowerCase().trim();
      // hide everything, then show only the items whose text contains the query
      const $matches = $items.hide().filter(function () {
        return $(this).text().toLowerCase().indexOf(query) > -1;
      }).show();

      $count.text(query
        ? 'Showing ' + $matches.length + ' of ' + $items.length + ' games'
        : 'Showing all ' + $items.length + ' games');
      $noGames.prop('hidden', $matches.length > 0);
    }

    $filterInput.on('input keyup', applyGameFilter);

    // Allows the autocomplete on the Home page to deep-link: services.html?q=Valorant
    const initialQuery = new URLSearchParams(window.location.search).get('q');
    if (initialQuery) $filterInput.val(initialQuery);
    applyGameFilter();
  }


  /*T2: Autocomplete search suggestions*/
  const $siteSearch = $('#site-search');
  if ($siteSearch.length) {
    const $suggestions = $('#suggestions');

    // One searchable index built from games, zones and pages
    const searchIndex = []
      .concat(GAMES.map(function (g) {
        return { label: g.name, type: 'Game', url: 'services.html?q=' + encodeURIComponent(g.name) + '#games' };
      }))
      .concat(ZONES.map(function (z) { return { label: z.name, type: 'Zone', url: z.url }; }))
      .concat(PAGES.map(function (p) { return { label: p.name, type: 'Page', url: p.url }; }));

    let activeIndex = -1;

    function closeSuggestions() {
      $suggestions.removeClass('open').empty();
      $siteSearch.attr('aria-expanded', 'false');
      activeIndex = -1;
    }

    function setActive(index) {
      const $options = $suggestions.children('.suggestion');
      if (!$options.length) return;
      activeIndex = (index + $options.length) % $options.length;
      $options.removeClass('active').attr('aria-selected', 'false');
      $options.eq(activeIndex).addClass('active').attr('aria-selected', 'true');
    }

    function renderSuggestions() {
      const query = $siteSearch.val().toLowerCase().trim();
      if (!query) { closeSuggestions(); return; }

      const found = searchIndex
        .map(function (item) { return { item: item, pos: item.label.toLowerCase().indexOf(query) }; })
        .filter(function (entry) { return entry.pos > -1; })
        .sort(function (a, b) { return a.pos - b.pos; })   // matches at the start of the name come first
        .slice(0, 6);

      $suggestions.empty();
      if (!found.length) {
        $('<li class="suggestion-empty"></li>').text('No suggestions found').appendTo($suggestions);
      } else {
        found.forEach(function (entry) {
          const label = entry.item.label;
          const start = entry.pos;
          const end = start + query.length;
          // bold the part the user has typed
          const html = escapeHtml(label.slice(0, start)) +
                       '<strong>' + escapeHtml(label.slice(start, end)) + '</strong>' +
                       escapeHtml(label.slice(end));
          $('<li class="suggestion" role="option" aria-selected="false"></li>')
            .attr('data-url', entry.item.url)
            .attr('data-label', label)
            .append($('<span class="suggestion-label"></span>').html(html))
            .append($('<span class="suggestion-type"></span>').text(entry.item.type))
            .appendTo($suggestions);
        });
      }
      $suggestions.addClass('open');
      $siteSearch.attr('aria-expanded', 'true');
      activeIndex = -1;
    }

    function chooseSuggestion($option) {
      if (!$option || !$option.length) return;
      $siteSearch.val($option.attr('data-label'));
      closeSuggestions();
      window.location.href = $option.attr('data-url');
    }

    $siteSearch.on('input focus', renderSuggestions);

    $siteSearch.on('keydown', function (event) {
      switch (event.key) {
        case 'ArrowDown': event.preventDefault(); setActive(activeIndex + 1); break;
        case 'ArrowUp':   event.preventDefault(); setActive(activeIndex - 1); break;
        case 'Enter': {
          const $options = $suggestions.children('.suggestion');
          if ($options.length) {
            event.preventDefault();
            chooseSuggestion(activeIndex > -1 ? $options.eq(activeIndex) : $options.first());
          }
          break;
        }
        case 'Escape': closeSuggestions(); break;
      }
    });

    // mousedown (not click) so the choice happens before the input loses focus
    $suggestions.on('mousedown', '.suggestion', function (event) {
      event.preventDefault();
      chooseSuggestion($(this));
    });
    $suggestions.on('mouseenter', '.suggestion', function () {
      setActive($(this).index());
    });

    // click outside closes the dropdown
    $(document).on('click', function (event) {
      if (!$(event.target).closest('.autocomplete').length) closeSuggestions();
    });
  }


  /* T3: Search highlighting */
  const $faqSearch = $('#faq-search');
  if ($faqSearch.length) {
    const $targets = $('.faq-list .accordion-trigger, .faq-list .accordion-panel p, #why-list li');
    const $status = $('#faq-search-status');

    // remember the original text so highlights can be removed again
    $targets.each(function () { $(this).data('original', $(this).text()); });

    function setPanel($panel, open) {
      const id = $panel.attr('id');
      $panel.toggleClass('is-open', open).attr('aria-hidden', String(!open));
      $('[aria-controls="' + id + '"]').attr('aria-expanded', String(open));
    }

    function highlightMatches() {
      const query = $faqSearch.val().trim();

      if (query.length < 2) {                       // nothing (or too little) typed: reset
        $targets.each(function () { $(this).text($(this).data('original')); });
        $('.faq-list .accordion-panel').each(function () { setPanel($(this), false); });
        $status.text(query ? 'Type at least 2 characters.' : '');
        return;
      }

      const safeQuery = escapeHtml(query);
      const regex = new RegExp('(' + escapeRegExp(safeQuery) + ')', 'gi');
      let totalMatches = 0;

      $targets.each(function () {
        const original = $(this).data('original');
        const count = (escapeHtml(original).match(regex) || []).length;
        totalMatches += count;
        // wrap every match in <mark>
        let html = count ? escapeHtml(original).replace(regex, '<mark class="hl">$1</mark>') : escapeHtml(original);
        // accordion buttons are flex containers: keep their text in one <span> so the <mark> does not become a separate flex item
        if ($(this).is('.accordion-trigger')) html = '<span>' + html + '</span>';
        $(this).html(html);
      });

      // open the FAQ answers that contain a match, close the others
      $('.faq-list .accordion-panel').each(function () {
        const $panel = $(this);
        const hasMatch = $panel.find('mark.hl').length > 0 ||
                         $('[aria-controls="' + $panel.attr('id') + '"]').find('mark.hl').length > 0;
        setPanel($panel, hasMatch);
      });

      $status.text(totalMatches
        ? totalMatches + ' match' + (totalMatches === 1 ? '' : 'es') + ' found'
        : 'No matches found for “' + query + '”');

      const $first = $('mark.hl').first();
      if ($first.length) $first[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    $faqSearch.on('input', highlightMatches);
  }


  /* T4: Colorful scroll progress bar */
  const $progress = $(
    '<div id="scroll-progress" aria-hidden="true">' +
      '<div class="scroll-progress-bar"><span class="scroll-progress-label">0%</span></div>' +
    '</div>'
  ).prependTo('body');
  const $progressBar = $progress.find('.scroll-progress-bar');
  const $progressLabel = $progress.find('.scroll-progress-label');

  function updateScrollProgress() {
    const scrollable = $(document).height() - $(window).height();
    const percent = scrollable > 0 ? Math.min(100, ($(window).scrollTop() / scrollable) * 100) : 0;
    $progressBar.css('width', percent + '%');
    $progressLabel.text(Math.round(percent) + '%');
    $progress.toggleClass('active', percent > 0.5);
    $progress.toggleClass('complete', percent >= 99.5);
  }
  $(window).on('scroll resize', updateScrollProgress);
  updateScrollProgress();


  /* T5: Animated number counter*/
  const $counters = $('.stat-number');
  if ($counters.length) {
    $counters.each(function () { $(this).text('0'); });   // start from zero (the HTML holds the final values)

    function isInView($el) {
      const top = $el.offset().top;
      const viewTop = $(window).scrollTop();
      const viewBottom = viewTop + $(window).height();
      return top < viewBottom - 40 && top + $el.outerHeight() > viewTop;
    }

    function formatNumber(value, decimals) {
      return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }

    function startCounter($el) {
      if ($el.data('counted')) return;
      $el.data('counted', true);
      const target = parseFloat($el.attr('data-target'));
      const decimals = parseInt($el.attr('data-decimals') || '0', 10);
      const suffix = $el.attr('data-suffix') || '';

      // animate a plain object from 0 to target and print the value on every step
      $({ value: 0 }).animate({ value: target }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) { $el.text(formatNumber(now, decimals) + suffix); },
        complete: function () { $el.text(formatNumber(target, decimals) + suffix); }
      });
    }

    function checkCounters() {
      $counters.each(function () { if (isInView($(this))) startCounter($(this)); });
    }
    $(window).on('scroll resize', checkCounters);
    checkCounters();
  }


  /* T6: Loading spinner */
  const $bookingForm = $('#contact-form');
  if ($bookingForm.length) {
    const $message = $('#form-message');
    const $submitBtn = $bookingForm.find('button[type="submit"]');
    let isSubmitting = false;

    $bookingForm.on('submit', function (event) {
      event.preventDefault();
      if (isSubmitting) return;

      const name = $('#name').val().trim();
      const email = $('#email').val().trim();
      const zone = $('#zone-type').val();
      const password = $('#password').val();
      const confirm = $('#confirm-password').val();
      const errors = [];

      if (!name) errors.push('Please enter your full name.');
      if (!email) errors.push('Please enter your email address.');
      else if (email.indexOf('@') === -1) errors.push('Email address must contain the @ symbol.');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Enter a valid email format, for example name@example.com.');
      if (!zone) errors.push('Please select a zone.');
      if (password.length < 8) errors.push('Password is ' + password.length + ' characters long; it must contain at least 8 characters.');
      if (password !== confirm) errors.push('Password confirmation does not match.');

      if (errors.length) {
        $message.attr('class', 'form-message error')
          .html('<strong>Please fix the following:</strong><ul>' + errors.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul>')
          .trigger('focus');
        return;
      }

      // valid: show spinner, disable the button, simulate a server call
      isSubmitting = true;
      const originalHtml = $submitBtn.html();
      $message.attr('class', 'form-message').empty();
      $submitBtn.prop('disabled', true).attr('aria-busy', 'true')
        .html('<span class="spinner" aria-hidden="true"></span> Please wait…');

      setTimeout(function () {
        $submitBtn.html(originalHtml).prop('disabled', false).removeAttr('aria-busy');
        isSubmitting = false;
        $bookingForm[0].reset();
        $('#password')[0].dispatchEvent(new Event('input'));   // refresh the password length note (Assignment 4 code)
        $message.attr('class', 'form-message success')
          .text('Your booking request has been submitted (demo only; no data was sent).');
        showToast('Booking request submitted successfully!', 'success');
      }, 2200);
    });
  }


  /*T8: Copy to clipboard*/
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // fallback for http:// or old browsers
    return new Promise(function (resolve, reject) {
      const $temp = $('<textarea readonly></textarea>')
        .css({ position: 'fixed', top: '-1000px', opacity: 0 }).val(text).appendTo('body');
      $temp[0].select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      $temp.remove();
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  $('.copy-btn').on('click', function () {
    const $btn = $(this);
    const $snippet = $btn.closest('.snippet');
    const text = $snippet.find('.snippet-text').text().trim();
    const label = $snippet.find('.snippet-label').text();

    copyText(text).then(function () {
      $btn.addClass('copied');                                  // swaps the copy icon for a checkmark (CSS)
      $btn.closest('.copy-wrap').find('.copy-tooltip').stop(true, true).fadeIn(150);
      showToast(label + ' copied to clipboard', 'success');

      clearTimeout($btn.data('timer'));
      $btn.data('timer', setTimeout(function () {
        $btn.removeClass('copied');
        $btn.closest('.copy-wrap').find('.copy-tooltip').fadeOut(200);
      }, 2000));
    }).catch(function () {
      showToast('Could not copy. Please select the text and press Ctrl+C.', 'error');
    });
  });

  // The 'copy' event also fires when the visitor copies the text manually (Ctrl+C / right-click)
  $(document).on('copy', function () {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() && $(selection.anchorNode).closest('.snippet-text').length) {
      showToast('Text copied to clipboard', 'info');
    }
  });


  /*
     T9: Image lazy loading
 */
  function lazyLoadImages() {
    const $lazy = $('img.lazy');
    if (!$lazy.length) return;
    const loadLine = $(window).scrollTop() + $(window).height() + 150;   // start 150px before the image is visible

    $lazy.each(function () {
      const $img = $(this);
      if ($img.offset().top < loadLine) {
        $img.removeClass('lazy').addClass('lazy-loading')
          .one('load', function () {
            $(this).removeClass('lazy-loading').addClass('is-loaded');
            console.log('Lazy loaded:', $(this).attr('data-src'));
          })
          .attr('src', $img.attr('data-src'));                         // swap placeholder for the real image
      }
    });
  }
  $(window).on('scroll resize load', lazyLoadImages);
  lazyLoadImages();

});
