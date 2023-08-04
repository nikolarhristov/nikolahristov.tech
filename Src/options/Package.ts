import css3Dark from "@assets/images/packages/css3Dark.svg";
import css3Light from "@assets/images/packages/css3Light.svg";
import gnubashDark from "@assets/images/packages/gnubashDark.svg";
import gnubashLight from "@assets/images/packages/gnubashLight.svg";
import goDark from "@assets/images/packages/goDark.svg";
import goLight from "@assets/images/packages/goLight.svg";
import javascriptDark from "@assets/images/packages/javascriptDark.svg";
import javascriptLight from "@assets/images/packages/javascriptLight.svg";
import luaDark from "@assets/images/packages/luaDark.svg";
import luaLight from "@assets/images/packages/luaLight.svg";
import mdxDark from "@assets/images/packages/mdxDark.svg";
import mdxLight from "@assets/images/packages/mdxLight.svg";
import powershellDark from "@assets/images/packages/powershellDark.svg";
import powershellLight from "@assets/images/packages/powershellLight.svg";
import pythonDark from "@assets/images/packages/pythonDark.svg";
import pythonLight from "@assets/images/packages/pythonLight.svg";
import rustDark from "@assets/images/packages/rustDark.svg";
import rustLight from "@assets/images/packages/rustLight.svg";
import typescriptDark from "@assets/images/packages/typescriptDark.svg";
import typescriptLight from "@assets/images/packages/typescriptLight.svg";
import windowsterminalDark from "@assets/images/packages/windowsterminalDark.svg";
import windowsterminalLight from "@assets/images/packages/windowsterminalLight.svg";
import astroDark from "@assets/images/packages/astroDark.svg";
import astroLight from "@assets/images/packages/astroLight.svg";

export interface Package {
	icons: {
		[key: string]: [ImageMetadata, ImageMetadata];
	};
}

export default {
	icons: {
		"CSS": [css3Light, css3Dark],
		"Shell": [gnubashLight, gnubashDark],
		"Go": [goLight, goDark],
		"JavaScript": [javascriptLight, javascriptDark],
		"Lua": [luaLight, luaDark],
		"MDX": [mdxLight, mdxDark],
		"PowerShell": [powershellLight, powershellDark],
		"Python": [pythonLight, pythonDark],
		"Rust": [rustLight, rustDark],
		"TypeScript": [typescriptLight, typescriptDark],
		"Batchfile": [windowsterminalLight, windowsterminalDark],
		"Astro": [astroLight, astroDark],
	},
} satisfies Package as Package;