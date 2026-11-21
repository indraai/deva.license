"use strict";
// License Deva Test File
// Copyright ©2000-2026 Quinn Michaels; All rights reserved.  
// Owner Signature Required For Lawful Use.  
// Distributed under VLA:34948472480559228528 LICENSE.md
// Thursday, November 19, 2026 - 11:37:04 AM PST

// run with: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import Deva from '@indra.ai/deva';
import core from '@indra.ai/deva/package.json' with {type:'json'};
import pkg from './package.json' with {type:'json'};
import LICENSE from './index.js';

const STAGES = ['start', 'enter', 'done', 'ready'];
const TIERS = ['md5', 'sha256', 'sha512'];
const PLACEHOLDER = /::[a-z-]+::|\{\{profile\.[a-z]+\}\}/;

// stub client built in code: the core VLA for the core check and the agent VLA for License Deva.
const client = (agentVLA = pkg.VLA) => ({
	id: '00000000000000000000',
	key: 'client',
	VLA: structuredClone(core.VLA),
	prompt: {
		emoji: '🧪',
		text: 'client',
		colors: {
			label: {R: 2, G: 229, B: 77},
			text: {R: 2, G: 229, B: 77},
		},
	},
	profile: {
		id: '00000000000000000000',
		name: 'Test Client',
		describe: 'Test client for License Deva',
		lang: 'en',
		locale: 'en-US',
		currency: 'USD',
	},
	features: {
		license: {
			concerns: [],
			global: [],
			devas: {
				license: structuredClone(agentVLA),
			},
		},
	},
});

test('license builds as a Deva and waits offline before init', async () => {
	assert.ok(LICENSE instanceof Deva, 'the export is a Deva');
	assert.equal(await LICENSE.stop(), LICENSE._messages.offline, 'stop before init answers offline');
});

test('license data has no placeholders left', () => {
	assert.doesNotMatch(JSON.stringify(pkg.data), PLACEHOLDER, 'package.json data');
	assert.doesNotMatch(JSON.stringify(pkg.VLA), PLACEHOLDER, 'package.json VLA');
	assert.doesNotMatch(pkg.copyright, PLACEHOLDER, 'package.json copyright');
});

test('license comes online and walks to ready', async () => {
	const prompts = [];
	LICENSE.listen('devacore:prompt', packet => prompts.push(packet.text));
	const data = await LICENSE.init(client());
	for (const k of STAGES) assert.equal(typeof data[k], 'number', `${k} timestamp`);
	assert.ok(data.start <= data.enter && data.enter <= data.done && data.done <= data.ready, 'stages in order');
	assert.equal(typeof data.id.uid, 'string', 'uid');
	for (const t of TIERS) assert.equal(typeof data[t], 'string', `${t} hash`);
	assert.ok(prompts.includes(`${LICENSE.vars.messages.ready} > VLA:${pkg.VLA.uid}`), 'onReady prompts the ready message');
});

test('license agent matches the package', () => {
	const agent = LICENSE.agent();
	assert.equal(agent.key, 'license');
	assert.equal(agent.profile.name, 'License Deva');
	assert.equal(agent.profile.owner, 'Quinn Michaels');
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

// stop() is final, so the refusal check loads a fresh License Deva instance from the same file.
test('license refuses to start with a bad agent VLA', async () => {
	const {default: REFUSE} = await import('./index.js?refuse');
	const prompts = [];
	REFUSE.listen('devacore:prompt', packet => prompts.push(packet.text));
	const result = await REFUSE.init(client({uid: 'bad'}));
	assert.equal(result, REFUSE._messages.checkVLA, 'init answers with the invalid VLA message');
  assert.ok(prompts.includes(REFUSE._messages.checkVLA), 'core prompts the invalid VLA message');
	assert.equal(REFUSE._active, false, 'the Deva stays offline');
});
