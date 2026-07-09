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

    {
    name: "show version",
    os: "cisco",
    category: "Réseau",
    description: "Affiche la version de l'IOS, le modèle du matériel, la mémoire disponible et l'uptime — le premier réflexe pour identifier un équipement.",
    syntax: "show version",
    examples: [
      { cmd: "show version", desc: "Version IOS, RAM, uptime, registre de configuration" }
    ],
    flags: []
  },
  {
    name: "show interfaces",
    os: "cisco",
    category: "Réseau",
    description: "Affiche l'état détaillé d'une ou toutes les interfaces : compteurs d'erreurs, débit, encapsulation — plus complet que 'show ip interface brief'.",
    syntax: "show interfaces [<interface>]",
    examples: [
      { cmd: "show interfaces GigabitEthernet0/1", desc: "Détail complet de cette interface" },
      { cmd: "show interfaces | include error", desc: "Ne montre que les lignes avec des erreurs" }
    ],
    flags: []
  },
  {
    name: "ping / traceroute",
    os: "cisco",
    category: "Réseau",
    description: "Teste la connectivité et trace le chemin réseau vers une destination, directement depuis l'IOS.",
    syntax: "ping <ip> / traceroute <ip>",
    examples: [
      { cmd: "ping 8.8.8.8", desc: "Test de connectivité basique" },
      { cmd: "traceroute 8.8.8.8", desc: "Affiche chaque saut jusqu'à la destination" }
    ],
    flags: []
  },
  {
    name: "no shutdown",
    os: "cisco",
    category: "Réseau",
    description: "Active une interface — par défaut, les interfaces sont administrativement désactivées et n'ont besoin que de cette commande pour passer up.",
    syntax: "interface <nom> puis no shutdown",
    examples: [
      { cmd: "interface GigabitEthernet0/1", desc: "Entre en mode config de l'interface" },
      { cmd: "no shutdown", desc: "Active l'interface (sinon elle reste 'administratively down')" }
    ],
    flags: ["shutdown (désactive)", "no shutdown (active)"]
  },
  {
    name: "show spanning-tree",
    os: "cisco",
    category: "Réseau",
    description: "Affiche l'état du protocole Spanning Tree : quel port est root, bloqué ou en transmission — essentiel pour diagnostiquer une boucle réseau.",
    syntax: "show spanning-tree [vlan <id>]",
    examples: [
      { cmd: "show spanning-tree vlan 10", desc: "État STP pour le VLAN 10" },
      { cmd: "show spanning-tree summary", desc: "Vue d'ensemble condensée" }
    ],
    flags: []
  },
  {
    name: "ip nat inside/outside",
    os: "cisco",
    category: "Réseau",
    description: "Configure la traduction d'adresses (NAT) entre un réseau interne et une interface connectée à Internet.",
    syntax: "ip nat inside / ip nat outside (sur les interfaces) + ip nat inside source",
    examples: [
      { cmd: "interface Gi0/1 \\n ip nat inside", desc: "Marque l'interface LAN comme réseau interne" },
      { cmd: "ip nat inside source list 1 interface Gi0/0 overload", desc: "NAT dynamique (PAT) vers l'interface WAN" }
    ],
    flags: ["inside", "outside", "overload (PAT)"]
  },
  {
    name: "copy tftp: / copy running-config tftp:",
    os: "cisco",
    category: "Réseau",
    description: "Sauvegarde ou restaure la configuration via un serveur TFTP — pratique pour archiver ou dupliquer une config entre équipements.",
    syntax: "copy running-config tftp: / copy tftp: running-config",
    examples: [
      { cmd: "copy running-config tftp:", desc: "Envoie la config actuelle vers un serveur TFTP" },
      { cmd: "copy tftp: startup-config", desc: "Récupère une config sauvegardée" }
    ],
    flags: []
  },
  {
    name: "show logging",
    os: "cisco",
    category: "Réseau",
    description: "Affiche le journal des évènements système (erreurs, changements d'état d'interface, accès) stocké en mémoire.",
    syntax: "show logging",
    examples: [
      { cmd: "show logging", desc: "Affiche l'historique des logs internes" },
      { cmd: "show logging | include DOWN", desc: "Ne montre que les évènements d'interface tombée" }
    ],
    flags: []
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

    {
    name: "qm destroy",
    os: "proxmox",
    category: "Virtualisation",
    description: "Supprime définitivement une VM et ses disques associés — irréversible, à utiliser avec précaution.",
    syntax: "qm destroy <vmid>",
    examples: [
      { cmd: "qm destroy 105", desc: "Supprime la VM 105 et libère son stockage" },
      { cmd: "qm destroy 105 --purge", desc: "Supprime aussi les références dans les jobs de sauvegarde" }
    ],
    flags: ["--purge (nettoie aussi les jobs liés)"]
  },
  {
    name: "qm resize",
    os: "proxmox",
    category: "Virtualisation",
    description: "Agrandit le disque virtuel d'une VM à chaud, sans devoir l'éteindre.",
    syntax: "qm resize <vmid> <disque> +<taille>",
    examples: [
      { cmd: "qm resize 105 scsi0 +20G", desc: "Ajoute 20 Go au disque scsi0 de la VM 105" }
    ],
    flags: ["+<taille> (ajoute)", "taille absolue (redéfinit)"]
  },
  {
    name: "qm set",
    os: "proxmox",
    category: "Virtualisation",
    description: "Modifie la configuration d'une VM existante — RAM, CPU, ajout de disque ou de carte réseau — sans passer par l'interface web.",
    syntax: "qm set <vmid> --<option> <valeur>",
    examples: [
      { cmd: "qm set 105 --memory 4096 --cores 2", desc: "Modifie RAM et CPU" },
      { cmd: "qm set 105 --net1 virtio,bridge=vmbr1", desc: "Ajoute une deuxième carte réseau" }
    ],
    flags: ["--memory", "--cores", "--net<n>", "--scsi<n>"]
  },
  {
    name: "qm shutdown / qm stop",
    os: "proxmox",
    category: "Virtualisation",
    description: "Éteint une VM : shutdown fait un arrêt propre via ACPI, stop coupe brutalement (comme débrancher la prise).",
    syntax: "qm shutdown <vmid> / qm stop <vmid>",
    examples: [
      { cmd: "qm shutdown 105", desc: "Arrêt propre, laisse le temps à l'OS de fermer les services" },
      { cmd: "qm stop 105", desc: "Coupe immédiatement, utile si la VM ne répond plus" }
    ],
    flags: ["shutdown (propre)", "stop (forcé)"]
  },
  {
    name: "qm reboot",
    os: "proxmox",
    category: "Virtualisation",
    description: "Redémarre une VM proprement, équivalent à un redémarrage depuis l'intérieur de l'OS.",
    syntax: "qm reboot <vmid>",
    examples: [
      { cmd: "qm reboot 105", desc: "Redémarre la VM 105" }
    ],
    flags: []
  },
  {
    name: "pct destroy",
    os: "proxmox",
    category: "Virtualisation",
    description: "Supprime définitivement un conteneur LXC et son stockage associé.",
    syntax: "pct destroy <vmid>",
    examples: [
      { cmd: "pct destroy 110", desc: "Supprime le conteneur 110" }
    ],
    flags: ["--purge"]
  },
  {
    name: "pct exec",
    os: "proxmox",
    category: "Virtualisation",
    description: "Exécute une commande à l'intérieur d'un conteneur LXC sans y entrer complètement avec pct enter.",
    syntax: "pct exec <vmid> -- <commande>",
    examples: [
      { cmd: "pct exec 110 -- apt update", desc: "Met à jour les paquets du conteneur depuis l'hôte" }
    ],
    flags: ["-- (sépare la commande)"]
  },
  {
    name: "pct resize",
    os: "proxmox",
    category: "Virtualisation",
    description: "Agrandit le disque d'un conteneur LXC à chaud.",
    syntax: "pct resize <vmid> <disque> +<taille>",
    examples: [
      { cmd: "pct resize 110 rootfs +10G", desc: "Ajoute 10 Go au conteneur 110" }
    ],
    flags: ["+<taille>"]
  },
  {
    name: "pvesm add / list",
    os: "proxmox",
    category: "Virtualisation",
    description: "Ajoute ou liste les stockages (local, NFS, ZFS, Ceph...) disponibles sur le cluster Proxmox.",
    syntax: "pvesm add <type> <id> --<options> / pvesm list <storage>",
    examples: [
      { cmd: "pvesm add nfs backup-nfs --server 10.0.0.9 --export /export/backup", desc: "Ajoute un stockage NFS" },
      { cmd: "pvesm list local", desc: "Liste le contenu du stockage 'local'" }
    ],
    flags: []
  },
  {
    name: "pvecm add / nodes",
    os: "proxmox",
    category: "Virtualisation",
    description: "Ajoute un nouveau nœud à un cluster Proxmox existant, ou liste les nœuds déjà membres.",
    syntax: "pvecm add <ip-nœud-existant> / pvecm nodes",
    examples: [
      { cmd: "pvecm add 10.0.0.10", desc: "Rejoint le cluster dont un nœud a cette IP" },
      { cmd: "pvecm nodes", desc: "Liste tous les nœuds du cluster" }
    ],
    flags: []
  },
  {
    name: "systemctl restart pveproxy",
    os: "proxmox",
    category: "Virtualisation",
    description: "Redémarre les services web de Proxmox (interface d'administration) sans affecter les VMs en cours d'exécution.",
    syntax: "systemctl restart pveproxy pvedaemon",
    examples: [
      { cmd: "systemctl restart pveproxy", desc: "Redémarre l'interface web après un changement de certificat SSL" }
    ],
    flags: []
  },
  {
    name: "qmrestore",
    os: "proxmox",
    category: "Virtualisation",
    description: "Restaure une VM à partir d'une sauvegarde créée par vzdump — recrée entièrement la VM depuis l'archive.",
    syntax: "qmrestore <archive.vma> <nouveau-vmid> --storage <stockage>",
    examples: [
      { cmd: "qmrestore /mnt/backup/vzdump-qemu-105.vma.zst 205 --storage local-lvm", desc: "Restaure sous un nouvel ID pour tester sans écraser l'originale" }
    ],
    flags: ["--storage <cible>"]
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

    {
    name: "SHOW TABLES",
    os: "mysql",
    category: "Bases de données",
    description: "Liste toutes les tables de la base de données actuellement sélectionnée.",
    syntax: "SHOW TABLES;",
    examples: [
      { cmd: "USE ma_base; SHOW TABLES;", desc: "Liste les tables de 'ma_base'" }
    ],
    flags: []
  },
  {
    name: "DESCRIBE",
    os: "mysql",
    category: "Bases de données",
    description: "Affiche la structure d'une table : colonnes, types, valeurs par défaut, clés.",
    syntax: "DESCRIBE <table>; / DESC <table>;",
    examples: [
      { cmd: "DESCRIBE utilisateurs;", desc: "Affiche les colonnes de la table" }
    ],
    flags: []
  },
  {
    name: "DROP DATABASE / TABLE",
    os: "mysql",
    category: "Bases de données",
    description: "Supprime définitivement une base de données ou une table entière, avec toutes ses données.",
    syntax: "DROP DATABASE <nom>; / DROP TABLE <nom>;",
    examples: [
      { cmd: "DROP TABLE IF EXISTS logs_temp;", desc: "Supprime la table si elle existe, sans erreur sinon" }
    ],
    flags: ["IF EXISTS (évite l'erreur si absent)"]
  },
  {
    name: "JOIN",
    os: "mysql",
    category: "Bases de données",
    description: "Combine des lignes de plusieurs tables selon une condition de correspondance — la base des requêtes relationnelles.",
    syntax: "SELECT ... FROM <table1> JOIN <table2> ON <condition>;",
    examples: [
      { cmd: "SELECT u.nom, c.total FROM utilisateurs u JOIN commandes c ON u.id = c.user_id;", desc: "Associe chaque utilisateur à ses commandes" },
      { cmd: "... LEFT JOIN ...", desc: "Garde aussi les lignes sans correspondance à droite" }
    ],
    flags: ["INNER JOIN (par défaut)", "LEFT JOIN", "RIGHT JOIN"]
  },
  {
    name: "CREATE INDEX",
    os: "mysql",
    category: "Bases de données",
    description: "Crée un index sur une ou plusieurs colonnes pour accélérer les recherches et les jointures.",
    syntax: "CREATE INDEX <nom> ON <table> (<colonne>);",
    examples: [
      { cmd: "CREATE INDEX idx_email ON utilisateurs (email);", desc: "Accélère les recherches par email" }
    ],
    flags: []
  },
  {
    name: "EXPLAIN",
    os: "mysql",
    category: "Bases de données",
    description: "Affiche le plan d'exécution qu'utiliserait MySQL pour une requête — pour comprendre pourquoi elle est lente et si un index est utilisé.",
    syntax: "EXPLAIN <requête SELECT>;",
    examples: [
      { cmd: "EXPLAIN SELECT * FROM commandes WHERE user_id = 5;", desc: "Montre si un index est utilisé ou si c'est un scan complet" }
    ],
    flags: []
  },
  {
    name: "mysqlcheck",
    os: "mysql",
    category: "Bases de données",
    description: "Vérifie, répare et optimise les tables depuis la ligne de commande, sans se connecter au client mysql.",
    syntax: "mysqlcheck -u <user> -p [--auto-repair] <base>",
    examples: [
      { cmd: "mysqlcheck -u root -p --auto-repair ma_base", desc: "Vérifie et répare automatiquement les tables corrompues" }
    ],
    flags: ["--auto-repair", "--optimize", "--all-databases"]
  },
  {
    name: "mysqlimport",
    os: "mysql",
    category: "Bases de données",
    description: "Importe rapidement un fichier texte (CSV/TSV) directement dans une table, sans écrire de requêtes INSERT.",
    syntax: "mysqlimport -u <user> -p --local <base> <fichier.txt>",
    examples: [
      { cmd: "mysqlimport -u root -p --local ma_base clients.txt", desc: "Importe clients.txt dans la table 'clients'" }
    ],
    flags: ["--local", "--fields-terminated-by=<sep>"]
  },
  {
    name: "REVOKE",
    os: "mysql",
    category: "Bases de données",
    description: "Retire des privilèges précédemment accordés à un utilisateur — l'inverse de GRANT.",
    syntax: "REVOKE <privilège> ON <base>.<table> FROM '<user>'@'<host>';",
    examples: [
      { cmd: "REVOKE DELETE ON ma_base.* FROM 'app'@'localhost';", desc: "Retire le droit de suppression à cet utilisateur" }
    ],
    flags: []
  },
  {
    name: "FLUSH PRIVILEGES",
    os: "mysql",
    category: "Bases de données",
    description: "Recharge les tables de privilèges en mémoire — nécessaire après certaines modifications manuelles des droits.",
    syntax: "FLUSH PRIVILEGES;",
    examples: [
      { cmd: "FLUSH PRIVILEGES;", desc: "Applique immédiatement les changements de droits" }
    ],
    flags: []
  },
  {
    name: "ALTER USER / SET PASSWORD",
    os: "mysql",
    category: "Bases de données",
    description: "Change le mot de passe d'un utilisateur MySQL existant.",
    syntax: "ALTER USER '<user>'@'<host>' IDENTIFIED BY '<mdp>';",
    examples: [
      { cmd: "ALTER USER 'app'@'localhost' IDENTIFIED BY 'NouveauMdp123!';", desc: "Change le mot de passe de cet utilisateur" }
    ],
    flags: []
  },
  {
    name: "mysqlbinlog",
    os: "mysql",
    category: "Bases de données",
    description: "Lit les logs binaires de réplication/transactions — utile pour restaurer jusqu'à un instant précis (point-in-time recovery).",
    syntax: "mysqlbinlog <fichier-binlog>",
    examples: [
      { cmd: "mysqlbinlog binlog.000012 | mysql -u root -p", desc: "Rejoue les transactions enregistrées" }
    ],
    flags: ["--start-datetime", "--stop-datetime"]
  },
  {
    name: "SHOW TABLE STATUS / information_schema",
    os: "mysql",
    category: "Bases de données",
    description: "Interroge les métadonnées internes de MySQL : taille des tables, moteur de stockage, nombre de lignes estimé.",
    syntax: "SELECT * FROM information_schema.tables WHERE table_schema = '<base>';",
    examples: [
      { cmd: "SHOW TABLE STATUS LIKE 'commandes';", desc: "Taille et moteur de la table" },
      { cmd: "SELECT table_name, data_length FROM information_schema.tables ORDER BY data_length DESC;", desc: "Classe les tables par taille" }
    ],
    flags: []
  },
  {
    name: "LOCK TABLES",
    os: "mysql",
    category: "Bases de données",
    description: "Verrouille une ou plusieurs tables pour empêcher d'autres connexions d'y écrire pendant une opération sensible (sauvegarde, migration).",
    syntax: "LOCK TABLES <table> WRITE|READ; ... UNLOCK TABLES;",
    examples: [
      { cmd: "LOCK TABLES commandes WRITE;", desc: "Verrouille en écriture le temps de l'opération" },
      { cmd: "UNLOCK TABLES;", desc: "Libère le verrou" }
    ],
    flags: ["READ", "WRITE"]
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

    {
    name: "nginx -T",
    os: "nginx",
    category: "Web",
    description: "Teste la config comme -t, mais affiche en plus la configuration complète telle que réellement interprétée (tous les include résolus).",
    syntax: "nginx -T",
    examples: [
      { cmd: "sudo nginx -T | less", desc: "Voit la config finale complète, utile pour du debug" }
    ],
    flags: ["-t (teste seulement)", "-T (teste + affiche)"]
  },
  {
    name: "upstream (bloc)",
    os: "nginx",
    category: "Web",
    description: "Déclare un groupe de serveurs backend pour répartir la charge — la base du load balancing avec nginx.",
    syntax: "upstream <nom> { server <ip:port>; ... }",
    examples: [
      { cmd: "upstream backend { server 10.0.0.1:8080; server 10.0.0.2:8080; }", desc: "Deux serveurs backend en round-robin" },
      { cmd: "proxy_pass http://backend;", desc: "Utilisé ensuite dans un bloc location" }
    ],
    flags: ["least_conn;", "ip_hash;", "weight=<n>"]
  },
  {
    name: "gzip",
    os: "nginx",
    category: "Web",
    description: "Compresse les réponses avant envoi pour réduire la bande passante et accélérer le chargement côté client.",
    syntax: "gzip on; gzip_types <types mime>;",
    examples: [
      { cmd: "gzip on;", desc: "Active la compression" },
      { cmd: "gzip_types text/css application/javascript;", desc: "Précise quels types compresser" }
    ],
    flags: ["gzip_min_length", "gzip_comp_level"]
  },
  {
    name: "add_header",
    os: "nginx",
    category: "Web",
    description: "Ajoute un en-tête HTTP personnalisé à la réponse — utilisé pour les en-têtes de sécurité (HSTS, CSP, X-Frame-Options).",
    syntax: "add_header <Nom> <valeur>;",
    examples: [
      { cmd: "add_header X-Frame-Options DENY;", desc: "Empêche l'affichage du site dans une iframe" },
      { cmd: "add_header Strict-Transport-Security \"max-age=63072000\" always;", desc: "Force le HTTPS côté navigateur (HSTS)" }
    ],
    flags: ["always (envoie même sur les erreurs)"]
  },
  {
    name: "error_page",
    os: "nginx",
    category: "Web",
    description: "Définit une page personnalisée à afficher pour un code d'erreur HTTP précis, au lieu de la page par défaut.",
    syntax: "error_page <code> <chemin>;",
    examples: [
      { cmd: "error_page 404 /404.html;", desc: "Page 404 personnalisée" },
      { cmd: "error_page 500 502 503 504 /50x.html;", desc: "Page commune pour les erreurs serveur" }
    ],
    flags: []
  },
  {
    name: "client_max_body_size",
    os: "nginx",
    category: "Web",
    description: "Fixe la taille maximale acceptée pour le corps d'une requête — sans ça, les gros uploads sont rejetés (erreur 413).",
    syntax: "client_max_body_size <taille>;",
    examples: [
      { cmd: "client_max_body_size 50M;", desc: "Autorise des uploads jusqu'à 50 Mo" }
    ],
    flags: []
  },
  {
    name: "map (bloc)",
    os: "nginx",
    category: "Web",
    description: "Crée une variable dont la valeur dépend d'une autre variable, via une table de correspondance — logique conditionnelle sans langage de script.",
    syntax: "map <variable source> <nouvelle variable> { <valeur> <résultat>; }",
    examples: [
      { cmd: "map $http_user_agent $is_bot { default 0; ~*bot 1; }", desc: "Détecte un bot depuis le User-Agent" }
    ],
    flags: []
  },
  {
    name: "include",
    os: "nginx",
    category: "Web",
    description: "Insère le contenu d'un autre fichier de config à cet endroit — permet de découper la config en modules réutilisables.",
    syntax: "include <chemin ou motif>;",
    examples: [
      { cmd: "include /etc/nginx/sites-enabled/*;", desc: "Charge tous les sites activés" },
      { cmd: "include /etc/nginx/snippets/ssl.conf;", desc: "Réutilise un bloc de config SSL commun" }
    ],
    flags: []
  },
  {
    name: "proxy_set_header",
    os: "nginx",
    category: "Web",
    description: "Transmet ou modifie un en-tête envoyé au serveur backend — indispensable pour que celui-ci connaisse l'IP réelle du client derrière le proxy.",
    syntax: "proxy_set_header <Nom> <valeur>;",
    examples: [
      { cmd: "proxy_set_header X-Real-IP $remote_addr;", desc: "Transmet l'IP réelle du visiteur" },
      { cmd: "proxy_set_header Host $host;", desc: "Conserve le nom d'hôte d'origine" }
    ],
    flags: []
  },
  {
    name: "autoindex",
    os: "nginx",
    category: "Web",
    description: "Génère automatiquement une liste de fichiers cliquable quand un dossier ne contient pas de page d'index.",
    syntax: "autoindex on;",
    examples: [
      { cmd: "location /fichiers/ { autoindex on; }", desc: "Affiche le contenu du dossier /fichiers/" }
    ],
    flags: ["autoindex_exact_size off;", "autoindex_format html|json|xml;"]
  },
  {
    name: "stream (bloc)",
    os: "nginx",
    category: "Web",
    description: "Fait proxy/load-balancing sur des protocoles TCP/UDP bruts (base de données, DNS...), pas seulement HTTP.",
    syntax: "stream { server { listen <port>; proxy_pass <backend>; } }",
    examples: [
      { cmd: "stream { upstream db { server 10.0.0.5:5432; } server { listen 5432; proxy_pass db; } }", desc: "Fait transiter du trafic PostgreSQL brut" }
    ],
    flags: []
  },
  {
    name: "resolver",
    os: "nginx",
    category: "Web",
    description: "Précise le serveur DNS que nginx doit utiliser pour résoudre les noms d'hôte dynamiques (backends déclarés par nom, pas par IP fixe).",
    syntax: "resolver <ip> [valid=<durée>];",
    examples: [
      { cmd: "resolver 127.0.0.1 valid=10s;", desc: "Utilise un résolveur local, rafraîchi toutes les 10s" }
    ],
    flags: ["valid=<durée>"]
  },
  {
    name: "allow / deny",
    os: "nginx",
    category: "Web",
    description: "Restreint l'accès à une IP ou un sous-réseau précis — souvent utilisé pour protéger une interface d'admin.",
    syntax: "allow <ip|cidr>; deny <ip|cidr|all>;",
    examples: [
      { cmd: "location /admin/ { allow 192.168.1.0/24; deny all; }", desc: "Admin accessible uniquement depuis le LAN" }
    ],
    flags: ["allow", "deny all"]
  },
  {
    name: "worker_processes / worker_connections",
    os: "nginx",
    category: "Web",
    description: "Règle le nombre de processus worker et de connexions simultanées supportées par worker — le principal levier de perf de nginx.",
    syntax: "worker_processes <n|auto>; events { worker_connections <n>; }",
    examples: [
      { cmd: "worker_processes auto;", desc: "Un worker par cœur CPU disponible" },
      { cmd: "events { worker_connections 1024; }", desc: "1024 connexions max par worker" }
    ],
    flags: ["auto (détecte le nombre de CPU)"]
  },
  {
    name: "nginx -c",
    os: "nginx",
    category: "Web",
    description: "Démarre nginx avec un fichier de configuration alternatif, différent du nginx.conf par défaut.",
    syntax: "nginx -c <fichier>",
    examples: [
      { cmd: "nginx -c /etc/nginx/test.conf -t", desc: "Teste une config alternative avant de basculer dessus" }
    ],
    flags: ["-c <fichier>"]
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

    {
    name: "openssl pkey",
    os: "openssl",
    category: "Sécurité",
    description: "Génère ou manipule des clés modernes (RSA, EC...) via une commande unifiée — remplace progressivement genrsa/ecparam pour la génération.",
    syntax: "openssl genpkey -algorithm <algo> -out <clé.pem>",
    examples: [
      { cmd: "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out cle.pem", desc: "Génère une clé RSA 4096 bits" }
    ],
    flags: ["-algorithm RSA|EC|ED25519"]
  },
  {
    name: "openssl ecparam",
    os: "openssl",
    category: "Sécurité",
    description: "Génère une clé basée sur les courbes elliptiques (EC) — plus courte et plus rapide qu'une clé RSA à sécurité équivalente.",
    syntax: "openssl ecparam -name <courbe> -genkey -out <clé.pem>",
    examples: [
      { cmd: "openssl ecparam -name prime256v1 -genkey -out ec.pem", desc: "Clé EC sur la courbe P-256" }
    ],
    flags: ["-name <courbe>", "-genkey"]
  },
  {
    name: "openssl req -x509",
    os: "openssl",
    category: "Sécurité",
    description: "Génère un certificat auto-signé directement en une commande, sans passer par une étape CSR séparée — pratique pour un lab ou un test interne.",
    syntax: "openssl req -x509 -newkey rsa:<bits> -keyout <clé> -out <cert> -days <n>",
    examples: [
      { cmd: "openssl req -x509 -newkey rsa:4096 -keyout cle.pem -out cert.pem -days 365 -nodes", desc: "Clé + certificat auto-signé en une seule commande" }
    ],
    flags: ["-days <n>", "-nodes (pas de passphrase)"]
  },
  {
    name: "openssl s_server",
    os: "openssl",
    category: "Sécurité",
    description: "Démarre un serveur TLS de test minimal — pratique pour vérifier une configuration client ou un certificat sans monter un vrai serveur.",
    syntax: "openssl s_server -cert <cert> -key <clé> -port <n>",
    examples: [
      { cmd: "openssl s_server -cert cert.pem -key cle.pem -port 4433", desc: "Serveur TLS de test sur le port 4433" }
    ],
    flags: ["-port <n>", "-www (répond en HTTP basique)"]
  },
  {
    name: "openssl smime",
    os: "openssl",
    category: "Sécurité",
    description: "Chiffre ou signe un email au format S/MIME, en utilisant un certificat X.509.",
    syntax: "openssl smime -encrypt -in <fichier> -out <sortie> <cert.pem>",
    examples: [
      { cmd: "openssl smime -encrypt -in message.txt -out message.enc destinataire.pem", desc: "Chiffre un message pour un destinataire précis" }
    ],
    flags: ["-encrypt", "-sign", "-decrypt"]
  },
  {
    name: "openssl dhparam",
    os: "openssl",
    category: "Sécurité",
    description: "Génère les paramètres Diffie-Hellman utilisés pour l'échange de clé — recommandé pour renforcer la config TLS d'un serveur.",
    syntax: "openssl dhparam -out <fichier> <bits>",
    examples: [
      { cmd: "openssl dhparam -out dhparam.pem 2048", desc: "Génère des paramètres DH de 2048 bits (peut prendre du temps)" }
    ],
    flags: []
  },
  {
    name: "openssl asn1parse",
    os: "openssl",
    category: "Sécurité",
    description: "Décode la structure ASN.1 brute d'un certificat ou d'une clé — utile pour du debug bas niveau sur un format X.509.",
    syntax: "openssl asn1parse -in <fichier>",
    examples: [
      { cmd: "openssl asn1parse -in cert.pem", desc: "Affiche la structure interne détaillée du certificat" }
    ],
    flags: []
  },
  {
    name: "openssl storeutl",
    os: "openssl",
    category: "Sécurité",
    description: "Affiche le contenu d'un magasin de clés/certificats (fichier ou périphérique), quel que soit son format d'origine.",
    syntax: "openssl storeutl -text <fichier>",
    examples: [
      { cmd: "openssl storeutl -text cert.pem", desc: "Affiche le contenu lisible du fichier" }
    ],
    flags: ["-text"]
  },
  {
    name: "openssl base64",
    os: "openssl",
    category: "Sécurité",
    description: "Encode ou décode du contenu en base64 — utile pour transporter des données binaires (clés, certificats) dans du texte.",
    syntax: "openssl base64 -in <fichier> [-d]",
    examples: [
      { cmd: "openssl base64 -in cle.bin -out cle.b64", desc: "Encode en base64" },
      { cmd: "openssl base64 -d -in cle.b64 -out cle.bin", desc: "Décode" }
    ],
    flags: ["-d (décode)"]
  },
  {
    name: "openssl version",
    os: "openssl",
    category: "Sécurité",
    description: "Affiche la version d'OpenSSL installée et les options de compilation — utile pour vérifier la présence de failles connues (Heartbleed etc.).",
    syntax: "openssl version [-a]",
    examples: [
      { cmd: "openssl version -a", desc: "Version complète + détails de compilation" }
    ],
    flags: ["-a (tout afficher)"]
  },
  {
    name: "openssl list",
    os: "openssl",
    category: "Sécurité",
    description: "Liste les algorithmes, commandes ou providers disponibles dans l'installation OpenSSL actuelle.",
    syntax: "openssl list -digest-algorithms|-cipher-algorithms",
    examples: [
      { cmd: "openssl list -digest-algorithms", desc: "Liste les algorithmes de hachage disponibles" }
    ],
    flags: ["-digest-algorithms", "-cipher-algorithms"]
  },
  {
    name: "openssl pkcs8",
    os: "openssl",
    category: "Sécurité",
    description: "Convertit une clé privée vers/depuis le format PKCS#8, standard et largement compatible entre outils.",
    syntax: "openssl pkcs8 -topk8 -in <clé> -out <clé-pkcs8>",
    examples: [
      { cmd: "openssl pkcs8 -topk8 -nocrypt -in cle.pem -out cle-pkcs8.pem", desc: "Convertit vers PKCS#8 sans chiffrement" }
    ],
    flags: ["-topk8", "-nocrypt"]
  },
  {
    name: "openssl ts (timestamping)",
    os: "openssl",
    category: "Sécurité",
    description: "Crée ou vérifie un horodatage cryptographique sur un fichier, prouvant qu'il existait à une date donnée sans en révéler le contenu.",
    syntax: "openssl ts -query -data <fichier> -out <requête.tsq>",
    examples: [
      { cmd: "openssl ts -query -data document.pdf -out requete.tsq -sha256", desc: "Prépare une requête d'horodatage" }
    ],
    flags: ["-query", "-verify"]
  },
  {
    name: "openssl x509 -noout -fingerprint",
    os: "openssl",
    category: "Sécurité",
    description: "Calcule l'empreinte unique d'un certificat — pour vérifier rapidement qu'un certificat correspond bien à celui attendu.",
    syntax: "openssl x509 -noout -fingerprint -<algo> -in <cert>",
    examples: [
      { cmd: "openssl x509 -noout -fingerprint -sha256 -in cert.pem", desc: "Empreinte SHA-256 du certificat" }
    ],
    flags: ["-sha256", "-sha1"]
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
  {
    name: "tcpdump -r",
    os: "tcpdump",
    category: "Réseau",
    description: "Relit une capture enregistrée dans un fichier .pcap, pour l'analyser hors ligne ou dans Wireshark.",
    syntax: "tcpdump -r <fichier.pcap> [filtre]",
    examples: [
      { cmd: "tcpdump -r capture.pcap", desc: "Relit tout le fichier" },
      { cmd: "tcpdump -r capture.pcap port 443", desc: "Ne montre que le trafic HTTPS du fichier" }
    ],
    flags: ["-r <fichier> (lecture)", "-w <fichier> (écriture)"]
  },
  {
    name: "tcpdump -c",
    os: "tcpdump",
    category: "Réseau",
    description: "Arrête la capture après un nombre de paquets donné — évite de devoir faire Ctrl+C à la main.",
    syntax: "tcpdump -c <n> [filtre]",
    examples: [
      { cmd: "sudo tcpdump -i eth0 -c 20", desc: "Capture exactement 20 paquets puis s'arrête" }
    ],
    flags: ["-c <n> (nombre de paquets)"]
  },
  {
    name: "tcpdump -s",
    os: "tcpdump",
    category: "Réseau",
    description: "Règle la taille de capture par paquet (snaplen) — utile pour capturer les paquets en entier, en-têtes et données.",
    syntax: "tcpdump -s <octets>",
    examples: [
      { cmd: "sudo tcpdump -i eth0 -s 0 -w full.pcap", desc: "Capture chaque paquet en entier (0 = pas de limite)" }
    ],
    flags: ["-s 0 (taille illimitée)"]
  },
  {
    name: "tcpdump net",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre le trafic par sous-réseau entier (notation CIDR), plutôt qu'une seule IP.",
    syntax: "tcpdump net <réseau/masque>",
    examples: [
      { cmd: "sudo tcpdump net 192.168.1.0/24", desc: "Tout le trafic vers/depuis ce sous-réseau" }
    ],
    flags: ["net <cidr>"]
  },
  {
    name: "tcpdump src / dst",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre le trafic dans un seul sens : uniquement en émission (src) ou en réception (dst).",
    syntax: "tcpdump src|dst <ip>",
    examples: [
      { cmd: "sudo tcpdump src 10.0.0.5", desc: "Uniquement les paquets émis par cette IP" },
      { cmd: "sudo tcpdump dst 10.0.0.5 and port 443", desc: "Uniquement le trafic HTTPS reçu par cette IP" }
    ],
    flags: ["src <ip>", "dst <ip>"]
  },
  {
    name: "tcpdump and / or / not",
    os: "tcpdump",
    category: "Réseau",
    description: "Combine plusieurs filtres avec de la logique booléenne, pour des captures précises.",
    syntax: "tcpdump <filtre1> and|or|not <filtre2>",
    examples: [
      { cmd: "sudo tcpdump host 10.0.0.5 and port 22", desc: "Trafic SSH avec cette IP uniquement" },
      { cmd: "sudo tcpdump not port 22", desc: "Tout sauf le trafic SSH" }
    ],
    flags: ["and", "or", "not"]
  },
  {
    name: "tcpdump -e",
    os: "tcpdump",
    category: "Réseau",
    description: "Affiche les en-têtes de couche liaison (adresses MAC) en plus des en-têtes IP habituels.",
    syntax: "tcpdump -e [filtre]",
    examples: [
      { cmd: "sudo tcpdump -e -i eth0 arp", desc: "Voir les adresses MAC dans les requêtes ARP" }
    ],
    flags: ["-e (en-têtes Ethernet)"]
  },
  {
    name: "tcpdump -D",
    os: "tcpdump",
    category: "Réseau",
    description: "Liste toutes les interfaces disponibles pour la capture, avant de choisir laquelle écouter.",
    syntax: "tcpdump -D",
    examples: [
      { cmd: "tcpdump -D", desc: "Liste les interfaces (eth0, wlan0, any...)" }
    ],
    flags: ["-D (liste les interfaces)"]
  },
  {
    name: "tcpdump -G",
    os: "tcpdump",
    category: "Réseau",
    description: "Fait tourner la capture en continu en créant un nouveau fichier à intervalle régulier — utile pour du monitoring longue durée.",
    syntax: "tcpdump -G <secondes> -w <motif>",
    examples: [
      { cmd: "sudo tcpdump -i eth0 -G 3600 -w capture-%Y%m%d-%H%M.pcap", desc: "Un nouveau fichier chaque heure" }
    ],
    flags: ["-G <secondes>", "-W <n> (nombre max de fichiers)"]
  },
  {
    name: "tcpdump udp",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre uniquement le trafic UDP — DNS, DHCP, streaming, VoIP.",
    syntax: "tcpdump udp [port <n>]",
    examples: [
      { cmd: "sudo tcpdump udp port 53", desc: "Requêtes/réponses DNS" },
      { cmd: "sudo tcpdump udp port 67 or port 68", desc: "Trafic DHCP" }
    ],
    flags: ["udp", "port <n>"]
  },
  {
    name: "tcpdump arp",
    os: "tcpdump",
    category: "Réseau",
    description: "Capture uniquement les requêtes/réponses ARP — pratique pour détecter un conflit d'IP ou une usurpation.",
    syntax: "tcpdump arp",
    examples: [
      { cmd: "sudo tcpdump -i eth0 arp", desc: "Toutes les résolutions IP → MAC sur le segment" }
    ],
    flags: []
  },
  {
    name: "tcpdump -q",
    os: "tcpdump",
    category: "Réseau",
    description: "Affiche une sortie plus courte, une ligne par paquet, sans les détails de protocole — pour une vue d'ensemble rapide.",
    syntax: "tcpdump -q [filtre]",
    examples: [
      { cmd: "sudo tcpdump -q -i eth0", desc: "Sortie condensée, plus lisible pour un gros volume" }
    ],
    flags: ["-q (quiet)"]
  },
  {
    name: "tcpdump portrange",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre une plage de ports plutôt qu'un seul, utile pour surveiller des services multi-ports (FTP passif, RTP...).",
    syntax: "tcpdump portrange <début>-<fin>",
    examples: [
      { cmd: "sudo tcpdump portrange 6000-6100", desc: "Capture toute la plage de ports" }
    ],
    flags: ["portrange <début>-<fin>"]
  },
  {
    name: "tcpdump -S",
    os: "tcpdump",
    category: "Réseau",
    description: "Affiche les numéros de séquence TCP en valeur absolue plutôt qu'en valeur relative — utile pour du debug fin.",
    syntax: "tcpdump -S [filtre]",
    examples: [
      { cmd: "sudo tcpdump -S -i eth0 tcp port 443", desc: "Numéros de séquence bruts, pas relatifs" }
    ],
    flags: ["-S (séquences absolues)"]
  },
  {
    name: "tcpdump greater / less",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre les paquets par taille — repérer de gros paquets (transferts) ou anormalement petits (scans, keepalive).",
    syntax: "tcpdump greater|less <octets>",
    examples: [
      { cmd: "sudo tcpdump greater 1000", desc: "Uniquement les paquets de plus de 1000 octets" },
      { cmd: "sudo tcpdump less 60", desc: "Paquets très courts, souvent des scans ou du contrôle" }
    ],
    flags: ["greater <n>", "less <n>"]
  },

    {
    name: "tcpdump -v / -vv / -vvv",
    os: "tcpdump",
    category: "Réseau",
    description: "Augmente la verbosité de la sortie — plus de détails sur les en-têtes (TTL, options, checksums).",
    syntax: "tcpdump -v|-vv|-vvv [filtre]",
    examples: [
      { cmd: "sudo tcpdump -vv -i eth0 icmp", desc: "Détails complets sur les paquets ICMP" }
    ],
    flags: ["-v", "-vv", "-vvv (de plus en plus verbeux)"]
  },
  {
    name: "tcpdump ip6",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre uniquement le trafic IPv6, à séparer explicitement de l'IPv4 sur un réseau double pile.",
    syntax: "tcpdump ip6 [filtre]",
    examples: [
      { cmd: "sudo tcpdump ip6 and tcp port 443", desc: "HTTPS uniquement en IPv6" }
    ],
    flags: ["ip6", "ip (IPv4 explicite)"]
  },
  {
    name: "tcpdump -Z",
    os: "tcpdump",
    category: "Réseau",
    description: "Abandonne les privilèges root vers un utilisateur normal une fois la capture démarrée — bonne pratique de sécurité.",
    syntax: "tcpdump -Z <utilisateur>",
    examples: [
      { cmd: "sudo tcpdump -i eth0 -Z nobody -w capture.pcap", desc: "Capture avec droits root puis bascule vers 'nobody'" }
    ],
    flags: ["-Z <utilisateur>"]
  },
  {
    name: "tcpdump -K",
    os: "tcpdump",
    category: "Réseau",
    description: "Ignore la vérification des checksums — nécessaire avec certaines cartes réseau qui déchargent ce calcul au matériel (checksum offloading).",
    syntax: "tcpdump -K [filtre]",
    examples: [
      { cmd: "sudo tcpdump -K -i eth0 tcp", desc: "Évite les faux 'bad checksum' liés à l'offloading" }
    ],
    flags: ["-K (ignore les checksums)"]
  },
  {
    name: "tcpdump -x",
    os: "tcpdump",
    category: "Réseau",
    description: "Affiche le contenu du paquet en hexadécimal, sans la partie ASCII (contrairement à -X qui montre les deux).",
    syntax: "tcpdump -x [filtre]",
    examples: [
      { cmd: "sudo tcpdump -x -i eth0 port 53", desc: "Contenu brut des requêtes DNS en hexa" }
    ],
    flags: ["-x (hexa)", "-X (hexa + ASCII)"]
  },
  {
    name: "tcpdump ether host",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre par adresse MAC plutôt que par IP — utile quand une machine change d'IP mais garde la même carte réseau.",
    syntax: "tcpdump ether host <mac>",
    examples: [
      { cmd: "sudo tcpdump ether host aa:bb:cc:dd:ee:ff", desc: "Tout le trafic impliquant cette adresse MAC" }
    ],
    flags: ["ether host", "ether src / ether dst"]
  },
  {
    name: "tcpdump tcp[] (filtre par octet)",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre BPF avancé : accède directement à un octet précis de l'en-tête pour des conditions très spécifiques.",
    syntax: "tcpdump 'tcp[<offset>] <op> <valeur>'",
    examples: [
      { cmd: "sudo tcpdump 'tcp[13] & 4 != 0'", desc: "Paquets avec le flag RST positionné" }
    ],
    flags: ["tcp[13] (octet des flags)"]
  },
  {
    name: "tcpdump -y",
    os: "tcpdump",
    category: "Réseau",
    description: "Force un type de lien précis pour la capture — utile sur des interfaces spéciales (tunnels, bridges).",
    syntax: "tcpdump -y <type>",
    examples: [
      { cmd: "sudo tcpdump -y LINUX_SLL -i any", desc: "Type de lien 'cooked' pour capturer sur toutes les interfaces" }
    ],
    flags: ["-y <type de lien>"]
  },
  {
    name: "tcpdump -U",
    os: "tcpdump",
    category: "Réseau",
    description: "Écrit chaque paquet immédiatement dans le fichier de sortie, sans mise en buffer — utile pour suivre une capture en direct depuis un autre outil.",
    syntax: "tcpdump -U -w <fichier>",
    examples: [
      { cmd: "sudo tcpdump -U -i eth0 -w - | tee capture.pcap", desc: "Écriture immédiate, exploitable en direct" }
    ],
    flags: ["-U (non-bufferisé)"]
  },
  {
    name: "tcpdump -tttt",
    os: "tcpdump",
    category: "Réseau",
    description: "Affiche un horodatage complet et lisible (date + heure) pour chaque paquet, au lieu du format relatif par défaut.",
    syntax: "tcpdump -tttt [filtre]",
    examples: [
      { cmd: "sudo tcpdump -tttt -i eth0", desc: "Horodatage complet, pratique pour croiser avec d'autres logs" }
    ],
    flags: ["-t (aucun horodatage)", "-tttt (complet)"]
  },
  {
    name: "tcpdump vlan <id>",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre le trafic appartenant à un VLAN 802.1Q précis, utile sur un lien trunk qui transporte plusieurs VLANs.",
    syntax: "tcpdump vlan <id>",
    examples: [
      { cmd: "sudo tcpdump vlan 10", desc: "Uniquement le trafic étiqueté VLAN 10" }
    ],
    flags: ["vlan <id>"]
  },
  {
    name: "tcpdump -i any",
    os: "tcpdump",
    category: "Réseau",
    description: "Capture sur toutes les interfaces réseau en même temps, plutôt que d'en choisir une seule.",
    syntax: "tcpdump -i any [filtre]",
    examples: [
      { cmd: "sudo tcpdump -i any port 443", desc: "Trafic HTTPS peu importe l'interface" }
    ],
    flags: ["-i any", "-i <nom> (interface précise)"]
  },
  {
    name: "tcpdump -F",
    os: "tcpdump",
    category: "Réseau",
    description: "Charge l'expression de filtre depuis un fichier texte plutôt que de la taper en ligne de commande — pratique pour des filtres longs et réutilisables.",
    syntax: "tcpdump -F <fichier>",
    examples: [
      { cmd: "echo 'tcp and port 443' > filtre.txt", desc: "Écrit le filtre dans un fichier" },
      { cmd: "sudo tcpdump -F filtre.txt -i eth0", desc: "Réutilise ce filtre" }
    ],
    flags: ["-F <fichier>"]
  },
  {
    name: "tcpdump -w - (pipe vers Wireshark)",
    os: "tcpdump",
    category: "Réseau",
    description: "Envoie la capture en direct vers Wireshark via un tube SSH, pour analyser graphiquement le trafic d'une machine distante.",
    syntax: "ssh <hôte> 'tcpdump -w -' | wireshark -k -i -",
    examples: [
      { cmd: "ssh serveur 'sudo tcpdump -i eth0 -w -' | wireshark -k -i -", desc: "Capture distante affichée en direct localement" }
    ],
    flags: ["-w - (écrit sur stdout)"]
  },
  {
    name: "tcpdump icmp6",
    os: "tcpdump",
    category: "Réseau",
    description: "Filtre spécifiquement le trafic ICMPv6 (ping IPv6, découverte de voisins, annonces de routeur).",
    syntax: "tcpdump icmp6",
    examples: [
      { cmd: "sudo tcpdump icmp6", desc: "Ping IPv6 et messages de découverte de voisinage" }
    ],
    flags: ["icmp6"]
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
    name: "fail2ban-client (jail)",
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
  {
    name: "iptables -F",
    os: "iptables",
    category: "Sécurité",
    description: "Vide (flush) toutes les règles d'une chaîne ou de la table entière — remise à zéro complète.",
    syntax: "iptables -F [chaîne]",
    examples: [
      { cmd: "sudo iptables -F", desc: "Vide toutes les chaînes de la table filter" },
      { cmd: "sudo iptables -F INPUT", desc: "Vide uniquement la chaîne INPUT" },
      { cmd: "sudo iptables -t nat -F", desc: "Vide la table NAT" }
    ],
    flags: ["-t <table> (nat, mangle...)", "sans argument = toute la table"]
  },
  {
    name: "iptables -N",
    os: "iptables",
    category: "Sécurité",
    description: "Crée une chaîne personnalisée, pratique pour regrouper des règles réutilisables (ex : anti-scan).",
    syntax: "iptables -N <nom-chaîne>",
    examples: [
      { cmd: "sudo iptables -N LOG_DROP", desc: "Crée une chaîne personnalisée" },
      { cmd: "sudo iptables -A LOG_DROP -j LOG --log-prefix \"DROP: \"", desc: "Ajoute une règle dedans" },
      { cmd: "sudo iptables -A INPUT -j LOG_DROP", desc: "Renvoie le trafic INPUT vers cette chaîne" }
    ],
    flags: ["-X (supprime une chaîne vide)", "-E (renomme une chaîne)"]
  },
  {
    name: "iptables -I",
    os: "iptables",
    category: "Sécurité",
    description: "Insère une règle à une position précise dans la chaîne, au lieu de l'ajouter à la fin comme -A.",
    syntax: "iptables -I <chaîne> <position> <critères> -j <cible>",
    examples: [
      { cmd: "sudo iptables -I INPUT 1 -p tcp --dport 22 -j ACCEPT", desc: "Insère en tout premier (priorité max)" },
      { cmd: "sudo iptables -I INPUT -s 203.0.113.9 -j DROP", desc: "Insère en tête sans préciser de position" }
    ],
    flags: ["<position> (numéro de ligne)", "sans position = en tête"]
  },
  {
    name: "iptables -R",
    os: "iptables",
    category: "Sécurité",
    description: "Remplace une règle existante à une position donnée, sans devoir la supprimer puis la recréer.",
    syntax: "iptables -R <chaîne> <n° ligne> <critères> -j <cible>",
    examples: [
      { cmd: "sudo iptables -L INPUT --line-numbers", desc: "Repère d'abord le numéro de ligne à modifier" },
      { cmd: "sudo iptables -R INPUT 3 -p tcp --dport 2222 -j ACCEPT", desc: "Remplace la règle n°3" }
    ],
    flags: ["<n° ligne> (via --line-numbers)"]
  },
  {
    name: "iptables -m conntrack",
    os: "iptables",
    category: "Sécurité",
    description: "Filtre selon l'état de connexion (nouvelle, établie, liée) — la base d'un pare-feu stateful correct.",
    syntax: "iptables -A <chaîne> -m conntrack --ctstate <état> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT", desc: "Autorise les réponses aux connexions déjà ouvertes" },
      { cmd: "sudo iptables -A INPUT -m conntrack --ctstate INVALID -j DROP", desc: "Rejette les paquets dans un état incohérent" }
    ],
    flags: ["NEW", "ESTABLISHED", "RELATED", "INVALID"]
  },
  {
    name: "iptables -m limit",
    os: "iptables",
    category: "Sécurité",
    description: "Limite le débit d'une règle — utile contre le flood (ping, tentatives SSH répétées).",
    syntax: "iptables -A <chaîne> -m limit --limit <taux> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/s -j ACCEPT", desc: "Limite les pings à 1 par seconde" },
      { cmd: "sudo iptables -A INPUT -p tcp --dport 22 -m limit --limit 3/min --limit-burst 3 -j ACCEPT", desc: "Anti brute-force SSH basique" }
    ],
    flags: ["--limit <n>/sec|min|hour", "--limit-burst <n>"]
  },
  {
    name: "iptables -j LOG",
    os: "iptables",
    category: "Sécurité",
    description: "Journalise les paquets correspondant à une règle dans les logs noyau (dmesg / journalctl), sans les bloquer.",
    syntax: "iptables -A <chaîne> <critères> -j LOG --log-prefix \"<préfixe>\"",
    examples: [
      { cmd: "sudo iptables -A INPUT -j LOG --log-prefix \"IPT-DROP: \" --log-level 4", desc: "Log avant un DROP final, pour debug" },
      { cmd: "sudo dmesg | grep IPT-DROP", desc: "Relit les paquets journalisés" }
    ],
    flags: ["--log-prefix", "--log-level"]
  },
  {
    name: "iptables -j MASQUERADE",
    os: "iptables",
    category: "Sécurité",
    description: "Fait du NAT dynamique en sortie : permet à un réseau interne de sortir via l'IP publique du routeur.",
    syntax: "iptables -t nat -A POSTROUTING -o <interface> -j MASQUERADE",
    examples: [
      { cmd: "sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE", desc: "Partage la connexion eth0 avec le réseau interne" },
      { cmd: "sudo sysctl -w net.ipv4.ip_forward=1", desc: "À activer aussi côté noyau, sinon le routage ne se fait pas" }
    ],
    flags: ["-o <interface externe>"]
  },
  {
    name: "iptables -j DNAT",
    os: "iptables",
    category: "Sécurité",
    description: "Redirige un port entrant vers une autre machine/port — la base d'une redirection de port (port forwarding).",
    syntax: "iptables -t nat -A PREROUTING -p tcp --dport <port> -j DNAT --to-destination <ip>:<port>",
    examples: [
      { cmd: "sudo iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.50:80", desc: "Renvoie le port 8080 du routeur vers le port 80 d'une VM interne" }
    ],
    flags: ["--to-destination <ip>:<port>"]
  },
  {
    name: "netfilter-persistent",
    os: "iptables",
    category: "Sécurité",
    description: "Sauvegarde les règles iptables actuelles pour qu'elles survivent à un redémarrage (sinon tout se réinitialise).",
    syntax: "netfilter-persistent save|reload",
    examples: [
      { cmd: "sudo apt install iptables-persistent", desc: "Installe le service (Debian/Ubuntu)" },
      { cmd: "sudo netfilter-persistent save", desc: "Écrit les règles actuelles dans /etc/iptables/" }
    ],
    flags: ["save", "reload", "flush"]
  },
  {
    name: "ip6tables",
    os: "iptables",
    category: "Sécurité",
    description: "Équivalent d'iptables pour le trafic IPv6 — des règles séparées, à ne pas oublier si l'IPv6 est actif.",
    syntax: "ip6tables <mêmes options qu'iptables>",
    examples: [
      { cmd: "sudo ip6tables -L -n -v", desc: "Liste les règles IPv6 actives" },
      { cmd: "sudo ip6tables -A INPUT -p tcp --dport 22 -j ACCEPT", desc: "Autorise SSH en IPv6" }
    ],
    flags: ["mêmes options que iptables"]
  },
  {
    name: "nft add table / chain",
    os: "iptables",
    category: "Sécurité",
    description: "Crée la structure de base d'un pare-feu nftables : une table puis une chaîne avec sa politique par défaut.",
    syntax: "nft add table <famille> <nom> ; nft add chain <table> <chaîne> { type filter hook input priority 0 ; }",
    examples: [
      { cmd: "sudo nft add table inet filter", desc: "Crée la table (inet = IPv4 + IPv6)" },
      { cmd: "sudo nft add chain inet filter input { type filter hook input priority 0 \\; policy drop \\; }", desc: "Chaîne INPUT, tout bloqué par défaut" }
    ],
    flags: ["inet (v4+v6)", "hook input|output|forward"]
  },
  {
    name: "nft monitor",
    os: "iptables",
    category: "Sécurité",
    description: "Affiche en direct les paquets qui matchent les règles nftables — équivalent live du -j LOG d'iptables.",
    syntax: "nft monitor trace",
    examples: [
      { cmd: "sudo nft monitor trace", desc: "Trace en direct les paquets qui traversent les règles" }
    ],
    flags: []
  },
  {
    name: "iptables -C",
    os: "iptables",
    category: "Sécurité",
    description: "Vérifie si une règle existe déjà, sans l'ajouter — indispensable pour rendre un script idempotent.",
    syntax: "iptables -C <chaîne> <critères> -j <cible>",
    examples: [
      { cmd: "sudo iptables -C INPUT -p tcp --dport 22 -j ACCEPT || sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT", desc: "N'ajoute la règle que si elle n'existe pas déjà" }
    ],
    flags: ["code retour 0 = existe, 1 = absente"]
  },
  {
    name: "iptables -Z",
    os: "iptables",
    category: "Sécurité",
    description: "Remet à zéro les compteurs de paquets/octets d'une chaîne, sans toucher aux règles elles-mêmes.",
    syntax: "iptables -Z [chaîne]",
    examples: [
      { cmd: "sudo iptables -Z INPUT", desc: "Remet à zéro les compteurs de INPUT" },
      { cmd: "sudo iptables -L -n -v", desc: "Puis observer les compteurs repartir de zéro" }
    ],
    flags: ["sans argument = toutes les chaînes"]
  },

    {
    name: "iptables -m multiport",
    os: "iptables",
    category: "Sécurité",
    description: "Filtre plusieurs ports non contigus dans une seule règle, au lieu d'écrire une règle par port.",
    syntax: "iptables -A <chaîne> -p tcp -m multiport --dports <p1,p2,p3> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -p tcp -m multiport --dports 80,443,8080 -j ACCEPT", desc: "Autorise trois ports web en une règle" }
    ],
    flags: ["--dports (destination)", "--sports (source)"]
  },
  {
    name: "iptables -m recent",
    os: "iptables",
    category: "Sécurité",
    description: "Garde en mémoire les IPs récemment vues et permet de bloquer celles qui reviennent trop souvent — anti brute-force plus fin que -m limit.",
    syntax: "iptables -A <chaîne> -m recent --name <liste> --set|--update",
    examples: [
      { cmd: "sudo iptables -A INPUT -p tcp --dport 22 -m recent --name ssh --set", desc: "Mémorise chaque tentative SSH" },
      { cmd: "sudo iptables -A INPUT -p tcp --dport 22 -m recent --name ssh --update --seconds 60 --hitcount 4 -j DROP", desc: "Bloque si 4 tentatives en 60s" }
    ],
    flags: ["--set", "--update", "--seconds", "--hitcount"]
  },
  {
    name: "iptables -m mac",
    os: "iptables",
    category: "Sécurité",
    description: "Filtre selon l'adresse MAC source — utile en complément d'un filtrage IP sur un réseau local.",
    syntax: "iptables -A <chaîne> -m mac --mac-source <mac> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -m mac --mac-source AA:BB:CC:DD:EE:FF -j ACCEPT", desc: "N'autorise que cette machine par son adresse physique" }
    ],
    flags: ["--mac-source <adresse MAC>"]
  },
  {
    name: "iptables -m owner",
    os: "iptables",
    category: "Sécurité",
    description: "Filtre le trafic sortant selon l'utilisateur système qui l'a émis — restreindre l'accès réseau à un service précis.",
    syntax: "iptables -A OUTPUT -m owner --uid-owner <utilisateur> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A OUTPUT -m owner --uid-owner www-data -j ACCEPT", desc: "Seul l'utilisateur www-data peut sortir sur le réseau" }
    ],
    flags: ["--uid-owner", "--gid-owner"]
  },
  {
    name: "iptables --syn",
    os: "iptables",
    category: "Sécurité",
    description: "Ne matche que les paquets d'ouverture de connexion TCP (SYN), pour filtrer précisément les nouvelles connexions.",
    syntax: "iptables -A <chaîne> -p tcp --syn -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -p tcp --syn -m limit --limit 5/s -j ACCEPT", desc: "Limite le taux de nouvelles connexions TCP" }
    ],
    flags: ["--syn"]
  },
  {
    name: "iptables --tcp-flags",
    os: "iptables",
    category: "Sécurité",
    description: "Filtre selon une combinaison précise de flags TCP — repérer des paquets malformés utilisés en scan furtif.",
    syntax: "iptables -A <chaîne> -p tcp --tcp-flags <masque> <flags posés> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP", desc: "Bloque les paquets sans aucun flag (scan nul)" },
      { cmd: "sudo iptables -A INPUT -p tcp --tcp-flags SYN,FIN SYN,FIN -j DROP", desc: "Bloque les paquets SYN+FIN simultanés (anormaux)" }
    ],
    flags: ["ALL", "NONE", "SYN,ACK,FIN,RST,URG,PSH"]
  },
  {
    name: "nft delete rule",
    os: "iptables",
    category: "Sécurité",
    description: "Supprime une règle nftables précise, identifiée par son handle (numéro interne), sans toucher aux autres.",
    syntax: "nft delete rule <table> <chaîne> handle <n>",
    examples: [
      { cmd: "sudo nft -a list ruleset", desc: "Liste les règles avec leur handle" },
      { cmd: "sudo nft delete rule inet filter input handle 8", desc: "Supprime la règle n°8" }
    ],
    flags: ["-a (affiche les handles)"]
  },
  {
    name: "nft flush ruleset",
    os: "iptables",
    category: "Sécurité",
    description: "Vide entièrement la configuration nftables (toutes tables, chaînes et règles) — repartir de zéro.",
    syntax: "nft flush ruleset",
    examples: [
      { cmd: "sudo nft flush ruleset", desc: "Réinitialise tout nftables" }
    ],
    flags: []
  },
  {
    name: "nft list ruleset -a",
    os: "iptables",
    category: "Sécurité",
    description: "Affiche toutes les tables/chaînes/règles nftables avec leur handle numérique, nécessaire pour cibler une suppression.",
    syntax: "nft -a list ruleset",
    examples: [
      { cmd: "sudo nft -a list ruleset", desc: "Vue complète avec handles" }
    ],
    flags: ["-a (affiche les handles)"]
  },
  {
    name: "iptables -m hashlimit",
    os: "iptables",
    category: "Sécurité",
    description: "Version avancée de -m limit : applique un taux limite par IP source individuelle, pas globalement pour toute la règle.",
    syntax: "iptables -A <chaîne> -m hashlimit --hashlimit-above <taux> --hashlimit-mode srcip --hashlimit-name <nom> -j <cible>",
    examples: [
      { cmd: "sudo iptables -A INPUT -p tcp --dport 22 -m hashlimit --hashlimit-above 3/min --hashlimit-mode srcip --hashlimit-name ssh -j DROP", desc: "Chaque IP est limitée individuellement, pas l'ensemble du trafic" }
    ],
    flags: ["--hashlimit-mode srcip|dstip", "--hashlimit-name"]
  },
  {
    name: "iptables -j REJECT",
    os: "iptables",
    category: "Sécurité",
    description: "Rejette un paquet en renvoyant une erreur explicite à l'émetteur, contrairement à DROP qui ignore silencieusement.",
    syntax: "iptables -A <chaîne> <critères> -j REJECT [--reject-with <type>]",
    examples: [
      { cmd: "sudo iptables -A INPUT -p tcp --dport 8080 -j REJECT --reject-with tcp-reset", desc: "Renvoie un RST au lieu d'ignorer" }
    ],
    flags: ["DROP (silencieux)", "REJECT (répond une erreur)"]
  },
  {
    name: "ipset",
    os: "iptables",
    category: "Sécurité",
    description: "Gère une liste dynamique d'IPs (une blocklist) référencée par une seule règle iptables, au lieu d'une règle par IP.",
    syntax: "ipset create <nom> hash:ip ; iptables ... -m set --match-set <nom> src -j <cible>",
    examples: [
      { cmd: "sudo ipset create blocklist hash:ip", desc: "Crée l'ensemble" },
      { cmd: "sudo ipset add blocklist 203.0.113.9", desc: "Ajoute une IP à bloquer" },
      { cmd: "sudo iptables -A INPUT -m set --match-set blocklist src -j DROP", desc: "Une seule règle pour tout l'ensemble" }
    ],
    flags: ["hash:ip", "hash:net"]
  },
  {
    name: "nft named sets",
    os: "iptables",
    category: "Sécurité",
    description: "Équivalent nftables d'ipset : un ensemble d'adresses nommé, modifiable sans toucher aux règles qui l'utilisent.",
    syntax: "nft add set <table> <nom> { type ipv4_addr \\; }",
    examples: [
      { cmd: "sudo nft add set inet filter blocklist { type ipv4_addr \\; }", desc: "Crée l'ensemble" },
      { cmd: "sudo nft add element inet filter blocklist { 203.0.113.9 }", desc: "Ajoute une IP" }
    ],
    flags: ["type ipv4_addr|ipv6_addr"]
  },
  {
    name: "iptables-apply",
    os: "iptables",
    category: "Sécurité",
    description: "Applique un nouveau jeu de règles avec un filet de sécurité : annule automatiquement si la confirmation n'arrive pas (évite de s'enfermer dehors à distance).",
    syntax: "iptables-apply <fichier-de-règles>",
    examples: [
      { cmd: "sudo iptables-apply /etc/iptables/rules.v4", desc: "Applique, puis annule dans 30s sans confirmation manuelle" }
    ],
    flags: ["-t <secondes> (délai avant rollback)"]
  },
  {
    name: "iptables (INPUT/OUTPUT/FORWARD)",
    os: "iptables",
    category: "Sécurité",
    description: "Les trois chaînes de base : INPUT pour le trafic entrant destiné à la machine, OUTPUT pour le sortant, FORWARD pour ce qui transite (routeur).",
    syntax: "iptables -A INPUT|OUTPUT|FORWARD ...",
    examples: [
      { cmd: "sudo iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT", desc: "Autorise le routage entre deux interfaces" }
    ],
    flags: ["INPUT", "OUTPUT", "FORWARD"]
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
  {
    name: "tmux split-window",
    os: "tmux",
    category: "Système",
    description: "Découpe la fenêtre en plusieurs panneaux, verticalement ou horizontalement, sans ouvrir de nouvelle fenêtre.",
    syntax: "Ctrl+b % (vertical) / Ctrl+b \" (horizontal)",
    examples: [
      { cmd: "Ctrl+b %", desc: "Découpe en deux colonnes côte à côte" },
      { cmd: "Ctrl+b \"", desc: "Découpe en deux lignes l'une sous l'autre" }
    ],
    flags: ["% (vertical)", "\" (horizontal)"]
  },
  {
    name: "tmux select-pane",
    os: "tmux",
    category: "Système",
    description: "Navigue entre les panneaux d'une même fenêtre, sans devoir cliquer à la souris.",
    syntax: "Ctrl+b <flèche>",
    examples: [
      { cmd: "Ctrl+b →", desc: "Passe au panneau de droite" },
      { cmd: "Ctrl+b o", desc: "Passe au panneau suivant, peu importe sa position" }
    ],
    flags: ["flèches directionnelles", "o (suivant)", "q (affiche les numéros)"]
  },
  {
    name: "tmux rename-window / session",
    os: "tmux",
    category: "Système",
    description: "Renomme la fenêtre ou la session en cours, pour s'y retrouver quand plusieurs sont ouvertes.",
    syntax: "Ctrl+b , (fenêtre) / tmux rename-session -t <ancien> <nouveau>",
    examples: [
      { cmd: "Ctrl+b ,", desc: "Renomme la fenêtre active" },
      { cmd: "tmux rename-session -t 0 prod", desc: "Renomme la session '0' en 'prod'" }
    ],
    flags: [", (renomme fenêtre)"]
  },
  {
    name: "tmux list-sessions / windows",
    os: "tmux",
    category: "Système",
    description: "Liste toutes les sessions ou fenêtres ouvertes, avec leur nom et leur statut (attachée ou non).",
    syntax: "tmux ls",
    examples: [
      { cmd: "tmux ls", desc: "Liste toutes les sessions" },
      { cmd: "tmux list-windows -t admin", desc: "Liste les fenêtres de la session 'admin'" }
    ],
    flags: ["ls (alias de list-sessions)"]
  },
  {
    name: "tmux kill-session",
    os: "tmux",
    category: "Système",
    description: "Ferme une session tmux entière, avec toutes ses fenêtres et panneaux — sans avoir à s'y attacher d'abord.",
    syntax: "tmux kill-session -t <nom>",
    examples: [
      { cmd: "tmux kill-session -t admin", desc: "Ferme la session 'admin'" },
      { cmd: "tmux kill-session -a", desc: "Ferme toutes les sessions sauf celle attachée" }
    ],
    flags: ["-t <nom>", "-a (toutes sauf active)"]
  },
  {
    name: "tmux swap-pane",
    os: "tmux",
    category: "Système",
    description: "Échange la position de deux panneaux, pour réorganiser l'affichage sans tout redécouper.",
    syntax: "Ctrl+b { / Ctrl+b }",
    examples: [
      { cmd: "Ctrl+b {", desc: "Échange avec le panneau précédent" },
      { cmd: "Ctrl+b }", desc: "Échange avec le panneau suivant" }
    ],
    flags: ["{ (précédent)", "} (suivant)"]
  },
  {
    name: "tmux set -g",
    os: "tmux",
    category: "Système",
    description: "Change une option globale de tmux (souris, préfixe, thème) — à mettre dans .tmux.conf pour que ce soit permanent.",
    syntax: "tmux set -g <option> <valeur>",
    examples: [
      { cmd: "tmux set -g mouse on", desc: "Active le clic/scroll/redimensionnement à la souris" },
      { cmd: "tmux set -g prefix C-a", desc: "Change le préfixe de Ctrl+b vers Ctrl+a" }
    ],
    flags: ["-g (option globale)"]
  },
  {
    name: "tmux source-file",
    os: "tmux",
    category: "Système",
    description: "Recharge le fichier de config .tmux.conf sans devoir fermer et rouvrir tmux.",
    syntax: "tmux source-file ~/.tmux.conf",
    examples: [
      { cmd: "tmux source-file ~/.tmux.conf", desc: "Applique les changements du fichier de config" }
    ],
    flags: []
  },
  {
    name: "tmux choose-tree",
    os: "tmux",
    category: "Système",
    description: "Ouvre un menu interactif pour naviguer et basculer entre toutes les sessions/fenêtres ouvertes.",
    syntax: "Ctrl+b w",
    examples: [
      { cmd: "Ctrl+b w", desc: "Ouvre l'arborescence interactive des sessions" }
    ],
    flags: ["w"]
  },
  {
    name: "tmux setw synchronize-panes",
    os: "tmux",
    category: "Système",
    description: "Envoie la même frappe clavier à tous les panneaux en même temps — pratique pour lancer la même commande sur plusieurs serveurs.",
    syntax: "tmux setw synchronize-panes on|off",
    examples: [
      { cmd: "tmux setw synchronize-panes on", desc: "Tout ce qui est tapé va dans tous les panneaux" },
      { cmd: "tmux setw synchronize-panes off", desc: "Retour au mode normal" }
    ],
    flags: ["on", "off"]
  },
  {
    name: "tmux zoom-pane",
    os: "tmux",
    category: "Système",
    description: "Agrandit temporairement un panneau en plein écran, sans perdre la disposition des autres.",
    syntax: "Ctrl+b z",
    examples: [
      { cmd: "Ctrl+b z", desc: "Zoome le panneau actif ; rappuyer pour revenir en arrière" }
    ],
    flags: ["z"]
  },
  {
    name: "tmux new-session -d",
    os: "tmux",
    category: "Système",
    description: "Crée une session détachée directement depuis un script, sans jamais s'y attacher — utile pour lancer des tâches en arrière-plan.",
    syntax: "tmux new-session -d -s <nom> '<commande>'",
    examples: [
      { cmd: "tmux new-session -d -s backup 'rsync -av /data /mnt/backup'", desc: "Lance une tâche longue en arrière-plan" }
    ],
    flags: ["-d (détachée)", "-s <nom>"]
  },
  {
    name: "tmux pipe-pane",
    os: "tmux",
    category: "Système",
    description: "Enregistre la sortie d'un panneau dans un fichier en direct — un journal de tout ce qui s'affiche dans la session.",
    syntax: "tmux pipe-pane -o 'cat >> <fichier>'",
    examples: [
      { cmd: "tmux pipe-pane -o 'cat >> session.log'", desc: "Journalise la sortie du panneau actif" }
    ],
    flags: ["-o (bascule on/off)"]
  },
  {
    name: "tmux list-keys",
    os: "tmux",
    category: "Système",
    description: "Affiche tous les raccourcis clavier configurés — utile pour retrouver une combinaison oubliée.",
    syntax: "tmux list-keys",
    examples: [
      { cmd: "tmux list-keys | grep split", desc: "Cherche les raccourcis liés au découpage" }
    ],
    flags: []
  },
  {
    name: "tmux display-message",
    os: "tmux",
    category: "Système",
    description: "Affiche une info ponctuelle dans la barre de statut — nom de session, numéro de panneau, etc. Utile dans des scripts.",
    syntax: "tmux display-message '<texte>'",
    examples: [
      { cmd: "tmux display-message -p '#S:#I.#P'", desc: "Affiche session:fenêtre.panneau" }
    ],
    flags: ["-p (affiche dans le terminal plutôt que la barre de statut)"]
  },

      {
    name: "tmux break-pane",
    os: "tmux",
    category: "Système",
    description: "Transforme un panneau en fenêtre indépendante — pratique pour isoler une tâche qui prend trop de place dans un split.",
    syntax: "Ctrl+b !",
    examples: [
      { cmd: "Ctrl+b !", desc: "Le panneau actif devient sa propre fenêtre" }
    ],
    flags: ["!"]
  },
  {
    name: "tmux join-pane",
    os: "tmux",
    category: "Système",
    description: "Fusionne une fenêtre entière dans un panneau d'une autre fenêtre — l'inverse de break-pane.",
    syntax: "tmux join-pane -s <fenêtre-source> -t <fenêtre-cible>",
    examples: [
      { cmd: "tmux join-pane -s 2 -t 0", desc: "Ramène la fenêtre 2 comme panneau dans la fenêtre 0" }
    ],
    flags: ["-s <source>", "-t <cible>"]
  },
  {
    name: "tmux move-window",
    os: "tmux",
    category: "Système",
    description: "Change le numéro d'une fenêtre, pour réorganiser l'ordre d'affichage dans la barre de statut.",
    syntax: "tmux move-window -s <n> -t <nouveau-n>",
    examples: [
      { cmd: "tmux move-window -t 1", desc: "Déplace la fenêtre active en position 1" }
    ],
    flags: ["-s <source>", "-t <cible>"]
  },
  {
    name: "tmux respawn-pane",
    os: "tmux",
    category: "Système",
    description: "Relance la commande d'un panneau dont le processus s'est terminé, sans avoir à recréer tout le panneau.",
    syntax: "Ctrl+b : puis respawn-pane -k",
    examples: [
      { cmd: "tmux respawn-pane -k -t 0", desc: "Relance le panneau 0, même s'il affiche encore 'terminé'" }
    ],
    flags: ["-k (force même si le panneau est actif)"]
  },
  {
    name: "tmux select-layout",
    os: "tmux",
    category: "Système",
    description: "Applique une disposition prédéfinie aux panneaux existants (en grille, colonnes égales...) sans les redécouper à la main.",
    syntax: "Ctrl+b <espace> ou tmux select-layout <nom>",
    examples: [
      { cmd: "Ctrl+b <espace>", desc: "Passe à la disposition suivante" },
      { cmd: "tmux select-layout tiled", desc: "Répartit tous les panneaux en grille égale" }
    ],
    flags: ["even-horizontal", "even-vertical", "tiled"]
  },
  {
    name: "tmux command-prompt",
    os: "tmux",
    category: "Système",
    description: "Ouvre une invite de commande tmux interactive, pour exécuter n'importe quelle commande tmux à la volée.",
    syntax: "Ctrl+b :",
    examples: [
      { cmd: "Ctrl+b :", desc: "Ouvre l'invite" },
      { cmd: ":resize-pane -D 10", desc: "Exemple de commande tapée ensuite" }
    ],
    flags: [": (ouvre l'invite)"]
  },
  {
    name: "tmux if-shell",
    os: "tmux",
    category: "Système",
    description: "Exécute une commande tmux conditionnellement, selon le résultat d'une commande shell — pratique dans .tmux.conf multi-OS.",
    syntax: "if-shell '<test shell>' '<commande si vrai>' '<sinon>'",
    examples: [
      { cmd: "if-shell 'uname | grep -q Darwin' 'set -g default-shell /bin/zsh'", desc: "Config spécifique si macOS détecté" }
    ],
    flags: []
  },
  {
    name: "tmux set -s / -w / -g",
    os: "tmux",
    category: "Système",
    description: "Portée d'une option : -s pour la session, -w pour la fenêtre, -g pour tout appliquer globalement.",
    syntax: "tmux set -s|-w|-g <option> <valeur>",
    examples: [
      { cmd: "tmux set -w monitor-activity on", desc: "Option limitée à la fenêtre courante" }
    ],
    flags: ["-s (session)", "-w (fenêtre)", "-g (global)"]
  },
  {
    name: "tmux recherche en copy-mode",
    os: "tmux",
    category: "Système",
    description: "Recherche du texte dans le défilement (scrollback) une fois en mode copie, comme dans un pager.",
    syntax: "Ctrl+b [ puis / <motif>",
    examples: [
      { cmd: "Ctrl+b [", desc: "Entre en mode copie" },
      { cmd: "/erreur", desc: "Cherche 'erreur' dans l'historique affiché" }
    ],
    flags: ["/ (recherche avant)", "? (recherche arrière)", "n (occurrence suivante)"]
  },
  {
    name: "tmux buffers (paste-buffer)",
    os: "tmux",
    category: "Système",
    description: "Gère plusieurs presse-papiers internes à tmux, indépendants du presse-papier système.",
    syntax: "Ctrl+b ] (colle) / tmux list-buffers / tmux choose-buffer",
    examples: [
      { cmd: "Ctrl+b ]", desc: "Colle le dernier buffer copié" },
      { cmd: "tmux list-buffers", desc: "Liste tous les buffers en mémoire" }
    ],
    flags: ["] (colle le dernier)", "choose-buffer (sélection interactive)"]
  },
  {
    name: "tmux status-bar (status-right)",
    os: "tmux",
    category: "Système",
    description: "Personnalise le contenu affiché dans la barre de statut — heure, charge système, nom d'hôte.",
    syntax: "set -g status-right '<format>'",
    examples: [
      { cmd: "set -g status-right '#H %H:%M'", desc: "Affiche le nom d'hôte et l'heure" }
    ],
    flags: ["status-left", "status-right", "status-interval"]
  },
  {
    name: "tmux hooks",
    os: "tmux",
    category: "Système",
    description: "Déclenche automatiquement une commande tmux quand un évènement précis se produit (panneau fermé, fenêtre créée...).",
    syntax: "set-hook -g <évènement> '<commande>'",
    examples: [
      { cmd: "set-hook -g pane-died 'display-message \"Le panneau vient de se fermer\"'", desc: "Notifie à la fermeture d'un panneau" }
    ],
    flags: ["pane-died", "session-created", "client-attached"]
  },
  {
    name: "tmuxinator / tmuxp",
    os: "tmux",
    category: "Système",
    description: "Outils externes qui décrivent une disposition tmux complète (fenêtres, panneaux, commandes) dans un fichier YAML, à relancer en une commande.",
    syntax: "tmuxinator start <projet> / tmuxp load <fichier.yaml>",
    examples: [
      { cmd: "tmuxinator start webapp", desc: "Recrée toute la disposition de travail du projet 'webapp'" }
    ],
    flags: []
  },
  {
    name: "tmux attach -d",
    os: "tmux",
    category: "Système",
    description: "Se rattache à une session en détachant automatiquement tous les autres clients déjà connectés, pour éviter les conflits d'affichage.",
    syntax: "tmux attach -d -t <session>",
    examples: [
      { cmd: "tmux attach -d -t admin", desc: "Reprend la main, détache les autres connexions à cette session" }
    ],
    flags: ["-d (détache les autres clients)"]
  },
  {
    name: "tmux resize-window",
    os: "tmux",
    category: "Système",
    description: "Force la taille d'une fenêtre, utile quand plusieurs clients de tailles d'écran différentes partagent la même session.",
    syntax: "tmux resize-window -t <fenêtre> -x <largeur> -y <hauteur>",
    examples: [
      { cmd: "tmux resize-window -t 0 -x 200 -y 50", desc: "Fixe une taille précise pour la fenêtre 0" }
    ],
    flags: ["-x (largeur)", "-y (hauteur)"]
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
  {
    name: "vim :set number",
    os: "vim",
    category: "Système",
    description: "Affiche les numéros de ligne dans la marge — pratique pour naviguer ou référencer une ligne précise.",
    syntax: ":set number / :set nu",
    examples: [
      { cmd: ":set number", desc: "Active les numéros de ligne" },
      { cmd: ":set relativenumber", desc: "Numéros relatifs à la ligne courante" }
    ],
    flags: ["nu (raccourci)", "rnu (relatif)"]
  },
  {
    name: "vim ZZ / ZQ",
    os: "vim",
    category: "Système",
    description: "Raccourcis mode normal pour sauvegarder+quitter (ZZ) ou quitter sans sauvegarder (ZQ), plus rapides que taper :wq.",
    syntax: "ZZ / ZQ",
    examples: [
      { cmd: "ZZ", desc: "Équivalent de :wq — sauvegarde et quitte" },
      { cmd: "ZQ", desc: "Équivalent de :q! — quitte sans sauvegarder" }
    ],
    flags: ["ZZ (save+quit)", "ZQ (quit sans save)"]
  },
  {
    name: "vim macros",
    os: "vim",
    category: "Système",
    description: "Enregistre une suite de touches et la rejoue à volonté — pour répéter une modification sur plusieurs lignes.",
    syntax: "qa ... q puis @a",
    examples: [
      { cmd: "qa", desc: "Démarre l'enregistrement dans le registre 'a'" },
      { cmd: "q", desc: "Arrête l'enregistrement" },
      { cmd: "@a", desc: "Rejoue la macro ; 5@a la rejoue 5 fois" }
    ],
    flags: ["qX (enregistre dans X)", "@X (rejoue X)", "@@ (rejoue la dernière)"]
  },
  {
    name: "vim marks",
    os: "vim",
    category: "Système",
    description: "Pose un signet invisible sur une ligne pour y revenir instantanément, même après avoir navigué ailleurs.",
    syntax: "m<lettre> puis '<lettre>",
    examples: [
      { cmd: "ma", desc: "Pose le signet 'a' à la position actuelle" },
      { cmd: "'a", desc: "Retourne au début de la ligne du signet 'a'" },
      { cmd: "\\`a", desc: "Retourne à la position exacte (ligne + colonne)" }
    ],
    flags: ["m<a-z> (signet local au fichier)", "m<A-Z> (signet global entre fichiers)"]
  },
  {
    name: "vim registres",
    os: "vim",
    category: "Système",
    description: "Copie/colle vers un registre nommé plutôt que le presse-papier par défaut — pour jongler entre plusieurs bouts de texte.",
    syntax: "\"<lettre>yy puis \"<lettre>p",
    examples: [
      { cmd: "\"ayy", desc: "Copie la ligne dans le registre 'a'" },
      { cmd: "\"ap", desc: "Colle le contenu du registre 'a'" },
      { cmd: ":reg", desc: "Liste le contenu de tous les registres" }
    ],
    flags: ["\"a à \"z (registres nommés)", ":reg (liste)"]
  },
  {
    name: "vim :g (global)",
    os: "vim",
    category: "Système",
    description: "Applique une commande à toutes les lignes correspondant à un motif — bien plus puissant qu'un simple remplacement.",
    syntax: ":g/<motif>/<commande>",
    examples: [
      { cmd: ":g/TODO/d", desc: "Supprime toutes les lignes contenant TODO" },
      { cmd: ":g/^#/normal A ;", desc: "Ajoute ' ;' à la fin de chaque ligne commençant par #" }
    ],
    flags: [":g (sur les lignes qui matchent)", ":v ou :g! (sur celles qui ne matchent pas)"]
  },
  {
    name: "vim folding (zf)",
    os: "vim",
    category: "Système",
    description: "Replie des blocs de code ou de texte pour ne voir que la structure générale d'un gros fichier.",
    syntax: "zf<mouvement> puis zo / zc",
    examples: [
      { cmd: "zfip", desc: "Replie le paragraphe courant" },
      { cmd: "zo", desc: "Déplie (open) le repli sous le curseur" },
      { cmd: "zc", desc: "Replie (close) à nouveau" }
    ],
    flags: ["zo (open)", "zc (close)", "za (toggle)", "zR (tout déplier)"]
  },
  {
    name: "vim :set filetype",
    os: "vim",
    category: "Système",
    description: "Active la coloration syntaxique et l'indentation adaptées à un langage, même si l'extension du fichier ne le précise pas.",
    syntax: ":set filetype=<langage>",
    examples: [
      { cmd: ":syntax on", desc: "Active la coloration syntaxique en général" },
      { cmd: ":set filetype=python", desc: "Force la reconnaissance comme fichier Python" }
    ],
    flags: [":syntax on|off", ":set ft=<langage> (raccourci)"]
  },
  {
    name: "vim buffers",
    os: "vim",
    category: "Système",
    description: "Garde plusieurs fichiers ouverts en mémoire (buffers) et bascule entre eux sans les afficher côte à côte.",
    syntax: ":ls puis :b<n>",
    examples: [
      { cmd: ":ls", desc: "Liste tous les buffers ouverts" },
      { cmd: ":bn / :bp", desc: "Buffer suivant / précédent" },
      { cmd: ":b#", desc: "Revient au buffer précédent (comme Ctrl+^)" }
    ],
    flags: [":bn / :bp", ":b<n> (par numéro)", ":bd (ferme le buffer)"]
  },
  {
    name: "vim tabs",
    os: "vim",
    category: "Système",
    description: "Ouvre plusieurs fichiers dans des onglets séparés, chacun pouvant lui-même contenir plusieurs splits.",
    syntax: ":tabnew <fichier> puis gt / gT",
    examples: [
      { cmd: ":tabnew fichier.txt", desc: "Ouvre un nouvel onglet" },
      { cmd: "gt", desc: "Onglet suivant" },
      { cmd: "gT", desc: "Onglet précédent" }
    ],
    flags: ["gt / gT (navigation)", ":tabc (ferme l'onglet)"]
  },
  {
    name: "vim complétion (Ctrl+n)",
    os: "vim",
    category: "Système",
    description: "Complète automatiquement un mot déjà présent ailleurs dans le fichier, en mode insertion.",
    syntax: "Ctrl+n / Ctrl+p (en mode insertion)",
    examples: [
      { cmd: "Ctrl+n", desc: "Propose les mots suivants correspondant au début tapé" },
      { cmd: "Ctrl+p", desc: "Même chose mais parcourt la liste en sens inverse" }
    ],
    flags: ["Ctrl+n (suivant)", "Ctrl+p (précédent)"]
  },
  {
    name: "vim :r (read)",
    os: "vim",
    category: "Système",
    description: "Insère le contenu d'un autre fichier, ou le résultat d'une commande shell, directement dans le buffer courant.",
    syntax: ":r <fichier> / :r !<commande>",
    examples: [
      { cmd: ":r notes.txt", desc: "Insère le contenu de notes.txt à la position du curseur" },
      { cmd: ":r !date", desc: "Insère la sortie de la commande 'date'" }
    ],
    flags: [":r <fichier>", ":r !<commande shell>"]
  },
  {
    name: "vim :sort",
    os: "vim",
    category: "Système",
    description: "Trie les lignes sélectionnées (ou tout le fichier) alphabétiquement, numériquement, ou en ordre inverse.",
    syntax: ":sort / :sort!",
    examples: [
      { cmd: ":sort", desc: "Trie toutes les lignes par ordre alphabétique" },
      { cmd: ":sort!", desc: "Trie en ordre inverse" },
      { cmd: ":sort n", desc: "Trie numériquement" }
    ],
    flags: ["! (inverse)", "n (numérique)", "u (supprime les doublons)"]
  },
  {
    name: "vim indentation (>> <<)",
    os: "vim",
    category: "Système",
    description: "Décale l'indentation d'une ligne ou d'un bloc, ou réindente automatiquement selon la syntaxe détectée.",
    syntax: ">> / << / gg=G",
    examples: [
      { cmd: ">>", desc: "Indente la ligne courante vers la droite" },
      { cmd: "<<", desc: "Désindente la ligne courante" },
      { cmd: "gg=G", desc: "Réindente automatiquement tout le fichier" }
    ],
    flags: [">> / <<", "gg=G (réindentation auto complète)"]
  },
  {
    name: "vim undo tree",
    os: "vim",
    category: "Système",
    description: "Vim garde un historique en arbre, pas juste une pile linéaire — possible de revenir à n'importe quel état passé.",
    syntax: "u / Ctrl+r / :undolist",
    examples: [
      { cmd: "u", desc: "Annule la dernière modification" },
      { cmd: "Ctrl+r", desc: "Rétablit (redo)" },
      { cmd: ":undolist", desc: "Affiche l'arbre complet des états sauvegardés" }
    ],
    flags: ["u (undo)", "Ctrl+r (redo)", ":undolist"]
  },
    {
    name: "vim :normal",
    os: "vim",
    category: "Système",
    description: "Applique une séquence de touches du mode normal à toute une plage de lignes sélectionnées — automatise une modification répétitive.",
    syntax: ":<plage>normal <touches>",
    examples: [
      { cmd: ":%normal A;", desc: "Ajoute un point-virgule à la fin de chaque ligne" },
      { cmd: ":5,10normal I// ", desc: "Commente les lignes 5 à 10" }
    ],
    flags: [":% (tout le fichier)", ":<début>,<fin> (plage précise)"]
  },
  {
    name: "vim text objects (ci( di\")",
    os: "vim",
    category: "Système",
    description: "Modifie ou supprime le contenu à l'intérieur d'une paire de délimiteurs (parenthèses, guillemets, balises) sans les sélectionner à la main.",
    syntax: "ci<délimiteur> / di<délimiteur> / ca<délimiteur>",
    examples: [
      { cmd: "ci\"", desc: "Change le contenu entre guillemets sous le curseur" },
      { cmd: "di(", desc: "Supprime le contenu entre parenthèses" },
      { cmd: "cit", desc: "Change le contenu d'une balise HTML/XML" }
    ],
    flags: ["i (inside, sans les délimiteurs)", "a (around, avec les délimiteurs)"]
  },
  {
    name: "vim :terminal",
    os: "vim",
    category: "Système",
    description: "Ouvre un terminal intégré dans une fenêtre Vim, sans quitter l'éditeur pour lancer une commande.",
    syntax: ":terminal",
    examples: [
      { cmd: ":terminal", desc: "Ouvre un shell dans un split" },
      { cmd: "Ctrl+\\ Ctrl+n", desc: "Repasse en mode normal pour naviguer hors du terminal" }
    ],
    flags: []
  },
  {
    name: "vim gq (reformater un paragraphe)",
    os: "vim",
    category: "Système",
    description: "Reformate un texte pour respecter la largeur de ligne définie (textwidth) — utile pour du texte ou des commentaires longs.",
    syntax: "gq<mouvement>",
    examples: [
      { cmd: ":set textwidth=80", desc: "Définit la largeur cible" },
      { cmd: "gqip", desc: "Reformate le paragraphe courant à cette largeur" }
    ],
    flags: ["gqq (ligne courante)", "gqip (paragraphe)"]
  },
  {
    name: "vim diff (diffthis)",
    os: "vim",
    category: "Système",
    description: "Compare deux fichiers ouverts côte à côte avec les différences surlignées, sans quitter Vim.",
    syntax: ":diffthis (sur chaque fenêtre) / diffget / diffput",
    examples: [
      { cmd: "vim -d fichier1 fichier2", desc: "Ouvre directement en mode diff" },
      { cmd: "]c / [c", desc: "Saute à la différence suivante / précédente" },
      { cmd: "do / dp", desc: "Récupère (obtain) ou envoie (put) un bloc de l'autre fichier" }
    ],
    flags: ["]c / [c (navigation)", "do (obtain)", "dp (put)"]
  },
  {
    name: "vim :set spell",
    os: "vim",
    category: "Système",
    description: "Active la correction orthographique en surlignant les mots suspects, avec navigation et suggestions.",
    syntax: ":set spell spelllang=<langue>",
    examples: [
      { cmd: ":set spell spelllang=fr", desc: "Active la correction en français" },
      { cmd: "]s / [s", desc: "Mot mal orthographié suivant / précédent" },
      { cmd: "z=", desc: "Propose des corrections pour le mot sous le curseur" }
    ],
    flags: ["]s / [s (navigation)", "z= (suggestions)", "zg (ajoute au dictionnaire)"]
  },
  {
    name: "vim jump list (Ctrl+o / Ctrl+i)",
    os: "vim",
    category: "Système",
    description: "Navigue dans l'historique des déplacements du curseur, comme les boutons précédent/suivant d'un navigateur web.",
    syntax: "Ctrl+o / Ctrl+i",
    examples: [
      { cmd: "Ctrl+o", desc: "Retourne à la position précédente" },
      { cmd: "Ctrl+i", desc: "Avance vers la position suivante" }
    ],
    flags: ["Ctrl+o (arrière)", "Ctrl+i (avant)", ":jumps (historique complet)"]
  },
  {
    name: "vim :mksession",
    os: "vim",
    category: "Système",
    description: "Sauvegarde l'état complet d'une session d'édition (fichiers ouverts, splits, position du curseur) pour la reprendre plus tard.",
    syntax: ":mksession <fichier.vim>",
    examples: [
      { cmd: ":mksession ~/session.vim", desc: "Sauvegarde la session actuelle" },
      { cmd: "vim -S ~/session.vim", desc: "Rouvre exactement dans le même état" }
    ],
    flags: ["-S <fichier> (au lancement)"]
  },
  {
    name: "vim netrw (:Explore)",
    os: "vim",
    category: "Système",
    description: "Explorateur de fichiers intégré à Vim, sans plugin — naviguer et ouvrir des fichiers depuis l'éditeur.",
    syntax: ":Explore / :Vexplore",
    examples: [
      { cmd: ":Explore", desc: "Ouvre l'explorateur dans la fenêtre courante" },
      { cmd: ":Vexplore", desc: "Ouvre l'explorateur dans un split vertical" }
    ],
    flags: [":Explore", ":Vexplore (vertical)", ":Sexplore (horizontal)"]
  },
  {
    name: "vim :iabbrev",
    os: "vim",
    category: "Système",
    description: "Définit une abréviation qui se transforme automatiquement en texte complet pendant la saisie — gagner du temps sur des formules répétitives.",
    syntax: ":iabbrev <raccourci> <texte complet>",
    examples: [
      { cmd: ":iabbrev @@ mon.email@exemple.com", desc: "Taper @@ puis espace insère l'adresse complète" }
    ],
    flags: []
  },
  {
    name: "vim digraphs (Ctrl+k)",
    os: "vim",
    category: "Système",
    description: "Insère un caractère spécial en tapant une combinaison de deux lettres, sans clavier dédié (accents, symboles).",
    syntax: "Ctrl+k <lettre1><lettre2> (en mode insertion)",
    examples: [
      { cmd: "Ctrl+k e:", desc: "Insère 'ë'" },
      { cmd: ":digraphs", desc: "Liste tous les digraphes disponibles" }
    ],
    flags: []
  },
  {
    name: "vim :set wrap / nowrap",
    os: "vim",
    category: "Système",
    description: "Active ou désactive le retour à la ligne visuel pour les lignes plus longues que la fenêtre — utile pour du code avec de longues lignes.",
    syntax: ":set wrap / :set nowrap",
    examples: [
      { cmd: ":set nowrap", desc: "Les longues lignes défilent horizontalement au lieu de revenir à la ligne" }
    ],
    flags: ["wrap (défaut)", "nowrap"]
  },
  {
    name: "vim % (bracket matching)",
    os: "vim",
    category: "Système",
    description: "Saute instantanément à la parenthèse, accolade ou crochet correspondant — très utile pour naviguer dans du code imbriqué.",
    syntax: "%",
    examples: [
      { cmd: "%", desc: "Depuis une accolade ouvrante, saute à sa fermante (et inversement)" }
    ],
    flags: []
  },
  {
    name: "vim :changes / :jumps",
    os: "vim",
    category: "Système",
    description: "Affiche l'historique des modifications ou des déplacements effectués dans le fichier — retrouver où on a travaillé récemment.",
    syntax: ":changes / :jumps",
    examples: [
      { cmd: ":changes", desc: "Liste les positions des dernières modifications" },
      { cmd: "g;", desc: "Va directement au dernier endroit modifié" }
    ],
    flags: ["g; (dernier changement)", "g, (change suivant)"]
  },
  {
    name: "vim plugins (packadd)",
    os: "vim",
    category: "Système",
    description: "Charge un plugin installé manuellement dans le dossier pack/, sans gestionnaire de plugins externe.",
    syntax: ":packadd <nom-du-plugin>",
    examples: [
      { cmd: ":packadd matchit", desc: "Charge le plugin natif matchit (améliore % )" }
    ],
    flags: []
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

    {
    name: "npm list",
    os: "npm",
    category: "Développement",
    description: "Affiche l'arborescence des dépendances installées, avec leurs versions et sous-dépendances.",
    syntax: "npm list [--depth=<n>]",
    examples: [
      { cmd: "npm list --depth=0", desc: "N'affiche que les dépendances directes" },
      { cmd: "npm list react", desc: "Cherche où 'react' apparaît dans l'arbre" }
    ],
    flags: ["--depth=<n>", "-g (global)"]
  },
  {
    name: "npm dedupe",
    os: "npm",
    category: "Développement",
    description: "Réorganise l'arbre de dépendances pour fusionner les versions dupliquées quand c'est possible, allégeant node_modules.",
    syntax: "npm dedupe",
    examples: [
      { cmd: "npm dedupe", desc: "Nettoie les doublons de versions compatibles" }
    ],
    flags: []
  },
  {
    name: "npm link",
    os: "npm",
    category: "Développement",
    description: "Relie un package local en développement à un autre projet, sans devoir le publier sur le registre — pratique pour tester une librairie avant publication.",
    syntax: "npm link (dans le package) puis npm link <package> (dans le projet)",
    examples: [
      { cmd: "cd ma-lib && npm link", desc: "Rend la librairie locale liable" },
      { cmd: "cd mon-projet && npm link ma-lib", desc: "L'utilise comme si elle était installée" }
    ],
    flags: []
  },
  {
    name: "npm publish",
    os: "npm",
    category: "Développement",
    description: "Publie le package courant sur le registre npm (ou un registre privé), le rendant installable par d'autres.",
    syntax: "npm publish [--access public|restricted]",
    examples: [
      { cmd: "npm publish --access public", desc: "Publie un package sous scope (@user/pkg) en accès public" }
    ],
    flags: ["--access public|restricted", "--dry-run (simulation)"]
  },
  {
    name: "npm version",
    os: "npm",
    category: "Développement",
    description: "Incrémente automatiquement la version dans package.json en respectant le versionnage sémantique, et crée un tag Git correspondant.",
    syntax: "npm version patch|minor|major",
    examples: [
      { cmd: "npm version patch", desc: "1.2.3 → 1.2.4" },
      { cmd: "npm version minor", desc: "1.2.3 → 1.3.0" }
    ],
    flags: ["patch", "minor", "major"]
  },
  {
    name: "npm test",
    os: "npm",
    category: "Développement",
    description: "Lance le script de tests défini dans package.json — raccourci conventionnel pour npm run test.",
    syntax: "npm test",
    examples: [
      { cmd: "npm test", desc: "Exécute la suite de tests du projet" }
    ],
    flags: []
  },
  {
    name: "npm exec",
    os: "npm",
    category: "Développement",
    description: "Exécute un binaire d'un package sans l'installer de façon permanente — équivalent moderne de npx.",
    syntax: "npm exec <paquet> -- <arguments>",
    examples: [
      { cmd: "npm exec cowsay -- \"Hello\"", desc: "Exécute cowsay sans l'ajouter aux dépendances" }
    ],
    flags: ["-- (sépare les args du paquet)"]
  },
  {
    name: "npm workspaces",
    os: "npm",
    category: "Développement",
    description: "Gère plusieurs packages liés (monorepo) depuis un seul package.json racine, avec des dépendances partagées.",
    syntax: "npm install -w <workspace> / npm run <script> --workspaces",
    examples: [
      { cmd: "npm run build --workspaces", desc: "Lance le build dans chaque sous-projet du monorepo" }
    ],
    flags: ["-w <nom>", "--workspaces (tous)"]
  },
  {
    name: "npm fund",
    os: "npm",
    category: "Développement",
    description: "Liste les liens de financement (sponsoring) des packages utilisés dans le projet.",
    syntax: "npm fund",
    examples: [
      { cmd: "npm fund", desc: "Affiche les liens vers les pages de sponsoring des dépendances" }
    ],
    flags: []
  },
  {
    name: "npm doctor",
    os: "npm",
    category: "Développement",
    description: "Diagnostique l'environnement npm : connexion au registre, permissions, cache — utile en cas de comportement bizarre.",
    syntax: "npm doctor",
    examples: [
      { cmd: "npm doctor", desc: "Vérifie que tout l'environnement npm fonctionne correctement" }
    ],
    flags: []
  },
  {
    name: "npm prune",
    os: "npm",
    category: "Développement",
    description: "Supprime de node_modules les packages qui ne sont plus listés dans package.json — nettoie les résidus après suppression de dépendances.",
    syntax: "npm prune [--production]",
    examples: [
      { cmd: "npm prune --production", desc: "Ne garde que les dépendances de production" }
    ],
    flags: ["--production"]
  },
  {
    name: ".npmrc",
    os: "npm",
    category: "Développement",
    description: "Fichier de configuration npm (registre utilisé, proxy, tokens d'authentification) — au niveau projet ou utilisateur.",
    syntax: "~/.npmrc ou ./.npmrc",
    examples: [
      { cmd: "registry=https://registry.npmjs.org/", desc: "Précise le registre à utiliser" },
      { cmd: "npm config set registry <url>", desc: "Modifie .npmrc en ligne de commande" }
    ],
    flags: []
  },
  {
    name: "npm pack",
    os: "npm",
    category: "Développement",
    description: "Génère l'archive .tgz qui serait publiée, sans la publier — pour vérifier son contenu exact avant publication.",
    syntax: "npm pack",
    examples: [
      { cmd: "npm pack", desc: "Crée mon-package-1.0.0.tgz dans le dossier courant" },
      { cmd: "tar -tzf mon-package-1.0.0.tgz", desc: "Inspecte les fichiers réellement inclus" }
    ],
    flags: []
  },
  {
    name: "package-lock.json",
    os: "npm",
    category: "Développement",
    description: "Fige les versions exactes de toutes les dépendances (directes et transitives) pour garantir des installations identiques partout.",
    syntax: "généré automatiquement par npm install",
    examples: [
      { cmd: "npm ci", desc: "Installe strictement depuis ce fichier, sans le modifier" }
    ],
    flags: []
  },
  {
    name: "npm rebuild",
    os: "npm",
    category: "Développement",
    description: "Recompile les modules natifs (bindings C++) déjà installés — utile après un changement de version de Node.",
    syntax: "npm rebuild [paquet]",
    examples: [
      { cmd: "npm rebuild", desc: "Recompile tous les modules natifs pour la version de Node actuelle" }
    ],
    flags: []
  },
  {
    name: "npm ls -g",
    os: "npm",
    category: "Développement",
    description: "Liste les packages installés globalement sur la machine, en dehors de tout projet.",
    syntax: "npm ls -g --depth=0",
    examples: [
      { cmd: "npm ls -g --depth=0", desc: "Liste les CLI installées globalement (ex : nodemon, typescript)" }
    ],
    flags: ["-g", "--depth=0"]
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
  {
    name: "python3 -m pip",
    os: "python",
    category: "Développement",
    description: "Invoque pip via l'interpréteur Python explicitement — évite les ambiguïtés quand plusieurs versions de Python coexistent.",
    syntax: "python3 -m pip <commande>",
    examples: [
      { cmd: "python3 -m pip install requests", desc: "Garantit que le paquet va dans le bon environnement Python" }
    ],
    flags: []
  },
  {
    name: "python3 -c",
    os: "python",
    category: "Développement",
    description: "Exécute une ligne de code Python directement depuis le terminal, sans créer de fichier.",
    syntax: "python3 -c '<code>'",
    examples: [
      { cmd: "python3 -c 'import sys; print(sys.version)'", desc: "Affiche la version de Python en une commande" }
    ],
    flags: ["-c <code>"]
  },
  {
    name: "black",
    os: "python",
    category: "Développement",
    description: "Reformate automatiquement le code Python selon un style unique et non-négociable — plus de débat sur le style.",
    syntax: "black <fichier|dossier>",
    examples: [
      { cmd: "black .", desc: "Reformate tous les fichiers Python du dossier" },
      { cmd: "black --check .", desc: "Vérifie sans modifier (utile en CI)" }
    ],
    flags: ["--check", "--diff"]
  },
  {
    name: "ruff",
    os: "python",
    category: "Développement",
    description: "Linter Python ultra-rapide qui repère les erreurs de style et les bugs potentiels avant l'exécution.",
    syntax: "ruff check <fichier|dossier>",
    examples: [
      { cmd: "ruff check .", desc: "Analyse tout le projet" },
      { cmd: "ruff check --fix .", desc: "Corrige automatiquement ce qui peut l'être" }
    ],
    flags: ["--fix"]
  },
  {
    name: "python3 -m cProfile",
    os: "python",
    category: "Développement",
    description: "Profile l'exécution d'un script pour identifier les fonctions qui prennent le plus de temps.",
    syntax: "python3 -m cProfile <script.py>",
    examples: [
      { cmd: "python3 -m cProfile -s cumulative script.py", desc: "Trie les résultats par temps cumulé" }
    ],
    flags: ["-s cumulative|time (tri des résultats)"]
  },
  {
    name: "requirements.txt",
    os: "python",
    category: "Développement",
    description: "Fichier listant les dépendances d'un projet Python, pour les réinstaller à l'identique ailleurs.",
    syntax: "pip freeze > requirements.txt / pip install -r requirements.txt",
    examples: [
      { cmd: "pip freeze > requirements.txt", desc: "Génère la liste depuis l'environnement actuel" },
      { cmd: "pip install -r requirements.txt", desc: "Réinstalle exactement ces dépendances ailleurs" }
    ],
    flags: ["-r <fichier>"]
  },
  {
    name: "python3 -m build",
    os: "python",
    category: "Développement",
    description: "Construit les artefacts de distribution d'un package Python (wheel et sdist), prêts à être publiés sur PyPI.",
    syntax: "python3 -m build",
    examples: [
      { cmd: "python3 -m build", desc: "Génère les fichiers dans dist/" }
    ],
    flags: []
  },
  {
    name: "poetry",
    os: "python",
    category: "Développement",
    description: "Gestionnaire de dépendances et de packaging Python tout-en-un — alternative moderne à pip + venv + setup.py séparés.",
    syntax: "poetry init / poetry add <paquet> / poetry install",
    examples: [
      { cmd: "poetry new mon-projet", desc: "Crée la structure d'un nouveau projet" },
      { cmd: "poetry add requests", desc: "Ajoute une dépendance et met à jour le lock file" },
      { cmd: "poetry shell", desc: "Active l'environnement virtuel du projet" }
    ],
    flags: []
  },
  {
    name: "python3 -i",
    os: "python",
    category: "Développement",
    description: "Lance un script puis reste dans un interpréteur interactif — pratique pour inspecter les variables après exécution.",
    syntax: "python3 -i <script.py>",
    examples: [
      { cmd: "python3 -i analyse.py", desc: "Exécute puis garde la console ouverte avec les variables du script" }
    ],
    flags: ["-i (interactif après exécution)"]
  },
  {
    name: "__pycache__ / .pyc",
    os: "python",
    category: "Développement",
    description: "Dossier de cache généré automatiquement contenant le bytecode compilé — accélère les imports suivants, peut être supprimé sans risque.",
    syntax: "find . -name __pycache__ -exec rm -rf {} +",
    examples: [
      { cmd: "find . -type d -name __pycache__ -exec rm -rf {} +", desc: "Supprime tous les caches du projet" },
      { cmd: "python3 -B script.py", desc: "N'écrit aucun fichier .pyc pour cette exécution" }
    ],
    flags: ["-B (n'écrit pas de cache)"]
  },
  {
    name: "python3 -m timeit",
    os: "python",
    category: "Développement",
    description: "Mesure précisément le temps d'exécution d'un petit bout de code, en répétant plusieurs fois pour lisser les variations.",
    syntax: "python3 -m timeit '<code>'",
    examples: [
      { cmd: "python3 -m timeit '\"-\".join(str(n) for n in range(100))'", desc: "Compare la performance de différentes approches" }
    ],
    flags: ["-n <n> (nombre d'exécutions)"]
  },
  {
    name: "mypy",
    os: "python",
    category: "Développement",
    description: "Vérifie statiquement les annotations de type Python, pour attraper des erreurs de type avant l'exécution.",
    syntax: "mypy <fichier|dossier>",
    examples: [
      { cmd: "mypy mon_projet/", desc: "Vérifie tout le dossier" },
      { cmd: "mypy --strict fichier.py", desc: "Mode strict, exige des annotations partout" }
    ],
    flags: ["--strict"]
  },
  {
    name: "python3 -m site",
    os: "python",
    category: "Développement",
    description: "Affiche les chemins utilisés par Python pour chercher les modules — utile pour déboguer un problème d'import ou d'environnement.",
    syntax: "python3 -m site",
    examples: [
      { cmd: "python3 -m site", desc: "Affiche sys.path et l'emplacement des packages installés" }
    ],
    flags: []
  },
  {
    name: "conda",
    os: "python",
    category: "Développement",
    description: "Gestionnaire d'environnements et de paquets scientifique, alternative à venv/pip très utilisée en data science (gère aussi des dépendances non-Python).",
    syntax: "conda create -n <nom> python=<version> / conda activate <nom>",
    examples: [
      { cmd: "conda create -n data python=3.11 pandas numpy", desc: "Crée un environnement avec des paquets scientifiques" },
      { cmd: "conda activate data", desc: "Active l'environnement" }
    ],
    flags: ["-n <nom>"]
  },
  {
    name: "python3 -m pdb <script>",
    os: "python",
    category: "Développement",
    description: "Lance un script directement sous débogueur, en s'arrêtant à la première ligne — contrairement à pdb.set_trace() qui demande de modifier le code.",
    syntax: "python3 -m pdb <script.py>",
    examples: [
      { cmd: "python3 -m pdb script.py", desc: "Démarre en pause avant la première instruction" }
    ],
    flags: []
  },
  {
    name: "python3 -O",
    os: "python",
    category: "Développement",
    description: "Lance Python en mode optimisé : retire les assertions (assert) et le code de debug conditionné par __debug__.",
    syntax: "python3 -O <script.py>",
    examples: [
      { cmd: "python3 -O script.py", desc: "Ignore tous les 'assert' du script" }
    ],
    flags: ["-O", "-OO (retire aussi les docstrings)"]
  },
  // ── UNIVERSEL : TRAITEMENT DE TEXTE & ESSENTIELS ──────────
  {
    name: "jq",
    os: "universal",
    category: "Fichiers",
    description: "Manipule et filtre du JSON en ligne de commande — le grep/sed du JSON.",
    syntax: "jq '<filtre>' [fichier.json]",
    examples: [
      { cmd: "curl -s https://api.site.fr/users | jq '.'", desc: "Affiche le JSON joliment indenté" },
      { cmd: "jq '.users[].name' data.json", desc: "Extrait le nom de chaque utilisateur" },
      { cmd: "jq -r '.items[] | select(.prix > 10) | .nom' catalogue.json", desc: "Filtre puis extrait en texte brut" }
    ],
    flags: ["-r (sortie brute sans guillemets)", ".champ / .[] (accès et itération)", "select(condition)", "| (enchaîne les filtres)"]
  },
  {
    name: "cut",
    os: "universal",
    category: "Fichiers",
    description: "Extrait des colonnes ou des plages de caractères de chaque ligne.",
    syntax: "cut -d <délim> -f <champs> [fichier]",
    examples: [
      { cmd: "cut -d: -f1 /etc/passwd", desc: "Liste tous les noms d'utilisateurs" },
      { cmd: "echo \"a,b,c\" | cut -d, -f2", desc: "Extrait le 2e champ (b)" },
      { cmd: "cut -c1-8 fichier.txt", desc: "Les 8 premiers caractères de chaque ligne" }
    ],
    flags: ["-d (délimiteur)", "-f (numéros de champs)", "-c (plage de caractères)"]
  },
  {
    name: "sort",
    os: "universal",
    category: "Fichiers",
    description: "Trie les lignes d'un texte : alphabétique, numérique, inversé, par colonne.",
    syntax: "sort [options] [fichier]",
    examples: [
      { cmd: "sort noms.txt", desc: "Tri alphabétique" },
      { cmd: "du -sh * | sort -rh", desc: "Dossiers du plus gros au plus petit" },
      { cmd: "sort -t: -k3 -n /etc/passwd", desc: "Tri numérique sur la 3e colonne (UID)" }
    ],
    flags: ["-n (numérique)", "-r (inverse)", "-u (supprime les doublons)", "-k (colonne)", "-h (tailles humaines : K, M, G)"]
  },
  {
    name: "uniq",
    os: "universal",
    category: "Fichiers",
    description: "Supprime ou compte les lignes dupliquées adjacentes — toujours après un sort.",
    syntax: "sort fichier | uniq [options]",
    examples: [
      { cmd: "sort ips.txt | uniq", desc: "Liste sans doublons" },
      { cmd: "sort ips.txt | uniq -c | sort -rn | head", desc: "Top des IP les plus fréquentes" },
      { cmd: "sort liste.txt | uniq -d", desc: "N'affiche que les doublons" }
    ],
    flags: ["-c (compte les occurrences)", "-d (doublons seulement)", "-u (lignes uniques seulement)"]
  },
  {
    name: "tr",
    os: "universal",
    category: "Fichiers",
    description: "Remplace, supprime ou compresse des caractères dans un flux.",
    syntax: "tr [options] <jeu1> [jeu2]",
    examples: [
      { cmd: "echo 'bonjour' | tr 'a-z' 'A-Z'", desc: "Passe en majuscules" },
      { cmd: "tr -d '\\r' < windows.txt > unix.txt", desc: "Retire les retours chariot Windows" },
      { cmd: "echo 'a    b' | tr -s ' '", desc: "Compresse les espaces répétés" }
    ],
    flags: ["-d (supprime le jeu de caractères)", "-s (compresse les répétitions)"]
  },
  {
    name: "xargs",
    os: "universal",
    category: "Système",
    description: "Construit et exécute des commandes à partir de l'entrée standard (sortie d'un find, d'un cat…).",
    syntax: "<commande> | xargs [options] <commande2>",
    examples: [
      { cmd: "find . -name '*.tmp' | xargs rm", desc: "Supprime tous les fichiers trouvés" },
      { cmd: "cat urls.txt | xargs -n1 curl -O", desc: "Télécharge chaque URL, une par une" },
      { cmd: "find . -name '*.log' -print0 | xargs -0 grep ERROR", desc: "Gère les noms avec espaces (-print0/-0)" }
    ],
    flags: ["-n1 (un argument par commande)", "-0 (entrées séparées par NUL)", "-I {} (placeholder)", "-P <n> (exécutions en parallèle)"]
  },
  {
    name: "tee",
    os: "universal",
    category: "Fichiers",
    description: "Duplique un flux : affiche à l'écran ET écrit dans un fichier en même temps.",
    syntax: "<commande> | tee [-a] <fichier>",
    examples: [
      { cmd: "make 2>&1 | tee build.log", desc: "Voit la compilation et la journalise" },
      { cmd: "echo '10.0.0.5 srv1' | sudo tee -a /etc/hosts", desc: "Ajoute une ligne à un fichier protégé (le sudo s'applique à tee)" }
    ],
    flags: ["-a (ajoute à la fin au lieu d'écraser)"]
  },
  {
    name: "tail",
    os: "universal",
    category: "Fichiers",
    description: "Affiche la fin d'un fichier ; avec -f, suit un journal en temps réel.",
    syntax: "tail [-n N] [-f] <fichier>",
    examples: [
      { cmd: "tail -n 50 app.log", desc: "Les 50 dernières lignes" },
      { cmd: "tail -f /var/log/syslog", desc: "Suit le journal en direct (Ctrl+C pour quitter)" },
      { cmd: "tail -f app.log | grep ERROR", desc: "Ne montre que les erreurs au fil de l'eau" }
    ],
    flags: ["-n (nombre de lignes)", "-f (suivre en continu)", "-F (suit même si le fichier est recréé, ex. logrotate)"]
  },
  {
    name: "column",
    os: "universal",
    category: "Fichiers",
    description: "Aligne du texte en colonnes lisibles, pratique pour les sorties denses.",
    syntax: "<commande> | column -t [-s <délim>]",
    examples: [
      { cmd: "mount | column -t", desc: "Sortie de mount alignée" },
      { cmd: "column -t -s: /etc/passwd", desc: "Fichier passwd en tableau lisible" }
    ],
    flags: ["-t (mode tableau)", "-s (délimiteur d'entrée)"]
  },
  {
    name: "crontab",
    os: "universal",
    category: "Système",
    description: "Planifie des tâches récurrentes : sauvegardes nocturnes, scripts de maintenance…",
    syntax: "crontab [-e | -l | -r]",
    examples: [
      { cmd: "crontab -e", desc: "Édite tes tâches planifiées" },
      { cmd: "crontab -l", desc: "Liste les tâches actuelles" },
      { cmd: "0 3 * * * /home/tom/backup.sh", desc: "Ligne : tous les jours à 3h00 (min heure jour mois jour-semaine)" }
    ],
    flags: ["-e (éditer)", "-l (lister)", "-r (tout supprimer !)", "@reboot / @daily (raccourcis)"]
  },
  {
    name: "wget",
    os: "universal",
    category: "Réseau",
    description: "Télécharge des fichiers via HTTP/FTP ; sait reprendre un téléchargement interrompu.",
    syntax: "wget [options] <url>",
    examples: [
      { cmd: "wget https://site.fr/fichier.iso", desc: "Téléchargement simple" },
      { cmd: "wget -c https://site.fr/gros-fichier.iso", desc: "Reprend là où ça s'était arrêté" },
      { cmd: "wget -r -np -k https://docs.site.fr/", desc: "Aspire un site pour lecture hors-ligne" }
    ],
    flags: ["-c (reprendre)", "-O <nom> (renommer)", "-r (récursif)", "-q (silencieux)"]
  },
  {
    name: "scp",
    os: "universal",
    category: "Réseau",
    description: "Copie des fichiers entre machines à travers SSH, dans les deux sens.",
    syntax: "scp [options] <source> <destination>",
    examples: [
      { cmd: "scp fichier.txt tom@srv:/tmp/", desc: "Envoie un fichier vers le serveur" },
      { cmd: "scp tom@srv:/var/log/app.log .", desc: "Rapatrie un fichier du serveur" },
      { cmd: "scp -r dossier/ tom@srv:~/", desc: "Copie un dossier entier" }
    ],
    flags: ["-r (récursif)", "-P <port> (port SSH non standard)", "-C (compression)"]
  },
  {
    name: "htop",
    os: "universal",
    category: "Processus",
    description: "Moniteur de processus interactif : CPU, RAM, arbre des processus, kill au clavier.",
    syntax: "htop [-u utilisateur]",
    examples: [
      { cmd: "htop", desc: "Vue d'ensemble interactive" },
      { cmd: "htop -u www-data", desc: "Seulement les processus d'un utilisateur" },
      { cmd: "F5 / F9 / F6", desc: "Arbre / tuer un processus / changer le tri" }
    ],
    flags: ["-u (filtre par utilisateur)", "-p <PID> (processus précis)", "-d (délai de rafraîchissement)"]
  },
  {
    name: "ln",
    os: "universal",
    category: "Fichiers",
    description: "Crée des liens entre fichiers ; -s crée un lien symbolique (raccourci).",
    syntax: "ln -s <cible> <lien>",
    examples: [
      { cmd: "ln -s /var/www/monsite ~/site", desc: "Raccourci vers le dossier du site" },
      { cmd: "ln -sf /etc/nginx/sites-available/monsite /etc/nginx/sites-enabled/", desc: "Active un vhost nginx (écrase si existe)" },
      { cmd: "ls -l", desc: "Les liens symboliques montrent leur cible avec →" }
    ],
    flags: ["-s (symbolique)", "-f (remplace si le lien existe)", "sans -s : lien dur (même inode)"]
  },
  {
    name: "watch",
    os: "universal",
    category: "Système",
    description: "Relance une commande à intervalle régulier et affiche son résultat en continu.",
    syntax: "watch [-n sec] [-d] <commande>",
    examples: [
      { cmd: "watch -n 2 df -h", desc: "Surveille l'espace disque toutes les 2 s" },
      { cmd: "watch -d free -h", desc: "Surligne ce qui change dans la mémoire" },
      { cmd: "watch 'ss -t | wc -l'", desc: "Compte les connexions TCP en direct" }
    ],
    flags: ["-n (intervalle en secondes)", "-d (surligne les différences)"]
  },
];

// Fusion dans l'annuaire principal (data.js doit être chargé avant)
if (typeof COMMANDS !== 'undefined') {
  COMMANDS.push.apply(COMMANDS, EXTRA_COMMANDS);
}


