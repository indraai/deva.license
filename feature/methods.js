"use strict";
// Copyright ©2000-2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:46220923248993739422 LICENSE.md

export default {
	async license(packet) {
		const license = await this.methods.sign('license', 'default', packet);
		return license;
	},
};
