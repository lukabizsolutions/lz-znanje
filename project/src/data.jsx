// Dummy podaci — LZ Znanje (srpski)

const TAGS = {
  navike:      { label: 'Navike',       hue: 30  },
  fokus:       { label: 'Fokus',        hue: 250 },
  sistemi:     { label: 'Sistemi',      hue: 160 },
  psihologija: { label: 'Psihologija',  hue: 320 },
  strategija:  { label: 'Strategija',   hue: 200 },
  prodaja:     { label: 'Prodaja',      hue: 15  },
  liderstvo:   { label: 'Liderstvo',    hue: 280 },
  pisanje:     { label: 'Pisanje',      hue: 100 },
  odluke:      { label: 'Odluke',       hue: 60  },
  novac:       { label: 'Novac',        hue: 140 },
  proizvod:    { label: 'Proizvod',     hue: 220 },
  identitet:   { label: 'Identitet',    hue: 350 },
  kreativnost: { label: 'Kreativnost',  hue: 40  },
  biznis:      { label: 'Biznis',       hue: 180 },
  zivot:       { label: 'Život',        hue: 340 },
};

const BOOKS = [
  { id: "atomic-habits", title: 'Atomske navike', author: 'Džejms Klir', year: 2024, palette: ["#E8C547","#1C1C1C"], finished: true, pages: 320, progress: 100 },
  { id: "deep-work", title: 'Dubok rad', author: 'Kal Njuport', year: 2023, palette: ["#2B4C7E","#F4EFE6"], finished: true, pages: 296, progress: 100 },
  { id: "thinking-fast-slow", title: 'Misliti brzo i sporo', author: 'Danijel Kaneman', year: 2023, palette: ["#D94F30","#1A1A1A"], finished: true, pages: 499, progress: 100 },
  { id: "psychology-money", title: 'Psihologija novca', author: 'Morgan Hausel', year: 2024, palette: ["#2A7F62","#F5F0E3"], finished: true, pages: 256, progress: 100 },
  { id: "shape-up", title: 'Shape Up', author: 'Rajan Singer', year: 2023, palette: ["#FF5A1F","#FFFFFF"], finished: true, pages: 150, progress: 100 },
  { id: "hard-thing", title: 'Teška stvar o teškim stvarima', author: 'Ben Horovic', year: 2024, palette: ["#0E1C36","#C9A86A"], finished: true, pages: 304, progress: 100 },
  { id: "never-split", title: 'Nikad ne deli razliku', author: 'Kris Vos', year: 2024, palette: ["#1A1A1A","#E63946"], finished: true, pages: 288, progress: 100 },
  { id: "high-output", title: 'Menadžment visokog učinka', author: 'Endru Grouv', year: 2023, palette: ["#3A506B","#F4F1DE"], finished: true, pages: 272, progress: 100 },
  { id: "zero-to-one", title: 'Od nule do jedan', author: 'Piter Til', year: 2024, palette: ["#000000","#FFC857"], finished: true, pages: 224, progress: 100 },
  { id: "creative-act", title: 'Kreativni čin', author: 'Rik Rubin', year: 2025, palette: ["#F5F0E3","#1C1C1C"], finished: true, pages: 432, progress: 100 },
  { id: "4000-weeks", title: 'Četiri hiljade nedelja', author: 'Oliver Berkman', year: 2025, palette: ["#C1666B","#F4EFE6"], finished: true, pages: 288, progress: 100 },
  { id: 'build', title: 'Gradi', author: 'Toni Fadel', year: 2025, palette: ["#FFD23F","#1C1C1C"], finished: true, pages: 416, progress: 100 },
  { id: "working-backwards", title: 'Unazad', author: 'Kolin Brajar', year: 2026, palette: ["#FF9900","#131A22"], finished: false, pages: 304, progress: 62 },
  { id: "so-good", title: 'Toliko dobar da te ne mogu ignorisati', author: 'Kal Njuport', year: 2026, palette: ["#274060","#E5E5E5"], finished: false, pages: 288, progress: 34 },
  { id: "obstacle-way", title: 'Prepreka je put', author: 'Rajan Holidej', year: 2025, palette: ["#5A3E2B","#E8D5B7"], finished: true, pages: 224, progress: 100 },
  { id: 'range', title: 'Širina', author: 'Dejvid Epstajn', year: 2025, palette: ["#2F6690","#F0F7F4"], finished: true, pages: 352, progress: 100 },
  { id: "start-with-why", title: 'Počni sa zašto', author: 'Sajmon Sinek', year: 2024, palette: ["#E2B25F","#1A1A1A"], finished: true, pages: 256, progress: 100 },
  { id: "lean-startup", title: 'Lean Startup', author: 'Erik Ris', year: 2024, palette: ["#1B998B","#FFFFFF"], finished: true, pages: 336, progress: 100 },
];

const LESSONS = [
  { id: "l1", tag: 'navike', title: "Okruženje pobeđuje volju.", body: "Najpouzdaniji način da izgradiš naviku je da dizajniraš znakove u svom fizičkom prostoru. Volja je ograničen resurs; vidljiv znak ne košta ništa.", source: { kind: 'book', id: "atomic-habits", label: 'Atomske navike' } },
  { id: "l2", tag: 'fokus', title: "Plitak rad popunjava prostor koji kognitivni rad ostavi.", body: "Ako ne zakažeš svesno duboki rad, imejlovi i sastanci apsorbovaće svaki namenjeni blok. Zaštiti jutro.", source: { kind: 'book', id: "deep-work", label: 'Dubok rad' } },
  { id: "l3", tag: 'psihologija', title: "Zabluda planiranja je osobina, ne bag.", body: "Ljudi dosledno potcenjuju vreme jer modeliramo plan, ne trenja. Dodaj 40% na procene kao osnovu.", source: { kind: 'book', id: "thinking-fast-slow", label: 'Misliti brzo i sporo' } },
  { id: "l4", tag: 'novac', title: "Postati bogat i ostati bogat su različite veštine.", body: "Ukamaćivanje nagrađuje strpljenje više nego genijalnost. Preživljavanje je preduslov za sve ostalo.", source: { kind: 'book', id: "psychology-money", label: 'Psihologija novca' } },
  { id: "l5", tag: 'prodaja', title: "Ogledanje je besplatno poverenje.", body: "Ponovi poslednje 1–3 reči onoga što sagovornik kaže. Ne košta ništa, signalizira pažnju i otvara ga da razradi.", source: { kind: 'book', id: "never-split", label: 'Nikad ne deli razliku' } },
  { id: "l6", tag: 'sistemi', title: "Isporučuj cikluse, ne rokove.", body: "Fiksan vremenski budžet + promenljiv obim tera tim da bira šta je bitno. Rokovi pozivaju scope creep; ciklusi ga odbacuju.", source: { kind: 'book', id: "shape-up", label: 'Shape Up' } },
  { id: "l7", tag: 'strategija', title: "Monopol je nagrada za prvo rešavanje teškog problema.", body: "Konkurencija smanjuje marže. Cilj nije osvojiti tržište — već izgraditi tržište na kojem samo ti možeš da služiš.", source: { kind: 'book', id: "zero-to-one", label: 'Od nule do jedan' } },
  { id: "l8", tag: 'liderstvo', title: "Menadžerska poluga = učinak ÷ uloženo vreme.", body: "Sastanci, 1:1, revizije — svaki treba meriti po odlukama koje je oblikovao, ne po vremenu koje je potrošio.", source: { kind: 'book', id: "high-output", label: 'Menadžment visokog učinka' } },
  { id: "l9", tag: 'identitet', title: "Glasaj za osobu koja želiš da postaneš.", body: "Svaki postupak je glasački listić. Nije ti potrebna većina — samo pluralnost malih dnevnih glasova u istom smeru.", source: { kind: 'book', id: "atomic-habits", label: 'Atomske navike' } },
  { id: "l10", tag: 'pisanje', title: "Pisanje je mišljenje koje je postalo vidljivo.", body: "Ako ne možeš jasno da napišeš, ne razumeš. Koristi stranicu da preispitaš sopstvenu ideju pre nego što je braniš.", source: { kind: 'notebook', label: "Sveska · Pisanje" } },
  { id: "l11", tag: 'odluke', title: "Jednosmerna vs dvosmerna vrata.", body: "Reverzibilne odluke zaslužuju brzinu; ireverzibilne zaslužuju pažnju. Većina timova obrne ovo i sve uspori.", source: { kind: 'book', id: "working-backwards", label: 'Unazad' } },
  { id: "l12", tag: 'proizvod', title: "Počni od saopštenja za javnost.", body: "Ako ne možeš da napišeš uverljivo najavno saopštenje, proizvod nije spreman za razvoj. Radi unazad od korisnika.", source: { kind: 'book', id: "working-backwards", label: 'Unazad' } },
  { id: "l13", tag: 'fokus', title: "Ostatak pažnje je porez na kontekst.", body: "Svako prebacivanje između zadataka ostavlja fragment prethodnog. Dva sata fragmentisanog rada ≠ dva sata dubokog rada.", source: { kind: 'book', id: "deep-work", label: 'Dubok rad' } },
  { id: "l14", tag: 'navike', title: "Jasno, privlačno, lako, zadovoljavajuće.", body: "Četiri zakona, po redu. Većina neuspelih navika pukne na 'lako' — trenje je nevidljivo dok ga ne izmeriš u sekundama.", source: { kind: 'book', id: "atomic-habits", label: 'Atomske navike' } },
  { id: "l15", tag: 'strategija', title: "Strast sledi majstorstvo, ne obrnuto.", body: "Zadovoljstvo u karijeri korelira sa retkim i vrednim veštinama, ne sa 'pronalaženjem strasti'. Izgradi veštinu, pa onda dolazi ljubav.", source: { kind: 'book', id: "so-good", label: "Toliko dobar..." } },
  { id: "l16", tag: 'psihologija', title: "Prepreka je put.", body: "Svaka prepreka sadrži oblik puta kroz nju. Stoički potez je da se otpor metabolizuje u gorivo.", source: { kind: 'book', id: "obstacle-way", label: 'Prepreka je put' } },
  { id: "l17", tag: 'sistemi', title: "Cilj je smer, ne destinacija.", body: "Sistemi kontinuirano proizvode rezultate; ciljevi daju jedan binarni rezultat na kraju. Dizajniraj sistem, ne finiš.", source: { kind: 'notebook', label: "Sveska · Sistemi" } },
  { id: "l18", tag: 'prodaja', title: "'Ne' je početak pregovora.", body: "Brzo 'ne' je jeftina informacija. Gradi procese koji brzo zarade 'ne' da bi vreme trošio na pravo 'da'.", source: { kind: 'book', id: "never-split", label: 'Nikad ne deli razliku' } },
];

// IDEJE — slobodne misli, Netflix-style kartice
const IDEAS = [
  { id: "i1", title: "Mikro-kurs o pregovaranju za developere", tag: 'proizvod', cover: ["#2B4C7E","#FFD23F"], date: "12. apr 2026", body: "3x15 min video lekcija — jedna knjiga po lekciji. Prva: Voss. Druga: Mnookin. Treća: moja sinteza. Naplatiti €29. Testirati na LinkedIn publici." },
  { id: "i2", title: 'Newsletter: "Jedna lekcija nedeljno"', tag: 'pisanje', cover: ["#5A3E2B","#E8D5B7"], date: "08. apr 2026", body: "Ponedeljkom u 7h — jedna lekcija iz nedeljnog čitanja, u maks 300 reči. Cilj: 1000 čitalaca za 90 dana. Distribucija preko Substack + LinkedIn post." },
  { id: "i3", title: 'Aplikacija za "knjiga dana"', tag: 'navike', cover: ["#E63946","#1A1A1A"], date: "02. apr 2026", body: "Svaki dan po jedna citat-kartica iz moje lične baze. Push u 8h. Lokalno na telefonu, bez backend-a. Tri stila prikaza: editorial, mono, kolaž." },
  { id: "i4", title: "Video esej: zašto su ciljevi precenjeni", tag: 'sistemi', cover: ["#1B998B","#F5F0E3"], date: "28. mar 2026", body: "15 min esej — spoj Clear + Atomic Habits + lični primer iz Q1. Scenario, glas, a-roll sa belom tablom. Objaviti na YouTube + cross-post na X." },
  { id: "i5", title: "Radionica: dizajn okruženja", tag: 'navike', cover: ["#E8C547","#1C1C1C"], date: "20. mar 2026", body: "Dvočasovna radionica — učesnici mapiraju svoj radni prostor, identifikuju 3 tren­ja i 3 znaka. Plaća se €49, grupa do 10. Prvi pilot sa kolegama iz konsaltinga." },
  { id: "i6", title: 'Klub čitanja samo za ljude koji prave', tag: 'biznis', cover: ["#274060","#FFC857"], date: "14. mar 2026", body: "Mesečni sastanak uživo. Svaki član mora doneti jednu ideju primene iz knjige. Ne priča se o sadržaju — priča se o transferu. Grad: Beograd, 8 ljudi." },
  { id: "i7", title: 'Ritual "nedelja bez sastanaka"', tag: 'fokus', cover: ["#2A7F62","#F4EFE6"], date: "05. mar 2026", body: "Prvu nedelju u mesecu — nijedan sastanak, samo dubok rad. Test u timu. Meriti broj isporučenih artefakata vs uobičajena nedelja. Očekujem 2x izlaz." },
  { id: "i8", title: "Kolaboracija sa @marijom oko stoicizma", tag: 'psihologija', cover: ["#5A3E2B","#F4F1DE"], date: "28. feb 2026", body: "Zajednička mini-serija (3 epizode) o stoicizmu u savremenom biznisu. Holiday + Aurelije. Ona govori, ja pišem scenario. Potvrditi do kraja marta." },
];

// VIDEO LEKCIJE — snimljene od strane korisnika
const VIDEOS = [
  { id: "v1", title: 'Kako dizajniram svoje jutro', duration: "12:42", date: "18. apr 2026", tag: 'navike', cover: ["#E8C547","#1C1C1C"], views: 142, description: "Prolazim kroz svoj jutarnji ritual korak po korak — od 5:30 do 8:00. Šta radi, šta je otpalo, šta testiram ovaj kvartal. Spominjem Atomske navike i Duboki rad kao glavne izvore." },
  { id: "v2", title: 'Moj sistem za vođenje beleški', duration: "18:05", date: "10. apr 2026", tag: 'sistemi', cover: ["#2B4C7E","#F4EFE6"], views: 238, description: "Showcase celog toka — od markera u knjizi, do digitalne kartice u LZ, do kvartalnog pregleda. Tri pravila koja sam iskristalisao za tri godine." },
  { id: "v3", title: "Pregovaranje sa klijentom: pravi primer", duration: "24:18", date: "02. apr 2026", tag: 'prodaja', cover: ["#1A1A1A","#E63946"], views: 89, description: "Glumljena, ali bazirana na pravom razgovoru iz februara. Primenjujem Vossove tehnike — ogledanje, taktička empatija, kalibrisana pitanja." },
  { id: "v4", title: "Čitao sam 50 knjiga. Ovo je ostalo.", duration: "15:33", date: "22. mar 2026", tag: 'biznis', cover: ["#FF5A1F","#FFFFFF"], views: 412, description: "Destilacija tri godine čitanja u pet principa koje i dalje koristim svake nedelje. Ne lista, ne rang — samo pet stvari koje su preživele." },
  { id: "v5", title: 'Kako se nosim sa prokrastinacijom', duration: "09:21", date: "14. mar 2026", tag: 'psihologija', cover: ["#C1666B","#F4EFE6"], views: 167, description: "Iskren video. Ne kao guru. Ono što radi za mene — i ono što ne. Dva konkretna alata i jedna promena u okruženju." },
  { id: "v6", title: "Tiha nedelja: bez ekrana nedelju dana", duration: "21:47", date: "05. mar 2026", tag: 'fokus', cover: ["#F5F0E3","#1C1C1C"], views: 198, description: "Eksperiment — nedelju dana bez telefona i društvenih mreža. Šta se desilo s pažnjom, snom, raspoloženjem. Iskreni zaključak sa brojkama." },
];

// Detalji knjige
const BOOK_DETAILS = {
  "atomic-habits": {
    description: "Pročitana u dve nedelje tokom Q1 pregleda. Vraćao sam se na prvo i šesto poglavlje — najbolji priručnik za promenu ponašanja koji sam pročitao.",
    dateRead: "feb – mar 2024",
    lessons: [
      { id: "bl1", tag: 'navike', title: "Identitet prethodi ponašanju.", body: "Ne odlučuješ da trčiš; odlučuješ da budeš trkač. Pomak identiteta se ukamaćuje. Svako ponavljanje je glas za osobu koja postaješ — i glasačka kutija se ne zatvara." },
      { id: "bl2", tag: 'sistemi', title: "Trenje je tvoja jedinica mere.", body: "Navike ne padaju na motivaciji; padaju na trenju. Smanjiti cenu ponašanja za 20 sekundi vredi više od bilo kakvog treninga volje." },
      { id: "bl3", tag: 'identitet', title: "Plato latentnog potencijala.", body: "Linearan ulaz, nelinearan izlaz. Razmak između očekivanja i napretka je gde većina odustaje. Rezultati stižu kasno; rad to ne sme." },
    ],
    notes: "Svakog januara ponovo čitam poglavlje o petlji navika. Spoj sa kvartalnim pregledom — mapirati svaku naviku na identitet koji pojačava. Najveći propust prošle godine: znakovi u radnom kabinetu nisu bili dovoljno vidljivi. Štampao sam ček-listu na zidu za Q2.\n\nDiskusija kluba 18. mart: grupa se podelila oko toga da li je okvir 'bazirano na identitetu' precenjen. Ne slažem se — bihejvioralno uvežbavanje JESTE identitet.",
    summary: {
      paragraphs: [
        "Džejms Klir tvrdi da smislena promena ne dolazi iz postavljanja ambicioznih ciljeva već iz dizajna malih, doslednih sistema. Knjiga preformulišе navike kao složenu kamatu samousavršavanja — svaka sitna akcija je sama po sebi nebitna, ali kumulativni povrat je definišuća varijabla života.",
        "Centralni okvir je Četiri zakona promene ponašanja — učini ih očiglednim, privlačnim, lakim i zadovoljavajućim — primenjeni obrnuto za prekid loših navika. Ispod taktika teče dublja tvrdnja: da trajna promena proističe iz identiteta, ne iz ishoda. Ponašanja koja protivreče tvom osećaju ja propadaju; ona koja ga potvrđuju, ukamaćuju se.",
      ],
      ideas: [
        { title: "Ciljevi daju smer; sistemi daju napredak.", body: "Pobednici i gubitnici dele isti cilj. Razliku pravi sistem koji izgrade oko njega." },
        { title: "Pravilo 1%.", body: "Marginalna dnevna poboljšanja su nevidljiva iz dana u dan, ali transformativna tokom godine. Matematika ukamaćivanja je ravnodušna na veličinu." },
        { title: "Dizajn okruženja pobeđuje samodisciplinu.", body: "Većina takozvanih disciplinovanih ljudi je jednostavno učinila loše navike nepraktičnim, a dobre očiglednim. Znakovi rade posao koji volja ne može." },
        { title: "Slaganje navika.", body: 'Zakači novu naviku za postojeću. "Nakon što sipam jutarnju kafu, pišem dvadeset minuta" pobeđuje svaki kalendarski podsetnik.' },
        { title: "Identitet iznad ishoda.", body: "Najdublja vrsta unutrašnje motivacije je kada navika postane deo identiteta. Cilj nije pročitati knjigu; cilj je postati čitalac." },
      ],
      themes: ["Promena ponašanja", 'Ukamaćivanje', 'Sistemsko razmišljanje', "Samopoimanje"],
    },
  },
  "deep-work": {
    description: "Drugo čitanje. Principi su izdržali bolje od većine literature o produktivnosti — i dalje najoštriji argument za kognitivnu dubinu u ekonomiji pažnje.",
    dateRead: "sep 2023",
    lessons: [
      { id: "dw1", tag: 'fokus', title: "Dubok rad je novi luksuz.", body: "U ekonomiji pažnje koja monetizuje distrakciju, održana koncentracija postaje i retka i nesrazmerno vredna. Retkost definiše cenu." },
      { id: "dw2", tag: 'fokus', title: "Prigrli dosadu.", body: "Sposobnost koncentracije je veština koju atrofiraju konstantne novosti. Vraćanje iziskuje podnošenje dosadnih trenutaka bez posezanja za telefonom." },
      { id: "dw3", tag: 'sistemi', title: "Ritualizuj ulazak.", body: "Fiksno mesto, fiksno vreme, fiksan otvarajući gest. Rituali smanjuju kognitivnu cenu počinjanja — skupi deo dubokog rada." },
    ],
    notes: "Spojiti sa poglavljem o trenju iz Atomskih navika. Preklapanje: oba autora tretiraju volju kao najnepouzdaniji ulaz.\n\nLično pravilo: bez sastanaka pre 11h utorkom i četvrtkom. Prekršio 4 puta prošlog meseca. Treba postaviti kalendar da to podrazumevano sprovodi.",
    summary: {
      paragraphs: [
        "Kal Njuport iznosi dvostruki argument: da sposobnost fokusa bez distrakcije na kognitivno zahtevnim zadacima postaje retka u ekonomiji, i istovremeno sve vrednija. Rastući jaz između ove dve krive, tvrdi on, je najvažnija karijerna prilika našeg vremena.",
        "Druga polovina je preskriptivna — skup rituala, pravila i taktika zakazivanja za zaštitu dubokog rada u radnom okruženju optimizovanom za plitku distrakciju. Njuport je skeptičan i prema društvenim mrežama i prema kulturi sastanaka-kao-produktivnosti; oba tretira kao troškove prerušene u koristi.",
      ],
      ideas: [
        { title: "Plitak rad je default.", body: "Ako aktivno ne ugradiš duboki rad u raspored, reaktivni rad popunjava prostor. To je entropija, ne lenjost." },
        { title: "Ostatak pažnje.", body: "Prebacivanje zadataka ostavlja kognitivni ostatak prethodnog. Cena je nevidljiva ali merljiva u kvalitetu izlaza." },
        { title: "Zakaži svaki minut.", body: "Blokiranje vremena te tera da se suočiš s time kako zaista trošiš sate naspram kako zamišljaš da ih trošiš. Razlika je obično brutalna." },
        { title: "Fiksno zakazana produktivnost.", body: "Tvrd kraj u 17:30 nije ograničenje — to je funkcija koja te tera da biraš. Hitnost izoštrava prioritete bolje od bilo kog okvira." },
        { title: "Napusti društvene mreže, uslovno.", body: "Trideset dana pauze, pa se pitaj da li je povratak vredio cene pažnje. Većina alata ne prolazi test." },
      ],
      themes: ["Pažnja", 'Produktivnost', 'Rad sa znanjem', "Karijerni kapital"],
    },
  },
};

// Heatmapa — poslednjih 26 nedelja
function generateHeatmap() {
  const days = 26 * 7;
  const out = [];
  for (let i = 0; i < days; i++) {
    const day = (i + 3) % 7;
    const weekend = day === 0 || day === 6;
    const rand = Math.sin(i * 1.7) * 0.5 + 0.5;
    let intensity = 0;
    if (rand > 0.35) intensity = 1;
    if (rand > 0.55) intensity = 2;
    if (rand > 0.72) intensity = 3;
    if (rand > 0.88) intensity = 4;
    if (weekend) intensity = Math.min(4, intensity + (Math.random() > 0.5 ? 1 : 0));
    if (i < 14) intensity = 0;
    if (Math.random() < 0.08) intensity = 0;
    out.push(intensity);
  }
  for (let i = days - 11; i < days - 1; i++) if (out[i] === 0) out[i] = 2;
  return out;
}

const HEATMAP = generateHeatmap();
const YEAR_GOAL = 24;
const BOOKS_THIS_YEAR = 18;
const PAGES_TODAY = 42;
const STREAK_DAYS = 11;
const CURRENT_STREAK_LABEL = "11 dana zaredom";
const THIS_MONTH_BOOKS = ["obstacle-way", 'range', "creative-act", "build"];

// Svi stringovi za UI (srpski)
const T = {
  appName: 'Znanje',
  appSubtitle: "Lično · v2.4",
  nav: { home: 'Početna', library: 'Biblioteka', notebook: 'Sveska', ideas: 'Ideje', videos: 'Video lekcije', progress: 'Napredak', mindmaps: 'Mape uma' },
  common: {
    soon: 'Uskoro',
    search: "Pretraži lekcije, knjige, ideje…",
    tweaks: 'Podešavanja',
    addBook: 'Dodaj knjigu',
    addIdea: 'Nova ideja',
    addVideo: 'Otpremi video',
    addLesson: 'Dodaj lekciju',
    editWithAI: 'Uredi pomoću AI',
    save: 'Sačuvaj',
    cancel: 'Otkaži',
    close: 'Zatvori',
    all: 'Sve',
    fromBooks: 'Iz knjiga',
    fromNotebook: 'Iz sveske',
    shuffle: 'Promešaj',
    recent: 'Skorašnje',
    title: 'Naslov',
    author: 'Autor',
    read: 'Pročitano',
    reading: 'Čitam',
    finished: 'Završeno',
    pages: 'strana',
    pagesRead: 'pročitane strane',
    day: 'dan',
    days: 'dana',
    backTo: 'Nazad',
    library: 'Biblioteka',
    aiBadgeNote: "Generisano · Nisu reči autora",
    aiSummary: 'AI sažetak',
    themes: 'Teme',
    fiveKeyIdeas: 'Pet ključnih ideja',
    myLessons: 'Moje lekcije',
    myNotes: 'Moje beleške',
    noLessons: 'Još nema lekcija',
    noLessonsBody: "Zabeleži ideje vredne pamćenja. Cilj je tri po knjizi.",
    addFirstLesson: 'Dodaj prvu lekciju',
    notesPlaceholder: "Počni da kucaš da zabeležiš reakciju, pitanje, povezivanje…",
    watchVideo: 'Pogledaj video',
    views: 'pregleda',
    duration: 'Trajanje',
    recorded: 'Snimljeno',
    uploadNew: 'Otpremi novi',
    describeIdea: 'Opiši svoju ideju',
    ideaTitle: 'Naslov ideje',
    ideaBody: "Opis — šta ti je palo na pamet?",
    notebookTitle: 'Sveska',
    notebookSubtitle: "Ideje koje ne pripadaju jednoj knjizi — zapažanja, povezivanja, pitanja.",
    ideasTitle: 'Ideje',
    ideasSubtitle: "Stvari koje ti padnu na pamet. Klikni na bilo koju da pogledaš ili izmeniš.",
    videosTitle: 'Moje video lekcije',
    videosSubtitle: "Tvoji snimci — uvek su sa tobom. Klikni da pogledaš.",
    progressTitle: "Napredak · 2026",
    progressHero: "Tiha navika,",
    progressHeroSub: "koja se ukamaćuje.",
    today: 'Danas',
    thisMonth: 'Ovaj mesec',
    thisYear: 'Ove godine',
    activity: 'Aktivnost',
    last6Months: "Poslednjih 6 meseci",
    goal: 'Cilj',
    onPace: 'Na ritmu za',
    ahead: 'ispred plana',
    books: 'knjiga',
    booksDone: 'završeno',
    booksOf: (a, b) => `${a} od ${b} knjiga`,
    streak: 'dana zaredom',
    lessonsCaptured: 'Zabeležene lekcije',
    thisQuarter: 'Ovaj kvartal',
    vsLastQ: 'u odnosu na Q',
    readingTime: 'Vreme čitanja',
    dailyAvg: 'Dnevni prosek',
    minPerDay: "min/dan",
    topSource: 'Najkorisniji izvor',
    mostCited: 'Najcitirana knjiga',
    highlights: 'markera',
    mostRevisited: "Najčešće ponavljane ideje:",
    less: 'Manje',
    more: 'Više',
    mon: 'pon', wed: 'sre', fri: 'pet',
    months: ["nov","dec","jan","feb","mar","apr"],
    heroLine1: "Sve što si naučio,",
    heroLine2: "jedna po jedna misao.",
    lessonsCount: 'lekcija',
    booksCount: 'knjiga',
    currentlyReading: 'Trenutno čitam',
    theShelf: 'Polica',
    searchLibrary: "Pretraži naslov ili autora…",
  },
};

Object.assign(window, {
  TAGS, BOOKS, LESSONS, IDEAS, VIDEOS, BOOK_DETAILS, HEATMAP,
  YEAR_GOAL, BOOKS_THIS_YEAR, PAGES_TODAY, STREAK_DAYS, CURRENT_STREAK_LABEL,
  THIS_MONTH_BOOKS, T,
});
