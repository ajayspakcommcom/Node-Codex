output "cluster_name" {
  description = "Cluster name"
  value       = aws_eks_cluster.this.name
}

output "vpc_id" {
  description = "VPC id"
  value       = aws_vpc.this.id
}
