PWD := $(shell pwd)
APP := farmer-ui
IMAGE := ckeyer/dev:node

GIT_COMMIT := $(shell git rev-parse --short HEAD)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
PACKAGE_NAME := $(APP)-$(GIT_COMMIT).tgz

INSTALL_DIR := /opt/data

init: init-indocker

init-indocker:
	docker run --rm \
	 --name init-ui \
	 -v $(PWD):/opt/$(APP) \
	 -w /opt/$(APP) \
	 $(IMAGE) make init-node

init-node:
	npm install -g grunt grunt-cli bower uglifyjs
	npm install
	bower install --allow-root
	-$(shell cd bower_components/slimscroll || ln -s bower_components/jquery-slimscroll bower_components/slimscroll)
	cd bower_components/sparkline && make

build-pack:
	docker run --rm \
	 --name init-ui \
	 -v $(INSTALL_DIR):$(INSTALL_DIR) \
	 -v $(PWD):/opt/$(APP) \
	 -w /opt/$(APP) \
	 $(IMAGE) make pack

pack: init-node
	-rm -rf dist
	grunt build
	tar zcf $(INSTALL_DIR)/$(PACKAGE_NAME) ./dist/

install:
	cp -a $(INSTALL_DIR)/$(PACKAGE_NAME) $(INSTALL_DIR)/$(APP)-$(GIT_BRANCH).tgz