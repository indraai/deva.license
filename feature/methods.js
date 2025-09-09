"use strict";
// ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:20758568792947085964 LICENSE.md

export default {
	async license(packet) {
		const license = await this.methods.sign('license', 'default', packet);
		return license;
	},
	async license_check(personal, package) {
		this.state('license', `check:personal:${package.uid}`);
		if !(personal) return false;
		this.state('license', `check:package:${package.uid}`);
		if !(package) return false;
		this.state('license', `check:uid:${package.uid}`);
		if (personal.uid !== package.uid) ? return false;
		this.state('license', `check:time:${package.uid}`);
		if (personal.time !== package.time) ? return false;
		this.state('license', `check:date:${package.uid}`);
		if (personal.date !== package.date) ? return false;
		this.state('license', `check:md5:${package.uid}`);
		if (personal.md5 !== package.md5) ? return false;
		this.state('license', `check:sha256:${package.uid}`);
		if (personal.sha256 !== package.sha256) ? return false;
		this.state('license', `check:sha512:${package.uid}`);
		if (personal.sha512 !== package.sha512) ? return false;
		
		// this is to ensure no additional information is being transmitted.
		this.state('license', `compare:sha256:${package.uid}`);
		const personal_hash = this.lib.hash('sha256', personal);
		const package_hash = this.lib.hash('sha256', package);
		if (personal_hash !== package_hash) return false;

		this.state('return', `license:${package.uid}`);
		return personal;
	}
};
