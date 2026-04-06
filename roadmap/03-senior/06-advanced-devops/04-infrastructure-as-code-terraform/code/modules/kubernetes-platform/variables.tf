variable "environment" {
  description = "Environment name"
  type        = string
}

variable "cluster_name" {
  description = "Kubernetes cluster name"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
}

variable "public_subnets" {
  description = "Public subnet CIDR blocks"
  type        = list(string)
}

variable "private_subnets" {
  description = "Private subnet CIDR blocks"
  type        = list(string)
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
}

variable "cluster_role_arn" {
  description = "Existing IAM role ARN for the cluster control plane"
  type        = string
  default     = "arn:aws:iam::123456789012:role/example-eks-cluster-role"
}
