/* MANPAGES.EXE — data-extra.js
   Pack d'extension v2 : Cisco IOS · Proxmox VE · MySQL/MariaDB · Nginx ·
   OpenSSL · tcpdump · iptables/nftables · tmux · Vim · npm · Python.
   Chargé APRÈS data.js : les commandes sont fusionnées dans COMMANDS. */

const EXTRA_COMMANDS = [

  // ── CISCO IOS ─────────────────────────────────────────────
  {
    name: "enable",
    os: "cisco",
    category: "Système",
    description: "Passe du mode utilisateur (>) au mode privilégié (#) sur un équipement Cisco.",
    syntax: "enable",
    examples: [
      { cmd: "Switch> enable", desc: "Passe en mode privilégié" },
      { cmd: "Switch# disable", desc: "Retourne en mode utilisateur" }
    ],
    flags: []
  },
  {
    name: "configure terminal",
    os: "cisco",
    category: "Système",
    description: "Entre en mode de configuration globale pour modifier la configuration de l'équipement.",
    syntax: "configure terminal",
    examples: [
      { cmd: "Switch# configure terminal", desc: "Entre en mode config (Switch(config)#)" },
      { cmd: "Switch(config)# exit", desc: "Sort du mode configuration" }
    ],
    flags: ["end (retour direct au mode privilégié)", "Ctrl+Z (équivalent de end)"]
  },
  {
    name: "show running-config",
    os: "cisco",
    category: "Système",
    description: "Affiche la configuration actuellement chargée en RAM (non sauvegardée).",
    syntax: "show running-config [section]",
    examples: [
      { cmd: "show running-config", desc: "Toute la config courante" },
      { cmd: "show running-config interface gi0/1", desc: "Config d'une seule interface" },
      { cmd: "show run | include hostname", desc: "Filtre les lignes contenant 'hostname'" }
    ],
    flags: ["| include <motif>", "| section <motif>", "| begin <motif>"]
  },
  {
    name: "copy running-config startup-config",
    os: "cisco",
    category: "Système",
    description: "Sauvegarde la configuration courante (RAM) vers la NVRAM pour survivre au redémarrage.",
    syntax: "copy running-config startup-config",
    examples: [
      { cmd: "copy running-config startup-config", desc: "Sauvegarde la config" },
      { cmd: "write memory", desc: "Ancienne syntaxe équivalente (wr)" }
    ],
    flags: []
  },
  {
    name: "show ip interface brief",
    os: "cisco",
    category: "Réseau",
    description: "Résumé de toutes les interfaces : IP, statut physique (up/down) et protocole.",
    syntax: "show ip interface brief",
    examples: [
      { cmd: "show ip interface brief", desc: "Vue d'ensemble des interfaces" },
      { cmd: "show ip int br | exclude unassigned", desc: "Masque les interfaces sans IP" }
    ],
    flags: []
  },
  {
    name: "interface",
    os: "cisco",
    category: "Réseau",
    description: "Entre en mode configuration d'une interface (ou d'une plage d'interfaces).",
    syntax: "interface <type><numéro>",
    examples: [
      { cmd: "interface gigabitethernet0/1", desc: "Configure Gi0/1" },
      { cmd: "interface range fa0/1 - 12", desc: "Configure les ports 1 à 12 d'un coup" },
      { cmd: "interface vlan 10", desc: "Interface virtuelle du VLAN 10 (SVI)" }
    ],
    flags: ["shutdown (désactive)", "no shutdown (active)", "description <texte>"]
  },
  {
    name: "ip address",
    os: "cisco",
    category: "Réseau",
    description: "Attribue une adresse IP et un masque à une interface (mode config-if).",
    syntax: "ip address <ip> <masque>",
    examples: [
      { cmd: "ip address 192.168.10.1 255.255.255.0", desc: "IP statique sur l'interface" },
      { cmd: "no ip address", desc: "Supprime l'adresse IP" }
    ],
    flags: ["dhcp (obtenir via DHCP)", "secondary (IP secondaire)"]
  },
  {
    name: "vlan",
    os: "cisco",
    category: "Réseau",
    description: "Crée un VLAN et entre dans sa configuration (nom, etc.) sur un switch.",
    syntax: "vlan <id>",
    examples: [
      { cmd: "vlan 10", desc: "Crée le VLAN 10" },
      { cmd: "name COMPTA", desc: "Nomme le VLAN (mode config-vlan)" },
      { cmd: "show vlan brief", desc: "Liste les VLANs et leurs ports" }
    ],
    flags: ["no vlan <id> (supprime)"]
  },
  {
    name: "switchport mode",
    os: "cisco",
    category: "Réseau",
    description: "Définit le mode d'un port de switch : access (poste client) ou trunk (lien inter-switch).",
    syntax: "switchport mode {access|trunk}",
    examples: [
      { cmd: "switchport mode access", desc: "Port en mode access" },
      { cmd: "switchport access vlan 10", desc: "Assigne le port au VLAN 10" },
      { cmd: "switchport mode trunk", desc: "Port en mode trunk (802.1Q)" },
      { cmd: "switchport trunk allowed vlan 10,20,30", desc: "Limite les VLANs du trunk" }
    ],
    flags: ["access", "trunk", "trunk native vlan <id>"]
  },
  {
    name: "show vlan brief",
    os: "cisco",
    category: "Réseau",
    description: "Affiche la liste des VLANs, leur nom, leur statut et les ports associés.",
    syntax: "show vlan brief",
    examples: [
      { cmd: "show vlan brief", desc: "Tableau des VLANs" },
      { cmd: "show interfaces trunk", desc: "Liste les liens trunk actifs" }
    ],
    flags: []
  },
  {
    name: "ip route",
    os: "cisco",
    category: "Réseau",
    description: "Ajoute une route statique dans la table de routage du routeur.",
    syntax: "ip route <réseau> <masque> <passerelle|interface>",
    examples: [
      { cmd: "ip route 0.0.0.0 0.0.0.0 192.168.1.254", desc: "Route par défaut" },
      { cmd: "ip route 10.20.0.0 255.255.255.0 10.0.0.2", desc: "Route statique vers 10.20.0.0/24" },
      { cmd: "show ip route", desc: "Affiche la table de routage" }
    ],
    flags: ["<distance> (distance administrative)", "no ip route (supprime)"]
  },
  {
    name: "show ip route",
    os: "cisco",
    category: "Réseau",
    description: "Affiche la table de routage : routes connectées (C), statiques (S), OSPF (O), etc.",
    syntax: "show ip route [protocole]",
    examples: [
      { cmd: "show ip route", desc: "Toute la table de routage" },
      { cmd: "show ip route ospf", desc: "Seulement les routes OSPF" },
      { cmd: "show ip route 10.20.0.5", desc: "Route utilisée pour joindre cette IP" }
    ],
    flags: ["connected", "static", "ospf", "bgp"]
  },
  {
    name: "router ospf",
    os: "cisco",
    category: "Réseau",
    description: "Active le protocole de routage dynamique OSPF et entre dans sa configuration.",
    syntax: "router ospf <process-id>",
    examples: [
      { cmd: "router ospf 1", desc: "Active OSPF (processus 1)" },
      { cmd: "network 192.168.10.0 0.0.0.255 area 0", desc: "Annonce le réseau dans l'aire 0" },
      { cmd: "show ip ospf neighbor", desc: "Vérifie les voisins OSPF" }
    ],
    flags: ["network <ip> <wildcard> area <n>", "passive-interface <if>", "router-id <ip>"]
  },
  {
    name: "ip dhcp pool",
    os: "cisco",
    category: "Services",
    description: "Crée un pool DHCP sur le routeur pour distribuer des adresses IP aux clients.",
    syntax: "ip dhcp pool <nom>",
    examples: [
      { cmd: "ip dhcp pool LAN", desc: "Crée le pool nommé LAN" },
      { cmd: "network 192.168.10.0 255.255.255.0", desc: "Plage distribuée" },
      { cmd: "default-router 192.168.10.1", desc: "Passerelle donnée aux clients" },
      { cmd: "ip dhcp excluded-address 192.168.10.1 192.168.10.10", desc: "Exclut des adresses (mode global)" }
    ],
    flags: ["network", "default-router", "dns-server", "lease <jours>"]
  },
  {
    name: "access-list",
    os: "cisco",
    category: "Sécurité",
    description: "Crée une ACL (liste de contrôle d'accès) pour filtrer le trafic sur le routeur.",
    syntax: "access-list <numéro> {permit|deny} <critères>",
    examples: [
      { cmd: "access-list 10 permit 192.168.10.0 0.0.0.255", desc: "ACL standard : autorise le réseau" },
      { cmd: "access-list 100 deny tcp any host 10.0.0.5 eq 23", desc: "ACL étendue : bloque Telnet vers le serveur" },
      { cmd: "ip access-group 100 in", desc: "Applique l'ACL sur une interface (config-if)" }
    ],
    flags: ["1-99 (standard)", "100-199 (étendue)", "permit/deny", "eq <port>"]
  },
  {
    name: "show mac address-table",
    os: "cisco",
    category: "Réseau",
    description: "Affiche la table CAM du switch : quelle adresse MAC est apprise sur quel port.",
    syntax: "show mac address-table [dynamic]",
    examples: [
      { cmd: "show mac address-table", desc: "Toute la table MAC" },
      { cmd: "show mac address-table interface gi0/1", desc: "MACs apprises sur un port" }
    ],
    flags: ["dynamic", "interface <if>", "vlan <id>"]
  },
  {
    name: "show cdp neighbors",
    os: "cisco",
    category: "Réseau",
    description: "Découvre les équipements Cisco voisins directement connectés (CDP).",
    syntax: "show cdp neighbors [detail]",
    examples: [
      { cmd: "show cdp neighbors", desc: "Voisins et ports de connexion" },
      { cmd: "show cdp neighbors detail", desc: "Détails : IP, modèle, version IOS" }
    ],
    flags: ["detail"]
  },
  {
    name: "hostname",
    os: "cisco",
    category: "Système",
    description: "Définit le nom de l'équipement (visible dans le prompt).",
    syntax: "hostname <nom>",
    examples: [
      { cmd: "hostname SW-ETAGE1", desc: "Renomme le switch" }
    ],
    flags: []
  },
  {
    name: "enable secret",
    os: "cisco",
    category: "Sécurité",
    description: "Définit le mot de passe (chiffré) exigé pour passer en mode privilégié.",
    syntax: "enable secret <mot-de-passe>",
    examples: [
      { cmd: "enable secret P@ssw0rd!", desc: "Protège le mode enable" },
      { cmd: "service password-encryption", desc: "Chiffre les autres mots de passe de la config" }
    ],
    flags: []
  },
  {
    name: "line vty",
    os: "cisco",
    category: "Sécurité",
    description: "Configure les lignes virtuelles (Telnet/SSH) : mot de passe, nombre de sessions.",
    syntax: "line vty 0 4",
    examples: [
      { cmd: "line vty 0 4", desc: "Configure les 5 sessions distantes" },
      { cmd: "password cisco", desc: "Mot de passe de connexion" },
      { cmd: "login local", desc: "Authentification via comptes locaux" },
      { cmd: "transport input ssh", desc: "N'autorise que SSH (pas Telnet)" }
    ],
    flags: ["login", "login local", "transport input ssh|telnet|all"]
  },
  {
    name: "crypto key generate rsa",
    os: "cisco",
    category: "Sécurité",
    description: "Génère une paire de clés RSA, prérequis pour activer le serveur SSH sur l'équipement.",
    syntax: "crypto key generate rsa",
    examples: [
      { cmd: "ip domain-name reseau.local", desc: "1. Définir un nom de domaine" },
      { cmd: "crypto key generate rsa", desc: "2. Générer la clé (choisir 2048 bits)" },
      { cmd: "ip ssh version 2", desc: "3. Forcer SSH v2" }
    ],
    flags: ["modulus 2048"]
  },
  {
    name: "show interfaces status",
    os: "cisco",
    category: "Réseau",
    description: "Affiche l'état de tous les ports du switch : connecté, VLAN, vitesse, duplex.",
    syntax: "show interfaces status",
    examples: [
      { cmd: "show interfaces status", desc: "Vue port par port" },
      { cmd: "show interfaces gi0/1", desc: "Statistiques détaillées d'un port (erreurs, débit)" }
    ],
    flags: ["err-disabled (ports bloqués)"]
  },
  {
    name: "spanning-tree",
    os: "cisco",
    category: "Réseau",
    description: "Configure le protocole Spanning Tree (évite les boucles de commutation).",
    syntax: "spanning-tree <options>",
    examples: [
      { cmd: "show spanning-tree", desc: "État STP : root bridge, rôles des ports" },
      { cmd: "spanning-tree vlan 10 root primary", desc: "Force ce switch comme root du VLAN 10" },
      { cmd: "spanning-tree portfast", desc: "Active PortFast sur un port access (config-if)" }
    ],
    flags: ["portfast", "bpduguard enable", "vlan <id> priority <n>"]
  },
  {
    name: "reload",
    os: "cisco",
    category: "Système",
    description: "Redémarre l'équipement Cisco. La config non sauvegardée (running-config) est perdue.",
    syntax: "reload [in <minutes>]",
    examples: [
      { cmd: "reload", desc: "Redémarre immédiatement (confirmation demandée)" },
      { cmd: "reload in 10", desc: "Redémarrage programmé dans 10 min (filet de sécurité)" },
      { cmd: "reload cancel", desc: "Annule le redémarrage programmé" }
    ],
    flags: ["in <min>", "at <hh:mm>", "cancel"]
  },

  // ── PROXMOX VE ────────────────────────────────────────────
  {
    name: "qm list",
    os: "proxmox",
    category: "Virtualisation",
    description: "Liste toutes les machines virtuelles KVM du nœud Proxmox avec leur statut.",
    syntax: "qm list",
    examples: [
      { cmd: "qm list", desc: "VMs : VMID, nom, statut, RAM, disque" }
    ],
    flags: []
  },
  {
    name: "qm start",
    os: "proxmox",
    category: "Virtualisation",
    description: "Démarre une machine virtuelle par son VMID.",
    syntax: "qm start <vmid>",
    examples: [
      { cmd: "qm start 100", desc: "Démarre la VM 100" },
      { cmd: "qm stop 100", desc: "Arrêt forcé (équivaut à débrancher)" },
      { cmd: "qm shutdown 100", desc: "Arrêt propre via l'agent invité" },
      { cmd: "qm reboot 100", desc: "Redémarrage propre" }
    ],
    flags: ["stop", "shutdown", "reboot", "reset", "suspend/resume"]
  },
  {
    name: "qm create",
    os: "proxmox",
    category: "Virtualisation",
    description: "Crée une nouvelle machine virtuelle KVM en ligne de commande.",
    syntax: "qm create <vmid> [options]",
    examples: [
      { cmd: "qm create 105 --name deb12 --memory 2048 --cores 2 --net0 virtio,bridge=vmbr0", desc: "VM 2 Go RAM / 2 cœurs" },
      { cmd: "qm set 105 --scsi0 local-lvm:32", desc: "Ajoute un disque de 32 Go" },
      { cmd: "qm set 105 --cdrom local:iso/debian-12.iso", desc: "Monte l'ISO d'installation" }
    ],
    flags: ["--name", "--memory <Mo>", "--cores <n>", "--net0", "--ostype l26"]
  },
  {
    name: "qm clone",
    os: "proxmox",
    category: "Virtualisation",
    description: "Clone une VM ou un template (clone complet ou lié) — idéal pour déployer vite.",
    syntax: "qm clone <vmid-source> <nouveau-vmid> [options]",
    examples: [
      { cmd: "qm clone 9000 120 --name web01 --full", desc: "Clone complet du template 9000" },
      { cmd: "qm template 9000", desc: "Convertit la VM 9000 en template" }
    ],
    flags: ["--full (clone complet)", "--name", "--storage <stockage>"]
  },
  {
    name: "qm snapshot",
    os: "proxmox",
    category: "Virtualisation",
    description: "Crée un instantané d'une VM pour pouvoir revenir en arrière (avant une mise à jour risquée).",
    syntax: "qm snapshot <vmid> <nom-snapshot>",
    examples: [
      { cmd: "qm snapshot 100 avant-maj", desc: "Snapshot nommé 'avant-maj'" },
      { cmd: "qm rollback 100 avant-maj", desc: "Restaure le snapshot" },
      { cmd: "qm listsnapshot 100", desc: "Liste les snapshots de la VM" },
      { cmd: "qm delsnapshot 100 avant-maj", desc: "Supprime le snapshot" }
    ],
    flags: ["--vmstate (inclut la RAM)"]
  },
  {
    name: "qm migrate",
    os: "proxmox",
    category: "Virtualisation",
    description: "Migre une VM vers un autre nœud du cluster Proxmox (à chaud avec --online).",
    syntax: "qm migrate <vmid> <nœud-cible>",
    examples: [
      { cmd: "qm migrate 100 pve2 --online", desc: "Migration à chaud vers pve2" }
    ],
    flags: ["--online (sans coupure)", "--with-local-disks"]
  },
  {
    name: "pct list",
    os: "proxmox",
    category: "Virtualisation",
    description: "Liste les conteneurs LXC du nœud avec leur statut.",
    syntax: "pct list",
    examples: [
      { cmd: "pct list", desc: "Conteneurs : VMID, statut, nom" }
    ],
    flags: []
  },
  {
    name: "pct create",
    os: "proxmox",
    category: "Virtualisation",
    description: "Crée un conteneur LXC à partir d'un template (plus léger qu'une VM).",
    syntax: "pct create <vmid> <template> [options]",
    examples: [
      { cmd: "pveam update", desc: "Met à jour la liste des templates" },
      { cmd: "pveam available --section system", desc: "Templates disponibles" },
      { cmd: "pveam download local debian-12-standard_12.7-1_amd64.tar.zst", desc: "Télécharge un template" },
      { cmd: "pct create 200 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst --hostname ct-web --memory 512 --net0 name=eth0,bridge=vmbr0,ip=dhcp", desc: "Crée le CT" }
    ],
    flags: ["--hostname", "--memory <Mo>", "--rootfs <stockage>:<Go>", "--unprivileged 1"]
  },
  {
    name: "pct enter",
    os: "proxmox",
    category: "Virtualisation",
    description: "Ouvre un shell root directement à l'intérieur d'un conteneur LXC.",
    syntax: "pct enter <vmid>",
    examples: [
      { cmd: "pct enter 200", desc: "Shell dans le conteneur 200" },
      { cmd: "pct exec 200 -- apt update", desc: "Exécute une commande sans entrer" },
      { cmd: "pct start 200 && pct stop 200", desc: "Démarrer / arrêter" }
    ],
    flags: ["exec <vmid> -- <cmd>", "start/stop/reboot"]
  },
  {
    name: "vzdump",
    os: "proxmox",
    category: "Virtualisation",
    description: "Sauvegarde une VM ou un conteneur (outil de backup natif de Proxmox).",
    syntax: "vzdump <vmid> [options]",
    examples: [
      { cmd: "vzdump 100 --storage local --mode snapshot", desc: "Backup à chaud de la VM 100" },
      { cmd: "vzdump 100 --compress zstd", desc: "Backup compressé en zstd" },
      { cmd: "qmrestore /var/lib/vz/dump/vzdump-qemu-100-*.vma.zst 101", desc: "Restaure dans une nouvelle VM 101" }
    ],
    flags: ["--mode snapshot|suspend|stop", "--compress zstd|gzip", "--storage <s>"]
  },
  {
    name: "pvecm status",
    os: "proxmox",
    category: "Virtualisation",
    description: "Affiche l'état du cluster Proxmox : quorum, nœuds membres, votes.",
    syntax: "pvecm status",
    examples: [
      { cmd: "pvecm status", desc: "État du cluster et du quorum" },
      { cmd: "pvecm nodes", desc: "Liste des nœuds membres" },
      { cmd: "pvecm add 192.168.1.10", desc: "Rejoint le cluster existant (depuis le nouveau nœud)" },
      { cmd: "pvecm create MONCLUSTER", desc: "Crée un nouveau cluster" }
    ],
    flags: ["nodes", "create <nom>", "add <ip>"]
  },
  {
    name: "pvesm status",
    os: "proxmox",
    category: "Virtualisation",
    description: "Liste les stockages configurés (local, LVM, NFS, Ceph...) et leur espace disponible.",
    syntax: "pvesm status",
    examples: [
      { cmd: "pvesm status", desc: "Stockages : type, total, utilisé" },
      { cmd: "pvesm list local", desc: "Contenu du stockage 'local' (ISO, backups...)" }
    ],
    flags: ["list <stockage>"]
  },
  {
    name: "pveversion",
    os: "proxmox",
    category: "Virtualisation",
    description: "Affiche la version de Proxmox VE et de ses composants.",
    syntax: "pveversion [-v]",
    examples: [
      { cmd: "pveversion", desc: "Version PVE courte" },
      { cmd: "pveversion -v", desc: "Versions détaillées de tous les paquets" }
    ],
    flags: ["-v (détaillé)"]
  },
  {
    name: "pvesh",
    os: "proxmox",
    category: "Virtualisation",
    description: "Interroge l'API REST de Proxmox depuis le shell (tout ce que fait l'interface web).",
    syntax: "pvesh <get|set|create|delete> <chemin-api>",
    examples: [
      { cmd: "pvesh get /nodes", desc: "Liste les nœuds via l'API" },
      { cmd: "pvesh get /nodes/pve1/qemu", desc: "Liste les VMs du nœud pve1" },
      { cmd: "pvesh get /cluster/resources --type vm", desc: "Toutes les VMs du cluster" }
    ],
    flags: ["get", "set", "create", "delete", "--output-format json"]
  },
  {
    name: "qm config",
    os: "proxmox",
    category: "Virtualisation",
    description: "Affiche la configuration complète d'une VM (CPU, RAM, disques, réseau).",
    syntax: "qm config <vmid>",
    examples: [
      { cmd: "qm config 100", desc: "Config de la VM 100" },
      { cmd: "qm set 100 --memory 4096", desc: "Passe la VM à 4 Go de RAM" },
      { cmd: "qm resize 100 scsi0 +10G", desc: "Agrandit le disque de 10 Go" }
    ],
    flags: ["set --memory/--cores/--net0", "resize <disque> +<taille>"]
  },
  {
    name: "ha-manager",
    os: "proxmox",
    category: "Virtualisation",
    description: "Gère la haute disponibilité : les VMs marquées HA redémarrent sur un autre nœud en cas de panne.",
    syntax: "ha-manager <commande>",
    examples: [
      { cmd: "ha-manager add vm:100", desc: "Ajoute la VM 100 en HA" },
      { cmd: "ha-manager status", desc: "État des ressources HA" },
      { cmd: "ha-manager remove vm:100", desc: "Retire la VM de la HA" }
    ],
    flags: ["add", "remove", "status", "set vm:<id> --state started|stopped"]
  },
  {
    name: "pveum",
    os: "proxmox",
    category: "Utilisateurs",
    description: "Gère les utilisateurs, groupes et permissions de Proxmox (User Management).",
    syntax: "pveum <commande>",
    examples: [
      { cmd: "pveum user add tom@pve --password", desc: "Crée un utilisateur local" },
      { cmd: "pveum user list", desc: "Liste les utilisateurs" },
      { cmd: "pveum acl modify /vms/100 --users tom@pve --roles PVEVMUser", desc: "Donne les droits sur la VM 100" }
    ],
    flags: ["user add/list/delete", "acl modify", "role list"]
  },
  {
    name: "qm agent",
    os: "proxmox",
    category: "Virtualisation",
    description: "Communique avec l'agent QEMU installé dans la VM (IP, ping, exécution de commandes).",
    syntax: "qm agent <vmid> <commande>",
    examples: [
      { cmd: "qm agent 100 ping", desc: "Vérifie que l'agent répond" },
      { cmd: "qm agent 100 network-get-interfaces", desc: "Récupère les IPs de la VM" },
      { cmd: "qm set 100 --agent enabled=1", desc: "Active le support de l'agent" }
    ],
    flags: ["ping", "network-get-interfaces", "get-osinfo"]
  },

  // ── MYSQL / MARIADB ───────────────────────────────────────
  {
    name: "mysql",
    os: "mysql",
    category: "Base de données",
    description: "Client en ligne de commande pour se connecter à un serveur MySQL/MariaDB.",
    syntax: "mysql -u <utilisateur> -p [base]",
    examples: [
      { cmd: "mysql -u root -p", desc: "Connexion en root (mot de passe demandé)" },
      { cmd: "mysql -u app -p -h 192.168.1.50 boutique", desc: "Connexion distante à la base 'boutique'" },
      { cmd: "mysql -u root -p < script.sql", desc: "Exécute un script SQL" }
    ],
    flags: ["-u (utilisateur)", "-p (mot de passe)", "-h (hôte)", "-e (exécuter une requête)"]
  },
  {
    name: "SHOW DATABASES",
    os: "mysql",
    category: "Base de données",
    description: "Liste toutes les bases de données du serveur.",
    syntax: "SHOW DATABASES;",
    examples: [
      { cmd: "SHOW DATABASES;", desc: "Liste les bases" },
      { cmd: "USE boutique;", desc: "Sélectionne une base" },
      { cmd: "SHOW TABLES;", desc: "Liste les tables de la base courante" }
    ],
    flags: []
  },
  {
    name: "CREATE DATABASE",
    os: "mysql",
    category: "Base de données",
    description: "Crée une nouvelle base de données.",
    syntax: "CREATE DATABASE <nom>;",
    examples: [
      { cmd: "CREATE DATABASE boutique CHARACTER SET utf8mb4;", desc: "Base en UTF-8 complet" },
      { cmd: "DROP DATABASE boutique;", desc: "⚠ Supprime la base et tout son contenu" }
    ],
    flags: ["CHARACTER SET utf8mb4", "IF NOT EXISTS"]
  },
  {
    name: "CREATE USER",
    os: "mysql",
    category: "Utilisateurs",
    description: "Crée un compte utilisateur MySQL avec son mot de passe.",
    syntax: "CREATE USER '<nom>'@'<hôte>' IDENTIFIED BY '<mdp>';",
    examples: [
      { cmd: "CREATE USER 'app'@'localhost' IDENTIFIED BY 'S3cret!';", desc: "Utilisateur local" },
      { cmd: "CREATE USER 'app'@'%' IDENTIFIED BY 'S3cret!';", desc: "Connexion depuis n'importe où" },
      { cmd: "DROP USER 'app'@'localhost';", desc: "Supprime le compte" }
    ],
    flags: ["@'localhost' (local uniquement)", "@'%' (toutes IP)"]
  },
  {
    name: "GRANT",
    os: "mysql",
    category: "Permissions",
    description: "Accorde des privilèges à un utilisateur sur une base ou une table.",
    syntax: "GRANT <privilèges> ON <base>.<table> TO '<user>'@'<hôte>';",
    examples: [
      { cmd: "GRANT ALL PRIVILEGES ON boutique.* TO 'app'@'localhost';", desc: "Tous les droits sur la base" },
      { cmd: "GRANT SELECT, INSERT ON boutique.clients TO 'stagiaire'@'%';", desc: "Droits limités sur une table" },
      { cmd: "FLUSH PRIVILEGES;", desc: "Recharge les privilèges" },
      { cmd: "SHOW GRANTS FOR 'app'@'localhost';", desc: "Vérifie les droits accordés" }
    ],
    flags: ["ALL PRIVILEGES", "SELECT/INSERT/UPDATE/DELETE", "REVOKE (retirer)"]
  },
  {
    name: "mysqldump",
    os: "mysql",
    category: "Base de données",
    description: "Exporte une base de données en fichier SQL (sauvegarde logique).",
    syntax: "mysqldump -u <user> -p <base> > dump.sql",
    examples: [
      { cmd: "mysqldump -u root -p boutique > boutique.sql", desc: "Sauvegarde une base" },
      { cmd: "mysqldump -u root -p --all-databases > tout.sql", desc: "Sauvegarde toutes les bases" },
      { cmd: "mysql -u root -p boutique < boutique.sql", desc: "Restaure la sauvegarde" }
    ],
    flags: ["--all-databases", "--single-transaction (sans verrou)", "--routines"]
  },
  {
    name: "SELECT",
    os: "mysql",
    category: "Base de données",
    description: "Interroge les données d'une table (la requête SQL fondamentale).",
    syntax: "SELECT <colonnes> FROM <table> [WHERE ...] [ORDER BY ...] [LIMIT n];",
    examples: [
      { cmd: "SELECT * FROM clients;", desc: "Toutes les lignes" },
      { cmd: "SELECT nom, email FROM clients WHERE ville = 'Paris' ORDER BY nom LIMIT 10;", desc: "Filtre + tri + limite" },
      { cmd: "SELECT COUNT(*) FROM commandes WHERE total > 100;", desc: "Comptage avec condition" }
    ],
    flags: ["WHERE", "ORDER BY ... ASC|DESC", "LIMIT", "JOIN", "GROUP BY"]
  },
  {
    name: "INSERT / UPDATE / DELETE",
    os: "mysql",
    category: "Base de données",
    description: "Les trois requêtes de modification des données : ajout, mise à jour, suppression.",
    syntax: "INSERT INTO <table> (...) VALUES (...);",
    examples: [
      { cmd: "INSERT INTO clients (nom, email) VALUES ('Durand', 'd@mail.fr');", desc: "Ajoute une ligne" },
      { cmd: "UPDATE clients SET ville = 'Lyon' WHERE id = 4;", desc: "Modifie une ligne" },
      { cmd: "DELETE FROM clients WHERE id = 4;", desc: "⚠ Supprime — toujours avec WHERE !" }
    ],
    flags: ["⚠ UPDATE/DELETE sans WHERE = toute la table"]
  },
  {
    name: "SHOW PROCESSLIST",
    os: "mysql",
    category: "Processus",
    description: "Affiche les connexions et requêtes en cours sur le serveur (diagnostic de lenteur).",
    syntax: "SHOW [FULL] PROCESSLIST;",
    examples: [
      { cmd: "SHOW FULL PROCESSLIST;", desc: "Requêtes en cours avec texte complet" },
      { cmd: "KILL 1234;", desc: "Tue la connexion/requête n°1234" }
    ],
    flags: ["FULL (requête complète)", "KILL <id>"]
  },
  {
    name: "mysql_secure_installation",
    os: "mysql",
    category: "Sécurité",
    description: "Assistant de sécurisation post-installation : mot de passe root, comptes anonymes, base test.",
    syntax: "mysql_secure_installation",
    examples: [
      { cmd: "sudo mysql_secure_installation", desc: "Lance l'assistant interactif" }
    ],
    flags: []
  },
  {
    name: "SHOW STATUS / VARIABLES",
    os: "mysql",
    category: "Système",
    description: "Affiche les compteurs internes et les variables de configuration du serveur.",
    syntax: "SHOW STATUS LIKE '<motif>'; SHOW VARIABLES LIKE '<motif>';",
    examples: [
      { cmd: "SHOW STATUS LIKE 'Threads_connected';", desc: "Nombre de connexions actives" },
      { cmd: "SHOW VARIABLES LIKE 'max_connections';", desc: "Limite de connexions configurée" },
      { cmd: "SET GLOBAL max_connections = 300;", desc: "Modifie à chaud (perdu au redémarrage)" }
    ],
    flags: ["LIKE '<motif%>'", "SET GLOBAL"]
  },
  {
    name: "ALTER TABLE",
    os: "mysql",
    category: "Base de données",
    description: "Modifie la structure d'une table : ajout/suppression de colonnes, index, clés.",
    syntax: "ALTER TABLE <table> <action>;",
    examples: [
      { cmd: "ALTER TABLE clients ADD COLUMN tel VARCHAR(20);", desc: "Ajoute une colonne" },
      { cmd: "ALTER TABLE clients ADD INDEX idx_ville (ville);", desc: "Ajoute un index" },
      { cmd: "DESCRIBE clients;", desc: "Affiche la structure de la table" }
    ],
    flags: ["ADD COLUMN", "DROP COLUMN", "MODIFY", "ADD INDEX"]
  },
  {
    name: "systemctl status mysql",
    os: "mysql",
    category: "Services",
    description: "Gère le service MySQL/MariaDB (démarrage, arrêt, logs) sur un serveur Linux systemd.",
    syntax: "systemctl <action> mysql|mariadb",
    examples: [
      { cmd: "sudo systemctl status mariadb", desc: "État du service" },
      { cmd: "sudo systemctl restart mysql", desc: "Redémarre MySQL" },
      { cmd: "sudo journalctl -u mariadb -f", desc: "Suit les logs du service" }
    ],
    flags: ["start", "stop", "restart", "enable"]
  },
  {
    name: "mysqladmin",
    os: "mysql",
    category: "Système",
    description: "Outil d'administration : ping du serveur, statut, changement de mot de passe root.",
    syntax: "mysqladmin -u root -p <commande>",
    examples: [
      { cmd: "mysqladmin -u root -p ping", desc: "Vérifie que le serveur répond" },
      { cmd: "mysqladmin -u root -p status", desc: "Uptime, requêtes/s, threads" },
      { cmd: "mysqladmin -u root -p password 'NouveauMdp!'", desc: "Change le mot de passe root" }
    ],
    flags: ["ping", "status", "processlist", "shutdown"]
  },

  // ── NGINX ─────────────────────────────────────────────────
  {
    name: "nginx -t",
    os: "nginx",
    category: "Services",
    description: "Teste la syntaxe des fichiers de configuration Nginx AVANT de recharger (indispensable).",
    syntax: "nginx -t",
    examples: [
      { cmd: "sudo nginx -t", desc: "Vérifie la config (syntax ok / test failed)" },
      { cmd: "sudo nginx -T", desc: "Teste ET affiche toute la config assemblée" }
    ],
    flags: ["-t (test)", "-T (test + dump)", "-c <fichier> (config alternative)"]
  },
  {
    name: "nginx -s reload",
    os: "nginx",
    category: "Services",
    description: "Recharge la configuration sans couper les connexions en cours (graceful reload).",
    syntax: "nginx -s <signal>",
    examples: [
      { cmd: "sudo nginx -s reload", desc: "Recharge la config à chaud" },
      { cmd: "sudo systemctl reload nginx", desc: "Équivalent via systemd" },
      { cmd: "sudo nginx -s quit", desc: "Arrêt propre (termine les requêtes en cours)" }
    ],
    flags: ["reload", "quit (arrêt propre)", "stop (arrêt immédiat)"]
  },
  {
    name: "server (bloc)",
    os: "nginx",
    category: "Services",
    description: "Définit un hôte virtuel : quel domaine, quel port, quelle racine de fichiers.",
    syntax: "server { listen 80; server_name ...; root ...; }",
    examples: [
      { cmd: "server {\n  listen 80;\n  server_name monsite.fr;\n  root /var/www/monsite;\n  index index.html;\n}", desc: "Vhost basique dans /etc/nginx/sites-available/" },
      { cmd: "sudo ln -s /etc/nginx/sites-available/monsite /etc/nginx/sites-enabled/", desc: "Active le site (Debian/Ubuntu)" }
    ],
    flags: ["listen 80|443 ssl", "server_name", "root", "index"]
  },
  {
    name: "location (bloc)",
    os: "nginx",
    category: "Services",
    description: "Route les requêtes selon l'URL : fichiers statiques, PHP, API...",
    syntax: "location <motif> { ... }",
    examples: [
      { cmd: "location /images/ { root /var/www/static; }", desc: "Sert les images depuis un dossier" },
      { cmd: "location ~ \\.php$ { fastcgi_pass unix:/run/php/php8.2-fpm.sock; }", desc: "Envoie le PHP à PHP-FPM" },
      { cmd: "location /api/ { proxy_pass http://127.0.0.1:3000; }", desc: "Proxy vers une app Node" }
    ],
    flags: ["= (exact)", "~ (regex)", "^~ (préfixe prioritaire)"]
  },
  {
    name: "proxy_pass",
    os: "nginx",
    category: "Réseau",
    description: "Transforme Nginx en reverse proxy : relaie les requêtes vers un serveur backend.",
    syntax: "proxy_pass http://<backend>;",
    examples: [
      { cmd: "location / {\n  proxy_pass http://127.0.0.1:8080;\n  proxy_set_header Host $host;\n  proxy_set_header X-Real-IP $remote_addr;\n}", desc: "Reverse proxy avec en-têtes propres" }
    ],
    flags: ["proxy_set_header", "proxy_read_timeout", "upstream { } (load balancing)"]
  },
  {
    name: "ssl_certificate",
    os: "nginx",
    category: "Sécurité",
    description: "Active le HTTPS sur un vhost avec un certificat TLS (Let's Encrypt ou interne).",
    syntax: "listen 443 ssl; ssl_certificate <crt>; ssl_certificate_key <key>;",
    examples: [
      { cmd: "listen 443 ssl;\nssl_certificate /etc/letsencrypt/live/monsite.fr/fullchain.pem;\nssl_certificate_key /etc/letsencrypt/live/monsite.fr/privkey.pem;", desc: "HTTPS avec certificat Let's Encrypt" },
      { cmd: "return 301 https://$host$request_uri;", desc: "Redirection HTTP → HTTPS (dans le bloc :80)" }
    ],
    flags: ["ssl_protocols TLSv1.2 TLSv1.3", "ssl_ciphers"]
  },
  {
    name: "certbot",
    os: "nginx",
    category: "Sécurité",
    description: "Obtient et renouvelle automatiquement des certificats Let's Encrypt gratuits.",
    syntax: "certbot --nginx -d <domaine>",
    examples: [
      { cmd: "sudo certbot --nginx -d monsite.fr -d www.monsite.fr", desc: "Certificat + config Nginx automatique" },
      { cmd: "sudo certbot renew --dry-run", desc: "Teste le renouvellement automatique" },
      { cmd: "sudo certbot certificates", desc: "Liste les certificats et leur expiration" }
    ],
    flags: ["--nginx", "-d <domaine>", "renew", "--dry-run"]
  },
  {
    name: "access.log / error.log",
    os: "nginx",
    category: "Système",
    description: "Les journaux Nginx : requêtes reçues et erreurs — premiers réflexes de diagnostic.",
    syntax: "tail -f /var/log/nginx/access.log",
    examples: [
      { cmd: "sudo tail -f /var/log/nginx/error.log", desc: "Suit les erreurs en direct" },
      { cmd: "sudo grep ' 404 ' /var/log/nginx/access.log | tail -20", desc: "Dernières 404" },
      { cmd: "awk '{print $1}' access.log | sort | uniq -c | sort -rn | head", desc: "Top 10 des IPs clientes" }
    ],
    flags: ["access_log off; (désactiver)", "error_log ... warn;"]
  },
  {
    name: "try_files",
    os: "nginx",
    category: "Services",
    description: "Essaie plusieurs chemins dans l'ordre et sert le premier qui existe (essentiel pour les SPA).",
    syntax: "try_files <chemin1> <chemin2> ... <fallback>;",
    examples: [
      { cmd: "try_files $uri $uri/ /index.html;", desc: "SPA : tout renvoie vers index.html" },
      { cmd: "try_files $uri =404;", desc: "Fichier exact ou erreur 404" }
    ],
    flags: []
  },
  {
    name: "rewrite / return",
    os: "nginx",
    category: "Services",
    description: "Redirige ou réécrit des URLs (redirections 301, migration de site).",
    syntax: "return <code> <url>; | rewrite <regex> <remplacement> [flag];",
    examples: [
      { cmd: "return 301 https://nouveau-site.fr$request_uri;", desc: "Redirection permanente de tout le site" },
      { cmd: "rewrite ^/ancien/(.*)$ /nouveau/$1 permanent;", desc: "Réécriture avec capture" }
    ],
    flags: ["301 (permanent)", "302 (temporaire)", "permanent", "last"]
  },
  {
    name: "limit_req",
    os: "nginx",
    category: "Sécurité",
    description: "Limite le nombre de requêtes par IP (protection contre le brute-force et les abus).",
    syntax: "limit_req_zone ... ; limit_req zone=<nom>;",
    examples: [
      { cmd: "limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;", desc: "Zone : 5 req/min par IP (bloc http)" },
      { cmd: "location /login { limit_req zone=login burst=3; }", desc: "Applique la limite sur /login" }
    ],
    flags: ["rate=5r/m", "burst=<n>", "nodelay"]
  },
  {
    name: "nginx -V",
    os: "nginx",
    category: "Système",
    description: "Affiche la version de Nginx et les modules compilés.",
    syntax: "nginx -V",
    examples: [
      { cmd: "nginx -v", desc: "Version courte" },
      { cmd: "nginx -V 2>&1 | tr ' ' '\\n' | grep module", desc: "Liste les modules compilés" }
    ],
    flags: ["-v (version)", "-V (version + options de compilation)"]
  },

  // ── OPENSSL ───────────────────────────────────────────────
  {
    name: "openssl genrsa",
    os: "openssl",
    category: "Sécurité",
    description: "Génère une clé privée RSA (base de tout certificat TLS).",
    syntax: "openssl genrsa -out <fichier.key> <taille>",
    examples: [
      { cmd: "openssl genrsa -out serveur.key 2048", desc: "Clé RSA 2048 bits" },
      { cmd: "openssl genpkey -algorithm ED25519 -out serveur.key", desc: "Clé moderne Ed25519" }
    ],
    flags: ["2048|4096 (taille)", "-aes256 (clé chiffrée par mot de passe)"]
  },
  {
    name: "openssl req",
    os: "openssl",
    category: "Sécurité",
    description: "Crée une demande de certificat (CSR) ou un certificat auto-signé.",
    syntax: "openssl req -new -key <clé> -out <csr>",
    examples: [
      { cmd: "openssl req -new -key serveur.key -out serveur.csr", desc: "CSR à envoyer à une autorité (CA)" },
      { cmd: "openssl req -x509 -new -nodes -key serveur.key -days 365 -out serveur.crt", desc: "Certificat auto-signé 1 an" },
      { cmd: "openssl req -x509 -newkey rsa:2048 -nodes -keyout s.key -out s.crt -days 365 -subj \"/CN=monsite.local\"", desc: "Clé + certif en une commande, sans questions" }
    ],
    flags: ["-new", "-x509 (auto-signé)", "-nodes (clé non chiffrée)", "-days <n>", "-subj"]
  },
  {
    name: "openssl x509",
    os: "openssl",
    category: "Sécurité",
    description: "Inspecte un certificat : émetteur, dates de validité, SAN, empreinte.",
    syntax: "openssl x509 -in <cert> -text -noout",
    examples: [
      { cmd: "openssl x509 -in serveur.crt -text -noout", desc: "Détail complet du certificat" },
      { cmd: "openssl x509 -in serveur.crt -noout -dates", desc: "Dates de validité uniquement" },
      { cmd: "openssl x509 -in serveur.crt -noout -fingerprint -sha256", desc: "Empreinte SHA-256" }
    ],
    flags: ["-text", "-noout", "-dates", "-subject", "-issuer"]
  },
  {
    name: "openssl s_client",
    os: "openssl",
    category: "Réseau",
    description: "Se connecte à un serveur TLS pour diagnostiquer le certificat et la négociation.",
    syntax: "openssl s_client -connect <hôte>:<port>",
    examples: [
      { cmd: "openssl s_client -connect monsite.fr:443", desc: "Teste le HTTPS et affiche le certificat" },
      { cmd: "openssl s_client -connect monsite.fr:443 -servername monsite.fr | openssl x509 -noout -dates", desc: "Vérifie l'expiration à distance" },
      { cmd: "openssl s_client -connect mail.fr:587 -starttls smtp", desc: "Teste le TLS d'un serveur SMTP" }
    ],
    flags: ["-connect hôte:port", "-servername (SNI)", "-starttls smtp|imap"]
  },
  {
    name: "openssl verify",
    os: "openssl",
    category: "Sécurité",
    description: "Vérifie qu'un certificat est bien signé par une chaîne de confiance donnée.",
    syntax: "openssl verify -CAfile <ca.crt> <cert>",
    examples: [
      { cmd: "openssl verify -CAfile ca.crt serveur.crt", desc: "Vérifie la chaîne de confiance" }
    ],
    flags: ["-CAfile", "-untrusted <intermédiaire>"]
  },
  {
    name: "openssl dgst",
    os: "openssl",
    category: "Sécurité",
    description: "Calcule l'empreinte (hash) d'un fichier — vérification d'intégrité de téléchargements.",
    syntax: "openssl dgst -<algo> <fichier>",
    examples: [
      { cmd: "openssl dgst -sha256 debian-12.iso", desc: "SHA-256 d'une ISO" },
      { cmd: "sha256sum debian-12.iso", desc: "Équivalent coreutils Linux" }
    ],
    flags: ["-sha256", "-sha512", "-md5 (obsolète)"]
  },
  {
    name: "openssl enc",
    os: "openssl",
    category: "Sécurité",
    description: "Chiffre ou déchiffre un fichier avec un mot de passe (AES).",
    syntax: "openssl enc -aes-256-cbc [-d] -in <src> -out <dst>",
    examples: [
      { cmd: "openssl enc -aes-256-cbc -pbkdf2 -in secret.txt -out secret.enc", desc: "Chiffre un fichier" },
      { cmd: "openssl enc -aes-256-cbc -pbkdf2 -d -in secret.enc -out secret.txt", desc: "Déchiffre" }
    ],
    flags: ["-aes-256-cbc", "-pbkdf2 (dérivation robuste)", "-d (déchiffrer)"]
  },
  {
    name: "openssl rand",
    os: "openssl",
    category: "Sécurité",
    description: "Génère des octets aléatoires cryptographiques (mots de passe, secrets, tokens).",
    syntax: "openssl rand [-base64|-hex] <n>",
    examples: [
      { cmd: "openssl rand -base64 24", desc: "Mot de passe aléatoire solide" },
      { cmd: "openssl rand -hex 32", desc: "Clé secrète 256 bits en hexa" }
    ],
    flags: ["-base64", "-hex"]
  },
  {
    name: "openssl pkcs12",
    os: "openssl",
    category: "Sécurité",
    description: "Convertit certificat + clé en fichier .pfx/.p12 (format Windows/IIS) et inversement.",
    syntax: "openssl pkcs12 -export -in <crt> -inkey <key> -out <pfx>",
    examples: [
      { cmd: "openssl pkcs12 -export -in serveur.crt -inkey serveur.key -out serveur.pfx", desc: "Crée un .pfx pour IIS" },
      { cmd: "openssl pkcs12 -in serveur.pfx -nocerts -nodes -out serveur.key", desc: "Extrait la clé d'un .pfx" }
    ],
    flags: ["-export (créer)", "-nocerts", "-nokeys", "-nodes"]
  },
  {
    name: "openssl passwd",
    os: "openssl",
    category: "Sécurité",
    description: "Génère un hash de mot de passe compatible /etc/shadow ou htpasswd.",
    syntax: "openssl passwd -6 [mot-de-passe]",
    examples: [
      { cmd: "openssl passwd -6", desc: "Hash SHA-512 (demande le mot de passe)" },
      { cmd: "openssl passwd -apr1 secret", desc: "Hash pour .htpasswd Apache" }
    ],
    flags: ["-6 (SHA-512)", "-apr1 (Apache)", "-salt <sel>"]
  },
  {
    name: "ssh-keygen",
    os: "openssl",
    category: "Sécurité",
    description: "Génère une paire de clés SSH pour l'authentification sans mot de passe.",
    syntax: "ssh-keygen -t <type> [-C commentaire]",
    examples: [
      { cmd: "ssh-keygen -t ed25519 -C \"tom@poste-admin\"", desc: "Clé moderne Ed25519" },
      { cmd: "ssh-copy-id user@serveur", desc: "Installe la clé publique sur le serveur" },
      { cmd: "ssh-keygen -lf ~/.ssh/id_ed25519.pub", desc: "Affiche l'empreinte de la clé" }
    ],
    flags: ["-t ed25519|rsa", "-b 4096 (taille RSA)", "-C (commentaire)", "-f (fichier)"]
  },
  {
    name: "openssl ciphers",
    os: "openssl",
    category: "Sécurité",
    description: "Liste les suites de chiffrement supportées (audit de configuration TLS).",
    syntax: "openssl ciphers -v ['filtre']",
    examples: [
      { cmd: "openssl ciphers -v 'TLSv1.3'", desc: "Suites TLS 1.3 disponibles" },
      { cmd: "openssl version -a", desc: "Version et options de compilation d'OpenSSL" }
    ],
    flags: ["-v (détaillé)", "-s (supportées seulement)"]
  },
  {
    name: "openssl crl / ocsp",
    os: "openssl",
    category: "Sécurité",
    description: "Vérifie la révocation d'un certificat via CRL ou OCSP.",
    syntax: "openssl ocsp -issuer <ca> -cert <crt> -url <ocsp-url>",
    examples: [
      { cmd: "openssl crl -in liste.crl -text -noout", desc: "Inspecte une liste de révocation" },
      { cmd: "openssl ocsp -issuer ca.crt -cert serveur.crt -url http://ocsp.ca.fr", desc: "Interroge le répondeur OCSP" }
    ],
    flags: ["-text", "-noout", "-url"]
  },
  {
    name: "openssl speed",
    os: "openssl",
    category: "Système",
    description: "Benchmark des algorithmes de chiffrement sur la machine.",
    syntax: "openssl speed [algo]",
    examples: [
      { cmd: "openssl speed aes-256-cbc", desc: "Performance AES-256" },
      { cmd: "openssl speed rsa2048", desc: "Signatures/vérifications RSA par seconde" }
    ],
    flags: ["-evp <algo> (utilise l'accélération matérielle)"]
  },

  // ── TCPDUMP ───────────────────────────────────────────────
  {
    name: "tcpdump -i",
    os: "tcpdump",
    category: "Réseau",
    description: "Capture le trafic réseau sur une interface donnée (l'analyseur en CLI).",
    syntax: "tcpdump -i <interface> [filtre]",
    examples: [
      { cmd: "sudo tcpdump -i eth0", desc: "Capture tout sur eth0" },
      { cmd: "sudo tcpdump -i any", desc: "Capture sur toutes les interfaces" },
      { cmd: "tcpdump -D", desc: "Liste les interfaces disponibles" }
    ],
    flags: ["-i <if>", "-D (lister)", "-c <n> (n paquets puis stop)", "-n (pas de DNS)"]
  },
  {
    name: "tcpdump port",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre la capture par port : voir uniquement le trafic d'un service.",
    syntax: "tcpdump [-i if] port <n>",
    examples: [
      { cmd: "sudo tcpdump -i eth0 port 80", desc: "Trafic HTTP uniquement" },
      { cmd: "sudo tcpdump -ni eth0 port 53", desc: "Requêtes DNS (sans résolution inverse)" },
      { cmd: "sudo tcpdump -i eth0 portrange 8000-8100", desc: "Plage de ports" }
    ],
    flags: ["port <n>", "src port / dst port", "portrange <a-b>"]
  },
  {
    name: "tcpdump host",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre par adresse IP source, destination ou les deux.",
    syntax: "tcpdump host <ip>",
    examples: [
      { cmd: "sudo tcpdump -i eth0 host 192.168.1.50", desc: "Tout le trafic avec cette IP" },
      { cmd: "sudo tcpdump src 10.0.0.5 and dst port 443", desc: "Filtres combinés avec and/or/not" },
      { cmd: "sudo tcpdump net 192.168.1.0/24", desc: "Tout un sous-réseau" }
    ],
    flags: ["host / src / dst", "net <cidr>", "and / or / not"]
  },
  {
    name: "tcpdump -w",
    os: "tcpdump",
    category: "Réseau",
    description: "Enregistre la capture dans un fichier .pcap à ouvrir ensuite dans Wireshark.",
    syntax: "tcpdump -w <fichier.pcap>",
    examples: [
      { cmd: "sudo tcpdump -i eth0 -w capture.pcap port 443", desc: "Capture HTTPS vers un fichier" },
      { cmd: "tcpdump -r capture.pcap", desc: "Relit un fichier pcap" },
      { cmd: "sudo tcpdump -i eth0 -w cap.pcap -C 100 -W 5", desc: "Rotation : 5 fichiers de 100 Mo" }
    ],
    flags: ["-w (écrire)", "-r (relire)", "-C <Mo>", "-W <n> (rotation)"]
  },
  {
    name: "tcpdump icmp",
    os: "tcpdump",
    category: "Réseau",
    description: "Capture uniquement l'ICMP : vérifier si les pings arrivent réellement.",
    syntax: "tcpdump icmp",
    examples: [
      { cmd: "sudo tcpdump -i eth0 icmp", desc: "Voir les ping entrants/sortants" },
      { cmd: "sudo tcpdump -i eth0 'icmp[icmptype] == icmp-echo'", desc: "Seulement les echo request" }
    ],
    flags: ["icmp", "arp", "udp", "tcp"]
  },
  {
    name: "tcpdump -A / -X",
    os: "tcpdump",
    category: "Réseau",
    description: "Affiche le contenu des paquets en ASCII (-A) ou hexa+ASCII (-X).",
    syntax: "tcpdump -A [filtre]",
    examples: [
      { cmd: "sudo tcpdump -A -i eth0 port 80", desc: "Voir les requêtes HTTP en clair" },
      { cmd: "sudo tcpdump -X -c 5 -i eth0 port 53", desc: "5 paquets DNS en hexa" }
    ],
    flags: ["-A (ASCII)", "-X (hexa+ASCII)", "-s0 (paquet entier)"]
  },
  {
    name: "tcpdump tcp flags",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre par drapeaux TCP : voir les SYN (connexions), RST (rejets)...",
    syntax: "tcpdump 'tcp[tcpflags] & tcp-<flag> != 0'",
    examples: [
      { cmd: "sudo tcpdump 'tcp[tcpflags] & tcp-syn != 0'", desc: "Tentatives de connexion (SYN)" },
      { cmd: "sudo tcpdump 'tcp[tcpflags] & tcp-rst != 0'", desc: "Connexions rejetées (RST)" }
    ],
    flags: ["tcp-syn", "tcp-ack", "tcp-rst", "tcp-fin"]
  },
  {
    name: "tcpdump -nn -v",
    os: "tcpdump",
    category: "Réseau",
    description: "Options de lisibilité : désactiver la résolution DNS/ports, augmenter la verbosité.",
    syntax: "tcpdump -nn -v [filtre]",
    examples: [
      { cmd: "sudo tcpdump -nnvi eth0 port 443", desc: "IPs et ports bruts, verbeux" },
      { cmd: "sudo tcpdump -ttttni eth0", desc: "Horodatage complet lisible" }
    ],
    flags: ["-n (pas de DNS)", "-nn (ni DNS ni noms de ports)", "-v/-vv/-vvv", "-tttt (date complète)"]
  },
  {
    name: "tcpdump vlan / pppoe",
    os: "tcpdump",
    category: "Réseau",
    description: "Capture le trafic taggé VLAN 802.1Q (diagnostic de trunk).",
    syntax: "tcpdump vlan [id]",
    examples: [
      { cmd: "sudo tcpdump -i eth0 vlan 10", desc: "Trafic du VLAN 10 uniquement" },
      { cmd: "sudo tcpdump -e -i eth0 vlan", desc: "Avec en-têtes Ethernet (voir les tags)" }
    ],
    flags: ["vlan [id]", "-e (en-têtes couche 2)"]
  },
  {
    name: "tcpdump broadcast/multicast",
    os: "tcpdump",
    category: "Réseau",
    description: "Isole le trafic broadcast/multicast : DHCP, ARP, mDNS qui saturent un réseau.",
    syntax: "tcpdump broadcast",
    examples: [
      { cmd: "sudo tcpdump -i eth0 broadcast", desc: "Tout le broadcast" },
      { cmd: "sudo tcpdump -i eth0 port 67 or port 68", desc: "Échanges DHCP (DORA)" },
      { cmd: "sudo tcpdump -i eth0 arp", desc: "Requêtes ARP (qui cherche qui)" }
    ],
    flags: ["broadcast", "multicast", "arp"]
  },

  // ── IPTABLES / NFTABLES ───────────────────────────────────
  {
    name: "iptables -L",
    os: "iptables",
    category: "Sécurité",
    description: "Liste les règles de pare-feu actives avec compteurs et numéros de ligne.",
    syntax: "iptables -L [chaîne] [options]",
    examples: [
      { cmd: "sudo iptables -L -n -v", desc: "Toutes les règles, IPs brutes, compteurs" },
      { cmd: "sudo iptables -L INPUT --line-numbers", desc: "Chaîne INPUT avec numéros" },
      { cmd: "sudo iptables -t nat -L -n", desc: "Règles de la table NAT" }
    ],
    flags: ["-n (pas de DNS)", "-v (compteurs)", "--line-numbers", "-t nat|mangle"]
  },
  {
    name: "iptables -A INPUT",
    os: "iptables",
    category: "Sécurité",
    description: "Ajoute une règle à la fin d'une chaîne (ACCEPT, DROP, REJECT).",
    syntax: "iptables -A <chaîne> <critères> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT", desc: "Autorise SSH" },
      { cmd: "sudo iptables -A INPUT -s 203.0.113.66 -j DROP", desc: "Bloque une IP" },
      { cmd: "sudo iptables -I INPUT 1 -i lo -j ACCEPT", desc: "Insère en position 1 (loopback)" }
    ],
    flags: ["-A (ajouter)", "-I (insérer)", "-p tcp|udp|icmp", "--dport", "-s (source)", "-j ACCEPT|DROP|REJECT"]
  },
  {
    name: "iptables -D",
    os: "iptables",
    category: "Sécurité",
    description: "Supprime une règle, par numéro de ligne ou en répétant ses critères.",
    syntax: "iptables -D <chaîne> <numéro|critères>",
    examples: [
      { cmd: "sudo iptables -D INPUT 3", desc: "Supprime la règle n°3 d'INPUT" },
      { cmd: "sudo iptables -D INPUT -s 203.0.113.66 -j DROP", desc: "Supprime par critères" },
      { cmd: "sudo iptables -F", desc: "⚠ Vide toutes les règles (flush)" }
    ],
    flags: ["-D (delete)", "-F (flush)", "-X (supprimer chaînes vides)"]
  },
  {
    name: "iptables -P",
    os: "iptables",
    category: "Sécurité",
    description: "Définit la politique par défaut d'une chaîne : que faire des paquets sans règle.",
    syntax: "iptables -P <chaîne> <ACCEPT|DROP>",
    examples: [
      { cmd: "sudo iptables -P INPUT DROP", desc: "⚠ Bloque tout par défaut (autoriser SSH AVANT !)" },
      { cmd: "sudo iptables -P FORWARD DROP", desc: "Pas de routage par défaut" },
      { cmd: "sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT", desc: "Autorise les réponses aux connexions établies" }
    ],
    flags: ["-P (policy)", "-m conntrack --ctstate"]
  },
  {
    name: "iptables NAT",
    os: "iptables",
    category: "Réseau",
    description: "Configure le NAT : partage de connexion (MASQUERADE) et redirection de ports (DNAT).",
    syntax: "iptables -t nat -A <POSTROUTING|PREROUTING> ...",
    examples: [
      { cmd: "sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE", desc: "Partage la connexion (routeur)" },
      { cmd: "sudo iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to 192.168.1.50:80", desc: "Redirige le port 8080 vers un serveur interne" },
      { cmd: "echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward", desc: "Active le routage IP (prérequis)" }
    ],
    flags: ["MASQUERADE", "DNAT --to <ip:port>", "SNAT --to <ip>"]
  },
  {
    name: "iptables-save / restore",
    os: "iptables",
    category: "Sécurité",
    description: "Exporte/importe toutes les règles — les règles iptables sont perdues au redémarrage sinon.",
    syntax: "iptables-save > fichier | iptables-restore < fichier",
    examples: [
      { cmd: "sudo iptables-save > /etc/iptables/rules.v4", desc: "Sauvegarde les règles" },
      { cmd: "sudo iptables-restore < /etc/iptables/rules.v4", desc: "Restaure les règles" },
      { cmd: "sudo apt install iptables-persistent", desc: "Restauration automatique au boot (Debian)" }
    ],
    flags: []
  },
  {
    name: "nft list ruleset",
    os: "iptables",
    category: "Sécurité",
    description: "Affiche toutes les règles nftables (le successeur moderne d'iptables).",
    syntax: "nft list ruleset",
    examples: [
      { cmd: "sudo nft list ruleset", desc: "Toutes les tables, chaînes et règles" },
      { cmd: "sudo nft list table inet filter", desc: "Une table précise" }
    ],
    flags: ["-a (afficher les handles)", "-j (sortie JSON)"]
  },
  {
    name: "nft add rule",
    os: "iptables",
    category: "Sécurité",
    description: "Ajoute une règle nftables (syntaxe unifiée IPv4+IPv6 avec la famille inet).",
    syntax: "nft add rule <famille> <table> <chaîne> <règle>",
    examples: [
      { cmd: "sudo nft add table inet filter", desc: "Crée la table" },
      { cmd: "sudo nft add chain inet filter input '{ type filter hook input priority 0; policy drop; }'", desc: "Chaîne input, politique drop" },
      { cmd: "sudo nft add rule inet filter input tcp dport 22 accept", desc: "Autorise SSH" },
      { cmd: "sudo nft add rule inet filter input ct state established,related accept", desc: "Connexions établies" }
    ],
    flags: ["add table/chain/rule", "delete", "flush ruleset"]
  },
  {
    name: "nft -f",
    os: "iptables",
    category: "Sécurité",
    description: "Charge un fichier de règles nftables (/etc/nftables.conf est chargé au boot).",
    syntax: "nft -f <fichier>",
    examples: [
      { cmd: "sudo nft -f /etc/nftables.conf", desc: "Charge la config" },
      { cmd: "sudo nft -c -f /etc/nftables.conf", desc: "Vérifie la syntaxe sans appliquer" },
      { cmd: "sudo systemctl enable nftables", desc: "Active le chargement au démarrage" }
    ],
    flags: ["-f (fichier)", "-c (check seulement)"]
  },
  {
    name: "fail2ban-client",
    os: "iptables",
    category: "Sécurité",
    description: "Contrôle Fail2ban, qui bannit automatiquement les IPs après des échecs de connexion répétés.",
    syntax: "fail2ban-client <commande>",
    examples: [
      { cmd: "sudo fail2ban-client status", desc: "Liste les jails actives" },
      { cmd: "sudo fail2ban-client status sshd", desc: "IPs bannies sur SSH" },
      { cmd: "sudo fail2ban-client set sshd unbanip 203.0.113.9", desc: "Débannit une IP" }
    ],
    flags: ["status [jail]", "set <jail> banip/unbanip <ip>", "reload"]
  },

  // ── TMUX ──────────────────────────────────────────────────
  {
    name: "tmux new",
    os: "tmux",
    category: "Système",
    description: "Crée une session tmux : un terminal persistant qui survit à la déconnexion SSH.",
    syntax: "tmux new -s <nom>",
    examples: [
      { cmd: "tmux new -s admin", desc: "Nouvelle session nommée 'admin'" },
      { cmd: "tmux", desc: "Session anonyme rapide" }
    ],
    flags: ["-s <nom> (nommer)", "-d (détachée)"]
  },
  {
    name: "tmux attach",
    os: "tmux",
    category: "Système",
    description: "Se rattache à une session existante — on retrouve tout comme on l'avait laissé.",
    syntax: "tmux attach -t <nom>",
    examples: [
      { cmd: "tmux attach -t admin", desc: "Reprend la session 'admin'" },
      { cmd: "tmux ls", desc: "Liste les sessions ouvertes" },
      { cmd: "tmux kill-session -t admin", desc: "Ferme une session" }
    ],
    flags: ["-t <nom> (cible)", "ls (lister)", "kill-session"]
  },
  {
    name: "tmux detach (Ctrl+b d)",
    os: "tmux",
    category: "Système",
    description: "Se détache de la session : les programmes continuent de tourner en arrière-plan.",
    syntax: "Ctrl+b puis d",
    examples: [
      { cmd: "Ctrl+b d", desc: "Détache la session courante" },
      { cmd: "Ctrl+b s", desc: "Menu interactif de sessions" }
    ],
    flags: ["Ctrl+b = préfixe par défaut de tmux"]
  },
  {
    name: "tmux split (Ctrl+b % / \")",
    os: "tmux",
    category: "Système",
    description: "Divise la fenêtre en panneaux : plusieurs terminaux côte à côte.",
    syntax: "Ctrl+b % (vertical) | Ctrl+b \" (horizontal)",
    examples: [
      { cmd: "Ctrl+b %", desc: "Coupe verticalement" },
      { cmd: "Ctrl+b \"", desc: "Coupe horizontalement" },
      { cmd: "Ctrl+b flèches", desc: "Naviguer entre panneaux" },
      { cmd: "Ctrl+b x", desc: "Ferme le panneau courant" }
    ],
    flags: ["Ctrl+b z (zoom sur un panneau)", "Ctrl+b o (panneau suivant)"]
  },
  {
    name: "tmux windows (Ctrl+b c)",
    os: "tmux",
    category: "Système",
    description: "Gère les fenêtres (onglets) d'une session tmux.",
    syntax: "Ctrl+b c (créer) | n/p (suivante/précédente)",
    examples: [
      { cmd: "Ctrl+b c", desc: "Nouvelle fenêtre" },
      { cmd: "Ctrl+b 0..9", desc: "Aller à la fenêtre n" },
      { cmd: "Ctrl+b ,", desc: "Renommer la fenêtre" },
      { cmd: "Ctrl+b w", desc: "Liste interactive des fenêtres" }
    ],
    flags: ["c (créer)", "n/p (naviguer)", "& (fermer)"]
  },
  {
    name: "tmux copy-mode (Ctrl+b [)",
    os: "tmux",
    category: "Système",
    description: "Mode copie : fait défiler l'historique du terminal et copie du texte.",
    syntax: "Ctrl+b [ puis navigation",
    examples: [
      { cmd: "Ctrl+b [", desc: "Entre en mode copie (défilement)" },
      { cmd: "q", desc: "Quitte le mode copie" },
      { cmd: "Espace ... Entrée", desc: "Sélectionne puis copie" },
      { cmd: "Ctrl+b ]", desc: "Colle le texte copié" }
    ],
    flags: ["PgUp/PgDn pour défiler"]
  },
  {
    name: "tmux send-keys",
    os: "tmux",
    category: "Système",
    description: "Envoie des commandes dans une session depuis un script (automatisation).",
    syntax: "tmux send-keys -t <session> '<commande>' Enter",
    examples: [
      { cmd: "tmux send-keys -t admin 'htop' Enter", desc: "Lance htop dans la session admin" },
      { cmd: "tmux new -d -s backup 'rsync -a /data /backup'", desc: "Lance une tâche longue détachée" }
    ],
    flags: ["-t <cible>", "Enter (valider)"]
  },
  {
    name: "tmux.conf",
    os: "tmux",
    category: "Système",
    description: "Fichier de configuration ~/.tmux.conf : préfixe, souris, couleurs.",
    syntax: "~/.tmux.conf",
    examples: [
      { cmd: "set -g mouse on", desc: "Active la souris (scroll, resize)" },
      { cmd: "set -g prefix C-a", desc: "Remplace Ctrl+b par Ctrl+a" },
      { cmd: "tmux source-file ~/.tmux.conf", desc: "Recharge la config" }
    ],
    flags: ["set -g (option globale)", "bind (raccourci)"]
  },
  {
    name: "tmux resize-pane",
    os: "tmux",
    category: "Système",
    description: "Redimensionne les panneaux au clavier.",
    syntax: "Ctrl+b : resize-pane -<D|U|L|R> <n>",
    examples: [
      { cmd: "Ctrl+b :resize-pane -R 10", desc: "Élargit de 10 colonnes à droite" },
      { cmd: "Ctrl+b Alt+flèches", desc: "Redimensionnement rapide" }
    ],
    flags: ["-D/-U/-L/-R (direction)", "Ctrl+b Espace (layouts prédéfinis)"]
  },
  {
    name: "tmux kill-server",
    os: "tmux",
    category: "Système",
    description: "Arrête le serveur tmux et TOUTES les sessions.",
    syntax: "tmux kill-server",
    examples: [
      { cmd: "tmux kill-server", desc: "⚠ Ferme tout" },
      { cmd: "tmux kill-session -a", desc: "Ferme toutes les sessions sauf la courante" }
    ],
    flags: ["kill-session -a (toutes sauf courante)"]
  },

  // ── VIM ───────────────────────────────────────────────────
  {
    name: "vim (modes)",
    os: "vim",
    category: "Fichiers",
    description: "Les modes de Vim : NORMAL (navigation), INSERT (saisie), VISUAL (sélection), COMMAND (:).",
    syntax: "vim <fichier>",
    examples: [
      { cmd: "i", desc: "Passe en mode INSERT (avant le curseur)" },
      { cmd: "Échap", desc: "Retour au mode NORMAL" },
      { cmd: "v", desc: "Mode VISUAL (sélection)" },
      { cmd: ":", desc: "Mode COMMAND" }
    ],
    flags: ["a (insert après)", "o (nouvelle ligne dessous)", "V (sélection de lignes)"]
  },
  {
    name: ":w :q :wq",
    os: "vim",
    category: "Fichiers",
    description: "Sauvegarder et quitter — LES commandes à connaître pour ne pas rester bloqué.",
    syntax: ":w | :q | :wq | :q!",
    examples: [
      { cmd: ":w", desc: "Sauvegarde" },
      { cmd: ":wq", desc: "Sauvegarde et quitte (ou ZZ)" },
      { cmd: ":q!", desc: "Quitte SANS sauvegarder" },
      { cmd: ":w /tmp/copie.txt", desc: "Sauvegarde sous un autre nom" }
    ],
    flags: [":x (= :wq)", "ZZ (raccourci normal-mode)"]
  },
  {
    name: "hjkl / déplacement",
    os: "vim",
    category: "Navigation",
    description: "Navigation au clavier en mode NORMAL : caractères, mots, lignes, fichier.",
    syntax: "h j k l / w b / 0 $ / gg G",
    examples: [
      { cmd: "w / b", desc: "Mot suivant / précédent" },
      { cmd: "0 / $", desc: "Début / fin de ligne" },
      { cmd: "gg / G", desc: "Début / fin du fichier" },
      { cmd: ":42", desc: "Aller à la ligne 42" }
    ],
    flags: ["Ctrl+d/Ctrl+u (demi-page)", "{ } (paragraphes)", "% (parenthèse liée)"]
  },
  {
    name: "dd yy p",
    os: "vim",
    category: "Fichiers",
    description: "Couper (dd), copier (yy) et coller (p) des lignes.",
    syntax: "dd | yy | p | P",
    examples: [
      { cmd: "dd", desc: "Coupe la ligne courante" },
      { cmd: "5dd", desc: "Coupe 5 lignes" },
      { cmd: "yy puis p", desc: "Copie la ligne puis colle dessous" },
      { cmd: "u / Ctrl+r", desc: "Annuler / rétablir" }
    ],
    flags: ["dw (couper un mot)", "x (supprimer un caractère)", "ciw (changer un mot)"]
  },
  {
    name: "/recherche",
    os: "vim",
    category: "Fichiers",
    description: "Recherche dans le fichier, vers l'avant (/) ou l'arrière (?).",
    syntax: "/<motif> | ?<motif>",
    examples: [
      { cmd: "/error", desc: "Cherche 'error' vers le bas" },
      { cmd: "n / N", desc: "Occurrence suivante / précédente" },
      { cmd: ":noh", desc: "Efface le surlignage" },
      { cmd: "*", desc: "Cherche le mot sous le curseur" }
    ],
    flags: [":set ignorecase", ":set hlsearch"]
  },
  {
    name: ":%s (remplacer)",
    os: "vim",
    category: "Fichiers",
    description: "Rechercher-remplacer avec regex sur tout le fichier ou une plage.",
    syntax: ":%s/<motif>/<remplacement>/g",
    examples: [
      { cmd: ":%s/http:/https:/g", desc: "Remplace partout dans le fichier" },
      { cmd: ":10,20s/eth0/eth1/g", desc: "Seulement lignes 10 à 20" },
      { cmd: ":%s/tmp/prod/gc", desc: "Avec confirmation à chaque occurrence" }
    ],
    flags: ["g (toutes occurrences)", "c (confirmer)", "i (insensible casse)"]
  },
  {
    name: "vim -d / vimdiff",
    os: "vim",
    category: "Fichiers",
    description: "Compare deux fichiers côte à côte avec différences surlignées.",
    syntax: "vimdiff <fichier1> <fichier2>",
    examples: [
      { cmd: "vimdiff sshd_config sshd_config.bak", desc: "Compare une config et sa sauvegarde" },
      { cmd: "]c / [c", desc: "Différence suivante / précédente" },
      { cmd: "do / dp", desc: "Récupère (obtain) / envoie (put) la modification" }
    ],
    flags: ["]c [c (naviguer)", "do dp (fusionner)"]
  },
  {
    name: ":e :sp :vsp",
    os: "vim",
    category: "Fichiers",
    description: "Ouvre d'autres fichiers : dans le même buffer, en split horizontal ou vertical.",
    syntax: ":e <fichier> | :sp <fichier> | :vsp <fichier>",
    examples: [
      { cmd: ":e /etc/hosts", desc: "Ouvre un autre fichier" },
      { cmd: ":vsp /etc/fstab", desc: "Split vertical" },
      { cmd: "Ctrl+w flèches", desc: "Naviguer entre splits" },
      { cmd: ":ls puis :b2", desc: "Lister les buffers, aller au n°2" }
    ],
    flags: ["Ctrl+w w (split suivant)", ":bn/:bp (buffer suivant/précédent)"]
  },
  {
    name: "visual block (Ctrl+v)",
    os: "vim",
    category: "Fichiers",
    description: "Sélection rectangulaire : éditer plusieurs lignes d'un coup (commenter en masse).",
    syntax: "Ctrl+v puis sélection puis action",
    examples: [
      { cmd: "Ctrl+v, j j j, I, #, Échap", desc: "Ajoute # au début de 4 lignes (commenter)" },
      { cmd: "Ctrl+v, sélection, x", desc: "Supprime une colonne de texte" }
    ],
    flags: ["I (insérer au début)", "A (insérer à la fin)"]
  },
  {
    name: ".vimrc",
    os: "vim",
    category: "Système",
    description: "Fichier de configuration ~/.vimrc : numéros de ligne, indentation, couleurs.",
    syntax: "~/.vimrc",
    examples: [
      { cmd: "set number", desc: "Numéros de ligne" },
      { cmd: "set tabstop=2 shiftwidth=2 expandtab", desc: "Indentation 2 espaces" },
      { cmd: "syntax on", desc: "Coloration syntaxique" },
      { cmd: ":source ~/.vimrc", desc: "Recharge la config" }
    ],
    flags: ["set number", "set mouse=a", "colorscheme <nom>"]
  },

  // ── NPM / NODE ────────────────────────────────────────────
  {
    name: "npm init",
    os: "npm",
    category: "Développement",
    description: "Initialise un projet Node.js en créant le fichier package.json.",
    syntax: "npm init [-y]",
    examples: [
      { cmd: "npm init -y", desc: "package.json avec les valeurs par défaut" },
      { cmd: "npm init", desc: "Assistant interactif" }
    ],
    flags: ["-y (accepter tout)"]
  },
  {
    name: "npm install",
    os: "npm",
    category: "Développement",
    description: "Installe les dépendances du projet ou un paquet précis.",
    syntax: "npm install [paquet] [options]",
    examples: [
      { cmd: "npm install", desc: "Installe tout ce que liste package.json" },
      { cmd: "npm install express", desc: "Ajoute express aux dépendances" },
      { cmd: "npm install -D eslint", desc: "Dépendance de développement" },
      { cmd: "npm install -g nodemon", desc: "Installation globale (outil CLI)" }
    ],
    flags: ["-D/--save-dev", "-g (global)", "--production"]
  },
  {
    name: "npm run",
    os: "npm",
    category: "Développement",
    description: "Exécute un script défini dans la section \"scripts\" de package.json.",
    syntax: "npm run <script>",
    examples: [
      { cmd: "npm run dev", desc: "Lance le script 'dev'" },
      { cmd: "npm start", desc: "Raccourci pour 'npm run start'" },
      { cmd: "npm test", desc: "Raccourci pour les tests" },
      { cmd: "npm run", desc: "Liste les scripts disponibles" }
    ],
    flags: ["start/test (raccourcis)", "-- <args> (passer des arguments)"]
  },
  {
    name: "npm update / outdated",
    os: "npm",
    category: "Développement",
    description: "Vérifie et met à jour les dépendances du projet.",
    syntax: "npm outdated | npm update",
    examples: [
      { cmd: "npm outdated", desc: "Tableau : version actuelle / voulue / dernière" },
      { cmd: "npm update", desc: "Met à jour selon les plages de package.json" },
      { cmd: "npm install express@latest", desc: "Force la dernière version" }
    ],
    flags: ["outdated", "update", "@latest / @<version>"]
  },
  {
    name: "npm audit",
    os: "npm",
    category: "Sécurité",
    description: "Analyse les dépendances à la recherche de vulnérabilités connues (CVE).",
    syntax: "npm audit [fix]",
    examples: [
      { cmd: "npm audit", desc: "Rapport de vulnérabilités" },
      { cmd: "npm audit fix", desc: "Corrige automatiquement quand c'est possible" },
      { cmd: "npm audit --audit-level=high", desc: "Échoue seulement si high/critical" }
    ],
    flags: ["fix", "--force (⚠ peut casser)", "--audit-level"]
  },
  {
    name: "npm uninstall / ls",
    os: "npm",
    category: "Développement",
    description: "Supprime un paquet ou liste l'arbre des dépendances installées.",
    syntax: "npm uninstall <paquet> | npm ls",
    examples: [
      { cmd: "npm uninstall lodash", desc: "Retire le paquet et l'entrée package.json" },
      { cmd: "npm ls --depth=0", desc: "Dépendances directes uniquement" },
      { cmd: "npm ls express", desc: "Qui dépend d'express ?" }
    ],
    flags: ["--depth=0", "-g (global)"]
  },
  {
    name: "npx",
    os: "npm",
    category: "Développement",
    description: "Exécute un outil npm sans l'installer globalement.",
    syntax: "npx <paquet> [args]",
    examples: [
      { cmd: "npx create-vite mon-app", desc: "Génère un projet Vite" },
      { cmd: "npx serve .", desc: "Serveur web statique instantané (parfait pour tester ce site !)" },
      { cmd: "npx cowsay 'BTS SIO'", desc: "Exécute sans installer" }
    ],
    flags: ["-y (sans confirmation)", "--package <p>"]
  },
  {
    name: "node",
    os: "npm",
    category: "Développement",
    description: "Exécute un fichier JavaScript ou ouvre une console interactive (REPL).",
    syntax: "node [fichier.js]",
    examples: [
      { cmd: "node server.js", desc: "Lance une application" },
      { cmd: "node", desc: "Console interactive" },
      { cmd: "node -e \"console.log(2+2)\"", desc: "Exécute une expression" },
      { cmd: "node --watch server.js", desc: "Relance automatiquement à chaque modification" }
    ],
    flags: ["-e (évaluer)", "--watch", "-v (version)"]
  },
  {
    name: "package.json",
    os: "npm",
    category: "Développement",
    description: "Le fichier central d'un projet Node : métadonnées, scripts et dépendances.",
    syntax: "package.json",
    examples: [
      { cmd: "\"scripts\": { \"dev\": \"node --watch server.js\" }", desc: "Définir un script" },
      { cmd: "\"dependencies\": { \"express\": \"^4.19.0\" }", desc: "^ = mises à jour mineures autorisées" }
    ],
    flags: ["^ (mineure)", "~ (patch)", "package-lock.json (versions exactes)"]
  },
  {
    name: "npm ci",
    os: "npm",
    category: "Développement",
    description: "Installation propre et reproductible depuis package-lock.json (pour CI/CD et serveurs).",
    syntax: "npm ci",
    examples: [
      { cmd: "npm ci", desc: "Supprime node_modules et installe les versions exactes du lock" }
    ],
    flags: ["--omit=dev (sans dépendances de dev)"]
  },
  {
    name: "npm config / cache",
    os: "npm",
    category: "Système",
    description: "Configure npm (registre, proxy) et gère le cache local.",
    syntax: "npm config <get|set> <clé> [valeur]",
    examples: [
      { cmd: "npm config set registry https://registry.npmjs.org/", desc: "Définit le registre" },
      { cmd: "npm config set proxy http://proxy.entreprise.fr:8080", desc: "Derrière un proxy d'entreprise" },
      { cmd: "npm cache clean --force", desc: "Vide le cache" }
    ],
    flags: ["get/set/list", "cache clean --force"]
  },
  {
    name: "nvm",
    os: "npm",
    category: "Système",
    description: "Node Version Manager : installe et bascule entre plusieurs versions de Node.js.",
    syntax: "nvm <install|use|ls> [version]",
    examples: [
      { cmd: "nvm install --lts", desc: "Installe la dernière LTS" },
      { cmd: "nvm use 20", desc: "Bascule sur Node 20" },
      { cmd: "nvm ls", desc: "Versions installées" }
    ],
    flags: ["install --lts", "use <v>", "alias default <v>"]
  },

  // ── PYTHON / PIP ──────────────────────────────────────────
  {
    name: "python3",
    os: "python",
    category: "Développement",
    description: "Exécute un script Python ou ouvre l'interpréteur interactif.",
    syntax: "python3 [fichier.py]",
    examples: [
      { cmd: "python3 script.py", desc: "Exécute un script" },
      { cmd: "python3", desc: "Interpréteur interactif (REPL)" },
      { cmd: "python3 -c \"print(2**10)\"", desc: "Exécute une expression" },
      { cmd: "python3 --version", desc: "Version installée" }
    ],
    flags: ["-c (commande)", "-m <module>", "-i (interactif après le script)"]
  },
  {
    name: "python3 -m venv",
    os: "python",
    category: "Développement",
    description: "Crée un environnement virtuel isolé — indispensable pour chaque projet Python.",
    syntax: "python3 -m venv <dossier>",
    examples: [
      { cmd: "python3 -m venv .venv", desc: "Crée l'environnement dans .venv" },
      { cmd: "source .venv/bin/activate", desc: "Active (Linux/macOS)" },
      { cmd: ".venv\\Scripts\\Activate.ps1", desc: "Active (Windows PowerShell)" },
      { cmd: "deactivate", desc: "Désactive l'environnement" }
    ],
    flags: ["--system-site-packages", "--upgrade-deps"]
  },
  {
    name: "pip install",
    os: "python",
    category: "Développement",
    description: "Installe des paquets Python depuis PyPI.",
    syntax: "pip install <paquet> [options]",
    examples: [
      { cmd: "pip install requests", desc: "Installe une bibliothèque" },
      { cmd: "pip install -r requirements.txt", desc: "Installe toutes les dépendances du projet" },
      { cmd: "pip install 'django>=5,<6'", desc: "Contrainte de version" },
      { cmd: "pip install --upgrade pip", desc: "Met à jour pip lui-même" }
    ],
    flags: ["-r <fichier>", "--upgrade", "--user"]
  },
  {
    name: "pip freeze / list",
    os: "python",
    category: "Développement",
    description: "Liste les paquets installés — freeze produit le format requirements.txt.",
    syntax: "pip freeze | pip list",
    examples: [
      { cmd: "pip freeze > requirements.txt", desc: "Fige les versions du projet" },
      { cmd: "pip list --outdated", desc: "Paquets à mettre à jour" },
      { cmd: "pip show requests", desc: "Détails d'un paquet (version, dépendances)" }
    ],
    flags: ["freeze", "list --outdated", "show <paquet>"]
  },
  {
    name: "pip uninstall",
    os: "python",
    category: "Développement",
    description: "Désinstalle un paquet Python.",
    syntax: "pip uninstall <paquet>",
    examples: [
      { cmd: "pip uninstall requests", desc: "Retire le paquet (confirmation demandée)" },
      { cmd: "pip uninstall -y -r requirements.txt", desc: "Désinstalle tout le fichier" }
    ],
    flags: ["-y (sans confirmation)", "-r <fichier>"]
  },
  {
    name: "python3 -m http.server",
    os: "python",
    category: "Réseau",
    description: "Serveur web statique instantané — parfait pour partager des fichiers ou tester un site.",
    syntax: "python3 -m http.server [port]",
    examples: [
      { cmd: "python3 -m http.server 8000", desc: "Sert le dossier courant sur :8000" },
      { cmd: "python3 -m http.server 8000 --bind 127.0.0.1", desc: "Accessible en local seulement" }
    ],
    flags: ["--bind <ip>", "--directory <dossier>"]
  },
  {
    name: "python3 -m json.tool",
    os: "python",
    category: "Fichiers",
    description: "Formate et valide du JSON en ligne de commande (alternative à jq).",
    syntax: "python3 -m json.tool [fichier]",
    examples: [
      { cmd: "cat config.json | python3 -m json.tool", desc: "JSON indenté et validé" },
      { cmd: "curl -s https://api.site.fr/v1/status | python3 -m json.tool", desc: "Formate une réponse d'API" }
    ],
    flags: ["--sort-keys", "--compact"]
  },
  {
    name: "pyenv",
    os: "python",
    category: "Système",
    description: "Installe et gère plusieurs versions de Python côte à côte.",
    syntax: "pyenv <install|global|local> [version]",
    examples: [
      { cmd: "pyenv install 3.12", desc: "Installe Python 3.12" },
      { cmd: "pyenv global 3.12", desc: "Version par défaut du système" },
      { cmd: "pyenv local 3.11", desc: "Version pour ce projet uniquement" }
    ],
    flags: ["install -l (lister les versions)", "versions (installées)"]
  },
  {
    name: "pipx",
    os: "python",
    category: "Développement",
    description: "Installe des outils CLI Python dans des environnements isolés (le npx de Python).",
    syntax: "pipx install <outil>",
    examples: [
      { cmd: "pipx install ansible", desc: "Ansible isolé, dispo partout" },
      { cmd: "pipx run black script.py", desc: "Exécute sans installer" },
      { cmd: "pipx list", desc: "Outils installés" }
    ],
    flags: ["install", "run", "upgrade-all"]
  },
  {
    name: "python3 -m unittest / pytest",
    os: "python",
    category: "Développement",
    description: "Lance les tests unitaires d'un projet Python.",
    syntax: "pytest [chemin] | python3 -m unittest",
    examples: [
      { cmd: "pytest", desc: "Découvre et lance tous les tests" },
      { cmd: "pytest tests/test_api.py -v", desc: "Un fichier, en mode verbeux" },
      { cmd: "pytest -k \"login\"", desc: "Seulement les tests contenant 'login'" }
    ],
    flags: ["-v (verbeux)", "-k <motif>", "-x (stop à la 1re erreur)"]
  },
  {
    name: "pdb (débogueur)",
    os: "python",
    category: "Développement",
    description: "Débogueur intégré : points d'arrêt et exécution pas à pas.",
    syntax: "python3 -m pdb script.py | breakpoint()",
    examples: [
      { cmd: "breakpoint()", desc: "Point d'arrêt dans le code (Python ≥ 3.7)" },
      { cmd: "python3 -m pdb script.py", desc: "Lance le script sous débogueur" },
      { cmd: "n / s / c / p var", desc: "next / step / continue / afficher une variable" }
    ],
    flags: ["n (ligne suivante)", "s (entrer dans la fonction)", "c (continuer)", "q (quitter)"]
  },
  {
    name: "uv",
    os: "python",
    category: "Développement",
    description: "Gestionnaire de paquets Python ultra-rapide (remplace pip + venv), écrit en Rust.",
    syntax: "uv <pip|venv|run> [args]",
    examples: [
      { cmd: "uv venv", desc: "Crée un environnement virtuel en un éclair" },
      { cmd: "uv pip install -r requirements.txt", desc: "Installation 10-100x plus rapide que pip" },
      { cmd: "uv run script.py", desc: "Exécute dans l'environnement du projet" }
    ],
    flags: ["venv", "pip install/freeze", "run"]
  },
];

// Fusion dans l'annuaire principal (data.js doit être chargé avant)
if (typeof COMMANDS !== 'undefined') {
  COMMANDS.push.apply(COMMANDS, EXTRA_COMMANDS);
}


