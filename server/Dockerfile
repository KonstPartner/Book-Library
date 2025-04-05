FROM node:20-slim

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm install --no-save typescript

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 4000