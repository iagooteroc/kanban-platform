output "generated_manifest_path" {
  description = "Path of the generated environment manifest"
  value       = local_file.environment_manifest.filename
}