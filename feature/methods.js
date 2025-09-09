"use strict";
// ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:70667481520707725226 LICENSE.md

export default {
	async license(packet) {
		const license = await this.methods.sign('license', 'default', packet);
		return license;
	},
	async license_check(personalVLA, packageVLA) {
		this.state('license', `check:personalVLA:${packageVLA.uid}`);
		if (!personalVLA) return false;
		this.state('license', `check:packageVLA:${packageVLA.uid}`);
		if (!packageVLA) return false;
		this.state('license', `check:uid:${packageVLA.uid}`);
		if (personalVLA.uid !== packageVLA.uid) return false;
		this.state('license', `check:time:${packageVLA.uid}`);
		if (personalVLA.time !== packageVLA.time) return false;
		this.state('license', `check:date:${packageVLA.uid}`);
		if (personalVLA.date !== packageVLA.date) return false;
		this.state('license', `check:md5:${packageVLA.uid}`);
		if (personalVLA.md5 !== packageVLA.md5) return false;
		this.state('license', `check:sha256:${packageVLA.uid}`);
		if (personalVLA.sha256 !== packageVLA.sha256) return false;
		this.state('license', `check:sha512:${packageVLA.uid}`);
		if (personalVLA.sha512 !== packageVLA.sha512) return false;
		
		// this is to ensure no additional information is being transmitted.
		this.state('license', `compare:sha256:${packageVLA.uid}`);
		const personalVLA_hash = this.lib.hash(personalVLA, 'sha256');
		const packageVLA_hash = this.lib.hash(packageVLA, 'sha256');
		if (personalVLA_hash !== packageVLA_hash) return false;

		this.state('return', `license:${packageVLA.uid}`);
		return personalVLA;
	}
};
