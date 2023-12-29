import { promises as fs } from 'fs';
import { getDockerComposeProject } from './docker';
import { exec, shell } from '@/helpers/bash';
import { withTemporaryVolume } from '@/helpers/docker.utils';

interface Audit {
  id: string;
  title: string;
  score: number;
  scoreDisplayMode: string;
  numericValue?: number;
  displayValue?: string;
}

interface LighthouseReportInternal {
  audits: Record<string, Audit>;
}

interface LighthouseReport {
  firstContentfulPaint: number | null;
}

export async function lighthouse(): Promise<void> {
  const dockerComposeProject = getDockerComposeProject();
  const volumeName = `${dockerComposeProject}-lighthouse-data`;

  await withTemporaryVolume(volumeName, async (copyTo, copyFrom) => {
    // Build the Docker image
    await exec('docker', ['build', '-t', 'my-lighthouse-image', '-f', './Dockerfile', '.'], {
      cwd: './scripts/commands/lighthouse',
    });

    // Run the Docker image
    await shell('docker', [
      'run',
      '--rm',
      '--network=' + dockerComposeProject + '-network',
      '-v',
      `${volumeName}:/app/artifacts`, // temporary volume mount
      'my-lighthouse-image',
      `http://nuxt:3000`, // Accessing the nuxt service in the network
      '--enable-error-reporting',
      '--throttling-method=devtools',
      '--output-path=/app/artifacts/lighthouse.json', // Update the path to match the volume mount path in the container
      '--output',
      'json',
      '--chrome-flags="--headless --no-sandbox --disable-gpu --ignore-certificate-errors --disable-dev-shm-usage"',
    ]);

    // Copy data from temporary volume to host
    await copyFrom('./.artifacts/tmp2');
    await fs.cp('./.artifacts/tmp2/lighthouse.json', './.artifacts/lighthouse.json');
    await fs.rm('./.artifacts/tmp2', { recursive: true, force: true });

    const report = await parseLighthouseReport();
    // With the current example page, lighthouse can't recognize when the page is loaded,
    // so we use a much longer timeout than normal
    if (!report.firstContentfulPaint || report.firstContentfulPaint > 3000) {
      throw new Error('First Contentful Paint is too slow');
    }
  });
}

export async function parseLighthouseReport(): Promise<LighthouseReport> {
  const data = await fs.readFile('./.artifacts/lighthouse.json', 'utf8');
  const report: LighthouseReportInternal = JSON.parse(data);

  const firstContentfulPaint = report.audits['first-contentful-paint'];

  if (firstContentfulPaint) {
    console.log(`First Contentful Paint:`.blue, `${firstContentfulPaint.numericValue} ms`.yellow);
    return {
      firstContentfulPaint: firstContentfulPaint.numericValue || null,
    };
  } else {
    throw new Error('First Contentful Paint data not found in the report');
  }
}
