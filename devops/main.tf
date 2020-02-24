provider "google" {
  version = "~> 2.0"
}

provider "google-beta" {
  version = "~> 2.0"
}

data "google_client_config" "current" {
}

data "google_compute_zones" "available" {
}
