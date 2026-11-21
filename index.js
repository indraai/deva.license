"use strict";
// License Deva
// Copyright ©2000-2026 Quinn Michaels; All rights reserved.  
// Owner Signature Required For Lawful Use.  
// Distributed under VLA:34948472480559228528 LICENSE.md
// Thursday, November 19, 2026 - 11:37:04 AM PST

import Deva from '@indra.ai/deva';

import pkg from './package.json' with {type:'json'};
const {agent,vars} = pkg.data;

// set the __dirname
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';    
const __dirname = dirname(fileURLToPath(import.meta.url));

const info = {
  id: pkg.id,
  license: pkg.license,
  VLA: pkg.VLA,
  name: pkg.name,
  describe: pkg.description,
  version: pkg.version,
  url: pkg.homepage,
  dir: __dirname,
  git: pkg.repository.url,
  bugs: pkg.bugs.url,
  author: pkg.author,
  copyright: pkg.copyright,
};

const LicenseDeva = new Deva({
  info,
  agent,
  vars,
  utils: {
    translate(input) {return input.trim();},
    parse(input) {return input.trim();},
    process(input) {return input.trim();}
  },
  listeners: {},
  modules: {},
  devas: {},
  func: {},
  methods: {},
  onReady(data, resolve) {
    const {VLA} = this.info();
    this.prompt(`${this.vars.messages.ready} > VLA:${VLA.uid}`);
    return resolve(data); // resolve data.
  },
  
  onError(err, data, reject) {
    this.prompt(this.vars.messages.error);
    console.log(err);
    return reject ? reject(err) : Promise.reject(err);
  },
});
export default LicenseDeva
