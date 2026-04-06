resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "${var.cluster_name}-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "public" {
  for_each = { for index, cidr in var.public_subnets : index => cidr }

  vpc_id                  = aws_vpc.this.id
  cidr_block              = each.value
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.cluster_name}-public-${each.key}"
  }
}

resource "aws_subnet" "private" {
  for_each = { for index, cidr in var.private_subnets : index => cidr }

  vpc_id     = aws_vpc.this.id
  cidr_block = each.value

  tags = {
    Name = "${var.cluster_name}-private-${each.key}"
  }
}

resource "aws_eks_cluster" "this" {
  name     = var.cluster_name
  role_arn = var.cluster_role_arn
  version  = var.kubernetes_version

  vpc_config {
    subnet_ids = concat(
      values(aws_subnet.public)[*].id,
      values(aws_subnet.private)[*].id,
    )
  }
}
