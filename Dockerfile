FROM node:16-alpine
WORKDIR /
COPY package*.json ./
RUN npm install

COPY . .
# RUN npx prisma generate
# RUN npx prisma migrate
EXPOSE 5000
CMD npm run dev