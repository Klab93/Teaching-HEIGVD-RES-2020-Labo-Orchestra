FROM node:14.17

COPY src /opt/app

WORKDIR /opt/app
RUN npm install --production

ENTRYPOINT ["node", "/opt/app/auditor.js"]