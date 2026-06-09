const list = document.getElementById('submissionList');
const frame = document.getElementById('submissionFrame');
const previewTitle = document.getElementById('previewTitle');
const previewOpen = document.getElementById('previewOpen');

function tagMarkup(tags = []) {
  return tags.map((tag) => `<span>${tag}</span>`).join('');
}

function setActive(id) {
  document.querySelectorAll('.submission-card').forEach((card) => {
    card.classList.toggle('is-active', card.dataset.id === id);
  });
}

function selectSubmission(item, updateUrl = true) {
  if (!item || !frame || !previewTitle || !previewOpen) return;
  frame.src = item.url;
  previewTitle.textContent = `${item.title} · ${item.author}`;
  previewOpen.href = item.url;
  previewOpen.removeAttribute('aria-disabled');
  setActive(item.id);
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('entry', item.id);
    window.history.replaceState({}, '', url);
  }
}

function renderSubmissions(items) {
  if (!list) return;
  list.innerHTML = items.map((item) => `
    <article class="submission-card" data-id="${item.id}">
      <div>
        <p class="submission-author">${item.author}</p>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
      <div class="submission-tags">${tagMarkup(item.tags)}</div>
      <button class="btn btn-secondary" type="button" data-preview="${item.id}">Preview</button>
    </article>
  `).join('');

  list.querySelectorAll('[data-preview]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = items.find((entry) => entry.id === button.dataset.preview);
      selectSubmission(item);
    });
  });

  const requested = new URLSearchParams(window.location.search).get('entry');
  selectSubmission(items.find((item) => item.id === requested) || items[0], Boolean(requested));
}

fetch('./submissions.json', { cache: 'no-cache' })
  .then((response) => {
    if (!response.ok) throw new Error(`Failed to load submissions: ${response.status}`);
    return response.json();
  })
  .then(renderSubmissions)
  .catch((error) => {
    if (list) {
      list.innerHTML = `<p class="submission-error">${error.message}</p>`;
    }
  });
