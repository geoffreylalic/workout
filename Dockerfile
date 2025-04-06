# Utilisation de l'image officielle Node.js basée sur Alpine
FROM node:20-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

COPY app/ /app/
# Copie des fichiers du projet dans le conteneur

# Installation des dépendances
RUN npm install

# Exposition du port (exemple pour une API)
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start"]
