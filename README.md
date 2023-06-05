# gh-gomod-generate-sbom

GitHub action to generate a CycloneDX SBOM for Go modules.

> This action uses [*cyclonedx-gomod*](https://github.com/CycloneDX/cyclonedx-gomod) to generate SBOMs. 

## Inputs

### `version`

**Required**. The version of *cyclonedx-gomod* to use.  
Can be a version range, in which case the latest version matching the range is chosen.  
Minimum allowed version is v1.0.0. Must either be an [existing semantic version](https://github.com/CycloneDX/cyclonedx-gomod/releases) 
(e.g. `v1.0.0`, `1.0.0`) or a [version range](https://github.com/npm/node-semver#ranges).

### `args`

**Optional**. Arguments to pass to *cyclonedx-gomod*.  
Please refer to the [*cyclonedx-gomod* documentation](https://github.com/CycloneDX/cyclonedx-gomod#usage) for usage instructions.  
When not set, *cyclonedx-gomod* will only be downloaded, but not executed.  
It'll be made available via `$PATH` and can be used by later steps of the workflow.

## Example usage

```yaml
# Download and invoke cyclonedx-gomod in a single step
- name: Generate SBOM
  uses: CycloneDX/gh-gomod-generate-sbom@v2
  with:
    version: v1
    args: mod -licenses -json -output bom.json

# Just download cyclonedx-gomod and call it in a later step
- name: Download cyclonedx-gomod
  uses: CycloneDX/gh-gomod-generate-sbom@v2
  with:
    version: v1
- name: Generate SBOM
  run: cyclonedx-gomod app -licenses -output bom.xml -main cmd/acme-app
```
