/* MANPAGES.EXE — data-extra3.js
   Pack d'extension v4 : outils de sauvegarde — rclone · BorgBackup · restic —
   plus un renfort de la catégorie universelle Processus/Navigation, un peu
   maigre par rapport au reste de l'annuaire.
   Chargé APRÈS data-extra2.js : les commandes sont fusionnées dans COMMANDS. */

const EXTRA_COMMANDS_3 = [

  // ── UNIVERSEL : PROCESSUS (renfort) ──────────────────────
  {
    name: "killall",
    os: "universal",
    category: "Processus",
    description: "Termine tous les processus portant un nom donné, sans connaître leur PID.",
    syntax: "killall [signal] <nom>",
    examples: [
      { cmd: "killall firefox", desc: "Ferme tous les processus firefox" },
      { cmd: "killall -9 nginx", desc: "Tue immédiatement tous les processus nginx (SIGKILL)" }
    ],
    flags: ["-9 (SIGKILL, forcé)", "-15 (SIGTERM, propre)", "-u (filtrer par utilisateur)"]
  },
  {
    name: "pkill",
    os: "universal",
    category: "Processus",
    description: "Termine des processus en filtrant par nom, utilisateur ou autre critère (regex incluse).",
    syntax: "pkill [options] <motif>",
    examples: [
      { cmd: "pkill -f 'python app.py'", desc: "Tue le processus dont la ligne de commande complète correspond" },
      { cmd: "pkill -u tom", desc: "Tue tous les processus de l'utilisateur tom" }
    ],
    flags: ["-f (motif sur la commande complète)", "-u (par utilisateur)", "-9 (SIGKILL)"]
  },
  {
    name: "pgrep",
    os: "universal",
    category: "Processus",
    description: "Recherche des PID de processus par nom ou autre critère, sans les tuer.",
    syntax: "pgrep [options] <motif>",
    examples: [
      { cmd: "pgrep nginx", desc: "Affiche les PID de tous les processus nginx" },
      { cmd: "pgrep -l ssh", desc: "Affiche PID + nom pour les processus ssh" }
    ],
    flags: ["-l (affiche aussi le nom)", "-u (par utilisateur)", "-c (compte seulement)"]
  },
  {
    name: "nohup",
    os: "universal",
    category: "Processus",
    description: "Lance une commande qui continue de tourner même après la fermeture du terminal.",
    syntax: "nohup <commande> &",
    examples: [
      { cmd: "nohup ./mon_script.sh &", desc: "Le script survit à la déconnexion du terminal" },
      { cmd: "nohup python app.py > app.log 2>&1 &", desc: "Redirige aussi la sortie vers un fichier" }
    ],
    flags: []
  },
  {
    name: "jobs",
    os: "universal",
    category: "Processus",
    description: "Liste les tâches en arrière-plan ou suspendues de la session shell courante.",
    syntax: "jobs [-l]",
    examples: [
      { cmd: "jobs", desc: "Affiche les tâches actives avec leur numéro" },
      { cmd: "jobs -l", desc: "Ajoute le PID de chaque tâche" }
    ],
    flags: ["-l (affiche les PID)"]
  },
  {
    name: "bg / fg",
    os: "universal",
    category: "Processus",
    description: "Reprend une tâche suspendue en arrière-plan (bg) ou au premier plan (fg).",
    syntax: "bg [%job] ; fg [%job]",
    examples: [
      { cmd: "fg %1", desc: "Ramène la tâche n°1 au premier plan" },
      { cmd: "bg %1", desc: "Relance la tâche n°1 en arrière-plan (après Ctrl+Z)" }
    ],
    flags: []
  },
  {
    name: "nice / renice",
    os: "universal",
    category: "Processus",
    description: "Lance (nice) ou modifie (renice) la priorité d'ordonnancement d'un processus.",
    syntax: "nice -n <niveau> <commande> ; renice -n <niveau> -p <pid>",
    examples: [
      { cmd: "nice -n 10 ./compilation.sh", desc: "Lance avec une priorité basse (ne monopolise pas le CPU)" },
      { cmd: "renice -n -5 -p 4821", desc: "Augmente la priorité d'un processus déjà lancé" }
    ],
    flags: ["-n (niveau, -20 à 19, plus bas = plus prioritaire)"]
  },

  // ── UNIVERSEL : NAVIGATION (renfort) ─────────────────────
  {
    name: "tree",
    os: "universal",
    category: "Navigation",
    description: "Affiche l'arborescence d'un répertoire sous forme d'arbre visuel.",
    syntax: "tree [-L <profondeur>] [chemin]",
    examples: [
      { cmd: "tree -L 2", desc: "Affiche l'arborescence sur 2 niveaux de profondeur" },
      { cmd: "tree -a -I 'node_modules|.git'", desc: "Affiche tout sauf certains dossiers exclus" }
    ],
    flags: ["-L (profondeur max)", "-a (fichiers cachés)", "-I (motif à exclure)", "-d (dossiers seulement)"]
  },
  {
    name: "pushd / popd",
    os: "universal",
    category: "Navigation",
    description: "Empile (pushd) ou dépile (popd) des répertoires pour naviguer rapidement entre plusieurs emplacements.",
    syntax: "pushd <chemin> ; popd",
    examples: [
      { cmd: "pushd /var/log", desc: "Va dans /var/log en gardant le répertoire précédent en mémoire" },
      { cmd: "popd", desc: "Revient au répertoire mémorisé avant le dernier pushd" }
    ],
    flags: []
  },

  // ── RCLONE ────────────────────────────────────────────────
  {
    name: "rclone config",
    os: "rclone",
    category: "Fichiers",
    description: "Assistant interactif pour configurer un nouveau service distant (S3, Google Drive, etc.).",
    syntax: "rclone config",
    examples: [
      { cmd: "rclone config", desc: "Lance l'assistant pas à pas pour ajouter un remote" }
    ],
    flags: []
  },
  {
    name: "rclone listremotes",
    os: "rclone",
    category: "Fichiers",
    description: "Liste tous les services distants (remotes) déjà configurés.",
    syntax: "rclone listremotes",
    examples: [
      { cmd: "rclone listremotes", desc: "Affiche par exemple 's3:' ou 'gdrive:'" }
    ],
    flags: []
  },
  {
    name: "rclone ls",
    os: "rclone",
    category: "Fichiers",
    description: "Liste récursivement les fichiers d'un remote ou d'un chemin local.",
    syntax: "rclone ls <remote:chemin>",
    examples: [
      { cmd: "rclone ls s3:mon-bucket", desc: "Liste tous les fichiers du bucket S3" }
    ],
    flags: []
  },
  {
    name: "rclone lsd",
    os: "rclone",
    category: "Fichiers",
    description: "Liste uniquement les dossiers d'un remote, sans descendre dans les fichiers.",
    syntax: "rclone lsd <remote:chemin>",
    examples: [
      { cmd: "rclone lsd gdrive:", desc: "Liste les dossiers à la racine du Google Drive" }
    ],
    flags: []
  },
  {
    name: "rclone copy",
    os: "rclone",
    category: "Fichiers",
    description: "Copie des fichiers d'une source vers une destination, sans supprimer ce qui est en trop côté destination.",
    syntax: "rclone copy <source> <destination>",
    examples: [
      { cmd: "rclone copy ./photos s3:mon-bucket/photos", desc: "Envoie un dossier local vers S3" },
      { cmd: "rclone copy s3:mon-bucket/backup ./local --progress", desc: "Rapatrie en local avec barre de progression" }
    ],
    flags: ["--progress", "--dry-run (simulation)", "--exclude"]
  },
  {
    name: "rclone sync",
    os: "rclone",
    category: "Fichiers",
    description: "Synchronise une destination sur une source : supprime aussi ce qui n'existe plus côté source. À utiliser avec prudence.",
    syntax: "rclone sync <source> <destination>",
    examples: [
      { cmd: "rclone sync ./site gdrive:backup-site --dry-run", desc: "Simule d'abord la synchronisation avant de l'exécuter" }
    ],
    flags: ["--dry-run (toujours tester avant !)", "--delete-excluded"]
  },
  {
    name: "rclone move",
    os: "rclone",
    category: "Fichiers",
    description: "Déplace des fichiers d'une source vers une destination, en les supprimant de la source une fois transférés.",
    syntax: "rclone move <source> <destination>",
    examples: [
      { cmd: "rclone move ./exports s3:archives/exports", desc: "Archive puis vide le dossier local" }
    ],
    flags: []
  },
  {
    name: "rclone check",
    os: "rclone",
    category: "Fichiers",
    description: "Compare source et destination pour vérifier l'intégrité d'une copie, sans transférer.",
    syntax: "rclone check <source> <destination>",
    examples: [
      { cmd: "rclone check ./photos s3:mon-bucket/photos", desc: "Vérifie que tout a bien été copié" }
    ],
    flags: []
  },
  {
    name: "rclone mount",
    os: "rclone",
    category: "Système",
    description: "Monte un remote distant comme un système de fichiers local (FUSE).",
    syntax: "rclone mount <remote:chemin> <point-de-montage>",
    examples: [
      { cmd: "rclone mount gdrive: ~/GoogleDrive --daemon", desc: "Monte le Drive comme un dossier local" }
    ],
    flags: ["--daemon (arrière-plan)", "--vfs-cache-mode"]
  },
  {
    name: "rclone size",
    os: "rclone",
    category: "Fichiers",
    description: "Affiche la taille totale et le nombre de fichiers d'un remote.",
    syntax: "rclone size <remote:chemin>",
    examples: [
      { cmd: "rclone size s3:mon-bucket", desc: "Utile avant de facturer ou migrer un bucket" }
    ],
    flags: []
  },

  // ── BORGBACKUP ────────────────────────────────────────────
  {
    name: "borg init",
    os: "borg",
    category: "Fichiers",
    description: "Initialise un nouveau dépôt de sauvegarde chiffré et dédupliqué.",
    syntax: "borg init --encryption=<mode> <dépôt>",
    examples: [
      { cmd: "borg init --encryption=repokey /mnt/backup/repo", desc: "Crée un dépôt chiffré avec clé stockée dans le dépôt" }
    ],
    flags: ["--encryption=repokey", "--encryption=none"]
  },
  {
    name: "borg create",
    os: "borg",
    category: "Fichiers",
    description: "Crée un nouvel instantané (archive) dans le dépôt, avec déduplication automatique.",
    syntax: "borg create <dépôt>::<nom-archive> <chemins...>",
    examples: [
      { cmd: "borg create /mnt/backup/repo::'{hostname}-{now}' /home /etc", desc: "Sauvegarde datée automatiquement dans le nom" }
    ],
    flags: ["--stats", "--progress", "--exclude"]
  },
  {
    name: "borg list",
    os: "borg",
    category: "Fichiers",
    description: "Liste les archives présentes dans un dépôt, ou le contenu d'une archive précise.",
    syntax: "borg list <dépôt>[::<archive>]",
    examples: [
      { cmd: "borg list /mnt/backup/repo", desc: "Liste toutes les archives du dépôt" },
      { cmd: "borg list /mnt/backup/repo::serveur-2026-07-18", desc: "Liste le contenu d'une archive précise" }
    ],
    flags: []
  },
  {
    name: "borg extract",
    os: "borg",
    category: "Fichiers",
    description: "Restaure les fichiers d'une archive dans le répertoire courant.",
    syntax: "borg extract <dépôt>::<archive> [chemins...]",
    examples: [
      { cmd: "borg extract /mnt/backup/repo::serveur-2026-07-18 etc/nginx", desc: "Restaure uniquement un sous-dossier" }
    ],
    flags: ["--dry-run"]
  },
  {
    name: "borg check",
    os: "borg",
    category: "Fichiers",
    description: "Vérifie l'intégrité d'un dépôt et de ses archives.",
    syntax: "borg check <dépôt>",
    examples: [
      { cmd: "borg check /mnt/backup/repo", desc: "Détecte la corruption éventuelle des données sauvegardées" }
    ],
    flags: ["--repair (tente de réparer)"]
  },
  {
    name: "borg prune",
    os: "borg",
    category: "Fichiers",
    description: "Supprime les anciennes archives selon une politique de rétention (garder N jours/semaines/mois).",
    syntax: "borg prune <dépôt> --keep-daily=<n> --keep-weekly=<n>",
    examples: [
      { cmd: "borg prune /mnt/backup/repo --keep-daily=7 --keep-weekly=4 --keep-monthly=6", desc: "Politique de rétention classique 7j/4sem/6mois" }
    ],
    flags: ["--keep-daily", "--keep-weekly", "--keep-monthly", "--dry-run"]
  },
  {
    name: "borg compact",
    os: "borg",
    category: "Fichiers",
    description: "Libère l'espace disque réellement inutilisé après un prune (à lancer ensuite).",
    syntax: "borg compact <dépôt>",
    examples: [
      { cmd: "borg compact /mnt/backup/repo", desc: "Récupère l'espace disque des segments obsolètes" }
    ],
    flags: []
  },
  {
    name: "borg mount",
    os: "borg",
    category: "Système",
    description: "Monte une archive ou un dépôt entier comme système de fichiers en lecture seule (FUSE).",
    syntax: "borg mount <dépôt>[::<archive>] <point-de-montage>",
    examples: [
      { cmd: "borg mount /mnt/backup/repo::serveur-2026-07-18 /mnt/restore", desc: "Explore une sauvegarde comme un dossier normal" }
    ],
    flags: []
  },
  {
    name: "borg info",
    os: "borg",
    category: "Fichiers",
    description: "Affiche des statistiques détaillées sur un dépôt ou une archive (taille, déduplication).",
    syntax: "borg info <dépôt>[::<archive>]",
    examples: [
      { cmd: "borg info /mnt/backup/repo", desc: "Affiche le taux de déduplication et l'espace utilisé" }
    ],
    flags: []
  },

  // ── RESTIC ────────────────────────────────────────────────
  {
    name: "restic init",
    os: "restic",
    category: "Fichiers",
    description: "Initialise un nouveau dépôt de sauvegarde chiffré (local, S3, SFTP, etc.).",
    syntax: "restic -r <dépôt> init",
    examples: [
      { cmd: "restic -r s3:s3.amazonaws.com/mon-bucket init", desc: "Crée un dépôt directement sur S3" },
      { cmd: "restic -r /mnt/backup init", desc: "Crée un dépôt sur un disque local" }
    ],
    flags: ["-r (dépôt cible)"]
  },
  {
    name: "restic backup",
    os: "restic",
    category: "Fichiers",
    description: "Crée un nouvel instantané en sauvegardant les chemins indiqués, avec déduplication.",
    syntax: "restic -r <dépôt> backup <chemins...>",
    examples: [
      { cmd: "restic -r /mnt/backup backup /home /etc", desc: "Sauvegarde deux répertoires en un instantané" }
    ],
    flags: ["--exclude", "--tag", "--verbose"]
  },
  {
    name: "restic snapshots",
    os: "restic",
    category: "Fichiers",
    description: "Liste tous les instantanés présents dans un dépôt.",
    syntax: "restic -r <dépôt> snapshots",
    examples: [
      { cmd: "restic -r /mnt/backup snapshots", desc: "Affiche date, hôte et taille de chaque instantané" }
    ],
    flags: []
  },
  {
    name: "restic restore",
    os: "restic",
    category: "Fichiers",
    description: "Restaure un instantané complet vers un répertoire cible.",
    syntax: "restic -r <dépôt> restore <id-snapshot> --target <chemin>",
    examples: [
      { cmd: "restic -r /mnt/backup restore latest --target /tmp/restauration", desc: "Restaure le dernier instantané" }
    ],
    flags: ["--target", "--include (filtrer les chemins)"]
  },
  {
    name: "restic check",
    os: "restic",
    category: "Fichiers",
    description: "Vérifie la cohérence et l'intégrité d'un dépôt restic.",
    syntax: "restic -r <dépôt> check",
    examples: [
      { cmd: "restic -r /mnt/backup check --read-data", desc: "Vérification complète en relisant toutes les données" }
    ],
    flags: ["--read-data (vérification complète, plus lente)"]
  },
  {
    name: "restic forget",
    os: "restic",
    category: "Fichiers",
    description: "Applique une politique de rétention pour marquer des instantanés à oublier.",
    syntax: "restic -r <dépôt> forget --keep-daily=<n> --keep-weekly=<n>",
    examples: [
      { cmd: "restic -r /mnt/backup forget --keep-daily=7 --keep-weekly=4 --prune", desc: "Oublie les vieux instantanés et nettoie tout de suite" }
    ],
    flags: ["--keep-daily", "--keep-weekly", "--prune (nettoie aussi l'espace)"]
  },
  {
    name: "restic prune",
    os: "restic",
    category: "Fichiers",
    description: "Supprime les données réellement inutilisées après un forget, pour libérer l'espace.",
    syntax: "restic -r <dépôt> prune",
    examples: [
      { cmd: "restic -r /mnt/backup prune", desc: "Nettoie le dépôt des blocs orphelins" }
    ],
    flags: []
  },
  {
    name: "restic find",
    os: "restic",
    category: "Fichiers",
    description: "Recherche un fichier précis à travers tous les instantanés d'un dépôt.",
    syntax: "restic -r <dépôt> find <motif>",
    examples: [
      { cmd: "restic -r /mnt/backup find 'nginx.conf'", desc: "Retrouve dans quels instantanés ce fichier existe" }
    ],
    flags: []
  },
  {
    name: "restic diff",
    os: "restic",
    category: "Fichiers",
    description: "Compare deux instantanés pour voir ce qui a changé entre eux.",
    syntax: "restic -r <dépôt> diff <id1> <id2>",
    examples: [
      { cmd: "restic -r /mnt/backup diff abc123 def456", desc: "Liste les fichiers ajoutés, modifiés et supprimés" }
    ],
    flags: []
  },
  {
    name: "restic unlock",
    os: "restic",
    category: "Fichiers",
    description: "Supprime les verrous restants après une opération interrompue (ex. sauvegarde coupée).",
    syntax: "restic -r <dépôt> unlock",
    examples: [
      { cmd: "restic -r /mnt/backup unlock", desc: "Débloque le dépôt après un crash ou un Ctrl+C" }
    ],
    flags: []
  },

];

// Fusion dans le tableau global COMMANDS (chargé par data.js)
if (typeof COMMANDS !== "undefined") {
  COMMANDS.push.apply(COMMANDS, EXTRA_COMMANDS_3);
}
