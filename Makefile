PWD := $(shell pwd)
APP := farmer-ui
IMAGE := ckeyer/dev:node

GIT_COMMIT := $(shell git rev-parse --short HEAD)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
PACKAGE_NAME := $(APP)-$(GIT_COMMIT).tgz

INSTALL_DIR := /opt/data

NET := $(shell docker network inspect cknet > /dev/zero && echo "--net cknet --ip 172.16.1.6" || echo "")
dev:
	docker run --rm \
	 $(NET) \
	 --link dev:apiserver \
	 --name $(APP)-dev \
	 -p 8080:8080 \
	 -v $(PWD):/opt/$(APP) \
	 -w /opt/$(APP) \
	 -it $(IMAGE) bash

build-pack:
	docker run --rm \
	 -v $(PWD):/opt/$(APP) \
	 -v $(INSTALL_DIR):$(INSTALL_DIR) \
	 -w /opt/$(APP) \
	 $(IMAGE) make pack

pack:
	-rm -rf ./dist
	npm install
	npm run build
	tar zcf $(INSTALL_DIR)/$(PACKAGE_NAME) ./dist/

install:
	cp -a $(INSTALL_DIR)/$(PACKAGE_NAME) $(INSTALL_DIR)/$(APP)-$(GIT_BRANCH).tgz
