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

  /* ================= i18n: PT (source) · EN · ES · FR · DA · HE ================= */
  // each entry: [en, es, fr, da, he]
  const I18N = {
    'Início':['Home','Inicio','Accueil','Forside','דף הבית'],
    'Sobre nós':['About us','Nosotros','À propos','Om os','עלינו'],
    'Avaliações':['Reviews','Opiniones','Avis','Anmeldelser','ביקורות'],
    'Contato':['Contact','Contacto','Contact','Kontakt','צור קשר'],
    'Reservar agora':['Book now','Reservar ahora','Réserver','Book nu','הזמינו עכשיו'],
    'Parque Nacional da Tijuca':['Tijuca National Park','Parque Nacional de Tijuca','Parc national de Tijuca','Tijuca Nationalpark','הפארק הלאומי טיז׳וקה'],
    'Oceano Atlântico':['Atlantic Ocean','Océano Atlántico','Océan Atlantique','Atlanterhavet','האוקיינוס האטלנטי'],
    'Passarela da Rocinha':['Rocinha Footbridge','Pasarela de Rocinha','Passerelle de Rocinha','Rocinha-gangbroen','גשר רוסיניה'],
    'Vista do alto da Rocinha':['The view from upper Rocinha','La vista desde lo alto de Rocinha','La vue depuis le haut de Rocinha','Udsigten fra toppen af Rocinha','הנוף מראש רוסיניה'],
    'Introdução':['Introduction','Introducción','Introduction','Introduktion','היכרות'],
    'Início da caminhada':['Walk begins','Empieza la caminata','Début de la balade','Gåturen starter','תחילת ההליכה'],
    'Fim na Passarela':['Ends at the Footbridge','Fin en la Pasarela','Fin à la passerelle','Slut ved gangbroen','סיום בגשר'],
    'van de Copacabana e Ipanema →':['van from Copacabana & Ipanema →','van desde Copacabana e Ipanema →','van depuis Copacabana et Ipanema →','minibus fra Copacabana og Ipanema →','← הסעה מקופקבנה ואיפנמה'],
    'saídas diárias':['daily departures','salidas diarias','départs quotidiens','daglige afgange','יציאות יומיות'],
    '3 horas com guia local':['3 hours with a local guide','3 horas con guía local','3 heures avec un guide local','3 timer med lokal guide','3 שעות עם מדריך מקומי'],
    'Encontro · Metrô São Conrado':['Meet · São Conrado Metro','Encuentro · Metro São Conrado','Rendez-vous · métro São Conrado','Mødested · São Conrado metro','מפגש · תחנת המטרו'],
    'Subida de moto':['Motorbike ride up','Subida en moto','Montée à moto','Op på motorcykel','עלייה באופנוע'],
    'Caminhada no alto':['Walk from the top','Caminata desde lo alto','Balade depuis le sommet','Gåtur fra toppen','הליכה מהפסגה'],
    'Volta ao ponto':['Back to meeting point','Regreso al punto','Retour au point de départ','Tilbage til mødestedet','חזרה לנקודת המפגש'],
    'A Rocinha a pé, com quem conhece':['Rocinha on foot, with people who know','Rocinha a pie, con quien conoce','Rocinha à pied, avec ceux qui connaissent','Rocinha til fods med folk, der kender','Rocinha ברגל, עם מי שמכיר'],
    'cada beco.':['every alley.','cada callejón.','chaque ruelle.','hver gyde.','כל סמטה.'],
    'Passeios guiados todos os dias desde 2002, com guias locais e em seis idiomas. Escolha a sua rota no mapa e reserve direto com a agência.':['Guided tours every day since 2002, with local guides, in six languages. Pick your route on the map and book direct with the agency.','Tours guiados todos los días desde 2002, con guías locales y en seis idiomas. Elige tu ruta en el mapa y reserva directo con la agencia.','Visites guidées tous les jours depuis 2002, avec des guides locaux, en six langues. Choisissez votre itinéraire sur la carte et réservez directement auprès de l’agence.','Guidede ture hver dag siden 2002 med lokale guider på seks sprog. Vælg din rute på kortet, og book direkte hos bureauet.','סיורים מודרכים בכל יום מאז 2002, עם מדריכים מקומיים ובשש שפות. בחרו מסלול במפה והזמינו ישירות מהסוכנות.'],
    'Fale no':['Chat on','Escríbenos por','Écrivez-nous sur','Skriv på','דברו איתנו ב־'],
    '4,9/5 no Tripadvisor':['4.9/5 on Tripadvisor','4,9/5 en Tripadvisor','4,9/5 sur Tripadvisor','4,9/5 på Tripadvisor','4.9/5 ב־Tripadvisor'],
    'Desde 2002':['Since 2002','Desde 2002','Depuis 2002','Siden 2002','מאז 2002'],
    '6 idiomas':['6 languages','6 idiomas','6 langues','6 sprog','6 שפות'],
    'Rotas':['Routes','Rutas','Itinéraires','Ruter','מסלולים'],
    'Toque numa rota para ver o caminho':['Tap a route to see the way','Toca una ruta para ver el camino','Touchez un itinéraire pour voir le trajet','Tryk på en rute for at se vejen','הקישו על מסלול כדי לראות את הדרך'],
    '9:30 e 13:30 · com busca no hotel':['9:30 & 13:30 · hotel pickup','9:30 y 13:30 · recogida en el hotel','9h30 et 13h30 · prise en charge à l’hôtel','9:30 og 13:30 · afhentning på hotellet','9:30 ו־13:30 · איסוף מהמלון'],
    'a partir de':['from','desde','à partir de','fra','החל מ־'],
    'A partir de':['From','Desde','À partir de','Fra','החל מ־'],
    '16:30 · moto até o alto e descida a pé':['16:30 · motorbike up, walk down','16:30 · moto hasta arriba y bajada a pie','16h30 · montée à moto, descente à pied','16:30 · op på motorcykel, ned til fods','16:30 · עלייה באופנוע וירידה ברגל'],
    'Favela Walking Tour clássico':['Classic Favela Walking Tour','Favela Walking Tour clásico','Favela Walking Tour classique','Klassisk Favela Walking Tour','Favela Walking Tour הקלאסי'],
    '9:30 e 13:30 · grupo ou privado':['9:30 & 13:30 · group or private','9:30 y 13:30 · grupo o privado','9h30 et 13h30 · en groupe ou privé','9:30 og 13:30 · gruppe eller privat','9:30 ו־13:30 · קבוצתי או פרטי'],
    'Mapa ilustrativo, fora de escala':['Illustrative map, not to scale','Mapa ilustrativo, sin escala','Carte illustrative, pas à l’échelle','Illustrativt kort, ikke målfast','מפה להמחשה, לא בקנה מידה'],
    'Valor final confirmado na reserva':['Final price confirmed at booking','Precio final confirmado en la reserva','Prix final confirmé à la réservation','Endelig pris bekræftes ved booking','המחיר הסופי יאושר בהזמנה'],
    'Escolha a sua rota.':['Choose your route.','Elige tu ruta.','Choisissez votre itinéraire.','Vælg din rute.','בחרו את המסלול שלכם.'],
    'Três jeitos de conhecer a Rocinha. Todos com guia local, todos reservados direto com a agência. Reservando direto, sem revendedor, você economiza até 25%.':['Three ways to discover Rocinha. All with a local guide, all booked direct with the agency. Book direct, skip the resellers, and save up to 25%.','Tres formas de conocer Rocinha. Todas con guía local y reservadas directo con la agencia. Reservando directo, sin revendedores, ahorras hasta un 25%.','Trois façons de découvrir Rocinha. Toutes avec un guide local, toutes réservées directement auprès de l’agence. En réservant en direct, sans revendeur, vous économisez jusqu’à 25 %.','Tre måder at opleve Rocinha på. Alle med lokal guide, alle booket direkte hos bureauet. Book direkte uden forhandler, og spar op til 25 %.','שלוש דרכים להכיר את Rocinha. כולן עם מדריך מקומי וכולן בהזמנה ישירה מהסוכנות. בהזמנה ישירה, בלי משווקים, חוסכים עד 25%.'],
    'Rota':['Route','Ruta','Itinéraire','Rute','מסלול'],
    '3h de caminhada':['3h walk','3h de caminata','3 h de balade','3 timers gåtur','3 שעות הליכה'],
    'Busca em Copacabana e Ipanema':['Pickup in Copacabana & Ipanema','Recogida en Copacabana e Ipanema','Prise en charge à Copacabana et Ipanema','Afhentning i Copacabana og Ipanema','איסוף מקופקבנה ואיפנמה'],
    'Do alto da comunidade até a Passarela, pelos becos, escadarias e lajes, com paradas para as vistas e para as fotos. Um guia local conta a história da Rocinha enquanto vocês descem.':['From the top of the community down to the Footbridge, through alleys, stairways and rooftops, with stops for the views and photos. A local guide tells Rocinha’s story as you walk down.','Desde lo alto de la comunidad hasta la Pasarela, por callejones, escaleras y azoteas, con paradas para las vistas y las fotos. Un guía local cuenta la historia de Rocinha mientras bajan.','Du haut de la communauté jusqu’à la passerelle, par les ruelles, les escaliers et les toits-terrasses, avec des arrêts pour la vue et les photos. Un guide local raconte l’histoire de Rocinha pendant la descente.','Fra toppen af kvarteret ned til gangbroen gennem gyder, trapper og tagterrasser, med stop for udsigten og fotos. En lokal guide fortæller Rocinhas historie på vejen ned.','מראש הקהילה ועד הגשר, דרך סמטאות, מדרגות וגגות, עם עצירות לנוף ולצילומים. מדריך מקומי מספר את סיפורה של Rocinha בזמן הירידה.'],
    'Saída':['Departs','Salida','Départ','Afgang','יציאה'],
    'por pessoa':['per person','por persona','par personne','pr. person','לאדם'],
    'Busca no Copacabana Palace':['Pickup at Copacabana Palace','Recogida en el Copacabana Palace','Prise en charge au Copacabana Palace','Afhentning ved Copacabana Palace','איסוף ממלון Copacabana Palace'],
    'Embarque na van.':['Board the van.','Subida a la van.','Montée dans le van.','Ombordstigning i minibussen.','עלייה להסעה.'],
    'Busca no Sol Ipanema':['Pickup at Sol Ipanema','Recogida en el Sol Ipanema','Prise en charge au Sol Ipanema','Afhentning ved Sol Ipanema','איסוף ממלון Sol Ipanema'],
    'Depois, direto para a Rocinha.':['Then straight to Rocinha.','Después, directo a Rocinha.','Puis direction Rocinha.','Derefter direkte til Rocinha.','ומשם ישר ל־Rocinha.'],
    'Introdução sobre a Rocinha':['Introduction to Rocinha','Introducción a Rocinha','Présentation de Rocinha','Introduktion til Rocinha','היכרות עם Rocinha'],
    'A história e as principais características da comunidade.':['The history and main features of the community.','La historia y las principales características de la comunidad.','L’histoire et les principales caractéristiques de la communauté.','Kvarterets historie og vigtigste kendetegn.','ההיסטוריה והמאפיינים העיקריים של הקהילה.'],
    'Começa a caminhada':['The walk begins','Empieza la caminata','Début de la balade','Gåturen begynder','ההליכה מתחילה'],
    'Pela comunidade com o guia local, com paradas para fotos.':['Through the community with your local guide, with photo stops.','Por la comunidad con el guía local, con paradas para fotos.','À travers la communauté avec le guide local, avec des arrêts photo.','Gennem kvarteret med den lokale guide, med fotostop.','דרך הקהילה עם המדריך המקומי, עם עצירות לצילום.'],
    'Fim na Passarela da Rocinha':['Ends at Rocinha Footbridge','Fin en la Pasarela de Rocinha','Fin à la passerelle de Rocinha','Slut ved Rocinha-gangbroen','סיום בגשר רוסיניה'],
    'Volta de van, com chegada prevista às 13:00 ou 17:00 ao Copacabana Palace e ao Sol Ipanema.':['Van back, arriving around 13:00 or 17:00 at Copacabana Palace and Sol Ipanema.','Regreso en van, con llegada prevista a las 13:00 o 17:00 al Copacabana Palace y al Sol Ipanema.','Retour en van, arrivée prévue vers 13h00 ou 17h00 au Copacabana Palace et au Sol Ipanema.','Retur i minibus med forventet ankomst kl. 13:00 eller 17:00 ved Copacabana Palace og Sol Ipanema.','חזרה בהסעה, הגעה משוערת ב־13:00 או ב־17:00 ל־Copacabana Palace ול־Sol Ipanema.'],
    'Guia local':['Local guide','Guía local','Guide local','Lokal guide','מדריך מקומי'],
    'Transporte de van':['Van transport','Transporte en van','Transport en van','Transport i minibus','הסעה'],
    'Taxa de entrada na comunidade':['Community entrance fee','Tasa de entrada a la comunidad','Droit d’entrée dans la communauté','Entré til kvarteret','דמי כניסה לקהילה'],
    'Dúvidas':['Questions','Dudas','Questions','Spørgsmål','שאלות'],
    'Ver no mapa':['See on map','Ver en el mapa','Voir sur la carte','Se på kortet','הצגה במפה'],
    'Moto com piloto local':['Motorbike with a local rider','Moto con piloto local','Moto avec un pilote local','Motorcykel med lokal fører','אופנוע עם נהג מקומי'],
    'Encontro em São Conrado':['Meet in São Conrado','Encuentro en São Conrado','Rendez-vous à São Conrado','Mødested i São Conrado','מפגש ב־São Conrado'],
    'A saída do fim da tarde. Você sobe de moto até o mirante da Rocinha, caminha pela comunidade com o guia e desce enquanto a luz do dia vai embora e o morro começa a acender.':['The late-afternoon departure. Ride a motorbike up to Rocinha’s viewpoint, walk the community with your guide, and head down as daylight fades and the hill starts to light up.','La salida del final de la tarde. Subes en moto hasta el mirador de Rocinha, caminas por la comunidad con el guía y bajas mientras se va la luz del día y el morro empieza a encenderse.','Le départ de fin d’après-midi. Vous montez à moto jusqu’au belvédère de Rocinha, marchez dans la communauté avec le guide et redescendez quand le jour décline et que la colline s’illumine.','Afgangen sidst på eftermiddagen. Du kører på motorcykel op til Rocinhas udsigtspunkt, går gennem kvarteret med guiden og går ned, mens dagslyset forsvinder, og bakken begynder at lyse op.','היציאה של אחר הצהריים המאוחרים. עולים באופנוע לתצפית של Rocinha, הולכים בקהילה עם המדריך ויורדים כשאור היום דועך והגבעה מתחילה להידלק.'],
    'Encontro na Estrada da Gávea, 837':['Meet at Estrada da Gávea, 837','Encuentro en Estrada da Gávea, 837','Rendez-vous Estrada da Gávea, 837','Mødested: Estrada da Gávea 837','מפגש ב־Estrada da Gávea 837'],
    'São Conrado, ao lado do Metrô São Conrado (saída C).':['São Conrado, next to São Conrado Metro (exit C).','São Conrado, junto al Metro São Conrado (salida C).','São Conrado, à côté du métro São Conrado (sortie C).','São Conrado, ved São Conrado metrostation (udgang C).','São Conrado, ליד תחנת המטרו São Conrado (יציאה C).'],
    'Subida de moto até o mirante':['Motorbike ride up to the viewpoint','Subida en moto hasta el mirador','Montée à moto jusqu’au belvédère','Op til udsigtspunktet på motorcykel','עלייה באופנוע לתצפית'],
    'Com piloto local, até o alto da Rocinha.':['With a local rider, to the top of Rocinha.','Con piloto local, hasta lo alto de Rocinha.','Avec un pilote local, jusqu’en haut de Rocinha.','Med lokal fører, helt op til toppen af Rocinha.','עם נהג מקומי, עד לראש Rocinha.'],
    'Caminhada pela Rocinha':['Walk through Rocinha','Caminata por Rocinha','Balade dans Rocinha','Gåtur gennem Rocinha','הליכה ב־Rocinha'],
    'Becos, vistas e histórias com o guia.':['Alleys, views and stories with your guide.','Callejones, vistas e historias con el guía.','Ruelles, panoramas et histoires avec le guide.','Gyder, udsigter og historier med guiden.','סמטאות, נופים וסיפורים עם המדריך.'],
    'Fim no ponto de encontro':['Ends at the meeting point','Fin en el punto de encuentro','Fin au point de rendez-vous','Slut ved mødestedet','סיום בנקודת המפגש'],
    'Volta ao Metrô São Conrado.':['Back to São Conrado Metro.','Regreso al Metro São Conrado.','Retour au métro São Conrado.','Tilbage til São Conrado metrostation.','חזרה למטרו São Conrado.'],
    'Caminhada com guia':['Guided walk','Caminata con guía','Balade guidée','Guidet gåtur','הליכה מודרכת'],
    'Por causa da moto, este passeio não é recomendado para crianças nem para idosos com dificuldade de locomoção. Para eles, a caminhada das 9:30 ou 13:30 é a melhor escolha.':['Because of the motorbike ride, this tour is not recommended for children or for older visitors with limited mobility. For them, the 9:30 or 13:30 walk is the best choice.','Por la moto, este tour no se recomienda para niños ni para personas mayores con dificultades de movilidad. Para ellos, la caminata de las 9:30 o 13:30 es la mejor opción.','À cause de la moto, cette visite est déconseillée aux enfants et aux personnes âgées à mobilité réduite. Pour eux, la balade de 9h30 ou 13h30 est le meilleur choix.','På grund af motorcykelturen anbefales denne tur ikke til børn eller ældre med nedsat mobilitet. For dem er gåturen kl. 9:30 eller 13:30 det bedste valg.','בגלל הנסיעה באופנוע, הסיור הזה לא מומלץ לילדים ולמבוגרים עם מגבלות ניידות. עבורם, ההליכה של 9:30 או 13:30 היא הבחירה הטובה ביותר.'],
    'Caminhada imersiva':['Immersive walk','Caminata inmersiva','Balade immersive','Medrivende gåtur','הליכה חווייתית'],
    'Guias credenciados':['Licensed guides','Guías acreditados','Guides agréés','Autoriserede guider','מדריכים מוסמכים'],
    'A caminhada clássica, que rendeu à agência o título de melhor favela tour do Rio no Tripadvisor. São três horas a pé pela Rocinha no seu idioma. Para um grupo só seu, outro horário ou uma necessidade de acessibilidade, combine antes pelo WhatsApp.':['The classic walk that earned the agency the title of Rio’s best favela tour on Tripadvisor. Three hours on foot through Rocinha, in your language. For a private group, another time or an accessibility need, arrange it first on WhatsApp.','La caminata clásica que le dio a la agencia el título de mejor favela tour de Río en Tripadvisor. Tres horas a pie por Rocinha, en tu idioma. Para un grupo privado, otro horario o una necesidad de accesibilidad, coordínalo antes por WhatsApp.','La balade classique qui a valu à l’agence le titre de meilleur favela tour de Rio sur Tripadvisor. Trois heures à pied dans Rocinha, dans votre langue. Pour un groupe privé, un autre horaire ou un besoin d’accessibilité, organisez-le d’abord sur WhatsApp.','Den klassiske gåtur, der gav bureauet titlen som Rios bedste favela-tur på Tripadvisor. Tre timer til fods gennem Rocinha på dit eget sprog. Ønsker du en privat gruppe, et andet tidspunkt eller har du behov for tilgængelighed, så aftal det først på WhatsApp.','ההליכה הקלאסית שזיכתה את הסוכנות בתואר סיור הפבלה הטוב ביותר בריו ב־Tripadvisor. שלוש שעות ברגל ב־Rocinha, בשפה שלכם. לקבוצה פרטית, לשעה אחרת או לצורכי נגישות, תאמו מראש ב־WhatsApp.'],
    'por pessoa · todos os dias':['per person · every day','por persona · todos los días','par personne · tous les jours','pr. person · hver dag','לאדם · בכל יום'],
    'Guias em':['Guides in','Guías en','Guides en','Guider på','מדריכים ב־'],
    'Guia local bilíngue':['Bilingual local guide','Guía local bilingüe','Guide local bilingue','Tosproget lokal guide','מדריך מקומי דו־לשוני'],
    'Opção privada (Favela Tour Premium)':['Private option (Favela Tour Premium)','Opción privada (Favela Tour Premium)','Option privée (Favela Tour Premium)','Privat mulighed (Favela Tour Premium)','אפשרות פרטית (Favela Tour Premium)'],
    '10% de desconto para estudantes':['10% student discount','10% de descuento para estudiantes','10 % de réduction pour les étudiants','10 % studierabat','10% הנחה לסטודנטים'],
    'Personalizar':['Customize','Personalizar','Personnaliser','Tilpas','התאמה אישית'],
    'Outras saídas':['More experiences','Más experiencias','Autres expériences','Flere oplevelser','חוויות נוספות'],
    'Favela Walking Tour com filmagem de drone':['Favela Walking Tour with drone footage','Favela Walking Tour con filmación con dron','Favela Walking Tour avec vidéo par drone','Favela Walking Tour med droneoptagelser','Favela Walking Tour עם צילומי רחפן'],
    '11:30 · vídeo aéreo profissional':['11:30 · professional aerial video','11:30 · video aéreo profesional','11h30 · vidéo aérienne professionnelle','11:30 · professionel luftvideo','11:30 · וידאו אווירי מקצועי'],
    'Floresta da Tijuca, tour privado':['Tijuca Rainforest, private tour','Bosque de Tijuca, tour privado','Forêt de Tijuca, visite privée','Tijuca-regnskoven, privat tur','יער טיז׳וקה, סיור פרטי'],
    'Futebol no Maracanã':['Football at Maracanã','Fútbol en el Maracanã','Football au Maracanã','Fodbold på Maracanã','כדורגל באצטדיון Maracanã'],
    '4h · dia de jogo':['4h · match day','4h · día de partido','4 h · jour de match','4 t · kampdag','4 שעות · יום משחק'],
    'Voo de asa-delta':['Hang gliding flight','Vuelo en ala delta','Vol en deltaplane','Drageflyvning','טיסת גלשן תלייה'],
    'Com mais de 40 anos de experiência':['Over 40 years of experience','Con más de 40 años de experiencia','Plus de 40 ans d’expérience','Over 40 års erfaring','יותר מ־40 שנות ניסיון'],
    'Turismo que fica na comunidade.':['Tourism that stays in the community.','Turismo que se queda en la comunidad.','Un tourisme qui reste dans la communauté.','Turisme, der bliver i lokalsamfundet.','תיירות שנשארת בקהילה.'],
    'Desde 2002 a gente leva visitantes pela Rocinha, e já foram mais de um milhão. A favela é a casa de muita gente, e o passeio é feito com esse respeito do começo ao fim.':['Since 2002 we have walked more than a million visitors through Rocinha. The favela is home to many people, and every tour treats it with that respect from start to finish.','Desde 2002 llevamos visitantes por Rocinha, y ya son más de un millón. La favela es el hogar de mucha gente, y el tour se hace con ese respeto de principio a fin.','Depuis 2002, nous avons fait découvrir Rocinha à plus d’un million de visiteurs. La favela est le foyer de beaucoup de gens, et chaque visite se fait avec ce respect du début à la fin.','Siden 2002 har vi vist over en million besøgende rundt i Rocinha. Favelaen er hjem for mange mennesker, og hver tur foregår med den respekt fra start til slut.','מאז 2002 הדרכנו ב־Rocinha יותר ממיליון מבקרים. הפבלה היא הבית של אנשים רבים, וכל סיור נעשה מתוך כבוד, מההתחלה ועד הסוף.'],
    'Turismo sustentável e comunitário':['Sustainable, community tourism','Turismo sostenible y comunitario','Tourisme durable et communautaire','Bæredygtig turisme i lokalsamfundet','תיירות קהילתית ובת־קיימא'],
    'Parte do que você paga fica na economia local e no projeto social da agência. Reservando direto, sem revendedor, o apoio chega inteiro.':['Part of what you pay stays in the local economy and the agency’s social project. Book direct, with no reseller, and all of that support arrives.','Parte de lo que pagas se queda en la economía local y en el proyecto social de la agencia. Reservando directo, sin revendedor, el apoyo llega completo.','Une partie de ce que vous payez reste dans l’économie locale et le projet social de l’agence. En réservant en direct, sans revendeur, tout le soutien arrive.','En del af det, du betaler, bliver i den lokale økonomi og i bureauets sociale projekt. Booker du direkte uden forhandler, går hele støtten frem.','חלק ממה שאתם משלמים נשאר בכלכלה המקומית ובפרויקט החברתי של הסוכנות. בהזמנה ישירה, בלי משווקים, כל התמיכה מגיעה ליעדה.'],
    'Guias locais credenciados e bilíngues':['Licensed, bilingual local guides','Guías locales acreditados y bilingües','Guides locaux agréés et bilingues','Autoriserede, tosprogede lokale guider','מדריכים מקומיים מוסמכים ודו־לשוניים'],
    'Agência com registro no Cadastur, o cadastro do Ministério do Turismo. Os guias falam português, inglês, espanhol, francês, dinamarquês e hebraico.':['An agency registered with Cadastur, Brazil’s Ministry of Tourism registry. Guides speak Portuguese, English, Spanish, French, Danish and Hebrew.','Agencia registrada en Cadastur, el registro del Ministerio de Turismo de Brasil. Los guías hablan portugués, inglés, español, francés, danés y hebreo.','Agence enregistrée au Cadastur, le registre du ministère brésilien du Tourisme. Les guides parlent portugais, anglais, espagnol, français, danois et hébreu.','Bureauet er registreret i Cadastur, det brasilianske turistministeriums register. Guiderne taler portugisisk, engelsk, spansk, fransk, dansk og hebraisk.','סוכנות רשומה ב־Cadastur, המרשם של משרד התיירות של ברזיל. המדריכים דוברים פורטוגזית, אנגלית, ספרדית, צרפתית, דנית ועברית.'],
    'Segurança e respeito':['Safety and respect','Seguridad y respeto','Sécurité et respect','Sikkerhed og respekt','ביטחון וכבוד'],
    'Andar com um guia local experiente é a forma recomendada de visitar uma favela. Você conhece a Rocinha como visitante convidado, não como espectador.':['Walking with an experienced local guide is the recommended way to visit a favela. You see Rocinha as an invited guest, not as a spectator.','Caminar con un guía local con experiencia es la forma recomendada de visitar una favela. Conoces Rocinha como invitado, no como espectador.','Marcher avec un guide local expérimenté est la façon recommandée de visiter une favela. Vous découvrez Rocinha en invité, pas en spectateur.','At gå med en erfaren lokal guide er den anbefalede måde at besøge en favela på. Du oplever Rocinha som inviteret gæst, ikke som tilskuer.','הליכה עם מדריך מקומי מנוסה היא הדרך המומלצת לבקר בפבלה. אתם מכירים את Rocinha כאורחים מוזמנים, לא כצופים מהצד.'],
    'Antes de subir':['Before you go up','Antes de subir','Avant de monter','Før du går op','לפני שעולים'],
    'Tênis confortável.':['Comfortable shoes.','Calzado cómodo.','Chaussures confortables.','Behagelige sko.','נעליים נוחות.'],
    'O caminho tem degraus irregulares e becos estreitos.':['The route has uneven steps and narrow alleys.','El camino tiene escalones irregulares y callejones estrechos.','Le parcours comporte des marches irrégulières et des ruelles étroites.','Ruten har ujævne trin og smalle gyder.','בדרך יש מדרגות לא אחידות וסמטאות צרות.'],
    'Peça antes de fotografar.':['Ask before taking photos.','Pide permiso antes de fotografiar.','Demandez avant de photographier.','Spørg, før du fotograferer.','בקשו רשות לפני שמצלמים.'],
    'Não fotografe moradores sem permissão.':['Don’t photograph residents without permission.','No fotografíes a los vecinos sin permiso.','Ne photographiez pas les habitants sans leur accord.','Fotografér ikke beboerne uden tilladelse.','אל תצלמו תושבים ללא רשות.'],
    'Famílias são bem-vindas.':['Families are welcome.','Las familias son bienvenidas.','Les familles sont les bienvenues.','Familier er velkomne.','משפחות מוזמנות.'],
    'Só mantenha as crianças sempre por perto.':['Just keep children close at all times.','Solo mantén a los niños siempre cerca.','Gardez simplement les enfants près de vous.','Hold blot børnene tæt på hele tiden.','רק שמרו על הילדים קרוב אליכם.'],
    'Siga o guia.':['Follow your guide.','Sigue al guía.','Suivez le guide.','Følg guiden.','הישארו עם המדריך.'],
    'Ele conhece o caminho e as pessoas.':['They know the way and the people.','Conoce el camino y a la gente.','Il connaît le chemin et les gens.','Guiden kender vejen og folkene.','המדריך מכיר את הדרך ואת האנשים.'],
    'Mais de 10 mil crianças no projeto social':['More than 10,000 children in the social project','Más de 10 mil niños en el proyecto social','Plus de 10 000 enfants dans le projet social','Over 10.000 børn i det sociale projekt','יותר מ־10,000 ילדים בפרויקט החברתי'],
    'Há mais de dez anos o projeto leva educação pelo esporte a crianças da região. Com uma assinatura a partir de US$ 1 por mês, você ajuda com educação, saúde e oportunidades para as famílias.':['For more than ten years the project has brought education through sport to children in the area. From US$ 1 a month, your subscription helps with education, healthcare and opportunities for families.','Desde hace más de diez años el proyecto lleva educación a través del deporte a niños de la región. Con una suscripción desde US$ 1 al mes, ayudas con educación, salud y oportunidades para las familias.','Depuis plus de dix ans, le projet apporte l’éducation par le sport aux enfants de la région. Avec un abonnement dès 1 US$ par mois, vous aidez l’éducation, la santé et les opportunités des familles.','I mere end ti år har projektet givet børn i området uddannelse gennem sport. Med et abonnement fra 1 US$ om måneden støtter du uddannelse, sundhed og muligheder for familierne.','כבר יותר מעשר שנים הפרויקט מביא חינוך דרך ספורט לילדי האזור. במנוי החל מ־1 דולר לחודש, אתם עוזרים בחינוך, בבריאות ובהזדמנויות למשפחות.'],
    'Doar ou assinar':['Donate or subscribe','Donar o suscribirse','Faire un don ou s’abonner','Donér eller abonnér','תרומה או מנוי'],
    'O que dizem depois da caminhada.':['What people say after the walk.','Lo que dicen después de la caminata.','Ce qu’ils disent après la balade.','Det siger de efter gåturen.','מה אומרים אחרי ההליכה.'],
    'Avaliações de quem já fez o passeio, publicadas no Tripadvisor e no GetYourGuide. Os trechos estão no idioma original.':['Reviews from people who took the tour, posted on Tripadvisor and GetYourGuide. Quotes are in their original language.','Opiniones de quienes ya hicieron el tour, publicadas en Tripadvisor y GetYourGuide. Las citas están en su idioma original.','Avis de personnes ayant fait la visite, publiés sur Tripadvisor et GetYourGuide. Les extraits sont dans leur langue d’origine.','Anmeldelser fra gæster, der har taget turen, offentliggjort på Tripadvisor og GetYourGuide. Citaterne er på originalsproget.','ביקורות של מי שכבר השתתף בסיור, שפורסמו ב־Tripadvisor וב־GetYourGuide. הציטוטים מובאים בשפת המקור.'],
    '4,9 de 5':['4.9 out of 5','4,9 de 5','4,9 sur 5','4,9 ud af 5','4.9 מתוך 5'],
    '4,9':['4.9','4,9','4,9','4,9','4.9'],
    'Tripadvisor e GetYourGuide':['Tripadvisor & GetYourGuide','Tripadvisor y GetYourGuide','Tripadvisor et GetYourGuide','Tripadvisor og GetYourGuide','Tripadvisor ו־GetYourGuide'],
    'No Tripadvisor desde 2002':['On Tripadvisor since 2002','En Tripadvisor desde 2002','Sur Tripadvisor depuis 2002','På Tripadvisor siden 2002','ב־Tripadvisor מאז 2002'],
    '+5.000 avaliações':['5,000+ reviews','+5.000 opiniones','+5 000 avis','+5.000 anmeldelser','+5,000 ביקורות'],
    'Visitante, sobre o guia Roberto · GetYourGuide':['Visitor, about guide Roberto · GetYourGuide','Visitante, sobre el guía Roberto · GetYourGuide','Visiteur, à propos du guide Roberto · GetYourGuide','Gæst om guiden Roberto · GetYourGuide','מבקר, על המדריך Roberto · GetYourGuide'],
    'Visitante, sobre o guia Bruno · GetYourGuide':['Visitor, about guide Bruno · GetYourGuide','Visitante, sobre el guía Bruno · GetYourGuide','Visiteur, à propos du guide Bruno · GetYourGuide','Gæst om guiden Bruno · GetYourGuide','מבקר, על המדריך Bruno · GetYourGuide'],
    'Visitante · GetYourGuide':['Visitor · GetYourGuide','Visitante · GetYourGuide','Visiteur · GetYourGuide','Gæst · GetYourGuide','מבקר · GetYourGuide'],
    'Visitante, sobre o guia Kim · Tripadvisor':['Visitor, about guide Kim · Tripadvisor','Visitante, sobre el guía Kim · Tripadvisor','Visiteur, à propos du guide Kim · Tripadvisor','Gæst om guiden Kim · Tripadvisor','מבקר, על המדריך Kim · Tripadvisor'],
    'Reservar o meu passeio':['Book my tour','Reservar mi tour','Réserver ma visite','Book min tur','הזמנת הסיור שלי'],
    'Saídas todos os dias às 9:30, 13:30 e 16:30.':['Departures every day at 9:30, 13:30 and 16:30.','Salidas todos los días a las 9:30, 13:30 y 16:30.','Départs tous les jours à 9h30, 13h30 et 16h30.','Afgange hver dag kl. 9:30, 13:30 og 16:30.','יציאות בכל יום ב־9:30, 13:30 ו־16:30.'],
    'Do morro para o seu feed.':['From the hill to your feed.','Del morro a tu feed.','De la colline à votre fil.','Fra bakken til dit feed.','מהגבעה לפיד שלכם.'],
    'Fotos dos passeios. Tem mais todo dia no Instagram, e você pode marcar a gente nas suas.':['Photos from our tours. There are more every day on Instagram, and you can tag us in yours.','Fotos de los tours. Hay más todos los días en Instagram, y puedes etiquetarnos en las tuyas.','Photos de nos visites. Il y en a de nouvelles chaque jour sur Instagram, et vous pouvez nous identifier dans les vôtres.','Billeder fra vores ture. Der kommer flere hver dag på Instagram, og du kan tagge os i dine.','תמונות מהסיורים. בכל יום יש עוד באינסטגרם, ואתם מוזמנים לתייג אותנו בשלכם.'],
    'Seguir no Instagram':['Follow on Instagram','Seguir en Instagram','Suivre sur Instagram','Følg på Instagram','עקבו באינסטגרם'],
    'Tudo à mão.':['Everything at hand.','Todo a mano.','Tout sous la main.','Alt lige ved hånden.','הכול בהישג יד.'],
    'Reserva, dúvida rápida, ponto de encontro. O WhatsApp responde em português, inglês e espanhol.':['Bookings, quick questions, meeting point. WhatsApp replies in Portuguese, English and Spanish.','Reservas, dudas rápidas, punto de encuentro. El WhatsApp responde en portugués, inglés y español.','Réservation, question rapide, point de rendez-vous. Le WhatsApp répond en portugais, anglais et espagnol.','Booking, hurtige spørgsmål, mødested. På WhatsApp svarer vi på portugisisk, engelsk og spansk.','הזמנות, שאלות מהירות, נקודת מפגש. ב־WhatsApp עונים בפורטוגזית, באנגלית ובספרדית.'],
    'Reservas e dúvidas no WhatsApp':['Bookings and questions on WhatsApp','Reservas y dudas por WhatsApp','Réservations et questions sur WhatsApp','Booking og spørgsmål på WhatsApp','הזמנות ושאלות ב־WhatsApp'],
    'Ver datas e reservar online':['See dates and book online','Ver fechas y reservar online','Voir les dates et réserver en ligne','Se datoer og book online','צפייה בתאריכים והזמנה אונליין'],
    'Agenda oficial com todos os passeios':['Official calendar with every tour','Agenda oficial con todos los tours','Calendrier officiel de toutes les visites','Officiel kalender med alle ture','לוח הזמנים הרשמי של כל הסיורים'],
    'Ponto de encontro no mapa':['Meeting point on the map','Punto de encuentro en el mapa','Point de rendez-vous sur la carte','Mødested på kortet','נקודת המפגש במפה'],
    'Apoie o projeto social com as crianças':['Support the children’s social project','Apoya el proyecto social con los niños','Soutenez le projet social pour les enfants','Støt det sociale projekt for børnene','תמכו בפרויקט החברתי לילדים'],
    'Favela Talks no YouTube':['Favela Talks on YouTube','Favela Talks en YouTube','Favela Talks sur YouTube','Favela Talks på YouTube','Favela Talks ביוטיוב'],
    'Conversas gravadas na Rocinha':['Conversations recorded in Rocinha','Conversaciones grabadas en Rocinha','Conversations enregistrées à Rocinha','Samtaler optaget i Rocinha','שיחות שצולמו ב־Rocinha'],
    'Todos os links':['All links','Todos los enlaces','Tous les liens','Alle links','כל הקישורים'],
    'Código de desconto':['Discount code','Código de descuento','Code de réduction','Rabatkode','קוד הנחה'],
    'Use na reserva online. Estudantes têm 10% de desconto.':['Use it when booking online. Students get 10% off.','Úsalo en la reserva online. Los estudiantes tienen 10% de descuento.','À utiliser lors de la réservation en ligne. Les étudiants ont 10 % de réduction.','Brug den, når du booker online. Studerende får 10 % rabat.','השתמשו בו בהזמנה אונליין. סטודנטים מקבלים 10% הנחה.'],
    'Copiar':['Copy','Copiar','Copier','Kopiér','העתקה'],
    'Copiado':['Copied','Copiado','Copié','Kopieret','הועתק'],
    'Onde a gente se encontra':['Where we meet','Dónde nos encontramos','Où se retrouver','Hvor vi mødes','איפה נפגשים'],
    'Busca no Copacabana Palace e no Sol Ipanema.':['Pickup at Copacabana Palace and Sol Ipanema.','Recogida en el Copacabana Palace y en el Sol Ipanema.','Prise en charge au Copacabana Palace et au Sol Ipanema.','Afhentning ved Copacabana Palace og Sol Ipanema.','איסוף מ־Copacabana Palace ומ־Sol Ipanema.'],
    'Estrada da Gávea, 837, São Conrado, na saída C do Metrô São Conrado.':['Estrada da Gávea, 837, São Conrado, at exit C of São Conrado Metro.','Estrada da Gávea, 837, São Conrado, en la salida C del Metro São Conrado.','Estrada da Gávea, 837, São Conrado, à la sortie C du métro São Conrado.','Estrada da Gávea 837, São Conrado, ved udgang C fra São Conrado metrostation.','Estrada da Gávea 837, São Conrado, ביציאה C של מטרו São Conrado.'],
    'Passeios guiados pela Rocinha, no Rio de Janeiro, desde 2002. Mais de 20 anos de experiência e mais de 1 milhão de visitantes.':['Guided tours of Rocinha, Rio de Janeiro, since 2002. More than 20 years of experience and over 1 million visitors.','Tours guiados por Rocinha, en Río de Janeiro, desde 2002. Más de 20 años de experiencia y más de 1 millón de visitantes.','Visites guidées de Rocinha, à Rio de Janeiro, depuis 2002. Plus de 20 ans d’expérience et plus d’un million de visiteurs.','Guidede ture i Rocinha, Rio de Janeiro, siden 2002. Over 20 års erfaring og mere end 1 million besøgende.','סיורים מודרכים ב־Rocinha שבריו דה ז׳נרו מאז 2002. יותר מ־20 שנות ניסיון ויותר ממיליון מבקרים.'],
    'Passeios':['Tours','Tours','Visites','Ture','סיורים'],
    'Tours':['Tours','Tours','Visites','Ture','סיורים'],
    'Agenda e reservas':['Calendar & booking','Agenda y reservas','Calendrier et réservations','Kalender og booking','לוח זמנים והזמנות'],
    'A agência':['The agency','La agencia','L’agence','Bureauet','הסוכנות'],
    'Projeto social':['Social project','Proyecto social','Projet social','Socialt projekt','פרויקט חברתי'],
    'Site oficial':['Official website','Sitio oficial','Site officiel','Officiel hjemmeside','האתר הרשמי'],
    'Preços “a partir de” por pessoa. Valor final, disponibilidade e condições confirmados na reserva.':['Prices are “from” per person. Final price, availability and terms confirmed at booking.','Precios “desde” por persona. Precio final, disponibilidad y condiciones confirmados en la reserva.','Prix « à partir de » par personne. Prix final, disponibilité et conditions confirmés à la réservation.','Priser er “fra” pr. person. Endelig pris, ledighed og vilkår bekræftes ved booking.','המחירים הם ״החל מ־״ לאדם. המחיר הסופי, הזמינות והתנאים יאושרו בהזמנה.'],
    'Favela Walking Tour, início':['Favela Walking Tour, home','Favela Walking Tour, inicio','Favela Walking Tour, accueil','Favela Walking Tour, forside','Favela Walking Tour, דף הבית'],
    'Principal':['Main','Principal','Principal','Hovedmenu','ראשי'],
    'Abrir menu':['Open menu','Abrir menú','Ouvrir le menu','Åbn menu','פתיחת התפריט'],
    'Fechar menu':['Close menu','Cerrar menú','Fermer le menu','Luk menu','סגירת התפריט'],
    'Idioma':['Language','Idioma','Langue','Sprog','שפה'],
    'Mapa ilustrativo da Rocinha com as rotas dos passeios: a caminhada diurna da parte alta até a Passarela, e a rota de fim de tarde que sobe de moto a partir do Metrô São Conrado e desce a pé.':['Illustrative map of Rocinha with the tour routes: the daytime walk from the upper part down to the Footbridge, and the late-afternoon route that rides up by motorbike from São Conrado Metro and walks back down.','Mapa ilustrativo de Rocinha con las rutas de los tours: la caminata diurna desde la parte alta hasta la Pasarela, y la ruta del final de la tarde que sube en moto desde el Metro São Conrado y baja a pie.','Carte illustrative de Rocinha avec les itinéraires : la balade de jour du haut jusqu’à la passerelle, et l’itinéraire de fin d’après-midi qui monte à moto depuis le métro São Conrado et redescend à pied.','Illustrativt kort over Rocinha med turenes ruter: dagsturen fra toppen ned til gangbroen og eftermiddagsruten, der kører op på motorcykel fra São Conrado metrostation og går ned igen.','מפה להמחשה של Rocinha עם מסלולי הסיורים: הליכת היום מהחלק העליון ועד הגשר, ומסלול אחר הצהריים שעולה באופנוע ממטרו São Conrado ויורד ברגל.'],
    'Reservar Rocinha Walking Tour, a partir de 230 reais':['Book Rocinha Walking Tour, from 230 reais','Reservar Rocinha Walking Tour, desde 230 reales','Réserver Rocinha Walking Tour, à partir de 230 reais','Book Rocinha Walking Tour, fra 230 reais','הזמנת Rocinha Walking Tour, החל מ־230 ריאל'],
    'Reservar Favela Night Tour Experience, a partir de 175 reais':['Book Favela Night Tour Experience, from 175 reais','Reservar Favela Night Tour Experience, desde 175 reales','Réserver Favela Night Tour Experience, à partir de 175 reais','Book Favela Night Tour Experience, fra 175 reais','הזמנת Favela Night Tour Experience, החל מ־175 ריאל'],
    'Reservar Favela Walking Tour clássico, a partir de 230 reais':['Book classic Favela Walking Tour, from 230 reais','Reservar Favela Walking Tour clásico, desde 230 reales','Réserver le Favela Walking Tour classique, à partir de 230 reais','Book klassisk Favela Walking Tour, fra 230 reais','הזמנת Favela Walking Tour הקלאסי, החל מ־230 ריאל'],
    'Guia do Favela Walking Tour com um visitante no mirante, com a Rocinha e o mar ao fundo':['Favela Walking Tour guide with a visitor at the viewpoint, Rocinha and the sea behind','Guía de Favela Walking Tour con un visitante en el mirador, con Rocinha y el mar al fondo','Guide de Favela Walking Tour avec un visiteur au belvédère, Rocinha et la mer en arrière-plan','Guide fra Favela Walking Tour med en gæst ved udsigtspunktet, med Rocinha og havet i baggrunden','מדריך של Favela Walking Tour עם מבקר בתצפית, ברקע Rocinha והים'],
    'Visitantes no alto da Rocinha olhando a comunidade, com a Pedra da Gávea ao fundo':['Visitors at the top of Rocinha looking over the community, Pedra da Gávea behind','Visitantes en lo alto de Rocinha mirando la comunidad, con la Pedra da Gávea al fondo','Visiteurs en haut de Rocinha regardant la communauté, la Pedra da Gávea en arrière-plan','Besøgende på toppen af Rocinha, der ser ud over kvarteret, med Pedra da Gávea i baggrunden','מבקרים בראש Rocinha משקיפים על הקהילה, ברקע Pedra da Gávea'],
    'Casas coloridas empilhadas na encosta da Rocinha, com a Pedra da Gávea ao fundo':['Colourful houses stacked on Rocinha’s hillside, Pedra da Gávea behind','Casas de colores apiladas en la ladera de Rocinha, con la Pedra da Gávea al fondo','Maisons colorées empilées sur la colline de Rocinha, la Pedra da Gávea en arrière-plan','Farverige huse stablet på Rocinhas skråning med Pedra da Gávea i baggrunden','בתים צבעוניים בערימה על מדרון Rocinha, ברקע Pedra da Gávea'],
    'Crianças do projeto social com uniforme da seleção posando num campo de grama':['Children from the social project in Brazil kits posing on a grass field','Niños del proyecto social con la camiseta de Brasil posando en un campo de césped','Enfants du projet social en maillot du Brésil posant sur un terrain en herbe','Børn fra det sociale projekt i brasilianske landsholdstrøjer på en græsplæne','ילדי הפרויקט החברתי בתלבושת נבחרת ברזיל מצטלמים על מגרש דשא'],
    'Selfie de um visitante com o guia Roberto num mirante da Rocinha':['A visitor’s selfie with guide Roberto at a Rocinha viewpoint','Selfie de un visitante con el guía Roberto en un mirador de Rocinha','Selfie d’un visiteur avec le guide Roberto à un belvédère de Rocinha','Selfie af en gæst med guiden Roberto ved et udsigtspunkt i Rocinha','סלפי של מבקר עם המדריך Roberto בתצפית ב־Rocinha'],
    '5 estrelas':['5 stars','5 estrellas','5 étoiles','5 stjerner','5 כוכבים'],
    'Guia explicando algo a uma visitante numa rua da Rocinha':['Guide explaining something to a visitor on a Rocinha street','Guía explicando algo a una visitante en una calle de Rocinha','Guide expliquant quelque chose à une visiteuse dans une rue de Rocinha','Guide forklarer noget for en gæst på en gade i Rocinha','מדריך מסביר משהו למבקרת ברחוב ב־Rocinha'],
    'Guia apontando para a Rocinha, com o mar e o Dois Irmãos ao fundo':['Guide pointing at Rocinha, with the sea and Dois Irmãos behind','Guía señalando Rocinha, con el mar y el Dois Irmãos al fondo','Guide montrant Rocinha, avec la mer et le Dois Irmãos en arrière-plan','Guide peger på Rocinha med havet og Dois Irmãos i baggrunden','מדריך מצביע על Rocinha, ברקע הים ו־Dois Irmãos'],
    'Selfie de visitante com o guia num mirante':['Visitor selfie with the guide at a viewpoint','Selfie de un visitante con el guía en un mirador','Selfie d’un visiteur avec le guide à un belvédère','Selfie af en gæst med guiden ved et udsigtspunkt','סלפי של מבקר עם המדריך בתצפית'],
    'Casas coloridas empilhadas na encosta da Rocinha':['Colourful houses stacked on Rocinha’s hillside','Casas de colores apiladas en la ladera de Rocinha','Maisons colorées empilées sur la colline de Rocinha','Farverige huse stablet på Rocinhas skråning','בתים צבעוניים בערימה על מדרון Rocinha'],
    'Casal de visitantes numa laje, com a bandeira do Brasil e a Pedra da Gávea ao fundo':['A couple of visitors on a rooftop, with the Brazilian flag and Pedra da Gávea behind','Pareja de visitantes en una azotea, con la bandera de Brasil y la Pedra da Gávea al fondo','Couple de visiteurs sur un toit-terrasse, avec le drapeau du Brésil et la Pedra da Gávea en arrière-plan','Et par på en tagterrasse med det brasilianske flag og Pedra da Gávea i baggrunden','זוג מבקרים על גג, ברקע דגל ברזיל ו־Pedra da Gávea'],
    'Guia conversando com uma visitante':['Guide talking with a visitor','Guía conversando con una visitante','Guide discutant avec une visiteuse','Guide taler med en gæst','מדריך משוחח עם מבקרת'],
    'Visitantes no alto do morro olhando a vista':['Visitors at the top of the hill taking in the view','Visitantes en lo alto del morro mirando la vista','Visiteurs en haut de la colline admirant la vue','Besøgende på toppen af bakken, der nyder udsigten','מבקרים בראש הגבעה מביטים בנוף'],
    'Crianças do projeto social de futebol':['Children from the football social project','Niños del proyecto social de fútbol','Enfants du projet social de football','Børn fra det sociale fodboldprojekt','ילדי הפרויקט החברתי לכדורגל'],
    'Grupo descendo uma escadaria com o guia':['A group walking down a stairway with the guide','Grupo bajando una escalera con el guía','Groupe descendant un escalier avec le guide','En gruppe går ned ad en trappe med guiden','קבוצה יורדת במדרגות עם המדריך'],
    'Falar no WhatsApp':['Chat on WhatsApp','Escribir por WhatsApp','Écrire sur WhatsApp','Skriv på WhatsApp','שיחה ב־WhatsApp'],
    'Olá! Quero reservar um passeio com o Favela Walking Tour.':['Hi! I’d like to book a tour with Favela Walking Tour.','¡Hola! Quiero reservar un tour con Favela Walking Tour.','Bonjour ! Je voudrais réserver une visite avec Favela Walking Tour.','Hej! Jeg vil gerne booke en tur med Favela Walking Tour.','שלום! אני רוצה להזמין סיור עם Favela Walking Tour.'],
    'Olá! Tenho uma dúvida sobre o Rocinha Favela Walking Tour (3h).':['Hi! I have a question about the Rocinha Favela Walking Tour (3h).','¡Hola! Tengo una duda sobre el Rocinha Favela Walking Tour (3h).','Bonjour ! J’ai une question sur le Rocinha Favela Walking Tour (3 h).','Hej! Jeg har et spørgsmål om Rocinha Favela Walking Tour (3 t).','שלום! יש לי שאלה על Rocinha Favela Walking Tour (3 שעות).'],
    'Olá! Tenho uma dúvida sobre o Favela Night Tour Experience (16:30).':['Hi! I have a question about the Favela Night Tour Experience (16:30).','¡Hola! Tengo una duda sobre el Favela Night Tour Experience (16:30).','Bonjour ! J’ai une question sur le Favela Night Tour Experience (16h30).','Hej! Jeg har et spørgsmål om Favela Night Tour Experience (16:30).','שלום! יש לי שאלה על Favela Night Tour Experience (16:30).'],
    'Olá! Quero personalizar um Favela Walking Tour (grupo privado / idioma / horário).':['Hi! I’d like to customize a Favela Walking Tour (private group / language / time).','¡Hola! Quiero personalizar un Favela Walking Tour (grupo privado / idioma / horario).','Bonjour ! Je voudrais personnaliser un Favela Walking Tour (groupe privé / langue / horaire).','Hej! Jeg vil gerne tilpasse en Favela Walking Tour (privat gruppe / sprog / tidspunkt).','שלום! אני רוצה להתאים אישית Favela Walking Tour (קבוצה פרטית / שפה / שעה).'],
    'Favela Walking Tour · Rocinha, Rio de Janeiro':['Favela Walking Tour · Rocinha, Rio de Janeiro','Favela Walking Tour · Rocinha, Río de Janeiro','Favela Walking Tour · Rocinha, Rio de Janeiro','Favela Walking Tour · Rocinha, Rio de Janeiro','Favela Walking Tour · Rocinha, ריו דה ז׳נרו'],
    'Passeios guiados a pé pela Rocinha, no Rio de Janeiro, desde 2002. Guias locais, seis idiomas, saídas diárias às 9:30, 13:30 e 16:30. Reserve direto com a agência.':['Guided walking tours of Rocinha, Rio de Janeiro, since 2002. Local guides, six languages, daily departures at 9:30, 13:30 and 16:30. Book direct with the agency.','Tours guiados a pie por Rocinha, en Río de Janeiro, desde 2002. Guías locales, seis idiomas, salidas diarias a las 9:30, 13:30 y 16:30. Reserva directo con la agencia.','Visites guidées à pied de Rocinha, à Rio de Janeiro, depuis 2002. Guides locaux, six langues, départs quotidiens à 9h30, 13h30 et 16h30. Réservez directement auprès de l’agence.','Guidede gåture i Rocinha, Rio de Janeiro, siden 2002. Lokale guider, seks sprog, daglige afgange kl. 9:30, 13:30 og 16:30. Book direkte hos bureauet.','סיורים מודרכים ברגל ב־Rocinha שבריו דה ז׳נרו מאז 2002. מדריכים מקומיים, שש שפות, יציאות יומיות ב־9:30, 13:30 ו־16:30. הזמינו ישירות מהסוכנות.']
  };
  const LANGS = ['pt', 'en', 'es', 'fr', 'da', 'he'];
  const LANG_TAG = { pt: 'pt-BR', en: 'en', es: 'es', fr: 'fr', da: 'da', he: 'he' };
  let lang = 'pt';
  const t = s => { const v = I18N[s]; const i = LANGS.indexOf(lang) - 1; return (i >= 0 && v && v[i]) ? v[i] : s; };
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const tNodes = [], tAttrs = [];
  (function collect() {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const p = n.parentElement;
      if (!p || p.closest('script,style,blockquote,.lang-menu,.langs')) continue;
      const core = norm(n.nodeValue);
      if (core && I18N[core]) tNodes.push([n, n.nodeValue, core]);
    }
    $$('[alt],[aria-label]').forEach(el => ['alt', 'aria-label'].forEach(a => { const v = el.getAttribute(a); if (v && I18N[v] && !el.closest('.lang-menu')) tAttrs.push([el, a, v]); }));
  })();
  const metaDesc = $('meta[name="description"]'), PT_TITLE = document.title, PT_DESC = metaDesc.content;
  let hebrewFont = false;
  const loadHebrewFont = () => {
    if (hebrewFont) return; hebrewFont = true;
    const l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400..900&display=swap';
    document.head.appendChild(l);
  };
  const langBtn = $('.lang-btn'), langList = $('#lang-list');
  const setLang = (l, save) => {
    lang = LANGS.includes(l) ? l : 'pt';
    doc.lang = LANG_TAG[lang];
    doc.dir = lang === 'he' ? 'rtl' : 'ltr';
    if (lang === 'he') loadHebrewFont();
    for (const [n, orig, core] of tNodes) n.nodeValue = lang === 'pt' ? orig : orig.replace(/\s+/g, ' ').replace(core, t(core));
    for (const [el, a, orig] of tAttrs) el.setAttribute(a, t(orig));
    document.title = t(PT_TITLE); metaDesc.content = t(PT_DESC);
    $$('[data-wa]').forEach(a => { a.href = `https://wa.me/${WA}?text=${encodeURIComponent(t(a.dataset.msg || 'Olá! Quero reservar um passeio com o Favela Walking Tour.'))}`; });
    $('.lang-btn .cur').textContent = lang.toUpperCase();
    langBtn.setAttribute('aria-label', `${t('Idioma')}: ${$(`#lang-list [data-lang="${lang}"]`).textContent}`);
    $$('#lang-list [data-lang]').forEach(b => b.setAttribute('aria-current', b.dataset.lang === lang ? 'true' : 'false'));
    menuBtn.setAttribute('aria-label', t(menu.classList.contains('open') ? 'Fechar menu' : 'Abrir menu'));
    $$('[data-copy] span').forEach(s => { if (!s.closest('[data-done]')) s.textContent = t('Copiar'); });
    if (save) { try { localStorage.setItem('fwt-lang', lang); } catch {} }
  };
  const openLang = open => {
    langList.hidden = !open; langBtn.setAttribute('aria-expanded', open);
    if (open) ($(`#lang-list [data-lang="${lang}"]`) || $('#lang-list button')).focus();
  };
  langBtn.addEventListener('click', e => { e.stopPropagation(); openLang(langList.hidden); });
  $$('#lang-list [data-lang]').forEach(b => b.addEventListener('click', () => { setLang(b.dataset.lang, true); openLang(false); langBtn.focus(); }));
  langList.addEventListener('keydown', e => {
    const items = $$('#lang-list button'), i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    if (e.key === 'Escape') { openLang(false); langBtn.focus(); }
    if (e.key === 'Tab') openLang(false);
  });
  document.addEventListener('click', e => { if (!langList.hidden && !e.target.closest('.lang-menu')) openLang(false); });
  let saved = null; try { saved = localStorage.getItem('fwt-lang'); } catch {}
  let navLang = (navigator.language || 'pt').slice(0, 2).toLowerCase(); if (navLang === 'iw') navLang = 'he';
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
