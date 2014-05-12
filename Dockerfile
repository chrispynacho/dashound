# DOCKER-VERSION 0.10.0

FROM    centos

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# App
ADD . /src
# Install app dependencies
RUN cd /src; rm -rf node_modules; npm cache clear; npm install

EXPOSE  3000
# CMD ["mongod"]
CMD ["npm", "start"]
