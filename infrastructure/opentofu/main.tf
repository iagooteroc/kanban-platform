resource "local_file" "environment_manifest" {
  filename = "${path.module}/generated/${var.project_name}-${var.environment}.txt"

  content = <<-EOT
    Project: ${var.project_name}
    Environment: ${var.environment}
    Managed by: OpenTofu and GitOps
  EOT
}