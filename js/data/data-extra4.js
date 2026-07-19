/* MANPAGES.EXE — data-extra4.js
   Pack d'extension v5 : HTTPie (client HTTP moderne) · outils d'archivage
   manquants (zip, 7z, xz, zstd, unrar) · approfondissement jq et curl.
   Chargé APRÈS data-extra3.js : les commandes sont fusionnées dans COMMANDS. */

const EXTRA_COMMANDS_4 = [

  // ── HTTPIE ────────────────────────────────────────────────
  {
    name: "http GET",
    os: "httpie",
    category: "Réseau",
    description: "Effectue une requête GET avec HTTPie, qui affiche par défaut une réponse JSON colorée et indentée.",
    syntax: "http [GET] <url> [paramètre==valeur]",
    examples: [
      { cmd: "http api.exemple.fr/users", desc: "GET simple, sortie JSON lisible sans jq" },
      { cmd: "http api.exemple.fr/users page==2 actif==true", desc: "Ajoute des paramètres de requête" }
    ],
    flags: ["== (paramètre d'URL)", "-v (verbeux, affiche la requête envoyée)"]
  },
  {
    name: "http POST",
    os: "httpie",
    category: "Réseau",
    description: "Envoie une requête POST avec un corps JSON construit automatiquement depuis les arguments.",
    syntax: "http POST <url> <champ>=<valeur>",
    examples: [
      { cmd: "http POST api.exemple.fr/users nom=Tom actif:=true", desc: "Champ texte + champ booléen (:= pour JSON brut)" }
    ],
    flags: ["= (valeur texte)", ":= (valeur JSON brute : nombre, booléen, tableau)"]
  },
  {
    name: "http PUT",
    os: "httpie",
    category: "Réseau",
    description: "Envoie une requête PUT, typiquement pour remplacer une ressource existante.",
    syntax: "http PUT <url> <champ>=<valeur>",
    examples: [
      { cmd: "http PUT api.exemple.fr/users/42 nom=\"Tom D.\"", desc: "Remplace la ressource utilisateur 42" }
    ],
    flags: []
  },
  {
    name: "http DELETE",
    os: "httpie",
    category: "Réseau",
    description: "Envoie une requête DELETE vers une ressource.",
    syntax: "http DELETE <url>",
    examples: [
      { cmd: "http DELETE api.exemple.fr/users/42", desc: "Supprime la ressource utilisateur 42" }
    ],
    flags: []
  },
  {
    name: "http --form",
    os: "httpie",
    category: "Réseau",
    description: "Envoie les données en formulaire encodé (application/x-www-form-urlencoded) plutôt qu'en JSON.",
    syntax: "http --form POST <url> <champ>=<valeur>",
    examples: [
      { cmd: "http --form POST site.fr/login user=tom pass=secret", desc: "Simule un formulaire HTML classique" }
    ],
    flags: []
  },
  {
    name: "http --auth",
    os: "httpie",
    category: "Sécurité",
    description: "Ajoute une authentification HTTP Basic ou Bearer à la requête.",
    syntax: "http --auth <user>:<pass> <url>",
    examples: [
      { cmd: "http --auth tom:secret api.exemple.fr/prive", desc: "Authentification Basic" },
      { cmd: "http api.exemple.fr/prive \"Authorization:Bearer $TOKEN\"", desc: "Authentification par jeton Bearer via en-tête" }
    ],
    flags: ["--auth-type=basic|digest"]
  },
  {
    name: "http --download",
    os: "httpie",
    category: "Fichiers",
    description: "Télécharge le corps de la réponse dans un fichier, avec barre de progression.",
    syntax: "http --download <url>",
    examples: [
      { cmd: "http --download https://site.fr/archive.zip", desc: "Télécharge le fichier avec suivi de progression" }
    ],
    flags: ["-o (nom de fichier de sortie)"]
  },
  {
    name: "http -v",
    os: "httpie",
    category: "Réseau",
    description: "Mode verbeux : affiche la requête HTTP complète envoyée en plus de la réponse.",
    syntax: "http -v <méthode> <url>",
    examples: [
      { cmd: "http -v GET api.exemple.fr/status", desc: "Utile pour déboguer les en-têtes réellement envoyés" }
    ],
    flags: ["-v (verbeux)", "-p (contrôle finement les parties affichées : H,B,h,b)"]
  },

  // ── ARCHIVES (renfort) ────────────────────────────────────
  {
    name: "zip",
    os: "universal",
    category: "Archives",
    description: "Crée une archive .zip, le format le plus universellement compatible (Windows inclus).",
    syntax: "zip [-r] <archive.zip> <fichiers...>",
    examples: [
      { cmd: "zip -r site.zip ./dist", desc: "Compresse récursivement un dossier" },
      { cmd: "zip -e prive.zip secret.txt", desc: "Crée une archive protégée par mot de passe" }
    ],
    flags: ["-r (récursif)", "-e (chiffrée, demande un mot de passe)", "-9 (compression maximale)"]
  },
  {
    name: "unzip",
    os: "universal",
    category: "Archives",
    description: "Extrait le contenu d'une archive .zip.",
    syntax: "unzip <archive.zip> [-d <dossier>]",
    examples: [
      { cmd: "unzip site.zip -d ./extrait", desc: "Extrait dans un dossier précis" },
      { cmd: "unzip -l site.zip", desc: "Liste le contenu sans extraire" }
    ],
    flags: ["-d (dossier cible)", "-l (lister seulement)", "-o (écraser sans confirmer)"]
  },
  {
    name: "7z",
    os: "universal",
    category: "Archives",
    description: "Crée et extrait des archives .7z, .zip et bien d'autres, avec un taux de compression très élevé.",
    syntax: "7z <a|x|l> <archive> [fichiers...]",
    examples: [
      { cmd: "7z a backup.7z ./dossier", desc: "Crée une archive .7z (a = add)" },
      { cmd: "7z x backup.7z -o./extrait", desc: "Extrait l'archive (x = extract)" },
      { cmd: "7z l backup.7z", desc: "Liste le contenu (l = list)" }
    ],
    flags: ["a (ajouter/créer)", "x (extraire)", "l (lister)", "-p (mot de passe)"]
  },
  {
    name: "unrar",
    os: "universal",
    category: "Archives",
    description: "Extrait le contenu d'archives .rar (format propriétaire très répandu pour la distribution de fichiers).",
    syntax: "unrar x <archive.rar> [dossier]",
    examples: [
      { cmd: "unrar x archive.rar ./extrait/", desc: "Extrait en conservant l'arborescence" },
      { cmd: "unrar l archive.rar", desc: "Liste le contenu sans extraire" }
    ],
    flags: ["x (extraire avec chemins)", "e (extraire à plat)", "l (lister)"]
  },
  {
    name: "xz",
    os: "universal",
    category: "Archives",
    description: "Compresse un fichier unique avec un taux de compression très fort, plus lent que gzip.",
    syntax: "xz [-d] <fichier>",
    examples: [
      { cmd: "xz gros_fichier.log", desc: "Compresse en gros_fichier.log.xz (remplace l'original)" },
      { cmd: "xz -d gros_fichier.log.xz", desc: "Décompresse" },
      { cmd: "tar -cJf archive.tar.xz ./dossier", desc: "Combine tar + xz pour archiver un dossier entier" }
    ],
    flags: ["-d (décompresser)", "-k (garder l'original)", "-9 (compression maximale)"]
  },
  {
    name: "zstd",
    os: "universal",
    category: "Archives",
    description: "Compression moderne offrant un excellent compromis vitesse/taux, utilisée par de nombreux outils DevOps.",
    syntax: "zstd [-d] <fichier>",
    examples: [
      { cmd: "zstd gros_fichier.log", desc: "Compresse en gros_fichier.log.zst, très rapide" },
      { cmd: "zstd -d gros_fichier.log.zst", desc: "Décompresse" },
      { cmd: "zstd -19 backup.tar", desc: "Compression maximale (plus lente mais plus petite)" }
    ],
    flags: ["-d (décompresser)", "-19 (niveau max)", "--long (fenêtre étendue pour gros fichiers)"]
  },

  // ── JQ (renfort) ──────────────────────────────────────────
  {
    name: "jq map",
    os: "universal",
    category: "Fichiers",
    description: "Applique une transformation à chaque élément d'un tableau JSON.",
    syntax: "jq 'map(<expression>)' <fichier.json>",
    examples: [
      { cmd: "jq 'map(.prix * 1.2)' produits.json", desc: "Applique une TVA de 20% à chaque prix du tableau" }
    ],
    flags: []
  },
  {
    name: "jq to_entries",
    os: "universal",
    category: "Fichiers",
    description: "Convertit un objet JSON en tableau de paires clé/valeur, pratique pour itérer sur un objet.",
    syntax: "jq 'to_entries' <fichier.json>",
    examples: [
      { cmd: "jq 'to_entries | map(\"\\(.key)=\\(.value)\")' config.json", desc: "Transforme un objet en liste clé=valeur" }
    ],
    flags: []
  },
  {
    name: "jq --arg",
    os: "universal",
    category: "Fichiers",
    description: "Injecte une variable shell dans un filtre jq, sans risque d'injection ni de problème d'échappement.",
    syntax: "jq --arg nom valeur '<filtre utilisant $nom>'",
    examples: [
      { cmd: "jq --arg ville \"Paris\" '.villes[] | select(.nom == $ville)' data.json", desc: "Filtre en réutilisant une variable shell proprement" }
    ],
    flags: []
  },
  {
    name: "jq -c",
    os: "universal",
    category: "Fichiers",
    description: "Sortie JSON compacte sur une seule ligne par objet, utile pour du traitement en pipeline (ex. avec grep).",
    syntax: "jq -c '<filtre>' <fichier.json>",
    examples: [
      { cmd: "jq -c '.[]' data.json | grep actif", desc: "Une ligne JSON par élément, filtrable avec grep" }
    ],
    flags: ["-c (compact)"]
  },

  // ── CURL (renfort) ────────────────────────────────────────
  {
    name: "curl -L",
    os: "universal",
    category: "Réseau",
    description: "Suit automatiquement les redirections HTTP (301/302), sinon curl s'arrête à la première réponse de redirection.",
    syntax: "curl -L <url>",
    examples: [
      { cmd: "curl -L https://bit.ly/exemple", desc: "Suit le raccourcisseur de lien jusqu'à l'URL finale" }
    ],
    flags: ["-L (suivre les redirections)"]
  },
  {
    name: "curl -k",
    os: "universal",
    category: "Sécurité",
    description: "Ignore les erreurs de certificat TLS invalide — utile en dev/interne, jamais recommandé en production.",
    syntax: "curl -k <url>",
    examples: [
      { cmd: "curl -k https://192.168.1.10:8443/api", desc: "Teste une API interne avec un certificat auto-signé" }
    ],
    flags: ["-k / --insecure"]
  },
  {
    name: "curl --data-urlencode",
    os: "universal",
    category: "Réseau",
    description: "Encode automatiquement les données envoyées en application/x-www-form-urlencoded, en gérant les caractères spéciaux.",
    syntax: "curl --data-urlencode \"<champ>=<valeur>\" <url>",
    examples: [
      { cmd: "curl --data-urlencode \"q=café & croissant\" https://api.exemple.fr/recherche", desc: "Échappe correctement les espaces et le &" }
    ],
    flags: []
  },
  {
    name: "curl -w",
    os: "universal",
    category: "Réseau",
    description: "Affiche des informations personnalisées après la requête (temps de réponse, code HTTP), pratique pour du monitoring en script.",
    syntax: "curl -w \"<format>\" -o /dev/null -s <url>",
    examples: [
      { cmd: "curl -w \"%{http_code} %{time_total}s\\n\" -o /dev/null -s https://site.fr", desc: "Affiche juste le code HTTP et le temps de réponse" }
    ],
    flags: ["-w (format de sortie)", "-o /dev/null (ignore le corps)", "-s (silencieux, pas de barre de progression)"]
  },

];

// Fusion dans le tableau global COMMANDS (chargé par data.js)
if (typeof COMMANDS !== "undefined") {
  COMMANDS.push.apply(COMMANDS, EXTRA_COMMANDS_4);
}
