# gh-gomod-generate-sbom

GitHub action to generate a CycloneDX SBOM for Go modules.

> This action uses [cyclonedx-gomod](https://github.com/CycloneDX/cyclonedx-gomod) to generate SBOMs. 

## Inputs

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

### `version`

**Required** The version of cyclonedx-gomod to use.

## Example usage

```yaml
- name: Generate SBOM JSON
  uses: CycloneDX/gh-gomod-generate-sbom@main
    with:
      json: true
      output: bom.json
      resolve-licenses: true
      version: 0.8.1

- name: Generate SBOM XML
  uses: CycloneDX/gh-gomod-generate-sbom@main
    with:
      output: bom.xml
      resolve-licenses: true
      version: 0.8.1
```