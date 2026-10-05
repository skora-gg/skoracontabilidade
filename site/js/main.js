// Skora Contabilidade — menu, links de WhatsApp e formulário de contato.
// Nenhum dado é enviado para servidor: o formulário só monta o texto e abre o WhatsApp.

// Contatos do escritório: preencha aqui (é o único lugar). Vazio = o item não aparece no site.
const CONTATO = {
  whatsapp: '', // PENDENTE: só números, com 55 + DDD. Ex.: '5541999998888'
  email: ''     // PENDENTE: ex.: 'contato@skoracontabilidade.com.br'
};

const linkWhats = texto => `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;
const telefoneLegivel = n => n.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');

document.getElementById('ano').textContent = new Date().getFullYear();

/* ---------- Topo: sombra ao rolar + menu do celular ---------- */
(function topo() {
  const topo = document.getElementById('topo');
  const botao = document.getElementById('menu-botao');
  const menu = document.getElementById('menu');
  const marcarRolagem = () => topo.classList.toggle('rolou', window.scrollY > 8);
  marcarRolagem();
  window.addEventListener('scroll', marcarRolagem, { passive: true });

  function abrir(sim) {
    menu.classList.toggle('aberto', sim);
    botao.setAttribute('aria-expanded', String(sim));
    botao.setAttribute('aria-label', sim ? 'Fechar menu' : 'Abrir menu');
    botao.querySelector('use').setAttribute('href', sim ? '#i-fechar' : '#i-menu');
  }
  botao.addEventListener('click', () => abrir(!menu.classList.contains('aberto')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) abrir(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) { abrir(false); botao.focus(); }
  });
  document.addEventListener('click', e => {
    if (menu.classList.contains('aberto') && !topo.contains(e.target)) abrir(false);
  });
})();

/* ---------- Canais de contato ---------- */
// Sem número configurado, os botões de WhatsApp levam à seção de contato (nada quebra).
(function canais() {
  if (CONTATO.whatsapp) {
    document.querySelectorAll('[data-whatsapp]').forEach(a => {
      a.href = linkWhats(a.dataset.whatsapp);
      a.target = '_blank';
      a.rel = 'noopener';
    });
    const canal = document.getElementById('canal-whatsapp');
    canal.href = linkWhats('Olá! Vim pelo site da Skora Contabilidade.');
    canal.target = '_blank';
    canal.rel = 'noopener';
    canal.textContent = telefoneLegivel(CONTATO.whatsapp);
    canal.closest('li').hidden = false;
    document.getElementById('whats-flutuante').hidden = false;
  }
  if (CONTATO.email) {
    const canal = document.getElementById('canal-email');
    canal.href = `mailto:${CONTATO.email}`;
    canal.textContent = CONTATO.email;
    canal.closest('li').hidden = false;
  }
})();

/* ---------- Formulário de contato: monta a mensagem e abre o WhatsApp ---------- */
(function formulario() {
  const form = document.getElementById('form-contato');
  const resumo = document.getElementById('erro-resumo');
  const obrigatorios = [
    ['nome', 'Escreva seu nome.'],
    ['perfil', 'Escolha uma opção.'],
    ['assunto', 'Escolha um assunto.']
  ];

  function marcar(nome, msg) {
    document.getElementById('erro-' + nome).textContent = msg;
    form.elements[nome].setAttribute('aria-invalid', 'true');
  }
  function limpar(nome) {
    const e = document.getElementById('erro-' + nome);
    if (!e) return;
    e.textContent = '';
    form.elements[nome].removeAttribute('aria-invalid');
  }
  form.addEventListener('input', e => { if (e.target.id) limpar(e.target.id); });

  function montarMensagem() {
    const v = n => form.elements[n].value.trim();
    const linhas = [
      'Olá! Vim pelo site da Skora Contabilidade.',
      '',
      `*Nome:* ${v('nome')}`
    ];
    if (v('empresa')) linhas.push(`*Empresa:* ${v('empresa')}`);
    linhas.push(`*Perfil:* ${v('perfil')}`, `*Assunto:* ${v('assunto')}`);
    if (v('mensagem')) linhas.push(`*Mensagem:* ${v('mensagem')}`);
    return linhas.join('\n');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    obrigatorios.forEach(([n]) => limpar(n));
    const erros = obrigatorios.filter(([n]) => !form.elements[n].value.trim());
    erros.forEach(([n, m]) => marcar(n, m));
    if (erros.length) {
      resumo.textContent = erros.length === 1
        ? 'Falta 1 informação: ' + erros[0][1]
        : `Faltam ${erros.length} informações. Confira os campos marcados.`;
      resumo.hidden = false;
      form.elements[erros[0][0]].focus();
      return;
    }
    if (!CONTATO.whatsapp) {
      resumo.textContent = 'O WhatsApp do escritório ainda não foi configurado no site.';
      resumo.hidden = false;
      return;
    }
    resumo.hidden = true;
    const url = linkWhats(montarMensagem());
    const janela = window.open(url, '_blank');
    if (janela) janela.opener = null;
    else window.location.href = url; // bloqueador de pop-up: abre na mesma aba
  });
})();
