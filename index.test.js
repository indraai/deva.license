"use strict";
// License Deva Test File
// Copyright ©2000-2026 Quinn Michaels; All rights reserved.  
// Owner Signature Required For Lawful Use.  
// Distributed under VLA:72443233535603396055 LICENSE.md
// Saturday, September 12, 2026 - 7:08:01 PM

// run these right after Deva Buddy builds ::name:: to make sure it is clean before you start building
import test from 'node:test';
import assert from 'node:assert/strict';
import Deva from '@indra.ai/deva';
import LICENSE from './index.js';
import Client from './data/client.json' with {type:'json'};
import Data from './data/index.json' with {type:'json'};

const STAGES = ['start', 'enter', 'done', 'ready'];
const TIERS = ['md5', 'sha256', 'sha512'];
const PLACEHOLDER = /::[a-z-]+::/;
const client = () => structuredClone(Client.DATA);

test('license builds as a Deva and waits offline before init', async () => {
  assert.ok(LICENSE instanceof Deva, 'the export is a Deva');
  assert.equal(await LICENSE.stop(), LICENSE._messages.offline, 'stop before init answers offline');
});

test('license data has no placeholders left from the build', () => {
  assert.doesNotMatch(JSON.stringify(Data), PLACEHOLDER, 'data/index.json');
  assert.doesNotMatch(JSON.stringify(Client), PLACEHOLDER, 'data/client.json');
});

test('license comes online and walks to ready', async () => {
  const prompts = [];
  LICENSE.listen('devacore:prompt', packet => prompts.push(packet.text));
  const data = await LICENSE.init(client());
  for (const k of STAGES) assert.equal(typeof data[k], 'number', `${k} timestamp`);
  assert.ok(data.start <= data.enter && data.enter <= data.done && data.done <= data.ready, 'stages in order');
  assert.equal(typeof data.id.uid, 'string', 'uid');
  for (const t of TIERS) assert.equal(typeof data[t], 'string', `${t} hash`);
  assert.ok(prompts.includes(LICENSE.vars.messages.ready), 'onReady prompts the ready message');
});

test('license agent matches the build', () => {
  const agent = LICENSE.agent();
  assert.equal(agent.key, 'license');
  assert.equal(agent.profile.name, '::name::');
  assert.equal(agent.profile.owner, '::owner::');
});

test('license utils answer with trimmed text', () => {
  const {translate, parse, process} = LICENSE.utils;
  for (const util of [translate, parse, process]) assert.equal(util('  hello  '), 'hello');
});

test('license stops through the full chain', async () => {
  const data = await LICENSE.stop();
  assert.equal(data.key, 'shutdown', 'the chain ends on shutdown');
  assert.equal(data.value, 'license');
});