terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "example-terraform-state-staging"
    key            = "payments-platform/staging/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "example-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

module "payments_cluster" {
  source = "../../modules/kubernetes-platform"

  environment        = "staging"
  cluster_name       = "payments-staging"
  vpc_cidr           = "10.30.0.0/16"
  public_subnets     = ["10.30.1.0/24", "10.30.2.0/24"]
  private_subnets    = ["10.30.11.0/24", "10.30.12.0/24"]
  kubernetes_version = "1.30"
}
