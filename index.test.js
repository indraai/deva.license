"use strict";
// License Deva Test File
// Copyright ©2000-2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:46220923248993739422 LICENSE.md

const {expect} = require('chai')
const LicenseDeva = require('./index.js');

describe(LicenseDeva.me.name, () => {
  beforeEach(() => {
    return LicenseDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(LicenseDeva).to.be.an('object');
    expect(LicenseDeva).to.have.property('agent');
    expect(LicenseDeva).to.have.property('vars');
    expect(LicenseDeva).to.have.property('listeners');
    expect(LicenseDeva).to.have.property('methods');
    expect(LicenseDeva).to.have.property('modules');
  });
})
