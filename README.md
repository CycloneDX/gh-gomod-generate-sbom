# gh-gomod-generate-sbom

GitHub action to generate a CycloneDX SBOM for Go modules.

> This action uses [*cyclonedx-gomod*](https://github.com/CycloneDX/cyclonedx-gomod) to generate SBOMs. 

## Inputs

### `version`

**Required** The version of cyclonedx-gomod to use.

Must either be an [existing semantic version](https://github.com/CycloneDX/cyclonedx-gomod/releases) (e.g. `v0.8.1`, `0.8.1`) or `latest`.

This action supports *cyclonedx-gomod* versions `>= v0.8.1`. Specifying versions below that will cause the workflow to fail.

> Using `latest` is generally not recommended and will produce a warning, as it may fail your workflow 
> unexpectedly due to breaking changes in newer *cyclonedx-gomod* versions.

### `include-stdlib`

Include Go standard library as component and dependency of the module. Default `false`.

### `include-test`

Include test dependencies. Default `false`.

### `json`

Output in JSON format. Default `false`.

### `module`

Path to Go module. Default `'.'`.

### `omit-serial-number`

Omit serial number. Default `false`.

### `omit-version-prefix`

Omit "v" version prefix. Default `false`.

### `output`

Output path. Default `'-'` (stdout).

### `reproducible`

Make the SBOM reproducible by omitting dynamic content. Default `false`.

### `resolve-licenses`

Resolve module licenses. Default `false`.

### `type`

Type of the main component. Default `'application'`.

## Example usage

```yaml
- name: Generate SBOM JSON
  uses: CycloneDX/gh-gomod-generate-sbom@main
  with:
    json: true
    output: bom.json
    resolve-licenses: true
    version: v0.8.1

- name: Generate SBOM XML
  uses: CycloneDX/gh-gomod-generate-sbom@main
  with:
    output: bom.xml
    resolve-licenses: true
    version: latest
```