# DOCKER-VERSION 0.3.4
FROM	centos:centos7

# From Node wiki
RUN	curl -sL https://rpm.nodesource.com/setup | bash -
RUN	yum install -y nodejs

# Bundle app source
ADD	. /src
# Install app dependencies
RUN	cd /src; npm install

EXPOSE	8080
CMD	["node", "/src/index.js"]
