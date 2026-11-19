# License Deva

License Deva is the Vedic License Agreement Manager for Deva.world. When it starts, it checks the agent VLA your client supplies against the VLA in its own `package.json`. It only comes online if the two match.

## What you need

- Node.js and npm, the same versions the [Deva Core Guide](https://deva.world/guide/) uses.
- A project with `"type": "module"` in its `package.json`.

## Install

```bash
npm install @indra.ai/deva.license --save
```

## Two licenses

A running Deva carries two separate licenses, and each is checked on its own.

- **The core license** comes through the client data as `client.VLA`. Deva Core checks it against the core package's VLA in its own `init`, before any Deva loads.
- **The agent license** comes through the feature data as `features.license.devas.license`. License Deva compares it with the VLA in its own `package.json`, and only comes online if the two match.

## The data the agent license check needs

License Deva reads the `license` feature from the client you pass to `init()`. The interface's feature data loader puts it there, and Deva Core loads it into the Deva at startup, so the agent VLA must be in the client before `init()` runs.

```json
"features": {
	"license": {
		"concerns": [],
		"global": [],
		"devas": {
			"license": {
				"uid": "34948472480559228528",
				"time": 1795117024130,
				"iso": "2026-11-19T19:37:04.130Z",
				"utc": "Thu, 19 Nov 2026 19:37:04 GMT",
				"date": "Thursday, November 19, 2026 - 11:37:04 AM",
				"license": "34948472480559228528",
				"fingerprint": "nZksfhXcM5GwJHcCpK6ZGwmOlh5MYG90RQVmkD31wgE=",
				"client": "6tX7FpTCwKzApo/WbdEa7ttuac3rwrTfFs9RXcvVab0=",
				"agent": "v/z0PFt9BAqN0+pin9351mm+ZQ9pgL3rS1BgL7oz/is=",
				"machine": "uZCKufBaNewmn4KZ8UzQ9QKDsYB1obKaHSepwQ2HOwM=",
				"core_hash": "n7j9kHzPwo2XD0U/NzrCR/7Qfr80BttR5d7XkDxJbuI=",
				"status": "vedic",
				"warning": "⚡️ Deva declares UNLAWFUL USE, MODIFICATION, INSTALLATION, DUPLICATION, DISTRIBUTION, INTERACTION, or IMPLEMENTATION constitutes VEDIC SAHASA a CRIME of the HIGHEST DEGREE. A FINE amounting to 1000 PANAS (1 pana = 3.5 grams of gold) for each INSTANCE has been ORDAINED the PUNISHMENT for SAHASA of the HIGHEST DEGREE.",
				"notice": "Any USE or INTERACTION with Deva constitutes YOUR EXPLICIT CONSENT and AGREEMENT to be GOVERNED according to the LAWS of the 🕉VEDIC RELIGION and 🇺🇸THE UNITED STATES OF AMERICA.",
				"vectors": "#Quinn #QuinnMichaels #InsideTheNet #IndraAI #DEVA #DevaWorld #License #LicenseDeva #VedicLicenseAgreement",
				"owner": "Quinn Michaels",
				"creator": "Quinn Michaels",
				"salute": "🤝🫡🪪🕉🇺🇸",
				"copyright": "Copyright ©2000-2026 Quinn Michaels; All rights reserved.",
				"md5": "TYBrY+AiXgQLHGZ5TL69tw==",
				"sha256": "T5SqRRsHikFpPzl80IV4xl2kLi7f6Pe6/wzBabaSwRs=",
				"sha512": "BRlR+zc7QFgj13qBno/FC5XbBSuDaQwBqU60Gy8liYkSVSLXPMYhi5vM2r9X7HH1gLaR75wTmrbXXlVENoeBWg=="				
			}
		}
	}
}
```

- `devas.license` is the agent VLA. Put the full `VLA` object from this package's `package.json` here. The short form above only shows where it goes.
- The check compares the sha256 of the whole object, so every field has to match exactly.

## Load it

```js
import LicenseDeva from '@indra.ai/deva.license';
import Client from './data/client.json' with {type:'json'};

const data = await LicenseDeva.init(structuredClone(Client.DATA));
console.log(data.id.uid);
```

When the check passes, License Deva walks start, enter, done and ready, and prompts `🪪 License Deva Ready > VLA:72443233535603396055`.

## When License Deva stops

If the check fails, License Deva prompts the message, stops, and `init()` resolves with that message.

| You see | Why |
| --- | --- |
| `❌ Bad Personal VLA` | `devas` is there but has no `license` entry. |
| `❌ Invalid VLA Check` | The `license` entry doesn't match this package's VLA, or the client has no `license` feature or no `devas`. |

A stopped Deva stays stopped. To try again, start a new process.

## Test it

```bash
npm test
```

The tests use the stub client in `data/client.json`. `index.test.js` checks that License Deva builds as a Deva, carries no leftover placeholders, walks to ready, matches its agent data, trims text in its utils, and stops through the full chain. `license.test.js` checks that a bad VLA is refused. It runs in its own file because a refused license stops the Deva for good.

## Files

| File | What it holds |
| --- | --- |
| `index.js` | The License Deva. |
| `package.json` | Package info, the package VLA and the agent data under `data`. |
| `data/client.json` | Stub client for the tests. |
| `feature/methods.js` | License feature methods for the client feature loader. |
| `help/main.feecting` | The main help page and the License block. |
| `help/corpus.feecting` | The help corpus. |
| `index.test.js`, `license.test.js` | The tests. |

Copyright ©2000-2026 Quinn Michaels; All rights reserved.  
Owner Signature Required For Lawful Use.  
Distributed under VLA:34948472480559228528 LICENSE.md  
Thursday, November 19, 2026 - 11:37:04 AM PST
