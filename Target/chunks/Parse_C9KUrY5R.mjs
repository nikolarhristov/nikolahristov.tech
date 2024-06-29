const Parse = async (...Option) => {
  const Items = /* @__PURE__ */ new Set();
  for (const Package of Option[0]) {
    let GitHub;
    try {
      if (Match(Package, Regex.GitHub)) {
        GitHub = typeof Package === "string" ? Package.split(":")[1] : Object.keys(Package).at(0)?.split(":")[1];
        const Owner = GitHub?.split("/")[0];
        const Repository = GitHub?.split("/")[1];
        const JSONGitHub = await Request(`GET /repos/${GitHub}`, {
          owner: Owner,
          repo: Repository
        });
        if (JSONGitHub?.data) {
          Items.add({
            Link: JSONGitHub.data?.html_url ?? "",
            Name: JSONGitHub.data?.description ?? "",
            GitHub: JSONGitHub.data?.full_name ?? "",
            Badge: /* @__PURE__ */ new Set([
              {
                Link: `HTTPS://GitHub.Com/${Owner}/${Repository}`,
                Image: `https://img.shields.io/github/last-commit/${Owner}/${Repository}?label=Update`,
                Alt: "Update"
              },
              {
                Link: `HTTPS://GitHub.Com/${Owner}/${Repository}`,
                Image: `https://img.shields.io/github/issues/${Owner}/${Repository}?label=Issue`,
                Alt: "Issue"
              },
              {
                Link: `HTTPS://GitHub.Com/${Owner}/${Repository}`,
                Image: `https://img.shields.io/github/downloads/${Owner}/${Repository}/total?label=Download`,
                Alt: "Download",
                Float: true
              }
            ])
          });
        }
      }
    } catch (_Error) {
      console.log(`Package GitHub: ${Package}`);
      console.log(_Error);
    }
    try {
      if (Match(Package, Regex.NPM)) {
        const NPM = typeof Package === "string" ? Package.split(":")[1] : Object.keys(Package).at(0)?.split(":")[1];
        const JSONNPM = await (await fetch(`HTTPS://Registry.NPMJS.Org/${NPM}`)).json();
        GitHub = (JSONNPM?.repository?.url ?? "")?.replace(Regex.GitHubURL, "")?.replace("#readme", "")?.replace(".git", "");
        Items.add({
          Link: `HTTPS://GitHub.Com/${GitHub}`,
          Name: JSONNPM?.description ?? "",
          GitHub,
          Badge: /* @__PURE__ */ new Set([
            {
              Image: `https://img.shields.io/github/actions/workflow/status/${GitHub}/Node.yml?branch=main&label=Build&logo=node.js`,
              Link: `HTTPS://GitHub.Com/${GitHub}/actions/workflows/Node.yml`,
              Alt: "Build"
            },
            {
              Link: `HTTPS://NPMJS.Org/${JSONNPM.name}?activeTab=dependencies`,
              Image: `https://img.shields.io/librariesio/release/npm/${JSONNPM.name}?logo=dependabot&label=`,
              Alt: "Dependency"
            },
            {
              Link: `HTTPS://NPMJS.Org/${JSONNPM.name}`,
              Image: `https://img.shields.io/npm/v/${JSONNPM.name}?label=Version&logo=npm`,
              Alt: "Version"
            },
            {
              Link: `HTTPS://NPMJS.Org/${JSONNPM.name}`,
              Image: `https://img.shields.io/npm/dt/${JSONNPM.name}?label=Download&logo=npm`,
              Alt: "Download",
              Float: true
            }
          ])
        });
      }
    } catch (_Error) {
      console.log(`Package NPM: ${Package}`);
      console.log(_Error);
    }
    try {
      if (Match(Package, Regex.cargo)) {
        const Crate = typeof Package === "string" ? Package.split(":")[1] : Object.keys(Package).at(0)?.split(":")[1];
        const JSONCargo = await (await fetch(`HTTPS://Crates.IO/api/v1/crates/${Crate}`)).json();
        GitHub = (JSONCargo?.crate?.repository ?? "")?.replace(Regex.GitHubURL, "")?.replace("#readme", "")?.replace(".git", "");
        Items.add({
          Link: JSONCargo?.crate?.repository ?? "",
          Name: JSONCargo?.crate?.description ?? "",
          Badge: /* @__PURE__ */ new Set([
            {
              Image: `https://img.shields.io/github/actions/workflow/status/${GitHub}/Rust.yml?branch=main&label=Build`,
              Link: `HTTPS://GitHub.Com/${GitHub}/actions/workflows/Rust.yml`,
              Alt: "Build"
            },
            {
              Link: `HTTPS://Crates.IO/crates/${JSONCargo?.crate?.name}`,
              Image: `https://img.shields.io/crates/v/${JSONCargo?.crate?.name}?label=Version`,
              Alt: "Version"
            },
            {
              Link: `HTTPS://Crates.IO/crates/${JSONCargo?.crate?.name}`,
              Image: `https://img.shields.io/crates/d/${JSONCargo?.crate?.name}?label=Download`,
              Alt: "Download",
              Float: true
            }
          ]),
          GitHub
        });
      }
    } catch (_Error) {
      console.log(`Package cargo: ${Package}`);
      console.log(_Error);
    }
  }
  return Items;
};
const { default: Match } = await import('./Match_Dcq0757H.mjs');
const { default: Request } = await import('./Request_HGiFiknb.mjs');
const Regex = {
  GitHub: /GitHub:/,
  NPM: /NPM:/,
  cargo: /cargo:/,
  GitHubURL: /(git\+)?http?s:\/\/github.com\//
};

export { Match, Regex, Request, Parse as default };
//# sourceMappingURL=Parse_C9KUrY5R.mjs.map