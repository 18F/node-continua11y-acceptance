'use strict';

class ConfigGenerator {
  constructor(config) {
    this.config = config || {};
    if (!this.config.page) {
      this.config.page = {};
    }

    this.sizes  = config.sizes || {};
  }

  sizeNames() {
    let keys = this.sizeKeys();
    if (!keys.some((key) => { return key === 'default'})) {
      keys.unshift('default');
    }
    return keys;
    return keys.length ? keys : ['default'];
  }

  setup() {
    this.sizeKeys().forEach((sizeName) => {
      this[sizeName] = () => {
        return this.namedConfig(sizeName);
      };
    });
  }

  default() {
    let defaultConfig = Object.assign({}, this.config);
    defaultConfig.page.viewport = this.defaultSize();
    return defaultConfig;
  }

  sizeKeys() {
    return Object.keys(this.sizes);
  }

  namedConfig(sizeName) {
    let config = Object.assign({}, this.default());
    config.page.viewport = this.sizes[sizeName];
    return config;
  }

  defaultSize() {
    let key = this.sizeKeys()[0];
    return this.sizes[key] || {
      width: 1024,
      height: 768
    };
  }
}

module.exports = ConfigGenerator;

