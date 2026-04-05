import type { WorkflowJob, WorkflowSpec } from "../../shared/cicd-types.js";

function indent(lines: readonly string[], spaces: number): string[] {
  return lines.map((line) => `${" ".repeat(spaces)}${line}`);
}

function renderJob(job: WorkflowJob): string[] {
  const lines = [`${job.id}:`, ...indent([`runs-on: ${job.runsOn}`], 2)];

  if (job.needs?.length) {
    lines.push(...indent([`needs: [${job.needs.join(", ")}]`], 2));
  }

  if (job.environment) {
    lines.push(...indent([`environment: ${job.environment}`], 2));
  }

  lines.push(...indent(["steps:"], 2));

  for (const step of job.steps) {
    lines.push(...indent([`- name: ${step.name}`], 4));
    if (step.uses) {
      lines.push(...indent([`uses: ${step.uses}`], 6));
    }
    if (step.run) {
      lines.push(...indent([`run: ${step.run}`], 6));
    }
  }

  return lines;
}

export function renderWorkflow(spec: WorkflowSpec): string {
  const lines = [`name: ${spec.name}`, "on:"];

  for (const [trigger, branches] of Object.entries(spec.on)) {
    lines.push(...indent([`${trigger}:`], 2));
    lines.push(...indent(["branches:"], 4));
    lines.push(...indent(branches.map((branch) => `- ${branch}`), 6));
  }

  lines.push("jobs:");

  for (const job of spec.jobs) {
    lines.push(...indent(renderJob(job), 2));
  }

  return lines.join("\n");
}
