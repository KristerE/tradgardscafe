# Använd officiell Node.js-bild
FROM node:20

# Ange arbetskatalog
WORKDIR /app

# Kopiera beroende-filer först
COPY package*.json ./

# Installera beroenden
RUN npm install

# Kopiera resten av appen
COPY . .

# Öppna port
EXPOSE 3000

# Startkommandot
CMD ["npm", "start"]
