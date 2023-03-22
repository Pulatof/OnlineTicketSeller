# Bu qatorda bazov imajni ko'rsatamiz
FROM node:latest

# Ishga tushirish uchun direktoriyani belgilaymiz
WORKDIR /usr/src/app

# Fayllarni kopyalash
COPY package*.json ./

# Paketlar yuklanadi
RUN npm install

# Proyekt fayllari kopyalaymiz
COPY . .

# Portni aniqlaymiz
EXPOSE 3000

# Dasturni ishga tushiramiz
CMD [ "npm", "start" ]