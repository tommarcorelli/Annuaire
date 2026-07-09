/* MANPAGES.EXE — scenarios-data.js
   Index des scénarios — source unique de vérité, utilisé par :
   - global-search.js  → recherche globale de l'accueil (chargé à la demande)
   - commands.js       → liens « 🧭 apparaît dans » sur les fiches commandes
   - scenarios.html    → liens « fiches commandes » sous chaque scénario
   `cmds` contient les noms EXACTS des commandes de data.js / data-extra.js. */

const SCENARIOS_DATA = [
  {
    id: 'sc-nginx', icon: '🌐',
    title: "Déployer un site Nginx avec HTTPS",
    kw: 'nginx https ssl tls certbot lets encrypt vhost site web debian',
    cmds: ['apt update', 'apt install', 'systemctl', 'curl', 'mkdir', 'tee', 'ln', 'ufw', 'certbot', 'nginx -t', 'nginx -s reload', 'server (bloc)', 'ssl_certificate']
  },
  {
    id: 'sc-secure', icon: '🔐',
    title: 'Sécuriser un serveur Linux fraîchement installé',
    kw: 'ssh ufw fail2ban cle securite durcir root pare-feu serveur',
    cmds: ['apt update', 'adduser', 'usermod -aG', 'ssh-keygen', 'ssh', 'systemctl', 'ufw', 'fail2ban-client', 'dpkg-reconfigure']
  },
  {
    id: 'sc-vlan', icon: '🔀',
    title: 'Créer un VLAN sur un switch Cisco',
    kw: 'cisco vlan trunk switch reseau segmentation ios',
    cmds: ['enable', 'configure terminal', 'vlan', 'switchport mode', 'interface', 'show vlan brief', 'copy running-config startup-config']
  },
  {
    id: 'sc-proxmox', icon: '🖥️',
    title: 'Créer puis sauvegarder une VM sur Proxmox',
    kw: 'proxmox vm qm vzdump sauvegarde virtualisation snapshot',
    cmds: ['pvesm status', 'qm create', 'qm start', 'qm list', 'vzdump', 'qm config']
  },
  {
    id: 'sc-docker', icon: '🐳',
    title: 'Conteneuriser et publier une application avec Docker',
    kw: 'docker conteneur image dockerfile hub build push',
    cmds: ['docker build', 'docker run', 'docker ps', 'docker logs', 'docker exec', 'docker login / docker logout', 'docker tag', 'docker pull / docker push', 'docker stop / docker rm', 'docker system prune', 'Dockerfile (build multi-stage)']
  },
  {
    id: 'sc-mysql', icon: '🗄️',
    title: 'Installer MySQL et automatiser les sauvegardes',
    kw: 'mysql mariadb dump cron base de donnees sql backup',
    cmds: ['mysql', 'mysql_secure_installation', 'CREATE DATABASE', 'CREATE USER', 'GRANT', 'mysqldump', 'crontab -e', 'systemctl status mysql']
  },
  {
    id: 'sc-reseau', icon: '📡',
    title: 'Diagnostiquer une panne réseau, étape par étape',
    kw: 'reseau ping dns dig traceroute tcpdump panne internet',
    cmds: ['ip a', 'ping', 'dig', 'traceroute', 'nc (netcat)', 'ss', 'tcpdump -i', 'tcpdump host']
  },
  {
    id: 'sc-k8s', icon: '☸️',
    title: 'Déployer une application sur Kubernetes',
    kw: 'kubernetes kubectl k8s deploiement pod service rollout cluster',
    cmds: ['kubectl config', 'kubectl get nodes', 'kubectl get namespace / kubectl create namespace', 'kubectl create deployment', 'kubectl expose', 'kubectl get', 'kubectl logs', 'kubectl scale', 'kubectl set image', 'kubectl rollout', 'kubectl delete']
  },
  {
    id: 'sc-ansible', icon: '🤖',
    title: 'Automatiser avec un premier playbook Ansible',
    kw: 'ansible playbook yaml automatisation inventaire idempotence',
    cmds: ['apt install', 'ansible all -m ping', 'ansible-playbook', 'ansible-playbook --check', 'ansible-playbook --diff', 'ansible-inventory']
  },
  {
    id: 'sc-wireguard', icon: '🕶️',
    title: 'Monter un VPN WireGuard',
    kw: 'wireguard vpn tunnel wg chiffrement distant',
    cmds: ['apt install', 'ufw', 'systemctl', 'ping']
  },
  {
    id: 'sc-disk', icon: '💾',
    title: 'Disque plein : trouver et faire de la place',
    kw: 'disque plein espace df du nettoyer stockage no space left',
    cmds: ['df', 'du', 'find', 'journalctl', 'apt-get autoremove', 'docker system prune', 'lsof', 'lsblk']
  },
  {
    id: 'sc-logs', icon: '🔎',
    title: 'Analyser les logs après un incident',
    kw: 'logs journaux incident journalctl grep awk erreur analyse debug',
    cmds: ['journalctl', 'grep', 'tail', 'awk', 'sort', 'uniq', 'less', 'wc']
  },
  {
    id: 'sc-process', icon: '🐌',
    title: 'La machine rame : trouver le coupable',
    kw: 'lent rame cpu memoire processus top htop kill performance',
    cmds: ['htop', 'top', 'ps', 'ss', 'lsof', 'dmesg', 'kill', 'watch']
  },
  {
    id: 'sc-backup', icon: '🗃️',
    title: 'Automatiser ses sauvegardes avec rsync + cron',
    kw: 'sauvegarde backup rsync cron tar archive restauration rotation',
    cmds: ['rsync', 'tar', 'crontab -e', 'find', 'diff', 'mkdir']
  },
  {
    id: 'sc-users', icon: '👥',
    title: 'Utilisateurs, groupes et permissions propres',
    kw: 'utilisateur groupe permission chmod chown droits rwx adduser',
    cmds: ['adduser', 'usermod -aG', 'ls', 'mkdir', 'chown', 'chmod']
  },
  {
    id: 'sc-transfer', icon: '📤',
    title: 'Transférer des fichiers entre deux machines',
    kw: 'transfert fichier scp rsync copier machine distante ssh',
    cmds: ['scp', 'rsync', 'tar', 'ssh', 'python3 -m http.server', 'openssl dgst']
  },
  {
    id: 'sc-service', icon: '⚙️',
    title: 'Transformer son script en service systemd',
    kw: 'systemd service unit daemon demarrage boot restart application',
    cmds: ['systemctl', 'journalctl']
  },
  {
    id: 'sc-usb', icon: '🔌',
    title: 'Identifier, formater et monter un disque',
    kw: 'disque usb formater monter partition fstab lsblk mkfs mount',
    cmds: ['lsblk', 'dmesg', 'parted', 'blkid', 'mkfs', 'mount', 'umount', 'mkdir', 'df']
  },
  {
    id: 'sc-gitstart', icon: '🌿',
    title: 'Publier son premier projet sur GitHub',
    kw: 'git github init commit push depot projet gitignore remote',
    cmds: ['git init', 'git status', 'git gitignore', 'git add', 'git commit', 'git branch', 'git remote', 'git push / git pull', 'git log']
  },
  {
    id: 'sc-gitfix', icon: '🚑',
    title: 'Réparer ses bêtises Git (sans tout casser)',
    kw: 'git annuler erreur restore revert reset reflog stash amend',
    cmds: ['git status', 'git log', 'git restore', 'git commit --amend', 'git stash', 'git revert', 'git reflog', 'git reset']
  },
  {
    id: 'sc-nmap', icon: '🛰️',
    title: 'Cartographier son propre réseau avec Nmap',
    kw: 'nmap scan reseau ports audit securite decouverte hosts',
    cmds: ['nmap (scan simple)', 'nmap -sn', 'nmap -sV', 'nmap -p', 'nmap --top-ports', 'nmap -A', 'nmap -oN / -oX']
  },
  {
    id: 'sc-winclean', icon: '🪟',
    title: 'Windows lent : diagnostic et réparation',
    kw: 'windows lent sfc dism chkdsk reparer nettoyage processus',
    cmds: ['systeminfo', 'Get-Process', 'tasklist / taskkill', 'sfc /scannow', 'DISM', 'chkdsk', 'Get-WinEvent', 'Sort-Object', 'Select-Object', 'Where-Object']
  },
  {
    id: 'sc-psauto', icon: '⚡',
    title: 'Automatiser un nettoyage avec PowerShell',
    kw: 'powershell script automatiser tache planifiee schtasks archive',
    cmds: ['Set-ExecutionPolicy', 'Get-ChildItem', 'Where-Object', 'Compress-Archive / Expand-Archive', 'ForEach-Object', 'Out-File / Tee-Object', 'schtasks']
  },
  {
    id: 'sc-tmux', icon: '🧵',
    title: 'Survivre en SSH avec tmux',
    kw: 'tmux session ssh detach attach terminal multiplexeur panneaux',
    cmds: ['tmux new', 'tmux attach', 'tmux detach (Ctrl+b d)', 'tmux windows (Ctrl+b c)', 'tmux copy-mode (Ctrl+b [)', 'tmux kill-server']
  },
  {
    id: 'sc-vim', icon: '✏️',
    title: "S'en sortir dans Vim (et finir par l'aimer)",
    kw: 'vim editeur quitter sauver modes insertion remplacer vimrc',
    cmds: ['vim (modes)', ':w :q :wq', 'hjkl / déplacement', 'dd yy p', '/recherche', ':%s (remplacer)', '.vimrc']
  },
  {
    id: 'sc-python', icon: '🐍',
    title: 'Un environnement Python propre pour chaque projet',
    kw: 'python venv pip environnement virtuel requirements pipx uv',
    cmds: ['python3 -m venv', 'pip install', 'pip freeze / list', 'pipx', 'uv', 'python3']
  },
  {
    id: 'sc-proxy', icon: '🔁',
    title: 'Un seul serveur, plusieurs applis : reverse proxy Nginx',
    kw: 'nginx reverse proxy proxy_pass 502 domaine sous-domaine applis',
    cmds: ['curl', 'ss', 'proxy_pass', 'server (bloc)', 'ln', 'nginx -t', 'systemctl', 'certbot', 'tail']
  },
  {
    id: 'sc-wordpress', icon: '🩹',
    title: 'Réparer un site WordPress cassé',
    kw: 'wordpress page blanche erreur 500 502 database connection plugin php',
    cmds: ['curl', 'tail', 'journalctl', 'systemctl', 'mysql', 'mv', 'chown', 'chmod', 'find', 'mysqldump', 'tar']
  },
  {
    id: 'sc-migrate', icon: '🚚',
    title: 'Migrer un serveur vers une nouvelle machine',
    kw: 'migration serveur demenagement hebergeur vps transfert dns bascule',
    cmds: ['ss', 'df', 'mysqldump', 'tar', 'rsync', 'apt install', 'mysql', 'nginx -t', 'systemctl', 'curl', 'dig', 'tail']
  },
  {
    id: 'sc-acl', icon: '🚧',
    title: 'Filtrer le trafic avec une ACL Cisco',
    kw: 'cisco acl access-list filtrage trafic wildcard permit deny',
    cmds: ['enable', 'configure terminal', 'access-list', 'interface', 'show running-config', 'ping', 'copy running-config startup-config']
  },
  {
    id: 'sc-ci', icon: '🏗️',
    title: 'Ton premier pipeline CI avec GitHub Actions',
    kw: 'ci github actions pipeline tests automatiques workflow yaml badge',
    cmds: ['mkdir', 'git add', 'git commit', 'git push / git pull', 'npm ci', 'npm run']
  },
  {
    id: 'sc-luks', icon: '🔒',
    title: 'Chiffrer un disque avec LUKS',
    kw: 'luks chiffrement disque cryptsetup securite coffre phrase de passe',
    cmds: ['lsblk', 'mkfs', 'mount', 'umount', 'mkdir', 'df']
  },
  {
    id: 'sc-terraform', icon: '🧱',
    title: 'Provisionner une infra depuis zéro avec Terraform',
    kw: 'terraform iac infrastructure as code provider plan apply state hashicorp',
    cmds: ['terraform init', 'terraform validate', 'terraform plan', 'terraform apply', 'terraform state list', 'terraform show', 'terraform destroy']
  },
  {
    id: 'sc-vagrant', icon: '📦',
    title: 'Monter un lab VM reproductible avec Vagrant',
    kw: 'vagrant vagrantfile box vm virtualbox vmware lab reproductible provisioning',
    cmds: ['vagrant init', 'vagrant box', 'vagrant up', 'vagrant ssh', 'vagrant status', 'vagrant suspend / resume', 'vagrant destroy']
  },
  {
    id: 'sc-helm', icon: '⎈',
    title: 'Déployer une application avec Helm sur Kubernetes',
    kw: 'helm kubernetes k8s chart namespace release rollback upgrade package manager',
    cmds: ['helm repo add / update', 'helm search repo', 'helm show values', 'helm install --namespace --create-namespace', 'helm list', 'helm status', 'helm upgrade', 'helm rollback']
  },
  {
    id: 'sc-ad', icon: '🗂️',
    title: 'Créer un utilisateur, une OU et une GPO dans Active Directory',
    kw: 'active directory ad ds ou utilisateur groupe gpo strategie de groupe powershell windows server annuaire',
    cmds: ['New-ADOrganizationalUnit', 'New-ADUser', 'Get-ADUser', 'Get-ADGroup / Add-ADGroupMember', 'New-GPO', 'gpupdate', 'dcdiag']
  },
];
