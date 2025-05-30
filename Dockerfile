FROM node:20
WORKDIR /app
COPY . /app
RUN npm install 
EXPOSE 3000
# "--"+"--host" permet à vite de lire tout les ports
CMD [ "npm", "run","dev", "--", "--host" ]