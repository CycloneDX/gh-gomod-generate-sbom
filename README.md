# gh-gomod-generate-sbom

GitHub action to generate a CycloneDX SBOM for Go modules.

> This action uses [*cyclonedx-gomod*](https://github.com/CycloneDX/cyclonedx-gomod) to generate SBOMs. 

## Inputs

### `version`

**Required** The version of cyclonedx-gomod to use.  
Can be a version range, in which case the latest version matching the range is chosen.  
Minimum allowed version is v1.0.0.

Must either be an [existing semantic version](https://github.com/CycloneDX/cyclonedx-gomod/releases) (e.g. `v1.0.0`, `1.0.0`), [version range](https://github.com/npm/node-semver#ranges) or `latest`.

> Using `latest` is generally not recommended and will produce a warning, as it may fail your workflow 
> unexpectedly due to breaking changes in newer *cyclonedx-gomod* versions.
> As of v0.3.0, version ranges are supported. Instead of `latest`, consider using `^v0`, `^v0.8` or similar instead.

## Example usage

```yaml
- name: Generate SBOM JSON
  uses: CycloneDX/gh-gomod-generate-sbom@v0.3.0
  with:
    json: true
    output: bom.json
    resolve-licenses: true
    version: ^v0

- name: Generate SBOM XML
  uses: CycloneDX/gh-gomod-generate-sbom@v0.3.0
  with:
    output: bom.xml
    resolve-licenses: true
    version: latest
```