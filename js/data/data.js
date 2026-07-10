const COMMANDS = [
  // ── UNIVERSEL ─────────────────────────────────────────────
  {
    name: "cd",
    os: "universal",
    category: "Navigation",
    description: "Change le répertoire de travail courant.",
    syntax: "cd <chemin>",
    examples: [
      { cmd: "cd /etc", desc: "Aller dans /etc" },
      { cmd: "cd ..", desc: "Remonter d'un niveau" },
      { cmd: "cd ~", desc: "Aller dans le home" }
    ],
    flags: ["~ (home)", "- (répertoire précédent)", ".. (parent)"]
  },
  {
    name: "ls",
    os: "universal",
    category: "Navigation",
    description: "Liste le contenu d'un répertoire.",
    syntax: "ls [options] [chemin]",
    examples: [
      { cmd: "ls -la", desc: "Liste détaillée avec fichiers cachés" },
      { cmd: "ls -lh /var/log", desc: "Taille lisible par humain" }
    ],
    flags: ["-l (format long)", "-a (fichiers cachés)", "-h (taille lisible)", "-R (récursif)"]
  },
  {
    name: "pwd",
    os: "universal",
    category: "Navigation",
    description: "Affiche le chemin absolu du répertoire courant.",
    syntax: "pwd",
    examples: [
      { cmd: "pwd", desc: "Affiche ex: /home/tom/projets" }
    ],
    flags: []
  },
  {
    name: "grep",
    os: "universal",
    category: "Fichiers",
    description: "Recherche un motif dans des fichiers ou la sortie d'une commande.",
    syntax: "grep [options] <motif> [fichier]",
    examples: [
      { cmd: "grep -r 'error' /var/log/", desc: "Cherche 'error' récursivement" },
      { cmd: "grep -i 'root' /etc/passwd", desc: "Insensible à la casse" },
      { cmd: "dmesg | grep -i 'usb'", desc: "Filtre la sortie de dmesg" }
    ],
    flags: ["-r (récursif)", "-i (insensible casse)", "-n (numéro ligne)", "-v (inverse)"]
  },
  {
    name: "cat",
    os: "universal",
    category: "Fichiers",
    description: "Affiche le contenu d'un fichier ou concatène plusieurs fichiers.",
    syntax: "cat [fichier...]",
    examples: [
      { cmd: "cat /etc/hosts", desc: "Affiche le fichier hosts" },
      { cmd: "cat file1 file2 > merged.txt", desc: "Concatène deux fichiers" }
    ],
    flags: ["-n (numéroter lignes)", "-A (afficher caractères spéciaux)"]
  },
  {
    name: "echo",
    os: "universal",
    category: "Système",
    description: "Affiche du texte ou la valeur d'une variable dans le terminal.",
    syntax: "echo [texte ou variable]",
    examples: [
      { cmd: "echo $PATH", desc: "Affiche la variable PATH" },
      { cmd: "echo 'Hello' > file.txt", desc: "Écrit dans un fichier" }
    ],
    flags: ["-n (sans saut de ligne)", "-e (interpréter \\n, \\t...)"]
  },
  {
    name: "man",
    os: "universal",
    category: "Système",
    description: "Affiche le manuel d'une commande.",
    syntax: "man <commande>",
    examples: [
      { cmd: "man ls", desc: "Manuel de ls" },
      { cmd: "man 5 passwd", desc: "Section 5 : formats de fichiers" }
    ],
    flags: ["-k (chercher par mot-clé)"]
  },
  {
    name: "history",
    os: "universal",
    category: "Système",
    description: "Affiche l'historique des commandes exécutées dans le shell.",
    syntax: "history [n]",
    examples: [
      { cmd: "history", desc: "Toutes les commandes récentes" },
      { cmd: "history | grep ssh", desc: "Chercher dans l'historique" }
    ],
    flags: ["-c (vider l'historique)"]
  },
  {
    name: "cp",
    os: "universal",
    category: "Fichiers",
    description: "Copie un ou plusieurs fichiers/dossiers.",
    syntax: "cp [options] <source> <destination>",
    examples: [
      { cmd: "cp fichier.txt /tmp/", desc: "Copie un fichier" },
      { cmd: "cp -r dossier/ /backup/", desc: "Copie récursive d'un dossier" }
    ],
    flags: ["-r (récursif)", "-v (verbose)", "-i (confirmer écrasement)"]
  },
  {
    name: "mv",
    os: "universal",
    category: "Fichiers",
    description: "Déplace ou renomme un fichier ou un dossier.",
    syntax: "mv <source> <destination>",
    examples: [
      { cmd: "mv ancien.txt nouveau.txt", desc: "Renomme un fichier" },
      { cmd: "mv fichier.txt /home/user/", desc: "Déplace un fichier" }
    ],
    flags: ["-i (confirmer)", "-v (verbose)", "-n (no clobber)"]
  },
  {
    name: "rm",
    os: "universal",
    category: "Fichiers",
    description: "Supprime des fichiers ou dossiers (irréversible).",
    syntax: "rm [options] <fichier>",
    examples: [
      { cmd: "rm fichier.txt", desc: "Supprime un fichier" },
      { cmd: "rm -rf dossier/", desc: "Supprime un dossier et son contenu (attention !)" }
    ],
    flags: ["-r (récursif)", "-f (forcer)", "-i (confirmer)"]
  },
  {
    name: "mkdir",
    os: "universal",
    category: "Fichiers",
    description: "Crée un nouveau dossier.",
    syntax: "mkdir [options] <dossier>",
    examples: [
      { cmd: "mkdir projet", desc: "Crée un dossier" },
      { cmd: "mkdir -p a/b/c", desc: "Crée toute l'arborescence en une fois" }
    ],
    flags: ["-p (créer les parents)", "-v (verbose)"]
  },
  {
    name: "find",
    os: "universal",
    category: "Fichiers",
    description: "Recherche des fichiers/dossiers selon des critères (nom, taille, date...).",
    syntax: "find <chemin> [critères]",
    examples: [
      { cmd: "find / -name \"*.log\"", desc: "Cherche tous les fichiers .log" },
      { cmd: "find . -mtime -1", desc: "Fichiers modifiés dans les dernières 24h" },
      { cmd: "find . -size +100M", desc: "Fichiers de plus de 100 Mo" }
    ],
    flags: ["-name", "-type f|d", "-mtime", "-size", "-exec"]
  },
  {
    name: "ps",
    os: "universal",
    category: "Processus",
    description: "Affiche les processus en cours d'exécution.",
    syntax: "ps [options]",
    examples: [
      { cmd: "ps aux", desc: "Tous les processus avec détails" },
      { cmd: "ps aux | grep nginx", desc: "Filtre les processus nginx" }
    ],
    flags: ["aux (tous + détails)", "-ef (format standard)"]
  },
  {
    name: "kill",
    os: "universal",
    category: "Processus",
    description: "Envoie un signal à un processus (par défaut SIGTERM pour l'arrêter).",
    syntax: "kill [signal] <PID>",
    examples: [
      { cmd: "kill 1234", desc: "Demande l'arrêt propre du processus" },
      { cmd: "kill -9 1234", desc: "Force l'arrêt immédiat (SIGKILL)" }
    ],
    flags: ["-9 (SIGKILL)", "-15 (SIGTERM, défaut)", "-l (lister les signaux)"]
  },
  {
    name: "top",
    os: "universal",
    category: "Processus",
    description: "Affiche en temps réel les processus et la charge système (CPU, RAM).",
    syntax: "top",
    examples: [
      { cmd: "top", desc: "Vue temps réel des processus" },
      { cmd: "top -u www-data", desc: "Filtre par utilisateur" }
    ],
    flags: ["-u (utilisateur)", "M (trier par mémoire)", "P (trier par CPU)"]
  },
  {
    name: "df",
    os: "universal",
    category: "Système",
    description: "Affiche l'espace disque utilisé et disponible par système de fichiers.",
    syntax: "df [options]",
    examples: [
      { cmd: "df -h", desc: "Espace disque en format lisible (Go/Mo)" },
      { cmd: "df -h /var", desc: "Espace disque pour une partition précise" }
    ],
    flags: ["-h (human-readable)", "-T (type de FS)"]
  },
  {
    name: "du",
    os: "universal",
    category: "Système",
    description: "Affiche la taille occupée par des fichiers ou dossiers.",
    syntax: "du [options] <chemin>",
    examples: [
      { cmd: "du -sh /var/log", desc: "Taille totale d'un dossier, format lisible" },
      { cmd: "du -h --max-depth=1 /home", desc: "Taille de chaque sous-dossier" }
    ],
    flags: ["-s (résumé)", "-h (human-readable)", "--max-depth"]
  },
  {
    name: "chmod",
    os: "universal",
    category: "Permissions",
    description: "Modifie les permissions (lecture/écriture/exécution) d'un fichier ou dossier.",
    syntax: "chmod <mode> <fichier>",
    examples: [
      { cmd: "chmod 755 script.sh", desc: "rwx pour le proprio, rx pour les autres" },
      { cmd: "chmod +x script.sh", desc: "Ajoute le droit d'exécution" },
      { cmd: "chmod -R 644 dossier/", desc: "Applique récursivement" }
    ],
    flags: ["-R (récursif)", "+x / -x", "u/g/o (user/group/other)"]
  },
  {
    name: "ssh",
    os: "universal",
    category: "Réseau",
    description: "Ouvre une connexion shell sécurisée vers une machine distante.",
    syntax: "ssh [utilisateur@]<hôte> [-p <port>]",
    examples: [
      { cmd: "ssh user@192.168.1.10", desc: "Connexion SSH simple" },
      { cmd: "ssh -i clé.pem user@serveur.com", desc: "Connexion avec une clé privée" },
      { cmd: "ssh -p 2222 user@serveur.com", desc: "Connexion sur un port personnalisé" }
    ],
    flags: ["-p (port)", "-i (clé privée)", "-v (verbose/debug)"]
  },
  {
    name: "wc",
    os: "universal",
    category: "Fichiers",
    description: "Compte les lignes, mots et caractères d'un fichier ou d'une entrée.",
    syntax: "wc [options] <fichier>",
    examples: [
      { cmd: "wc -l fichier.txt", desc: "Compte le nombre de lignes" },
      { cmd: "ls | wc -l", desc: "Compte le nombre de fichiers d'un dossier" }
    ],
    flags: ["-l (lignes)", "-w (mots)", "-c (caractères/octets)"]
  },
  {
    name: "head / tail",
    os: "universal",
    category: "Fichiers",
    description: "Affiche le début ou la fin d'un fichier. tail -f suit un fichier en temps réel (logs).",
    syntax: "head [-n] <fichier> ; tail [-f] <fichier>",
    examples: [
      { cmd: "head -20 access.log", desc: "20 premières lignes" },
      { cmd: "tail -f /var/log/syslog", desc: "Suit le fichier en temps réel" },
      { cmd: "tail -n 100 fichier.log", desc: "100 dernières lignes" }
    ],
    flags: ["-n (nombre de lignes)", "-f (follow, tail uniquement)"]
  },
  {
    name: "less",
    os: "universal",
    category: "Fichiers",
    description: "Affiche un fichier page par page avec navigation et recherche, sans tout charger en mémoire.",
    syntax: "less <fichier>",
    examples: [
      { cmd: "less gros-fichier.log", desc: "Parcourt le fichier (q pour quitter, / pour chercher)" },
      { cmd: "cat fichier.txt | less", desc: "Pagine la sortie d'une commande" }
    ],
    flags: ["/motif (rechercher)", "G (aller à la fin)", "g (aller au début)"]
  },
  {
    name: "curl",
    os: "universal",
    category: "Réseau",
    description: "Effectue des requêtes HTTP/FTP/autres protocoles depuis le terminal, utile pour tester des API.",
    syntax: "curl [options] <url>",
    examples: [
      { cmd: "curl https://api.example.com/status", desc: "Requête GET simple" },
      { cmd: "curl -X POST -d '{\"a\":1}' -H 'Content-Type: application/json' https://api.example.com", desc: "Requête POST avec corps JSON" },
      { cmd: "curl -O https://example.com/fichier.zip", desc: "Télécharge un fichier" }
    ],
    flags: ["-X (méthode)", "-d (données)", "-H (en-tête)", "-O (sauvegarder)", "-I (headers seulement)"]
  },
  {
    name: "sed",
    os: "universal",
    category: "Fichiers",
    description: "Édite du texte en flux, très utilisé pour le remplacement automatique dans des fichiers.",
    syntax: "sed 's/<ancien>/<nouveau>/g' <fichier>",
    examples: [
      { cmd: "sed 's/erreur/ERREUR/g' fichier.log", desc: "Remplace toutes les occurrences" },
      { cmd: "sed -i 's/8080/9090/' config.conf", desc: "Modifie le fichier directement (in-place)" },
      { cmd: "sed -n '5,10p' fichier.txt", desc: "Affiche uniquement les lignes 5 à 10" }
    ],
    flags: ["-i (in-place)", "-n (silencieux)", "-e (plusieurs scripts)"]
  },
  {
    name: "awk",
    os: "universal",
    category: "Fichiers",
    description: "Traite et extrait des données de texte structuré en colonnes, très utilisé pour les logs/CSV.",
    syntax: "awk '<pattern>{<action>}' <fichier>",
    examples: [
      { cmd: "awk '{print $1}' access.log", desc: "Affiche la 1ère colonne de chaque ligne" },
      { cmd: "awk -F',' '{print $2}' data.csv", desc: "Extrait une colonne d'un CSV (séparateur ,)" },
      { cmd: "awk '$3 > 100 {print}' fichier.txt", desc: "Filtre les lignes selon une condition" }
    ],
    flags: ["-F (séparateur de champs)"]
  },
  {
    name: "ping",
    os: "universal",
    category: "Réseau",
    description: "Vérifie la connectivité réseau vers un hôte en envoyant des paquets ICMP.",
    syntax: "ping [-c <n>] <hôte>",
    examples: [
      { cmd: "ping google.com", desc: "Ping continu (Ctrl+C pour arrêter)" },
      { cmd: "ping -c 4 192.168.1.1", desc: "Envoie exactement 4 paquets" }
    ],
    flags: ["-c (nombre de paquets)", "-i (intervalle)"]
  },
  {
    name: "diff",
    os: "universal",
    category: "Fichiers",
    description: "Compare deux fichiers ligne par ligne et affiche les différences.",
    syntax: "diff <fichier1> <fichier2>",
    examples: [
      { cmd: "diff ancien.conf nouveau.conf", desc: "Affiche les différences entre deux fichiers" },
      { cmd: "diff -u ancien.conf nouveau.conf", desc: "Format unifié, plus lisible" }
    ],
    flags: ["-u (format unifié)", "-r (récursif pour dossiers)"]
  },
  {
    name: "dig",
    os: "universal",
    category: "Réseau",
    description: "Interroge les serveurs DNS : résolution de noms, types d'enregistrements, débogage.",
    syntax: "dig [@serveur] <domaine> [type]",
    examples: [
      { cmd: "dig exemple.fr", desc: "Résolution A classique avec détails" },
      { cmd: "dig +short exemple.fr", desc: "Juste l'IP, sans le verbiage" },
      { cmd: "dig @8.8.8.8 exemple.fr MX", desc: "Enregistrements mail via le DNS de Google" },
      { cmd: "dig -x 93.184.216.34", desc: "Résolution inverse (IP → nom)" }
    ],
    flags: ["+short (réponse brève)", "@serveur (DNS à interroger)", "-x (reverse DNS)", "+trace (suit la délégation depuis la racine)"]
  },
  {
    name: "traceroute",
    os: "universal",
    category: "Réseau",
    description: "Affiche le chemin (routeur par routeur) emprunté par les paquets vers une destination.",
    syntax: "traceroute <hôte>",
    examples: [
      { cmd: "traceroute 8.8.8.8", desc: "Chemin vers le DNS de Google, saut par saut" },
      { cmd: "traceroute -n exemple.fr", desc: "IP brutes, sans résolution DNS (plus rapide)" },
      { cmd: "tracert 8.8.8.8", desc: "Équivalent Windows" }
    ],
    flags: ["-n (pas de résolution DNS)", "-m (nombre max de sauts)", "-I (utilise ICMP comme ping)"]
  },
  {
    name: "nc (netcat)",
    os: "universal",
    category: "Réseau",
    description: "Couteau suisse TCP/UDP : teste un port, écoute, transfère des données brutes.",
    syntax: "nc [options] <hôte> <port>",
    examples: [
      { cmd: "nc -zv exemple.fr 443", desc: "Teste si le port 443 est ouvert" },
      { cmd: "nc -l -p 9000", desc: "Écoute sur le port 9000 (serveur improvisé)" },
      { cmd: "nc -zv 192.168.1.50 20-25", desc: "Scanne une plage de ports" }
    ],
    flags: ["-z (scan sans envoyer de données)", "-v (verbeux)", "-l (mode écoute)", "-u (UDP au lieu de TCP)"]
  },
  {
    name: "whois",
    os: "universal",
    category: "Réseau",
    description: "Affiche les informations d'enregistrement d'un domaine ou d'une IP (propriétaire, dates, DNS).",
    syntax: "whois <domaine|ip>",
    examples: [
      { cmd: "whois exemple.fr", desc: "Titulaire, registrar, dates d'expiration" },
      { cmd: "whois 8.8.8.8", desc: "À qui appartient cette plage d'IP" }
    ],
    flags: ["-h (serveur whois spécifique)"]
  },
  {
    name: "free",
    os: "universal",
    category: "Système",
    description: "Affiche la mémoire RAM et le swap : utilisés, libres, disponibles.",
    syntax: "free [options]",
    examples: [
      { cmd: "free -h", desc: "Tailles lisibles (Go/Mo)" },
      { cmd: "free -h -s 2", desc: "Rafraîchit toutes les 2 secondes" }
    ],
    flags: ["-h (lisible par humain)", "-s (répète toutes les n secondes)", "-t (ligne de total)"]
  },
  {
    name: "uptime",
    os: "universal",
    category: "Système",
    description: "Depuis combien de temps la machine tourne, et sa charge moyenne (1, 5, 15 min).",
    syntax: "uptime",
    examples: [
      { cmd: "uptime", desc: "ex: up 42 days, load average: 0.52, 0.58, 0.59" },
      { cmd: "uptime -p", desc: "Format lisible : « up 6 weeks, 2 hours »" }
    ],
    flags: ["-p (format lisible)", "-s (date/heure du dernier boot)"]
  },
  {
    name: "mount",
    os: "universal",
    category: "Système",
    description: "Attache un système de fichiers (disque, USB, partage réseau) à un dossier de l'arborescence.",
    syntax: "mount [options] <périphérique> <point-de-montage>",
    examples: [
      { cmd: "sudo mount /dev/sdb1 /mnt/usb", desc: "Monte la clé USB sur /mnt/usb" },
      { cmd: "mount | grep sdb", desc: "Vérifie ce qui est monté" },
      { cmd: "sudo mount -a", desc: "Monte tout ce que déclare /etc/fstab" }
    ],
    flags: ["-t (type de système de fichiers)", "-o ro (lecture seule)", "-a (tout ce qui est dans fstab)"]
  },
  {
    name: "umount",
    os: "universal",
    category: "Système",
    description: "Détache proprement un système de fichiers monté — indispensable avant de débrancher.",
    syntax: "umount <point-de-montage|périphérique>",
    examples: [
      { cmd: "sudo umount /mnt/usb", desc: "Démonte la clé USB" },
      { cmd: "sudo umount -l /mnt/nfs", desc: "Démontage « paresseux » si le montage est occupé" }
    ],
    flags: ["-l (lazy : détache dès que possible)", "-f (force, pour NFS bloqué)"]
  },
  {
    name: "mkfs",
    os: "universal",
    category: "Système",
    description: "Formate une partition : crée un système de fichiers (ext4, xfs, vfat...) — efface tout !",
    syntax: "mkfs.<type> [options] <partition>",
    examples: [
      { cmd: "sudo mkfs.ext4 -L DATA /dev/sdb1", desc: "Formate en ext4 avec le label DATA" },
      { cmd: "sudo mkfs.vfat -n USB /dev/sdc1", desc: "FAT32, lisible partout (clé USB)" },
      { cmd: "sudo mkfs.xfs /dev/sdd1", desc: "XFS, taillé pour les gros volumes" }
    ],
    flags: ["-L (label ext4)", "-n (label vfat)", "-t (type via mkfs -t ext4)"]
  },

  // ── DEBIAN / UBUNTU ───────────────────────────────────────
  {
    name: "apt update",
    os: "debian",
    category: "Paquets",
    description: "Met à jour la liste des paquets disponibles depuis les dépôts.",
    syntax: "sudo apt update",
    examples: [
      { cmd: "sudo apt update", desc: "Mise à jour simple de l'index" },
      { cmd: "sudo apt update && sudo apt upgrade -y", desc: "Update + upgrade en chaîne" }
    ],
    flags: []
  },
  {
    name: "apt install",
    os: "debian",
    category: "Paquets",
    description: "Installe un ou plusieurs paquets depuis les dépôts APT.",
    syntax: "sudo apt install <paquet>",
    examples: [
      { cmd: "sudo apt install curl", desc: "Installe curl" },
      { cmd: "sudo apt install -y nginx", desc: "Sans confirmation" }
    ],
    flags: ["-y (auto-confirmer)", "--no-install-recommends", "--reinstall"]
  },
  {
    name: "apt remove",
    os: "debian",
    category: "Paquets",
    description: "Supprime un paquet installé (conserve les fichiers de config).",
    syntax: "sudo apt remove <paquet>",
    examples: [
      { cmd: "sudo apt remove nginx", desc: "Supprime nginx" },
      { cmd: "sudo apt purge nginx", desc: "Supprime nginx + ses configs" }
    ],
    flags: ["purge (supprime aussi la config)", "autoremove (nettoyage)"]
  },
  {
    name: "dpkg -l",
    os: "debian",
    category: "Paquets",
    description: "Liste les paquets installés sur le système.",
    syntax: "dpkg -l [motif]",
    examples: [
      { cmd: "dpkg -l", desc: "Tous les paquets installés" },
      { cmd: "dpkg -i paquet.deb", desc: "Installe un .deb local" }
    ],
    flags: ["-l (lister)", "-i (installer .deb)", "-r (supprimer)"]
  },
  {
    name: "systemctl",
    os: "debian",
    category: "Services",
    description: "Gère les services systemd (démarrage, arrêt, statut, activation).",
    syntax: "systemctl <action> <service>",
    examples: [
      { cmd: "systemctl status nginx", desc: "Statut du service nginx" },
      { cmd: "systemctl enable --now ssh", desc: "Active et démarre ssh" }
    ],
    flags: ["start / stop / restart / reload / status / enable / disable"]
  },
  {
    name: "ufw",
    os: "debian",
    category: "Réseau",
    description: "Firewall simplifié pour gérer les règles iptables.",
    syntax: "sudo ufw <commande>",
    examples: [
      { cmd: "sudo ufw enable", desc: "Active le pare-feu" },
      { cmd: "sudo ufw allow 22/tcp", desc: "Autorise SSH" }
    ],
    flags: ["allow / deny / delete / status / reset"]
  },
  {
    name: "journalctl",
    os: "debian",
    category: "Système",
    description: "Consulte les logs systemd (journal).",
    syntax: "journalctl [options]",
    examples: [
      { cmd: "journalctl -u nginx", desc: "Logs du service nginx" },
      { cmd: "journalctl -f", desc: "Suivre les logs en temps réel" }
    ],
    flags: ["-u (unité)", "-f (follow)", "-n (n dernières lignes)"]
  },
  {
    name: "chown",
    os: "debian",
    category: "Permissions",
    description: "Change le propriétaire et/ou le groupe d'un fichier.",
    syntax: "chown [user][:group] <fichier>",
    examples: [
      { cmd: "chown tom:tom fichier.txt", desc: "Propriétaire = tom" },
      { cmd: "chown -R www-data /var/www/", desc: "Récursif pour Nginx" }
    ],
    flags: ["-R (récursif)"]
  },
  {
    name: "ss",
    os: "debian",
    category: "Réseau",
    description: "Affiche les connexions réseau et ports en écoute.",
    syntax: "ss [options]",
    examples: [
      { cmd: "ss -tulnp", desc: "Ports TCP/UDP en écoute avec processus" },
      { cmd: "ss -s", desc: "Résumé des statistiques réseau" }
    ],
    flags: ["-t (TCP)", "-u (UDP)", "-l (listening)", "-n (numérique)", "-p (processus)"]
  },
  {
    name: "tar",
    os: "debian",
    category: "Archives",
    description: "Crée, extrait ou liste des archives .tar, .tar.gz.",
    syntax: "tar [options] <archive> [fichiers]",
    examples: [
      { cmd: "tar -czf archive.tar.gz /etc/", desc: "Compresse /etc en .tar.gz" },
      { cmd: "tar -xzf archive.tar.gz", desc: "Extrait une archive .tar.gz" }
    ],
    flags: ["-c (créer)", "-x (extraire)", "-z (gzip)", "-f (fichier)", "-v (verbose)"]
  },
  {
    name: "apt list --upgradable",
    os: "debian",
    category: "Paquets",
    description: "Liste les paquets pour lesquels une mise à jour est disponible.",
    syntax: "apt list --upgradable",
    examples: [
      { cmd: "apt list --upgradable", desc: "Paquets à mettre à jour" },
      { cmd: "apt list --installed | grep nginx", desc: "Vérifie si nginx est installé" }
    ],
    flags: ["--upgradable", "--installed", "--all-versions"]
  },
  {
    name: "ip a",
    os: "debian",
    category: "Réseau",
    description: "Affiche les interfaces réseau et leurs adresses IP (remplace ifconfig).",
    syntax: "ip a [show <interface>]",
    examples: [
      { cmd: "ip a", desc: "Toutes les interfaces et leurs IP" },
      { cmd: "ip a show eth0", desc: "Détails d'une interface précise" },
      { cmd: "ip route", desc: "Affiche la table de routage" }
    ],
    flags: ["a / addr (adresses)", "link (état des interfaces)", "route (table de routage)"]
  },
  {
    name: "apt-get autoremove",
    os: "debian",
    category: "Paquets",
    description: "Supprime les paquets installés automatiquement comme dépendances et plus utilisés.",
    syntax: "sudo apt autoremove [--purge]",
    examples: [
      { cmd: "sudo apt autoremove", desc: "Nettoie les dépendances orphelines" },
      { cmd: "sudo apt autoremove --purge", desc: "Supprime aussi les fichiers de config" }
    ],
    flags: ["--purge", "-y"]
  },
  {
    name: "add-apt-repository",
    os: "debian",
    category: "Paquets",
    description: "Ajoute un dépôt tiers (PPA) à la liste des sources APT.",
    syntax: "sudo add-apt-repository <ppa:...>",
    examples: [
      { cmd: "sudo add-apt-repository ppa:deadsnakes/ppa", desc: "Ajoute un PPA Python" },
      { cmd: "sudo add-apt-repository --remove ppa:deadsnakes/ppa", desc: "Retire un PPA" }
    ],
    flags: ["--remove", "-y"]
  },
  {
    name: "useradd / passwd",
    os: "debian",
    category: "Utilisateurs",
    description: "Crée un utilisateur système et définit son mot de passe.",
    syntax: "sudo useradd -m <user> ; sudo passwd <user>",
    examples: [
      { cmd: "sudo useradd -m -s /bin/bash tom", desc: "Crée un utilisateur avec home et bash" },
      { cmd: "sudo passwd tom", desc: "Définit le mot de passe de l'utilisateur" }
    ],
    flags: ["-m (créer le home)", "-s (shell)", "-G (groupes secondaires)"]
  },
  {
    name: "usermod -aG",
    os: "debian",
    category: "Utilisateurs",
    description: "Ajoute un utilisateur à un groupe secondaire (ex: sudo, docker).",
    syntax: "sudo usermod -aG <groupe> <user>",
    examples: [
      { cmd: "sudo usermod -aG sudo tom", desc: "Donne les droits sudo à tom" },
      { cmd: "sudo usermod -aG docker tom", desc: "Permet d'utiliser Docker sans sudo" }
    ],
    flags: ["-aG (append + group)", "-G (remplace les groupes)"]
  },
  {
    name: "netplan apply",
    os: "debian",
    category: "Réseau",
    description: "Applique la configuration réseau définie dans les fichiers YAML Netplan.",
    syntax: "sudo netplan apply",
    examples: [
      { cmd: "sudo netplan apply", desc: "Applique la config réseau actuelle" },
      { cmd: "sudo netplan try", desc: "Teste la config avec rollback automatique" }
    ],
    flags: ["try (avec rollback)", "--debug"]
  },
  {
    name: "crontab -e",
    os: "debian",
    category: "Système",
    description: "Édite les tâches planifiées (cron) de l'utilisateur courant.",
    syntax: "crontab -e",
    examples: [
      { cmd: "crontab -e", desc: "Édite le crontab" },
      { cmd: "crontab -l", desc: "Liste les tâches planifiées" },
      { cmd: "0 2 * * * /scripts/backup.sh", desc: "Exemple : exécute un script tous les jours à 2h" }
    ],
    flags: ["-e (éditer)", "-l (lister)", "-r (supprimer)"]
  },
  {
    name: "fail2ban-client",
    os: "debian",
    category: "Permissions",
    description: "Gère Fail2ban, qui bannit automatiquement les IP après des tentatives de connexion échouées.",
    syntax: "sudo fail2ban-client <commande>",
    examples: [
      { cmd: "sudo fail2ban-client status sshd", desc: "État du jail SSH (IP bannies)" },
      { cmd: "sudo fail2ban-client unban 1.2.3.4", desc: "Débanni une IP" }
    ],
    flags: ["status", "unban", "reload"]
  },
  {
    name: "lsblk",
    os: "debian",
    category: "Système",
    description: "Liste les périphériques de stockage et leurs partitions.",
    syntax: "lsblk [options]",
    examples: [
      { cmd: "lsblk", desc: "Liste les disques et partitions" },
      { cmd: "lsblk -f", desc: "Affiche aussi le système de fichiers et l'UUID" }
    ],
    flags: ["-f (filesystem)", "-a (tous, y compris vides)"]
  },
  {
    name: "docker (sur Debian)",
    os: "debian",
    category: "Conteneurs",
    description: "Installation et démarrage rapide du moteur Docker sur Debian/Ubuntu.",
    syntax: "curl -fsSL https://get.docker.com | sh",
    examples: [
      { cmd: "curl -fsSL https://get.docker.com | sh", desc: "Installe Docker via le script officiel" },
      { cmd: "sudo systemctl enable --now docker", desc: "Active et démarre le service Docker" }
    ],
    flags: []
  },
  {
    name: "lsof",
    os: "debian",
    category: "Processus",
    description: "Liste les fichiers ouverts par les processus, dont les sockets réseau (qui écoute sur quel port).",
    syntax: "lsof [options]",
    examples: [
      { cmd: "sudo lsof -i :80", desc: "Trouve quel processus utilise le port 80" },
      { cmd: "lsof -u tom", desc: "Fichiers ouverts par un utilisateur précis" }
    ],
    flags: ["-i (réseau)", "-u (utilisateur)", "-p (PID)"]
  },
  {
    name: "rsync",
    os: "debian",
    category: "Fichiers",
    description: "Synchronise des fichiers/dossiers localement ou vers un serveur distant, en ne transférant que les différences.",
    syntax: "rsync [options] <source> <destination>",
    examples: [
      { cmd: "rsync -avz /var/www/ user@serveur:/backup/www/", desc: "Synchronise vers un serveur distant" },
      { cmd: "rsync -avz --delete /src/ /dst/", desc: "Synchronise et supprime les fichiers absents de la source" }
    ],
    flags: ["-a (archive)", "-v (verbose)", "-z (compression)", "--delete"]
  },
  {
    name: "hostnamectl",
    os: "debian",
    category: "Système",
    description: "Affiche ou modifie le nom d'hôte et les informations système via systemd.",
    syntax: "hostnamectl [set-hostname <nom>]",
    examples: [
      { cmd: "hostnamectl", desc: "Affiche le hostname et les infos système" },
      { cmd: "sudo hostnamectl set-hostname srv-web01", desc: "Change le nom de la machine" }
    ],
    flags: ["set-hostname", "status"]
  },
  {
    name: "iptables / nft",
    os: "debian",
    category: "Réseau",
    description: "Configure le pare-feu au niveau noyau, soit via iptables (historique) soit nftables (moderne).",
    syntax: "sudo iptables -A <chaîne> -p <protocole> --dport <port> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT", desc: "Autorise le port SSH" },
      { cmd: "sudo iptables -L -n", desc: "Liste les règles actives" }
    ],
    flags: ["-A (ajouter)", "-L (lister)", "-D (supprimer)", "-j ACCEPT|DROP"]
  },
  {
    name: "logrotate",
    os: "debian",
    category: "Système",
    description: "Gère la rotation automatique des fichiers de logs pour éviter qu'ils ne saturent le disque.",
    syntax: "logrotate [-f] /etc/logrotate.conf",
    examples: [
      { cmd: "sudo logrotate -f /etc/logrotate.conf", desc: "Force une rotation immédiate" },
      { cmd: "logrotate -d /etc/logrotate.d/nginx", desc: "Simule sans appliquer (debug)" }
    ],
    flags: ["-f (forcer)", "-d (debug, dry-run)"]
  },
  {
    name: "dpkg-reconfigure",
    os: "debian",
    category: "Paquets",
    description: "Relance l'assistant de configuration d'un paquet déjà installé.",
    syntax: "sudo dpkg-reconfigure <paquet>",
    examples: [
      { cmd: "sudo dpkg-reconfigure tzdata", desc: "Reconfigure le fuseau horaire" },
      { cmd: "sudo dpkg-reconfigure -plow openssh-server", desc: "Reconfigure avec niveau de priorité bas" }
    ],
    flags: ["-plow|medium|high (priorité des questions)"]
  },
  {
    name: "apt-cache search",
    os: "debian",
    category: "Paquets",
    description: "Recherche des paquets disponibles dans les dépôts APT par nom ou description.",
    syntax: "apt-cache search <motif>",
    examples: [
      { cmd: "apt-cache search nginx", desc: "Cherche les paquets liés à nginx" },
      { cmd: "apt-cache show nginx", desc: "Affiche les détails d'un paquet" }
    ],
    flags: ["search", "show", "policy (versions disponibles)"]
  },

  // ── ALPINE LINUX ──────────────────────────────────────────
  {
    name: "apk update",
    os: "alpine",
    category: "Paquets",
    description: "Met à jour l'index des paquets disponibles sur Alpine Linux.",
    syntax: "apk update",
    examples: [
      { cmd: "apk update", desc: "Mise à jour de l'index" },
      { cmd: "apk update && apk upgrade", desc: "Update + upgrade" }
    ],
    flags: []
  },
  {
    name: "apk add",
    os: "alpine",
    category: "Paquets",
    description: "Installe un ou plusieurs paquets sur Alpine Linux.",
    syntax: "apk add <paquet>",
    examples: [
      { cmd: "apk add curl", desc: "Installe curl" },
      { cmd: "apk add --no-cache nginx", desc: "Sans cache (idéal Docker)" }
    ],
    flags: ["--no-cache (pas de cache)", "--virtual (groupe virtuel)"]
  },
  {
    name: "apk del",
    os: "alpine",
    category: "Paquets",
    description: "Supprime un paquet installé sur Alpine Linux.",
    syntax: "apk del <paquet>",
    examples: [
      { cmd: "apk del curl", desc: "Supprime curl" },
      { cmd: "apk del --purge nginx", desc: "Supprime + fichiers config" }
    ],
    flags: ["--purge (supprimer config)"]
  },
  {
    name: "apk info",
    os: "alpine",
    category: "Paquets",
    description: "Affiche les informations sur un paquet installé ou disponible.",
    syntax: "apk info [paquet]",
    examples: [
      { cmd: "apk info", desc: "Liste tous les paquets installés" },
      { cmd: "apk info nginx", desc: "Détails sur nginx" }
    ],
    flags: ["-L (fichiers)", "-e (vérifie si installé)"]
  },
  {
    name: "apk search",
    os: "alpine",
    category: "Paquets",
    description: "Recherche un paquet dans les dépôts Alpine.",
    syntax: "apk search <motif>",
    examples: [
      { cmd: "apk search curl", desc: "Cherche les paquets contenant 'curl'" }
    ],
    flags: ["-v (verbeux)", "-e (exact)"]
  },
  {
    name: "rc-service",
    os: "alpine",
    category: "Services",
    description: "Gère les services OpenRC sur Alpine Linux.",
    syntax: "rc-service <service> <action>",
    examples: [
      { cmd: "rc-service nginx start", desc: "Démarre nginx" },
      { cmd: "rc-service sshd status", desc: "Statut de sshd" }
    ],
    flags: ["start / stop / restart / status"]
  },
  {
    name: "rc-update",
    os: "alpine",
    category: "Services",
    description: "Active ou désactive un service au démarrage (OpenRC).",
    syntax: "rc-update <add|del> <service>",
    examples: [
      { cmd: "rc-update add nginx default", desc: "Active nginx au boot" },
      { cmd: "rc-update show", desc: "Liste les services par runlevel" }
    ],
    flags: ["default / boot / sysinit (runlevels)"]
  },
  {
    name: "adduser",
    os: "alpine",
    category: "Utilisateurs",
    description: "Crée un utilisateur sur Alpine Linux (syntaxe BusyBox).",
    syntax: "adduser [options] <utilisateur>",
    examples: [
      { cmd: "adduser tom", desc: "Crée l'utilisateur tom" },
      { cmd: "adduser -D -H -s /sbin/nologin appuser", desc: "Utilisateur service sans home" }
    ],
    flags: ["-D (pas de mot de passe)", "-H (pas de home)", "-s (shell)"]
  },
  {
    name: "lbu commit",
    os: "alpine",
    category: "Système",
    description: "Sauvegarde la configuration Alpine en mode diskless.",
    syntax: "lbu commit [-d]",
    examples: [
      { cmd: "lbu commit", desc: "Sauvegarde la config sur le média de boot" },
      { cmd: "lbu diff", desc: "Fichiers modifiés depuis le dernier commit" }
    ],
    flags: ["-d (supprime ancienne sauvegarde)"]
  },
  {
    name: "setup-alpine",
    os: "alpine",
    category: "Système",
    description: "Script d'initialisation interactif d'une installation Alpine.",
    syntax: "setup-alpine",
    examples: [
      { cmd: "setup-alpine", desc: "Lance l'assistant d'installation" },
      { cmd: "setup-hostname mon-serveur", desc: "Définit le hostname" }
    ],
    flags: []
  },
  {
    name: "apk upgrade",
    os: "alpine",
    category: "Paquets",
    description: "Met à jour tous les paquets installés vers leur dernière version disponible.",
    syntax: "apk upgrade [--available]",
    examples: [
      { cmd: "apk upgrade", desc: "Met à jour tous les paquets installés" },
      { cmd: "apk upgrade --available", desc: "Réinstalle depuis les dépôts si version dispo" }
    ],
    flags: ["--available", "-U (update avant upgrade)", "--no-cache"]
  },
  {
    name: "apk fix",
    os: "alpine",
    category: "Paquets",
    description: "Répare les paquets endommagés ou les dépendances cassées.",
    syntax: "apk fix [paquet]",
    examples: [
      { cmd: "apk fix", desc: "Répare tous les paquets" },
      { cmd: "apk fix --reinstall nginx", desc: "Réinstalle un paquet précis" }
    ],
    flags: ["--reinstall", "--depends"]
  },
  {
    name: "doas",
    os: "alpine",
    category: "Permissions",
    description: "Exécute une commande en tant que superutilisateur (équivalent léger de sudo sur Alpine).",
    syntax: "doas <commande>",
    examples: [
      { cmd: "doas apk add nginx", desc: "Installe un paquet avec élévation de privilèges" },
      { cmd: "doas -u www-data ls /var/www", desc: "Exécute en tant qu'un autre utilisateur" }
    ],
    flags: ["-u (utilisateur cible)"]
  },
  {
    name: "addgroup",
    os: "alpine",
    category: "Utilisateurs",
    description: "Crée un nouveau groupe système et y ajoute éventuellement des utilisateurs.",
    syntax: "addgroup [-S] <nom>",
    examples: [
      { cmd: "addgroup admins", desc: "Crée un groupe" },
      { cmd: "addgroup tom admins", desc: "Ajoute tom au groupe admins" }
    ],
    flags: ["-S (groupe système)"]
  },
  {
    name: "deluser / delgroup",
    os: "alpine",
    category: "Utilisateurs",
    description: "Supprime un utilisateur ou un groupe du système.",
    syntax: "deluser <user> | delgroup <groupe>",
    examples: [
      { cmd: "deluser tom", desc: "Supprime l'utilisateur tom" },
      { cmd: "deluser tom admins", desc: "Retire tom du groupe admins seulement" }
    ],
    flags: ["--remove-home"]
  },
  {
    name: "ifconfig (Alpine)",
    os: "alpine",
    category: "Réseau",
    description: "Configure ou affiche les interfaces réseau (BusyBox ifconfig sur Alpine).",
    syntax: "ifconfig <interface> [options]",
    examples: [
      { cmd: "ifconfig", desc: "Liste les interfaces et leurs IP" },
      { cmd: "ifconfig eth0 192.168.1.50 netmask 255.255.255.0", desc: "Configure une IP statique" }
    ],
    flags: []
  },
  {
    name: "setup-interfaces",
    os: "alpine",
    category: "Réseau",
    description: "Assistant interactif pour configurer les interfaces réseau d'Alpine.",
    syntax: "setup-interfaces",
    examples: [
      { cmd: "setup-interfaces", desc: "Lance l'assistant réseau interactif" }
    ],
    flags: []
  },
  {
    name: "rc-status",
    os: "alpine",
    category: "Services",
    description: "Affiche l'état de tous les services gérés par OpenRC, classés par runlevel.",
    syntax: "rc-status [runlevel]",
    examples: [
      { cmd: "rc-status", desc: "État de tous les services du runlevel par défaut" },
      { cmd: "rc-status -a", desc: "Tous les runlevels" }
    ],
    flags: ["-a (tous les runlevels)"]
  },
  {
    name: "tar (BusyBox)",
    os: "alpine",
    category: "Archives",
    description: "Crée ou extrait des archives avec la version allégée BusyBox de tar.",
    syntax: "tar [options] <archive>",
    examples: [
      { cmd: "tar -czf backup.tar.gz /etc", desc: "Crée une archive compressée" },
      { cmd: "tar -xzf backup.tar.gz -C /restore", desc: "Extrait vers un dossier précis" }
    ],
    flags: ["-c", "-x", "-z", "-f", "-C (destination)"]
  },
  {
    name: "apk cache",
    os: "alpine",
    category: "Paquets",
    description: "Gère le cache local des paquets téléchargés (utile en mode lbu/diskless).",
    syntax: "apk cache <action>",
    examples: [
      { cmd: "apk cache download", desc: "Télécharge les paquets installés dans le cache" },
      { cmd: "apk cache clean", desc: "Nettoie le cache des paquets obsolètes" }
    ],
    flags: ["download", "clean", "sync"]
  },
  {
    name: "df -h (Alpine)",
    os: "alpine",
    category: "Système",
    description: "Affiche l'espace disque, particulièrement utile en mode diskless pour surveiller le tmpfs.",
    syntax: "df -h",
    examples: [
      { cmd: "df -h", desc: "Espace disque lisible, y compris le tmpfs en RAM" }
    ],
    flags: ["-h"]
  },
  {
    name: "openrc",
    os: "alpine",
    category: "Système",
    description: "Déclenche manuellement un runlevel OpenRC complet (démarrage des services associés).",
    syntax: "openrc <runlevel>",
    examples: [
      { cmd: "openrc default", desc: "Démarre tous les services du runlevel default" },
      { cmd: "openrc boot", desc: "Exécute les services du runlevel boot" }
    ],
    flags: []
  },
  {
    name: "apk verify",
    os: "alpine",
    category: "Permissions",
    description: "Vérifie l'intégrité des paquets installés (checksums) pour détecter une corruption ou altération.",
    syntax: "apk verify [paquet]",
    examples: [
      { cmd: "apk verify", desc: "Vérifie tous les paquets installés" },
      { cmd: "apk verify nginx", desc: "Vérifie un paquet précis" }
    ],
    flags: []
  },
  {
    name: "hostname (Alpine)",
    os: "alpine",
    category: "Système",
    description: "Affiche ou définit le nom d'hôte de la machine.",
    syntax: "hostname [nouveau_nom]",
    examples: [
      { cmd: "hostname", desc: "Affiche le hostname actuel" },
      { cmd: "echo \"srv-alpine01\" > /etc/hostname && hostname -F /etc/hostname", desc: "Change le hostname de façon persistante" }
    ],
    flags: ["-F (charger depuis un fichier)"]
  },
  {
    name: "sysctl (Alpine)",
    os: "alpine",
    category: "Système",
    description: "Affiche ou modifie les paramètres noyau à chaud (réseau, mémoire, sécurité).",
    syntax: "sysctl [-w] <clé>=<valeur>",
    examples: [
      { cmd: "sysctl net.ipv4.ip_forward", desc: "Vérifie si le forwarding IP est actif" },
      { cmd: "sysctl -w net.ipv4.ip_forward=1", desc: "Active le forwarding IP temporairement" }
    ],
    flags: ["-w (write/modifier)", "-a (tout afficher)"]
  },
  {
    name: "mount / umount (Alpine)",
    os: "alpine",
    category: "Système",
    description: "Monte ou démonte un système de fichiers, particulièrement important en mode diskless Alpine.",
    syntax: "mount <device> <point_de_montage> ; umount <point_de_montage>",
    examples: [
      { cmd: "mount /dev/sda1 /mnt", desc: "Monte une partition" },
      { cmd: "umount /mnt", desc: "Démonte proprement" }
    ],
    flags: ["-o (options de montage)", "-t (type de FS)"]
  },
  {
    name: "swapon / swapoff",
    os: "alpine",
    category: "Système",
    description: "Active ou désactive une partition/fichier swap.",
    syntax: "swapon <fichier|device> ; swapoff <fichier|device>",
    examples: [
      { cmd: "dd if=/dev/zero of=/swapfile bs=1M count=512 && swapon /swapfile", desc: "Crée et active un swapfile" },
      { cmd: "swapon -s", desc: "Affiche le swap actif" }
    ],
    flags: ["-s (résumé)"]
  },
  {
    name: "vi (Alpine)",
    os: "alpine",
    category: "Fichiers",
    description: "Édite un fichier texte via l'éditeur vi intégré à BusyBox (vim complet absent par défaut sur Alpine).",
    syntax: "vi <fichier>",
    examples: [
      { cmd: "vi /etc/network/interfaces", desc: "Édite la config réseau" },
      { cmd: "apk add vim", desc: "Installe vim complet si besoin de plus de fonctionnalités" }
    ],
    flags: ["i (insertion)", ":wq (sauver et quitter)", ":q! (quitter sans sauver)"]
  },

  // ── ARCH LINUX ────────────────────────────────────────────
  {
    name: "pacman -Syu",
    os: "arch",
    category: "Paquets",
    description: "Met à jour l'ensemble du système Arch Linux.",
    syntax: "sudo pacman -Syu",
    examples: [
      { cmd: "sudo pacman -Syu", desc: "Mise à jour complète du système" }
    ],
    flags: ["-S (sync)", "-y (refresh)", "-u (upgrade)"]
  },
  {
    name: "pacman -S",
    os: "arch",
    category: "Paquets",
    description: "Installe un paquet depuis les dépôts officiels Arch.",
    syntax: "sudo pacman -S <paquet>",
    examples: [
      { cmd: "sudo pacman -S git", desc: "Installe git" },
      { cmd: "sudo pacman -S --noconfirm vim", desc: "Sans confirmation" }
    ],
    flags: ["--noconfirm", "--needed (ne réinstalle pas)"]
  },
  {
    name: "pacman -R",
    os: "arch",
    category: "Paquets",
    description: "Supprime un paquet et ses dépendances orphelines.",
    syntax: "sudo pacman -R <paquet>",
    examples: [
      { cmd: "sudo pacman -Rs vim", desc: "Supprime vim + dépendances orphelines" }
    ],
    flags: ["-R (remove)", "-s (dépendances)", "-n (config)"]
  },
  {
    name: "pacman -Q",
    os: "arch",
    category: "Paquets",
    description: "Interroge la base de données locale des paquets installés.",
    syntax: "pacman -Q [options] [paquet]",
    examples: [
      { cmd: "pacman -Q", desc: "Liste tous les paquets installés" },
      { cmd: "pacman -Qi vim", desc: "Informations détaillées sur vim" }
    ],
    flags: ["-s (search)", "-i (info)", "-l (list files)"]
  },
  {
    name: "pacman -Ss",
    os: "arch",
    category: "Paquets",
    description: "Recherche un paquet dans les dépôts Arch.",
    syntax: "pacman -Ss <motif>",
    examples: [
      { cmd: "pacman -Ss nginx", desc: "Cherche nginx dans les dépôts" }
    ],
    flags: []
  },
  {
    name: "yay -S",
    os: "arch",
    category: "Paquets",
    description: "Installe un paquet depuis l'AUR via yay.",
    syntax: "yay -S <paquet-aur>",
    examples: [
      { cmd: "yay -S google-chrome", desc: "Installe Chrome depuis l'AUR" },
      { cmd: "yay -Syu", desc: "Met à jour paquets officiels + AUR" }
    ],
    flags: ["--noconfirm", "--devel"]
  },
  {
    name: "makepkg",
    os: "arch",
    category: "Paquets",
    description: "Compile et installe un paquet depuis un PKGBUILD.",
    syntax: "makepkg [options]",
    examples: [
      { cmd: "makepkg -si", desc: "Compile + installe avec les dépendances" }
    ],
    flags: ["-s (synchdeps)", "-i (install)", "-c (clean)"]
  },
  {
    name: "reflector",
    os: "arch",
    category: "Système",
    description: "Met à jour et optimise la liste des miroirs Arch Linux.",
    syntax: "reflector [options]",
    examples: [
      { cmd: "reflector --country France --sort rate --save /etc/pacman.d/mirrorlist", desc: "Miroirs France triés par vitesse" }
    ],
    flags: ["--country", "--sort (rate/age)", "--save"]
  },
  {
    name: "paccache",
    os: "arch",
    category: "Système",
    description: "Nettoie le cache de paquets pacman.",
    syntax: "paccache [options]",
    examples: [
      { cmd: "paccache -r", desc: "Garde les 3 dernières versions" },
      { cmd: "paccache -rk1", desc: "Ne garde qu'une version par paquet" }
    ],
    flags: ["-r (remove)", "-k (keep N versions)"]
  },
  {
    name: "systemctl (Arch)",
    os: "arch",
    category: "Services",
    description: "Gère les services systemd sur Arch Linux.",
    syntax: "systemctl <action> <service>",
    examples: [
      { cmd: "systemctl enable --now NetworkManager", desc: "Active + démarre NetworkManager" },
      { cmd: "systemctl list-units --type=service", desc: "Liste tous les services" }
    ],
    flags: ["enable / disable / start / stop / restart / status"]
  },
  {
    name: "arch-chroot",
    os: "arch",
    category: "Système",
    description: "Entre dans une installation Arch montée pour la réparer (chroot avancé).",
    syntax: "arch-chroot <point_de_montage> [commande]",
    examples: [
      { cmd: "arch-chroot /mnt", desc: "Entre en chroot dans le système monté" },
      { cmd: "arch-chroot /mnt pacman -Syu", desc: "Exécute une commande sans rester en chroot" }
    ],
    flags: []
  },
  {
    name: "pacman -Sy yay",
    os: "arch",
    category: "Paquets",
    description: "Installe l'AUR helper yay, indispensable pour accéder aux paquets communautaires AUR.",
    syntax: "git clone https://aur.archlinux.org/yay.git && cd yay && makepkg -si",
    examples: [
      { cmd: "git clone https://aur.archlinux.org/yay.git", desc: "Clone le dépôt yay" },
      { cmd: "cd yay && makepkg -si", desc: "Compile et installe yay" }
    ],
    flags: []
  },
  {
    name: "pacman -Qdt",
    os: "arch",
    category: "Paquets",
    description: "Liste les paquets orphelins (dépendances inutilisées) pour les nettoyer.",
    syntax: "pacman -Qdt",
    examples: [
      { cmd: "pacman -Qdt", desc: "Liste les paquets orphelins" },
      { cmd: "sudo pacman -Rns $(pacman -Qdtq)", desc: "Supprime tous les orphelins en une commande" }
    ],
    flags: ["-Qdt (orphelins)", "-Rns (suppression complète)"]
  },
  {
    name: "useradd (Arch)",
    os: "arch",
    category: "Utilisateurs",
    description: "Crée un utilisateur sur Arch Linux et l'ajoute au groupe wheel pour sudo.",
    syntax: "useradd -m -G wheel -s /bin/bash <user>",
    examples: [
      { cmd: "useradd -m -G wheel -s /bin/bash tom", desc: "Crée un utilisateur avec accès sudo via wheel" },
      { cmd: "passwd tom", desc: "Définit son mot de passe" }
    ],
    flags: ["-m (home)", "-G wheel (groupe sudo)", "-s (shell)"]
  },
  {
    name: "ip / iwctl",
    os: "arch",
    category: "Réseau",
    description: "Configure le réseau filaire (ip) ou Wi-Fi (iwctl, via iwd) sur Arch.",
    syntax: "ip addr / iwctl",
    examples: [
      { cmd: "ip addr show", desc: "Affiche les interfaces réseau" },
      { cmd: "iwctl station wlan0 connect MonWifi", desc: "Connecte le Wi-Fi via iwd" }
    ],
    flags: []
  },
  {
    name: "ufw / iptables (Arch)",
    os: "arch",
    category: "Réseau",
    description: "Configure le pare-feu sur Arch Linux, via ufw (simplifié) ou iptables (manuel).",
    syntax: "sudo ufw enable | sudo iptables -A INPUT ...",
    examples: [
      { cmd: "sudo ufw allow 22/tcp", desc: "Autorise le port SSH" },
      { cmd: "sudo ufw enable", desc: "Active le pare-feu" }
    ],
    flags: ["allow", "deny", "enable", "status"]
  },
  {
    name: "journalctl (Arch)",
    os: "arch",
    category: "Système",
    description: "Consulte les journaux systemd, identique à Debian/RHEL car Arch utilise systemd.",
    syntax: "journalctl [options]",
    examples: [
      { cmd: "journalctl -b", desc: "Logs depuis le dernier démarrage" },
      { cmd: "journalctl -u sshd -f", desc: "Suit les logs du service sshd en direct" }
    ],
    flags: ["-b (boot)", "-u (unit)", "-f (suivre)", "-p err (erreurs seulement)"]
  },
  {
    name: "timeshift",
    os: "arch",
    category: "Système",
    description: "Crée des snapshots du système pour pouvoir revenir en arrière après une mise à jour cassée.",
    syntax: "sudo timeshift --create | --restore",
    examples: [
      { cmd: "sudo timeshift --create --comments \"avant maj\"", desc: "Crée un snapshot" },
      { cmd: "sudo timeshift --restore", desc: "Restaure un snapshot" }
    ],
    flags: ["--create", "--restore", "--list"]
  },
  {
    name: "pacman -U",
    os: "arch",
    category: "Paquets",
    description: "Installe un paquet local (.pkg.tar.zst) sans passer par les dépôts.",
    syntax: "sudo pacman -U <fichier.pkg.tar.zst>",
    examples: [
      { cmd: "sudo pacman -U paquet-1.0-1-x86_64.pkg.tar.zst", desc: "Installe un paquet local" }
    ],
    flags: ["-U (upgrade/install local)"]
  },
  {
    name: "btrfs subvolume",
    os: "arch",
    category: "Système",
    description: "Gère les sous-volumes Btrfs, souvent utilisés sur Arch pour faciliter les snapshots.",
    syntax: "btrfs subvolume <action> <chemin>",
    examples: [
      { cmd: "btrfs subvolume list /", desc: "Liste les sous-volumes" },
      { cmd: "btrfs subvolume snapshot / /.snapshots/avant-maj", desc: "Crée un snapshot du sous-volume racine" }
    ],
    flags: ["list", "create", "snapshot", "delete"]
  },
  {
    name: "mkinitcpio",
    os: "arch",
    category: "Système",
    description: "Régénère l'image initramfs, nécessaire après un changement de noyau ou de pilotes.",
    syntax: "sudo mkinitcpio -P",
    examples: [
      { cmd: "sudo mkinitcpio -P", desc: "Régénère toutes les images initramfs présentes" }
    ],
    flags: ["-P (toutes les présets)", "-g (générer vers un fichier précis)"]
  },
  {
    name: "pacman -Sc / -Scc",
    os: "arch",
    category: "Paquets",
    description: "Nettoie le cache local des paquets téléchargés pour libérer de l'espace disque.",
    syntax: "sudo pacman -Sc | -Scc",
    examples: [
      { cmd: "sudo pacman -Sc", desc: "Supprime les versions obsolètes du cache" },
      { cmd: "sudo pacman -Scc", desc: "Vide complètement le cache (attention)" }
    ],
    flags: ["-Sc (partiel)", "-Scc (complet)"]
  },
  {
    name: "checkupdates",
    os: "arch",
    category: "Paquets",
    description: "Vérifie les mises à jour disponibles sans synchroniser ni modifier le système (safe check).",
    syntax: "checkupdates",
    examples: [
      { cmd: "checkupdates", desc: "Liste les paquets ayant une mise à jour disponible" }
    ],
    flags: []
  },
  {
    name: "pkgfile",
    os: "arch",
    category: "Paquets",
    description: "Recherche quel paquet fournit un fichier ou une commande précise.",
    syntax: "pkgfile <fichier>",
    examples: [
      { cmd: "pkgfile /usr/bin/htop", desc: "Trouve quel paquet fournit htop" },
      { cmd: "pkgfile -u", desc: "Met à jour la base de données pkgfile" }
    ],
    flags: ["-u (update)", "-l (lister le contenu d'un paquet)"]
  },
  {
    name: "systemd-analyze",
    os: "arch",
    category: "Système",
    description: "Analyse le temps de démarrage du système et identifie les services lents.",
    syntax: "systemd-analyze [blame]",
    examples: [
      { cmd: "systemd-analyze", desc: "Temps de démarrage total" },
      { cmd: "systemd-analyze blame", desc: "Classe les services par temps de démarrage" }
    ],
    flags: ["blame", "critical-chain"]
  },
  {
    name: "lsblk (Arch)",
    os: "arch",
    category: "Système",
    description: "Liste les disques et partitions du système avec leur arborescence.",
    syntax: "lsblk [-f]",
    examples: [
      { cmd: "lsblk -f", desc: "Affiche aussi les systèmes de fichiers et UUID" }
    ],
    flags: ["-f (filesystem)"]
  },
  {
    name: "dmesg",
    os: "arch",
    category: "Système",
    description: "Affiche les messages du noyau, utile pour diagnostiquer du matériel ou des erreurs au démarrage.",
    syntax: "dmesg [options]",
    examples: [
      { cmd: "dmesg | tail -20", desc: "20 derniers messages noyau" },
      { cmd: "dmesg -T | grep -i error", desc: "Recherche les erreurs avec horodatage lisible" }
    ],
    flags: ["-T (timestamps lisibles)", "-w (suivre en direct)"]
  },
  {
    name: "blkid",
    os: "arch",
    category: "Système",
    description: "Affiche les UUID et types de système de fichiers des partitions (utile pour /etc/fstab).",
    syntax: "blkid [device]",
    examples: [
      { cmd: "blkid", desc: "Liste tous les périphériques avec leur UUID" },
      { cmd: "blkid /dev/sda1", desc: "Détails d'une partition précise" }
    ],
    flags: []
  },

  // ── RHEL / FEDORA ─────────────────────────────────────────
  {
    name: "dnf install",
    os: "rhel",
    category: "Paquets",
    description: "Installe un paquet sur RHEL, CentOS, Fedora via DNF.",
    syntax: "sudo dnf install <paquet>",
    examples: [
      { cmd: "sudo dnf install nginx", desc: "Installe nginx" },
      { cmd: "sudo dnf install -y git curl", desc: "Sans confirmation" }
    ],
    flags: ["-y (auto-confirmer)", "--downloadonly", "--nodocs"]
  },
  {
    name: "dnf update",
    os: "rhel",
    category: "Paquets",
    description: "Met à jour les paquets installés sur le système.",
    syntax: "sudo dnf update",
    examples: [
      { cmd: "sudo dnf update", desc: "Met à jour tout le système" },
      { cmd: "sudo dnf check-update", desc: "Liste les mises à jour disponibles" }
    ],
    flags: ["--security (patchs sécu seulement)"]
  },
  {
    name: "dnf remove",
    os: "rhel",
    category: "Paquets",
    description: "Supprime un paquet et ses dépendances devenues inutiles.",
    syntax: "sudo dnf remove <paquet>",
    examples: [
      { cmd: "sudo dnf remove nginx", desc: "Supprime nginx" },
      { cmd: "sudo dnf autoremove", desc: "Supprime les dépendances orphelines" }
    ],
    flags: ["-y", "autoremove"]
  },
  {
    name: "rpm -qa",
    os: "rhel",
    category: "Paquets",
    description: "Liste tous les paquets RPM installés sur le système.",
    syntax: "rpm -qa [motif]",
    examples: [
      { cmd: "rpm -qa | grep nginx", desc: "Filtre sur nginx" },
      { cmd: "rpm -qi nginx", desc: "Informations détaillées" }
    ],
    flags: ["-q (query)", "-a (all)", "-i (info)", "-V (verify)"]
  },
  {
    name: "firewall-cmd",
    os: "rhel",
    category: "Réseau",
    description: "Gère le pare-feu firewalld sur RHEL/Fedora.",
    syntax: "firewall-cmd [options]",
    examples: [
      { cmd: "firewall-cmd --permanent --add-service=http", desc: "Ouvre le port HTTP" },
      { cmd: "firewall-cmd --reload", desc: "Recharge les règles" }
    ],
    flags: ["--permanent", "--add-service / --remove-service", "--reload"]
  },
  {
    name: "sestatus",
    os: "rhel",
    category: "Système",
    description: "Affiche l'état de SELinux.",
    syntax: "sestatus",
    examples: [
      { cmd: "sestatus", desc: "Statut complet de SELinux" },
      { cmd: "getenforce", desc: "Mode actuel : Enforcing / Permissive" },
      { cmd: "setenforce 0", desc: "Passe en mode Permissive" }
    ],
    flags: []
  },
  {
    name: "dnf search",
    os: "rhel",
    category: "Paquets",
    description: "Recherche un paquet dans les dépôts DNF.",
    syntax: "dnf search <motif>",
    examples: [
      { cmd: "dnf search nginx", desc: "Cherche nginx" },
      { cmd: "dnf provides /usr/bin/curl", desc: "Quel paquet fournit curl" }
    ],
    flags: []
  },
  {
    name: "systemctl (RHEL)",
    os: "rhel",
    category: "Services",
    description: "Gère les services systemd sur RHEL/Fedora.",
    syntax: "systemctl <action> <service>",
    examples: [
      { cmd: "systemctl enable --now httpd", desc: "Active et démarre Apache" },
      { cmd: "systemctl list-units --failed", desc: "Services en échec" }
    ],
    flags: ["enable / disable / start / stop / restart / status"]
  },
  {
    name: "subscription-manager",
    os: "rhel",
    category: "Système",
    description: "Gère les abonnements Red Hat Enterprise Linux.",
    syntax: "subscription-manager <commande>",
    examples: [
      { cmd: "subscription-manager register", desc: "Enregistre le système" },
      { cmd: "subscription-manager attach --auto", desc: "Attache un abonnement" }
    ],
    flags: ["register / unregister / list / attach"]
  },
  {
    name: "yum",
    os: "rhel",
    category: "Paquets",
    description: "Ancien gestionnaire de paquets RHEL/CentOS 7, remplacé par DNF.",
    syntax: "yum <action> <paquet>",
    examples: [
      { cmd: "yum install httpd", desc: "Installe Apache (CentOS 7)" },
      { cmd: "yum list installed", desc: "Liste les paquets installés" }
    ],
    flags: ["-y", "install / remove / update / search"]
  },
  {
    name: "semanage",
    os: "rhel",
    category: "Permissions",
    description: "Configure les politiques SELinux (ports, contextes de fichiers, booléens).",
    syntax: "semanage <module> <action> [options]",
    examples: [
      { cmd: "semanage port -a -t http_port_t -p tcp 8080", desc: "Autorise SELinux sur le port 8080 pour HTTP" },
      { cmd: "semanage fcontext -a -t httpd_sys_content_t \"/web(/.*)?\"", desc: "Définit un contexte SELinux pour un dossier" }
    ],
    flags: ["port", "fcontext", "boolean", "-a (add)", "-l (list)"]
  },
  {
    name: "useradd / usermod (RHEL)",
    os: "rhel",
    category: "Utilisateurs",
    description: "Crée et configure un utilisateur, l'ajoute au groupe wheel pour sudo.",
    syntax: "useradd -m -G wheel <user> ; passwd <user>",
    examples: [
      { cmd: "useradd -m -G wheel tom", desc: "Crée un utilisateur avec accès sudo" },
      { cmd: "passwd tom", desc: "Définit le mot de passe" }
    ],
    flags: ["-m (home)", "-G wheel", "-s (shell)"]
  },
  {
    name: "nmcli",
    os: "rhel",
    category: "Réseau",
    description: "Configure le réseau en ligne de commande via NetworkManager.",
    syntax: "nmcli <objet> <action> [options]",
    examples: [
      { cmd: "nmcli device status", desc: "État des interfaces réseau" },
      { cmd: "nmcli connection add type ethernet ifname eth0 ip4 192.168.1.10/24", desc: "Configure une IP statique" }
    ],
    flags: ["device", "connection", "general"]
  },
  {
    name: "journalctl (RHEL)",
    os: "rhel",
    category: "Système",
    description: "Consulte les journaux systemd centralisés du système.",
    syntax: "journalctl [options]",
    examples: [
      { cmd: "journalctl -xe", desc: "Erreurs récentes avec contexte détaillé" },
      { cmd: "journalctl -u httpd --since today", desc: "Logs du service httpd depuis aujourd'hui" }
    ],
    flags: ["-xe", "-u (unit)", "--since", "-f (suivre)"]
  },
  {
    name: "tar (RHEL)",
    os: "rhel",
    category: "Archives",
    description: "Crée ou extrait des archives, identique sur RHEL via GNU tar.",
    syntax: "tar [options] <archive>",
    examples: [
      { cmd: "tar -cvzf etc-backup.tar.gz /etc", desc: "Sauvegarde /etc en archive compressée" },
      { cmd: "tar -tvf archive.tar.gz", desc: "Liste le contenu sans extraire" }
    ],
    flags: ["-c", "-x", "-t (lister)", "-z (gzip)", "-v (verbose)"]
  },
  {
    name: "ansible (sur RHEL)",
    os: "rhel",
    category: "Conteneurs",
    description: "Installe et configure Ansible pour automatiser la gestion de plusieurs serveurs RHEL.",
    syntax: "sudo dnf install ansible-core",
    examples: [
      { cmd: "sudo dnf install ansible-core", desc: "Installe Ansible Core" },
      { cmd: "ansible all -m ping", desc: "Vérifie la connectivité avec l'inventaire" }
    ],
    flags: []
  },
  {
    name: "rpm -ivh / -Uvh",
    os: "rhel",
    category: "Paquets",
    description: "Installe ou met à jour un paquet RPM local directement, sans gestionnaire de dépendances.",
    syntax: "rpm -ivh <fichier.rpm> | rpm -Uvh <fichier.rpm>",
    examples: [
      { cmd: "rpm -ivh paquet.rpm", desc: "Installe un nouveau paquet RPM" },
      { cmd: "rpm -Uvh paquet.rpm", desc: "Met à jour un paquet déjà installé" }
    ],
    flags: ["-i (install)", "-U (upgrade)", "-v (verbose)", "-h (hash progress)"]
  },
  {
    name: "lvextend / xfs_growfs",
    os: "rhel",
    category: "Système",
    description: "Agrandit un volume logique LVM puis étend le système de fichiers XFS dessus.",
    syntax: "lvextend -L +<taille> <volume> ; xfs_growfs <point_de_montage>",
    examples: [
      { cmd: "lvextend -L +10G /dev/mapper/rhel-root", desc: "Agrandit le volume logique de 10 Go" },
      { cmd: "xfs_growfs /", desc: "Étend le système de fichiers XFS pour utiliser l'espace ajouté" }
    ],
    flags: ["-L (taille)", "-r (resize automatique avec lvresize)"]
  },
  {
    name: "timedatectl",
    os: "rhel",
    category: "Système",
    description: "Configure la date, l'heure et le fuseau horaire du système via systemd.",
    syntax: "timedatectl <action>",
    examples: [
      { cmd: "timedatectl status", desc: "Affiche la configuration actuelle" },
      { cmd: "timedatectl set-timezone Europe/Paris", desc: "Change le fuseau horaire" }
    ],
    flags: ["status", "set-timezone", "set-ntp"]
  },
  {
    name: "podman",
    os: "rhel",
    category: "Conteneurs",
    description: "Gère des conteneurs sans démon, alternative native à Docker sur RHEL/Fedora.",
    syntax: "podman <commande>",
    examples: [
      { cmd: "podman run -d -p 8080:80 nginx", desc: "Lance un conteneur nginx" },
      { cmd: "podman ps", desc: "Liste les conteneurs actifs" }
    ],
    flags: ["run", "ps", "stop", "rm", "-d (détaché)"]
  },
  {
    name: "ausearch",
    os: "rhel",
    category: "Permissions",
    description: "Recherche dans les journaux d'audit du noyau, utile pour diagnostiquer des refus SELinux.",
    syntax: "ausearch -m avc -ts recent",
    examples: [
      { cmd: "ausearch -m avc -ts recent", desc: "Cherche les refus SELinux récents" },
      { cmd: "ausearch -m avc -ts today | audit2allow", desc: "Génère une règle pour autoriser l'action refusée" }
    ],
    flags: ["-m avc (refus SELinux)", "-ts (depuis quand)"]
  },
  {
    name: "getenforce / setenforce",
    os: "rhel",
    category: "Permissions",
    description: "Vérifie ou change le mode SELinux (Enforcing, Permissive, Disabled).",
    syntax: "getenforce | setenforce <0|1>",
    examples: [
      { cmd: "getenforce", desc: "Affiche le mode SELinux actuel" },
      { cmd: "setenforce 0", desc: "Passe en mode Permissive temporairement" }
    ],
    flags: ["0 (Permissive)", "1 (Enforcing)"]
  },
  {
    name: "restorecon",
    os: "rhel",
    category: "Permissions",
    description: "Restaure le contexte SELinux par défaut d'un fichier ou dossier après une modification.",
    syntax: "restorecon -Rv <chemin>",
    examples: [
      { cmd: "restorecon -Rv /var/www/html", desc: "Corrige les contextes SELinux récursivement" }
    ],
    flags: ["-R (récursif)", "-v (verbose)"]
  },
  {
    name: "lsof (RHEL)",
    os: "rhel",
    category: "Processus",
    description: "Liste les fichiers ouverts et sockets réseau utilisés par les processus.",
    syntax: "lsof [options]",
    examples: [
      { cmd: "sudo lsof -i :443", desc: "Trouve quel processus écoute sur le port 443" }
    ],
    flags: ["-i (réseau)", "-u (utilisateur)"]
  },
  {
    name: "parted",
    os: "rhel",
    category: "Système",
    description: "Crée et redimensionne des partitions de disque en ligne de commande.",
    syntax: "parted <device>",
    examples: [
      { cmd: "sudo parted /dev/sdb print", desc: "Affiche la table de partitions" },
      { cmd: "sudo parted /dev/sdb mkpart primary ext4 0% 100%", desc: "Crée une partition occupant tout le disque" }
    ],
    flags: ["print", "mkpart", "resizepart"]
  },
  {
    name: "vgcreate / lvcreate",
    os: "rhel",
    category: "Système",
    description: "Crée un groupe de volumes (VG) puis un volume logique (LV) avec LVM.",
    syntax: "vgcreate <vg> <device> ; lvcreate -L <taille> -n <nom> <vg>",
    examples: [
      { cmd: "sudo vgcreate vg_data /dev/sdb", desc: "Crée un groupe de volumes" },
      { cmd: "sudo lvcreate -L 50G -n lv_data vg_data", desc: "Crée un volume logique de 50 Go" }
    ],
    flags: ["-L (taille)", "-n (nom du volume)"]
  },
  {
    name: "realm join",
    os: "rhel",
    category: "Utilisateurs",
    description: "Joint le serveur RHEL à un domaine Active Directory pour l'authentification centralisée.",
    syntax: "realm join <domaine>",
    examples: [
      { cmd: "realm join nexa.local -U administrateur", desc: "Joint le serveur au domaine AD" },
      { cmd: "realm list", desc: "Affiche les domaines joints" }
    ],
    flags: ["-U (utilisateur admin du domaine)"]
  },
  {
    name: "chkconfig",
    os: "rhel",
    category: "Services",
    description: "Gère les services au démarrage sur les anciens niveaux d'exécution (legacy, avant systemd pur).",
    syntax: "chkconfig <service> <on|off>",
    examples: [
      { cmd: "chkconfig --list", desc: "Liste les services et leur état par niveau" },
      { cmd: "chkconfig httpd on", desc: "Active httpd au démarrage" }
    ],
    flags: ["--list", "on", "off"]
  },

  // ── FREEBSD ───────────────────────────────────────────────
  {
    name: "pkg install",
    os: "freebsd",
    category: "Paquets",
    description: "Installe un paquet binaire sur FreeBSD.",
    syntax: "pkg install <paquet>",
    examples: [
      { cmd: "pkg install nginx", desc: "Installe nginx" },
      { cmd: "pkg install -y curl wget", desc: "Sans confirmation" }
    ],
    flags: ["-y (auto-confirmer)", "-q (silencieux)"]
  },
  {
    name: "pkg update",
    os: "freebsd",
    category: "Paquets",
    description: "Met à jour le catalogue des paquets FreeBSD.",
    syntax: "pkg update",
    examples: [
      { cmd: "pkg update", desc: "Met à jour l'index" },
      { cmd: "pkg upgrade", desc: "Met à jour tous les paquets installés" }
    ],
    flags: ["-f (forcer)"]
  },
  {
    name: "pkg delete",
    os: "freebsd",
    category: "Paquets",
    description: "Supprime un paquet installé sur FreeBSD.",
    syntax: "pkg delete <paquet>",
    examples: [
      { cmd: "pkg delete nginx", desc: "Supprime nginx" },
      { cmd: "pkg autoremove", desc: "Supprime les dépendances orphelines" }
    ],
    flags: ["-y", "-R (avec dépendances)"]
  },
  {
    name: "pkg info",
    os: "freebsd",
    category: "Paquets",
    description: "Affiche les informations sur les paquets installés.",
    syntax: "pkg info [paquet]",
    examples: [
      { cmd: "pkg info", desc: "Liste tous les paquets installés" },
      { cmd: "pkg info -l nginx", desc: "Liste les fichiers de nginx" }
    ],
    flags: ["-l (fichiers)", "-d (dépendances)"]
  },
  {
    name: "service",
    os: "freebsd",
    category: "Services",
    description: "Gère les services RC sur FreeBSD.",
    syntax: "service <service> <action>",
    examples: [
      { cmd: "service nginx start", desc: "Démarre nginx" },
      { cmd: "service sshd status", desc: "Statut de sshd" }
    ],
    flags: ["start / stop / restart / status / reload"]
  },
  {
    name: "sysctl",
    os: "freebsd",
    category: "Système",
    description: "Lit et modifie les paramètres du noyau FreeBSD.",
    syntax: "sysctl [nom] [=valeur]",
    examples: [
      { cmd: "sysctl kern.version", desc: "Version du noyau" },
      { cmd: "sysctl net.inet.ip.forwarding=1", desc: "Active le routage IP" }
    ],
    flags: ["-a (tous)", "-w (écriture)"]
  },
  {
    name: "ifconfig (BSD)",
    os: "freebsd",
    category: "Réseau",
    description: "Configure et affiche les interfaces réseau sur FreeBSD.",
    syntax: "ifconfig [interface] [options]",
    examples: [
      { cmd: "ifconfig", desc: "Affiche toutes les interfaces" },
      { cmd: "ifconfig em0 inet 192.168.1.10/24", desc: "Assigne une IP statique" }
    ],
    flags: ["up / down", "inet (IPv4)", "inet6 (IPv6)"]
  },
  {
    name: "pfctl",
    os: "freebsd",
    category: "Réseau",
    description: "Contrôle le pare-feu PF de FreeBSD.",
    syntax: "pfctl [options]",
    examples: [
      { cmd: "pfctl -e", desc: "Active PF" },
      { cmd: "pfctl -f /etc/pf.conf", desc: "Charge les règles" },
      { cmd: "pfctl -s rules", desc: "Affiche les règles actives" }
    ],
    flags: ["-e (enable)", "-d (disable)", "-f (fichier)", "-s (show)"]
  },
  {
    name: "portsnap",
    os: "freebsd",
    category: "Paquets",
    description: "Met à jour l'arbre des ports FreeBSD.",
    syntax: "portsnap <action>",
    examples: [
      { cmd: "portsnap fetch update", desc: "Met à jour l'arbre des ports" }
    ],
    flags: ["fetch / extract / update"]
  },
  {
    name: "bsdinstall",
    os: "freebsd",
    category: "Système",
    description: "Assistant d'installation et de configuration de FreeBSD.",
    syntax: "bsdinstall [composant]",
    examples: [
      { cmd: "bsdinstall netconfig", desc: "Configure uniquement le réseau" }
    ],
    flags: []
  },
  {
    name: "freebsd-update",
    os: "freebsd",
    category: "Système",
    description: "Télécharge et installe les mises à jour de sécurité du système de base FreeBSD.",
    syntax: "freebsd-update <commande>",
    examples: [
      { cmd: "freebsd-update fetch", desc: "Télécharge les mises à jour de sécurité" },
      { cmd: "freebsd-update install", desc: "Installe les mises à jour téléchargées" }
    ],
    flags: ["fetch", "install", "rollback", "-r (upgrade vers une version)"]
  },
  {
    name: "pw useradd",
    os: "freebsd",
    category: "Utilisateurs",
    description: "Crée un utilisateur système via l'outil natif pw de FreeBSD.",
    syntax: "pw useradd <user> -m -G wheel",
    examples: [
      { cmd: "pw useradd tom -m -G wheel -s /bin/sh", desc: "Crée un utilisateur avec home et accès wheel" },
      { cmd: "passwd tom", desc: "Définit le mot de passe" }
    ],
    flags: ["-m (home)", "-G (groupe)", "-s (shell)"]
  },
  {
    name: "zfs / zpool",
    os: "freebsd",
    category: "Système",
    description: "Gère les pools et systèmes de fichiers ZFS, natif et très utilisé sur FreeBSD.",
    syntax: "zpool <action> | zfs <action>",
    examples: [
      { cmd: "zpool status", desc: "État de santé des pools ZFS" },
      { cmd: "zfs snapshot zroot/data@avant-maj", desc: "Crée un snapshot instantané" },
      { cmd: "zfs list", desc: "Liste les systèmes de fichiers ZFS" }
    ],
    flags: ["status", "snapshot", "list", "rollback"]
  },
  {
    name: "jail / jexec",
    os: "freebsd",
    category: "Conteneurs",
    description: "Crée et administre des jails, le mécanisme natif d'isolation/conteneurisation de FreeBSD.",
    syntax: "jail -c <options> | jexec <jail> <commande>",
    examples: [
      { cmd: "jls", desc: "Liste les jails actives" },
      { cmd: "jexec web-jail sh", desc: "Ouvre un shell dans une jail" }
    ],
    flags: ["-c (créer)", "jls (lister)", "jexec (exécuter dedans)"]
  },
  {
    name: "newfs / mount",
    os: "freebsd",
    category: "Système",
    description: "Crée un système de fichiers UFS sur une partition puis le monte.",
    syntax: "newfs <device> ; mount <device> <point_de_montage>",
    examples: [
      { cmd: "newfs /dev/ada1p1", desc: "Formate une partition en UFS" },
      { cmd: "mount /dev/ada1p1 /mnt/data", desc: "Monte la partition" }
    ],
    flags: []
  },
  {
    name: "ports (make install)",
    os: "freebsd",
    category: "Paquets",
    description: "Compile et installe un logiciel depuis l'arborescence des Ports FreeBSD.",
    syntax: "cd /usr/ports/<catégorie>/<logiciel> && make install clean",
    examples: [
      { cmd: "cd /usr/ports/www/nginx && make install clean", desc: "Compile et installe nginx depuis les ports" },
      { cmd: "make config", desc: "Choisit les options de compilation avant install" }
    ],
    flags: ["install", "clean", "config"]
  },
  {
    name: "rc.conf (sysrc)",
    os: "freebsd",
    category: "Services",
    description: "Modifie le fichier /etc/rc.conf en ligne de commande pour activer des services au démarrage.",
    syntax: "sysrc <clé>=<valeur>",
    examples: [
      { cmd: "sysrc nginx_enable=\"YES\"", desc: "Active nginx au démarrage" },
      { cmd: "sysrc -a", desc: "Liste toutes les variables rc.conf" }
    ],
    flags: ["-a (lister tout)", "-x (supprimer une clé)"]
  },
  {
    name: "gpart",
    os: "freebsd",
    category: "Système",
    description: "Gère les tables de partitions (création, redimensionnement) sur FreeBSD.",
    syntax: "gpart <action> <device>",
    examples: [
      { cmd: "gpart show", desc: "Affiche les partitions existantes" },
      { cmd: "gpart create -s gpt ada1", desc: "Crée une table de partitions GPT" }
    ],
    flags: ["show", "create", "add", "delete"]
  },
  {
    name: "tcpdump (FreeBSD)",
    os: "freebsd",
    category: "Réseau",
    description: "Capture et analyse le trafic réseau en ligne de commande.",
    syntax: "tcpdump -i <interface> [filtre]",
    examples: [
      { cmd: "tcpdump -i em0", desc: "Capture tout le trafic sur l'interface em0" },
      { cmd: "tcpdump -i em0 port 80", desc: "Filtre uniquement le trafic HTTP" }
    ],
    flags: ["-i (interface)", "-n (pas de résolution DNS)", "-w (écrire dans un fichier)"]
  },
  {
    name: "tar (FreeBSD)",
    os: "freebsd",
    category: "Archives",
    description: "Crée ou extrait des archives via bsdtar, natif sur FreeBSD.",
    syntax: "tar [options] <archive>",
    examples: [
      { cmd: "tar -czvf backup.tar.gz /etc", desc: "Sauvegarde /etc en archive compressée" },
      { cmd: "tar -xzvf backup.tar.gz -C /restore", desc: "Extrait vers un dossier précis" }
    ],
    flags: ["-c", "-x", "-z", "-v", "-C"]
  },
  {
    name: "periodic",
    os: "freebsd",
    category: "Système",
    description: "Exécute les scripts de maintenance planifiés (quotidiens, hebdo, mensuels) de FreeBSD.",
    syntax: "periodic <daily|weekly|monthly>",
    examples: [
      { cmd: "periodic daily", desc: "Lance manuellement les tâches de maintenance quotidiennes" },
      { cmd: "periodic security", desc: "Lance les vérifications de sécurité" }
    ],
    flags: ["daily", "weekly", "monthly", "security"]
  },
  {
    name: "top (FreeBSD)",
    os: "freebsd",
    category: "Processus",
    description: "Affiche en temps réel les processus et l'utilisation des ressources système.",
    syntax: "top [options]",
    examples: [
      { cmd: "top", desc: "Vue temps réel des processus" },
      { cmd: "top -o cpu", desc: "Trie par utilisation CPU" }
    ],
    flags: ["-o (tri : cpu/res/...)"]
  },
  {
    name: "vmstat",
    os: "freebsd",
    category: "Système",
    description: "Affiche des statistiques sur la mémoire virtuelle, les processus et l'activité CPU.",
    syntax: "vmstat [intervalle]",
    examples: [
      { cmd: "vmstat 2", desc: "Statistiques actualisées toutes les 2 secondes" }
    ],
    flags: []
  },
  {
    name: "netstat (FreeBSD)",
    os: "freebsd",
    category: "Réseau",
    description: "Affiche les connexions réseau actives, les tables de routage et les statistiques d'interfaces.",
    syntax: "netstat [options]",
    examples: [
      { cmd: "netstat -an", desc: "Toutes les connexions, format numérique" },
      { cmd: "netstat -r", desc: "Affiche la table de routage" }
    ],
    flags: ["-a (toutes)", "-n (numérique)", "-r (routage)"]
  },
  {
    name: "ipfw",
    os: "freebsd",
    category: "Réseau",
    description: "Configure le pare-feu IPFW, alternative à PF historiquement utilisée sur FreeBSD.",
    syntax: "ipfw add <règle>",
    examples: [
      { cmd: "ipfw add allow tcp from any to any 22", desc: "Autorise le port 22" },
      { cmd: "ipfw list", desc: "Liste les règles actives" }
    ],
    flags: ["add", "delete", "list"]
  },
  {
    name: "pkg audit",
    os: "freebsd",
    category: "Permissions",
    description: "Vérifie les paquets installés contre une base de données de vulnérabilités connues.",
    syntax: "pkg audit -F",
    examples: [
      { cmd: "pkg audit -F", desc: "Met à jour la base et vérifie les vulnérabilités" }
    ],
    flags: ["-F (fetch, mettre à jour la base avant)"]
  },
  {
    name: "bectl",
    os: "freebsd",
    category: "Système",
    description: "Gère les environnements d'amorçage (boot environments) ZFS, pour revenir en arrière après une mise à jour.",
    syntax: "bectl <action> [nom]",
    examples: [
      { cmd: "bectl create avant-maj", desc: "Crée un environnement de boot avant une mise à jour" },
      { cmd: "bectl list", desc: "Liste les environnements disponibles" },
      { cmd: "bectl activate avant-maj", desc: "Bascule sur cet environnement au prochain démarrage" }
    ],
    flags: ["create", "list", "activate", "destroy"]
  },
  {
    name: "kldload / kldstat",
    os: "freebsd",
    category: "Système",
    description: "Charge un module noyau ou liste les modules actuellement chargés.",
    syntax: "kldload <module> ; kldstat",
    examples: [
      { cmd: "kldload if_wg", desc: "Charge un module noyau (ex: WireGuard)" },
      { cmd: "kldstat", desc: "Liste les modules noyau chargés" }
    ],
    flags: []
  },

  // ── macOS ─────────────────────────────────────────────────
  {
    name: "brew install",
    os: "macos",
    category: "Paquets",
    description: "Installe un paquet via Homebrew.",
    syntax: "brew install <paquet>",
    examples: [
      { cmd: "brew install git", desc: "Installe git" },
      { cmd: "brew install --cask firefox", desc: "Installe une application GUI" }
    ],
    flags: ["--cask (applications GUI)", "--force"]
  },
  {
    name: "brew update",
    os: "macos",
    category: "Paquets",
    description: "Met à jour Homebrew et la liste des formules.",
    syntax: "brew update",
    examples: [
      { cmd: "brew update", desc: "Met à jour Homebrew" },
      { cmd: "brew upgrade", desc: "Met à jour tous les paquets" }
    ],
    flags: []
  },
  {
    name: "brew uninstall",
    os: "macos",
    category: "Paquets",
    description: "Désinstalle un paquet Homebrew.",
    syntax: "brew uninstall <paquet>",
    examples: [
      { cmd: "brew uninstall git", desc: "Désinstalle git" },
      { cmd: "brew cleanup", desc: "Supprime les anciennes versions" }
    ],
    flags: ["--cask", "cleanup"]
  },
  {
    name: "launchctl",
    os: "macos",
    category: "Services",
    description: "Gère les services launchd (équivalent systemctl sur macOS).",
    syntax: "launchctl <sous-commande>",
    examples: [
      { cmd: "launchctl list", desc: "Liste les services actifs" },
      { cmd: "brew services start nginx", desc: "Méthode recommandée via brew" }
    ],
    flags: ["load / unload / start / stop / list"]
  },
  {
    name: "defaults write",
    os: "macos",
    category: "Système",
    description: "Modifie les préférences système macOS.",
    syntax: "defaults write <domaine> <clé> <valeur>",
    examples: [
      { cmd: "defaults write com.apple.dock autohide -bool true", desc: "Masque le Dock" },
      { cmd: "defaults read com.apple.finder", desc: "Lit les préférences du Finder" }
    ],
    flags: ["write / read / delete"]
  },
  {
    name: "networksetup",
    os: "macos",
    category: "Réseau",
    description: "Configure les paramètres réseau depuis le terminal macOS.",
    syntax: "networksetup <sous-commande>",
    examples: [
      { cmd: "networksetup -listallnetworkservices", desc: "Liste les interfaces" },
      { cmd: "networksetup -setdnsservers Wi-Fi 1.1.1.1", desc: "Définit les DNS" }
    ],
    flags: []
  },
  {
    name: "softwareupdate",
    os: "macos",
    category: "Système",
    description: "Gère les mises à jour macOS depuis le terminal.",
    syntax: "softwareupdate [options]",
    examples: [
      { cmd: "softwareupdate -l", desc: "Liste les mises à jour disponibles" },
      { cmd: "softwareupdate -ia", desc: "Installe toutes les mises à jour" }
    ],
    flags: ["-l (list)", "-i (install)", "-a (all)"]
  },
  {
    name: "diskutil",
    os: "macos",
    category: "Système",
    description: "Gère les disques et volumes sur macOS.",
    syntax: "diskutil <commande>",
    examples: [
      { cmd: "diskutil list", desc: "Liste tous les disques" },
      { cmd: "diskutil unmountDisk /dev/disk2", desc: "Démonte un disque externe" }
    ],
    flags: ["list / info / mount / unmount / eject"]
  },
  {
    name: "brew info",
    os: "macos",
    category: "Paquets",
    description: "Affiche les informations sur un paquet Homebrew.",
    syntax: "brew info <paquet>",
    examples: [
      { cmd: "brew info node", desc: "Infos sur node" },
      { cmd: "brew list", desc: "Liste tous les paquets installés" }
    ],
    flags: []
  },
  {
    name: "osascript",
    os: "macos",
    category: "Système",
    description: "Exécute des scripts AppleScript depuis le terminal.",
    syntax: "osascript -e '<script>'",
    examples: [
      { cmd: "osascript -e 'display notification \"OK\" with title \"CI\"'", desc: "Affiche une notification" },
      { cmd: "osascript -e 'set volume output volume 50'", desc: "Règle le volume à 50%" }
    ],
    flags: ["-e (expression inline)", "-l (langage)"]
  },
  {
    name: "brew cask / brew --cask",
    os: "macos",
    category: "Paquets",
    description: "Installe des applications graphiques complètes via Homebrew Cask.",
    syntax: "brew install --cask <app>",
    examples: [
      { cmd: "brew install --cask firefox", desc: "Installe Firefox" },
      { cmd: "brew list --cask", desc: "Liste les applications cask installées" }
    ],
    flags: ["--cask"]
  },
  {
    name: "dscl",
    os: "macos",
    category: "Utilisateurs",
    description: "Gère les utilisateurs et groupes via Directory Service (équivalent useradd sur macOS).",
    syntax: "dscl . -create /Users/<user>",
    examples: [
      { cmd: "dscl . -list /Users", desc: "Liste tous les utilisateurs" },
      { cmd: "dscl . -create /Users/tom", desc: "Crée un nouvel utilisateur" }
    ],
    flags: ["-create", "-list", "-delete"]
  },
  {
    name: "ifconfig (macOS)",
    os: "macos",
    category: "Réseau",
    description: "Affiche ou configure les interfaces réseau sur macOS.",
    syntax: "ifconfig [interface]",
    examples: [
      { cmd: "ifconfig en0", desc: "Détails de l'interface Wi-Fi/Ethernet principale" },
      { cmd: "ifconfig", desc: "Liste toutes les interfaces" }
    ],
    flags: []
  },
  {
    name: "pfctl (macOS)",
    os: "macos",
    category: "Réseau",
    description: "Contrôle le pare-feu PF intégré à macOS (basé sur BSD).",
    syntax: "sudo pfctl -e | -f <fichier>",
    examples: [
      { cmd: "sudo pfctl -e", desc: "Active le pare-feu PF" },
      { cmd: "sudo pfctl -f /etc/pf.conf", desc: "Charge les règles depuis pf.conf" }
    ],
    flags: ["-e (enable)", "-d (disable)", "-f (charger fichier)"]
  },
  {
    name: "tar (macOS)",
    os: "macos",
    category: "Archives",
    description: "Crée ou extrait des archives via bsdtar, présent nativement sur macOS.",
    syntax: "tar [options] <archive>",
    examples: [
      { cmd: "tar -czvf backup.tar.gz ~/Documents", desc: "Archive un dossier" },
      { cmd: "tar -xzvf backup.tar.gz", desc: "Extrait une archive" }
    ],
    flags: ["-c", "-x", "-z", "-v"]
  },
  {
    name: "ps / top (macOS)",
    os: "macos",
    category: "Processus",
    description: "Liste ou surveille en temps réel les processus en cours sur macOS.",
    syntax: "ps aux | top",
    examples: [
      { cmd: "ps aux | grep Safari", desc: "Cherche les processus Safari" },
      { cmd: "top -o cpu", desc: "Trie les processus par usage CPU en temps réel" }
    ],
    flags: ["-o cpu/mem (tri)", "aux (détails complets)"]
  },
  {
    name: "launchctl load/unload",
    os: "macos",
    category: "Services",
    description: "Charge ou décharge des daemons/agents lancés au démarrage (fichiers .plist).",
    syntax: "launchctl load|unload <fichier.plist>",
    examples: [
      { cmd: "launchctl load /Library/LaunchDaemons/com.app.plist", desc: "Active un daemon au démarrage" },
      { cmd: "launchctl unload /Library/LaunchDaemons/com.app.plist", desc: "Désactive un daemon" }
    ],
    flags: ["load", "unload", "list"]
  },
  {
    name: "spctl",
    os: "macos",
    category: "Permissions",
    description: "Gère Gatekeeper, la protection macOS contre les applications non signées/non identifiées.",
    syntax: "sudo spctl --master-disable | --add <app>",
    examples: [
      { cmd: "sudo spctl --master-disable", desc: "Désactive Gatekeeper (déconseillé en prod)" },
      { cmd: "spctl --status", desc: "Vérifie si Gatekeeper est actif" }
    ],
    flags: ["--master-disable", "--status", "--add"]
  },
  {
    name: "tmutil",
    os: "macos",
    category: "Archives",
    description: "Contrôle Time Machine en ligne de commande pour les sauvegardes.",
    syntax: "tmutil <action>",
    examples: [
      { cmd: "tmutil startbackup", desc: "Lance une sauvegarde Time Machine" },
      { cmd: "tmutil listbackups", desc: "Liste les sauvegardes disponibles" }
    ],
    flags: ["startbackup", "listbackups", "restore"]
  },
  {
    name: "scutil",
    os: "macos",
    category: "Réseau",
    description: "Configure les paramètres système réseau bas niveau (DNS, hostname, proxy).",
    syntax: "scutil --<action>",
    examples: [
      { cmd: "scutil --dns", desc: "Affiche la configuration DNS actuelle" },
      { cmd: "sudo scutil --set HostName monmac.local", desc: "Change le hostname" }
    ],
    flags: ["--dns", "--set", "--get"]
  },
  {
    name: "system_profiler",
    os: "macos",
    category: "Système",
    description: "Affiche des informations détaillées sur le matériel et les logiciels installés.",
    syntax: "system_profiler <type_de_données>",
    examples: [
      { cmd: "system_profiler SPHardwareDataType", desc: "Infos matérielles (CPU, RAM, modèle)" },
      { cmd: "system_profiler SPApplicationsDataType", desc: "Liste les applications installées" }
    ],
    flags: []
  },
  {
    name: "sw_vers",
    os: "macos",
    category: "Système",
    description: "Affiche la version de macOS installée et le build correspondant.",
    syntax: "sw_vers",
    examples: [
      { cmd: "sw_vers", desc: "Affiche nom, version et build de macOS" },
      { cmd: "sw_vers -productVersion", desc: "Affiche uniquement le numéro de version" }
    ],
    flags: ["-productVersion", "-buildVersion"]
  },
  {
    name: "pmset",
    os: "macos",
    category: "Système",
    description: "Configure les réglages d'alimentation et de veille de la machine.",
    syntax: "pmset -<g|a> <option> <valeur>",
    examples: [
      { cmd: "pmset -g", desc: "Affiche les réglages d'alimentation actuels" },
      { cmd: "sudo pmset -a sleep 0", desc: "Désactive la mise en veille automatique" }
    ],
    flags: ["-g (afficher)", "-a (tous les modes)"]
  },
  {
    name: "lsof (macOS)",
    os: "macos",
    category: "Processus",
    description: "Liste les fichiers ouverts et sockets réseau utilisés par les processus.",
    syntax: "lsof [options]",
    examples: [
      { cmd: "sudo lsof -i :3000", desc: "Trouve quel processus écoute sur le port 3000" },
      { cmd: "lsof -p 1234", desc: "Fichiers ouverts par un PID précis" }
    ],
    flags: ["-i (réseau)", "-p (PID)"]
  },
  {
    name: "mdfind",
    os: "macos",
    category: "Fichiers",
    description: "Recherche des fichiers via l'index Spotlight, beaucoup plus rapide que find pour de gros volumes.",
    syntax: "mdfind <motif>",
    examples: [
      { cmd: "mdfind \"rapport 2026\"", desc: "Cherche des fichiers par contenu/nom" },
      { cmd: "mdfind -onlyin ~/Documents \"facture\"", desc: "Limite la recherche à un dossier" }
    ],
    flags: ["-onlyin (limiter le dossier)", "-name (par nom uniquement)"]
  },
  {
    name: "open",
    os: "macos",
    category: "Système",
    description: "Ouvre un fichier, dossier ou URL avec l'application par défaut, depuis le terminal.",
    syntax: "open <fichier|url|.>",
    examples: [
      { cmd: "open .", desc: "Ouvre le dossier courant dans le Finder" },
      { cmd: "open https://example.com", desc: "Ouvre une URL dans le navigateur par défaut" },
      { cmd: "open -a \"Visual Studio Code\" .", desc: "Ouvre le dossier courant dans une app précise" }
    ],
    flags: ["-a (application)", "-e (TextEdit)"]
  },
  {
    name: "xcode-select",
    os: "macos",
    category: "Paquets",
    description: "Installe ou configure les Command Line Tools, prérequis pour compiler/utiliser Homebrew, git, etc.",
    syntax: "xcode-select --install",
    examples: [
      { cmd: "xcode-select --install", desc: "Installe les Command Line Tools" },
      { cmd: "xcode-select -p", desc: "Affiche le chemin actif des outils" }
    ],
    flags: ["--install", "-p (afficher le chemin)"]
  },
  {
    name: "plutil",
    os: "macos",
    category: "Fichiers",
    description: "Valide ou convertit des fichiers property list (.plist), utilisés pour la config système et les apps.",
    syntax: "plutil -<lint|convert> <fichier>",
    examples: [
      { cmd: "plutil -lint fichier.plist", desc: "Vérifie qu'un plist est valide" },
      { cmd: "plutil -convert xml1 fichier.plist", desc: "Convertit en format XML lisible" }
    ],
    flags: ["-lint", "-convert xml1|binary1|json"]
  },

  // ── WINDOWS ───────────────────────────────────────────────
  {
    name: "Get-Help",
    os: "windows",
    category: "Système",
    description: "Affiche l'aide d'une commande PowerShell (équivalent de man).",
    syntax: "Get-Help <commande>",
    examples: [
      { cmd: "Get-Help Get-Process", desc: "Aide sur Get-Process" },
      { cmd: "Get-Help Get-Process -Examples", desc: "Uniquement les exemples" }
    ],
    flags: ["-Full", "-Examples", "-Online"]
  },
  {
    name: "Get-Process",
    os: "windows",
    category: "Processus",
    description: "Liste les processus en cours d'exécution (équivalent ps/top).",
    syntax: "Get-Process [nom]",
    examples: [
      { cmd: "Get-Process", desc: "Tous les processus" },
      { cmd: "Get-Process | Sort-Object CPU -Descending | Select -First 10", desc: "Top 10 par CPU" }
    ],
    flags: ["-Name", "-Id"]
  },
  {
    name: "Stop-Process",
    os: "windows",
    category: "Processus",
    description: "Termine un processus en cours (équivalent de kill).",
    syntax: "Stop-Process -Name <nom> | -Id <pid>",
    examples: [
      { cmd: "Stop-Process -Name notepad", desc: "Ferme Notepad" },
      { cmd: "Stop-Process -Id 1234 -Force", desc: "Force la fin du processus" }
    ],
    flags: ["-Name", "-Id", "-Force"]
  },
  {
    name: "Get-Service",
    os: "windows",
    category: "Services",
    description: "Liste l'état des services Windows.",
    syntax: "Get-Service [nom]",
    examples: [
      { cmd: "Get-Service", desc: "Tous les services" },
      { cmd: "Get-Service | Where-Object Status -eq 'Running'", desc: "Services actifs" }
    ],
    flags: ["-Name", "-DisplayName"]
  },
  {
    name: "Start-Service",
    os: "windows",
    category: "Services",
    description: "Démarre ou arrête un service Windows.",
    syntax: "Start-Service -Name <service>",
    examples: [
      { cmd: "Start-Service -Name spooler", desc: "Démarre le spouleur" },
      { cmd: "Restart-Service -Name w32time", desc: "Redémarre le service de temps" }
    ],
    flags: ["-Name", "-Force"]
  },
  {
    name: "winget install",
    os: "windows",
    category: "Paquets",
    description: "Installe une application via le gestionnaire de paquets Windows.",
    syntax: "winget install <id ou nom>",
    examples: [
      { cmd: "winget install Git.Git", desc: "Installe Git" },
      { cmd: "winget upgrade --all", desc: "Met à jour toutes les applis" }
    ],
    flags: ["--id", "-e (exact match)", "--silent"]
  },
  {
    name: "ipconfig",
    os: "windows",
    category: "Réseau",
    description: "Affiche la configuration réseau des interfaces Windows.",
    syntax: "ipconfig [options]",
    examples: [
      { cmd: "ipconfig /all", desc: "Infos complètes (MAC, DNS, DHCP)" },
      { cmd: "ipconfig /flushdns", desc: "Vide le cache DNS" }
    ],
    flags: ["/all", "/flushdns", "/release", "/renew"]
  },
  {
    name: "netstat",
    os: "windows",
    category: "Réseau",
    description: "Affiche les connexions réseau et ports actifs sous Windows.",
    syntax: "netstat [options]",
    examples: [
      { cmd: "netstat -ano", desc: "Toutes les connexions avec PID" },
      { cmd: "netstat -ano | findstr :80", desc: "Connexions sur le port 80" }
    ],
    flags: ["-a (toutes)", "-n (numérique)", "-o (PID)"]
  },
  {
    name: "Set-ExecutionPolicy",
    os: "windows",
    category: "Système",
    description: "Définit la politique d'exécution des scripts PowerShell.",
    syntax: "Set-ExecutionPolicy <policy>",
    examples: [
      { cmd: "Set-ExecutionPolicy RemoteSigned", desc: "Autorise les scripts locaux" },
      { cmd: "Set-ExecutionPolicy Bypass -Scope Process", desc: "Bypass temporaire" }
    ],
    flags: ["Restricted / RemoteSigned / Unrestricted / Bypass", "-Scope"]
  },
  {
    name: "robocopy",
    os: "windows",
    category: "Fichiers",
    description: "Copie robuste de fichiers et dossiers (CMD).",
    syntax: "robocopy <source> <dest> [options]",
    examples: [
      { cmd: "robocopy C:\\src D:\\backup /E", desc: "Copie récursive" },
      { cmd: "robocopy C:\\src D:\\backup /MIR", desc: "Miroir exact" }
    ],
    flags: ["/E (sous-dossiers)", "/MIR (miroir)", "/Z (reprise)", "/R:n (retries)"]
  },
  {
    name: "Get-NetAdapter",
    os: "windows",
    category: "Réseau",
    description: "Affiche les adaptateurs réseau et leur état.",
    syntax: "Get-NetAdapter [-Name <nom>]",
    examples: [
      { cmd: "Get-NetAdapter", desc: "Liste toutes les interfaces réseau" },
      { cmd: "Get-NetAdapter | Where-Object {$_.Status -eq \"Up\"}", desc: "Interfaces actives uniquement" }
    ],
    flags: ["-Name", "-Physical"]
  },
  {
    name: "Test-NetConnection",
    os: "windows",
    category: "Réseau",
    description: "Teste la connectivité réseau vers un hôte (ping avancé + test de port).",
    syntax: "Test-NetConnection <hôte> [-Port <port>]",
    examples: [
      { cmd: "Test-NetConnection google.com", desc: "Ping avancé avec infos de route" },
      { cmd: "Test-NetConnection 192.168.1.10 -Port 3389", desc: "Teste un port spécifique (ex: RDP)" }
    ],
    flags: ["-Port", "-TraceRoute", "-InformationLevel"]
  },
  {
    name: "Get-WinEvent",
    os: "windows",
    category: "Système",
    description: "Consulte les journaux d'événements Windows.",
    syntax: "Get-WinEvent -LogName <journal>",
    examples: [
      { cmd: "Get-WinEvent -LogName System -MaxEvents 20", desc: "20 derniers événements système" },
      { cmd: "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625}", desc: "Échecs de connexion (logon failure)" }
    ],
    flags: ["-MaxEvents", "-FilterHashtable", "-ComputerName"]
  },
  {
    name: "Get-ChildItem",
    os: "windows",
    category: "Fichiers",
    description: "Liste les fichiers et dossiers d'un répertoire (équivalent ls/dir).",
    syntax: "Get-ChildItem [-Path <chemin>] [-Recurse]",
    examples: [
      { cmd: "Get-ChildItem C:\\Users", desc: "Liste le contenu d'un dossier" },
      { cmd: "Get-ChildItem -Recurse -Filter *.log", desc: "Recherche récursive de fichiers .log" }
    ],
    flags: ["-Recurse", "-Filter", "-Force (fichiers cachés)"]
  },
  {
    name: "New-Item / Remove-Item",
    os: "windows",
    category: "Fichiers",
    description: "Crée ou supprime un fichier, dossier ou autre élément du système de fichiers.",
    syntax: "New-Item -Path <chemin> -ItemType <type> | Remove-Item <chemin>",
    examples: [
      { cmd: "New-Item -Path C:\\Logs -ItemType Directory", desc: "Crée un dossier" },
      { cmd: "Remove-Item C:\\temp\\*.tmp -Force", desc: "Supprime des fichiers temporaires" }
    ],
    flags: ["-ItemType", "-Force", "-Recurse"]
  },
  {
    name: "Get-LocalUser / New-LocalUser",
    os: "windows",
    category: "Utilisateurs",
    description: "Liste ou crée des utilisateurs locaux sur un poste Windows (hors domaine).",
    syntax: "Get-LocalUser | New-LocalUser -Name <user> -Password <securestring>",
    examples: [
      { cmd: "Get-LocalUser", desc: "Liste les comptes locaux" },
      { cmd: "New-LocalUser -Name \"invite\" -NoPassword", desc: "Crée un utilisateur local sans mot de passe" }
    ],
    flags: ["-Name", "-Password", "-NoPassword"]
  },
  {
    name: "Add-LocalGroupMember",
    os: "windows",
    category: "Utilisateurs",
    description: "Ajoute un utilisateur local à un groupe (ex: Administrateurs).",
    syntax: "Add-LocalGroupMember -Group <groupe> -Member <user>",
    examples: [
      { cmd: "Add-LocalGroupMember -Group \"Administrateurs\" -Member \"tom\"", desc: "Donne les droits admin local à tom" }
    ],
    flags: ["-Group", "-Member"]
  },
  {
    name: "Get-Disk / Get-Volume",
    os: "windows",
    category: "Système",
    description: "Affiche les disques physiques et volumes montés sur la machine.",
    syntax: "Get-Disk | Get-Volume",
    examples: [
      { cmd: "Get-Disk", desc: "Liste les disques physiques" },
      { cmd: "Get-Volume", desc: "Affiche l'espace utilisé/libre par volume" }
    ],
    flags: []
  },
  {
    name: "Restart-Computer / Stop-Computer",
    os: "windows",
    category: "Système",
    description: "Redémarre ou éteint la machine, localement ou à distance.",
    syntax: "Restart-Computer [-ComputerName <hôte>] [-Force]",
    examples: [
      { cmd: "Restart-Computer -Force", desc: "Redémarre immédiatement sans confirmation" },
      { cmd: "Restart-Computer -ComputerName PC-02 -Force", desc: "Redémarre un poste distant" }
    ],
    flags: ["-Force", "-ComputerName", "-Wait"]
  },
  {
    name: "Set-NetFirewallRule / New-NetFirewallRule",
    os: "windows",
    category: "Réseau",
    description: "Gère les règles du pare-feu Windows Defender en ligne de commande.",
    syntax: "New-NetFirewallRule -DisplayName <nom> -Direction <In|Out> -Action <Allow|Block> -Protocol <TCP|UDP> -LocalPort <port>",
    examples: [
      { cmd: "New-NetFirewallRule -DisplayName \"Autoriser RDP\" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3389", desc: "Ouvre le port RDP" }
    ],
    flags: ["-Direction", "-Action", "-Protocol", "-LocalPort"]
  },
  {
    name: "Compress-Archive / Expand-Archive",
    os: "windows",
    category: "Archives",
    description: "Compresse ou extrait des archives ZIP nativement en PowerShell.",
    syntax: "Compress-Archive -Path <source> -DestinationPath <zip> | Expand-Archive -Path <zip> -DestinationPath <dossier>",
    examples: [
      { cmd: "Compress-Archive -Path C:\\Logs -DestinationPath C:\\logs.zip", desc: "Compresse un dossier en ZIP" },
      { cmd: "Expand-Archive -Path C:\\logs.zip -DestinationPath C:\\extracted", desc: "Extrait une archive ZIP" }
    ],
    flags: ["-Path", "-DestinationPath", "-Force"]
  },
  {
    name: "chkdsk",
    os: "windows",
    category: "Système",
    description: "Vérifie et répare les erreurs du système de fichiers sur un disque.",
    syntax: "chkdsk <lecteur> [/f] [/r]",
    examples: [
      { cmd: "chkdsk C: /f", desc: "Corrige les erreurs détectées sur le disque C:" },
      { cmd: "chkdsk C: /r", desc: "Recherche les secteurs défectueux et tente la récupération" }
    ],
    flags: ["/f (fix)", "/r (recover bad sectors)", "/x (forcer le démontage)"]
  },
  {
    name: "tasklist / taskkill",
    os: "windows",
    category: "Processus",
    description: "Liste les processus en cours (tasklist) ou en termine un (taskkill), en invite de commandes classique.",
    syntax: "tasklist ; taskkill /PID <pid> /F",
    examples: [
      { cmd: "tasklist", desc: "Liste tous les processus actifs" },
      { cmd: "taskkill /IM notepad.exe /F", desc: "Force l'arrêt par nom d'image" },
      { cmd: "taskkill /PID 1234 /F", desc: "Force l'arrêt par PID" }
    ],
    flags: ["/PID", "/IM (nom de l'image)", "/F (forcer)"]
  },
  {
    name: "sfc /scannow",
    os: "windows",
    category: "Système",
    description: "Vérifie et répare les fichiers système Windows corrompus ou manquants.",
    syntax: "sfc /scannow",
    examples: [
      { cmd: "sfc /scannow", desc: "Scanne et répare automatiquement les fichiers système" }
    ],
    flags: ["/scannow", "/verifyonly"]
  },
  {
    name: "DISM",
    os: "windows",
    category: "Système",
    description: "Répare l'image système Windows (souvent utilisé avant ou après sfc en cas de corruption profonde).",
    syntax: "DISM /Online /Cleanup-Image /<action>",
    examples: [
      { cmd: "DISM /Online /Cleanup-Image /RestoreHealth", desc: "Répare l'image système depuis Windows Update" },
      { cmd: "DISM /Online /Cleanup-Image /CheckHealth", desc: "Vérifie rapidement l'état de l'image" }
    ],
    flags: ["/CheckHealth", "/ScanHealth", "/RestoreHealth"]
  },
  {
    name: "systeminfo",
    os: "windows",
    category: "Système",
    description: "Affiche un résumé détaillé de la configuration système (OS, RAM, hotfixes, réseau).",
    syntax: "systeminfo",
    examples: [
      { cmd: "systeminfo", desc: "Affiche toutes les infos système" },
      { cmd: "systeminfo | findstr /B /C:\"OS Version\"", desc: "Filtre uniquement la version OS" }
    ],
    flags: []
  },
  {
    name: "schtasks",
    os: "windows",
    category: "Système",
    description: "Crée et gère les tâches planifiées en ligne de commande (équivalent du Planificateur de tâches).",
    syntax: "schtasks /create /tn <nom> /tr <commande> /sc <fréquence>",
    examples: [
      { cmd: "schtasks /create /tn \"Backup\" /tr \"C:\\scripts\\backup.bat\" /sc daily /st 02:00", desc: "Tâche quotidienne à 2h" },
      { cmd: "schtasks /query", desc: "Liste les tâches planifiées" }
    ],
    flags: ["/create", "/delete", "/query", "/sc (fréquence)"]
  },
  {
    name: "reg query / reg add",
    os: "windows",
    category: "Système",
    description: "Consulte ou modifie le registre Windows en ligne de commande.",
    syntax: "reg query <clé> ; reg add <clé> /v <valeur> /d <données>",
    examples: [
      { cmd: "reg query HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion", desc: "Lit une clé de registre" },
      { cmd: "reg add HKCU\\Software\\Test /v MaValeur /d 1 /f", desc: "Ajoute une valeur de registre" }
    ],
    flags: ["/v (nom de valeur)", "/d (données)", "/f (forcer sans confirmation)"]
  },
  {
    name: "whoami /all",
    os: "windows",
    category: "Utilisateurs",
    description: "Affiche l'utilisateur courant ainsi que ses groupes et privilèges détaillés.",
    syntax: "whoami [/all|/groups|/priv]",
    examples: [
      { cmd: "whoami", desc: "Affiche juste le nom d'utilisateur" },
      { cmd: "whoami /all", desc: "Détail complet : SID, groupes, privilèges" }
    ],
    flags: ["/all", "/groups", "/priv"]
  },

  // ── POWERSHELL ────────────────────────────────────────────
  {
    name: "Get-Content",
    os: "powershell",
    category: "Fichiers",
    description: "Lit le contenu d'un fichier (équivalent de cat).",
    syntax: "Get-Content <chemin>",
    examples: [
      { cmd: "Get-Content C:\\logs\\app.log", desc: "Affiche le fichier" },
      { cmd: "Get-Content app.log -Tail 50", desc: "50 dernières lignes" },
      { cmd: "Get-Content app.log -Wait", desc: "Suit le fichier en temps réel (comme tail -f)" }
    ],
    flags: ["-Tail n (dernières lignes)", "-Wait (follow)", "-Encoding"]
  },
  {
    name: "Set-Location",
    os: "powershell",
    category: "Navigation",
    description: "Change le répertoire courant (équivalent de cd).",
    syntax: "Set-Location <chemin>",
    examples: [
      { cmd: "Set-Location C:\\Users\\tom", desc: "Va dans le dossier tom" },
      { cmd: "cd C:\\Projects", desc: "Alias cd fonctionne aussi" },
      { cmd: "Push-Location C:\\tmp", desc: "Change et empile le chemin précédent" }
    ],
    flags: ["Push-Location / Pop-Location (pile de chemins)"]
  },
  {
    name: "Invoke-WebRequest",
    os: "powershell",
    category: "Réseau",
    description: "Effectue des requêtes HTTP (équivalent de curl/wget).",
    syntax: "Invoke-WebRequest -Uri <url>",
    examples: [
      { cmd: "Invoke-WebRequest -Uri https://example.com", desc: "Requête GET simple" },
      { cmd: "iwr https://example.com/file.zip -OutFile file.zip", desc: "Télécharge un fichier" },
      { cmd: "Invoke-WebRequest -Uri https://api.example.com -Method POST -Body $body", desc: "Requête POST" }
    ],
    flags: ["-Uri", "-Method", "-OutFile", "-Headers", "-Body"]
  },
  {
    name: "Where-Object",
    os: "powershell",
    category: "Système",
    description: "Filtre les objets dans un pipeline selon une condition.",
    syntax: "... | Where-Object { $_.propriété -opérateur valeur }",
    examples: [
      { cmd: "Get-Process | Where-Object { $_.CPU -gt 10 }", desc: "Processus avec CPU > 10" },
      { cmd: "Get-Service | Where-Object Status -eq 'Running'", desc: "Services actifs" },
      { cmd: "Get-ChildItem | Where-Object { $_.Extension -eq '.log' }", desc: "Fichiers .log uniquement" }
    ],
    flags: ["-eq / -ne / -gt / -lt / -like / -match"]
  },
  {
    name: "Select-Object",
    os: "powershell",
    category: "Système",
    description: "Sélectionne des propriétés spécifiques ou un nombre limité d'objets.",
    syntax: "... | Select-Object <propriétés>",
    examples: [
      { cmd: "Get-Process | Select-Object Name, CPU, Id", desc: "Affiche nom, CPU et PID" },
      { cmd: "Get-Process | Select-Object -First 5", desc: "Les 5 premiers processus" },
      { cmd: "Get-Service | Select-Object -Property *", desc: "Toutes les propriétés" }
    ],
    flags: ["-First n", "-Last n", "-Property", "-Unique", "-ExpandProperty"]
  },
  {
    name: "Export-Csv",
    os: "powershell",
    category: "Fichiers",
    description: "Exporte des objets PowerShell vers un fichier CSV.",
    syntax: "... | Export-Csv -Path <fichier>",
    examples: [
      { cmd: "Get-Process | Export-Csv -Path procs.csv -NoTypeInformation", desc: "Exporte les processus en CSV" },
      { cmd: "Get-Service | Export-Csv services.csv -Encoding UTF8", desc: "Services en CSV UTF-8" }
    ],
    flags: ["-Path", "-NoTypeInformation", "-Encoding", "-Delimiter", "-Append"]
  },
  {
    name: "ForEach-Object",
    os: "powershell",
    category: "Système",
    description: "Exécute un bloc de script pour chaque élément d'une collection (équivalent foreach en pipeline).",
    syntax: "... | ForEach-Object { <script> }",
    examples: [
      { cmd: "Get-Service | ForEach-Object { $_.Name }", desc: "Affiche le nom de chaque service" },
      { cmd: "1..5 | ForEach-Object { $_ * 2 }", desc: "Double chaque nombre de 1 à 5" }
    ],
    flags: ["-Begin", "-Process", "-End"]
  },
  {
    name: "New-Object",
    os: "powershell",
    category: "Système",
    description: "Crée une instance d'un objet .NET ou COM.",
    syntax: "New-Object -TypeName <type> [-ArgumentList <args>]",
    examples: [
      { cmd: "New-Object System.Net.WebClient", desc: "Crée un objet WebClient" },
      { cmd: "New-Object -TypeName PSObject -Property @{Nom=\"Tom\"}", desc: "Crée un objet personnalisé" }
    ],
    flags: ["-TypeName", "-ArgumentList", "-Property"]
  },
  {
    name: "Invoke-Command",
    os: "powershell",
    category: "Système",
    description: "Exécute des commandes sur un ou plusieurs ordinateurs distants via PowerShell Remoting.",
    syntax: "Invoke-Command -ComputerName <hôte> -ScriptBlock { <script> }",
    examples: [
      { cmd: "Invoke-Command -ComputerName SRV01 -ScriptBlock { Get-Service }", desc: "Exécute une commande à distance" },
      { cmd: "Invoke-Command -ComputerName SRV01,SRV02 -ScriptBlock { Restart-Service spooler }", desc: "Sur plusieurs serveurs à la fois" }
    ],
    flags: ["-ComputerName", "-ScriptBlock", "-Credential", "-AsJob"]
  },
  {
    name: "Test-Path",
    os: "powershell",
    category: "Fichiers",
    description: "Vérifie si un chemin (fichier, dossier, clé de registre) existe.",
    syntax: "Test-Path <chemin>",
    examples: [
      { cmd: "Test-Path C:\\Logs", desc: "Vérifie si le dossier existe" },
      { cmd: "if (Test-Path C:\\config.ini) { Write-Host \"OK\" }", desc: "Condition basée sur l'existence" }
    ],
    flags: ["-PathType Leaf|Container"]
  },
  {
    name: "Out-File / Tee-Object",
    os: "powershell",
    category: "Fichiers",
    description: "Redirige la sortie d'une commande vers un fichier texte.",
    syntax: "... | Out-File -FilePath <fichier>",
    examples: [
      { cmd: "Get-Process | Out-File -FilePath procs.txt", desc: "Écrit la sortie dans un fichier" },
      { cmd: "Get-Service | Tee-Object -FilePath log.txt", desc: "Affiche ET écrit simultanément" }
    ],
    flags: ["-FilePath", "-Append", "-Encoding"]
  },
  {
    name: "Get-EventLog",
    os: "powershell",
    category: "Système",
    description: "Consulte les journaux d'événements classiques (équivalent historique de Get-WinEvent).",
    syntax: "Get-EventLog -LogName <journal> -Newest <n>",
    examples: [
      { cmd: "Get-EventLog -LogName Application -Newest 10", desc: "10 derniers événements applicatifs" },
      { cmd: "Get-EventLog -LogName System -EntryType Error", desc: "Uniquement les erreurs système" }
    ],
    flags: ["-Newest", "-EntryType", "-Source"]
  },
  {
    name: "Get-WmiObject / Get-CimInstance",
    os: "powershell",
    category: "Système",
    description: "Interroge les classes WMI/CIM pour obtenir des infos matérielles ou système détaillées.",
    syntax: "Get-CimInstance -ClassName <classe>",
    examples: [
      { cmd: "Get-CimInstance -ClassName Win32_OperatingSystem", desc: "Infos sur le système d'exploitation" },
      { cmd: "Get-CimInstance -ClassName Win32_LogicalDisk", desc: "Infos sur les disques logiques" }
    ],
    flags: ["-ClassName", "-ComputerName", "-Filter"]
  },
  {
    name: "$PSVersionTable",
    os: "powershell",
    category: "Système",
    description: "Affiche la version de PowerShell installée et les détails de l'édition (Core/Desktop).",
    syntax: "$PSVersionTable",
    examples: [
      { cmd: "$PSVersionTable", desc: "Affiche toutes les infos de version" },
      { cmd: "$PSVersionTable.PSVersion", desc: "Affiche uniquement le numéro de version" }
    ],
    flags: []
  },
  {
    name: "Import-Module / Get-Module",
    os: "powershell",
    category: "Système",
    description: "Charge un module PowerShell (ex: ActiveDirectory) pour accéder à ses cmdlets.",
    syntax: "Import-Module <nom>",
    examples: [
      { cmd: "Import-Module ActiveDirectory", desc: "Charge les cmdlets AD" },
      { cmd: "Get-Module -ListAvailable", desc: "Liste tous les modules installés" }
    ],
    flags: ["-ListAvailable", "-Force"]
  },
  {
    name: "ConvertTo-Json / ConvertFrom-Json",
    os: "powershell",
    category: "Fichiers",
    description: "Convertit des objets PowerShell en JSON ou parse du JSON en objets.",
    syntax: "... | ConvertTo-Json | ConvertFrom-Json <chaîne>",
    examples: [
      { cmd: "Get-Process | Select -First 3 | ConvertTo-Json", desc: "Convertit en JSON" },
      { cmd: "Get-Content data.json | ConvertFrom-Json", desc: "Parse un fichier JSON" }
    ],
    flags: ["-Depth"]
  },
  {
    name: "Start-Job / Get-Job",
    os: "powershell",
    category: "Processus",
    description: "Exécute une tâche en arrière-plan (job) sans bloquer la console.",
    syntax: "Start-Job -ScriptBlock { <script> }",
    examples: [
      { cmd: "Start-Job -ScriptBlock { Get-Process }", desc: "Lance une tâche en arrière-plan" },
      { cmd: "Get-Job | Receive-Job", desc: "Récupère le résultat des jobs terminés" }
    ],
    flags: ["-ScriptBlock", "-Name"]
  },
  {
    name: "Measure-Object",
    os: "powershell",
    category: "Système",
    description: "Calcule des statistiques (somme, moyenne, min, max, nombre) sur une collection d'objets.",
    syntax: "... | Measure-Object [-Property <prop>] [-Sum|-Average]",
    examples: [
      { cmd: "Get-Process | Measure-Object", desc: "Compte le nombre de processus" },
      { cmd: "Get-ChildItem | Measure-Object -Property Length -Sum", desc: "Taille totale des fichiers d'un dossier" }
    ],
    flags: ["-Sum", "-Average", "-Maximum", "-Minimum", "-Property"]
  },
  {
    name: "Sort-Object",
    os: "powershell",
    category: "Système",
    description: "Trie les objets d'une collection selon une ou plusieurs propriétés.",
    syntax: "... | Sort-Object -Property <prop> [-Descending]",
    examples: [
      { cmd: "Get-Process | Sort-Object CPU -Descending", desc: "Trie les processus par CPU décroissant" },
      { cmd: "Get-ChildItem | Sort-Object Length", desc: "Trie les fichiers par taille croissante" }
    ],
    flags: ["-Property", "-Descending", "-Unique"]
  },
  {
    name: "Get-Alias",
    os: "powershell",
    category: "Système",
    description: "Affiche les alias de cmdlets configurés (ex: ls pour Get-ChildItem, ps pour Get-Process).",
    syntax: "Get-Alias [-Name <alias>]",
    examples: [
      { cmd: "Get-Alias", desc: "Liste tous les alias configurés" },
      { cmd: "Get-Alias -Name gci", desc: "Trouve la cmdlet derrière un alias précis" }
    ],
    flags: ["-Name", "-Definition (recherche par cmdlet cible)"]
  },
  {
    name: "Get-Command",
    os: "powershell",
    category: "Système",
    description: "Recherche les cmdlets, fonctions ou alias disponibles correspondant à un motif.",
    syntax: "Get-Command [-Name <motif>] [-Module <module>]",
    examples: [
      { cmd: "Get-Command *service*", desc: "Toutes les cmdlets liées aux services" },
      { cmd: "Get-Command -Module ActiveDirectory", desc: "Cmdlets d'un module précis" }
    ],
    flags: ["-Name", "-Module", "-CommandType"]
  },
  {
    name: "Get-Member",
    os: "powershell",
    category: "Système",
    description: "Affiche les propriétés et méthodes disponibles sur un objet (très utile pour explorer).",
    syntax: "... | Get-Member",
    examples: [
      { cmd: "Get-Process | Get-Member", desc: "Liste toutes les propriétés/méthodes d'un processus" },
      { cmd: "Get-Service | Get-Member -MemberType Property", desc: "Uniquement les propriétés" }
    ],
    flags: ["-MemberType"]
  },
  {
    name: "ConvertTo-SecureString",
    os: "powershell",
    category: "Permissions",
    description: "Convertit du texte en chaîne sécurisée chiffrée, utilisé pour manipuler des mots de passe en script.",
    syntax: "ConvertTo-SecureString -String <texte> -AsPlainText -Force",
    examples: [
      { cmd: "$pass = ConvertTo-SecureString \"P@ss\" -AsPlainText -Force", desc: "Crée une SecureString depuis du texte brut" },
      { cmd: "$cred = New-Object PSCredential(\"user\", $pass)", desc: "Construit un objet credential réutilisable" }
    ],
    flags: ["-AsPlainText", "-Force"]
  },
  {
    name: "Compare-Object",
    os: "powershell",
    category: "Système",
    description: "Compare deux collections d'objets et affiche leurs différences.",
    syntax: "Compare-Object <référence> <différence>",
    examples: [
      { cmd: "Compare-Object (Get-Content a.txt) (Get-Content b.txt)", desc: "Compare le contenu de deux fichiers" }
    ],
    flags: ["-IncludeEqual", "-Property"]
  },
  {
    name: "Read-Host / Write-Host",
    os: "powershell",
    category: "Système",
    description: "Lit une saisie utilisateur ou affiche du texte dans la console (base des scripts interactifs).",
    syntax: "Read-Host -Prompt <texte> ; Write-Host <texte>",
    examples: [
      { cmd: "$nom = Read-Host -Prompt \"Votre nom\"", desc: "Demande une saisie et la stocke" },
      { cmd: "Write-Host \"Bonjour $nom\" -ForegroundColor Green", desc: "Affiche du texte coloré" }
    ],
    flags: ["-Prompt", "-AsSecureString", "-ForegroundColor"]
  },

  // ── DOCKER ────────────────────────────────────────────────
  {
    name: "docker run",
    os: "docker",
    category: "Conteneurs",
    description: "Crée et démarre un conteneur depuis une image.",
    syntax: "docker run [options] <image> [commande]",
    examples: [
      { cmd: "docker run -d -p 80:80 nginx", desc: "Nginx en arrière-plan sur le port 80" },
      { cmd: "docker run -it ubuntu bash", desc: "Ubuntu interactif avec bash" },
      { cmd: "docker run --rm -v $(pwd):/app node:18 node app.js", desc: "Exécute node et supprime le conteneur après" }
    ],
    flags: ["-d (détaché)", "-p (ports)", "-v (volumes)", "--rm (auto-suppression)", "-e (variables env)", "--name"]
  },
  {
    name: "docker ps",
    os: "docker",
    category: "Conteneurs",
    description: "Liste les conteneurs en cours d'exécution.",
    syntax: "docker ps [options]",
    examples: [
      { cmd: "docker ps", desc: "Conteneurs actifs" },
      { cmd: "docker ps -a", desc: "Tous les conteneurs (actifs + arrêtés)" },
      { cmd: "docker ps --format 'table {{.Names}}\\t{{.Status}}'", desc: "Format personnalisé" }
    ],
    flags: ["-a (tous)", "-q (IDs seulement)", "--format"]
  },
  {
    name: "docker build",
    os: "docker",
    category: "Conteneurs",
    description: "Construit une image depuis un Dockerfile.",
    syntax: "docker build [options] <contexte>",
    examples: [
      { cmd: "docker build -t monapp:1.0 .", desc: "Construit avec le tag monapp:1.0" },
      { cmd: "docker build --no-cache -t monapp .", desc: "Sans cache (rebuild complet)" },
      { cmd: "docker build -f Dockerfile.prod -t monapp:prod .", desc: "Dockerfile spécifique" }
    ],
    flags: ["-t (tag)", "-f (Dockerfile)", "--no-cache", "--build-arg"]
  },
  {
    name: "docker-compose up",
    os: "docker",
    category: "Conteneurs",
    description: "Démarre tous les services définis dans docker-compose.yml.",
    syntax: "docker-compose up [options]",
    examples: [
      { cmd: "docker-compose up -d", desc: "Démarre en arrière-plan" },
      { cmd: "docker-compose up --build", desc: "Rebuild les images avant de démarrer" },
      { cmd: "docker-compose up -d nginx db", desc: "Démarre uniquement nginx et db" }
    ],
    flags: ["-d (détaché)", "--build (rebuild)", "--force-recreate", "--scale service=n"]
  },
  {
    name: "docker logs",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche les logs d'un conteneur.",
    syntax: "docker logs [options] <conteneur>",
    examples: [
      { cmd: "docker logs mon-nginx", desc: "Logs de mon-nginx" },
      { cmd: "docker logs -f --tail 100 mon-nginx", desc: "Suit les 100 dernières lignes" },
      { cmd: "docker logs --since 1h mon-nginx", desc: "Logs de la dernière heure" }
    ],
    flags: ["-f (follow)", "--tail n", "--since", "--timestamps"]
  },
  {
    name: "docker exec",
    os: "docker",
    category: "Conteneurs",
    description: "Exécute une commande dans un conteneur en cours d'exécution.",
    syntax: "docker exec [options] <conteneur> <commande>",
    examples: [
      { cmd: "docker exec -it mon-nginx bash", desc: "Shell interactif dans le conteneur" },
      { cmd: "docker exec mon-nginx nginx -t", desc: "Vérifie la config nginx" },
      { cmd: "docker exec -it db psql -U postgres", desc: "Connexion PostgreSQL" }
    ],
    flags: ["-i (interactif)", "-t (TTY)", "-e (variable env)", "-u (utilisateur)"]
  },
  {
    name: "docker stop / docker rm",
    os: "docker",
    category: "Conteneurs",
    description: "Arrête puis supprime un ou plusieurs conteneurs.",
    syntax: "docker stop <conteneur> ; docker rm <conteneur>",
    examples: [
      { cmd: "docker stop mon-nginx", desc: "Arrête proprement le conteneur" },
      { cmd: "docker rm mon-nginx", desc: "Supprime le conteneur arrêté" },
      { cmd: "docker rm -f mon-nginx", desc: "Force l'arrêt et la suppression" }
    ],
    flags: ["-f (forcer)", "-v (supprimer les volumes associés)"]
  },
  {
    name: "docker images / docker rmi",
    os: "docker",
    category: "Conteneurs",
    description: "Liste les images locales ou en supprime une.",
    syntax: "docker images ; docker rmi <image>",
    examples: [
      { cmd: "docker images", desc: "Liste toutes les images locales" },
      { cmd: "docker rmi nginx:latest", desc: "Supprime une image" }
    ],
    flags: ["-a (toutes, y compris intermédiaires)", "-f (forcer)"]
  },
  {
    name: "docker pull / docker push",
    os: "docker",
    category: "Conteneurs",
    description: "Télécharge une image depuis un registry ou y publie une image locale.",
    syntax: "docker pull <image> ; docker push <image>",
    examples: [
      { cmd: "docker pull nginx:latest", desc: "Télécharge l'image officielle nginx" },
      { cmd: "docker push monregistry.io/monapp:1.0", desc: "Publie l'image vers un registry privé" }
    ],
    flags: []
  },
  {
    name: "docker network",
    os: "docker",
    category: "Conteneurs",
    description: "Crée et gère les réseaux virtuels pour connecter des conteneurs entre eux.",
    syntax: "docker network <action>",
    examples: [
      { cmd: "docker network create mon-reseau", desc: "Crée un réseau bridge personnalisé" },
      { cmd: "docker network connect mon-reseau mon-conteneur", desc: "Connecte un conteneur au réseau" },
      { cmd: "docker network ls", desc: "Liste les réseaux existants" }
    ],
    flags: ["create", "connect", "ls", "rm", "inspect"]
  },
  {
    name: "docker volume",
    os: "docker",
    category: "Conteneurs",
    description: "Crée et gère les volumes pour persister les données en dehors du conteneur.",
    syntax: "docker volume <action>",
    examples: [
      { cmd: "docker volume create mes-donnees", desc: "Crée un volume nommé" },
      { cmd: "docker run -v mes-donnees:/data nginx", desc: "Monte le volume dans un conteneur" },
      { cmd: "docker volume ls", desc: "Liste les volumes" }
    ],
    flags: ["create", "ls", "rm", "inspect", "prune"]
  },
  {
    name: "docker-compose down",
    os: "docker",
    category: "Conteneurs",
    description: "Arrête et supprime tous les conteneurs définis dans un docker-compose.yml.",
    syntax: "docker-compose down [-v]",
    examples: [
      { cmd: "docker-compose down", desc: "Arrête la stack (conserve les volumes)" },
      { cmd: "docker-compose down -v", desc: "Arrête et supprime aussi les volumes" }
    ],
    flags: ["-v (supprimer volumes)", "--rmi all (supprimer images)"]
  },
  {
    name: "docker-compose logs",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche les logs de tous les services d'une stack docker-compose.",
    syntax: "docker-compose logs [-f] [service]",
    examples: [
      { cmd: "docker-compose logs -f", desc: "Suit les logs de tous les services" },
      { cmd: "docker-compose logs -f web", desc: "Suit uniquement le service web" }
    ],
    flags: ["-f (follow)", "--tail n"]
  },
  {
    name: "docker inspect",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche les détails complets (config, réseau, montages) d'un conteneur ou d'une image en JSON.",
    syntax: "docker inspect <conteneur|image>",
    examples: [
      { cmd: "docker inspect mon-nginx", desc: "Détails complets du conteneur" },
      { cmd: "docker inspect -f '{{.NetworkSettings.IPAddress}}' mon-nginx", desc: "Extrait juste l'IP du conteneur" }
    ],
    flags: ["-f (format Go template)"]
  },
  {
    name: "docker stats",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche en temps réel l'utilisation CPU/RAM/réseau des conteneurs actifs.",
    syntax: "docker stats [conteneur]",
    examples: [
      { cmd: "docker stats", desc: "Statistiques en direct de tous les conteneurs" },
      { cmd: "docker stats --no-stream", desc: "Affiche un instantané sans rafraîchir" }
    ],
    flags: ["--no-stream"]
  },
  {
    name: "docker system prune",
    os: "docker",
    category: "Conteneurs",
    description: "Nettoie les ressources Docker inutilisées (conteneurs arrêtés, images orphelines, réseaux, cache).",
    syntax: "docker system prune [-a] [--volumes]",
    examples: [
      { cmd: "docker system prune", desc: "Nettoie les ressources inutilisées de base" },
      { cmd: "docker system prune -a --volumes", desc: "Nettoyage complet, y compris volumes" }
    ],
    flags: ["-a (tout, y compris images non utilisées)", "--volumes"]
  },
  {
    name: "docker tag",
    os: "docker",
    category: "Conteneurs",
    description: "Crée un alias (tag) pour une image, souvent utilisé avant un push vers un registry.",
    syntax: "docker tag <image_source> <image_cible>",
    examples: [
      { cmd: "docker tag monapp:latest monregistry.io/monapp:1.0", desc: "Tag pour un registry privé" }
    ],
    flags: []
  },
  {
    name: "docker cp",
    os: "docker",
    category: "Conteneurs",
    description: "Copie des fichiers entre l'hôte et un conteneur.",
    syntax: "docker cp <source> <conteneur>:<destination>",
    examples: [
      { cmd: "docker cp ./config.conf mon-nginx:/etc/nginx/", desc: "Copie un fichier vers le conteneur" },
      { cmd: "docker cp mon-nginx:/var/log/nginx/error.log ./", desc: "Copie un fichier depuis le conteneur" }
    ],
    flags: []
  },
  {
    name: "docker restart",
    os: "docker",
    category: "Conteneurs",
    description: "Redémarre un conteneur en cours d'exécution.",
    syntax: "docker restart <conteneur>",
    examples: [
      { cmd: "docker restart mon-nginx", desc: "Redémarre le conteneur" },
      { cmd: "docker restart --time 30 mon-nginx", desc: "Redémarre avec un délai d'arrêt étendu" }
    ],
    flags: ["--time / -t (délai avant kill)"]
  },
  {
    name: "Dockerfile (build multi-stage)",
    os: "docker",
    category: "Conteneurs",
    description: "Référence rapide de la syntaxe Dockerfile pour construire une image multi-étapes optimisée.",
    syntax: "FROM <image> AS <étape> ... COPY --from=<étape>",
    examples: [
      { cmd: "FROM node:20 AS build", desc: "Étape de build avec toutes les dépendances" },
      { cmd: "COPY --from=build /app/dist /usr/share/nginx/html", desc: "Récupère uniquement le résultat compilé" }
    ],
    flags: ["FROM", "RUN", "COPY", "EXPOSE", "CMD", "ENTRYPOINT"]
  },
  {
    name: "docker start / docker pause",
    os: "docker",
    category: "Conteneurs",
    description: "Démarre un conteneur arrêté ou met en pause/reprend un conteneur actif.",
    syntax: "docker start <conteneur> | docker pause <conteneur>",
    examples: [
      { cmd: "docker start mon-nginx", desc: "Redémarre un conteneur arrêté" },
      { cmd: "docker pause mon-nginx", desc: "Gèle tous les processus du conteneur" },
      { cmd: "docker unpause mon-nginx", desc: "Reprend l'exécution" }
    ],
    flags: ["-a (attacher les sorties)"]
  },
  {
    name: "docker port",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche le mapping de ports d'un conteneur en cours d'exécution.",
    syntax: "docker port <conteneur>",
    examples: [
      { cmd: "docker port mon-nginx", desc: "Liste les ports publiés du conteneur" }
    ],
    flags: []
  },
  {
    name: "docker diff",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche les fichiers modifiés, ajoutés ou supprimés dans un conteneur par rapport à son image.",
    syntax: "docker diff <conteneur>",
    examples: [
      { cmd: "docker diff mon-nginx", desc: "Liste les changements de fichiers du conteneur" }
    ],
    flags: []
  },
  {
    name: "docker commit",
    os: "docker",
    category: "Conteneurs",
    description: "Crée une nouvelle image à partir de l'état actuel d'un conteneur.",
    syntax: "docker commit <conteneur> <nouvelle_image>",
    examples: [
      { cmd: "docker commit mon-nginx mon-nginx-custom:1.0", desc: "Sauvegarde l'état du conteneur en image" }
    ],
    flags: ["-m (message)", "-a (auteur)"]
  },
  {
    name: "docker save / docker load",
    os: "docker",
    category: "Conteneurs",
    description: "Exporte une image dans un fichier .tar ou l'importe depuis ce fichier (sans registry).",
    syntax: "docker save -o <fichier.tar> <image> | docker load -i <fichier.tar>",
    examples: [
      { cmd: "docker save -o nginx.tar nginx:latest", desc: "Exporte l'image vers un fichier" },
      { cmd: "docker load -i nginx.tar", desc: "Importe l'image depuis le fichier" }
    ],
    flags: ["-o (fichier de sortie)", "-i (fichier d'entrée)"]
  },
  {
    name: "docker export / docker import",
    os: "docker",
    category: "Conteneurs",
    description: "Exporte le système de fichiers d'un conteneur (sans historique) ou l'importe comme nouvelle image.",
    syntax: "docker export <conteneur> -o <fichier.tar> | docker import <fichier.tar>",
    examples: [
      { cmd: "docker export mon-nginx -o fs.tar", desc: "Exporte le filesystem du conteneur" },
      { cmd: "docker import fs.tar mon-image:1.0", desc: "Crée une image à partir du filesystem exporté" }
    ],
    flags: ["-o (fichier de sortie)"]
  },
  {
    name: "docker history",
    os: "docker",
    category: "Conteneurs",
    description: "Affiche l'historique des couches (layers) d'une image avec leur taille.",
    syntax: "docker history <image>",
    examples: [
      { cmd: "docker history nginx:latest", desc: "Liste les layers et leur taille respective" }
    ],
    flags: ["--no-trunc (commandes complètes)"]
  },
  {
    name: "docker login / docker logout",
    os: "docker",
    category: "Conteneurs",
    description: "Authentifie ou déconnecte la session vis-à-vis d'un registry Docker (Docker Hub ou privé).",
    syntax: "docker login [registry] | docker logout [registry]",
    examples: [
      { cmd: "docker login", desc: "Connexion à Docker Hub" },
      { cmd: "docker login monregistry.io", desc: "Connexion à un registry privé" }
    ],
    flags: ["-u (utilisateur)", "-p (mot de passe)"]
  },
  {
    name: "docker-compose build",
    os: "docker",
    category: "Conteneurs",
    description: "Construit ou reconstruit les images des services définis dans docker-compose.yml.",
    syntax: "docker-compose build [--no-cache]",
    examples: [
      { cmd: "docker-compose build", desc: "Reconstruit les images modifiées" },
      { cmd: "docker-compose build --no-cache", desc: "Reconstruit sans utiliser le cache" }
    ],
    flags: ["--no-cache", "--pull"]
  },
  {
    name: "docker-compose ps / restart",
    os: "docker",
    category: "Conteneurs",
    description: "Liste l'état des services d'une stack ou les redémarre.",
    syntax: "docker-compose ps | docker-compose restart [service]",
    examples: [
      { cmd: "docker-compose ps", desc: "État de tous les services de la stack" },
      { cmd: "docker-compose restart web", desc: "Redémarre uniquement le service web" }
    ],
    flags: []
  },
  {
    name: "docker swarm init",
    os: "docker",
    category: "Conteneurs",
    description: "Initialise un cluster Docker Swarm pour orchestrer des conteneurs sur plusieurs nœuds.",
    syntax: "docker swarm init [--advertise-addr <ip>]",
    examples: [
      { cmd: "docker swarm init", desc: "Initialise le nœud courant comme manager" },
      { cmd: "docker swarm join-token worker", desc: "Affiche la commande pour ajouter un worker" }
    ],
    flags: ["--advertise-addr"]
  },
  {
    name: "docker service",
    os: "docker",
    category: "Conteneurs",
    description: "Gère les services dans un cluster Docker Swarm (équivalent deployment de Kubernetes).",
    syntax: "docker service create --name <nom> --replicas <n> <image>",
    examples: [
      { cmd: "docker service create --name web --replicas 3 nginx", desc: "Déploie un service répliqué" },
      { cmd: "docker service scale web=5", desc: "Ajuste le nombre de réplicas" }
    ],
    flags: ["--replicas", "create", "scale", "update"]
  },
  {
    name: "docker secret",
    os: "docker",
    category: "Permissions",
    description: "Gère des secrets chiffrés (mots de passe, certificats) distribués aux services Swarm.",
    syntax: "docker secret create <nom> <fichier>",
    examples: [
      { cmd: "echo \"S3cret!\" | docker secret create db_password -", desc: "Crée un secret depuis l'entrée standard" },
      { cmd: "docker secret ls", desc: "Liste les secrets existants" }
    ],
    flags: ["create", "ls", "rm"]
  },
  {
    name: "docker context",
    os: "docker",
    category: "Conteneurs",
    description: "Bascule entre plusieurs environnements Docker (local, distant via SSH, cloud).",
    syntax: "docker context <action>",
    examples: [
      { cmd: "docker context ls", desc: "Liste les contextes disponibles" },
      { cmd: "docker context use mon-serveur-distant", desc: "Bascule vers un Docker distant" }
    ],
    flags: ["ls", "use", "create"]
  },
  {
    name: "docker buildx",
    os: "docker",
    category: "Conteneurs",
    description: "Construit des images multi-architecture (ex: amd64 + arm64) avec BuildKit.",
    syntax: "docker buildx build --platform <plateformes> -t <image> .",
    examples: [
      { cmd: "docker buildx build --platform linux/amd64,linux/arm64 -t monapp:1.0 .", desc: "Build multi-architecture" },
      { cmd: "docker buildx ls", desc: "Liste les builders disponibles" }
    ],
    flags: ["--platform", "--push"]
  },

  // ── ANSIBLE ───────────────────────────────────────────────
  {
    name: "ansible",
    os: "ansible",
    category: "Système",
    description: "Exécute une commande ad-hoc sur des hôtes distants.",
    syntax: "ansible <hôtes> -m <module> -a '<arguments>'",
    examples: [
      { cmd: "ansible all -m ping", desc: "Vérifie la connectivité de tous les hôtes" },
      { cmd: "ansible webservers -m shell -a 'uptime'", desc: "Exécute uptime sur les webservers" },
      { cmd: "ansible db -m copy -a 'src=app.conf dest=/etc/app.conf'", desc: "Copie un fichier" }
    ],
    flags: ["-m (module)", "-a (arguments)", "-i (inventaire)", "-u (utilisateur)", "--become (sudo)"]
  },
  {
    name: "ansible-playbook",
    os: "ansible",
    category: "Système",
    description: "Exécute un playbook Ansible (fichier YAML de tâches automatisées).",
    syntax: "ansible-playbook <playbook.yml>",
    examples: [
      { cmd: "ansible-playbook deploy.yml", desc: "Exécute le playbook deploy.yml" },
      { cmd: "ansible-playbook deploy.yml --check", desc: "Mode dry-run (simulation)" },
      { cmd: "ansible-playbook deploy.yml -l webservers -t nginx", desc: "Limite aux webservers, tag nginx" }
    ],
    flags: ["--check (dry-run)", "-l (limit)", "-t (tags)", "--skip-tags", "-v / -vvv (verbosité)"]
  },
  {
    name: "ansible-vault",
    os: "ansible",
    category: "Système",
    description: "Chiffre et déchiffre des fichiers de secrets Ansible.",
    syntax: "ansible-vault <action> <fichier>",
    examples: [
      { cmd: "ansible-vault create secrets.yml", desc: "Crée un fichier chiffré" },
      { cmd: "ansible-vault encrypt vars/passwords.yml", desc: "Chiffre un fichier existant" },
      { cmd: "ansible-vault view secrets.yml", desc: "Affiche sans déchiffrer sur disque" }
    ],
    flags: ["create / encrypt / decrypt / view / edit / rekey"]
  },
  {
    name: "ansible-inventory",
    os: "ansible",
    category: "Système",
    description: "Affiche et manipule l'inventaire Ansible.",
    syntax: "ansible-inventory [options]",
    examples: [
      { cmd: "ansible-inventory --list", desc: "Affiche l'inventaire complet en JSON" },
      { cmd: "ansible-inventory --graph", desc: "Affiche la hiérarchie des groupes" },
      { cmd: "ansible-inventory -i hosts.ini --list", desc: "Inventaire depuis un fichier spécifique" }
    ],
    flags: ["--list", "--graph", "--host <hôte>", "-i (inventaire)"]
  },
  {
    name: "ansible-galaxy",
    os: "ansible",
    category: "Paquets",
    description: "Gère les rôles et collections Ansible depuis Ansible Galaxy.",
    syntax: "ansible-galaxy <action>",
    examples: [
      { cmd: "ansible-galaxy install geerlingguy.nginx", desc: "Installe un rôle" },
      { cmd: "ansible-galaxy collection install community.docker", desc: "Installe une collection" },
      { cmd: "ansible-galaxy install -r requirements.yml", desc: "Installe depuis un fichier requirements" }
    ],
    flags: ["install / remove / list / init / search"]
  },
  {
    name: "ansible-doc",
    os: "ansible",
    category: "Système",
    description: "Affiche la documentation d'un module Ansible.",
    syntax: "ansible-doc <module>",
    examples: [
      { cmd: "ansible-doc copy", desc: "Doc du module copy" },
      { cmd: "ansible-doc -l", desc: "Liste tous les modules disponibles" },
      { cmd: "ansible-doc -s apt", desc: "Snippet YAML du module apt" }
    ],
    flags: ["-l (list)", "-s (snippet)", "-t (type : module/role/...)"]
  },
  {
    name: "ansible-playbook --check",
    os: "ansible",
    category: "Système",
    description: "Simule l'exécution d'un playbook sans appliquer réellement les changements (dry-run).",
    syntax: "ansible-playbook <playbook.yml> --check --diff",
    examples: [
      { cmd: "ansible-playbook site.yml --check", desc: "Mode simulation, aucune modification" },
      { cmd: "ansible-playbook site.yml --check --diff", desc: "Simulation + affiche les différences" }
    ],
    flags: ["--check", "--diff", "--limit"]
  },
  {
    name: "ansible-playbook --limit",
    os: "ansible",
    category: "Système",
    description: "Restreint l'exécution d'un playbook à un sous-ensemble d'hôtes de l'inventaire.",
    syntax: "ansible-playbook <playbook.yml> --limit <groupe|hôte>",
    examples: [
      { cmd: "ansible-playbook site.yml --limit webservers", desc: "N'exécute que sur le groupe webservers" },
      { cmd: "ansible-playbook site.yml --limit srv01.nexa.local", desc: "N'exécute que sur un hôte précis" }
    ],
    flags: ["--limit", "--tags", "--skip-tags"]
  },
  {
    name: "ansible-playbook --tags",
    os: "ansible",
    category: "Système",
    description: "Exécute uniquement certaines tâches d'un playbook, identifiées par des tags.",
    syntax: "ansible-playbook <playbook.yml> --tags <tag1,tag2>",
    examples: [
      { cmd: "ansible-playbook site.yml --tags \"nginx,firewall\"", desc: "N'exécute que les tâches taggées" },
      { cmd: "ansible-playbook site.yml --skip-tags debug", desc: "Saute les tâches taggées debug" }
    ],
    flags: ["--tags", "--skip-tags"]
  },
  {
    name: "ansible all -m ping",
    os: "ansible",
    category: "Système",
    description: "Vérifie la connectivité Ansible (SSH + Python) vers tous les hôtes de l'inventaire.",
    syntax: "ansible all -m ping [-i <inventaire>]",
    examples: [
      { cmd: "ansible all -m ping", desc: "Teste tous les hôtes de l'inventaire par défaut" },
      { cmd: "ansible webservers -m ping -i inventory.ini", desc: "Teste un groupe avec un inventaire précis" }
    ],
    flags: ["-m (module)", "-i (inventaire)"]
  },
  {
    name: "ansible -m setup",
    os: "ansible",
    category: "Système",
    description: "Récupère les facts système (OS, RAM, IP, disques...) d'un ou plusieurs hôtes.",
    syntax: "ansible <hôtes> -m setup [-a 'filter=<motif>']",
    examples: [
      { cmd: "ansible webservers -m setup", desc: "Récupère tous les facts système" },
      { cmd: "ansible all -m setup -a 'filter=ansible_distribution*'", desc: "Filtre uniquement les facts de distribution" }
    ],
    flags: ["-a (arguments du module)"]
  },
  {
    name: "ansible -m shell",
    os: "ansible",
    category: "Système",
    description: "Exécute une commande shell brute sur les hôtes distants (mode ad-hoc).",
    syntax: "ansible <hôtes> -m shell -a '<commande>'",
    examples: [
      { cmd: "ansible webservers -m shell -a 'systemctl status nginx'", desc: "Exécute une commande shell distante" },
      { cmd: "ansible all -m command -a 'uptime'", desc: "Variante sécurisée sans interprétation shell" }
    ],
    flags: ["-a (commande)", "-b (become/sudo)"]
  },
  {
    name: "ansible-config",
    os: "ansible",
    category: "Système",
    description: "Affiche ou vérifie la configuration active d'Ansible (ansible.cfg).",
    syntax: "ansible-config <action>",
    examples: [
      { cmd: "ansible-config view", desc: "Affiche le fichier de config actif" },
      { cmd: "ansible-config dump --only-changed", desc: "Affiche uniquement les paramètres modifiés" }
    ],
    flags: ["view", "dump", "list"]
  },
  {
    name: "ansible-vault view / edit",
    os: "ansible",
    category: "Système",
    description: "Consulte ou édite un fichier chiffré par ansible-vault sans le déchiffrer durablement.",
    syntax: "ansible-vault view|edit <fichier>",
    examples: [
      { cmd: "ansible-vault view secrets.yml", desc: "Affiche le contenu déchiffré temporairement" },
      { cmd: "ansible-vault edit secrets.yml", desc: "Édite directement le fichier chiffré" }
    ],
    flags: ["view", "edit", "rekey (changer le mot de passe)"]
  },
  {
    name: "ansible-pull",
    os: "ansible",
    category: "Système",
    description: "Exécute un playbook en mode pull : la machine cible récupère et applique elle-même la config depuis un dépôt Git.",
    syntax: "ansible-pull -U <dépôt_git> <playbook.yml>",
    examples: [
      { cmd: "ansible-pull -U https://git.nexa.local/infra.git site.yml", desc: "Récupère et applique la config depuis Git" }
    ],
    flags: ["-U (url du dépôt)", "-C (branche)"]
  },
  {
    name: "ansible-lint",
    os: "ansible",
    category: "Système",
    description: "Analyse statiquement un playbook pour détecter les erreurs de style et les mauvaises pratiques.",
    syntax: "ansible-lint <playbook.yml>",
    examples: [
      { cmd: "ansible-lint site.yml", desc: "Vérifie le playbook avant exécution" }
    ],
    flags: ["-x (exclure une règle)"]
  },
  {
    name: "ansible-playbook -v",
    os: "ansible",
    category: "Système",
    description: "Augmente le niveau de verbosité de l'exécution pour faciliter le débogage.",
    syntax: "ansible-playbook <playbook.yml> -v | -vv | -vvv",
    examples: [
      { cmd: "ansible-playbook site.yml -vvv", desc: "Verbosité maximale, affiche les détails de connexion" }
    ],
    flags: ["-v", "-vv", "-vvv", "-vvvv (connection debug)"]
  },
  {
    name: "ansible-galaxy collection install",
    os: "ansible",
    category: "Paquets",
    description: "Installe une collection Ansible (modules/plugins groupés, ex: community.general).",
    syntax: "ansible-galaxy collection install <namespace.collection>",
    examples: [
      { cmd: "ansible-galaxy collection install community.general", desc: "Installe une collection communautaire" },
      { cmd: "ansible-galaxy collection list", desc: "Liste les collections installées" }
    ],
    flags: ["-r (requirements.yml)", "list"]
  },
  {
    name: "ansible-playbook --syntax-check",
    os: "ansible",
    category: "Système",
    description: "Vérifie uniquement la syntaxe YAML d'un playbook sans l'exécuter.",
    syntax: "ansible-playbook <playbook.yml> --syntax-check",
    examples: [
      { cmd: "ansible-playbook site.yml --syntax-check", desc: "Valide la syntaxe avant de lancer" }
    ],
    flags: ["--syntax-check", "--list-tasks", "--list-hosts"]
  },
  {
    name: "ansible-playbook --extra-vars",
    os: "ansible",
    category: "Système",
    description: "Passe des variables supplémentaires à un playbook depuis la ligne de commande.",
    syntax: "ansible-playbook <playbook.yml> --extra-vars \"<clé>=<valeur>\"",
    examples: [
      { cmd: "ansible-playbook site.yml --extra-vars \"env=production version=2.1\"", desc: "Passe deux variables inline" },
      { cmd: "ansible-playbook site.yml -e @vars.yml", desc: "Charge les variables depuis un fichier YAML" }
    ],
    flags: ["--extra-vars / -e", "@fichier.yml"]
  },
  {
    name: "ansible-vault create",
    os: "ansible",
    category: "Permissions",
    description: "Crée un nouveau fichier chiffré pour stocker des données sensibles (mots de passe, clés API).",
    syntax: "ansible-vault create <fichier.yml>",
    examples: [
      { cmd: "ansible-vault create secrets.yml", desc: "Crée et ouvre un fichier chiffré pour édition" },
      { cmd: "ansible-vault encrypt vars.yml", desc: "Chiffre un fichier déjà existant" }
    ],
    flags: ["create", "encrypt", "decrypt"]
  },
  {
    name: "ansible-playbook --vault-password-file",
    os: "ansible",
    category: "Permissions",
    description: "Exécute un playbook utilisant des fichiers vault en fournissant le mot de passe depuis un fichier.",
    syntax: "ansible-playbook <playbook.yml> --vault-password-file <fichier>",
    examples: [
      { cmd: "ansible-playbook site.yml --vault-password-file ~/.vault_pass", desc: "Déchiffre automatiquement sans saisie manuelle" }
    ],
    flags: ["--vault-password-file", "--ask-vault-pass"]
  },
  {
    name: "ansible-inventory --graph",
    os: "ansible",
    category: "Système",
    description: "Affiche l'inventaire sous forme d'arborescence visuelle des groupes et hôtes.",
    syntax: "ansible-inventory --graph",
    examples: [
      { cmd: "ansible-inventory --graph", desc: "Vue arborescente de l'inventaire" },
      { cmd: "ansible-inventory --list", desc: "Export complet au format JSON" }
    ],
    flags: ["--graph", "--list", "--host <nom>"]
  },
  {
    name: "ansible -m copy",
    os: "ansible",
    category: "Système",
    description: "Copie un fichier local vers les hôtes distants (mode ad-hoc, sans playbook).",
    syntax: "ansible <hôtes> -m copy -a 'src=<local> dest=<distant>'",
    examples: [
      { cmd: "ansible webservers -m copy -a 'src=nginx.conf dest=/etc/nginx/nginx.conf'", desc: "Copie un fichier de config" }
    ],
    flags: ["-a (arguments)", "mode= (permissions)"]
  },
  {
    name: "ansible -m service",
    os: "ansible",
    category: "Services",
    description: "Gère l'état d'un service système sur les hôtes distants (start/stop/restart/enabled).",
    syntax: "ansible <hôtes> -m service -a 'name=<service> state=<état>'",
    examples: [
      { cmd: "ansible webservers -m service -a 'name=nginx state=restarted'", desc: "Redémarre nginx sur tous les serveurs web" },
      { cmd: "ansible all -m service -a 'name=fail2ban state=started enabled=yes'", desc: "Démarre et active au boot" }
    ],
    flags: ["state=started|stopped|restarted", "enabled=yes|no"]
  },
  {
    name: "ansible -m apt / -m yum",
    os: "ansible",
    category: "Paquets",
    description: "Installe ou met à jour des paquets sur les hôtes distants via le gestionnaire de paquets natif.",
    syntax: "ansible <hôtes> -m apt -a 'name=<paquet> state=<état>'",
    examples: [
      { cmd: "ansible debian_servers -m apt -a 'name=nginx state=present update_cache=yes'", desc: "Installe nginx sur Debian/Ubuntu" },
      { cmd: "ansible rhel_servers -m yum -a 'name=httpd state=latest'", desc: "Installe la dernière version sur RHEL" }
    ],
    flags: ["state=present|latest|absent", "update_cache=yes"]
  },
  {
    name: "ansible-playbook --diff",
    os: "ansible",
    category: "Système",
    description: "Affiche les différences de contenu des fichiers modifiés par le playbook.",
    syntax: "ansible-playbook <playbook.yml> --diff",
    examples: [
      { cmd: "ansible-playbook site.yml --diff --check", desc: "Combine simulation et affichage des différences" }
    ],
    flags: ["--diff"]
  },
  {
    name: "ansible-galaxy init",
    os: "ansible",
    category: "Paquets",
    description: "Génère la structure de dossiers standard pour créer un nouveau rôle Ansible.",
    syntax: "ansible-galaxy init <nom_role>",
    examples: [
      { cmd: "ansible-galaxy init mon-role-nginx", desc: "Crée l'arborescence standard (tasks, handlers, vars...)" }
    ],
    flags: []
  },
  {
    name: "ansible-playbook --become",
    os: "ansible",
    category: "Permissions",
    description: "Exécute les tâches avec élévation de privilèges (équivalent sudo) sur les hôtes distants.",
    syntax: "ansible-playbook <playbook.yml> --become [--ask-become-pass]",
    examples: [
      { cmd: "ansible-playbook site.yml --become", desc: "Exécute toutes les tâches en tant que root" },
      { cmd: "ansible-playbook site.yml --become --become-user www-data", desc: "Élève vers un autre utilisateur que root" }
    ],
    flags: ["--become / -b", "--become-user", "--ask-become-pass"]
  },
  {
    name: "ansible-playbook --forks",
    os: "ansible",
    category: "Système",
    description: "Définit le nombre de connexions parallèles vers les hôtes (par défaut 5), pour accélérer les gros inventaires.",
    syntax: "ansible-playbook <playbook.yml> --forks <n>",
    examples: [
      { cmd: "ansible-playbook site.yml --forks 20", desc: "Exécute sur 20 hôtes en parallèle" }
    ],
    flags: ["--forks / -f"]
  },
  {
    name: "ansible-playbook --start-at-task",
    os: "ansible",
    category: "Système",
    description: "Reprend l'exécution d'un playbook à partir d'une tâche précise, utile après un échec en milieu de playbook.",
    syntax: "ansible-playbook <playbook.yml> --start-at-task \"<nom_tâche>\"",
    examples: [
      { cmd: "ansible-playbook site.yml --start-at-task \"Configurer nginx\"", desc: "Saute les tâches précédentes déjà exécutées" }
    ],
    flags: ["--start-at-task"]
  },
  {
    name: "ansible-galaxy role install",
    os: "ansible",
    category: "Paquets",
    description: "Installe un rôle Ansible Galaxy depuis le Hub communautaire pour réutiliser des bonnes pratiques toutes faites.",
    syntax: "ansible-galaxy role install <namespace.role>",
    examples: [
      { cmd: "ansible-galaxy role install geerlingguy.nginx", desc: "Installe un rôle communautaire populaire" },
      { cmd: "ansible-galaxy role list", desc: "Liste les rôles installés" }
    ],
    flags: ["install", "list", "remove"]
  },

  // ── GIT ───────────────────────────────────────────────────
  {
    name: "git clone",
    os: "git",
    category: "Fichiers",
    description: "Clone un dépôt distant en local.",
    syntax: "git clone <url> [dossier]",
    examples: [
      { cmd: "git clone https://github.com/user/repo.git", desc: "Clone le dépôt" },
      { cmd: "git clone --depth 1 https://github.com/user/repo.git", desc: "Clone superficiel (historique minimal)" },
      { cmd: "git clone -b develop https://github.com/user/repo.git", desc: "Clone la branche develop" }
    ],
    flags: ["--depth n (historique limité)", "-b (branche)", "--bare", "--recursive"]
  },
  {
    name: "git commit",
    os: "git",
    category: "Fichiers",
    description: "Enregistre les modifications indexées dans l'historique.",
    syntax: "git commit [options]",
    examples: [
      { cmd: "git commit -m 'feat: ajout login'", desc: "Commit avec message" },
      { cmd: "git commit -am 'fix: correction bug'", desc: "Stage + commit en une commande" },
      { cmd: "git commit --amend --no-edit", desc: "Modifie le dernier commit sans changer le message" }
    ],
    flags: ["-m (message)", "-a (stage auto)", "--amend (modifier dernier commit)", "--no-edit"]
  },
  {
    name: "git status / log",
    os: "git",
    category: "Système",
    description: "Affiche l'état du dépôt ou l'historique des commits.",
    syntax: "git status | git log [options]",
    examples: [
      { cmd: "git status", desc: "Fichiers modifiés / indexés / non suivis" },
      { cmd: "git log --oneline --graph --all", desc: "Historique compact avec branches" },
      { cmd: "git log --author='Tom' --since='1 week ago'", desc: "Commits de Tom cette semaine" }
    ],
    flags: ["--oneline", "--graph", "--all", "--author", "--since / --until"]
  },
  {
    name: "git branch",
    os: "git",
    category: "Système",
    description: "Gère les branches du dépôt.",
    syntax: "git branch [options] [nom]",
    examples: [
      { cmd: "git branch", desc: "Liste les branches locales" },
      { cmd: "git branch -a", desc: "Toutes les branches (locales + distantes)" },
      { cmd: "git branch -d feature/login", desc: "Supprime la branche feature/login" }
    ],
    flags: ["-a (toutes)", "-d (supprimer)", "-D (forcer)", "-r (distantes)", "-m (renommer)"]
  },
  {
    name: "git stash",
    os: "git",
    category: "Fichiers",
    description: "Sauvegarde temporairement les modifications non commitées.",
    syntax: "git stash [action]",
    examples: [
      { cmd: "git stash", desc: "Met de côté les modifications en cours" },
      { cmd: "git stash pop", desc: "Restaure le dernier stash" },
      { cmd: "git stash list", desc: "Liste tous les stash" }
    ],
    flags: ["push / pop / list / drop / apply / clear"]
  },
  {
    name: "git rebase",
    os: "git",
    category: "Système",
    description: "Réapplique des commits sur une autre base.",
    syntax: "git rebase <branche>",
    examples: [
      { cmd: "git rebase main", desc: "Rebase la branche courante sur main" },
      { cmd: "git rebase -i HEAD~3", desc: "Rebase interactif sur les 3 derniers commits" },
      { cmd: "git rebase --abort", desc: "Annule un rebase en cours" }
    ],
    flags: ["-i (interactif)", "--abort", "--continue", "--skip"]
  },
  {
    name: "git push / git pull",
    os: "git",
    category: "Système",
    description: "Envoie les commits locaux vers un dépôt distant ou récupère les changements distants.",
    syntax: "git push <remote> <branche> ; git pull <remote> <branche>",
    examples: [
      { cmd: "git push origin main", desc: "Envoie la branche main vers origin" },
      { cmd: "git pull origin main", desc: "Récupère et fusionne les changements distants" },
      { cmd: "git push -u origin feature/login", desc: "Pousse et lie la branche distante" }
    ],
    flags: ["-u (set upstream)", "--force (forcer)", "--tags"]
  },
  {
    name: "git merge",
    os: "git",
    category: "Système",
    description: "Fusionne une branche dans la branche courante.",
    syntax: "git merge <branche>",
    examples: [
      { cmd: "git merge feature/login", desc: "Fusionne la branche feature/login dans la courante" },
      { cmd: "git merge --no-ff feature/login", desc: "Force un commit de merge même en fast-forward" },
      { cmd: "git merge --abort", desc: "Annule un merge en conflit" }
    ],
    flags: ["--no-ff", "--squash", "--abort"]
  },
  {
    name: "git diff",
    os: "git",
    category: "Système",
    description: "Affiche les différences entre fichiers, commits ou branches.",
    syntax: "git diff [options] [<commit1> <commit2>]",
    examples: [
      { cmd: "git diff", desc: "Différences non indexées" },
      { cmd: "git diff --staged", desc: "Différences déjà indexées (staged)" },
      { cmd: "git diff main feature/login", desc: "Compare deux branches" }
    ],
    flags: ["--staged", "--stat (résumé)", "--name-only"]
  },
  {
    name: "git reset",
    os: "git",
    category: "Système",
    description: "Annule des commits ou désindexe des fichiers, avec plusieurs niveaux de portée.",
    syntax: "git reset [--soft|--mixed|--hard] <commit>",
    examples: [
      { cmd: "git reset --soft HEAD~1", desc: "Annule le dernier commit, garde les modifications indexées" },
      { cmd: "git reset --hard HEAD~1", desc: "Annule le dernier commit et perd les modifications (attention)" },
      { cmd: "git reset fichier.txt", desc: "Désindexe un fichier sans toucher au contenu" }
    ],
    flags: ["--soft", "--mixed (défaut)", "--hard"]
  },
  {
    name: "git revert",
    os: "git",
    category: "Système",
    description: "Annule un commit en créant un nouveau commit inverse, sans réécrire l'historique.",
    syntax: "git revert <commit>",
    examples: [
      { cmd: "git revert HEAD", desc: "Annule le dernier commit proprement" },
      { cmd: "git revert abc123", desc: "Annule un commit spécifique par son hash" }
    ],
    flags: ["--no-commit (préparer sans valider)"]
  },
  {
    name: "git checkout / git switch",
    os: "git",
    category: "Système",
    description: "Change de branche ou restaure des fichiers à un état antérieur.",
    syntax: "git checkout <branche> | git switch <branche>",
    examples: [
      { cmd: "git switch feature/login", desc: "Bascule vers une branche existante" },
      { cmd: "git switch -c feature/new", desc: "Crée et bascule vers une nouvelle branche" },
      { cmd: "git checkout -- fichier.txt", desc: "Annule les modifications locales d'un fichier" }
    ],
    flags: ["-c (créer la branche)", "-- (restaurer un fichier)"]
  },
  {
    name: "git tag",
    os: "git",
    category: "Système",
    description: "Crée des tags pour marquer des points précis de l'historique (ex: versions).",
    syntax: "git tag <nom> [commit]",
    examples: [
      { cmd: "git tag v1.0.0", desc: "Crée un tag sur le commit courant" },
      { cmd: "git tag -a v1.0.0 -m \"Release 1.0\"", desc: "Crée un tag annoté avec message" },
      { cmd: "git push origin --tags", desc: "Pousse tous les tags vers le distant" }
    ],
    flags: ["-a (annoté)", "-d (supprimer)", "-l (lister)"]
  },
  {
    name: "git cherry-pick",
    os: "git",
    category: "Système",
    description: "Applique un commit précis d'une autre branche sur la branche courante.",
    syntax: "git cherry-pick <commit>",
    examples: [
      { cmd: "git cherry-pick abc123", desc: "Applique un commit spécifique" },
      { cmd: "git cherry-pick --abort", desc: "Annule un cherry-pick en conflit" }
    ],
    flags: ["--abort", "--continue", "-n (sans commit auto)"]
  },
  {
    name: "git remote",
    os: "git",
    category: "Système",
    description: "Gère les dépôts distants associés au dépôt local.",
    syntax: "git remote <action> [nom] [url]",
    examples: [
      { cmd: "git remote -v", desc: "Liste les remotes et leurs URL" },
      { cmd: "git remote add origin https://github.com/user/repo.git", desc: "Ajoute un remote" },
      { cmd: "git remote set-url origin <nouvelle_url>", desc: "Change l'URL d'un remote" }
    ],
    flags: ["-v (verbose)", "add", "remove", "set-url"]
  },
  {
    name: "git log",
    os: "git",
    category: "Système",
    description: "Affiche l'historique des commits avec différents niveaux de détail.",
    syntax: "git log [options]",
    examples: [
      { cmd: "git log --oneline --graph --all", desc: "Historique compact avec graphe des branches" },
      { cmd: "git log -p -2", desc: "Détail des 2 derniers commits avec diff" },
      { cmd: "git log --author=\"Tom\"", desc: "Filtre par auteur" }
    ],
    flags: ["--oneline", "--graph", "--all", "-p (patch)", "--author"]
  },
  {
    name: "git fetch",
    os: "git",
    category: "Système",
    description: "Récupère les changements distants sans les fusionner (contrairement à pull).",
    syntax: "git fetch [remote]",
    examples: [
      { cmd: "git fetch origin", desc: "Récupère les nouveautés sans fusionner" },
      { cmd: "git fetch --all", desc: "Récupère depuis tous les remotes configurés" }
    ],
    flags: ["--all", "--prune (nettoyer les branches supprimées)"]
  },
  {
    name: "git blame",
    os: "git",
    category: "Système",
    description: "Affiche qui a modifié chaque ligne d'un fichier et dans quel commit.",
    syntax: "git blame <fichier>",
    examples: [
      { cmd: "git blame index.js", desc: "Affiche l'auteur de chaque ligne" },
      { cmd: "git blame -L 10,20 index.js", desc: "Limite l'affichage à un intervalle de lignes" }
    ],
    flags: ["-L (limiter les lignes)"]
  },
  {
    name: "git config",
    os: "git",
    category: "Système",
    description: "Configure les paramètres Git (identité, alias, comportements par défaut).",
    syntax: "git config [--global] <clé> <valeur>",
    examples: [
      { cmd: "git config --global user.name \"Tom\"", desc: "Définit le nom d'auteur global" },
      { cmd: "git config --global user.email \"tom@example.com\"", desc: "Définit l'email global" },
      { cmd: "git config --global alias.st status", desc: "Crée un alias (git st = git status)" }
    ],
    flags: ["--global", "--local", "--list"]
  },
  {
    name: "git gitignore",
    os: "git",
    category: "Fichiers",
    description: "Référence rapide pour exclure des fichiers/dossiers du suivi Git via .gitignore.",
    syntax: "echo '<motif>' >> .gitignore",
    examples: [
      { cmd: "echo 'node_modules/' >> .gitignore", desc: "Exclut un dossier" },
      { cmd: "echo '*.log' >> .gitignore", desc: "Exclut tous les fichiers .log" },
      { cmd: "git rm -r --cached node_modules", desc: "Retire du suivi un dossier déjà tracké" }
    ],
    flags: []
  },
  {
    name: "git init",
    os: "git",
    category: "Système",
    description: "Initialise un nouveau dépôt Git vide dans le dossier courant.",
    syntax: "git init [nom_dossier]",
    examples: [
      { cmd: "git init", desc: "Initialise un dépôt dans le dossier courant" },
      { cmd: "git init mon-projet", desc: "Crée un dossier et l'initialise comme dépôt" },
      { cmd: "git init --bare", desc: "Crée un dépôt nu (sans répertoire de travail, pour un serveur)" }
    ],
    flags: ["--bare"]
  },
  {
    name: "git add",
    os: "git",
    category: "Fichiers",
    description: "Ajoute des modifications à l'index (staging area) avant un commit.",
    syntax: "git add <fichier|dossier>",
    examples: [
      { cmd: "git add fichier.txt", desc: "Indexe un fichier précis" },
      { cmd: "git add .", desc: "Indexe toutes les modifications du dossier courant" },
      { cmd: "git add -p", desc: "Indexe interactivement morceau par morceau" }
    ],
    flags: ["-p (patch/interactif)", "-A (tout, y compris suppressions)"]
  },
  {
    name: "git status",
    os: "git",
    category: "Système",
    description: "Affiche l'état du répertoire de travail : fichiers modifiés, indexés, non suivis.",
    syntax: "git status [-s]",
    examples: [
      { cmd: "git status", desc: "Affichage détaillé de l'état du dépôt" },
      { cmd: "git status -s", desc: "Affichage compact (une ligne par fichier)" }
    ],
    flags: ["-s (short)", "-b (afficher la branche)"]
  },
  {
    name: "git restore",
    os: "git",
    category: "Fichiers",
    description: "Restaure des fichiers à leur état du dernier commit (remplace l'ancien checkout -- pour ce cas).",
    syntax: "git restore <fichier> [--staged]",
    examples: [
      { cmd: "git restore fichier.txt", desc: "Annule les modifications locales d'un fichier" },
      { cmd: "git restore --staged fichier.txt", desc: "Désindexe un fichier sans perdre les modifications" }
    ],
    flags: ["--staged", "--source (depuis un commit précis)"]
  },
  {
    name: "git branch -d / -D",
    os: "git",
    category: "Système",
    description: "Supprime une branche locale fusionnée (-d) ou de force (-D).",
    syntax: "git branch -d|-D <branche>",
    examples: [
      { cmd: "git branch -d feature/login", desc: "Supprime une branche déjà fusionnée" },
      { cmd: "git branch -D feature/abandon", desc: "Force la suppression même si non fusionnée" },
      { cmd: "git branch -m ancien-nom nouveau-nom", desc: "Renomme une branche" }
    ],
    flags: ["-d (safe delete)", "-D (force)", "-m (renommer)", "-r (branches distantes)"]
  },
  {
    name: "git push --delete",
    os: "git",
    category: "Système",
    description: "Supprime une branche sur le dépôt distant.",
    syntax: "git push <remote> --delete <branche>",
    examples: [
      { cmd: "git push origin --delete feature/login", desc: "Supprime la branche distante feature/login" }
    ],
    flags: ["--delete"]
  },
  {
    name: "git show",
    os: "git",
    category: "Système",
    description: "Affiche les détails complets d'un commit, tag ou objet Git.",
    syntax: "git show <commit|tag>",
    examples: [
      { cmd: "git show HEAD", desc: "Détails du dernier commit" },
      { cmd: "git show abc123:fichier.txt", desc: "Contenu d'un fichier à un commit précis" }
    ],
    flags: ["--stat (résumé seulement)"]
  },
  {
    name: "git reflog",
    os: "git",
    category: "Système",
    description: "Affiche l'historique des déplacements de HEAD, permet de récupérer des commits perdus.",
    syntax: "git reflog",
    examples: [
      { cmd: "git reflog", desc: "Liste tous les mouvements récents de HEAD" },
      { cmd: "git reset --hard HEAD@{2}", desc: "Restaure un état antérieur via le reflog" }
    ],
    flags: ["--all"]
  },
  {
    name: "git submodule",
    os: "git",
    category: "Système",
    description: "Intègre un autre dépôt Git comme sous-module dans le dépôt courant.",
    syntax: "git submodule add <url> [chemin]",
    examples: [
      { cmd: "git submodule add https://github.com/user/lib.git libs/lib", desc: "Ajoute un sous-module" },
      { cmd: "git submodule update --init --recursive", desc: "Initialise et récupère tous les sous-modules" }
    ],
    flags: ["add", "update --init --recursive", "status"]
  },
  {
    name: "git worktree",
    os: "git",
    category: "Système",
    description: "Crée plusieurs répertoires de travail liés au même dépôt, pour bosser sur plusieurs branches en parallèle.",
    syntax: "git worktree add <chemin> <branche>",
    examples: [
      { cmd: "git worktree add ../hotfix hotfix/urgent", desc: "Crée un dossier séparé pour une branche" },
      { cmd: "git worktree list", desc: "Liste les worktrees actifs" }
    ],
    flags: ["add", "list", "remove"]
  },
  {
    name: "git bisect",
    os: "git",
    category: "Système",
    description: "Recherche par dichotomie le commit ayant introduit un bug.",
    syntax: "git bisect start ; git bisect bad ; git bisect good <commit>",
    examples: [
      { cmd: "git bisect start", desc: "Démarre la session de bisect" },
      { cmd: "git bisect bad", desc: "Marque le commit courant comme défectueux" },
      { cmd: "git bisect good v1.0", desc: "Marque un commit antérieur comme sain" }
    ],
    flags: ["start", "bad", "good", "reset"]
  },
  {
    name: "git clean",
    os: "git",
    category: "Fichiers",
    description: "Supprime les fichiers non suivis (non trackés) du répertoire de travail.",
    syntax: "git clean -f [-d] [-n]",
    examples: [
      { cmd: "git clean -n", desc: "Simulation : montre ce qui serait supprimé" },
      { cmd: "git clean -fd", desc: "Supprime les fichiers et dossiers non suivis" }
    ],
    flags: ["-n (dry-run)", "-f (forcer)", "-d (inclure les dossiers)", "-x (inclure .gitignore)"]
  },
  {
    name: "git archive",
    os: "git",
    category: "Archives",
    description: "Exporte le contenu d'une branche ou d'un commit dans une archive (zip/tar) sans l'historique Git.",
    syntax: "git archive --format=<zip|tar> -o <fichier> <branche>",
    examples: [
      { cmd: "git archive --format=zip -o release.zip main", desc: "Exporte la branche main en ZIP" },
      { cmd: "git archive --format=tar HEAD | gzip > release.tar.gz", desc: "Exporte le commit courant compressé" }
    ],
    flags: ["--format=zip|tar", "-o (fichier de sortie)"]
  },
  {
    name: "git log --grep",
    os: "git",
    category: "Système",
    description: "Recherche dans les messages de commit selon un motif.",
    syntax: "git log --grep=<motif>",
    examples: [
      { cmd: "git log --grep=\"fix\"", desc: "Trouve les commits contenant 'fix'" },
      { cmd: "git log -S\"maFonction\"", desc: "Trouve les commits ayant ajouté/retiré ce texte (pickaxe)" }
    ],
    flags: ["--grep", "-S (pickaxe)", "-i (insensible à la casse)"]
  },
  {
    name: "git diff --staged",
    os: "git",
    category: "Système",
    description: "Compare le contenu indexé (staged) avec le dernier commit, avant de valider.",
    syntax: "git diff --staged",
    examples: [
      { cmd: "git diff --staged", desc: "Voir ce qui sera inclus dans le prochain commit" },
      { cmd: "git diff --staged --stat", desc: "Résumé des fichiers modifiés indexés" }
    ],
    flags: ["--stat"]
  },
  {
    name: "git commit --amend",
    os: "git",
    category: "Système",
    description: "Modifie le dernier commit (message ou contenu) au lieu d'en créer un nouveau.",
    syntax: "git commit --amend [-m <message>]",
    examples: [
      { cmd: "git commit --amend -m \"Nouveau message\"", desc: "Corrige le message du dernier commit" },
      { cmd: "git add fichier_oublié.txt && git commit --amend --no-edit", desc: "Ajoute un fichier oublié sans changer le message" }
    ],
    flags: ["--no-edit", "-m"]
  },
  {
    name: "git log --follow",
    os: "git",
    category: "Système",
    description: "Suit l'historique d'un fichier même à travers des renommages.",
    syntax: "git log --follow <fichier>",
    examples: [
      { cmd: "git log --follow -- fichier.txt", desc: "Historique complet malgré les renommages" }
    ],
    flags: ["--follow", "-p (avec diff)"]
  },
  {
    name: "git stash branch",
    os: "git",
    category: "Système",
    description: "Crée une nouvelle branche directement à partir d'un stash, pratique en cas de conflit.",
    syntax: "git stash branch <nouvelle_branche> [stash@{n}]",
    examples: [
      { cmd: "git stash branch fix/urgent", desc: "Crée une branche à partir du dernier stash" }
    ],
    flags: []
  },
  {
    name: "git log --pretty=format",
    os: "git",
    category: "Système",
    description: "Personnalise l'affichage du log avec un format précis (utile pour scripts/changelogs).",
    syntax: "git log --pretty=format:\"<format>\"",
    examples: [
      { cmd: "git log --pretty=format:\"%h %s (%an)\"", desc: "Hash court, message, auteur" },
      { cmd: "git log --pretty=format:\"%ad %s\" --date=short", desc: "Date courte + message" }
    ],
    flags: ["%h (hash court)", "%s (message)", "%an (auteur)", "%ad (date)"]
  },
  {
    name: "git diff HEAD~1",
    os: "git",
    category: "Système",
    description: "Compare l'état actuel avec un commit antérieur précis (n commits en arrière).",
    syntax: "git diff HEAD~<n>",
    examples: [
      { cmd: "git diff HEAD~1", desc: "Différences depuis l'avant-dernier commit" },
      { cmd: "git diff HEAD~3 HEAD", desc: "Compare deux points précis de l'historique" }
    ],
    flags: []
  },
  {
    name: "git rm",
    os: "git",
    category: "Fichiers",
    description: "Supprime un fichier du répertoire de travail ET de l'index Git en une seule commande.",
    syntax: "git rm <fichier>",
    examples: [
      { cmd: "git rm fichier-obsolete.txt", desc: "Supprime le fichier et le désindexe" },
      { cmd: "git rm --cached secrets.env", desc: "Retire du suivi sans supprimer le fichier local" }
    ],
    flags: ["--cached (garder le fichier local)", "-r (récursif)"]
  },
  {
    name: "git mv",
    os: "git",
    category: "Fichiers",
    description: "Renomme ou déplace un fichier tout en le gardant suivi par Git.",
    syntax: "git mv <ancien> <nouveau>",
    examples: [
      { cmd: "git mv ancien.txt nouveau.txt", desc: "Renomme un fichier suivi" }
    ],
    flags: []
  },
  {
    name: "git describe",
    os: "git",
    category: "Système",
    description: "Décrit le commit courant par rapport au tag le plus proche (utile pour versionner automatiquement).",
    syntax: "git describe [--tags]",
    examples: [
      { cmd: "git describe --tags", desc: "Ex: v1.2.0-3-gabc1234 (3 commits après v1.2.0)" }
    ],
    flags: ["--tags", "--always"]
  },
  {
    name: "git log --since / --until",
    os: "git",
    category: "Système",
    description: "Filtre les commits sur une période donnée.",
    syntax: "git log --since=<date> --until=<date>",
    examples: [
      { cmd: "git log --since=\"2 weeks ago\"", desc: "Commits des deux dernières semaines" },
      { cmd: "git log --since=\"2026-01-01\" --until=\"2026-06-01\"", desc: "Commits entre deux dates précises" }
    ],
    flags: ["--since", "--until"]
  },
  {
    name: "git format-patch / git am",
    os: "git",
    category: "Fichiers",
    description: "Exporte des commits en fichiers .patch puis les applique sur un autre dépôt (workflow par email/patch).",
    syntax: "git format-patch -<n> ; git am <fichier.patch>",
    examples: [
      { cmd: "git format-patch -1 HEAD", desc: "Exporte le dernier commit en fichier .patch" },
      { cmd: "git am 0001-fix.patch", desc: "Applique un patch reçu" }
    ],
    flags: ["-1, -2... (nombre de commits)"]
  },

  // ── KUBECTL ───────────────────────────────────────────────
  {
    name: "kubectl get",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche les ressources Kubernetes (pods, services, deployments...).",
    syntax: "kubectl get <ressource> [options]",
    examples: [
      { cmd: "kubectl get pods", desc: "Liste les pods du namespace courant" },
      { cmd: "kubectl get pods -A", desc: "Pods de tous les namespaces" },
      { cmd: "kubectl get all -n production", desc: "Toutes les ressources du namespace production" }
    ],
    flags: ["-n (namespace)", "-A (tous namespaces)", "-o wide / yaml / json", "--watch (-w)"]
  },
  {
    name: "kubectl apply",
    os: "kubectl",
    category: "Conteneurs",
    description: "Applique une configuration depuis un fichier YAML/JSON.",
    syntax: "kubectl apply -f <fichier.yaml>",
    examples: [
      { cmd: "kubectl apply -f deployment.yaml", desc: "Applique un déploiement" },
      { cmd: "kubectl apply -f ./k8s/", desc: "Applique tous les fichiers du dossier k8s" },
      { cmd: "kubectl apply -k ./overlays/prod", desc: "Applique avec Kustomize" }
    ],
    flags: ["-f (fichier)", "-k (kustomize)", "--dry-run=client (simulation)", "--record"]
  },
  {
    name: "kubectl logs",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche les logs d'un pod ou conteneur.",
    syntax: "kubectl logs <pod> [options]",
    examples: [
      { cmd: "kubectl logs mon-pod", desc: "Logs du pod" },
      { cmd: "kubectl logs -f mon-pod -c mon-conteneur", desc: "Suit les logs d'un conteneur spécifique" },
      { cmd: "kubectl logs --previous mon-pod", desc: "Logs du conteneur précédent (crash)" }
    ],
    flags: ["-f (follow)", "-c (conteneur)", "--previous", "--tail n", "--since"]
  },
  {
    name: "kubectl exec",
    os: "kubectl",
    category: "Conteneurs",
    description: "Exécute une commande dans un pod.",
    syntax: "kubectl exec -it <pod> -- <commande>",
    examples: [
      { cmd: "kubectl exec -it mon-pod -- bash", desc: "Shell interactif dans le pod" },
      { cmd: "kubectl exec mon-pod -- env", desc: "Affiche les variables d'environnement" },
      { cmd: "kubectl exec -it mon-pod -c nginx -- nginx -t", desc: "Test config nginx dans le conteneur" }
    ],
    flags: ["-i (interactif)", "-t (TTY)", "-c (conteneur)", "-n (namespace)"]
  },
  {
    name: "kubectl describe",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche les détails complets d'une ressource Kubernetes.",
    syntax: "kubectl describe <ressource> <nom>",
    examples: [
      { cmd: "kubectl describe pod mon-pod", desc: "Détails du pod (events, état...)" },
      { cmd: "kubectl describe node worker-1", desc: "Infos du nœud worker-1" },
      { cmd: "kubectl describe svc mon-service -n prod", desc: "Détails du service en prod" }
    ],
    flags: ["-n (namespace)", "--show-events=false"]
  },
  {
    name: "kubectl delete",
    os: "kubectl",
    category: "Conteneurs",
    description: "Supprime des ressources Kubernetes.",
    syntax: "kubectl delete <ressource> <nom>",
    examples: [
      { cmd: "kubectl delete pod mon-pod", desc: "Supprime le pod" },
      { cmd: "kubectl delete -f deployment.yaml", desc: "Supprime ce qui est défini dans le YAML" },
      { cmd: "kubectl delete pod --all -n staging", desc: "Supprime tous les pods du namespace staging" }
    ],
    flags: ["-f (fichier)", "--all", "--grace-period=0 --force (immédiat)", "-n (namespace)"]
  },
  {
    name: "kubectl create deployment",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée rapidement un déploiement à partir d'une image, sans fichier YAML.",
    syntax: "kubectl create deployment <nom> --image=<image>",
    examples: [
      { cmd: "kubectl create deployment web --image=nginx", desc: "Crée un déploiement nginx" },
      { cmd: "kubectl create deployment web --image=nginx --replicas=3", desc: "Crée avec 3 réplicas d'emblée" }
    ],
    flags: ["--image", "--replicas", "--port"]
  },
  {
    name: "kubectl scale",
    os: "kubectl",
    category: "Conteneurs",
    description: "Modifie le nombre de réplicas d'un déploiement existant.",
    syntax: "kubectl scale deployment <nom> --replicas=<n>",
    examples: [
      { cmd: "kubectl scale deployment web --replicas=5", desc: "Passe à 5 réplicas" },
      { cmd: "kubectl scale deployment web --replicas=0", desc: "Stoppe le déploiement sans le supprimer" }
    ],
    flags: ["--replicas", "-n (namespace)"]
  },
  {
    name: "kubectl rollout",
    os: "kubectl",
    category: "Conteneurs",
    description: "Gère le déploiement progressif et l'historique des versions d'un déploiement.",
    syntax: "kubectl rollout <action> deployment/<nom>",
    examples: [
      { cmd: "kubectl rollout status deployment/web", desc: "Suit l'état du déploiement en cours" },
      { cmd: "kubectl rollout undo deployment/web", desc: "Revient à la version précédente" },
      { cmd: "kubectl rollout history deployment/web", desc: "Affiche l'historique des versions" }
    ],
    flags: ["status", "undo", "history", "restart"]
  },
  {
    name: "kubectl port-forward",
    os: "kubectl",
    category: "Conteneurs",
    description: "Redirige un port local vers un pod ou service, utile pour debug sans exposer publiquement.",
    syntax: "kubectl port-forward <pod|svc>/<nom> <port_local>:<port_distant>",
    examples: [
      { cmd: "kubectl port-forward pod/mon-pod 8080:80", desc: "Accède au pod via localhost:8080" },
      { cmd: "kubectl port-forward svc/mon-service 5432:5432", desc: "Redirige vers un service (ex: base de données)" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl get nodes",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste les nœuds du cluster et leur état.",
    syntax: "kubectl get nodes [-o wide]",
    examples: [
      { cmd: "kubectl get nodes", desc: "Liste les nœuds et leur statut" },
      { cmd: "kubectl get nodes -o wide", desc: "Affiche aussi l'IP et la version du kubelet" }
    ],
    flags: ["-o wide", "--show-labels"]
  },
  {
    name: "kubectl top",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche l'utilisation CPU/RAM des nœuds ou pods (nécessite metrics-server).",
    syntax: "kubectl top nodes | kubectl top pods",
    examples: [
      { cmd: "kubectl top nodes", desc: "Charge CPU/RAM par nœud" },
      { cmd: "kubectl top pods -n prod", desc: "Consommation des pods d'un namespace" }
    ],
    flags: ["-n (namespace)", "--sort-by"]
  },
  {
    name: "kubectl get namespace / kubectl create namespace",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste ou crée des namespaces, l'unité d'isolation logique de Kubernetes.",
    syntax: "kubectl get namespace | kubectl create namespace <nom>",
    examples: [
      { cmd: "kubectl get namespace", desc: "Liste tous les namespaces" },
      { cmd: "kubectl create namespace staging", desc: "Crée un namespace staging" }
    ],
    flags: []
  },
  {
    name: "kubectl config",
    os: "kubectl",
    category: "Système",
    description: "Gère les contextes kubeconfig pour basculer entre plusieurs clusters.",
    syntax: "kubectl config <action>",
    examples: [
      { cmd: "kubectl config get-contexts", desc: "Liste les contextes disponibles" },
      { cmd: "kubectl config use-context prod-cluster", desc: "Bascule vers un autre cluster" },
      { cmd: "kubectl config current-context", desc: "Affiche le contexte actif" }
    ],
    flags: ["get-contexts", "use-context", "current-context"]
  },
  {
    name: "kubectl apply -k (kustomize)",
    os: "kubectl",
    category: "Conteneurs",
    description: "Applique une configuration via Kustomize, pour personnaliser des manifests sans les dupliquer.",
    syntax: "kubectl apply -k <dossier>",
    examples: [
      { cmd: "kubectl apply -k overlays/prod", desc: "Applique l'overlay de production" }
    ],
    flags: ["-k (kustomize)"]
  },
  {
    name: "kubectl cp",
    os: "kubectl",
    category: "Conteneurs",
    description: "Copie des fichiers entre la machine locale et un pod.",
    syntax: "kubectl cp <source> <pod>:<destination>",
    examples: [
      { cmd: "kubectl cp ./config.yml mon-pod:/etc/app/config.yml", desc: "Copie un fichier vers le pod" },
      { cmd: "kubectl cp mon-pod:/var/log/app.log ./app.log", desc: "Copie un fichier depuis le pod" }
    ],
    flags: ["-c (conteneur)", "-n (namespace)"]
  },
  {
    name: "kubectl edit",
    os: "kubectl",
    category: "Conteneurs",
    description: "Édite directement une ressource Kubernetes en YAML via l'éditeur par défaut.",
    syntax: "kubectl edit <ressource> <nom>",
    examples: [
      { cmd: "kubectl edit deployment web", desc: "Ouvre le déploiement dans l'éditeur (modifie en direct)" },
      { cmd: "kubectl edit cm mon-configmap", desc: "Édite une ConfigMap" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl create secret",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée un secret Kubernetes pour stocker des informations sensibles (mots de passe, clés).",
    syntax: "kubectl create secret generic <nom> --from-literal=<clé>=<valeur>",
    examples: [
      { cmd: "kubectl create secret generic db-pass --from-literal=password=S3cret!", desc: "Crée un secret simple" },
      { cmd: "kubectl create secret generic tls-cert --from-file=tls.crt --from-file=tls.key", desc: "Crée un secret depuis des fichiers" }
    ],
    flags: ["--from-literal", "--from-file", "--type"]
  },
  {
    name: "kubectl get events",
    os: "kubectl",
    category: "Conteneurs",
    description: "Affiche les événements récents du cluster, utile pour diagnostiquer un pod en erreur.",
    syntax: "kubectl get events [--sort-by=<champ>]",
    examples: [
      { cmd: "kubectl get events --sort-by='.lastTimestamp'", desc: "Événements triés du plus récent" },
      { cmd: "kubectl get events -n prod", desc: "Événements d'un namespace précis" }
    ],
    flags: ["--sort-by", "-n (namespace)", "--watch"]
  },
  {
    name: "kubectl create configmap",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée une ConfigMap pour stocker des données de configuration non sensibles.",
    syntax: "kubectl create configmap <nom> --from-literal=<clé>=<valeur>",
    examples: [
      { cmd: "kubectl create configmap app-config --from-literal=ENV=production", desc: "Crée une ConfigMap simple" },
      { cmd: "kubectl create configmap app-config --from-file=config.yaml", desc: "Crée depuis un fichier" }
    ],
    flags: ["--from-literal", "--from-file", "--from-env-file"]
  },
  {
    name: "kubectl expose",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée un service qui expose un déploiement ou pod existant.",
    syntax: "kubectl expose deployment <nom> --port=<port> --type=<type>",
    examples: [
      { cmd: "kubectl expose deployment web --port=80 --type=ClusterIP", desc: "Expose en interne au cluster" },
      { cmd: "kubectl expose deployment web --port=80 --type=LoadBalancer", desc: "Expose via un load balancer externe" }
    ],
    flags: ["--port", "--type=ClusterIP|NodePort|LoadBalancer", "--target-port"]
  },
  {
    name: "kubectl get pods -o yaml",
    os: "kubectl",
    category: "Conteneurs",
    description: "Exporte la définition complète d'une ressource au format YAML ou JSON.",
    syntax: "kubectl get <ressource> <nom> -o yaml",
    examples: [
      { cmd: "kubectl get pod mon-pod -o yaml", desc: "Manifest complet du pod" },
      { cmd: "kubectl get deployment web -o json", desc: "Export en JSON" }
    ],
    flags: ["-o yaml", "-o json", "-o wide"]
  },
  {
    name: "kubectl explain",
    os: "kubectl",
    category: "Système",
    description: "Affiche la documentation intégrée d'un type de ressource ou d'un champ de manifest.",
    syntax: "kubectl explain <ressource>[.<champ>]",
    examples: [
      { cmd: "kubectl explain pod.spec.containers", desc: "Documentation du champ containers d'un pod" },
      { cmd: "kubectl explain deployment --recursive", desc: "Affiche toute l'arborescence des champs" }
    ],
    flags: ["--recursive"]
  },
  {
    name: "kubectl drain / cordon / uncordon",
    os: "kubectl",
    category: "Système",
    description: "Vide un nœud de ses pods avant maintenance (drain) ou le marque indisponible (cordon).",
    syntax: "kubectl drain <node> --ignore-daemonsets",
    examples: [
      { cmd: "kubectl cordon worker-1", desc: "Empêche le scheduling de nouveaux pods sur ce nœud" },
      { cmd: "kubectl drain worker-1 --ignore-daemonsets", desc: "Évacue les pods avant maintenance" },
      { cmd: "kubectl uncordon worker-1", desc: "Réactive le nœud après maintenance" }
    ],
    flags: ["--ignore-daemonsets", "--delete-emptydir-data", "--force"]
  },
  {
    name: "kubectl taint",
    os: "kubectl",
    category: "Système",
    description: "Applique une marque (taint) sur un nœud pour repousser certains pods sauf tolérance explicite.",
    syntax: "kubectl taint nodes <node> <clé>=<valeur>:<effet>",
    examples: [
      { cmd: "kubectl taint nodes worker-1 dedicated=gpu:NoSchedule", desc: "Réserve le nœud aux pods avec la tolérance correspondante" },
      { cmd: "kubectl taint nodes worker-1 dedicated-", desc: "Retire un taint (suffixe -)" }
    ],
    flags: ["NoSchedule", "PreferNoSchedule", "NoExecute"]
  },
  {
    name: "kubectl label",
    os: "kubectl",
    category: "Système",
    description: "Ajoute, modifie ou supprime un label sur une ressource Kubernetes.",
    syntax: "kubectl label <ressource> <nom> <clé>=<valeur>",
    examples: [
      { cmd: "kubectl label pod mon-pod env=prod", desc: "Ajoute un label au pod" },
      { cmd: "kubectl label pod mon-pod env-", desc: "Supprime le label (suffixe -)" },
      { cmd: "kubectl get pods -l env=prod", desc: "Filtre les pods par label" }
    ],
    flags: ["--overwrite", "-l (sélecteur de label)"]
  },
  {
    name: "kubectl annotate",
    os: "kubectl",
    category: "Système",
    description: "Ajoute des métadonnées non identifiantes (annotations) à une ressource.",
    syntax: "kubectl annotate <ressource> <nom> <clé>=<valeur>",
    examples: [
      { cmd: "kubectl annotate pod mon-pod description=\"Pod de test\"", desc: "Ajoute une annotation" }
    ],
    flags: ["--overwrite"]
  },
  {
    name: "kubectl autoscale",
    os: "kubectl",
    category: "Conteneurs",
    description: "Crée un Horizontal Pod Autoscaler pour ajuster automatiquement le nombre de réplicas selon la charge.",
    syntax: "kubectl autoscale deployment <nom> --min=<n> --max=<n> --cpu-percent=<%>",
    examples: [
      { cmd: "kubectl autoscale deployment web --min=2 --max=10 --cpu-percent=80", desc: "Scale entre 2 et 10 pods selon le CPU" },
      { cmd: "kubectl get hpa", desc: "Liste les autoscalers actifs" }
    ],
    flags: ["--min", "--max", "--cpu-percent"]
  },
  {
    name: "kubectl set image",
    os: "kubectl",
    category: "Conteneurs",
    description: "Met à jour l'image d'un conteneur dans un déploiement, déclenchant un rollout.",
    syntax: "kubectl set image deployment/<nom> <conteneur>=<nouvelle_image>",
    examples: [
      { cmd: "kubectl set image deployment/web nginx=nginx:1.25", desc: "Met à jour l'image vers une nouvelle version" }
    ],
    flags: ["--record"]
  },
  {
    name: "kubectl get pv / pvc",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste les volumes persistants (PV) et leurs revendications (PVC) pour le stockage.",
    syntax: "kubectl get pv | kubectl get pvc",
    examples: [
      { cmd: "kubectl get pv", desc: "Liste les volumes persistants du cluster" },
      { cmd: "kubectl get pvc -n prod", desc: "Liste les revendications de volume du namespace prod" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl get ingress",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste les ressources Ingress, qui gèrent le routage HTTP/HTTPS externe vers les services.",
    syntax: "kubectl get ingress [-n <namespace>]",
    examples: [
      { cmd: "kubectl get ingress", desc: "Liste les Ingress et leurs hôtes/adresses" },
      { cmd: "kubectl describe ingress mon-ingress", desc: "Détails des règles de routage" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl get all",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste toutes les ressources courantes (pods, services, deployments, replicasets) d'un namespace.",
    syntax: "kubectl get all [-n <namespace>]",
    examples: [
      { cmd: "kubectl get all -n prod", desc: "Vue d'ensemble du namespace prod" },
      { cmd: "kubectl get all --all-namespaces", desc: "Vue d'ensemble de tout le cluster" }
    ],
    flags: ["-n (namespace)", "--all-namespaces / -A"]
  },
  {
    name: "kubectl auth can-i",
    os: "kubectl",
    category: "Permissions",
    description: "Vérifie si l'utilisateur courant (ou un autre) a la permission d'effectuer une action RBAC.",
    syntax: "kubectl auth can-i <verbe> <ressource>",
    examples: [
      { cmd: "kubectl auth can-i delete pods", desc: "Vérifie si on peut supprimer des pods" },
      { cmd: "kubectl auth can-i create deployments --as=jdupont", desc: "Vérifie pour un autre utilisateur" }
    ],
    flags: ["--as (utilisateur)", "-n (namespace)"]
  },
  {
    name: "kubectl create role / rolebinding",
    os: "kubectl",
    category: "Permissions",
    description: "Crée des règles RBAC (Role) et les associe à un utilisateur ou groupe (RoleBinding).",
    syntax: "kubectl create role <nom> --verb=<verbes> --resource=<ressources>",
    examples: [
      { cmd: "kubectl create role lecteur --verb=get,list --resource=pods", desc: "Crée un rôle lecture seule sur les pods" },
      { cmd: "kubectl create rolebinding lecteur-binding --role=lecteur --user=jdupont", desc: "Associe le rôle à un utilisateur" }
    ],
    flags: ["--verb", "--resource", "--user", "--group"]
  },
  {
    name: "kubectl get replicaset",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste les ReplicaSets, qui assurent le maintien du nombre de réplicas d'un pod.",
    syntax: "kubectl get replicaset [-n <namespace>]",
    examples: [
      { cmd: "kubectl get rs", desc: "Liste les ReplicaSets (alias rs)" },
      { cmd: "kubectl describe rs mon-rs", desc: "Détails d'un ReplicaSet précis" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl get statefulset",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste les StatefulSets, utilisés pour les workloads avec état persistant (bases de données...).",
    syntax: "kubectl get statefulset [-n <namespace>]",
    examples: [
      { cmd: "kubectl get sts", desc: "Liste les StatefulSets (alias sts)" },
      { cmd: "kubectl scale sts mon-sts --replicas=3", desc: "Ajuste le nombre de réplicas" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl get daemonset",
    os: "kubectl",
    category: "Conteneurs",
    description: "Liste les DaemonSets, qui garantissent qu'un pod tourne sur chaque nœud du cluster.",
    syntax: "kubectl get daemonset [-n <namespace>]",
    examples: [
      { cmd: "kubectl get ds", desc: "Liste les DaemonSets (alias ds)" },
      { cmd: "kubectl describe ds fluentd", desc: "Détails d'un DaemonSet de logging" }
    ],
    flags: ["-n (namespace)"]
  },
  {
    name: "kubectl wait",
    os: "kubectl",
    category: "Conteneurs",
    description: "Attend qu'une ressource atteigne une condition précise (utile dans des scripts/CI).",
    syntax: "kubectl wait --for=condition=<condition> <ressource>/<nom>",
    examples: [
      { cmd: "kubectl wait --for=condition=ready pod/mon-pod --timeout=60s", desc: "Attend que le pod soit prêt" },
      { cmd: "kubectl wait --for=condition=available deployment/web", desc: "Attend qu'un déploiement soit disponible" }
    ],
    flags: ["--for", "--timeout"]
  },
  {
    name: "kubectl diff",
    os: "kubectl",
    category: "Conteneurs",
    description: "Compare un manifest local avec l'état actuellement appliqué dans le cluster (avant un apply).",
    syntax: "kubectl diff -f <fichier.yaml>",
    examples: [
      { cmd: "kubectl diff -f deployment.yaml", desc: "Montre ce qui changerait avant d'appliquer" }
    ],
    flags: ["-f"]
  },
  {
    name: "kubectl version",
    os: "kubectl",
    category: "Système",
    description: "Affiche la version du client kubectl et du serveur API Kubernetes connecté.",
    syntax: "kubectl version [--short]",
    examples: [
      { cmd: "kubectl version", desc: "Versions client et serveur" },
      { cmd: "kubectl cluster-info", desc: "Affiche les endpoints du cluster" }
    ],
    flags: ["--short", "--client"]
  },

  // ── WINDOWS SERVER ────────────────────────────────────────
  {
    name: "Get-ADUser",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Recherche et affiche les informations d'un ou plusieurs utilisateurs Active Directory.",
    syntax: "Get-ADUser -Identity <user> | -Filter {...}",
    examples: [
      { cmd: "Get-ADUser -Identity tom.marcorelli", desc: "Affiche l'utilisateur tom.marcorelli" },
      { cmd: "Get-ADUser -Filter * -Properties Email | Select Name,Email", desc: "Liste tous les users avec leur email" },
      { cmd: "Get-ADUser -Filter {Enabled -eq \\$false}", desc: "Liste les comptes désactivés" }
    ],
    flags: ["-Identity", "-Filter", "-Properties", "-SearchBase (OU ciblée)"]
  },
  {
    name: "New-ADUser",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Crée un nouvel utilisateur dans Active Directory.",
    syntax: "New-ADUser -Name <nom> [options]",
    examples: [
      { cmd: "New-ADUser -Name \"Tom Marcorelli\" -SamAccountName tom.m -Enabled \\$true", desc: "Crée un compte activé" },
      { cmd: "New-ADUser -Name jdupont -Path \"OU=Stagiaires,DC=sisr,DC=local\"", desc: "Crée dans une OU précise" }
    ],
    flags: ["-SamAccountName", "-Path (OU cible)", "-Enabled", "-AccountPassword"]
  },
  {
    name: "Get-ADGroup / Add-ADGroupMember",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Gère les groupes Active Directory et leurs membres.",
    syntax: "Add-ADGroupMember -Identity <groupe> -Members <user>",
    examples: [
      { cmd: "Get-ADGroup -Filter \"Name -like 'Admins*'\"", desc: "Cherche les groupes commençant par Admins" },
      { cmd: "Add-ADGroupMember -Identity \"IT-Support\" -Members tom.m", desc: "Ajoute tom.m au groupe IT-Support" },
      { cmd: "Get-ADGroupMember -Identity \"IT-Support\"", desc: "Liste les membres du groupe" }
    ],
    flags: ["-Identity", "-Members", "-Filter"]
  },
  {
    name: "dsquery",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Recherche des objets Active Directory en ligne de commande (CMD, legacy mais toujours utilisé).",
    syntax: "dsquery <type> [filtre]",
    examples: [
      { cmd: "dsquery user -name \"tom*\"", desc: "Cherche les utilisateurs commençant par tom" },
      { cmd: "dsquery computer -inactive 4", desc: "Ordinateurs inactifs depuis 4 semaines" },
      { cmd: "dsquery group -name \"Admins*\"", desc: "Cherche des groupes par nom" }
    ],
    flags: ["user / computer / group / ou / contact"]
  },
  {
    name: "gpupdate",
    os: "windows-server",
    category: "Système",
    description: "Force l'application immédiate des stratégies de groupe (GPO) sur la machine.",
    syntax: "gpupdate [/force]",
    examples: [
      { cmd: "gpupdate /force", desc: "Force l'application complète des GPO" },
      { cmd: "gpupdate /target:computer", desc: "Applique uniquement les GPO ordinateur" },
      { cmd: "gpresult /r", desc: "Affiche les GPO actuellement appliquées" }
    ],
    flags: ["/force", "/target:user|computer", "/logoff", "/boot"]
  },
  {
    name: "Install-WindowsFeature",
    os: "windows-server",
    category: "Paquets",
    description: "Installe un rôle ou une fonctionnalité Windows Server (AD DS, DNS, DHCP, IIS...).",
    syntax: "Install-WindowsFeature -Name <rôle> [-IncludeManagementTools]",
    examples: [
      { cmd: "Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools", desc: "Installe le rôle AD DS" },
      { cmd: "Install-WindowsFeature -Name DNS -IncludeManagementTools", desc: "Installe le rôle DNS" },
      { cmd: "Install-WindowsFeature -Name DHCP -IncludeManagementTools", desc: "Installe le rôle DHCP" }
    ],
    flags: ["-IncludeManagementTools", "-Restart", "-Source"]
  },
  {
    name: "Get-WindowsFeature",
    os: "windows-server",
    category: "Système",
    description: "Liste les rôles et fonctionnalités disponibles ou installés sur le serveur.",
    syntax: "Get-WindowsFeature [-Name <rôle>]",
    examples: [
      { cmd: "Get-WindowsFeature", desc: "Liste tous les rôles/fonctionnalités" },
      { cmd: "Get-WindowsFeature | Where-Object {$_.Installed}", desc: "Uniquement les rôles installés" },
      { cmd: "Get-WindowsFeature -Name DNS", desc: "Vérifie l'état du rôle DNS" }
    ],
    flags: ["-Name", "-ComputerName", "-Credential"]
  },
  {
    name: "Add-DnsServerPrimaryZone",
    os: "windows-server",
    category: "Réseau",
    description: "Crée une zone DNS primaire sur un serveur DNS Windows.",
    syntax: "Add-DnsServerPrimaryZone -Name <zone> -ZoneFile <fichier>",
    examples: [
      { cmd: "Add-DnsServerPrimaryZone -Name \"nexa.local\" -ZoneFile \"nexa.local.dns\"", desc: "Crée une zone directe" },
      { cmd: "Add-DnsServerPrimaryZone -NetworkID \"192.168.1.0/24\" -ReplicationScope Forest", desc: "Crée une zone de résolution inverse" }
    ],
    flags: ["-ZoneFile", "-DynamicUpdate", "-ReplicationScope"]
  },
  {
    name: "Add-DhcpServerv4Scope",
    os: "windows-server",
    category: "Réseau",
    description: "Crée une étendue DHCP IPv4 sur un serveur DHCP Windows.",
    syntax: "Add-DhcpServerv4Scope -Name <nom> -StartRange <ip> -EndRange <ip> -SubnetMask <masque>",
    examples: [
      { cmd: "Add-DhcpServerv4Scope -Name \"LAN-Ventes\" -StartRange 192.168.1.100 -EndRange 192.168.1.200 -SubnetMask 255.255.255.0", desc: "Crée une étendue DHCP" },
      { cmd: "Get-DhcpServerv4Scope", desc: "Liste les étendues existantes" }
    ],
    flags: ["-StartRange", "-EndRange", "-SubnetMask", "-LeaseDuration"]
  },
  {
    name: "New-GPO",
    os: "windows-server",
    category: "Système",
    description: "Crée et lie une nouvelle stratégie de groupe (GPO) à une unité d'organisation.",
    syntax: "New-GPO -Name <nom> | New-GPLink -Target <OU>",
    examples: [
      { cmd: "New-GPO -Name \"Restriction-USB\"", desc: "Crée une nouvelle GPO vide" },
      { cmd: "New-GPO -Name \"Restriction-USB\" | New-GPLink -Target \"OU=Ventes,DC=nexa,DC=local\"", desc: "Crée et lie la GPO à une OU" }
    ],
    flags: ["-Comment", "-StarterGPOName", "-Domain"]
  },
  {
    name: "New-Website",
    os: "windows-server",
    category: "Services",
    description: "Crée un nouveau site web dans IIS (Internet Information Services).",
    syntax: "New-Website -Name <nom> -PhysicalPath <chemin> -Port <port>",
    examples: [
      { cmd: "New-Website -Name \"IntranetRH\" -PhysicalPath \"C:\\inetpub\\rh\" -Port 8080", desc: "Crée un site IIS sur le port 8080" },
      { cmd: "Get-Website", desc: "Liste tous les sites IIS configurés" }
    ],
    flags: ["-PhysicalPath", "-Port", "-HostHeader", "-ApplicationPool"]
  },
  {
    name: "New-WebAppPool",
    os: "windows-server",
    category: "Services",
    description: "Crée et gère un pool d'applications IIS (isolation des sites web).",
    syntax: "New-WebAppPool -Name <nom>",
    examples: [
      { cmd: "New-WebAppPool -Name \"PoolRH\"", desc: "Crée un pool d'applications dédié" },
      { cmd: "Restart-WebAppPool -Name \"PoolRH\"", desc: "Redémarre le pool après une mise à jour" }
    ],
    flags: ["-Name", "-managedRuntimeVersion"]
  },
  {
    name: "New-VM",
    os: "windows-server",
    category: "Système",
    description: "Crée une nouvelle machine virtuelle sous le rôle Hyper-V.",
    syntax: "New-VM -Name <nom> -MemoryStartupBytes <RAM> -NewVHDPath <chemin> -NewVHDSizeBytes <taille>",
    examples: [
      { cmd: "New-VM -Name \"VM-WebServer\" -MemoryStartupBytes 4GB -NewVHDPath \"D:\\VMs\\web.vhdx\" -NewVHDSizeBytes 60GB", desc: "Crée une VM avec un disque dédié" }
    ],
    flags: ["-MemoryStartupBytes", "-NewVHDPath", "-SwitchName", "-Generation"]
  },
  {
    name: "Get-VM / Start-VM",
    os: "windows-server",
    category: "Système",
    description: "Liste, démarre ou gère l'état des machines virtuelles Hyper-V.",
    syntax: "Get-VM [-Name <nom>] | Start-VM -Name <nom>",
    examples: [
      { cmd: "Get-VM", desc: "Liste toutes les VMs et leur état" },
      { cmd: "Start-VM -Name \"VM-WebServer\"", desc: "Démarre une VM" },
      { cmd: "Checkpoint-VM -Name \"VM-WebServer\" -SnapshotName \"Avant-MAJ\"", desc: "Crée un point de contrôle (snapshot)" }
    ],
    flags: ["-Name", "-ComputerName", "-State"]
  },
  {
    name: "New-SmbShare",
    os: "windows-server",
    category: "Fichiers",
    description: "Crée un partage réseau SMB avec des droits d'accès définis.",
    syntax: "New-SmbShare -Name <partage> -Path <chemin> -FullAccess <groupe>",
    examples: [
      { cmd: "New-SmbShare -Name \"Compta\" -Path \"D:\\Partages\\Compta\" -FullAccess \"NEXA\\Comptables\"", desc: "Crée un partage avec accès complet pour un groupe" },
      { cmd: "Get-SmbShare", desc: "Liste les partages existants" }
    ],
    flags: ["-FullAccess", "-ReadAccess", "-ChangeAccess", "-CachingMode"]
  },
  {
    name: "New-DfsnRoot / New-DfsnFolder",
    os: "windows-server",
    category: "Fichiers",
    description: "Crée un espace de noms DFS (Distributed File System) pour unifier des partages.",
    syntax: "New-DfsnRoot -TargetPath <chemin> -Type <type> -Path <namespace>",
    examples: [
      { cmd: "New-DfsnRoot -TargetPath \"\\\\SRV1\\Partages\" -Type DomainV2 -Path \"\\\\nexa.local\\Data\"", desc: "Crée une racine DFS" },
      { cmd: "New-DfsnFolder -Path \"\\\\nexa.local\\Data\\RH\" -TargetPath \"\\\\SRV2\\RH\"", desc: "Ajoute un dossier DFS lié à un serveur cible" }
    ],
    flags: ["-Type", "-TargetPath", "-EnableSiteCosting"]
  },
  {
    name: "wbadmin",
    os: "windows-server",
    category: "Archives",
    description: "Sauvegarde et restaure le système via Windows Server Backup (CLI).",
    syntax: "wbadmin <commande> [options]",
    examples: [
      { cmd: "wbadmin start backup -backupTarget:D: -include:C:", desc: "Lance une sauvegarde complète vers le disque D:" },
      { cmd: "wbadmin get versions", desc: "Liste les sauvegardes disponibles" }
    ],
    flags: ["start backup", "get versions", "start systemstaterecovery"]
  },
  {
    name: "Get-WsusUpdate / Invoke-WsusServerCleanup",
    os: "windows-server",
    category: "Système",
    description: "Gère les mises à jour approuvées et nettoie le serveur WSUS.",
    syntax: "Get-WsusUpdate -Approval <état> | Invoke-WsusServerCleanup",
    examples: [
      { cmd: "Get-WsusUpdate -Approval Unapproved", desc: "Liste les mises à jour en attente d'approbation" },
      { cmd: "Invoke-WsusServerCleanup -CleanupObsoleteUpdates -CleanupUnneededContentFiles", desc: "Nettoie le serveur WSUS" }
    ],
    flags: ["-Approval", "-CleanupObsoleteUpdates", "-CleanupUnneededContentFiles"]
  },
  {
    name: "Add-Printer / Add-PrinterDriver",
    os: "windows-server",
    category: "Services",
    description: "Installe un pilote et partage une imprimante réseau via le rôle Print Server.",
    syntax: "Add-PrinterDriver -Name <pilote> ; Add-Printer -Name <nom> -DriverName <pilote> -PortName <port>",
    examples: [
      { cmd: "Add-PrinterDriver -Name \"HP Universal Printing PCL6\"", desc: "Installe un pilote d'imprimante" },
      { cmd: "Add-Printer -Name \"Imprimante-RH\" -DriverName \"HP Universal Printing PCL6\" -PortName \"IP_192.168.1.50\"", desc: "Partage une imprimante réseau" }
    ],
    flags: ["-DriverName", "-PortName", "-Shared"]
  },
  {
    name: "New-RDSessionCollection",
    os: "windows-server",
    category: "Services",
    description: "Crée une collection de sessions Bureau à distance (RDS).",
    syntax: "New-RDSessionCollection -CollectionName <nom> -SessionHost <serveur> -CollectionDescription <desc>",
    examples: [
      { cmd: "New-RDSessionCollection -CollectionName \"Bureaux-Compta\" -SessionHost \"RDSH1.nexa.local\" -CollectionDescription \"Postes virtuels comptabilité\"", desc: "Crée une collection RDS" }
    ],
    flags: ["-SessionHost", "-CollectionDescription"]
  },
  {
    name: "New-ADOrganizationalUnit",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Crée une unité d'organisation (OU) dans Active Directory pour structurer l'annuaire.",
    syntax: "New-ADOrganizationalUnit -Name <nom> -Path <DN>",
    examples: [
      { cmd: "New-ADOrganizationalUnit -Name \"Ventes\" -Path \"DC=nexa,DC=local\"", desc: "Crée une OU à la racine du domaine" },
      { cmd: "Get-ADOrganizationalUnit -Filter *", desc: "Liste toutes les OU existantes" }
    ],
    flags: ["-Path", "-ProtectedFromAccidentalDeletion"]
  },
  {
    name: "Disable-ADAccount / Set-ADAccountPassword",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Désactive un compte ou réinitialise le mot de passe d'un utilisateur Active Directory.",
    syntax: "Disable-ADAccount -Identity <user> | Set-ADAccountPassword -Identity <user> -NewPassword <securestring>",
    examples: [
      { cmd: "Disable-ADAccount -Identity jdupont", desc: "Désactive le compte de jdupont" },
      { cmd: "Set-ADAccountPassword -Identity jdupont -Reset -NewPassword (ConvertTo-SecureString \"P@ssw0rd!\" -AsPlainText -Force)", desc: "Réinitialise le mot de passe" }
    ],
    flags: ["-Identity", "-Reset", "-NewPassword"]
  },
  {
    name: "dcdiag",
    os: "windows-server",
    category: "Système",
    description: "Diagnostique la santé d'un contrôleur de domaine Active Directory (réplication, DNS, services).",
    syntax: "dcdiag [/v]",
    examples: [
      { cmd: "dcdiag", desc: "Lance tous les tests de diagnostic du DC" },
      { cmd: "dcdiag /v", desc: "Mode verbeux avec détails complets" }
    ],
    flags: ["/v (verbose)", "/test:<nom_test>"]
  },
  {
    name: "repadmin",
    os: "windows-server",
    category: "Système",
    description: "Diagnostique et force la réplication Active Directory entre contrôleurs de domaine.",
    syntax: "repadmin /<commande>",
    examples: [
      { cmd: "repadmin /replsummary", desc: "Résumé de l'état de réplication entre DCs" },
      { cmd: "repadmin /syncall /AdeP", desc: "Force une synchronisation complète immédiate" }
    ],
    flags: ["/replsummary", "/syncall", "/showrepl"]
  },
  {
    name: "Get-ADComputer",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Recherche et affiche les comptes ordinateur enregistrés dans Active Directory.",
    syntax: "Get-ADComputer -Filter * [-Properties <props>]",
    examples: [
      { cmd: "Get-ADComputer -Filter *", desc: "Liste tous les ordinateurs du domaine" },
      { cmd: "Get-ADComputer -Identity PC-01 -Properties LastLogonDate", desc: "Détails d'un poste, dernière connexion" }
    ],
    flags: ["-Filter", "-Properties", "-SearchBase"]
  },
  {
    name: "Set-ADUser",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Modifie les attributs d'un utilisateur Active Directory existant (nom, service, manager...).",
    syntax: "Set-ADUser -Identity <user> -<Propriété> <valeur>",
    examples: [
      { cmd: "Set-ADUser -Identity jdupont -Department \"Ventes\"", desc: "Change le service de l'utilisateur" },
      { cmd: "Set-ADUser -Identity jdupont -Enabled $true", desc: "Réactive un compte" }
    ],
    flags: ["-Department", "-Title", "-Manager", "-Enabled"]
  },
  {
    name: "Move-ADObject",
    os: "windows-server",
    category: "Utilisateurs",
    description: "Déplace un objet Active Directory (utilisateur, groupe, ordinateur) vers une autre OU.",
    syntax: "Move-ADObject -Identity <DN> -TargetPath <OU_cible>",
    examples: [
      { cmd: "Move-ADObject -Identity \"CN=jdupont,OU=Anciens,DC=nexa,DC=local\" -TargetPath \"OU=Ventes,DC=nexa,DC=local\"", desc: "Déplace un utilisateur vers une autre OU" }
    ],
    flags: ["-TargetPath"]
  },
  {
    name: "Get-ClusterNode / New-Cluster",
    os: "windows-server",
    category: "Système",
    description: "Crée ou consulte un cluster de basculement Windows Server (haute disponibilité).",
    syntax: "New-Cluster -Name <nom> -Node <serveurs>",
    examples: [
      { cmd: "New-Cluster -Name CLUSTER01 -Node SRV1,SRV2", desc: "Crée un cluster à 2 nœuds" },
      { cmd: "Get-ClusterNode", desc: "Liste les nœuds du cluster et leur état" }
    ],
    flags: ["-Node", "-StaticAddress"]
  },
  {
    name: "ntdsutil",
    os: "windows-server",
    category: "Système",
    description: "Outil avancé de maintenance de la base Active Directory (NTDS.dit) : sauvegarde, nettoyage, restauration d'autorité.",
    syntax: "ntdsutil",
    examples: [
      { cmd: "ntdsutil \"activate instance ntds\" \"ifm\" \"create sysvol full C:\\IFM\" quit quit", desc: "Crée un média d'installation depuis les médias (IFM)" }
    ],
    flags: []
  },

  // ── TERRAFORM ─────────────────────────────────────────────
  {
    name: "terraform init",
    os: "terraform",
    category: "Système",
    description: "Initialise un répertoire Terraform : télécharge les providers et configure le backend.",
    syntax: "terraform init",
    examples: [
      { cmd: "terraform init", desc: "Initialise le projet (à faire en premier, toujours)" },
      { cmd: "terraform init -upgrade", desc: "Met à jour les providers vers leur dernière version compatible" }
    ],
    flags: ["-upgrade", "-reconfigure"]
  },
  {
    name: "terraform plan",
    os: "terraform",
    category: "Système",
    description: "Simule les changements qui seraient appliqués à l'infrastructure, sans rien modifier.",
    syntax: "terraform plan [-out=<fichier>]",
    examples: [
      { cmd: "terraform plan", desc: "Affiche ce qui serait créé/modifié/détruit" },
      { cmd: "terraform plan -out=plan.tfplan", desc: "Sauvegarde le plan pour l'appliquer plus tard" }
    ],
    flags: ["-out", "-var", "-destroy"]
  },
  {
    name: "terraform apply",
    os: "terraform",
    category: "Système",
    description: "Applique les changements d'infrastructure définis dans la configuration Terraform.",
    syntax: "terraform apply [plan.tfplan]",
    examples: [
      { cmd: "terraform apply", desc: "Demande confirmation puis applique les changements" },
      { cmd: "terraform apply -auto-approve", desc: "Applique sans demander de confirmation (CI/CD)" },
      { cmd: "terraform apply plan.tfplan", desc: "Applique un plan précédemment sauvegardé" }
    ],
    flags: ["-auto-approve", "-var", "-target"]
  },
  {
    name: "terraform destroy",
    os: "terraform",
    category: "Système",
    description: "Détruit toute l'infrastructure gérée par la configuration Terraform actuelle.",
    syntax: "terraform destroy",
    examples: [
      { cmd: "terraform destroy", desc: "Détruit toutes les ressources après confirmation" },
      { cmd: "terraform destroy -target=aws_instance.web", desc: "Détruit uniquement une ressource précise" }
    ],
    flags: ["-target", "-auto-approve"]
  },
  {
    name: "terraform validate",
    os: "terraform",
    category: "Système",
    description: "Vérifie la syntaxe et la cohérence interne de la configuration sans contacter de provider.",
    syntax: "terraform validate",
    examples: [
      { cmd: "terraform validate", desc: "Valide la configuration localement" },
      { cmd: "terraform validate -json | jq .valid", desc: "Récupère juste true/false pour un script CI" }
    ],
    flags: []
  },
  {
    name: "terraform fmt",
    os: "terraform",
    category: "Fichiers",
    description: "Reformate automatiquement les fichiers .tf selon le style canonique HashiCorp.",
    syntax: "terraform fmt [-recursive]",
    examples: [
      { cmd: "terraform fmt", desc: "Reformate les fichiers du dossier courant" },
      { cmd: "terraform fmt -recursive", desc: "Reformate aussi les sous-dossiers (modules)" }
    ],
    flags: ["-recursive", "-check (vérifie sans modifier)"]
  },
  {
    name: "terraform state list",
    os: "terraform",
    category: "Système",
    description: "Liste les ressources actuellement suivies dans l'état (state) Terraform.",
    syntax: "terraform state list",
    examples: [
      { cmd: "terraform state list", desc: "Liste toutes les ressources gérées" },
      { cmd: "terraform state show aws_instance.web", desc: "Détails d'une ressource précise dans le state" }
    ],
    flags: ["list", "show", "mv", "rm"]
  },
  {
    name: "terraform import",
    os: "terraform",
    category: "Système",
    description: "Importe une ressource existante (créée manuellement) dans le state Terraform pour la gérer désormais via code.",
    syntax: "terraform import <adresse> <id>",
    examples: [
      { cmd: "terraform import aws_instance.web i-0abc123def", desc: "Importe une instance EC2 existante" },
      { cmd: "terraform import 'aws_instance.web[0]' i-0abc123def", desc: "Importe un élément précis d'une ressource en for_each/count" }
    ],
    flags: []
  },
  {
    name: "terraform workspace",
    os: "terraform",
    category: "Système",
    description: "Gère plusieurs environnements (dev/staging/prod) isolés avec un seul jeu de fichiers .tf.",
    syntax: "terraform workspace <action> [nom]",
    examples: [
      { cmd: "terraform workspace new staging", desc: "Crée un nouvel environnement isolé" },
      { cmd: "terraform workspace select prod", desc: "Bascule vers un environnement existant" },
      { cmd: "terraform workspace list", desc: "Liste les environnements disponibles" }
    ],
    flags: ["new", "select", "list", "delete"]
  },
  {
    name: "terraform output",
    os: "terraform",
    category: "Système",
    description: "Affiche les valeurs de sortie définies dans la configuration (IP, URL, ID générés...).",
    syntax: "terraform output [nom]",
    examples: [
      { cmd: "terraform output", desc: "Affiche toutes les sorties" },
      { cmd: "terraform output -raw instance_ip", desc: "Affiche une sortie précise sans guillemets" }
    ],
    flags: ["-raw", "-json"]
  },
  {
    name: "terraform taint / untaint",
    os: "terraform",
    category: "Système",
    description: "Marque une ressource pour qu'elle soit détruite et recréée au prochain apply.",
    syntax: "terraform taint <adresse>",
    examples: [
      { cmd: "terraform taint aws_instance.web", desc: "Force la recréation de l'instance au prochain apply" },
      { cmd: "terraform apply", desc: "Après un taint, le prochain apply recrée bien la ressource marquée" }
    ],
    flags: ["taint", "untaint"]
  },
  {
    name: "terraform providers",
    os: "terraform",
    category: "Paquets",
    description: "Affiche les providers requis par la configuration et leurs versions.",
    syntax: "terraform providers",
    examples: [
      { cmd: "terraform providers", desc: "Liste l'arbre des providers utilisés" },
      { cmd: "terraform providers lock", desc: "Verrouille les versions exactes des providers" }
    ],
    flags: ["lock", "mirror"]
  },
  {
    name: "terraform refresh",
    os: "terraform",
    category: "Système",
    description: "Met à jour le state local pour refléter l'état réel actuel de l'infrastructure (sans rien modifier).",
    syntax: "terraform apply -refresh-only",
    examples: [
      { cmd: "terraform apply -refresh-only", desc: "Synchronise le state avec la réalité, demande confirmation" },
      { cmd: "terraform plan -refresh-only", desc: "Affiche les différences sans les appliquer" }
    ],
    flags: ["-refresh-only"]
  },
  {
    name: "terraform graph",
    os: "terraform",
    category: "Système",
    description: "Génère un graphe de dépendances entre les ressources, exportable en image via Graphviz.",
    syntax: "terraform graph | dot -Tpng > graph.png",
    examples: [
      { cmd: "terraform graph | dot -Tpng > graph.png", desc: "Génère une image du graphe de dépendances" },
      { cmd: "terraform graph -type=plan | dot -Tsvg > plan.svg", desc: "Graphe du plan plutôt que de la config complète" }
    ],
    flags: []
  },
  {
    name: "terraform console",
    os: "terraform",
    category: "Système",
    description: "Ouvre une console interactive pour tester des expressions et fonctions Terraform.",
    syntax: "terraform console",
    examples: [
      { cmd: "terraform console", desc: "Ouvre la console interactive" },
      { cmd: "> var.region", desc: "Évalue la valeur d'une variable directement" }
    ],
    flags: []
  },
  {
    name: "terraform show",
    os: "terraform",
    category: "Système",
    description: "Affiche le contenu du state actuel ou d'un fichier de plan, en lecture humaine ou JSON.",
    syntax: "terraform show [plan.tfplan]",
    examples: [
      { cmd: "terraform show", desc: "Affiche le state actuel en détail" },
      { cmd: "terraform show -json plan.tfplan | jq .", desc: "Exporte un plan en JSON pour analyse" }
    ],
    flags: ["-json"]
  },
  {
    name: "terraform state mv / rm",
    os: "terraform",
    category: "Système",
    description: "Déplace ou retire une ressource du state sans la détruire réellement.",
    syntax: "terraform state mv <ancien> <nouveau> | terraform state rm <adresse>",
    examples: [
      { cmd: "terraform state mv aws_instance.old aws_instance.new", desc: "Renomme une ressource dans le state" },
      { cmd: "terraform state rm aws_instance.web", desc: "Retire la ressource du state (sans la détruire en vrai)" }
    ],
    flags: ["mv", "rm"]
  },
  {
    name: "terraform force-unlock",
    os: "terraform",
    category: "Système",
    description: "Libère un verrou (lock) bloqué sur le state distant, après un plantage ou une interruption.",
    syntax: "terraform force-unlock <lock_id>",
    examples: [
      { cmd: "terraform force-unlock 1a2b3c4d", desc: "Déverrouille le state après un crash de session" },
      { cmd: "terraform force-unlock -force 1a2b3c4d", desc: "Force le déverrouillage sans confirmation interactive" }
    ],
    flags: []
  },
  {
    name: "terraform plan -var-file",
    os: "terraform",
    category: "Système",
    description: "Charge un fichier de variables séparé, pratique pour gérer plusieurs environnements (dev/prod).",
    syntax: "terraform plan -var-file=<fichier.tfvars>",
    examples: [
      { cmd: "terraform plan -var-file=prod.tfvars", desc: "Utilise les valeurs de l'environnement prod" },
      { cmd: "terraform apply -var-file=prod.tfvars", desc: "Applique avec les mêmes variables" }
    ],
    flags: ["-var-file", "-var (variable unique inline)"]
  },
  {
    name: "terraform module",
    os: "terraform",
    category: "Système",
    description: "Référence rapide pour appeler un module Terraform réutilisable (local ou depuis un registry).",
    syntax: "module \"<nom>\" { source = \"<chemin_ou_registry>\" }",
    examples: [
      { cmd: "module \"vpc\" { source = \"./modules/vpc\" }", desc: "Appelle un module local" },
      { cmd: "terraform get -update", desc: "Télécharge/met à jour les modules référencés" }
    ],
    flags: []
  },
  {
    name: "terraform output -json",
    os: "terraform",
    category: "Système",
    description: "Exporte toutes les sorties au format JSON, pratique pour les passer à un autre script ou pipeline CI.",
    syntax: "terraform output -json",
    examples: [
      { cmd: "terraform output -json > outputs.json", desc: "Sauvegarde toutes les sorties en JSON" },
      { cmd: "terraform output -json instance_ip", desc: "Exporte une seule sortie en JSON, pas toutes" }
    ],
    flags: ["-json"]
  },
  {
    name: "terraform plan -destroy",
    os: "terraform",
    category: "Système",
    description: "Simule une destruction complète sans rien supprimer, pour vérifier l'impact avant un vrai destroy.",
    syntax: "terraform plan -destroy",
    examples: [
      { cmd: "terraform plan -destroy", desc: "Affiche ce qui serait détruit, sans confirmation" },
      { cmd: "terraform plan -destroy -out=destroy.tfplan", desc: "Sauvegarde le plan de destruction pour l'appliquer ensuite tel quel" }
    ],
    flags: ["-destroy"]
  },
  {
    name: "terraform state pull / push",
    os: "terraform",
    category: "Système",
    description: "Télécharge le state distant en local (pull) ou pousse un state local modifié vers le backend (push).",
    syntax: "terraform state pull > state.json | terraform state push state.json",
    examples: [
      { cmd: "terraform state pull > backup.json", desc: "Sauvegarde le state distant en local" },
      { cmd: "terraform state push state.json", desc: "Restaure un state modifié (à utiliser avec précaution)" }
    ],
    flags: []
  },
  {
    name: "terraform state replace-provider",
    os: "terraform",
    category: "Système",
    description: "Remplace la référence d'un provider dans le state, utile lors d'un changement de source de provider.",
    syntax: "terraform state replace-provider <ancien> <nouveau>",
    examples: [
      { cmd: "terraform state replace-provider hashicorp/aws registry.example.com/aws", desc: "Migre vers un provider depuis un registry privé" },
      { cmd: "terraform state replace-provider -auto-approve hashicorp/aws registry.example.com/aws", desc: "Sans confirmation manuelle, pour un script" }
    ],
    flags: []
  },
  {
    name: "terraform login / logout",
    os: "terraform",
    category: "Permissions",
    description: "Authentifie la CLI auprès de Terraform Cloud/Enterprise pour accéder aux workspaces distants.",
    syntax: "terraform login [hostname]",
    examples: [
      { cmd: "terraform login", desc: "Authentifie la CLI vers app.terraform.io" },
      { cmd: "terraform logout", desc: "Déconnecte la session" }
    ],
    flags: []
  },
  {
    name: "terraform version",
    os: "terraform",
    category: "Système",
    description: "Affiche la version de Terraform installée et celle des providers utilisés.",
    syntax: "terraform version",
    examples: [
      { cmd: "terraform version", desc: "Affiche la version du binaire et des providers du projet" },
      { cmd: "terraform version -json", desc: "Sortie JSON, pratique pour vérifier une version minimale en CI" }
    ],
    flags: []
  },
  {
    name: "terraform output -raw",
    os: "terraform",
    category: "Système",
    description: "Affiche une sortie unique sans guillemets ni formatage, pratique pour l'utiliser directement dans un script shell.",
    syntax: "terraform output -raw <nom>",
    examples: [
      { cmd: "IP=$(terraform output -raw instance_ip)", desc: "Récupère une sortie directement dans une variable bash" },
      { cmd: "terraform output -raw db_password | pbcopy", desc: "Copie directement une sortie sensible dans le presse-papier" }
    ],
    flags: ["-raw"]
  },
  {
    name: "terraform plan -target",
    os: "terraform",
    category: "Système",
    description: "Limite le plan à une ressource précise, pour itérer rapidement sans recalculer tout le graphe.",
    syntax: "terraform plan -target=<adresse>",
    examples: [
      { cmd: "terraform plan -target=aws_instance.web", desc: "Planifie uniquement cette ressource" },
      { cmd: "terraform apply -target=aws_instance.web", desc: "Le même ciblage fonctionne aussi avec apply" }
    ],
    flags: ["-target"]
  },
  {
    name: "terraform import (bloc import)",
    os: "terraform",
    category: "Système",
    description: "Depuis Terraform 1.5+, importe des ressources via un bloc déclaratif au lieu de la commande CLI.",
    syntax: "import { to = <adresse> id = \"<id>\" }",
    examples: [
      { cmd: "import { to = aws_instance.web id = \"i-0abc123def\" }", desc: "Déclare un import dans le code, exécuté au prochain apply" },
      { cmd: "terraform plan -generate-config-out=generated.tf", desc: "Génère automatiquement le code Terraform correspondant à la ressource importée" }
    ],
    flags: []
  },
  {
    name: "terraform fmt -check",
    os: "terraform",
    category: "Fichiers",
    description: "Vérifie que les fichiers sont déjà bien formatés sans les modifier, utile en pipeline CI.",
    syntax: "terraform fmt -check -recursive",
    examples: [
      { cmd: "terraform fmt -check -recursive", desc: "Échoue si un fichier n'est pas formaté correctement (CI)" },
      { cmd: "terraform fmt -recursive", desc: "Sans -check : reformate réellement les fichiers au lieu de juste vérifier" }
    ],
    flags: ["-check", "-recursive"]
  },
  {
    name: "terraform plan -lock=false",
    os: "terraform",
    category: "Système",
    description: "Désactive temporairement le verrouillage du state, à utiliser avec prudence en cas de blocage.",
    syntax: "terraform plan -lock=false",
    examples: [
      { cmd: "terraform plan -lock=false", desc: "Planifie sans poser de lock sur le state distant" },
      { cmd: "terraform apply -lock=false", desc: "Le même besoin peut se poser aussi lors d'un apply" }
    ],
    flags: ["-lock=false"]
  },
  {
    name: "terraform output (variable sensible)",
    os: "terraform",
    category: "Permissions",
    description: "Référence rapide pour marquer une sortie comme sensible afin qu'elle soit masquée dans les logs CLI.",
    syntax: "output \"<nom>\" { value = <expr> sensitive = true }",
    examples: [
      { cmd: "output \"db_password\" { value = random_password.db.result sensitive = true }", desc: "La valeur sera masquée par défaut dans les logs" },
      { cmd: "terraform output db_password", desc: "Affiche quand même la valeur si explicitement demandée par son nom" }
    ],
    flags: ["sensitive = true"]
  },
  {
    name: "terraform apply -parallelism",
    os: "terraform",
    category: "Système",
    description: "Définit le nombre maximum d'opérations simultanées lors d'un apply (par défaut 10).",
    syntax: "terraform apply -parallelism=<n>",
    examples: [
      { cmd: "terraform apply -parallelism=20", desc: "Accélère l'apply sur de gros projets avec beaucoup de ressources" },
      { cmd: "terraform apply -parallelism=1", desc: "Réduit à 1 pour déboguer un ordre d'application suspect" }
    ],
    flags: ["-parallelism"]
  },
  {
    name: "terraform workspace show",
    os: "terraform",
    category: "Système",
    description: "Affiche le nom du workspace actuellement sélectionné.",
    syntax: "terraform workspace show",
    examples: [
      { cmd: "terraform workspace show", desc: "Affiche l'environnement actif (dev, staging, prod...)" },
      { cmd: "terraform workspace list", desc: "Liste tous les workspaces existants, pas juste l'actif" }
    ],
    flags: []
  },
  {
    name: "terraform get",
    os: "terraform",
    category: "Système",
    description: "Télécharge ou met à jour les modules référencés dans la configuration sans réinitialiser tout le projet.",
    syntax: "terraform get [-update]",
    examples: [
      { cmd: "terraform get -update", desc: "Met à jour les modules vers leur dernière version compatible" },
      { cmd: "terraform get -update -json", desc: "Sortie JSON pour vérifier par script si un module a changé" }
    ],
    flags: ["-update"]
  },
  {
    name: "terraform plan -compact-warnings",
    os: "terraform",
    category: "Système",
    description: "Affiche les avertissements de manière condensée pour ne pas saturer la sortie console.",
    syntax: "terraform plan -compact-warnings",
    examples: [
      { cmd: "terraform plan -compact-warnings", desc: "Évite l'affichage complet de chaque warning" },
      { cmd: "TF_COMPACT_WARNINGS=true terraform plan", desc: "Même effet via une variable d'environnement, pratique en CI" }
    ],
    flags: ["-compact-warnings"]
  },
  {
    name: "terraform 0.13upgrade / 1.5upgrade",
    os: "terraform",
    category: "Système",
    description: "Assistants de migration automatique entre versions majeures de Terraform.",
    syntax: "terraform 1.5upgrade",
    examples: [
      { cmd: "terraform 1.5upgrade", desc: "Aide à migrer la syntaxe vers une version récente" },
      { cmd: "terraform 0.13upgrade", desc: "Migration spécifique depuis les versions antérieures à 0.13" }
    ],
    flags: []
  },
  {
    name: "terraform plan -out + apply (workflow CI)",
    os: "terraform",
    category: "Système",
    description: "Référence rapide du workflow CI/CD standard : générer un plan figé puis l'appliquer tel quel.",
    syntax: "terraform plan -out=tfplan && terraform apply tfplan",
    examples: [
      { cmd: "terraform plan -out=tfplan", desc: "Génère et sauvegarde le plan exact" },
      { cmd: "terraform apply tfplan", desc: "Applique exactement ce plan, sans divergence possible" }
    ],
    flags: []
  },
  {
    name: "terraform state show",
    os: "terraform",
    category: "Système",
    description: "Affiche en détail l'état actuel d'une ressource précise dans le state.",
    syntax: "terraform state show <adresse>",
    examples: [
      { cmd: "terraform state show aws_instance.web", desc: "Affiche tous les attributs actuels de la ressource" },
      { cmd: "terraform state show 'aws_instance.web[0]'", desc: "Fonctionne aussi sur un élément précis d'une ressource multiple" }
    ],
    flags: []
  },
  {
    name: "terraform validate -json",
    os: "terraform",
    category: "Fichiers",
    description: "Valide la configuration et exporte le résultat en JSON, utile pour parsing automatisé en CI.",
    syntax: "terraform validate -json",
    examples: [
      { cmd: "terraform validate -json | jq .valid", desc: "Vérifie si la configuration est valide via un pipeline" },
      { cmd: "terraform validate -json | jq '.diagnostics'", desc: "N'extrait que le détail des erreurs, pas tout le JSON" }
    ],
    flags: ["-json"]
  },
  {
    name: "terraform untaint",
    os: "terraform",
    category: "Système",
    description: "Retire la marque de destruction posée par taint, annulant la recréation prévue au prochain apply.",
    syntax: "terraform untaint <adresse>",
    examples: [
      { cmd: "terraform untaint aws_instance.web", desc: "Annule la recréation prévue pour cette ressource" },
      { cmd: "terraform untaint -allow-missing aws_instance.web", desc: "N'échoue pas si la ressource n'existe plus dans le state" }
    ],
    flags: []
  },
  {
    name: "terraform apply -auto-approve (CI/CD)",
    os: "terraform",
    category: "Système",
    description: "Applique automatiquement sans confirmation interactive, indispensable en pipeline CI/CD non interactif.",
    syntax: "terraform apply -auto-approve",
    examples: [
      { cmd: "terraform apply -auto-approve", desc: "Pour pipelines automatisés uniquement, jamais en manuel sur prod sans plan préalable" },
      { cmd: "terraform apply -auto-approve -input=false", desc: "Désactive aussi toute question interactive, pas seulement la confirmation" }
    ],
    flags: ["-auto-approve"]
  },
  {
    name: "terraform output -state",
    os: "terraform",
    category: "Système",
    description: "Lit les sorties depuis un fichier state précis au lieu du state par défaut du backend.",
    syntax: "terraform output -state=<fichier.tfstate>",
    examples: [
      { cmd: "terraform output -state=backup.tfstate", desc: "Affiche les sorties d'un state sauvegardé" },
      { cmd: "terraform output -state=backup.tfstate -json", desc: "Combine avec -json pour un traitement automatisé" }
    ],
    flags: ["-state"]
  },

  // ── VAGRANT ───────────────────────────────────────────────
  {
    name: "vagrant init",
    os: "vagrant",
    category: "Système",
    description: "Initialise un nouveau Vagrantfile dans le dossier courant à partir d'une box donnée.",
    syntax: "vagrant init <box>",
    examples: [
      { cmd: "vagrant init debian/bookworm64", desc: "Crée un Vagrantfile basé sur Debian 12" },
      { cmd: "vagrant init generic/alpine318", desc: "Initialise avec une box Alpine" }
    ],
    flags: []
  },
  {
    name: "vagrant up",
    os: "vagrant",
    category: "Système",
    description: "Démarre (ou crée puis démarre) la ou les machines virtuelles définies dans le Vagrantfile.",
    syntax: "vagrant up [nom_machine]",
    examples: [
      { cmd: "vagrant up", desc: "Démarre toutes les machines du Vagrantfile" },
      { cmd: "vagrant up --provider=virtualbox", desc: "Force l'utilisation d'un provider précis" }
    ],
    flags: ["--provider", "--provision"]
  },
  {
    name: "vagrant ssh",
    os: "vagrant",
    category: "Système",
    description: "Ouvre une connexion SSH vers une machine virtuelle Vagrant en cours d'exécution.",
    syntax: "vagrant ssh [nom_machine]",
    examples: [
      { cmd: "vagrant ssh", desc: "Connexion SSH vers la machine par défaut" },
      { cmd: "vagrant ssh web01", desc: "Connexion vers une machine précise (multi-machine)" }
    ],
    flags: []
  },
  {
    name: "vagrant halt",
    os: "vagrant",
    category: "Système",
    description: "Arrête proprement la machine virtuelle (équivalent d'un shutdown).",
    syntax: "vagrant halt [nom_machine]",
    examples: [
      { cmd: "vagrant halt", desc: "Arrête la machine par défaut" },
      { cmd: "vagrant halt -f", desc: "Force l'arrêt immédiat" }
    ],
    flags: ["-f (forcer)"]
  },
  {
    name: "vagrant destroy",
    os: "vagrant",
    category: "Système",
    description: "Détruit complètement la machine virtuelle et libère les ressources associées.",
    syntax: "vagrant destroy [-f]",
    examples: [
      { cmd: "vagrant destroy -f", desc: "Détruit sans demander de confirmation" },
      { cmd: "vagrant destroy web01", desc: "Détruit uniquement la machine 'web01' dans un environnement multi-machine" }
    ],
    flags: ["-f (forcer sans confirmation)"]
  },
  {
    name: "vagrant reload",
    os: "vagrant",
    category: "Système",
    description: "Redémarre la machine et applique les changements du Vagrantfile (réseau, ressources...).",
    syntax: "vagrant reload [--provision]",
    examples: [
      { cmd: "vagrant reload", desc: "Redémarre avec la config actuelle du Vagrantfile" },
      { cmd: "vagrant reload --provision", desc: "Redémarre et relance le provisioning" }
    ],
    flags: ["--provision"]
  },
  {
    name: "vagrant provision",
    os: "vagrant",
    category: "Système",
    description: "Relance les scripts de provisioning (shell, Ansible...) sans redémarrer la machine.",
    syntax: "vagrant provision",
    examples: [
      { cmd: "vagrant provision", desc: "Relance le provisioning sur une machine déjà démarrée" },
      { cmd: "vagrant reload --provision", desc: "Redémarre la VM puis relance le provisioning en une seule commande" }
    ],
    flags: ["--provision-with <nom>"]
  },
  {
    name: "vagrant status",
    os: "vagrant",
    category: "Système",
    description: "Affiche l'état actuel des machines virtuelles définies dans le Vagrantfile.",
    syntax: "vagrant status",
    examples: [
      { cmd: "vagrant status", desc: "Affiche running/poweroff/not created pour chaque machine" },
      { cmd: "vagrant global-status", desc: "Liste l'état de toutes les VMs Vagrant de la machine, tous projets confondus" }
    ],
    flags: []
  },
  {
    name: "vagrant box",
    os: "vagrant",
    category: "Paquets",
    description: "Gère les images de base (boxes) téléchargées localement.",
    syntax: "vagrant box <action>",
    examples: [
      { cmd: "vagrant box list", desc: "Liste les boxes installées localement" },
      { cmd: "vagrant box add debian/bookworm64", desc: "Télécharge une nouvelle box" },
      { cmd: "vagrant box update", desc: "Met à jour les boxes vers leur dernière version" }
    ],
    flags: ["list", "add", "remove", "update"]
  },
  {
    name: "vagrant snapshot",
    os: "vagrant",
    category: "Système",
    description: "Crée des instantanés de la machine virtuelle pour pouvoir revenir en arrière facilement.",
    syntax: "vagrant snapshot <action> [nom]",
    examples: [
      { cmd: "vagrant snapshot save avant-test", desc: "Crée un snapshot nommé" },
      { cmd: "vagrant snapshot restore avant-test", desc: "Restaure un snapshot" },
      { cmd: "vagrant snapshot list", desc: "Liste les snapshots disponibles" }
    ],
    flags: ["save", "restore", "list", "delete"]
  },
  {
    name: "vagrant suspend / resume",
    os: "vagrant",
    category: "Système",
    description: "Met en pause l'état complet de la VM (RAM incluse) ou la reprend là où elle s'était arrêtée.",
    syntax: "vagrant suspend | vagrant resume",
    examples: [
      { cmd: "vagrant suspend", desc: "Sauvegarde l'état RAM et arrête la VM" },
      { cmd: "vagrant resume", desc: "Reprend exactement où la VM s'était arrêtée" }
    ],
    flags: []
  },
  {
    name: "vagrant global-status",
    os: "vagrant",
    category: "Système",
    description: "Affiche l'état de toutes les machines Vagrant connues sur la machine hôte, tous projets confondus.",
    syntax: "vagrant global-status [--prune]",
    examples: [
      { cmd: "vagrant global-status", desc: "Liste toutes les VMs Vagrant gérées sur l'hôte" },
      { cmd: "vagrant global-status --prune", desc: "Nettoie les entrées obsolètes" }
    ],
    flags: ["--prune"]
  },
  {
    name: "vagrant up --provider",
    os: "vagrant",
    category: "Système",
    description: "Force l'utilisation d'un provider précis (VirtualBox, libvirt, Hyper-V...) au lieu du défaut.",
    syntax: "vagrant up --provider=<provider>",
    examples: [
      { cmd: "vagrant up --provider=libvirt", desc: "Démarre via KVM/libvirt au lieu de VirtualBox" },
      { cmd: "vagrant up --provider=hyperv", desc: "Démarre via Hyper-V sur Windows" }
    ],
    flags: ["--provider"]
  },
  {
    name: "vagrant package",
    os: "vagrant",
    category: "Archives",
    description: "Empaquette une machine virtuelle en cours en une nouvelle box réutilisable.",
    syntax: "vagrant package --output <fichier.box>",
    examples: [
      { cmd: "vagrant package --output ma-box.box", desc: "Crée une box personnalisée à partir de la VM actuelle" },
      { cmd: "vagrant package --output ma-box.box --vagrantfile Vagrantfile", desc: "Inclut un Vagrantfile personnalisé dans la box générée" }
    ],
    flags: ["--output", "--base (depuis une VM provider native)"]
  },
  {
    name: "vagrant plugin",
    os: "vagrant",
    category: "Paquets",
    description: "Installe ou gère des plugins Vagrant pour étendre ses fonctionnalités.",
    syntax: "vagrant plugin <action> [nom]",
    examples: [
      { cmd: "vagrant plugin install vagrant-vbguest", desc: "Installe un plugin de gestion des Guest Additions" },
      { cmd: "vagrant plugin list", desc: "Liste les plugins installés" }
    ],
    flags: ["install", "list", "uninstall", "update"]
  },
  {
    name: "vagrant rsync",
    os: "vagrant",
    category: "Fichiers",
    description: "Force la synchronisation manuelle des dossiers partagés configurés en mode rsync.",
    syntax: "vagrant rsync [nom_machine]",
    examples: [
      { cmd: "vagrant rsync", desc: "Synchronise immédiatement les dossiers partagés" },
      { cmd: "vagrant rsync-auto", desc: "Surveille et synchronise automatiquement en continu" }
    ],
    flags: []
  },
  {
    name: "vagrant ssh-config",
    os: "vagrant",
    category: "Réseau",
    description: "Affiche la configuration SSH de la machine, utile pour s'y connecter avec un client SSH classique.",
    syntax: "vagrant ssh-config [nom_machine]",
    examples: [
      { cmd: "vagrant ssh-config", desc: "Affiche host, port, clé privée utilisés par Vagrant" },
      { cmd: "vagrant ssh-config >> ~/.ssh/config", desc: "Ajoute la config à son fichier SSH personnel" }
    ],
    flags: []
  },
  {
    name: "vagrant validate",
    os: "vagrant",
    category: "Système",
    description: "Vérifie la syntaxe du Vagrantfile sans démarrer de machine.",
    syntax: "vagrant validate",
    examples: [
      { cmd: "vagrant validate", desc: "Valide le Vagrantfile avant de lancer vagrant up" },
      { cmd: "vagrant validate --ignore-provider", desc: "Valide la syntaxe sans vérifier la compatibilité du provider" }
    ],
    flags: []
  },
  {
    name: "vagrant share",
    os: "vagrant",
    category: "Réseau",
    description: "Expose temporairement la machine virtuelle sur Internet via un tunnel sécurisé Vagrant Share.",
    syntax: "vagrant share",
    examples: [
      { cmd: "vagrant share", desc: "Génère une URL publique temporaire vers la VM" },
      { cmd: "vagrant share --ssh", desc: "Partage aussi l'accès SSH" }
    ],
    flags: ["--ssh", "--http"]
  },
  {
    name: "vagrant port",
    os: "vagrant",
    category: "Réseau",
    description: "Affiche les ports redirigés entre l'hôte et la machine virtuelle.",
    syntax: "vagrant port [nom_machine]",
    examples: [
      { cmd: "vagrant port", desc: "Liste les correspondances de ports hôte/VM" },
      { cmd: "vagrant port --guest 80", desc: "N'affiche que la redirection correspondant au port 80 côté VM" }
    ],
    flags: []
  },
  {
    name: "vagrant powershell",
    os: "vagrant",
    category: "Système",
    description: "Ouvre une session PowerShell distante vers une VM Windows gérée par Vagrant.",
    syntax: "vagrant powershell [nom_machine]",
    examples: [
      { cmd: "vagrant powershell", desc: "Connexion PowerShell distante vers la VM Windows" },
      { cmd: "vagrant powershell -c \"Get-Service\"", desc: "Exécute une commande PowerShell unique sans session interactive" }
    ],
    flags: []
  },
  {
    name: "vagrant up --no-provision",
    os: "vagrant",
    category: "Système",
    description: "Démarre la machine sans exécuter les scripts de provisioning (plus rapide pour un simple redémarrage).",
    syntax: "vagrant up --no-provision",
    examples: [
      { cmd: "vagrant up --no-provision", desc: "Démarre rapidement sans relancer Ansible/shell/etc." },
      { cmd: "vagrant reload --no-provision", desc: "Même logique après un redémarrage plutôt qu'un premier démarrage" }
    ],
    flags: ["--no-provision"]
  },
  {
    name: "vagrant destroy -f (multi-machine)",
    os: "vagrant",
    category: "Système",
    description: "Détruit toutes les machines d'un Vagrantfile multi-machine en une seule commande.",
    syntax: "vagrant destroy -f",
    examples: [
      { cmd: "vagrant destroy -f", desc: "Détruit toutes les VMs définies, sans confirmation" },
      { cmd: "vagrant destroy web01 db01 -f", desc: "Ne détruit que les machines nommées, pas tout l'environnement" }
    ],
    flags: ["-f"]
  },
  {
    name: "vagrant box outdated",
    os: "vagrant",
    category: "Paquets",
    description: "Vérifie si la box utilisée par le projet dispose d'une version plus récente.",
    syntax: "vagrant box outdated",
    examples: [
      { cmd: "vagrant box outdated", desc: "Indique si une mise à jour de la box est disponible" },
      { cmd: "vagrant box outdated --global", desc: "Vérifie toutes les box installées, pas seulement celle du projet courant" }
    ],
    flags: ["--global (vérifie toutes les box installées)"]
  },
  {
    name: "vagrant box repackage",
    os: "vagrant",
    category: "Archives",
    description: "Régénère le fichier .box d'une box déjà installée localement, sans VM active.",
    syntax: "vagrant box repackage <nom> <provider> <version>",
    examples: [
      { cmd: "vagrant box repackage debian/bookworm64 virtualbox 1.0.0", desc: "Reconstruit le fichier .box localement" },
      { cmd: "vagrant box repackage debian/bookworm64 vmware_desktop 1.0.0", desc: "Même chose pour le provider VMware" }
    ],
    flags: []
  },
  {
    name: "vagrant up (multi-machine ciblée)",
    os: "vagrant",
    category: "Système",
    description: "Démarre uniquement une machine précise d'un Vagrantfile qui en définit plusieurs.",
    syntax: "vagrant up <nom_machine>",
    examples: [
      { cmd: "vagrant up web01", desc: "Démarre uniquement la machine web01, pas les autres" },
      { cmd: "vagrant ssh web01", desc: "Se connecte ensuite uniquement à cette machine précise" }
    ],
    flags: []
  },
  {
    name: "vagrant provision --debug",
    os: "vagrant",
    category: "Système",
    description: "Relance le provisioning avec une sortie de debug très détaillée pour diagnostiquer un échec.",
    syntax: "vagrant provision --debug",
    examples: [
      { cmd: "vagrant provision --debug 2>&1 | tee debug.log", desc: "Capture tout le détail dans un fichier log" },
      { cmd: "vagrant up --debug", desc: "Le flag --debug fonctionne aussi dès le tout premier démarrage" }
    ],
    flags: ["--debug"]
  },
  {
    name: "vagrant up --destroy-on-error",
    os: "vagrant",
    category: "Système",
    description: "Détruit automatiquement la VM si le démarrage ou le provisioning échoue, pour éviter un état incohérent.",
    syntax: "vagrant up --destroy-on-error",
    examples: [
      { cmd: "vagrant up --destroy-on-error", desc: "Nettoie automatiquement en cas d'échec" },
      { cmd: "vagrant up --no-destroy-on-error", desc: "Désactive ce comportement pour inspecter la VM après un échec" }
    ],
    flags: ["--destroy-on-error"]
  },
  {
    name: "vagrant snapshot push / pop",
    os: "vagrant",
    category: "Système",
    description: "Empile rapidement un snapshot temporaire (push) puis y revient (pop), sans avoir à le nommer.",
    syntax: "vagrant snapshot push | vagrant snapshot pop",
    examples: [
      { cmd: "vagrant snapshot push", desc: "Sauvegarde rapidement l'état actuel" },
      { cmd: "vagrant snapshot pop", desc: "Restaure le dernier snapshot empilé et le supprime" }
    ],
    flags: ["push", "pop"]
  },
  {
    name: "vagrant ssh -c",
    os: "vagrant",
    category: "Système",
    description: "Exécute une commande unique sur la VM via SSH sans ouvrir de session interactive.",
    syntax: "vagrant ssh -c '<commande>'",
    examples: [
      { cmd: "vagrant ssh -c 'sudo systemctl status nginx'", desc: "Exécute une commande à distance et affiche le résultat" },
      { cmd: "vagrant ssh -c 'sudo journalctl -u nginx --since \"10 min ago\"'", desc: "Récupère un extrait de log précis sans ouvrir de session" }
    ],
    flags: ["-c"]
  },
  {
    name: "vagrant up --parallel",
    os: "vagrant",
    category: "Système",
    description: "Démarre les machines d'un environnement multi-machine en parallèle plutôt que séquentiellement.",
    syntax: "vagrant up --parallel",
    examples: [
      { cmd: "vagrant up --parallel", desc: "Accélère le démarrage de plusieurs VMs simultanément" },
      { cmd: "vagrant up --parallel --provider virtualbox", desc: "Combine le parallélisme avec un provider précis" }
    ],
    flags: ["--parallel"]
  },
  {
    name: "VAGRANT_LOG (variable d'environnement)",
    os: "vagrant",
    category: "Système",
    description: "Active des logs de debug détaillés pour Vagrant via une variable d'environnement.",
    syntax: "VAGRANT_LOG=debug vagrant up",
    examples: [
      { cmd: "VAGRANT_LOG=debug vagrant up", desc: "Affiche tous les détails internes de l'exécution" },
      { cmd: "VAGRANT_LOG=info vagrant up", desc: "Niveau 'info' moins verbeux que 'debug', suffisant pour la plupart des diagnostics" }
    ],
    flags: ["debug", "info", "warn"]
  },
  {
    name: "vagrant up (réseau privé)",
    os: "vagrant",
    category: "Réseau",
    description: "Référence rapide pour configurer un réseau privé statique dans le Vagrantfile.",
    syntax: "config.vm.network \"private_network\", ip: \"<ip>\"",
    examples: [
      { cmd: "config.vm.network \"private_network\", ip: \"192.168.56.10\"", desc: "Attribue une IP fixe accessible depuis l'hôte" },
      { cmd: "config.vm.network \"forwarded_port\", guest: 80, host: 8080", desc: "Redirige le port 80 de la VM vers le 8080 de l'hôte" }
    ],
    flags: []
  },
  {
    name: "vagrant up (provisioning shell)",
    os: "vagrant",
    category: "Système",
    description: "Référence rapide pour exécuter un script shell au provisioning, déclaré dans le Vagrantfile.",
    syntax: "config.vm.provision \"shell\", path: \"<script.sh>\"",
    examples: [
      { cmd: "config.vm.provision \"shell\", path: \"setup.sh\"", desc: "Exécute un script shell à chaque vagrant up/provision" },
      { cmd: "config.vm.provision \"shell\", inline: \"apt update && apt upgrade -y\"", desc: "Provisioning inline sans fichier séparé" }
    ],
    flags: []
  },
  {
    name: "vagrant up (multi-provider Vagrantfile)",
    os: "vagrant",
    category: "Système",
    description: "Référence rapide pour spécifier des ressources différentes selon le provider utilisé.",
    syntax: "config.vm.provider \"virtualbox\" do |vb| vb.memory = \"2048\" end",
    examples: [
      { cmd: "config.vm.provider \"virtualbox\" do |vb| vb.memory = \"2048\"; vb.cpus = 2 end", desc: "Configure RAM et CPU pour VirtualBox" },
      { cmd: "config.vm.provider \"vmware_desktop\" do |v| v.vmx[\"memsize\"] = \"4096\" end", desc: "Même logique adaptée au provider VMware Workstation" }
    ],
    flags: []
  },
  {
    name: "vagrant box list --box-info",
    os: "vagrant",
    category: "Paquets",
    description: "Affiche des informations détaillées sur les box installées (provider, taille, date).",
    syntax: "vagrant box list --box-info",
    examples: [
      { cmd: "vagrant box list --box-info", desc: "Détails complets sur chaque box locale" },
      { cmd: "vagrant box list", desc: "Sans --box-info : juste les noms et versions, plus rapide à lire" }
    ],
    flags: ["--box-info"]
  },
  {
    name: "vagrant ssh-config --host",
    os: "vagrant",
    category: "Réseau",
    description: "Génère la config SSH pour une machine précise d'un environnement multi-machine.",
    syntax: "vagrant ssh-config --host <nom_machine>",
    examples: [
      { cmd: "vagrant ssh-config --host web01 >> ~/.ssh/config", desc: "Ajoute uniquement la config SSH de web01" },
      { cmd: "vagrant ssh-config", desc: "Sans --host : génère la config SSH de toutes les machines du projet" }
    ],
    flags: ["--host"]
  },
  {
    name: "vagrant up --provision-with",
    os: "vagrant",
    category: "Système",
    description: "Exécute uniquement un provisioner précis parmi plusieurs déclarés (shell, ansible, etc.).",
    syntax: "vagrant provision --provision-with <nom>",
    examples: [
      { cmd: "vagrant provision --provision-with ansible", desc: "Relance uniquement le provisioning Ansible" },
      { cmd: "vagrant up --provision-with shell,ansible", desc: "Exécute plusieurs provisioners précis, dans l'ordre indiqué" }
    ],
    flags: ["--provision-with"]
  },
  {
    name: "vagrant halt --force",
    os: "vagrant",
    category: "Système",
    description: "Force l'arrêt brutal de la VM sans attendre un shutdown propre du système invité.",
    syntax: "vagrant halt --force",
    examples: [
      { cmd: "vagrant halt --force", desc: "Coupe la VM immédiatement, équivalent d'un débranchement" },
      { cmd: "vagrant halt", desc: "Sans --force : tente d'abord un arrêt propre via ACPI" }
    ],
    flags: ["--force / -f"]
  },
  {
    name: "vagrant up (synced_folder)",
    os: "vagrant",
    category: "Fichiers",
    description: "Référence rapide pour configurer un dossier partagé personnalisé entre hôte et VM.",
    syntax: "config.vm.synced_folder \"<local>\", \"<distant>\"",
    examples: [
      { cmd: "config.vm.synced_folder \"./app\", \"/var/www/app\"", desc: "Partage un dossier local vers la VM" },
      { cmd: "config.vm.synced_folder \".\", \"/vagrant\", disabled: true", desc: "Désactive le partage automatique par défaut" }
    ],
    flags: []
  },
  {
    name: "vagrant box add --provider",
    os: "vagrant",
    category: "Paquets",
    description: "Télécharge une box pour un provider spécifique lorsque plusieurs sont disponibles.",
    syntax: "vagrant box add <nom> --provider <provider>",
    examples: [
      { cmd: "vagrant box add debian/bookworm64 --provider libvirt", desc: "Télécharge la version libvirt/KVM de la box" },
      { cmd: "vagrant box add debian/bookworm64 --provider vmware_desktop", desc: "Version VMware Workstation de la même box" }
    ],
    flags: ["--provider"]
  },
  {
    name: "vagrant up --check-cwd",
    os: "vagrant",
    category: "Système",
    description: "Vérifie ou désactive la vérification du dossier courant avant exécution (utile en script automatisé).",
    syntax: "VAGRANT_CWD=<chemin> vagrant up --no-check-cwd",
    examples: [
      { cmd: "VAGRANT_CWD=/projets/lab vagrant up", desc: "Force le dossier de travail Vagrant depuis un script externe" },
      { cmd: "vagrant up --no-check-cwd", desc: "Désactive la vérification pour lancer depuis n'importe quel dossier" }
    ],
    flags: ["--no-check-cwd"]
  },

  // ── NMAP ──────────────────────────────────────────────────
  {
    name: "nmap (scan simple)",
    os: "nmap",
    category: "Réseau",
    description: "Scanne les ports ouverts d'un hôte ou d'un réseau pour cartographier les services actifs.",
    syntax: "nmap <cible>",
    examples: [
      { cmd: "nmap 192.168.1.10", desc: "Scan rapide des ports les plus courants" },
      { cmd: "nmap 192.168.1.0/24", desc: "Scan de tout un sous-réseau" }
    ],
    flags: []
  },
  {
    name: "nmap -sV",
    os: "nmap",
    category: "Réseau",
    description: "Détecte les versions des services tournant sur les ports ouverts.",
    syntax: "nmap -sV <cible>",
    examples: [
      { cmd: "nmap -sV 192.168.1.10", desc: "Identifie les versions des services (ex: Apache 2.4.x)" },
      { cmd: "nmap -sV --version-light 192.168.1.10", desc: "Détection de version rapide, moins exhaustive mais plus rapide" }
    ],
    flags: ["-sV"]
  },
  {
    name: "nmap -O",
    os: "nmap",
    category: "Réseau",
    description: "Tente de détecter le système d'exploitation de la cible via empreinte réseau.",
    syntax: "nmap -O <cible>",
    examples: [
      { cmd: "sudo nmap -O 192.168.1.10", desc: "Détecte l'OS distant (nécessite les droits root)" },
      { cmd: "sudo nmap -O --osscan-limit 192.168.1.0/24", desc: "Ne tente la détection d'OS que sur les hôtes ayant au moins un port ouvert et un fermé" }
    ],
    flags: ["-O"]
  },
  {
    name: "nmap -p",
    os: "nmap",
    category: "Réseau",
    description: "Scanne uniquement des ports précis au lieu de la liste par défaut.",
    syntax: "nmap -p <ports> <cible>",
    examples: [
      { cmd: "nmap -p 22,80,443 192.168.1.10", desc: "Scanne seulement ces 3 ports" },
      { cmd: "nmap -p- 192.168.1.10", desc: "Scanne tous les 65535 ports" }
    ],
    flags: ["-p (liste de ports)", "-p- (tous les ports)"]
  },
  {
    name: "nmap -sS",
    os: "nmap",
    category: "Réseau",
    description: "Effectue un scan SYN furtif (half-open), plus discret qu'un scan TCP complet.",
    syntax: "nmap -sS <cible>",
    examples: [
      { cmd: "sudo nmap -sS 192.168.1.10", desc: "Scan SYN, nécessite les droits root" },
      { cmd: "sudo nmap -sS -p 1-1000 192.168.1.10", desc: "Limite le scan SYN aux 1000 premiers ports plutôt que les 1000 par défaut de nmap" }
    ],
    flags: ["-sS"]
  },
  {
    name: "nmap -sU",
    os: "nmap",
    category: "Réseau",
    description: "Scanne les ports UDP au lieu de TCP (plus lent, souvent oublié dans les audits).",
    syntax: "nmap -sU <cible>",
    examples: [
      { cmd: "sudo nmap -sU -p 53,161 192.168.1.10", desc: "Scanne les ports UDP DNS et SNMP" },
      { cmd: "sudo nmap -sU --top-ports 20 192.168.1.0/24", desc: "Scan UDP rapide sur les 20 ports UDP les plus courants seulement" }
    ],
    flags: ["-sU"]
  },
  {
    name: "nmap -A",
    os: "nmap",
    category: "Réseau",
    description: "Active la détection agressive : OS, versions, scripts par défaut et traceroute en une seule commande.",
    syntax: "nmap -A <cible>",
    examples: [
      { cmd: "sudo nmap -A 192.168.1.10", desc: "Scan complet et détaillé (plus lent, plus visible)" },
      { cmd: "sudo nmap -A -p 80,443 192.168.1.10", desc: "Limite le scan agressif à des ports précis pour aller plus vite" }
    ],
    flags: ["-A"]
  },
  {
    name: "nmap --script",
    os: "nmap",
    category: "Réseau",
    description: "Exécute des scripts NSE (Nmap Scripting Engine) pour des tests spécifiques (vulnérabilités, énumération...).",
    syntax: "nmap --script <script> <cible>",
    examples: [
      { cmd: "nmap --script vuln 192.168.1.10", desc: "Recherche des vulnérabilités connues" },
      { cmd: "nmap --script smb-enum-shares 192.168.1.10", desc: "Énumère les partages SMB" }
    ],
    flags: ["--script", "--script-args"]
  },
  {
    name: "nmap -oN / -oX",
    os: "nmap",
    category: "Fichiers",
    description: "Exporte les résultats du scan vers un fichier texte ou XML pour archivage/traitement.",
    syntax: "nmap <cible> -oN <fichier.txt> | -oX <fichier.xml>",
    examples: [
      { cmd: "nmap 192.168.1.0/24 -oN scan-resultats.txt", desc: "Sauvegarde en texte lisible" },
      { cmd: "nmap 192.168.1.0/24 -oX scan.xml", desc: "Sauvegarde en XML (pour outils tiers)" }
    ],
    flags: ["-oN (texte)", "-oX (XML)", "-oG (grepable)"]
  },
  {
    name: "nmap -Pn",
    os: "nmap",
    category: "Réseau",
    description: "Désactive la découverte d'hôte (ping) et force le scan même si la cible ne répond pas au ping.",
    syntax: "nmap -Pn <cible>",
    examples: [
      { cmd: "nmap -Pn 192.168.1.10", desc: "Scanne même si l'hôte bloque les ping ICMP" },
      { cmd: "nmap -Pn -sS 192.168.1.0/24", desc: "Combine avec un scan SYN pour scanner tout un réseau qui bloque le ping" }
    ],
    flags: ["-Pn"]
  },
  {
    name: "nmap -sn",
    os: "nmap",
    category: "Réseau",
    description: "Découvre les hôtes actifs d'un réseau sans scanner leurs ports (ping scan).",
    syntax: "nmap -sn <réseau>",
    examples: [
      { cmd: "nmap -sn 192.168.1.0/24", desc: "Liste rapidement les machines actives du réseau" },
      { cmd: "nmap -sn 192.168.1.0/24 -oG - | grep Up", desc: "Filtre directement la sortie pour ne garder que les hôtes actifs" }
    ],
    flags: ["-sn"]
  },
  {
    name: "nmap -T",
    os: "nmap",
    category: "Réseau",
    description: "Règle la vitesse du scan, de très lent/discret (0) à très rapide/agressif (5).",
    syntax: "nmap -T<0-5> <cible>",
    examples: [
      { cmd: "nmap -T4 192.168.1.10", desc: "Vitesse rapide, bon compromis pour un usage normal" },
      { cmd: "nmap -T2 192.168.1.10", desc: "Scan plus discret et lent" }
    ],
    flags: ["-T0 à -T5 (paranoid à insane)"]
  },
  {
    name: "nmap -sC",
    os: "nmap",
    category: "Réseau",
    description: "Exécute les scripts NSE par défaut (énumération basique, détection de vulnérabilités courantes).",
    syntax: "nmap -sC <cible>",
    examples: [
      { cmd: "nmap -sC -sV 192.168.1.10", desc: "Combine scripts par défaut et détection de versions" },
      { cmd: "nmap --script=default,safe -sV 192.168.1.10", desc: "Équivalent explicite de -sC en nommant les catégories de scripts" }
    ],
    flags: ["-sC"]
  },
  {
    name: "nmap --top-ports",
    os: "nmap",
    category: "Réseau",
    description: "Scanne uniquement les N ports les plus couramment utilisés, pour un scan rapide et représentatif.",
    syntax: "nmap --top-ports <n> <cible>",
    examples: [
      { cmd: "nmap --top-ports 100 192.168.1.10", desc: "Scanne les 100 ports les plus fréquents" },
      { cmd: "nmap --top-ports 1000 -oG - 192.168.1.0/24 | grep open", desc: "Scan des 1000 ports les plus fréquents, filtré pour ne montrer que les ports ouverts" }
    ],
    flags: ["--top-ports"]
  },
  {
    name: "nmap -e",
    os: "nmap",
    category: "Réseau",
    description: "Force l'utilisation d'une interface réseau précise pour le scan.",
    syntax: "nmap -e <interface> <cible>",
    examples: [
      { cmd: "nmap -e eth1 192.168.1.0/24", desc: "Scanne via une interface réseau spécifique" },
      { cmd: "nmap -e eth1 -Pn 192.168.1.10", desc: "Combine avec -Pn pour forcer le scan via cette interface même sans réponse au ping" }
    ],
    flags: ["-e"]
  },
  {
    name: "nmap -sA",
    os: "nmap",
    category: "Réseau",
    description: "Effectue un scan ACK, utile pour cartographier les règles de pare-feu plutôt que détecter des ports ouverts.",
    syntax: "nmap -sA <cible>",
    examples: [
      { cmd: "sudo nmap -sA 192.168.1.10", desc: "Identifie si un pare-feu filtre certains ports" },
      { cmd: "sudo nmap -sA -p 1-65535 192.168.1.10", desc: "Cartographie les règles de pare-feu sur l'ensemble des ports" }
    ],
    flags: ["-sA"]
  },
  {
    name: "nmap --reason",
    os: "nmap",
    category: "Réseau",
    description: "Affiche la raison technique (type de paquet reçu) justifiant l'état de chaque port.",
    syntax: "nmap --reason <cible>",
    examples: [
      { cmd: "nmap --reason 192.168.1.10", desc: "Explique pourquoi chaque port est jugé ouvert/fermé/filtré" },
      { cmd: "nmap --reason -p 22,80,443 192.168.1.10", desc: "Limite l'explication détaillée à quelques ports précis" }
    ],
    flags: ["--reason"]
  },
  {
    name: "nmap -6",
    os: "nmap",
    category: "Réseau",
    description: "Effectue le scan en IPv6 au lieu d'IPv4.",
    syntax: "nmap -6 <cible_ipv6>",
    examples: [
      { cmd: "nmap -6 fe80::1", desc: "Scanne une cible en IPv6" },
      { cmd: "nmap -6 -sV fe80::1%eth0", desc: "Ajoute la détection de version, en précisant l'interface pour une IPv6 locale" }
    ],
    flags: ["-6"]
  },
  {
    name: "nmap -iL",
    os: "nmap",
    category: "Réseau",
    description: "Scanne une liste de cibles définies dans un fichier texte plutôt que sur la ligne de commande.",
    syntax: "nmap -iL <fichier.txt>",
    examples: [
      { cmd: "nmap -iL cibles.txt", desc: "Scanne toutes les IP/hôtes listés dans le fichier" },
      { cmd: "nmap -iL cibles.txt -oA resultats", desc: "Scanne la liste et exporte directement dans les 3 formats" }
    ],
    flags: ["-iL"]
  },
  {
    name: "nmap --traceroute",
    os: "nmap",
    category: "Réseau",
    description: "Trace le chemin réseau (routeurs traversés) jusqu'à la cible en plus du scan.",
    syntax: "nmap --traceroute <cible>",
    examples: [
      { cmd: "nmap --traceroute 192.168.1.10", desc: "Affiche les sauts réseau jusqu'à la cible" },
      { cmd: "nmap --traceroute -sn 192.168.1.10", desc: "Combine avec un simple ping scan pour juste voir le chemin, sans scanner les ports" }
    ],
    flags: ["--traceroute"]
  },
  {
    name: "nmap -v / -vv",
    os: "nmap",
    category: "Réseau",
    description: "Augmente le niveau de détail affiché pendant le scan (progression, infos de debug).",
    syntax: "nmap -v <cible>",
    examples: [
      { cmd: "nmap -vv 192.168.1.0/24", desc: "Affiche un maximum de détails pendant le scan" },
      { cmd: "nmap -v --stats-every 10s 192.168.1.0/24", desc: "Affiche un point d'avancement toutes les 10 secondes sur un gros scan" }
    ],
    flags: ["-v", "-vv"]
  },
  {
    name: "nmap --open",
    os: "nmap",
    category: "Réseau",
    description: "N'affiche que les ports trouvés ouverts, en masquant les ports fermés/filtrés du résultat.",
    syntax: "nmap --open <cible>",
    examples: [
      { cmd: "nmap --open 192.168.1.0/24", desc: "Affiche uniquement les hôtes avec au moins un port ouvert" },
      { cmd: "nmap --open -p- 192.168.1.10", desc: "Combine avec un scan de tous les ports (-p-) pour ne garder que les ouverts" }
    ],
    flags: ["--open"]
  },
  {
    name: "nmap -sT",
    os: "nmap",
    category: "Réseau",
    description: "Effectue un scan TCP Connect complet (établit la connexion entière), ne nécessite pas de droits root.",
    syntax: "nmap -sT <cible>",
    examples: [
      { cmd: "nmap -sT 192.168.1.10", desc: "Scan TCP classique, utilisable sans privilèges root" },
      { cmd: "nmap -sT -p 1-1000 192.168.1.0/24", desc: "Scan Connect complet sur un sous-réseau entier, sans droits root" }
    ],
    flags: ["-sT"]
  },
  {
    name: "nmap -PS / -PA",
    os: "nmap",
    category: "Réseau",
    description: "Personnalise la méthode de découverte d'hôte en envoyant des paquets SYN (-PS) ou ACK (-PA) sur des ports précis.",
    syntax: "nmap -PS<ports> <cible> | nmap -PA<ports> <cible>",
    examples: [
      { cmd: "nmap -PS22,80,443 192.168.1.0/24", desc: "Découvre les hôtes via SYN sur ces ports" },
      { cmd: "nmap -PA80,443 192.168.1.0/24", desc: "Même découverte mais via des paquets ACK plutôt que SYN" }
    ],
    flags: ["-PS (TCP SYN ping)", "-PA (TCP ACK ping)"]
  },
  {
    name: "nmap -PE",
    os: "nmap",
    category: "Réseau",
    description: "Utilise spécifiquement le ping ICMP Echo classique pour la découverte d'hôtes.",
    syntax: "nmap -PE <cible>",
    examples: [
      { cmd: "nmap -PE 192.168.1.0/24", desc: "Découverte via ping ICMP standard uniquement" },
      { cmd: "nmap -PE -PS22,80 192.168.1.0/24", desc: "Combine ping ICMP classique et découverte SYN pour plus de fiabilité" }
    ],
    flags: ["-PE"]
  },
  {
    name: "nmap --osscan-guess",
    os: "nmap",
    category: "Réseau",
    description: "Force une détection d'OS plus agressive et insistante lorsque l'empreinte n'est pas claire.",
    syntax: "nmap -O --osscan-guess <cible>",
    examples: [
      { cmd: "nmap -O --osscan-guess 192.168.1.10", desc: "Tente de deviner l'OS même avec des résultats ambigus" },
      { cmd: "sudo nmap -O --osscan-guess --max-os-tries 3 192.168.1.10", desc: "Limite le nombre de tentatives pour ne pas ralentir excessivement le scan" }
    ],
    flags: ["--osscan-guess"]
  },
  {
    name: "nmap --packet-trace",
    os: "nmap",
    category: "Réseau",
    description: "Affiche chaque paquet envoyé et reçu en détail, utile pour déboguer un scan ou apprendre le protocole.",
    syntax: "nmap --packet-trace <cible>",
    examples: [
      { cmd: "nmap --packet-trace -p 80 192.168.1.10", desc: "Montre les paquets bruts échangés" },
      { cmd: "sudo nmap --packet-trace -sS -p 22 192.168.1.10", desc: "Combine avec un scan SYN pour voir précisément les paquets d'un handshake TCP" }
    ],
    flags: ["--packet-trace"]
  },
  {
    name: "nmap -D",
    os: "nmap",
    category: "Réseau",
    description: "Effectue un scan en utilisant des leurres (decoys) pour masquer l'origine réelle du scan dans les logs cibles.",
    syntax: "nmap -D <decoy1,decoy2,ME> <cible>",
    examples: [
      { cmd: "nmap -D 10.0.0.1,10.0.0.2,ME 192.168.1.10", desc: "Mélange l'IP réelle avec des IP leurres dans les logs" },
      { cmd: "nmap -D RND:10 192.168.1.10", desc: "Génère 10 leurres aléatoires automatiquement plutôt que de les lister à la main" }
    ],
    flags: ["-D"]
  },
  {
    name: "nmap --spoof-mac",
    os: "nmap",
    category: "Réseau",
    description: "Usurpe l'adresse MAC source du scan, utile en test d'intrusion sur réseau local.",
    syntax: "nmap --spoof-mac <mac|0|vendor> <cible>",
    examples: [
      { cmd: "nmap --spoof-mac 0 192.168.1.10", desc: "Génère une MAC aléatoire pour le scan" },
      { cmd: "nmap --spoof-mac Cisco 192.168.1.10", desc: "Usurpe une MAC correspondant à un fabricant précis plutôt qu'aléatoire" }
    ],
    flags: ["--spoof-mac"]
  },
  {
    name: "nmap -sY",
    os: "nmap",
    category: "Réseau",
    description: "Effectue un scan SCTP INIT, pour les protocoles utilisant SCTP (téléphonie, signalisation).",
    syntax: "nmap -sY <cible>",
    examples: [
      { cmd: "sudo nmap -sY 192.168.1.10", desc: "Scan spécifique au protocole SCTP" },
      { cmd: "sudo nmap -sY -p 2905 192.168.1.10", desc: "Cible un port SCTP précis plutôt qu'un scan complet" }
    ],
    flags: ["-sY"]
  },
  {
    name: "nmap --min-rate / --max-rate",
    os: "nmap",
    category: "Réseau",
    description: "Contrôle précisément le débit d'envoi de paquets par seconde, pour accélérer ou ralentir un scan.",
    syntax: "nmap --min-rate <n> <cible>",
    examples: [
      { cmd: "nmap --min-rate 1000 192.168.1.0/24", desc: "Force un débit minimum pour accélérer un gros scan" },
      { cmd: "nmap --max-rate 100 192.168.1.10", desc: "Ralentit volontairement le scan pour rester discret ou ménager la cible" }
    ],
    flags: ["--min-rate", "--max-rate"]
  },
  {
    name: "nmap --version-intensity",
    os: "nmap",
    category: "Réseau",
    description: "Ajuste l'intensité de la détection de version des services (0=rapide/léger, 9=complet/lent).",
    syntax: "nmap -sV --version-intensity <0-9> <cible>",
    examples: [
      { cmd: "nmap -sV --version-intensity 9 192.168.1.10", desc: "Détection de version maximale, plus lente mais plus précise" },
      { cmd: "nmap -sV --version-intensity 0 192.168.1.10", desc: "Détection minimale, la plus rapide possible" }
    ],
    flags: ["--version-intensity"]
  },
  {
    name: "nmap -F",
    os: "nmap",
    category: "Réseau",
    description: "Mode rapide : scanne uniquement les 100 ports les plus courants au lieu de 1000.",
    syntax: "nmap -F <cible>",
    examples: [
      { cmd: "nmap -F 192.168.1.0/24", desc: "Scan rapide pour un premier aperçu du réseau" },
      { cmd: "nmap -F -sV 192.168.1.0/24", desc: "Combine le mode rapide avec la détection de version pour un aperçu efficace" }
    ],
    flags: ["-F"]
  },
  {
    name: "nmap --badsum",
    os: "nmap",
    category: "Réseau",
    description: "Envoie des paquets avec une somme de contrôle volontairement invalide, pour tester les IDS/pare-feu.",
    syntax: "nmap --badsum <cible>",
    examples: [
      { cmd: "nmap --badsum 192.168.1.10", desc: "Teste si un pare-feu/IDS filtre les paquets corrompus" },
      { cmd: "nmap --badsum -p 80 192.168.1.10", desc: "Limite le test à un port précis pour vérifier rapidement le comportement du pare-feu" }
    ],
    flags: ["--badsum"]
  },
  {
    name: "nmap -oA",
    os: "nmap",
    category: "Fichiers",
    description: "Exporte simultanément les résultats dans les trois formats (texte, XML, grepable) en une commande.",
    syntax: "nmap <cible> -oA <préfixe>",
    examples: [
      { cmd: "nmap 192.168.1.0/24 -oA scan-complet", desc: "Génère scan-complet.nmap, .xml et .gnmap" },
      { cmd: "nmap -sV 192.168.1.0/24 -oA rapport-$(date +%Y%m%d)", desc: "Nomme les fichiers de sortie automatiquement avec la date du jour" }
    ],
    flags: ["-oA"]
  },
  {
    name: "nmap --script-help",
    os: "nmap",
    category: "Système",
    description: "Affiche la documentation d'un script NSE précis avant de l'utiliser.",
    syntax: "nmap --script-help <script>",
    examples: [
      { cmd: "nmap --script-help vuln", desc: "Affiche ce que fait la catégorie de scripts vuln" },
      { cmd: "nmap --script-help \"http-*\"", desc: "Affiche la doc de tous les scripts commençant par 'http-'" }
    ],
    flags: ["--script-help"]
  },
  {
    name: "nmap --resume",
    os: "nmap",
    category: "Réseau",
    description: "Reprend un scan interrompu à partir d'un fichier de sortie existant (-oN/-oG).",
    syntax: "nmap --resume <fichier_sortie>",
    examples: [
      { cmd: "nmap --resume scan-resultats.txt", desc: "Reprend là où le scan s'était arrêté" },
      { cmd: "nmap --resume scan-resultats.txt -v", desc: "Reprend le scan interrompu avec affichage détaillé de la progression" }
    ],
    flags: ["--resume"]
  },
  {
    name: "nmap -sZ",
    os: "nmap",
    category: "Réseau",
    description: "Effectue un scan SCTP COOKIE-ECHO, variante furtive du scan SCTP INIT.",
    syntax: "nmap -sZ <cible>",
    examples: [
      { cmd: "sudo nmap -sZ 192.168.1.10", desc: "Scan SCTP plus discret que -sY" },
      { cmd: "sudo nmap -sZ -p 2905 192.168.1.0/24", desc: "Cible le port SCTP standard sur tout un sous-réseau" }
    ],
    flags: ["-sZ"]
  },
  {
    name: "nmap --dns-servers",
    os: "nmap",
    category: "Réseau",
    description: "Force l'utilisation de serveurs DNS spécifiques pour la résolution de noms pendant le scan.",
    syntax: "nmap --dns-servers <ip1,ip2> <cible>",
    examples: [
      { cmd: "nmap --dns-servers 8.8.8.8 exemple.com", desc: "Utilise un DNS précis plutôt que celui du système" },
      { cmd: "nmap --dns-servers 1.1.1.1,8.8.8.8 exemple.com", desc: "Précise plusieurs serveurs DNS de secours" }
    ],
    flags: ["--dns-servers"]
  },
  {
    name: "nmap --system-dns",
    os: "nmap",
    category: "Réseau",
    description: "Force l'utilisation du résolveur DNS du système plutôt que celui intégré à nmap.",
    syntax: "nmap --system-dns <cible>",
    examples: [
      { cmd: "nmap --system-dns exemple.com", desc: "Utilise les paramètres DNS du système d'exploitation" },
      { cmd: "nmap --system-dns -sn 192.168.1.0/24", desc: "Utile en interne quand le DNS du système résout mieux les noms locaux" }
    ],
    flags: ["--system-dns"]
  },
  {
    name: "nmap -g / --source-port",
    os: "nmap",
    category: "Réseau",
    description: "Force un port source précis pour le scan, utile pour contourner certaines règles de pare-feu trop permissives.",
    syntax: "nmap -g <port> <cible>",
    examples: [
      { cmd: "nmap -g 53 192.168.1.10", desc: "Scan en se faisant passer pour du trafic DNS (port source 53)" },
      { cmd: "nmap --source-port 53 -p 1-1000 192.168.1.10", desc: "Combine le port source forcé avec un scan de plage de ports précise" }
    ],
    flags: ["-g", "--source-port"]
  },
  {
    name: "nmap --append-output",
    os: "nmap",
    category: "Fichiers",
    description: "Ajoute les résultats à un fichier de sortie existant au lieu de l'écraser.",
    syntax: "nmap <cible> -oN <fichier> --append-output",
    examples: [
      { cmd: "nmap 192.168.1.0/24 -oN scans.txt --append-output", desc: "Cumule les résultats de plusieurs scans dans un seul fichier" },
      { cmd: "nmap 192.168.1.0/24 -oG scans.gnmap --append-output", desc: "Fonctionne aussi avec le format grepable, pas seulement -oN" }
    ],
    flags: ["--append-output"]
  },

  // ── WIRESHARK / TSHARK ────────────────────────────────────
  {
    name: "tshark -i",
    os: "tshark",
    category: "Réseau",
    description: "Capture le trafic réseau en direct sur une interface, version ligne de commande de Wireshark.",
    syntax: "tshark -i <interface>",
    examples: [
      { cmd: "tshark -i eth0", desc: "Capture en direct sur l'interface eth0" },
      { cmd: "tshark -i any", desc: "Capture sur toutes les interfaces" }
    ],
    flags: ["-i (interface)"]
  },
  {
    name: "tshark -D",
    os: "tshark",
    category: "Réseau",
    description: "Liste les interfaces réseau disponibles pour la capture.",
    syntax: "tshark -D",
    examples: [
      { cmd: "tshark -D", desc: "Affiche la liste numérotée des interfaces" },
      { cmd: "tshark -D | grep -i wifi", desc: "Cherche rapidement l'interface Wi-Fi parmi la liste" }
    ],
    flags: ["-D"]
  },
  {
    name: "tshark -r / -w",
    os: "tshark",
    category: "Fichiers",
    description: "Lit un fichier de capture existant (.pcap) ou enregistre la capture en cours dans un fichier.",
    syntax: "tshark -r <fichier.pcap> | tshark -i <interface> -w <fichier.pcap>",
    examples: [
      { cmd: "tshark -r capture.pcap", desc: "Relit une capture existante" },
      { cmd: "tshark -i eth0 -w capture.pcap", desc: "Capture en direct et sauvegarde dans un fichier" }
    ],
    flags: ["-r (read)", "-w (write)"]
  },
  {
    name: "tshark -Y",
    os: "tshark",
    category: "Réseau",
    description: "Applique un filtre d'affichage Wireshark pour ne montrer que certains paquets.",
    syntax: "tshark -i <interface> -Y '<filtre>'",
    examples: [
      { cmd: "tshark -i eth0 -Y 'http'", desc: "N'affiche que le trafic HTTP" },
      { cmd: "tshark -r capture.pcap -Y 'ip.addr==192.168.1.10'", desc: "Filtre par adresse IP" }
    ],
    flags: ["-Y (display filter)"]
  },
  {
    name: "tshark -f",
    os: "tshark",
    category: "Réseau",
    description: "Applique un filtre de capture (syntaxe BPF), appliqué avant l'enregistrement des paquets.",
    syntax: "tshark -i <interface> -f '<filtre_bpf>'",
    examples: [
      { cmd: "tshark -i eth0 -f 'port 443'", desc: "Capture uniquement le trafic sur le port 443" },
      { cmd: "tshark -i eth0 -f 'host 192.168.1.10'", desc: "Capture uniquement le trafic vers/depuis cet hôte" }
    ],
    flags: ["-f (capture filter, syntaxe BPF)"]
  },
  {
    name: "tshark -T fields -e",
    os: "tshark",
    category: "Réseau",
    description: "Extrait des champs précis des paquets pour un traitement scripté (CSV, logs...).",
    syntax: "tshark -r <fichier> -T fields -e <champ>",
    examples: [
      { cmd: "tshark -r capture.pcap -T fields -e ip.src -e ip.dst", desc: "Extrait uniquement les IP source/destination" },
      { cmd: "tshark -r capture.pcap -T fields -e http.host -Y http.request", desc: "Liste les hôtes HTTP demandés" }
    ],
    flags: ["-T fields", "-e (champ à extraire)", "-E separator=,"]
  },
  {
    name: "tshark -c",
    os: "tshark",
    category: "Réseau",
    description: "Limite la capture à un nombre de paquets précis avant de s'arrêter automatiquement.",
    syntax: "tshark -i <interface> -c <nombre>",
    examples: [
      { cmd: "tshark -i eth0 -c 100", desc: "Capture exactement 100 paquets puis s'arrête" },
      { cmd: "tshark -i eth0 -c 50 -w echantillon.pcap", desc: "Capture un échantillon de 50 paquets directement dans un fichier" }
    ],
    flags: ["-c (nombre de paquets)"]
  },
  {
    name: "tshark -z io,stat",
    os: "tshark",
    category: "Réseau",
    description: "Affiche des statistiques de trafic agrégées (débit, nombre de paquets) sur des intervalles de temps.",
    syntax: "tshark -r <fichier> -q -z io,stat,<intervalle>",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z io,stat,1", desc: "Statistiques par tranche de 1 seconde" },
      { cmd: "tshark -r capture.pcap -q -z io,stat,10,ip.addr==192.168.1.10", desc: "Statistiques par tranches de 10s, filtrées sur une IP précise" }
    ],
    flags: ["-q (quiet)", "-z io,stat,<secondes>"]
  },
  {
    name: "tshark -x",
    os: "tshark",
    category: "Réseau",
    description: "Affiche le contenu de chaque paquet en hexadécimal et ASCII en plus du résumé.",
    syntax: "tshark -r <fichier> -x",
    examples: [
      { cmd: "tshark -r capture.pcap -x", desc: "Affiche le dump hex/ASCII de chaque paquet" },
      { cmd: "tshark -r capture.pcap -x -c 5", desc: "Limite le dump hex/ASCII aux 5 premiers paquets" }
    ],
    flags: ["-x"]
  },
  {
    name: "tshark -V",
    os: "tshark",
    category: "Réseau",
    description: "Affiche l'arborescence complète des protocoles décodés pour chaque paquet (mode très détaillé).",
    syntax: "tshark -r <fichier> -V",
    examples: [
      { cmd: "tshark -r capture.pcap -V -c 1", desc: "Détail complet du premier paquet uniquement" },
      { cmd: "tshark -r capture.pcap -V -Y 'tcp.port==443'", desc: "Détail complet, mais seulement pour les paquets HTTPS" }
    ],
    flags: ["-V (verbose, arbre de protocoles)"]
  },
  {
    name: "tshark -z follow,tcp",
    os: "tshark",
    category: "Réseau",
    description: "Reconstitue et affiche le contenu complet d'un flux TCP (utile pour suivre une conversation HTTP).",
    syntax: "tshark -r <fichier> -q -z follow,tcp,ascii,<stream_id>",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z follow,tcp,ascii,0", desc: "Affiche le contenu du flux TCP n°0" },
      { cmd: "tshark -r capture.pcap -q -z follow,tcp,hex,0", desc: "Affiche le flux en hexadécimal plutôt qu'en ASCII" }
    ],
    flags: ["-z follow,tcp,ascii,<id>"]
  },
  {
    name: "tshark -a duration",
    os: "tshark",
    category: "Réseau",
    description: "Arrête automatiquement la capture après une durée ou condition donnée.",
    syntax: "tshark -i <interface> -a duration:<secondes>",
    examples: [
      { cmd: "tshark -i eth0 -a duration:60", desc: "Capture pendant 60 secondes puis s'arrête" },
      { cmd: "tshark -i eth0 -a filesize:10240", desc: "S'arrête après 10 Mo capturés" }
    ],
    flags: ["-a duration:<s>", "-a filesize:<Ko>"]
  },
  {
    name: "tshark -q -z conv,ip",
    os: "tshark",
    category: "Réseau",
    description: "Affiche un tableau récapitulatif des conversations entre paires d'adresses IP.",
    syntax: "tshark -r <fichier> -q -z conv,ip",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z conv,ip", desc: "Liste qui parle à qui et combien de données échangées" },
      { cmd: "tshark -r capture.pcap -q -z conv,ip -Y 'ip.addr==192.168.1.10'", desc: "Limite les conversations affichées à celles impliquant une IP précise" }
    ],
    flags: ["-z conv,ip", "-z conv,tcp"]
  },
  {
    name: "tshark -z http,tree",
    os: "tshark",
    category: "Réseau",
    description: "Affiche des statistiques sur les requêtes HTTP capturées (codes de réponse, méthodes, hôtes).",
    syntax: "tshark -r <fichier> -q -z http,tree",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z http,tree", desc: "Répartition des requêtes/réponses HTTP" },
      { cmd: "tshark -r capture.pcap -q -z http,tree,ip.addr==192.168.1.10", desc: "Statistiques HTTP filtrées sur un hôte précis" }
    ],
    flags: ["-z http,tree"]
  },
  {
    name: "tshark -n",
    os: "tshark",
    category: "Réseau",
    description: "Désactive la résolution de noms (DNS, ports, MAC) pour accélérer l'affichage et éviter le bruit réseau.",
    syntax: "tshark -i <interface> -n",
    examples: [
      { cmd: "tshark -i eth0 -n", desc: "Affiche les IP brutes sans résolution DNS" },
      { cmd: "tshark -i eth0 -n -Y dns", desc: "Combine avec un filtre DNS pour voir les requêtes brutes sans résolution" }
    ],
    flags: ["-n"]
  },
  {
    name: "tshark -2 -R",
    os: "tshark",
    category: "Réseau",
    description: "Effectue une capture en deux passes : capture brute puis applique un filtre d'affichage en post-traitement.",
    syntax: "tshark -i <interface> -2 -R '<filtre>'",
    examples: [
      { cmd: "tshark -i eth0 -2 -R 'tcp.analysis.retransmission'", desc: "Filtre les retransmissions TCP après capture" },
      { cmd: "tshark -r capture.pcap -2 -R 'http.response.code >= 400'", desc: "Applique le filtre d'affichage sur un fichier déjà capturé plutôt qu'en direct" }
    ],
    flags: ["-2 (deux passes)", "-R (filtre post-capture)"]
  },
  {
    name: "tshark -s",
    os: "tshark",
    category: "Réseau",
    description: "Limite la taille capturée de chaque paquet (snaplen), utile pour réduire la taille du fichier de capture.",
    syntax: "tshark -i <interface> -s <octets>",
    examples: [
      { cmd: "tshark -i eth0 -s 96", desc: "Capture seulement les 96 premiers octets de chaque paquet (en-têtes)" },
      { cmd: "tshark -i eth0 -s 0 -w full.pcap", desc: "0 = pas de limite, capture chaque paquet en entier" }
    ],
    flags: ["-s (snaplen)"]
  },
  {
    name: "tshark -G fields",
    os: "tshark",
    category: "Système",
    description: "Génère la liste complète des noms de champs disponibles pour l'extraction (-T fields -e).",
    syntax: "tshark -G fields",
    examples: [
      { cmd: "tshark -G fields | grep http", desc: "Cherche les champs disponibles liés à HTTP" },
      { cmd: "tshark -G fields | grep tcp.flags", desc: "Cherche les champs disponibles liés aux flags TCP" }
    ],
    flags: ["-G fields"]
  },
  {
    name: "tshark -z expert",
    os: "tshark",
    category: "Réseau",
    description: "Affiche les avertissements et erreurs détectés par le système expert de Wireshark (anomalies réseau).",
    syntax: "tshark -r <fichier> -q -z expert",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z expert", desc: "Résume les problèmes détectés (retransmissions, erreurs...)" },
      { cmd: "tshark -r capture.pcap -q -z expert,warn", desc: "Ne montre que les avertissements, pas les infos mineures" }
    ],
    flags: ["-z expert"]
  },
  {
    name: "tshark --export-objects",
    os: "tshark",
    category: "Fichiers",
    description: "Extrait les fichiers transférés via HTTP/SMB/FTP capturés dans le trafic réseau.",
    syntax: "tshark -r <fichier> --export-objects http,<dossier>",
    examples: [
      { cmd: "tshark -r capture.pcap --export-objects http,./extraits", desc: "Extrait tous les fichiers téléchargés en HTTP" },
      { cmd: "tshark -r capture.pcap --export-objects smb,./extraits-smb", desc: "Extrait les fichiers transférés via SMB plutôt que HTTP" }
    ],
    flags: ["--export-objects <protocole>,<dossier>"]
  },
  {
    name: "tshark -p",
    os: "tshark",
    category: "Réseau",
    description: "Désactive le mode promiscuité, ne capture que le trafic destiné directement à la machine.",
    syntax: "tshark -i <interface> -p",
    examples: [
      { cmd: "tshark -i eth0 -p", desc: "Capture uniquement le trafic propre à la machine" },
      { cmd: "tshark -i eth0 -p -w capture-locale.pcap", desc: "Combine avec l'écriture dans un fichier pour ne garder que le trafic propre à la machine" }
    ],
    flags: ["-p"]
  },
  {
    name: "tshark -z dns,tree",
    os: "tshark",
    category: "Réseau",
    description: "Affiche des statistiques sur les requêtes DNS capturées (types de requêtes, taux de réponse).",
    syntax: "tshark -r <fichier> -q -z dns,tree",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z dns,tree", desc: "Répartition des requêtes DNS observées" },
      { cmd: "tshark -r capture.pcap -q -z dns,tree -Y 'dns.flags.rcode != 0'", desc: "Ne garde que les requêtes DNS en erreur" }
    ],
    flags: ["-z dns,tree"]
  },
  {
    name: "tshark -z endpoints,ip",
    os: "tshark",
    category: "Réseau",
    description: "Liste tous les hôtes IP distincts observés dans la capture avec leurs statistiques de trafic.",
    syntax: "tshark -r <fichier> -q -z endpoints,ip",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z endpoints,ip", desc: "Inventaire de tous les hôtes IP présents dans la capture" },
      { cmd: "tshark -r capture.pcap -q -z endpoints,ip -Y 'ip.addr==10.0.0.0/8'", desc: "Limite l'inventaire à une plage d'adresses privées" }
    ],
    flags: ["-z endpoints,ip", "-z endpoints,tcp"]
  },
  {
    name: "tshark -z io,phs",
    os: "tshark",
    category: "Réseau",
    description: "Affiche la hiérarchie des protocoles détectés dans la capture avec leur répartition en bytes.",
    syntax: "tshark -r <fichier> -q -z io,phs",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z io,phs", desc: "Vue en arbre des protocoles utilisés et leur proportion" },
      { cmd: "tshark -r capture.pcap -q -z io,phs -Y 'ip.src==192.168.1.10'", desc: "Hiérarchie des protocoles limitée au trafic d'une seule source" }
    ],
    flags: ["-z io,phs"]
  },
  {
    name: "tshark --color",
    os: "tshark",
    category: "Réseau",
    description: "Active la colorisation des paquets dans le terminal selon le protocole (comme dans l'interface Wireshark).",
    syntax: "tshark -r <fichier> --color",
    examples: [
      { cmd: "tshark -r capture.pcap --color", desc: "Affiche les paquets avec les couleurs du thème Wireshark" },
      { cmd: "tshark -i eth0 --color -Y http", desc: "Combine la colorisation avec un filtre en direct" }
    ],
    flags: ["--color"]
  },
  {
    name: "tshark -b filesize",
    os: "tshark",
    category: "Fichiers",
    description: "Active la rotation de fichier de capture automatique lorsqu'une taille est atteinte (ring buffer).",
    syntax: "tshark -i <interface> -b filesize:<Ko> -b files:<n> -w <fichier.pcap>",
    examples: [
      { cmd: "tshark -i eth0 -b filesize:10240 -b files:5 -w capture.pcap", desc: "Capture en rotation : 5 fichiers de 10 Mo max" },
      { cmd: "tshark -i eth0 -b duration:3600 -w capture.pcap", desc: "Rotation basée sur la durée (1h) plutôt que la taille du fichier" }
    ],
    flags: ["-b filesize:<Ko>", "-b files:<n>", "-b duration:<s>"]
  },
  {
    name: "tshark -z http_req,tree",
    os: "tshark",
    category: "Réseau",
    description: "Affiche les statistiques des URI demandées via HTTP.",
    syntax: "tshark -r <fichier> -q -z http_req,tree",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z http_req,tree", desc: "Liste les URLs les plus demandées dans la capture" },
      { cmd: "tshark -r capture.pcap -q -z http_req,tree -Y 'ip.dst==10.0.0.5'", desc: "Limite les statistiques d'URI à un serveur précis" }
    ],
    flags: ["-z http_req,tree"]
  },
  {
    name: "tshark -Y ssl.handshake",
    os: "tshark",
    category: "Réseau",
    description: "Filtre les paquets TLS/SSL de handshake pour analyser les négociations de chiffrement.",
    syntax: "tshark -r <fichier> -Y 'ssl.handshake'",
    examples: [
      { cmd: "tshark -r capture.pcap -Y 'ssl.handshake.type == 1'", desc: "Affiche uniquement les Client Hello TLS" },
      { cmd: "tshark -r capture.pcap -Y 'tls.handshake.type == 2'", desc: "Filtre les Server Hello plutôt que les Client Hello" }
    ],
    flags: []
  },
  {
    name: "tshark -Y 'tcp.analysis.flags'",
    os: "tshark",
    category: "Réseau",
    description: "Filtre les anomalies TCP détectées par l'analyse de Wireshark (retransmissions, fins de fenêtre, etc.).",
    syntax: "tshark -r <fichier> -Y 'tcp.analysis.flags'",
    examples: [
      { cmd: "tshark -r capture.pcap -Y 'tcp.analysis.flags' -T fields -e frame.number -e tcp.analysis.flags", desc: "Liste les paquets TCP anormaux" },
      { cmd: "tshark -r capture.pcap -Y 'tcp.analysis.retransmission'", desc: "Cible uniquement les retransmissions plutôt que toutes les anomalies TCP" }
    ],
    flags: []
  },
  {
    name: "tshark -z conv,tcp",
    os: "tshark",
    category: "Réseau",
    description: "Affiche les conversations TCP (paires d'endpoints) avec les octets et paquets échangés dans chaque sens.",
    syntax: "tshark -r <fichier> -q -z conv,tcp",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z conv,tcp", desc: "Liste toutes les sessions TCP et leur volume de données" },
      { cmd: "tshark -r capture.pcap -q -z conv,tcp,ip.addr==192.168.1.10", desc: "Limite les conversations TCP affichées à un hôte précis" }
    ],
    flags: ["-z conv,tcp"]
  },
  {
    name: "tshark -e frame.time",
    os: "tshark",
    category: "Réseau",
    description: "Extrait les horodatages précis de chaque paquet, utile pour corréler des événements réseau et système.",
    syntax: "tshark -r <fichier> -T fields -e frame.time -e ip.src -e ip.dst",
    examples: [
      { cmd: "tshark -r capture.pcap -T fields -e frame.time -e ip.src -e ip.dst", desc: "Extrait timestamp, IP source et destination de chaque paquet" },
      { cmd: "tshark -r capture.pcap -T fields -e frame.time_delta -e ip.src", desc: "Extrait le délai entre paquets plutôt que l'horodatage absolu" }
    ],
    flags: ["-e frame.time"]
  },
  {
    name: "tshark -Y arp",
    os: "tshark",
    category: "Réseau",
    description: "Filtre et affiche uniquement les paquets ARP pour analyser la résolution d'adresses ou détecter un ARP spoofing.",
    syntax: "tshark -r <fichier> -Y 'arp'",
    examples: [
      { cmd: "tshark -r capture.pcap -Y 'arp' -T fields -e arp.src.hw_mac -e arp.src.proto_ipv4", desc: "Extrait les couples MAC/IP des requêtes ARP" },
      { cmd: "tshark -r capture.pcap -Y 'arp.duplicate-address-detected'", desc: "Détecte spécifiquement les conflits d'adresses IP via ARP" }
    ],
    flags: []
  },
  {
    name: "tshark -Y icmp",
    os: "tshark",
    category: "Réseau",
    description: "Filtre les paquets ICMP (ping, erreurs réseau) pour diagnostiquer des problèmes de connectivité.",
    syntax: "tshark -r <fichier> -Y 'icmp'",
    examples: [
      { cmd: "tshark -r capture.pcap -Y 'icmp.type == 8'", desc: "Affiche uniquement les Echo Request (ping)" },
      { cmd: "tshark -r capture.pcap -Y 'icmp.type == 3'", desc: "Affiche les messages 'destination unreachable' plutôt que les ping" }
    ],
    flags: []
  },
  {
    name: "tshark --disable-protocol",
    os: "tshark",
    category: "Système",
    description: "Désactive le décodage d'un protocole précis, utile si un dissecteur cause des faux positifs.",
    syntax: "tshark --disable-protocol <protocole>",
    examples: [
      { cmd: "tshark -r capture.pcap --disable-protocol http2", desc: "Désactive le décodage HTTP/2 pour ce fichier" },
      { cmd: "tshark -r capture.pcap --disable-protocol tls", desc: "Désactive le décodage TLS, utile si un dissecteur plante sur du trafic chiffré" }
    ],
    flags: ["--disable-protocol"]
  },
  {
    name: "tshark -l",
    os: "tshark",
    category: "Réseau",
    description: "Active le vidage immédiat de la sortie standard après chaque paquet, utile pour piper en temps réel.",
    syntax: "tshark -i <interface> -l | grep <motif>",
    examples: [
      { cmd: "tshark -i eth0 -l -Y http | grep 'GET'", desc: "Filtre les requêtes HTTP GET en temps réel" },
      { cmd: "tshark -i eth0 -l -Y 'tcp.flags.syn==1' | tee syn.log", desc: "Journalise en direct chaque nouvelle tentative de connexion TCP" }
    ],
    flags: ["-l (line-buffered)"]
  },
  {
    name: "tshark -z rtp,streams",
    os: "tshark",
    category: "Réseau",
    description: "Analyse les flux RTP (protocole audio/vidéo en temps réel, VoIP) présents dans la capture.",
    syntax: "tshark -r <fichier> -q -z rtp,streams",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z rtp,streams", desc: "Liste les flux VoIP/RTP et leurs statistiques de qualité" },
      { cmd: "tshark -r capture.pcap -q -z rtp,streams,short", desc: "Affichage condensé des flux RTP, plus rapide à lire" }
    ],
    flags: ["-z rtp,streams"]
  },
  {
    name: "tshark -Y 'dns.qry.name'",
    os: "tshark",
    category: "Réseau",
    description: "Extrait les noms de domaines résolus via DNS dans la capture, utile pour auditer les requêtes DNS.",
    syntax: "tshark -r <fichier> -T fields -e dns.qry.name -Y dns",
    examples: [
      { cmd: "tshark -r capture.pcap -T fields -e dns.qry.name -Y 'dns.flags.response == 0' | sort -u", desc: "Liste les domaines demandés sans doublons" },
      { cmd: "tshark -r capture.pcap -T fields -e dns.qry.name -Y 'dns.qry.name contains \"exemple\"'", desc: "Ne garde que les requêtes contenant un mot-clé précis" }
    ],
    flags: []
  },
  {
    name: "tshark -z smb,srt",
    os: "tshark",
    category: "Réseau",
    description: "Analyse les temps de réponse des commandes SMB (partages réseau Windows) pour détecter des lenteurs.",
    syntax: "tshark -r <fichier> -q -z smb,srt",
    examples: [
      { cmd: "tshark -r capture.pcap -q -z smb,srt", desc: "Statistiques de temps de réponse SMB" },
      { cmd: "tshark -r capture.pcap -q -z smb,srt,ip.addr==10.0.0.5", desc: "Limite les stats SMB à un serveur de fichiers précis" }
    ],
    flags: ["-z smb,srt"]
  },
  {
    name: "tshark --read-filter",
    os: "tshark",
    category: "Réseau",
    description: "Alias de -Y, applique un filtre de lecture en post-traitement d'un fichier pcap.",
    syntax: "tshark -r <fichier> --read-filter '<filtre>'",
    examples: [
      { cmd: "tshark -r capture.pcap --read-filter 'ip.src == 192.168.1.10'", desc: "Lit et filtre le fichier comme -Y" },
      { cmd: "tshark -r capture.pcap --read-filter 'ip.src == 192.168.1.10' -T fields -e frame.number", desc: "Combine avec l'extraction de champs pour ne remonter que les numéros de paquets" }
    ],
    flags: ["--read-filter"]
  },
  {
    name: "tshark -z compare",
    os: "tshark",
    category: "Réseau",
    description: "Compare deux captures pcap pour détecter les paquets différents entre deux runs.",
    syntax: "tshark -z compare",
    examples: [
      { cmd: "tshark -r a.pcap -q -z compare,r,b.pcap", desc: "Compare les paquets de deux fichiers de capture" },
      { cmd: "tshark -r a.pcap -q -z compare,c,b.pcap", desc: "Compare en affichant le contenu détaillé des différences, pas juste leur nombre" }
    ],
    flags: ["-z compare"]
  },
  {
    name: "tshark -Y 'http.response.code >= 400'",
    os: "tshark",
    category: "Réseau",
    description: "Filtre les réponses HTTP d'erreur (4xx/5xx) pour identifier rapidement les problèmes côté serveur.",
    syntax: "tshark -r <fichier> -Y 'http.response.code >= 400'",
    examples: [
      { cmd: "tshark -r capture.pcap -Y 'http.response.code >= 400' -T fields -e http.response.code -e http.request.uri", desc: "Liste les erreurs HTTP avec leur URL" },
      { cmd: "tshark -r capture.pcap -Y 'http.response.code == 500'", desc: "Cible précisément les erreurs serveur 500, pas toute la plage 4xx/5xx" }
    ],
    flags: []
  },
  {
    name: "tshark -E header=y",
    os: "tshark",
    category: "Fichiers",
    description: "Ajoute une ligne d'en-tête CSV avec les noms de colonnes lors de l'extraction de champs.",
    syntax: "tshark -r <fichier> -T fields -e ip.src -E header=y -E separator=,",
    examples: [
      { cmd: "tshark -r capture.pcap -T fields -e ip.src -e ip.dst -E header=y -E separator=, > export.csv", desc: "Exporte en CSV avec en-têtes" },
      { cmd: "tshark -r capture.pcap -T fields -e frame.time -e ip.src -e ip.dst -E header=y -E quote=d > export.csv", desc: "Ajoute des guillemets doubles autour de chaque valeur du CSV" }
    ],
    flags: ["-E header=y", "-E separator=,", "-E quote=d"]
  },

  // ── HELM ──────────────────────────────────────────────────
  {
    name: "helm install",
    os: "helm",
    category: "Conteneurs",
    description: "Déploie un chart Helm (paquet d'applications Kubernetes) sous un nom de release donné.",
    syntax: "helm install <release> <chart>",
    examples: [
      { cmd: "helm install mon-app bitnami/nginx", desc: "Déploie le chart nginx depuis le repo bitnami" },
      { cmd: "helm install mon-app ./mon-chart -f values-prod.yaml", desc: "Déploie un chart local avec des valeurs personnalisées" }
    ],
    flags: ["-f (fichier de valeurs)", "--namespace", "--set <clé>=<valeur>"]
  },
  {
    name: "helm upgrade",
    os: "helm",
    category: "Conteneurs",
    description: "Met à jour une release existante avec une nouvelle version du chart ou de nouvelles valeurs.",
    syntax: "helm upgrade <release> <chart>",
    examples: [
      { cmd: "helm upgrade mon-app bitnami/nginx --set replicaCount=3", desc: "Met à jour et change une valeur" },
      { cmd: "helm upgrade --install mon-app ./chart", desc: "Installe si la release n'existe pas encore, sinon met à jour" }
    ],
    flags: ["--install (install si absent)", "--set", "-f"]
  },
  {
    name: "helm uninstall",
    os: "helm",
    category: "Conteneurs",
    description: "Désinstalle une release Helm et supprime toutes les ressources Kubernetes associées.",
    syntax: "helm uninstall <release>",
    examples: [
      { cmd: "helm uninstall mon-app", desc: "Désinstalle la release et ses ressources" },
      { cmd: "helm uninstall mon-app --keep-history", desc: "Garde l'historique pour un éventuel rollback" }
    ],
    flags: ["--keep-history"]
  },
  {
    name: "helm list",
    os: "helm",
    category: "Conteneurs",
    description: "Liste les releases Helm actuellement déployées sur le cluster.",
    syntax: "helm list [-A]",
    examples: [
      { cmd: "helm list", desc: "Liste les releases du namespace courant" },
      { cmd: "helm list -A", desc: "Liste les releases de tous les namespaces" }
    ],
    flags: ["-A (tous les namespaces)", "-n (namespace précis)"]
  },
  {
    name: "helm repo add / update",
    os: "helm",
    category: "Paquets",
    description: "Ajoute un dépôt de charts Helm et met à jour la liste des charts disponibles.",
    syntax: "helm repo add <nom> <url> ; helm repo update",
    examples: [
      { cmd: "helm repo add bitnami https://charts.bitnami.com/bitnami", desc: "Ajoute le repo bitnami" },
      { cmd: "helm repo update", desc: "Rafraîchit la liste des charts disponibles" }
    ],
    flags: ["add", "update", "list", "remove"]
  },
  {
    name: "helm search repo",
    os: "helm",
    category: "Paquets",
    description: "Recherche un chart par nom dans les dépôts configurés localement.",
    syntax: "helm search repo <motif>",
    examples: [
      { cmd: "helm search repo nginx", desc: "Cherche les charts nginx disponibles" },
      { cmd: "helm search hub wordpress", desc: "Cherche sur Artifact Hub (tous les repos publics)" }
    ],
    flags: ["repo (local)", "hub (Artifact Hub)"]
  },
  {
    name: "helm show values",
    os: "helm",
    category: "Système",
    description: "Affiche toutes les valeurs configurables (values.yaml) d'un chart avant de l'installer.",
    syntax: "helm show values <chart>",
    examples: [
      { cmd: "helm show values bitnami/nginx", desc: "Affiche les valeurs par défaut du chart" },
      { cmd: "helm show chart bitnami/nginx", desc: "Affiche les métadonnées du chart (version, description)" }
    ],
    flags: ["values", "chart", "readme", "all"]
  },
  {
    name: "helm template",
    os: "helm",
    category: "Système",
    description: "Génère les manifests YAML Kubernetes finaux d'un chart sans rien déployer (dry-run local).",
    syntax: "helm template <release> <chart>",
    examples: [
      { cmd: "helm template mon-app ./chart -f values-prod.yaml", desc: "Génère le YAML final pour vérification" },
      { cmd: "helm template mon-app ./chart | kubectl apply --dry-run=client -f -", desc: "Génère le YAML puis le valide côté serveur sans rien appliquer" }
    ],
    flags: ["-f", "--set", "--debug"]
  },
  {
    name: "helm rollback",
    os: "helm",
    category: "Conteneurs",
    description: "Revient à une révision antérieure d'une release Helm.",
    syntax: "helm rollback <release> <révision>",
    examples: [
      { cmd: "helm rollback mon-app 2", desc: "Revient à la révision n°2" },
      { cmd: "helm history mon-app", desc: "Liste l'historique des révisions disponibles" }
    ],
    flags: []
  },
  {
    name: "helm status",
    os: "helm",
    category: "Conteneurs",
    description: "Affiche l'état actuel d'une release Helm déployée.",
    syntax: "helm status <release>",
    examples: [
      { cmd: "helm status mon-app", desc: "État et notes de déploiement de la release" },
      { cmd: "helm status mon-app --show-desc", desc: "Ajoute la description du chart à l'état affiché" }
    ],
    flags: ["--revision <n>"]
  },
  {
    name: "helm lint",
    os: "helm",
    category: "Système",
    description: "Vérifie qu'un chart local est correctement structuré et ne contient pas d'erreurs.",
    syntax: "helm lint <chemin_chart>",
    examples: [
      { cmd: "helm lint ./mon-chart", desc: "Valide la structure du chart avant publication" },
      { cmd: "helm lint ./mon-chart --strict", desc: "Fait échouer le lint sur les simples avertissements, pas juste les erreurs" }
    ],
    flags: []
  },
  {
    name: "helm package",
    os: "helm",
    category: "Archives",
    description: "Empaquette un chart local en archive .tgz distribuable.",
    syntax: "helm package <chemin_chart>",
    examples: [
      { cmd: "helm package ./mon-chart", desc: "Crée mon-chart-1.0.0.tgz" },
      { cmd: "helm package ./mon-chart -d ./dist", desc: "Place l'archive dans un dossier précis" }
    ],
    flags: ["-d (dossier de destination)"]
  },
  {
    name: "helm create",
    os: "helm",
    category: "Système",
    description: "Génère la structure de dossiers standard pour créer un nouveau chart Helm.",
    syntax: "helm create <nom_chart>",
    examples: [
      { cmd: "helm create mon-app", desc: "Crée l'arborescence (Chart.yaml, values.yaml, templates/)" },
      { cmd: "helm create mon-app --starter mon-modele", desc: "Part d'un chart modèle personnalisé plutôt que du gabarit par défaut" }
    ],
    flags: []
  },
  {
    name: "helm history",
    os: "helm",
    category: "Conteneurs",
    description: "Affiche l'historique des révisions d'une release, nécessaire avant un rollback.",
    syntax: "helm history <release>",
    examples: [
      { cmd: "helm history mon-app", desc: "Liste les révisions avec leur statut" },
      { cmd: "helm history mon-app --max 5", desc: "Limite l'affichage aux 5 dernières révisions" }
    ],
    flags: ["--max (limiter le nombre de révisions affichées)"]
  },
  {
    name: "helm get values",
    os: "helm",
    category: "Conteneurs",
    description: "Affiche les valeurs effectivement utilisées par une release déjà déployée.",
    syntax: "helm get values <release>",
    examples: [
      { cmd: "helm get values mon-app", desc: "Affiche les valeurs personnalisées appliquées" },
      { cmd: "helm get values mon-app --all", desc: "Affiche aussi les valeurs par défaut du chart" }
    ],
    flags: ["--all", "-o yaml|json"]
  },
  {
    name: "helm get manifest",
    os: "helm",
    category: "Conteneurs",
    description: "Affiche les manifests Kubernetes réellement déployés par une release.",
    syntax: "helm get manifest <release>",
    examples: [
      { cmd: "helm get manifest mon-app", desc: "Montre le YAML final appliqué au cluster" },
      { cmd: "helm get manifest mon-app | grep -A5 kind:", desc: "Filtre pour ne voir que le type de chaque ressource déployée" }
    ],
    flags: []
  },
  {
    name: "helm dependency update",
    os: "helm",
    category: "Paquets",
    description: "Télécharge les sous-charts (dépendances) déclarés dans Chart.yaml.",
    syntax: "helm dependency update <chemin_chart>",
    examples: [
      { cmd: "helm dependency update ./mon-chart", desc: "Télécharge les dépendances dans charts/" },
      { cmd: "helm dependency list ./mon-chart", desc: "Liste les dépendances déclarées" }
    ],
    flags: ["update", "list", "build"]
  },
  {
    name: "helm diff upgrade",
    os: "helm",
    category: "Système",
    description: "Affiche les différences qu'un upgrade appliquerait, sans rien modifier (nécessite le plugin helm-diff).",
    syntax: "helm diff upgrade <release> <chart>",
    examples: [
      { cmd: "helm diff upgrade mon-app ./chart", desc: "Montre les changements avant un vrai upgrade" },
      { cmd: "helm diff upgrade mon-app ./chart --set replicas=5", desc: "Prévisualise l'impact d'un changement précis avant de l'appliquer" }
    ],
    flags: []
  },
  {
    name: "helm test",
    os: "helm",
    category: "Système",
    description: "Exécute les tests définis dans un chart pour vérifier qu'une release fonctionne correctement.",
    syntax: "helm test <release>",
    examples: [
      { cmd: "helm test mon-app", desc: "Lance les hooks de test du chart" },
      { cmd: "helm test mon-app --logs", desc: "Affiche aussi les logs des pods de test, pas juste le résultat" }
    ],
    flags: ["--logs (affiche les logs des tests)"]
  },
  {
    name: "helm pull",
    os: "helm",
    category: "Paquets",
    description: "Télécharge un chart depuis un repo sans l'installer, utile pour l'inspecter ou le modifier.",
    syntax: "helm pull <chart> [--untar]",
    examples: [
      { cmd: "helm pull bitnami/nginx --untar", desc: "Télécharge et extrait le chart localement" },
      { cmd: "helm pull bitnami/nginx --version 15.0.0 --untar", desc: "Télécharge une version précise plutôt que la dernière" }
    ],
    flags: ["--untar", "--version"]
  },
  {
    name: "helm env",
    os: "helm",
    category: "Système",
    description: "Affiche les variables d'environnement et chemins de configuration utilisés par Helm.",
    syntax: "helm env",
    examples: [
      { cmd: "helm env", desc: "Affiche HELM_CACHE_HOME, HELM_CONFIG_HOME, etc." },
      { cmd: "HELM_NAMESPACE=$(helm env | grep NAMESPACE)", desc: "Récupère une variable précise pour un script" }
    ],
    flags: []
  },
  {
    name: "helm plugin install",
    os: "helm",
    category: "Paquets",
    description: "Installe un plugin Helm tiers pour étendre ses fonctionnalités (ex: helm-diff, helm-secrets).",
    syntax: "helm plugin install <url>",
    examples: [
      { cmd: "helm plugin install https://github.com/databus23/helm-diff", desc: "Installe le plugin helm-diff" },
      { cmd: "helm plugin list", desc: "Liste les plugins installés" }
    ],
    flags: ["install", "list", "uninstall"]
  },
  {
    name: "helm upgrade --atomic",
    os: "helm",
    category: "Conteneurs",
    description: "Effectue un upgrade et revient automatiquement en arrière si le déploiement échoue.",
    syntax: "helm upgrade --atomic <release> <chart>",
    examples: [
      { cmd: "helm upgrade --atomic --timeout 5m mon-app ./chart", desc: "Upgrade avec rollback automatique en cas d'échec" },
      { cmd: "helm upgrade --atomic --cleanup-on-fail mon-app ./chart", desc: "Supprime aussi les ressources déjà créées en cas d'échec" }
    ],
    flags: ["--atomic", "--timeout"]
  },
  {
    name: "helm upgrade --wait",
    os: "helm",
    category: "Conteneurs",
    description: "Attend que toutes les ressources déployées soient prêtes avant de déclarer le succès.",
    syntax: "helm upgrade --wait <release> <chart>",
    examples: [
      { cmd: "helm upgrade --wait --timeout 10m mon-app ./chart", desc: "Attend que les pods soient en état Running" },
      { cmd: "helm upgrade --wait --wait-for-jobs mon-app ./chart", desc: "Attend en plus que les Jobs associés se terminent" }
    ],
    flags: ["--wait", "--timeout"]
  },
  {
    name: "helm get hooks",
    os: "helm",
    category: "Conteneurs",
    description: "Affiche les hooks (pre-install, post-upgrade...) définis dans un chart déployé.",
    syntax: "helm get hooks <release>",
    examples: [
      { cmd: "helm get hooks mon-app", desc: "Liste les hooks associés à la release" },
      { cmd: "helm get hooks mon-app | grep helm.sh/hook", desc: "Filtre pour ne voir que le type de chaque hook" }
    ],
    flags: []
  },
  {
    name: "helm repo list",
    os: "helm",
    category: "Paquets",
    description: "Liste tous les dépôts de charts configurés localement.",
    syntax: "helm repo list",
    examples: [
      { cmd: "helm repo list", desc: "Affiche les repos ajoutés avec leur URL" },
      { cmd: "helm repo list -o json", desc: "Sortie JSON exploitable par un script" }
    ],
    flags: []
  },
  {
    name: "helm install --dry-run",
    os: "helm",
    category: "Système",
    description: "Simule une installation sans rien déployer, en contactant le cluster pour valider les manifests.",
    syntax: "helm install --dry-run <release> <chart>",
    examples: [
      { cmd: "helm install --dry-run test-release ./chart", desc: "Simule en validant la config contre le cluster" },
      { cmd: "helm install --dry-run --debug test-release ./chart", desc: "Ajoute les logs de debug détaillés du rendu" }
    ],
    flags: ["--dry-run", "--debug"]
  },
  {
    name: "helm upgrade --set-string",
    os: "helm",
    category: "Conteneurs",
    description: "Force une valeur à être traitée comme une chaîne même si elle ressemble à un nombre ou booléen.",
    syntax: "helm upgrade --set-string <clé>=<valeur> <release> <chart>",
    examples: [
      { cmd: "helm upgrade --set-string tag='1.0' mon-app ./chart", desc: "Force le tag à être une string, pas un nombre" },
      { cmd: "helm install mon-app ./chart --set-string version='1.2'", desc: "Fonctionne aussi dès l'installation initiale, pas seulement à l'upgrade" }
    ],
    flags: ["--set-string"]
  },
  {
    name: "helm show chart",
    os: "helm",
    category: "Système",
    description: "Affiche les métadonnées d'un chart (nom, version, description, dépendances).",
    syntax: "helm show chart <chart>",
    examples: [
      { cmd: "helm show chart bitnami/postgresql", desc: "Affiche Chart.yaml du chart postgresql" },
      { cmd: "helm show values bitnami/postgresql", desc: "La même commande avec 'values' affiche la config par défaut plutôt que les métadonnées" }
    ],
    flags: ["chart", "values", "readme", "all"]
  },
  {
    name: "helm search hub",
    os: "helm",
    category: "Paquets",
    description: "Recherche un chart sur Artifact Hub (répertoire central de tous les charts publics Helm).",
    syntax: "helm search hub <motif>",
    examples: [
      { cmd: "helm search hub wordpress", desc: "Cherche tous les charts wordpress disponibles publiquement" },
      { cmd: "helm search hub wordpress --max-col-width 80", desc: "Élargit l'affichage pour lire les descriptions complètes" }
    ],
    flags: ["--max-col-width"]
  },
  {
    name: "helm install --generate-name",
    os: "helm",
    category: "Conteneurs",
    description: "Génère automatiquement un nom de release unique, sans avoir à le spécifier manuellement.",
    syntax: "helm install --generate-name <chart>",
    examples: [
      { cmd: "helm install --generate-name bitnami/nginx", desc: "Crée nginx-1718000000 ou similaire automatiquement" },
      { cmd: "helm install --generate-name --dry-run bitnami/nginx", desc: "Prévisualise le nom généré sans installer pour de vrai" }
    ],
    flags: ["--generate-name"]
  },
  {
    name: "helm upgrade --reuse-values",
    os: "helm",
    category: "Conteneurs",
    description: "Réutilise les valeurs de la release précédente lors d'un upgrade, en ne précisant que les valeurs à changer.",
    syntax: "helm upgrade --reuse-values <release> <chart>",
    examples: [
      { cmd: "helm upgrade --reuse-values --set image.tag=2.0 mon-app ./chart", desc: "Met à jour uniquement le tag d'image" },
      { cmd: "helm upgrade --reset-then-reuse-values mon-app ./chart", desc: "Repart des valeurs par défaut du chart puis réapplique celles déjà personnalisées" }
    ],
    flags: ["--reuse-values", "--reset-values"]
  },
  {
    name: "helm verify",
    os: "helm",
    category: "Permissions",
    description: "Vérifie la signature cryptographique d'un chart téléchargé pour s'assurer de son intégrité.",
    syntax: "helm verify <chart.tgz>",
    examples: [
      { cmd: "helm verify mon-chart-1.0.0.tgz", desc: "Vérifie la signature du fichier .tgz" },
      { cmd: "helm install mon-app ./mon-chart-1.0.0.tgz --verify", desc: "Vérifie la signature automatiquement au moment de l'installation" }
    ],
    flags: ["--keyring"]
  },
  {
    name: "helm registry login",
    os: "helm",
    category: "Permissions",
    description: "Authentifie Helm auprès d'un registry OCI (comme ECR ou Docker Hub) pour push/pull de charts.",
    syntax: "helm registry login <registry>",
    examples: [
      { cmd: "helm registry login registry.example.com", desc: "Authentifie vers un registry OCI" },
      { cmd: "helm push mon-chart-1.0.0.tgz oci://registry.example.com/charts", desc: "Publie le chart vers un registry OCI" }
    ],
    flags: ["login", "logout"]
  },
  {
    name: "helm install --namespace --create-namespace",
    os: "helm",
    category: "Conteneurs",
    description: "Déploie dans un namespace spécifique et le crée s'il n'existe pas encore.",
    syntax: "helm install <release> <chart> --namespace <ns> --create-namespace",
    examples: [
      { cmd: "helm install mon-app ./chart --namespace monitoring --create-namespace", desc: "Crée le namespace monitoring si besoin puis déploie" },
      { cmd: "helm upgrade --install mon-app ./chart --namespace monitoring --create-namespace", desc: "Installe si absent, met à jour sinon — idempotent" }
    ],
    flags: ["--namespace", "--create-namespace"]
  },
  {
    name: "helm get notes",
    os: "helm",
    category: "Conteneurs",
    description: "Affiche les notes post-installation définies dans le chart, contenant souvent les instructions de connexion.",
    syntax: "helm get notes <release>",
    examples: [
      { cmd: "helm get notes mon-app", desc: "Affiche les instructions post-déploiement du chart" },
      { cmd: "helm install mon-app ./chart --no-hooks", desc: "À l'inverse, désactive tous les hooks (dont l'affichage des notes) lors de l'installation" }
    ],
    flags: []
  },
  {
    name: "helm uninstall --keep-history",
    os: "helm",
    category: "Conteneurs",
    description: "Désinstalle la release mais conserve son historique pour permettre un rollback ultérieur.",
    syntax: "helm uninstall <release> --keep-history",
    examples: [
      { cmd: "helm uninstall mon-app --keep-history", desc: "Supprime les ressources mais garde l'historique dans Helm" },
      { cmd: "helm rollback mon-app 1", desc: "Une fois l'historique conservé, un rollback vers une ancienne révision reste possible" }
    ],
    flags: ["--keep-history"]
  },
  {
    name: "helm dependency build",
    os: "helm",
    category: "Paquets",
    description: "Reconstruit le dossier charts/ depuis Chart.lock plutôt que depuis Chart.yaml.",
    syntax: "helm dependency build <chemin_chart>",
    examples: [
      { cmd: "helm dependency build ./mon-chart", desc: "Reconstruit depuis le fichier lock pour reproductibilité" },
      { cmd: "helm dependency update ./mon-chart", desc: "Recalcule aussi Chart.lock depuis Chart.yaml, contrairement à build qui se fie au lock existant" }
    ],
    flags: []
  },
  {
    name: "helm chart save / export",
    os: "helm",
    category: "Archives",
    description: "Sauvegarde un chart local dans le cache OCI Helm ou l'exporte vers un dossier.",
    syntax: "helm chart save <chemin> <registry>/<chart>:<tag>",
    examples: [
      { cmd: "helm chart save ./mon-chart registry.example.com/charts/mon-chart:1.0", desc: "Sauvegarde dans le cache OCI local" },
      { cmd: "helm chart export registry.example.com/charts/mon-chart:1.0 -d ./exported", desc: "Exporte depuis le cache OCI vers un dossier local" }
    ],
    flags: []
  },
  {
    name: "helm install --timeout",
    os: "helm",
    category: "Conteneurs",
    description: "Définit le délai maximum d'attente pour que les ressources soient prêtes lors d'un install/upgrade.",
    syntax: "helm install <release> <chart> --timeout <durée>",
    examples: [
      { cmd: "helm install mon-app ./chart --timeout 10m0s", desc: "Attend 10 minutes avant de déclarer un échec" },
      { cmd: "helm upgrade mon-app ./chart --timeout 2m0s", desc: "Un timeout plus court, utile pour échouer vite en CI" }
    ],
    flags: ["--timeout"]
  },
  {
    name: "helm list --failed",
    os: "helm",
    category: "Conteneurs",
    description: "Affiche uniquement les releases en état d'échec.",
    syntax: "helm list --failed",
    examples: [
      { cmd: "helm list --failed -A", desc: "Liste toutes les releases en échec sur tous les namespaces" },
      { cmd: "helm list --pending", desc: "Affiche les releases bloquées en cours d'installation/upgrade plutôt qu'en échec" }
    ],
    flags: ["--failed", "--pending", "--deployed"]
  },
  {
    name: "helm install --set-file",
    os: "helm",
    category: "Conteneurs",
    description: "Charge le contenu d'un fichier comme valeur d'une clé (pratique pour injecter des certificats ou configs).",
    syntax: "helm install <release> <chart> --set-file <clé>=<fichier>",
    examples: [
      { cmd: "helm install mon-app ./chart --set-file config.tls=cert.pem", desc: "Injecte le contenu d'un certificat comme valeur" },
      { cmd: "helm upgrade mon-app ./chart --set-file config.tls=nouveau-cert.pem", desc: "Remplace un certificat déjà en place lors d'une mise à jour" }
    ],
    flags: ["--set-file"]
  },

  // ── AWS CLI ───────────────────────────────────────────────
  {
    name: "aws configure",
    os: "awscli",
    category: "Système",
    description: "Configure les identifiants AWS (clé d'accès, région) utilisés par défaut par la CLI.",
    syntax: "aws configure [--profile <nom>]",
    examples: [
      { cmd: "aws configure", desc: "Configure le profil par défaut de manière interactive" },
      { cmd: "aws configure --profile prod", desc: "Configure un profil nommé pour un autre compte" }
    ],
    flags: ["--profile"]
  },
  {
    name: "aws sts get-caller-identity",
    os: "awscli",
    category: "Utilisateurs",
    description: "Affiche l'identité IAM actuellement utilisée par la CLI (utile pour vérifier la config).",
    syntax: "aws sts get-caller-identity",
    examples: [
      { cmd: "aws sts get-caller-identity", desc: "Affiche le compte, l'ARN et l'utilisateur courants" },
      { cmd: "aws sts get-caller-identity --profile prod", desc: "Vérifie l'identité utilisée par un profil précis avant toute action risquée" }
    ],
    flags: []
  },
  {
    name: "aws s3 ls / cp",
    os: "awscli",
    category: "Fichiers",
    description: "Liste le contenu d'un bucket S3 ou copie des fichiers vers/depuis S3.",
    syntax: "aws s3 ls s3://<bucket> ; aws s3 cp <source> <destination>",
    examples: [
      { cmd: "aws s3 ls s3://mon-bucket/", desc: "Liste le contenu d'un bucket" },
      { cmd: "aws s3 cp fichier.txt s3://mon-bucket/", desc: "Upload un fichier vers S3" },
      { cmd: "aws s3 sync ./dossier s3://mon-bucket/dossier", desc: "Synchronise un dossier complet" }
    ],
    flags: ["ls", "cp", "sync", "rm", "--recursive"]
  },
  {
    name: "aws ec2 describe-instances",
    os: "awscli",
    category: "Système",
    description: "Liste les instances EC2 et leurs détails (état, IP, type).",
    syntax: "aws ec2 describe-instances [--filters <filtre>]",
    examples: [
      { cmd: "aws ec2 describe-instances", desc: "Liste toutes les instances EC2" },
      { cmd: "aws ec2 describe-instances --filters \"Name=instance-state-name,Values=running\"", desc: "Filtre uniquement les instances actives" }
    ],
    flags: ["--filters", "--instance-ids"]
  },
  {
    name: "aws ec2 start-instances / stop-instances",
    os: "awscli",
    category: "Système",
    description: "Démarre ou arrête une instance EC2 par son identifiant.",
    syntax: "aws ec2 start-instances --instance-ids <id>",
    examples: [
      { cmd: "aws ec2 start-instances --instance-ids i-0abc123def", desc: "Démarre une instance" },
      { cmd: "aws ec2 stop-instances --instance-ids i-0abc123def", desc: "Arrête une instance" }
    ],
    flags: ["--instance-ids"]
  },
  {
    name: "aws iam list-users",
    os: "awscli",
    category: "Utilisateurs",
    description: "Liste les utilisateurs IAM du compte AWS.",
    syntax: "aws iam list-users",
    examples: [
      { cmd: "aws iam list-users", desc: "Liste tous les utilisateurs IAM" },
      { cmd: "aws iam list-attached-user-policies --user-name tom", desc: "Liste les politiques attachées à un utilisateur" }
    ],
    flags: []
  },
  {
    name: "aws ec2 describe-security-groups",
    os: "awscli",
    category: "Réseau",
    description: "Affiche les règles des groupes de sécurité (pare-feu virtuel des instances EC2).",
    syntax: "aws ec2 describe-security-groups [--group-ids <id>]",
    examples: [
      { cmd: "aws ec2 describe-security-groups", desc: "Liste tous les groupes de sécurité" },
      { cmd: "aws ec2 authorize-security-group-ingress --group-id sg-123 --protocol tcp --port 22 --cidr 0.0.0.0/0", desc: "Ouvre le port 22" }
    ],
    flags: ["--group-ids"]
  },
  {
    name: "aws logs tail",
    os: "awscli",
    category: "Système",
    description: "Suit en temps réel les logs CloudWatch d'un groupe de logs donné.",
    syntax: "aws logs tail <groupe_logs> [--follow]",
    examples: [
      { cmd: "aws logs tail /aws/lambda/ma-fonction --follow", desc: "Suit les logs d'une fonction Lambda en direct" },
      { cmd: "aws logs tail /aws/lambda/ma-fonction --since 1h --filter-pattern ERROR", desc: "Ne montre que les erreurs de la dernière heure" }
    ],
    flags: ["--follow", "--since"]
  },
  {
    name: "aws cloudformation deploy",
    os: "awscli",
    category: "Système",
    description: "Déploie une stack d'infrastructure définie dans un template CloudFormation.",
    syntax: "aws cloudformation deploy --template-file <fichier> --stack-name <nom>",
    examples: [
      { cmd: "aws cloudformation deploy --template-file infra.yaml --stack-name mon-app", desc: "Déploie ou met à jour la stack" },
      { cmd: "aws cloudformation deploy --template-file infra.yaml --stack-name mon-app --capabilities CAPABILITY_IAM", desc: "Nécessaire quand le template crée des rôles/permissions IAM" }
    ],
    flags: ["--template-file", "--stack-name", "--parameter-overrides"]
  },
  {
    name: "aws ecr get-login-password",
    os: "awscli",
    category: "Conteneurs",
    description: "Récupère un token d'authentification pour connecter Docker à un registry ECR privé.",
    syntax: "aws ecr get-login-password | docker login --username AWS --password-stdin <registry>",
    examples: [
      { cmd: "aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 123456789.dkr.ecr.eu-west-3.amazonaws.com", desc: "Connecte Docker à ECR" },
      { cmd: "aws ecr get-login-password --region eu-west-3", desc: "Sans le pipe vers docker login : affiche juste le token brut" }
    ],
    flags: ["--region"]
  },
  {
    name: "aws lambda invoke",
    os: "awscli",
    category: "Système",
    description: "Exécute une fonction Lambda manuellement depuis la CLI, utile pour tester.",
    syntax: "aws lambda invoke --function-name <nom> <fichier_sortie>",
    examples: [
      { cmd: "aws lambda invoke --function-name ma-fonction sortie.json", desc: "Invoque la fonction et écrit la réponse dans un fichier" },
      { cmd: "aws lambda invoke --function-name ma-fonction --payload '{\"key\":\"value\"}' --cli-binary-format raw-in-base64-out sortie.json", desc: "Passe un payload JSON personnalisé en entrée" }
    ],
    flags: ["--function-name", "--payload"]
  },
  {
    name: "aws --profile",
    os: "awscli",
    category: "Système",
    description: "Exécute n'importe quelle commande AWS CLI avec un profil/compte spécifique au lieu du défaut.",
    syntax: "aws <commande> --profile <nom>",
    examples: [
      { cmd: "aws s3 ls --profile prod", desc: "Liste les buckets du compte prod" },
      { cmd: "export AWS_PROFILE=prod", desc: "Définit le profil par défaut pour la session shell" }
    ],
    flags: ["--profile"]
  },
  {
    name: "aws ec2 run-instances",
    os: "awscli",
    category: "Système",
    description: "Crée et lance une nouvelle instance EC2 avec ses paramètres (AMI, type, clé SSH...).",
    syntax: "aws ec2 run-instances --image-id <ami> --instance-type <type> --key-name <clé>",
    examples: [
      { cmd: "aws ec2 run-instances --image-id ami-0abcd1234 --instance-type t3.micro --key-name ma-cle", desc: "Lance une instance basique" },
      { cmd: "aws ec2 run-instances --image-id ami-0abcd1234 --instance-type t3.micro --count 3 --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=web}]'", desc: "Lance 3 instances identiques, taguées d'un coup" }
    ],
    flags: ["--image-id", "--instance-type", "--key-name", "--security-group-ids"]
  },
  {
    name: "aws ec2 terminate-instances",
    os: "awscli",
    category: "Système",
    description: "Termine (détruit définitivement) une ou plusieurs instances EC2.",
    syntax: "aws ec2 terminate-instances --instance-ids <id>",
    examples: [
      { cmd: "aws ec2 terminate-instances --instance-ids i-0abc123def", desc: "Détruit l'instance définitivement" },
      { cmd: "aws ec2 terminate-instances --instance-ids i-0abc123def i-0def456ghi", desc: "Termine plusieurs instances en une seule commande" }
    ],
    flags: ["--instance-ids"]
  },
  {
    name: "aws iam create-user / attach-policy",
    os: "awscli",
    category: "Permissions",
    description: "Crée un utilisateur IAM et lui attache une politique de permissions.",
    syntax: "aws iam create-user --user-name <user> ; aws iam attach-user-policy --user-name <user> --policy-arn <arn>",
    examples: [
      { cmd: "aws iam create-user --user-name tom", desc: "Crée un nouvel utilisateur IAM" },
      { cmd: "aws iam attach-user-policy --user-name tom --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess", desc: "Attache une politique en lecture seule" }
    ],
    flags: ["--policy-arn"]
  },
  {
    name: "aws s3api create-bucket",
    os: "awscli",
    category: "Fichiers",
    description: "Crée un nouveau bucket S3 avec des options avancées (région, ACL, versioning).",
    syntax: "aws s3api create-bucket --bucket <nom> --region <région>",
    examples: [
      { cmd: "aws s3api create-bucket --bucket mon-bucket-unique --region eu-west-3 --create-bucket-configuration LocationConstraint=eu-west-3", desc: "Crée un bucket en région Paris" },
      { cmd: "aws s3 mb s3://mon-bucket-unique --region eu-west-3", desc: "Équivalent simplifié sans les options avancées de s3api" }
    ],
    flags: ["--bucket", "--region", "--create-bucket-configuration"]
  },
  {
    name: "aws rds describe-db-instances",
    os: "awscli",
    category: "Système",
    description: "Liste les instances de base de données RDS et leur état.",
    syntax: "aws rds describe-db-instances",
    examples: [
      { cmd: "aws rds describe-db-instances", desc: "Liste toutes les instances RDS" },
      { cmd: "aws rds create-db-snapshot --db-instance-identifier mydb --db-snapshot-identifier backup1", desc: "Crée un snapshot manuel" }
    ],
    flags: []
  },
  {
    name: "aws cloudwatch get-metric-statistics",
    os: "awscli",
    category: "Système",
    description: "Récupère des métriques de monitoring CloudWatch (CPU, réseau, etc.) sur une période donnée.",
    syntax: "aws cloudwatch get-metric-statistics --namespace <ns> --metric-name <métrique>",
    examples: [
      { cmd: "aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-0abc123def --start-time 2026-06-20T00:00:00Z --end-time 2026-06-20T23:59:59Z --period 3600 --statistics Average", desc: "Récupère l'utilisation CPU horaire" },
      { cmd: "aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --statistics Average --period 300 --start-time 2026-07-01T00:00:00Z --end-time 2026-07-02T00:00:00Z --dimensions Name=InstanceId,Value=i-0abc123def", desc: "Moyenne sur des créneaux de 5 minutes plutôt que le max" }
    ],
    flags: ["--namespace", "--metric-name", "--period", "--statistics"]
  },
  {
    name: "aws route53 list-hosted-zones",
    os: "awscli",
    category: "Réseau",
    description: "Liste les zones DNS gérées par Route 53.",
    syntax: "aws route53 list-hosted-zones",
    examples: [
      { cmd: "aws route53 list-hosted-zones", desc: "Liste les zones DNS du compte" },
      { cmd: "aws route53 list-resource-record-sets --hosted-zone-id Z123456", desc: "Liste les enregistrements d'une zone" }
    ],
    flags: []
  },
  {
    name: "aws ssm start-session",
    os: "awscli",
    category: "Système",
    description: "Ouvre une session shell distante vers une instance EC2 via SSM, sans avoir besoin de SSH/clé exposée.",
    syntax: "aws ssm start-session --target <instance_id>",
    examples: [
      { cmd: "aws ssm start-session --target i-0abc123def", desc: "Ouvre un shell distant sécurisé sans port SSH ouvert" },
      { cmd: "aws ssm start-session --target i-0abc123def --document-name AWS-StartPortForwardingSession --parameters '{\"portNumber\":[\"3389\"],\"localPortNumber\":[\"9999\"]}'", desc: "Redirige un port distant (ex. RDP) vers la machine locale via le tunnel SSM" }
    ],
    flags: ["--target"]
  },
  {
    name: "aws secretsmanager get-secret-value",
    os: "awscli",
    category: "Permissions",
    description: "Récupère la valeur d'un secret stocké dans AWS Secrets Manager.",
    syntax: "aws secretsmanager get-secret-value --secret-id <nom>",
    examples: [
      { cmd: "aws secretsmanager get-secret-value --secret-id prod/db/password", desc: "Récupère un mot de passe stocké de façon sécurisée" },
      { cmd: "aws secretsmanager get-secret-value --secret-id prod/db/password --query SecretString --output text", desc: "N'extrait que la valeur brute du secret, sans le JSON englobant" }
    ],
    flags: ["--secret-id"]
  },
  {
    name: "aws eks update-kubeconfig",
    os: "awscli",
    category: "Conteneurs",
    description: "Configure kubectl pour pointer vers un cluster EKS (Kubernetes managé AWS).",
    syntax: "aws eks update-kubeconfig --name <cluster> --region <région>",
    examples: [
      { cmd: "aws eks update-kubeconfig --name cluster-prod --region eu-west-3", desc: "Configure kubectl pour ce cluster EKS" },
      { cmd: "aws eks update-kubeconfig --name cluster-prod --region eu-west-3 --alias prod", desc: "Nomme le contexte kubectl généré, pratique avec plusieurs clusters" }
    ],
    flags: ["--name", "--region"]
  },
  {
    name: "aws ec2 describe-vpcs",
    os: "awscli",
    category: "Réseau",
    description: "Liste les VPC (réseaux virtuels privés) du compte avec leurs configurations.",
    syntax: "aws ec2 describe-vpcs",
    examples: [
      { cmd: "aws ec2 describe-vpcs", desc: "Liste tous les VPC du compte" },
      { cmd: "aws ec2 create-vpc --cidr-block 10.0.0.0/16", desc: "Crée un nouveau VPC" }
    ],
    flags: ["--filters"]
  },
  {
    name: "aws ec2 describe-subnets",
    os: "awscli",
    category: "Réseau",
    description: "Liste les sous-réseaux (subnets) d'un ou plusieurs VPC.",
    syntax: "aws ec2 describe-subnets [--filters <filtre>]",
    examples: [
      { cmd: "aws ec2 describe-subnets --filters \"Name=vpc-id,Values=vpc-0abc123\"", desc: "Liste les subnets d'un VPC précis" },
      { cmd: "aws ec2 describe-subnets --query 'Subnets[*].[SubnetId,CidrBlock]' --output table", desc: "Affiche seulement l'ID et le CIDR, sous forme de tableau lisible" }
    ],
    flags: ["--filters"]
  },
  {
    name: "aws s3 mb / rb",
    os: "awscli",
    category: "Fichiers",
    description: "Crée (make bucket) ou supprime (remove bucket) un bucket S3.",
    syntax: "aws s3 mb s3://<nom> | aws s3 rb s3://<nom> --force",
    examples: [
      { cmd: "aws s3 mb s3://mon-bucket-unique", desc: "Crée un bucket S3" },
      { cmd: "aws s3 rb s3://mon-bucket --force", desc: "Supprime le bucket et tout son contenu" }
    ],
    flags: ["mb", "rb", "--force"]
  },
  {
    name: "aws iam create-access-key",
    os: "awscli",
    category: "Permissions",
    description: "Génère une paire de clés d'accès (access key / secret key) pour un utilisateur IAM.",
    syntax: "aws iam create-access-key --user-name <user>",
    examples: [
      { cmd: "aws iam create-access-key --user-name tom", desc: "Crée des credentials programmatiques pour tom" },
      { cmd: "aws iam list-access-keys --user-name tom", desc: "Vérifie les clés déjà existantes avant d'en créer une nouvelle" }
    ],
    flags: ["--user-name"]
  },
  {
    name: "aws ec2 create-key-pair",
    os: "awscli",
    category: "Permissions",
    description: "Génère une paire de clés SSH EC2 et retourne la clé privée.",
    syntax: "aws ec2 create-key-pair --key-name <nom> --query 'KeyMaterial' --output text > clé.pem",
    examples: [
      { cmd: "aws ec2 create-key-pair --key-name ma-cle --query 'KeyMaterial' --output text > ma-cle.pem && chmod 400 ma-cle.pem", desc: "Crée et sauvegarde la clé privée correctement" },
      { cmd: "aws ec2 describe-key-pairs", desc: "Liste les paires de clés déjà existantes avant d'en créer une nouvelle" }
    ],
    flags: ["--key-name"]
  },
  {
    name: "aws ec2 describe-snapshots",
    os: "awscli",
    category: "Archives",
    description: "Liste les snapshots EBS (sauvegardes de volumes de stockage EC2).",
    syntax: "aws ec2 describe-snapshots --owner-ids self",
    examples: [
      { cmd: "aws ec2 describe-snapshots --owner-ids self", desc: "Liste les snapshots du compte courant" },
      { cmd: "aws ec2 create-snapshot --volume-id vol-0abc123", desc: "Crée un snapshot d'un volume" }
    ],
    flags: ["--owner-ids", "--filters"]
  },
  {
    name: "aws elb describe-load-balancers",
    os: "awscli",
    category: "Réseau",
    description: "Liste les load balancers (ALB/NLB/CLB) du compte et leur configuration.",
    syntax: "aws elbv2 describe-load-balancers",
    examples: [
      { cmd: "aws elbv2 describe-load-balancers", desc: "Liste les ALB/NLB du compte" },
      { cmd: "aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:eu-west-3:123456:targetgroup/mon-tg/abc123", desc: "Vérifie l'état de santé des cibles derrière le load balancer" }
    ],
    flags: []
  },
  {
    name: "aws sns publish",
    os: "awscli",
    category: "Services",
    description: "Publie un message sur un topic SNS (notification push, email, SMS...).",
    syntax: "aws sns publish --topic-arn <arn> --message '<message>'",
    examples: [
      { cmd: "aws sns publish --topic-arn arn:aws:sns:eu-west-3:123456:alertes --message 'Déploiement terminé'", desc: "Envoie une notification sur le topic" },
      { cmd: "aws sns publish --topic-arn arn:aws:sns:eu-west-3:123456:alertes --subject 'Alerte prod' --message file://message.txt", desc: "Envoie le contenu d'un fichier comme corps du message, avec un sujet" }
    ],
    flags: ["--topic-arn", "--message", "--subject"]
  },
  {
    name: "aws sqs send-message",
    os: "awscli",
    category: "Services",
    description: "Envoie un message dans une file d'attente SQS.",
    syntax: "aws sqs send-message --queue-url <url> --message-body '<message>'",
    examples: [
      { cmd: "aws sqs send-message --queue-url https://sqs.eu-west-3.amazonaws.com/123/ma-queue --message-body '{\"task\":\"process\"}'", desc: "Envoie un message JSON dans la queue" },
      { cmd: "aws sqs receive-message --queue-url https://sqs.eu-west-3.amazonaws.com/123/ma-queue", desc: "Récupère les messages en attente dans la même file" }
    ],
    flags: ["--queue-url", "--message-body"]
  },
  {
    name: "aws cloudwatch put-metric-alarm",
    os: "awscli",
    category: "Système",
    description: "Crée une alarme CloudWatch qui déclenche une action quand une métrique dépasse un seuil.",
    syntax: "aws cloudwatch put-metric-alarm --alarm-name <nom> --metric-name <métrique>",
    examples: [
      { cmd: "aws cloudwatch put-metric-alarm --alarm-name HighCPU --metric-name CPUUtilization --namespace AWS/EC2 --threshold 80 --comparison-operator GreaterThanThreshold --evaluation-periods 2 --period 300 --statistic Average --alarm-actions <arn_sns>", desc: "Alerte si CPU > 80% pendant 10 min" },
      { cmd: "aws cloudwatch describe-alarms --alarm-names HighCPU", desc: "Vérifie l'état actuel de l'alarme une fois créée (OK/ALARM/INSUFFICIENT_DATA)" }
    ],
    flags: ["--threshold", "--comparison-operator", "--alarm-actions"]
  },
  {
    name: "aws s3api put-bucket-versioning",
    os: "awscli",
    category: "Fichiers",
    description: "Active le versioning S3 sur un bucket pour conserver un historique des modifications.",
    syntax: "aws s3api put-bucket-versioning --bucket <nom> --versioning-configuration Status=Enabled",
    examples: [
      { cmd: "aws s3api put-bucket-versioning --bucket mon-bucket --versioning-configuration Status=Enabled", desc: "Active le versioning pour protéger contre les suppressions accidentelles" },
      { cmd: "aws s3api get-bucket-versioning --bucket mon-bucket", desc: "Vérifie si le versioning est déjà actif avant d'y toucher" }
    ],
    flags: []
  },
  {
    name: "aws ecr create-repository",
    os: "awscli",
    category: "Conteneurs",
    description: "Crée un nouveau dépôt d'images Docker dans Amazon ECR.",
    syntax: "aws ecr create-repository --repository-name <nom>",
    examples: [
      { cmd: "aws ecr create-repository --repository-name mon-app", desc: "Crée un repo ECR pour l'image" },
      { cmd: "aws ecr describe-repositories", desc: "Liste les dépôts déjà existants avant d'en créer un nouveau" }
    ],
    flags: ["--repository-name", "--image-scanning-configuration"]
  },
  {
    name: "aws autoscaling describe-auto-scaling-groups",
    os: "awscli",
    category: "Système",
    description: "Liste les groupes d'auto-scaling EC2 et leur configuration (min/max/current).",
    syntax: "aws autoscaling describe-auto-scaling-groups",
    examples: [
      { cmd: "aws autoscaling describe-auto-scaling-groups", desc: "Liste les groupes et leur capacité" },
      { cmd: "aws autoscaling set-desired-capacity --auto-scaling-group-name mon-asg --desired-capacity 4", desc: "Ajuste manuellement le nombre d'instances souhaité" }
    ],
    flags: []
  },
  {
    name: "aws ec2 allocate-address / associate-address",
    os: "awscli",
    category: "Réseau",
    description: "Alloue une adresse IP élastique (Elastic IP) et l'associe à une instance EC2.",
    syntax: "aws ec2 allocate-address | aws ec2 associate-address --instance-id <id> --allocation-id <id>",
    examples: [
      { cmd: "aws ec2 allocate-address", desc: "Réserve une IP fixe publique" },
      { cmd: "aws ec2 associate-address --instance-id i-0abc123 --allocation-id eipalloc-0abc", desc: "Attache l'IP à une instance" }
    ],
    flags: ["--allocation-id"]
  },
  {
    name: "aws codecommit list-repositories",
    os: "awscli",
    category: "Système",
    description: "Liste les dépôts Git hébergés dans AWS CodeCommit.",
    syntax: "aws codecommit list-repositories",
    examples: [
      { cmd: "aws codecommit list-repositories", desc: "Liste tous les repos CodeCommit du compte" },
      { cmd: "aws codecommit get-repository --repository-name mon-repo", desc: "Détaille un dépôt précis (URL clone, description, date de création)" }
    ],
    flags: []
  },
  {
    name: "aws codepipeline start-pipeline-execution",
    os: "awscli",
    category: "Système",
    description: "Déclenche manuellement l'exécution d'un pipeline CI/CD AWS CodePipeline.",
    syntax: "aws codepipeline start-pipeline-execution --name <pipeline>",
    examples: [
      { cmd: "aws codepipeline start-pipeline-execution --name mon-pipeline", desc: "Lance le pipeline immédiatement" },
      { cmd: "aws codepipeline get-pipeline-state --name mon-pipeline", desc: "Vérifie l'état actuel de chaque étape du pipeline" }
    ],
    flags: ["--name"]
  },
  {
    name: "aws iam list-roles",
    os: "awscli",
    category: "Permissions",
    description: "Liste les rôles IAM du compte, utilisés pour définir des permissions sur les services AWS.",
    syntax: "aws iam list-roles",
    examples: [
      { cmd: "aws iam list-roles", desc: "Liste tous les rôles IAM" },
      { cmd: "aws iam get-role --role-name LambdaExecutionRole", desc: "Détails d'un rôle précis" }
    ],
    flags: []
  },
  {
    name: "aws ecs list-clusters",
    os: "awscli",
    category: "Conteneurs",
    description: "Liste les clusters ECS (Elastic Container Service) du compte.",
    syntax: "aws ecs list-clusters",
    examples: [
      { cmd: "aws ecs list-clusters", desc: "Liste les clusters ECS" },
      { cmd: "aws ecs list-services --cluster mon-cluster", desc: "Liste les services d'un cluster" }
    ],
    flags: []
  },
  {
    name: "aws s3 presign",
    os: "awscli",
    category: "Fichiers",
    description: "Génère une URL présignée temporaire pour partager un objet S3 privé sans credentials.",
    syntax: "aws s3 presign s3://<bucket>/<objet> --expires-in <secondes>",
    examples: [
      { cmd: "aws s3 presign s3://mon-bucket/rapport.pdf --expires-in 3600", desc: "Génère un lien valide 1 heure pour télécharger le fichier" },
      { cmd: "aws s3 presign s3://mon-bucket/rapport.pdf --expires-in 300", desc: "Lien valide seulement 5 minutes, pour un partage ponctuel" }
    ],
    flags: ["--expires-in"]
  },
  {
    name: "aws ec2 describe-images",
    os: "awscli",
    category: "Système",
    description: "Recherche des AMI (images machine) disponibles selon des filtres (OS, architecture, état).",
    syntax: "aws ec2 describe-images --owners <owner> --filters <filtre>",
    examples: [
      { cmd: "aws ec2 describe-images --owners amazon --filters 'Name=name,Values=amzn2-ami-hvm-*-x86_64-gp2' --query 'Images | sort_by(@, &CreationDate) | [-1].ImageId'", desc: "Trouve l'AMI Amazon Linux 2 la plus récente" },
      { cmd: "aws ec2 describe-images --image-ids ami-0abcd1234", desc: "Cherche une AMI précise par son ID plutôt que par filtres" }
    ],
    flags: ["--owners", "--filters"]
  },

  // ── AZURE CLI ─────────────────────────────────────────────
  {
    name: "az login",
    os: "azurecli",
    category: "Utilisateurs",
    description: "Authentifie la session Azure CLI auprès d'Azure (ouvre une fenêtre de connexion par défaut).",
    syntax: "az login [--use-device-code]",
    examples: [
      { cmd: "az login", desc: "Ouvre le navigateur pour s'authentifier" },
      { cmd: "az login --use-device-code", desc: "Authentification via code, utile en SSH/serveur sans GUI" }
    ],
    flags: ["--use-device-code", "--service-principal"]
  },
  {
    name: "az account set",
    os: "azurecli",
    category: "Système",
    description: "Sélectionne l'abonnement Azure actif lorsque le compte en gère plusieurs.",
    syntax: "az account set --subscription <nom_ou_id>",
    examples: [
      { cmd: "az account list --output table", desc: "Liste les abonnements disponibles" },
      { cmd: "az account set --subscription \"Abonnement Prod\"", desc: "Bascule vers un abonnement précis" }
    ],
    flags: ["--subscription"]
  },
  {
    name: "az group create",
    os: "azurecli",
    category: "Système",
    description: "Crée un groupe de ressources, le conteneur logique de base de toute infrastructure Azure.",
    syntax: "az group create --name <nom> --location <région>",
    examples: [
      { cmd: "az group create --name rg-prod --location francecentral", desc: "Crée un groupe de ressources en France" },
      { cmd: "az group list --output table", desc: "Vérifie les groupes déjà existants avant d'en créer un nouveau" }
    ],
    flags: ["--name", "--location"]
  },
  {
    name: "az vm create",
    os: "azurecli",
    category: "Système",
    description: "Crée une machine virtuelle Azure avec ses paramètres réseau et de sécurité de base.",
    syntax: "az vm create --resource-group <rg> --name <nom> --image <image>",
    examples: [
      { cmd: "az vm create --resource-group rg-prod --name vm-web01 --image Debian12 --admin-username tom --generate-ssh-keys", desc: "Crée une VM Debian avec clé SSH générée" },
      { cmd: "az vm create --resource-group rg-prod --name vm-web02 --image Debian12 --size Standard_B2s --admin-username tom --generate-ssh-keys", desc: "Choisit explicitement la taille de la VM plutôt que la valeur par défaut" }
    ],
    flags: ["--resource-group", "--image", "--size", "--admin-username"]
  },
  {
    name: "az vm start / stop",
    os: "azurecli",
    category: "Système",
    description: "Démarre ou arrête une machine virtuelle Azure existante.",
    syntax: "az vm start|stop --resource-group <rg> --name <nom>",
    examples: [
      { cmd: "az vm start --resource-group rg-prod --name vm-web01", desc: "Démarre la VM" },
      { cmd: "az vm deallocate --resource-group rg-prod --name vm-web01", desc: "Arrête et libère la facturation de calcul" }
    ],
    flags: ["start", "stop", "deallocate (libère la facturation)"]
  },
  {
    name: "az storage account create",
    os: "azurecli",
    category: "Fichiers",
    description: "Crée un compte de stockage Azure (blob, fichiers, files d'attente, tables).",
    syntax: "az storage account create --name <nom> --resource-group <rg> --sku <sku>",
    examples: [
      { cmd: "az storage account create --name stockagedonnees --resource-group rg-prod --sku Standard_LRS", desc: "Crée un compte de stockage standard" },
      { cmd: "az storage account create --name stockagedonnees --resource-group rg-prod --sku Standard_GRS --kind StorageV2", desc: "Réplication géo-redondante plutôt que locale, pour la reprise après sinistre" }
    ],
    flags: ["--sku", "--location", "--kind"]
  },
  {
    name: "az aks get-credentials",
    os: "azurecli",
    category: "Conteneurs",
    description: "Récupère les identifiants d'un cluster AKS (Kubernetes managé Azure) pour configurer kubectl.",
    syntax: "az aks get-credentials --resource-group <rg> --name <cluster>",
    examples: [
      { cmd: "az aks get-credentials --resource-group rg-prod --name aks-prod", desc: "Configure kubectl pour pointer vers ce cluster AKS" },
      { cmd: "az aks get-credentials --resource-group rg-prod --name aks-prod --admin", desc: "Récupère les identifiants admin, avec plus de droits que le compte utilisateur standard" }
    ],
    flags: ["--resource-group", "--name", "--overwrite-existing"]
  },
  {
    name: "az webapp create",
    os: "azurecli",
    category: "Services",
    description: "Crée une application web Azure App Service à partir d'un plan d'hébergement existant.",
    syntax: "az webapp create --resource-group <rg> --plan <plan> --name <nom>",
    examples: [
      { cmd: "az webapp create --resource-group rg-prod --plan plan-web --name mon-app-web", desc: "Crée une web app" },
      { cmd: "az webapp list --resource-group rg-prod --output table", desc: "Vérifie les web apps déjà déployées dans ce groupe" }
    ],
    flags: ["--resource-group", "--plan", "--runtime"]
  },
  {
    name: "az network nsg rule create",
    os: "azurecli",
    category: "Réseau",
    description: "Ajoute une règle à un groupe de sécurité réseau (NSG), équivalent Azure d'un pare-feu de sous-réseau.",
    syntax: "az network nsg rule create --resource-group <rg> --nsg-name <nsg> --name <règle> --priority <n>",
    examples: [
      { cmd: "az network nsg rule create --resource-group rg-prod --nsg-name nsg-web --name AllowSSH --priority 100 --destination-port-ranges 22 --access Allow", desc: "Autorise le port 22" },
      { cmd: "az network nsg rule list --resource-group rg-prod --nsg-name nsg-web --output table", desc: "Vérifie les règles déjà en place avant d'en ajouter une nouvelle" }
    ],
    flags: ["--priority", "--access", "--destination-port-ranges"]
  },
  {
    name: "az role assignment create",
    os: "azurecli",
    category: "Permissions",
    description: "Attribue un rôle RBAC à un utilisateur, groupe ou application sur une ressource donnée.",
    syntax: "az role assignment create --assignee <identité> --role <rôle> --scope <portée>",
    examples: [
      { cmd: "az role assignment create --assignee tom@nexa.com --role Contributor --scope /subscriptions/xxx/resourceGroups/rg-prod", desc: "Donne le rôle Contributor sur un groupe de ressources" },
      { cmd: "az role assignment list --assignee tom@nexa.com --output table", desc: "Vérifie les rôles déjà attribués à cet utilisateur" }
    ],
    flags: ["--assignee", "--role", "--scope"]
  },
  {
    name: "az resource list",
    os: "azurecli",
    category: "Système",
    description: "Liste toutes les ressources Azure d'un abonnement ou groupe de ressources.",
    syntax: "az resource list [--resource-group <rg>]",
    examples: [
      { cmd: "az resource list --resource-group rg-prod --output table", desc: "Liste les ressources d'un groupe en format tableau" },
      { cmd: "az resource list --resource-group rg-prod --query \"[?type=='Microsoft.Compute/virtualMachines']\"", desc: "Filtre pour n'afficher qu'un type de ressource précis" }
    ],
    flags: ["--resource-group", "--output table|json"]
  },
  {
    name: "az deployment group create",
    os: "azurecli",
    category: "Système",
    description: "Déploie un template ARM/Bicep dans un groupe de ressources (équivalent CloudFormation côté Azure).",
    syntax: "az deployment group create --resource-group <rg> --template-file <fichier>",
    examples: [
      { cmd: "az deployment group create --resource-group rg-prod --template-file infra.bicep", desc: "Déploie une infrastructure définie en Bicep" },
      { cmd: "az deployment group validate --resource-group rg-prod --template-file infra.bicep", desc: "Valide le template avant de le déployer pour de vrai" }
    ],
    flags: ["--template-file", "--parameters"]
  },
  {
    name: "az group delete",
    os: "azurecli",
    category: "Système",
    description: "Supprime un groupe de ressources et toutes les ressources qu'il contient.",
    syntax: "az group delete --name <nom> [--yes]",
    examples: [
      { cmd: "az group delete --name rg-test --yes --no-wait", desc: "Supprime sans confirmation, en arrière-plan" },
      { cmd: "az group delete --name rg-test", desc: "Sans --yes ni --no-wait : demande confirmation et attend la fin de la suppression" }
    ],
    flags: ["--yes (sans confirmation)", "--no-wait"]
  },
  {
    name: "az vm list-ip-addresses",
    os: "azurecli",
    category: "Réseau",
    description: "Affiche les adresses IP publiques et privées des machines virtuelles.",
    syntax: "az vm list-ip-addresses --resource-group <rg>",
    examples: [
      { cmd: "az vm list-ip-addresses --resource-group rg-prod --output table", desc: "Liste les IP de toutes les VM d'un groupe" },
      { cmd: "az vm list-ip-addresses --resource-group rg-prod --name vm-web01", desc: "Limite l'affichage à une seule VM plutôt que tout le groupe" }
    ],
    flags: ["--resource-group"]
  },
  {
    name: "az keyvault secret set / show",
    os: "azurecli",
    category: "Permissions",
    description: "Stocke ou récupère un secret dans Azure Key Vault, le coffre-fort géré d'Azure.",
    syntax: "az keyvault secret set --vault-name <vault> --name <secret> --value <valeur>",
    examples: [
      { cmd: "az keyvault secret set --vault-name mon-vault --name DbPassword --value \"S3cret!\"", desc: "Stocke un secret" },
      { cmd: "az keyvault secret show --vault-name mon-vault --name DbPassword --query value -o tsv", desc: "Récupère la valeur d'un secret" }
    ],
    flags: ["--vault-name", "--name", "--value"]
  },
  {
    name: "az sql server create",
    os: "azurecli",
    category: "Système",
    description: "Crée un serveur de base de données SQL managé Azure.",
    syntax: "az sql server create --name <nom> --resource-group <rg> --admin-user <user> --admin-password <mdp>",
    examples: [
      { cmd: "az sql server create --name sql-prod --resource-group rg-prod --admin-user sqladmin --admin-password \"P@ssw0rd!\"", desc: "Crée un serveur SQL" },
      { cmd: "az sql db create --resource-group rg-prod --server sql-prod --name ma-base --service-objective S0", desc: "Crée ensuite une base de données sur ce serveur" }
    ],
    flags: ["--admin-user", "--admin-password", "--location"]
  },
  {
    name: "az monitor metrics list",
    os: "azurecli",
    category: "Système",
    description: "Récupère les métriques de monitoring (CPU, réseau...) d'une ressource Azure.",
    syntax: "az monitor metrics list --resource <id_ressource> --metric <métrique>",
    examples: [
      { cmd: "az monitor metrics list --resource <id_vm> --metric \"Percentage CPU\"", desc: "Récupère l'utilisation CPU d'une VM" },
      { cmd: "az monitor metrics list --resource <id_vm> --metric \"Percentage CPU\" --start-time 2026-07-01T00:00:00Z --interval PT1H", desc: "Sur une période et un intervalle précis, plutôt que l'instantané par défaut" }
    ],
    flags: ["--resource", "--metric", "--interval"]
  },
  {
    name: "az functionapp create",
    os: "azurecli",
    category: "Services",
    description: "Crée une Function App pour héberger du code serverless sur Azure.",
    syntax: "az functionapp create --resource-group <rg> --name <nom> --storage-account <stockage>",
    examples: [
      { cmd: "az functionapp create --resource-group rg-prod --name ma-fonction --storage-account stockagedonnees --runtime python --consumption-plan-location francecentral", desc: "Crée une fonction serverless Python" },
      { cmd: "az functionapp list --resource-group rg-prod --output table", desc: "Vérifie les Function Apps déjà déployées dans ce groupe" }
    ],
    flags: ["--runtime", "--consumption-plan-location", "--storage-account"]
  },
  {
    name: "az acr build",
    os: "azurecli",
    category: "Conteneurs",
    description: "Construit une image Docker directement dans le cloud via Azure Container Registry, sans Docker local.",
    syntax: "az acr build --registry <registry> --image <image> .",
    examples: [
      { cmd: "az acr build --registry monregistry --image monapp:1.0 .", desc: "Build et push l'image en une commande, sans Docker local" },
      { cmd: "az acr build --registry monregistry --image monapp:{{.Run.ID}} .", desc: "Tague automatiquement chaque build avec un identifiant unique" }
    ],
    flags: ["--registry", "--image"]
  },
  {
    name: "az vmss create",
    os: "azurecli",
    category: "Système",
    description: "Crée un groupe de machines virtuelles identiques (scale set) avec autoscaling.",
    syntax: "az vmss create --resource-group <rg> --name <nom> --image <image> --instance-count <n>",
    examples: [
      { cmd: "az vmss create --resource-group rg-prod --name vmss-web --image Debian12 --instance-count 3", desc: "Crée 3 VMs identiques avec load balancing" },
      { cmd: "az vmss scale --resource-group rg-prod --name vmss-web --new-capacity 6", desc: "Ajuste ensuite le nombre d'instances du scale set" }
    ],
    flags: ["--instance-count", "--image", "--upgrade-policy-mode"]
  },
  {
    name: "az policy assignment create",
    os: "azurecli",
    category: "Permissions",
    description: "Applique une politique de gouvernance (Azure Policy) sur un scope donné, pour imposer des règles.",
    syntax: "az policy assignment create --policy <politique> --scope <portée>",
    examples: [
      { cmd: "az policy assignment create --policy \"deny-public-ip\" --scope /subscriptions/xxx/resourceGroups/rg-prod", desc: "Interdit la création d'IP publiques sur le groupe" },
      { cmd: "az policy assignment list --scope /subscriptions/xxx/resourceGroups/rg-prod", desc: "Vérifie les politiques déjà appliquées sur ce groupe" }
    ],
    flags: ["--policy", "--scope"]
  },
  {
    name: "az tag update",
    os: "azurecli",
    category: "Système",
    description: "Ajoute ou met à jour des tags (métadonnées) sur une ressource Azure, utile pour l'organisation et la facturation.",
    syntax: "az tag update --resource-id <id> --operation merge --tags <clé>=<valeur>",
    examples: [
      { cmd: "az tag update --resource-id <id_vm> --operation merge --tags Environnement=Production Service=Web", desc: "Ajoute des tags à une ressource" },
      { cmd: "az tag list --resource-id <id_vm>", desc: "Affiche les tags déjà présents avant de les modifier" }
    ],
    flags: ["--operation merge|replace|delete"]
  },
  {
    name: "az network vnet create",
    os: "azurecli",
    category: "Réseau",
    description: "Crée un réseau virtuel (VNet) Azure avec son bloc d'adresses CIDR.",
    syntax: "az network vnet create --resource-group <rg> --name <nom> --address-prefix <cidr>",
    examples: [
      { cmd: "az network vnet create --resource-group rg-prod --name vnet-prod --address-prefix 10.0.0.0/16", desc: "Crée un VNet avec le bloc 10.0.0.0/16" },
      { cmd: "az network vnet list --resource-group rg-prod --output table", desc: "Vérifie les VNets déjà existants avant d'en créer un nouveau" }
    ],
    flags: ["--address-prefix", "--subnet-name", "--subnet-prefix"]
  },
  {
    name: "az network subnet create",
    os: "azurecli",
    category: "Réseau",
    description: "Crée un sous-réseau dans un VNet Azure existant.",
    syntax: "az network subnet create --resource-group <rg> --vnet-name <vnet> --name <nom> --address-prefix <cidr>",
    examples: [
      { cmd: "az network subnet create --resource-group rg-prod --vnet-name vnet-prod --name subnet-web --address-prefix 10.0.1.0/24", desc: "Crée un subnet pour les serveurs web" },
      { cmd: "az network vnet subnet list --resource-group rg-prod --vnet-name vnet-prod --output table", desc: "Liste les sous-réseaux déjà présents dans ce VNet" }
    ],
    flags: ["--address-prefix", "--network-security-group"]
  },
  {
    name: "az aks create",
    os: "azurecli",
    category: "Conteneurs",
    description: "Crée un cluster Kubernetes managé (AKS) avec ses paramètres de nœuds et réseau.",
    syntax: "az aks create --resource-group <rg> --name <nom> --node-count <n>",
    examples: [
      { cmd: "az aks create --resource-group rg-prod --name aks-prod --node-count 3 --generate-ssh-keys", desc: "Crée un cluster AKS à 3 nœuds" },
      { cmd: "az aks create --resource-group rg-prod --name aks-prod --node-count 3 --enable-cluster-autoscaler --min-count 2 --max-count 6", desc: "Active l'autoscaling du cluster entre 2 et 6 nœuds" }
    ],
    flags: ["--node-count", "--node-vm-size", "--generate-ssh-keys"]
  },
  {
    name: "az aks scale",
    os: "azurecli",
    category: "Conteneurs",
    description: "Ajuste le nombre de nœuds d'un cluster AKS existant.",
    syntax: "az aks scale --resource-group <rg> --name <cluster> --node-count <n>",
    examples: [
      { cmd: "az aks scale --resource-group rg-prod --name aks-prod --node-count 5", desc: "Passe le cluster à 5 nœuds" },
      { cmd: "az aks nodepool scale --resource-group rg-prod --cluster-name aks-prod --name nodepool1 --node-count 5", desc: "Scale un pool de nœuds précis plutôt que le cluster entier" }
    ],
    flags: ["--node-count"]
  },
  {
    name: "az containerapp create",
    os: "azurecli",
    category: "Conteneurs",
    description: "Déploie une application conteneurisée via Azure Container Apps (serverless containers).",
    syntax: "az containerapp create --name <nom> --resource-group <rg> --image <image>",
    examples: [
      { cmd: "az containerapp create --name mon-app --resource-group rg-prod --image nginx:latest --target-port 80 --ingress external", desc: "Déploie nginx en serverless avec accès externe" },
      { cmd: "az containerapp update --name mon-app --resource-group rg-prod --image mon-app:2.0", desc: "Met à jour l'image d'une Container App déjà déployée" }
    ],
    flags: ["--image", "--target-port", "--ingress", "--cpu", "--memory"]
  },
  {
    name: "az monitor log-analytics query",
    os: "azurecli",
    category: "Système",
    description: "Exécute une requête KQL (Kusto) sur un workspace Log Analytics pour analyser les logs.",
    syntax: "az monitor log-analytics query --workspace <id> --analytics-query '<kql>'",
    examples: [
      { cmd: "az monitor log-analytics query --workspace <id_workspace> --analytics-query 'AzureActivity | limit 10'", desc: "Récupère les 10 dernières activités du tenant" },
      { cmd: "az monitor log-analytics query --workspace <id_workspace> --analytics-query 'AzureActivity | where Level == \"Error\" | limit 20'", desc: "Ne remonte que les évènements en erreur" }
    ],
    flags: ["--workspace", "--analytics-query"]
  },
  {
    name: "az backup vault create",
    os: "azurecli",
    category: "Archives",
    description: "Crée un coffre Recovery Services pour gérer les sauvegardes de VMs et bases de données Azure.",
    syntax: "az backup vault create --resource-group <rg> --name <nom> --location <région>",
    examples: [
      { cmd: "az backup vault create --resource-group rg-prod --name vault-prod --location francecentral", desc: "Crée un coffre de sauvegarde" },
      { cmd: "az backup vault list --resource-group rg-prod --output table", desc: "Vérifie les coffres de sauvegarde déjà créés dans ce groupe" }
    ],
    flags: ["--location"]
  },
  {
    name: "az disk create",
    os: "azurecli",
    category: "Système",
    description: "Crée un disque managé Azure (SSD ou HDD) à attacher à une VM.",
    syntax: "az disk create --resource-group <rg> --name <nom> --size-gb <n> --sku <sku>",
    examples: [
      { cmd: "az disk create --resource-group rg-prod --name disk-data --size-gb 128 --sku Premium_LRS", desc: "Crée un SSD premium de 128 Go" },
      { cmd: "az disk list --resource-group rg-prod --output table", desc: "Liste les disques déjà existants dans ce groupe" }
    ],
    flags: ["--size-gb", "--sku Standard_LRS|Premium_LRS|UltraSSD_LRS"]
  },
  {
    name: "az vm disk attach",
    os: "azurecli",
    category: "Système",
    description: "Attache un disque managé existant à une VM Azure.",
    syntax: "az vm disk attach --resource-group <rg> --vm-name <vm> --name <disque>",
    examples: [
      { cmd: "az vm disk attach --resource-group rg-prod --vm-name vm-web01 --name disk-data", desc: "Attache le disque à la VM" },
      { cmd: "az vm disk detach --resource-group rg-prod --vm-name vm-web01 --name disk-data", desc: "Détache le disque, opération inverse" }
    ],
    flags: ["--vm-name", "--name"]
  },
  {
    name: "az network public-ip create",
    os: "azurecli",
    category: "Réseau",
    description: "Crée une adresse IP publique statique à associer à une VM ou un load balancer.",
    syntax: "az network public-ip create --resource-group <rg> --name <nom> --allocation-method Static",
    examples: [
      { cmd: "az network public-ip create --resource-group rg-prod --name ip-web01 --allocation-method Static --sku Standard", desc: "Crée une IP publique statique standard" },
      { cmd: "az network public-ip list --resource-group rg-prod --output table", desc: "Vérifie les IP publiques déjà allouées dans ce groupe" }
    ],
    flags: ["--allocation-method", "--sku"]
  },
  {
    name: "az network lb create",
    os: "azurecli",
    category: "Réseau",
    description: "Crée un load balancer Azure pour distribuer le trafic entre plusieurs VMs.",
    syntax: "az network lb create --resource-group <rg> --name <nom>",
    examples: [
      { cmd: "az network lb create --resource-group rg-prod --name lb-web --sku Standard --public-ip-address ip-web", desc: "Crée un load balancer Standard avec IP publique" },
      { cmd: "az network lb rule create --resource-group rg-prod --lb-name lb-web --name http-rule --protocol Tcp --frontend-port 80 --backend-port 80", desc: "Ajoute une règle de routage sur le load balancer une fois créé" }
    ],
    flags: ["--sku", "--public-ip-address"]
  },
  {
    name: "az ad user list",
    os: "azurecli",
    category: "Utilisateurs",
    description: "Liste les utilisateurs Azure Active Directory (Entra ID) du tenant.",
    syntax: "az ad user list [--filter <filtre>]",
    examples: [
      { cmd: "az ad user list --output table", desc: "Liste tous les utilisateurs en format tableau" },
      { cmd: "az ad user show --id tom@nexa.com", desc: "Détails d'un utilisateur précis" }
    ],
    flags: ["--filter", "--output"]
  },
  {
    name: "az ad group create",
    os: "azurecli",
    category: "Utilisateurs",
    description: "Crée un groupe Azure Active Directory (Entra ID) pour gérer des permissions collectives.",
    syntax: "az ad group create --display-name <nom> --mail-nickname <alias>",
    examples: [
      { cmd: "az ad group create --display-name \"Equipe DevOps\" --mail-nickname devops", desc: "Crée un groupe pour l'équipe DevOps" },
      { cmd: "az ad group member add --group \"Equipe DevOps\" --member-id <object-id-utilisateur>", desc: "Ajoute un membre au groupe une fois celui-ci créé" }
    ],
    flags: ["--display-name", "--mail-nickname"]
  },
  {
    name: "az spring create",
    os: "azurecli",
    category: "Services",
    description: "Crée une instance Azure Spring Apps pour déployer des microservices Spring Boot managés.",
    syntax: "az spring create --name <nom> --resource-group <rg>",
    examples: [
      { cmd: "az spring create --name spring-prod --resource-group rg-prod", desc: "Crée une instance Spring Apps" },
      { cmd: "az spring app create --name mon-service --resource-group rg-prod --service spring-prod", desc: "Déploie ensuite une application dans cette instance Spring Apps" }
    ],
    flags: []
  },
  {
    name: "az cdn profile create",
    os: "azurecli",
    category: "Réseau",
    description: "Crée un profil Azure CDN pour distribuer du contenu statique via un réseau mondial de points de présence.",
    syntax: "az cdn profile create --resource-group <rg> --name <nom> --sku <sku>",
    examples: [
      { cmd: "az cdn profile create --resource-group rg-prod --name cdn-mon-app --sku Standard_Microsoft", desc: "Crée un profil CDN Microsoft Standard" },
      { cmd: "az cdn endpoint create --resource-group rg-prod --profile-name cdn-mon-app --name mon-app-endpoint --origin monsite.z6.web.core.windows.net", desc: "Crée un endpoint CDN pointant vers l'origine du contenu" }
    ],
    flags: ["--sku Standard_Microsoft|Standard_Akamai|Premium_Verizon"]
  },
  {
    name: "az eventgrid event-subscription create",
    os: "azurecli",
    category: "Services",
    description: "Crée un abonnement aux événements Azure Event Grid pour réagir aux changements de ressources.",
    syntax: "az eventgrid event-subscription create --name <nom> --source-resource-id <id> --endpoint <url>",
    examples: [
      { cmd: "az eventgrid event-subscription create --name mon-sub --source-resource-id <id_topic> --endpoint https://mon-app/webhook", desc: "Déclenche un webhook lors d'événements" },
      { cmd: "az eventgrid event-subscription list --source-resource-id <id_topic>", desc: "Vérifie les abonnements déjà en place sur cette source d'évènements" }
    ],
    flags: ["--source-resource-id", "--endpoint"]
  },
  {
    name: "az vm image list",
    os: "azurecli",
    category: "Système",
    description: "Liste les images VM disponibles dans Azure Marketplace selon l'OS, l'éditeur ou l'offre.",
    syntax: "az vm image list [--publisher <pub>] [--offer <offre>]",
    examples: [
      { cmd: "az vm image list --publisher Canonical --offer UbuntuServer --all --output table", desc: "Liste les images Ubuntu disponibles" },
      { cmd: "az vm image list --publisher Canonical --offer UbuntuServer --sku 22_04-lts --all", desc: "Filtre sur une version précise (SKU) plutôt que toute l'offre" }
    ],
    flags: ["--publisher", "--offer", "--sku", "--all"]
  },
  {
    name: "az cognitiveservices account create",
    os: "azurecli",
    category: "Services",
    description: "Crée un compte Azure AI Services (anciennement Cognitive Services) pour utiliser les API d'IA Azure.",
    syntax: "az cognitiveservices account create --name <nom> --resource-group <rg> --kind <service> --sku <sku>",
    examples: [
      { cmd: "az cognitiveservices account create --name ai-mon-app --resource-group rg-prod --kind OpenAI --sku S0 --location swedencentral", desc: "Crée un endpoint Azure OpenAI" },
      { cmd: "az cognitiveservices account list --resource-group rg-prod --output table", desc: "Vérifie les comptes AI Services déjà créés dans ce groupe" }
    ],
    flags: ["--kind", "--sku", "--location"]
  },
  {
    name: "az signalr create",
    os: "azurecli",
    category: "Services",
    description: "Crée un service Azure SignalR pour ajouter des communications temps réel à une application web.",
    syntax: "az signalr create --name <nom> --resource-group <rg> --sku <sku>",
    examples: [
      { cmd: "az signalr create --name signalr-mon-app --resource-group rg-prod --sku Standard_S1", desc: "Crée un service SignalR Standard" },
      { cmd: "az signalr key list --name signalr-mon-app --resource-group rg-prod", desc: "Récupère les clés de connexion une fois le service créé" }
    ],
    flags: ["--sku Free_F1|Standard_S1"]
  },
  {
    name: "az devops project create",
    os: "azurecli",
    category: "Services",
    description: "Crée un projet Azure DevOps via l'extension CLI az devops (repos, pipelines, boards centralisés).",
    syntax: "az devops project create --name <nom> --org <organisation>",
    examples: [
      { cmd: "az devops project create --name mon-projet --org https://dev.azure.com/nexa", desc: "Crée un projet dans l'organisation Azure DevOps" },
      { cmd: "az devops project list --org https://dev.azure.com/nexa", desc: "Vérifie les projets déjà existants dans l'organisation" }
    ],
    flags: ["--name", "--org", "--visibility public|private"]
  }
];


