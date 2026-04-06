output "cluster_name" {
  description = "Production Kubernetes cluster name"
  value       = module.payments_cluster.cluster_name
}
