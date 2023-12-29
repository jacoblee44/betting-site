export function getPipelineId(): string | undefined {
  return process.env.CI_PIPELINE_ID;
}
