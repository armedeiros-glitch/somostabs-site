const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxY7n1QqI2tRubu28Z0rP1N9lvfyB0fvK9EkJbP8JlL_UNYO5sPHRbKwUErulPayVh5Ww/exec';
    const form = document.querySelector('#interest-form');
    const formNote = document.querySelector('#form-note');
    const formCard = document.querySelector('.form-card');
    const submitButton = document.querySelector('#submit-button');
    const progressBar = document.querySelector('#progress-bar');
    const progressText = document.querySelector('#progress-text');
    const sourceInput = document.querySelector('#source');
    const currentSolutionInput = document.querySelector('#current-solution');
    let currentStep = 1;

    const urlParams = new URLSearchParams(window.location.search);
    const origem = (urlParams.get('origem') || 'direto')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '')
      .slice(0, 60);
    sourceInput.value = origem || 'direto';

    function updateProgress() {
      progressBar.style.width = `${currentStep * 25}%`;
      progressText.textContent = `${String(currentStep).padStart(2, '0')} / 04`;
    }

    function showStep(step) {
      currentStep = Math.max(1, Math.min(4, step));
      document.querySelectorAll('.step').forEach((item) => {
        item.classList.toggle('active', Number(item.dataset.step) === currentStep);
      });
      document.querySelectorAll('.form-error').forEach((error) => { error.style.display = 'none'; });
      updateProgress();
      formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function selectedValues(selector) {
      return [...document.querySelectorAll(selector)].filter((input) => input.checked).map((input) => input.value);
    }

    function validateStep(step) {
      const error = document.querySelector(`[data-error="${step}"]`);
      let valid = true;

      if (step === 1) valid = Boolean(form.querySelector('input[name="moment"]:checked'));
      if (step === 2) {
        const values = selectedValues('.step[data-step="2"] input[type="checkbox"]');
        currentSolutionInput.value = values.join(', ');
        valid = values.length > 0;
      }
      if (step === 3) valid = Boolean(form.querySelector('input[name="trial_intent"]:checked')) && Boolean(form.querySelector('input[name="price"]:checked'));
      if (step === 4) valid = form.checkValidity();

      if (!valid && error) error.style.display = 'block';
      return valid;
    }

    document.querySelectorAll('.choice').forEach((choice) => {
      const input = choice.querySelector('input');
      choice.addEventListener('click', () => {
        window.requestAnimationFrame(() => {
          const group = choice.closest('[data-group]');
          if (group.dataset.group === 'single') {
            group.querySelectorAll('.choice').forEach((item) => item.classList.remove('selected'));
          }
          choice.classList.toggle('selected', input.checked);
        });
      });
    });

    document.querySelectorAll('.next').forEach((button) => {
      button.addEventListener('click', () => {
        if (validateStep(currentStep)) showStep(currentStep + 1);
      });
    });

    document.querySelectorAll('.back').forEach((button) => {
      button.addEventListener('click', () => showStep(currentStep - 1));
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!validateStep(4)) {
        form.reportValidity();
        return;
      }

      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';

      try {
        await fetch(FORM_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          body: new FormData(form)
        });

        form.style.display = 'none';
        formNote.style.display = 'block';
        progressBar.style.width = '100%';
        progressText.textContent = 'CONCLUÍDO';
        formNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (error) {
        const finalError = document.querySelector('[data-error="4"]');
        finalError.textContent = 'Não conseguimos enviar agora. Tente novamente em alguns instantes.';
        finalError.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });

    updateProgress();
