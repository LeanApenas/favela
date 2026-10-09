(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* WhatsApp prefilled messages */
  const WA = '5521981789239';
  $$('[data-wa]').forEach(a => {
    const msg = a.dataset.msg || 'Olá! Quero reservar um passeio com o Favela Walking Tour.';
    a.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  });
  $('#yr').textContent = new Date().getFullYear();

  /* header + menu + dock */
  const top = $('#top'), dock = $('#dock'), hero = $('#inicio');
  const onScroll = () => {
    top.classList.toggle('scrolled', scrollY > 8);
    dock.classList.toggle('show', scrollY > hero.offsetHeight * .6);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const menuBtn = $('.menu-btn'), menu = $('#menu');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', t(open ? 'Fechar menu' : 'Abrir menu'));
    menuBtn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });

  /* copy promo code */
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const t = b.dataset.copy, label = b.querySelector('span');
    try { await navigator.clipboard.writeText(t); }
    catch { const r = document.createRange(); r.selectNodeContents($('#promo')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); try { document.execCommand('copy'); } catch {} }
    b.dataset.done = ''; label.textContent = t('Copiado');
    setTimeout(() => { delete b.dataset.done; label.textContent = t('Copiar'); }, 2200);
  }));

  /* reveal on scroll */
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(el => io.observe(el));
  } else $$('.rv').forEach(el => el.classList.add('in'));

  /* ================= i18n: PT (source) · EN · ES ================= */
  const I18N = {
    'Início':['Home','Inicio'],
    'Sobre nós':['About us','Nosotros'],
    'Avaliações':['Reviews','Opiniones'],
    'Contato':['Contact','Contacto'],
    'Reservar agora':['Book now','Reservar ahora'],
    'Parque Nacional da Tijuca':['Tijuca National Park','Parque Nacional de Tijuca'],
    'Oceano Atlântico':['Atlantic Ocean','Océano Atlántico'],
    'Passarela da Rocinha':['Rocinha Footbridge','Pasarela de Rocinha'],
    'Vista do alto da Rocinha':['The view from upper Rocinha','La vista desde lo alto de Rocinha'],
    'Introdução':['Introduction','Introducción'],
    'Início da caminhada':['Walk begins','Empieza la caminata'],
    'Fim na Passarela':['Ends at the Footbridge','Fin en la Pasarela'],
    'van de Copacabana e Ipanema →':['van from Copacabana & Ipanema →','van desde Copacabana e Ipanema →'],
    'saídas diárias':['daily departures','salidas diarias'],
    '3 horas com guia local':['3 hours with a local guide','3 horas con guía local'],
    'Encontro · Metrô São Conrado':['Meet · São Conrado Metro','Encuentro · Metro São Conrado'],
    'Subida de moto':['Motorbike ride up','Subida en moto'],
    'Caminhada no alto':['Walk from the top','Caminata desde lo alto'],
    'Volta ao ponto':['Back to meeting point','Regreso al punto'],
    'A Rocinha a pé, com quem conhece':['Rocinha on foot, with people who know','Rocinha a pie, con quien conoce'],
    'cada beco.':['every alley.','cada callejón.'],
    'Passeios guiados todos os dias desde 2002, com guias locais e em seis idiomas. Escolha a sua rota no mapa e reserve direto com a agência.':['Guided tours every day since 2002, with local guides, in six languages. Pick your route on the map and book direct with the agency.','Tours guiados todos los días desde 2002, con guías locales y en seis idiomas. Elige tu ruta en el mapa y reserva directo con la agencia.'],
    'Fale no':['Chat on','Escríbenos por'],
    '4,9/5 no Tripadvisor':['4.9/5 on Tripadvisor','4,9/5 en Tripadvisor'],
    'Desde 2002':['Since 2002','Desde 2002'],
    '6 idiomas':['6 languages','6 idiomas'],
    'Rotas':['Routes','Rutas'],
    'Toque numa rota para ver o caminho':['Tap a route to see the way','Toca una ruta para ver el camino'],
    '9:30 e 13:30 · com busca no hotel':['9:30 & 13:30 · hotel pickup','9:30 y 13:30 · recogida en el hotel'],
    'a partir de':['from','desde'],
    'A partir de':['From','Desde'],
    '16:30 · moto até o alto e descida a pé':['16:30 · motorbike up, walk down','16:30 · moto hasta arriba y bajada a pie'],
    'Favela Walking Tour clássico':['Classic Favela Walking Tour','Favela Walking Tour clásico'],
    '9:30 e 13:30 · grupo ou privado':['9:30 & 13:30 · group or private','9:30 y 13:30 · grupo o privado'],
    'Mapa ilustrativo, fora de escala':['Illustrative map, not to scale','Mapa ilustrativo, sin escala'],
    'Valor final confirmado na reserva':['Final price confirmed at booking','Precio final confirmado en la reserva'],
    'Escolha a sua rota.':['Choose your route.','Elige tu ruta.'],
    'Três jeitos de conhecer a Rocinha. Todos com guia local, todos reservados direto com a agência. Reservando direto, sem revendedor, você economiza até 25%.':['Three ways to discover Rocinha. All with a local guide, all booked direct with the agency. Book direct, skip the resellers, and save up to 25%.','Tres formas de conocer Rocinha. Todas con guía local y reservadas directo con la agencia. Reservando directo, sin revendedores, ahorras hasta un 25%.'],
    'Rota':['Route','Ruta'],
    '3h de caminhada':['3h walk','3h de caminata'],
    'Busca em Copacabana e Ipanema':['Pickup in Copacabana & Ipanema','Recogida en Copacabana e Ipanema'],
    'Do alto da comunidade até a Passarela, pelos becos, escadarias e lajes, com paradas para as vistas e para as fotos. Um guia local conta a história da Rocinha enquanto vocês descem.':['From the top of the community down to the Footbridge, through alleys, stairways and rooftops, with stops for the views and photos. A local guide tells Rocinha’s story as you walk down.','Desde lo alto de la comunidad hasta la Pasarela, por callejones, escaleras y azoteas, con paradas para las vistas y las fotos. Un guía local cuenta la historia de Rocinha mientras bajan.'],
    'Saída':['Departs','Salida'],
    'por pessoa':['per person','por persona'],
    'Busca no Copacabana Palace':['Pickup at Copacabana Palace','Recogida en el Copacabana Palace'],
    'Embarque na van.':['Board the van.','Subida a la van.'],
    'Busca no Sol Ipanema':['Pickup at Sol Ipanema','Recogida en el Sol Ipanema'],
    'Depois, direto para a Rocinha.':['Then straight to Rocinha.','Después, directo a Rocinha.'],
    'Introdução sobre a Rocinha':['Introduction to Rocinha','Introducción a Rocinha'],
    'A história e as principais características da comunidade.':['The history and main features of the community.','La historia y las principales características de la comunidad.'],
    'Começa a caminhada':['The walk begins','Empieza la caminata'],
    'Pela comunidade com o guia local, com paradas para fotos.':['Through the community with your local guide, with photo stops.','Por la comunidad con el guía local, con paradas para fotos.'],
    'Fim na Passarela da Rocinha':['Ends at Rocinha Footbridge','Fin en la Pasarela de Rocinha'],
    'Volta de van, com chegada prevista às 13:00 ou 17:00 ao Copacabana Palace e ao Sol Ipanema.':['Van back, arriving around 13:00 or 17:00 at Copacabana Palace and Sol Ipanema.','Regreso en van, con llegada prevista a las 13:00 o 17:00 al Copacabana Palace y al Sol Ipanema.'],
    'Guia local':['Local guide','Guía local'],
    'Transporte de van':['Van transport','Transporte en van'],
    'Taxa de entrada na comunidade':['Community entrance fee','Tasa de entrada a la comunidad'],
    'Dúvidas':['Questions','Dudas'],
    'Ver no mapa':['See on map','Ver en el mapa'],
    'Moto com piloto local':['Motorbike with a local rider','Moto con piloto local'],
    'Encontro em São Conrado':['Meet in São Conrado','Encuentro en São Conrado'],
    'A saída do fim da tarde. Você sobe de moto até o mirante da Rocinha, caminha pela comunidade com o guia e desce enquanto a luz do dia vai embora e o morro começa a acender.':['The late-afternoon departure. Ride a motorbike up to Rocinha’s viewpoint, walk the community with your guide, and head down as daylight fades and the hill starts to light up.','La salida del final de la tarde. Subes en moto hasta el mirador de Rocinha, caminas por la comunidad con el guía y bajas mientras se va la luz del día y el morro empieza a encenderse.'],
    'Encontro na Estrada da Gávea, 837':['Meet at Estrada da Gávea, 837','Encuentro en Estrada da Gávea, 837'],
    'São Conrado, ao lado do Metrô São Conrado (saída C).':['São Conrado, next to São Conrado Metro (exit C).','São Conrado, junto al Metro São Conrado (salida C).'],
    'Subida de moto até o mirante':['Motorbike ride up to the viewpoint','Subida en moto hasta el mirador'],
    'Com piloto local, até o alto da Rocinha.':['With a local rider, to the top of Rocinha.','Con piloto local, hasta lo alto de Rocinha.'],
    'Caminhada pela Rocinha':['Walk through Rocinha','Caminata por Rocinha'],
    'Becos, vistas e histórias com o guia.':['Alleys, views and stories with your guide.','Callejones, vistas e historias con el guía.'],
    'Fim no ponto de encontro':['Ends at the meeting point','Fin en el punto de encuentro'],
    'Volta ao Metrô São Conrado.':['Back to São Conrado Metro.','Regreso al Metro São Conrado.'],
    'Caminhada com guia':['Guided walk','Caminata con guía'],
    'Por causa da moto, este passeio não é recomendado para crianças nem para idosos com dificuldade de locomoção. Para eles, a caminhada das 9:30 ou 13:30 é a melhor escolha.':['Because of the motorbike ride, this tour is not recommended for children or for older visitors with limited mobility. For them, the 9:30 or 13:30 walk is the best choice.','Por la moto, este tour no se recomienda para niños ni para personas mayores con dificultades de movilidad. Para ellos, la caminata de las 9:30 o 13:30 es la mejor opción.'],
    'Caminhada imersiva':['Immersive walk','Caminata inmersiva'],
    'Guias credenciados':['Licensed guides','Guías acreditados'],
    'A caminhada clássica, que rendeu à agência o título de melhor favela tour do Rio no Tripadvisor. São três horas a pé pela Rocinha no seu idioma. Para um grupo só seu, outro horário ou uma necessidade de acessibilidade, combine antes pelo WhatsApp.':['The classic walk that earned the agency the title of Rio’s best favela tour on Tripadvisor. Three hours on foot through Rocinha, in your language. For a private group, another time or an accessibility need, arrange it first on WhatsApp.','La caminata clásica que le dio a la agencia el título de mejor favela tour de Río en Tripadvisor. Tres horas a pie por Rocinha, en tu idioma. Para un grupo privado, otro horario o una necesidad de accesibilidad, coordínalo antes por WhatsApp.'],
    'por pessoa · todos os dias':['per person · every day','por persona · todos los días'],
    'Guias em':['Guides in','Guías en'],
    'Guia local bilíngue':['Bilingual local guide','Guía local bilingüe'],
    'Opção privada (Favela Tour Premium)':['Private option (Favela Tour Premium)','Opción privada (Favela Tour Premium)'],
    '10% de desconto para estudantes':['10% student discount','10% de descuento para estudiantes'],
    'Personalizar':['Customize','Personalizar'],
    'Outras saídas':['More experiences','Más experiencias'],
    'Favela Walking Tour com filmagem de drone':['Favela Walking Tour with drone footage','Favela Walking Tour con filmación con dron'],
    '11:30 · vídeo aéreo profissional':['11:30 · professional aerial video','11:30 · video aéreo profesional'],
    'Floresta da Tijuca, tour privado':['Tijuca Rainforest, private tour','Bosque de Tijuca, tour privado'],
    'Futebol no Maracanã':['Football at Maracanã','Fútbol en el Maracanã'],
    '4h · dia de jogo':['4h · match day','4h · día de partido'],
    'Voo de asa-delta':['Hang gliding flight','Vuelo en ala delta'],
    'Com mais de 40 anos de experiência':['Over 40 years of experience','Con más de 40 años de experiencia'],
    'Turismo que fica na comunidade.':['Tourism that stays in the community.','Turismo que se queda en la comunidad.'],
    'Desde 2002 a gente leva visitantes pela Rocinha, e já foram mais de um milhão. A favela é a casa de muita gente, e o passeio é feito com esse respeito do começo ao fim.':['Since 2002 we have walked more than a million visitors through Rocinha. The favela is home to many people, and every tour treats it with that respect from start to finish.','Desde 2002 llevamos visitantes por Rocinha, y ya son más de un millón. La favela es el hogar de mucha gente, y el tour se hace con ese respeto de principio a fin.'],
    'Turismo sustentável e comunitário':['Sustainable, community tourism','Turismo sostenible y comunitario'],
    'Parte do que você paga fica na economia local e no projeto social da agência. Reservando direto, sem revendedor, o apoio chega inteiro.':['Part of what you pay stays in the local economy and the agency’s social project. Book direct, with no reseller, and all of that support arrives.','Parte de lo que pagas se queda en la economía local y en el proyecto social de la agencia. Reservando directo, sin revendedor, el apoyo llega completo.'],
    'Guias locais credenciados e bilíngues':['Licensed, bilingual local guides','Guías locales acreditados y bilingües'],
    'Agência com registro no Cadastur, o cadastro do Ministério do Turismo. Os guias falam português, inglês, espanhol, francês, dinamarquês e hebraico.':['An agency registered with Cadastur, Brazil’s Ministry of Tourism registry. Guides speak Portuguese, English, Spanish, French, Danish and Hebrew.','Agencia registrada en Cadastur, el registro del Ministerio de Turismo de Brasil. Los guías hablan portugués, inglés, español, francés, danés y hebreo.'],
    'Segurança e respeito':['Safety and respect','Seguridad y respeto'],
    'Andar com um guia local experiente é a forma recomendada de visitar uma favela. Você conhece a Rocinha como visitante convidado, não como espectador.':['Walking with an experienced local guide is the recommended way to visit a favela. You see Rocinha as an invited guest, not as a spectator.','Caminar con un guía local con experiencia es la forma recomendada de visitar una favela. Conoces Rocinha como invitado, no como espectador.'],
    'Antes de subir':['Before you go up','Antes de subir'],
    'Tênis confortável.':['Comfortable shoes.','Calzado cómodo.'],
    'O caminho tem degraus irregulares e becos estreitos.':['The route has uneven steps and narrow alleys.','El camino tiene escalones irregulares y callejones estrechos.'],
    'Peça antes de fotografar.':['Ask before taking photos.','Pide permiso antes de fotografiar.'],
    'Não fotografe moradores sem permissão.':['Don’t photograph residents without permission.','No fotografíes a los vecinos sin permiso.'],
    'Famílias são bem-vindas.':['Families are welcome.','Las familias son bienvenidas.'],
    'Só mantenha as crianças sempre por perto.':['Just keep children close at all times.','Solo mantén a los niños siempre cerca.'],
    'Siga o guia.':['Follow your guide.','Sigue al guía.'],
    'Ele conhece o caminho e as pessoas.':['They know the way and the people.','Conoce el camino y a la gente.'],
    'Mais de 10 mil crianças no projeto social':['More than 10,000 children in the social project','Más de 10 mil niños en el proyecto social'],
    'Há mais de dez anos o projeto leva educação pelo esporte a crianças da região. Com uma assinatura a partir de US$ 1 por mês, você ajuda com educação, saúde e oportunidades para as famílias.':['For more than ten years the project has brought education through sport to children in the area. From US$ 1 a month, your subscription helps with education, healthcare and opportunities for families.','Desde hace más de diez años el proyecto lleva educación a través del deporte a niños de la región. Con una suscripción desde US$ 1 al mes, ayudas con educación, salud y oportunidades para las familias.'],
    'Doar ou assinar':['Donate or subscribe','Donar o suscribirse'],
    'O que dizem depois da caminhada.':['What people say after the walk.','Lo que dicen después de la caminata.'],
    'Avaliações de quem já fez o passeio, publicadas no Tripadvisor e no GetYourGuide. Os trechos estão no idioma original.':['Reviews from people who took the tour, posted on Tripadvisor and GetYourGuide. Quotes are in their original language.','Opiniones de quienes ya hicieron el tour, publicadas en Tripadvisor y GetYourGuide. Las citas están en su idioma original.'],
    '4,9 de 5':['4.9 out of 5','4,9 de 5'],
    '4,9':['4.9','4,9'],
    'Tripadvisor e GetYourGuide':['Tripadvisor & GetYourGuide','Tripadvisor y GetYourGuide'],
    'No Tripadvisor desde 2002':['On Tripadvisor since 2002','En Tripadvisor desde 2002'],
    '+5.000 avaliações':['5,000+ reviews','+5.000 opiniones'],
    'Visitante, sobre o guia Roberto · GetYourGuide':['Visitor, about guide Roberto · GetYourGuide','Visitante, sobre el guía Roberto · GetYourGuide'],
    'Visitante, sobre o guia Bruno · GetYourGuide':['Visitor, about guide Bruno · GetYourGuide','Visitante, sobre el guía Bruno · GetYourGuide'],
    'Visitante · GetYourGuide':['Visitor · GetYourGuide','Visitante · GetYourGuide'],
    'Visitante, sobre o guia Kim · Tripadvisor':['Visitor, about guide Kim · Tripadvisor','Visitante, sobre el guía Kim · Tripadvisor'],
    'Reservar o meu passeio':['Book my tour','Reservar mi tour'],
    'Saídas todos os dias às 9:30, 13:30 e 16:30.':['Departures every day at 9:30, 13:30 and 16:30.','Salidas todos los días a las 9:30, 13:30 y 16:30.'],
    'Do morro para o seu feed.':['From the hill to your feed.','Del morro a tu feed.'],
    'Fotos dos passeios. Tem mais todo dia no Instagram, e você pode marcar a gente nas suas.':['Photos from our tours. There are more every day on Instagram, and you can tag us in yours.','Fotos de los tours. Hay más todos los días en Instagram, y puedes etiquetarnos en las tuyas.'],
    'Seguir no Instagram':['Follow on Instagram','Seguir en Instagram'],
    'Tudo à mão.':['Everything at hand.','Todo a mano.'],
    'Reserva, dúvida rápida, ponto de encontro. O WhatsApp responde em português, inglês e espanhol.':['Bookings, quick questions, meeting point. WhatsApp replies in Portuguese, English and Spanish.','Reservas, dudas rápidas, punto de encuentro. El WhatsApp responde en portugués, inglés y español.'],
    'Reservas e dúvidas no WhatsApp':['Bookings and questions on WhatsApp','Reservas y dudas por WhatsApp'],
    'Ver datas e reservar online':['See dates and book online','Ver fechas y reservar online'],
    'Agenda oficial com todos os passeios':['Official calendar with every tour','Agenda oficial con todos los tours'],
    'Ponto de encontro no mapa':['Meeting point on the map','Punto de encuentro en el mapa'],
    'Apoie o projeto social com as crianças':['Support the children’s social project','Apoya el proyecto social con los niños'],
    'Favela Talks no YouTube':['Favela Talks on YouTube','Favela Talks en YouTube'],
    'Conversas gravadas na Rocinha':['Conversations recorded in Rocinha','Conversaciones grabadas en Rocinha'],
    'Todos os links':['All links','Todos los enlaces'],
    'Código de desconto':['Discount code','Código de descuento'],
    'Use na reserva online. Estudantes têm 10% de desconto.':['Use it when booking online. Students get 10% off.','Úsalo en la reserva online. Los estudiantes tienen 10% de descuento.'],
    'Copiar':['Copy','Copiar'],
    'Copiado':['Copied','Copiado'],
    'Onde a gente se encontra':['Where we meet','Dónde nos encontramos'],
    'Busca no Copacabana Palace e no Sol Ipanema.':['Pickup at Copacabana Palace and Sol Ipanema.','Recogida en el Copacabana Palace y en el Sol Ipanema.'],
    'Estrada da Gávea, 837, São Conrado, na saída C do Metrô São Conrado.':['Estrada da Gávea, 837, São Conrado, at exit C of São Conrado Metro.','Estrada da Gávea, 837, São Conrado, en la salida C del Metro São Conrado.'],
    'Passeios guiados pela Rocinha, no Rio de Janeiro, desde 2002. Mais de 20 anos de experiência e mais de 1 milhão de visitantes.':['Guided tours of Rocinha, Rio de Janeiro, since 2002. More than 20 years of experience and over 1 million visitors.','Tours guiados por Rocinha, en Río de Janeiro, desde 2002. Más de 20 años de experiencia y más de 1 millón de visitantes.'],
    'Passeios':['Tours','Tours'],
    'Agenda e reservas':['Calendar & booking','Agenda y reservas'],
    'A agência':['The agency','La agencia'],
    'Projeto social':['Social project','Proyecto social'],
    'Site oficial':['Official website','Sitio oficial'],
    'Preços “a partir de” por pessoa. Valor final, disponibilidade e condições confirmados na reserva.':['Prices are “from” per person. Final price, availability and terms confirmed at booking.','Precios “desde” por persona. Precio final, disponibilidad y condiciones confirmados en la reserva.'],
    'Favela Walking Tour, início':['Favela Walking Tour, home','Favela Walking Tour, inicio'],
    'Principal':['Main','Principal'],
    'Abrir menu':['Open menu','Abrir menú'],
    'Fechar menu':['Close menu','Cerrar menú'],
    'Mapa ilustrativo da Rocinha com as rotas dos passeios: a caminhada diurna da parte alta até a Passarela, e a rota de fim de tarde que sobe de moto a partir do Metrô São Conrado e desce a pé.':['Illustrative map of Rocinha with the tour routes: the daytime walk from the upper part down to the Footbridge, and the late-afternoon route that rides up by motorbike from São Conrado Metro and walks back down.','Mapa ilustrativo de Rocinha con las rutas de los tours: la caminata diurna desde la parte alta hasta la Pasarela, y la ruta del final de la tarde que sube en moto desde el Metro São Conrado y baja a pie.'],
    'Reservar Rocinha Walking Tour, a partir de 230 reais':['Book Rocinha Walking Tour, from 230 reais','Reservar Rocinha Walking Tour, desde 230 reales'],
    'Reservar Favela Night Tour Experience, a partir de 175 reais':['Book Favela Night Tour Experience, from 175 reais','Reservar Favela Night Tour Experience, desde 175 reales'],
    'Reservar Favela Walking Tour clássico, a partir de 230 reais':['Book classic Favela Walking Tour, from 230 reais','Reservar Favela Walking Tour clásico, desde 230 reales'],
    'Guia do Favela Walking Tour com um visitante no mirante, com a Rocinha e o mar ao fundo':['Favela Walking Tour guide with a visitor at the viewpoint, Rocinha and the sea behind','Guía de Favela Walking Tour con un visitante en el mirador, con Rocinha y el mar al fondo'],
    'Visitantes no alto da Rocinha olhando a comunidade, com a Pedra da Gávea ao fundo':['Visitors at the top of Rocinha looking over the community, Pedra da Gávea behind','Visitantes en lo alto de Rocinha mirando la comunidad, con la Pedra da Gávea al fondo'],
    'Casas coloridas empilhadas na encosta da Rocinha, com a Pedra da Gávea ao fundo':['Colourful houses stacked on Rocinha’s hillside, Pedra da Gávea behind','Casas de colores apiladas en la ladera de Rocinha, con la Pedra da Gávea al fondo'],
    'Crianças do projeto social com uniforme da seleção posando num campo de grama':['Children from the social project in Brazil kits posing on a grass field','Niños del proyecto social con la camiseta de Brasil posando en un campo de césped'],
    'Selfie de um visitante com o guia Roberto num mirante da Rocinha':['A visitor’s selfie with guide Roberto at a Rocinha viewpoint','Selfie de un visitante con el guía Roberto en un mirador de Rocinha'],
    '5 estrelas':['5 stars','5 estrellas'],
    'Guia explicando algo a uma visitante numa rua da Rocinha':['Guide explaining something to a visitor on a Rocinha street','Guía explicando algo a una visitante en una calle de Rocinha'],
    'Guia apontando para a Rocinha, com o mar e o Dois Irmãos ao fundo':['Guide pointing at Rocinha, with the sea and Dois Irmãos behind','Guía señalando Rocinha, con el mar y el Dois Irmãos al fondo'],
    'Selfie de visitante com o guia num mirante':['Visitor selfie with the guide at a viewpoint','Selfie de un visitante con el guía en un mirador'],
    'Casas coloridas empilhadas na encosta da Rocinha':['Colourful houses stacked on Rocinha’s hillside','Casas de colores apiladas en la ladera de Rocinha'],
    'Casal de visitantes numa laje, com a bandeira do Brasil e a Pedra da Gávea ao fundo':['A couple of visitors on a rooftop, with the Brazilian flag and Pedra da Gávea behind','Pareja de visitantes en una azotea, con la bandera de Brasil y la Pedra da Gávea al fondo'],
    'Guia conversando com uma visitante':['Guide talking with a visitor','Guía conversando con una visitante'],
    'Visitantes no alto do morro olhando a vista':['Visitors at the top of the hill taking in the view','Visitantes en lo alto del morro mirando la vista'],
    'Crianças do projeto social de futebol':['Children from the football social project','Niños del proyecto social de fútbol'],
    'Grupo descendo uma escadaria com o guia':['A group walking down a stairway with the guide','Grupo bajando una escalera con el guía'],
    'Falar no WhatsApp':['Chat on WhatsApp','Escribir por WhatsApp'],
    'Olá! Quero reservar um passeio com o Favela Walking Tour.':['Hi! I’d like to book a tour with Favela Walking Tour.','¡Hola! Quiero reservar un tour con Favela Walking Tour.'],
    'Olá! Tenho uma dúvida sobre o Rocinha Favela Walking Tour (3h).':['Hi! I have a question about the Rocinha Favela Walking Tour (3h).','¡Hola! Tengo una duda sobre el Rocinha Favela Walking Tour (3h).'],
    'Olá! Tenho uma dúvida sobre o Favela Night Tour Experience (16:30).':['Hi! I have a question about the Favela Night Tour Experience (16:30).','¡Hola! Tengo una duda sobre el Favela Night Tour Experience (16:30).'],
    'Olá! Quero personalizar um Favela Walking Tour (grupo privado / idioma / horário).':['Hi! I’d like to customize a Favela Walking Tour (private group / language / time).','¡Hola! Quiero personalizar un Favela Walking Tour (grupo privado / idioma / horario).'],
    'Favela Walking Tour · Rocinha, Rio de Janeiro':['Favela Walking Tour · Rocinha, Rio de Janeiro','Favela Walking Tour · Rocinha, Río de Janeiro'],
    'Passeios guiados a pé pela Rocinha, no Rio de Janeiro, desde 2002. Guias locais, seis idiomas, saídas diárias às 9:30, 13:30 e 16:30. Reserve direto com a agência.':['Guided walking tours of Rocinha, Rio de Janeiro, since 2002. Local guides, six languages, daily departures at 9:30, 13:30 and 16:30. Book direct with the agency.','Tours guiados a pie por Rocinha, en Río de Janeiro, desde 2002. Guías locales, seis idiomas, salidas diarias a las 9:30, 13:30 y 16:30. Reserva directo con la agencia.']
  };
  const LANGS = ['pt', 'en', 'es'];
  let lang = 'pt';
  const t = s => { const v = I18N[s]; const i = LANGS.indexOf(lang) - 1; return (i >= 0 && v) ? v[i] : s; };
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const tNodes = [], tAttrs = [];
  (function collect() {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const p = n.parentElement;
      if (!p || p.closest('script,style,blockquote,.lang-switch,.langs')) continue;
      const core = norm(n.nodeValue);
      if (core && I18N[core]) tNodes.push([n, n.nodeValue, core]);
    }
    $$('[alt],[aria-label]').forEach(el => ['alt', 'aria-label'].forEach(a => { const v = el.getAttribute(a); if (v && I18N[v] && !el.closest('.lang-switch')) tAttrs.push([el, a, v]); }));
  })();
  const metaDesc = $('meta[name="description"]'), PT_TITLE = document.title, PT_DESC = metaDesc.content;
  const setLang = (l, save) => {
    lang = LANGS.includes(l) ? l : 'pt';
    doc.lang = lang === 'pt' ? 'pt-BR' : lang;
    for (const [n, orig, core] of tNodes) n.nodeValue = lang === 'pt' ? orig : orig.replace(/\s+/g, ' ').replace(core, t(core));
    for (const [el, a, orig] of tAttrs) el.setAttribute(a, t(orig));
    document.title = t(PT_TITLE); metaDesc.content = t(PT_DESC);
    $$('[data-wa]').forEach(a => { a.href = `https://wa.me/${WA}?text=${encodeURIComponent(t(a.dataset.msg || 'Olá! Quero reservar um passeio com o Favela Walking Tour.'))}`; });
    $$('.lang-switch button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    menuBtn.setAttribute('aria-label', t(menu.classList.contains('open') ? 'Fechar menu' : 'Abrir menu'));
    $$('[data-copy] span').forEach(s => { if (!s.closest('[data-done]')) s.textContent = t('Copiar'); });
    if (save) { try { localStorage.setItem('fwt-lang', lang); } catch {} }
  };
  $$('.lang-switch button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang, true)));
  let saved = null; try { saved = localStorage.getItem('fwt-lang'); } catch {}
  const navLang = (navigator.language || 'pt').slice(0, 2).toLowerCase();
  setLang(saved || (LANGS.includes(navLang) ? navLang : 'pt'), false);

  /* ================= MAP ================= */
  const map = $('#map'), svg = $('svg', map);
  const W = 1600, H = 1000;
  const g = (x, y, cx, cy, sx, sy, a) => a * Math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2) / 2);
  const coastY = x => x < 820 ? 735 + 265 * Math.pow(x / 820, 1.7) + 8 * Math.sin(x / 47) : 9999;
  const isSea = (x, y) => y > coastY(x) || (x > 1590 && y > 935);
  const height = (x, y) => {
    let h = g(x, y, 1250, 250, 300, 330, 1.0) + g(x, y, 1080, -120, 640, 250, .95)
      + g(x, y, 1470, 770, 62, 82, .86) + g(x, y, 1560, 800, 58, 74, .78)
      + g(x, y, 1570, 560, 170, 210, .42) + g(x, y, 900, 430, 220, 170, .26);
    h += .035 * Math.sin(x / 61 + y / 97) + .025 * Math.sin(x / 37 - y / 53) + .02 * Math.cos(y / 29 + x / 131);
    const c = coastY(x); if (y > c - 60) h *= Math.max(0, (c - y) / 60);
    return h;
  };
  const urban = (x, y) => g(x, y, 1140, 600, 215, 255, 1) + g(x, y, 985, 790, 150, 95, .85) + g(x, y, 1330, 470, 110, 120, .5)
    + .12 * Math.sin(x / 23 + Math.cos(y / 31) * 2) + .08 * Math.sin(y / 17 - x / 41);
  const noise = (x, y) => Math.sin(x * 12.9898 + y * 78.233) * 43758.5453 % 1;

  // contour lines (marching squares)
  (function contours() {
    const step = 8, cols = Math.ceil(W / step) + 1, rows = Math.ceil(H / step) + 1;
    const f = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) f[j * cols + i] = height(i * step, j * step);
    const out = [];
    let li = 0;
    for (let lv = .09; lv < 1.3; lv += .055, li++) {
      let d = '';
      for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
        const a = f[j * cols + i], b = f[j * cols + i + 1], c = f[(j + 1) * cols + i + 1], e = f[(j + 1) * cols + i];
        const k = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (e > lv ? 1 : 0);
        if (k === 0 || k === 15) continue;
        const x = i * step, y = j * step;
        const t = (p, q) => (lv - p) / (q - p);
        const T = [x + step * t(a, b), y], R = [x + step, y + step * t(b, c)], B = [x + step * t(e, c), y + step], L = [x, y + step * t(a, e)];
        const seg = {1:[L,B],2:[B,R],3:[L,R],4:[T,R],5:[L,T,B,R],6:[T,B],7:[L,T],8:[L,T],9:[T,B],10:[L,B,T,R],11:[T,R],12:[L,R],13:[B,R],14:[L,B]}[k];
        for (let s = 0; s < seg.length; s += 2) d += `M${seg[s][0].toFixed(1)} ${seg[s][1].toFixed(1)}L${seg[s + 1][0].toFixed(1)} ${seg[s + 1][1].toFixed(1)}`;
      }
      if (d) out.push(`<path class="${li % 5 === 4 ? 'idx' : ''}" d="${d}"/>`);
    }
    $('.contours', svg).innerHTML = out.join('');
  })();

  // terrain canvases
  function paintTerrain(canvas, night) {
    const dpr = Math.min(2, devicePixelRatio || 1);
    const k = Math.max(1, Math.min(2, (map.clientWidth * dpr) / W * 1.15, (map.clientHeight * dpr) / H * 1.15));
    canvas.width = Math.round(W * k); canvas.height = Math.round(H * k);
    const ctx = canvas.getContext('2d');
    // base fields at low resolution
    const lw = 400, lh = 250, lr = document.createElement('canvas'); lr.width = lw; lr.height = lh;
    const lc = lr.getContext('2d'), img = lc.createImageData(lw, lh), px = img.data;
    const P = night ? [18,26,34] : [237,228,200], F1 = night ? [19,38,36] : [196,207,160], F2 = night ? [15,32,30] : [168,190,135], S = night ? [10,18,30] : [159,195,196];
    for (let j = 0; j < lh; j++) for (let i = 0; i < lw; i++) {
      const x = i * 4, y = j * 4, o = (j * lw + i) * 4;
      let c = P;
      if (isSea(x, y)) c = S;
      else {
        const h = height(x, y), u = urban(x, y);
        const fo = Math.min(1, Math.max(0, (h - .52) / .12)) * Math.min(1, Math.max(0, (.42 - u) / .12));
        if (fo > 0) { const deep = Math.min(1, Math.max(0, (h - .75) / .3)); const fc = F1.map((v, n) => v + (F2[n] - v) * deep); c = P.map((v, n) => v + (fc[n] - v) * fo); }
      }
      px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = 255;
    }
    lc.putImageData(img, 0, 0);
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(lr, 0, 0, W, H);
    // houses: stacked blocks aligned with the slope
    const day = [['#B65A3A', 26], ['#C77A52', 18], ['#9C928A', 16], ['#E2D5B8', 12], ['#A8492F', 10], ['#D8B07A', 8], ['#7F8C8D', 6], ['#E8C7A0', 4]];
    const pick = r => { let s = 0; for (const [c, w] of day) { s += w; if (r * 100 < s) return c; } return day[0][0]; };
    const windows = [];
    const st = 8.5;
    for (let y = 280; y < 960; y += st) for (let x = 760; x < 1480; x += st) {
      const jx = x + (noise(x, y) - .5) * 5, jy = y + (noise(y, x) - .5) * 5;
      const u = urban(jx, jy) + (noise(jx * .3, jy * .7) - .5) * .25;
      if (u < .55 || isSea(jx, jy) || height(jx, jy) > 1.02) continue;
      const gx = height(jx + 3, jy) - height(jx - 3, jy), gy = height(jx, jy + 3) - height(jx, jy - 3);
      const ang = Math.atan2(gy, gx) + Math.PI / 2;
      const w = 5 + noise(jx, jy * 2) * 5, hh = 4 + noise(jx * 2, jy) * 4;
      ctx.save(); ctx.translate(jx, jy); ctx.rotate(ang);
      ctx.fillStyle = night ? (noise(jx, jy) > .5 ? '#26303A' : '#1F2832') : pick(Math.abs(noise(jx * 1.7, jy * 1.3)));
      ctx.fillRect(-w / 2, -hh / 2, w, hh);
      if (!night && noise(jx * 3.1, jy) > .9) { ctx.fillStyle = '#2E6FB0'; ctx.fillRect(-1.6, -hh / 2 - 1, 3.2, 2.6); }
      ctx.restore();
      if (night && noise(jx * 2.3, jy * 1.9) > .42) windows.push([jx, jy]);
    }
    if (night) {
      ctx.shadowColor = 'rgba(244,190,90,.9)'; ctx.shadowBlur = 7;
      for (const [x, y] of windows) { ctx.fillStyle = noise(x, y * 3) > .8 ? '#FFE3A3' : '#F0B44C'; ctx.fillRect(x - 1, y - 1, 2.1, 2.1); }
      ctx.shadowBlur = 0;
      // street light along the Estrada
      const p = $('#p-estrada'); const L = p.getTotalLength();
      ctx.shadowColor = 'rgba(255,214,140,.9)'; ctx.shadowBlur = 10; ctx.fillStyle = '#FFE1A0';
      for (let s = 0; s < L; s += 26) { const q = p.getPointAtLength(s); ctx.beginPath(); ctx.arc(q.x, q.y, 1.6, 0, 7); ctx.fill(); }
      ctx.shadowBlur = 0;
    }
  }
  const cDay = $('canvas.day', map), cNight = $('canvas.night', map);
  let nightPainted = false;
  const paintNight = () => { if (!nightPainted) { paintTerrain(cNight, true); nightPainted = true; } };
  paintTerrain(cDay, false);
  (window.requestIdleCallback || (f => setTimeout(f, 600)))(paintNight);

  // route drawing
  const drawPaths = (root, delay = 0) => {
    const paths = $$('.draw', root);
    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      if (reduce) return;
      const mask = p.cloneNode(); mask.removeAttribute('class'); mask.removeAttribute('mask');
      mask.setAttribute('stroke', '#fff'); mask.setAttribute('fill', 'none'); mask.setAttribute('stroke-width', '16'); mask.setAttribute('stroke-linecap', 'round');
      let m = p._mask;
      if (!m) {
        const id = 'm' + Math.random().toString(36).slice(2, 8);
        m = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
        m.id = id; m.setAttribute('maskUnits', 'userSpaceOnUse'); m.setAttribute('x', -50); m.setAttribute('y', -50); m.setAttribute('width', W + 100); m.setAttribute('height', H + 100);
        $('defs', svg).appendChild(m); p.setAttribute('mask', `url(#${id})`); p._mask = m;
        const under = p.previousElementSibling; if (under && under.classList.contains('rt-under')) under.setAttribute('mask', `url(#${id})`);
      }
      m.innerHTML = ''; m.appendChild(mask);
      mask.style.strokeDasharray = len; mask.style.strokeDashoffset = len;
      mask.getBoundingClientRect();
      mask.style.transition = `stroke-dashoffset ${Math.max(.9, len / 700)}s cubic-bezier(.45,0,.2,1) ${delay + i * .55}s`;
      requestAnimationFrame(() => { mask.style.strokeDashoffset = 0; });
    });
  };
  const animateIn = () => { drawPaths($('g[data-route="dia"]', svg), .3); drawPaths($('g[data-route="tarde"]', svg), 1.6); };
  if ('IntersectionObserver' in window) {
    const mo = new IntersectionObserver(es => { if (es[0].isIntersecting) { animateIn(); mo.disconnect(); } }, { threshold: .25 });
    mo.observe(map);
  } else animateIn();

  // legend selection → highlight route, night mode for the dusk route
  const btns = $$('.lg-btn');
  let sel = null;
  const select = v => {
    sel = (sel === v) ? null : v;
    btns.forEach(b => b.setAttribute('aria-pressed', b.dataset.sel === sel));
    if (sel) map.dataset.sel = sel; else delete map.dataset.sel;
    if (sel === 'tarde') paintNight();
    hero.classList.toggle('is-night', sel === 'tarde'); document.body.classList.toggle('night', sel === 'tarde');
    $('meta[name="theme-color"]').content = sel === 'tarde' ? '#121A22' : '#EDE4C8';
    if (sel) drawPaths($(`g[data-route="${sel === 'tarde' ? 'tarde' : 'dia'}"]`, svg));
  };
  btns.forEach(b => b.addEventListener('click', () => select(b.dataset.sel)));
  $$('[data-show]').forEach(b => b.addEventListener('click', () => {
    hero.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    sel = null; setTimeout(() => select(b.dataset.show), reduce ? 0 : 450);
  }));

  // repaint on large resize (keeps the terrain sharp)
  let rT, lastW = map.clientWidth;
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { if (Math.abs(map.clientWidth - lastW) > 200) { lastW = map.clientWidth; paintTerrain(cDay, false); if (nightPainted) paintTerrain(cNight, true); } }, 300); });
})();
