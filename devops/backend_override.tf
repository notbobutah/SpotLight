terraform {
  backend "gcs" {
    bucket = "spotlight-deployment-kosinpb-tf-state"
  }
}
