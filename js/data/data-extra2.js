/* MANPAGES.EXE — data-extra2.js
   Pack d'extension v3 : PostgreSQL (psql) · Redis (redis-cli) ·
   MongoDB (mongosh) · Google Cloud CLI (gcloud/gsutil).
   Chargé APRÈS data-extra.js : les commandes sont fusionnées dans COMMANDS. */

const EXTRA_COMMANDS_2 = [

  // ── POSTGRESQL ────────────────────────────────────────────
  {
    name: "psql",
    os: "postgresql",
    category: "Bases de données",
    description: "Client interactif en ligne de commande pour PostgreSQL.",
    syntax: "psql [-U <user>] [-h <hôte>] [-d <base>]",
    examples: [
      { cmd: "psql -U postgres", desc: "Connexion locale avec l'utilisateur postgres" },
      { cmd: "psql -U app -h db.exemple.com -d prod", desc: "Connexion à une base distante" },
      { cmd: "psql \"postgresql://user:pass@host:5432/db\"", desc: "Connexion via une chaîne de connexion" }
    ],
    flags: ["-U (utilisateur)", "-h (hôte)", "-d (base)", "-p (port)", "-c (exécute une requête et quitte)"]
  },
  {
    name: "\\l",
    os: "postgresql",
    category: "Bases de données",
    description: "Liste toutes les bases de données du serveur (méta-commande psql).",
    syntax: "\\l",
    examples: [
      { cmd: "\\l", desc: "Affiche nom, propriétaire et encodage de chaque base" },
      { cmd: "\\l+", desc: "Ajoute la taille sur disque de chaque base" }
    ],
    flags: []
  },
  {
    name: "\\c",
    os: "postgresql",
    category: "Bases de données",
    description: "Change de base de données active dans la session psql.",
    syntax: "\\c <base> [utilisateur]",
    examples: [
      { cmd: "\\c prod", desc: "Bascule sur la base 'prod'" },
      { cmd: "\\c prod app", desc: "Bascule sur 'prod' avec l'utilisateur 'app'" }
    ],
    flags: []
  },
  {
    name: "\\dt",
    os: "postgresql",
    category: "Bases de données",
    description: "Liste les tables du schéma courant.",
    syntax: "\\dt [motif]",
    examples: [
      { cmd: "\\dt", desc: "Liste toutes les tables du schéma public" },
      { cmd: "\\dt+", desc: "Ajoute la taille de chaque table" }
    ],
    flags: []
  },
  {
    name: "\\d",
    os: "postgresql",
    category: "Bases de données",
    description: "Décrit la structure d'une table : colonnes, types, index, contraintes.",
    syntax: "\\d <table>",
    examples: [
      { cmd: "\\d utilisateurs", desc: "Affiche le schéma de la table utilisateurs" }
    ],
    flags: []
  },
  {
    name: "\\du",
    os: "postgresql",
    category: "Utilisateurs",
    description: "Liste les rôles (utilisateurs) et leurs attributs.",
    syntax: "\\du",
    examples: [
      { cmd: "\\du", desc: "Affiche tous les rôles avec superuser, login, etc." }
    ],
    flags: []
  },
  {
    name: "\\x",
    os: "postgresql",
    category: "Système",
    description: "Bascule l'affichage étendu (une colonne par ligne), très utile pour les tables larges.",
    syntax: "\\x [on|off|auto]",
    examples: [
      { cmd: "\\x auto", desc: "Affichage étendu automatique selon la largeur du terminal" }
    ],
    flags: []
  },
  {
    name: "\\i",
    os: "postgresql",
    category: "Fichiers",
    description: "Exécute un fichier de script SQL depuis psql.",
    syntax: "\\i <fichier.sql>",
    examples: [
      { cmd: "\\i schema.sql", desc: "Exécute le script schema.sql" }
    ],
    flags: []
  },
  {
    name: "\\copy",
    os: "postgresql",
    category: "Fichiers",
    description: "Importe ou exporte des données entre une table et un fichier CSV, côté client.",
    syntax: "\\copy <table> (to|from) '<fichier>' with csv header",
    examples: [
      { cmd: "\\copy clients to 'clients.csv' with csv header", desc: "Exporte la table vers un CSV" },
      { cmd: "\\copy clients from 'clients.csv' with csv header", desc: "Importe un CSV dans la table" }
    ],
    flags: []
  },
  {
    name: "\\q",
    os: "postgresql",
    category: "Système",
    description: "Quitte la session psql.",
    syntax: "\\q",
    examples: [
      { cmd: "\\q", desc: "Ferme la connexion et revient au shell" }
    ],
    flags: []
  },
  {
    name: "CREATE DATABASE",
    os: "postgresql",
    category: "Bases de données",
    description: "Crée une nouvelle base de données PostgreSQL.",
    syntax: "CREATE DATABASE <nom> [OWNER <rôle>];",
    examples: [
      { cmd: "CREATE DATABASE boutique OWNER app;", desc: "Crée la base 'boutique' appartenant à 'app'" }
    ],
    flags: []
  },
  {
    name: "DROP DATABASE",
    os: "postgresql",
    category: "Bases de données",
    description: "Supprime définitivement une base de données et toutes ses données.",
    syntax: "DROP DATABASE [IF EXISTS] <nom>;",
    examples: [
      { cmd: "DROP DATABASE IF EXISTS test;", desc: "Supprime la base 'test' si elle existe" }
    ],
    flags: []
  },
  {
    name: "CREATE TABLE",
    os: "postgresql",
    category: "Bases de données",
    description: "Crée une nouvelle table avec ses colonnes, types et contraintes.",
    syntax: "CREATE TABLE <nom> (<colonne> <type> [contrainte], ...);",
    examples: [
      { cmd: "CREATE TABLE clients (id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL);", desc: "Table avec clé primaire auto-incrémentée" }
    ],
    flags: []
  },
  {
    name: "CREATE ROLE",
    os: "postgresql",
    category: "Utilisateurs",
    description: "Crée un rôle (utilisateur ou groupe) PostgreSQL.",
    syntax: "CREATE ROLE <nom> [LOGIN] [PASSWORD '<mdp>'];",
    examples: [
      { cmd: "CREATE ROLE app LOGIN PASSWORD 'secret';", desc: "Crée un rôle applicatif pouvant se connecter" }
    ],
    flags: ["LOGIN (autorise la connexion)", "SUPERUSER", "CREATEDB", "PASSWORD"]
  },
  {
    name: "GRANT",
    os: "postgresql",
    category: "Permissions",
    description: "Accorde des privilèges à un rôle sur une base, table ou schéma.",
    syntax: "GRANT <privilège> ON <objet> TO <rôle>;",
    examples: [
      { cmd: "GRANT ALL PRIVILEGES ON DATABASE boutique TO app;", desc: "Donne tous les droits sur la base" },
      { cmd: "GRANT SELECT ON clients TO lecteur;", desc: "Droit de lecture seule sur une table" }
    ],
    flags: []
  },
  {
    name: "REVOKE",
    os: "postgresql",
    category: "Permissions",
    description: "Retire des privilèges précédemment accordés à un rôle.",
    syntax: "REVOKE <privilège> ON <objet> FROM <rôle>;",
    examples: [
      { cmd: "REVOKE INSERT ON clients FROM lecteur;", desc: "Retire le droit d'insertion" }
    ],
    flags: []
  },
  {
    name: "pg_dump",
    os: "postgresql",
    category: "Fichiers",
    description: "Exporte le contenu d'une base PostgreSQL vers un fichier de sauvegarde.",
    syntax: "pg_dump -U <user> <base> > <fichier.sql>",
    examples: [
      { cmd: "pg_dump -U postgres boutique > boutique.sql", desc: "Sauvegarde au format SQL texte" },
      { cmd: "pg_dump -Fc boutique > boutique.dump", desc: "Sauvegarde au format compressé custom" }
    ],
    flags: ["-Fc (format custom compressé)", "-t (table précise)", "--schema-only", "--data-only"]
  },
  {
    name: "pg_restore",
    os: "postgresql",
    category: "Fichiers",
    description: "Restaure une base PostgreSQL depuis un dump au format custom/tar.",
    syntax: "pg_restore -U <user> -d <base> <fichier.dump>",
    examples: [
      { cmd: "pg_restore -U postgres -d boutique boutique.dump", desc: "Restaure le dump dans la base" },
      { cmd: "pg_restore --clean -d boutique boutique.dump", desc: "Supprime les objets existants avant restauration" }
    ],
    flags: ["-d (base cible)", "--clean", "-j (parallélisme)"]
  },
  {
    name: "pg_dumpall",
    os: "postgresql",
    category: "Fichiers",
    description: "Exporte toutes les bases et les rôles globaux d'un serveur PostgreSQL.",
    syntax: "pg_dumpall -U <user> > <fichier.sql>",
    examples: [
      { cmd: "pg_dumpall -U postgres > full_backup.sql", desc: "Sauvegarde complète du cluster" }
    ],
    flags: ["--roles-only", "--globals-only"]
  },
  {
    name: "createdb",
    os: "postgresql",
    category: "Bases de données",
    description: "Crée une base de données depuis le shell, sans passer par psql.",
    syntax: "createdb -U <user> <nom>",
    examples: [
      { cmd: "createdb -U postgres boutique", desc: "Crée la base 'boutique'" }
    ],
    flags: ["-O (propriétaire)", "-E (encodage)"]
  },
  {
    name: "dropdb",
    os: "postgresql",
    category: "Bases de données",
    description: "Supprime une base de données depuis le shell.",
    syntax: "dropdb -U <user> <nom>",
    examples: [
      { cmd: "dropdb -U postgres test", desc: "Supprime la base 'test'" }
    ],
    flags: ["--if-exists"]
  },
  {
    name: "pg_isready",
    os: "postgresql",
    category: "Système",
    description: "Vérifie si un serveur PostgreSQL est démarré et accepte les connexions.",
    syntax: "pg_isready [-h <hôte>] [-p <port>]",
    examples: [
      { cmd: "pg_isready -h localhost -p 5432", desc: "Teste la disponibilité du serveur local" }
    ],
    flags: []
  },
  {
    name: "pg_ctl",
    os: "postgresql",
    category: "Services",
    description: "Démarre, arrête ou recharge un serveur PostgreSQL directement (hors systemd).",
    syntax: "pg_ctl <start|stop|restart|reload> -D <datadir>",
    examples: [
      { cmd: "pg_ctl start -D /var/lib/postgresql/data", desc: "Démarre le serveur sur ce datadir" },
      { cmd: "pg_ctl reload -D /var/lib/postgresql/data", desc: "Recharge la config sans coupure" }
    ],
    flags: ["-D (répertoire de données)", "-l (fichier de log)"]
  },
  {
    name: "VACUUM",
    os: "postgresql",
    category: "Système",
    description: "Récupère l'espace disque des lignes mortes et met à jour les statistiques du planificateur.",
    syntax: "VACUUM [ANALYZE] [<table>];",
    examples: [
      { cmd: "VACUUM ANALYZE;", desc: "Nettoie et recalcule les statistiques de toute la base" },
      { cmd: "VACUUM FULL clients;", desc: "Compacte réellement la table sur disque (verrouille la table)" }
    ],
    flags: ["FULL (compactage complet)", "ANALYZE (recalcule les stats)"]
  },
  {
    name: "EXPLAIN",
    os: "postgresql",
    category: "Système",
    description: "Affiche le plan d'exécution d'une requête pour diagnostiquer ses performances.",
    syntax: "EXPLAIN [ANALYZE] <requête>;",
    examples: [
      { cmd: "EXPLAIN ANALYZE SELECT * FROM clients WHERE email = 'a@b.com';", desc: "Exécute réellement la requête et affiche les temps" }
    ],
    flags: ["ANALYZE (exécute vraiment la requête)", "BUFFERS (statistiques de cache)"]
  },
  {
    name: "\\timing",
    os: "postgresql",
    category: "Système",
    description: "Affiche le temps d'exécution de chaque requête dans psql.",
    syntax: "\\timing [on|off]",
    examples: [
      { cmd: "\\timing on", desc: "Active l'affichage du temps après chaque requête" }
    ],
    flags: []
  },

  // ── REDIS ─────────────────────────────────────────────────
  {
    name: "redis-cli",
    os: "redis",
    category: "Bases de données",
    description: "Client interactif en ligne de commande pour Redis.",
    syntax: "redis-cli [-h <hôte>] [-p <port>] [-a <mdp>]",
    examples: [
      { cmd: "redis-cli", desc: "Connexion locale sur le port par défaut (6379)" },
      { cmd: "redis-cli -h cache.exemple.com -a secret", desc: "Connexion distante avec mot de passe" }
    ],
    flags: ["-h (hôte)", "-p (port)", "-a (mot de passe)", "-n (numéro de base)"]
  },
  {
    name: "PING",
    os: "redis",
    category: "Système",
    description: "Teste si le serveur Redis répond ; renvoie PONG si tout va bien.",
    syntax: "PING",
    examples: [
      { cmd: "PING", desc: "Vérifie que le serveur est vivant" }
    ],
    flags: []
  },
  {
    name: "SET",
    os: "redis",
    category: "Bases de données",
    description: "Stocke une valeur sous une clé, avec expiration optionnelle.",
    syntax: "SET <clé> <valeur> [EX <secondes>]",
    examples: [
      { cmd: "SET session:42 \"actif\"", desc: "Stocke une valeur simple" },
      { cmd: "SET session:42 \"actif\" EX 3600", desc: "Stocke avec expiration dans 1 heure" }
    ],
    flags: ["EX (expiration en secondes)", "NX (seulement si absente)", "XX (seulement si existante)"]
  },
  {
    name: "GET",
    os: "redis",
    category: "Bases de données",
    description: "Récupère la valeur associée à une clé.",
    syntax: "GET <clé>",
    examples: [
      { cmd: "GET session:42", desc: "Lit la valeur de la clé" }
    ],
    flags: []
  },
  {
    name: "DEL",
    os: "redis",
    category: "Bases de données",
    description: "Supprime une ou plusieurs clés.",
    syntax: "DEL <clé> [clé...]",
    examples: [
      { cmd: "DEL session:42", desc: "Supprime une clé" },
      { cmd: "DEL cache:1 cache:2 cache:3", desc: "Supprime plusieurs clés en une commande" }
    ],
    flags: []
  },
  {
    name: "EXPIRE",
    os: "redis",
    category: "Bases de données",
    description: "Définit une durée de vie (TTL) sur une clé existante.",
    syntax: "EXPIRE <clé> <secondes>",
    examples: [
      { cmd: "EXPIRE session:42 1800", desc: "La clé expirera dans 30 minutes" }
    ],
    flags: []
  },
  {
    name: "TTL",
    os: "redis",
    category: "Bases de données",
    description: "Affiche le temps restant avant expiration d'une clé, en secondes.",
    syntax: "TTL <clé>",
    examples: [
      { cmd: "TTL session:42", desc: "-1 si pas d'expiration, -2 si la clé n'existe pas" }
    ],
    flags: []
  },
  {
    name: "KEYS",
    os: "redis",
    category: "Bases de données",
    description: "Liste les clés correspondant à un motif (déconseillé en production, préférer SCAN).",
    syntax: "KEYS <motif>",
    examples: [
      { cmd: "KEYS session:*", desc: "Liste toutes les clés commençant par 'session:'" }
    ],
    flags: []
  },
  {
    name: "SCAN",
    os: "redis",
    category: "Bases de données",
    description: "Parcourt les clés de façon incrémentale sans bloquer le serveur (alternative sûre à KEYS).",
    syntax: "SCAN <curseur> [MATCH <motif>] [COUNT <n>]",
    examples: [
      { cmd: "SCAN 0 MATCH session:* COUNT 100", desc: "Démarre un parcours filtré par motif" }
    ],
    flags: ["MATCH (filtre par motif)", "COUNT (taille de lot)"]
  },
  {
    name: "INCR",
    os: "redis",
    category: "Bases de données",
    description: "Incrémente atomiquement un compteur entier de 1.",
    syntax: "INCR <clé>",
    examples: [
      { cmd: "INCR compteur:visites", desc: "Incrémente le compteur, utile pour les stats en temps réel" }
    ],
    flags: []
  },
  {
    name: "LPUSH",
    os: "redis",
    category: "Bases de données",
    description: "Ajoute un ou plusieurs éléments en tête d'une liste.",
    syntax: "LPUSH <clé> <valeur> [valeur...]",
    examples: [
      { cmd: "LPUSH file:taches \"envoyer email\"", desc: "Ajoute une tâche en tête de file" }
    ],
    flags: []
  },
  {
    name: "LRANGE",
    os: "redis",
    category: "Bases de données",
    description: "Affiche une plage d'éléments d'une liste.",
    syntax: "LRANGE <clé> <début> <fin>",
    examples: [
      { cmd: "LRANGE file:taches 0 -1", desc: "Affiche tous les éléments de la liste" }
    ],
    flags: []
  },
  {
    name: "HSET",
    os: "redis",
    category: "Bases de données",
    description: "Définit un ou plusieurs champs dans une table de hachage (hash).",
    syntax: "HSET <clé> <champ> <valeur> [champ valeur...]",
    examples: [
      { cmd: "HSET user:42 nom \"Tom\" role \"admin\"", desc: "Stocke plusieurs champs d'un objet utilisateur" }
    ],
    flags: []
  },
  {
    name: "HGETALL",
    os: "redis",
    category: "Bases de données",
    description: "Récupère tous les champs et valeurs d'une table de hachage.",
    syntax: "HGETALL <clé>",
    examples: [
      { cmd: "HGETALL user:42", desc: "Affiche tous les champs de l'objet utilisateur" }
    ],
    flags: []
  },
  {
    name: "SADD",
    os: "redis",
    category: "Bases de données",
    description: "Ajoute un ou plusieurs membres à un ensemble (set) non ordonné.",
    syntax: "SADD <clé> <membre> [membre...]",
    examples: [
      { cmd: "SADD tags:article1 \"linux\" \"devops\"", desc: "Ajoute des tags uniques à un article" }
    ],
    flags: []
  },
  {
    name: "ZADD",
    os: "redis",
    category: "Bases de données",
    description: "Ajoute un membre à un ensemble ordonné (sorted set) avec un score.",
    syntax: "ZADD <clé> <score> <membre>",
    examples: [
      { cmd: "ZADD classement 1500 \"tom\"", desc: "Ajoute un joueur avec son score, pour un leaderboard" }
    ],
    flags: []
  },
  {
    name: "ZRANGE",
    os: "redis",
    category: "Bases de données",
    description: "Affiche les membres d'un ensemble ordonné, triés par score croissant.",
    syntax: "ZRANGE <clé> <début> <fin> [WITHSCORES]",
    examples: [
      { cmd: "ZRANGE classement 0 9 WITHSCORES", desc: "Top 10 avec leurs scores" }
    ],
    flags: ["WITHSCORES", "REV (ordre décroissant)"]
  },
  {
    name: "EXISTS",
    os: "redis",
    category: "Bases de données",
    description: "Vérifie si une clé existe.",
    syntax: "EXISTS <clé>",
    examples: [
      { cmd: "EXISTS session:42", desc: "Renvoie 1 si la clé existe, 0 sinon" }
    ],
    flags: []
  },
  {
    name: "FLUSHDB",
    os: "redis",
    category: "Système",
    description: "Vide entièrement la base de données courante. Irréversible.",
    syntax: "FLUSHDB",
    examples: [
      { cmd: "FLUSHDB", desc: "Supprime toutes les clés de la base sélectionnée (attention en prod)" }
    ],
    flags: []
  },
  {
    name: "INFO",
    os: "redis",
    category: "Système",
    description: "Affiche des statistiques et informations sur le serveur Redis.",
    syntax: "INFO [section]",
    examples: [
      { cmd: "INFO memory", desc: "Affiche l'utilisation mémoire du serveur" },
      { cmd: "INFO replication", desc: "État de la réplication maître/esclave" }
    ],
    flags: []
  },
  {
    name: "CONFIG GET",
    os: "redis",
    category: "Système",
    description: "Affiche la valeur d'un ou plusieurs paramètres de configuration.",
    syntax: "CONFIG GET <paramètre>",
    examples: [
      { cmd: "CONFIG GET maxmemory", desc: "Affiche la limite mémoire configurée" }
    ],
    flags: []
  },
  {
    name: "CONFIG SET",
    os: "redis",
    category: "Système",
    description: "Modifie un paramètre de configuration à chaud, sans redémarrer le serveur.",
    syntax: "CONFIG SET <paramètre> <valeur>",
    examples: [
      { cmd: "CONFIG SET maxmemory-policy allkeys-lru", desc: "Change la stratégie d'éviction mémoire" }
    ],
    flags: []
  },
  {
    name: "SAVE",
    os: "redis",
    category: "Fichiers",
    description: "Sauvegarde immédiatement l'état de la base sur disque (bloque le serveur).",
    syntax: "SAVE",
    examples: [
      { cmd: "SAVE", desc: "Force un snapshot RDB synchrone" }
    ],
    flags: []
  },
  {
    name: "BGSAVE",
    os: "redis",
    category: "Fichiers",
    description: "Sauvegarde l'état de la base sur disque en arrière-plan, sans bloquer les clients.",
    syntax: "BGSAVE",
    examples: [
      { cmd: "BGSAVE", desc: "Lance un snapshot RDB dans un processus enfant" }
    ],
    flags: []
  },
  {
    name: "SUBSCRIBE",
    os: "redis",
    category: "Réseau",
    description: "S'abonne à un ou plusieurs canaux pour recevoir des messages publiés (pub/sub).",
    syntax: "SUBSCRIBE <canal> [canal...]",
    examples: [
      { cmd: "SUBSCRIBE notifications", desc: "Écoute les messages publiés sur le canal 'notifications'" }
    ],
    flags: []
  },
  {
    name: "AUTH",
    os: "redis",
    category: "Sécurité",
    description: "S'authentifie auprès du serveur Redis protégé par mot de passe.",
    syntax: "AUTH [utilisateur] <mot de passe>",
    examples: [
      { cmd: "AUTH secret", desc: "Authentification avec le mot de passe global" },
      { cmd: "AUTH app secret", desc: "Authentification ACL avec un utilisateur nommé" }
    ],
    flags: []
  },

  // ── MONGODB ───────────────────────────────────────────────
  {
    name: "mongosh",
    os: "mongodb",
    category: "Bases de données",
    description: "Shell interactif moderne pour se connecter et administrer MongoDB.",
    syntax: "mongosh [\"<uri>\"] [--username <user>]",
    examples: [
      { cmd: "mongosh", desc: "Connexion locale sur le port par défaut (27017)" },
      { cmd: "mongosh \"mongodb://user:pass@host:27017/prod\"", desc: "Connexion via une URI complète" }
    ],
    flags: ["--username", "--password", "--authenticationDatabase"]
  },
  {
    name: "show dbs",
    os: "mongodb",
    category: "Bases de données",
    description: "Liste les bases de données disponibles sur le serveur.",
    syntax: "show dbs",
    examples: [
      { cmd: "show dbs", desc: "Affiche chaque base avec sa taille approximative" }
    ],
    flags: []
  },
  {
    name: "use",
    os: "mongodb",
    category: "Bases de données",
    description: "Sélectionne (ou crée implicitement) la base de données courante.",
    syntax: "use <base>",
    examples: [
      { cmd: "use boutique", desc: "Bascule sur la base 'boutique'" }
    ],
    flags: []
  },
  {
    name: "show collections",
    os: "mongodb",
    category: "Bases de données",
    description: "Liste les collections de la base courante.",
    syntax: "show collections",
    examples: [
      { cmd: "show collections", desc: "Affiche toutes les collections de la base sélectionnée" }
    ],
    flags: []
  },
  {
    name: "db.createCollection",
    os: "mongodb",
    category: "Bases de données",
    description: "Crée explicitement une collection, avec options de validation éventuelles.",
    syntax: "db.createCollection(\"<nom>\", { options })",
    examples: [
      { cmd: "db.createCollection(\"clients\")", desc: "Crée une collection vide" }
    ],
    flags: []
  },
  {
    name: "db.insertOne",
    os: "mongodb",
    category: "Bases de données",
    description: "Insère un seul document dans une collection.",
    syntax: "db.<collection>.insertOne({ ... })",
    examples: [
      { cmd: "db.clients.insertOne({ nom: \"Tom\", actif: true })", desc: "Ajoute un document client" }
    ],
    flags: []
  },
  {
    name: "db.insertMany",
    os: "mongodb",
    category: "Bases de données",
    description: "Insère plusieurs documents en une seule opération.",
    syntax: "db.<collection>.insertMany([{ ... }, { ... }])",
    examples: [
      { cmd: "db.clients.insertMany([{nom:\"A\"},{nom:\"B\"}])", desc: "Insère deux documents d'un coup" }
    ],
    flags: []
  },
  {
    name: "db.find",
    os: "mongodb",
    category: "Bases de données",
    description: "Recherche des documents correspondant à un filtre dans une collection.",
    syntax: "db.<collection>.find({ filtre }).pretty()",
    examples: [
      { cmd: "db.clients.find({ actif: true })", desc: "Trouve tous les clients actifs" },
      { cmd: "db.clients.find().limit(10)", desc: "Limite le résultat aux 10 premiers documents" }
    ],
    flags: [".limit()", ".sort()", ".pretty()"]
  },
  {
    name: "db.findOne",
    os: "mongodb",
    category: "Bases de données",
    description: "Recherche et renvoie un seul document correspondant au filtre.",
    syntax: "db.<collection>.findOne({ filtre })",
    examples: [
      { cmd: "db.clients.findOne({ email: \"a@b.com\" })", desc: "Trouve le premier client avec cet email" }
    ],
    flags: []
  },
  {
    name: "db.updateOne",
    os: "mongodb",
    category: "Bases de données",
    description: "Met à jour le premier document correspondant au filtre.",
    syntax: "db.<collection>.updateOne({ filtre }, { $set: { ... } })",
    examples: [
      { cmd: "db.clients.updateOne({ nom: \"Tom\" }, { $set: { actif: false } })", desc: "Désactive un client précis" }
    ],
    flags: []
  },
  {
    name: "db.updateMany",
    os: "mongodb",
    category: "Bases de données",
    description: "Met à jour tous les documents correspondant au filtre.",
    syntax: "db.<collection>.updateMany({ filtre }, { $set: { ... } })",
    examples: [
      { cmd: "db.clients.updateMany({}, { $set: { migre: true } })", desc: "Marque tous les documents comme migrés" }
    ],
    flags: []
  },
  {
    name: "db.deleteOne",
    os: "mongodb",
    category: "Bases de données",
    description: "Supprime le premier document correspondant au filtre.",
    syntax: "db.<collection>.deleteOne({ filtre })",
    examples: [
      { cmd: "db.clients.deleteOne({ nom: \"Test\" })", desc: "Supprime un document de test" }
    ],
    flags: []
  },
  {
    name: "db.deleteMany",
    os: "mongodb",
    category: "Bases de données",
    description: "Supprime tous les documents correspondant au filtre.",
    syntax: "db.<collection>.deleteMany({ filtre })",
    examples: [
      { cmd: "db.logs.deleteMany({ date: { $lt: ISODate(\"2025-01-01\") } })", desc: "Purge les vieux logs" }
    ],
    flags: []
  },
  {
    name: "db.countDocuments",
    os: "mongodb",
    category: "Bases de données",
    description: "Compte le nombre de documents correspondant à un filtre.",
    syntax: "db.<collection>.countDocuments({ filtre })",
    examples: [
      { cmd: "db.clients.countDocuments({ actif: true })", desc: "Compte les clients actifs" }
    ],
    flags: []
  },
  {
    name: "db.createIndex",
    os: "mongodb",
    category: "Bases de données",
    description: "Crée un index sur un ou plusieurs champs pour accélérer les requêtes.",
    syntax: "db.<collection>.createIndex({ champ: 1 })",
    examples: [
      { cmd: "db.clients.createIndex({ email: 1 }, { unique: true })", desc: "Index unique sur l'email" }
    ],
    flags: ["1 (ascendant)", "-1 (descendant)", "unique: true"]
  },
  {
    name: "db.aggregate",
    os: "mongodb",
    category: "Bases de données",
    description: "Exécute un pipeline d'agrégation (filtrage, regroupement, calculs) sur une collection.",
    syntax: "db.<collection>.aggregate([ { $match: {} }, { $group: {} } ])",
    examples: [
      { cmd: "db.ventes.aggregate([{ $group: { _id: \"$produit\", total: { $sum: \"$montant\" } } }])", desc: "Total des ventes par produit" }
    ],
    flags: []
  },
  {
    name: "db.dropDatabase",
    os: "mongodb",
    category: "Bases de données",
    description: "Supprime définitivement la base de données courante.",
    syntax: "db.dropDatabase()",
    examples: [
      { cmd: "db.dropDatabase()", desc: "Supprime la base actuellement sélectionnée" }
    ],
    flags: []
  },
  {
    name: "mongodump",
    os: "mongodb",
    category: "Fichiers",
    description: "Exporte une base MongoDB au format binaire BSON pour sauvegarde.",
    syntax: "mongodump --db <base> --out <dossier>",
    examples: [
      { cmd: "mongodump --db boutique --out ./backup", desc: "Sauvegarde la base dans ./backup" }
    ],
    flags: ["--db", "--collection", "--gzip"]
  },
  {
    name: "mongorestore",
    os: "mongodb",
    category: "Fichiers",
    description: "Restaure une base MongoDB depuis un dump BSON.",
    syntax: "mongorestore --db <base> <dossier>",
    examples: [
      { cmd: "mongorestore --db boutique ./backup/boutique", desc: "Restaure la base depuis un dump" }
    ],
    flags: ["--drop (supprime avant restauration)"]
  },
  {
    name: "mongoexport",
    os: "mongodb",
    category: "Fichiers",
    description: "Exporte une collection au format JSON ou CSV, lisible hors MongoDB.",
    syntax: "mongoexport --db <base> --collection <coll> --out <fichier>",
    examples: [
      { cmd: "mongoexport --db boutique --collection clients --out clients.json", desc: "Exporte en JSON" }
    ],
    flags: ["--type=csv", "--fields"]
  },
  {
    name: "mongoimport",
    os: "mongodb",
    category: "Fichiers",
    description: "Importe des données JSON ou CSV dans une collection MongoDB.",
    syntax: "mongoimport --db <base> --collection <coll> --file <fichier>",
    examples: [
      { cmd: "mongoimport --db boutique --collection clients --file clients.json", desc: "Importe un fichier JSON" }
    ],
    flags: ["--type=csv", "--headerline"]
  },
  {
    name: "db.createUser",
    os: "mongodb",
    category: "Utilisateurs",
    description: "Crée un utilisateur avec des rôles spécifiques sur la base courante.",
    syntax: "db.createUser({ user: \"<nom>\", pwd: \"<mdp>\", roles: [...] })",
    examples: [
      { cmd: "db.createUser({ user: \"app\", pwd: \"secret\", roles: [\"readWrite\"] })", desc: "Utilisateur applicatif en lecture/écriture" }
    ],
    flags: []
  },
  {
    name: "rs.status",
    os: "mongodb",
    category: "Services",
    description: "Affiche l'état d'un replica set : membre primaire, secondaires, santé.",
    syntax: "rs.status()",
    examples: [
      { cmd: "rs.status()", desc: "Vérifie quel nœud est primaire et l'état de réplication" }
    ],
    flags: []
  },

  // ── GOOGLE CLOUD CLI (gcloud / gsutil) ───────────────────
  {
    name: "gcloud init",
    os: "gcloud",
    category: "Système",
    description: "Assistant de première configuration de la CLI Google Cloud : compte, projet, région par défaut.",
    syntax: "gcloud init",
    examples: [
      { cmd: "gcloud init", desc: "Lance l'assistant interactif de configuration" }
    ],
    flags: []
  },
  {
    name: "gcloud auth login",
    os: "gcloud",
    category: "Sécurité",
    description: "Authentifie un utilisateur auprès de Google Cloud via un navigateur web.",
    syntax: "gcloud auth login",
    examples: [
      { cmd: "gcloud auth login", desc: "Ouvre le navigateur pour se connecter au compte Google" }
    ],
    flags: []
  },
  {
    name: "gcloud auth activate-service-account",
    os: "gcloud",
    category: "Sécurité",
    description: "Authentifie la CLI avec un compte de service via un fichier de clé JSON, pour l'automatisation.",
    syntax: "gcloud auth activate-service-account --key-file=<fichier.json>",
    examples: [
      { cmd: "gcloud auth activate-service-account --key-file=sa.json", desc: "Connexion non-interactive pour CI/CD" }
    ],
    flags: ["--key-file"]
  },
  {
    name: "gcloud config set project",
    os: "gcloud",
    category: "Système",
    description: "Définit le projet Google Cloud actif par défaut pour toutes les commandes suivantes.",
    syntax: "gcloud config set project <id-projet>",
    examples: [
      { cmd: "gcloud config set project mon-projet-123", desc: "Toutes les commandes cibleront ce projet" }
    ],
    flags: []
  },
  {
    name: "gcloud config list",
    os: "gcloud",
    category: "Système",
    description: "Affiche la configuration active : projet, compte, région/zone par défaut.",
    syntax: "gcloud config list",
    examples: [
      { cmd: "gcloud config list", desc: "Vérifie rapidement sur quel projet/compte on travaille" }
    ],
    flags: []
  },
  {
    name: "gcloud projects list",
    os: "gcloud",
    category: "Système",
    description: "Liste tous les projets Google Cloud accessibles au compte connecté.",
    syntax: "gcloud projects list",
    examples: [
      { cmd: "gcloud projects list", desc: "Affiche l'ID, le nom et le numéro de chaque projet" }
    ],
    flags: []
  },
  {
    name: "gcloud compute instances list",
    os: "gcloud",
    category: "Système",
    description: "Liste les machines virtuelles Compute Engine du projet actif.",
    syntax: "gcloud compute instances list",
    examples: [
      { cmd: "gcloud compute instances list", desc: "Affiche nom, zone, statut et IP de chaque VM" }
    ],
    flags: ["--filter", "--zones"]
  },
  {
    name: "gcloud compute instances create",
    os: "gcloud",
    category: "Système",
    description: "Crée une nouvelle machine virtuelle Compute Engine.",
    syntax: "gcloud compute instances create <nom> --zone=<zone> --machine-type=<type>",
    examples: [
      { cmd: "gcloud compute instances create web1 --zone=europe-west1-b --machine-type=e2-medium", desc: "Crée une VM en Belgique" }
    ],
    flags: ["--zone", "--machine-type", "--image-family", "--boot-disk-size"]
  },
  {
    name: "gcloud compute instances delete",
    os: "gcloud",
    category: "Système",
    description: "Supprime définitivement une ou plusieurs instances Compute Engine.",
    syntax: "gcloud compute instances delete <nom> --zone=<zone>",
    examples: [
      { cmd: "gcloud compute instances delete web1 --zone=europe-west1-b", desc: "Supprime la VM après confirmation" }
    ],
    flags: ["--quiet (sans confirmation)"]
  },
  {
    name: "gcloud compute instances start",
    os: "gcloud",
    category: "Système",
    description: "Démarre une instance Compute Engine arrêtée.",
    syntax: "gcloud compute instances start <nom> --zone=<zone>",
    examples: [
      { cmd: "gcloud compute instances start web1 --zone=europe-west1-b", desc: "Redémarre la VM" }
    ],
    flags: []
  },
  {
    name: "gcloud compute instances stop",
    os: "gcloud",
    category: "Système",
    description: "Arrête une instance Compute Engine sans la supprimer (arrête la facturation du CPU).",
    syntax: "gcloud compute instances stop <nom> --zone=<zone>",
    examples: [
      { cmd: "gcloud compute instances stop web1 --zone=europe-west1-b", desc: "Coupe la VM en fin de journée pour économiser" }
    ],
    flags: []
  },
  {
    name: "gcloud compute ssh",
    os: "gcloud",
    category: "Réseau",
    description: "Ouvre une connexion SSH vers une instance Compute Engine, avec gestion automatique des clés.",
    syntax: "gcloud compute ssh <nom> --zone=<zone>",
    examples: [
      { cmd: "gcloud compute ssh web1 --zone=europe-west1-b", desc: "Se connecte à la VM sans configurer SSH manuellement" }
    ],
    flags: ["--zone", "--tunnel-through-iap"]
  },
  {
    name: "gcloud container clusters create",
    os: "gcloud",
    category: "Conteneurs",
    description: "Crée un cluster Kubernetes managé (GKE).",
    syntax: "gcloud container clusters create <nom> --num-nodes=<n> --zone=<zone>",
    examples: [
      { cmd: "gcloud container clusters create prod --num-nodes=3 --zone=europe-west1-b", desc: "Cluster GKE de 3 nœuds" }
    ],
    flags: ["--num-nodes", "--machine-type", "--zone / --region"]
  },
  {
    name: "gcloud container clusters get-credentials",
    os: "gcloud",
    category: "Conteneurs",
    description: "Configure kubectl pour pointer vers un cluster GKE existant.",
    syntax: "gcloud container clusters get-credentials <nom> --zone=<zone>",
    examples: [
      { cmd: "gcloud container clusters get-credentials prod --zone=europe-west1-b", desc: "kubectl cible désormais ce cluster" }
    ],
    flags: []
  },
  {
    name: "gsutil ls",
    os: "gcloud",
    category: "Fichiers",
    description: "Liste le contenu d'un bucket ou des buckets Google Cloud Storage.",
    syntax: "gsutil ls [gs://<bucket>/]",
    examples: [
      { cmd: "gsutil ls", desc: "Liste tous les buckets du projet" },
      { cmd: "gsutil ls gs://mon-bucket/", desc: "Liste le contenu d'un bucket précis" }
    ],
    flags: ["-l (détails)", "-r (récursif)"]
  },
  {
    name: "gsutil cp",
    os: "gcloud",
    category: "Fichiers",
    description: "Copie des fichiers vers ou depuis Google Cloud Storage.",
    syntax: "gsutil cp <source> <destination>",
    examples: [
      { cmd: "gsutil cp app.zip gs://mon-bucket/", desc: "Envoie un fichier local vers le bucket" },
      { cmd: "gsutil cp -r ./dist gs://mon-bucket/site", desc: "Envoie un dossier entier récursivement" }
    ],
    flags: ["-r (récursif)", "-m (parallélisation)"]
  },
  {
    name: "gsutil mb",
    os: "gcloud",
    category: "Fichiers",
    description: "Crée (make bucket) un nouveau bucket Google Cloud Storage.",
    syntax: "gsutil mb -l <région> gs://<bucket>/",
    examples: [
      { cmd: "gsutil mb -l europe-west1 gs://mon-bucket/", desc: "Crée un bucket dans la région Belgique" }
    ],
    flags: ["-l (région)", "-c (classe de stockage)"]
  },
  {
    name: "gcloud iam service-accounts create",
    os: "gcloud",
    category: "Utilisateurs",
    description: "Crée un compte de service pour l'authentification programmatique.",
    syntax: "gcloud iam service-accounts create <nom> --display-name=\"<label>\"",
    examples: [
      { cmd: "gcloud iam service-accounts create ci-deploy --display-name=\"CI Deploy\"", desc: "Compte dédié aux déploiements CI/CD" }
    ],
    flags: []
  },
  {
    name: "gcloud iam service-accounts keys create",
    os: "gcloud",
    category: "Sécurité",
    description: "Génère une clé JSON pour un compte de service, utilisable pour l'authentification hors ligne.",
    syntax: "gcloud iam service-accounts keys create <fichier.json> --iam-account=<compte>",
    examples: [
      { cmd: "gcloud iam service-accounts keys create sa.json --iam-account=ci-deploy@mon-projet.iam.gserviceaccount.com", desc: "Génère la clé à stocker en secret CI" }
    ],
    flags: []
  },
  {
    name: "gcloud projects add-iam-policy-binding",
    os: "gcloud",
    category: "Permissions",
    description: "Accorde un rôle IAM à un utilisateur ou compte de service sur un projet.",
    syntax: "gcloud projects add-iam-policy-binding <projet> --member=<membre> --role=<rôle>",
    examples: [
      { cmd: "gcloud projects add-iam-policy-binding mon-projet --member=\"serviceAccount:ci-deploy@mon-projet.iam.gserviceaccount.com\" --role=\"roles/editor\"", desc: "Donne le rôle éditeur au compte de service" }
    ],
    flags: ["--member", "--role"]
  },
  {
    name: "gcloud sql instances create",
    os: "gcloud",
    category: "Bases de données",
    description: "Crée une instance de base de données managée Cloud SQL (MySQL, PostgreSQL, SQL Server).",
    syntax: "gcloud sql instances create <nom> --database-version=<version> --tier=<niveau>",
    examples: [
      { cmd: "gcloud sql instances create prod-db --database-version=POSTGRES_15 --tier=db-f1-micro", desc: "Instance PostgreSQL managée" }
    ],
    flags: ["--database-version", "--tier", "--region"]
  },
  {
    name: "gcloud sql connect",
    os: "gcloud",
    category: "Bases de données",
    description: "Ouvre une connexion interactive vers une instance Cloud SQL via le client approprié.",
    syntax: "gcloud sql connect <instance> --user=<user>",
    examples: [
      { cmd: "gcloud sql connect prod-db --user=postgres", desc: "Ouvre psql vers l'instance managée" }
    ],
    flags: []
  },
  {
    name: "gcloud functions deploy",
    os: "gcloud",
    category: "Développement",
    description: "Déploie une fonction serverless (Cloud Functions) depuis le code local.",
    syntax: "gcloud functions deploy <nom> --runtime=<runtime> --trigger-http",
    examples: [
      { cmd: "gcloud functions deploy hello --runtime=nodejs20 --trigger-http --allow-unauthenticated", desc: "Déploie une fonction HTTP publique" }
    ],
    flags: ["--runtime", "--trigger-http", "--trigger-topic"]
  },
  {
    name: "gcloud run deploy",
    os: "gcloud",
    category: "Conteneurs",
    description: "Déploie un conteneur sur Cloud Run, la plateforme serverless de conteneurs de Google.",
    syntax: "gcloud run deploy <nom> --image=<image> --region=<région>",
    examples: [
      { cmd: "gcloud run deploy api --image=gcr.io/mon-projet/api --region=europe-west1 --allow-unauthenticated", desc: "Déploie un conteneur accessible publiquement" }
    ],
    flags: ["--image", "--region", "--allow-unauthenticated", "--memory"]
  },
  {
    name: "gcloud builds submit",
    os: "gcloud",
    category: "Développement",
    description: "Lance une build Cloud Build à partir du répertoire courant, souvent pour construire une image Docker.",
    syntax: "gcloud builds submit --tag=<image>",
    examples: [
      { cmd: "gcloud builds submit --tag=gcr.io/mon-projet/api", desc: "Construit et pousse l'image vers le registre" }
    ],
    flags: ["--tag", "--config (cloudbuild.yaml)"]
  },
  {
    name: "gcloud logging read",
    os: "gcloud",
    category: "Système",
    description: "Interroge les journaux Cloud Logging avec un filtre.",
    syntax: "gcloud logging read \"<filtre>\" --limit=<n>",
    examples: [
      { cmd: "gcloud logging read \"severity>=ERROR\" --limit=20", desc: "Affiche les 20 dernières erreurs" }
    ],
    flags: ["--limit", "--format"]
  },
  {
    name: "gcloud services enable",
    os: "gcloud",
    category: "Système",
    description: "Active une API Google Cloud pour le projet courant (obligatoire avant de l'utiliser).",
    syntax: "gcloud services enable <api>",
    examples: [
      { cmd: "gcloud services enable compute.googleapis.com", desc: "Active l'API Compute Engine sur le projet" }
    ],
    flags: []
  },
  {
    name: "gcloud services list",
    os: "gcloud",
    category: "Système",
    description: "Liste les API activées sur le projet courant.",
    syntax: "gcloud services list --enabled",
    examples: [
      { cmd: "gcloud services list --enabled", desc: "Affiche toutes les API actives" }
    ],
    flags: ["--enabled", "--available"]
  },
  {
    name: "gcloud compute firewall-rules create",
    os: "gcloud",
    category: "Sécurité",
    description: "Crée une règle de pare-feu réseau pour autoriser ou bloquer du trafic vers les VM.",
    syntax: "gcloud compute firewall-rules create <nom> --allow=<protocole:port>",
    examples: [
      { cmd: "gcloud compute firewall-rules create allow-http --allow=tcp:80,tcp:443", desc: "Ouvre les ports web au trafic entrant" }
    ],
    flags: ["--allow", "--source-ranges", "--target-tags"]
  },
  {
    name: "gcloud components update",
    os: "gcloud",
    category: "Système",
    description: "Met à jour la CLI gcloud et ses composants installés vers la dernière version.",
    syntax: "gcloud components update",
    examples: [
      { cmd: "gcloud components update", desc: "Met à jour gcloud et ses plugins (kubectl, etc.)" }
    ],
    flags: []
  },

];

// Fusion dans le tableau global COMMANDS (chargé par data.js)
if (typeof COMMANDS !== "undefined") {
  COMMANDS.push.apply(COMMANDS, EXTRA_COMMANDS_2);
}
