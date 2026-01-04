"use strict";
// License Deva Feature Methods
// Copyright ©2000-2026 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:44486733861528360966 LICENSE.md
// Sunday, January 4, 2026 - 7:09:20 AM

export default {
	async license(packet) {
		const license = await this.methods.sign('license', 'default', packet);
		return license;
	},
};
