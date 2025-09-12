"use strict";
// ©2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:70667481520707725226 LICENSE.md

export default {
	async license(packet) {
		const license = await this.methods.sign('license', 'default', packet);
		return license;
	},
};
