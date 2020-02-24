resource "google_project_service" "servicenetworking_api" {
  service = "servicenetworking.googleapis.com"
}

resource "google_compute_network" "network" {
  name                    = "spotlight"
  auto_create_subnetworks = "false"
  depends_on              = [google_project_service.servicenetworking_api]
}

resource "google_compute_subnetwork" "subnet-gke" {
  name          = "subnet-gke"
  ip_cidr_range = "10.10.0.0/16"
  network       = google_compute_network.network.name

  secondary_ip_range {
    range_name    = "pod-net"
    ip_cidr_range = "10.11.0.0/16"
  }
  secondary_ip_range {
    range_name    = "service-net"
    ip_cidr_range = "10.12.0.0/16"
  }
}

resource "google_compute_global_address" "private_cloud_sql" {
  provider      = google-beta
  name          = "private-cloud-sql"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 20
  network       = google_compute_network.network.self_link
}

resource "google_service_networking_connection" "cloud_sql" {
  provider                = google-beta
  network                 = google_compute_network.network.self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_cloud_sql.name]
}

resource "google_compute_router" "router" {
  name    = "router"
  network = google_compute_network.network.self_link
}

# The NAT allows outbound Internet access for the K8s nodes
# so they can retrieve Docker images from hub.docker.com
# alternatives would be using gcr.io, self-hosted registry, or the Docker Hub mirror
# https://cloud.google.com/container-registry/docs/using-dockerhub-mirroring
resource "google_compute_router_nat" "node-pool-nat" {
  name                               = "spotlight-node-pool-nat"
  router                             = google_compute_router.router.name
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "LIST_OF_SUBNETWORKS"

  subnetwork {
    name                    = google_compute_subnetwork.subnet-gke.self_link
    source_ip_ranges_to_nat = ["PRIMARY_IP_RANGE"]
  }
}

resource "google_compute_global_address" "public" {
  name = "spotlight"
}

module "endpoint-dns" {
  # https://github.com/terraform-google-modules/terraform-google-endpoints-dns/pull/3
  source      = "github.com/terraform-google-modules/terraform-google-endpoints-dns?ref=0a0355127ded9917222e52d899494a6240ffe438"
  project     = data.google_client_config.current.project
  name        = "spotlight"
  external_ip = google_compute_global_address.public.address
}
