export const config = { maxDuration: 300 };

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CarouselAI — Imagens para Marketplace</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #ffffff; --bg2: #f5f5f3; --bg3: #eeede9;
      --text: #1a1a18; --text2: #6b6b67;
      --border: rgba(0,0,0,0.12); --border2: rgba(0,0,0,0.22);
      --purple: #7F77DD; --purple-dark: #534AB7;
      --green: #1D9E75; --canva: #8B3DFF;
      --radius: 8px; --radius-lg: 12px;
    }
    @media (prefers-color-scheme: dark) {
      :root { --bg: #1c1c1a; --bg2: #252523; --bg3: #2e2e2b; --text: #f0efeb; --text2: #9a9a94; --border: rgba(255,255,255,0.1); --border2: rgba(255,255,255,0.2); }
    }
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg3); color: var(--text); min-height: 100vh; padding: 2rem 1rem; }
    .app { max-width: 600px; margin: 0 auto; }
    .header { text-align: center; background: var(--bg); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem; }
    .logo { font-size: 24px; font-weight: 600; margin-bottom: 4px; }
    .logo span { color: var(--purple); }
    .tagline { font-size: 13px; color: var(--text2); }
    .steps-bar { display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
    .step-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .step-dot { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--border2); background: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; color: var(--text2); transition: all 0.2s; }
    .step-dot.active { background: var(--purple); border-color: var(--purple); color: white; }
    .step-dot.done { background: var(--green); border-color: var(--green); color: white; }
    .step-label { font-size: 11px; color: var(--text2); }
    .step-item.active .step-label { color: var(--purple); font-weight: 500; }
    .step-line { width: 48px; height: 1px; background: var(--border); margin-bottom: 18px; }
    .card { background: var(--bg); border-radius: var(--radius-lg); border: 0.5px solid var(--border); padding: 1.25rem; margin-bottom: 1rem; }
    .screen { display: none; }
    .screen.active { display: block; }
    label { font-size: 13px; color: var(--text2); display: block; margin-bottom: 6px; margin-top: 1rem; }
    label:first-of-type { margin-top: 0; }
    input[type=text], textarea, select { width: 100%; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 9px 12px; font-size: 14px; color: var(--text); font-family: inherit; transition: border-color 0.15s; }
    input:focus, textarea:focus, select:focus { outline: none; border-color: var(--purple); }
    textarea { min-height: 70px; resize: vertical; }
    .btn-primary { background: var(--purple); color: white; border: none; border-radius: var(--radius); padding: 11px 20px; font-size: 14px; font-weight: 500; cursor: pointer; width: 100%; margin-top: 1rem; transition: opacity 0.15s; }
    .btn-primary:hover { opacity: 0.88; }
    .btn-secondary { background: transparent; color: var(--text2); border: 1px solid var(--border2); border-radius: var(--radius); padding: 9px 16px; font-size: 13px; cursor: pointer; transition: background 0.15s; }
    .btn-secondary:hover { background: var(--bg2); }
    .btn-canva { background: var(--canva); color: white; border: none; border-radius: var(--radius); padding: 11px 20px; font-size: 14px; font-weight: 500; cursor: pointer; flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; transition: opacity 0.15s; }
    .btn-canva:hover { opacity: 0.88; }
    .action-row { display: flex; gap: 8px; margin-top: 1rem; }
    .action-row .btn-primary { margin-top: 0; }
    .upload-multi { border: 1px dashed var(--border2); border-radius: var(--radius); background: var(--bg2); overflow: hidden; margin-top: 1rem; }
    .upload-multi-header { padding: 1.25rem; text-align: center; cursor: pointer; transition: background 0.15s; }
    .upload-multi-header:hover { background: var(--bg3); }
    .upload-multi-header i { font-size: 28px; color: var(--text2); display: block; margin-bottom: 6px; }
    .upload-multi-header p { font-size: 13px; color: var(--text2); }
    .upload-multi-header span { font-size: 11px; color: var(--text2); opacity: 0.7; display: block; margin-top: 2px; }
    .preview-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 0 12px 12px; }
    .preview-item { position: relative; aspect-ratio: 1; border-radius: 6px; overflow: hidden; background: var(--bg3); }
    .preview-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .preview-item .remove-btn { position: absolute; top: 3px; right: 3px; width: 18px; height: 18px; border-radius: 50%; background: rgba(0,0,0,0.6); color: white; border: none; cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center; }
    .upload-count { font-size: 12px; color: var(--purple); font-weight: 500; padding: 6px 12px 10px; text-align: center; }
    .generating-state { text-align: center; padding: 2rem 1rem; }
    .spinner { width: 40px; height: 40px; border: 2px solid var(--border2); border-top-color: var(--purple); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .gen-title { font-size: 16px; font-weight: 500; margin-bottom: 6px; }
    .gen-sub { font-size: 13px; color: var(--text2); }
    .progress-bar { background: var(--bg2); border-radius: 99px; height: 4px; margin-top: 1.5rem; overflow: hidden; }
    .progress-fill { height: 100%; background: var(--purple); border-radius: 99px; transition: width 0.6s ease; }
    .img-list { display: flex; flex-direction: column; gap: 8px; margin-top: 1rem; }
    .img-row { display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: var(--bg2); border-radius: var(--radius); border: 0.5px solid var(--border); }
    .img-row-num { font-size: 12px; font-weight: 500; color: var(--text2); min-width: 18px; }
    .img-row-label { font-size: 13px; font-weight: 500; flex: 1; }
    .slide-badge { font-size: 10px; padding: 2px 7px; border-radius: 99px; font-weight: 500; background: #e8e6fb; color: var(--purple-dark); white-space: nowrap; }
    .img-status { font-size: 11px; padding: 3px 8px; border-radius: 99px; display: inline-block; margin-left: 6px; }
    .img-status.pending { background: #f1efe8; color: #5f5e5a; }
    .img-status.generating { background: #eeedfe; color: var(--purple-dark); }
    .img-status.done { background: #eaf3de; color: #3b6d11; }
    .notice-box { background: #eeedfe; border: 0.5px solid #afa9ec; border-radius: var(--radius); padding: 10px 14px; font-size: 13px; color: var(--purple-dark); margin-top: 1rem; line-height: 1.6; }
    .badge-green { background: #eaf3de; color: #3b6d11; font-size: 11px; padding: 3px 10px; border-radius: 99px; font-weight: 500; }
    .analysis-block { background: var(--bg2); border-radius: var(--radius); padding: 1rem; margin-bottom: 1rem; font-size: 13px; color: var(--text2); line-height: 1.7; }
    .analysis-block strong { color: var(--text); font-weight: 500; }
    .estilo-block { background: var(--bg2); border-left: 3px solid var(--purple); border-radius: var(--radius); padding: 1rem; margin-bottom: 1rem; font-size: 13px; color: var(--text2); line-height: 1.7; }
    .estilo-block strong { color: var(--text); font-weight: 500; }
    .canva-banner { background: var(--bg2); border: 0.5px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 14px; }
    .canva-icon { width: 44px; height: 44px; background: var(--canva); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; font-weight: 600; color: white; }
    .canva-banner-title { font-size: 14px; font-weight: 500; margin-bottom: 2px; }
    .canva-banner-sub { font-size: 12px; color: var(--text2); line-height: 1.5; }
    .btn-canva-sm { background: var(--canva); color: white; border: none; border-radius: var(--radius); padding: 8px 14px; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; transition: opacity 0.15s; }
    .btn-canva-sm:hover { opacity: 0.88; }
    .images-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 1rem; }
    .img-card { background: var(--bg); border-radius: var(--radius-lg); border: 0.5px solid var(--border); overflow: hidden; }
    .img-card img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
    .img-card-ph { width: 100%; aspect-ratio: 1; background: var(--bg2); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }
    .img-card-ph i { font-size: 28px; color: var(--text2); }
    .img-card-ph span { font-size: 11px; color: var(--text2); }
    .img-card-footer { padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; border-top: 0.5px solid var(--border); }
    .img-card-label { font-size: 12px; font-weight: 500; }
    .img-card-badge { font-size: 10px; padding: 2px 6px; border-radius: 99px; background: #e8e6fb; color: var(--purple-dark); }
    .btn-dl { background: transparent; color: var(--text2); border: none; cursor: pointer; font-size: 16px; padding: 2px; transition: color 0.15s; }
    .btn-dl:hover { color: var(--purple); }
    .err-box { background: #fcebeb; border: 0.5px solid #f09595; border-radius: var(--radius); padding: 12px 14px; font-size: 13px; color: #a32d2d; margin-top: 1rem; display: none; line-height: 1.6; }
  </style>
</head>
<body>
<div class="app">
  <div class="header">
    <div class="logo"><span>Carousel</span>AI</div>
    <div class="tagline">Cole fotos do concorrente — a IA gera seu carrossel único</div>
  </div>
  <div class="steps-bar">
    <div class="step-item active" id="si-1"><div class="step-dot active" id="sd-1">1</div><div class="step-label">Produto</div></div>
    <div class="step-line"></div>
    <div class="step-item" id="si-2"><div class="step-dot" id="sd-2">2</div><div class="step-label">Concorrente</div></div>
    <div class="step-line"></div>
    <div class="step-item" id="si-3"><div class="step-dot" id="sd-3">3</div><div class="step-label">Gerando</div></div>
    <div class="step-line"></div>
    <div class="step-item" id="si-4"><div class="step-dot" id="sd-4">4</div><div class="step-label">Resultado</div></div>
  </div>
  <div class="screen active" id="screen-1">
    <div class="card">
      <label>Nome do produto</label>
      <input type="text" id="prod-nome" placeholder="Ex: Camiseta Dry Fit Masculina" />
      <label>Categoria</label>
      <select id="prod-cat">
        <option value="">Selecione...</option>
        <option>Moda masculina</option><option>Moda feminina</option><option>Calçados</option>
        <option>Eletrônicos</option><option>Casa e decoração</option><option>Automotivo</option>
        <option>Esporte e lazer</option><option>Beleza e saúde</option><option>Brinquedos</option>
        <option>Pet shop</option><option>Outro</option>
      </select>
      <label>Marketplace de destino</label>
      <select id="prod-market">
        <option>Mercado Livre</option><option>Shopee</option><option>Amazon</option>
        <option>Instagram Shopping</option><option>Site próprio</option>
      </select>
      <label>Descrição do produto</label>
      <textarea id="prod-desc" placeholder="Descreva o produto, materiais, para quem é, diferenciais..."></textarea>
    </div>
    <button class="btn-primary" onclick="goStep2()">Continuar <i class="ti ti-arrow-right"></i></button>
  </div>
  <div class="screen" id="screen-2">
    <div class="card">
      <div style="font-size:15px;font-weight:500;margin-bottom:6px;">Fotos do concorrente</div>
      <div style="font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:1rem;">Tire print ou salve as fotos do anúncio concorrente. A IA analisa o estilo e cria imagens únicas inspiradas naquele visual.</div>
      <div class="upload-multi">
        <div class="upload-multi-header" onclick="document.getElementById('file-multi').click()">
          <i class="ti ti-photo-plus"></i>
          <p>Clique para adicionar fotos do concorrente</p>
          <span>Até 5 fotos · JPG, PNG · Mercado Livre, Shopee ou Amazon</span>
        </div>
        <input type="file" id="file-multi" accept="image/*" multiple style="display:none" />
        <div class="preview-grid" id="preview-grid"></div>
        <div class="upload-count" id="upload-count" style="display:none;"></div>
      </div>
      <div style="margin-top:12px;font-size:12px;color:var(--text2);line-height:1.6;">
        <i class="ti ti-shield-check" style="font-size:14px;vertical-align:-2px;color:var(--green);"></i>
        As imagens são analisadas e descartadas. Nunca copiamos — geramos algo 100% original.
      </div>
    </div>
    <div class="action-row">
      <button class="btn-secondary" onclick="goStep(1)"><i class="ti ti-arrow-left"></i> Voltar</button>
      <button class="btn-primary" style="margin-top:0;" onclick="goStep3()">Gerar carrossel único <i class="ti ti-sparkles"></i></button>
    </div>
  </div>
  <div class="screen" id="screen-3">
    <div class="card generating-state">
      <div class="spinner"></div>
      <div class="gen-title" id="gen-title">Analisando fotos do concorrente...</div>
      <div class="gen-sub" id="gen-sub">A IA está identificando o estilo visual</div>
      <div class="progress-bar"><div class="progress-fill" id="progress-fill" style="width:0%"></div></div>
    </div>
    <div class="notice-box"><i class="ti ti-clock" style="font-size:15px;vertical-align:-2px;"></i> Geração leva entre <strong>90 e 120 segundos</strong>. Não feche a página.</div>
    <div class="err-box" id="err-box"></div>
    <div class="img-list" id="img-list"></div>
  </div>
  <div class="screen" id="screen-4">
    <div class="card" style="padding:1rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:16px;font-weight:500;">Carrossel gerado</span>
        <span class="badge-green"><i class="ti ti-check"></i> 7 imagens únicas</span>
      </div>
      <div style="font-size:13px;color:var(--text2);" id="result-prod-name"></div>
    </div>
    <div id="result-estilo" class="estilo-block" style="display:none;"></div>
    <div id="result-analysis" class="analysis-block"></div>
    <div class="canva-banner">
      <div class="canva-icon">C</div>
      <div style="flex:1;">
        <div class="canva-banner-title">Edite o carrossel no Canva</div>
        <div class="canva-banner-sub">Template já preenchido com os textos. Insira as imagens e baixe.</div>
      </div>
      <button class="btn-canva-sm" onclick="openCanva()"><i class="ti ti-external-link"></i> Abrir</button>
    </div>
    <div id="images-grid" class="images-grid"></div>
    <div class="action-row" style="margin-top:1.5rem;">
      <button class="btn-secondary" onclick="resetAll()"><i class="ti ti-refresh"></i> Novo produto</button>
      <button class="btn-canva" onclick="openCanva()">
        <span style="font-size:15px;font-weight:600;background:white;color:var(--canva);padding:1px 5px;border-radius:4px;line-height:1.4;">C</span>
        Abrir e editar no Canva
      </button>
    </div>
  </div>
</div>
<script>
const CANVA_TEMPLATE_URL = 'https://www.canva.com/design?create=true&template=EAHLL4DqmmM';
const slides = [
  {num:1,label:'Foto principal',badge:'Capa'},
  {num:2,label:'Produto em uso',badge:'Uso'},
  {num:3,label:'Beneficios',badge:'Beneficios'},
  {num:4,label:'Detalhes',badge:'Qualidade'},
  {num:5,label:'Contexto de uso',badge:'Contexto'},
  {num:6,label:'Gatilho',badge:'Gatilho'},
  {num:7,label:'Reforco final',badge:'CTA'},
];
let canvaUrl = CANVA_TEMPLATE_URL;
let uploadedImages = [];
document.getElementById('file-multi').addEventListener('change', async (e) => {
  const files = Array.from(e.target.files).slice(0, 5 - uploadedImages.length);
  for (const file of files) {
    if (uploadedImages.length >= 5) break;
    const base64 = await fileToBase64(file);
    uploadedImages.push({type: file.type, data: base64, preview: URL.createObjectURL(file)});
  }
  renderPreviews();
  e.target.value = '';
});
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function renderPreviews() {
  const grid = document.getElementById('preview-grid');
  const count = document.getElementById('upload-count');
  grid.innerHTML = '';
  uploadedImages.forEach((img, i) => {
    const div = document.createElement('div');
    div.className = 'preview-item';
    div.innerHTML = '<img src="' + img.preview + '" /><button class="remove-btn" onclick="removeImage(' + i + ')"><i class="ti ti-x" style="font-size:9px;"></i></button>';
    grid.appendChild(div);
  });
  count.style.display = uploadedImages.length > 0 ? 'block' : 'none';
  count.textContent = uploadedImages.length + ' foto' + (uploadedImages.length > 1 ? 's' : '') + ' adicionada' + (uploadedImages.length > 1 ? 's' : '');
}
function removeImage(i) { uploadedImages.splice(i, 1); renderPreviews(); }
function goStep(n) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + n).classList.add('active');
  [1,2,3,4].forEach(i => {
    const dot = document.getElementById('sd-' + i);
    const item = document.getElementById('si-' + i);
    dot.classList.remove('active','done');
    item.classList.remove('active');
    if (i < n) { dot.classList.add('done'); dot.innerHTML = '<i class="ti ti-check" style="font-size:12px"></i>'; }
    else if (i === n) { dot.classList.add('active'); dot.textContent = i; item.classList.add('active'); }
    else { dot.textContent = i; }
  });
}
function goStep2() {
  if (!document.getElementById('prod-nome').value.trim() || !document.getElementById('prod-cat').value) { alert('Preencha o nome e a categoria.'); return; }
  if (!document.getElementById('prod-desc').value.trim()) { alert('Adicione uma descricao.'); return; }
  goStep(2);
}
async function goStep3() { goStep(3); buildImgList(); await runGeneration(); }
function buildImgList() {
  const list = document.getElementById('img-list');
  list.innerHTML = '';
  slides.forEach(s => {
    const row = document.createElement('div');
    row.className = 'img-row';
    row.innerHTML = '<span class="img-row-num">' + s.num + '</span><span class="img-row-label">' + s.label + '</span><span class="slide-badge">' + s.badge + '</span><span class="img-status pending" id="status-' + s.num + '">aguardando</span>';
    list.appendChild(row);
  });
}
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
const genSteps = [
  {pct:8,title:'Analisando fotos do concorrente...',sub:'Claude esta identificando cores e estilo visual'},
  {pct:20,title:'Extraindo DNA visual...',sub:'Mapeando paleta de cores, angulos e tom'},
  {pct:32,title:'Criando estrategia unica...',sub:'Gerando prompts exclusivos baseados no estilo'},
  {pct:45,title:'Gerando imagem 1...',sub:'DALL-E 3 renderizando foto principal'},
  {pct:57,title:'Gerando imagens 2-3...',sub:'Criando variacoes unicas'},
  {pct:69,title:'Gerando imagens 4-5...',sub:'Renderizando detalhes e contexto'},
  {pct:81,title:'Gerando imagens 6-7...',sub:'Finalizando gatilho e reforco final'},
  {pct:93,title:'Finalizando...',sub:'Organizando as imagens'},
];
async function runGeneration() {
  const nome = document.getElementById('prod-nome').value.trim();
  const cat = document.getElementById('prod-cat').value;
  const desc = document.getElementById('prod-desc').value.trim();
  const market = document.getElementById('prod-market').value;
  const fill = document.getElementById('progress-fill');
  const titleEl = document.getElementById('gen-title');
  const subEl = document.getElementById('gen-sub');
  const errBox = document.getElementById('err-box');
  errBox.style.display = 'none';
  let progIdx = 0;
  const anim = setInterval(() => {
    if (progIdx >= genSteps.length) return;
    fill.style.width = genSteps[progIdx].pct + '%';
    titleEl.textContent = genSteps[progIdx].title;
    subEl.textContent = genSteps[progIdx].sub;
    if (progIdx >= 3) {
      const n = progIdx - 2;
      const el = document.getElementById('status-' + n);
      if (el) { el.textContent = 'gerando'; el.className = 'img-status generating'; }
      if (n > 1) { const prev = document.getElementById('status-' + (n-1)); if (prev) { prev.textContent = 'pronto'; prev.className = 'img-status done'; } }
    }
    progIdx++;
  }, 14000);
  try {
    const response = await fetch('/api/gerar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nome, cat, desc, market, imagens_concorrente: uploadedImages.map(img => ({type: img.type, data: img.data}))})
    });
    clearInterval(anim);
    if (!response.ok) { const err = await response.json().catch(() => ({})); throw new Error(err.error || 'Erro na API'); }
    const data = await response.json();
    slides.forEach(s => { const el = document.getElementById('status-' + s.num); if (el) { el.textContent = 'pronto'; el.className = 'img-status done'; } });
    fill.style.width = '100%';
    await delay(300);
    showResults(data, nome, cat, market);
  } catch(e) {
    clearInterval(anim);
    fill.style.width = '100%';
    titleEl.textContent = 'Erro na geracao';
    subEl.textContent = 'Veja o detalhe abaixo';
    errBox.style.display = 'block';
    errBox.innerHTML = '<strong>Detalhe:</strong> ' + e.message + '<br><br>Verifique se ANTHROPIC_API_KEY e OPENAI_API_KEY estao no Vercel.<br><br><button class="btn-secondary" style="margin-top:6px;" onclick="goStep(2)">Tentar novamente</button>';
  }
}
function buildCanvaUrl(fields) {
  const params = Object.entries(fields).map(([k,v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v||'')).join('&');
  return CANVA_TEMPLATE_URL + '&' + params;
}
function openCanva() { window.open(canvaUrl, '_blank'); }
function showResults(data, nome, cat, market) {
  document.getElementById('result-prod-name').textContent = nome + ' - ' + cat + ' - ' + market;
  if (data && data.estilo) {
    const el = document.getElementById('result-estilo');
    el.style.display = 'block';
    el.innerHTML = '<strong>Estilo identificado:</strong> ' + (data.estilo.resumo||'-') + '<br><strong>Cores:</strong> ' + (data.estilo.cores||'-') + ' - <strong>Tom:</strong> ' + (data.estilo.tom||'-');
  }
  if (data && data.analise) {
    document.getElementById('result-analysis').innerHTML = '<strong>Publico:</strong> ' + (data.analise.publico||'-') + '<br><strong>Problema resolvido:</strong> ' + (data.analise.problema||'-') + '<br><strong>Gatilho principal:</strong> ' + (data.analise.gatilho||'-');
  }
  if (data && data.canva_fields) canvaUrl = buildCanvaUrl(data.canva_fields);
  const grid = document.getElementById('images-grid');
  grid.innerHTML = '';
  const imgs = data && data.imagens ? data.imagens : [];
  imgs.forEach((img, idx) => {
    const slide = slides[idx] || {};
    const card = document.createElement('div');
    card.className = 'img-card';
    if (img.url) {
      card.innerHTML = '<img src="' + img.url + '" alt="imagem ' + img.num + '" loading="lazy" /><div class="img-card-footer"><span class="img-card-label">Imagem ' + img.num + '</span><span class="img-card-badge">' + (slide.badge||'') + '</span><button class="btn-dl" onclick="window.open(\'' + img.url + '\',\'_blank\')" title="Baixar"><i class="ti ti-download"></i></button></div>';
    } else {
      card.innerHTML = '<div class="img-card-ph"><i class="ti ti-photo-off"></i><span>Nao gerada</span></div><div class="img-card-footer"><span class="img-card-label">Imagem ' + img.num + '</span><span class="img-card-badge">' + (slide.badge||'') + '</span></div>';
    }
    grid.appendChild(card);
  });
  goStep(4);
}
function resetAll() {
  ['prod-nome','prod-desc'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('prod-cat').value = '';
  document.getElementById('preview-grid').innerHTML = '';
  document.getElementById('upload-count').style.display = 'none';
  uploadedImages = [];
  canvaUrl = CANVA_TEMPLATE_URL;
  goStep(1);
}
</script>
</body>
</html>`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(HTML);
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo nao permitido' });
  const { nome, cat, desc, market, imagens_concorrente } = req.body;
  if (!nome || !desc) return res.status(400).json({ error: 'Nome e descricao sao obrigatorios' });
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!ANTHROPIC_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY nao configurada' });
  if (!OPENAI_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY nao configurada' });
  const imagensContent = imagens_concorrente && imagens_concorrente.length > 0
    ? imagens_concorrente.map(img => ({ type: 'image', source: { type: 'base64', media_type: img.type, data: img.data } }))
    : [];
  const analisePrompt = [
    ...imagensContent,
    { type: 'text', text: 'Voce e especialista em marketing visual para marketplace.\n' + (imagensContent.length > 0 ? 'Analise as imagens do concorrente e identifique o estilo visual.' : 'Crie uma estrategia visual profissional.') + '\n\nProduto: ' + nome + ' | Categoria: ' + cat + ' | Marketplace: ' + market + '\nDescricao: ' + desc + '\n\nRetorne SOMENTE JSON valido:\n{"estilo":{"cores":"cores dominantes","composicao":"estilo","fundo":"tipo de fundo","tom":"tom visual","resumo":"resumo em 1 frase"},"analise":{"publico":"publico em 1 frase","problema":"problema em 1 frase","gatilho":"gatilho em 1 frase"},"canva_fields":{"nome_produto":"' + nome + '","modelo_variacao":"modelo","destaque_1":"destaque 1","destaque_2":"destaque 2","beneficio_titulo":"BENEFICIO","beneficio_subtitulo":"complemento","item_incluso":"incluso","compatibilidade":"compatibilidade","capacidade_label":"capacidade","especificacao_tecnica":"tecnico","gatilho_linha1":"linha 1","gatilho_linha2":"linha 2","medida_1":"d1","medida_2":"d2","medida_3":"d3","medida_4":"d4","medida_5":"d5"},"prompts":[{"num":1,"titulo":"Foto principal","prompt":"professional product photo of ' + nome + ', pure white background, studio lighting, sharp focus, commercial photography"},{"num":2,"titulo":"Produto em uso","prompt":"person using ' + nome + ', lifestyle photo, natural setting, authentic, commercial photography"},{"num":3,"titulo":"Beneficios","prompt":"' + nome + ' flat lay top view, white background, minimalist, showcasing features"},{"num":4,"titulo":"Detalhes","prompt":"macro close up of ' + nome + ', white background, material quality and texture, sharp focus"},{"num":5,"titulo":"Contexto de uso","prompt":"' + nome + ' in elegant real environment, natural light, premium lifestyle"},{"num":6,"titulo":"Gatilho","prompt":"' + nome + ' aspirational lifestyle scene, golden hour, cinematic, emotional, desire"},{"num":7,"titulo":"Reforco final","prompt":"' + nome + ' hero shot, dramatic lighting, premium commercial photography, aspirational"}]}' }
  ];
  let analysisData;
  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 2000, messages: [{ role: 'user', content: analisePrompt }] })
    });
    if (!claudeRes.ok) { const err = await claudeRes.json(); return res.status(claudeRes.status).json({ error: err.error ? err.error.message : 'Erro Claude' }); }
    const claudeData = await claudeRes.json();
    const raw = claudeData.content && claudeData.content.find(b => b.type === 'text') ? claudeData.content.find(b => b.type === 'text').text : '';
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return res.status(500).json({ error: 'Claude nao retornou JSON valido' });
    analysisData = JSON.parse(match[0]);
  } catch (e) { return res.status(500).json({ error: 'Erro Claude: ' + e.message }); }
  async function gerarImagem(prompt, estilo) {
    const promptFinal = prompt + '. Style: ' + (estilo && estilo.resumo ? estilo.resumo : 'professional commercial photography') + '. Unique original image for marketplace listing.';
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + OPENAI_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'dall-e-3', prompt: promptFinal, n: 1, size: '1024x1024', quality: 'standard', response_format: 'url' })
      });
      if (!response.ok) { const err = await response.json(); console.error('DALL-E error:', JSON.stringify(err)); return null; }
      const data = await response.json();
      return data.data && data.data[0] ? data.data[0].url : null;
    } catch (e) { console.error('Erro DALL-E:', e.message); return null; }
  }
  const imagens = [];
  for (const item of analysisData.prompts) {
    const url = await gerarImagem(item.prompt, analysisData.estilo);
    imagens.push(Object.assign({}, item, { url: url }));
  }
  return res.status(200).json({ analise: analysisData.analise, estilo: analysisData.estilo, canva_fields: analysisData.canva_fields, imagens: imagens });
}
