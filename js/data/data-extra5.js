/* MANPAGES.EXE — data-extra5.js
   Pack d'extension v6 : SSH avancé (tunnels, bastion, agent) · awk/sed
   approfondis · gaps kubectl (Job, CronJob, NetworkPolicy).
   Chargé APRÈS data-extra4.js : les commandes sont fusionnées dans COMMANDS. */

const EXTRA_COMMANDS_5 = [

  // ── SSH (renfort) ─────────────────────────────────────────
  {
    name: "ssh-copy-id",
    os: "universal",
    category: "Sécurité",
    description: "Copie automatiquement votre clé publique SSH vers un serveur distant, pour activer la connexion sans mot de passe.",
    syntax: "ssh-copy-id [-i <clé>] <user>@<hôte>",
    examples: [
      { cmd: "ssh-copy-id tom@serveur.exemple.fr", desc: "Ajoute votre clé publique à ~/.ssh/authorized_keys du serveur" },
      { cmd: "ssh-copy-id -i ~/.ssh/id_ed25519.pub tom@10.0.0.5", desc: "Précise quelle clé copier s'il y en a plusieurs" }
    ],
    flags: ["-i (fichier de clé publique précis)"]
  },
  {
    name: "ssh -L",
    os: "universal",
    category: "Réseau",
    description: "Crée un tunnel SSH local : redirige un port de votre machine vers un service accessible uniquement depuis le serveur distant.",
    syntax: "ssh -L <port-local>:<hôte-cible>:<port-cible> <user>@<bastion>",
    examples: [
      { cmd: "ssh -L 5432:localhost:5432 tom@bastion.exemple.fr", desc: "Accède à une base PostgreSQL interne comme si elle était en local" },
      { cmd: "ssh -N -L 8080:intranet.local:80 tom@bastion.exemple.fr", desc: "Tunnel silencieux (-N, pas de shell) vers un service web interne" }
    ],
    flags: ["-L (redirection locale)", "-N (pas de shell, tunnel seul)", "-f (arrière-plan)"]
  },
  {
    name: "ssh -D",
    os: "universal",
    category: "Réseau",
    description: "Ouvre un proxy SOCKS dynamique via SSH, pour faire transiter tout le trafic d'une application par le serveur distant.",
    syntax: "ssh -D <port-local> <user>@<hôte>",
    examples: [
      { cmd: "ssh -D 1080 tom@serveur.exemple.fr", desc: "Configure ensuite le navigateur pour utiliser localhost:1080 comme proxy SOCKS" }
    ],
    flags: ["-D (port du proxy SOCKS)", "-C (compresse le trafic)"]
  },
  {
    name: "ssh -J",
    os: "universal",
    category: "Réseau",
    description: "Se connecte à un serveur via un ou plusieurs hôtes relais (bastion/jump host), sans configuration supplémentaire.",
    syntax: "ssh -J <user>@<bastion> <user>@<serveur-final>",
    examples: [
      { cmd: "ssh -J tom@bastion.exemple.fr tom@10.0.0.15", desc: "Rebondit via le bastion pour atteindre un serveur en réseau privé" }
    ],
    flags: ["-J (hôte(s) relais, séparés par des virgules)"]
  },
  {
    name: "~/.ssh/config",
    os: "universal",
    category: "Système",
    description: "Fichier de configuration qui définit des alias et options de connexion SSH réutilisables, pour éviter de retaper les options à chaque fois.",
    syntax: "Host <alias>\\n  HostName <ip-ou-domaine>\\n  User <utilisateur>\\n  Port <port>\\n  IdentityFile <clé>",
    examples: [
      { cmd: "Host prod\\n  HostName 10.0.0.15\\n  User tom\\n  ProxyJump bastion", desc: "Permet ensuite de simplement taper 'ssh prod'" }
    ],
    flags: ["ProxyJump (bastion automatique)", "IdentityFile (clé dédiée)", "ForwardAgent yes"]
  },
  {
    name: "ssh-agent",
    os: "universal",
    category: "Sécurité",
    description: "Démarre un agent qui garde vos clés SSH déchiffrées en mémoire, pour ne saisir la passphrase qu'une seule fois par session.",
    syntax: "eval \"$(ssh-agent -s)\"",
    examples: [
      { cmd: "eval \"$(ssh-agent -s)\"", desc: "Démarre l'agent et exporte les variables d'environnement nécessaires" }
    ],
    flags: ["-s (sortie au format shell sh/bash)"]
  },
  {
    name: "ssh-add",
    os: "universal",
    category: "Sécurité",
    description: "Ajoute une clé privée à l'agent SSH en cours d'exécution.",
    syntax: "ssh-add [<clé>]",
    examples: [
      { cmd: "ssh-add ~/.ssh/id_ed25519", desc: "Charge la clé dans l'agent après avoir saisi la passphrase" },
      { cmd: "ssh-add -l", desc: "Liste les clés actuellement chargées dans l'agent" }
    ],
    flags: ["-l (lister les clés chargées)", "-D (retirer toutes les clés)"]
  },
  {
    name: "sshfs",
    os: "universal",
    category: "Fichiers",
    description: "Monte un répertoire distant via SSH comme un système de fichiers local (FUSE), sans configurer NFS/Samba.",
    syntax: "sshfs <user>@<hôte>:<chemin-distant> <point-de-montage>",
    examples: [
      { cmd: "sshfs tom@serveur.exemple.fr:/var/www ~/mnt/site", desc: "Le dossier distant apparaît comme un dossier local classique" },
      { cmd: "fusermount -u ~/mnt/site", desc: "Démonte proprement une fois terminé" }
    ],
    flags: ["-o reconnect (reconnexion automatique)"]
  },

  // ── AWK (renfort) ─────────────────────────────────────────
  {
    name: "awk -F",
    os: "universal",
    category: "Fichiers",
    description: "Définit le séparateur de champs utilisé par awk (par défaut : espaces/tabulations).",
    syntax: "awk -F'<séparateur>' '{ ... }' <fichier>",
    examples: [
      { cmd: "awk -F':' '{print $1}' /etc/passwd", desc: "Extrait le nom d'utilisateur d'un fichier séparé par des ':'" },
      { cmd: "awk -F',' '{print $2, $4}' donnees.csv", desc: "Extrait des colonnes précises d'un CSV" }
    ],
    flags: ["-F (séparateur de champs)"]
  },
  {
    name: "awk '{print $N}'",
    os: "universal",
    category: "Fichiers",
    description: "Affiche une ou plusieurs colonnes (champs) d'un texte tabulaire ; $0 = ligne entière, $1 = premier champ, etc.",
    syntax: "awk '{print $<N>}' <fichier>",
    examples: [
      { cmd: "df -h | awk '{print $1, $5}'", desc: "Extrait le nom du disque et le pourcentage d'usage" },
      { cmd: "ps aux | awk '{print $2, $11}'", desc: "Extrait le PID et la commande de chaque processus" }
    ],
    flags: []
  },
  {
    name: "awk (somme/calculs)",
    os: "universal",
    category: "Fichiers",
    description: "Effectue des calculs numériques ligne par ligne, avec un total accumulé affiché en fin de traitement (bloc END).",
    syntax: "awk '{somme += $<N>} END {print somme}' <fichier>",
    examples: [
      { cmd: "awk '{total += $3} END {print \"Total:\", total}' ventes.csv", desc: "Additionne une colonne de montants" },
      { cmd: "awk 'END {print NR}' fichier.log", desc: "Compte le nombre total de lignes" }
    ],
    flags: ["NR (numéro de ligne courant)", "END (bloc exécuté après la dernière ligne)"]
  },
  {
    name: "awk '/motif/'",
    os: "universal",
    category: "Fichiers",
    description: "Filtre les lignes correspondant à une expression régulière, comme grep mais avec la puissance de traitement d'awk en plus.",
    syntax: "awk '/<motif>/ { ... }' <fichier>",
    examples: [
      { cmd: "awk '/ERROR/ {print $1, $NF}' app.log", desc: "Sur chaque ligne d'erreur, affiche la date et le dernier champ" }
    ],
    flags: ["$NF (dernier champ de la ligne)"]
  },

  // ── SED (renfort) ─────────────────────────────────────────
  {
    name: "sed -i",
    os: "universal",
    category: "Fichiers",
    description: "Modifie un fichier directement sur disque (in-place) au lieu d'afficher le résultat sur la sortie standard.",
    syntax: "sed -i 's/<motif>/<remplacement>/g' <fichier>",
    examples: [
      { cmd: "sed -i 's/localhost/prod.exemple.fr/g' config.env", desc: "Remplace toutes les occurrences directement dans le fichier" },
      { cmd: "sed -i.bak 's/DEBUG=true/DEBUG=false/' .env", desc: "Garde une sauvegarde .bak avant de modifier" }
    ],
    flags: ["-i (modifie en place)", "-i.bak (garde une copie de sauvegarde)"]
  },
  {
    name: "sed -n (plage de lignes)",
    os: "universal",
    category: "Fichiers",
    description: "Affiche uniquement une plage de lignes précise d'un fichier, sans tout afficher par défaut.",
    syntax: "sed -n '<début>,<fin>p' <fichier>",
    examples: [
      { cmd: "sed -n '10,20p' app.log", desc: "Affiche uniquement les lignes 10 à 20" },
      { cmd: "sed -n '/DEBUT/,/FIN/p' fichier.txt", desc: "Affiche tout ce qui est entre deux motifs" }
    ],
    flags: ["-n (supprime l'affichage par défaut)", "p (imprime la sélection)"]
  },
  {
    name: "sed (expressions multiples)",
    os: "universal",
    category: "Fichiers",
    description: "Enchaîne plusieurs transformations en une seule commande sed, avec -e pour chaque expression.",
    syntax: "sed -e 's/<a>/<b>/g' -e 's/<c>/<d>/g' <fichier>",
    examples: [
      { cmd: "sed -e 's/HTTP/HTTPS/g' -e 's/port=80/port=443/' nginx.conf", desc: "Applique deux remplacements dans le même passage" }
    ],
    flags: ["-e (expression supplémentaire)"]
  },

  // ── KUBECTL (gaps) ────────────────────────────────────────
  {
    name: "kubectl create job",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée un Job Kubernetes : une tâche ponctuelle qui s'exécute jusqu'à complétion, contrairement à un Pod classique.",
    syntax: "kubectl create job <nom> --image=<image> [-- <commande>]",
    examples: [
      { cmd: "kubectl create job migration --image=mon-app:latest -- python manage.py migrate", desc: "Lance une migration de base de données en tâche unique" }
    ],
    flags: ["--image", "-- (commande à exécuter dans le conteneur)"]
  },
  {
    name: "kubectl create cronjob",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée un CronJob : un Job Kubernetes exécuté automatiquement selon un planning cron.",
    syntax: "kubectl create cronjob <nom> --image=<image> --schedule=\"<cron>\" [-- <commande>]",
    examples: [
      { cmd: "kubectl create cronjob backup-nightly --image=backup-tool --schedule=\"0 2 * * *\" -- ./backup.sh", desc: "Sauvegarde automatique chaque nuit à 2h" }
    ],
    flags: ["--schedule (expression cron)", "--image"]
  },
  {
    name: "kubectl get networkpolicy",
    os: "kubectl",
    category: "Sécurité",
    description: "Liste les NetworkPolicy du namespace : les règles qui restreignent le trafic réseau entre les Pods.",
    syntax: "kubectl get networkpolicy [-n <namespace>]",
    examples: [
      { cmd: "kubectl get networkpolicy -n prod", desc: "Vérifie quelles restrictions réseau sont en place" },
      { cmd: "kubectl describe networkpolicy deny-all -n prod", desc: "Détaille les règles d'une politique précise" }
    ],
    flags: ["-n (namespace)"]
  },

];

// Fusion dans le tableau global COMMANDS (chargé par data.js)
if (typeof COMMANDS !== "undefined") {
  COMMANDS.push.apply(COMMANDS, EXTRA_COMMANDS_5);
}
