PWD := $(shell pwd)
APP := farmer-ui
DEV_IMAGE := ckeyer/dev:node

ifdef GIT_COMMIT
GIT_COMMIT := $(shell echo $(GIT_COMMIT)|cut -b -7)
else
GIT_COMMIT := $(shell git rev-parse --short HEAD)
endif

ifdef GIT_BRANCH
GIT_BRANCH := $(notdir $(GIT_BRANCH))
else
GIT_BRANCH_TMP := $(shell git rev-parse HEAD | git branch -a --contains | grep remotes | grep -o "[^ ]\+\( \+[^ ]\+\)*")
GIT_BRANCH := $(notdir $(GIT_BRANCH_TMP))
ifeq ($(GIT_BRANCH),)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
endif
endif

PACKAGE_NAME := $(APP)-$(GIT_COMMIT).tgz

INSTALL_DIR := /opt/data

echo:
	echo $(GIT_COMMIT)
	echo $(GIT_BRANCH)

build:
	docker run --rm \
	 --name init-ui \
	 -v $(PWD):/opt/$(APP) \
	 -w /opt/$(APP) \
	 $(DEV_IMAGE) make build-local

build-local: echo clean
	npm install
	grunt build

build-pack: build pack

pack:
	tar zcf $(INSTALL_DIR)/$(PACKAGE_NAME) ./dist/

install:
	cp -a $(INSTALL_DIR)/$(PACKAGE_NAME) $(INSTALL_DIR)/$(APP)-$(GIT_BRANCH).tgz

clean:
	-rm -rf .tmp
	-rm -rf dist

push:
	rsync -vaz --delete ./dist/ root@demo.conseweb.com:/data/www/poe/