FROM node:18

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy project
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
