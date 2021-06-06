// This file is part of CycloneDX GitHub Action for Go Modules
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0
// Copyright (c) Niklas Düster. All Rights Reserved.

const core = require('@actions/core');
const exec = require('@actions/exec');
const os = require('os');
const path = require('path');
const toolCache = require('@actions/tool-cache');

const input = {
    version: core.getInput('version') || 'latest',
    output: core.getInput('output'),
    useJson: core.getBooleanInput('json')
};

const baseDownloadUrl = 'https://github.com/CycloneDX/cyclonedx-gomod/releases/download';

function buildDownloadUrl(version) {
    let fileExtension = "tar.gz";

    let platform = os.platform().toString();
    if (platform == 'win32') {
        platform = 'windows';
        fileExtension = 'zip';
    }

    let architecture = os.arch()
    if (architecture == 'ia32' || architecture == 'x32') {
        architecture = 'x86';
    }

    return `${baseDownloadUrl}/${version}/cyclonedx-gomod_${version}_${platform}_${architecture}.${fileExtension}`;
}

async function install(version) {
    core.info(`Installing cyclonedx-gomod ${version}`);
    const downloadUrl = buildDownloadUrl(version);

    core.info(`Downloading ${downloadUrl}`);
    const archivePath = await toolCache.downloadTool(downloadUrl);

    core.info('Extracting archive');
    let installDir = "";
    if (downloadUrl.endsWith('.zip')) {
        installDir = await toolCache.extractZip(archivePath, process.env.HOME);
    } else {
        installDir = await toolCache.extractTar(archivePath, process.env.HOME);
    }

    return path.join(installDir, 'cyclonedx-gomod');
}

async function run() {
    try {
        const binaryPath = await install(input.version);
        core.info(`Successfully installed to ${binaryPath}`);
        exec.exec(binaryPath, ['-version']);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
