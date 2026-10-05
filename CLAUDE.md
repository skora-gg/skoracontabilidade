# Skora Contabilidade — site

Site institucional da **Skora Contabilidade**, escritório da madrinha do Gean.
Objetivo principal: **levar o empresário a entrar em contato** (WhatsApp) para conversar / pedir uma proposta.
Público: donos de pequenas e médias empresas e MEIs. Muitos chegam pelo Instagram, no celular: mobile-first.

## A marca

- Nome: Skora Contabilidade — Instagram: @skoracontabilidade — https://www.instagram.com/skoracontabilidade/
- Bio do Instagram (fonte dos textos):
  - Assessoria contábil
  - Planejamento tributário
  - Consultoria para pequenas e médias empresas e MEIs
  - "Parceria que gera resultado" (lema)
- Logo: monograma "S" caligráfico em dourado e prata sobre círculo azul-marinho (foto do perfil do Instagram). O Gean autorizou usar. Arquivo esperado em `site/img/logo.png` (ou .webp/.svg); enquanto não existir, o site mostra só o nome por extenso. **Não redesenhar nem imitar a logo.**
- Pendências de dados: ver o fim deste arquivo. **Não inventar** nome, CRC, telefone, endereço, clientes, números ("+ de X empresas"), anos de experiência nem depoimentos.

## Regras do CFC (Código de Ética, NBC PG 01) — obrigatórias

- Toda publicidade, inclusive o site, deve trazer **nome, categoria profissional (Contador/Contadora) e número de registro no CRC** (e o registro da organização contábil, se houver). Fica no rodapé.
- Publicidade **informativa, moderada e discreta**, com caráter técnico; nada de tom mercantil ("o mais barato", promoções, garantias de resultado, comparação com concorrentes).
- Pode informar títulos, especializações, serviços oferecidos e trabalhos realizados; citar clientes só com autorização deles.

## Identidade visual

- Cores tiradas da logo: azul-marinho (base), dourado (detalhes, botões principais) e prata/branco. Tokens no `:root` do `estilo.css`.
- Tipografia: Playfair Display (títulos, elegante e clássica) + Manrope (texto, legível).
- Formas arredondadas e sóbrias (mesma linguagem fluida do site da Rm Beauty Concept, mas em tom corporativo): botões em pílula, cartões com cantos grandes, sombras suaves.
- Motivo decorativo: arcos finos dourados, ecoando a curva do "S" da logo. Dourado com moderação.
- Acessibilidade: contraste AA, foco visível, áreas de toque ≥ 44px, `prefers-reduced-motion`. Sem animações chamativas.

## Seções

1. Início: lema "Parceria que gera resultado", resumo dos serviços, botões de contato.
2. Serviços: assessoria contábil, planejamento tributário, consultoria para PMEs e MEIs (os três da bio). Outros serviços só depois de confirmados.
3. Para quem: MEI, pequena empresa, média empresa.
4. Como funciona: diagnóstico → planejamento → acompanhamento (texto modelo; a contadora deve revisar).
5. Dúvidas frequentes: perguntas gerais e corretas, sem números que mudam com a lei (limites de faturamento, alíquotas).
6. Contato: formulário que monta a mensagem e abre o WhatsApp (nada é salvo no site, LGPD) + Instagram.
7. Rodapé: nome, categoria e CRC (obrigatório), contatos.

## Técnico

- HTML/CSS/JS puros em `site/`, sem framework nem build. Mesmo padrão do projeto rmbeautyconcept.
- Contatos ficam num lugar só: `CONTATO` no topo do `site/js/main.js`. Links de WhatsApp no HTML apontam para `#contato` e o JS troca para `wa.me` quando o número estiver preenchido.
- Sempre que mudar `css/estilo.css` ou `js/main.js`, aumentar o `?v=` no `index.html`.
- Testar no celular (390px) e no desktop; validar o HTML no https://validator.w3.org/nu/.
- No PC do Gean não há Python nem Node: servidor de teste com `HttpListener` do PowerShell (comando direto; `.ps1` não assinado é bloqueado). A rede da empresa (FortiGuard) bloqueia downloads do CDN do Instagram: não contornar.

## Pendências (perguntar ao Gean antes de inventar)

- [ ] Arquivo da logo em boa resolução (o do Instagram tem só 150×150 px)
- [ ] Nome da contadora, categoria e número do CRC (e CRC da empresa, se houver) — obrigatório pelo CFC
- [ ] WhatsApp, e-mail e telefone
- [ ] Cidade / endereço (mostrar endereço? atendimento só online?)
- [ ] Lista completa de serviços (abertura de empresa, folha de pagamento, imposto de renda, etc.?)
- [ ] Texto do "Como funciona" e um "Sobre" (formação, trajetória) com foto, se ela quiser
- [x] Hospedagem: mesma VM (Oracle Cloud, `principal-site`) do site da Rm Beauty Concept, pelo Caddy único em `~/apps/servidor` (cópia em `Documentos\servidor`). Para publicar: descomentar o bloco da Skora no `Caddyfile` e a linha do volume no `docker-compose.yml`, clonar o site em `~/apps/skoracontabilidade` e rodar `docker compose up -d` em `~/apps/servidor`.
- [ ] Domínio (duckdns ou próprio .com.br — redes de empresa costumam bloquear domínios duckdns) e repositório no GitHub
