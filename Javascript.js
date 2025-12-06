const input = document.getElementById('inputText');
const saveBtn = document.getElementById('saveBtn');
const notesEl = document.getElementById('notes');
const messageEl = document.getElementById('message');
const surpriseBtn = document.getElementById('surpriseBtn');

// Load stored notes
const NOTES_KEY = 'td_notes_v1';

function loadNotes() {
  const raw = localStorage.getItem(NOTES_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch (e) { return []; }
}

function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function renderNotes() {
  notesEl.innerHTML = '';
  const notes = loadNotes();

  if (notes.length === 0) {
    notesEl.innerHTML = '<div class="note">No messages yet — add one above!</div>';
    return;
  }

  notes.slice().reverse().forEach(n => {
    const d = document.createElement('div');
    d.className = 'note';
    d.textContent = n;
    notesEl.appendChild(d);
  });
}

saveBtn.addEventListener('click', () => {
  const val = input.value.trim();
  if (!val) return;

  const notes = loadNotes();
  notes.push(val);
  saveNotes(notes);

  input.value = '';
  renderNotes();
  messageEl.textContent = 'Thanks! Your message was added.';
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveBtn.click();
});

surpriseBtn.addEventListener('click', () => {
  const praises = [
    'You make learning magical ✨',
    'You shape future heroes 🌟',
    'Thank you for believing in us 💐'
  ];

  let i = 0;
  messageEl.style.transition = 'opacity 0.25s';

  const iv = setInterval(() => {
    messageEl.style.opacity = 0;
    setTimeout(() => {
      messageEl.textContent = praises[i];
      messageEl.style.opacity = 1;
      i = (i + 1) % praises.length;
    }, 260);
  }, 1200);

  setTimeout(() => {
    clearInterval(iv);
    messageEl.textContent = "Happy Teacher's Day!";
  }, 5000);
});

// initial render
renderNotes();
